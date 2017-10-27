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
    public class ParLocationComplianceSummaryReportRepository : IParLocationComplianceSummaryReportRepository
    {
        private ILog _log;
        private ICommonRepository _commonRepo;

        public ParLocationComplianceSummaryReportRepository(ILog log, ICommonRepository commonRepo)
        {
            _log = log;
            _commonRepo = commonRepo;
        }


        /// <summary>
        /// GetComplianceSummary
        /// </summary>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <param name="pStrDeptID"></param>
        /// <param name="pStrCartID"></param>
        /// <param name="pStrOrgGrpID"></param>
        /// <param name="pAppID"></param>
        /// <returns></returns>
        public Tuple<DataSet, long> GetComplianceSummary(string pStrFromDate, string pStrToDate, string pStrDeptID, string pStrCartID, string pStrOrgGrpID, int pAppID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            DataSet _dsCompliance = new DataSet();
            StringBuilder SqlStr = new StringBuilder();
            DataTable[] Dtables = new DataTable[4];
            pStrCartID = string.IsNullOrEmpty(pStrCartID) ? "" : pStrCartID;
            pStrDeptID = string.IsNullOrEmpty(pStrDeptID) ? "" : pStrDeptID;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    SqlParameter[] sqlParms = new SqlParameter[6];


                    sqlParms[0] = new SqlParameter("@StartDate", SqlDbType.NVarChar);
                    sqlParms[0].Value = pStrFromDate;
                    sqlParms[1] = new SqlParameter("@EndDate", SqlDbType.NVarChar);
                    sqlParms[1].Value = pStrToDate;
                    sqlParms[2] = new SqlParameter("@DeptID", SqlDbType.NVarChar);
                    sqlParms[2].Value = pStrDeptID;
                    sqlParms[3] = new SqlParameter("@CartId", SqlDbType.NVarChar);
                    sqlParms[3].Value = pStrCartID;
                    sqlParms[4] = new SqlParameter("@OrgGrpID", SqlDbType.NVarChar);
                    sqlParms[4].Value = pStrOrgGrpID;
                    sqlParms[5] = new SqlParameter("@AppID", SqlDbType.Int);
                    sqlParms[5].Value = pAppID;
                    objContext.Database.Connection.Open();
                    var command = objContext.Database.Connection.CreateCommand();
                    command.CommandText = "GetComplianceSummary";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParms);


                    SqlStr.Append("exec GetComplianceSummary '").Append(sqlParms[0].Value.ToString()).Append("', ").Append("'")
                       .Append(sqlParms[1].Value.ToString())
                       .Append("', ").Append("'").Append(sqlParms[2].Value.ToString()).Append("', ").Append("'")
                       .Append(sqlParms[3].Value.ToString()).Append("', ").Append("'").Append(sqlParms[4].Value.ToString())
                       .Append("', ").Append("'").Append(sqlParms[5].Value.ToString());
                    // SqlStr = "DECLARE @P1 INT " + "SET @P1 = 0 " + "\r\n" + "\r\n" + "EXEC	" + "GetComplianceSummary" + "\r\n" + "@StartDate= N'" + sqlParms[0] + "' @EndDate= N'" + sqlParms[1] + "SELECT @P1";

                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug(SqlStr);
                    }

                   var reader = command.ExecuteReader();

                    List<VM_COMPLIANCESUMMARY_HEADER> lstCompliancesummaryHeader =
                 ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_COMPLIANCESUMMARY_HEADER>
                 (reader).ToList();

                    Dtables[0] = lstCompliancesummaryHeader.ToDataTable();
                    reader.NextResult();

                    List<VM_COMPLIANCESUMMARY_ISSUE_DATA> lstCompliancesummaryIssueData =
                          ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_COMPLIANCESUMMARY_ISSUE_DATA>
                  (reader).ToList();

                    Dtables[1] = lstCompliancesummaryIssueData.ToDataTable();
                    reader.NextResult();

                    List<VM_COMPLIANCESUMMARY_RET_DATA> lstCompliancesummaryRetData =
                          ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_COMPLIANCESUMMARY_RET_DATA>
                  (reader).ToList();
                    Dtables[2] = lstCompliancesummaryRetData.ToDataTable();
                    reader.NextResult();

                    List<VM_COMPLIANCESUMMARY_UN_ACC_DATA> lstCompliancesummaryUnAcc =
                          ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_COMPLIANCESUMMARY_UN_ACC_DATA>
                  (reader).ToList();
                    Dtables[3] = lstCompliancesummaryUnAcc.ToDataTable();

                    objContext.Database.Connection.Close();
                }


                if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of GetComplianceSummary Data for Par location Compliance Summary is {1}, Dept and Carts info:{2},Carts and Issue Qty info:{3},Carts and Unaccounted Qty info:{4}", methodBaseName, Dtables[0].Rows.Count, Dtables[1].Rows.Count, Dtables[2].Rows.Count, Dtables[3].Rows.Count)); }

                foreach (DataTable dt in Dtables)
                {
                    _dsCompliance.Tables.Add(dt);
                }
                return new Tuple<DataSet, long>(_dsCompliance, AtparStatusCodes.ATPAR_OK);
            }
            catch (SqlException ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                return new Tuple<DataSet, long>(null, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr); }
                return new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
            }


        }
    }
}
