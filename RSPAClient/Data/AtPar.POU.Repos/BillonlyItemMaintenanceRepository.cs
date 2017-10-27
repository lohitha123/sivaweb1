using System;
using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using log4net;
using System.Text;
using AtPar.Data;
using System.Linq;
using System.Data.SqlClient;
using System.Data;
using AtPar.ViewModel;

namespace AtPar.POU.Repos
{
    public class BillonlyItemMaintenanceRepository : IBillOnlyItemMaintenanceRepository
    {
        private ILog _log;

        public BillonlyItemMaintenanceRepository(ILog log)
        {
            _log = log;
        }

        public List<MT_POU_BILLONLY_ITEMS> GetAllBillOnlyItems()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT ITEM_ID, [DESCRIPTION], ITEM_ID + '-' + [DESCRIPTION] AS ITEMDESCR, ORG_GROUP_ID FROM MT_POU_BILLONLY_ITEMS ");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }
                    }

                    var fields = new[] { "ITEM_ID", "DESCRIPTION", "ITEMDESCR", "ORG_GROUP_ID" };

                    var lstBillOnlyItems = objContext.Database.DifferedExecuteQuery<MT_POU_BILLONLY_ITEMS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Department Users Returned: {1}", methodBaseName, lstBillOnlyItems != null ? lstBillOnlyItems.Count() : 0)); }

                    return lstBillOnlyItems;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        public List<MT_POU_BILLONLY_ITEMS> GetBillonlyItemsDtls(string itemID, string orgGrpID, string deptID, string descr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_POU_BILLONLY_ITEMS> lstBillOnlyItemDtls = null;

            SqlParameter[] sqlParms = new SqlParameter[4];
            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sqlParms[0] = new SqlParameter("@ITEM_ID", SqlDbType.NVarChar);
                    sqlParms[0].Value = string.IsNullOrEmpty(itemID) ? "" : itemID;

                    sqlParms[1] = new SqlParameter("@ORG_GROUP_ID", SqlDbType.NVarChar);
                    sqlParms[1].Value = string.IsNullOrEmpty(orgGrpID) ? "" : orgGrpID;

                    sqlParms[2] = new SqlParameter("@DEPT_ID", SqlDbType.NVarChar);
                    sqlParms[2].Value = string.IsNullOrEmpty(deptID) ? "" : deptID;

                    sqlParms[3] = new SqlParameter("@DESCRIPTION", SqlDbType.NVarChar);
                    sqlParms[3].Value = string.IsNullOrEmpty(descr) ? "" : descr;

                    SqlStr = "EXEC GETBILLONLYITEMDETAILS @ITEM_ID,@ORG_GROUP_ID,@DEPT_ID,@DESCRIPTION";

                    if (!_log.IsDebugEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog));
                    }
                    try
                    {
                        lstBillOnlyItemDtls = objContext.Database.SqlQuery<MT_POU_BILLONLY_ITEMS>(SqlStr, sqlParms).ToList();
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr.ToString()); }
                        throw ex;
                    }
                    finally
                    {
                        SqlStr = null;
                    }
                    return lstBillOnlyItemDtls;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
            finally
            {
                SqlStr = null;
            }
        }

        public long UpdateBillonlyItemsDtls(List<MT_POU_BILLONLY_ITEMS> lstBillOnlyItems)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SqlParameter[] sqlParms = new SqlParameter[17];
            string SqlStr = string.Empty;


            using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                sqlParms[0] = new SqlParameter("@ITEM_ID", SqlDbType.NVarChar);
                sqlParms[0].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].ITEM_ID) ? "" : lstBillOnlyItems[0].ITEM_ID;

                sqlParms[1] = new SqlParameter("@ORG_GROUP_ID", SqlDbType.NVarChar);
                sqlParms[1].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].ORG_GROUP_ID) ? "" : lstBillOnlyItems[0].ORG_GROUP_ID;

                sqlParms[2] = new SqlParameter("@DEPT_ID", SqlDbType.NVarChar);
                sqlParms[2].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].DEPT_ID) ? "" : lstBillOnlyItems[0].DEPT_ID;

                sqlParms[3] = new SqlParameter("@DESCRIPTION", SqlDbType.NVarChar);
                sqlParms[3].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].DESCRIPTION) ? "" : lstBillOnlyItems[0].DESCRIPTION;

                sqlParms[4] = new SqlParameter("@UPC_ID", SqlDbType.NVarChar);
                sqlParms[4].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].UPC_ID) ? "" : lstBillOnlyItems[0].UPC_ID;

                sqlParms[5] = new SqlParameter("@MANF_ITEM_ID", SqlDbType.NVarChar);
                sqlParms[5].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].MFG_ITEM_ID) ? "" : lstBillOnlyItems[0].MFG_ITEM_ID;

                sqlParms[6] = new SqlParameter("@VENDOR_ITEM_ID", SqlDbType.NVarChar);
                sqlParms[6].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].VEND_ITEM_ID) ? "" : lstBillOnlyItems[0].VEND_ITEM_ID;

                sqlParms[7] = new SqlParameter("@MANUFACTURER", SqlDbType.NVarChar);
                sqlParms[7].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].MANUFACTURER) ? "" : lstBillOnlyItems[0].MANUFACTURER;

                sqlParms[8] = new SqlParameter("@VENDOR_ID", SqlDbType.NVarChar);
                sqlParms[8].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].VENDOR_ID) ? "" : lstBillOnlyItems[0].VENDOR_ID;

                sqlParms[9] = new SqlParameter("@LOT_NUMBER", SqlDbType.NVarChar);
                sqlParms[9].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].LOT_ID) ? "" : lstBillOnlyItems[0].LOT_ID;

                sqlParms[10] = new SqlParameter("@SERIAL_NUMBER", SqlDbType.NVarChar);
                sqlParms[10].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].SERIAL_ID) ? "" : lstBillOnlyItems[0].SERIAL_ID;



                sqlParms[11] = new SqlParameter("@CATALOG_FLG", SqlDbType.Bit);
                sqlParms[11].Value = lstBillOnlyItems[0].CATALOG_FLG;

                sqlParms[12] = new SqlParameter("@LAST_UPDATE_USER", SqlDbType.NVarChar);
                sqlParms[12].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].LAST_UPDATE_USER) ? "" : lstBillOnlyItems[0].LAST_UPDATE_USER;

                sqlParms[13] = new SqlParameter("@PRICE", SqlDbType.Float);
                if (lstBillOnlyItems[0].ITEM_PRICE == null)
                {
                    sqlParms[13].Value = 0;
                }
                else
                {
                    sqlParms[13].Value = lstBillOnlyItems[0].ITEM_PRICE;
                }


                sqlParms[14] = new SqlParameter("@UOM", SqlDbType.NVarChar);
                sqlParms[14].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].UOM) ? "" : lstBillOnlyItems[0].UOM;

                sqlParms[15] = new SqlParameter("@GTIN", SqlDbType.NVarChar);
                sqlParms[15].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].GTIN) ? "" : lstBillOnlyItems[0].GTIN;
                if (lstBillOnlyItems[0].EXPIRY_DATE != null)
                {
                    sqlParms[16] = new SqlParameter("@EXPIRY_DATE", SqlDbType.DateTime);
                    sqlParms[16].Value = DateTime.Parse(lstBillOnlyItems[0].EXPIRY_DATE.ToString());
                }
                else
                {
                    sqlParms[16] = new SqlParameter("@EXPIRY_DATE", SqlDbType.DateTime);
                    sqlParms[16].Value = DBNull.Value;
                }

                SqlStr = "exec UPDATEBILLONLYITEM @ITEM_ID,@ORG_GROUP_ID,@DEPT_ID,@DESCRIPTION,@UPC_ID,@MANF_ITEM_ID,@VENDOR_ITEM_ID,@MANUFACTURER,@VENDOR_ID,@LOT_NUMBER,@SERIAL_NUMBER,@EXPIRY_DATE,@CATALOG_FLG,@LAST_UPDATE_USER,@PRICE,@UOM,@GTIN";

                if (!_log.IsDebugEnabled)
                {
                    objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog));
                }
                try
                {
                    var count = objContext.Database.ExecuteSqlCommand(SqlStr, sqlParms);
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
                }

                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr.ToString()); }
                    return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                }
                finally
                {
                    SqlStr = null;
                }
                return AtparStatusCodes.ATPAR_OK;

            }

        }

        public List<VM_ATPAR_POU_LOCATIONS> GetLocations(int appID, string orgID, string userID, string deptID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<VM_ATPAR_POU_LOCATIONS> lstBillOnlyItemDtls = null;

            SqlParameter[] sqlParms = new SqlParameter[4];
            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sqlParms[0] = new SqlParameter("@AppID", SqlDbType.NVarChar);
                    sqlParms[0].Value = appID;

                    sqlParms[1] = new SqlParameter("@OrgGrpId", SqlDbType.NVarChar);
                    sqlParms[1].Value = string.IsNullOrEmpty(orgID) ? "" : orgID;

                    sqlParms[2] = new SqlParameter("@UserId", SqlDbType.NVarChar);
                    sqlParms[2].Value = string.IsNullOrEmpty(userID) ? "" : userID;

                    sqlParms[3] = new SqlParameter("@DeptID", SqlDbType.NVarChar);
                    sqlParms[3].Value = string.IsNullOrEmpty(deptID) ? "" : deptID;

                    SqlStr = "EXEC GETLOCATIONS @AppID,@OrgGrpId,@UserId,@DeptID";

                    if (!_log.IsDebugEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog));
                    }
                    try
                    {
                        lstBillOnlyItemDtls = objContext.Database.SqlQuery<VM_ATPAR_POU_LOCATIONS>(SqlStr, sqlParms).ToList();

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr.ToString()); }
                        return lstBillOnlyItemDtls;
                    }
                    finally
                    {
                        SqlStr = null;
                    }
                    return lstBillOnlyItemDtls;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
            finally
            {
                SqlStr = null;
            }
        }

        public List<string> GetInventoryBUnits(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<string> lstInventoryBUnits = null;

            SqlParameter[] sqlParms = new SqlParameter[1];
            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }


                    sqlParms[0] = new SqlParameter("@UserId", SqlDbType.NVarChar);
                    sqlParms[0].Value = string.IsNullOrEmpty(userID) ? "" : userID;

                    SqlStr = "EXEC GetOrgIds @UserId";

                    if (!_log.IsDebugEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog));
                    }
                    try
                    {
                        lstInventoryBUnits = objContext.Database.SqlQuery<string>(SqlStr, sqlParms).ToList();

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr.ToString()); }
                        return lstInventoryBUnits;
                    }
                    finally
                    {
                        SqlStr = null;
                    }
                    return lstInventoryBUnits;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
            finally
            {
                SqlStr = null;
            }
        }

        public List<string> GetCostCenterOrgIds(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<string> lstCostCenter = null;

            SqlParameter[] sqlParms = new SqlParameter[1];
            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }


                    sqlParms[0] = new SqlParameter("@UserId", SqlDbType.NVarChar);
                    sqlParms[0].Value = string.IsNullOrEmpty(userID) ? "" : userID;

                    SqlStr = "EXEC GetCostCenterOrgGroupIds @UserId";

                    if (!_log.IsDebugEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog));
                    }
                    try
                    {
                        lstCostCenter = objContext.Database.SqlQuery<string>(SqlStr, sqlParms).ToList();

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr.ToString()); }
                        return lstCostCenter;
                    }
                    finally
                    {
                        SqlStr = null;
                    }
                    return lstCostCenter;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
            finally
            {
                SqlStr = null;
            }
        }

        public long ConvertBillonlyItem(List<VM_MT_POU_BILLONLY_ITEMS> lstBillOnlyItems)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SqlParameter[] sqlParms = new SqlParameter[38];
            string SqlStr = string.Empty;
            long severStatusCode = -1;


            using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                sqlParms[0] = new SqlParameter("@ITEM_ID", SqlDbType.NVarChar);
                sqlParms[0].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].ITEM_ID) ? "" : lstBillOnlyItems[0].ITEM_ID;

                sqlParms[1] = new SqlParameter("@ORG_GROUP_ID", SqlDbType.NVarChar);
                sqlParms[1].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].ORG_GROUP_ID) ? "" : lstBillOnlyItems[0].ORG_GROUP_ID;

                sqlParms[2] = new SqlParameter("@DEPT_ID", SqlDbType.NVarChar);
                sqlParms[2].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].DEPT_ID) ? "" : lstBillOnlyItems[0].DEPT_ID;

                sqlParms[3] = new SqlParameter("@USER_ID", SqlDbType.NVarChar);
                sqlParms[3].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].USER_ID) ? "" : lstBillOnlyItems[0].USER_ID;

                sqlParms[4] = new SqlParameter("@KEYVALUE", SqlDbType.NVarChar);
                sqlParms[4].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].KEYVALUE) ? "" : lstBillOnlyItems[0].KEYVALUE;

                sqlParms[5] = new SqlParameter("@DESCRIPTION", SqlDbType.NVarChar);
                sqlParms[5].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].DESCRIPTION) ? "" : lstBillOnlyItems[0].DESCRIPTION;

                sqlParms[6] = new SqlParameter("@VENDOR_ID", SqlDbType.NVarChar);
                sqlParms[6].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].VENDOR_ID) ? "" : lstBillOnlyItems[0].VENDOR_ID;

                sqlParms[7] = new SqlParameter("@MANUFACTURER", SqlDbType.NVarChar);
                sqlParms[7].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].MANUFACTURER) ? "" : lstBillOnlyItems[0].MANUFACTURER;

                sqlParms[8] = new SqlParameter("@MANF_ITEM_ID", SqlDbType.NVarChar);
                sqlParms[8].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].MFG_ITEM_ID) ? "" : lstBillOnlyItems[0].MFG_ITEM_ID;

                sqlParms[9] = new SqlParameter("@VENDOR_ITEM_ID", SqlDbType.NVarChar);
                sqlParms[9].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].VEND_ITEM_ID) ? "" : lstBillOnlyItems[0].VEND_ITEM_ID;

                sqlParms[10] = new SqlParameter("@UOM_ISSUE", SqlDbType.NVarChar);
                sqlParms[10].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].UOM_ISSUE) ? "" : lstBillOnlyItems[0].UOM_ISSUE;

                sqlParms[11] = new SqlParameter("@UOM_PROCUREMENT", SqlDbType.NVarChar);
                sqlParms[11].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].UOM_PROCUREMENT) ? "" : lstBillOnlyItems[0].UOM_PROCUREMENT.ToString();

                sqlParms[12] = new SqlParameter("@CONV_FACTOR", SqlDbType.Float);
                sqlParms[12].Value = lstBillOnlyItems[0].CONV_FACTOR;

                sqlParms[13] = new SqlParameter("@PRICE", SqlDbType.Float);
                sqlParms[13].Value = lstBillOnlyItems[0].PRICE;


                if (lstBillOnlyItems[0].UPC_ID != "" && lstBillOnlyItems[0].UPC_ID != null)
                {
                    sqlParms[14] = new SqlParameter("@UPC_ID", SqlDbType.NVarChar);
                    sqlParms[14].Value = lstBillOnlyItems[0].UPC_ID;
                }
                else
                {
                    sqlParms[14] = new SqlParameter("@UPC_ID", SqlDbType.NVarChar);
                    sqlParms[14].Value = DBNull.Value;
                }

                sqlParms[15] = new SqlParameter("@STATUS", SqlDbType.Char);
                sqlParms[15].Value = lstBillOnlyItems[0].STATUS;

                sqlParms[16] = new SqlParameter("@SERIAL_CONTROLLED", SqlDbType.NVarChar);
                sqlParms[16].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].SERIAL_CONTROLLED) ? "" : lstBillOnlyItems[0].SERIAL_CONTROLLED;

                sqlParms[17] = new SqlParameter("@LOT_CONTROLLED", SqlDbType.NVarChar);
                sqlParms[17].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].LOT_CONTROLLED) ? "" : lstBillOnlyItems[0].LOT_CONTROLLED;

                sqlParms[18] = new SqlParameter("@CHARGE_CODE", SqlDbType.NVarChar);
                sqlParms[18].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].CHARGE_CODE) ? "" : lstBillOnlyItems[0].CHARGE_CODE;

                sqlParms[19] = new SqlParameter("@GTIN", SqlDbType.NVarChar);
                sqlParms[19].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].GTIN) ? "" : lstBillOnlyItems[0].GTIN;

                sqlParms[20] = new SqlParameter("@REPLENISHMENT_TYPE", SqlDbType.NVarChar);
                sqlParms[20].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].REPLENISHMENT_TYPE) ? "" : lstBillOnlyItems[0].REPLENISHMENT_TYPE;

                sqlParms[21] = new SqlParameter("@PAR_LOC_ID", SqlDbType.NVarChar);
                sqlParms[21].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].PAR_LOC_ID) ? "" : lstBillOnlyItems[0].PAR_LOC_ID;

                sqlParms[22] = new SqlParameter("@BUSINESS_UNIT", SqlDbType.NVarChar);
                sqlParms[22].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].BUSINESS_UNIT) ? "" : lstBillOnlyItems[0].BUSINESS_UNIT;

                sqlParms[23] = new SqlParameter("@BIN", SqlDbType.NVarChar);
                sqlParms[23].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].BIN) ? "" : lstBillOnlyItems[0].BIN;

                sqlParms[24] = new SqlParameter("@COUNT_ORDER", SqlDbType.Int);
                sqlParms[24].Value = lstBillOnlyItems[0].COUNT_ORDER;

                sqlParms[25] = new SqlParameter("@OPTIMAL_QTY", SqlDbType.Float);
                sqlParms[25].Value = lstBillOnlyItems[0].OPTIMAL_QTY;

                sqlParms[26] = new SqlParameter("@COUNT_REQUIRED", SqlDbType.NVarChar);
                sqlParms[26].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].COUNT_REQUIRED) ? "" : lstBillOnlyItems[0].COUNT_REQUIRED;

                sqlParms[27] = new SqlParameter("@FILL_KILL_FLAG", SqlDbType.NVarChar);
                sqlParms[27].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].FILL_KILL_FLAG) ? "" : lstBillOnlyItems[0].FILL_KILL_FLAG;

                sqlParms[28] = new SqlParameter("@MAX_QTY", SqlDbType.Float);
                sqlParms[28].Value = lstBillOnlyItems[0].MAX_QTY;

                sqlParms[29] = new SqlParameter("@FOQ_QTY", SqlDbType.Float);
                sqlParms[29].Value = lstBillOnlyItems[0].FOQ_QTY;

                sqlParms[30] = new SqlParameter("@ORDERING_TYPE", SqlDbType.NVarChar);
                sqlParms[30].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].ORDERING_TYPE) ? "" : lstBillOnlyItems[0].ORDERING_TYPE;

                sqlParms[31] = new SqlParameter("@COST_CENTER", SqlDbType.NVarChar);
                sqlParms[31].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].COST_CENTER) ? "" : lstBillOnlyItems[0].COST_CENTER;

                sqlParms[32] = new SqlParameter("@REQUISITION_TYPE", SqlDbType.NVarChar);
                sqlParms[32].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].REQUISITION_TYPE) ? "" : lstBillOnlyItems[0].REQUISITION_TYPE;

                sqlParms[33] = new SqlParameter("@USER_FIELD_1", SqlDbType.NVarChar);
                sqlParms[33].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].USER_FIELD_1) ? "" : lstBillOnlyItems[0].USER_FIELD_1;

                sqlParms[34] = new SqlParameter("@PAR_UOM", SqlDbType.NVarChar);
                sqlParms[34].Value = string.IsNullOrEmpty(lstBillOnlyItems[0].PAR_UOM) ? "" : lstBillOnlyItems[0].PAR_UOM;

                sqlParms[35] = new SqlParameter("@CONV_RT_PAR_UOM", SqlDbType.Float);
                sqlParms[35].Value = lstBillOnlyItems[0].CONV_RT_PAR_UOM;

                sqlParms[36] = new SqlParameter("@EXPIRY_DATE", SqlDbType.DateTime);
                sqlParms[36].Value = lstBillOnlyItems[0].EXPIRY_DATE;
                if (lstBillOnlyItems[0].EXPIRY_DATE != null)
                {
                    sqlParms[36] = new SqlParameter("@EXPIRY_DATE", SqlDbType.DateTime);
                    sqlParms[36].Value = DateTime.Parse(lstBillOnlyItems[0].EXPIRY_DATE.ToString());

                }
                else
                {
                    sqlParms[36] = new SqlParameter("@EXPIRY_DATE", SqlDbType.DateTime);
                    sqlParms[36].Value = DBNull.Value;
                }

                sqlParms[37] = new SqlParameter("@STATUS_CODE", SqlDbType.Int);
                sqlParms[37].Direction = ParameterDirection.Output;


                SqlStr = "exec CONVERTBILLONLYITEM @ITEM_ID,@ORG_GROUP_ID,@DEPT_ID,@USER_ID,@KEYVALUE,@DESCRIPTION,@VENDOR_ID,@MANUFACTURER,@MANF_ITEM_ID,@VENDOR_ITEM_ID,@UOM_ISSUE,@UOM_PROCUREMENT,@CONV_FACTOR,@PRICE,@UPC_ID,@STATUS,@SERIAL_CONTROLLED,@LOT_CONTROLLED,@CHARGE_CODE,@GTIN,@REPLENISHMENT_TYPE,@PAR_LOC_ID,@BUSINESS_UNIT,@BIN,@COUNT_ORDER,@OPTIMAL_QTY,@COUNT_REQUIRED,@FILL_KILL_FLAG,@MAX_QTY,@FOQ_QTY,@ORDERING_TYPE,@COST_CENTER,@REQUISITION_TYPE,@USER_FIELD_1,@PAR_UOM,@CONV_RT_PAR_UOM,@EXPIRY_DATE,@STATUS_CODE OUT";

                if (!_log.IsDebugEnabled)
                {
                    objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog));
                }
                try
                {
                    var count = objContext.Database.ExecuteSqlCommand(SqlStr, sqlParms);
                    severStatusCode = (int)sqlParms[37].Value;
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
                }

                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr.ToString()); }
                    return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                }
                finally
                {
                    SqlStr = null;
                }
                return AtparStatusCodes.ATPAR_OK;

            }

        }
    }
}
