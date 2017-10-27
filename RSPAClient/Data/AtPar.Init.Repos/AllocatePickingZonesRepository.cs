using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace AtPar.Init.Repos
{
    public class AllocatePickingZonesRepository : IAllocatePickingZonesRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        #region Constructor

        public AllocatePickingZonesRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(AllocatePickingZonesRepository));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the Active Storage Zones
        /// </summary>
        /// <param name="orgGroupId"></param>
        /// <returns></returns>
        public List<MT_ATPAR_STORAGE_ZONE> GetActiveStorageZones(string orgGroupId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT STORAGE_ZONE_ID, STORAGE_ZONE_DESCR FROM MT_ATPAR_STORAGE_ZONE WHERE STATUS = 1 ");

                    if ((!string.IsNullOrEmpty(orgGroupId)) && (orgGroupId != "All"))
                    {
                        sbSql.Append("AND ORG_GROUP_ID = '" + orgGroupId + "' ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "STORAGE_ZONE_ID", "STORAGE_ZONE_DESCR" };
                    var lstActiveStorageZones = objContext.Database.DifferedExecuteQuery<MT_ATPAR_STORAGE_ZONE>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstActiveStorageZones.Count); }

                    return lstActiveStorageZones;

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
        /// Gets the Allocated Storage Zones
        /// </summary>
        /// <param name="orgGroupId"></param>
        /// <param name="storageZoneId"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public List<MT_ATPAR_STORAGE_ZONES_ALLOCATION> GetAllocatedStorageZones(string orgGroupId, string storageZoneId, string userId, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ORG_GROUP_ID, STORAGE_ZONE_ID, USER_ID FROM MT_ATPAR_STORAGE_ZONES_ALLOCATION WHERE ");
                    sbSql.Append("USER_ID = '" + userId + "' AND APP_ID = " + appId);

                    if ((!string.IsNullOrEmpty(orgGroupId)) && (orgGroupId != "All"))
                    {
                        sbSql.Append(" AND ORG_GROUP_ID = '" + orgGroupId + "' ");
                    }

                    if(!string.IsNullOrEmpty(storageZoneId))
                    {
                        sbSql.Append(" AND STORAGE_ZONE_ID LIKE '" + storageZoneId + "%'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "STORAGE_ZONE_ID", "USER_ID" };
                    var lstAllocatedStorageZones = objContext.Database.DifferedExecuteQuery<MT_ATPAR_STORAGE_ZONES_ALLOCATION>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstAllocatedStorageZones.Count); }

                    return lstAllocatedStorageZones;

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
        /// Gets the User allocated to the Storage Zones
        /// </summary>
        /// <param name="orgGroupId"></param>
        /// <param name="storageZoneId"></param>
        /// <returns></returns>
        public List<MT_ATPAR_STORAGE_ZONES_ALLOCATION> GetStorageZoneUsers(string orgGroupId, string storageZoneId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT B.FIRST_NAME + ' ' + B.MIDDLE_INITIAL + ' ' + B.LAST_NAME + ' (' + B.USER_ID + ')' AS USERNAME ");
                    sbSql.Append("FROM MT_ATPAR_STORAGE_ZONES_ALLOCATION A, MT_ATPAR_USER B WHERE A.USER_ID = B.USER_ID AND ");
                    sbSql.Append("STORAGE_ZONE_ID = '" + storageZoneId + "' ");

                    if ((!string.IsNullOrEmpty(orgGroupId)) && (orgGroupId != "All"))
                    {
                        sbSql.Append("AND ORG_GROUP_ID = '" + orgGroupId + "' ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "USERNAME" };

                    var lstUsers = objContext.Database.DifferedExecuteQuery<MT_ATPAR_STORAGE_ZONES_ALLOCATION>(fields, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstUsers); }

                    return lstUsers;

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
        /// Inserts the Allocated Picking Zones to the user
        /// </summary>
        /// <param name="lstAllocatedStorageZones"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="storageZoneId"></param>
        /// <param name="assignedUserId"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public long InsertUserStorageZones(List<MT_ATPAR_STORAGE_ZONE> lstAllocatedStorageZones, string orgGroupId,
                                           string storageZoneId, string assignedUserId, string userId, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteAllocatedStorageZones(orgGroupId, assignedUserId, storageZoneId, appId, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        StatusCode = InsertAllocatedStorageZones(lstAllocatedStorageZones, orgGroupId, assignedUserId, userId, appId, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
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

        }
        #endregion

        #region Private Methods

        /// <summary>
        /// Deletes the Allocated Storage Zones from Assigned User
        /// </summary>
        /// <param name="orgGroupId"></param>
        /// <param name="assignedUserId"></param>
        /// <param name="zoneGroupId"></param>
        /// <param name="appId"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteAllocatedStorageZones(string orgGroupId, string assignedUserId, string zoneGroupId, short appId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_ATPAR_STORAGE_ZONES_ALLOCATION WHERE ORG_GROUP_ID  = '" + orgGroupId + "'  ");
                sbSql.Append("AND USER_ID = '" + assignedUserId + "' AND APP_ID = '" + appId + "' ");

                if(!string.IsNullOrEmpty(zoneGroupId))
                {
                    sbSql.Append("AND STORAGE_ZONE_ID Like '" + zoneGroupId + "%' ");
                }

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

                return AtparStatusCodes.ATPAR_OK;
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
        /// Inserts the Storage Zones to the user
        /// </summary>
        /// <param name="lstAllocatedStorageZones"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="assignedUserId"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertAllocatedStorageZones(List<MT_ATPAR_STORAGE_ZONE> lstAllocatedStorageZones, string orgGroupId,
                                                 string assignedUserId, string userId, short appId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                //lstAllocatedStorageZones.RemoveAll(x => x.CHK_VALUE == 0);
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var zone in lstAllocatedStorageZones)
                {
                    sbSql.Clear();

                    if (zone.CHK_VALUE == 1)
                    {
                        sbSql.Append(" INSERT INTO MT_ATPAR_STORAGE_ZONES_ALLOCATION(APP_ID, ORG_GROUP_ID, STORAGE_ZONE_ID, USER_ID,");
                        sbSql.Append(" LAST_UPDATE_DATE, LAST_UPDATE_USER) ");
                        sbSql.Append(" VALUES('" + appId + "','" + orgGroupId + "','" + zone.STORAGE_ZONE_ID + "',");
                        sbSql.Append(" '" + assignedUserId + "','" + DateTime.Now + "','" + userId + "')");


                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                        }

                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }
                    }

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

        #endregion
    }
}
