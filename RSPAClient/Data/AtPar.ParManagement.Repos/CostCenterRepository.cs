using AtPar.Repository.Interfaces.ParManagement;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using System.Data.SqlClient;
using AtPar.ParManagement.Repos;
using AtPar.ViewModel;
using System.Data;

namespace AtPar.ParManagement.Repos
{
    public class CostCenterRepository : ICostcenterRepository
    {
        private ILog _log;

        public CostCenterRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CostCenterRepository));
        }

        /// <summary>
        /// Used to verify Cost Center exist or not in DB
        /// </summary>
        /// <param name="costCenterCode"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="deptID"></param>
        /// <returns>If Cost Center exists returns ATPAR_E_COSTCENTEREXISTS, if not returns ATPAR_OK, in case of any
        /// exception returns ATPAR_E_LOCALDBSELECTFAIL</returns>
        public long IsCostCenterExistOrNot(string costCenterCode, string orgGroupID, string deptID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var existingCostCenterCount = objContext.PAR_MNGT_COST_CENTER.Count(c => c.COST_CENTER_CODE == costCenterCode
                                                                            && c.ORG_ID == orgGroupID && c.DEPT_ID == deptID);

                    if (existingCostCenterCount > 0)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Cost Center : " + costCenterCode + " already exists"); }
                        return AtparStatusCodes.ATPAR_E_COSTCENTEREXISTS;
                    }
                    else
                    {
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }

        }

        /// <summary>
        /// Used to insert Cost Center to the DB
        /// </summary>
        /// <param name="costCenter"></param>
        /// <returns>Returns ATPAR_OK on success, if any exception returns ATPAR_E_LOCALDBINSERTFAIL</returns>
        public long InsertCostCenter(PAR_MNGT_COST_CENTER costCenter)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int status = 0;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO PAR_MNGT_COST_CENTER ");
                    sbSql.Append("(ORG_ID, COST_CENTER_CODE, DESCRIPTION, STATUS, UPDATE_DATE, UPDATE_USER_ID, DEPT_ID) ");
                    sbSql.Append("VALUES (");
                    sbSql.Append("'" + costCenter.ORG_ID + "', ");
                    sbSql.Append("'" + costCenter.COST_CENTER_CODE + "', ");
                    sbSql.Append("'" + costCenter.DESCRIPTION + "', ");
                    sbSql.Append("" + status + ", GETDATE(), ");
                    sbSql.Append("'" + costCenter.UPDATE_USER_ID + "',");
                    sbSql.Append("'" + costCenter.DEPT_ID + "')");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }

        }

        /// <summary>
        /// Used to update Cost Center to the DB
        /// </summary>
        /// <param name="costCenter"></param>
        /// <returns>Returns ATPAR_OK on success, if any exception returns ATPAR_E_LOCADBUPDATEFAIL</returns>
        public long UpdateCostCenter(PAR_MNGT_COST_CENTER costCenter)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
          

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE PAR_MNGT_COST_CENTER SET DESCRIPTION = '" + costCenter.DESCRIPTION + "', ");
                    sbSql.Append("UPDATE_USER_ID='" + costCenter.UPDATE_USER_ID + "', ");
                    sbSql.Append("UPDATE_DATE = GETDATE() ");                
                    sbSql.Append("WHERE COST_CENTER_CODE='" + costCenter.COST_CENTER_CODE + "' ");
                    sbSql.Append("AND ORG_ID='" + costCenter.ORG_ID + "'");
                    sbSql.Append("AND DEPT_ID='" + costCenter.DEPT_ID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        /// <summary>
        /// Used to check provided Cost Center has Par Locations
        /// </summary>
        /// <param name="costCenterCode"></param>
        /// <returns>If Cost Center has Par Locations returns CRCT_S_CANNOTINACTIVATE, if not returns ATPAR_OK, if any exception
        /// returns ATPAR_E_LOCALDBSELECTFAIL</returns>
        public long CanCostCenterInActivate(string costCenterCode)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    int cnt = objContext.PAR_MNGT_PAR_LOC_HEADER.Count(x => x.COST_CENTER_CODE == costCenterCode);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (cnt > 0)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Item Returned " + cnt); }
                        return AtparStatusCodes.CC_S_CANNOTINACTIVATE;
                    }

                    return AtparStatusCodes.ATPAR_OK;

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }

        }

        /// <summary>
        /// Used to update the Cost Center Status Active and InActive
        /// </summary>
        /// <param name="status"></param>
        /// <param name="orgID"></param>
        /// <param name="costCenterCode"></param>
        /// <param name="deptID"></param>
        /// <returns>Returns ATPAR_OK on success, if any exception returns ATPAR_E_LOCALDBUPDATEFAIL</returns>
        public long UpdateCostCenterStatus(int status, string orgID, string costCenterCode, string deptID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE PAR_MNGT_COST_CENTER SET STATUS=" + status + " WHERE ORG_ID ='" + orgID + "' ");
                    sbSql.Append("AND COST_CENTER_CODE='" + costCenterCode + "' AND DEPT_ID = '" + deptID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        /// <summary>
        /// Used to get the Cost Centers of the users
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public List<string> GetCostCenterOrgIds(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                List<string> lstCostCenters = null;

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    SqlParameter paramUserId = new SqlParameter("@userid", SqlDbType.NVarChar, 20);
                    paramUserId.Value = userID;

                    lstCostCenters = objContext.Database.SqlQuery<string>("exec GetCostCenterOrgGroupIds @userid", paramUserId).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCostCenters.Count); }

                }
                return lstCostCenters;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        /// <summary>
        /// To get the Reason Codes 
        /// </summary>
        /// <param name="costCenterCode"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="deptID"></param>
        /// <returns></returns>
        public List<VM_COST_CENTER_CODES> GetCodes(string costCenterCode, string orgGroupID, string deptID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT C.ORG_ID, C.COST_CENTER_CODE , C.[DESCRIPTION], C.UPDATE_USER_ID, C.STATUS, C.DEPT_ID, ");
                    sbSQL.Append("CASE WHEN (D.DEPT_NAME IS NULL OR D.DEPT_NAME = '')  THEN C.DEPT_ID ELSE D.DEPT_ID + ' - ' + D.DEPT_NAME END AS DEPTNAME, ");
                    sbSQL.Append("CASE WHEN (U.FIRST_NAME IS NULL OR U.FIRST_NAME = '') AND (U.MIDDLE_INITIAL IS NULL OR U.MIDDLE_INITIAL = '') AND (U.LAST_NAME IS NULL OR U.LAST_NAME = '') ");
                    sbSQL.Append("THEN C.UPDATE_USER_ID ELSE U.FIRST_NAME + ' ' + U.MIDDLE_INITIAL + ' ' + U.LAST_NAME + '(' + U.[USER_ID] + ')' END AS USERNAME ");
                    sbSQL.Append(" FROM PAR_MNGT_COST_CENTER C ");
                    sbSQL.Append("LEFT JOIN MT_POU_DEPT D ON C.DEPT_ID = D.DEPT_ID AND C.ORG_ID = D.ORG_GROUP_ID ");
                    sbSQL.Append("LEFT JOIN MT_ATPAR_USER U ON C.UPDATE_USER_ID = U.[USER_ID] ");

                    if (costCenterCode != string.Empty & orgGroupID == "All")
                    {
                        sbSQL.Append(" WHERE C.COST_CENTER_CODE='" + costCenterCode + "' AND C.DEPT_ID = '").Append(deptID).Append("'");
                    }
                    else if (orgGroupID != "All" & costCenterCode == string.Empty)
                    {
                        sbSQL.Append(" WHERE C.ORG_ID='" + orgGroupID + "'");
                    }
                    else if (orgGroupID != "All" & costCenterCode != string.Empty)
                    {
                        sbSQL.Append(" WHERE C.COST_CENTER_CODE='" + costCenterCode + "' AND C.ORG_ID='" + orgGroupID + "' AND C.DEPT_ID = '").Append(deptID).Append("'");
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstCostCostCenters = objContext.Database.SqlQuery<VM_COST_CENTER_CODES>(sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCostCostCenters.Count); }


                    return lstCostCostCenters;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }

        }

        public List<VM_COST_CENTER_CODES> GetCostCenters(string orgGroupID, string search)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT C.ORG_ID, C.COST_CENTER_CODE , C.[DESCRIPTION], C.UPDATE_USER_ID, C.STATUS, C.DEPT_ID, ");
                    sbSQL.Append("CASE WHEN (D.DEPT_NAME IS NULL OR D.DEPT_NAME = '')  THEN C.DEPT_ID ELSE D.DEPT_ID + ' - ' + D.DEPT_NAME END AS DEPTNAME, ");
                    sbSQL.Append("CASE WHEN (U.FIRST_NAME IS NULL OR U.FIRST_NAME = '') AND (U.MIDDLE_INITIAL IS NULL OR U.MIDDLE_INITIAL = '') AND (U.LAST_NAME IS NULL OR U.LAST_NAME = '') ");
                    sbSQL.Append("THEN C.UPDATE_USER_ID ELSE U.FIRST_NAME + ' ' + U.MIDDLE_INITIAL + ' ' + U.LAST_NAME + '(' + U.[USER_ID] + ')' END AS USERNAME ");
                    sbSQL.Append(" FROM PAR_MNGT_COST_CENTER C ");
                    sbSQL.Append("LEFT JOIN MT_POU_DEPT D ON C.DEPT_ID = D.DEPT_ID AND C.ORG_ID = D.ORG_GROUP_ID ");
                    sbSQL.Append("LEFT JOIN MT_ATPAR_USER U ON C.UPDATE_USER_ID = U.[USER_ID] ");

                    if (orgGroupID != "All")
                    {
                        sbSQL.Append(" WHERE C.ORG_ID='" + orgGroupID + "'");

                        if (!string.IsNullOrEmpty(search))
                        {
                            sbSQL.Append("AND (C.COST_CENTER_CODE LIKE '" + search + "%' ");
                            sbSQL.Append("OR C.[DESCRIPTION] LIKE '" + search + "%' )");
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(search))
                        {
                            sbSQL.Append("WHERE (C.COST_CENTER_CODE LIKE '" + search + "%' ");
                            sbSQL.Append("OR C.[DESCRIPTION] LIKE '" + search + "%' )");
                        }
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstCostCostCenters = objContext.Database.SqlQuery<VM_COST_CENTER_CODES>(sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCostCostCenters.Count); }


                    return lstCostCostCenters;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }

        }

        /// <summary>
        /// Used to get the Departments
        /// </summary>
        /// <returns></returns>
        public List<MT_POU_DEPT> GetDepartments()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT DISTINCT DEPT_ID, DEPT_NAME, CASE WHEN (DEPT_NAME IS NULL OR DEPT_NAME = '') THEN DEPT_ID  ");
                    sbSQL.Append("ELSE DEPT_ID + ' - ' + DEPT_NAME END AS DEPARTMENT FROM MT_POU_DEPT WHERE STATUS = 0 ");

                    var fields = new[] { "DEPT_ID", "DEPT_NAME", "DEPARTMENT" };

                    var lstdepts = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT>(fields, sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstdepts.Count); }

                    return lstdepts;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }


        }

    }
}
