using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using AtPar.Data;
using System.Data.Entity.Infrastructure;
using AtPar.Common;
using AtPar.ViewModel;
namespace AtPar.POU.Repos
{
    public class ParLocationComplianceDetailsReportRepository : IParLocationComplianceDetailsReportRepository
    {

        ILog _log;
        public ParLocationComplianceDetailsReportRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ParLocationComplianceDetailsReportRepository));
        }

        /// <summary>
        /// GetComplianceDetails
        /// </summary>
        /// <param name="pStrDept"></param>
        /// <param name="pStrLoc"></param>
        /// <param name="pStrUserId"></param>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <param name="pStrOrgGrpID"></param>
        /// <param name="pAppID"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns></returns>
        public Tuple<long, DataSet> GetComplianceDetails(string pStrDept, string pStrLoc, string pStrUserId, string pStrFromDate, string pStrToDate, string pStrOrgGrpID, int pAppID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            DataSet _dsComplianceDet = new DataSet();
            StringBuilder SqlStr = new StringBuilder();
            DataTable[] Dtables = new DataTable[2];
            pStrDept = string.IsNullOrEmpty(pStrDept) ? string.Empty : pStrDept;
            pStrLoc = string.IsNullOrEmpty(pStrLoc) ? string.Empty : pStrLoc;
            pStrUserId = string.IsNullOrEmpty(pStrUserId) ? string.Empty : pStrUserId;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    SqlParameter[] sqlParms = new SqlParameter[6];
                   
                   // string _strSQL;
                    sqlParms[0] = new SqlParameter("@StartDate", SqlDbType.NVarChar);
                    sqlParms[0].Value = pStrFromDate;
                    sqlParms[1] = new SqlParameter("@EndDate", SqlDbType.NVarChar);
                    sqlParms[1].Value = pStrToDate;
                    sqlParms[2] = new SqlParameter("@DeptID", SqlDbType.NVarChar);
                    sqlParms[2].Value = pStrDept;
                    sqlParms[3] = new SqlParameter("@CartId", SqlDbType.NVarChar);
                    sqlParms[3].Value = pStrLoc;
                    sqlParms[4] = new SqlParameter("@OrgGrpID", SqlDbType.NVarChar);
                    sqlParms[4].Value = pStrOrgGrpID;
                    sqlParms[5] = new SqlParameter("@AppID", SqlDbType.Int);
                    sqlParms[5].Value = pAppID;

                    var command = objContext.Database.Connection.CreateCommand();
                    command.CommandText = "GetComplianceDetails";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParms);


                    SqlStr.Append("exec GetComplianceDetails '").Append(sqlParms[0].Value.ToString()).Append("', ").Append("'")
                       .Append(sqlParms[1].Value.ToString())
                       .Append("', ").Append("'").Append(sqlParms[2].Value.ToString()).Append("', ").Append("'")
                       .Append(sqlParms[3].Value.ToString()).Append("', ").Append("'").Append(sqlParms[4].Value.ToString())
                       .Append("', ").Append("'").Append(sqlParms[5].Value.ToString());


                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug(SqlStr);
                    }
                    objContext.Database.Connection.Open();
                    var reader = command.ExecuteReader();

                       List<VM_COMPLIANCEDETAILS_UNACCT_DATA> lstCompliancesummaryHeader =
                     ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_COMPLIANCEDETAILS_UNACCT_DATA>
                     (reader).ToList();

                        Dtables[0] = lstCompliancesummaryHeader.ToDataTable();
                        reader.NextResult();

                      List<VM_COMPLIANCEDETAILS_ISSUE_DATA> lstCompliancesummaryIssueData =
                      ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_COMPLIANCEDETAILS_ISSUE_DATA>
                      (reader).ToList();
                      Dtables[1] = lstCompliancesummaryIssueData.ToDataTable();


                    objContext.Database.Connection.Close();
                }
                if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetComplianceSummary Data for Par location Compliance Summary is {1}, Dept and Carts info:{2}", methodBaseName, Dtables[0].Rows.Count, Dtables[1].Rows.Count)); }

                foreach (DataTable dt in Dtables)
                {
                    _dsComplianceDet.Tables.Add(dt);
                }
                return new Tuple<long,DataSet>( AtparStatusCodes.ATPAR_OK, _dsComplianceDet);

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

        }
        /// <summary>
        /// GetDeptCartAllocations
        /// </summary>
        /// <param name="pBusinessUnit"></param>
        /// <param name="pDeptId"></param>
        /// <param name="pAppID"></param>
        /// <param name="pLocationType"></param>
        /// <returns></returns>
        public List<VM_COMPLIANCE_DETAILS_DEPT_HEADER_INFO> GetDeptCartAllocations(string pBusinessUnit, string pDeptId, int pAppID, string pLocationType = "")
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder SqlStr = new StringBuilder();
            DataTable Dtables = new DataTable();
            pBusinessUnit = string.IsNullOrEmpty(pBusinessUnit) ? string.Empty : pBusinessUnit;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    SqlParameter[] sqlParms = new SqlParameter[4];

                    // string _strSQL;
                    sqlParms[0] = new SqlParameter("@BusinessUnit", SqlDbType.NVarChar);
                    sqlParms[0].Value = pBusinessUnit;
                    sqlParms[1] = new SqlParameter("@DepartmentID", SqlDbType.NVarChar);
                    sqlParms[1].Value = pDeptId;
                    sqlParms[2] = new SqlParameter("@LocationType", SqlDbType.NVarChar);
                    sqlParms[2].Value = pDeptId;
                    sqlParms[3] = new SqlParameter("@AppID", SqlDbType.NVarChar);
                    sqlParms[3].Value = pAppID;

                    var command = objContext.Database.Connection.CreateCommand();
                    command.CommandText = "GetDeptCartAllocations";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParms);


                    SqlStr.Append("exec GetDeptCartAllocations '").Append(sqlParms[0].Value.ToString()).Append("', ").Append("'")
                       .Append(sqlParms[1].Value.ToString())
                       .Append("', ").Append("'").Append(sqlParms[2].Value.ToString()).Append("', ").Append("'")
                       .Append(sqlParms[3].Value.ToString());


                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug(SqlStr);
                    }
                    objContext.Database.Connection.Open();

                    var reader = command.ExecuteReader();

                    List<VM_COMPLIANCE_DETAILS_DEPT_HEADER_INFO> lstComplianceDetailsDeptHeaderInfo =
                  ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_COMPLIANCE_DETAILS_DEPT_HEADER_INFO>
                  (reader).ToList();

                    objContext.Database.Connection.Close();

                  return lstComplianceDetailsDeptHeaderInfo;
                   
                }
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                throw ex;
            }
            finally
            {
                SqlStr = null;
            }

        }
    }
}
