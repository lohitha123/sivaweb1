using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace AtPar.Init.Repos
{
    public class ManageOrgIDRepository : IManageOrgIDRepository
    {
        #region Private Variable

        ILog _log;

        #endregion

        #region Constructor

        public ManageOrgIDRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageOrgIDRepository));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the Org Group IDs
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public List<MT_ATPAR_ORG_GROUPS> GetOrgGrpIDs(string userID, string orgGrpID, string name)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_ATPAR_ORG_GROUPS> lstOrgGroups = null;
            string sql = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlparams = new SqlParameter[2];
                    sqlparams[0] = new SqlParameter("@pOrgGrpID", SqlDbType.NVarChar);
                    sqlparams[0].Value = orgGrpID;

                    sqlparams[1] = new SqlParameter("@pName", SqlDbType.NVarChar);
                    sqlparams[1].Value = name;

                     sql = "exec SP_GetOrgGrpID @pOrgGrpID, @pName";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sql.ToString() + ":")); }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "ORG_GROUP_NAME" };

                    lstOrgGroups = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUPS>(fields, sql, sqlparams).ToList();

                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : Returned count : " + lstOrgGroups); }

                return lstOrgGroups;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sql.ToString()); }
                throw ex;
            }
            finally
            {
                sql = string.Empty;
            }
        }

        #endregion
    }
}
