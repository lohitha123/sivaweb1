using AtPar.Repository.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.Common;
using log4net;
using AtPar.POCOEntities;
using AtPar.Data;
using System.Data.SqlClient;
using System.Data;

namespace AtPar.POU.Repos
{
    public class DepartmentRepository : IDepartmentRepository
    {
        ILog _log;
        public DepartmentRepository(ILog log)
        {
            _log = log;
        }

        public List<MT_POU_DEPT> GetDeptDetails(string strDeptId, string strOrgGroupID, string search)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            try
            {
                List<MT_POU_DEPT> lstCodes = null;

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT ORG_GROUP_ID, DEPT_ID, DEPT_NAME, ATTN_TO, ADDRESS1, ADDRESS2, CITY,STATE, ZIP,ALLOW_LOC_SELECT, PHONE, FAX, E_MAIL, STATUS, ");
                    sbSql.Append("STATUS_ACTION = CASE STATUS WHEN '0' THEN 'InActivate' ELSE 'Activate' END, ALERT_NOTIFY_REQ, EMAIL_NOTIFY, COUNTRY, EXCP_APPROVAL_REQ, ");
                    sbSql.Append("INV_COORD_EMAIL, EXCP_APPROVER_EMAIL, RECALL_NOTIFICATION_EMAIL, REMINDER_FREQ, INV_INTERFACE_ENABLE, BILLING_ENABLE, DEFAULT_PRINTER, DEFAULT_DISTRIBUTION_TYPE, ");
                    sbSql.Append("DEFAULT_DESTINATION_LOCATION, CATEGORY_CODE, BILLONLY_BUSINESS_UNIT, BILLONLY_LOCATION, SEND_LOWSTOCK_EMAIL_ALERTS, EMAILID_FOR_LOWSTOCK_ALERTS, SEND_PRODUCT_EXP_EMAIL_ALERTS,");
                    sbSql.Append("EMAILID_FOR_PRODUCT_EXP_ALERTS, NO_OF_CASES_DOWNLOAD, DURATION_TRACKING_EXP, ");
                    sbSql.Append("PERCENTAGE_OPTIMUM_QTY, PREPICK_QA_PROCESS_REQUIRED, BUYER_ID, AUTO_PUTAWAY_ENABLED, STORAGE_AREA, CASE_PICK_STATUS, AUTO_CASE_PICK, BILL_ONLY_CONSIGN_IMPLMENTED, DEFAULT_IMPLANT_TYPE FROM MT_POU_DEPT");

                    if (strOrgGroupID != "All" & strDeptId != string.Empty)
                    {
                        sbSql.Append(" WHERE DEPT_ID='").Append(strDeptId).Append("' AND ORG_GROUP_ID='").Append(strOrgGroupID).Append("'");
                    }
                    else if (!string.IsNullOrEmpty(strDeptId))
                    {
                        sbSql.Append(" WHERE DEPT_ID='").Append(strDeptId).Append("'");
                    }
                    else if (strOrgGroupID != "All")
                    {
                        sbSql.Append(" WHERE ORG_GROUP_ID='").Append(strOrgGroupID).Append("'");

                        if (!string.IsNullOrEmpty(search))
                        {
                            sbSql.Append(" AND (DEPT_ID LIKE '" + search + "%' ");
                            sbSql.Append(" OR DEPT_NAME LIKE '" + search + "%') ");
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(search))
                        {
                            sbSql.Append(" WHERE (DEPT_ID LIKE '" + search + "%' ");
                            sbSql.Append(" OR DEPT_NAME LIKE '" + search + "%') ");
                        }
                    }
                    sbSql.Append(" ORDER BY DEPT_ID ASC");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    try
                    {
                        var fields = new[] { "ORG_GROUP_ID", "DEPT_ID", "DEPT_NAME", "ATTN_TO", "ADDRESS1", "ADDRESS2", "CITY", "STATE", "ZIP","ALLOW_LOC_SELECT", "PHONE", "FAX", "E_MAIL",
                        "STATUS", "STATUS_ACTION","ALERT_NOTIFY_REQ", "EMAIL_NOTIFY", "COUNTRY", "EXCP_APPROVAL_REQ","INV_COORD_EMAIL", "EXCP_APPROVER_EMAIL","RECALL_NOTIFICATION_EMAIL",
                            "REMINDER_FREQ","INV_INTERFACE_ENABLE","BILLING_ENABLE", "DEFAULT_PRINTER", "DEFAULT_DISTRIBUTION_TYPE","DEFAULT_DESTINATION_LOCATION", "CATEGORY_CODE", "BILLONLY_BUSINESS_UNIT",
                            "BILLONLY_LOCATION", "SEND_LOWSTOCK_EMAIL_ALERTS", "EMAILID_FOR_LOWSTOCK_ALERTS", "SEND_PRODUCT_EXP_EMAIL_ALERTS","EMAILID_FOR_PRODUCT_EXP_ALERTS","NO_OF_CASES_DOWNLOAD",
                            "DURATION_TRACKING_EXP","PERCENTAGE_OPTIMUM_QTY","PREPICK_QA_PROCESS_REQUIRED", "BUYER_ID", "AUTO_PUTAWAY_ENABLED","STORAGE_AREA","CASE_PICK_STATUS","AUTO_CASE_PICK","BILL_ONLY_CONSIGN_IMPLMENTED","DEFAULT_IMPLANT_TYPE"};
                        lstCodes = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT>(fields, sbSql.ToString()).ToList();
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Departments Returned: " + lstCodes.Count()); }

                        return lstCodes;
                    }
                    catch (Exception ex)
                    {

                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                        throw ex;
                    }
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

        public long UpdateDeptStatus(string strDeptID, int intStatus, string strOrgGroupID, int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string _strSQL = null;
            int _intRecCnt = 0;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    _strSQL = "SELECT COUNT(DEPARTMENT_ID) FROM MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS WHERE DEPARTMENT_ID='" + strDeptID + "' AND ORG_GROUP_ID='" + strOrgGroupID + "'";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    try
                    {
                        _intRecCnt = objContext.Database.SqlQuery<int>(_strSQL).FirstOrDefault();
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                        return AtparStatusCodes.E_SERVERERROR;
                    }

                    if (_intRecCnt > 0)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : Carts are assigned to the department : " + strDeptID); }
                        return AtparStatusCodes.CRCT_S_CANNOTINACTIVATE;
                    }
                    else
                    {
                        _strSQL = "UPDATE MT_POU_DEPT SET STATUS=" + intStatus + ",LAST_UPDATE_DATE ='" + DateTime.Now + "'  WHERE DEPT_ID='" + strDeptID + "' AND ORG_GROUP_ID='" + strOrgGroupID + "' ";

                        try
                        {
                            objContext.Database.ExecuteSqlCommand(_strSQL);
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }

                    }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }
    }
}
