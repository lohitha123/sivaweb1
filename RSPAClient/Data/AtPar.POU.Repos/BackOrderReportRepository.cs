using AtPar.Repository.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using log4net;
using AtPar.Common;
using AtPar.Data;
using AtPar.ViewModel;
using System.Data.SqlClient;
using System.Data.Entity.Infrastructure;
using AtPar.POCOEntities;

namespace AtPar.POU.Repos
{
    public class BackOrderReportRepository : IBackOrderReportRepository
    {
        ILog _log;
        public BackOrderReportRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(BackOrderReportRepository));
        }

        #region GetUserDepartments

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
        #endregion

        #region GetUserdepartmentsCarts
        /// <summary>
        /// GetUserdepartmentsCarts
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="locationType"></param>
        /// <returns></returns>

        public Tuple<long, DataSet> GetUserdepartmentsCarts(string userID, string orgGrpID, string locationType = "")
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
                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK , result.ToDataSet());
                }
            }
            catch (SqlException ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() ); }
                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion  

        #region GetAllocatedCarts

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
        #endregion

        #region GetBackOrderReportData
        /// <summary>
        /// GetBackOrderReportData
        /// </summary>
        /// <param name="pStrBusinessUnit"></param>
        /// <param name="pStrCartId"></param>
        /// <param name="pStrUserId"></param>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <param name="pOrgGrpID"></param>
        /// <param name="pAppID"></param>
        /// <returns></returns>
        public Tuple<long, DataSet> GetBackOrderReportData(string pStrBusinessUnit, string pStrCartId, string pStrUserId, string pStrFromDate, string pStrToDate, string pOrgGrpID, int pAppID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            DataSet pBackOrderDS  = new DataSet();
            string SqlStr = string.Empty;
            List<VM_BACK_ORDER_REPORT> lstPrefPerformanceDetails = new List<VM_BACK_ORDER_REPORT>();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }
                        SqlParameter[] sqlParms = new SqlParameter[6];
                        sqlParms[0] = new SqlParameter("@StartDate", SqlDbType.NVarChar);
                        sqlParms[0].Value = pStrFromDate;

                        sqlParms[1] = new SqlParameter("@EndDate", SqlDbType.NVarChar);
                        sqlParms[1].Value = pStrToDate;

                        sqlParms[2] = new SqlParameter("@BusinessUnit", SqlDbType.NVarChar);
                        sqlParms[2].Value = pStrBusinessUnit;

                        sqlParms[3] = new SqlParameter("@CartId", SqlDbType.NVarChar);
                        sqlParms[3].Value = pStrCartId;

                        sqlParms[4] = new SqlParameter("@OrgGrpID", SqlDbType.NVarChar);
                        sqlParms[4].Value = pOrgGrpID;

                        sqlParms[5] = new SqlParameter("@AppID", SqlDbType.Int);
                        sqlParms[5].Value = pAppID;



                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.AddRange(sqlParms);
                        command.CommandText = "GetBackOrderReportData";
                        command.CommandType = CommandType.StoredProcedure;

                        SqlStr = "DECLARE @P1 INT " + "SET @P1 = 0 " + "\r\n" + "\r\n" + "EXEC	" + "GetBackOrderReportData" + "\r\n" + "@StartDate = N'" + sqlParms[0].Value + "'," + "\r\n" + "@EndDate = N'" + sqlParms[1].Value + "'," + "\r\n" + "@BusinessUnit = N'" + sqlParms[2].Value + "'," + "\r\n" + "@CartId = N'" + sqlParms[3].Value + "',"+ "\r\n"+ "@OrgGrpID = N'"+sqlParms[4].Value+ "\r\n" + "@AppID = N'" + sqlParms[5].Value + "SELECT	@P1 ";

                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug(SqlStr);
                        }
                            using (var reader = command.ExecuteReader())
                            {
                               
                                lstPrefPerformanceDetails = ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<VM_BACK_ORDER_REPORT>(reader)
                                        .ToList();
                                reader.NextResult();

                        }
                      
                        if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of BackOrderReportData Data Returned: {1}", methodBaseName, (lstPrefPerformanceDetails != null ? lstPrefPerformanceDetails.Count() : 0))); }

                        pBackOrderDS.Tables.Add(lstPrefPerformanceDetails.ToDataTable());
                        return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, pBackOrderDS);
                    }
                }
            }
            catch (SqlException ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL,null);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR,null);
            }
            finally
            {
                SqlStr = string.Empty;
            }

            
        }
        #endregion

        #region GetBUnits_Carts
        /// <summary>
        /// GetBUnits_Carts
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="appID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="locationType"></param>
        /// <param name="cartType"></param>
        /// <returns></returns>
        public List<MT_POU_DEPT_CART_ALLOCATIONS> GetBUnits_Carts(string userID, int appID, string[] deviceTokenEntry, string locationType = "", string cartType = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT  CART_ID, BUSINESS_UNIT, A.LOCATION_TYPE ");
                    sbSql.Append("FROM MT_POU_DEPT_CART_ALLOCATIONS A ");

                    if (appID == (int)AtParWebEnums.EnumApps.Pharmacy && string.IsNullOrEmpty(cartType))
                    {
                        sbSql.Append("JOIN PAR_MNGT_PAR_LOC_HEADER OH ON A.CART_ID=OH.PAR_LOC_ID ");
                        sbSql.Append("AND OH.PARLOC_TYPE != '" + cartType + "' ");
                    }
                    sbSql.Append(",MT_POU_DEPT_USER_ALLOCATIONS B WHERE A.ORG_GROUP_ID = B.ORG_GROUP_ID ");
                    sbSql.Append("AND A.DEPARTMENT_ID = B.DEPARTMENT_ID AND A.APP_ID = " + appID + " ");

                    if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] != "All")
                    {
                        sbSql.Append("AND A.ORG_GROUP_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "'");
                    }

                    if (locationType == "P")
                    {
                        sbSql.Append("AND A.LOCATION_TYPE != '" + AtParWebEnums.LocationType.I.ToString() + "'");
                    }

                    sbSql.Append("AND B.USER_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' ");
                    sbSql.Append(" ORDER BY BUSINESS_UNIT ");

                    var fileds = new[] { "CART_ID", "BUSINESS_UNIT", "LOCATION_TYPE" };

                    var lstRecords = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_CART_ALLOCATIONS>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Records returned " + lstRecords); }

                    return lstRecords;
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
        #endregion
    }
}
