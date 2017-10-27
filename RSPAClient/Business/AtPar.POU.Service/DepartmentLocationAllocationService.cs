using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Linq;
using System.Xml.Linq;

namespace AtPar.POU.Service
{
    public class DepartmentLocationAllocationService : IDepartmentLocationAllocationService
    {
        #region Private Variable
        private ILog _log;
        private ICommonRepository _commonRepo;
        private IDepartmentLocationAllocationRepository _repo;
        private ICommonPOUService _commonPOUService;
        #endregion

        #region Constructor
        public DepartmentLocationAllocationService(ILog log, ICommonRepository commonRepo, IDepartmentLocationAllocationRepository repo, 
                                                   ICommonPOUService commonPOUService)
        {
            _log = log;
            _commonRepo = commonRepo;
            _repo = repo;
            _commonPOUService = commonPOUService;
            this._log.SetLoggerType(typeof(DepartmentLocationAllocationService));
        }

        #endregion
        
        #region Public Methods

        /// <summary>
        /// Gets the Carts allocated to the Department
        /// </summary>
        /// <param name="businessUnit"></param>
        /// <param name="cartId"></param>
        /// <param name="display"></param>
        /// <param name="locationType"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<object> GetDeptCartAllocationDetails(string businessUnit, string cartId, int display, string locationType, 
                                                                         string[] deviceTokenEntry)
        {
            StringBuilder sbSearch = new StringBuilder();
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<object>();
            Tuple<List<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS>, List<MT_POU_DEPT_CART_ALLOCATIONS>> output = null;
            
            var dtRet = new DataTable();
            dtRet.Columns.Add("ASSIGN_CART", Type.GetType("System.String"));
            dtRet.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION_DESCR", Type.GetType("System.String"));
            dtRet.Columns.Add("DEPT_ID", Type.GetType("System.String"));
            dtRet.Columns.Add("ACT_ASSIGN_CART", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION_TYPE", Type.GetType("System.String"));

            try
            {
                cartId = cartId.HandleNull().substituteString();
                DataSet dsCartHeader;
                try
                {
                    var tupleResult = _commonPOUService.GetCart_Headers(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID], deviceTokenEntry, locationType);

                    dsCartHeader = tupleResult.Item2;
                    var statusCode = tupleResult.Item1;

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.StatusCode = statusCode;
                        return response;
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                    return response;
                }

                sbSearch.Remove(0, sbSearch.Length);

                if (!string.IsNullOrEmpty(businessUnit))
                {
                    sbSearch.Append("[" + dsCartHeader.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ColumnName + "] = '" + businessUnit + "' ");
                }
                if (!string.IsNullOrEmpty(cartId))
                {
                    if (sbSearch.Length > 0)
                    {
                        sbSearch.Append(" AND ");
                    }
                    sbSearch.Append("[" + dsCartHeader.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ColumnName + "] = '" + cartId + "' ");
                }

                var dvCartHeader = dsCartHeader.Tables[0].DefaultView;

                if (sbSearch.Length > 0)
                {
                    dvCartHeader.RowFilter = sbSearch.ToString();
                    sbSearch.Remove(0, sbSearch.Length);
                }

                if (dvCartHeader.ToTable().Rows.Count == 0)
                {
                    response.StatusCode = AtparStatusCodes.E_NORECORDFOUND;
                    return response;
                }

                DataSet dsAllocatedCarts = new DataSet();

                try
                {
                    List<MT_POU_DEPT_CART_ALLOCATIONS> lstAllocatedCarts =
                            _repo.GetDeptCartAllocations(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

                    DataTable dtAllocatedCarts = lstAllocatedCarts.ToDataTable();//Utils.ToDataTable(lstAllocatedCarts);
                    dsAllocatedCarts.Tables.Add(dtAllocatedCarts);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                    return response;
                }

                for (int intCnt = 0; intCnt <= dvCartHeader.ToTable().Rows.Count - 1; intCnt++)
                {
                    var retRow = dtRet.NewRow();

                    var strBu = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ToString();
                    var strLocation = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ToString();
                    var strLocType = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE].ToString();

                    retRow["BUSINESS_UNIT"] = strBu;
                    retRow["LOCATION"] = strLocation;
                    retRow["LOCATION_DESCR"] = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR].ToString();
                    retRow["LOCATION_TYPE"] = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE].ToString();

                    var rows = dsAllocatedCarts.Tables[0].Select("BUSINESS_UNIT = '" + strBu + "' AND CART_ID = '" + strLocation + "' AND LOCATION_TYPE = '" + strLocType + "'");


                    if (rows.Length > 0)
                    {
                        retRow["ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.Y.ToString();
                        retRow["ACT_ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.Y.ToString();
                        retRow["DEPT_ID"] = rows[0]["DEPARTMENT_ID"];

                    }
                    else
                    {
                        retRow["ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.N.ToString();
                        retRow["ACT_ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.N.ToString();
                        retRow["DEPT_ID"] = "";

                    }
                    dtRet.Rows.Add(retRow);
                }

                var dvDisplay = dtRet.DefaultView;


                if (display == (int)AtparStatusCodes.DisplayType.ALLOCATED)
                {
                    dvDisplay.RowFilter = "ASSIGN_CART = '" + AtParWebEnums.YesNo_Enum.Y + "'";
                }
                else if (display == (int)AtparStatusCodes.DisplayType.UNALLOCATED)
                {
                    dvDisplay.RowFilter = "ASSIGN_CART = '" + AtParWebEnums.YesNo_Enum.N + "'";
                }

                dvDisplay.Table.TableName = "CartHeaders";
                dsAllocatedCarts.Tables[0].TableName = "AllocatedCarts";

                List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptCartsAllocated = dsAllocatedCarts.Tables[0].ToList<MT_POU_DEPT_CART_ALLOCATIONS>();
                List<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS> lstCartHeaders = dvDisplay.ToTable().ToList<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS>();

               lstCartHeaders= lstCartHeaders.OrderByDescending(x => x.ASSIGN_CART == "Y").ToList();
                output = new Tuple<List<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS>, List<MT_POU_DEPT_CART_ALLOCATIONS>>(lstCartHeaders, lstDeptCartsAllocated);
                response.DataVariable = output;
                response.AtParSuccess();

                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                return response;
            }
            finally
            {
                sbSearch = null;
            }
        }

        /// <summary>
        /// Inserts the Allocated Carts to the Department
        /// </summary>
        /// <param name="lstDeptCartAllocations"></param>
        /// <param name="deptId"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> SaveDeptCartAlloc(List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptCartAllocations, string deptId, string orgGroupId, int appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstCartWorkStationAllocations = _repo.GetLocationsAllocatedToWorkStation(deptId, orgGroupId, appId);

                if (lstCartWorkStationAllocations.Count > 0)
                {
                    foreach (var cartWorkStationAlloc in lstCartWorkStationAllocations)
                    {
                        var result = lstDeptCartAllocations.Where(x => x.CART_ID == cartWorkStationAlloc.CART_ID).FirstOrDefault();

                        if (result == null)
                        {
                            response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                            return response;
                        }
                    }
                }

                long StatusCode = _repo.DeleteDeptCartAllocations(deptId, orgGroupId, appId);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    if (lstDeptCartAllocations.Count > 0)
                    {
                        StatusCode = _repo.InsertDeptCartsAllocation(lstDeptCartAllocations, deptId, orgGroupId, appId);

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }
                        
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
