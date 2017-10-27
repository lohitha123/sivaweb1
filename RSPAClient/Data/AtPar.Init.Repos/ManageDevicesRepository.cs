using AtPar.Repository.Interfaces.Init;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
using AtPar.Data;
using log4net;
using AtPar.Common;

namespace AtPar.Init.Repos
{
    public class ManageDevicesRepository : IManageDevicesRepository
    {

        #region private variables

        private ILog _log;

        #endregion

        #region Constructor
        public ManageDevicesRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageDevicesRepository));
        }
        #endregion

        #region Methods

        public List<MT_ATPAR_SYSTEM_DEVICES> GetDevIDs(string userID,string search, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            string[] columnFields = { "DEVICE_ID", "DESCRIPTION", "MAC_ADDRESS" ,"STATUS" };
            try
            {
                using (ATPAR_MASTER_Context context = new ATPAR_MASTER_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl
                        .Append("SELECT DEVICE_ID,DESCRIPTION,MAC_ADDRESS,STATUS FROM MT_ATPAR_SYSTEM_DEVICES WHERE SYSTEM_ID='" + deviceTokenEntry[Convert.ToInt32(AtParWebEnums.TokenEntry_Enum.SystemId)])
                        .Append("'");

                    if (!string.IsNullOrEmpty(search))
                    {
                        sbSQl.Append(" AND (DEVICE_ID LIKE '" + search + "%' ");
                        sbSQl.Append(" OR DESCRIPTION LIKE '" + search + "%') ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
                    }

                    var deviceIDs = context.Database.DifferedExecuteQuery<MT_ATPAR_SYSTEM_DEVICES>(columnFields,sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "DeviceIds List : " + deviceIDs.Count); }

                    return deviceIDs;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public int CheckIsDevIDExistOrNot(string userID, string devID,string macAddr, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (ATPAR_MASTER_Context context = new ATPAR_MASTER_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl.Append("SELECT COUNT(DEVICE_ID) FROM MT_ATPAR_SYSTEM_DEVICES WHERE SYSTEM_ID='" + deviceTokenEntry[Convert.ToInt32(AtParWebEnums.TokenEntry_Enum.SystemId)])
                        .Append("' AND DEVICE_ID='"+devID+"'")
                        .Append(" AND MAC_ADDRESS='" + macAddr + "'");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
                    }

                    var count = context.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "DEVICE ID's Count is : " + count); }

                    return count;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public long SaveDevIDs(string userID, string devID, string desc, string macAddr, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (ATPAR_MASTER_Context context = new ATPAR_MASTER_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl
                        .Append("INSERT INTO MT_ATPAR_SYSTEM_DEVICES(SYSTEM_ID, DEVICE_ID, DESCRIPTION, MAC_ADDRESS, STATUS)")
                        .Append(" VALUES('" + deviceTokenEntry[Convert.ToInt32(AtParWebEnums.TokenEntry_Enum.SystemId)])
                        .Append("','" + devID)
                        .Append("','" + desc)
                        .Append("','" + macAddr)
                        .Append("',1) ");
                    
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
                    }

                    var count = context.Database.ExecuteSqlCommand(sbSQl.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "inserted successfully : " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public long UpdateDevIDs(string userID, string devID, string desc,string oldMacAddr, string newMacAddr,  string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (ATPAR_MASTER_Context context = new ATPAR_MASTER_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl
                        .Append("UPDATE MT_ATPAR_SYSTEM_DEVICES SET DESCRIPTION='"+ desc+ "',")
                        .Append("MAC_ADDRESS = '" + newMacAddr)
                        .Append("' WHERE DEVICE_ID = '"+devID+ "' ")
                        .Append("AND MAC_ADDRESS='"+ oldMacAddr + "' ")
                        .Append(" AND SYSTEM_ID = '" + deviceTokenEntry[Convert.ToInt32(AtParWebEnums.TokenEntry_Enum.SystemId)])
                        .Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
                    }

                    var count = context.Database.ExecuteSqlCommand(sbSQl.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "updated successfully : " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSQl = null;
            }
        }

        //public long DisableDevIDs(string userID, string devID, string desc, string macAddr, string Mode, string[] deviceTokenEntry)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    StringBuilder sbSQl = new StringBuilder();

        //    try
        //    {
        //        using (ATPAR_MASTER_Context context = new ATPAR_MASTER_Context())
        //        {
        //            if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

        //            sbSQl
        //                .Append("UPDATE MT_ATPAR_SYSTEM_DEVICES SET STATUS=0")
        //                .Append(" WHERE DEVICE_ID = '" + devID+ "' ") 
        //                .Append(" AND SYSTEM_ID = '" + deviceTokenEntry[Convert.ToInt32(TokenEntry_Enum.SystemId)])
        //                .Append("'");


        //            if (!_log.IsDebugEnabled)
        //            {
        //                if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
        //            }

        //            var count = context.Database.ExecuteSqlCommand(sbSQl.ToString());

        //            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "disabled successfully : " + count); }

        //            return AtparStatusCodes.ATPAR_OK;
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
        //        return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
        //    }
        //    finally
        //    {
        //        sbSQl = null;
        //    }
        //}

        public long UpdateDevStatus_Active(string userID, string devID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (ATPAR_MASTER_Context context = new ATPAR_MASTER_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl
                        .Append("UPDATE MT_ATPAR_SYSTEM_DEVICES SET STATUS=1")
                        .Append(" WHERE DEVICE_ID = '" + (devID + "' "))
                        .Append(" AND SYSTEM_ID = '" + deviceTokenEntry[Convert.ToInt32(AtParWebEnums.TokenEntry_Enum.SystemId)] + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
                    }

                    var count = context.Database.ExecuteSqlCommand(sbSQl.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "device status updated : " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public long UpdateDevStatus_Inactive(string userID, string devID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (ATPAR_MASTER_Context context = new ATPAR_MASTER_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl
                        .Append("UPDATE MT_ATPAR_SYSTEM_DEVICES SET STATUS=0")
                        .Append(" WHERE DEVICE_ID = '" + (devID + "' "))
                        .Append(" AND SYSTEM_ID = '" + deviceTokenEntry[Convert.ToInt32(AtParWebEnums.TokenEntry_Enum.SystemId)] + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
                    }

                    var count = context.Database.ExecuteSqlCommand(sbSQl.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "device status updated : " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSQl = null;
            }
        }

        #endregion
    }
}
