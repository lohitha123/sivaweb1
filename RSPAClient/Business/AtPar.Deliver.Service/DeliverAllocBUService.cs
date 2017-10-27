﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;
using AtPar.Common;
using System.Reflection;
using System.Xml.Linq;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar_BusinessRules;
using AtPar.Repository.Interfaces.Deliver;
using AtPar.POCOEntities;
using System.Data;
using AtPar.Service.Interfaces.Deliver;

namespace AtPar.Deliver.Service
{
    public class DeliverAllocBUService : IDeliverAllocBUService
    {
        IDeliverAllocBURepository _businessUnitsRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public DeliverAllocBUService(IDeliverAllocBURepository repository, ILog log, ICommonRepository commonRepository)
        {
            _businessUnitsRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(DeliverAllocBUService));
        }

        #region GetBUnits
        public AtParWebApiResponse<MT_DELV_BU_ALLOCATION> GetBUnits(string[] businessUnitsArray, string userID, string bUnit,
                                                       string description, string serverUserID, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_DELV_BU_ALLOCATION>();
            string erpObjName = string.Empty;
            string outPutXml = string.Empty;

            List<MT_DELV_BU_ALLOCATION> lstERPBUnits = new List<MT_DELV_BU_ALLOCATION>();
            Tuple<long, string> tupleResult = null;



            try
            {
                if (businessUnitsArray.Length == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                //To Do need to remove this Initializing 
                //GetConfigData();


                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString()
                                                                              && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "Remote Object Failed")); }

                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Deliver.ToString() + "_" + erpObjName;
                }

                string prepareXml = PrepareXmlForFetchingBunits(businessUnitsArray, bUnit, description);
                tupleResult = GetERPBUnits(prepareXml, deviceTokenEntry);


                if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tupleResult.Item1, _commonRepo, _log);
                    return response;
                }

                outPutXml = tupleResult.Item2;

                XElement ERPBUnitsData = XElement.Parse(outPutXml);

                string firstNodeValue = ((XElement)ERPBUnitsData.FirstNode).Name.LocalName;

                lstERPBUnits = (from x in ERPBUnitsData.Descendants(firstNodeValue)
                                select new MT_DELV_BU_ALLOCATION
                                {
                                    INV_LOC_BUSINESS_UNIT = x.Element("INV_LOC_BUSINESS_UNIT") != null ? Convert.ToString(x.Element("INV_LOC_BUSINESS_UNIT").Value) : string.Empty,
                                    BUSINESS_UNIT = Convert.ToString(x.Element("BUSINESS_UNIT").Value) ?? string.Empty,
                                    DESCR = Convert.ToString(x.Element("DESCR").Value) ?? string.Empty,
                                    CHK_VALUE = 0,
                                    USER_ID = string.Empty,
                                    ROWINDEX = 0,
                                    CHK_ALLOCATED = 0
                                }).ToList();


                List<MT_DELV_BU_ALLOCATION> lstSQLBUnits = _businessUnitsRepo.GetBUnits();

                if (lstSQLBUnits != null && lstSQLBUnits.Count() == 0)
                {
                    lstERPBUnits.ForEach(x =>
                    {
                        x.CHK_VALUE = 0;
                        x.CHK_ALLOCATED = 0;
                    });

                }
                else if (lstSQLBUnits != null && lstSQLBUnits.Count() > 0)
                {
                    foreach (var item in lstSQLBUnits)
                    {
                        var isExists = lstERPBUnits.Where(c => c.BUSINESS_UNIT == item.BUSINESS_UNIT).FirstOrDefault();

                        if (isExists != null)
                        {
                            isExists.USER_ID += string.IsNullOrEmpty(isExists.USER_ID) ? item.USERNAME : "," + item.USERNAME;

                            if ((item.USER_ID) == userID)
                            {
                                isExists.CHK_VALUE = 1;
                                isExists.CHK_ALLOCATED = 1;
                            }

                        }
                    }

                }

                lstERPBUnits.Select((x, idx) => { x.ROWINDEX = idx; return x; });
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

        private Tuple<long, string> GetERPBUnits(string inputXml, string[] objToken)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            string outputXml = string.Empty;
            Tuple<long, string> tupleOutput = null;

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


                erpObjName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString()
                                                                              && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();



                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "Remote Object Failed")); }

                    tupleOutput = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, outputXml);
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Deliver.ToString() + "_" + erpObjName;
                }


                className = "GetBUnits";
                methodName = "GetBUnits";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputXml, strXmlOutputStr, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }

                    tupleOutput = new Tuple<long, string>(StatusCode, outputXml);
                    return tupleOutput;
                }

                StatusCode = AtparStatusCodes.ATPAR_OK;
                outputXml = args[1].ToString();

                tupleOutput = new Tuple<long, string>(StatusCode, outputXml);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, string.Empty);
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

        #region AllocateBUnits

        public AtParWebApiResponse<MT_DELV_BU_ALLOCATION> AllocateBUnits(string userId, string serverUserId,
               List<MT_DELV_BU_ALLOCATION> lstbunitsAllocation, bool searched, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            var response = new AtParWebApiResponse<MT_DELV_BU_ALLOCATION>();

            try
            {

                if (searched)
                {
                    StatusCode = _businessUnitsRepo.ProcessBUnits(lstbunitsAllocation, userId, serverUserId);

                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

                }
                else if (!searched)
                {
                    lstbunitsAllocation.RemoveAll(x => x.CHK_VALUE == 0);
                    StatusCode = _businessUnitsRepo.ProcessSelectedBUnits(lstbunitsAllocation, userId, serverUserId);

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
        #endregion

    }
}
