using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Repos
{
    public class AssignProfileRepository : IAssignProfileRepository
    {
        private ILog _log;
        ICommonRepository _commonRepo;
        public AssignProfileRepository(ILog log, ICommonRepository commonRepo)
        {
            _log = log;
            _commonRepo = commonRepo;
            _log.SetLoggerType(typeof(AssignProfileRepository));
        }

        #region GetSecurityParamVal
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pUserID"></param>
        /// <returns></returns>
        public string GetSecurityParamVal(string userId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strSQL = String.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    strSQL = "SELECT PASS_REQ_HHT_USERS FROM MT_ATPAR_SECURITY_PARAMS ";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + strSQL.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "PASS_REQ_HHT_USERS" };

                    var pwdReq = objContext.Database.SqlQuery<string>(strSQL.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + pwdReq.Count()); }

                    return pwdReq;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + strSQL.ToString()); }
                throw ex;
            }
            finally
            {
                strSQL = string.Empty;
            }
        }
        #endregion

        #region GetProfileUsersInfo
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pUserID"></param>
        /// <param name="pUID"></param>
        /// <param name="pLdap"></param>
        /// <param name="pFName"></param>
        /// <param name="pLOrg"></param>
        /// <param name="pProfileID"></param>
        /// <param name="pOrgGrpId"></param>
        /// <returns></returns>
        public List<VM_MT_ATPAR_PROF_USER> GetProfileUsersInfo(string userID, string uID, string lDap, string fName, string lOrg, string profileID, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            bool blnWhere = false;
            StringBuilder sbSql = new StringBuilder();
            string allOrgGrp = "All";
            string adminProfile = "admin";

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    //sbSql.Append("SELECT A.FIRST_NAME,A.MIDDLE_INITIAL,A.LAST_NAME,( A.USER_ID ) AS USERNAME,").Append(("A.LDAP_ROLE,A.USER_ID AS USER_ID, A.PROFILE_ID, B.ORG_GROUP_ID, A.PASSHASH, C.PASSHASH_REQUIRED FROM "));
                    //sbSql.Append("MT_ATPAR_USER A ");
                    //sbSql.Append("LEFT OUTER JOIN MT_ATPAR_USER_ORG_GROUPS B ON  A.USER_ID = B.USER_ID ").Append(" JOIN MT_ATPAR_USER_ACL C ON A.USER_ID = C.USER_ID AND C.ACCOUNT_DISABLED = 0 ");
                    sbSql.Append("SELECT CASE WHEN (A.MIDDLE_INITIAL IS NULL OR A.MIDDLE_INITIAL=' ' )  THEN (A.FIRST_NAME+' '+A.LAST_NAME+ ' (' + A.USER_ID + ')' ) ELSE(A.FIRST_NAME + ' ' + A.MIDDLE_INITIAL + ' ' + A.LAST_NAME + ' (' + A.USER_ID + ')')  END AS USERNAME, A.LDAP_ROLE,A.USER_ID AS USER_ID, A.PROFILE_ID, B.ORG_GROUP_ID, A.PASSHASH, C.PASSHASH_REQUIRED FROM MT_ATPAR_USER A LEFT OUTER JOIN MT_ATPAR_USER_ORG_GROUPS B ON  A.USER_ID = B.USER_ID JOIN MT_ATPAR_USER_ACL C ON A.USER_ID = C.USER_ID AND C.ACCOUNT_DISABLED = 0 ");

                    if (!string.IsNullOrEmpty(uID) || !string.IsNullOrEmpty(lDap) || !string.IsNullOrEmpty(fName)
                                || !string.IsNullOrEmpty(lOrg) || (((profileID.ToUpper() != adminProfile.ToUpper()) && (orgGrpID.ToUpper() != allOrgGrp.ToUpper()))
                                || (((profileID.ToUpper() != adminProfile.ToUpper()) && (orgGrpID.ToUpper() == allOrgGrp.ToUpper()))
                                || ((profileID.ToUpper() == adminProfile.ToUpper()) && (orgGrpID.ToUpper() != allOrgGrp.ToUpper())))))
                    {
                        sbSql.Append(" WHERE ");
                    }

                    if (profileID.ToUpper() != adminProfile.ToUpper() && orgGrpID.ToUpper() != allOrgGrp.ToUpper())
                    {
                        //sbSql.Append(" B.ORG_GROUP_ID != '").Append(allOrgGrp).Append("' AND A.PROFILE_ID != '");
                        //sbSql.Append(adminProfile).Append("'AND (B.ORG_GROUP_ID = '").Append(orgGrpId).Append("' OR B.ORG_GROUP_ID = '' )");
                        sbSql.Append(" B.ORG_GROUP_ID != ('" + allOrgGrp.ToUpper() + "') AND  A.PROFILE_ID != '" + adminProfile.ToUpper() + "' AND (B.ORG_GROUP_ID = '" + orgGrpID.ToUpper() + "' OR B.ORG_GROUP_ID = '' ) ");
                        blnWhere = true;
                    }
                    else if (profileID.ToUpper() != adminProfile.ToUpper() && orgGrpID.ToUpper() == allOrgGrp.ToUpper())
                    {
                        //sbSql.Append(" A.PROFILE_ID != '").Append(adminProfile).Append("'");
                        sbSql.Append(" A.PROFILE_ID != '" + adminProfile.ToUpper() + "' ");
                        blnWhere = true;
                    }
                    else if (profileID.ToUpper() == adminProfile.ToUpper() && orgGrpID.ToUpper() != allOrgGrp.ToUpper())
                    {
                        //sbSql.Append(" B.ORG_GROUP_ID !=('").Append(allOrgGrp).Append("') ").Append("AND (B.ORG_GROUP_ID ='").Append(orgGrpId).Append("' OR B.ORG_GROUP_ID = '' ) ");
                        sbSql.Append(" B.ORG_GROUP_ID != ('" + allOrgGrp.ToUpper() + "') AND (B.ORG_GROUP_ID ='" + orgGrpID.ToUpper() + "' OR B.ORG_GROUP_ID = '' ) ");
                        blnWhere = true;
                    }

                    if (!string.IsNullOrEmpty(uID))
                    {
                        if (blnWhere)
                        {
                            sbSql.Append(" AND A.USER_ID LIKE '" + uID + "%' ");
                            //sbSql.Append(uId + "%' ");
                        }
                        else
                        {
                            sbSql.Append(" A.USER_ID LIKE '" + uID + "%' ");
                        }
                        blnWhere = true;
                    }

                    if (!string.IsNullOrEmpty(lDap))
                    {
                        if (blnWhere)
                        {
                            sbSql.Append(" AND A.LDAP_ROLE LIKE '" + lDap + "%'");
                            // sbSql.Append(lDap + "%'");
                        }
                        else
                        {
                            sbSql.Append(" A.LDAP_ROLE LIKE '" + lDap + "%'");
                            // sbSql.Append(" A.LDAP_ROLE LIKE '");
                            // sbSql.Append(lDap + "%'");
                        }
                        blnWhere = true;
                    }

                    if (!string.IsNullOrEmpty(fName))
                    {
                        if (blnWhere)
                        {
                            sbSql.Append(" AND A.FIRST_NAME LIKE '" + fName + "%'");
                            //sbSql.Append(fName + "%'");
                        }
                        else
                        {
                            sbSql.Append("A.FIRST_NAME LIKE '" + fName + "%'");
                            //sbSql.Append(" A.FIRST_NAME LIKE '");
                            //sbSql.Append(fName + "%'");
                        }
                        blnWhere = true;
                    }

                    if (!string.IsNullOrEmpty(lOrg))
                    {
                        if (blnWhere)
                        {
                            //sbSql.Append(" AND A.LDAP_ORG LIKE '").Append(lOrg + "%'");
                            sbSql.Append(" AND A.LDAP_ORG LIKE '" + lOrg + "%'");
                        }
                        else
                        {
                            sbSql.Append("A.LDAP_ORG LIKE '" + lOrg + "%'");
                        }
                    }
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var listProfUser = objContext.Database.SqlQuery<VM_MT_ATPAR_PROF_USER>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Records returned : " + listProfUser.Count()); }

                    return listProfUser;
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

        #region SaveProfileUsersInfo
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pListProfUserInfo"></param>
        /// <param name="pProfile"></param>
        /// <param name="pOrgGrp"></param>
        /// <param name="pUID"></param>
        /// <param name="strEnterpriseSystem"></param>
        /// <returns></returns>
        public long SaveProfileUsersInfo(List<VM_MT_ATPAR_USER> lstProfUserInfo, string profile, string orgGrp, string uId, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strSQL = string.Empty;
            string strProfile;
            string strOrg;
            string strUserId;


            using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
            {
                using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                {
                    try
                    {
                        foreach (var item in lstProfUserInfo)
                        {
                            strProfile = profile;
                            strOrg = orgGrp;
                            strUserId = item.USER_ID;
                            if (!string.IsNullOrEmpty(profile))
                            {
                                var count = SelectCountProfileApp(profile, objContext);
                                if (count == 0)
                                {
                                    trans.Rollback();
                                    return AtparStatusCodes.ATPAR_E_NOPRODUCTS_FOR_PROFILE;
                                }
                                else
                                {
                                    var statusCode = UpdateUserParam(item, objContext, profile, uId);
                                    if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                                    }

                                    statusCode = DeleteUserParam(item, objContext);

                                    if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                                    }

                                    var lstParamMaster = SelectUserParamMaster(enterpriseSystem, strProfile, objContext);

                                    foreach (var paramMaster in lstParamMaster)
                                    {
                                        statusCode = InsertUserParam(paramMaster.APP_ID, paramMaster.PARAMETER_ID, paramMaster.PARAMETER_VALUE, strUserId, objContext);

                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                                        }
                                    }
                                }
                            }
                            if (!string.IsNullOrEmpty(strOrg))
                            {
                                strSQL = string.Empty;

                                var orgGrpStatusCode = SelectUserOrgGrps(item, objContext);

                                if (orgGrpStatusCode > 0)
                                {
                                    var updateOrgGrpStatusCode = UpdateOrgGroup(item, objContext, profile, orgGrp, uId);

                                    if (!updateOrgGrpStatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                                    }
                                }
                                else
                                {
                                    var insertOrgGrpStatusCode = InsertOrgGroup(item, objContext, profile, orgGrp, uId);

                                    if (!insertOrgGrpStatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                                    }
                                }
                            }
                        }
                        trans.Commit();
                        return AtparStatusCodes.ATPAR_OK;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + strSQL.ToString()); }
                        trans.Rollback();
                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                    }
                    finally
                    {
                        strSQL = string.Empty;
                    }
                }
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pProfile"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int SelectCountProfileApp(string profile, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            int count;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                //sbSql.Append("SELECT COUNT(APP_ID) FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID ='").Append(pProfile).Append("'");
                sbSql.Append("SELECT COUNT(APP_ID) FROM MT_ATPAR_PROFILE_APP_ACL WHERE PROFILE_ID ='" + profile + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var lstcount = objContext.Database.SqlQuery<int>(sbSql.ToString());
                if (lstcount != null && lstcount.Count() > 0)
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + lstcount.ToList()[0]); }
                    return lstcount.ToList()[0];
                }
                else
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + 0); }
                    return 0;
                }
              

                // return count;
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
        /// 
        /// </summary>
        /// <param name="pListProfUserInfo"></param>
        /// <param name="objContext"></param>
        /// <param name="pProfile"></param>
        /// <param name="pUID"></param>
        /// <returns></returns>
        private long UpdateUserParam(VM_MT_ATPAR_USER profUserInfo, ATPAR_MT_Context objContext, string profile, string uID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string strProfile = profile;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_USER SET ");
                if (profUserInfo.ASSIGN == "N")
                {
                    strProfile = String.Empty;
                }
                else if (profUserInfo.ASSIGN == "Y")
                {
                    profile = strProfile;
                }
                //sbSql.Append(" ").Append("PROFILE_ID='").Append(strProfile).Append("',LAST_UPDATE_USER='").Append(pUID).Append("',LAST_UPDATE_DATE= getDate() WHERE USER_ID='").Append(pListProfUserInfo[0].USER_ID).Append("'");
                sbSql.Append("PROFILE_ID='" + strProfile + "',LAST_UPDATE_USER='" + uID + "', LAST_UPDATE_DATE= getDate() WHERE USER_ID='" + profUserInfo.USER_ID + "'");


                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + count); }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pListProfUserInfo"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long DeleteUserParam(VM_MT_ATPAR_USER profUserInfo, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                //sbSql.Append("DELETE FROM MT_ATPAR_USER_APP_PARAMETERS WHERE  USER_ID ='").Append(pListProfUserInfo[0].USER_ID).Append("'");
                sbSql.Append(" DELETE FROM MT_ATPAR_USER_APP_PARAMETERS WHERE  USER_ID = '" + profUserInfo.USER_ID + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + count); }

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
        /// 
        /// </summary>
        /// <param name="strEnterpriseSystem"></param>
        /// <param name="strProfile"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private List<MT_ATPAR_PARAM_MASTER> SelectUserParamMaster(string enterpriseSystem, string profile, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                //sbSql.Append(" SELECT APP_ID, PARAMETER_ID, DEFAULT_VALUE AS PARAMETER_VALUE FROM MT_ATPAR_PARAM_MASTER WHERE PARAMETER_LEVEL='USER' AND ENTERPRISE_SYSTEM = '").Append(enterpriseSystem).Append("' AND APP_ID IN (SELECT DISTINCT APP_ID FROM MT_ATPAR_PROFILE_APP_ACL WHERE (CLIENT_USER='Y' OR SERVER_USER='Y') AND PROFILE_ID = '").Append(profile).Append("')");

                sbSql.Append(" SELECT APP_ID, PARAMETER_ID, DEFAULT_VALUE AS PARAMETER_VALUE FROM MT_ATPAR_PARAM_MASTER  WHERE PARAMETER_LEVEL='USER' AND ENTERPRISE_SYSTEM = '" + enterpriseSystem + "' AND APP_ID IN (SELECT DISTINCT APP_ID FROM MT_ATPAR_PROFILE_APP_ACL  WHERE (CLIENT_USER='Y' OR SERVER_USER='Y') AND PROFILE_ID = '" + profile + "')");

                string[] fields = new string[] { "APP_ID", "PARAMETER_ID", "PARAMETER_VALUE" };

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var lstParamMaster = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PARAM_MASTER>(fields, sbSql.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of User ProfileAppACL Returned: " + lstParamMaster.Count()); }

                return lstParamMaster;
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
        /// 
        /// </summary>
        /// <param name="pListUserMasterInfo"></param>
        /// <param name="strUserId"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertUserParam(short appID, string parameterID, string parameterValue, string strUserID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                //sbSql.Append("INSERT INTO MT_ATPAR_USER_APP_PARAMETERS (APP_ID, USER_ID, PARAMETER_ID, PARAMETER_VALUE, LAST_UPDATE_DATE, LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) VALUES('").Append(appId).Append("', '").Append(strUserId).Append("', '").Append(parameterId).Append("','").Append(parameterValue).Append("',GETDATE(),'").Append("'',''");

                sbSql.Append("INSERT INTO MT_ATPAR_USER_APP_PARAMETERS (APP_ID, USER_ID, PARAMETER_ID, PARAMETER_VALUE,  LAST_UPDATE_DATE, LAST_UPDATE_USER, LAST_CLIENT_ADDRESS) VALUES('" + appID + "',  '" + strUserID + "', '" + parameterID + "', '" + parameterValue + "', GETDATE(),'','')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + count); }

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
        /// 
        /// </summary>
        /// <param name="pListProfUserInfo"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int SelectUserOrgGrps(VM_MT_ATPAR_USER profUserInfo, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                //sbSql.Append("SELECT COUNT(USER_ID) FROM MT_ATPAR_USER_ORG_GROUPS WHERE USER_ID = '").Append(listProfUserInfo.USER_ID).Append("'");
                sbSql.Append(" SELECT COUNT(USER_ID) FROM MT_ATPAR_USER_ORG_GROUPS WHERE USER_ID = '" + profUserInfo.USER_ID + "' ");
                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var orgGrpList = objContext.Database.SqlQuery<int>(sbSql.ToString());
                if(orgGrpList!=null&& orgGrpList.ToList().Count>0)
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of User ProfileAppACL Returned: " + orgGrpList.ToList()[0]); }
                    return orgGrpList.ToList()[0];
                }
                else
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of User ProfileAppACL Returned: " + 0); }
                    return 0;
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
        /// 
        /// </summary>
        /// <param name="pListProfUserInfo"></param>
        /// <param name="objContext"></param>
        /// <param name="pProfile"></param>
        /// <param name="pOrgGrp"></param>
        /// <param name="pUID"></param>
        /// <returns></returns>
        private long UpdateOrgGroup(VM_MT_ATPAR_USER profUserInfo, ATPAR_MT_Context objContext, string profile, string orgGrp, string uID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            string strOrg = orgGrp;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_USER_ORG_GROUPS SET ");

                if (profUserInfo.ASSIGN == "N")
                {
                    strOrg = string.Empty;
                }
                else if (profUserInfo.ASSIGN == "Y")
                {
                    orgGrp = strOrg;
                }
                //sbSql.Append("ORG_GROUP_ID='").Append(strOrg).Append("'LAST_UPDATE_USER='").Append(uID).Append("'LAST_UPDATE_DATE= getDate() WHERE USER_ID='").Append(listProfUserInfo.USER_ID).Append("'"));
                sbSql.Append("ORG_GROUP_ID='" + strOrg + "',LAST_UPDATE_USER='" + uID + "', LAST_UPDATE_DATE= getDate() WHERE USER_ID='" + profUserInfo.USER_ID + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + count); }

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
        /// 
        /// </summary>
        /// <param name="pListProfUserInfo"></param>
        /// <param name="objContext"></param>
        /// <param name="pProfile"></param>
        /// <param name="pOrgGrp"></param>
        /// <param name="pUID"></param>
        /// <returns></returns>
        private long InsertOrgGroup(VM_MT_ATPAR_USER profUserInfo, ATPAR_MT_Context objContext, string lrofile, string orgGrp, string uID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            string strOrg = orgGrp;

            try
            {
                if (profUserInfo.ASSIGN == "N")
                {
                    strOrg = string.Empty;
                }
                else if (profUserInfo.ASSIGN == "Y")
                {
                    orgGrp = strOrg;
                }
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" INSERT INTO MT_ATPAR_USER_ORG_GROUPS (USER_ID,ORG_GROUP_ID,LAST_UPDATE_DATE, LAST_UPDATE_USER) VALUES('").Append(profUserInfo.USER_ID).Append("','").Append(strOrg).Append("',GETDATE(),'").Append(uID).Append("')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Count " + count); }

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
