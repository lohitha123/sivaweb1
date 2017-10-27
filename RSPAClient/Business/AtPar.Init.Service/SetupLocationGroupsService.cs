using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace AtPar.Init.Service
{
    public class SetupLocationGroupsService : ISetupLocationGroupsService
    {
        private ILog _log;
        private ISetupLocationGroupsRepository _repo;
        private ICommonRepository _commonRepo;
        private ICommonService _commonService;
        private string CONST_ATPAR = "Atpar";
        public SetupLocationGroupsService(ILog log, ISetupLocationGroupsRepository repo, ICommonRepository commonRepo, ICommonService commonService)
        {
            _repo = repo;
            _log = log;
            _commonRepo = commonRepo;
            _commonService = commonService;
            _log.SetLoggerType(typeof(SetupLocationGroupsService));
        }
        #region InsertLocationGroups
        /// <summary>
        /// Inserting Location Groups
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="groupID"></param>
        /// <param name="groupDescr"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> InsertLocationGroups(string orgID, string groupID, string groupDescr, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                var count = _repo.GetLocGroupsCount(orgID, groupID);

                if (count > 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCGROUPALREADYEXISTS, _commonRepo, _log, groupID, orgID );
                    return response;
                }
                _repo.InsertLocGroups(orgID, groupID, groupDescr, userID);
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL);
                return response;
            }

            response.AtParSuccess();
            return response;
        }
        #endregion

        #region UpdateLocationGroups
        /// <summary>
        /// Updating Location Groups
        /// </summary>
        /// <param name="status"></param>
        /// <param name="locGrpID"></param>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateLocationGroups(int status, string locGrpID, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                var count = _repo.GetLocGroupAllocationCount(locGrpID, orgGrpID);

                if (count > 0 && status == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_CANNOTUPDATESTATUS, _commonRepo, _log);
                    return response;
                }
                _repo.UpdateLocGroups(status, locGrpID, orgGrpID);
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL);
                return response;
            }

            response.AtParSuccess();
            return response;
        }
        #endregion

        #region GetLocationGroups
        /// <summary>
        /// Getting Location Groups
        /// </summary>
        /// <param name="locGrpID"></param>
        /// <param name="locGrpDescr"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_LOC_GROUPS> GetLocationGroups(string locGrpID, string locGrpDescr, string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_LOC_GROUPS>();

            try
            {
                if (string.IsNullOrEmpty(locGrpID))
                {
                    locGrpID = string.Empty;
                }
                response.DataList = _repo.GetLocationGroups(locGrpID, locGrpDescr, orgID);

                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region InsertLocationDetails
        /// <summary>
        /// Inserting Location Groups
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="locGroupID"></param>
        /// <param name="clientIP"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="userID"></param>
        /// <param name="lstLocGroups"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> InsertLocationDetails(string orgID, string locGroupID, string clientIP, string orgGroupID, string userID, List<VM_MT_ATPAR_SETUP_LOCATIONGROUPS> lstLocGroups)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long statusCode = _repo.InsertLocationDetails(orgID, locGroupID, clientIP, orgGroupID, userID, lstLocGroups);

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
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

        #region GetExcludedLocations
        /// <summary>
        /// Getting Excluded Locations
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<MT_DELV_EXCLUDE_LOC> GetExcludedLocations()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_DELV_EXCLUDE_LOC>();

            try
            {
                response.DataList = _repo.GetExcludedLocations();

                if (response.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion

        #region GetLocationDetails
        public AtParWebApiResponse<VM_MT_ATPAR_LOCATION_DETAILS> GetLocationDetails(string bUnit, string locID, int appID, string userID, string orgGroupID, string locGroupID, string[] deviceTokenEntry)
        {

            string _strSQL = string.Empty;
            long statusCode = -1;
            string erpObjName = string.Empty;
            string remoteSchema = null;
            dynamic inputParameters = new DataSet();
            DataSet outputParameters = new DataSet();
            dynamic pickHeaderDt = new DataTable();
            dynamic pickBusinessUnits = new DataTable();
            DataTable pickPreReqData = new DataTable();
            DataSet dsLocations = new DataSet();
            DataRow drHeader = default(DataRow);
            DataRow drPreReq = default(DataRow);
            DataRow drBusinessUnit = default(DataRow);
            DataSet dsBunits = new DataSet();
            string cartsManagedInAtPar = string.Empty;
            var response = new AtParWebApiResponse<VM_MT_ATPAR_LOCATION_DETAILS>();
            var response1 = new AtParWebApiResponse<string>();
            var lstLocationDetails = new List<VM_MT_ATPAR_LOCATION_DETAILS>();


            if(locID!=null)locID = locID.Trim();
            if (locID == null)
            {
                locID = "";
            }

            locID = locID.ToUpper();

            int bUnitCount = 0;
            try
            {
                bUnitCount = _repo.GetBUnitCount(orgGroupID, bUnit);
                if (bUnitCount == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }

            //To Create Header table for inputParameters dataset
            try
            {
                pickHeaderDt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Pick_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                pickBusinessUnits = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_BusinessUnits_Defns, AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());

                pickPreReqData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Params_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }

            List<string> lstParameters = new List<string>
            {
                AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString(),
                AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString(),
                AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString()
            };

            var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

            remoteSchema = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

            drHeader = pickHeaderDt.NewRow();

            drHeader[(int)AtParWebEnums.Get_Pick_Header_Enum.BUSINESS_UNIT] = bUnit;
            drHeader[(int)AtParWebEnums.Get_Pick_Header_Enum.SET_ID] = string.Empty;
            drHeader[(int)AtParWebEnums.Get_Pick_Header_Enum.LOCATION] = locID;
            drHeader[(int)AtParWebEnums.Get_Pick_Header_Enum.LOCATIONNAME] = string.Empty;
            drHeader[(int)AtParWebEnums.Get_Pick_Header_Enum.STATUS] = 1;


            pickHeaderDt.Rows.Add(drHeader);
            drPreReq = pickPreReqData.NewRow();

            var rschema = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

            drPreReq[(int)AtParWebEnums.Get_Pick_Header_PreReqData_Enum.REMOTE_SCHEMA] = rschema;

            var remoteDbType = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

            erpObjName = CONST_ATPAR + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

            drPreReq[(int)AtParWebEnums.Get_Pick_Header_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDbType;
            pickPreReqData.Rows.Add(drPreReq);

            inputParameters.Tables.Add(pickHeaderDt);

            inputParameters.Tables.Add(pickPreReqData);

            try
            {
                response1 = _commonService.GetBusinessUnits(userID, AtParWebEnums.BusinessType.AllBunits.ToString());

                if (response1.DataList.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }

            foreach (var item in response1.DataList)
            {
                drBusinessUnit = pickBusinessUnits.NewRow();

                drBusinessUnit[0] = item;

                pickBusinessUnits.Rows.Add(drBusinessUnit);
            }

            inputParameters.Tables.Add(pickBusinessUnits);
            inputParameters.AcceptChanges();
            //For ParManagement Installation check

            //ERP call
            string _strERPType = string.Empty;

            try
            {
                var resultTuple = ERPGetLocations(erpObjName, inputParameters, outputParameters, dsLocations, deviceTokenEntry);
                dsLocations = resultTuple.Item2;
                statusCode = resultTuple.Item1;

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (statusCode == AtparStatusCodes.E_REMOTEERROR)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    }
                    else
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                    }
                    return response;

                }



            }


            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }

            DataColumn dcCol1 = new DataColumn();
            dcCol1.ColumnName = "CHK_VALUE";
            dcCol1.DefaultValue = 0;
            dsLocations.Tables[0].Columns.Add(dcCol1);

            //ROWINDEX column is added to track down selected locations on the web screen,particularly useful when paging is applied
            DataColumn dcCol3 = new DataColumn();
            dcCol3.ColumnName = "ROWINDEX";
            dcCol3.DefaultValue = 0;
            dsLocations.Tables[0].Columns.Add(dcCol3);

            DataColumn dcCol4 = new DataColumn();
            dcCol4.ColumnName = "CHK_ALLOCATED";
            dcCol4.DefaultValue = 0;
            dsLocations.Tables[0].Columns.Add(dcCol4);

            // The value in this column will decide whether the row has to be deleted or added
            DataColumn dcCol5 = new DataColumn();
            dcCol5.ColumnName = "PERFORM_ACTION";
            dcCol5.DefaultValue = 0;
            dsLocations.Tables[0].Columns.Add(dcCol5);

            if (!dsLocations.Tables[0].Columns.Contains("SETID"))
            {
                DataColumn dcCol6 = new DataColumn();
                dcCol6.ColumnName = "SETID";                
                dsLocations.Tables[0].Columns.Add(dcCol6);
            }

            //Getting the data from MT_ATPAR_LOC_GROUP_MEMBERS
            DataSet _dsLocationsAllocated = new DataSet();
            int i = 0;
            int j = 0;

            try
            {
                List<MT_ATPAR_LOC_GROUP_MEMBERS> lstLocGroupMembers = _repo.GetLocGroupMembers(locGroupID, orgGroupID, bUnit, locID);
                DataTable dtLocationAllocated = lstLocGroupMembers.ToDataTable();//Utils.ToDataTable(lstLocGroupMembers);
                _dsLocationsAllocated.Tables.Add(dtLocationAllocated);

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }

            try
            {
                if (_dsLocationsAllocated.Tables[0].Rows.Count == 0)
                {
                    for (i = 0; i <= dsLocations.Tables[0].Rows.Count - 1; i++)
                    {
                        dsLocations.Tables[0].Rows[i]["CHK_VALUE"] = "0";
                        dsLocations.Tables[0].Rows[i]["CHK_ALLOCATED"] = "0";
                        dsLocations.Tables[0].Rows[i]["PERFORM_ACTION"] = "0";
                    }

                }
                else if (_dsLocationsAllocated.Tables[0].Rows.Count > 0)
                {
                    //TODO : Need to remove loops

                    for (j = 0; j <= dsLocations.Tables[0].Rows.Count - 1; j++)
                    {
                        dsLocations.Tables[0].Rows[j]["PERFORM_ACTION"] = "0";

                        for (i = 0; i <= _dsLocationsAllocated.Tables[0].Rows.Count - 1; i++)
                        {
                            if ((dsLocations.Tables[0].Rows[j]["LOCATION"].ToString() == _dsLocationsAllocated.Tables[0].Rows[i]["LOCATION_ID"].ToString()) && (dsLocations.Tables[0].Rows[j]["SETCNTRLVALUE"].ToString() == _dsLocationsAllocated.Tables[0].Rows[i]["ORG_ID"].ToString()) && (dsLocations.Tables[0].Rows[j]["TYPE"].ToString() == _dsLocationsAllocated.Tables[0].Rows[i]["TYPE"].ToString()))
                            {
                                //Checking whether Middle Tire DB UserId Column is same as Selected User Id in the Webpages or not.
                                if (_dsLocationsAllocated.Tables[0].Rows[i]["LOC_GROUP_ID"].ToString() == locGroupID)
                                {
                                    dsLocations.Tables[0].Rows[j]["CHK_VALUE"] = "1";
                                    dsLocations.Tables[0].Rows[j]["CHK_ALLOCATED"] = "1";
                                }
                            }
                        }
                        //for i = 0 To _dsLocationsAllocated.Tables(0).Rows.Count - 1
                    }
                    //for j = 0 To dsLocations.Tables(0).Rows.Count - 1

                }
                var _with1 = dsLocations.Tables[0];
                for (i = 0; i <= _with1.Rows.Count - 1; i++)
                {
                    _with1.Rows[i]["ROWINDEX"] = i;
                }
                _with1.AcceptChanges();

                if (dsLocations.Tables[0].Rows.Count > 0)
                {
                    lstLocationDetails = (from DataRow dr in dsLocations.Tables[0].Rows
                                          select new VM_MT_ATPAR_LOCATION_DETAILS()
                                          {
                                              ADDRESS = dr["ADDRESS1"].ToString(),
                                              DESCR = dr["DESCR"].ToString(),
                                              CHK_ALLOCATED = int.Parse(dr["CHK_ALLOCATED"].ToString()),
                                              LOCATION = dr["LOCATION"].ToString(),
                                              CHK_VALUE = int.Parse(dr["CHK_VALUE"].ToString()),
                                              TYPE = dr["TYPE"].ToString(),
                                              PERFORM_ACTION = dr["PERFORM_ACTION"].ToString(),
                                              SETCNTRLVALUE = dr["SETCNTRLVALUE"].ToString(),
                                              SETID = dr["SETID"].ToString(),
                                              ROWINDEX = dr["ROWINDEX"].ToString()

                                          }).ToList();
                    //lstLocationDetails.Sort=
                    lstLocationDetails = lstLocationDetails.OrderByDescending(x => x.CHK_VALUE).ToList();
                    response.DataList = lstLocationDetails; 
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }

        private Tuple<long, DataSet> ERPGetLocations(string erpObjName, DataSet inputParameters, DataSet outputParameters, DataSet dsLocations, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                //GetConfigData();
                object reflectObject;

                var className = "GetLocations";
                var methodName = "GetLocations";

                var MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, outputParameters, deviceTokenEntry };

                var statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "ERPGetDetails getting failed from ERP")); }
                    return new Tuple<long, DataSet>(statusCode, null);
                }
                dsLocations = (DataSet)args[1];

                return new Tuple<long, DataSet>(statusCode, dsLocations);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }

                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
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
    }
}
