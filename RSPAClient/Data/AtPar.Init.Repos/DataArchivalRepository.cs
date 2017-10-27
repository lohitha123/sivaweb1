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
using System.Threading.Tasks;

namespace AtPar.Init.Repos
{
   public class DataArchivalRepository: IDataArchivalRepository
    {
        ILog _log;
        public DataArchivalRepository(ILog log)
        {
            _log = log;
        }
        public List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> DoArchivalData(string appID, string archiveDate, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();
            string[] columns = new string[] { "PARAMETER_ID", "PARAMETER_VALUE" };

            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL.Append("SELECT PARAMETER_ID, PARAMETER_VALUE FROM ")
                      .Append("MT_ATPAR_CONFIGURATION_SECTION_DTLS ")
                       .Append("WHERE TAB_ID = '" + AtParWebEnums.ConfigurationManager_Tabs.SYSTEMDBCONNECTION.ToString()  + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    var archiveDetails = context.Database.DifferedExecuteQuery<MT_ATPAR_CONFIGURATION_SECTION_DTLS>(columns, _sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " archive Details Count : " + archiveDetails.Count); }

                    return archiveDetails;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        public long DoArchivalData_DataArchiving(string appID, string archiveDate, string strArchiveDataSource, string strArchiveUserID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();
            string[] columns = new string[] { "PARAMETER_ID", "PARAMETER_VALUE" };

            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlParams = new SqlParameter[6];

                    sqlParams[0] = new SqlParameter("@appId", SqlDbType.Int);
                    sqlParams[0].Value = Convert.ToInt32(appID);

                    sqlParams[1] = new SqlParameter("@archivaldate", SqlDbType.NVarChar);
                    sqlParams[1].Value = archiveDate;

                    sqlParams[2] = new SqlParameter("@archivaldatasource", SqlDbType.NVarChar);
                    sqlParams[2].Value = strArchiveDataSource;

                    sqlParams[3] = new SqlParameter("@archivaluserid", SqlDbType.NVarChar);
                    sqlParams[3].Value = strArchiveUserID;

                    sqlParams[4] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlParams[4].Direction = ParameterDirection.Output;

                    sqlParams[5] = new SqlParameter("@archivalscripts", SqlDbType.NVarChar, -1);
                    sqlParams[5].Direction = ParameterDirection.Output;

                    _sbSQL.Append("exec ATPAR_DATA_PURGE @appId,@archivaldate,@archivaldatasource,@archivaluserid,@StatusCode out,@archivalscripts out");
                                                  
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }
                    context.Database.CommandTimeout = 0;
                    var archiveDetails = context.Database.ExecuteSqlCommand(_sbSQL.ToString(), sqlParams);
                   // Tuple<long, string> tuple = new Tuple<long, string>(Convert.ToInt64(sqlParams[4].Value), sqlParams[5].Value.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Insert and delete scripts returned from Data Archival is: " + sqlParams[5].Value.ToString()); }

                    if (Convert.ToInt64(sqlParams[4].Value) != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " _StatusCode returned for DataArchival is: " + sqlParams[5].Value.ToString()); }
                        return Convert.ToInt64(sqlParams[4].Value);
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        public List<MT_ATPAR_APP> GetPurgeAppIDs(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string[] columns = new string[] { "APP_ID", "APP_NAME" };
            StringBuilder _sbSQL = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL
                        .Append("SELECT DISTINCT(A.APP_ID), B.APP_NAME ")
                        .Append(" FROM MT_ATPAR_OBJECTS A ,")
                        .Append(" MT_ATPAR_APP B  WHERE A.APP_ID= B.APP_ID AND A.PURGE_FLAG= 1 ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    var distinctApps = context.Database.DifferedExecuteQuery<MT_ATPAR_APP>(columns, _sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " archive Details Count : " + distinctApps.Count); }

                    return distinctApps;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                _sbSQL = null;
            }
        }
    }
}
