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
    public class SetupStorageLocationGroupsRepository : ISetupStorageLocationGroupsRepository
    {
        private ILog _log;
        public SetupStorageLocationGroupsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(SetupStorageLocationGroupsRepository));
        }

        #region GetZoneStorageLevelDetails
        /// <summary>
        /// Getting Business Unit Count
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="bUnit"></param>
        /// <returns></returns>
        public int GetBusinessUnitCount(string orgGroupID, string bUnit)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT COUNT(BUSINESS_UNIT) FROM MT_ATPAR_ORG_GROUP_BUNITS ");

                    if (!string.IsNullOrEmpty(orgGroupID))
                    {
                        if (orgGroupID != "All")
                        {
                            sbSql.Append(" WHERE ORG_GROUP_ID = '").Append(orgGroupID).Append("'");
                        }
                    }

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        if (orgGroupID != "All")
                        {
                            sbSql.Append(" AND BUSINESS_UNIT = '").Append(bUnit).Append("'");
                        }
                        else if (orgGroupID == "All")
                        {
                            sbSql.Append(" WHERE BUSINESS_UNIT =").Append(bUnit).Append("'");
                        }
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var businessUnitCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of parameter values returned : " + businessUnitCount.ToString()); }

                    return businessUnitCount;
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
        /// Getting Zone Storage Levels
        /// </summary>
        /// <param name="zoneGroupID"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="bUnit"></param>
        /// <param name="area"></param>
        /// <returns></returns>
        public List<MT_ATPAR_ZONE_STORAGE_LEVELS> GetZoneStorageLevels(string zoneGroupID, string orgGroupID, string bUnit, string area)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT ORG_GROUP_ID,STORAGE_ZONE_ID,ORG_ID,STORAGE_AREA,STOR_LEVEL_1,STOR_LEVEL_2,STOR_LEVEL_3,STOR_LEVEL_4 FROM MT_ATPAR_ZONE_STORAGE_LEVELS ");

                    if (!string.IsNullOrEmpty(zoneGroupID))
                    {
                        sbSql.Append(" WHERE STORAGE_ZONE_ID = '").Append(zoneGroupID).Append("'");
                    }

                    if (!string.IsNullOrEmpty(orgGroupID))
                    {
                        if (orgGroupID != "All")
                        {
                            sbSql.Append(" AND  ORG_GROUP_ID = '").Append(orgGroupID).Append("'");
                        }
                    }

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        sbSql.Append(" AND ORG_ID = '").Append(bUnit).Append("'");
                    }

                    if (!string.IsNullOrEmpty(area))
                    {
                        sbSql.Append("AND STORAGE_AREA LIKE '").Append(area).Append("%'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "STORAGE_ZONE_ID", "ORG_ID", "STORAGE_AREA", "STOR_LEVEL_1", "STOR_LEVEL_2", "STOR_LEVEL_3", "STOR_LEVEL_4" };

                    var lstZoneStorageLevels = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ZONE_STORAGE_LEVELS>(fields,sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of parameter values returned : " + lstZoneStorageLevels.Count()); }

                    return lstZoneStorageLevels;
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
        #endregion

        #region InsertStorageZoneGroups
        public int GetStorageZoneCount(string zoneID, string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT COUNT(STORAGE_ZONE_ID) FROM MT_ATPAR_STORAGE_ZONE WHERE STORAGE_ZONE_ID='").Append(zoneID).Append("'").Append(" AND ORG_GROUP_ID='").Append(orgID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var storageZoneIdCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of parameter values returned : " + storageZoneIdCount.ToString()); }

                    return storageZoneIdCount;
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

        public long InsertStorageZone(string orgID, string zoneID, string zoneDescr, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_ATPAR_STORAGE_ZONE(ORG_GROUP_ID,STORAGE_ZONE_ID,STORAGE_ZONE_DESCR,STATUS,LAST_UPDATE_DATE,LAST_UPDATE_USER) ").Append("VALUES('").Append( orgID ).Append( "','" ).Append( zoneID ).Append( "','" ).Append( zoneDescr != null? zoneDescr.Replace("'", "''"): zoneDescr ).Append( "',1,'" ).Append( DateTime.Now ).Append( "','" ).Append( userID ).Append( "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records inserted : " + count.ToString()); }

                    return count;
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
        #endregion

        #region GetStorageZoneGroups
        public List<MT_ATPAR_STORAGE_ZONE> GetStorageZoneGroups(string zoneGrpID, string zoneGrpDescr, string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT STORAGE_ZONE_ID,ORG_GROUP_ID,STORAGE_ZONE_DESCR,STATUS FROM MT_ATPAR_STORAGE_ZONE ");

                    if (!string.IsNullOrEmpty(orgID))
                    {
                        if (orgID != "All")
                        {
                            sbSql.Append(" WHERE  ORG_GROUP_ID = '").Append(orgID).Append("'");
                        }
                    }

                    if (!string.IsNullOrEmpty(zoneGrpID))
                    {
                        if (orgID != "All")
                        {
                            sbSql.Append(" AND STORAGE_ZONE_ID LIKE '").Append(zoneGrpID).Append("%'");
                        }
                        else
                        {
                            sbSql.Append(" WHERE STORAGE_ZONE_ID LIKE '").Append(zoneGrpID).Append("%'");
                        }
                    }

                    if (!string.IsNullOrEmpty(zoneGrpDescr))
                    {
                        if (orgID != "All")
                        {
                            sbSql.Append(" AND STORAGE_ZONE_DESCR LIKE '").Append(zoneGrpDescr.Replace("'", "''")).Append("%'");
                        }
                        else if (orgID == "All" && string.IsNullOrEmpty(zoneGrpID))
                        {
                            sbSql.Append(" WHERE STORAGE_ZONE_DESCR LIKE '").Append(zoneGrpDescr.Replace("'", "''")).Append("%'");
                        }
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new [] { "STORAGE_ZONE_ID", "ORG_GROUP_ID", "STORAGE_ZONE_DESCR", "STATUS" };

                    var lstStorageZone = objContext.Database.DifferedExecuteQuery<MT_ATPAR_STORAGE_ZONE>(fields,sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of parameter values returned : " + lstStorageZone.Count); }

                    return lstStorageZone;
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
        #endregion

        #region UpdateZones
        /// <summary>
        /// Updating Zones
        /// </summary>
        /// <param name="zoneID"></param>
        /// <param name="zoneDescr"></param>
        /// <param name="status"></param>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        public long UpdateZones(string zoneID, string zoneDescr, int status, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int storageZoneCount = 0;
            long statusCode = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            storageZoneCount = GetStorageZonesCount(zoneID, orgGrpID, objContext);
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                        }

                        if (storageZoneCount > 0 && status == 0)
                        {
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_CANNOTUPDATESTATUS;
                        }

                        statusCode = DeleteZoneStorageLevels(zoneID, orgGrpID, objContext);

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }

                        statusCode = DeleteStorageZone(zoneID, orgGrpID, objContext);

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }

                        trans.Commit();

                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
        }

        /// <summary>
        /// Getting Storage Zones Count
        /// </summary>
        /// <param name="zoneID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int GetStorageZonesCount(string zoneID, string orgGrpID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int storageZonesCount = 0;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT COUNT(*) FROM MT_ATPAR_STORAGE_ZONES_ALLOCATION WHERE STORAGE_ZONE_ID='").Append(zoneID).Append("' AND ORG_GROUP_ID= '").Append(orgGrpID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                storageZonesCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profile count  returned : " + storageZonesCount); }

                return storageZonesCount;
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
        /// Deleting Zone Storage Levels
        /// </summary>
        /// <param name="zoneID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteZoneStorageLevels(string zoneID, string orgGrpID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM  MT_ATPAR_ZONE_STORAGE_LEVELS  WHERE STORAGE_ZONE_ID='").Append(zoneID).Append("' AND ORG_GROUP_ID='").Append(orgGrpID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.of rows deleted " + count); }
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
        /// Deleting Storage Zone
        /// </summary>
        /// <param name="zoneID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteStorageZone(string zoneID, string orgGrpID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM  MT_ATPAR_STORAGE_ZONE  WHERE STORAGE_ZONE_ID='").Append(zoneID).Append("' AND ORG_GROUP_ID='").Append(orgGrpID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.of rows deleted " + count); }
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
        #endregion

        #region InsertzoneStorageLevels
        public long InsertzoneStorageLevels(string userID, string orgGroupID, string zoneGroupID, List<MT_ATPAR_ZONE_STORAGE_LEVELS> lstZoneStorageLevels)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        List<MT_ATPAR_ZONE_STORAGE_LEVELS> lstZoneDetails = null;

                        if (lstZoneStorageLevels != null && lstZoneStorageLevels.Count > 0)
                        {
                            var delete = Convert.ToInt32(AtParWebEnums.Perform_Action.DELETE);
                            lstZoneDetails = lstZoneStorageLevels.Where(x => x.PERFORM_ACTION == delete.ToString()).ToList();
                        }

                        foreach (var item in lstZoneDetails)
                        {
                            statusCode = DeleteZoneStorageLevels(item.STORAGE_AREA, item.STOR_LEVEL_1, item.STOR_LEVEL_2, item.STOR_LEVEL_3, item.STOR_LEVEL_4, item.BUSINESS_UNIT, zoneGroupID, orgGroupID, objContext);

                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
                            }
                        }

                        lstZoneDetails = null;

                        if (lstZoneStorageLevels != null && lstZoneStorageLevels.Count > 0)
                        {
                           var add= Convert.ToInt32(AtParWebEnums.Perform_Action.ADD);
                            lstZoneDetails = lstZoneStorageLevels.Where(x => x.PERFORM_ACTION == add.ToString()).ToList();
                        }

                        foreach (var item in lstZoneDetails)
                        {
                            statusCode = InsertZoneStorageLevels(item.STORAGE_AREA, item.STOR_LEVEL_1, item.STOR_LEVEL_2, item.STOR_LEVEL_3, item.STOR_LEVEL_4, item.BUSINESS_UNIT, zoneGroupID, orgGroupID, userID, objContext);

                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
                            }
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

        private long DeleteZoneStorageLevels(string storageArea, string storLevel1, string storLevel2, string storLevel3, string storLevel4, string orgID, string zoneGroupID, string orgGroupID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                storageArea = storageArea.Replace("'", "''");

                sbSql.Append(" DELETE FROM MT_ATPAR_ZONE_STORAGE_LEVELS WHERE STORAGE_ZONE_ID ='").Append(zoneGroupID).Append("' AND STORAGE_AREA = '").Append(storageArea).Append("' AND STOR_LEVEL_1 = '").Append(storLevel1).Append("' AND STOR_LEVEL_2 = '").Append(storLevel2).Append("' AND STOR_LEVEL_3 = '").Append(storLevel3).Append("' AND STOR_LEVEL_4 = '").Append(storLevel4).Append("'");

                if (!string.IsNullOrEmpty(orgID))
                {
                    sbSql.Append(" AND ORG_ID = '").Append(orgID).Append("'");
                }

                if (!string.IsNullOrEmpty(orgGroupID))
                {
                    sbSql.Append(" AND ORG_GROUP_ID = '").Append(orgGroupID).Append("'");
                }

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Deleted " + count); }

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


        private long InsertZoneStorageLevels(string storageArea, string storLevel1, string storLevel2, string storLevel3, string storLevel4, string orgID, string zoneGroupID, string orgGroupID, string userID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                storageArea = storageArea.Replace("'", "''");

                sbSql.Append("INSERT INTO MT_ATPAR_ZONE_STORAGE_LEVELS( ORG_GROUP_ID,STORAGE_ZONE_ID,ORG_ID,STORAGE_AREA,STOR_LEVEL_1,STOR_LEVEL_2,STOR_LEVEL_3,STOR_LEVEL_4, LAST_UPDATE_DATE,LAST_UPDATE_USER) VALUES(").Append("'").Append(orgGroupID).Append("','").Append(zoneGroupID).Append("','").Append(orgID).Append("','").Append(storageArea).Append("','").Append(storLevel1).Append("','").Append(storLevel2).Append("','").Append(storLevel3).Append("','").Append(storLevel4).Append("','").Append(DateTime.Now).Append("','").Append(userID).Append("')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
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


