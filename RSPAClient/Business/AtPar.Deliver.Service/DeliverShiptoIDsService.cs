using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.Service.Interfaces.Deliver;
using log4net;
using AtPar.Repository.Interfaces.Deliver;
using AtPar.POCOEntities;
using AtPar.Common;
using System.Reflection;
using System.Xml.Linq;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar_BusinessRules;
using System.Data;
using AtPar.Service.Interfaces.Common;

namespace AtPar.Deliver.Service
{
    public class DeliverShiptoIDsService : IDeliverShiptoIDsService
    {
        IDeliverShiptoIDsRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;

        public DeliverShiptoIDsService(ILog log, ICommonRepository commonRepository, IDeliverShiptoIDsRepository repo, ICommonService commonService)
        {
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _Repo = repo;
            _log.SetLoggerType(typeof(DeliverShiptoIDsService));
        }

        #region Get ShiptoIDs
        public AtParWebApiResponse<MT_DELV_SHIPTO_ID_ALLOCATION> GetOrgGrpShiptoIDs(string orgGroupID, string serverUserID, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_DELV_SHIPTO_ID_ALLOCATION>();
            AtParWebApiResponse<string> responseBUnits = null;
            List<MT_DELV_SHIPTO_ID_ALLOCATION> lstERPBUnits = new List<MT_DELV_SHIPTO_ID_ALLOCATION>();
            string strOrgId = "";
            string strShiftToId = "";

            try
            {
                responseBUnits = _commonService.GetBusinessUnits(serverUserID, AtParWebEnums.BusinessType.Purchasing.ToString());

                if (responseBUnits.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_BUNIT_NOTALLOC, _commonRepo, _log);
                    return response;
                }
                Tuple<long, List<MT_DELV_SHIPTO_ID_ALLOCATION>> tupleResult = GetERPShiptoIDs(serverUserID, responseBUnits.DataList.ToArray(), deviceTokenEntry);

                if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tupleResult.Item1, _commonRepo, _log);
                    return response;
                }
                lstERPBUnits = tupleResult.Item2;

                List<MT_DELV_SHIPTO_ID_ALLOCATION> lstSQLBUnits = _Repo.GetOrgGrpShiptoIDs(orgGroupID);

                if (lstERPBUnits != null && lstERPBUnits.Count() > 0)
                {
                    lstERPBUnits.ToList().ForEach(x =>
                    {
                        x.CHK_VALUE = 0;
                        x.CHK_ALLOCATED = 0;
                    });
                }
                
                foreach (var item in lstERPBUnits)
                {                   
                    strOrgId = item.ORG_ID;
                    strShiftToId = item.SHIPTO_ID;
                    foreach (var item1 in lstSQLBUnits)
                    {
                        if (orgGroupID == "All")
                        {                          
                            if (item1.ORG_ID == strOrgId && item1.SHIPTO_ID == strShiftToId)
                            {
                                item.CHK_VALUE = 1;
                                item.CHK_ALLOCATED = 1;
                            }
                        }
                        else
                        {
                            if (item1.ORG_GROUP_ID.ToUpper() == orgGroupID.ToUpper() && item1.ORG_ID == strOrgId && item1.SHIPTO_ID == strShiftToId)
                            {
                                item.CHK_VALUE = 1;
                                item.CHK_ALLOCATED = 1;
                            }
                        }
                      }
                   }                          
                 response.DataList = lstERPBUnits.OrderByDescending(x => x.CHK_VALUE == 1).ToList();
                 response.AtParSuccess();
                 return response;                
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        private string PrepareXmlForFetchingBunits(string[] bArray, string bUnit, string description)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string strXML = string.Empty;

            try
            {

                sbSql.Append("<ROOT>");

                for (int i = 0; i <= bArray.Count() - 1; i++)
                {
                    strXML = strXML + "<RECORD>" + bArray[i] + "</RECORD>";
                }

                sbSql.Append("<BUSINESS_UNIT>" + strXML + "</BUSINESS_UNIT>");

                if (!string.IsNullOrEmpty(bUnit))
                {
                    sbSql.Append("<BUSINESSUNIT>" + bUnit + "</BUSINESSUNIT>");
                }

                if (!string.IsNullOrEmpty(description))
                {
                    sbSql.Append("<DESCR>" + description + "</DESCR>");
                }

                sbSql.Append("<FLD_ORDER_BY></FLD_ORDER_BY><ORDER_BY_ORDER></ORDER_BY_ORDER>");
                sbSql.Append("</ROOT>");

                return sbSql.ToString();

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }

        }

        private Tuple<long, List<MT_DELV_SHIPTO_ID_ALLOCATION>> GetERPShiptoIDs(string serverUserID, string[] businessUnitsArray, string[] objToken)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
                
            long StatusCode = -1;
            DataSet dsOutPut = new DataSet();
            Tuple<long, List<MT_DELV_SHIPTO_ID_ALLOCATION>> tupleOutput = null;
            List<MT_DELV_SHIPTO_ID_ALLOCATION> lstERPShiptoIDs = new List<MT_DELV_SHIPTO_ID_ALLOCATION>();

            try
            {
                string strXmlOutputStr = string.Empty;
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

                    tupleOutput = new Tuple<long, List<MT_DELV_SHIPTO_ID_ALLOCATION>>(AtparStatusCodes.E_SERVERERROR, null);
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Deliver.ToString() + "_" + erpObjName;
                }

                className = "GetShipToIDs";
                methodName = "GetShipToIDs";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);


                object[] args = { "", "", "", "", "", businessUnitsArray, dsOutPut, serverUserID, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<long, List<MT_DELV_SHIPTO_ID_ALLOCATION>>(StatusCode, null);
                    return tupleOutput;
                }

                dsOutPut = (DataSet)args[6];

                if (dsOutPut.Tables[0].Rows.Count > 0)
                {
                    // to do SETCNTRLVALUE mapped to BUSINESS_UNIT is it correct or not?
                    lstERPShiptoIDs = (from DataRow dr in dsOutPut.Tables[0].Rows
                                       select new MT_DELV_SHIPTO_ID_ALLOCATION()
                                       {
                                           ORG_ID = dr["ORG_ID"].ToString(),
                                           SHIPTO_ID = dr["SHIPTO_ID"].ToString(),
                                           DESCR = dr["DESCR"].ToString(),
                                           //EFF_STATUS = dr["EFF_STATUS"].ToString()
                                       }).ToList();


                    tupleOutput = new Tuple<long, List<MT_DELV_SHIPTO_ID_ALLOCATION>>(AtparStatusCodes.ATPAR_OK, lstERPShiptoIDs);
                    return tupleOutput;
                }
                else
                {
                    tupleOutput = new Tuple<long, List<MT_DELV_SHIPTO_ID_ALLOCATION>>(AtparStatusCodes.E_NORECORDFOUND, null);
                    return tupleOutput;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, List<MT_DELV_SHIPTO_ID_ALLOCATION>>(AtparStatusCodes.E_SERVERERROR, null);
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

        #endregion

        #region Allocate ShiptoIDs

        public AtParWebApiResponse<MT_DELV_SHIPTO_ID_ALLOCATION> AllocateShiptoIDs(string serverUserID, List<MT_DELV_SHIPTO_ID_ALLOCATION> lstShiptoIDs)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            var response = new AtParWebApiResponse<MT_DELV_SHIPTO_ID_ALLOCATION>();

            try
            {
                StatusCode = _Repo.ProcessShiptoIDs(lstShiptoIDs);

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
        #endregion
    }
}
