using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using AtParEncryptionServices;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Repos
{
    public class UserUploadAutomationRepository : IUserUploadAutomationRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        public UserUploadAutomationRepository(ILog log)
        {
            _log = log;
        }

        #region Public Methods

        #region GetProfileID
        public string GetProfileID(string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT PROFILE_ID FROM MT_ATPAR_PROFILE  ");
                    sbSql.Append(" WHERE PROFILE_ID='" + profileID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var strProfile = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "retur profileID " + strProfile); }

                    return strProfile;
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

        # region CheckLDAPUser
        public Tuple<long, bool> CheckLDAPUser(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            long Statuscode = -1;
            bool pblnLDAPCheck = false;
            Tuple<long, bool> tplResult = null;


            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT LDAP_USER FROM MT_ATPAR_USER  ");
                    sbSql.Append(" WHERE USER_ID='" + userID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var strLdapUser = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (strLdapUser == "Y")
                    {
                        pblnLDAPCheck = true;
                    }
                    else
                    {
                        pblnLDAPCheck = false;
                    }
                    Statuscode = AtparStatusCodes.ATPAR_OK;

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "return ldapUser " + strLdapUser); }

                    tplResult = new Tuple<long, bool>(Statuscode, pblnLDAPCheck);
                    return tplResult;
                }

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return tplResult = new Tuple<long, bool>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, pblnLDAPCheck);
            }
            finally
            {
                sbSql = null;
            }

        }
        #endregion

        #region Do_UpdateLoadedUser
        public long Do_UpdateLoadedUser(VM_MT_ATPAR_USER_ADD user, DataRow row, bool updateParameter)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            string strPwd = string.Empty;
            string strHashVal = string.Empty;
            string strEnterpriseSystem = string.Empty;


            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            if (user.PASSHASH_REQUIRED == true)
                            {
                                if (!string.IsNullOrEmpty(user.PASSWORD))
                                {
                                    strPwd = user.PASSWORD + user.USER_ID;
                                    strHashVal = CSHA256.ComputeHash(strPwd);
                                }
                            }
                            SqlParameter[] sqlparams = new SqlParameter[26];

                            sqlparams[0] = new SqlParameter("@pMode", System.Data.SqlDbType.NVarChar);
                            sqlparams[0].Value = Convert.ToInt32(AtParWebEnums.AddEdit_Enum.ADD);

                            sqlparams[1] = new SqlParameter("@pUserID", System.Data.SqlDbType.NVarChar);
                            sqlparams[1].Value = user.USER_ID; //0

                            sqlparams[2] = new SqlParameter("@pPasswordRequired", System.Data.SqlDbType.NVarChar);
                            sqlparams[2].Value = user.PASSHASH_REQUIRED;//17

                            sqlparams[3] = new SqlParameter("@pPassword", System.Data.SqlDbType.NVarChar);
                            sqlparams[3].Value = strHashVal;

                            sqlparams[4] = new SqlParameter("@pTokenExpPeriod", System.Data.SqlDbType.Int);
                            sqlparams[4].Value = user.TOKEN_EXPIRY_PERIOD;//16

                            sqlparams[5] = new SqlParameter("@pIdleTime", System.Data.SqlDbType.Int);
                            sqlparams[5].Value = user.IDLE_TIME;//19

                            sqlparams[6] = new SqlParameter("@pFirstName", System.Data.SqlDbType.NVarChar);
                            sqlparams[6].Value = user.FIRST_NAME;//2

                            sqlparams[7] = new SqlParameter("@pLastName", System.Data.SqlDbType.NVarChar);
                            sqlparams[7].Value = user.LAST_NAME;//3

                            sqlparams[8] = new SqlParameter("@pMiddleInitial", System.Data.SqlDbType.NVarChar);
                            sqlparams[8].Value = user.MIDDLE_INITIAL;//4

                            sqlparams[9] = new SqlParameter("@pEmailID", System.Data.SqlDbType.NVarChar);
                            sqlparams[9].Value = user.EMAIL_ID;//5

                            sqlparams[10] = new SqlParameter("@pPhone1", System.Data.SqlDbType.NVarChar);
                            sqlparams[10].Value = user.PHONE1;//6

                            sqlparams[11] = new SqlParameter("@pPhone2", System.Data.SqlDbType.NVarChar);
                            sqlparams[11].Value = user.PHONE2;//7

                            sqlparams[12] = new SqlParameter("@pFax", System.Data.SqlDbType.NVarChar);
                            sqlparams[12].Value = user.FAX;//8

                            sqlparams[13] = new SqlParameter("@pPager", System.Data.SqlDbType.NVarChar);
                            sqlparams[13].Value = user.PAGER;//9

                            sqlparams[14] = new SqlParameter("@pOrgGroup", System.Data.SqlDbType.NVarChar);
                            sqlparams[14].Value = user.ORG_GROUP_ID;//23

                            sqlparams[15] = new SqlParameter("@pProfile", System.Data.SqlDbType.NVarChar);
                            sqlparams[15].Value = user.PROFILE_ID;//10

                            sqlparams[16] = new SqlParameter("@pLdapUser", System.Data.SqlDbType.NVarChar);
                            sqlparams[16].Value = user.LDAP_USER;//11

                            sqlparams[17] = new SqlParameter("@pLdapRole", System.Data.SqlDbType.NVarChar);
                            sqlparams[17].Value = user.LDAP_ROLE;//12

                            sqlparams[18] = new SqlParameter("@pLdapOrg", System.Data.SqlDbType.NVarChar);
                            sqlparams[18].Value = user.LDAP_ORG;//13

                            sqlparams[19] = new SqlParameter("@pTimeRestrictions", System.Data.SqlDbType.NVarChar);
                            sqlparams[19].Value = user.TIME_RESTRICTIONS;//18

                            sqlparams[20] = new SqlParameter("@pPwdResetReq", System.Data.SqlDbType.NVarChar);
                            sqlparams[20].Value = user.PASSWD_RESET_REQUIRED;//20

                            sqlparams[21] = new SqlParameter("@pLastUpdateUser", System.Data.SqlDbType.NVarChar);
                            sqlparams[21].Value = user.LAST_UPDATE_USER;//14

                            sqlparams[22] = new SqlParameter("@pAccountDisabled", System.Data.SqlDbType.Bit);
                            sqlparams[22].Value = user.ACCOUNT_DISABLED;//24

                            sqlparams[23] = new SqlParameter("@pUserDN", System.Data.SqlDbType.NVarChar);
                            sqlparams[23].Value = user.USERDN;//25

                            sqlparams[24] = new SqlParameter("@pEnterpriseSystem", System.Data.SqlDbType.NVarChar);
                            sqlparams[24].Value = strEnterpriseSystem;

                            sqlparams[25] = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                            sqlparams[25].Direction = System.Data.ParameterDirection.Output;

                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            var count = objContext.Database.ExecuteSqlCommand("exec SP_CreateUpdateUser @pMode,@pUserID,@pPasswordRequired,@pPassword," +
                           "@pTokenExpPeriod,@pIdleTime,@pFirstName, @pLastName," + "@pMiddleInitial,@pEmailID,@pPhone1,@pPhone2," +
                           "@pFax,@pPager,@pOrgGroup,@pProfile,@pLdapUser,@pLdapRole,@pLdapOrg," +
                           "@pTimeRestrictions,@pPwdResetReq,@pLastUpdateUser,@pAccountDisabled," +
                           "@pUserDN,@pEnterpriseSystem,@StatusCode OUT",
                                  sqlparams[0], sqlparams[1], sqlparams[2], sqlparams[3], sqlparams[4], sqlparams[5], sqlparams[6], sqlparams[7], sqlparams[8], sqlparams[9], sqlparams[10], sqlparams[11], sqlparams[12], sqlparams[13], sqlparams[14], sqlparams[15], sqlparams[16], sqlparams[17], sqlparams[18], sqlparams[19], sqlparams[20], sqlparams[21], sqlparams[22], sqlparams[23], sqlparams[24], sqlparams[25]);

                            statusCode = long.Parse(sqlparams[25].Value.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                            if (statusCode == AtparStatusCodes.ATPAR_E_ORG_NOT_EXIST)
                            {
                                trans.Rollback();
                                return statusCode;
                            }
                            else if (statusCode == AtparStatusCodes.ATPAR_E_PROFILE_NOT_EXIST)
                            {
                                trans.Rollback();
                                return statusCode;
                            }
                            else if (statusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                trans.Rollback();
                                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                            }

                            statusCode = SetUserParam(row, user.USER_ID, string.Empty, string.Empty);

                            if (statusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                trans.Rollback();
                                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                            }

                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }

        }

        #endregion

        #region SetUserParam
        public long SetUserParam(DataRow Row, string userID, string clientAddress, string updateUser)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    string strParamVal = string.Empty;
                    string strParamID = string.Empty;

                    foreach (DataColumn dc in Row.Table.Columns)
                    {
                        string strName = dc.ColumnName.ToString();
                        string strAppID = dc.ColumnName.ToString();

                        if (strName == "USER_ID" || strName == "LOC_ID" || strName == "B_UNIT" || strName == "USER_DETAIL" || strName == "ORG_GROUP" || strName == "LDAP" || strName == "PASS_REQ" || strName == "PASS_RESET" || strName == "PASS_LDAP" || strName == "IDLE_TIME" || strName == "SESSION_TIME" || strName == "PROFILE_ID" || strName == "JOB_ID")
                        {
                            continue;
                        }
                        else
                        {
                            strName = strName.Substring(strName.IndexOf("_") + 1);
                            strAppID = strAppID.Substring(0, strAppID.IndexOf("_"));

                            sbSql.Append("UPDATE MT_ATPAR_USER_APP_PARAMETERS SET ");
                            sbSql.Append("PARAMETER_VALUE = '" + Row[dc.ColumnName.ToString()].ToString() + "', ");
                            sbSql.Append("LAST_UPDATE_DATE = '" + DateTime.Now + "', ");
                            sbSql.Append("LAST_UPDATE_USER ='" + updateUser + "',");
                            sbSql.Append("LAST_CLIENT_ADDRESS='" + clientAddress + "' ");
                            sbSql.Append("WHERE APP_ID=" + strAppID + " AND USER_ID='" + userID + "' "); sbSql.Append("AND PARAMETER_ID = '" + strName + "'");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }

                        }
                    }

                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        #endregion

        #region DeleteUserParams
        public long DeleteUserParams(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteUser(userID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        StatusCode = DeleteUserACL(userID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        StatusCode = DeleteUserOrgGroups(userID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        StatusCode = DeleteUserAppParameters(userID, objContext);

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
        private long DeleteUser(string userID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sql = string.Empty;

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sql = "DELETE FROM MT_ATPAR_USER WHERE USER_ID='" + userID + "' ";


                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sql + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sql);

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

                return AtparStatusCodes.ATPAR_OK;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sql + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sql = null;
            }

        }
        private long DeleteUserACL(string userID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sql = string.Empty;

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sql = "DELETE FROM MT_ATPAR_USER_ACL WHERE USER_ID='" + userID + "' ";


                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sql + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sql);

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

                return AtparStatusCodes.ATPAR_OK;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sql + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sql = null;
            }

        }
        private long DeleteUserOrgGroups(string userID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sql = string.Empty;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sql = "DELETE FROM MT_ATPAR_USER_ORG_GROUPS WHERE USER_ID='" + userID + "' ";


                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sql + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sql);

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

                return AtparStatusCodes.ATPAR_OK;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sql + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sql = null;
            }

        }
        private long DeleteUserAppParameters(string userID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sql = string.Empty;

            try
            {


                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sql = "DELETE FROM MT_ATPAR_USER_APP_PARAMETERS WHERE USER_ID='" + userID + "' ";


                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sql + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sql);

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

                return AtparStatusCodes.ATPAR_OK;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sql + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sql = null;
            }

        }

        #endregion

        #region InsertOrgGroups
        public long InsertOrgGroups(string user, List<MT_ATPAR_ORG_GROUPS> lstOrgData)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    foreach (var orgGroup in lstOrgData)
                    {
                        string orgGrpName = orgGroup.ORG_GROUP_NAME;
                        string pevousOrgGroupID = string.Empty;
                        orgGrpName.Replace("'", "''");
                        string orgGroupID = orgGroup.ORG_GROUP_ID;
                        if (orgGroupID != pevousOrgGroupID)
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            sbSql.Append("INSERT INTO MT_ATPAR_ORG_GROUPS(ORG_GROUP_ID,ORG_GROUP_NAME,");
                            sbSql.Append("LAST_UPDATE_DATE,LAST_UPDATE_USER) VALUES('" + orgGroup.ORG_GROUP_ID + "',");
                            sbSql.Append("'" + orgGrpName + "',GETDATE(),'" + user + "')");
                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                            pevousOrgGroupID = orgGroupID;
                            count++;
                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }

                        }

                    }
                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }
        #endregion

        #region UpdateOrgGroups
        public long UpdateOrgGroups(string user, List<MT_ATPAR_ORG_GROUPS> lstOrgData)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    foreach (var orgGroup in lstOrgData)
                    {
                        string orgGrpName = orgGroup.ORG_GROUP_NAME;
                        orgGrpName.Replace("'", "''");
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        sbSql.Append("UPDATE MT_ATPAR_ORG_GROUPS SET ORG_GROUP_NAME='" + orgGroup.ORG_GROUP_NAME + "'");
                        sbSql.Append("LAST_UPDATE_DATE = GETDATE() ,LAST_UPDATE_USER ='" + user + "'");
                        sbSql.Append(" WHERE ORG_GROUP_ID ='" + orgGroup.ORG_GROUP_ID + "'");
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                        }

                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                        count++;
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows updated " + count); }

                    }
                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }
        #endregion

        #region InsertListofOrgBuData
        public long InsertListofOrgBuData(string user, List<MT_ATPAR_ORG_GROUP_BUNITS> lstBuData)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    foreach (var orgBuData in lstBuData)
                    {

                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        sbSql.Append("INSERT INTO MT_ATPAR_ORG_GROUP_BUNITS");
                        sbSql.Append("(BUSINESS_UNIT,ORG_GROUP_ID,BU_TYPE,LAST_UPDATE_DATE,LAST_UPDATE_USERID)");
                        sbSql.Append(" VALUES ('" + orgBuData.BUSINESS_UNIT + "','" + orgBuData.ORG_GROUP_ID + "',");
                        sbSql.Append("'" + orgBuData.BU_TYPE + "','" + DateTime.Now + "','" + user + "')");
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                        }

                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                        count++;
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }



                    }
                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }
        #endregion

        #region InsertOrgBuData
        public long InsertOrgBuData(string user, MT_ATPAR_ORG_GROUP_BUNITS orgBuData)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_ATPAR_ORG_GROUP_BUNITS");
                    sbSql.Append("(BUSINESS_UNIT,ORG_GROUP_ID,BU_TYPE,LAST_UPDATE_DATE,LAST_UPDATE_USERID)");
                    sbSql.Append(" VALUES ('" + orgBuData.BUSINESS_UNIT + "','" + orgBuData.ORG_GROUP_ID + "',");
                    sbSql.Append("'" + orgBuData.BU_TYPE + "','" + DateTime.Now + "','" + user + "')");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }
        #endregion

        #region DeleteOrgBuData
        public long DeleteOrgBuData(string user, MT_ATPAR_ORG_GROUP_BUNITS orgBuData)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE  ");
                    sbSql.Append(" ORG_GROUP_ID ='" + orgBuData.ORG_GROUP_ID + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }
        #endregion

        #region InsertOrgGrpParams
        public long InsertOrgGrpParams(string user, string lotSel, MT_ATPAR_ORG_GROUP_PARAMETERS orgGrpParams)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_ATPAR_ORG_GROUP_PARAMETERS");
                    sbSql.Append("(APP_ID,PARAMETER_ID,PARAMETER_VALUE,ORG_GROUP_ID,LAST_UPDATE_DATE,LAST_UPDATE_USER)");
                    sbSql.Append(" VALUES ('" + orgGrpParams.APP_ID + "','" + orgGrpParams.PARAMETER_ID + "',");
                    sbSql.Append("'" + lotSel + "','" + orgGrpParams.ORG_GROUP_ID + "',");
                    sbSql.Append("GETDATE(),'" + user + "')");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }
        #endregion

        #region UpdateOrgGrpParams
        public long UpdateOrgGrpParams(string user, string lotSel, MT_ATPAR_ORG_GROUP_PARAMETERS orgGrpParams)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_ORG_GROUP_PARAMETERS SET ");
                    sbSql.Append("PARAMETER_VALUE ='" + lotSel + "',LAST_UPDATE_DATE = GETDATE() ,LAST_UPDATE_USER ='" + user + "', ");
                    sbSql.Append("WHERE ORG_GROUP_ID = '" + orgGrpParams.ORG_GROUP_ID + "' AND ");
                    sbSql.Append("APP_ID = '" + orgGrpParams.APP_ID + "' AND ");
                    sbSql.Append("PARAMETER_ID = '" + orgGrpParams.PARAMETER_ID + "' ");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }
        #endregion

        #region GetProfilecount
        public int GetProfilecount(string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string Sql = string.Empty;

            int result = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    Sql = "SELECT COUNT(PROFILE_ID) FROM  MT_ATPAR_PROFILE WHERE PROFILE_ID='" + profileID + "'";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + Sql.ToString() + ":")); }
                    }

                    var cnt = objContext.Database.SqlQuery<int>(Sql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + cnt); }

                    if (cnt != null)
                    {
                        result = cnt[0];
                    }
                    return result;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + Sql); }
                throw ex;
            }
            finally
            {
                Sql = null;
            }
        }

        #endregion

        #region SaveProfileInfo

        public long SaveProfileUsersInfo(string mode, string profileID, string profileDescr, string userID,
          string clientAddr, bool strAlterProfileCtoS, string strEnterpriseSystem, List<MT_ATPAR_PROFILE_APP_ACL> lstProfiles,
          List<MT_ATPAR_PROFILE_MENU> lstMenus, List<MT_ATPAR_PROFILE_PARAMETERS> lstParams,
          List<MT_ATPAR_PROFILE_LIST_VIEW> lstScreenDisplay, bool blnUserUpload = false)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            int intUserExist = 0;
            int intNoofRecords = 0;
            string strEncHash = string.Empty;
            string strHash = string.Empty;
            string strTogglefld = string.Empty;
            string strToggletext = string.Empty;
            string strToggleorder = string.Empty;
            string appID = string.Empty;
            string menuCode = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (strAlterProfileCtoS == true)
                        {
                            List<string> lstUserIDs = GetUserID(profileID);
                            if (lstUserIDs != null)
                            {
                                foreach (var user in lstUserIDs)
                                {
                                    string passHash = CSHA256.ComputeHash(AtParDefns.DEFAULT_EMPTY_PASSWORD + user);
                                    intUserExist = GetCountUsers(strEncHash, user);
                                    if (intUserExist > 0)
                                    {
                                        strHash = CSHA256.ComputeHash("atpar" + user);
                                        statusCode = UpdateUser(strHash, user);

                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                        statusCode = UpdateUserAcl(user);

                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }

                                    }

                                }
                            }


                        }
                        if (mode == "Add")
                        {
                            intNoofRecords = GetCountProfileIDs(profileID);
                            if (intNoofRecords > 0)
                            {
                                trans.Rollback();
                                return AtparStatusCodes.ATPAR_E_PROFILEEXIST;
                            }
                            else
                            {
                                statusCode = InsertProfile(profileID, profileDescr);

                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                                if (lstProfiles != null)
                                {
                                    foreach (var profile in lstProfiles)
                                    {
                                        statusCode = InsertProfileAppAcl(profileID, userID, clientAddr, profile);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                    }
                                }
                                if (lstMenus != null)
                                {
                                    foreach (var menu in lstMenus)
                                    {
                                        statusCode = InsertProfileMenus(profileID, userID, clientAddr, menu);

                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }

                                    }
                                }
                                if (lstParams != null)
                                {
                                    foreach (var param in lstParams)
                                    {
                                        statusCode = InsertProfileParameters(profileID, userID, clientAddr, param);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                    }
                                }
                                if (lstScreenDisplay != null)
                                {
                                    foreach (var screenDisplay in lstScreenDisplay)
                                    {
                                        strToggletext = "";
                                        strToggleorder = "";
                                        strToggletext = screenDisplay.DEFAULT_TOGGLE_TEXT;
                                        strToggleorder = screenDisplay.TOGGLE_ORDER;
                                        if (strToggleorder != "" && strToggletext != "")
                                        {
                                            if (screenDisplay.DISPLAY_FIELD == "Y")
                                            {
                                                strTogglefld = "Y";
                                            }
                                            else
                                            {
                                                strTogglefld = "N";
                                            }

                                        }
                                        else
                                        {
                                            strTogglefld = screenDisplay.TOGGLE_FIELD;
                                        }
                                        statusCode = InsertProfileListView(profileID, userID, strTogglefld, clientAddr, screenDisplay);
                                    }
                                }

                            }

                        }
                        else if (mode == "Edit")
                        {
                            statusCode = UpdateProfile(profileID, profileDescr);
                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
                            }
                            if (lstProfiles != null)
                            {
                                foreach (var profile in lstProfiles)
                                {
                                    appID = profile.APP_ID.ToString();
                                    if (profile.CLIENT_USER == "N" && profile.SERVER_USER == "N")
                                    {
                                        statusCode = DeleteProfileAppAcl(profileID, appID);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                        statusCode = DeleteProfileParameters(profileID, appID);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                        statusCode = UpdateProfileParameters(profileID, userID);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                    }
                                    else
                                    {
                                        intNoofRecords = GetCountProfileAppAcl(profileID, appID);
                                        if (intNoofRecords > 0)
                                        {
                                            statusCode = UpdateProfileAppAcl(profileID, profile);
                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                        else
                                        {
                                            statusCode = InsertProfileAppAcl(profileID, userID, clientAddr, profile);
                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                            if (profile.CLIENT_USER == "N")
                                            {
                                                statusCode = DeleteProfileList(profileID, appID);
                                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                                {
                                                    trans.Rollback();
                                                    return statusCode;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (lstMenus != null)
                            {
                                foreach (var menu in lstMenus)
                                {
                                    appID = menu.APP_ID.ToString();
                                    menuCode = menu.MENU_CODE;

                                    if (menu.CHKSTATUS.ToString() == "N")
                                    {
                                        statusCode = DeleteProfileMenu(profileID, appID, menuCode);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                    }
                                    else
                                    {
                                        intNoofRecords = GetCountProfileAppMenu(profileID, appID, menuCode);
                                        if (intNoofRecords > 0)
                                        {
                                            statusCode = UpdateProfileMenu(profileID, userID, clientAddr, menu);
                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                        else
                                        {
                                            statusCode = InsertProfileMenus(profileID, userID, clientAddr, menu);
                                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                            {
                                                trans.Rollback();
                                                return statusCode;
                                            }
                                        }
                                    }
                                }

                            }
                            if (lstParams != null)
                            {
                                foreach (var param in lstParams)
                                {
                                    appID = param.APP_ID.ToString();
                                    intNoofRecords = GetCountProfileParameters(profileID, appID, param.PARAMETER_ID);
                                    if (intNoofRecords > 0)
                                    {
                                        statusCode = UpdateProfileParams(profileID, userID, clientAddr, param);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                    }
                                    else
                                    {
                                        statusCode = InsertProfileParameters(profileID, userID, clientAddr, param);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                    }
                                }
                            }
                            if (lstScreenDisplay != null)
                            {
                                foreach (var screenDisplay in lstScreenDisplay)
                                {
                                    intNoofRecords = GetCountProfileParameters(profileID, screenDisplay);
                                    strToggletext = "";
                                    strToggleorder = "";
                                    strToggletext = screenDisplay.DEFAULT_TOGGLE_TEXT;
                                    strToggleorder = screenDisplay.TOGGLE_ORDER;
                                    if (strToggleorder != "" && strToggletext != "")
                                    {
                                        if (screenDisplay.DISPLAY_FIELD == "Y")
                                        {
                                            strTogglefld = "Y";
                                        }
                                        else
                                        {
                                            strTogglefld = "N";
                                        }

                                    }
                                    else
                                    {
                                        if (screenDisplay.TOGGLE_FIELD.ToString() == "Y")
                                        {
                                            strTogglefld = GetToggleField(strEnterpriseSystem, screenDisplay);
                                        }
                                        else
                                        {
                                            strTogglefld = screenDisplay.TOGGLE_FIELD.ToString();
                                        }
                                    }
                                    if (intNoofRecords > 0)
                                    {
                                        statusCode = UpdateProfileList(profileID, userID, clientAddr, strTogglefld, screenDisplay);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                    }
                                    else
                                    {
                                        statusCode = InsertProfileListView(profileID, userID, strTogglefld, clientAddr, screenDisplay);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                    }
                                }
                            }
                        }
                        statusCode = UpdateUserParams(profileID, userID, clientAddr, strEnterpriseSystem);
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
        private List<string> GetUserID(string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT USER_ID FROM MT_ATPAR_USER WHERE ");
                    sbSql.Append("PROFILE_ID='" + profileID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstUserIds = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of userDs returned " + lstUserIds.Count); }

                    return lstUserIds;
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

        private int GetCountUsers(string encHash, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(USER_ID) FROM MT_ATPAR_USER WHERE ");
                    sbSql.Append("PASSHASH='" + encHash + "' AND USER_ID='" + userID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).Count();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of rows returned " + count); }

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
        private long UpdateUser(string hash, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_USER SET PASSHASH='" + hash + "'");
                    sbSql.Append(" WHERE USER_ID='" + userID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

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

        private long UpdateUserAcl(string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_USER_ACL SET PASSHASH_REQUIRED = 1, PASSWD_RESET_REQUIRED = 'Y'");
                    sbSql.Append(" WHERE USER_ID='" + userID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of users updated " + count); }

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
        private int GetCountProfileIDs(string profileID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(PROFILE_ID) FROM MT_ATPAR_PROFILE WHERE ");
                    sbSql.Append("PROFILE_ID='" + profileID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).Count();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of rows returned " + count); }

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

        private long InsertProfile(string profileID, string profileDescr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_ATPAR_PROFILE (PROFILE_ID, PROFILE_DESCRIPTION) VALUES ");
                    sbSql.Append("('" + profileID + "','" + profileDescr + "')");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        private long InsertProfileAppAcl(string profileID, string userID, string clientAddr, MT_ATPAR_PROFILE_APP_ACL objProfile)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_ATPAR_PROFILE_APP_ACL(PROFILE_ID, APP_ID,");
                    sbSql.Append("CLIENT_USER, SERVER_USER, LAST_UPDATE_DATE, ");
                    sbSql.Append("LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) VALUES(");
                    sbSql.Append("('" + profileID + "','" + objProfile.APP_ID + "')");
                    sbSql.Append("'" + objProfile.CLIENT_USER + "','" + objProfile.SERVER_USER + "','" + DateTime.Now + "'");
                    sbSql.Append("'" + userID + "','" + clientAddr + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        private long InsertProfileMenus(string profileID, string userID, string clientAddr, MT_ATPAR_PROFILE_MENU objProfileMenu)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_ATPAR_PROFILE_MENU(PROFILE_ID, APP_ID,");
                    sbSql.Append("MENU_CODE, MENU_SEQ_NO, LAST_UPDATE_DATE, ");
                    sbSql.Append("LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) VALUES(");
                    sbSql.Append("('" + profileID + "','" + objProfileMenu.APP_ID + "')");
                    sbSql.Append("'" + objProfileMenu.MENU_CODE + "','" + objProfileMenu.MENU_SEQ_NO + "','" + DateTime.Now + "'");
                    sbSql.Append("'" + userID + "','" + clientAddr + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        private long InsertProfileParameters(string profileID, string userID, string clientAddr, MT_ATPAR_PROFILE_PARAMETERS objProfileParameters)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_ATPAR_PROFILE_PARAMETERS(PROFILE_ID, APP_ID,");
                    sbSql.Append("PARAMETER_ID, PARAMETER_VALUE, LAST_UPDATE_DATE, ");
                    sbSql.Append("LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) VALUES(");
                    sbSql.Append("('" + profileID + "','" + objProfileParameters.APP_ID + "')");
                    sbSql.Append("'" + objProfileParameters.PARAMETER_ID + "','" + objProfileParameters.PARAMETER_VALUE + "','" + DateTime.Now + "'");
                    sbSql.Append("'" + userID + "','" + clientAddr + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }

        private long InsertProfileListView(string profileID, string userID, string togglefld, string clientAddr, MT_ATPAR_PROFILE_LIST_VIEW objProfileList)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO MT_ATPAR_PROFILE_LIST_VIEW(PROFILE_ID, APP_ID, SCREEN_NAME,");
                    sbSql.Append("FIELD_NAME,COLUMN_HEADER, COLUMN_ORDER, COLUMN_WIDTH,");
                    sbSql.Append("DISPLAY_FIELD,TOGGLE_FIELD,DEFAULT_TOGGLE_TEXT,TOGGLE_ORDER,");
                    sbSql.Append("LAST_UPDATE_DATE,LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) VALUES(");
                    sbSql.Append("('" + profileID + "','" + objProfileList.APP_ID + "')");
                    sbSql.Append("'" + objProfileList.SCREEN_NAME + "','" + objProfileList.FIELD_NAME + "',");
                    sbSql.Append("'" + objProfileList.COLUMN_HEADER + "','" + objProfileList.COLUMN_ORDER + "',");
                    sbSql.Append("'" + objProfileList.COLUMN_WIDTH + "','" + objProfileList.DISPLAY_FIELD + "','" + togglefld + "',");
                    sbSql.Append("'" + objProfileList.DEFAULT_TOGGLE_TEXT + "','" + objProfileList.TOGGLE_ORDER + "',");
                    sbSql.Append("'" + DateTime.Now + "','" + userID + "','" + clientAddr + "'");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of rows inserted " + count); }


                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                sbSql = null;
            }

        }
        private long UpdateProfile(string profileID, string profileDescr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_PROFILE SET PROFILE_DESCRIPTION='" + profileDescr + "'");
                    sbSql.Append(" WHERE PROFILE_ID='" + profileID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

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
        private long DeleteProfileAppAcl(string profileID, string appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND APP_ID='" + appID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

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
        private long DeleteProfileParameters(string profileID, string appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_ATPAR_PROFILE_PARAMETERS WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND APP_ID='" + appID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

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
        private long UpdateProfileParameters(string profileID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_PROFILE_PARAMETERS SET LAST_UPDATE_USER ='" + userID + "'");
                    sbSql.Append("LAST_UPDATE_DATE = GETDATE() ");
                    sbSql.Append("WHERE PROFILE_ID='" + profileID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

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

        private int GetCountProfileAppAcl(string profileID, string appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(APP_ID) FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND APP_ID='" + appID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).Count();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of rows returned " + count); }

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

        private long UpdateProfileAppAcl(string profileID, MT_ATPAR_PROFILE_APP_ACL objProfileApp)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_PROFILE_APP_ACL SET ");
                    sbSql.Append(" CLIENT_USER='" + objProfileApp.CLIENT_USER + "',SERVER_USER='" + objProfileApp.SERVER_USER + "',");
                    sbSql.Append("LAST_UPDATE_USER='" + objProfileApp.LAST_UPDATE_USER + "'");
                    sbSql.Append("LAST_UPDATE_DATE='" + DateTime.Now + "'");
                    sbSql.Append("WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND APP_ID='" + objProfileApp.APP_ID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

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

        private long DeleteProfileList(string profileID, string appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_ATPAR_PROFILE_LIST_VIEW WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND APP_ID='" + appID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

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

        private long DeleteProfileMenu(string profileID, string appID, string menuCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_ATPAR_PROFILE_MENU WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND APP_ID='" + appID + "' AND MENU_CODE='" + menuCode + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

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

        private int GetCountProfileAppMenu(string profileID, string appID, string menuCode)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(APP_ID) FROM MT_ATPAR_PROFILE_MENU WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND APP_ID='" + appID + "' AND MENU_CODE='" + menuCode + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).Count();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of rows returned " + count); }

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

        private long UpdateProfileMenu(string profileID, string userID, string clientAddr, MT_ATPAR_PROFILE_MENU objProfileMenu)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_PROFILE_MENU SET ");
                    sbSql.Append(" MENU_SEQ_NO='" + objProfileMenu.MENU_SEQ_NO + "',");
                    sbSql.Append("LAST_UPDATE_USER='" + userID + "'");
                    sbSql.Append("LAST_CLIENT_ADDRESS='" + clientAddr + "'");
                    sbSql.Append("LAST_UPDATE_DATE='" + DateTime.Now + "'");
                    sbSql.Append("WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND APP_ID='" + objProfileMenu.APP_ID + "'");
                    sbSql.Append(" AND MENU_CODE='" + objProfileMenu.MENU_CODE + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

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

        private int GetCountProfileParameters(string profileID, string appID, string paramID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(PARAMETER_ID) FROM MT_ATPAR_PROFILE_PARAMETERS WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND APP_ID='" + appID + "' AND PARAMETER_ID='" + paramID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).Count();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of rows returned " + count); }

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

        private long UpdateProfileParams(string profileID, string userID, string clientAddr, MT_ATPAR_PROFILE_PARAMETERS objProfileParam)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_PROFILE_PARAMETERS SET ");
                    sbSql.Append(" PARAMETER_VALUE ='" + objProfileParam.PARAMETER_VALUE + "',");
                    sbSql.Append("LAST_UPDATE_USER='" + userID + "'");
                    sbSql.Append("LAST_CLIENT_ADDRESS='" + clientAddr + "'");
                    sbSql.Append("LAST_UPDATE_DATE='" + DateTime.Now + "'");
                    sbSql.Append("WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND PARAMETER_ID='" + objProfileParam.PARAMETER_ID + "'");
                    sbSql.Append(" AND APP_ID='" + objProfileParam.APP_ID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of rows updated  " + count); }

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

        private int GetCountProfileParameters(string profileID, MT_ATPAR_PROFILE_LIST_VIEW objProfileView)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(SCREEN_NAME) FROM MT_ATPAR_PROFILE_LIST_VIEW WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND FIELD_NAME='" + objProfileView.FIELD_NAME + "' AND APP_ID='" + objProfileView.APP_ID + "'");
                    sbSql.Append(" AND SCREEN_NAME='" + objProfileView.SCREEN_NAME + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).Count();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of rows returned " + count); }

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

        private string GetToggleField(string enterpriseSystem, MT_ATPAR_PROFILE_LIST_VIEW objProfileView)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT TOGGLE_FIELD FROM MT_ATPAR_LIST_VIEW WHERE ");
                    sbSql.Append("FIELD_NAME='" + objProfileView.FIELD_NAME + "' AND APP_ID='" + objProfileView.APP_ID + "'");
                    sbSql.Append(" AND SCREEN_NAME='" + objProfileView.SCREEN_NAME + "'");
                    sbSql.Append(" AND ENTERPRISE_SYSTEM ='" + enterpriseSystem + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var toggleFld = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToString();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of userDs returned " + toggleFld); }

                    return toggleFld;
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

        private long UpdateProfileList(string profileID, string userID, string clientAddr, string togglefld, MT_ATPAR_PROFILE_LIST_VIEW objProfileList)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_PROFILE_LIST_VIEW SET ");
                    sbSql.Append("COLUMN_HEADER ='" + objProfileList.COLUMN_HEADER + "',");
                    sbSql.Append("COLUMN_ORDER ='" + objProfileList.COLUMN_ORDER + "',");
                    sbSql.Append("COLUMN_WIDTH ='" + objProfileList.COLUMN_WIDTH + "',");
                    sbSql.Append("DISPLAY_FIELD ='" + objProfileList.DISPLAY_FIELD + "',");
                    sbSql.Append("LAST_UPDATE_USER='" + userID + "'");
                    sbSql.Append("LAST_CLIENT_ADDRESS='" + clientAddr + "'");
                    sbSql.Append("LAST_UPDATE_DATE='" + DateTime.Now + "'");
                    sbSql.Append("TOGGLE_FIELD ='" + togglefld + "',");
                    sbSql.Append("DEFAULT_TOGGLE_TEXT ='" + objProfileList.DEFAULT_TOGGLE_TEXT + "',");
                    sbSql.Append("TOGGLE_ORDER ='" + objProfileList.TOGGLE_ORDER + "',");
                    sbSql.Append("WHERE PROFILE_ID='" + profileID + "'");
                    sbSql.Append(" AND SCREEN_NAME='" + objProfileList.SCREEN_NAME + "'");
                    sbSql.Append(" AND FIELD_NAME='" + objProfileList.FIELD_NAME + "'");
                    sbSql.Append(" AND APP_ID='" + objProfileList.APP_ID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of rows updated  " + count); }

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

        private long UpdateUserParams(string profileID, string userID, string clientAddr, string eSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter pProfileID = new SqlParameter("@pProfileID", SqlDbType.NVarChar);
                    pProfileID.Value = profileID;

                    SqlParameter pUserID = new SqlParameter("@UpdateUser", SqlDbType.NVarChar);
                    pUserID.Value = userID;

                    SqlParameter pClientAddr = new SqlParameter("@ClientAddress", SqlDbType.NVarChar);
                    pClientAddr.Value = clientAddr;

                    SqlParameter pSystem = new SqlParameter("@pEnterpriseSystem", SqlDbType.NVarChar);
                    pSystem.Value = eSystem;



                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand("exec SP_UpdateUserAppParams @pProfileID,@UpdateUser,@ClientAddress,@pEnterpriseSystem", pProfileID, pUserID, pClientAddr, pSystem);


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

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

        #endregion
    }
}
