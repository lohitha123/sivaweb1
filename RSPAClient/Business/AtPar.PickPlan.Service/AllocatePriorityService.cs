using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.PickPlan;
using AtPar.Service.Interfaces.PickPlan;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.PickPlan.Service
{
    public class AllocatePriorityService : IAllocatePriorityService
    {
        IAllocatePriorityRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public AllocatePriorityService(IAllocatePriorityRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _Repo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(AllocatePriorityService));
            //GetConfigData();
        }

        // Need to remove
        //private void GetConfigData()
        //{

        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}

        private Tuple<long, List<MT_PKPL_PRIORITY>> GetLocationsFromERP(string bUnit, string location, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<long, List<MT_PKPL_PRIORITY>> tupleOutput;
            string erpObjName = string.Empty;
            string className = null;
            string methodName = string.Empty;
            MethodInfo MethodName = null;
            object reflectObject = null;
            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
            List<string> lstParameters = new List<string>();
            DataSet dsPriorityDetails = new DataSet();
            long StatusCode = -1;
            List<MT_PKPL_PRIORITY> lstERPLocations = new List<MT_PKPL_PRIORITY>();

            try
            {
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                erpObjName = AtParWebEnums.EnumApps.PickPlan.ToString() + "_" + erpObjName;

                className = "GetPLocs";
                methodName = "GetPLocs";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { bUnit, location, dsPriorityDetails, deviceTokenEntry };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    tupleOutput = new Tuple<long, List<MT_PKPL_PRIORITY>>(StatusCode, null);
                    return tupleOutput;
                }

                dsPriorityDetails = (DataSet)args[2];

                // Parse ERP Dataset
                if (dsPriorityDetails.Tables[0].Rows.Count > 0)
                {
                    // to do SETCNTRLVALUE mapped to BUSINESS_UNIT is it correct or not?
                    lstERPLocations = (from DataRow dr in dsPriorityDetails.Tables[0].Rows
                                       select new MT_PKPL_PRIORITY()
                                       {
                                           SETID = dr["SETID"].ToString(),
                                           BUSINESS_UNIT = dr["SETCNTRLVALUE"].ToString(),
                                           LOCATION = dr["LOCATION"].ToString(),
                                           DESCR = dr["DESCR"].ToString()

                                       }).ToList();


                    tupleOutput = new Tuple<long, List<MT_PKPL_PRIORITY>>(AtparStatusCodes.ATPAR_OK, lstERPLocations);
                    return tupleOutput;
                }
                else
                {
                    tupleOutput = new Tuple<long, List<MT_PKPL_PRIORITY>>(AtparStatusCodes.E_NORECORDFOUND, null);
                    return tupleOutput;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                tupleOutput = new Tuple<long, List<MT_PKPL_PRIORITY>>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }

        }

        public AtParWebApiResponse<MT_PKPL_PRIORITY> GetLocationPriorities(string bUnit, string location, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_PKPL_PRIORITY>();
            string locationsFromERP = string.Empty;
            string bUnitFromERP = string.Empty;
            Tuple<long, List<MT_PKPL_PRIORITY>> tupleOutpt;

            List<MT_PKPL_PRIORITY> lstERPLocations = new List<MT_PKPL_PRIORITY>();
            List<MT_PKPL_PRIORITY> lstLocalLocations = new List<MT_PKPL_PRIORITY>();

            try
            {
                tupleOutpt = GetLocationsFromERP(bUnit, location, deviceTokenEntry);

                if (tupleOutpt.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tupleOutpt.Item1, _commonRepo, _log);
                    return response;
                }

                lstERPLocations = tupleOutpt.Item2;


                // Indexing 
                lstERPLocations.ToList().Select((x, idx) => { x.ROWINDEX = idx; return x; });

                // Appending locations with ,
                foreach (var item in lstERPLocations)
                {
                    bUnitFromERP = item.BUSINESS_UNIT;
                    locationsFromERP += string.IsNullOrEmpty(locationsFromERP) ? item.LOCATION.ReplaceString().ReplaceAmpersand() : "','" + item.LOCATION.ReplaceString().ReplaceAmpersand();
                }

                lstLocalLocations = _Repo.GetLocationPriorities(bUnitFromERP, locationsFromERP);

                if (lstLocalLocations != null && lstLocalLocations.Count() == 0)
                {
                    lstLocalLocations.ToList().ForEach(x =>
                    {
                        x.CHK_VALUE = 0;
                        x.CHK_ALLOCATED = 0;
                        x.PRIORITY = 0;
                    });

                }
                else if (lstLocalLocations != null && lstLocalLocations.Count() > 0)
                {

                    foreach (var item in lstERPLocations)
                    {
                        var isExists = lstLocalLocations.Where(c => c.BUSINESS_UNIT == item.BUSINESS_UNIT && c.LOCATION == item.LOCATION).FirstOrDefault();

                        if (isExists != null)
                        {
                            item.PRIORITY = isExists.PRIORITY;
                            item.CHK_ALLOCATED = 1;
                        }
                    }

                }

                response.DataList = lstERPLocations;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }


        }

        public AtParWebApiResponse<MT_PKPL_PRIORITY> SaveLocationPriorities(string priority, List<MT_PKPL_PRIORITY> priorities, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_PKPL_PRIORITY>();
            long StatusCode = -1;

            try
            {

                StatusCode = _Repo.ProcessLocationPriorities(priority, priorities);

                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

            return null;
        }
    }
}
