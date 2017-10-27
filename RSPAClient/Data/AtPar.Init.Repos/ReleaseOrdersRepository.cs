using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using AtPar.Common;

namespace AtPar.Init.Repos
{
    public class ReleaseOrdersRepository : IReleaseOrdersRepository
    {
        ILog _log;
        public ReleaseOrdersRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ReleaseOrdersRepository));
        }

        /// <summary>
        /// Used to update the transaction status in Transaction Table
        /// </summary>
        /// <param name="AppId"></param>
        /// <param name="UserId"></param>
        /// <param name="TransId"></param>
        /// <returns>Success or Failure code</returns>
        public long UpdateTransactionStatus(int AppId, string UserId, string TransId = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_TRANSACTION SET STATUS = " + (int)AtParWebEnums.AppTransactionStatus.Unlock + "");
                    sbSql.Append(" WHERE APP_ID = " + AppId + " AND TRANSACTION_ID IN (" + TransId + ") ");
                    sbSql.Append(" AND DOWNLOAD_USERID IN ('" + UserId + "') ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }
                }

                return AtparStatusCodes.ATPAR_OK;
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

        /// <summary>
        /// Used to get the locked orders based on transaction status
        /// </summary>
        /// <param name="AppId"></param>
        /// <param name="UserId"></param>
        /// <param name="Bunit"></param>
        /// <param name="OrdNo"></param>
        /// <param name="OrgGrpID"></param>
        /// <returns>Orders Data or throws exception to Business Service</returns>
        public Tuple<List<MT_ATPAR_TRANSACTION>, string> GetReleaseOrders(int AppId, string UserId, string Bunit, string OrdNo, string OrgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string severStatusCode = string.Empty;
            List<MT_ATPAR_TRANSACTION> lsttransactions = null;
            Tuple<List<MT_ATPAR_TRANSACTION>, string> tupleliststatuscode = new Tuple<List<MT_ATPAR_TRANSACTION>, string>(lsttransactions, severStatusCode);
            string sbSql = string.Empty;
            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[6];

                    sqlparams[0] = new SqlParameter("@pAppId", SqlDbType.NVarChar);
                    sqlparams[0].Value = AppId;

                    sqlparams[1] = new SqlParameter("@pOrgGrpId", SqlDbType.NVarChar);
                    sqlparams[1].Value = OrgGrpID;

                    sqlparams[2] = new SqlParameter("@pUserID", SqlDbType.NVarChar);
                    sqlparams[2].Value = UserId;

                    sqlparams[3] = new SqlParameter("@pBunit", SqlDbType.NVarChar);
                    sqlparams[3].Value = Bunit;

                    sqlparams[4] = new SqlParameter("@pOrdNo", SqlDbType.NVarChar);
                    sqlparams[4].Value = OrdNo;

                    sqlparams[5] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlparams[5].Direction = ParameterDirection.Output;

                     sbSql = "exec GetReleaseOrders @pAppId, @pOrgGrpId, @pUserID, @pBunit," +
                                        "@pOrdNo, @StatusCode OUT ";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "APP_ID", "TRANSACTION_ID", "BUSINESS_UNIT", "ID", "DOWNLOAD_DT_TIME", "USERNAME", "UID", "DESCR" };
                    lsttransactions = objContext.Database.DifferedExecuteQuery<MT_ATPAR_TRANSACTION>(fileds, sbSql, sqlparams).ToList();
                   // lsttransactions=(List<MT_ATPAR_TRANSACTION>) lsttransactions.AsEnumerable().OrderBy(x => x.BUSINESS_UNIT).AsEnumerable();
                      lsttransactions = lsttransactions.OrderBy(x => x.BUSINESS_UNIT).ToList();
                    
                    // Need to print the List
                    severStatusCode = sqlparams[5].Value.ToString();
                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned StatusCode " + severStatusCode); }

                tupleliststatuscode = new Tuple<List<MT_ATPAR_TRANSACTION>, string>(lsttransactions, severStatusCode);

                return tupleliststatuscode;

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
    }
}