#region Usings
using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

#endregion

namespace AtPar.POU.Repos
{
    public class ConsignmentItemsRepository : IConsignmentItemsRepository
    {
        ILog _log;

        public ConsignmentItemsRepository(ILog log)
        {
            _log = log;
        }

        /// <summary>
        /// To Get the list of User Departments
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGroupID"></param>
        /// <returns></returns>
        public List<VM_MT_POU_DEPT> GetUserDepartments(string userID, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            string sbSql = string.Empty;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter parampUserId = new SqlParameter("@UserId", userID);
                    SqlParameter parampOrgGroupID = new SqlParameter("@OrgGroupID", orgGroupID);

                    object[] parameters = { parampUserId, parampOrgGroupID };

                    sbSql = "EXEC GetUserDepartments @UserId, @OrgGroupID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql))); }
                    }

                    var fields = new[] { "DEPARTMENT_ID", "DEPT_NAME", "ORG_GROUP_ID" };

                    var lstUserDepartments = objContext.Database.DifferedExecuteQuery<VM_MT_POU_DEPT>(fields, sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of User Departments Returned: {1}", methodBaseName, lstUserDepartments != null ? lstUserDepartments.Count() : 0)); }

                    return lstUserDepartments;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = string.Empty;
            }
        }

        /// <summary>
        /// To Get the allocated carts
        /// </summary>
        /// <param name="businessUnit"></param>
        /// <param name="deptID"></param>
        /// <param name="appID"></param>
        /// <param name="locationType"></param>
        /// <returns></returns>
        public List<VM_MT_POU_DEPT_CARTS> GetAllocatedCarts(string businessUnit, string deptID, int appID, string locationType = "")
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramBusinessUnit = new SqlParameter("@BusinessUnit", businessUnit);
                    SqlParameter paramDeptID = new SqlParameter("@DepartmentID", deptID);
                    SqlParameter paramLocationType = new SqlParameter("@LocationType", locationType);
                    SqlParameter paramAppID = new SqlParameter("@AppID", appID);

                    object[] parameters = { paramBusinessUnit, paramDeptID, paramLocationType, paramAppID };

                    sbSql = "EXEC GetDeptCartAllocations @BusinessUnit, @DepartmentID, @LocationType, @AppID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var pouDepartmentCarts = objContext.Database.SqlQuery<VM_MT_POU_DEPT_CARTS>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Carts Returned: " + pouDepartmentCarts.Count()); }

                    return pouDepartmentCarts;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// To Get the user department carts
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="locationType"></param>
        /// <returns></returns>
        public List<VM_MT_POU_DEPT_CARTS> GetUserdepartmentsCarts(string userID, string orgGrpID, string locationType = "")
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;
            StringBuilder sbSearch = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var userDepts = GetUserDepartments(userID, orgGrpID);

                    if (userDepts.Count > 0)
                    {
                        foreach (var userDept in userDepts)
                        {
                            sbSearch.Append(userDept.DEPARTMENT_ID + ",");
                        }
                        if (sbSearch.Length > 0)
                        {
                            sbSearch.Remove(sbSearch.Length - 1, 1);
                        }
                    }
                    else
                    {
                        sbSearch.Append(string.Empty);
                    }
                    var result = GetAllocatedCarts(string.Empty, string.Empty, (int)AtParWebEnums.EnumApps.PointOfUse, locationType);

                 
                    string[] stringArray = sbSearch.ToString().Split(',').ToArray();

                    result = result.Where(item => stringArray.Contains(item.DEPARTMENT_ID)).ToList();
                    return result;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// To Get the Non cart items
        /// </summary>
        /// <param name="businessUnit"></param>
        /// <param name="cartID"></param>
        /// <param name="itemID"></param>
        /// <param name="itemDescription"></param>
        /// <returns></returns>
        public List<MT_POU_NONCART_ITEMS> GetConsignmentItems(string businessUnit, string cartID, string itemID, string itemDescription)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramBusinessUnit = new SqlParameter("@businessUnit", businessUnit);
                    SqlParameter paramCartID = new SqlParameter("@cartId", cartID);
                    SqlParameter paramItemID = new SqlParameter("@itemID", itemID);
                    SqlParameter paramItemDescr = new SqlParameter("@itemDescr", itemDescription);

                    object[] parameters = { paramBusinessUnit, paramCartID, paramItemID, paramItemDescr };

                    sbSql = "EXEC GetConsignmentItems @businessUnit, @cartId, @itemID, @itemDescr";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var fields = new[] { "ITEM_ID", "MANUFACTURE_ITEM_ID", "VENDOR_ITEM_ID", "CUST_ITEM_ID", "ITEM_DESCRIPTION", "COUNT_ORDER" ,"OPTIMUM_QTY",
                        "CHARGE_CODE", "UOM","ISSUE_UOM","CONV_RATE_PAR_TO_ISSUE", "LOT_CONTROLLED", "SERIALIZED", "UPC_ID" ,"ITEM_PRICE", "GTIN", "BUSINESS_UNIT", "CART_ID", "COMPARTMENT", "MANUFACTURER" ,
                    "VENDOR", "PATIENT_CHARGEABLE", "SAMPLE", "STATUS"};

                    var pouNonCartItems = objContext.Database.DifferedExecuteQuery<MT_POU_NONCART_ITEMS>(fields, sbSql, parameters).ToList();

                    //var pouNonCartItems = objContext.Database.SqlQuery<MT_POU_NONCART_ITEMS>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Items Returned: " + pouNonCartItems.Count()); }

                    return pouNonCartItems;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// To Insert the Consignment Item
        /// </summary>
        /// <param name="lstConsignmentItems"></param>
        /// <returns></returns>
        public long AddConsignmentItem(List<VM_CONSIGNMENT_ITEM_TABLE> lstConsignmentItems)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strPrice = "0";
            string tmpcartid;
            string tmpitemid;
            StringBuilder sbSql = new StringBuilder();
            bool IsExists = false;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    VM_CONSIGNMENT_ITEM_TABLE lstConsignmentItem = lstConsignmentItems.FirstOrDefault();

                    List<VM_MT_POU_DEPT_CARTS> lstDeptAllocatedCarts = GetAllocatedCarts(lstConsignmentItem.BUSINESS_UNIT, lstConsignmentItem.DEPARTMENT_ID, (int)AtParWebEnums.EnumApps.PointOfUse);

                    if (!string.IsNullOrEmpty(lstConsignmentItem.ITEM_PRICE))
                    {
                        strPrice = lstConsignmentItem.ITEM_PRICE;
                    }

                    tmpcartid = lstConsignmentItem.CART_ID;
                    tmpitemid = lstConsignmentItem.ITEM_ID;

                    if (lstConsignmentItem.ITEM_DESCRIPTION.Contains("'"))
                    {
                        lstConsignmentItem.ITEM_DESCRIPTION.ReplaceString();
                    }

                    sbSql.Append("SELECT COUNT(*) FROM MT_POU_NONCART_ITEMS WHERE CART_ID ='" + tmpcartid + "' AND ITEM_ID ='" + tmpitemid + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    int count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (count > 0)
                    {
                        IsExists = true;
                    }
                    else
                    {
                        IsExists = false;
                    }

                    if (!IsExists)
                    {
                        sbSql.Remove(0, sbSql.Length);

                        sbSql.Append("INSERT INTO MT_POU_NONCART_ITEMS (ITEM_ID, MANUFACTURE_ITEM_ID, VENDOR_ITEM_ID, CUST_ITEM_ID, ITEM_DESCRIPTION, COUNT_ORDER, OPTIMUM_QTY, UOM, ISSUE_UOM, CONV_RATE_PAR_TO_ISSUE, ITEM_PRICE, UPC_ID,  CHARGE_CODE, LOT_CONTROLLED, SERIALIZED, BUSINESS_UNIT, CART_ID, COMPARTMENT, MANUFACTURER, PATIENT_CHARGEABLE, SAMPLE, VENDOR, STATUS, GTIN, UPDATE_DATE) VALUES('"
                            + lstConsignmentItem.ITEM_ID + "', '" + lstConsignmentItem.MANUFACTURE_ITEM_ID + "', '" + lstConsignmentItem.VENDOR_ITEM_ID + "', '"
                            + lstConsignmentItem.CUST_ITEM_ID + "', '" + lstConsignmentItem.ITEM_DESCRIPTION + "', '" + lstConsignmentItem.COUNT_ORDER + "', '"
                            + lstConsignmentItem.OPTIMUM_QTY + "', '" + lstConsignmentItem.UOM + "','" + lstConsignmentItem.ISSUE_UOM + "','" + lstConsignmentItem.CONV_RATE_PAR_TO_ISSUE + "', "
                            + strPrice + ", '" + lstConsignmentItem.UPC_ID + "', '" + lstConsignmentItem.CHARGE_CODE + "', '" + lstConsignmentItem.LOT_CONTROLLED + "', '"
                            + lstConsignmentItem.SERIALIZED + "', '" + lstConsignmentItem.BUSINESS_UNIT + "', '" + lstConsignmentItem.CART_ID + "', '" + lstConsignmentItem.COMPARTMENT + "', '" + lstConsignmentItem.MANUFACTURER + "', '" + lstConsignmentItem.PAT_CHARGEABLE + "', '" + lstConsignmentItem.SAMPLE + "', '" + lstConsignmentItem.VENDOR + "', '" + lstConsignmentItem.STATUS + "', '" + lstConsignmentItem.GTIN + "', GETDATE())");
                    }

                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// To Update the Consignment Item
        /// </summary>
        /// <param name="lstConsignmentItems"></param>
        /// <returns></returns>
        public long UpdateConsignmentItem(List<VM_CONSIGNMENT_ITEM_TABLE> lstConsignmentItems)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strPrice;
            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    VM_CONSIGNMENT_ITEM_TABLE lstConsignmentItem = lstConsignmentItems.FirstOrDefault();

                    if (lstConsignmentItem.UPDATE_BIN_IN_INVENTORY)
                    {
                        try
                        {
                            sbSql.Append("UPDATE MT_POU_CART_INVENTORY SET COMPARTMENT = '" + lstConsignmentItem.COMPARTMENT + "' WHERE ITEM_ID = '" + lstConsignmentItem.ITEM_ID + "' AND BUSINESS_UNIT = '" + lstConsignmentItem.BUSINESS_UNIT + "' AND CART_ID = '" + lstConsignmentItem.CART_ID + "' AND (COMPARTMENT = '" + lstConsignmentItem.OLD_COMPARTMENT + "' OR COMPARTMENT = '') ");

                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL; ;
                        }
                    }

                    if (string.IsNullOrEmpty(lstConsignmentItem.ITEM_PRICE))
                    {
                        strPrice = "0";
                    }
                    else
                    {
                        strPrice = lstConsignmentItem.ITEM_PRICE;
                    }

                    sbSql.Remove(0, sbSql.Length);

                    try
                    {
                        sbSql.Append(" UPDATE MT_POU_NONCART_ITEMS SET MANUFACTURE_ITEM_ID ='" + lstConsignmentItem.MANUFACTURE_ITEM_ID + "',  VENDOR_ITEM_ID ='" + lstConsignmentItem.VENDOR_ITEM_ID + "',  CUST_ITEM_ID ='" + lstConsignmentItem.CUST_ITEM_ID + "',  ITEM_DESCRIPTION ='" + lstConsignmentItem.ITEM_DESCRIPTION + "',  COUNT_ORDER ='" + lstConsignmentItem.COUNT_ORDER + "',  OPTIMUM_QTY ='" + lstConsignmentItem.OPTIMUM_QTY + "',  UOM ='" + lstConsignmentItem.UOM + "',  ISSUE_UOM ='" + lstConsignmentItem.ISSUE_UOM + "', CONV_RATE_PAR_TO_ISSUE ='" + lstConsignmentItem.CONV_RATE_PAR_TO_ISSUE + "', ITEM_PRICE ='" + lstConsignmentItem.ITEM_PRICE + "',  UPC_ID ='" + lstConsignmentItem.UPC_ID + "',  CHARGE_CODE ='" + lstConsignmentItem.CHARGE_CODE + "',  LOT_CONTROLLED ='" + lstConsignmentItem.LOT_CONTROLLED + "',  SERIALIZED ='" + lstConsignmentItem.SERIALIZED + "',  COMPARTMENT ='" + lstConsignmentItem.COMPARTMENT + "',  MANUFACTURER ='" + lstConsignmentItem.MANUFACTURER + "',  VENDOR ='" + lstConsignmentItem.VENDOR + "',  PATIENT_CHARGEABLE ='" + lstConsignmentItem.PAT_CHARGEABLE + "',  SAMPLE ='" + lstConsignmentItem.SAMPLE + "',  STATUS ='" + lstConsignmentItem.STATUS + "',  GTIN ='" + lstConsignmentItem.GTIN + "', UPDATE_DATE = GETDATE() WHERE BUSINESS_UNIT ='" + lstConsignmentItem.BUSINESS_UNIT + "' AND CART_ID = '" + lstConsignmentItem.CART_ID + "' AND ITEM_ID ='" + lstConsignmentItem.ITEM_ID + "'");

                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL; ;
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// To Get the Non Cart Items
        /// </summary>
        /// <param name="bUnit"></param>
        /// <param name="cartID"></param>
        /// <returns></returns>
        public List<MT_POU_NONCART_ITEMS> GetNonCartItems(string bUnit, string cartID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_POU_NONCART_ITEMS> lstNonCartItems = new List<MT_POU_NONCART_ITEMS>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID, ITEM_ID, MANUFACTURE_ITEM_ID, VENDOR_ITEM_ID, CUST_ITEM_ID,  ITEM_DESCRIPTION, VENDOR VENDOR_ID, COUNT_ORDER, OPTIMUM_QTY, CHARGE_CODE, UOM, LOT_CONTROLLED, SERIALIZED,  UPC_ID, ITEM_PRICE, COMPARTMENT, STATUS, CONV_RATE_PAR_TO_ISSUE, ISSUE_UOM FROM MT_POU_NONCART_ITEMS WHERE CART_ID='" + cartID + "' AND BUSINESS_UNIT='" + bUnit + "' AND STATUS <> '" + AtParWebEnums.YesNo_Enum.N.ToString() + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    //lstNonCartItems = objContext.Database.SqlQuery<MT_POU_NONCART_ITEMS>(sbSql.ToString()).ToList();
                    var fields = new[] { "BUSINESS_UNIT", "CART_ID", "ITEM_ID", "MANUFACTURE_ITEM_ID", "VENDOR_ITEM_ID", "CUST_ITEM_ID", "ITEM_DESCRIPTION", "VENDOR", "VENDOR_ID", "COUNT_ORDER", "OPTIMUM_QTY", "CHARGE_CODE", "UOM", "LOT_CONTROLLED", "SERIALIZED", "UPC_ID", "ITEM_PRICE",
                    "COMPARTMENT", "STATUS", "CONV_RATE_PAR_TO_ISSUE", "ISSUE_UOM"};

                    lstNonCartItems = objContext.Database.DifferedExecuteQuery<MT_POU_NONCART_ITEMS>(fields, sbSql.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    return lstNonCartItems;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// To Update the Cart Inventory
        /// </summary>
        /// <param name="lstCartInvItemList"></param>
        /// <returns></returns>
        public long UpdateCartInventory(List<VM_INVENTORY_ITEMS_TABLE> lstCartInvItemList)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string strBusinessUnit;
            string strCartId;
            string strItemId;
            string strLotNumber;
            string strSrNumber;
            string strQty;
            string strOptimumQuantity;
            string strCompartment;
            string expiryDate;
            int noOfRecords;
            string strLQOH;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    foreach (var lstCartInvItem in lstCartInvItemList)
                    {
                        strBusinessUnit = lstCartInvItem.BUSINESS_UNIT;
                        strCartId = lstCartInvItem.CART_ID;
                        strItemId = lstCartInvItem.ITEM_ID;
                        strLotNumber = lstCartInvItem.LOTNUMBER;
                        strSrNumber = lstCartInvItem.SERIALNUMBER;
                        strQty = lstCartInvItem.QUANTITY;
                        expiryDate = lstCartInvItem.EXPIRYDATE;
                        strCompartment = lstCartInvItem.COMPARTMENT.HandleNull().substituteString();
                        strLQOH = lstCartInvItem.LQOH;
                        if (strLotNumber == null)
                        {
                            strLotNumber = string.Empty;
                        }
                        if (strSrNumber == null)
                        {
                            strSrNumber = string.Empty;
                        }

                        if (string.IsNullOrEmpty(lstCartInvItem.OPTIMUM_QTY))
                        {
                            strOptimumQuantity = "0";
                        }
                        else
                        {
                            strOptimumQuantity = lstCartInvItem.OPTIMUM_QTY;
                        }

                        sbSql.Append("SELECT COUNT(*) AS CNT FROM MT_POU_CART_INVENTORY WHERE BUSINESS_UNIT = '" + strBusinessUnit + "' AND CART_ID = '" + strCartId + "' AND ITEM_ID = '" + strItemId + "' ");

                        if (strLotNumber != "")
                        {
                            sbSql.Append("AND LOT_NUMBER = '" + strLotNumber + "' ");
                        }

                        if (strSrNumber != "")
                        {
                            sbSql.Append("AND SERIAL_NUMBER = '" + strSrNumber + "' ");
                        }

                        sbSql.Append("AND COMPARTMENT = '" + strCompartment + "' ");

                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        noOfRecords = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                        sbSql.Remove(0, sbSql.Length);

                        if (noOfRecords > 0)
                        {
                            sbSql.Append("UPDATE MT_POU_CART_INVENTORY SET ITEM_QUANTITY_ON_HAND = ITEM_QUANTITY_ON_HAND + " + strQty + ", ACTUAL_QUANTITY = ACTUAL_QUANTITY + " + strQty + ", LOWEST_QOH = LOWEST_QOH + " + strLQOH + ", EXPIRY_DATE ='" + expiryDate + "' WHERE BUSINESS_UNIT = '" + strBusinessUnit + "' AND CART_ID ='" + strCartId + "' AND ITEM_ID = '" + strItemId + "' ");

                            if (strLotNumber != "")
                            {
                                sbSql.Append("AND LOT_NUMBER = '" + strLotNumber + "' ");
                            }

                            if (strSrNumber != "")
                            {
                                sbSql.Append("AND SERIAL_NUMBER = '" + strSrNumber + "' ");
                            }

                            sbSql.Append("AND COMPARTMENT = '" + strCompartment + "' ");
                        }
                        else
                        {
                            if (strLotNumber == "")
                            {
                                strLotNumber = " ";
                            }

                            sbSql.Append("INSERT INTO MT_POU_CART_INVENTORY(BUSINESS_UNIT, CART_ID, ITEM_ID, LOT_NUMBER, SERIAL_NUMBER, ITEM_QUANTITY_PAR, ITEM_QUANTITY_ON_HAND, ACTUAL_QUANTITY, LOWEST_QOH, EXPIRY_DATE, COMPARTMENT) VALUES ('" + strBusinessUnit + "', '" + strCartId + "', '" + strItemId + "', '" + strLotNumber + "', '" + strSrNumber + "', '" + strOptimumQuantity + "', '" + strQty + "', '" + strQty + "', '" + strLQOH + "', '" + expiryDate + "', '" + strCompartment + "')");

                            objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            sbSql.Remove(0, sbSql.Length);
                        }
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }
    }
}
