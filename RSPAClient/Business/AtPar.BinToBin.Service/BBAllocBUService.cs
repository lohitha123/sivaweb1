using System;
using System.Collections.Generic;
using System.Linq;
using log4net;
using AtPar.POCOEntities;
using AtPar.Common;
using System.Reflection;
using System.Xml.Linq;
using AtPar.ViewModel;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar_BusinessRules;
using System.Data;
using AtPar.Service.Interfaces.BinToBin;

namespace AtPar.BinToBin.Service
{
    public class BBAllocBUService : IBBAllocBUService
    {
        ILog _log;
        ICommonRepository _commonRepo;

        public BBAllocBUService(ILog log, ICommonRepository commonRepository)
        {
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(BBAllocBUService));
        }

        #region GetBUnits
        public AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION> GetBUnits(string[] businessUnitsArray, string appID, string userID, string bUnit,
                                                       string description, string serverUserID, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_ATPAR_IBU_ALLOCATION>();

            List<VM_ATPAR_IBU_ALLOCATION> lstERPBUnits = new List<VM_ATPAR_IBU_ALLOCATION>();

            try
            {
                if (businessUnitsArray.Length == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                Tuple<long, string> tupleResult = GetERPBUnits(businessUnitsArray, bUnit, description, deviceTokenEntry);


                if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tupleResult.Item1, _commonRepo, _log);
                    return response;
                }

                XElement ERPBUnitsData = XElement.Parse(tupleResult.Item2);

                lstERPBUnits = (from x in ERPBUnitsData.Descendants("Table")
                                select new VM_ATPAR_IBU_ALLOCATION
                                {
                                    INV_LOC_BUSINESS_UNIT = x.Element("INV_LOC_BUSINESS_UNIT") != null ? Convert.ToString(x.Element("INV_LOC_BUSINESS_UNIT").Value) : string.Empty,
                                    BUSINESS_UNIT = Convert.ToString(x.Element("BUSINESS_UNIT").Value) ?? string.Empty,
                                    DESCR = Convert.ToString(x.Element("DESCR").Value) ?? string.Empty,
                                    CHK_VALUE = 0,
                                    USER_ID = string.Empty,
                                    ROWINDEX = 0,
                                    CHK_ALLOCATED = 0
                                }).ToList();


                List<MT_ATPAR_IBU_ALLOCATION> lstSQLBUnits = _commonRepo.GetBUnits(appID);


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


                lstERPBUnits.ToList().Select((x, idx) => { x.ROWINDEX = idx; return x; });
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


        private Tuple<long, string> GetERPBUnits(string[] bArray, string bUnit, string description, string[] objToken)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            string outputDataset = string.Empty;
            Tuple<long, string> tupleOutput = null;

            try
            {

                DataSet dsBUnits = new DataSet();
                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;


                //Initializing 
               // GetConfigData();


                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1}:", methodBaseName, "Remote Object Failed")); }

                    tupleOutput = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, outputDataset);
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.BinToBin.ToString() + "_" + erpObjName;
                }

                className = "GetBUnits";
                methodName = "GetBUnits";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { bArray, dsBUnits, bUnit, description, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1}  :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<long, string>(StatusCode, outputDataset);
                    return tupleOutput;
                }

                dsBUnits = (DataSet)args[1];

                outputDataset = dsBUnits.GetXml();
                tupleOutput = new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, outputDataset);
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

        public AtParWebApiResponse<MT_ATPAR_IBU_ALLOCATION> AllocateBUnits(string appID, string userID, string serverUserID,
               List<VM_ATPAR_IBU_ALLOCATION> lstBUnitsAllocation, bool searched, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            var response = new AtParWebApiResponse<MT_ATPAR_IBU_ALLOCATION>();

            try
            {

                if (searched)
                {
                    StatusCode = _commonRepo.ProcessBUnits(lstBUnitsAllocation, userID, appID, serverUserID);

                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

                }
                else if (!searched)
                {
                    StatusCode = _commonRepo.ProcessSelectedBUnits(lstBUnitsAllocation, userID, appID, serverUserID);

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
