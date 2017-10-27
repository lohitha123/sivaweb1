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
    public class BillonlyAndConsignedItemsRepository : IBillonlyAndConsignedItemsRepository
    {
        private ILog _log;

        public BillonlyAndConsignedItemsRepository(ILog log)
        {
            _log = log;
        }
      

              
        public Dictionary<string,object> GetConsignmentItemOrderReports(string ItemID, string vendorId, string departmentId, string businessUnit, string cartId, string startDate, string endDate, string poNumber,string [] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            List<VM_MT_POU_CONSIGNEDBILLONLY_HEADERS> lstheader = new List<VM_MT_POU_CONSIGNEDBILLONLY_HEADERS>();
            List<VM_MT_POU_CONSIGNEDBILLONLY_ITEMS> lstdetails = new List<VM_MT_POU_CONSIGNEDBILLONLY_ITEMS>();
            StringBuilder sbSql = new StringBuilder();
            string userID = string.Empty;
            Dictionary<string, object> deatilsDictionary = new Dictionary<string, object>();
            try
            {

                if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString() == "VENDOR")
                {
                    userID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID];
                }
                //userID = "S";
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    //sbSql.Append(" SELECT I.VENDOR_ID,J.VENDOR_NAME,  A.TRANSACTION_ID, C.CAPTURE_DATE_TIME AS TRANSACTION_DATE,C.DEPARTMENT_ID, D.DEPT_NAME FROM ");

                    //FORMAT(GETDATE(), 'MM/dd/yyyy HH:mm:ss')
                    //sbSql.Append(" SELECT I.VENDOR_ID,J.VENDOR_NAME,  A.TRANSACTION_ID, FORMAT(C.CAPTURE_DATE_TIME, 'MM/dd/yyyy HH:mm:ss') AS TRANSACTION_DATE,C.DEPARTMENT_ID, D.DEPT_NAME FROM ");

                    //CONVERT(VARCHAR(10), GETDATE(), 101) + ' ' + CONVERT(VARCHAR(8), GETDATE(), 108)
                    sbSql.Append(" SELECT I.VENDOR_ID,J.VENDOR_NAME,  A.TRANSACTION_ID, CONVERT(VARCHAR(10), C.CAPTURE_DATE_TIME, 101) + ' ' + CONVERT(VARCHAR(8), C.CAPTURE_DATE_TIME, 108) AS TRANSACTION_DATE,C.DEPARTMENT_ID, D.DEPT_NAME FROM ");
                    sbSql.Append(" MT_POU_WORKFLOW_DETAILS A JOIN MT_POU_CHARGECAPTURE_DETAILS B ON A.TRANSACTION_ID=B.TRANSACTION_ID AND A.ITEM_ID = B.ITEM_ID   ");
                    sbSql.Append(" AND A.LINE_NO = B.LINE_NO JOIN MT_POU_CHARGECAPTURE_HEADER C ON B.TRANSACTION_ID = C.TRANSACTION_ID JOIN MT_POU_DEPT D ");
                    sbSql.Append("  ON C.DEPARTMENT_ID = D.DEPT_ID JOIN MT_ATPAR_ORG_GROUP_BUNITS E ON E.ORG_GROUP_ID=D.ORG_GROUP_ID AND E.BUSINESS_UNIT = B.BUSINESS_UNIT ");
                    sbSql.Append(" JOIN PAR_MNGT_ITEM I ON B.ITEM_ID = I.ITEM_ID AND D.ORG_GROUP_ID = I.ORG_GROUP_ID  JOIN PAR_MNGT_VENDOR J ON I.VENDOR_ID = J.VENDOR_ID ");
                    sbSql.Append(" WHERE C.CAPTURE_DATE_TIME >= '" + startDate + "' AND C.CAPTURE_DATE_TIME < DATEADD(DAY,1,CONVERT(DATETIME,'" + endDate + "', 101))  ");
                  
                    if (!string.IsNullOrEmpty(vendorId))
                    {
                        sbSql.Append("  AND I.VENDOR_ID LIKE '" + vendorId + "%' ");
                    }

                    if (!string.IsNullOrEmpty(departmentId))
                    {
                        sbSql.Append("  AND (C.DEPARTMENT_ID LIKE '" + departmentId + "%' OR D.DEPT_NAME LIKE '" + departmentId + "%') ");

                    }
                    if (!string.IsNullOrEmpty(userID))
                    {
                        sbSql.Append("AND J.VEND_USER_ID ='" + userID + "' ");
                    }
                    
                    sbSql.Append(" GROUP BY I.VENDOR_ID,J.VENDOR_NAME,A.TRANSACTION_ID, C.CAPTURE_DATE_TIME,C.DEPARTMENT_ID, D.DEPT_NAME    ");
                    sbSql.Append(" UNION SELECT I.VENDOR_ID,J.VENDOR_NAME,A.TRANSACTION_ID, C.CAPTURE_DATE_TIME AS TRANSACTION_DATE, C.DEPARTMENT_ID, D.DEPT_NAME ");
                    sbSql.Append(" FROM MT_POU_WORKFLOW_DETAILS A JOIN MT_POU_CHARGECAPTURE_DETAILS B ON A.TRANSACTION_ID = B.TRANSACTION_ID AND ");
                    sbSql.Append(" A.ITEM_ID = B.ITEM_ID AND A.LINE_NO = B.LINE_NO JOIN MT_POU_CHARGECAPTURE_HEADER C ON B.TRANSACTION_ID = C.TRANSACTION_ID ");
                    sbSql.Append(" JOIN MT_POU_DEPT D ON C.DEPARTMENT_ID = D.DEPT_ID JOIN MT_POU_BILLONLY_ITEMS I ON B.ITEM_ID = I.ITEM_ID  ");
                    sbSql.Append(" AND D.ORG_GROUP_ID = I.ORG_GROUP_ID JOIN PAR_MNGT_VENDOR J ON I.VENDOR_ID = J.VENDOR_ID WHERE ");
                    sbSql.Append(" C.CAPTURE_DATE_TIME >= '" + startDate + "' AND C.CAPTURE_DATE_TIME < DATEADD(DAY, 1, CONVERT(DATETIME, '" + endDate + "', 101)) ");
                    if (!string.IsNullOrEmpty(vendorId))
                    {
                        sbSql.Append("  AND I.VENDOR_ID LIKE '" + vendorId + "%' ");
                    }

                    if (!string.IsNullOrEmpty(departmentId))
                    {
                        sbSql.Append("  AND (C.DEPARTMENT_ID LIKE '" + departmentId + "%' OR D.DEPT_NAME LIKE '" + departmentId + "%') ");

                    }
                    if (!string.IsNullOrEmpty(userID))
                    {
                        sbSql.Append("AND J.VEND_USER_ID ='" + userID + "' ");
                    }
                    sbSql.Append(" GROUP BY I.VENDOR_ID,J.VENDOR_NAME, A.TRANSACTION_ID, C.CAPTURE_DATE_TIME, C.DEPARTMENT_ID, D.DEPT_NAME ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }
                    try
                    {
                        var fields = new[] {"VENDOR_ID","VENDOR_NAME", "TRANSACTION_ID", "TRANSACTION_DATE", "DEPARTMENT_ID", "DEPT_NAME"};
                        lstheader = objContext.Database.DifferedExecuteQuery<VM_MT_POU_CONSIGNEDBILLONLY_HEADERS>(fields,sbSql.ToString()).ToList();
                    }
                    catch (Exception ex)
                    {

                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }
                        throw ex;
                    }
                    sbSql.Remove(0, sbSql.Length);
                    //sbSql.Append(" SELECT DISTINCT B.ITEM_ID, I.SHORT_DESCR, I.VENDOR_ID,  A.TRANSACTION_ID,B.ISSUE_PRICE, B.ITEM_LOTNUMBER,B.ITEM_SRNUMBER, ");
                    sbSql.Append(" SELECT DISTINCT B.ITEM_ID, I.SHORT_DESCR, I.VENDOR_ID,  A.TRANSACTION_ID,ISNULL(B.ISSUE_PRICE, 0 ) AS ISSUE_PRICE, B.ITEM_LOTNUMBER,B.ITEM_SRNUMBER, ");
                    sbSql.Append(" B.UOM,A.PO_NO, VENDOR_REVIEW_STATUS,DEPT_REVIEW_STATUS,EXCEPTION_REVIEW_STATUS,WORKFLOW_INSTANCE_ID,D.EXCP_APPROVAL_REQ , ");
                    sbSql.Append(" CASE WHEN I.CATALOG_FLG = 0 THEN 'No' ELSE 'Yes' END CATALOG_FLG,A.STATUS ,B.CART_ID AS PAR_LOCATION_ID, B.BUSINESS_UNIT, ");
                    sbSql.Append(" C.DEPARTMENT_ID, (ISNULL(B.ITEM_COUNT, 0) + ISNULL(B.ISSUE_QTY, 0)) QTY ,A.LINE_NO, B.LINE_COMMENTS FROM ");
                    sbSql.Append(" MT_POU_WORKFLOW_DETAILS A JOIN MT_POU_CHARGECAPTURE_DETAILS B ON A.TRANSACTION_ID = B.TRANSACTION_ID ");
                    sbSql.Append(" AND A.ITEM_ID = B.ITEM_ID AND A.LINE_NO = B.LINE_NO JOIN MT_POU_CHARGECAPTURE_HEADER C ON B.TRANSACTION_ID = C.TRANSACTION_ID ");
                    sbSql.Append(" JOIN MT_POU_DEPT D ON C.DEPARTMENT_ID = D.DEPT_ID JOIN MT_ATPAR_ORG_GROUP_BUNITS E ON E.ORG_GROUP_ID = D.ORG_GROUP_ID ");
                    sbSql.Append("  AND E.BUSINESS_UNIT = B.BUSINESS_UNIT  JOIN PAR_MNGT_ITEM I ON B.ITEM_ID = I.ITEM_ID AND D.ORG_GROUP_ID = I.ORG_GROUP_ID ");
                    sbSql.Append(" JOIN PAR_MNGT_VENDOR J ON I.VENDOR_ID = J.VENDOR_ID  WHERE C.CAPTURE_DATE_TIME >= '" + startDate + "' AND ");
                    sbSql.Append(" C.CAPTURE_DATE_TIME < DATEADD(DAY, 1, CONVERT(DATETIME, '" + endDate + "', 101))  ");


                    if (!string.IsNullOrEmpty(ItemID))
                    {
                        sbSql.Append(" AND   B.ITEM_ID LIKE '" + ItemID + "%' ");
                    }

                    if (!string.IsNullOrEmpty(vendorId))
                    {
                        sbSql.Append("  AND I.VENDOR_ID LIKE '" + vendorId + "%' ");
                    }

                    if (!string.IsNullOrEmpty(departmentId))
                    {
                        sbSql.Append("  AND (C.DEPARTMENT_ID LIKE '" + departmentId + "%' OR D.DEPT_NAME LIKE '" + departmentId + "%') ");

                    }
                    if (!string.IsNullOrEmpty(cartId))
                    {
                        sbSql.Append("  AND B.CART_ID LIKE '" + cartId + "%' ");
                    }

                    if (!string.IsNullOrEmpty(businessUnit))
                    {
                        sbSql.Append(" AND B.BUSINESS_UNIT LIKE '" + businessUnit + "%' ");

                    }

                    if (!string.IsNullOrEmpty(poNumber))
                    {
                        sbSql.Append(" AND ISNULL(A.PO_NO, '') ");
                        sbSql.Append("  LIKE '" + poNumber + "%' ");
                    }
                    if (!string.IsNullOrEmpty(userID))
                    {
                        sbSql.Append("AND J.VEND_USER_ID ='" + userID + "' ");
                    }
                    //sbSql.Append(" UNION SELECT DISTINCT B.ITEM_ID, I.DESCRIPTION SHORT_DESCR, I.VENDOR_ID,  A.TRANSACTION_ID,B.ISSUE_PRICE,B.ITEM_LOTNUMBER, ");
                    sbSql.Append(" UNION SELECT DISTINCT B.ITEM_ID, I.DESCRIPTION SHORT_DESCR, I.VENDOR_ID,  A.TRANSACTION_ID,ISNULL(B.ISSUE_PRICE, 0 ) AS ISSUE_PRICE,B.ITEM_LOTNUMBER, ");
                    sbSql.Append("  B.ITEM_SRNUMBER,B.UOM,A.PO_NO, VENDOR_REVIEW_STATUS,DEPT_REVIEW_STATUS,EXCEPTION_REVIEW_STATUS,WORKFLOW_INSTANCE_ID,  ");
                    sbSql.Append(" D.EXCP_APPROVAL_REQ ,CASE WHEN I.CATALOG_FLG = 0 THEN 'No' ELSE 'Yes' END CATALOG_FLG,A.STATUS ,B.CART_ID AS PAR_LOCATION_ID, B.BUSINESS_UNIT ,C.DEPARTMENT_ID, ");
                    sbSql.Append(" (ISNULL(B.ITEM_COUNT, 0) + ISNULL(B.ISSUE_QTY, 0)) QTY,A.LINE_NO, B.LINE_COMMENTS  FROM MT_POU_WORKFLOW_DETAILS A JOIN MT_POU_CHARGECAPTURE_DETAILS B ON A.TRANSACTION_ID = B.TRANSACTION_ID ");
                    sbSql.Append(" AND A.ITEM_ID = B.ITEM_ID AND A.LINE_NO = B.LINE_NO JOIN MT_POU_CHARGECAPTURE_HEADER C ON B.TRANSACTION_ID = C.TRANSACTION_ID ");
                    sbSql.Append("  JOIN MT_POU_DEPT D ON C.DEPARTMENT_ID = D.DEPT_ID JOIN MT_POU_BILLONLY_ITEMS I ON B.ITEM_ID = I.ITEM_ID AND D.ORG_GROUP_ID = I.ORG_GROUP_ID ");
                    sbSql.Append(" JOIN PAR_MNGT_VENDOR J ON I.VENDOR_ID = J.VENDOR_ID  WHERE C.CAPTURE_DATE_TIME >= '" + startDate + "' AND C.CAPTURE_DATE_TIME < DATEADD(DAY, 1, CONVERT(DATETIME, '" + endDate + "', 101)) ");

                  

                    if (!string.IsNullOrEmpty(ItemID))
                    {
                        sbSql.Append(" AND   B.ITEM_ID LIKE '" + ItemID + "%' ");
                    }

                    if (!string.IsNullOrEmpty(vendorId))
                    {
                        sbSql.Append("  AND I.VENDOR_ID LIKE '" + vendorId + "%' ");
                    }

                    if (!string.IsNullOrEmpty(departmentId))
                    {
                        sbSql.Append("  AND (C.DEPARTMENT_ID LIKE '" + departmentId + "%' OR D.DEPT_NAME LIKE '" + departmentId + "%') ");

                    }
                    if (!string.IsNullOrEmpty(cartId))
                    {
                        sbSql.Append("  AND B.CART_ID LIKE '" + cartId + "%' ");
                    }

                    if (!string.IsNullOrEmpty(businessUnit))
                    {
                        sbSql.Append(" AND B.BUSINESS_UNIT LIKE '" + businessUnit + "%' ");

                    }
                    
                    if (!string.IsNullOrEmpty(poNumber))
                    {
                        sbSql.Append(" AND ISNULL(A.PO_NO, '') ");
                        sbSql.Append("  LIKE '" + poNumber + "%' ");
                    }                    

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY,dbLog))); }
                    }
                    try
                    {
                         var fields = new[] { "ITEM_ID", "SHORT_DESCR", "VENDOR_ID", "TRANSACTION_ID", "ISSUE_PRICE", "ITEM_LOTNUMBER", "ITEM_SRNUMBER", "UOM", "PO_NO", "VENDOR_REVIEW_STATUS", "DEPT_REVIEW_STATUS", "EXCEPTION_REVIEW_STATUS", "WORKFLOW_INSTANCE_ID", "EXCP_APPROVAL_REQ", "CATALOG_FLG", "STATUS", "PAR_LOCATION_ID", "BUSINESS_UNIT", "DEPARTMENT_ID", "QTY", "LINE_NO", "LINE_COMMENTS" };


                        lstdetails = objContext.Database.DifferedExecuteQuery<VM_MT_POU_CONSIGNEDBILLONLY_ITEMS>(fields,sbSql.ToString()).ToList();
                        //lstdetails=  from dtls in lstdetails
                        //             where dtls.ISSUE_PRICE == null
                        //                       select dtls;
                    }
                    catch (Exception ex)
                    {

                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }
                        throw ex;
                    }

                }


                deatilsDictionary.Add("lstheader", lstheader);
                deatilsDictionary.Add("lstdetails", lstdetails);

                return deatilsDictionary;
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

        public long UpdateItemStatus(int transID, string itemID, string status)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("UPDATE MT_POU_WORKFLOW_DETAILS SET STATUS = "+ status );
                    sbSql.Append("WHERE TRANSACTION_ID = "+ transID  + " AND ITEM_ID = '" + itemID + "' ");
                                                       
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY,dbLog))); }
                    }

                   int updateCount=  objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Records Updated: {1}", methodBaseName, updateCount)); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long UpdateNonCatalogItemDtls(VM_SEARCHITEM_DETAILS itemDetails, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int Count = 0;
            long severStatusCode = -1;
            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT COUNT(ITEM_ID) FROM MT_POU_BILLONLY_ITEMS");
                    sbSql.Append(" WHERE ITEM_ID = '" + itemDetails.ITEMID + "' ");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }
                    }

                    try
                    {
                        Count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                    }
                    sbSql.Remove(0, sbSql.Length);
                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Reocrds Count: {1}", methodBaseName, Count)); }
                    if (Count == 0)
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                        sbSql.Append("SELECT COUNT(ITEM_ID) FROM PAR_MNGT_ITEM");
                        sbSql.Append("WHERE ITEM_ID = '" + itemDetails.ITEMID + "' ");
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }
                        }

                        try
                        {
                            Count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                        }

                        if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Reocrds Count:: {1}", methodBaseName, Count)); }


                        if (Count > 0)
                        {
                            return AtparStatusCodes.E_POU_ITEMEXIST;
                        }
                    }

                    SqlParameter[] sqlParms = new SqlParameter[17];
                    string SqlStr = string.Empty;



                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sqlParms[0] = new SqlParameter("@ACTUAL_ITEM_ID", SqlDbType.NVarChar);
                    sqlParms[0].Value = string.IsNullOrEmpty(itemDetails.ACTUAL_ITEM_ID) ? "" : itemDetails.ACTUAL_ITEM_ID;

                    sqlParms[1] = new SqlParameter("@ITEM_ID", SqlDbType.NVarChar);
                    sqlParms[1].Value = string.IsNullOrEmpty(itemDetails.ITEMID) ? "" : itemDetails.ITEMID;

                    sqlParms[2] = new SqlParameter("@CUST_ITEM_NO", SqlDbType.NVarChar);
                    sqlParms[2].Value = string.IsNullOrEmpty(itemDetails.CUST_ITEM_ID) ? "" : itemDetails.CUST_ITEM_ID;

                    sqlParms[3] = new SqlParameter("@DESCRIPTION", SqlDbType.NVarChar);
                    sqlParms[3].Value = string.IsNullOrEmpty(itemDetails.ITEM_DESCR) ? "" : itemDetails.ITEM_DESCR;

                    sqlParms[4] = new SqlParameter("@MFG_ITEM_ID", SqlDbType.NVarChar);
                    sqlParms[4].Value = string.IsNullOrEmpty(itemDetails.MFG_ITEM_ID) ? "" : itemDetails.MFG_ITEM_ID;

                    sqlParms[5] = new SqlParameter("@VEND_ITEM_ID", SqlDbType.NVarChar);
                    sqlParms[5].Value = string.IsNullOrEmpty(itemDetails.VENDOR_ITEM_ID) ? "" : itemDetails.VENDOR_ITEM_ID;

                    sqlParms[6] = new SqlParameter("@GTIN", SqlDbType.NVarChar);
                    sqlParms[6].Value = string.IsNullOrEmpty(itemDetails.GTIN) ? "" : itemDetails.GTIN;

                    sqlParms[7] = new SqlParameter("@UPC_ID", SqlDbType.NVarChar);
                    sqlParms[7].Value = string.IsNullOrEmpty(itemDetails.UPCID) ? "" : itemDetails.UPCID;

                    sqlParms[8] = new SqlParameter("@VENDOR_ID", SqlDbType.NVarChar);
                    sqlParms[8].Value = string.IsNullOrEmpty(itemDetails.VENDOR_ID) ? "" : itemDetails.VENDOR_ID;

                    sqlParms[9] = new SqlParameter("@ITEM_PRICE", SqlDbType.Float);
                    sqlParms[9].Value = itemDetails.ITEM_PRICE;

                    sqlParms[10] = new SqlParameter("@UOM", SqlDbType.NVarChar);
                    sqlParms[10].Value = string.IsNullOrEmpty(itemDetails.UOM) ? "" : itemDetails.UOM;

                    sqlParms[11] = new SqlParameter("@USER_ID", SqlDbType.NVarChar);
                    sqlParms[11].Value = userID;

                    sqlParms[12] = new SqlParameter("@LOT_CONTROLLED", SqlDbType.NVarChar);
                    sqlParms[12].Value = itemDetails.LOT_CONTROLLED;

                    sqlParms[13] = new SqlParameter("@SERIAL_CONTROLLED", SqlDbType.NVarChar);
                    sqlParms[13].Value = string.IsNullOrEmpty(itemDetails.SERIAL_CONTROLLED) ? "" : itemDetails.SERIAL_CONTROLLED;

                    sqlParms[14] = new SqlParameter("@TRANSACTION_ID", SqlDbType.NVarChar);
                    sqlParms[14].Value = itemDetails.TRANSACTION_ID;

                    sqlParms[15] = new SqlParameter("@REVEIWER_TYPE", SqlDbType.NVarChar);
                    sqlParms[15].Value = string.IsNullOrEmpty(itemDetails.REVEIWER_TYPE) ? "" : itemDetails.REVEIWER_TYPE;

                    sqlParms[16] = new SqlParameter("@STATUS_CODE", SqlDbType.Int);
                    sqlParms[16].Direction = ParameterDirection.Output;


                    SqlStr = "exec UpdateNonCatalogItemDtls @ACTUAL_ITEM_ID,@ITEM_ID,@CUST_ITEM_NO,@DESCRIPTION,@MFG_ITEM_ID,@VEND_ITEM_ID,@GTIN,@UPC_ID,@VENDOR_ID,@ITEM_PRICE,@UOM,@USER_ID,@LOT_CONTROLLED,@SERIAL_CONTROLLED,@TRANSACTION_ID,@REVEIWER_TYPE,@STATUS_CODE OUT";

                    // " '" sqlParms[0].Value; +"'" ,"+sqlParms[1].Value,sqlParms[2].Value,sqlParms[3].Value,sqlParms[4].Value,sqlParms[5].Value,sqlParms[6].Value,sqlParms[7].Value,sqlParms[8].Value,sqlParms[9].Value,sqlParms[10].Value,sqlParms[11].Value,sqlParms[12].Value,sqlParms[13].Value,sqlParms[14].Value,sqlParms[15].Value,sqlParms[16].Value";

                    if (!_log.IsDebugEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog));
                    }
                    try
                    {
                        var count = objContext.Database.ExecuteSqlCommand(SqlStr, sqlParms);
                        severStatusCode = (int)sqlParms[16].Value;
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
                    return severStatusCode == AtparStatusCodes.ATPAR_OK ? AtparStatusCodes.ATPAR_OK : AtparStatusCodes.E_SERVERERROR;
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

        public List<PAR_MNGT_VENDOR> GetVendorsInfo(string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT VENDOR_ID, VENDOR_NAME, VEND_USER_ID, ADD_ITEMS_LFLAG FROM PAR_MNGT_VENDOR WHERE STATUS = 0");
                    if (orgGrpID != "All")
                    {
                        sbSql.Append(" AND ORG_GROUP_ID='" + orgGrpID + "'");
                    }
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }
                    }

                    var fields = new[] { "VENDOR_ID", "VENDOR_NAME", "VEND_USER_ID", "ADD_ITEMS_LFLAG" };

                    var lstBillOnlyItems = objContext.Database.DifferedExecuteQuery<PAR_MNGT_VENDOR>(fields, sbSql.ToString()).ToList();

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

        public long UpdateConsignmentItemOrderReports(string transID, string itemID, bool vendorResponse, bool approverResponse, bool reviewerResponse, decimal itemPrice, string workflowInstanceID, string responseFrom, string uom, string deptID, string lotID, string serialID, int lineNo, string comments,string reviewerType,string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int Count = 0;
            long severStatusCode = -1;
            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("UPDATE MT_POU_CHARGECAPTURE_DETAILS SET LINE_COMMENTS = '" + comments  + "'");
                    sbSql.Append(" WHERE TRANSACTION_ID = " +transID + " AND ITEM_ID='"+ itemID  + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }
                    }

                    try
                    {
                        Count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}{3}{4}", methodBaseName, Globals.EXCEPTION, ex.ToString(), Globals.QUERY, sbSql.ToString())); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                    }
                    sbSql.Remove(0, sbSql.Length);
                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Reocrds Count: {1}", methodBaseName, Count)); }
                   
                    SqlParameter[] sqlParms = new SqlParameter[14];
                    string SqlStr = string.Empty;

                    Guid wfid = new Guid(workflowInstanceID);

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sqlParms[0] = new SqlParameter("@pWorkflowInstanceId", SqlDbType.UniqueIdentifier);
                    sqlParms[0].Value = wfid;

                    sqlParms[1] = new SqlParameter("@pVendor", SqlDbType.NVarChar);
                    sqlParms[1].Value = vendorResponse ? "Y" :"N";

                    sqlParms[2] = new SqlParameter("@pApprover", SqlDbType.NVarChar);
                    sqlParms[2].Value = approverResponse ? "Y" : "N"; 

                    sqlParms[3] = new SqlParameter("@pReviewer", SqlDbType.NVarChar);
                    sqlParms[3].Value = reviewerResponse ? "Y" : "N"; 

                    sqlParms[4] = new SqlParameter("@pItemPrice", SqlDbType.NVarChar);
                    sqlParms[4].Value = itemPrice;

                    sqlParms[5] = new SqlParameter("@pUom", SqlDbType.NVarChar);
                    sqlParms[5].Value =uom;

                    sqlParms[6] = new SqlParameter("@pItemId", SqlDbType.NVarChar);
                    sqlParms[6].Value = string.IsNullOrEmpty(itemID) ? "" : itemID;

                    sqlParms[7] = new SqlParameter("@pTransId", SqlDbType.NVarChar);
                    sqlParms[7].Value = transID;

                    sqlParms[8] = new SqlParameter("@pSubFuncName", SqlDbType.NVarChar);
                    sqlParms[8].Value = reviewerType;

                    sqlParms[9] = new SqlParameter("@pUserID", SqlDbType.NVarChar);
                    sqlParms[9].Value = userID;                   

                   // if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Reocrds Count: {1}", methodBaseName, lotID)); }
                    sqlParms[10] = new SqlParameter("@pLotID", SqlDbType.NVarChar);
                    sqlParms[10].Value = string.IsNullOrEmpty(lotID) || lotID == "&nbsp;" ? DBNull.Value.ToString() : lotID;

                   // if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Reocrds Count: {1}", methodBaseName, serialID)); }
                    sqlParms[11] = new SqlParameter("@pSerialID", SqlDbType.NVarChar);
                    sqlParms[11].Value = string.IsNullOrEmpty(serialID) || serialID == "&nbsp;" ? DBNull.Value.ToString() : serialID;

                    sqlParms[12] = new SqlParameter("@pLineNo", SqlDbType.Int);
                    sqlParms[12].Value = lineNo;

                    //if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Reocrds Count: {1}", methodBaseName, comments)); }
                    sqlParms[13] = new SqlParameter("@pComments", SqlDbType.NVarChar);
                    sqlParms[13].Value = string.IsNullOrEmpty(comments) || comments == "&nbsp;" ? DBNull.Value.ToString() : comments;

                    SqlStr = "exec UpdateConsignmentItemOrderReport @pWorkflowInstanceId, @pVendor,@pApprover,@pReviewer,@pItemPrice,@pUom,@pItemId,@pTransId,@pSubFuncName,@pUserID,@pLotID,@pSerialID,@pLineNo,@pComments";
                    
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
                   //severStatusCode= severStatusCode == AtparStatusCodes.ATPAR_OK ? AtparStatusCodes.ATPAR_OK : AtparStatusCodes.E_SERVERERROR;
                    return AtparStatusCodes.ATPAR_OK;
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
            return AtparStatusCodes.ATPAR_OK;
        }

    }
}
