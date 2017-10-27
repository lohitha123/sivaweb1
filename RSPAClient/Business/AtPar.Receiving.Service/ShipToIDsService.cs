using AtPar.Service.Interfaces.Receiving;
using System;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.Repository.Interfaces.Receiving;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.ViewModel;
using System.Reflection;
using System.Collections.Generic;
using System.Linq;
using AtPar_BusinessRules;
using System.Data;

namespace AtPar.Receiving.Service
{
    public class ShipToIDsService : IShipToIDsService
    {
        IShipToIDsRepository _shipToIDsRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ShipToIDsService(IShipToIDsRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _shipToIDsRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ShipToIDsService));
        }

        public AtParWebApiResponse<VM_RECV_SETUPSHIPTO_ID_ALLOCATION> GetShipToIDs(string userID, string setID, string shipToID, string shipToName,
            string status, string[] businessUnits, string serverUserID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            var response = new AtParWebApiResponse<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>();

            List<VM_RECV_SETUPSHIPTO_ID_ALLOCATION> lstERPShipToIds = new List<VM_RECV_SETUPSHIPTO_ID_ALLOCATION>();

            try
            {

                Tuple<long, DataSet> tupleResult = GetERPShipToIDs(userID, setID, shipToID, shipToName, status, businessUnits, serverUserID, deviceTokenEntry);

                if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                DataSet dsERPShipTpIDs = (DataSet)tupleResult.Item2;
                if(!dsERPShipTpIDs.Tables[0].Columns.Contains("CURRENTSTATUS"))
                {
                    dsERPShipTpIDs.Tables[0].Columns.Add("CURRENTSTATUS");
                }
                if (!dsERPShipTpIDs.Tables[0].Columns.Contains("ACTIVESTATUS"))
                {
                    dsERPShipTpIDs.Tables[0].Columns.Add("ACTIVESTATUS");
                }
                if (!dsERPShipTpIDs.Tables[0].Columns.Contains("ADDRESS_1"))
                {
                    dsERPShipTpIDs.Tables[0].Columns.Add("ADDRESS_1");
                }
                if (!dsERPShipTpIDs.Tables[0].Columns.Contains("CITY"))
                {
                    dsERPShipTpIDs.Tables[0].Columns.Add("CITY");
                }
                if (!dsERPShipTpIDs.Tables[0].Columns.Contains("STATE"))
                {
                    dsERPShipTpIDs.Tables[0].Columns.Add("STATE");
                }
                if (!dsERPShipTpIDs.Tables[0].Columns.Contains("ZIP"))
                {
                    dsERPShipTpIDs.Tables[0].Columns.Add("ZIP");
                }
                if (!dsERPShipTpIDs.Tables[0].Columns.Contains("PHONE_NO"))
                {
                    dsERPShipTpIDs.Tables[0].Columns.Add("PHONE_NO");
                }
                if (!dsERPShipTpIDs.Tables[0].Columns.Contains("ATTENTION_TO"))
                {
                    dsERPShipTpIDs.Tables[0].Columns.Add("ATTENTION_TO");
                }
                if (!dsERPShipTpIDs.Tables[0].Columns.Contains("COMMENTS"))
                {
                    dsERPShipTpIDs.Tables[0].Columns.Add("COMMENTS");
                }
                int i = 0;
                lstERPShipToIds = (from DataRow dr in dsERPShipTpIDs.Tables[0].Rows
                                   select new VM_RECV_SETUPSHIPTO_ID_ALLOCATION()
                                   {
                                       SHIPTO_ID = dr["SHIPTO_ID"].ToString(),
                                       SETID = dr["ORG_ID"].ToString(),
                                       EFF_STATUS = dr["EFF_STATUS"].ToString(),
                                       DESCR = dr["DESCR"].ToString(),
                                       USER_ID = string.Empty,
                                       ORG_ID=dr["ORG_ID"].ToString(),
                                       CURRENTSTATUS = dr["CURRENTSTATUS"].ToString(),
                                       ACTIVESTATUS = dr["ACTIVESTATUS"].ToString(),
                                       ADDRESS_1 = dr["ADDRESS_1"].ToString(),
                                       CITY = dr["CITY"].ToString(),
                                       STATE = dr["STATE"].ToString(),
                                       ZIP= dr["ZIP"].ToString(),
                                       PHONE_NO = dr["PHONE_NO"].ToString(),
                                       ATTENTION_TO = dr["ATTENTION_TO"].ToString(),
                                       COMMENTS = dr["COMMENTS"].ToString(),
                                       ROWINDEX = i++
                                   }).ToList();

                List<MT_RECV_SHIPTO_ID_ALLOCATION> lstSqlShipToIds = _shipToIDsRepo.GetLocalDbShipToIds();



                if (lstSqlShipToIds == null || (lstSqlShipToIds != null && lstSqlShipToIds.Count() == 0))
                {
                    lstERPShipToIds.ForEach(x =>
                    {
                        x.CHK_VALUE = 0;
                        x.CHK_ALLOCATED = 0;
                    });

                }
                else if (lstSqlShipToIds.Count() > 0)
                {
                    foreach (var sqlItem in lstSqlShipToIds)
                    {
                        foreach (var erpItem in lstERPShipToIds)
                        {
                            if (erpItem.SHIPTO_ID == sqlItem.SHIPTO_ID && erpItem.SETID == sqlItem.SETID)
                            {
                                erpItem.USER_ID += string.IsNullOrEmpty(erpItem.USER_ID) ? sqlItem.USERNAME : "," + sqlItem.USERNAME;

                                if ((sqlItem.USER_ID) == userID)
                                {
                                    erpItem.CHK_VALUE = 1;
                                    erpItem.CHK_ALLOCATED = 1;
                                }
                            }
                        }
                    }
                }

                lstERPShipToIds.ToList().Select((x, idx) => { x.ROWINDEX = idx; return x; });
                response.DataList = lstERPShipToIds.OrderByDescending(x => x.CHK_VALUE == 1).ToList();
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        private Tuple<long, DataSet> GetERPShipToIDs(string userID, string setID, string shipToID, string shipToName, string status, string[] businessUnits, string serverUserID, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            DataSet DsPSShipToIDs = new DataSet();
            Tuple<long, DataSet> tupleOutput = null;

            try
            {
                setID = setID.HandleNull();
                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;
                //string Status = "true";
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
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }

                    tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, new DataSet());
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;
                }

                className = "GetShipToIDs";
                methodName = "GetShipToIDs";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { userID, setID , shipToID, shipToName, status, businessUnits, DsPSShipToIDs, serverUserID, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPShipToIDs getting failed from ERP")); }
                    tupleOutput = new Tuple<long, DataSet>(StatusCode, DsPSShipToIDs);
                    return tupleOutput;
                }

                StatusCode = AtparStatusCodes.ATPAR_OK;
                DataSet outDs = (DataSet)args[6];

                if(!outDs.Tables[0].Columns.Contains("EFF_STATUS"))
                {
                    outDs.Tables[0].Columns.Add("EFF_STATUS");
                }                

                tupleOutput = new Tuple<long, DataSet>(StatusCode, outDs);
                return tupleOutput;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, new DataSet());
                return tupleOutput;
            }
        }
        public AtParWebApiResponse<long> UpdateShiptoIDStatus(string userID, string orgID, string shipToID, Boolean status, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            //DataSet DsPSShipToIDs = new DataSet();
            //Tuple<long, DataSet> tupleOutput = null;

            var response = new AtParWebApiResponse<long>();

            try
            {
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
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }

                    //tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, new DataSet());
                    //return tupleOutput;
                    // return AtparStatusCodes.E_SERVERERROR;
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;
                }

                className = "SetUpShipToIDs";
                methodName = "UpdateShiptoIDStatus";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { userID, orgID, shipToID, status, deviceTokenEntry };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if(StatusCode == AtparStatusCodes.RECV_CNCT_UPDATE_ORGID_SHIPTOID)
                {
                    response.AtParNotOK(AtparStatusCodes.RECV_CNCT_INACTIVE_SHIPTOID, _commonRepo, _log);
                    return response;
                }
                else if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                //tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, new DataSet());
                //return tupleOutput;
                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> InsertShiptoIDs(string userID, List<VM_RECV_SETUPSHIPTO_ID_ALLOCATION> lstShiptoids, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            //DataSet DsPSShipToIDs = new DataSet();
            //Tuple<long, DataSet> tupleOutput = null;

            var response = new AtParWebApiResponse<long>();
            DataSet Shiptoids = new DataSet();

            try
            {
                DataTable itemAttributesDt = lstShiptoids.ToDataTable();
                Shiptoids.Tables.Add(itemAttributesDt);

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
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }

                    //tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, new DataSet());
                    //return tupleOutput;
                    // return AtparStatusCodes.E_SERVERERROR;
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;
                }

                className = "SetUpShipToIDs";
                methodName = "InsertShiptoIDs";

                //DataSet ds = new DataSet();
                //var obj1 = new Receiving_FileInterface.GetShipToIDs();
                //obj1.GetShipToIDs("", "", "", "", "", deviceTokenEntry, ref ds, null, deviceTokenEntry);

                //var obj = new Receiving_FileInterface.SetUpShipToIDs();
                //obj.InsertShiptoIDs(userID, Shiptoids, deviceTokenEntry);

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { userID, Shiptoids, deviceTokenEntry };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));
                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                var hoi = ex.InnerException;
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                //tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, new DataSet());
                //return tupleOutput;
                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> UpdateShiptoIDs(string userID, List<VM_RECV_SETUPSHIPTO_ID_ALLOCATION> lstShiptoids, string NewOrgId, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            //DataSet DsPSShipToIDs = new DataSet();
            //Tuple<long, DataSet> tupleOutput = null;

            var response = new AtParWebApiResponse<long>();
            DataSet Shiptoids = new DataSet();
            try
            {
                DataTable itemAttributesDt = lstShiptoids.ToDataTable();
                Shiptoids.Tables.Add(itemAttributesDt);

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
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }

                    //tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, new DataSet());
                    //return tupleOutput;
                    // return AtparStatusCodes.E_SERVERERROR;
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;
                }

                className = "SetUpShipToIDs";
                methodName = "UpdateShiptoIDs";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { userID, Shiptoids, NewOrgId, deviceTokenEntry };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));
                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                //tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, new DataSet());
                //return tupleOutput;
                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                return response;
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

        public AtParWebApiResponse<long> AllocateShipTOIDs(string userID, string serverUserID, bool searched, List<MT_RECV_SHIPTO_ID_ALLOCATION> lstShiptoIDs)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = AtparStatusCodes.ATPAR_OK;

            try
            {                

                int count = _shipToIDsRepo.IsDefaultShiptoIDUnAllocated(userID, lstShiptoIDs);

                if (count > 0)
                {
                    response.DataVariable = count;
                    response.AtParSuccess();
                    return response;
                }

                if (searched)
                {
                    StatusCode = _shipToIDsRepo.AllocateShipTOIDsSelected(userID, lstShiptoIDs);
                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
                }
                else
                {
                    StatusCode = _shipToIDsRepo.AllocateShipTOIDsAll(userID, serverUserID, lstShiptoIDs);
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
