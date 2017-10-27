using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace AtPar.Init.Repos
{

    public class SetupLocationGroupsRepository : ISetupLocationGroupsRepository
    {
        private ILog _log;
        public SetupLocationGroupsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(SetupLocationGroupsRepository));
        }

        #region InsertLocationGroups
        /// <summary>
        /// Getting Location Groups Count
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="groupID"></param>
        /// <returns></returns>
        public int GetLocGroupsCount(string orgID, string groupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT COUNT(LOC_GROUP_ID) FROM MT_ATPAR_LOC_GROUPS WHERE LOC_GROUP_ID='").Append(groupID).Append("'").Append(" AND ORG_GROUP_ID='").Append(orgID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var locGroupIdCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of parameter values returned : " + locGroupIdCount.ToString()); }

                    return locGroupIdCount;
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
        /// Inserting Location Groups
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="groupID"></param>
        /// <param name="groupDescr"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public long InsertLocGroups(string orgID, string groupID, string groupDescr, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_ATPAR_LOC_GROUPS(ORG_GROUP_ID,LOC_GROUP_ID,LOC_DESCR,STATUS,LAST_UPDATE_DATE,LAST_UPDATE_USER,LAST_CLIENT_ADDRESS) ").Append("VALUES('").Append(orgID).Append("','").Append(groupID).Append("','").Append(groupDescr != null ? groupDescr.Replace("'", "''") : groupDescr).Append("',1,'").Append(DateTime.Now).Append("','").Append(userID).Append("','").Append(orgID).Append("')");

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

        #region UpdateLocationGroups
        /// <summary>
        /// Getting Location Group Allocation Count
        /// </summary>
        /// <param name="locGrpID"></param>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        public long GetLocGroupAllocationCount(string locGrpID, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int locGroupAllocationCount = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(*) FROM MT_ATPAR_LOC_GROUP_ALLOCATION WHERE LOC_GROUP_ID='").Append(locGrpID).Append("'   AND ORG_GROUP_ID='").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }
                    locGroupAllocationCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profile count  returned : " + locGroupAllocationCount); }

                    return locGroupAllocationCount;
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
        /// Updating Location Groups
        /// </summary>
        /// <param name="status"></param>
        /// <param name="locGrpID"></param>
        /// <param name="orgGrpID"></param>
        /// <returns></returns>
        public long UpdateLocGroups(int status, string locGrpID, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" UPDATE MT_ATPAR_LOC_GROUPS SET STATUS= '").Append(status).Append("' WHERE LOC_GROUP_ID='").Append(locGrpID).Append("'").Append(" AND ORG_GROUP_ID='").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.of rows updated " + count); }
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
        #endregion

        #region GetLocationGroups
        /// <summary>
        /// Getting Location Groups
        /// </summary>
        /// <param name="locGrpID"></param>
        /// <param name="locGrpDescr"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        public List<MT_ATPAR_LOC_GROUPS> GetLocationGroups(string locGrpID, string locGrpDescr, string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT LOC_GROUP_ID,ORG_GROUP_ID,LOC_DESCR,STATUS FROM MT_ATPAR_LOC_GROUPS   ");

                    if (!string.IsNullOrEmpty(orgID))
                    {
                        if (orgID != "All")
                        {
                            sbSql.Append(" WHERE  ORG_GROUP_ID = '").Append(orgID).Append("'");
                        }
                    }

                    if (!string.IsNullOrEmpty(locGrpID))
                    {
                        if (orgID != "All")
                        {
                            sbSql.Append(" AND LOC_GROUP_ID LIKE '").Append(locGrpID).Append("%'");
                        }
                        else
                        {
                            sbSql.Append(" WHERE LOC_GROUP_ID LIKE '").Append(locGrpID).Append("%'");
                        }
                    }

                    if (!string.IsNullOrEmpty(locGrpDescr))
                    {
                        if (orgID != "All")
                        {
                            sbSql.Append(" AND LOC_DESCR LIKE '").Append(locGrpDescr.Replace("'", "''")).Append("%'");
                        }
                        else if (orgID == "All" && locGrpID == string.Empty)
                        {
                            sbSql.Append(" WHERE LOC_DESCR LIKE '").Append(locGrpDescr.Replace("'", "''")).Append("%'");
                        }
                        //changes made for searching 
                        else if (orgID == "All" && locGrpID != string.Empty)
                        {
                            sbSql.Append(" AND LOC_DESCR LIKE '").Append(locGrpDescr.Replace("'", "''")).Append("%'");
                        }
                    }
                    sbSql.Append("ORDER BY  LOC_GROUP_ID  ASC");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "LOC_GROUP_ID", "ORG_GROUP_ID", "LOC_DESCR", "STATUS" };

                    var lstLocGroups = objContext.Database.DifferedExecuteQuery<MT_ATPAR_LOC_GROUPS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of parameter values returned : " + lstLocGroups.Count); }

                    return lstLocGroups;
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

        #region InsertLocationDetails
        /// <summary>
        /// Inserting Location Details
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="locGroupID"></param>
        /// <param name="clientIP"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="userID"></param>
        /// <param name="lstLocGroups"></param>
        /// <returns></returns>
        public long InsertLocationDetails(string orgID, string locGroupID, string clientIP, string orgGroupID, string userID, List<VM_MT_ATPAR_SETUP_LOCATIONGROUPS> lstLocGroups)
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
                        List<VM_MT_ATPAR_SETUP_LOCATIONGROUPS> lstLocGroupsDelete = null;

                        if (lstLocGroups != null && lstLocGroups.Count > 0)
                        {
                            var delete = Convert.ToInt32(AtParWebEnums.Perform_Action.DELETE);
                            lstLocGroupsDelete = lstLocGroups.Where(x => x.PERFORM_ACTION == delete.ToString()).ToList();
                        }

                        foreach (var item in lstLocGroupsDelete)
                        {
                            statusCode = DeleteLocGroupMembers(item.SETCNTRLVALUE, locGroupID, item.LOCATION, orgGroupID, objContext);

                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
                            }
                        }

                        List<VM_MT_ATPAR_SETUP_LOCATIONGROUPS> lstLocGroupsAdd = null;

                        if (lstLocGroups != null && lstLocGroups.Count > 0)
                        {
                            var add = Convert.ToInt32(AtParWebEnums.Perform_Action.ADD);
                            lstLocGroupsAdd = lstLocGroups.Where(x => x.PERFORM_ACTION == add.ToString()).ToList();
                        }

                        foreach (var item in lstLocGroupsAdd)
                        {
                            statusCode = InsertLocGroupMembers(item.SETCNTRLVALUE, locGroupID, item.LOCATION, item.TYPE, item.DESCR, clientIP, orgGroupID, userID, objContext);

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

        /// <summary>
        /// Deleting Location Group Members
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="locGroupID"></param>
        /// <param name="locID"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteLocGroupMembers(string orgID, string locGroupID, string locID, string orgGroupID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" DELETE FROM MT_ATPAR_LOC_GROUP_MEMBERS WHERE LOC_GROUP_ID = '").Append(locGroupID).Append("'");

                if (!string.IsNullOrEmpty(orgID))
                {
                    sbSql.Append(" AND ORG_ID = '").Append(orgID).Append("'");
                }

                if (!string.IsNullOrEmpty(locID))
                {
                    sbSql.Append(" AND LOCATION_ID = '").Append(locID).Append("'");
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

        /// <summary>
        /// Inserting Location Group Members
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="locGroupID"></param>
        /// <param name="locID"></param>
        /// <param name="type"></param>
        /// <param name="descr"></param>
        /// <param name="clientIP"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="userID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertLocGroupMembers(string orgID, string locGroupID, string locID, string type, string descr, string clientIP, string orgGroupID, string userID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_ATPAR_LOC_GROUP_MEMBERS( ORG_GROUP_ID,LOC_GROUP_ID,ORG_ID,LOCATION_ID,TYPE,LOC_DESCR,LAST_UPDATE_DATE,LAST_UPDATE_USER,LAST_CLIENT_ADDRESS) VALUES(").Append("'").Append(orgGroupID).Append("','").Append(locGroupID).Append("','").Append(orgID).Append("','").Append(locID).Append("','").Append(type).Append("','").Append(descr.ReplaceString()).Append("','").Append(DateTime.Now).Append("','").Append(userID).Append("','").Append(clientIP).Append("')");

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

        #region GetExcludedLocations
        /// <summary>
        /// Getting Excluded Locations
        /// </summary>
        /// <returns></returns>
        public List<MT_DELV_EXCLUDE_LOC> GetExcludedLocations()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT SETID,LOCATION FROM MT_DELV_EXCLUDE_LOC ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "SETID", "LOCATION" };

                    var lstDelvExcludeLoc = objContext.Database.DifferedExecuteQuery<MT_DELV_EXCLUDE_LOC>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of parameter values returned : " + lstDelvExcludeLoc.Count); }

                    return lstDelvExcludeLoc;
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

        #region GetLocationDetails
        public int GetBUnitCount(string orgGroupID, string bUnit)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT COUNT(BUSINESS_UNIT) FROM MT_ATPAR_ORG_GROUP_BUNITS  ");

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
                            sbSql.Append(" WHERE BUSINESS_UNIT = '").Append(bUnit).Append("'");
                        }
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of BUnits returned : " + count); }

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

        public List<MT_ATPAR_LOC_GROUP_MEMBERS> GetLocGroupMembers(string locGroupID, string orgGroupID, string bUnit, string locID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ORG_GROUP_ID,LOC_GROUP_ID,ORG_ID,LOCATION_ID,LOC_DESCR,LAST_CLIENT_ADDRESS,TYPE FROM MT_ATPAR_LOC_GROUP_MEMBERS ");

                    if (!string.IsNullOrEmpty(locGroupID))
                    {
                        sbSql.Append(" WHERE LOC_GROUP_ID = '").Append(locGroupID).Append("'");
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
                    if (!string.IsNullOrEmpty(locID))
                    {
                        sbSql.Append(" AND LOCATION_ID LIKE '").Append(locID).Append("%'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "LOC_GROUP_ID", "ORG_ID", "LOCATION_ID", "LOC_DESCR", "LAST_CLIENT_ADDRESS", "TYPE" };

                    var lstLocGrpMembers = objContext.Database.DifferedExecuteQuery<MT_ATPAR_LOC_GROUP_MEMBERS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Loc Group Members returned : " + lstLocGrpMembers.Count); }

                    return lstLocGrpMembers;
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
    }
}
