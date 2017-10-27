using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Deliver;
using AtPar.Service.Interfaces.Deliver;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Deliver.Service
{
    public class ExcludeLocsService : IExcludeLocsService
    {
        IExcludeLocsRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ExcludeLocsService(ILog log, ICommonRepository commonRepository, IExcludeLocsRepository repo)
        {
            _log = log;
            _commonRepo = commonRepository;
            _Repo = repo;
            _log.SetLoggerType(typeof(ExcludeLocsService));
        }

        public AtParWebApiResponse<MT_DELV_EXCLUDE_LOC> GetAllLocations(string setID, string location, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_DELV_EXCLUDE_LOC>();
            DataSet dsLocs = null;
            List<MT_DELV_EXCLUDE_LOC> lstERPLocs = new List<MT_DELV_EXCLUDE_LOC>();

            try
            {


                Tuple<long, DataSet> tupleResult = GetERPLocs(setID, location, deviceTokenEntry);

                if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tupleResult.Item1, _commonRepo, _log);
                    return response;
                }

                dsLocs = tupleResult.Item2;
                if (dsLocs.Tables[0].Rows.Count > 0)
                {
                    // to do SETCNTRLVALUE mapped to BUSINESS_UNIT is it correct or not?
                    lstERPLocs = (from DataRow dr in dsLocs.Tables[0].Rows
                                  select new MT_DELV_EXCLUDE_LOC()
                                  {
                                      SETID = dr["SETID"].ToString(),
                                      LOCATION = dr["LOCATION"].ToString(),
                                      LOCATION_DESC = dr["DESCR"].ToString()

                                  }).ToList();

                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }


                List<MT_DELV_EXCLUDE_LOC> lstLocalLocs = _Repo.GetLocations();



                if (lstLocalLocs != null && lstLocalLocs.Count() == 0)
                {
                    lstERPLocs.ToList().ForEach(x =>
                    {
                        x.CHK_VALUE = 0;
                        x.CHK_ALLOCATED = 0;
                    });

                }
                else if (lstLocalLocs != null && lstLocalLocs.Count() > 0)
                {
                    foreach (var item in lstLocalLocs)
                    {
                        var isExists = lstERPLocs.Where(c => c.SETID == item.SETID && c.LOCATION == item.LOCATION).FirstOrDefault();

                        if (isExists != null)
                        {
                            isExists.CHK_VALUE = 1;
                            isExists.CHK_ALLOCATED = 1;
                        }
                    }

                }

                lstERPLocs.ToList().Select((x, idx) => { x.ROWINDEX = idx; return x; });
                response.DataList = lstERPLocs.OrderByDescending(x => x.CHK_VALUE == 1).ToList();
                response.AtParSuccess();

                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }


        }

        private Tuple<long, DataSet> GetERPLocs(string setID, string location, string[] objToken)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            string outputXml = string.Empty;
            Tuple<long, DataSet> tupleOutput = null;

            try
            {

                DataSet dsLocs = null;
                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;


                //Initializing 
                //GetConfigData();


                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "Remote Object Failed")); }

                    tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Deliver.ToString() + "_" + erpObjName;
                }

                className = "GetLocations";
                methodName = "GetLocations";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                dsLocs = new DataSet();
                object[] args = { setID, location, dsLocs, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<long, DataSet>(StatusCode, null);
                    return tupleOutput;
                }

                StatusCode = AtparStatusCodes.ATPAR_OK;
                dsLocs = (DataSet)args[2];
                tupleOutput = new Tuple<long, DataSet>(StatusCode, dsLocs);
                return tupleOutput;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }

        }

        //private void GetConfigData()
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
        //        throw ex;
        //    }
        //}

        public AtParWebApiResponse<MT_DELV_EXCLUDE_LOC> ExcludeLocs(List<MT_DELV_EXCLUDE_LOC> lstLocs, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            var response = new AtParWebApiResponse<MT_DELV_EXCLUDE_LOC>();

            try
            {
                StatusCode = _Repo.ProcessLocations(lstLocs, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

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

        }
    }
}
