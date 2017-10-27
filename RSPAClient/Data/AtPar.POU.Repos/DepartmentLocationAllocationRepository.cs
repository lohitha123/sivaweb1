using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace AtPar.POU.Repos
{
    public class DepartmentLocationAllocationRepository : IDepartmentLocationAllocationRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        #region Constructor

        public DepartmentLocationAllocationRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(DepartmentLocationAllocationRepository));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the Allocated Carts to the Department
        /// </summary>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        public List<MT_POU_DEPT_CART_ALLOCATIONS> GetDeptCartAllocations(string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT CART_ID, DEPARTMENT_ID,BUSINESS_UNIT, ORG_GROUP_ID, 'I' FLAG, LOCATION_TYPE FROM MT_POU_DEPT_CART_ALLOCATIONS ");
                    sbSql.Append("WHERE ORG_GROUP_ID = '").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[]
                        {"CART_ID", "DEPARTMENT_ID", "BUSINESS_UNIT", "ORG_GROUP_ID","FLAG", "LOCATION_TYPE"};

                    var lstDeptCartAllocations = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_CART_ALLOCATIONS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstDeptCartAllocations); }

                    return lstDeptCartAllocations;
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
        /// Gets the locations allocated to the WorkStations
        /// </summary>
        /// <param name="deptId"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetLocationsAllocatedToWorkStation(string deptId, string orgGrpID, int appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DEPARTMENT_ID, CART_ID, ORG_GROUP_ID, LOCATION_TYPE FROM MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS ");
                    sbSql.Append("WHERE DEPARTMENT_ID = '").Append(deptId).Append("' AND ");
                    sbSql.Append("ORG_GROUP_ID = '").Append(orgGrpID).Append("' AND ");
                    sbSql.Append("APP_ID = ").Append(appId);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[]
                        {"DEPARTMENT_ID", "CART_ID", "ORG_GROUP_ID", "LOCATION_TYPE"};

                    var lstCartWorkStationAllocations = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstCartWorkStationAllocations); }

                    return lstCartWorkStationAllocations;
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
        /// Deletes the Department Cart Allocations
        /// </summary>
        /// <param name="deptId"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public long DeleteDeptCartAllocations(string deptId, string orgGrpID, int appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_POU_DEPT_CART_ALLOCATIONS WHERE DEPARTMENT_ID = '").Append(deptId).Append("' AND ");
                    sbSql.Append("ORG_GROUP_ID = '").Append(orgGrpID).Append("' AND ");
                    sbSql.Append("APP_ID = ").Append(appId);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

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

        /// <summary>
        /// Inserts the Department Cart Allocation
        /// </summary>
        /// <param name="lstDeptCartAllocations"></param>
        /// <param name="deptId"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public long InsertDeptCartsAllocation(List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptCartAllocations, string deptId, string orgGroupId, int appId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    foreach (var item in lstDeptCartAllocations)
                    {
                        sql = string.Empty;
                        SqlParameter deptID = new SqlParameter("@DepartmentId", item.DEPARTMENT_ID);
                        SqlParameter bUnit = new SqlParameter("@BusinessUnit", item.BUSINESS_UNIT);
                        SqlParameter cartId = new SqlParameter("@CartId", item.CART_ID);
                        SqlParameter orgGrpId = new SqlParameter("@OrgGrpID", orgGroupId);
                        SqlParameter locationType = new SqlParameter("@LocType", item.LOCATION_TYPE);
                        SqlParameter appID = new SqlParameter("@AppID", appId);

                        object[] parameters = { deptID, bUnit, cartId, orgGrpId, locationType, appID };

                        sql = "EXEC InsertDeptCartsAllocation @DepartmentId, @BusinessUnit, @CartId, @OrgGrpID, @LocType, @AppID";

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sql)); }
                        }

                        var count =  objContext.Database.ExecuteSqlCommand(sql, parameters);

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }
                    }
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sql); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
        }

        #endregion
    }
}
