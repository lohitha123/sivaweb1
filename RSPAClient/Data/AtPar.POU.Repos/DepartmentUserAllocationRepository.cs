using AtPar.Repository.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using AtPar.Common;
using log4net;
using System.Data.Entity.Core.Objects;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.ViewModel;
using System.Data.SqlClient;
using System.Text;

namespace AtPar.POU.Repos
{
    public class DepartmentUserAllocationRepository : IDepartmentUserAllocationRepository
    {
        private ILog _log;

        public DepartmentUserAllocationRepository(ILog log)
        {
            this._log = log;
            this._log.SetLoggerType(typeof(DepartmentUserAllocationRepository));
            log.Debug("DepartmentUserAllocationRepository");
        }

        /// <summary>
        /// Used to get the Departments based on search inputs and org group id
        /// dept id and description are search inputs
        /// </summary>
        /// <returns></returns>
        public List<MT_POU_DEPT> GetDepartments(string departmentID, string deptDescr, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            string SqlStr = string.Empty;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter parampDepartmentID = new SqlParameter("@DepartmentID", departmentID);
                    SqlParameter parampDeptDescr = new SqlParameter("@Description", deptDescr);
                    SqlParameter paramOrgGroupID = new SqlParameter("@OrgGroupID", orgGroupID);

                    object[] parameters = { parampDepartmentID, parampDeptDescr, paramOrgGroupID };

                    SqlStr = "EXEC GetDepartment @DepartmentID,@Description,@OrgGroupID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "DEPT_ID", "DEPT_NAME" };

                    var lstDepartments = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT>(fields, SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Departments Returned: {1}", methodBaseName, lstDepartments != null ? lstDepartments.Count() : 0)); }

                    return lstDepartments;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                throw ex;
            }
            finally
            {
                SqlStr = string.Empty;
            }


        }

        /// <summary>
        /// Gets the Departments based on DepartmentId/Description search criteria
        /// </summary>
        /// <param name="departmentIdOrDescr"></param>
        /// <param name="orgGroupId"></param>
        /// <returns></returns>
        public List<MT_POU_DEPT> GetDepartments(string departmentIdOrDescr, string orgGroupId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            string sql = string.Empty;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter parampDeptIdOrDescr = new SqlParameter("@DepartmentIdOrDescr", departmentIdOrDescr);
                    SqlParameter paramOrgGroupId = new SqlParameter("@OrgGroupId", orgGroupId);

                    object[] parameters = { parampDeptIdOrDescr, paramOrgGroupId };

                    sql = "EXEC GetDepartment @DepartmentIdOrDescr, @OrgGroupId";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sql))); }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "DEPT_ID", "DEPT_NAME" };

                    var lstDepartments = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT>(fields, sql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Departments Returned: {1}", methodBaseName, lstDepartments != null ? lstDepartments.Count() : 0)); }

                    return lstDepartments;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sql); }
                throw ex;
            }
            finally
            {
                sql = string.Empty;
            }


        }

        public List<VM_ATPAR_DEPT_USER> GetDepartmentUsersofSingleDept(string departmentID, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            string SqlStr = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter parampDepartmentID = new SqlParameter("@DepartmentID", departmentID);
                    SqlParameter paramOrgGrpID = new SqlParameter("@OrgGrpID", orgGroupID);

                    object[] parameters = { parampDepartmentID, paramOrgGrpID };

                    SqlStr = "EXEC GetDeptUsers @DepartmentID,@OrgGrpID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var fields = new[] { "USER_ID", "ACCOUNT_DISABLED", "USER_FULLNAME", "HOME_DEPARTMENT", "CURRENT_HOME_DEPT" };

                    var lstDepartmentUsers = objContext.Database.DifferedExecuteQuery<VM_ATPAR_DEPT_USER>(fields, SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Department Users Returned: {1}", methodBaseName, lstDepartmentUsers != null ? lstDepartmentUsers.Count() : 0)); }

                    return lstDepartmentUsers;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                throw ex;
            }
            finally
            {
                SqlStr = string.Empty;
            }
        }

        public List<VM_ATPAR_DEPT_USER> GetDepartmentUsersofMultipleDepts(string departmentID, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT  DISTINCT A.[USER_ID], ");
                    sbSql.Append("B.[FIRST_NAME] + ' ' +  B.[LAST_NAME] USER_FULLNAME ");
                    sbSql.Append("FROM [MT_POU_DEPT_USER_ALLOCATIONS] A, [MT_ATPAR_USER] B ");
                    sbSql.Append("WHERE A.[ORG_GROUP_ID] = '" + orgGroupID + "' AND A.[DEPARTMENT_ID] IN (");
                    sbSql.Append(departmentID);
                    sbSql.Append(") AND A.[USER_ID] = B.[USER_ID]");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var fields = new[] { "USER_ID", "USER_FULLNAME" };

                    var lstDepartmentUsers = objContext.Database.DifferedExecuteQuery<VM_ATPAR_DEPT_USER>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Department Users Returned: {1}", methodBaseName, lstDepartmentUsers != null ? lstDepartmentUsers.Count() : 0)); }

                    return lstDepartmentUsers;
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

        public long AllocateUserToDepartmentUpdate(string departmentId, string userId, string orgGroupID, bool isHomeDepartment)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("UPDATE MT_POU_DEPT_USER_ALLOCATIONS SET HOME_DEPARTMENT = '");
                    sbSql.Append(isHomeDepartment);
                    sbSql.Append("' WHERE DEPARTMENT_ID = '");
                    sbSql.Append(departmentId);
                    sbSql.Append("' AND USER_ID = '");
                    sbSql.Append(userId);
                    sbSql.Append("' AND ORG_GROUP_ID = '");
                    sbSql.Append(orgGroupID);
                    sbSql.Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} Updated Department: {2} allocation to User: {1}", methodBaseName, userId, departmentId)); }

                    return AtparStatusCodes.ATPAR_OK;
                }
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

        public long AllocateUserToDepartmentInsert(string departmentId, string userId, string orgGroupID, bool isHomeDepartment)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("INSERT INTO MT_POU_DEPT_USER_ALLOCATIONS(DEPARTMENT_ID, USER_ID, ORG_GROUP_ID, HOME_DEPARTMENT) ");
                    sbSql.Append("VALUES('");
                    sbSql.Append(departmentId);
                    sbSql.Append("','");
                    sbSql.Append(userId);
                    sbSql.Append("','");
                    sbSql.Append(orgGroupID);
                    sbSql.Append("','");
                    sbSql.Append(isHomeDepartment);
                    sbSql.Append("')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} Department: {2} allocated to User: {1}", methodBaseName, userId, departmentId)); }

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

        public VM_ATPAR_DEPT_USER GetHomeDepartment(string userId, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT A.DEPARTMENT_ID CURRENT_HOME_DEPT, CASE WHEN (B.MIDDLE_INITIAL IS NULL OR B.MIDDLE_INITIAL=' ' )  THEN (B.FIRST_NAME+' '+B.LAST_NAME ) ELSE(B.FIRST_NAME + ' ' + B.MIDDLE_INITIAL + ' ' + B.LAST_NAME)  END AS USER_FULLNAME FROM ");
                    sbSql.Append("MT_POU_DEPT_USER_ALLOCATIONS A,[MT_ATPAR_USER] B WHERE ");
                    sbSql.Append("A.[USER_ID] = B.[USER_ID] AND A.USER_ID = '");
                    sbSql.Append(userId);
                    sbSql.Append("'");
                    sbSql.Append("AND A.ORG_GROUP_ID = '");
                    sbSql.Append(orgGroupID);
                    sbSql.Append("'");
                    sbSql.Append("AND A.HOME_DEPARTMENT = 1");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var fields = new[] { "CURRENT_HOME_DEPT", "USER_FULLNAME" };

                    var homeDepartmentUser = objContext.Database.DifferedExecuteQuery<VM_ATPAR_DEPT_USER>(fields, sbSql.ToString()).ToList().FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} Home department User Returned: {1}", methodBaseName, homeDepartmentUser != null ? homeDepartmentUser.USER_FULLNAME : string.Empty)); }

                    return homeDepartmentUser;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long DeallocateUserToDepartment(string departmentId, string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("DELETE MT_POU_DEPT_USER_ALLOCATIONS ");
                    sbSql.Append("WHERE DEPARTMENT_ID = '");
                    sbSql.Append(departmentId);
                    sbSql.Append("' AND  USER_ID = '");
                    sbSql.Append(userId);
                    sbSql.Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} Deallocating User: {1} from Department: {2} ", methodBaseName, userId, departmentId)); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }
    }
}