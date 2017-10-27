using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Repos
{
    public class SecurityConfigurationRepository : ISecurityConfigurationRepository
    {
        #region private variables

        private ILog _log;

        #endregion

        #region constructor

        public SecurityConfigurationRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(SecurityConfigurationRepository));
        }

        #endregion

        #region Methods

        public long UpdateSecurityParams(MT_ATPAR_SECURITY_PARAMS securityParams)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL
                        .Append(" UPDATE MT_ATPAR_SECURITY_PARAMS SET ").Append(" PASSWD_MIN_LENGTH = \'")
                        .Append(securityParams.PASSWD_MIN_LENGTH).Append("\',")
                        .Append(" PASSWD_MAX_LENGTH = \'").Append(securityParams.PASSWD_MAX_LENGTH).Append("\',")
                        .Append(" PASSWD_EXP_PERIOD = \'").Append(securityParams.PASSWD_EXP_PERIOD).Append("\',")
                        .Append(" PASSWD_RESET_REQUIRED = \'").Append(securityParams.PASSWD_RESET_REQUIRED).Append("\',")
                        .Append(" MAINTAIN_PASSWD_HISTORY = \'").Append(securityParams.MAINTAIN_PASSWD_HISTORY).Append("\',")
                        .Append(" CHECK_PASSWD_HISTORY = \'").Append(securityParams.CHECK_PASSWD_HISTORY).Append("\',")
                        .Append(" PASS_REQ_HHT_USERS = \'").Append(securityParams.PASS_REQ_HHT_USERS).Append("\',")
                        .Append(" ALLOWED_INVALID_LOGIN_ATTEMPTS = \'").Append(securityParams.ALLOWED_INVALID_LOGIN_ATTEMPTS).Append("\',")
                        .Append(" PASSWD_COMPLEXITY = \'").Append(securityParams.PASSWD_COMPLEXITY).Append("\',")
                        .Append(" MAINTAIN_SECURITY_AUDIT = \'").Append(securityParams.MAINTAIN_SECURITY_AUDIT).Append("\',")
                        .Append(" ALLOW_REG_DEVICES = \'").Append(securityParams.ALLOW_REG_DEVICES).Append("\',")
                        .Append(" LOGIN_HISTORY = \'").Append(securityParams.LOGIN_HISTORY).Append("\',")
                        .Append(" LDAP_PASS_EXP_ALTMSG = \'").Append(securityParams.LDAP_PASS_EXP_ALTMSG).Append("\'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    var passwordList = context.Database.ExecuteSqlCommand(_sbSQL.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : updated successfully  " + passwordList); }

                    return AtparStatusCodes.ATPAR_OK;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }

        }

        #endregion
    }
}
