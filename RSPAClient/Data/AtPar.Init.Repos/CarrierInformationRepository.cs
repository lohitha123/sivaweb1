#region Usings
using AtPar.Repository.Interfaces.Init;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using log4net;
using AtPar.Data;
using AtPar.Common;
using System.Data.SqlClient;
#endregion

namespace AtPar.Init.Repos
{
    public class CarrierInformationRepository : ICarrierInformationRepository
    {
        #region Private Variable

        ILog _log;

        #endregion

        #region Constructor

        public CarrierInformationRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CarrierInformationRepository));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// To Update the status of MT_RECV_CARRIER table
        /// </summary>
        /// <returns></returns>
        public long UpdateCarrierStaus()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_RECV_CARRIER SET STATUS = 'I' WHERE STATUS IN ('N','O') AND LOCAL_FLAG ='N' ");

                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());
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
        /// To Get the Carrier information based on Carrier ID
        /// </summary>
        /// <param name="carrierID"></param>
        /// <returns></returns>
        public List<MT_RECV_CARRIER> GetCarrierInformation(string carrierID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            List<MT_RECV_CARRIER> listItems = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT CARRIER_ID, DESCR, LOCAL_FLAG FROM MT_RECV_CARRIER WHERE CARRIER_ID = '" + carrierID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fileds = new[] { "CARRIER_ID", "DESCR", "LOCAL_FLAG" };

                    listItems = objContext.Database.DifferedExecuteQuery<MT_RECV_CARRIER>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Items Returned: " + listItems.Count()); }

                    return listItems;
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

        /// <summary>
        /// To Update Status and Descr in MT_RECV_CARRIER table based on Carrier ID
        /// </summary>
        /// <param name="localDbcarriers"></param>
        /// <param name="carrierID"></param>
        /// <param name="descr"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public long UpdateCarrierInformation(MT_RECV_CARRIER localDbcarriers, string carrierID, string descr, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (localDbcarriers.CARRIER_ID.ToString().TrimEnd() == carrierID && localDbcarriers.LOCAL_FLAG.ToString().TrimEnd() == "Y")
                    {
                        sbSql.Append("UPDATE MT_RECV_CARRIER SET DESCR = '" + descr.ReplaceString() + "', STATUS = 'N', LAST_UPDATE_DATE = '" + DateTime.Now.ToString() + "', LAST_UPDATE_USERID = '" + userID + "' , LOCAL_FLAG ='N' WHERE CARRIER_ID ='" + carrierID + "'");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                        return AtparStatusCodes.ATPAR_OK;
                    }
                    else
                    {
                        if (localDbcarriers.DESCR.ToString().TrimEnd() != descr)
                        {
                            sbSql.Append("UPDATE MT_RECV_CARRIER SET DESCR = '" + descr.ReplaceString() + "', STATUS = 'O', LAST_UPDATE_DATE = '" + DateTime.Now.ToString() + "', LAST_UPDATE_USERID = '" + userID + "' WHERE CARRIER_ID ='" + carrierID + "'");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        else
                        {
                            sbSql.Append("UPDATE MT_RECV_CARRIER SET STATUS = 'O' WHERE CARRIER_ID ='" + carrierID + "'");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
                            return AtparStatusCodes.ATPAR_OK;
                        }
                    }
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

        /// <summary>
        /// To Insert Carrier Information into MT_RECV_CARRIER Table
        /// </summary>
        /// <param name="carrierID"></param>
        /// <param name="descr"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public long InsertCarrierInformation(string carrierID, string descr, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_RECV_CARRIER (CARRIER_ID, DESCR, STATUS, LAST_UPDATE_DATE, LAST_UPDATE_USERID, LOCAL_FLAG) VALUES ('" + carrierID + "', '" + descr.ReplaceString() + "', 'N', '" + DateTime.Now.ToString() + "', '" + userID + "', 'N')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// To Update Status in MT_RECV_CARRIER Table based on User ID
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public long UpdateCarrierStaus(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_RECV_CARRIER SET STATUS = 'D', LAST_UPDATE_DATE = '" + DateTime.Now.ToString() + "', LAST_UPDATE_USERID = '" + userID + "' WHERE STATUS = 'I'");

                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());
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
        /// To Get the carriers data from MT_RECV_CARRIER table
        /// </summary>
        /// <returns></returns>
        public List<MT_RECV_CARRIER> GetCarriersData()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            List<MT_RECV_CARRIER> listItems = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT CARRIER_ID, DESCR, LOCAL_FLAG FROM MT_RECV_CARRIER WHERE STATUS <> 'D' ORDER BY CARRIER_ID");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fileds = new[] { "CARRIER_ID", "DESCR", "LOCAL_FLAG" };

                    listItems = objContext.Database.DifferedExecuteQuery<MT_RECV_CARRIER>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Items Returned: " + listItems.Count()); }

                    return listItems;
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

        /// <summary>
        /// To Insert the Carrier
        /// </summary>
        /// <param name="carrierID"></param>
        /// <param name="descr"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public long AddCarrier(string carrierID, string descr, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            bool blnAdd = true;
            bool blnAdd1 = true;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT CARRIER_ID, STATUS FROM MT_RECV_CARRIER WHERE CARRIER_ID ='" + carrierID + "'");

                    string[] fields = { "CARRIER_ID", "STATUS" };

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    List<MT_RECV_CARRIER> lstCarriers = objContext.Database.DifferedExecuteQuery<MT_RECV_CARRIER>(fields, sbSql.ToString()).ToList();

                    if (lstCarriers.Count > 0)
                    {
                        foreach (MT_RECV_CARRIER carrierItem in lstCarriers)
                        {
                            if (carrierItem.CARRIER_ID.ToUpper().TrimEnd() == carrierID.ToUpper())
                            {
                                if (carrierItem.STATUS.ToString().TrimEnd() == "D")
                                {
                                    blnAdd = false;
                                }
                                else
                                {
                                    return AtparStatusCodes.ATPAR_E_CARRIERIDALREADYEXISTS;
                                }
                            }
                        }
                    }

                    if (carrierID.IndexOf('&') > 0)
                    {
                        blnAdd1 = false;
                    }

                    if (!blnAdd)
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            sbSql.Remove(0, sbSql.Length);
                            sbSql.Append("UPDATE MT_RECV_CARRIER SET STATUS = 'N', CARRIER_ID='" + carrierID + "', DESCR='" + descr.ReplaceString() + "', LAST_UPDATE_DATE = '" + DateTime.Now.ToString() + "', LAST_UPDATE_USERID = '" + userID + "' WHERE CARRIER_ID='" + carrierID + "'");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }

                            objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            return AtparStatusCodes.ATPAR_OK;
                        }                        
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }

                    }
                    else if (blnAdd && blnAdd1)
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                            sbSql.Remove(0, sbSql.Length);
                            sbSql.Append("INSERT INTO MT_RECV_CARRIER (CARRIER_ID, DESCR, STATUS, LAST_UPDATE_DATE, LAST_UPDATE_USERID, LOCAL_FLAG) VALUES ('" + carrierID + "', '" + descr.ReplaceString() + "', 'N', '" + DateTime.Now.ToString() + "', '" + userID + "', 'Y')");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }

                            objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            return AtparStatusCodes.ATPAR_OK;
                        }                        
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                        }
                    }
                }

                if (!blnAdd1)
                {
                    return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                }
                else
                {
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

        /// <summary>
        /// To Delete the carrier(Updating the Status to D)
        /// </summary>
        /// <param name="carrierID"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public long DeleteCarrier(string carrierID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_RECV_CARRIER SET STATUS = 'D', LAST_UPDATE_DATE = '" + DateTime.Now.ToString() + "', LAST_UPDATE_USERID = '" + userID + "' WHERE CARRIER_ID='" + carrierID + "'");

                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());
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

        #endregion
    }
}
