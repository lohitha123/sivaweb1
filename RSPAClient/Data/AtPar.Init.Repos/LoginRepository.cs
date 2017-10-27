using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Newtonsoft.Json.Linq;

namespace AtPar.Init.Repos
{
    public class LoginRepository : ILoginRepository
    {
        ILog _log;

        public LoginRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(LoginRepository));
        }

        #region ValidateSystem
        /// <summary>
        /// To validate System
        /// </summary>
        /// <param name="systemID"></param>
        /// <returns></returns>
        public int ValidateSystem(string systemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            int cnt = 0;

            try
            {
                using (ATPAR_MASTER_Context objContext = new ATPAR_MASTER_Context())
                {

                    SqlParameter _sql_param_systemid = new SqlParameter("@SystemId", SqlDbType.NVarChar, 50);
                    _sql_param_systemid.Value = systemID;

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    cnt = objContext.Database.ExecuteSqlCommand("exec ATPAR_SP_VALIDATESYSTEM @SystemId", _sql_param_systemid);

                }

                return cnt;

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }
        #endregion

        #region AllowRegDevices
        /// <summary>
        /// To allow reg devices
        /// </summary>
        /// <returns></returns>
        public int AllowRegDevices()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            int cnt = 0;
            string sql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    //sql = "SELECT CASE WHEN ALLOW_REG_DEVICES='Y' THEN 1 ELSE 0 END FROM MT_ATPAR_SECURITY_PARAMS";

                    //if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    //cnt = objContext.Database.SqlQuery<int>(sql).ToList().FirstOrDefault().Cast<int>();

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var allowRegDevices = objContext.MT_ATPAR_SECURITY_PARAMS.Select(x => x.ALLOW_REG_DEVICES).ToList();

                    cnt = (allowRegDevices.FirstOrDefault() == "Y" ? 1 : 0);

                }

                return cnt;

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }
        #endregion

        #region ValidateDevice
        /// <summary>
        /// To validate device
        /// </summary>
        /// <param name="systemID"></param>
        /// <param name="deviceID"></param>
        /// <returns></returns>
        public int ValidateDevice(string systemID, string deviceID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                int cnt = 0;
                using (ATPAR_MASTER_Context objContext = new ATPAR_MASTER_Context())
                {

                    SqlParameter _sql_param_sysid = new SqlParameter("@SystemId", SqlDbType.NVarChar, 50);
                    _sql_param_sysid.Value = systemID;

                    SqlParameter _sql_param_deviceid = new SqlParameter("@DeviceId", SqlDbType.NVarChar, 50);
                    _sql_param_deviceid.Value = deviceID;


                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    cnt = objContext.Database.ExecuteSqlCommand("exec ATPAR_SP_VALIDATEDEVICE @SystemId,@DeviceId", _sql_param_sysid, _sql_param_deviceid);


                }

                return cnt;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }
        #endregion

        #region CheckUserLogin
        /// <summary>
        /// To check the user login
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="passHash"></param>
        /// <param name="loginType"></param>
        /// <param name="atParDateTime"></param>
        /// <param name="deviceID"></param>
        /// <param name="accessToken"></param>
        /// <param name="SSOByPass"></param>
        /// <returns></returns>
        public MT_ATPAR_USER_PROFILE_APP_ACL_ORG CheckUserLogin(string userName,
                                                                string passHash, int loginType,
                                                                string atParDateTime, string deviceID,
                                                                string accessToken, bool SSOByPass)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode;

            try
            {
                //Here we using MT_ATPAR_USER_PROFILE_APP_ACL_ORG custom entity apart from ref values

                MT_ATPAR_USER_PROFILE_APP_ACL_ORG User = new MT_ATPAR_USER_PROFILE_APP_ACL_ORG();
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    SqlParameter sql_param_userid = new SqlParameter("@UserID", SqlDbType.NVarChar, 20);
                    sql_param_userid.Value = userName;

                    SqlParameter sql_param_logintype = new SqlParameter("@LoginType", SqlDbType.SmallInt);
                    sql_param_logintype.Value = loginType;

                    SqlParameter sql_param_deviceid = new SqlParameter("@DeviceID", SqlDbType.NVarChar, 150);
                    sql_param_deviceid.Value = deviceID;

                    SqlParameter sql_param_passhash = new SqlParameter("@Passhash", SqlDbType.NVarChar, 64);
                    sql_param_passhash.Value = passHash;

                    SqlParameter sql_param_apdatetime = new SqlParameter("@AtParDateTime", SqlDbType.DateTime);
                    //NB-0005446
                    //sql_param_apdatetime.Value = Format(System.DateTime.UtcNow(), ATPAR_LONGDATETIME_24H)
                    sql_param_apdatetime.Value = DateTime.Now;
                    SqlParameter sql_param_ssobypass = new SqlParameter("@SSOBypass", SqlDbType.Bit);
                    sql_param_ssobypass.Value = SSOByPass;

                    SqlParameter sql_param_statuscode = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sql_param_statuscode.Direction = ParameterDirection.Output;

                    SqlParameter sql_param_tokenexpiryperiod = new SqlParameter("@TokenExpiryPeriod", SqlDbType.Int);
                    sql_param_tokenexpiryperiod.Direction = ParameterDirection.Output;

                    SqlParameter sql_param_profileid = new SqlParameter("@ProfileID", SqlDbType.NVarChar, 30);
                    sql_param_profileid.Direction = ParameterDirection.Output;

                    SqlParameter sql_param_orggroupid = new SqlParameter("@OrgGroupID", SqlDbType.NVarChar, 20);
                    sql_param_orggroupid.Direction = ParameterDirection.Output;

                    SqlParameter sql_param_idletime = new SqlParameter("@IdleTime", SqlDbType.Int);
                    sql_param_idletime.Direction = ParameterDirection.Output;

                    SqlParameter sql_param_UserDN = new SqlParameter("@UserDN", SqlDbType.NVarChar, 512);
                    sql_param_UserDN.Direction = ParameterDirection.Output;

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    objContext.Database.ExecuteSqlCommand("exec SP_CheckUserLogin @UserID,@LoginType,@DeviceID," +
                                                                                                        "@Passhash,@AtParDateTime,@SSOBypass," +
                                                                                                        "@StatusCode OUT,@TokenExpiryPeriod OUT," +
                                                                                                        "@ProfileID OUT, @OrgGroupID OUT," +
                                                                                                        "@IdleTime OUT,@UserDN OUT",
                                                                                                         sql_param_userid, sql_param_logintype,
                                                                                                         sql_param_deviceid, sql_param_passhash,
                                                                                                         sql_param_apdatetime, sql_param_ssobypass,
                                                                                                         sql_param_statuscode, sql_param_tokenexpiryperiod,
                                                                                                         sql_param_profileid, sql_param_orggroupid,
                                                                                                         sql_param_idletime, sql_param_UserDN);


                    statusCode = (int)sql_param_statuscode.Value;
                    User.SERVER_STATUS_CODE = statusCode;
                    if ((User.SERVER_STATUS_CODE == AtparStatusCodes.ATPAR_OK) | (User.SERVER_STATUS_CODE == AtparStatusCodes.AUTHENTICATE_AGAINST_LDAP))
                    {
                        User.PROFILE_ID = sql_param_profileid.Value.ToString();
                        User.ORG_GROUP_ID = sql_param_orggroupid.Value.ToString();
                        User.IDLE_TIME = (int)sql_param_idletime.Value;
                        User.TOKEN_EXPIRY_PERIOD = (int)sql_param_tokenexpiryperiod.Value;
                        User.USERDN = sql_param_UserDN.Value.ToString();

                    }

                }

                return User;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }
        #endregion

        #region SaveLoginAttempts
        /// <summary>
        /// To save login attempts
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="deviceID"></param>
        /// <param name="deviceToken"></param>
        /// <param name="reasonCode"></param>
        /// <param name="lastClientAddress"></param>
        public void SaveLoginAttempts(string userID, string deviceID,
                                      string deviceToken, string reasonCode,
                                      string lastClientAddress)
        {
            //log4net.ThreadContext.Properties(LOGPROPERTIES.USERNAME.ToString) = userId;
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int _strLoginHistory = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    SqlParameter sql_param_userid = new SqlParameter("@pUserID", SqlDbType.NVarChar);
                    sql_param_userid.Value = userID;

                    SqlParameter sql_param_deviceid = new SqlParameter("@pDeviceID ", SqlDbType.NVarChar);
                    sql_param_deviceid.Value = deviceID;

                    SqlParameter sql_param_devicetoken = new SqlParameter("@pDeviceToken", SqlDbType.NVarChar);
                    sql_param_devicetoken.Value = deviceToken;

                    SqlParameter sql_param_reasoncode = new SqlParameter("@pReasonCode", SqlDbType.NVarChar);
                    sql_param_reasoncode.Value = reasonCode;

                    SqlParameter sql_param_lastcliaddr = new SqlParameter("@pLastClientAddress", SqlDbType.NVarChar);
                    sql_param_lastcliaddr.Value = lastClientAddress;
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    _strLoginHistory = objContext.Database.ExecuteSqlCommand("exec SP_SaveLoginAttempts @pUserID,@pDeviceID,@pDeviceToken,@pReasonCode,@pLastClientAddress",
                      sql_param_userid, sql_param_deviceid, sql_param_devicetoken, sql_param_reasoncode, sql_param_lastcliaddr);

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }
        #endregion

        #region GetProfileApps
        /// <summary>
        /// To get profile apps
        /// </summary>
        /// <param name="profileID"></param>
        /// <param name="loginType"></param>
        /// <returns></returns>
        public List<int> GetProfileApps(string profileID, int loginType)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            //TODO: need to rewrite this function according to standards
            try
            {
                //RT 4894
                // Dim LoginType As Integer
                // Get the applications this token(user/profile) is allowed access to
                //TODO: ideally this should be generated as xml from sql server and passed directly to the callee
                // and this dataset should be combined with one of the other queries and not result in a 3rd call to the DB
                //List<MT_ATPAR_PROFILE_APP_ACL> lstProfiles = new List<MT_ATPAR_PROFILE_APP_ACL>();
                List<int> lstProfiles = null;
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    SqlParameter sql_param_profileid = new SqlParameter("@ProfileID", SqlDbType.NVarChar, 30);
                    sql_param_profileid.Value = profileID;

                    SqlParameter sql_param_logintype = new SqlParameter("@LoginType", SqlDbType.SmallInt);
                    sql_param_logintype.Value = loginType;

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    lstProfiles = objContext.Database.SqlQuery<int>("exec SP_GetProfileApps @ProfileID,@LoginType", sql_param_profileid, sql_param_logintype).ToList();
                }
                return lstProfiles;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }
        #endregion

        #region SaveAccessToken
        /// <summary>
        /// To save access token
        /// </summary>
        /// <param name="currentAccessToken"></param>
        /// <param name="userName"></param>
        /// <param name="passHash"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="deviceID"></param>
        /// <param name="expiryDateTime"></param>
        /// <param name="requestDateTime"></param>
        /// <param name="ldapUser"></param>
        /// <param name="idleTime"></param>
        /// <param name="oldAccessToken"></param>
        /// <param name="profileID"></param>
        public void SaveAccessToken(string currentAccessToken, string userName, string passHash,
                                    string orgGroupID, string deviceID,
                                    DateTime expiryDateTime, DateTime requestDateTime,
                                    string ldapUser, int idleTime,
                                    string oldAccessToken, string profileID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    SqlParameter sql_param_userid = new SqlParameter("@UserID", SqlDbType.NVarChar, 20);
                    sql_param_userid.Value = userName;

                    SqlParameter sql_param_deviceid = new SqlParameter("@DeviceID", SqlDbType.NVarChar, 150);
                    sql_param_deviceid.Value = deviceID;

                    SqlParameter sql_param_expiryDateTime = new SqlParameter("@ExpiryDateTime", SqlDbType.DateTime);
                    sql_param_expiryDateTime.Value = expiryDateTime;

                    SqlParameter sql_param_RequestDateTime = new SqlParameter("@RequestDateTime", SqlDbType.DateTime);
                    sql_param_RequestDateTime.Value = requestDateTime;

                    SqlParameter sql_param_profileid = new SqlParameter("@ProfileID", SqlDbType.NVarChar, 30);
                    sql_param_profileid.Value = profileID;

                    SqlParameter sql_param_idletime = new SqlParameter("@IdleTime", SqlDbType.Int);
                    sql_param_idletime.Value = idleTime;

                    SqlParameter sql_param_accesstoken = new SqlParameter("@AccessToken", SqlDbType.NVarChar, 64);
                    sql_param_accesstoken.Value = currentAccessToken;

                    SqlParameter sql_param_oldaccesstoken = new SqlParameter("@OldAccessToken", SqlDbType.NVarChar, 64);
                    sql_param_oldaccesstoken.Value = oldAccessToken;

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    objContext.Database.ExecuteSqlCommand("exec SP_SaveAccessToken @UserID,@DeviceID,@AccessToken,@ExpiryDateTime,@RequestDateTime,@ProfileID,@IdleTime,@OldAccessToken",
                           sql_param_userid, sql_param_deviceid, sql_param_accesstoken, sql_param_expiryDateTime, sql_param_RequestDateTime, sql_param_profileid,
                           sql_param_idletime, sql_param_oldaccesstoken);
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }
        #endregion

        #region IsValidUser
        /// <summary>
        /// To verify if the user exists or not
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public int IsValidUser(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            //string strSQL = string.Empty;
            int cnt = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    cnt = objContext.MT_ATPAR_USER.Where(x => x.USER_ID.ToUpper() == userID.ToUpper()).Count();

                }
                return cnt;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }
        #endregion

        public long UpdateHostName(string hostName)
        {
            string methodBaseName = string.Format("{0}.{1}", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSql = new StringBuilder();

            List<VM_IZENDA_SYSTEM_SETTINGS> lstsys = new List<VM_IZENDA_SYSTEM_SETTINGS>();
            try
            {
                if (!GetHostUpdateStatus())
                {
                    using (ATPAR_REP_CONFIGContext objcxt = new ATPAR_REP_CONFIGContext())
                    {
                        _sbSql.Append("SELECT Name, Value FROM IzendaSystemSetting");
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }
                        lstsys = objcxt.Database.SqlQuery<VM_IZENDA_SYSTEM_SETTINGS>(_sbSql.ToString()).ToList();

                        if (lstsys.Count > 0)
                        {
                            foreach (var item in lstsys)
                            {
                                if (item.Name == AtParWebEnums.Reporting_System_Settings_Enum.AuthGetAccessTokenUrl.ToString() || item.Name == AtParWebEnums.Reporting_System_Settings_Enum.WebUrl.ToString() ||
                                    item.Name == AtParWebEnums.Reporting_System_Settings_Enum.AuthValidateAccessTokenUrl.ToString())
                                {
                                    string value = item.Value;
                                    Uri uri = new Uri(item.Value.ToString());
                                    string host = uri.Host;
                                    value = hostName + value.Substring(value.IndexOf(host) + host.Count());

                                    using (DbContextTransaction dbTrans = objcxt.Database.BeginTransaction())
                                    {
                                        try
                                        {
                                            _sbSql.Clear();
                                            _sbSql.Append("UPDATE IzendaSystemSetting SET Value='" + value + "' WHERE Name='" + item.Name + "'");
                                            if (!_log.IsDebugEnabled)
                                            {
                                                if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                            }
                                            objcxt.Database.ExecuteSqlCommand(_sbSql.ToString());

                                        }
                                        catch (Exception ex)
                                        {
                                            dbTrans.Rollback();
                                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                                        }
                                        dbTrans.Commit();
                                    }
                                }
                            }
                        }

                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
                else
                {
                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                throw ex;
            }
        }

        private bool GetHostUpdateStatus()
        {
            string methodBaseName = string.Format("{0}.{1}", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSql = new StringBuilder();
            List<MT_ATPAR_REPORTS_SETTINGS> repSettings = new List<MT_ATPAR_REPORTS_SETTINGS>();

            try
            {
                using (ATPAR_MT_Context objcxt = new ATPAR_MT_Context())
                {
                    _sbSql.Append("SELECT NAME,VALUE FROM MT_ATPAR_REPORTS_SETTINGS WHERE NAME='" + AtParWebEnums.MT_Reports_Settings.HOST_UPDATE.ToString() + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    repSettings = objcxt.Database.SqlQuery<MT_ATPAR_REPORTS_SETTINGS>(_sbSql.ToString()).ToList();
                    objcxt.Database.ExecuteSqlCommand(_sbSql.ToString());
                    if (repSettings.Count > 0)
                    {
                        return Convert.ToBoolean(repSettings[0].VALUE);
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                throw ex;
            }
        }

        public long UpdateHostStatus()
        {
            string methodBaseName = string.Format("{0}.{1}", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context atparContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = atparContext.Database.BeginTransaction())
                    {
                        _sbSql.Append("UPDATE MT_ATPAR_REPORTS_SETTINGS SET VALUE='TRUE' WHERE NAME='" + AtParWebEnums.MT_Reports_Settings.HOST_UPDATE.ToString() + "'");
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { atparContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }
                        atparContext.Database.ExecuteSqlCommand(_sbSql.ToString());

                        trans.Commit();
                    }

                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
        }

        public long UpdateCustomFunction()
        {
            string methodBaseName = string.Format("{0}.{1}", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSql = new StringBuilder();

            string value = string.Empty;
            List<VM_IZENDA_SYSTEM_SETTINGS> lstsys = new List<VM_IZENDA_SYSTEM_SETTINGS>();
            try
            {
                if (!GetHostUpdateStatus())
                {
                    using (ATPAR_REP_CONFIGContext objcxt = new ATPAR_REP_CONFIGContext())
                    {
                        _sbSql.Append("SELECT Name, Value FROM IzendaSystemSetting");
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }
                        lstsys = objcxt.Database.SqlQuery<VM_IZENDA_SYSTEM_SETTINGS>(_sbSql.ToString()).ToList();

                        if (lstsys.Count > 0)
                        {
                            foreach (var item in lstsys)
                            {
                                if (item.Name == AtParWebEnums.Reporting_System_Settings_Enum.CustomFunctionFilePath.ToString())
                                {

                                    if (item.Value.Contains(":"))
                                    {
                                        string[] strsplit = item.Value.Split(':');
                                        value = AppDomain.CurrentDomain.BaseDirectory[0] + ":" + strsplit[1];
                                    }
                                    using (DbContextTransaction dbTrans = objcxt.Database.BeginTransaction())
                                    {
                                        try
                                        {
                                            _sbSql.Clear();
                                            _sbSql.Append("UPDATE IzendaSystemSetting SET Value='" + value + "' WHERE Name='" + item.Name + "'");
                                            if (!_log.IsDebugEnabled)
                                            {
                                                if (_log.IsDebugEnabled) { objcxt.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                            }
                                            objcxt.Database.ExecuteSqlCommand(_sbSql.ToString());

                                        }
                                        catch (Exception ex)
                                        {
                                            dbTrans.Rollback();
                                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                                        }
                                        dbTrans.Commit();
                                    }
                                }
                            }
                        }

                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
                else
                {
                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSql.ToString()); }
                throw ex;
            }
        }

        public long InsertingReportingUser( string SystemId, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Guid TenantID = new Guid(AtParDefns.CONST_IZENDA_TENANT_ID); //AtParMT
            Guid RoleId = new Guid(AtParDefns.CONST_IZENDA_ROLE_ID); //AtParMTView
            Guid SecurityStamp = new Guid(AtParDefns.CONST_IZENDA_SECURITY_STAMP);
            string Passhash = AtParDefns.CONST_IZENDA_PASSHASH;  //AtparReports@123
            string jsonPermission = string.Empty;
            List<VM_IZENDA_ROLE_DETAILS> rolesDtls = new List<VM_IZENDA_ROLE_DETAILS>();
            var count = 0;
            var isuserexists = 0;
            StringBuilder sbSql = new StringBuilder();
            VM_MT_ATPAR_USER_ADD User = new VM_MT_ATPAR_USER_ADD();
            try
            {
                using (ATPAR_MT_Context mtContext = new ATPAR_MT_Context())
                {
                    sbSql.Clear();
                    sbSql.Append("SELECT A.FIRST_NAME, B.ORG_GROUP_ID FROM MT_ATPAR_USER A JOIN MT_ATPAR_USER_ORG_GROUPS B ON A.USER_ID=B.USER_ID AND A.USER_ID='"+ userID + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { mtContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var fields = new[] { "FIRST_NAME", "ORG_GROUP_ID" };
                    mtContext.Database.CommandTimeout = 0;
                    User = mtContext.Database.DifferedExecuteQuery<VM_MT_ATPAR_USER_ADD>(fields, sbSql.ToString()).FirstOrDefault();

                }

                using (ATPAR_REP_CONFIGContext configContext = new ATPAR_REP_CONFIGContext())
                {
                    sbSql.Clear();
                    sbSql.Append("SELECT COUNT(*) FROM IzendaUser WHERE UserName='" + userID + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    configContext.Database.CommandTimeout = 0;
                    isuserexists = configContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();


                    if (isuserexists == 0)
                    {
                        sbSql.Clear();
                        sbSql.Append("SELECT Id, PermissionData FROM IzendaRole WHERE TenantId='" + TenantID + "'");

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }
                        configContext.Database.CommandTimeout = 0;
                        rolesDtls = configContext.Database.SqlQuery<VM_IZENDA_ROLE_DETAILS>(sbSql.ToString()).ToList();

                        using (DbContextTransaction configTrans = configContext.Database.BeginTransaction())
                        {
                            Guid Userid = Guid.NewGuid();
                            sbSql.Clear();

                            //inserting users to Izenda Users Table
                            sbSql.Append("INSERT INTO IzendaUser (Id, UserName, FirstName, LastName, PasswordHash, PasswordSalt, TenantId, Version, ");
                            sbSql.Append(" Created, CreatedBy, Modified, ModifiedBy, EmailAddress, CurrentTokenHash, Active, Deleted, DataOffset, ");
                            sbSql.Append(" TimestampOffset, InitPassword, RetryLoginTime, LastTimeAccessed, PasswordLastChanged, Locked, LockedDate, CultureName, DateFormat, SystemAdmin, ");
                            sbSql.Append(" SecurityQuestionLastChanged, NumberOfFailedSecurityQuestion) VALUES (");
                            sbSql.Append("'" + Userid + "','" + userID + "','" + User.FIRST_NAME.Replace("'", "''") + "','" + User.ORG_GROUP_ID + "', NULL, NULL,");
                            sbSql.Append(" '" + TenantID + "', 1, NULL ,NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL,");
                            sbSql.Append(" 'MM/DD/YYYY', 0, NULL, NULL)");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }
                            configContext.Database.CommandTimeout = 0;
                            count = configContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            sbSql.Clear();
                            //inserting users to Izenda Users Role Table
                            sbSql.Append("INSERT INTO IzendaUserRole(Id, UserId, RoleId, Version, Deleted, Created, CreatedBy, Modified, ModifiedBy) VALUES(");
                            sbSql.Append("NEWID(),'" + Userid + "','" + RoleId + "',1,0,GETDATE(),'System Admin',GETDATE(),'System Admin')");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }
                            configContext.Database.CommandTimeout = 0;
                            count = configContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            sbSql.Clear();

                            //Adding users to Json Object
                            for (int j = 0; j <= rolesDtls.Count - 1; j++)
                            {
                                User user = new User();
                                VM_IZENDA_ROLE item = new VM_IZENDA_ROLE();

                                jsonPermission = rolesDtls[j].PermissionData.ToString();
                                JObject jsonobj = JObject.Parse(jsonPermission);
                                user.id = Userid.ToString();
                                user.status = 3;
                                user.createdBy = "System Admin";
                                user.inserted = true;
                                item = jsonobj.ToObject<VM_IZENDA_ROLE>();
                                JArray juser = (JArray)jsonobj["access"]["accessLimits"]["value"][0]["users"];
                                juser.Add(JToken.FromObject(user));
                                rolesDtls[j].PermissionData = jsonobj.ToString(Newtonsoft.Json.Formatting.None);
                                //Updating permissiondata into Izenda Role Table
                                sbSql.Append("UPDATE IzendaRole SET PermissionData='" + jsonobj.ToString(Newtonsoft.Json.Formatting.None) + "' WHERE Id='" + rolesDtls[j].Id + "'");

                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                }
                                configContext.Database.CommandTimeout = 0;
                                count = configContext.Database.ExecuteSqlCommand(sbSql.ToString());

                                sbSql.Clear();
                            }

                            //Updating systemId into Izenda Tenant Table
                            sbSql.Clear();
                            sbSql.Append("UPDATE IzendaTenant SET Description='" + SystemId + "' WHERE Id='" + TenantID + "'");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { configContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }
                            configContext.Database.CommandTimeout = 0;
                            count = configContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            sbSql.Clear();
                            configTrans.Commit();
                        }
                    }
                }

                using (ATPAR_REP_STARTERContext strContext = new ATPAR_REP_STARTERContext())
                {
                    sbSql.Clear();

                    sbSql.Append("SELECT COUNT(*) FROM AspNetUsers WHERE UserName='" + userID + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { strContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    strContext.Database.CommandTimeout = 0;
                    isuserexists = strContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();
                    if (isuserexists == 0)
                    {
                        using (DbContextTransaction strTrans = strContext.Database.BeginTransaction())
                        {
                            sbSql.Clear();
                            sbSql.Append("INSERT INTO AspNetUsers (Id, Email, EmailConfirmed, PasswordHash, SecurityStamp, PhoneNumber, ");
                            sbSql.Append(" PhoneNumberConfirmed, TwoFactorEnabled, LockoutEndDateUtc, LockoutEnabled, AccessFailedCount, UserName, TenantId)  ");
                            sbSql.Append(" VALUES (");
                            sbSql.Append("NEWID(),'" + userID + "',0,'" + Passhash + "','" + SecurityStamp + "','',0,0,NULL,0,0,");
                            sbSql.Append("'" + userID + "',2)");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { strContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }
                            strContext.Database.CommandTimeout = 0;
                            count = strContext.Database.ExecuteSqlCommand(sbSql.ToString());
                            strTrans.Commit();
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

        public bool IsServerUser(string UserId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    _sbSQL.Append("SELECT COUNT(*) FROM MT_ATPAR_USER U JOIN MT_ATPAR_PROFILE_APP_ACL P ON U.PROFILE_ID = P.PROFILE_ID AND ");
                    _sbSQL.Append(" U.USER_ID = '"+ UserId +"' AND P.PROFILE_ID NOT IN('ADMIN', 'BATCH_PR', 'VENDOR') AND SERVER_USER = 'Y' ");

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
    }
}
