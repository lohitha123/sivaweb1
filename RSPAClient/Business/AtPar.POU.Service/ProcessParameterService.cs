using AtPar.Service.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using System.Data;


namespace AtPar.POU.Service
{
    public class ProcessParameterService : IProcessParameterService
    {
        IProcessParameterRepository _processParameterRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        private ICommonPOUService _commonPOUService;
        public ProcessParameterService(IProcessParameterRepository repository, ILog log, ICommonPOUService commonPOUService,
            ICommonRepository commonRepository)
        {
            _processParameterRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonPOUService = commonPOUService;
            _log.SetLoggerType(typeof(ProcessParameterService));
        }

        public AtParWebApiResponse<long> AssignAlertSchedules(List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> lstCartSchedules, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long statusCode = _processParameterRepo.AssignAlertSchedules(lstCartSchedules, appID, deviceTokenEntry);

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


        public AtParWebApiResponse<long> AssignScheduleToCarts(Dictionary<string, dynamic> dsAssignSchedule, string strBunit, string strUserId, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            try
            {
                long statusCode = _processParameterRepo.AssignScheduleToCarts(dsAssignSchedule, strBunit, strUserId, appID, deviceTokenEntry);

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

        public AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetAllocDepartment(string departmentID, string bUnit, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>();

            long statusCode = -1;
            List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> pouCartWorkAllocationData = null;

            try
            {
                var resultTuple = _processParameterRepo.GetAllocDepartment(departmentID, bUnit, appID, deviceTokenEntry);

                statusCode = resultTuple.Item2;
                pouCartWorkAllocationData = resultTuple.Item1;

                response.DataList = pouCartWorkAllocationData;

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


        public AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetDeptAllocatedCarts(string departmentID, string strUserId,
                                                                             string strBunit, string strCartID, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>();

            List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> pouCartWorkAllocationData = null;
            List<MT_POU_REPLEN_SOURCE_LOCATION> pouReplenSourceLocData = null;
            long statusCode = -1;

            try
            {
                var resultTuple = _processParameterRepo.GetDeptAllocatedCarts(departmentID, strUserId, strBunit, strCartID, appID, deviceTokenEntry);
                resultTuple.Item2.ForEach(x => x.CHK_VALUE = true);
                pouCartWorkAllocationData = resultTuple.Item1;
                pouReplenSourceLocData = resultTuple.Item2;
                statusCode = resultTuple.Item3;

                response.DataDictionary = new Dictionary<string, object> { { "pouCartWorkAllocationList", pouCartWorkAllocationData }, { "pouReplenSourceLocationList", pouReplenSourceLocData } };

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
        public AtParWebApiResponse<MT_POU_PAR_LOC_PROCESS_SCHEDULE> GetCartSchedules(string strBunit, string strCartID, string strUserId,
                                                                                     string procType, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_PAR_LOC_PROCESS_SCHEDULE>();

            List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> pouParLocProcessScheduleData = null;
            List<MT_POU_REPLEN_SOURCE_LOCATION> pouReplenSourceLocData = null;
            long statusCode = -1;

            try
            {
                var resultTuple = _processParameterRepo.GetCartSchedules(strBunit, strCartID, strUserId, procType, appID, deviceTokenEntry);

                resultTuple.Item2.ForEach(x => x.CHK_VALUE = true);
                pouParLocProcessScheduleData = resultTuple.Item1;
                pouReplenSourceLocData = resultTuple.Item2;
                statusCode = resultTuple.Item3;

                response.DataDictionary = new Dictionary<string, object> { { "pouParLocationProcessScheduleList", pouParLocProcessScheduleData }, { "pouReplenSourceLocationList", pouReplenSourceLocData } };

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

        public AtParWebApiResponse<MT_ATPAR_SCHEDULE_HEADER> GetSheduleIDs(string userId, string strOrgGroupID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SCHEDULE_HEADER>();

            try
            {
                response.DataList = _processParameterRepo.GetSheduleIDs(userId, strOrgGroupID, deviceTokenEntry);

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<VM_MT_POU_ASSIGN_LOCATIONS> GetAssignedLocationDetails(string pBUnit, string pLocId, string pLocationOrgId,
                                                                                          string pLocGroupId, string pOrgGrpID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSearch = new StringBuilder();
            var response = new AtParWebApiResponse<VM_MT_POU_ASSIGN_LOCATIONS>();
            DataSet dsAssignLocations;

            string strBu = string.Empty;
            string strLocation = string.Empty;
            string strLocType = string.Empty;

            var dtRet = new DataTable();
            dtRet.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
            dtRet.Columns.Add("M_BUSINESS_UNIT", Type.GetType("System.String"));
            dtRet.Columns.Add("M_LOCATION", Type.GetType("System.String"));
            dtRet.Columns.Add("SOURCE_ORG_ID", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION_DESCR", Type.GetType("System.String"));
            dtRet.Columns.Add("TYPE", Type.GetType("System.String"));
            dtRet.Columns.Add("CHK_ALLOCATED", Type.GetType("System.Int32"));
            dtRet.Columns.Add("CHK_VALUE", Type.GetType("System.Int32"));
            dtRet.Columns.Add("ROWINDEX", Type.GetType("System.Int32"));
            dtRet.Columns.Add("PERFORM_ACTION", Type.GetType("System.Int32"));

            try
            {
                var tupleResult = _commonPOUService.GetCart_Headers(pOrgGrpID, deviceTokenEntry, "P");

                dsAssignLocations = tupleResult.Item2;
                var statusCode = tupleResult.Item1;

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.StatusCode = statusCode;
                    return response;
                }

                if (!string.IsNullOrEmpty(pBUnit))
                {
                    sbSearch.Append("[" + dsAssignLocations.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ColumnName + "] = '" + pBUnit + "' ");
                }
                if (!string.IsNullOrEmpty(pLocId))
                {
                    if (sbSearch.Length > 0)
                    {
                        sbSearch.Append(" AND ");
                    }
                    sbSearch.Append("[" + dsAssignLocations.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ColumnName + "] = '" + pLocId + "' ");
                }

                var dvAssignData = dsAssignLocations.Tables[0].DefaultView;

                if (sbSearch.Length > 0)
                {
                    dvAssignData.RowFilter = sbSearch.ToString();
                    sbSearch.Remove(0, sbSearch.Length);
                }

                if (dvAssignData.ToTable().Rows.Count == 0)
                {
                    response.StatusCode = AtparStatusCodes.E_NORECORDFOUND;
                    return response;
                }

                DataSet dsAssignCarts = new DataSet();
                try
                {
                    List<MT_POU_REPLEN_SOURCE_LOCATION> lstReplenSource = _processParameterRepo.GetAssignedLocationDetails(pLocGroupId, pBUnit, pOrgGrpID, pLocationOrgId);

                    DataTable dtAllocatedCarts = lstReplenSource.ToDataTable();//Utils.ToDataTable(lstReplenSource);
                    dsAssignCarts.Tables.Add(dtAllocatedCarts);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                    return response;
                }

                for (int intCnt = 0; intCnt <= dvAssignData.ToTable().Rows.Count - 1; intCnt++)
                {
                    var retRow = dtRet.NewRow();

                    strBu = dvAssignData.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ToString();
                    strLocation = dvAssignData.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ToString();
                    strLocType = dvAssignData.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE].ToString();

                    retRow["BUSINESS_UNIT"] = strBu;

                    retRow["LOCATION"] = strLocation;
                    retRow["LOCATION_DESCR"] = dvAssignData.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR].ToString();
                    retRow["TYPE"] = dvAssignData.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE].ToString();
                    retRow["ROWINDEX"] = intCnt;
                    var rows = dsAssignCarts.Tables[0].Select("SOURCE_LOCATION = '" + strLocation + "' AND SOURCE_ORG_ID = '" + strBu + "'");


                    if (rows.Length > 0)
                    {
                        retRow["M_BUSINESS_UNIT"] = rows[0]["SOURCE_ORG_ID"];
                        retRow["M_LOCATION"] = rows[0]["SOURCE_LOCATION"];
                        retRow["SOURCE_ORG_ID"] = rows[0]["SOURCE_ORG_ID"];
                        retRow["CHK_ALLOCATED"] = "1";
                        retRow["CHK_VALUE"] = "1";
                        retRow["PERFORM_ACTION"] = "0";

                    }
                    else
                    {

                        retRow["CHK_ALLOCATED"] = "0";
                        retRow["CHK_VALUE"] = "0";
                        retRow["PERFORM_ACTION"] = "0";

                    }
                    dtRet.Rows.Add(retRow);
                }
                var dvDisplay = dtRet.DefaultView;
                List<VM_MT_POU_ASSIGN_LOCATIONS> lstAssignLocations = dvDisplay.ToTable().ToList<VM_MT_POU_ASSIGN_LOCATIONS>();

                response.DataList = lstAssignLocations;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                return response;
            }
        }

    }
}
