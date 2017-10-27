using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.Init;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;

namespace AtPar.Init.Service
{
    public class SetupStorageLocationGroupsService : ISetupStorageLocationGroupsService
    {
        private ILog _log;
        private ICommonRepository _commonRepo;
        private ISetupStorageLocationGroupsRepository _repo;
        private ICommonService _commonService;
        string CONST_ATPAR = "Atpar";
        public SetupStorageLocationGroupsService(ILog log, ISetupStorageLocationGroupsRepository repo, ICommonRepository commonRepo, ICommonService commonService)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
            _commonService = commonService;
            _log.SetLoggerType(typeof(SetupStorageLocationGroupsService));
        }

        #region GetZoneStorageLevelDetails
        /// <summary>
        /// Getting Zone Storage Level Details
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="zoneGroupID"></param>
        /// <param name="bUnit"></param>
        /// <param name="area"></param>
        /// <param name="userID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_ZONE_STORAGE_LEVELS> GetZoneStorageLevelDetails(string orgGroupID, string zoneGroupID, string bUnit, string area, string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataTable pickHeaderDt, pickBusinessUnits, pickPreReqData;
            DataSet inputParameters = new DataSet();
            DataRow drBusinessUnit;
            int bUnitCount = 0;
            string erpObjectName = string.Empty;
            var response = new AtParWebApiResponse<string>();
            var response1 = new AtParWebApiResponse<MT_ATPAR_ZONE_STORAGE_LEVELS>();
            List<MT_ATPAR_ZONE_STORAGE_LEVELS> lstLocationsAllocated = new List<MT_ATPAR_ZONE_STORAGE_LEVELS>();
            List<MT_ATPAR_ZONE_STORAGE_LEVELS> lstStorageLevels = new List<MT_ATPAR_ZONE_STORAGE_LEVELS>();
            if (string.IsNullOrEmpty(bUnit))
            {
                bUnit = "";
            }

            if (string.IsNullOrEmpty(area))
            {
                area = "";
            }

            try
            {
                bUnitCount = _repo.GetBusinessUnitCount(orgGroupID, bUnit);
            }
            catch (Exception ex)
            {
                response1.StatType = AtParWebEnums.StatusType.Error;
                response1.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                response1.ExceptionMessage = ex.ToString();
                return response1;
            }

            if (bUnitCount > 0)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "Business Unit is Assigned")); }
            }
            else
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "Business Unit is not Assigned")); }
                response1.AtParNotOK(AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS, _commonRepo, _log);
                return response1;
            }

            try
            {
                pickHeaderDt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Pick_Header_Defns,
                                              AtParWebEnums.DataSet_Type.HEADERS.ToString());

                pickBusinessUnits = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_BusinessUnits_Defns,
                                   AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString());

                pickPreReqData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Params_Defns,
                                   AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                DataRow drHeader = pickHeaderDt.NewRow();

                drHeader[(int)(AtParWebEnums.Get_Pick_Header_Enum.BUSINESS_UNIT)] = bUnit;
                drHeader[(int)(AtParWebEnums.Get_Pick_Header_Enum.LOCATIONNAME)] = area;
                drHeader[(int)(AtParWebEnums.Get_Pick_Header_Enum.STATUS)] = 1;

                pickHeaderDt.Rows.Add(drHeader);

                DataRow drPreReq = pickPreReqData.NewRow();

                drPreReq[(int)(AtParWebEnums.Get_Pick_Header_PreReqData_Enum.REMOTE_SCHEMA)] = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                drPreReq[(int)(AtParWebEnums.Get_Pick_Header_PreReqData_Enum.REMOTE_DB_TYPE)] = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                pickPreReqData.Rows.Add(drPreReq);

                inputParameters.Tables.Add(pickHeaderDt);

                inputParameters.Tables.Add(pickPreReqData);

                response = _commonService.GetBusinessUnits(userID, AtParWebEnums.BusinessType.AllBunits.ToString());


                if (response.StatusCode == AtparStatusCodes.E_NORECORDFOUND)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "No Data Found : " + response.StatusCode.ToString())); }
                    response1.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response1;
                }
                else if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "Failed to fetch the data with the status code : " + response.StatusCode.ToString())); }
                    response1.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response1;
                }

                IList<string> lstBunits = response.DataList;

                foreach (var item in lstBunits)
                {
                    drBusinessUnit = pickBusinessUnits.NewRow();

                    drBusinessUnit[0] = item;

                    pickBusinessUnits.Rows.Add(drBusinessUnit);
                }

                inputParameters.Tables.Add(pickBusinessUnits);
                inputParameters.AcceptChanges();

                erpObjectName = CONST_ATPAR + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
            }
            catch (Exception ex)
            {
                response1.StatType = AtParWebEnums.StatusType.Error;
                response1.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                response1.ExceptionMessage = ex.ToString();
                return response1;
            }

            var resultTuple = ERPGetZoneStorageLevelDetails(inputParameters, erpObjectName, deviceTokenEntry);

            if (resultTuple.Item1 != AtparStatusCodes.ATPAR_OK)
            {
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Failed in  GetZoneStorageLevelDetails method: " + response.StatusCode.ToString() + ":"); }

                response1.AtParNotOK(resultTuple.Item1, _commonRepo, _log);
                return response1;
            }
            else
            {
                DataSet dsStorageLevels = resultTuple.Item2;

                var dcCol1 = new DataColumn();
                dcCol1.ColumnName = "CHK_VALUE";
                dcCol1.DefaultValue = 0;
                dsStorageLevels.Tables[0].Columns.Add(dcCol1);

                var dcCol3 = new DataColumn();
                dcCol3.ColumnName = "ROWINDEX";
                dcCol3.DefaultValue = 0;
                dsStorageLevels.Tables[0].Columns.Add(dcCol3);

                var dcCol4 = new DataColumn();
                dcCol4.ColumnName = "CHK_ALLOCATED";
                dcCol4.DefaultValue = 0;
                dsStorageLevels.Tables[0].Columns.Add(dcCol4);

                var dcCol5 = new DataColumn();
                dcCol5.ColumnName = "PERFORM_ACTION";
                dcCol5.DefaultValue = 0;
                dsStorageLevels.Tables[0].Columns.Add(dcCol5);

                try
                {
                    lstLocationsAllocated = _repo.GetZoneStorageLevels(zoneGroupID, orgGroupID, bUnit, area);
                }
                catch (Exception ex)
                {
                    response1.StatType = AtParWebEnums.StatusType.Error;
                    response1.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                    response1.ExceptionMessage = ex.ToString();
                    return response1;
                }

                if (lstLocationsAllocated.Count == 0)
                {
                    for (int i = 0; i < dsStorageLevels.Tables[0].Rows.Count - 1; i++)
                    {
                        dsStorageLevels.Tables[0].Rows[i]["CHK_VALUE"] = 0;
                        dsStorageLevels.Tables[0].Rows[i]["CHK_ALLOCATED"] = "0";
                        dsStorageLevels.Tables[0].Rows[i]["PERFORM_ACTION"] = "0";
                    }
                }
                else if (lstLocationsAllocated.Count > 0)
                {
                    for (int i = 0; i <= dsStorageLevels.Tables[0].Rows.Count - 1; i++)
                    {
                        dsStorageLevels.Tables[0].Rows[i]["PERFORM_ACTION"] = "0";

                        foreach (var location in lstLocationsAllocated)
                        {
                            if ((dsStorageLevels.Tables[0].Rows[i]["STORAGE_AREA"].ToString() == location.STORAGE_AREA)
                            && (dsStorageLevels.Tables[0].Rows[i]["STOR_LEVEL_1"].ToString() == location.STOR_LEVEL_1)
                            && (dsStorageLevels.Tables[0].Rows[i]["STOR_LEVEL_2"].ToString() == location.STOR_LEVEL_2)
                            && (dsStorageLevels.Tables[0].Rows[i]["STOR_LEVEL_3"].ToString() == location.STOR_LEVEL_3)
                             && (dsStorageLevels.Tables[0].Rows[i]["STOR_LEVEL_4"].ToString() == location.STOR_LEVEL_4)
                            && (dsStorageLevels.Tables[0].Rows[i]["BUSINESS_UNIT"].ToString() == location.ORG_ID))
                            {
                                if (location.STORAGE_ZONE_ID == zoneGroupID)
                                {
                                    dsStorageLevels.Tables[0].Rows[i]["CHK_VALUE"] = 1;
                                    dsStorageLevels.Tables[0].Rows[i]["CHK_ALLOCATED"] = "1";
                                }
                            }
                        }
                    }
                }

                lstStorageLevels = (from DataRow dr in dsStorageLevels.Tables[0].Rows
                                    select new MT_ATPAR_ZONE_STORAGE_LEVELS()
                                    {
                                        BUSINESS_UNIT = dr["BUSINESS_UNIT"].ToString(),
                                        CHK_ALLOCATED = dr["CHK_ALLOCATED"].ToString(),
                                        CHK_VALUE = int.Parse(dr["CHK_VALUE"].ToString()),
                                        PERFORM_ACTION = dr["PERFORM_ACTION"].ToString(),
                                        ROWINDEX = int.Parse(dr["ROWINDEX"].ToString()),
                                        STORAGE_AREA = dr["STORAGE_AREA"].ToString(),
                                        STOR_LEVEL_1 = dr["STOR_LEVEL_1"].ToString(),
                                        STOR_LEVEL_2 = dr["STOR_LEVEL_2"].ToString(),
                                        STOR_LEVEL_3 = dr["STOR_LEVEL_3"].ToString(),
                                        STOR_LEVEL_4 = dr["STOR_LEVEL_4"].ToString(),
                                    }).ToList();

                lstStorageLevels.Select((x, idx) => { x.ROWINDEX = idx; return x; });
                //response1.DataList = lstStorageLevels.OrderByDescending(x => x.CHK_VALUE == 1).ToList();
                response1.DataList = lstStorageLevels.OrderByDescending(x => x.CHK_VALUE).ToList();
                response1.AtParSuccess();
                return response1;
            }
        }

        /// <summary>
        /// Getting Data From ERP
        /// </summary>
        /// <param name="inputParameters"></param>
        /// <param name="erpObjectName"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        private Tuple<long, dynamic> ERPGetZoneStorageLevelDetails(DataSet inputParameters, string erpObjectName, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;

            try
            {
                //GetConfigData();
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;
                DataSet outputParameters = new DataSet();

                className = "GetStorageLevels";
                methodName = "GetStorageLevels";

                MethodName = Utils.CreateERPObjectInstance(erpObjectName, className, methodName, out reflectObject);

                object[] args = { inputParameters, outputParameters, deviceTokenEntry };

                statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "ERPGetZoneStorageLevelDetails getting failed from ERP")); }

                    return new Tuple<long, dynamic>(statusCode, null);
                }

                DataSet dsStorageLevels = (DataSet)args[1];

                return new Tuple<long, dynamic>(AtparStatusCodes.ATPAR_OK, dsStorageLevels);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                return new Tuple<long, dynamic>(AtparStatusCodes.E_SERVERERROR, null);
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

        #region InsertStorageZoneGroups
        /// <summary>
        /// Inserting Storage Zone Groups
        /// </summary>
        /// <param name="zoneID"></param>
        /// <param name="zoneDescr"></param>
        /// <param name="userID"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> InsertStorageZoneGroups(string zoneID, string zoneDescr, string userID, string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                var count = _repo.GetStorageZoneCount(zoneID, orgID);

                if (count > 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCGRPIDALREADYEXISTS, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCGRPIDALREADYEXISTS);
                return response;
            }

            try
            {
                var count = _repo.InsertStorageZone(orgID, zoneID, zoneDescr, userID);
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

        #region GetStorageZoneGroups
        /// <summary>
        /// Getting Storage Zone Groups
        /// </summary>
        /// <param name="zoneGrpID"></param>
        /// <param name="zoneGrpDescr"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE> GetStorageZoneGroups(string zoneGrpID, string zoneGrpDescr, string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE>();

            try
            {
                response.DataList = _repo.GetStorageZoneGroups(zoneGrpID, zoneGrpDescr, orgID);

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

        #region UpdateZones
        /// <summary>
        /// Updating Zones
        /// </summary>
        /// <param name="zoneID"></param>
        /// <param name="zoneDescr"></param>
        /// <param name="status"></param>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateZones(string zoneID, string zoneDescr, int status, string orgGrpID)
        {
            var response = new AtParWebApiResponse<long>();
            long statusCode = 0;

            try
            {
                statusCode = _repo.UpdateZones(zoneID, zoneDescr, status, orgGrpID);

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL, _commonRepo, _log);
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

        #region InsertzoneStorageLevels
        public AtParWebApiResponse<long> InsertzoneStorageLevels(string userID, string orgGroupID, string zoneGroupID, List<MT_ATPAR_ZONE_STORAGE_LEVELS> lstZoneStorageLevels)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long statusCode = _repo.InsertzoneStorageLevels(userID, orgGroupID, zoneGroupID, lstZoneStorageLevels);

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


    }
}

