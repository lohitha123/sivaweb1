using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using log4net;
using System;
using System.Data;
using System.Linq;
using System.Text;

namespace AtPar.Init.Repos
{
    public class ErrorReportRepository : IErrorReportRepository
    {
        private ILog _log;
        public ErrorReportRepository(ILog log)
        {
            _log = log;
        }

        public Tuple<DataSet,long> GetErrorReport(string userID, string fromDate, string toDate, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet pdsErrorData = new DataSet();

            if (_log.IsDebugEnabled)
            {
                _log.Debug(methodBaseName);
            }

            string orderby = null;
            var sbSql = new StringBuilder();

            try
            {

                orderby = string.Empty;
                try
                {
                    using (var objContext = new ATPAR_MT_Context())
                    {
                        sbSql.Append("SELECT ERROR_DT, ERROR_CODE, ERROR_MESSAGE FROM MT_ATPAR_ERROR_LOG WHERE ");

                        sbSql.Append(" ERROR_DT >= CONVERT(DATETIME, '" ).Append( fromDate ).Append( "', 101)" ).Append( " AND ERROR_DT <= DATEADD(DAY,1,CONVERT(DATETIME, '" ).Append( toDate ).Append( "', 101)) ORDER BY ERROR_DT DESC");

                        var fields = new[] { "ERROR_DT", "ERROR_CODE", "ERROR_MESSAGE" };

                        var lstResult = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ERROR_LOG>(fields, sbSql.ToString()).ToList();


                        pdsErrorData = lstResult.ToDataSet();

                        if (pdsErrorData.Tables[0].Rows.Count == 0)
                        {
                            return new Tuple<DataSet, long>(pdsErrorData, AtparStatusCodes.E_NORECORDFOUND);
                        }
                        else
                        {
                            return new Tuple<DataSet, long>(pdsErrorData, AtparStatusCodes.ATPAR_OK);
                        }

                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to get error report " + Environment.NewLine + " with the following SQL :" + sbSql + Environment.NewLine + " Exception is:" + ex.ToString() + Environment.NewLine);
                    }
                    return new Tuple<DataSet, long>(pdsErrorData, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                }
               
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
            }
            finally
            {
                sbSql = null;
            }
        }
    }
}


