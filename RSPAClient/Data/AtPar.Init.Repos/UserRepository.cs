using AtPar.Repository.Interfaces.Init;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using log4net;

using System.Data.Entity.Core.Objects;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.ViewModel;
using System.Web;
using System.IO;
using System.Drawing;

namespace AtPar.Init.Repos
{
    public class UserRepository : IUserRepository
    {
        #region Private Variables

        private ILog _log;

        #endregion

        #region Constructor
        public UserRepository(ILog log)
        {
            _log = log;
            log.SetLoggerType(typeof(UserRepository));
        }

        #endregion

        #region GetAppRoleIDs
        /// <summary>
        /// To get app role IDS
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        public List<MT_ATPAR_USER_PROFILE_APP_ACL> GetAppRoleIDs(string UserId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.PROFILE_ID,A.LDAP_USER, B.APP_ID, ");
                    sbSql.Append("B.SERVER_USER, B.CLIENT_USER FROM MT_ATPAR_USER A, MT_ATPAR_PROFILE_APP_ACL B ");
                    sbSql.Append("WHERE A.PROFILE_ID = B.PROFILE_ID  AND A.USER_ID = '" + UserId + "'");
                    sbSql.Append(" AND B.SERVER_USER = 'Y' ORDER BY APP_ID ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    List<MT_ATPAR_USER_PROFILE_APP_ACL> lstAppRoleIds = objContext.Database.SqlQuery<MT_ATPAR_USER_PROFILE_APP_ACL>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstAppRoleIds); }

                    return lstAppRoleIds;

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
        }

        #endregion

        #region GetGroupMenusList
        /// <summary>
        /// To get group menus list
        /// </summary>
        /// <param name="enterpriseSystem"></param>
        /// <param name="profileID"></param>
        /// <returns></returns>
        public List<VM_GROUP_MENUS_LIST> GetGroupMenusList(string enterpriseSystem, string profileID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT APP_GROUP.GROUP_ID, APP_GROUP.GROUP_NAME, APP_GROUP.SEQ_NO AS APP_GROUP_SEQ_NO, APP_GROUP.IMAGE_PATH AS APP_GROUP_IMAGE_PATH,")
                         .Append("APP.APP_ID, APP.APP_NAME,APP.APP_IMAGE_PATH,")
                         .Append("SUB_MENU.SUB_MENU_GROUP_ID, SUB_MENU.SUB_MENU_GROUP_NAME, SUB_MENU.SEQ_NO AS SUB_MENU_SEQ_NO, SUB_MENU.IMAGE_PATH AS SUB_MENU_IMAGE_PATH,")
                         .Append("MENUS.MENU_CODE, MENUS.MENU_NAME, PROFILE_MENU.MENU_SEQ_NO, MENUS.ROUTE,MENUS.MENUS_FRIENDLYNAME,MENUS.REPORT_ID  FROM ")
                         .Append("MT_ATPAR_APP_GROUP APP_GROUP,MT_ATPAR_APP APP,MT_ATPAR_SUB_MENU SUB_MENU,MT_ATPAR_MENUS MENUS,MT_ATPAR_PROFILE_MENU PROFILE_MENU ")
                         .Append("WHERE APP_GROUP.GROUP_ID = MENUS.GROUP_ID AND APP.APP_ID = MENUS.APP_ID ")
                         .Append("AND SUB_MENU.GROUP_ID = MENUS.GROUP_ID AND SUB_MENU.APP_ID = MENUS.APP_ID ")
                         .Append("AND SUB_MENU.SUB_MENU_GROUP_NAME = MENUS.MENU_SUB_GROUP AND MENUS.MENU_CODE = PROFILE_MENU.MENU_CODE ")
                         .Append("AND MENUS.ENTERPRISE_SYSTEM='" + enterpriseSystem + "' ")
                         .Append("AND MENUS.APP_ID = PROFILE_MENU.APP_ID AND PROFILE_MENU.PROFILE_ID = '" + profileID + "' ")
                         .Append("AND  APP.APP_ID IN(SELECT C.APP_ID FROM MT_ATPAR_USER A, MT_ATPAR_PROFILE_APP_ACL B, ")
                         .Append("MT_ATPAR_APP C WHERE A.PROFILE_ID = B.PROFILE_ID  AND A.USER_ID = '" + userID + "' AND B.SERVER_USER = 'Y'  AND B.APP_ID = C.APP_ID) ")
                         .Append("ORDER BY APP_GROUP.SEQ_NO,  SUB_MENU.SUB_MENU_GROUP_ID , PROFILE_MENU.MENU_SEQ_NO");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var groupMenusList = objContext.Database.SqlQuery<VM_GROUP_MENUS_LIST>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Group Menus List Count: " + groupMenusList.Count); }

                    return groupMenusList;
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

        #region GetUser
        /// <summary>
        /// To get User
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public VM_MT_ATPAR_USER_PROFILE GetUser(string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append("SELECT MT_ATPAR_USER.USER_ID AS USER_ID, MT_ATPAR_USER.PASSHASH AS PASSHASH, MT_ATPAR_USER.FIRST_NAME AS FIRST_NAME, ");
                    sbSql.Append("MT_ATPAR_USER.LAST_NAME AS LAST_NAME, MT_ATPAR_USER.MIDDLE_INITIAL AS MIDDLE_INITIAL, MT_ATPAR_USER.EMAIL_ID AS EMAIL_ID, ");
                    sbSql.Append("MT_ATPAR_USER.PHONE1 AS PHONE1, MT_ATPAR_USER.PHONE2 AS PHONE2, MT_ATPAR_USER.FAX AS FAX, MT_ATPAR_USER.PAGER AS PAGER, ");
                    sbSql.Append("MT_ATPAR_USER_ACL.TOKEN_EXPIRY_PERIOD AS TOKEN_EXPIRY_PERIOD, ");
                    sbSql.Append("MT_ATPAR_USER_ACL.LOGIN_ALLOWED AS LOGIN_ALLOWED, MT_ATPAR_USER_ACL.PASSHASH_REQUIRED AS PASSHASH_REQUIRED, MT_ATPAR_USER_ACL.TIME_RESTRICTIONS AS TIME_RESTRICTIONS, ");
                    sbSql.Append("MT_ATPAR_USER_ACL.ACCOUNT_DISABLED AS ACCOUNT_DISABLED, MT_ATPAR_USER_ACL.IDLE_TIME AS IDLE_TIME, MT_ATPAR_USER_ACL.PASSWD_RESET_REQUIRED AS PASSWD_RESET_REQUIRED, ");
                    sbSql.Append("MT_ATPAR_USER_ACL.REPORT_USER AS REPORT_USER, MT_ATPAR_USER_ACL.RECORDS_PER_PAGE AS RECORDS_PER_PAGE, MT_ATPAR_USER_ACL.DEFAULT_REPORT_DURATION AS DEFAULT_REPORT_DURATION, ");
                    sbSql.Append("MT_ATPAR_USER.LDAP_USER,MT_ATPAR_USER.IMAGE_PATH,MT_ATPAR_USER.IMAGE FROM MT_ATPAR_USER INNER JOIN MT_ATPAR_USER_ACL ");
                    sbSql.Append("ON MT_ATPAR_USER.USER_ID = MT_ATPAR_USER_ACL.USER_ID ");
                    sbSql.Append("WHERE MT_ATPAR_USER.USER_ID= '" + userId + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var objUser = objContext.Database.SqlQuery<VM_MT_ATPAR_USER_PROFILE>(sbSql.ToString()).ToList().FirstOrDefault();


                    if (objUser != null)
                    {
                        if (objUser.IMAGE == null || (objUser.IMAGE + "") == "")
                        {
                            byte[] imageDataBytes = null;
                            var filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/users/");
                            var pathFiles = Directory.GetFiles(filePath);
                            if (pathFiles.Count() == 1)
                            {
                                Image img = Image.FromFile(pathFiles[0].ToString());
                                using (MemoryStream mStream = new MemoryStream())
                                {
                                    img.Save(mStream, img.RawFormat);
                                    imageDataBytes = mStream.ToArray();
                                }
                            }
                            objUser.IMAGE = imageDataBytes;
                        }
                    }

                    if (_log.IsDebugEnabled && objUser != null)
                    {
                        _log.Debug(string.Format("{0}{1}{2}", methodBaseName, "Data fetched for User Id: ", userId));
                    }
                    else if (_log.IsDebugEnabled && objUser == null)
                    {
                        _log.Debug(string.Format("{0}{1}{2}", methodBaseName, "No Data fetched for User Id: ", userId));
                    }

                    return objUser;
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

        #region GetApps
        /// <summary>
        /// method for getting MT_ATPAR_APP list for a user
        /// </summary>
        /// <param name="userID">userID param</param>
        /// <returns>MT_ATPAR_APP list</returns>
        public List<MT_ATPAR_APP> GetApps(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT C.APP_ID,C.APP_NAME,C.APP_IMAGE_PATH,C.GROUP_ID ");
                    sbSql.Append("FROM MT_ATPAR_USER A, MT_ATPAR_PROFILE_APP_ACL B, MT_ATPAR_APP C ");
                    sbSql.Append("WHERE A.PROFILE_ID = B.PROFILE_ID  AND A.USER_ID = '" + userID + "'");
                    sbSql.Append(" AND B.SERVER_USER = 'Y' AND B.APP_ID=C.APP_ID ORDER BY C.APP_ID ASC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    List<MT_ATPAR_APP> appNames = objContext.Database.SqlQuery<MT_ATPAR_APP>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Apps List Count: " + appNames.Count); }

                    return appNames;
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

        #region GetAppGroups
        /// <summary>
        /// method for getting MT_ATPAR_APP_GROUP list
        /// </summary>
        /// <returns>MT_ATPAR_APP_GROUP list</returns>
        public List<MT_ATPAR_APP_GROUP> GetAppGroups()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var appGroups = objContext.MT_ATPAR_APP_GROUP.ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Apps List Count: " + appGroups.Count); }

                    return appGroups;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }
        #endregion

        #region GetAllUsers
        public List<MT_ATPAR_USER> GetAllUsers()
        {
            try
            {
                using (var entities = new ATPAR_MT_Context())
                {

                    List<MT_ATPAR_USER> lstatparusers = new List<MT_ATPAR_USER>();
                    MT_ATPAR_USER objatparuser = null;
                    foreach (var item in entities.MT_ATPAR_USER)
                    {
                        objatparuser = new MT_ATPAR_USER();
                        objatparuser.USER_ID = item.USER_ID;
                        objatparuser.PASSHASH = item.PASSHASH;
                        objatparuser.FIRST_NAME = item.FIRST_NAME;
                        objatparuser.LAST_NAME = item.LAST_NAME;
                        objatparuser.MIDDLE_INITIAL = item.MIDDLE_INITIAL;
                        objatparuser.PHONE1 = item.PHONE1;
                        objatparuser.PHONE2 = item.PHONE2;
                        objatparuser.FAX = item.FAX;
                        objatparuser.PAGER = item.PAGER;
                        lstatparusers.Add(objatparuser);
                    }
                    return lstatparusers;
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        #endregion

        #region SaveUserDetails
        public long SaveUserDetails(VM_MT_ATPAR_USER_PROFILE user)
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

                            sbSql.Append(" UPDATE MT_ATPAR_USER");
                            sbSql.Append(" SET FIRST_NAME = '" + user.FIRST_NAME + "', ");
                            sbSql.Append(" LAST_NAME = '" + user.LAST_NAME + "', ");
                            sbSql.Append(" MIDDLE_INITIAL = '" + user.MIDDLE_INITIAL + "', ");
                            sbSql.Append(" EMAIL_ID = '" + user.EMAIL_ID + "', ");
                            sbSql.Append(" PHONE1 = '" + user.PHONE1 + "', ");
                            sbSql.Append(" PHONE2 = '" + user.PHONE2 + "', ");
                            sbSql.Append(" FAX = '" + user.FAX + "', ");
                            sbSql.Append(" PAGER = '" + user.PAGER + "'");
                            sbSql.Append(" WHERE USER_ID = '" + user.USER_ID + "'");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                            }

                            objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            sbSql.Clear();

                            sbSql.Append(" UPDATE MT_ATPAR_USER_ACL");
                            sbSql.Append(" SET RECORDS_PER_PAGE = '" + user.RECORDS_PER_PAGE + "', ");
                            sbSql.Append(" DEFAULT_REPORT_DURATION = '" + user.DEFAULT_REPORT_DURATION + "', ");
                            sbSql.Append(" TOKEN_EXPIRY_PERIOD = '" + user.TOKEN_EXPIRY_PERIOD + "', ");
                            sbSql.Append(" IDLE_TIME = '" + user.IDLE_TIME + "'");
                            sbSql.Append(" WHERE USER_ID = '" + user.USER_ID + "'");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                            }

                            objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            dbContextTransaction.Commit();

                            if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0}{1}{2}", methodBaseName, "Profile updated for user :  ", user.USER_ID)); }
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

        #endregion

        #region User Status Report

        public List<VM_USER_STATUS> GetUserStatus(string serverUserID, string userID, string firstName, string lastName,
                                                  string status, string orgGroupID, string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT A.USER_ID, FIRST_NAME, LAST_NAME, CREATE_DATE, ACCOUNT_DISABLED, MIDDLE_INITIAL, PASSWD_RESET_REQUIRED ,");
                    sbSQL.Append(" PROFILE_ID, ORG_GROUP_ID,EMAIL_ID,PASSHASH_REQUIRED,TOKEN_EXPIRY_PERIOD ,");
                    sbSQL.Append(" IDLE_TIME, PHONE1, FAX, LDAP_USER,USERDN, PHONE2, PAGER,REPORT_USER, LDAP_ROLE, LDAP_ORG");
                    sbSQL.Append(" FROM MT_ATPAR_USER A, MT_ATPAR_USER_ACL B, MT_ATPAR_USER_ORG_GROUPS  C ");
                    sbSQL.Append(" WHERE A.USER_ID = B.USER_ID AND A.USER_ID = C.USER_ID ");

                    if (orgGroupID != "All")
                    {
                        sbSQL.Append(" AND (C.ORG_GROUP_ID = '" + orgGroupID + "' OR C.ORG_GROUP_ID ='') ");
                    }

                    if (profileID != "ADMIN")
                    {
                        sbSQL.Append(" AND PROFILE_ID <> 'ADMIN' ");
                    }

                    if (!string.IsNullOrEmpty(userID))
                    {
                        sbSQL.Append("AND A.USER_ID LIKE '" + userID + "%' ");
                    }

                    if (!string.IsNullOrEmpty(firstName))
                    {
                        sbSQL.Append("AND FIRST_NAME LIKE '" + firstName + "%' ");
                    }

                    if (!string.IsNullOrEmpty(lastName))
                    {
                        sbSQL.Append("AND LAST_NAME LIKE '" + lastName + "%' ");
                    }

                    if (status == "1")
                    {
                        sbSQL.Append("AND ACCOUNT_DISABLED = 0 ");
                    }
                    else if (status == "2")
                    {
                        sbSQL.Append("AND ACCOUNT_DISABLED = 1 ");
                    }

                    sbSQL.Append("ORDER BY A.USER_ID");



                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstUsers = objContext.Database.SqlQuery<VM_USER_STATUS>(sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstUsers.Count); }


                    return lstUsers;

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

        public long UpdateUserStatus(string serverUserID, string userID, string status)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_USER_ACL SET ACCOUNT_DISABLED = '" + status + "', INVALID_LOGIN_ATTEMPTS = 0 ");
                    sbSql.Append("WHERE USER_ID ='" + userID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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

        #region Get Reports Menus List

        /// <summary>
        /// To get group menus list
        /// </summary>
        /// <param name="enterpriseSystem"></param>
        /// <param name="profileID"></param>
        /// <returns></returns>
        public List<VM_REPORTS_MENUS_LIST> GetReportsMenusList(string enterpriseSystem, string orgGroupID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<VM_REPORTS_MENUS_LIST> groupMenusList = new List<VM_REPORTS_MENUS_LIST>();
            try
            {
                bool ChkRepDatabase = CheckReportsdbAvailable();

                if (ChkRepDatabase == true)
                {
                    using (ATPAR_REP_CONFIGContext objContext = new ATPAR_REP_CONFIGContext())
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                        sbSql.Append(" SELECT IR.Id REPORT_ID ,IR.Name REPORT_NAME,IT.TenantID TENANT ,IRC.Name CATEGORY, ")
                            .Append("CASE WHEN IR.SubCategoryId IS NULL  THEN IRC.Name  ELSE ( SELECT  Name FROM IzendaReportCategory WHERE Id=IR.SubCategoryId) END  SUB_CATEGORY, 'R' REPORT_TYPE ")
                            .Append(" FROM  IzendaReport IR, IzendaReportCategory IRC, IzendaTenant IT ")
                            .Append(" WHERE IR.CategoryId=IRC.Id AND IR.TenantId=IR.TenantId AND IR.TenantId=IT.Id  ")
                            .Append(" UNION SELECT IR.Id REPORT_ID ,IR.Name REPORT_NAME,IT.TenantID TENANT ,IRC.Name CATEGORY, ")
                            .Append("CASE WHEN IR.SubCategoryId IS NULL  THEN IRC.Name  ELSE ( SELECT  Name FROM IzendaReportCategory WHERE Id=IR.SubCategoryId) END  SUB_CATEGORY,'D' REPORT_TYPE ")
                            .Append(" FROM  IzendaDashboard IR, IzendaReportCategory IRC, IzendaTenant IT ")
                            .Append(" WHERE IR.CategoryId=IRC.Id AND IR.TenantId=IR.TenantId AND IR.TenantId=IT.Id  ORDER BY IRC.Name ");


                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        groupMenusList = objContext.Database.SqlQuery<VM_REPORTS_MENUS_LIST>(sbSql.ToString()).ToList();

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Group Menus List Count: " + groupMenusList.Count); }

                        return groupMenusList;

                    }
                }
                else
                {
                    return groupMenusList;
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


        public bool CheckReportsdbAvailable()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var result = false;

            try
            {
                ATPAR_MT_Context objContext = new ATPAR_MT_Context();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> configDetails = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                configDetails = objContext.MT_ATPAR_CONFIGURATION_SECTION_DTLS.Where(x => x.TAB_ID == AtParWebEnums.ConfigurationManager_Tabs.REPORTSCONFIGDBCONNECTION.ToString()).ToList();
                string datasource = string.Empty;
                string initialCatalog = string.Empty;
                string userId = string.Empty;
                string pwd = string.Empty;

                foreach (var item in configDetails)
                {
                    if (item.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.DATASOURCE.ToString())
                    {
                        initialCatalog = item.PARAMETER_VALUE;
                    }
                    else if (item.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.PASSWORD.ToString())
                    {
                        pwd = item.PARAMETER_VALUE;
                    }
                    else if (item.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.SERVER.ToString())
                    {
                        datasource = item.PARAMETER_VALUE;
                    }
                    else if (item.PARAMETER_ID == AtParWebEnums.REPORTSCONFIGDBCONNECTION.USERID.ToString())
                    {
                        userId = item.PARAMETER_VALUE;
                    }
                }

                if (string.IsNullOrEmpty(datasource) && string.IsNullOrEmpty(pwd) && string.IsNullOrEmpty(initialCatalog) && string.IsNullOrEmpty(userId))
                {
                    result = false;
                }
                else
                {
                    result = true;
                }
                objContext.Dispose();
            }
            catch (Exception ex)
            {
                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Reports Database Not setup "); }

                }
            }

            return result;
        }
        #endregion

        #region GetReportsApp
        /// <summary>
        /// method for getting MT_ATPAR_APP list for reports app
        /// </summary>
        /// <returns>MT_ATPAR_APP list</returns>
        public MT_ATPAR_APP GetReportsApp()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT * FROM MT_ATPAR_APP WHERE APP_ID = " + (int)AtParWebEnums.EnumApps.Reports);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    MT_ATPAR_APP reportApp = objContext.Database.SqlQuery<MT_ATPAR_APP>(sbSql.ToString()).ToList().FirstOrDefault();

                    return reportApp;
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
