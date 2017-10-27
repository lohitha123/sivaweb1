using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Data.Entity;
using AtPar.ViewModel;
using System.Xml.Linq;
using AtPar.Repository.Interfaces;

namespace AtPar.Common.Repos
{
    public class AtParApplicationTransactionsRepository : IAtParApplicationTransactionsRepository
    {
        ILog _log;
        public AtParApplicationTransactionsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(AtParApplicationTransactionsRepository));
        }
        public long UpdateTransaction(AtPar_Transaction_Entity transactionDetails)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_TRANSACTION SET STATUS = " + transactionDetails.Status + "  ");
                    sbSql.Append(", UPDATE_DT_TIME= GetDate() ");

                    if (transactionDetails.StartDateTime != null)
                    {
                        //if(transactionDetails.StartDateTime.ToString().Length > 0)
                        //{
                        if (transactionDetails.StartDateTime != DateTime.MinValue)
                        {
                            sbSql.Append(",START_DT_TIME=' ");
                            sbSql.Append("transactionDetails.StartDateTime ");
                            sbSql.Append("'");
                        }
                        //}
                    }

                    //if(transactionDetails.StartDateTime.ToString().Length > 0)
                    //{

                    if (transactionDetails.EndDateTime != null)
                    {
                        if (transactionDetails.EndDateTime != DateTime.MinValue)
                        {
                            sbSql.Append(",END_DT_TIME='" + transactionDetails.EndDateTime + "'  ");
                        }
                    }
                    //}

                    sbSql.Append(", USER_ID='" + transactionDetails.UserId + "' ");

                    if (transactionDetails.TotalRecordSent != 0)
                    {
                        sbSql.Append(" ,TOTAL_REC_SENT= " + transactionDetails.TotalRecordSent + " ");
                    }
                    if (transactionDetails.StatusCode != 0)
                    {
                        sbSql.Append(",STATUS_CODE= " + transactionDetails.StatusCode + " ");
                    }
                    if (transactionDetails.Description.Length > 0)
                    {
                        sbSql.Append(",DESCR= '" + transactionDetails.Description + "' ");
                    }
                    sbSql.Append(", SCANS_COUNT=" + transactionDetails.ScansCount + "");

                    if (transactionDetails.ReportData3.Length > 0)
                    {
                        sbSql.Append(",REPORT_DATA_3= '" + transactionDetails.ReportData3 + "' ");
                    }
                    if (transactionDetails.ReportData8.Length > 0)
                    {
                        sbSql.Append(",REPORT_DATA_8= '" + transactionDetails.ReportData8 + "' ");
                    }
                    if (transactionDetails.ReportData9 != null)
                    {
                        if (transactionDetails.ReportData9.Length > 0)
                        {
                            sbSql.Append(",REPORT_DATA_9= '" + transactionDetails.ReportData9 + "' ");
                        }
                    }
                    if (transactionDetails.ReportData10 != null)
                    {
                        if (transactionDetails.ReportData10.Length > 0)
                        {
                            sbSql.Append(",REPORT_DATA_10= '" + transactionDetails.ReportData10 + "' ");
                        }
                    }

                    sbSql.Append(" WHERE TRANSACTION_ID=" + transactionDetails.TransactionId + " AND ");
                    sbSql.Append(" APP_ID=" + transactionDetails.ApplicationId + "");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }



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
    }
}
