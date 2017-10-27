using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Repos
{
   public  class ChangePasswordRepository: IChangePasswordRepository
    {
        private ILog _log;
        public ChangePasswordRepository(ILog log)
        {
            _log = log;
        }

        #region Methods

        public List<string> ChkPasswdHistory(string userID, string passHash)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL.Append("SELECT OLD_PASSHASH  FROM MT_ATPAR_PASSWD_HISTORY WHERE USER_ID=\'"
                        + (userID + "\'"));

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    var oldHashPwds = context.MT_ATPAR_PASSWD_HISTORY.Where(x => x.USER_ID == userID).Select(a => a.OLD_PASSHASH).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " old Passhash count  : " + oldHashPwds.Count); }

                    return oldHashPwds;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        public string UpdatePassword_SelectPassHashByUserId(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL.Append("SELECT PASSHASH FROM MT_ATPAR_USER WHERE USER_ID=\'"
                        + (userID + "\'"));

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    var hashPwd = context.MT_ATPAR_USER.Where(x => x.USER_ID == userID).Select(a => a.PASSHASH).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Pass hash Code : " + hashPwd); }

                    return hashPwd;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                _sbSQL = null;
            }
        }

        public long UpdatePasswdWithoutHintQuest(string hashedNewPwd, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl
                        .Append("UPDATE MT_ATPAR_USER SET PASSHASH = \'" + (hashedNewPwd + "\'"))
                        .Append(" WHERE USER_ID=\'" + (userID + "\'"));

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
                    }

                    var count = context.Database.ExecuteSqlCommand(sbSQl.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "updated successfully : " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public long UpdatePasswdWithHintQuest(string hashedNewPwd, string userID, string hintQ, string hintA)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl.Append("UPDATE MT_ATPAR_USER SET PASSHASH = \'" + (hashedNewPwd + "\'"))

                    .Append(" , HINT_QUESTION = \'" + (hintQ.Replace("\'", "\'\'") + ("\',HINT_ANSWER = \'" + (hintA + " \' "))))

                    .Append(" WHERE USER_ID=\'" + (userID + "\'"));
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
                    }

                    var count = context.Database.ExecuteSqlCommand(sbSQl.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " updated successfully : " + count); }

                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public long UpdateUserACL(string datetime, int pswExpPeriod, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl.Append("UPDATE MT_ATPAR_USER_ACL SET PASSWD_UPDATE_DATE = \'"
                                    + (DateTime.Now + ("\' , PASSWD_RESET_REQUIRED = \'N\'," + (" PASSWD_EXPT_DATE = \'"
                                    + (DateTime.Now.AddDays(pswExpPeriod) + ("\' WHERE USER_ID=\'"
                                    + (userID + "\'")))))));

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSQl.ToString() + ":")); }
                    }

                    var count = context.Database.ExecuteSqlCommand(sbSQl.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " updated successfully : " + count); }

                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public long InsertPasswordHistory(string userID, string hashedNewPwd, string dateTime)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = string.Empty;

            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    // Inserting details into MT_ATPAR_PASSWD_HISTORY
                    _strSQL = ("INSERT INTO MT_ATPAR_PASSWD_HISTORY(USER_ID,OLD_PASSHASH,UPDATE_DATE) VALUES(" + ("\'"
                                + (userID + ("\',\'"
                                + (hashedNewPwd + ("\',\'"
                                + (dateTime + "\')")))))));
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _strSQL.ToString() + ":")); }
                    }

                    var count = context.Database.ExecuteSqlCommand(_strSQL);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " inserted successfully : " + count); }

                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }

        }

        #endregion
    }
}
