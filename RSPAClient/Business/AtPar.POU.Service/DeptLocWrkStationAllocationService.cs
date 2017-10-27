using AtPar.Service.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using System.Data;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.Common.Service;
using AtPar.ViewModel;

namespace AtPar.POU.Service
{
    public class DeptLocWrkStationAllocationService : IDeptLocWrkStationAllocationService
    {

        #region Private Variable

        private ILog _log;
        private ICommonRepository _commonRepo;
        private IDeptLocWrkStationAllocationRepository _repo;
        private ICommonPOUService _commonPOUService;


        List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstAllocatedCarts = new List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>();
        List<MT_POU_DEPT_WORKSTATIONS> lstDeptWrks = new List<MT_POU_DEPT_WORKSTATIONS>();
        List<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS> lstCartHeaders = new List<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS>();
        List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstAllocatedCartsDetails = new List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>();


        #endregion

        #region constructor

        public DeptLocWrkStationAllocationService(ILog log, ICommonRepository commonRepo, IDeptLocWrkStationAllocationRepository repo, ICommonPOUService commonPOUService)
        {
            _log = log;
            _commonRepo = commonRepo;
            _repo = repo;
            _commonPOUService = commonPOUService;
            this._log.SetLoggerType(typeof(DeptLocWrkStationAllocationService));
        }




        #endregion



        #region Public Methods



        #region GetDeptAllocCarts


        public List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetCartHeaderDetails(string workStationID, string deptID,string orgGrpId, int Appid,int display)
        {
            lstAllocatedCartsDetails = new List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>();

            MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS data;


            if (!string.IsNullOrEmpty(workStationID))
            {

                this.lstCartHeaders.ForEach(header =>
                {

                    var rows = lstAllocatedCarts.Where(x => x.DEPARTMENT_ID == deptID && x.BUSINESS_UNIT == header.BUSINESS_UNIT
                        && x.CART_ID == header.LOCATION && x.WORKSTATION_ID == workStationID).ToList();


                    data = new MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS();
                    data.BUSINESS_UNIT = header.BUSINESS_UNIT;
                    data.CART_ID = header.LOCATION;
                    data.LOCATION_DESCR = header.LOCATION_DESCR;
                    data.LOCATION_TYPE = header.LOCATION_TYPE;
                    data.WORKSTATION_ID = workStationID;
                    data.DEPARTMENT_ID = deptID;
                    data.ORG_GROUP_ID = orgGrpId;
                    data.APP_ID = Appid;

                    if (rows != null && rows.Count > 0)
                    {
                        data.PRIORITY = rows[0].PRIORITY;
                        data.FLAG = rows[0].FLAG;
                    }
                    else
                    {
                        data.PRIORITY = 3;
                        data.FLAG = "D";
                    }


                    if(display == 1 )
                    {

                        if( data.FLAG == "I")
                        lstAllocatedCartsDetails.Add(data);
                    }
                    else
                    {
                        lstAllocatedCartsDetails.Add(data);

                    }


                });




            }


            return lstAllocatedCartsDetails;
        }


        public AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS> GetDeptAllocCarts(string businessUnit, string cartId, int display, string locationType, int appId, string deptID, string orgGrpID, string[] deviceTokenEntry)
        {
            DataSet dsCarts = new DataSet();


            var response = new AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS>();

            try
            {
                var tupleResult = GetDeptAllocatedCartDetails(businessUnit, cartId, display, locationType, appId, orgGrpID, deviceTokenEntry);
                dsCarts = tupleResult.Item2;
                var statusCode = tupleResult.Item1;



                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }


                var lstDeptLocationAlloc = (from DataRow dr in dsCarts.Tables[0].Rows
                                            select new VM_MT_POU_DEPT_LOCATION_ALLOCATIONS()
                                            {
                                                ASSIGN_CART = dr["ASSIGN_CART"].ToString(),

                                                BUSINESS_UNIT = dr["BUSINESS_UNIT"].ToString(),
                                                LOCATION = dr["LOCATION"].ToString(),
                                                LOCATION_DESCR = dr["LOCATION_DESCR"].ToString(),
                                                DEPT_ID = dr["DEPT_ID"].ToString(),
                                                ACT_ASSIGN_CART = dr["ACT_ASSIGN_CART"].ToString(),

                                                LOCATION_TYPE = dr["LOCATION_TYPE"].ToString(),

                                            }).ToList();




                var lstDeptCartWrkAlloc = (from DataRow dr in dsCarts.Tables[1].Rows
                                           select new MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS()
                                           {

                                               CART_ID = dr["CART_ID"].ToString(),
                                               DEPARTMENT_ID = dr["DEPARTMENT_ID"].ToString(),
                                               WORKSTATION_ID = dr["WORKSTATION_ID"].ToString(),
                                               BUSINESS_UNIT = dr["BUSINESS_UNIT"].ToString(),
                                               ORG_GROUP_ID = dr["ORG_GROUP_ID"].ToString(),

                                               FLAG = dr["FLAG"].ToString(),

                                               LOCATION_TYPE = dr["LOCATION_TYPE"].ToString(),

                                               PRIORITY = int.Parse(dr["PRIORITY"].ToString())

                                           }).ToList();
                // Distinct().Select(x => x.DEPARTMENT_ID == deptID)

                var lstDeptCartAlloc = (from DataRow dr in dsCarts.Tables[2].Rows
                                        select new MT_POU_DEPT_WORKSTATIONS()
                                        {

                                            DEPARTMENT_ID = dr["DEPARTMENT_ID"].ToString(),
                                            WORKSTATION_ID = dr["WORKSTATION_ID"].ToString(),
                                            WORKSTATION_DESCR = dr["WORKSTATION_DESCR"].ToString(),
                                            WORKSTATION_MAC_ADDRESS = dr["WORKSTATION_MAC_ADDRESS"].ToString(),
                                            ORG_GROUP_ID = dr["ORG_GROUP_ID"].ToString(),


                                        }).ToList();


                lstDeptWrks = lstDeptCartAlloc.Where(x => x.DEPARTMENT_ID == deptID).ToList();
                lstAllocatedCarts = lstDeptCartWrkAlloc.Where(x => x.DEPARTMENT_ID == deptID).ToList();
                lstCartHeaders = lstDeptLocationAlloc.Where(x => x.DEPT_ID == deptID).ToList();


                foreach (var item in lstDeptWrks)
                {
                    GetCartHeaderDetails(item.WORKSTATION_ID, deptID,orgGrpID,appId,display);

                    item.DETAILS = lstAllocatedCartsDetails;
                }




                List<MT_POU_DEPT_WORKSTATIONS> allocatedlist = new List<MT_POU_DEPT_WORKSTATIONS>();
                List<MT_POU_DEPT_WORKSTATIONS> unallocatedlist = new List<MT_POU_DEPT_WORKSTATIONS>();



                lstDeptWrks.ForEach(x =>
                {
                    if (x.DETAILS.Any(y => y.FLAG == "I"))
                    {
                        allocatedlist.Add(x);
                      
                    }
                    else
                    {
                        unallocatedlist.Add(x);
                       
                    }

                });


                allocatedlist.OrderBy(x => x.WORKSTATION_ID);
                unallocatedlist.OrderBy(x => x.WORKSTATION_ID);

                lstDeptWrks = new List<MT_POU_DEPT_WORKSTATIONS>();

                //if(display == 0)
                //{
                    //all records we need
                    allocatedlist.ForEach(x =>
                    {
                        x.Allocated = "Y";
                        if (x.DETAILS.Count > 0)
                            lstDeptWrks.Add(x);
                    });

                    unallocatedlist.ForEach(x =>
                    {
                        x.Allocated = "N";


                        if (x.DETAILS.Count > 0)
                            lstDeptWrks.Add(x);
                    });
                //}
                //else if(display == 1)
                //{
                //    //only allocated
                //    allocatedlist.ForEach(x =>
                //    {
                //        if (x.DETAILS.Count > 0)
                //            lstDeptWrks.Add(x);
                //    });
                //}
                //else
                //{
                //    //only unallocated
                //    unallocatedlist.ForEach(x =>
                //    {
                //        if (x.DETAILS.Count > 0)
                //            lstDeptWrks.Add(x);
                //    });
                //}
               

                response.DataList = lstDeptWrks;

                //response.DataDictionary = new Dictionary<string, object> { { "allocatedlist", allocatedlist }, { "unallocatedlist", unallocatedlist } };

                if (response.DataList != null && response.DataList.Count > 0)
                {

                    response.AtParSuccess();
                }
                else
                {

                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                //response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {

                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }



        private Tuple<long, DataSet> GetDeptAllocatedCartDetails(string businessUnit, string cartID, int display, string locationType, int appId, string orgGrpID, string[] deviceTokenEntry)
        {
            StringBuilder sbSearch = new StringBuilder();
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet cartHeadersDS = new DataSet();

            var dtRet = new DataTable();
            dtRet.Columns.Add("ASSIGN_CART", Type.GetType("System.String"));
            dtRet.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION_DESCR", Type.GetType("System.String"));
            dtRet.Columns.Add("DEPT_ID", Type.GetType("System.String"));
            dtRet.Columns.Add("ACT_ASSIGN_CART", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION_TYPE", Type.GetType("System.String"));

            var with1 = sbSearch;
            try
            {

                DataSet dsCartHeader;
                try
                {
                    var tupleResult = _commonPOUService.GetCart_Headers(orgGrpID, deviceTokenEntry, locationType);

                    dsCartHeader = tupleResult.Item2;
                    var statusCode = tupleResult.Item1;

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(statusCode, null);
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

                with1.Remove(0, sbSearch.Length);

                if (!string.IsNullOrEmpty(businessUnit))
                {
                    with1.Append("[" + dsCartHeader.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ColumnName + "] = '" + businessUnit + "' ");
                }
                if (!string.IsNullOrEmpty(cartID))
                {
                    if (with1.Length > 0)
                    {
                        with1.Append(" AND ");
                    }
                    with1.Append("[" + dsCartHeader.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ColumnName + "] = '" + cartID + "' ");
                }

                var dvCartHeader = dsCartHeader.Tables[0].DefaultView;

                if (sbSearch.Length > 0)
                {
                    dvCartHeader.RowFilter = sbSearch.ToString();
                    sbSearch.Remove(0, sbSearch.Length);
                }

                if (dvCartHeader.ToTable().Rows.Count == 0)
                {
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, null);
                }

                DataSet dsAllocatedCarts = new DataSet();

                try
                {

                    List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstDeptCartWrkAllocations =
                        _repo.GetDeptCartWrkAllocations(orgGrpID, appId);



                    dsAllocatedCarts = lstDeptCartWrkAllocations.ToDataSet();
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                }


                DataSet dsCartAlloc = new DataSet();

                try
                {

                    List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptCartAllocations =
                        _repo.GetDeptCartAllocations(orgGrpID);



                    dsCartAlloc = lstDeptCartAllocations.ToDataSet();
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
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





                if (_log.IsDebugEnabled) { _log.Fatal(methodBaseName + "Display filter is (0 - All, 1 - Allocated, 2 - UnAllocated" + display); }


                DataSet dSDeptWks = new DataSet();

                try
                {

                    List<MT_POU_DEPT_WORKSTATIONS> lstDeptWrkStations =
                        _repo.GetDeptWrkStations(orgGrpID);

                    dSDeptWks = lstDeptWrkStations.ToDataSet();
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                }


                dvDisplay.Table.TableName = "CartHeaders";
                dsAllocatedCarts.Tables[0].TableName = "AllocatedCarts";
                dSDeptWks.Tables[0].TableName = "DeptWKS";



                DataTable dFilteredTable = new DataTable();

                dFilteredTable = dvDisplay.ToTable().Clone();




                var Filteredlist = (from x in dsCartAlloc.Tables[0].AsEnumerable()
                                    join z in dvDisplay.ToTable().AsEnumerable()

                                   on new { a = x.Field<string>("BUSINESS_UNIT"), b = x.Field<string>("CART_ID") }
                                   equals new { a = z.Field<string>("BUSINESS_UNIT"), b = z.Field<string>("LOCATION") }


                                    select new
                                    {
                                        ASSIGN_CART = z.Field<string>("ASSIGN_CART"),
                                        BUSINESS_UNIT = z.Field<string>("BUSINESS_UNIT"),
                                        LOCATION = z.Field<string>("LOCATION"),
                                        LOCATION_DESCR = z.Field<string>("LOCATION_DESCR"),
                                        DEPT_ID = x.Field<string>("DEPARTMENT_ID"),
                                        ACT_ASSIGN_CART = z.Field<string>("ACT_ASSIGN_CART"),
                                        LOCATION_TYPE = z.Field<string>("LOCATION_TYPE")


                                    }).ToList();



                foreach (var items in Filteredlist)
                {

                    dFilteredTable.Rows.Add(items.ASSIGN_CART, items.BUSINESS_UNIT, items.LOCATION, items.LOCATION_DESCR, items.DEPT_ID, items.ACT_ASSIGN_CART, items.LOCATION_TYPE);

                    //dFilteredTable.Rows.Add(items.ASSIGN_CART);

                }


                DataView dvCartHeaders = new DataView();
                DataTable dtSortedTable = new DataTable();

                dvCartHeaders = dFilteredTable.DefaultView;


                dtSortedTable = dvCartHeaders.ToTable(true, "ASSIGN_CART", "BUSINESS_UNIT", "LOCATION", "LOCATION_DESCR", "DEPT_ID", "ACT_ASSIGN_CART", "LOCATION_TYPE");



                cartHeadersDS = new DataSet();
                cartHeadersDS.Tables.Add(dtSortedTable);

                cartHeadersDS.Tables.Add(dsAllocatedCarts.Tables["AllocatedCarts"].Copy());
                cartHeadersDS.Tables.Add(dSDeptWks.Tables["DeptWKS"].Copy());

                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, cartHeadersDS);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
        }

        #endregion



        #region SaveDeptCartAllocations



        public AtParWebApiResponse<long> SaveDeptCartAllocations(List<MT_POU_DEPT_WORKSTATIONS> lstDeptCartWrkAlloc, string deptID, int appid, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                var resultTuple = SaveDeptCartAlloc(lstDeptCartWrkAlloc, deptID, appid, deviceTokenEntry);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }


        public AtParWebApiResponse<long> SaveDeptCartAlloc(List<MT_POU_DEPT_WORKSTATIONS> lstDeptCartWrkAlloc, string deptID, int appid, string[] deviceTokenEntry)
        {
            var response = new AtParWebApiResponse<long>();



            string orgGrpID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID];
            string userID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID];


            var resultTuple = _repo.DeleteDeptCartWrkAlloc(lstDeptCartWrkAlloc, deptID, appid, orgGrpID);


            response.StatusCode = resultTuple;
            if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
            {
                response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                return response;
            }



            var result = _repo.InsertDeptCartWrkAlloc(lstDeptCartWrkAlloc, deptID, appid, orgGrpID, userID);


            response.StatusCode = result;
            if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
            {
                response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                return response;
            }


            response.AtParSuccess();
            return response;


        }
        #endregion




        #endregion






    }
}
