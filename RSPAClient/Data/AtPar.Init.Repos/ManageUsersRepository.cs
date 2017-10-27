using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using AtParEncryptionServices;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Data.Entity;

namespace AtPar.Init.Repos
{
    public class ManageUsersRepository : IManageUsersRepository
    {
        ILog _log;

        public ManageUsersRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageUsersRepository));

        }

        public int IsMenuAssigned(string userID, string profileID, string chkMenuName)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            int count = -1;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(*) FROM MT_ATPAR_PROFILE_MENU A, MT_ATPAR_MENUS B ").Append(
                        " WHERE A.PROFILE_ID = '").Append(profileID).Append("' AND B.MENU_NAME = '").Append(chkMenuName).Append("'").Append(
                        " AND A.MENU_CODE = B.MENU_CODE ");


                    count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of menus count: " + count); }

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

        public List<VM_MT_ATPAR_USER> GetManageUsers(string userID, string orgId, string profileId, string searchId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT C.USER_ID, FIRST_NAME, LAST_NAME FROM ");
                    sbSql.Append("(SELECT  A.USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL, ACCOUNT_DISABLED , EMAIL_ID, ");
                    sbSql.Append("PHONE1, FAX, PROFILE_ID, LDAP_USER FROM MT_ATPAR_USER A,  MT_ATPAR_USER_ACL B WHERE ");
                    sbSql.Append("A.USER_ID = B.USER_ID)C , MT_ATPAR_USER_ORG_GROUPS D ");
                    sbSql.Append("WHERE C.USER_ID = D.USER_ID ");
                    if (orgId != "All")
                    {
                        sbSql.Append(" AND ( D.ORG_GROUP_ID ='" + orgId + "' OR D.ORG_GROUP_ID='') ");
                    }

                    if (profileId != "ADMIN")
                    {
                        sbSql.Append(" AND PROFILE_ID != 'ADMIN' ");
                    }

                    if (!string.IsNullOrEmpty(searchId))
                    {
                        sbSql.Append(" AND ( C.USER_ID LIKE '" + searchId + "%' OR ");
                        sbSql.Append("FIRST_NAME LIKE '" + searchId + "%'  OR ");
                        sbSql.Append("LAST_NAME LIKE '" + searchId + "%')");
                    }
                    var fields = new[] { "USER_ID", "FIRST_NAME", "LAST_NAME" };

                    var count = objContext.Database.DifferedExecuteQuery<VM_MT_ATPAR_USER>(fields, sbSql.ToString()).ToList();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Users count: " + count); }
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

        public List<MT_ATPAR_USER_PROFILE_APP_ACL_ORG> GetUsers(string userID, string orgId, string profileId, string searchId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _strSQL = "SELECT C.USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL, ACCOUNT_DISABLED , EMAIL_ID, " +
                                  "PHONE1, FAX, PROFILE_ID, D.ORG_GROUP_ID, LDAP_USER,PASSHASH_REQUIRED,USERDN,TOKEN_EXPIRY_PERIOD,IDLE_TIME,PASSWD_RESET_REQUIRED,PHONE2,PAGER,REPORT_USER,LDAP_ROLE,LDAP_ORG FROM " +
                                  "(SELECT  A.USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL, ACCOUNT_DISABLED , EMAIL_ID, " +
                                  "PHONE1, FAX, PROFILE_ID, LDAP_USER,PASSHASH_REQUIRED,USERDN,TOKEN_EXPIRY_PERIOD,IDLE_TIME,PASSWD_RESET_REQUIRED,PHONE2,PAGER,REPORT_USER,LDAP_ROLE,LDAP_ORG FROM MT_ATPAR_USER A,  MT_ATPAR_USER_ACL B WHERE " +
                                  "A.USER_ID = B.USER_ID)C , MT_ATPAR_USER_ORG_GROUPS D " +
                                  "WHERE C.USER_ID = D.USER_ID";

                    if (orgId != "All")
                    {
                        _strSQL = _strSQL + " AND ( D.ORG_GROUP_ID ='" + orgId + "' OR D.ORG_GROUP_ID='')";
                    }
                    if (profileId != "ADMIN")
                    {
                        _strSQL = _strSQL + " AND PROFILE_ID != 'ADMIN' ";
                    }

                    if (!string.IsNullOrEmpty(searchId))
                    {
                        _strSQL = _strSQL + " AND ( C.USER_ID LIKE '" + searchId + "%' OR ";
                        _strSQL = _strSQL + "FIRST_NAME LIKE '" + searchId + "%'  OR ";
                        _strSQL = _strSQL + "LAST_NAME LIKE '" + searchId + "%')";
                    }


                    var fields = new[] { "USER_ID", "FIRST_NAME", "LAST_NAME", "MIDDLE_INITIAL", "ACCOUNT_DISABLED", "EMAIL_ID", "PHONE1", "FAX", "PROFILE_ID", "ORG_GROUP_ID", "LDAP_USER", "PASSHASH_REQUIRED", "USERDN", "TOKEN_EXPIRY_PERIOD", "IDLE_TIME", "PASSWD_RESET_REQUIRED", "PHONE2", "PAGER", "REPORT_USER", "LDAP_ROLE", "LDAP_ORG" };

                    var count = objContext.Database.DifferedExecuteQuery<MT_ATPAR_USER_PROFILE_APP_ACL_ORG>(fields, _strSQL.ToString()).ToList();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Users count: " + count); }
                    return count;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                throw ex;
            }
            finally
            {
                _strSQL = string.Empty;
            }
        }


        public long UpdateUser(VM_MT_ATPAR_USER_ADD user, string enterpriseSystem)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode;
            string strPwd = string.Empty;
            string strHashVal = string.Empty;
            StringBuilder query = new StringBuilder();
            if (string.IsNullOrEmpty(enterpriseSystem))
            {
                enterpriseSystem = string.Empty;

            }
            if (string.IsNullOrEmpty(user.LDAP_ROLE))
            {
                user.LDAP_ROLE = string.Empty;
            }
            if (string.IsNullOrEmpty(user.LDAP_ORG))
            {
                user.LDAP_ORG = string.Empty;
            }
            if (string.IsNullOrEmpty(user.LDAP_USER))
            {
                user.LDAP_USER = string.Empty;
            }
            if (string.IsNullOrEmpty(user.PHONE2))
            {
                user.PHONE2 = string.Empty;

            }
            if (string.IsNullOrEmpty(user.PAGER))
            {
                user.PAGER = string.Empty;
            }
            if (string.IsNullOrEmpty(user.FAX))
            {
                user.FAX = string.Empty;
            }
            if (string.IsNullOrEmpty(user.USERDN))
            {
                user.USERDN = string.Empty;
            }

            if (string.IsNullOrEmpty(user.MIDDLE_INITIAL))
            {
                user.MIDDLE_INITIAL = string.Empty;
            }
            if (string.IsNullOrEmpty(user.EMAIL_ID))
            {
                user.EMAIL_ID = string.Empty;

            }
            if (string.IsNullOrEmpty(user.PHONE1))
            {
                user.PHONE1 = string.Empty;
            }
            if (string.IsNullOrEmpty(user.PROFILE_ID))
            {
                user.PROFILE_ID = string.Empty;
            }

            if (string.IsNullOrEmpty(user.ORG_GROUP_ID))
            {
                user.ORG_GROUP_ID = string.Empty;
            }
            if (string.IsNullOrEmpty(user.PASSWD_RESET_REQUIRED))
            {
                user.PASSWD_RESET_REQUIRED = string.Empty;

            }
            try
            {

                if (user.PASSHASH_REQUIRED)
                {
                    if (!string.IsNullOrEmpty(user.PASSWORD))
                    {
                        strPwd = user.PASSWORD + user.USER_ID;
                        strHashVal = CSHA256.ComputeHash(strPwd);
                    }
                }
                else
                {
                    strPwd = AtParDefns.DEFAULT_EMPTY_PASSWORD + user.USER_ID;
                    strHashVal = CSHA256.ComputeHash(strPwd);
                }              


                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter pMode = new SqlParameter("@pMode", System.Data.SqlDbType.NVarChar);
                    pMode.Value = Convert.ToInt32(AtParWebEnums.AddEdit_Enum.EDIT);

                    SqlParameter pUserID = new SqlParameter("@pUserID", System.Data.SqlDbType.NVarChar);
                    pUserID.Value = user.USER_ID;

                    SqlParameter pPasswordRequired = new SqlParameter("@pPasswordRequired", System.Data.SqlDbType.Bit);
                    pPasswordRequired.Value = user.PASSHASH_REQUIRED;

                    SqlParameter pPassword = new SqlParameter("@pPassword", System.Data.SqlDbType.NVarChar);
                    pPassword.Value = strHashVal;

                    SqlParameter pTokenExpPeriod = new SqlParameter("@pTokenExpPeriod", System.Data.SqlDbType.Int);
                    pTokenExpPeriod.Value = user.TOKEN_EXPIRY_PERIOD;

                    SqlParameter pIdleTime = new SqlParameter("@pIdleTime", System.Data.SqlDbType.Int);
                    pIdleTime.Value = user.IDLE_TIME;

                    SqlParameter pFirstName = new SqlParameter("@pFirstName", System.Data.SqlDbType.NVarChar);
                    pFirstName.Value = user.FIRST_NAME;

                    SqlParameter pLastName = new SqlParameter("@pLastName", System.Data.SqlDbType.NVarChar);
                    pLastName.Value = user.LAST_NAME;

                    SqlParameter pMiddleInitial = new SqlParameter("@pMiddleInitial", System.Data.SqlDbType.NVarChar);
                    pMiddleInitial.Value = user.MIDDLE_INITIAL;

                    SqlParameter pEmailID = new SqlParameter("@pEmailID", System.Data.SqlDbType.NVarChar);
                    pEmailID.Value = user.EMAIL_ID;

                    SqlParameter pPhone1 = new SqlParameter("@pPhone1", System.Data.SqlDbType.NVarChar);
                    pPhone1.Value = user.PHONE1;

                    SqlParameter pPhone2 = new SqlParameter("@pPhone2", System.Data.SqlDbType.NVarChar);
                    pPhone2.Value = user.PHONE2;

                    SqlParameter pFax = new SqlParameter("@pFax", System.Data.SqlDbType.NVarChar);
                    pFax.Value = user.FAX;

                    SqlParameter pPager = new SqlParameter("@pPager", System.Data.SqlDbType.NVarChar);
                    pPager.Value = user.PAGER;

                    SqlParameter pOrgGroup = new SqlParameter("@pOrgGroup", System.Data.SqlDbType.NVarChar);
                    pOrgGroup.Value = user.ORG_GROUP_ID;

                    SqlParameter pProfile = new SqlParameter("@pProfile", System.Data.SqlDbType.NVarChar);
                    pProfile.Value = user.PROFILE_ID;

                    SqlParameter pLdapUser = new SqlParameter("@pLdapUser", System.Data.SqlDbType.NVarChar);
                    pLdapUser.Value = user.LDAP_USER;

                    SqlParameter pLdapRole = new SqlParameter("@pLdapRole", System.Data.SqlDbType.NVarChar);
                    pLdapRole.Value = user.LDAP_ROLE;

                    SqlParameter pLdapOrg = new SqlParameter("@pLdapOrg", System.Data.SqlDbType.NVarChar);
                    pLdapOrg.Value = user.LDAP_ORG;

                    SqlParameter pTimeRestrictions = new SqlParameter("@pTimeRestrictions", System.Data.SqlDbType.NVarChar);
                    pTimeRestrictions.Value = user.TIME_RESTRICTIONS;

                    SqlParameter pPwdResetReq = new SqlParameter("@pPwdResetReq", System.Data.SqlDbType.NVarChar);
                    pPwdResetReq.Value = user.PASSWD_RESET_REQUIRED;

                    SqlParameter pLastUpdateUser = new SqlParameter("@pLastUpdateUser", System.Data.SqlDbType.NVarChar);
                    pLastUpdateUser.Value = user.LAST_UPDATE_USER;

                    SqlParameter pAccountDisabled = new SqlParameter("@pAccountDisabled", System.Data.SqlDbType.Bit);
                    pAccountDisabled.Value = user.ACCOUNT_DISABLED;

                    SqlParameter pUserDN = new SqlParameter("@pUserDN", System.Data.SqlDbType.NVarChar);
                    pUserDN.Value = user.USERDN;

                    SqlParameter pEnterpriseSystem = new SqlParameter("@pEnterpriseSystem", System.Data.SqlDbType.NVarChar);
                    pEnterpriseSystem.Value = enterpriseSystem;

                    SqlParameter pStatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                    pStatusCode.Direction = System.Data.ParameterDirection.Output;


                    byte[] imageDataBytes = new byte[0];
                    var filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/userprofileimage/");

                    if (Directory.Exists(filePath))
                    {
                        var pathFiles = Directory.GetFiles(filePath);

                        if (pathFiles.Count() == 1)
                        {
                            Image img = Image.FromFile(pathFiles[0].ToString());
                            using (MemoryStream mStream = new MemoryStream())
                            {
                                img.Save(mStream, img.RawFormat);
                                imageDataBytes = mStream.ToArray();
                            }
                            img.Dispose();
                        }
                    }

                    SqlParameter pImageDataBytes = new SqlParameter("@pImageDataBytes", System.Data.SqlDbType.Image);
                    pImageDataBytes.Value = imageDataBytes;


                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var count = objContext.Database.ExecuteSqlCommand("exec SP_CreateUpdateUser @pMode," + "@pUserID,@pPasswordRequired,@pPassword," +
                           "@pTokenExpPeriod,@pIdleTime," +
                          "@pFirstName,@pLastName,@pMiddleInitial,@pEmailID,@pPhone1,@pPhone2," +
                          "@pFax,@pPager,@pOrgGroup,@pProfile,@pLdapUser,@pLdapRole,@pLdapOrg," +
                          "@pTimeRestrictions,@pPwdResetReq,@pLastUpdateUser,@pAccountDisabled," +
                          "@pUserDN,@pEnterpriseSystem,@pImageDataBytes,@StatusCode OUT",
                          pMode, pUserID, pPasswordRequired, pPassword, pTokenExpPeriod, pIdleTime, pFirstName, pLastName,
                          pMiddleInitial, pEmailID, pPhone1, pPhone2, pFax, pPager, pOrgGroup, pProfile, pLdapUser, pLdapRole,
                          pLdapOrg, pTimeRestrictions, pPwdResetReq, pLastUpdateUser, pAccountDisabled, pUserDN, pEnterpriseSystem,
                          pImageDataBytes, pStatusCode);
                    statusCode = long.Parse(pStatusCode.Value.ToString());

                    imageDataBytes = null;

                    filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/userprofileimage/");
                    if (Directory.Exists(filePath))
                    {
                        var pathFiles = Directory.GetFiles(filePath);
                        foreach (var file in pathFiles)
                        {
                            if (file.ToString() == filePath + "default.png")
                            {
                                File.Delete(file.ToString());
                            }
                        }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
                }

                using (ATPAR_REP_CONFIGContext configContext = new ATPAR_REP_CONFIGContext())
                {
                    using (DbContextTransaction trans = configContext.Database.BeginTransaction())
                    {
                        query.Append("UPDATE IzendaUser SET LastName='"+ user.ORG_GROUP_ID + "' WHERE UserName='"+ user.USER_ID + "'");
                        configContext.Database.ExecuteSqlCommand(query.ToString());
                            if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        query.Clear();
                        trans.Commit();
                    }
                }

                return statusCode;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        public long GetUserDetails(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    SqlParameter paramUserId = new SqlParameter("@pUserID", System.Data.SqlDbType.NVarChar);
                    paramUserId.Value = userID;
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var count = objContext.Database.ExecuteSqlCommand("exec sp_GetUserDetails @pUserID", paramUserId);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Users Count " + count); }
                    return count;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }
    }
}

