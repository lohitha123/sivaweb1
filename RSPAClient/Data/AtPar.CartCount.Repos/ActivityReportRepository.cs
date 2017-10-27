using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Repository.Interfaces.CartCount;
using log4net;
using AtPar.Common;
using AtPar.ViewModel;
using System.Data;
using System.Data.SqlClient;
using AtPar.Data;
using System.Data.Entity.Infrastructure;

namespace AtPar.CartCount.Repos
{
    public class ActivityReportRepository : IActivityReportRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        #region Constructor

        public ActivityReportRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ActivityReportRepository));
        }

        #endregion

        public Tuple<long, List<VM_MT_ATPAR_TRANSACTION>> GetActivityReportData(DateTime fDate, DateTime tDate, int appId, int fltr,
                                                                            string[] deviceTokenEntry, string orgGroupID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSQl = new StringBuilder();
            Tuple<long, List<VM_MT_ATPAR_TRANSACTION>> tupleResult = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    SqlParameter[] sqlParams = new SqlParameter[6];
                    sqlParams[0] = new SqlParameter("@Frmdate", SqlDbType.Date);
                    sqlParams[0].Value = fDate;

                    sqlParams[1] = new SqlParameter("@ToDate", SqlDbType.Date);
                    sqlParams[1].Value = tDate;

                    sqlParams[2] = new SqlParameter("@AppId", SqlDbType.NVarChar);
                    sqlParams[2].Value = appId;

                    sqlParams[3] = new SqlParameter("@UserID", SqlDbType.NVarChar);
                    sqlParams[3].Value = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                    sqlParams[4] = new SqlParameter("@OrgGrpID", SqlDbType.NVarChar);
                    sqlParams[4].Value = orgGroupID;

                    sqlParams[5] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlParams[5].Direction = ParameterDirection.Output;



                    objContext.Database.Connection.Open();
                    var command = objContext.Database.Connection.CreateCommand();
                    if (fltr == 0)
                    {
                        command.CommandText = "GetActivityReportData";
                    }
                    else if (fltr == 1)
                    {
                        command.CommandText = "GetActivityReportDataByBU";
                    }
                    else if (fltr == 2)
                    {
                        command.CommandText = "GetActivityReportDataByUser";
                    }
                    
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParams);
                    var reader = command.ExecuteReader();

                    List<VM_MT_ATPAR_TRANSACTION> lstActivityDetails =
                   ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_MT_ATPAR_TRANSACTION>
                   (reader).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    }

                    sbSQl
                        .Append("exec ").Append(command.CommandText)
                        .Append(" '").Append(sqlParams[0].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParams[1].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParams[2].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParams[3].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParams[4].Value.ToString()).Append("'");

                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug("Calling " + command.CommandText + " with the following syntax.." + sbSQl.ToString());

                    }
                    objContext.Database.Connection.Close();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.of rows returned : " + lstActivityDetails.Count); }                    

                    tupleResult = new Tuple<long, List<VM_MT_ATPAR_TRANSACTION>>(Convert.ToInt64(sqlParams[5].Value), lstActivityDetails);
                    return tupleResult;

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }                
                throw ex;
            }
            finally { sbSQl = null; }         

        }

    }
}
