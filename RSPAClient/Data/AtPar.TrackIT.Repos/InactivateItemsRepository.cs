using AtPar.Repository.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using System.Data.Entity;
using System.Data.SqlClient;
using AtPar.ViewModel;
using System.Data;

namespace AtPar.TrackIT.Repos
{
    public class InactivateItemsRepository : IInactivateItemsRepository
    {
        private ILog _log;

        public InactivateItemsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(InactivateItemsRepository));
        }

        /// <summary>
        /// Update item status to inactive in table
        /// </summary>
        /// <param name="lstItemMaster"></param>
        /// <returns>If transaction success send ATPAR_OK else send ATPAR_E_LOCALDBUPDATEFAIL</returns>
        public long InactivateItems(List<TKIT_ITEM_MASTER> lstItemMaster)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    foreach (var item in lstItemMaster)
                    {
                        if (item.CHK_VALUE == 1)
                        {
                            sbSql.Clear();
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            sbSql.Append("UPDATE TKIT_ITEM_MASTER SET ITEM_INACTIVATED = '1' ");
                            sbSql.Append("WHERE ITEM_TYPE = '" + item.ITEM_TYPE + "' ");
                            sbSql.Append("AND ITEM_ID = '" + item.ITEM_ID + "' ");

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }

                            var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                        }
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

        /// <summary>
        /// Gets the list of items to Inactivate
        /// </summary>
        /// <param name="typeIndicator"></param>
        /// <param name="destDate"></param>
        /// <returns>Returns list of items, if any exception throws exception</returns>
        public List<VM_INACTIVE_ITEMS> GetItemsToInActivate(string typeIndicator, string destDate)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<VM_INACTIVE_ITEMS> lstData = null;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramItemTypeIndictor = new SqlParameter("@pItemTypeIndicator", SqlDbType.VarChar);
                    paramItemTypeIndictor.Value = typeIndicator;

                    SqlParameter paramDestructDate = new SqlParameter("@pDestructionDate", SqlDbType.DateTime);
                    paramDestructDate.Value = destDate;


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                        var fields = new[] { "ITEM_ID", "ITEM_TYPE", "ITEM_DESCR", "STORAGE_LOCATION", "DESTRUCTION_DATE", "COMMENTS", "ITEM_INACTIVATED" };

                    lstData = objContext.Database.DifferedExecuteQuery<VM_INACTIVE_ITEMS>(fields, "EXEC sp_GetItemsToInactivate @pItemTypeIndicator, @pDestructionDate", paramItemTypeIndictor, paramDestructDate).ToList();
                    
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned system Ids Count " + lstData.Count()); }

                    return lstData;
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
