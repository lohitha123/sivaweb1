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
    public class AllocateLocationGroupsRepository : IAllocateLocationGroupsRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        #region Constructor

        public AllocateLocationGroupsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(AllocateLocationGroupsRepository));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Allocates the location groups
        /// </summary>
        /// <param name="lstLocationGroups"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="locationGroupId"></param>
        /// <param name="assignedUserId"></param>
        /// <param name="userID"></param>
        /// <param name="clientIP"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public long InsertLocationGroups(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string orgGroupID, string locationGroupId,
                                         string assignedUserId, string userID, string clientIP, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteLocationGroupAllocation(orgGroupID, assignedUserId, appId, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        StatusCode = InsertLocationGroupAllocation(lstLocationGroups, orgGroupID, assignedUserId, userID, clientIP, appId, objContext);

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

        /// <summary>
        /// Deletes the location groups
        /// </summary>
        /// <param name="lstLocationGroupDetails"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="userID"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public long DeleteLocationDetails(string orgGroupID, string locationGroupId, string userID, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
            {
                try
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" DELETE FROM MT_ATPAR_LOC_GROUP_ALLOCATION WHERE ORG_GROUP_ID='" + orgGroupID + "'  AND ");
                    sbSql.Append(" LOC_GROUP_ID='" + locationGroupId + "' ");
                    sbSql.Append(" AND APP_ID='" + appId + "' AND USER_ID='" + userID + "' ");


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
        }


        /// <summary>
        /// Inserts location details
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="locationGroupId"></param>
        /// <param name="userID"></param>
        /// <param name="toUserId"></param>
        /// <param name="clientIP"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public long InsertLocationDetails(string orgGroupID, string locationGroupId, string userID,
                                          string toUserId, string clientIP, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
            {
                try
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append(" INSERT INTO MT_ATPAR_LOC_GROUP_ALLOCATION(APP_ID,ORG_GROUP_ID,LOC_GROUP_ID,USER_ID,");
                    sbSql.Append(" LAST_UPDATE_DATE,LAST_UPDATE_USER,LAST_CLIENT_ADDRESS) ");
                    sbSql.Append(" VALUES('" + appId + "','" + orgGroupID + "','" + locationGroupId + "',");
                    sbSql.Append(" '" + toUserId + "','" + DateTime.Now + "','" + userID + "','" + clientIP + "')");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }


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
        }

        /// <summary>
        /// Checks the location allocated to the selected user or not
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="locationGroupId"></param>
        /// <param name="selectedUserId"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public Boolean IsLocationExists(string orgGroupID, string locationGroupId, string selectedUserId, short appId)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var locationGroupCount = objContext.MT_ATPAR_LOC_GROUP_ALLOCATION.Count(x => x.ORG_GROUP_ID == orgGroupID
                                                && x.LOC_GROUP_ID == locationGroupId && x.USER_ID == selectedUserId && x.APP_ID == appId);

                    if (locationGroupCount > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        /// <summary>
        /// Gets the Active Locations Groups
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <returns></returns>
        public List<MT_ATPAR_LOC_GROUPS> GetActiveLocationGroups(string orgGroupID, string locationGroupId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT LOC_GROUP_ID,LOC_DESCR FROM MT_ATPAR_LOC_GROUPS WHERE STATUS = 1 ");

                    if ((!string.IsNullOrEmpty(orgGroupID)) && (orgGroupID != "All"))
                    {
                        sbSQL.Append("AND ORG_GROUP_ID = '" + orgGroupID + "' ");
                    }

                    if ((!string.IsNullOrEmpty(locationGroupId)) && (locationGroupId != "ALL"))
                    {
                        sbSQL.Append("AND LOC_GROUP_ID LIKE '%" + locationGroupId + "%' ");
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "LOC_GROUP_ID", "LOC_DESCR" };
                    var lstActiveLocGroups = objContext.Database.DifferedExecuteQuery<MT_ATPAR_LOC_GROUPS>(fields, sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstActiveLocGroups.Count); }

                    return lstActiveLocGroups;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }
        }

        /// <summary>
        /// Gets the Location Groups Assigned to User
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public List<MT_ATPAR_LOC_GROUP_ALLOCATION> GetLocationGroupsAssignedToUser(string orgGroupID, string userId, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT ORG_GROUP_ID,LOC_GROUP_ID,USER_ID FROM MT_ATPAR_LOC_GROUP_ALLOCATION  WHERE ");
                    sbSQL.Append("USER_ID = '" + userId + "' AND APP_ID = '" + appId + "'  ");

                    if ((!string.IsNullOrEmpty(orgGroupID)) && (orgGroupID != "All"))
                    {
                        sbSQL.Append("AND ORG_GROUP_ID = '" + orgGroupID + "' ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "LOC_GROUP_ID", "USER_ID" };
                    var lstActiveLocGroups = objContext.Database.DifferedExecuteQuery<MT_ATPAR_LOC_GROUP_ALLOCATION>(fields, sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstActiveLocGroups.Count); }

                    return lstActiveLocGroups;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }
        }

        /// <summary>
        /// Gets the Location Group Users Data
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="locationGroupId"></param>
        /// <returns></returns>
        public List<MT_ATPAR_LOC_GROUP_ALLOCATION> GetLocGroupUsers(string orgGroupID, string locationGroupId,short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT A.USER_ID, CASE WHEN (MIDDLE_INITIAL IS NULL OR MIDDLE_INITIAL=' ' )  THEN (FIRST_NAME+' '+LAST_NAME+ ' (' + A.USER_ID + ')' ) ELSE(FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + ' (' + A.USER_ID + ')')  END AS USERNAME ");
                    sbSql.Append("FROM MT_ATPAR_LOC_GROUP_ALLOCATION A, MT_ATPAR_USER B WHERE A.USER_ID = B.USER_ID AND ");
                    sbSql.Append("LOC_GROUP_ID = '" + locationGroupId + "' AND APP_ID = " + appId + "");

                    if ((!string.IsNullOrEmpty(orgGroupID)) && (orgGroupID != "All"))
                    {
                        sbSql.Append("AND ORG_GROUP_ID = '" + orgGroupID + "' ");
                    }
                   
                        sbSql.Append(" ");
                    
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "USER_ID", "USERNAME" };

                    var lstUsers = objContext.Database.DifferedExecuteQuery<MT_ATPAR_LOC_GROUP_ALLOCATION>(fields, sbSql.ToString()).ToList();


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
        #endregion

        #region Private Methods

        /// <summary>
        /// Deletes the location groups before inserting the location groups
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="assignedUserId"></param>
        /// <param name="appId"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteLocationGroupAllocation(string orgGroupID, string assignedUserId, short appId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_ATPAR_LOC_GROUP_ALLOCATION WHERE  ORG_GROUP_ID  = '" + orgGroupID + "'  ");
                sbSql.Append("AND USER_ID = '" + assignedUserId + "' AND APP_ID = '" + appId + "' ");



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
        /// Inserts the allocated location groups
        /// </summary>
        /// <param name="lstLocationGroups"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="assignedUserId"></param>
        /// <param name="userID"></param>
        /// <param name="clientIP"></param>
        /// <param name="appId"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertLocationGroupAllocation(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string orgGroupID,
                                                   string assignedUserId, string userID, string clientIP, short appId,
                                                   ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                lstLocationGroups.RemoveAll(x => x.CHK_VALUE == 0);
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstLocationGroups)
                {
                    sbSql.Clear();

                    sbSql.Append(" INSERT INTO MT_ATPAR_LOC_GROUP_ALLOCATION(APP_ID,ORG_GROUP_ID,LOC_GROUP_ID,USER_ID,");
                    sbSql.Append(" LAST_UPDATE_DATE,LAST_UPDATE_USER,LAST_CLIENT_ADDRESS) ");
                    sbSql.Append(" VALUES('" + appId + "','" + orgGroupID + "','" + item.LOC_GROUP_ID + "',");
                    sbSql.Append(" '" + assignedUserId + "','" + DateTime.Now + "','" + userID + "','" + clientIP + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

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
