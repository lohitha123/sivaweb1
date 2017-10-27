using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.POCOEntities;
using log4net;
using AtPar.Repository.Interfaces.POU;
using AtPar.Data;
using System.Data.SqlClient;
using System.Data;

namespace AtPar.POU.Repos
{
    public class DepartmentDeviceAllocationRepository : IDepartmentDeviceAllocationRepository
    {

        private ILog _log;

        public DepartmentDeviceAllocationRepository(ILog log)
        {
            this._log = log;
        }

        public List<MT_POU_DEPT_WORKSTATIONS> GetDeptWorkstations(string departmentID, string orgGrpID)
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
                    SqlParameter paramOrgGroupID = new SqlParameter("@OrgGrpID", orgGrpID);


                    object[] parameters = { parampDepartmentID, paramOrgGroupID };

                    SqlStr = "EXEC GetDeptWorkstations @DepartmentID,@OrgGrpID";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, SqlStr))); }
                    }

                    var fields = new[] { "DEPARTMENT_ID", "WORKSTATION_ID", "WORKSTATION_DESCR", "WORKSTATION_MAC_ADDRESS", "ORG_GROUP_ID" };

                    var lstDeptWrkStations = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_WORKSTATIONS>(fields, SqlStr, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Departments Returned: {1}", methodBaseName, lstDeptWrkStations != null ? lstDeptWrkStations.Count() : 0)); }

                    return lstDeptWrkStations;
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

        public long DeleteHospgroupWorkstation(string departmentID, string workStationID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("DELETE MT_POU_DEPT_WORKSTATIONS ");
                    sbSql.Append("WHERE DEPARTMENT_ID = '");
                    sbSql.Append(departmentID);
                    sbSql.Append("' AND  WORKSTATION_ID = '");
                    sbSql.Append(workStationID);
                    sbSql.Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} Unallocating workstations to departments: {1} from Department: {2} ", methodBaseName, departmentID, workStationID)); }

                    if (count > 0)
                    {
                        return AtparStatusCodes.ATPAR_OK;
                    }
                    else
                    {
                        return AtparStatusCodes.E_NORECORDFOUND;
                    }


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

        public long UpdateHospGroupWorkstations(string departmentID, string workStationID, string workStationDescr, string workStationMacAddr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long statusCode = -1;
            workStationDescr = workStationDescr.ReplaceNullwithEmpty();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter paramDepartmentID = new SqlParameter("@DepartmentID", departmentID);
                    SqlParameter paramWorkStationID = new SqlParameter("@WksId", workStationID);
                    SqlParameter paramWorkStationDescr = new SqlParameter("@WksDescr", workStationDescr);
                    SqlParameter paramWorkStationMacAddr = new SqlParameter("@WksMacAddr", workStationMacAddr);
                    SqlParameter paramStatusCode = new SqlParameter("@statusCode", statusCode);

                    paramStatusCode.Direction = ParameterDirection.Output;

                    object[] parameters = { paramDepartmentID, paramWorkStationID, paramWorkStationDescr, paramWorkStationMacAddr, paramStatusCode };

                    sbSql.Append("EXEC UpdateDeptWorkstations @DepartmentID,@WksId,@WksDescr,@WksMacAddr,@statusCode OUT");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString(), parameters);

                    statusCode= long.Parse(paramStatusCode.Value.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} Updated Department: {2} allocation to User: {1}", methodBaseName, statusCode, departmentID)); }

                    if (statusCode == AtparStatusCodes.ATPAR_OK)
                    {
                        return AtparStatusCodes.ATPAR_OK;
                    }
                    else
                    {
                        return statusCode;
                    }


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

        public long AddHospGroupWorkstations(string departmentID, string workStationID, string workStationDescr, string workStationMacAddr, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long statusCode = -1;
            workStationDescr = workStationDescr.ReplaceNullwithEmpty();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    SqlParameter paramDepartmentID = new SqlParameter("@DepartmentID", departmentID);
                    SqlParameter paramWorkStationID = new SqlParameter("@WksId", workStationID);
                    SqlParameter paramWorkStationDescr = new SqlParameter("@WksDescr", workStationDescr);
                    SqlParameter paramWorkStationMacAddr = new SqlParameter("@WksMacAddr", workStationMacAddr);
                    SqlParameter paramOrgGrpID = new SqlParameter("@OrgGroupID", orgGrpID);
                    SqlParameter paramStatusCode = new SqlParameter("@statusCode", statusCode);

                    paramStatusCode.Direction = ParameterDirection.Output;

                    object[] parameters = { paramDepartmentID, paramWorkStationID, paramWorkStationDescr, paramWorkStationMacAddr, paramOrgGrpID, paramStatusCode };
                    sbSql.Remove(0, sbSql.Length);

                    sbSql.Append("EXEC InsertDeptWorkstations @DepartmentID,@WksId,@WksDescr,@WksMacAddr,@OrgGroupID,@statusCode OUT");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    // statusCode = objContext.Database.SqlQuery<long>(sbSql.ToString(), parameters).FirstOrDefault();
                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString(), parameters);
                    statusCode = long.Parse(paramStatusCode.Value.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} Insert Department: {2} workstation allocation : {1}", methodBaseName, statusCode, departmentID)); }

                    sbSql.Remove(0, sbSql.Length);
                    if (statusCode == AtparStatusCodes.ATPAR_OK)
                    {
                        return AtparStatusCodes.ATPAR_OK;
                    }
                    else
                    {
                        return statusCode;
                    }


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
    }
}
