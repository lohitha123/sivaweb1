using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.StockIssue;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.StockIssue;
//using AtPar.StockIssue.Repos;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.StockIssue.Service
{
    public class DistributionTypesService : IDistributionTypesService
    {
        IDistributionTypesRepository _Repository;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;

        public DistributionTypesService(IDistributionTypesRepository repository, ILog log, ICommonRepository commonRepository, 
            ICommonService commonService)
        {
            _Repository = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _log.SetLoggerType(typeof(DistributionTypesService));
            //Need to remove this 
            //GetConfigData();
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

        public AtParWebApiResponse<MT_STIS_DISTRIB_TYPE> GetDistributionTypes(string distributionType, string userID, string orgGroupID,
                                                                              string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string bUnitsAllocated = string.Empty;
            var bUnitsList = new AtParWebApiResponse<string>();
            var response = new AtParWebApiResponse<MT_STIS_DISTRIB_TYPE>();
            Tuple<long, List<MT_STIS_DISTRIB_TYPE>> tupleOutpt;

            List<MT_STIS_DISTRIB_TYPE> lstERPDistTypes = new List<MT_STIS_DISTRIB_TYPE>();
            List<MT_STIS_DISTRIB_TYPE> lstLocalDistTypes = new List<MT_STIS_DISTRIB_TYPE>();
            bUnitsList = _commonService.GetOrgGroupBUnits(userID, orgGroupID, AtParWebEnums.BusinessType.Inventory.ToString());

            // Appending locations with ,
            if (bUnitsList.DataList.Count > 0)
            {
                foreach (var item in bUnitsList.DataList)
                {
                    bUnitsAllocated += string.IsNullOrEmpty(bUnitsAllocated) ? item : "','" + item;
                }

                bUnitsAllocated = "'" + bUnitsAllocated + "'";
            }
            else
            {
                response.AtParNotOK(AtparStatusCodes.ATPAR_BUNIT_NOTALLOC, _commonRepo, _log);
                return response;
            }

            try
            {
                tupleOutpt = GetDistributionTypesFromERP(distributionType, bUnitsAllocated, orgGroupID, deviceTokenEntry);

                if (tupleOutpt.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tupleOutpt.Item1, _commonRepo, _log);
                    return response;
                }

                lstERPDistTypes = tupleOutpt.Item2;

                lstLocalDistTypes = _Repository.GetDistributionTypes(distributionType);

                if (lstLocalDistTypes != null && lstLocalDistTypes.Count() == 0)
                {
                    lstLocalDistTypes.ToList().ForEach(x =>
                    {
                        x.CHK_VALUE = 0;
                        x.CHK_ALLOCATED = 0;
                    });
                }
                else if (lstLocalDistTypes != null && lstLocalDistTypes.Count() > 0)
                {
                    foreach (var item in lstLocalDistTypes)
                    {
                        var isExists = lstERPDistTypes.Where(c => c.DISTRIB_TYPE == item.DISTRIB_TYPE && c.SET_ID == item.SET_ID).FirstOrDefault();

                        if (isExists != null)
                        {
                            isExists.USER_ID += string.IsNullOrEmpty(isExists.USER_ID) ? item.USERNAME : "," + item.USERNAME;

                            //Checking whether Middle Tire DB UserId Column is same as Selected User Id in the Webpages or not.
                            if ((item.USER_ID) == userID)
                            {
                                isExists.CHK_VALUE = 1;
                                isExists.CHK_ALLOCATED = 1;
                            }
                        }
                    }
                }

                lstERPDistTypes.ToList().Select((x, idx) => { x.ROWINDEX = idx; return x; });
                lstERPDistTypes=lstERPDistTypes.OrderByDescending(a => a.CHK_VALUE == 1).Reverse().ToList();
                response.DataList = lstERPDistTypes;
                response.AtParSuccess();

                return response;
                
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        private Tuple<long, List<MT_STIS_DISTRIB_TYPE>> GetDistributionTypesFromERP(string distributionType, string bUnits, 
                                                                              string orgGroupID, string[] objToken)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            string outputXml = string.Empty;
            Tuple<long, List<MT_STIS_DISTRIB_TYPE>> tupleOutput = null;
            DataSet dsDistTypes = null;
            List<MT_STIS_DISTRIB_TYPE> lstERPDistTypes = new List<MT_STIS_DISTRIB_TYPE>();

            try
            {

                string strXmlOutputStr = string.Empty;

                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;


                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();



                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }

                    tupleOutput = new Tuple<long, List<MT_STIS_DISTRIB_TYPE>>(AtparStatusCodes.E_SERVERERROR, null);
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.StockIssue.ToString() + "_" + erpObjName;
                }

                className = "GetDistributionTypes";
                methodName = "GetDistributionTypes";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                dsDistTypes = new DataSet();


                if (erpObjName == AtParWebEnums.Enterprise_Enum.Oracle.ToString())
                {
                    object[] args = { dsDistTypes, objToken, distributionType, bUnits };
                    StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                        tupleOutput = new Tuple<long, List<MT_STIS_DISTRIB_TYPE>>(StatusCode, null);
                        return tupleOutput;
                    }

                    dsDistTypes = (DataSet)args[0];

                }
                else
                {
                    object[] args = { dsDistTypes, objToken, distributionType, bUnits, orgGroupID };
                    StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1}  :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                        tupleOutput = new Tuple<long, List<MT_STIS_DISTRIB_TYPE>>(StatusCode, null);
                        return tupleOutput;
                    }

                    dsDistTypes = (DataSet)args[0];
                }

                if (dsDistTypes.Tables[0].Rows.Count > 0)
                {
                    // to do SETCNTRLVALUE mapped to BUSINESS_UNIT is it correct or not?
                    lstERPDistTypes = (from DataRow dr in dsDistTypes.Tables[0].Rows
                                       select new MT_STIS_DISTRIB_TYPE()
                                       {
                                           DESCR = dr["DESCR"].ToString(),
                                           SET_ID = dr["SETID"].ToString(),
                                           DISTRIB_TYPE = dr["DISTRIB_TYPE"].ToString()
                                       }).ToList();


                    tupleOutput = new Tuple<long, List<MT_STIS_DISTRIB_TYPE>>(AtparStatusCodes.ATPAR_OK, lstERPDistTypes);
                    return tupleOutput;
                }
                else
                {
                    tupleOutput = new Tuple<long, List<MT_STIS_DISTRIB_TYPE>>(AtparStatusCodes.E_NORECORDFOUND, null);
                    return tupleOutput;
                }


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, List<MT_STIS_DISTRIB_TYPE>>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }
        }

        public AtParWebApiResponse<MT_STIS_DISTRIB_TYPE> AllocateDistributionTypes(string loginUserID, string selectedUserID,
                                    List<MT_STIS_DISTRIB_TYPE> lstDistAllocation, bool searched, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            var response = new AtParWebApiResponse<MT_STIS_DISTRIB_TYPE>();

            try
            {

                if (searched)
                {
                    StatusCode = _Repository.ProcessDistributionTypes(loginUserID, selectedUserID, lstDistAllocation);

                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

                }
                else if (!searched)
                {
                    StatusCode = _Repository.ProcessSelectedDistributionTypes(loginUserID, selectedUserID, lstDistAllocation);

                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

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
