using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.RFID;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace AtPar.RFID.Repos
{
    public class RFIDConfigRepository : IRFIDConfigRepository
    {
        ILog _log;

        public RFIDConfigRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(RFIDConfigRepository));
        }

        public List<RF_READER_CONFIGURATION_DETAILS> GetReaderConfigList()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT READER_LOCATION, READER_MODEL, READER_IP,READER_PORT,PRINTER_IP,");
                    sbSql.Append("PRINTER_PORT,READER_INTERVAL, TAG_ENCODE_MODE, ANTENNA_IDS,");
                    sbSql.Append("DEFAULT_CONFIG,CONFIG_MODULE,CONFIG_ID,STATUS,UPDATE_USER,");
                    // sbSql.Append("DEFAULT_CONFIG,CONFIG_MODULE,ID,UPDATE_USER,UPDATE_DTTM ");
                    sbSql.Append("UPDATE_DTTM FROM RF_READER_CONFIGURATION_DETAILS ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var fields = new[] { "READER_LOCATION", "READER_MODEL", "READER_IP", "READER_PORT", "PRINTER_PORT", "PRINTER_IP", "READER_INTERVAL", "TAG_ENCODE_MODE", "ANTENNA_IDS", "DEFAULT_CONFIG", "CONFIG_MODULE", "CONFIG_ID", "STATUS", "UPDATE_USER", "UPDATE_DTTM" };

                    var lstConfigDetails = objContext.Database.DifferedExecuteQuery<RF_READER_CONFIGURATION_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Configurations Returned: {1}", methodBaseName, lstConfigDetails != null ? lstConfigDetails.Count() : 0)); }

                    return lstConfigDetails;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long UpdateReaderConfiguration(RF_READER_CONFIGURATION_DETAILS config)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();


            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var dbContextTransaction = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                            sbSql.Append(" UPDATE RF_READER_CONFIGURATION_DETAILS ");
                            sbSql.Append("SET READER_LOCATION = '" + config.READER_LOCATION + "', ");
                            sbSql.Append("READER_MODEL = '" + config.READER_MODEL + "', ");
                            sbSql.Append("READER_PORT = " + config.READER_PORT + ", ");
                            sbSql.Append("READER_IP = '" + config.READER_IP + "', ");
                            sbSql.Append("PRINTER_PORT = " + config.PRINTER_PORT + ", ");
                            sbSql.Append("PRINTER_IP = '" + config.PRINTER_IP + "', ");
                            sbSql.Append("READER_INTERVAL = " + config.READER_INTERVAL + ", ");
                            sbSql.Append("TAG_ENCODE_MODE = '" + config.TAG_ENCODE_MODE + "', ");
                            sbSql.Append("ANTENNA_IDS = '" + config.ANTENNA_IDS + "', ");
                            sbSql.Append("CONFIG_MODULE = '" + config.CONFIG_MODULE + "', ");
                            sbSql.Append("STATUS = '" + config.STATUS + "', ");
                            sbSql.Append("UPDATE_DTTM = '" + DateTime.Now + "', ");
                            sbSql.Append("UPDATE_USER = '" + config.UPDATE_USER + "' ");
                            sbSql.Append("WHERE CONFIG_ID = '" + config.CONFIG_ID + "'");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                            }

                            objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            dbContextTransaction.Commit();

                            if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0}{1}{2}", methodBaseName, "Configuration updated for ID :  ", config.CONFIG_ID)); }
                        }
                        catch (Exception ex)
                        {
                            dbContextTransaction.Rollback();
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                        }
                    }
                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long SetDefaultConfig(int ID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())

                {

                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        try
                        {
                            //Call stored procedure
                            SqlParameter[] sqlparams = new SqlParameter[2];

                            sqlparams[0] = new SqlParameter("@pConfigID", SqlDbType.Int);
                            sqlparams[0].Value = ID;

                            sqlparams[1] = new SqlParameter("@pStatusCode", SqlDbType.Int);
                            sqlparams[1].Direction = ParameterDirection.Output;

                            var cnt = objContext.Database.ExecuteSqlCommand("exec SP_SetDefaultReaderConfig @pConfigID,@pStatusCode OUT", sqlparams[0], sqlparams[1]);

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Updated rows Count " + cnt); }
                            if (Convert.ToInt32(sqlparams[1].Value) == 0)
                                trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;

                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                            { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }

                    }
                }


            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
        }

        /// <summary>
        /// AddReaderConfig
        /// </summary>
        /// <param name="ObjConfig"></param>
        /// <returns></returns>
        public long AddReaderConfig(RF_READER_CONFIGURATION_DETAILS ObjConfig)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int printerCount;
            StringBuilder sbSql = new StringBuilder();
            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                            sbSql.Clear();

                            //INSERT INTO RF_READER_CONFIGURATION_DETAILS(READER_MODEL, READER_LOCATION, READER_IP, UPDATE_DTTM) VALUES('FX7500','CUBE1','192.168.176.88', GETDATE()) 

                            sbSql.Append("SELECT COUNT(CONFIG_ID) CONFIG_ID FROM RF_READER_CONFIGURATION_DETAILS WHERE READER_LOCATION ='");
                            sbSql.Append(ObjConfig.READER_LOCATION + "' OR READER_IP='" + ObjConfig.READER_IP + "'");

                            var ReaderCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                            if (_log.IsInfoEnabled) { _log.Info(methodBaseName + "No.Of records " + ReaderCount); }

                            if (ReaderCount == 0)
                            {
                                sbSql.Clear();
                                sbSql.Append("INSERT INTO RF_READER_CONFIGURATION_DETAILS (READER_LOCATION,");
                                sbSql.Append("READER_MODEL,READER_IP,READER_PORT,PRINTER_IP,PRINTER_PORT,");
                                sbSql.Append("READER_INTERVAL,TAG_ENCODE_MODE,ANTENNA_IDS,CONFIG_MODULE,STATUS,");
                                sbSql.Append("UPDATE_USER,UPDATE_DTTM)VALUES(");
                                sbSql.Append("'" + ObjConfig.READER_LOCATION + "',");
                                sbSql.Append("'" + ObjConfig.READER_MODEL + "',");
                                sbSql.Append("'" + ObjConfig.READER_IP + "'," + ObjConfig.READER_PORT + ",");
                                sbSql.Append("'" + ObjConfig.PRINTER_IP + "'," + ObjConfig.PRINTER_PORT + ",");
                                sbSql.Append(ObjConfig.READER_INTERVAL + ",'" + ObjConfig.TAG_ENCODE_MODE + "',");
                                sbSql.Append("'" + ObjConfig.ANTENNA_IDS + "','" + ObjConfig.CONFIG_MODULE + "',");
                                sbSql.Append("'" + ObjConfig.STATUS + "',");
                                sbSql.Append("'" + ObjConfig.UPDATE_USER + "','" + DateTime.Now + "')");

                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                }

                                var insCount = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + insCount); }
                            }
                            else
                            {
                                return AtparStatusCodes.ATPAR_E_LOCGRPIDALREADYEXISTS;
                            }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        finally
                        {
                            sbSql.Clear();
                        }
                        trans.Commit();
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long DeleteReaderConfig(long configId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            string tempDescr = string.Empty;

                            sbSql.Append("IF EXISTS(SELECT READER_IP FROM RF_READER_CONFIGURATION_DETAILS WHERE  ");
                            sbSql.Append("CONFIG_ID = " + configId + ") ");
                            sbSql.Append("DELETE FROM RF_READER_CONFIGURATION_DETAILS WHERE CONFIG_ID = " + configId);

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                            }


                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        finally
                        {
                            sbSql.Clear();
                        }
                        trans.Commit();
                    }
                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

    }
}
