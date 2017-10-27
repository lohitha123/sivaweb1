using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtParEncryptionServices;
using System.Web;
using System.IO;
using System.Drawing;
using Newtonsoft.Json.Linq;

namespace AtPar.Init.Repos
{
    public class AddUserRepository : IAddUserRepository
    {
        ILog _log;

        public AddUserRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(AddUserRepository));
        }

        #region CheckUser
        /// <summary>
        /// To check user
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public int CheckUser(string userID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var Count = objContext.MT_ATPAR_USER.Count(c => c.USER_ID == userID);


                    return Count;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }
        #endregion

        #region CheckProfileAppACL
        /// <summary>
        /// To check profileAppACL
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="profileID"></param>
        /// <param name="accessType"></param>
        /// <returns></returns>
        public int CheckProfileAppACL(string userID, string profileID, int accessType)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSql.Append("SELECT COUNT(APP_ID) FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='" + profileID + "'");
                    if (accessType == Convert.ToInt32(AtParWebEnums.ClientType.WEB))
                    {
                        sbSql.Append(" AND SERVER_USER='Y'");
                    }
                    else if (accessType == Convert.ToInt32(AtParWebEnums.ClientType.HHT))
                    {
                        sbSql.Append(" AND CLIENT_USER='Y'");
                    }
                    var Count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();
                    return Count;
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

        #region AddUser
        /// <summary>
        /// To add an user
        /// </summary>
        /// <param name="user"></param>
        /// <param name="strEnterpriseSystem"></param>
        /// <returns></returns>
        public long AddUser(VM_MT_ATPAR_USER_ADD user, string strEnterpriseSystem)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode;
            string strPwd = string.Empty;
            string strHashVal = string.Empty;
            var repcontext = new ATPAR_REP_CONFIGContext();
            var startercontext = new ATPAR_REP_STARTERContext();
            string sbSql = string.Empty;

            if (!repcontext.Database.Exists() & !startercontext.Database.Exists())
            {

                return AtparStatusCodes.ATPAR_E_USERCONFIG;
            }

            if (string.IsNullOrEmpty(strEnterpriseSystem))
            {
                strEnterpriseSystem = string.Empty;

            }

            if (!string.IsNullOrEmpty(user.PASSWORD))
            {
                strPwd = user.PASSWORD + user.USER_ID;
            }
            else
            {
                strPwd = AtParDefns.DEFAULT_EMPTY_PASSWORD + user.USER_ID;
            }
          
            strHashVal = CSHA256.ComputeHash(strPwd);

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter pMode = new SqlParameter("@pMode", System.Data.SqlDbType.NVarChar);
                    pMode.Value = Convert.ToInt32(AtParWebEnums.AddEdit_Enum.ADD);

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
                    pEnterpriseSystem.Value = strEnterpriseSystem;

                    SqlParameter pStatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                    pStatusCode.Direction = System.Data.ParameterDirection.Output;


                    byte[] imageDataBytes = null;
                    var filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/userprofileimage/");

                    if (!Directory.Exists(filePath))
                    {
                        filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/users/");
                    }
                    else
                    {
                        if (Directory.GetFiles(filePath).Count() == 0)
                        {
                            filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/users/");
                        }
                    }

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

                    SqlParameter pImageDataBytes = new SqlParameter("@pImageDataBytes", System.Data.SqlDbType.Image);
                    pImageDataBytes.Value = imageDataBytes;

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    
                    object[] parameters = { pMode, pUserID, pPasswordRequired, pPassword, pTokenExpPeriod, pIdleTime, pFirstName, pLastName,
                          pMiddleInitial, pEmailID, pPhone1, pPhone2, pFax, pPager, pOrgGroup, pProfile, pLdapUser, pLdapRole,
                          pLdapOrg, pTimeRestrictions, pPwdResetReq, pLastUpdateUser, pAccountDisabled, pUserDN, pEnterpriseSystem,
                          pImageDataBytes, pStatusCode };

                    sbSql = "EXEC SP_CreateUpdateUser @pMode," + "@pUserID,@pPasswordRequired,@pPassword," +
                           "@pTokenExpPeriod,@pIdleTime," +
                          "@pFirstName,@pLastName,@pMiddleInitial,@pEmailID,@pPhone1,@pPhone2," +
                          "@pFax,@pPager,@pOrgGroup,@pProfile,@pLdapUser,@pLdapRole,@pLdapOrg," +
                          "@pTimeRestrictions,@pPwdResetReq,@pLastUpdateUser,@pAccountDisabled," +
                          "@pUserDN,@pEnterpriseSystem,@pImageDataBytes,@StatusCode OUT";

                    var count = 0;
                    count = objContext.Database.ExecuteSqlCommand(TransactionalBehavior.DoNotEnsureTransaction, sbSql, parameters);

                    statusCode = long.Parse(pStatusCode.Value.ToString());

                    filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/userprofileimage/");
                    if (Directory.Exists(filePath))
                    {
                        pathFiles = Directory.GetFiles(filePath);
                        foreach (var file in pathFiles)
                        {
                            if (file.ToString() == filePath + "default.png")
                            {
                                File.Delete(file.ToString());
                            }
                        }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }


                }
                return statusCode;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }


        public long InsertRegReportUser(VM_MT_ATPAR_USER_ADD User)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string Userid = string.Empty;
            string FirstName = string.Empty;
            string LastName = string.Empty;
            long status = -1;

            try
            {
                if (!string.IsNullOrEmpty(User.USER_ID))
                {
                    Userid = User.USER_ID;

                }
                else
                {
                    Userid = string.Empty;
                }


                if (!string.IsNullOrEmpty(User.FIRST_NAME))
                {
                    FirstName = User.FIRST_NAME;

                }
                else
                {
                    FirstName = string.Empty;
                }

                if (!string.IsNullOrEmpty(User.ORG_GROUP_ID))
                {
                    LastName = User.ORG_GROUP_ID;

                }
                else
                {
                    LastName = string.Empty;
                }

                status = InsertReportUsers(Userid, FirstName, LastName);
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public long InsertLadapReportUser(List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers, string orgGrpId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string Userid = string.Empty;
            string FirstName = string.Empty;
            string LastName = string.Empty;
            long status = -1;

            try
            {
                if (lstLdapUsers.Count > 0)
                {
                    for (int i = 0; i < lstLdapUsers.Count; i++)
                    {
                        if (!string.IsNullOrEmpty(lstLdapUsers[i].USER_ID))
                        {
                            Userid = lstLdapUsers[i].USER_ID;

                        }
                        else
                        {
                            Userid = string.Empty;
                        }


                        if (!string.IsNullOrEmpty(lstLdapUsers[i].FIRST_NAME))
                        {
                            FirstName = lstLdapUsers[i].FIRST_NAME;

                        }
                        else
                        {
                            FirstName = string.Empty;
                        }

                        if (!string.IsNullOrEmpty(orgGrpId))
                        {
                            LastName = orgGrpId;

                        }
                        else
                        {
                            LastName = string.Empty;
                        }

                        status = InsertReportUsers(Userid, FirstName, LastName);

                        Userid = string.Empty;
                        FirstName = string.Empty;
                        LastName = string.Empty;

                    }
                }
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public bool IsServerProfile(string ProfileId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    _sbSQL.Append("SELECT COUNT(*) FROM MT_ATPAR_PROFILE_APP_ACL ");
                    _sbSQL.Append(" WHERE PROFILE_ID ='"+ ProfileId + "' ");
                    _sbSQL.Append(" AND PROFILE_ID NOT IN('ADMIN', 'BATCH_PR', 'VENDOR') AND SERVER_USER = 'Y'");

                    int cnt = objContext.Database.SqlQuery<int>(_sbSQL.ToString()).FirstOrDefault();

                    return cnt > 0 ? true : false;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                throw;
            }
        }

        private long InsertReportUsers(string User_Id, string FName, string LName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Guid TenantID = new Guid("3E4B90D8-63B9-48A6-BDD0-C3AF81AC04D5"); //AtParMT
            Guid RoleId = new Guid("EA98B2CA-6AC7-40F7-BBF2-EBD0E3184C25"); //AtParMTView
            Guid SecurityStamp = new Guid("582f98f4-7d38-4fc8-ae96-230b4c7a157b");
            string Passhash = "AMOkjq87OTk0RIPMD1unGf0V0C9LN4aDVadcZ2XBTd7FdY8f5Z6SKlikkLPv1nDwHQ==";  //AtparReports@123
            string jsonPermission = string.Empty;
            VM_IZENDA_ROLE item6 = new VM_IZENDA_ROLE();
            List<VM_IZENDA_ROLE_DETAILS> roleDetails = new List<VM_IZENDA_ROLE_DETAILS>();

            int count = 0;
            StringBuilder sbSql = new StringBuilder();
            try
            {

                using (ATPAR_REP_CONFIGContext configContext = new ATPAR_REP_CONFIGContext())
                {
                    using (DbContextTransaction configTrans = configContext.Database.BeginTransaction())
                    {
                        //Getting the json object from Roles Table
                        sbSql.Append("SELECT Id, PermissionData FROM IzendaRole WHERE TenantId='3E4B90D8-63B9-48A6-BDD0-C3AF81AC04D5'");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }
                        roleDetails = configContext.Database.SqlQuery<VM_IZENDA_ROLE_DETAILS>(sbSql.ToString()).ToList();
                        //var permissiondata = configContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();
                        //jsonPermission = permissiondata[0].ToString();
                        //JObject jsonobj = JObject.Parse(jsonPermission);

                        sbSql.Clear();
                        //IZENDAUSER Insert
                        Guid Userid = Guid.NewGuid();
                        User user = new User();

                        sbSql.Append("INSERT INTO IzendaUser (Id, UserName, FirstName, LastName, PasswordHash, PasswordSalt, TenantId, Version, ");
                        sbSql.Append(" Created, CreatedBy, Modified, ModifiedBy, EmailAddress, CurrentTokenHash, Active, Deleted, DataOffset, ");
                        sbSql.Append(" TimestampOffset, InitPassword, RetryLoginTime, LastTimeAccessed, PasswordLastChanged, Locked, LockedDate, CultureName, DateFormat, SystemAdmin, ");
                        sbSql.Append(" SecurityQuestionLastChanged, NumberOfFailedSecurityQuestion) VALUES (");
                        sbSql.Append("'" + Userid + "','" + User_Id + "','" + FName.Replace("'", "''") + "','" + LName + "', NULL, NULL,");
                        sbSql.Append(" '" + TenantID + "', 1, NULL ,NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL,");
                        sbSql.Append(" 'MM/DD/YYYY', 0, NULL, NULL)");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        count = configContext.Database.ExecuteSqlCommand(sbSql.ToString());


                        sbSql.Clear();

                        sbSql.Append("INSERT INTO IzendaUserRole(Id, UserId, RoleId, Version, Deleted, Created, CreatedBy, Modified, ModifiedBy) VALUES(");
                        sbSql.Append("NEWID(),'" + Userid + "','" + RoleId + "',1,0,GETDATE(),'System Admin',GETDATE(),'System Admin')");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        count = configContext.Database.ExecuteSqlCommand(sbSql.ToString());

                        sbSql.Clear();

                        //Adding users to Json Object
                        for (int i = 0; i <= roleDetails.Count - 1; i++)
                        {
                            jsonPermission = roleDetails[i].PermissionData.ToString();
                            JObject jsonobj = JObject.Parse(jsonPermission);
                            user.id = Userid.ToString();
                            user.status = 3;
                            user.createdBy = "System Admin";
                            user.inserted = true;
                            item6 = jsonobj.ToObject<VM_IZENDA_ROLE>();
                            JArray juser = (JArray)jsonobj["access"]["accessLimits"]["value"][0]["users"];
                            juser.Add(JToken.FromObject(user));

                            sbSql.Clear();
                            //Updating permissiondata into Izenda Role Table
                            sbSql.Append("UPDATE IzendaRole SET PermissionData='" + jsonobj.ToString(Newtonsoft.Json.Formatting.None) + "' WHERE Id='" + roleDetails[i].Id + "'");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }

                            count = configContext.Database.ExecuteSqlCommand(sbSql.ToString());
                        }

                        configTrans.Commit();

                    }

                }

                using (ATPAR_REP_STARTERContext strContext = new ATPAR_REP_STARTERContext())
                {
                    using (DbContextTransaction strTrans = strContext.Database.BeginTransaction())
                    {

                        sbSql.Clear();

                        sbSql.Append("INSERT INTO AspNetUsers (Id, Email, EmailConfirmed, PasswordHash, SecurityStamp, PhoneNumber, ");
                        sbSql.Append(" PhoneNumberConfirmed, TwoFactorEnabled, LockoutEndDateUtc, LockoutEnabled, AccessFailedCount, UserName, TenantId)  ");
                        sbSql.Append(" VALUES (");
                        sbSql.Append("NEWID(),'" + User_Id + "',0,'" + Passhash + "','" + SecurityStamp + "','',0,0,NULL,0,0,");
                        sbSql.Append("'" + User_Id + "',2)");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { strContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        count = strContext.Database.ExecuteSqlCommand(sbSql.ToString());

                        strTrans.Commit();
                    }
                }

                return AtparStatusCodes.ATPAR_OK;
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

        #region SaveLdapUsers
        /// <summary>
        /// To save ldapUsers
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="sessionTime"></param>
        /// <param name="idleTime"></param>
        /// <param name="orgGrpId"></param>
        /// <param name="profileID"></param>
        /// <param name="lstLdapUsers"></param>
        /// <param name="user"></param>
        /// <param name="strEnterpriseSystem"></param>
        /// <returns></returns>
        public long SaveLdapUsers(string userID, string sessionTime, string idleTime, string orgGrpId, string profileID, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers, string strEnterpriseSystem)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_ATPAR_PARAM_MASTER> lstProfileParams = null;
            if (orgGrpId == null)
            {
                orgGrpId = string.Empty;
            }
            if (profileID == null)
            {
                profileID = string.Empty;
            }
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (lstLdapUsers != null)
                        {
                            if (lstLdapUsers.Count > 1)
                            {
                                long StatusCode = InsertListofUserDetails(profileID, lstLdapUsers, objContext);

                                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return StatusCode;
                                }
                                StatusCode = InsertListofUserAclDetails(sessionTime, idleTime, lstLdapUsers, objContext);

                                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return StatusCode;
                                }
                                StatusCode = InsertListofUserOrgDetails(profileID, orgGrpId, lstLdapUsers, objContext);

                                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return StatusCode;
                                }
                                lstProfileParams = GetUserParams(profileID, strEnterpriseSystem, objContext);

                                if (lstProfileParams.Count > 0)
                                {
                                    StatusCode = InsertListofProfileParams(profileID, orgGrpId, lstLdapUsers, lstProfileParams, objContext);

                                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        return StatusCode;
                                    }

                                }
                            }
                            else
                            {
                                VM_MT_ATPAR_USER_ACL_ADD user = new VM_MT_ATPAR_USER_ACL_ADD();
                                user = lstLdapUsers[0];
                                long StatusCode = InsertUserDetails(profileID, user, objContext);

                                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return StatusCode;
                                }
                                StatusCode = InsertUserAclDetails(sessionTime, idleTime, user, objContext);

                                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return StatusCode;
                                }
                                StatusCode = InsertUserOrgDetails(profileID, orgGrpId, user, objContext);

                                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return StatusCode;
                                }
                                lstProfileParams = GetUserParams(profileID, strEnterpriseSystem, objContext);
                                if (lstProfileParams.Count > 0)
                                {
                                    StatusCode = InsertProfileParams(profileID, orgGrpId, user, lstProfileParams, objContext);

                                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        return StatusCode;
                                    }

                                }

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
        private int GetPwdExp()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql = "SELECT PASSWD_EXP_PERIOD FROM MT_ATPAR_SECURITY_PARAMS";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var intPwdExp = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();
                    return intPwdExp;
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

        private long InsertListofUserDetails(string profileID, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var count = 0;
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var ldapUser in lstLdapUsers)
                {
                    sbSql.Clear();
                    sbSql.Append("INSERT INTO MT_ATPAR_USER (USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL,");
                    sbSql.Append("EMAIL_ID, PHONE1, FAX, CREATE_USER_ID, PROFILE_ID, CREATE_DATE, LDAP_USER,");
                    sbSql.Append("LAST_UPDATE_DATE,LAST_UPDATE_USER, USERDN) VALUES(");
                    sbSql.Append("'" + ldapUser.USER_ID + "',").Append("'"
                        + ldapUser.FIRST_NAME + "',").Append("'"
                        + ldapUser.LAST_NAME + "',").Append("'"
                        + ldapUser.MIDDLE_INITIAL + "',").Append("'"
                        + ldapUser.EMAIL_ID + "',").Append("'"
                        + ldapUser.PHONE1 + "',").Append("'"
                        + ldapUser.FAX + "',").Append("'"
                        + ldapUser.CREATE_USER_ID + "',").Append("'"
                        + profileID + "',").Append("GETDATE(),'Y',GETDATE(),").Append("'"
                        + ldapUser.USER_ID + "',").Append("'"
                        + ldapUser.USERDN + "')");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                    count++;
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

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

        private long InsertListofUserAclDetails(string sessionTime, string idleTime, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int intPwdExp = GetPwdExp();
            var count = 0;

            try
            {
                foreach (var ldapUser in lstLdapUsers)
                {
                    sbSql.Clear();
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSql.Append("INSERT INTO MT_ATPAR_USER_ACL (USER_ID, TOKEN_EXPIRY_PERIOD, LOGIN_ALLOWED,");
                    sbSql.Append("PASSHASH_REQUIRED, TIME_RESTRICTIONS,ACCOUNT_DISABLED, IDLE_TIME,");
                    sbSql.Append("INVALID_LOGIN_ATTEMPTS,PASSWD_RESET_REQUIRED, REPORT_USER,RECORDS_PER_PAGE,");
                    sbSql.Append(" DEFAULT_REPORT_DURATION, PASSWD_UPDATE_DATE, PASSWD_EXPT_DATE) VALUES(");
                    sbSql.Append("'" + ldapUser.USER_ID + "',").Append("'"
                        + sessionTime + "',").Append("1,1,").Append("'"
                        + ldapUser.TIME_RESTRICTIONS + "',").Append("0,").Append("'"
                        + idleTime + "',").Append("0,'N',0,10,10,").Append("'"
                        + DateTime.Now + "',").Append("'"
                        + DateTime.Now.AddDays(intPwdExp) + "')");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                    count++;
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

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

        private long InsertListofUserOrgDetails(string profileID, string orgGrpId, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;
            int intPwdExp = GetPwdExp();
            string _strEnterpriseSystem = string.Empty;
            var count = 0;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                foreach (var ldapUser in lstLdapUsers)
                {
                    sbSql = "INSERT INTO MT_ATPAR_USER_ORG_GROUPS (USER_ID, ORG_GROUP_ID, LAST_UPDATE_DATE, LAST_UPDATE_USER) VALUES('" + ldapUser.USER_ID + "', '" + orgGrpId + "', " + "GETDATE()" + ",'" + ldapUser.CREATE_USER_ID + "')";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                    count++;
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }


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


        private long InsertListofProfileParams(string profileID, string orgGrpId, List<VM_MT_ATPAR_USER_ACL_ADD> lstLdapUsers, List<MT_ATPAR_PARAM_MASTER> lstProfileParams, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;
            int intPwdExp = GetPwdExp();
            string _strEnterpriseSystem = string.Empty;
            var count = 0;
            try
            {

                foreach (var ldapUser in lstLdapUsers)
                {
                    foreach (var profileParam in lstProfileParams)
                    {

                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                        sbSql = "INSERT INTO MT_ATPAR_USER_APP_PARAMETERS (APP_ID, USER_ID, PARAMETER_ID, PARAMETER_VALUE, " + " LAST_UPDATE_DATE, LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) " + " VALUES('" + profileParam.APP_ID + "', '" + ldapUser.USER_ID + "', '" + profileParam.PARAMETER_ID + "'," + " '" + profileParam.DEFAULT_VALUE + "', " + "GETDATE()," + "''," + "'')";

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }
                        objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                        count++;
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

                    }
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
        private long InsertProfileParams(string profileID, string orgGrpId, VM_MT_ATPAR_USER_ACL_ADD user, List<MT_ATPAR_PARAM_MASTER> lstProfileParams, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;
            int intPwdExp = GetPwdExp();
            string _strEnterpriseSystem = string.Empty;
            var count = 0;
            try
            {
                foreach (var profileParam in lstProfileParams)
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSql = "INSERT INTO MT_ATPAR_USER_APP_PARAMETERS (APP_ID, USER_ID, PARAMETER_ID, PARAMETER_VALUE, " + " LAST_UPDATE_DATE, LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) " + " VALUES('" + profileParam.APP_ID + "', '" + user.USER_ID + "', '" + profileParam.PARAMETER_ID + "'," + " '" + profileParam.DEFAULT_VALUE + "', " + "GETDATE()," + "''," + "'')";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                    count++;
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

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

        private long InsertUserDetails(string profileID, VM_MT_ATPAR_USER_ACL_ADD userDtls, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var count = 0;
            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                sbSql.Append("INSERT INTO MT_ATPAR_USER (USER_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL,");
                sbSql.Append("EMAIL_ID, PHONE1, FAX, CREATE_USER_ID, PROFILE_ID, CREATE_DATE, LDAP_USER,");
                sbSql.Append("LAST_UPDATE_DATE,LAST_UPDATE_USER, USERDN) VALUES(");
                sbSql.Append("'" + userDtls.USER_ID + "',").Append("'"
                    + userDtls.FIRST_NAME + "',").Append("'"
                    + userDtls.LAST_NAME + "',").Append("'"
                    + userDtls.MIDDLE_INITIAL + "',").Append("'"
                    + userDtls.EMAIL_ID + "',").Append("'"
                    + userDtls.PHONE1 + "',").Append("'"
                    + userDtls.FAX + "',").Append("'"
                    + userDtls.CREATE_USER_ID + "',").Append("'"
                    + profileID + "',").Append("GETDATE(),'Y',GETDATE(),").Append("'"
                    + userDtls.USER_ID + "',").Append("'"
                    + userDtls.USERDN + "')");
                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                count++;
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

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

        private long InsertUserAclDetails(string sessionTime, string idleTime, VM_MT_ATPAR_USER_ACL_ADD userDtls, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            int intPwdExp = GetPwdExp();
            var count = 0;
            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                sbSql.Append("INSERT INTO MT_ATPAR_USER_ACL (USER_ID, TOKEN_EXPIRY_PERIOD, LOGIN_ALLOWED,");
                sbSql.Append("PASSHASH_REQUIRED, TIME_RESTRICTIONS,ACCOUNT_DISABLED, IDLE_TIME,");
                sbSql.Append("INVALID_LOGIN_ATTEMPTS,PASSWD_RESET_REQUIRED, REPORT_USER,RECORDS_PER_PAGE,");
                sbSql.Append(" DEFAULT_REPORT_DURATION, PASSWD_UPDATE_DATE, PASSWD_EXPT_DATE) VALUES(");
                sbSql.Append("'" + userDtls.USER_ID + "',").Append("'"
                    + sessionTime + "',").Append("1,1,").Append("'"
                    + userDtls.TIME_RESTRICTIONS + "',").Append("0,").Append("'"
                    + idleTime + "',").Append("0,'N',0,10,10,").Append("'"
                    + DateTime.Now + "',").Append("'"
                    + DateTime.Now.AddDays(intPwdExp) + "')");
                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                count++;
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

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
        private long InsertUserOrgDetails(string profileID, string orgGrpId, VM_MT_ATPAR_USER_ACL_ADD userDtls, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;
            int intPwdExp = GetPwdExp();
            string _strEnterpriseSystem = string.Empty;
            var count = 0;
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                sbSql = "INSERT INTO MT_ATPAR_USER_ORG_GROUPS (USER_ID, ORG_GROUP_ID, LAST_UPDATE_DATE, LAST_UPDATE_USER) VALUES('" + userDtls.USER_ID + "', '" + orgGrpId + "', " + "GETDATE()" + ",'" + userDtls.CREATE_USER_ID + "')";

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                count++;
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

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
        private List<MT_ATPAR_PARAM_MASTER> GetUserParams(string profileID, string strEnterpriseSystem, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;
            int intPwdExp = GetPwdExp();

            List<MT_ATPAR_PARAM_MASTER> lstProfileParams = null;

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                sbSql = " SELECT APP_ID, PARAMETER_ID, DEFAULT_VALUE AS PARAMETER_VALUE FROM MT_ATPAR_PARAM_MASTER " + " WHERE PARAMETER_LEVEL='USER' AND ENTERPRISE_SYSTEM = '" + strEnterpriseSystem + "'" + " AND APP_ID IN (SELECT DISTINCT APP_ID FROM MT_ATPAR_PROFILE_APP_ACL " + " WHERE (CLIENT_USER='Y' OR SERVER_USER='Y') AND PROFILE_ID = '" + profileID + "')";

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                var fields = new[] { "APP_ID", "PARAMETER_ID", "DEFAULT_VALUE" };

                lstProfileParams = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PARAM_MASTER>(fields, sbSql.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Records returned :  " + lstProfileParams.Count); }


                return lstProfileParams;



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

        #region GetLdapUsers
        /// <summary>
        /// To get Ldap Users
        /// </summary>
        /// <param name="lstUsers"></param>
        /// <returns></returns>
        public List<MT_ATPAR_USER> GetLdapUsers(List<MT_ATPAR_USER> lstUsers)
        {
            var count = 0;
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            MT_ATPAR_USER objUser = null;
            List<MT_ATPAR_USER> lstLdapUsers = new List<MT_ATPAR_USER>();
            string sbSql = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    foreach (var user in lstUsers)
                    {                           

                        if (!string.IsNullOrEmpty(user.USER_ID))
                        {
                            sbSql = "SELECT COUNT(USER_ID) FROM MT_ATPAR_USER WHERE USER_ID ='" + user.USER_ID.ToUpper() + "'";
                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }
                            var list = objContext.Database.SqlQuery<int>(sbSql);

                            if (list != null && list.ToList().Count> 0)
                            {
                                count = list.ToList()[0];
                            }
                            else
                            {
                                count = 0;
                            }

                        }  

                        if (count == 0)
                        {
                            objUser = new MT_ATPAR_USER();

                            if (string.IsNullOrEmpty(user.USER_ID))
                            {
                                objUser.USER_ID = string.Empty;
                            }
                            else
                            {
                                objUser.USER_ID = user.USER_ID.ToUpper();
                            }
                            objUser.FIRST_NAME = user.FIRST_NAME;
                            objUser.LAST_NAME = user.LAST_NAME;
                            objUser.MIDDLE_INITIAL = user.MIDDLE_INITIAL;
                            objUser.EMAIL_ID = user.EMAIL_ID;
                            objUser.PHONE1 = user.PHONE1;
                            objUser.FAX = user.FAX;
                            objUser.USERDN = user.USERDN;
                            lstLdapUsers.Add(objUser);
                        }
                    }
                    return lstLdapUsers;
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

        public byte[] GetProfileImage(string userID)
        {
            byte[] bytes = null;
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT IMAGE_PATH FROM MT_ATPAR_USER WHERE USER_ID ='" + userID + "'");

                    var list = objContext.Database.SqlQuery<byte>(sbSql.ToString());

                    return bytes;
                }
            }
            catch (Exception ex)
            {
                bytes = null;
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return bytes;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion
    }
}
