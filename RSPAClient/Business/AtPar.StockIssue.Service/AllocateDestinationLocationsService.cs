using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.StockIssue;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.StockIssue;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;

namespace AtPar.StockIssue.Service
{
    public class AllocateDestinationLocationsService : IAllocateDestinationLocationsService
    {
        private ILog _log;
        private IAllocateDestinationLocationsRepository _repo;
        private ICommonService _commonService;
        private ICommonRepository _commonRepo;
        public AllocateDestinationLocationsService(ILog log, IAllocateDestinationLocationsRepository repo,
            ICommonService commonService, ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonService = commonService;
            _commonRepo = commonRepo;
        }

        #region GetDestinationLocations
        public AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION> GetDestinationLocations(string[] businessUnitsArray, string location, string userID,
            string orgGroupID, string serverUserID, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION>();
            DataSet dsLocations = null;
            List<MT_STIS_DEST_LOC_ALLOCATION> lstERPLocations = new List<MT_STIS_DEST_LOC_ALLOCATION>();

            try
            {
                if (businessUnitsArray.Length == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                if(businessUnitsArray[0] == "undefined")
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                Tuple<long, DataSet> tupleResult = GetERPLocations(userID, orgGroupID, businessUnitsArray, location, deviceTokenEntry);


                if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tupleResult.Item1, _commonRepo, _log);
                    return response;
                }


                dsLocations = (DataSet)tupleResult.Item2;

                lstERPLocations = (from DataRow dr in dsLocations.Tables[0].Rows
                                   select new MT_STIS_DEST_LOC_ALLOCATION()
                                   {
                                       BUSINESS_UNIT = dr["BUSINESS_UNIT"].ToString(),
                                       LOCATION_ID = dr["LOCATION"].ToString(),
                                       LOCATION_DESC = dr["DESCR"].ToString(),
                                       CHK_VALUE = 0,
                                       USER_ID = string.Empty,
                                       ROWINDEX = 0,
                                       CHK_ALLOCATED = 0
                                   }).ToList();


                List<MT_STIS_DEST_LOC_ALLOCATION> lstSQLBUnits = _repo.GetDestinationLocations();


                if (lstSQLBUnits != null && lstSQLBUnits.Count() == 0)
                {

                    lstERPLocations.ForEach(x =>
                    {
                        x.CHK_VALUE = 0;
                        x.CHK_ALLOCATED = 0;
                    });

                }
                else if (lstSQLBUnits != null && lstSQLBUnits.Count() > 0)
                {
                    foreach (var item in lstSQLBUnits)
                    {
                        var isExists = lstERPLocations.Where(c => c.BUSINESS_UNIT == item.BUSINESS_UNIT && c.LOCATION_ID == item.LOCATION_ID).FirstOrDefault();

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

                lstERPLocations.Select((x, idx) => { x.ROWINDEX = idx; return x; });
                response.DataList = lstERPLocations.OrderByDescending(x => x.CHK_VALUE == 1).ToList();
                response.AtParSuccess();

                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        private Tuple<long, DataSet> GetERPLocations(string userID, string orgGroupID, string[] bArray, string location, string[] objToken)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            string outputDataset = string.Empty;
            Tuple<long, DataSet> tupleOutput = null;

            try
            {

                DataSet dsLocations = new DataSet();
                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;
                string bUnits = string.Empty;


                foreach (var item in bArray)
                {
                    bUnits += string.IsNullOrEmpty(bUnits) ? item : "','" + item;
                }

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
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1}:", methodBaseName, "Remote Object Failed")); }

                    tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.StockIssue.ToString() + "_" + erpObjName;
                }

                className = "GetDestLocations";
                methodName = "GetDestLocations";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);


                object[] args = { userID, orgGroupID, bUnits, dsLocations, location, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1}  :", methodBaseName, "GetDestLocations getting failed from ERP")); }
                    tupleOutput = new Tuple<long, DataSet>(StatusCode, null);
                    return tupleOutput;
                }

                dsLocations = (DataSet)args[3];

                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, dsLocations);
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

        #endregion

        #region GetAllocInvBUnits


        public AtParWebApiResponse<string> GetAllocInvBUnits(int appID, string userID, string orgGrpID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var responseUsers = new AtParWebApiResponse<MT_ATPAR_USER>();
            var response = new AtParWebApiResponse<string>();
            string userList = string.Empty;

            try
            {
                responseUsers = _commonService.GetUsersList(userID, appID.ToString(), orgGrpID, deviceTokenEntry);

                if (responseUsers.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(responseUsers.StatusCode, _commonRepo, _log);
                    return response;
                }


                userList = string.Format("'{0}'", string.Join("','", responseUsers.DataList.Select(c => c.USER_ID)));

                response.DataList = _repo.GetDistinctBusinessUnits(appID, userList);

                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, _commonRepo, _log);
                    return response;
                }
                else
                {
                    response.AtParSuccess();
                    return response;
                }

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION> AllocatedDestLocations(string userID, string selectedUserID, List<MT_STIS_DEST_LOC_ALLOCATION> lstLocations, bool searched, string bUnit, params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            var response = new AtParWebApiResponse<MT_STIS_DEST_LOC_ALLOCATION>();
            try
            {
                if (searched)
                {
                    StatusCode = _repo.ProcessDestLocations(lstLocations, selectedUserID, userID);
                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
                }
                else if (!searched)
                {
                    StatusCode = _repo.ProcessSelectedLocations(lstLocations, bUnit, selectedUserID, userID);
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
