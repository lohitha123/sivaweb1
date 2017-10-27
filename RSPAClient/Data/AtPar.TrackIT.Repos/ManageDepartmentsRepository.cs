using AtPar.Repository.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using System.Data.Entity;

namespace AtPar.TrackIT.Repos
{
    public class ManageDepartmentsRepository : IManageDepartmentsRepository
    {
        private ILog _log;

        public ManageDepartmentsRepository(ILog log)
        {
            _log = log;
        }

        #region GetTKITAllDepts

        public List<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, string OrgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            bool _blnWhere = false;
            string _strSQL = string.Empty;
            StringBuilder sbSql = new StringBuilder();
            List<TKIT_DEPT> _lstTkitDepartment;
            List<TKIT_DEPT> _lsttempTkitDepartment = new List<TKIT_DEPT>();

            try
            {


                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DEPT_ID, DESCRIPTION, UPDATE_DATE, ");
                    sbSql.Append("UPDATE_USER_ID, STATUS, ORG_GROUP_ID ");
                    sbSql.Append("FROM TKIT_DEPT ");

                    if (!string.IsNullOrEmpty(deptID))
                    {
                        sbSql.Append(" WHERE (DEPT_ID LIKE '" + deptID + "%' ");
                        sbSql.Append(" OR DESCRIPTION LIKE '" + deptID + "%') ");
                        _blnWhere = true;
                    }

                    if (!string.IsNullOrEmpty(status))
                    {
                        if (_blnWhere)
                        {
                            sbSql.Append(" AND STATUS = '" + status + "'");
                        }
                        else
                        {
                            sbSql.Append(" WHERE STATUS = '" + status + "'");
                            _blnWhere = true;
                        }
                    }

                    if (OrgGrpID.Equals("All") == false)
                    {
                        if (_blnWhere)
                        {
                            sbSql.Append(" AND ORG_GROUP_ID = '" + OrgGrpID + "'");
                        }
                        else
                        {
                            sbSql.Append(" WHERE ORG_GROUP_ID = '" + OrgGrpID + "'");
                            _blnWhere = true;
                        }                        
                    }

                    sbSql.Append(" ORDER BY DEPT_ID ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "DEPT_ID", "DESCRIPTION", "UPDATE_DATE", "UPDATE_USER_ID", "STATUS", "ORG_GROUP_ID" };

                    _lstTkitDepartment = objContext.Database.DifferedExecuteQuery<TKIT_DEPT>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Records returned : " + _lstTkitDepartment.Count()); }

                    // List<TKIT_DEPT> dept = new List<TKIT_DEPT>();
                    foreach (var item in _lstTkitDepartment)
                    {

                        sbSql.Append(" SELECT DEPT_ID");
                        sbSql.Append(" FROM TKIT_REQUESTOR_DEPT");
                        sbSql.Append(" WHERE DEPT_ID = '" + item.DEPT_ID + "'");

                        if (OrgGrpID.Equals("All") == false)
                        {
                            sbSql.Append(" AND ORG_GROUP_ID = '" + OrgGrpID + "'");
                        }

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        var field = new[] { "DEPT_ID" };

                        var result = objContext.Database.DifferedExecuteQuery<TKIT_DEPT>(field, sbSql.ToString()).ToList();

                        if (!string.IsNullOrEmpty(result.ToString()))
                        {
                            item.USER_DEPT_EXISTS = true;
                        }
                        else
                        {
                            item.USER_DEPT_EXISTS = false;
                        }

                        _lsttempTkitDepartment.Add(item);

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Records returned : " + result.Count()); }

                    }
                    return _lsttempTkitDepartment;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region SaveDeptData

        public long SaveDeptData(string deptID, string deptDescr, string status, string mode, string orgGrpID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        if (mode.ToUpper() == AtParWebEnums.Mode_Enum.ADD.ToString())

                        {
                            long StatusCode = SaveDeptData_Select(deptID, deptDescr, status, mode, orgGrpID);

                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                return StatusCode;
                            }

                            StatusCode = SaveDeptData_Insert(deptID, deptDescr, status, mode, orgGrpID, userID);

                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }
                        }
                        else if (mode.ToUpper() == AtParWebEnums.Mode_Enum.EDIT.ToString())
                        {
                            long StatusCode = SaveDeptData_Update(deptID, deptDescr, status, mode, orgGrpID, userID);

                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }
                        }

                        trans.Commit();
                        return AtparStatusCodes.ATPAR_OK;
                    }

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }

        }

        private long SaveDeptData_Select(string deptID, string deptDescr, string status, string mode, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (mode.ToUpper() == AtParWebEnums.Mode_Enum.ADD.ToString())
                    {
                        sbSql.Append("SELECT DEPT_ID ");
                        sbSql.Append("FROM TKIT_DEPT ");
                        sbSql.Append("WHERE DEPT_ID = '" + deptID + "'");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                        }

                        var Columns = new[] { "DEPT_ID" };

                        var deptIdExists = objContext.Database.DifferedExecuteQuery<TKIT_DEPT>(Columns, sbSql.ToString()).ToList();

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count "); }

                        if (deptIdExists.FirstOrDefault() != null && !string.IsNullOrEmpty(deptIdExists.FirstOrDefault().DEPT_ID))
                        {
                            return AtparStatusCodes.S_DEPT_EXIST;
                        }

                    }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }

        private long SaveDeptData_Insert(string deptID, string deptDescr, string status, string mode, string orgGrpID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append(" INSERT INTO TKIT_DEPT(");
                    sbSql.Append(" DEPT_ID, DESCRIPTION, UPDATE_DATE, UPDATE_USER_ID, STATUS, ORG_GROUP_ID ");
                    sbSql.Append(") VALUES (");
                    sbSql.Append("'" + deptID + "'");
                    sbSql.Append(", '" + deptDescr + "'");
                    sbSql.Append(", '" + DateTime.Now + "'");
                    sbSql.Append(", '" + userID + "'");
                    sbSql.Append(", '" + AtParWebEnums.enum_Requestor_Status.A + "'");
                    sbSql.Append(", '" + orgGrpID + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
                }

                return AtparStatusCodes.ATPAR_OK;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }

        private long SaveDeptData_Update(string deptID, string deptDescr, string status, string mode, string OrgGrpID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            bool _blnWhere = false;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    sbSql.Append(" UPDATE TKIT_DEPT");
                    sbSql.Append(" SET DESCRIPTION =");
                    sbSql.Append(" '" + deptDescr + "'");
                    sbSql.Append(", STATUS =");
                    sbSql.Append("'" + status + "'");
                    sbSql.Append(", UPDATE_DATE =");
                    sbSql.Append("'" + DateTime.Now + "'");
                    sbSql.Append(", UPDATE_USER_ID =");
                    sbSql.Append("'" + (AtParWebEnums.TokenEntry_Enum.UserID) + "'");

                    if (!string.IsNullOrEmpty(userID))
                    {
                        if (_blnWhere)
                        {
                            sbSql.Append(" AND DEPT_ID = '" + deptID + "'");
                        }
                        else
                        {
                            sbSql.Append(" WHERE DEPT_ID = '" + deptID + "'");
                            _blnWhere = true;
                        }
                    }

                    if (!string.IsNullOrEmpty(OrgGrpID))
                    {
                        if (_blnWhere)
                        {
                            sbSql.Append(" AND ORG_GROUP_ID = '" + OrgGrpID + "'");
                        }
                        else
                        {
                            sbSql.Append(" WHERE ORG_GROUP_ID = '" + OrgGrpID + "'");
                            _blnWhere = true;
                        }
                    }

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
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion
    }


}
