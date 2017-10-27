using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.Repository.Interfaces.Init;
using System.Net.Http;
using AtPar.POCOEntities;
using AtPar.Common;
using log4net;
using AtPar.Data;
using System.Data.SqlClient;

namespace AtPar.Init.Repos
{

    public class TokensRepository : ITokensRepository
    {
        ILog _log;
        public TokensRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(TokensRepository));
        }

        /// <summary>
        ///  Used to get live tokens
        /// </summary>
        /// <param name="pChkValue"></param>
        /// <returns></returns>                       
        public List<MT_ATPAR_TOKENS> GetLiveTokens(int pChkValue)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {    
                List<MT_ATPAR_TOKENS> lstTokens = null;
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    SqlParameter paramAppId = new SqlParameter("@BlnChecked",System.Data.SqlDbType.Int);
                    paramAppId.Value = pChkValue;


                    var fields = new[] { "ACCESS_TOKEN", "USER_ID", "DEVICE_ID", "EXPIRY_TIME", "REQUEST_TIME", "PROFILE_ID", "IDLE_TIME", "PRODUCTS_ACCESS" };

                    lstTokens = objContext.Database.DifferedExecuteQuery<MT_ATPAR_TOKENS>(fields, "exec GetLiveTokens @BlnChecked", paramAppId).ToList();

                              
                     if(lstTokens != null)
                    {
                        lstTokens =lstTokens.OrderBy(x => x.USER_ID).ToList();

                    }
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Org Groups Returned: " + lstTokens.Count()); }

                }
                return lstTokens;
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
        ///  Used to delete the token by access token
        /// </summary>
        /// <param name="strAccessToken"></param>
        /// <returns></returns>
        public long DeleteTokenEntry(string strAccessToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_ATPAR_TOKENS WHERE ACCESS_TOKEN = '" + strAccessToken + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
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
        /// Used to delete all expired tokens at time
        /// </summary>
        /// <returns></returns>
        public long RunTokenGC()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_ATPAR_TOKENS WHERE EXPIRY_TIME < GETUTCDATE() ");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
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


    }
}
