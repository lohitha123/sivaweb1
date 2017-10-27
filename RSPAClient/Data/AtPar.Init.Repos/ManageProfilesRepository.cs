using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using AtParEncryptionServices;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace AtPar.Init.Repos
{
    public class ManageProfilesRepository : IManageProfilesRepository
    {
        private ILog _log;
        public ManageProfilesRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageProfilesRepository));
        }

        #region GetProfileInfo
        /// <summary>
        /// Getting Profiles
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        public List<MT_ATPAR_APP> GetProfiles(string profileId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_APP> lstProfileApp = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.APP_ID, A.APP_NAME, B.CLIENT_USER, B.SERVER_USER FROM MT_ATPAR_APP A LEFT OUTER JOIN MT_ATPAR_PROFILE_APP_ACL B ON A.APP_ID = B.APP_ID AND B.PROFILE_ID = '").Append(profileId).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "APP_ID", "APP_NAME", "CLIENT_USER", "SERVER_USER" };

                    lstProfileApp = objContext.Database.DifferedExecuteQuery<MT_ATPAR_APP>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + lstProfileApp.Count()); }

                    return lstProfileApp;
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
        /// Getting Profile App Menus
        /// </summary>
        /// <param name="profileId"></param>
        /// <param name="enterpriseSystem"></param>
        /// <returns></returns>
        public List<VM_MT_ATPAR_PROFILE_APP_MENUS> GetProfileAppMenus(string profileId, string enterpriseSystem)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramProfileId = new SqlParameter("@profileId", profileId);
                    SqlParameter paramEnterpriseSystem = new SqlParameter("@enterpriseSystem", enterpriseSystem);

                    object[] parameters = { paramProfileId, paramEnterpriseSystem };

                    sbSql = "EXEC sp_GetProfileAppMenus @profileId,@enterpriseSystem";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var lstAppMenus = objContext.Database.SqlQuery<VM_MT_ATPAR_PROFILE_APP_MENUS>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of profile app menus Returned: " + lstAppMenus.Count()); }

                    return lstAppMenus;
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
        /// Getting Profile App Parameters
        /// </summary>
        /// <param name="profileId"></param>
        /// <param name="enterpriseSystem"></param>
        /// <returns></returns>
        public List<VM_MT_ATPAR_PROFILE_APP_PARAMETERS> GetProfileAppParameters(string profileId, string enterpriseSystem)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramProfileId = new SqlParameter("@profileId", profileId);
                    SqlParameter paramEnterpriseSystem = new SqlParameter("@enterpriseSystem", enterpriseSystem);

                    object[] parameters = { paramProfileId, paramEnterpriseSystem };

                    sbSql = "EXEC sp_GetProfileAppParameters @profileId,@enterpriseSystem";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var lstAppParameters = objContext.Database.SqlQuery<VM_MT_ATPAR_PROFILE_APP_PARAMETERS>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of app parameters Returned: " + lstAppParameters.Count()); }

                    return lstAppParameters;
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
        /// Getting Profile Screen Display
        /// </summary>
        /// <param name="profileId"></param>
        /// <param name="enterpriseSystem"></param>
        /// <returns></returns>
        public List<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY> GetProfileScreenDisplay(string profileId, string enterpriseSystem)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramProfileId = new SqlParameter("@profileId", profileId);
                    SqlParameter paramEnterpriseSystem = new SqlParameter("@enterpriseSystem", enterpriseSystem);

                    object[] parameters = { paramProfileId, paramEnterpriseSystem };

                    sbSql = "EXEC sp_GetProfileScreenDisplay @profileId,@enterpriseSystem";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                    }

                    var lstProfileScreenDisplay = objContext.Database.SqlQuery<VM_MT_ATPAR_PROFILE_SCREEN_DISPLAY>(sbSql, parameters).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of app parameters Returned: " + lstProfileScreenDisplay.Count()); }

                    return lstProfileScreenDisplay;
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

        public bool GetProfileType(string profileID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int serverProfileCount = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(PROFILE_ID) FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='").Append(profileID).Append("' AND SERVER_USER='Y'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    serverProfileCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profile parameter id count  returned : " + serverProfileCount); }

                    if (serverProfileCount > 0)
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
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        public List<VM_MT_ATPAR_USER_ADD> GetUsersList(string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            List<VM_MT_ATPAR_USER_ADD> usrList = new List<VM_MT_ATPAR_USER_ADD>();
            // string Schema = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    _sbSQL.Append("SELECT A.USER_ID, A.FIRST_NAME, A.LAST_NAME, C.ORG_GROUP_ID  FROM MT_ATPAR_USER A JOIN MT_ATPAR_USER_ACL B ON A.USER_ID = B.USER_ID ");
                    _sbSQL.Append(" JOIN MT_ATPAR_USER_ORG_GROUPS C ON A.USER_ID= C.USER_ID WHERE A.PROFILE_ID ='" + profileID + "'");
                    _sbSQL.Append(" AND B.ACCOUNT_DISABLED = 0 ");


                    var fields = new[] { "USER_ID", "FIRST_NAME", "LAST_NAME", "ORG_GROUP_ID" };


                    usrList = objContext.Database.DifferedExecuteQuery<VM_MT_ATPAR_USER_ADD>(fields, _sbSQL.ToString()).ToList();
                    return usrList;
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
        #endregion

        #region SP_GetCounts
        /// <summary>
        /// Getting Client User Count
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        public int GetClientUserCount(string profileId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(CLIENT_USER)AS COUNTS FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='").Append(profileId).Append("' AND CLIENT_USER='Y'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + count); }

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

        /// <summary>
        /// Getting Server User Count
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        public int GetServerUserCount(string profileId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(SERVER_USER)AS COUNTS FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='").Append(profileId).Append("' AND SERVER_USER='Y'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + count); }

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

        /// <summary>
        /// Getting Profile ID Count
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        public int GetProfileIdCount(string profileId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(PROFILE_ID)AS COUNTS FROM MT_ATPAR_USER WHERE PROFILE_ID='").Append(profileId).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + count); }

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

        #region SaveProfileInfo

        private long UpdateUserAndUserAcl(string profileID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;

            try
            {
                List<string> lstUserId = null;
                int userExist = 0;

                try
                {
                    lstUserId = GetuserIdList(profileID, objContext);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                }

                foreach (var item in lstUserId)
                {
                    string strEncHash = CSHA256.ComputeHash(AtParDefns.DEFAULT_EMPTY_PASSWORD + item);

                    try
                    {
                        userExist = GetUserIdCount(item, strEncHash, objContext);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                    }

                    if (userExist > 0)
                    {
                        string strHash = CSHA256.ComputeHash("atpar" + item);

                        statusCode = UpdateUserpassHash(strHash, item, objContext);

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            return statusCode;
                        }


                        statusCode = UpdateAtparUserACL(item, objContext);

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            return statusCode;
                        }
                    }
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        /// <summary>
        /// Adding Profile Info
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="profileDescr"></param>
        /// <param name="dictProfile"></param>
        /// <param name="userID"></param>
        /// <param name="clientAddr"></param>
        /// <param name="enterpriseSystem"></param>
        /// <param name="alterProfileCtoS"></param>
        /// <returns></returns>
        public long AddProfileInfo(string profileID, string profileDescr, Dictionary<string, dynamic> dictProfile, string userID, string clientAddr, string enterpriseSystem, bool alterProfileCtoS)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int ProfileCount = 0;
            long statusCode = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (alterProfileCtoS == true)
                        {
                            statusCode = UpdateUserAndUserAcl(profileID, objContext);
                        }

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }

                        try
                        {
                            ProfileCount = GetProfileCount(profileID, objContext);
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                        }

                        if (ProfileCount > 0)
                        {
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_PROFILEEXIST;
                        }
                        else
                        {
                            statusCode = InsertProfile(profileID, profileDescr, objContext);

                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
                            }

                            foreach (var keyValuePair in dictProfile)
                            {
                                switch (keyValuePair.Key)
                                {
                                    case "PROFILE":
                                        foreach (var item in keyValuePair.Value)
                                        {
                                            var itemPocoProfile = new MT_ATPAR_PROFILE_APP_ACL
                                            {
                                                APP_ID = item.APP_ID,
                                                CLIENT_USER = item.CLIENT_USER,
                                                LAST_CLIENT_ADDRESS = item.LAST_CLIENT_ADDRESS,
                                                LAST_UPDATE_DATE = item.LAST_UPDATE_DATE,
                                                LAST_UPDATE_USER = item.LAST_UPDATE_USER,
                                                PROFILE_ID = item.PROFILE_ID,
                                                SERVER_USER = item.SERVER_USER
                                            };

                                            statusCode = InsertProfileACL(userID, profileID, clientAddr, itemPocoProfile, objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                        break;

                                    case "MENUS":

                                        foreach (var item in keyValuePair.Value)
                                        {
                                            var itemPocoMenus = new MT_ATPAR_PROFILE_MENU
                                            {
                                                APP_ID = item.APP_ID,
                                                LAST_CLIENT_ADDRESS = item.LAST_CLIENT_ADDRESS,
                                                PROFILE_ID = item.PROFILE_ID,
                                                LAST_UPDATE_USER = item.LAST_UPDATE_USER,
                                                LAST_UPDATE_DATE = item.LAST_UPDATE_DATE,
                                                MENU_CODE = item.MENU_CODE,
                                                MENU_SEQ_NO = item.MENU_SEQ_NO
                                                //CHKSTATUS = item.CHKSTATUS == "Y" ? true : false
                                            };
                                            if (item.CHK_STATUS.ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                                            {
                                                statusCode = InsertprofileMenu(profileID, userID, clientAddr, itemPocoMenus, objContext);

                                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                                {
                                                    trans.Rollback();
                                                    return statusCode;
                                                }
                                            }
                                         

                                        }
                                        break;

                                    case "PARAMS":

                                        foreach (var item in keyValuePair.Value)
                                        {
                                            var itemPocoParams = new MT_ATPAR_PROFILE_PARAMETERS
                                            {
                                                APP_ID = item.APP_ID,
                                                LAST_CLIENT_ADDRESS = item.LAST_CLIENT_ADDRESS,
                                                LAST_UPDATE_DATE = item.LAST_UPDATE_DATE,
                                                LAST_UPDATE_USER = item.LAST_UPDATE_USER,
                                                PARAMETER_ID = item.PARAMETER_ID,
                                                PARAMETER_VALUE = item.PARAMETER_VALUE,
                                                PROFILE_ID = item.PROFILE_ID
                                            };

                                            statusCode = InsertprofileParameters(profileID, userID, clientAddr, itemPocoParams, objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                        break;

                                    case "SCREENDISPLAY":

                                        foreach (var item in keyValuePair.Value)
                                        {
                                            var itemPocoScreenDisplay = new MT_ATPAR_PROFILE_LIST_VIEW
                                            {
                                                PROFILE_ID = item.PROFILE_ID,
                                                APP_ID = item.APP_ID,
                                                SCREEN_NAME = item.SCREEN_NAME,
                                                FIELD_NAME = item.FIELD_NAME,
                                                VALUE = item.VALUE,
                                                COLUMN_HEADER = item.COLUMN_HEADER,
                                                COLUMN_ORDER = item.COLUMN_ORDER,
                                                COLUMN_WIDTH = item.COLUMN_WIDTH,
                                                DISPLAY_FIELD = item.DISPLAY_FIELD,
                                                TOGGLE_FIELD = item.TOGGLE_FIELD,
                                                DEFAULT_TOGGLE_TEXT = item.DEFAULT_TOGGLE_TEXT,
                                                TOGGLE_ORDER = item.TOGGLE_ORDER,
                                                LAST_UPDATE_DATE = item.LAST_UPDATE_DATE,
                                                LAST_UPDATE_USER = item.LAST_UPDATE_USER,
                                                LAST_CLIENT_ADDRESS = item.LAST_CLIENT_ADDRESS
                                            };

                                            string strToggletext = item.DEFAULT_TOGGLE_TEXT;
                                            string strToggleorder = item.TOGGLE_ORDER;
                                            string strTogglefld = string.Empty;

                                            if (strToggletext != string.Empty && strToggleorder != string.Empty)
                                            {
                                                if (item.TOGGLE_FIELD.ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                                                {
                                                    strTogglefld = AtParWebEnums.YesNo_Enum.Y.ToString();
                                                }
                                                else
                                                {
                                                    strTogglefld = AtParWebEnums.YesNo_Enum.N.ToString();
                                                }
                                            }
                                            else
                                            {
                                                strTogglefld = item.TOGGLE_FIELD;
                                            }

                                            statusCode = InsertprofileListView(profileID, userID, clientAddr, strTogglefld, itemPocoScreenDisplay, objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                        break;
                                }
                            }
                            trans.Commit();
                        }
                    }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        /// <summary>
        /// Updating Profile Info
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="profileDescr"></param>
        /// <param name="dictProfile"></param>
        /// <param name="appID"></param>
        /// <param name="userID"></param>
        /// <param name="clientAddr"></param>
        /// <param name="enterpriseSystem"></param>
        /// <param name="alterProfileCtoS"></param>
        /// <returns></returns>
        public long UpdateProfileInfo(string profileID, string profileDescr, Dictionary<string, dynamic> dictProfile, int appID, string userID, string clientAddr, string enterpriseSystem, bool alterProfileCtoS)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int recordsCount = 0;
            long statusCode = 0;
            string strTogglefld = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (alterProfileCtoS == true)
                        {
                            statusCode = UpdateUserAndUserAcl(profileID, objContext);
                        }

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }

                        statusCode = UpdateProfile(profileDescr, profileID, objContext);

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }

                        foreach (var keyValuePair in dictProfile)
                        {
                            switch (keyValuePair.Key)
                            {
                                case "PROFILE":

                                    foreach (var item in keyValuePair.Value)
                                    {
                                        var itemPocoProfile = new MT_ATPAR_PROFILE_APP_ACL
                                        {
                                            APP_ID = item.APP_ID,
                                            CLIENT_USER = item.CLIENT_USER,
                                            LAST_CLIENT_ADDRESS = item.LAST_CLIENT_ADDRESS,
                                            LAST_UPDATE_DATE = item.LAST_UPDATE_DATE,
                                            LAST_UPDATE_USER = item.LAST_UPDATE_USER,
                                            PROFILE_ID = item.PROFILE_ID,
                                            SERVER_USER = item.SERVER_USER
                                        };

                                        if (item.CLIENT_USER.ToString() == AtParWebEnums.YesNo_Enum.N.ToString() && item.SERVER_USER.ToString() == AtParWebEnums.YesNo_Enum.N.ToString())
                                        {
                                            statusCode = DeleteprofileAppAcl(profileID, itemPocoProfile, objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }

                                            statusCode = DeleteprofileParameters(profileID, itemPocoProfile, objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }

                                            statusCode = UpdateprofileParams(userID, profileID, itemPocoProfile, objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                        else
                                        {
                                            try
                                            {
                                                recordsCount = GetprofileAppAclCount(profileID, Convert.ToInt32(item.APP_ID), objContext);
                                            }
                                            catch (Exception ex)
                                            {
                                                trans.Rollback();
                                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                                                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                            }

                                            if (recordsCount > 0)
                                            {
                                                statusCode = UpdateprofileAppAcl(userID, profileID, clientAddr, itemPocoProfile, objContext);

                                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                                {
                                                    trans.Rollback();
                                                    return statusCode;
                                                }
                                            }
                                            else
                                            {

                                                statusCode = InsertProfileACL(userID, profileID, clientAddr, itemPocoProfile, objContext);

                                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                                {
                                                    trans.Rollback();
                                                    return statusCode;
                                                }

                                            }
                                        }
                                        if (item.CLIENT_USER.ToString() == AtParWebEnums.YesNo_Enum.N.ToString())
                                        {

                                            statusCode = DeleteprofileListView(profileID, itemPocoProfile, objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                    }
                                    break;

                                case "MENUS":

                                    foreach (var item in keyValuePair.Value)
                                    {
                                        var itemPocoMenus = new MT_ATPAR_PROFILE_MENU
                                        {
                                            APP_ID = item.APP_ID,
                                            LAST_CLIENT_ADDRESS = item.LAST_CLIENT_ADDRESS,
                                            PROFILE_ID = item.PROFILE_ID,
                                            LAST_UPDATE_USER = item.LAST_UPDATE_USER,
                                            LAST_UPDATE_DATE = item.LAST_UPDATE_DATE,
                                            MENU_CODE = item.MENU_CODE,
                                            MENU_SEQ_NO = item.MENU_SEQ_NO
                                        };

                                        if (item.CHK_STATUS.ToString() == AtParWebEnums.YesNo_Enum.N.ToString())
                                        {
                                            statusCode = DeleteprofileMenu(profileID, Convert.ToInt32(itemPocoMenus.APP_ID), itemPocoMenus.MENU_CODE.ToString(), objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                        else
                                        {
                                            try
                                            {
                                                recordsCount = GetprofileMenuappIdCount(profileID, Convert.ToInt32(itemPocoMenus.APP_ID), itemPocoMenus.MENU_CODE.ToString(), objContext);
                                            }
                                            catch (Exception ex)
                                            {
                                                trans.Rollback();
                                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                                                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                            }

                                            if (recordsCount > 0)
                                            {
                                                statusCode = UpdateprofileMenu(userID, profileID, clientAddr, itemPocoMenus, objContext);
                                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                                {
                                                    trans.Rollback();
                                                    return statusCode;
                                                }
                                            }
                                            else
                                            {
                                                statusCode = InsertprofileMenu(profileID, userID, clientAddr, itemPocoMenus, objContext);

                                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                                {
                                                    trans.Rollback();
                                                    return statusCode;
                                                }
                                            }
                                        }
                                    }
                                    break;

                                case "PARAMS":

                                    foreach (var item in keyValuePair.Value)
                                    {
                                        var itemPocoParams = new MT_ATPAR_PROFILE_PARAMETERS
                                        {
                                            APP_ID = item.APP_ID,
                                            LAST_CLIENT_ADDRESS = item.LAST_CLIENT_ADDRESS,
                                            LAST_UPDATE_DATE = item.LAST_UPDATE_DATE,
                                            LAST_UPDATE_USER = item.LAST_UPDATE_USER,
                                            PARAMETER_ID = item.PARAMETER_ID,
                                            PARAMETER_VALUE = item.PARAMETER_VALUE,
                                            PROFILE_ID = item.PROFILE_ID
                                        };

                                        try
                                        {
                                            recordsCount = GetprofileParametersIdCount(profileID, Convert.ToInt16(itemPocoParams.APP_ID), item.PARAMETER_ID.ToString(), objContext);
                                        }
                                        catch (Exception ex)
                                        {
                                            trans.Rollback();
                                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                                            return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                        }

                                        if (recordsCount > 0)
                                        {
                                            statusCode = UpdateprofileParameters(userID, profileID, clientAddr, itemPocoParams, objContext);
                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                        else
                                        {
                                            statusCode = InsertprofileParameters(profileID, userID, clientAddr, itemPocoParams, objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                    }
                                    break;

                                case "SCREENDISPLAY":

                                    foreach (var item in keyValuePair.Value)
                                    {
                                        var itemPocoScreenDisplay = new MT_ATPAR_PROFILE_LIST_VIEW
                                        {
                                            PROFILE_ID = item.PROFILE_ID,
                                            APP_ID = item.APP_ID,
                                            SCREEN_NAME = item.SCREEN_NAME,
                                            FIELD_NAME = item.FIELD_NAME,
                                            VALUE = item.VALUE,
                                            COLUMN_HEADER = item.COLUMN_HEADER,
                                            COLUMN_ORDER = item.COLUMN_ORDER,
                                            COLUMN_WIDTH = item.COLUMN_WIDTH,
                                            DISPLAY_FIELD = item.DISPLAY_FIELD,
                                            TOGGLE_FIELD = item.TOGGLE_FIELD,
                                            DEFAULT_TOGGLE_TEXT = item.DEFAULT_TOGGLE_TEXT,
                                            TOGGLE_ORDER = item.TOGGLE_ORDER,
                                            LAST_UPDATE_DATE = item.LAST_UPDATE_DATE,
                                            LAST_UPDATE_USER = item.LAST_UPDATE_USER,
                                            LAST_CLIENT_ADDRESS = item.LAST_CLIENT_ADDRESS
                                        };

                                        try
                                        {
                                            recordsCount = GetScreenNameCount(profileID, itemPocoScreenDisplay.FIELD_NAME.ToString(), Convert.ToInt32(item.APP_ID), item.SCREEN_NAME.ToString(), objContext);
                                        }
                                        catch (Exception ex)
                                        {
                                            trans.Rollback();
                                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                                            return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                        }
                                        string strToggletext = string.Empty;
                                        string strToggleorder = string.Empty;

                                        strToggletext = itemPocoScreenDisplay.DEFAULT_TOGGLE_TEXT;
                                        strToggleorder = itemPocoScreenDisplay.TOGGLE_ORDER;

                                        if (strToggletext != string.Empty && strToggleorder != string.Empty)
                                        {
                                            if (itemPocoScreenDisplay.DISPLAY_FIELD.ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                                            {
                                                strTogglefld = AtParWebEnums.YesNo_Enum.Y.ToString();
                                            }
                                            else
                                            {
                                                strTogglefld = AtParWebEnums.YesNo_Enum.N.ToString();
                                            }
                                        }
                                        else
                                        {
                                            if (itemPocoScreenDisplay.TOGGLE_FIELD == AtParWebEnums.YesNo_Enum.Y.ToString())
                                            {
                                                try
                                                {
                                                    strTogglefld = GetListViewToggle(item.FIELD_NAME.ToString(), Convert.ToInt16(itemPocoScreenDisplay.APP_ID), item.SCREEN_NAME.ToString(), enterpriseSystem, objContext);
                                                }
                                                catch (Exception ex)
                                                {
                                                    trans.Rollback();
                                                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                                                    return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                                                }
                                            }
                                            else
                                            {
                                                strTogglefld = itemPocoScreenDisplay.TOGGLE_FIELD.ToString();
                                            }
                                        }

                                        if (recordsCount > 0)
                                        {
                                            statusCode = UpdateprofileListView(profileID, userID, clientAddr, strTogglefld, itemPocoScreenDisplay, objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                        else
                                        {
                                            statusCode = InsertprofileListView(profileID, userID, clientAddr, strTogglefld, itemPocoScreenDisplay, objContext);

                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                    }
                                    break;
                            }
                        }

                        statusCode = UpdateUserAppParams(profileID, userID, clientAddr, enterpriseSystem, objContext);
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
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        /// <summary>
        /// Updating User App Parameters
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="userID"></param>
        /// <param name="clientAddress"></param>
        /// <param name="enterpriseSystem"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long UpdateUserAppParams(string profileID, string userID, string clientAddress, string enterpriseSystem, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                SqlParameter paramProfileId = new SqlParameter("@profileId", profileID);
                SqlParameter paramUserId = new SqlParameter("@updateUser", userID);
                SqlParameter paramClientAddress = new SqlParameter("@clientAddress", clientAddress);
                SqlParameter paramEnterpriseSystem = new SqlParameter("@enterpriseSystem", enterpriseSystem);

                object[] parameters = { paramProfileId, paramUserId, paramClientAddress, paramEnterpriseSystem };

                sbSql = "exec SP_UpdateUserAppParams @profileId,@updateUser,@clientAddress,@enterpriseSystem";

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql, parameters);

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of records updated: " + count); }

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
        /// Getting User IDs
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private List<string> GetuserIdList(string profileID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<string> lstUserIds = null;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT USER_ID FROM MT_ATPAR_USER WHERE PROFILE_ID='").Append(profileID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                lstUserIds = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of userId's  returned : " + lstUserIds.Count()); }

                return lstUserIds;
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
        /// Getting User ID Count
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="passHash"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int GetUserIdCount(string userID, string passHash, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT COUNT(USER_ID) FROM MT_ATPAR_USER WHERE PASSHASH='").Append(passHash).Append("' AND USER_ID='").Append(userID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                var userCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of userId's  returned : " + userCount); }

                return userCount;
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
        /// Updating User PassHash
        /// </summary>
        /// <param name="passHash"></param>
        /// <param name="userID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long UpdateUserpassHash(string passHash, string userID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_USER SET PASSHASH='").Append(passHash).Append("' WHERE USER_ID='").Append(userID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Updating UserACL
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long UpdateAtparUserACL(string userID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_USER_ACL SET PASSHASH_REQUIRED = 1, PASSWD_RESET_REQUIRED='Y' WHERE USER_ID='").Append(userID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Getting Profile Count
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int GetProfileCount(string profileID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int ProfileCount = 0;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT COUNT(PROFILE_ID) FROM MT_ATPAR_PROFILE WHERE PROFILE_ID='").Append(profileID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                ProfileCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profile count  returned : " + ProfileCount); }

                return ProfileCount;

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
        /// Saving Profiles
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="profileDescr"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertProfile(string profileID, string profileDescr, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_ATPAR_PROFILE (PROFILE_ID, PROFILE_DESCRIPTION) VALUES ('").Append(profileID).Append("','").Append(profileDescr).Append("')");

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

        /// <summary>
        /// Saving Profile ACL
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="profileID"></param>
        /// <param name="clientAddr"></param>
        /// <param name="profileAppAcl"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertProfileACL(string userID, string profileID, string clientAddr, MT_ATPAR_PROFILE_APP_ACL profileAppAcl, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_ATPAR_PROFILE_APP_ACL(PROFILE_ID, APP_ID, CLIENT_USER, SERVER_USER, LAST_UPDATE_DATE,LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) VALUES('").Append(profileID).Append("','").Append(profileAppAcl.APP_ID).Append("','").Append(profileAppAcl.CLIENT_USER).Append("','").Append(profileAppAcl.SERVER_USER).Append("','").Append(DateTime.Now).Append("','").Append(userID).Append("','").Append(clientAddr).Append("')");

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

        /// <summary>
        /// Saving Profile Menu
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="userID"></param>
        /// <param name="clientAddr"></param>
        /// <param name="profileMenus"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertprofileMenu(string profileID, string userID, string clientAddr, MT_ATPAR_PROFILE_MENU profileMenus, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int count = 0;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_ATPAR_PROFILE_MENU(PROFILE_ID, APP_ID, MENU_CODE, MENU_SEQ_NO, LAST_UPDATE_DATE, LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) VALUES('").Append(profileID).Append("','").Append(profileMenus.APP_ID).Append("','").Append(profileMenus.MENU_CODE).Append("','").Append(profileMenus.MENU_SEQ_NO).Append("','").Append(DateTime.Now).Append("','").Append(userID).Append("','").Append(clientAddr).Append("')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

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

        /// <summary>
        /// Saving Profile Parameters
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="userID"></param>
        /// <param name="clientAddr"></param>
        /// <param name="profileParameter"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertprofileParameters(string profileID, string userID, string clientAddr, MT_ATPAR_PROFILE_PARAMETERS profileParameter, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_ATPAR_PROFILE_PARAMETERS(PROFILE_ID, APP_ID,PARAMETER_ID, PARAMETER_VALUE, LAST_UPDATE_DATE, LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) VALUES('").Append(profileID).Append("','").Append(profileParameter.APP_ID).Append("','").Append(profileParameter.PARAMETER_ID).Append("','").Append(profileParameter.PARAMETER_VALUE).Append("','").Append(DateTime.Now).Append("','").Append(userID).Append("','").Append(clientAddr).Append("')");

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

        /// <summary>
        /// Saving Profile List View 
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="userID"></param>
        /// <param name="clientAddr"></param>
        /// <param name="strTogglefld"></param>
        /// <param name="profileListView"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertprofileListView(string profileID, string userID, string clientAddr, string strTogglefld, MT_ATPAR_PROFILE_LIST_VIEW profileListView, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_ATPAR_PROFILE_LIST_VIEW(PROFILE_ID, APP_ID,SCREEN_NAME, FIELD_NAME, VALUE, COLUMN_HEADER, COLUMN_ORDER,COLUMN_WIDTH,DISPLAY_FIELD,TOGGLE_FIELD,DEFAULT_TOGGLE_TEXT,TOGGLE_ORDER,LAST_UPDATE_DATE,LAST_UPDATE_USER,LAST_CLIENT_ADDRESS) VALUES('").Append(profileID).Append("','").Append(profileListView.APP_ID).Append("','").Append(profileListView.SCREEN_NAME).Append("','").Append(profileListView.FIELD_NAME).Append("','").Append(profileListView.VALUE).Append("','").Append(profileListView.COLUMN_HEADER).Append("','").Append(profileListView.COLUMN_ORDER).Append("','").Append(profileListView.COLUMN_WIDTH).Append("','").Append(profileListView.DISPLAY_FIELD).Append("','").Append(strTogglefld).Append("','").Append(profileListView.DEFAULT_TOGGLE_TEXT).Append("','").Append(profileListView.TOGGLE_ORDER).Append("','").Append(profileListView.LAST_UPDATE_DATE).Append("','").Append(userID).Append("','").Append(clientAddr).Append("')");

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

        /// <summary>
        /// Updating Profile
        /// </summary>
        /// <param name="profileDescr"></param>
        /// <param name="profileID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long UpdateProfile(string profileDescr, string profileID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_PROFILE SET PROFILE_DESCRIPTION='").Append(profileDescr).Append("' WHERE PROFILE_ID='").Append(profileID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Deleting Profile App ACL
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="profileAppAcl"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteprofileAppAcl(string profileID, MT_ATPAR_PROFILE_APP_ACL profileAppAcl, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='").Append(profileID).Append("' AND APP_ID='").Append(profileAppAcl.APP_ID).Append("'");

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
        /// Deleting Profile Parameters
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="profileAppAcl"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteprofileParameters(string profileID, MT_ATPAR_PROFILE_APP_ACL profileAppAcl, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_ATPAR_PROFILE_PARAMETERS WHERE PROFILE_ID='").Append(profileID).Append("' AND APP_ID='").Append(profileAppAcl.APP_ID).Append("'");

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
        /// Updating Profile Parameters
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="profileID"></param>
        /// <param name="profileAppAcl"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long UpdateprofileParams(string userId, string profileID, MT_ATPAR_PROFILE_APP_ACL profileAppAcl, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_PROFILE_PARAMETERS SET LAST_UPDATE_USER = '").Append(userId).Append("', LAST_UPDATE_DATE=GETDATE() WHERE PROFILE_ID='").Append(profileID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
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
        /// Getting Profile App Acl Count
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="appID"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int GetprofileAppAclCount(string profileID, int appID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int profileAppAclCount = 0;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT COUNT(APP_ID) FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID= '").Append(profileID).Append("' AND  APP_ID = '").Append(appID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                profileAppAclCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profile count  returned : " + profileAppAclCount); }

                return profileAppAclCount;
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
        /// Updating Profile App ACL
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="profileID"></param>
        /// <param name="clientAddr"></param>
        /// <param name="profileAppAcl"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long UpdateprofileAppAcl(string userID, string profileID, string clientAddr, MT_ATPAR_PROFILE_APP_ACL profileAppAcl, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_PROFILE_APP_ACL SET CLIENT_USER = '").Append(profileAppAcl.CLIENT_USER).Append("',SERVER_USER = '").Append(profileAppAcl.SERVER_USER).Append("', LAST_UPDATE_USER = '").Append(userID).Append("', LAST_CLIENT_ADDRESS = '").Append(clientAddr).Append("', LAST_UPDATE_DATE = '").Append(DateTime.Now).Append("' WHERE PROFILE_ID='").Append(profileID).Append("' AND APP_ID='").Append(profileAppAcl.APP_ID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Deleting Profile List View 
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="ProfileAppAcl"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteprofileListView(string profileID, MT_ATPAR_PROFILE_APP_ACL ProfileAppAcl, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_ATPAR_PROFILE_LIST_VIEW WHERE PROFILE_ID='").Append(profileID).Append("' AND APP_ID='").Append(ProfileAppAcl.APP_ID).Append("'");

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
        /// Deleting Profile Menu
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="appID"></param>
        /// <param name="menuCode"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteprofileMenu(string profileID, int appID, string menuCode, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_ATPAR_PROFILE_MENU WHERE PROFILE_ID='").Append(profileID).Append("' AND APP_ID='").Append(appID).Append("' AND MENU_CODE='").Append(menuCode).Append("'");

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
        /// Getting Profile Menu App ID Count
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="appID"></param>
        /// <param name="menuCode"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int GetprofileMenuappIdCount(string profileID, int appID, string menuCode, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int profileMenuappIdCount = 0;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                sbSql.Append("SELECT COUNT(APP_ID) FROM MT_ATPAR_PROFILE_MENU WHERE PROFILE_ID='").Append(profileID).Append("' AND APP_ID='").Append(appID).Append("' AND MENU_CODE='").Append(menuCode).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                profileMenuappIdCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profile menu app count  returned : " + profileMenuappIdCount); }

                return profileMenuappIdCount;
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
        /// Updating Profile Menu
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="profileID"></param>
        /// <param name="clientAddr"></param>
        /// <param name="profileMenu"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long UpdateprofileMenu(string userID, string profileID, string clientAddr, MT_ATPAR_PROFILE_MENU profileMenu, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_PROFILE_MENU SET MENU_SEQ_NO = '").Append(profileMenu.MENU_SEQ_NO).Append("',  LAST_UPDATE_USER = '").Append(userID).Append("', LAST_CLIENT_ADDRESS = '").Append(clientAddr).Append("',  LAST_UPDATE_DATE = '").Append(DateTime.Now).Append("' WHERE PROFILE_ID='").Append(profileID).Append("' AND APP_ID='").Append(profileMenu.APP_ID).Append("' AND MENU_CODE='").Append(profileMenu.MENU_CODE).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Getting Profile Parameters ID Count
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="appID"></param>
        /// <param name="parameterId"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int GetprofileParametersIdCount(string profileID, short appID, string parameterId, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int profileMenuappIdCount = 0;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT COUNT(PARAMETER_ID) FROM MT_ATPAR_PROFILE_PARAMETERS WHERE PROFILE_ID='").Append(profileID).Append("' AND APP_ID='").Append(appID).Append("' AND PARAMETER_ID='").Append(parameterId).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }

                profileMenuappIdCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profile parameter id count  returned : " + profileMenuappIdCount); }

                return profileMenuappIdCount;

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
        /// Updating Profile Parameters
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="profileID"></param>
        /// <param name="clientAddr"></param>
        /// <param name="profileParameter"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long UpdateprofileParameters(string userID, string profileID, string clientAddr, MT_ATPAR_PROFILE_PARAMETERS profileParameter, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_PROFILE_PARAMETERS SET PARAMETER_VALUE = '").Append(profileParameter.PARAMETER_VALUE).Append("', LAST_UPDATE_USER = '").Append(userID).Append("', LAST_CLIENT_ADDRESS = '").Append(clientAddr).Append("', LAST_UPDATE_DATE = '").Append(DateTime.Now).Append("' WHERE PROFILE_ID='").Append(profileID).Append("' AND PARAMETER_ID='").Append(profileParameter.PARAMETER_ID).Append("' AND APP_ID='").Append(profileParameter.APP_ID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Getting Screen Name Count
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="fieldname"></param>
        /// <param name="appID"></param>
        /// <param name="screenName"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int GetScreenNameCount(string profileID, string fieldname, int appID, string screenName, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int screenNameCount = 0;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT COUNT(SCREEN_NAME) FROM MT_ATPAR_PROFILE_LIST_VIEW WHERE PROFILE_ID='").Append(profileID).Append("' AND FIELD_NAME='").Append(fieldname).Append("' AND APP_ID='").Append(appID).Append("' AND SCREEN_NAME='").Append(screenName).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }

                screenNameCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of screen Name count  returned : " + screenNameCount); }

                return screenNameCount;
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
        /// Getting List View Toggle
        /// </summary>
        /// <param name="fieldname"></param>
        /// <param name="appID"></param>
        /// <param name="screenName"></param>
        /// <param name="enterpriseSystem"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private string GetListViewToggle(string fieldname, short appID, string screenName, string enterpriseSystem, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT TOGGLE_FIELD FROM MT_ATPAR_LIST_VIEW WHERE FIELD_NAME='").Append(fieldname).Append("' AND APP_ID='").Append(appID).Append("' AND SCREEN_NAME='").Append(screenName).Append("' AND ENTERPRISE_SYSTEM = '").Append(enterpriseSystem).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }

                var toggle = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                return toggle;
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
        /// Updating Profile List View
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="userID"></param>
        /// <param name="clientAddr"></param>
        /// <param name="strTogglefld"></param>
        /// <param name="profileListView"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long UpdateprofileListView(string profileID, string userID, string clientAddr, string strTogglefld, MT_ATPAR_PROFILE_LIST_VIEW profileListView, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_PROFILE_LIST_VIEW SET COLUMN_HEADER = '").Append(profileListView.COLUMN_HEADER).Append("',COLUMN_ORDER = '").Append(profileListView.COLUMN_ORDER).Append("', COLUMN_WIDTH = '").Append(profileListView.COLUMN_WIDTH).Append("', DISPLAY_FIELD = '").Append(profileListView.DISPLAY_FIELD).Append("', LAST_UPDATE_USER = '").Append(userID).Append("', LAST_CLIENT_ADDRESS = '").Append(clientAddr).Append("', LAST_UPDATE_DATE = '").Append(DateTime.Now).Append("', TOGGLE_FIELD='").Append(strTogglefld).Append("' , DEFAULT_TOGGLE_TEXT='").Append(profileListView.DEFAULT_TOGGLE_TEXT).Append("' , TOGGLE_ORDER='").Append(profileListView.TOGGLE_ORDER).Append("' WHERE PROFILE_ID='").Append(profileID).Append("' AND SCREEN_NAME='").Append(profileListView.SCREEN_NAME).Append("' AND FIELD_NAME='").Append(profileListView.FIELD_NAME).Append("' AND APP_ID='").Append(profileListView.APP_ID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Update Reports UserRole
        /// </summary>
        /// <param name="strUserId"></param>
        /// <param name="blnReportsDesign"></param>
        /// <param name="blnDashboardDesign"></param>
        /// <returns></returns>
        public long updateReportsUserRole(string strUserId, bool blnReportsDesign, bool blnDashboardDesign)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Guid TenantID = new Guid("3E4B90D8-63B9-48A6-BDD0-C3AF81AC04D5"); //AtParMT
            Guid? RoleId = null;
            int count = 0;
            StringBuilder sbSql = new StringBuilder();
            try
            {
                if (strUserId != string.Empty)
                {
                    using (ATPAR_REP_CONFIGContext configContext = new ATPAR_REP_CONFIGContext())
                    {
                        using (DbContextTransaction configTrans = configContext.Database.BeginTransaction())
                        {
                            sbSql.Append("SELECT Id FROM IzendaUser WHERE UserName IN (" + strUserId + ") AND TenantId='" + TenantID + "'");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }
                            var UserId = configContext.Database.SqlQuery<Guid>(sbSql.ToString()).ToList();

                            if (blnReportsDesign || blnDashboardDesign)
                            {
                                RoleId = new Guid("EA98B2CA-6AC7-40F7-BBF2-EBD0E3184C26");//Support Role
                            }
                            //else if (blnReportsDesign)
                            //{
                            //    RoleId = new Guid("EA98B2CA-6AC7-40F7-BBF2-EBD0E3184C27");//Reports Role
                            //}
                            //else if (blnDashboardDesign)
                            //{
                            //    RoleId = new Guid("EA98B2CA-6AC7-40F7-BBF2-EBD0E3184C28");//Dashboard Role
                            //}
                            else
                            {
                                RoleId = new Guid("ea98b2ca-6ac7-40f7-bbf2-ebd0e3184c25");//View Role
                            }
                            //IZENDAUSER Insert
                            for (int i = 0; i <= UserId.Count - 1; i++)
                            {
                                sbSql.Clear();
                                sbSql.Append("UPDATE IzendaUserRole SET RoleId='" + RoleId + "' WHERE UserId='" + UserId[i] + "'");

                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                }

                                count = configContext.Database.ExecuteSqlCommand(sbSql.ToString());

                                sbSql.Clear();

                            }

                            sbSql.Clear();
                            configTrans.Commit();

                        }

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
