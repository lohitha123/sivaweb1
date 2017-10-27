using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Repos
{
    public class CommonPOURepository : ICommonPOURepository

    {


        ILog _log;

        public CommonPOURepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CommonPOURepository));
        }

        //pou
        public string GetLocationType(string bUnit, string cartID, string locType)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string locationType = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT LOCATION_TYPE FROM MT_POU_DEPT_CART_ALLOCATIONS WHERE BUSINESS_UNIT ='").Append(bUnit).Append("'").Append(" AND CART_ID='").Append(cartID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    locationType = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Location Type returned: " + locationType); }

                    return locationType;
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

        public List<MT_ATPAR_ITEM_ATTRIBUTES> GetItnAttr(string bUnit, string cartID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ITEM_ID, BUSINESS_UNIT, CART_ID, ORG_GROUP_ID, LOT_CONTROLLED, ");
                    sbSql.Append("SERIAL_CONTROLLED, CONVERSION_FACTOR, ISSUE_UOM FROM MT_ATPAR_ITEM_ATTRIBUTES ");
                    sbSql.Append("WHERE BUSINESS_UNIT='").Append(bUnit).Append("' AND CART_ID='").Append(cartID).Append("'");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    //var fields = new[] { "ITEM_ID", "BUSINESS_UNIT", "CART_ID", "ORG_GROUP_ID", "LOT_CONTROLLED", "SERIAL_CONTROLLED", "CONVERSION_FACTOR", "ISSUE_UOM", "CONV_RATE_PAR_TO_ISSUE_CF" };
                    var fields = new[] { "ITEM_ID", "BUSINESS_UNIT", "CART_ID", "ORG_GROUP_ID", "LOT_CONTROLLED", "SERIAL_CONTROLLED", "CONVERSION_FACTOR", "ISSUE_UOM" };

                    var lstItemAttributes = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ITEM_ATTRIBUTES>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemAttributes); }

                    return lstItemAttributes;
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

        public string GetStorageArea(string deptID, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string storageArea = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ISNULL(STORAGE_AREA,'') FROM MT_POU_DEPT WHERE DEPT_ID ='").Append(deptID).Append("'").Append("AND ORG_GROUP_ID='").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    storageArea = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Storage Area Returned: " + storageArea); }

                    return storageArea;
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



        public List<string> GetBUnits(string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<string> lstBusinessUnit = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BU_TYPE = '").Append(AtParDefns.BU_TYPE_INVENTORY).Append("'");

                    if (orgGrpID != "All")
                    {
                        sbSql.Append(" AND ORG_GROUP_ID='").Append(orgGrpID).Append("'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    lstBusinessUnit = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Business units returned: " + lstBusinessUnit.Count()); }

                    return lstBusinessUnit;
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

        public List<MT_POU_PREF_LIST_ALLOC> GetPrefListDetails(string prefID, string procID = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            string sbSql = string.Empty;
            List<MT_POU_PREF_LIST_ALLOC> lstPrefDetails = null;
            if (procID == null) procID = "";

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter parampPrefId = new SqlParameter("@PrefID", prefID);
                    SqlParameter parampProcID = new SqlParameter("@ProcID", procID);

                    object[] parameters = { parampPrefId, parampProcID };

                    if (!string.IsNullOrEmpty(prefID))
                    {
                        sbSql = "EXEC GetPrefListDetails @PrefID, @ProcID";

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql))); }
                        }
                        var fields = new[] { "ITEM_ID", "ITEM_DESCR", "QUANTITY", "HOLD_QTY", "STATUS" };
                        lstPrefDetails = objContext.Database.DifferedExecuteQuery<MT_POU_PREF_LIST_ALLOC>(fields, sbSql, parameters).ToList();

                        if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of records Returned: {1}", methodBaseName, lstPrefDetails != null ? lstPrefDetails.Count() : 0)); }
                    }
                    else
                    {
                        sbSql = "SELECT ITEM_ID, ITEM_DESCR , QUANTITY, STATUS FROM MT_POU_PREF_LIST_ALLOC ";

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql))); }
                        }

                        var fields = new[] { "ITEM_ID", "ITEM_DESCR", "QUANTITY", "STATUS" };

                        lstPrefDetails = objContext.Database.DifferedExecuteQuery<MT_POU_PREF_LIST_ALLOC>(fields, sbSql.ToString()).ToList();

                        if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of records Returned: {1}", methodBaseName, lstPrefDetails != null ? lstPrefDetails.Count() : 0)); }
                    }

                    return lstPrefDetails;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql)); }
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
            List<MT_POU_NONCART_ITEMS> lstNonCartItems = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID, ITEM_ID, MANUFACTURE_ITEM_ID, VENDOR_ITEM_ID, CUST_ITEM_ID,  ");
                    sbSql.Append("ITEM_DESCRIPTION, VENDOR VENDOR_ID, COUNT_ORDER, OPTIMUM_QTY, CHARGE_CODE, UOM, LOT_CONTROLLED, SERIALIZED, UPC_ID, ");
                    sbSql.Append("ITEM_PRICE, COMPARTMENT, STATUS FROM MT_POU_NONCART_ITEMS WHERE CART_ID='" + cartID + "' AND BUSINESS_UNIT='" + bUnit + "' AND STATUS <> '" + AtParWebEnums.YesNo_Enum.N.ToString() + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }
                    string[] fields ={ "BUSINESS_UNIT", "CART_ID", "ITEM_ID" , "MANUFACTURE_ITEM_ID", "VENDOR_ITEM_ID"
                    ,"CUST_ITEM_ID","ITEM_DESCRIPTION","VENDOR_ID","COUNT_ORDER","OPTIMUM_QTY","CHARGE_CODE",
                    "UOM","LOT_CONTROLLED","SERIALIZED","UPC_ID","ITEM_PRICE","COMPARTMENT","STATUS" };

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
        /// Gets the User Departments
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
                    SqlParameter parampOrgGroupID = new SqlParameter("@OrgGrpId", orgGroupID);

                    object[] parameters = { parampUserId, parampOrgGroupID };

                    sbSql = "EXEC GetUserDepartments @UserId, @OrgGrpId";

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

        public List<MT_POU_DEPT_WORKSTATIONS> GetCartWorkstations(string departmentID, string cartId, string orgGrpID, int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            string sbSql = string.Empty;
            List<MT_POU_DEPT_WORKSTATIONS> lstCartWrkAllocDetials = null;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter parampDepartmentID = new SqlParameter("@DepartmentId", string.IsNullOrEmpty(departmentID) ? string.Empty : departmentID);
                    SqlParameter parampCartId = new SqlParameter("@CartId", string.IsNullOrEmpty(cartId) ? string.Empty : cartId);
                    SqlParameter parampOrgGrpID = new SqlParameter("@OrgGrpId", orgGrpID);
                    SqlParameter parampAppID = new SqlParameter("@AppID", appID);

                    object[] parameters = { parampDepartmentID, parampCartId, parampOrgGrpID, parampAppID };

                    if (string.IsNullOrEmpty(departmentID) && string.IsNullOrEmpty(cartId))
                    {
                        sbSql = "EXEC GetWorkstations @DepartmentId, @CartId,@OrgGrpId,@AppID";

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql))); }
                        }
                        var fields = new[] { "DEPARTMENT_ID", "WORKSTATION_ID" };

                        lstCartWrkAllocDetials = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_WORKSTATIONS>(fields, sbSql.ToString(), parameters).ToList();

                        if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of records Returned: {1}", methodBaseName, lstCartWrkAllocDetials != null ? lstCartWrkAllocDetials.Count() : 0)); }
                    }
                    else
                    {
                        sbSql = "GetAllocatedCartWorkstations @DepartmentId, @CartId,@OrgGrpId,@AppID ";

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql))); }
                        }

                        var fields = new[] { "DEPARTMENT_ID", "WORKSTATION_ID", "WORKSTATION_DESCR" };

                        lstCartWrkAllocDetials = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_WORKSTATIONS>(fields, sbSql.ToString(), parameters).ToList();

                        if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of records Returned: {1}", methodBaseName, lstCartWrkAllocDetials != null ? lstCartWrkAllocDetials.Count() : 0)); }
                    }

                    return lstCartWrkAllocDetials;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql)); }
                throw ex;
            }
            finally
            {
                sbSql = string.Empty;
            }
        }

        #region RFID

        /// <summary>
        /// GetCartDetails
        /// </summary>
        /// <param name="strSearch"></param>
        /// <param name="strManufacuturer"></param>
        /// <param name="strDescription"></param>
        /// <param name="blnScanflag"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="isPeopleSoft"></param>
        /// <returns></returns>
        public List<VM_SEARCHITEM_DETAILS> GetCartDetails(string strSearch, string strManufacuturer, string strDescription, bool blnScanflag, string[] deviceTokenEntry, bool isPeopleSoft = true)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<VM_SEARCHITEM_DETAILS> lstCartItems = new List<VM_SEARCHITEM_DETAILS>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT P.ITEM_ID AS ITEMID, SHORT_DESCR AS ITEM_DESCR,");

                    sbSql.Append("P.MFG_ITEM_ID, VEND_ITEM_ID,GTIN, CUST_ITEM_ID,");

                    sbSql.Append("P.MANUFACTURER, UPC_CODE AS UPCID, ITEM_PRICE, UNIT_OF_ISSUE AS ISSUE_UOM,");

                    sbSql.Append("LOT_CONTROLLED, SERIAL_CONTROLLED, VENDOR_ID, STATUS ");

                    if (blnScanflag == true)
                    {
                        sbSql.Append("FROM PAR_MNGT_ITEM P LEFT JOIN MT_ATPAR_ITEM_MFG_UPN U ON P.ITEM_ID=U.ITEM_ID WHERE (");

                        if (strSearch != string.Empty & !string.IsNullOrEmpty(strSearch))
                        {
                            sbSql.Append("( ");
                            sbSql.Append("P.ITEM_ID = '");
                            sbSql.Append(strSearch).Append("' ");
                            sbSql.Append("OR CUST_ITEM_ID = '");
                            sbSql.Append(strSearch).Append("' ");
                            sbSql.Append("OR P.MFG_ITEM_ID = '");
                            sbSql.Append(strSearch).Append("' ");
                            sbSql.Append("OR VEND_ITEM_ID = '");
                            sbSql.Append(strSearch).Append("' ");
                            sbSql.Append("OR GTIN = '");
                            sbSql.Append(strSearch).Append("' ");
                            sbSql.Append("OR UPC_CODE = '");
                            sbSql.Append(strSearch).Append("')");
                            sbSql.Append("OR U.UPN= '");
                            sbSql.Append(strSearch).Append("'");
                            if ((strManufacuturer != string.Empty & !string.IsNullOrEmpty(strManufacuturer)) | (strDescription != string.Empty & !string.IsNullOrEmpty(strDescription)))
                            {
                                sbSql.Append("' AND ");
                            }
                        }

                        if (strManufacuturer != string.Empty & !string.IsNullOrEmpty(strManufacuturer))
                        {
                            sbSql.Append("P.MANUFACTURER = '");
                            sbSql.Append(strManufacuturer).Append("' ");
                            if (strDescription != string.Empty & !string.IsNullOrEmpty(strDescription))
                            {
                                sbSql.Append(" AND ");
                            }
                        }
                        if (strDescription != string.Empty & !string.IsNullOrEmpty(strDescription))
                        {
                            sbSql.Append(" SHORT_DESCR = '");
                            sbSql.Append(strDescription).Append("' ");
                        }
                        sbSql.Append(")");
                    }
                    else
                    {
                        sbSql.Append("FROM PAR_MNGT_ITEM P LEFT JOIN MT_ATPAR_ITEM_MFG_UPN U ON P.ITEM_ID=U.ITEM_ID WHERE (");

                        if (strSearch != string.Empty & !string.IsNullOrEmpty(strSearch))
                        {
                            sbSql.Append("( ");
                            sbSql.Append("P.ITEM_ID LIKE '");
                            sbSql.Append(strSearch).Append("%' ");
                            sbSql.Append("OR CUST_ITEM_ID LIKE '");
                            sbSql.Append(strSearch).Append("%' ");
                            sbSql.Append("OR P.MFG_ITEM_ID LIKE '");
                            sbSql.Append(strSearch).Append("%' ");
                            sbSql.Append("OR VEND_ITEM_ID LIKE '");
                            sbSql.Append(strSearch).Append("%' ");
                            sbSql.Append("OR GTIN LIKE '");
                            sbSql.Append(strSearch).Append("%' ");
                            sbSql.Append("OR UPC_CODE LIKE '");
                            sbSql.Append(strSearch).Append("%') ");
                            sbSql.Append("OR U.UPN LIKE '");
                            sbSql.Append(strSearch).Append("%'");
                            if ((strManufacuturer != string.Empty & !string.IsNullOrEmpty(strManufacuturer)) | (strDescription != string.Empty & !string.IsNullOrEmpty(strDescription)))
                            {
                                sbSql.Append(" AND ");
                            }
                        }

                        if (strManufacuturer != string.Empty & !string.IsNullOrEmpty(strManufacuturer))
                        {
                            sbSql.Append("P.MANUFACTURER LIKE '");
                            sbSql.Append(strManufacuturer).Append("%'");
                            if (strDescription != string.Empty & !string.IsNullOrEmpty(strDescription))
                            {
                                sbSql.Append(" AND ");
                            }
                        }

                        if (strDescription != string.Empty & !string.IsNullOrEmpty(strDescription))
                        {
                            sbSql.Append("SHORT_DESCR LIKE '%");
                            sbSql.Append(strDescription).Append("%' ");
                        }
                        sbSql.Append(")");
                        if (!isPeopleSoft)
                        {
                            sbSql.Append(" AND PHARMACY_FLG<>1");
                        }

                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }
                    string[] fields = { "CART_ID", "ITEMID", "ITEM_DESCR", "CUST_ITEM_ID", "VENDOR_ITEM_ID", "VENDOR_ID", "GTIN", "MANUFACTURER", "UPCID", "ITEM_PRICE", "ISSUE_UOM", "LOT_CONTROLLED", "SERIAL_CONTROLLED", "STATUS" };

                    lstCartItems = objContext.Database.DifferedExecuteQuery<VM_SEARCHITEM_DETAILS>(fields, sbSql.ToString()).ToList();
                    if (!_log.IsDebugEnabled)
                    {
                        //Getting the Item details with SQL...
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    return lstCartItems;

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
        /// SearchItemInAllocatedCarts
        /// </summary>
        /// <param name="strSearch"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public List<VM_SEARCHITEM_DETAILS> SearchItemInAllocatedCarts(string strSearch, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<VM_SEARCHITEM_DETAILS> lstGetCompDetails = new List<VM_SEARCHITEM_DETAILS>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BIN_LOC AS CART_ID FROM PAR_MNGT_PAR_LOC_DETAILS A, ");
                    sbSql.Append("MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS B, MT_POU_DEPT_USER_ALLOCATIONS C ");
                    sbSql.Append("WHERE A.PAR_LOC_ID = B.CART_ID AND A.ORG_ID = B.BUSINESS_UNIT ");
                    sbSql.Append("AND B.DEPARTMENT_ID = C.DEPARTMENT_ID AND B.ORG_GROUP_ID = C.ORG_GROUP_ID ");
                    sbSql.Append("AND C.USER_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' ");
                    sbSql.Append("AND C.ORG_GROUP_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "' ");
                    sbSql.Append("AND A.STATUS <> 'N' AND A.ITEM_ID = '" + strSearch + "'");
                    sbSql.Append("'");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }
                    string[] fields = { "CART_ID", "COMPARTMENT", "ITEM_DESCR", "MFG_ITEM_ID", "CUST_ITEM_ID", "VENDOR_ITEM_ID", "VENDOR_ID", "GTIN", "MANUFACTURER", "UPCID", "ITEM_PRICE", "ISSUE_UOM", "LOT_CONTROLLED", "SERIAL_CONTROLLED", "STATUS" };

                    lstGetCompDetails = objContext.Database.DifferedExecuteQuery<VM_SEARCHITEM_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        //Getting the Item details with SQL...
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    return lstGetCompDetails;

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
        /// SearchItemInNonCart
        /// </summary>
        /// <param name="strSearch"></param>
        /// <param name="strManufacuturer"></param>
        /// <param name="strDescription"></param>
        /// <param name="blnScanflag"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public List<VM_SEARCHITEM_DETAILS> SearchItemInNonCart(string strSearch, string strManufacuturer, string strDescription, bool blnScanflag, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<VM_SEARCHITEM_DETAILS> lstGetCompDetails = new List<VM_SEARCHITEM_DETAILS>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT N.ITEM_ID AS ITEMID, N.MANUFACTURE_ITEM_ID, VENDOR_ITEM_ID, ");
                    sbSql.Append("N.UOM, UPC_ID, ITEM_DESCRIPTION, ITEM_PRICE, ");
                    sbSql.Append("LOT_CONTROLLED, SERIALIZED, VENDOR,STATUS AS NON_CART_ITEM_STATUS, CUST_ITEM_ID,GTIN  ");
                    sbSql.Append("FROM MT_POU_NONCART_ITEMS N LEFT JOIN MT_ATPAR_ITEM_MFG_UPN ");
                    sbSql.Append("U ON N.ITEM_ID =U.ITEM_ID WHERE (");

                    if (blnScanflag)
                    {
                        if (!string.IsNullOrEmpty(strSearch))
                        {
                            sbSql.Append("((N.ITEM_ID = '" + strSearch + "'");
                            sbSql.Append(" OR CUST_ITEM_ID = '" + strSearch + "'");
                            sbSql.Append(" OR N.MANUFACTURE_ITEM_ID = '" + strSearch + "'");
                            sbSql.Append(" OR VENDOR_ITEM_ID = '" + strSearch + "'");
                            sbSql.Append(" OR GTIN = '" + strSearch + "'");
                            sbSql.Append(" OR UPC_ID = '" + strSearch + "')");
                            sbSql.Append(" OR U.UPN = '" + strSearch + "'))");                            
                        }
                        if (!string.IsNullOrEmpty(strManufacuturer))
                        {
                            sbSql.Append(" AND N.MANUFACTURER = '" + strManufacuturer + "'");
                        }
                        if (!string.IsNullOrEmpty(strDescription))
                        {
                            sbSql.Append("AND ITEM_DESCRIPTION = '" + strDescription + "'");
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(strSearch))
                        {
                            sbSql.Append("((N.ITEM_ID LIKE '" + strSearch + "%'");
                            sbSql.Append(" OR CUST_ITEM_ID LIKE '" + strSearch + "%'");
                            sbSql.Append(" OR N.MANUFACTURE_ITEM_ID LIKE '" + strSearch + "%'");
                            sbSql.Append(" OR VENDOR_ITEM_ID LIKE '" + strSearch + "%'");
                            sbSql.Append(" OR GTIN LIKE '" + strSearch + "%'");
                            sbSql.Append(" OR UPC_ID LIKE '" + strSearch + "%')");
                            sbSql.Append(" OR U.UPN LIKE '" + strSearch + "%'))");
                        }
                        if (!string.IsNullOrEmpty(strManufacuturer))
                        {
                            sbSql.Append(" AND N.MANUFACTURER LIKE '" + strManufacuturer + "%'");
                        }
                        if (!string.IsNullOrEmpty(strDescription))
                        {
                            sbSql.Append(" AND ITEM_DESCRIPTION LIKE '%" + strDescription + "%'");
                        }

                    }
                    

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }
                    string[] fields = { "ITEMID", "MFG_ITEM_ID", "VENDOR_ITEM_ID", "UOM", "UPCID", "ITEM_DESCR", "ITEM_PRICE", "LOT_CONTROLLED", "SERIAL_CONTROLLED", "VENDOR_ID", "NON_CART_ITEM_STATUS", "CUST_ITEM_ID", "GTIN" };

                    lstGetCompDetails = objContext.Database.DifferedExecuteQuery<VM_SEARCHITEM_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        //Getting the Item details with SQL...
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    return lstGetCompDetails;

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
        /// GetCaseItemsProperties
        /// </summary>
        /// <param name="strCaseItems"></param>
        /// <returns></returns>
        public Tuple<long, DataSet> GetCaseItemsProperties(string strCaseItems)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            //string sbSql = string.Empty;
            DataSet caseItemsPropDS = new DataSet();

            List<VM_SEARCHITEM_DETAILS> list1 = new List<VM_SEARCHITEM_DETAILS>();
            List<VM_SEARCHITEM_DETAILS> list2 = new List<VM_SEARCHITEM_DETAILS>();
            List<VM_SEARCHITEM_DETAILS> list3 = new List<VM_SEARCHITEM_DETAILS>();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    //SqlParameter paramCaseItems = new SqlParameter("@ITEMS", strCaseItems);

                    sbSql.Append("SELECT I.ITEM_ID AS ITEMID,CASE I.STATUS WHEN 0 THEN 'Y' WHEN 1 THEN 'N' ");
                    sbSql.Append(" WHEN 2 THEN 'P' ELSE '' END AS ITEM_MASTER_ITEM_STATUS,");
                    //sbSql.Append("SELECT I.ITEM_ID AS ITEMID,I.STATUS AS STATUS,");
                    sbSql.Append(" ISNULL(LD.PAR_LOC_ID, '') PAR_LOC_ID, ISNULL(LD.STATUS, '') AS PAR_LOC_STATUS,");

                    sbSql.Append(" I.IMPLANT_FLAG, ISNULL(LD.BIN_LOC, '') AS COMPARTMENT");

                    sbSql.Append(" FROM PAR_MNGT_ITEM I LEFT JOIN PAR_MNGT_PAR_LOC_DETAILS LD");

                    sbSql.Append(" ON I.ITEM_ID = LD.ITEM_ID WHERE I.ITEM_ID IN(select * from SplitString('" + strCaseItems + "',','))");

                    //object[] parameters = { paramCaseItems };

                    //sbSql = "EXEC GETCASEITEMSPROPERTIES @ITEMS";

                    //todo: add "PAR_LOC_ID",
                    string[] list1Fields = { "ITEMID", "ITEM_MASTER_ITEM_STATUS", "PAR_LOC_STATUS", "IMPLANT_FLAG", "COMPARTMENT" };

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }
                    list1 = objContext.Database.DifferedExecuteQuery<VM_SEARCHITEM_DETAILS>(list1Fields, sbSql.ToString()).ToList();
                    //var pouCaseItemsProps = objContext.Database.SqlQuery<VM_SEARCHITEM_DETAILS>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Items Returned: " + list1.Count()); }
                    sbSql.Clear();


                    //Next Query
                    sbSql.Append("SELECT NC.ITEM_ID AS ITEMID,NC.STATUS AS NON_CART_ITEM_STATUS,CASE I.STATUS WHEN 0");
                    sbSql.Append(" THEN 'Y' WHEN 1 THEN 'N' WHEN 2 THEN 'P' ELSE '' END AS ITEM_MASTER_ITEM_STATUS,");
                    sbSql.Append(" ISNULL(I.IMPLANT_FLAG, 'N') IMPLANT_FLAG FROM MT_POU_NONCART_ITEMS NC");
                    sbSql.Append(" LEFT JOIN  PAR_MNGT_ITEM I ON NC.ITEM_ID = I.ITEM_ID");
                    sbSql.Append(" WHERE NC.ITEM_ID IN(select * from SplitString('" + strCaseItems + "',','))");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    //todo: add "PAR_LOC_ID",
                    string[] list2Fields = { "ITEMID", "NON_CART_ITEM_STATUS", "ITEM_MASTER_ITEM_STATUS", "IMPLANT_FLAG" };

                    list2 = objContext.Database.DifferedExecuteQuery<VM_SEARCHITEM_DETAILS>(list2Fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Items Returned: " + list2.Count()); }
                    sbSql.Clear();


                    //Next Query

                    sbSql.Append("SELECT B.ITEM_ID AS ITEMID,'Y' AS BILL_ITEM_STATUS,CASE I.STATUS WHEN 0 THEN 'Y' ");
                    sbSql.Append(" WHEN 1 THEN 'N' WHEN 2 THEN 'P' ELSE '' END AS ITEM_MASTER_ITEM_STATUS,");
                    sbSql.Append(" ISNULL(I.IMPLANT_FLAG, 'N') IMPLANT_FLAG FROM MT_POU_BILLONLY_ITEMS B");
                    sbSql.Append(" LEFT JOIN PAR_MNGT_ITEM I ON B.ITEM_ID = I.ITEM_ID");
                    sbSql.Append(" WHERE B.ITEM_ID IN(select * from SplitString('" + strCaseItems + "',','))");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    string[] list3Fields = { "ITEMID", "BILL_ITEM_STATUS", "NON_CART_ITEM_STATUS", "IMPLANT_FLAG" };

                    list3 = objContext.Database.DifferedExecuteQuery<VM_SEARCHITEM_DETAILS>(list2Fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Items Returned: " + list3.Count()); }

                    sbSql.Clear();

                    DataTable List1 = list1.ToDataTable();
                    DataTable List2 = list2.ToDataTable();
                    DataTable List3 = list3.ToDataTable();

                    caseItemsPropDS.Tables.Add(List1);
                    caseItemsPropDS.Tables.Add(List2);
                    caseItemsPropDS.Tables.Add(List3);

                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, caseItemsPropDS);
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

        #endregion


    }
}
