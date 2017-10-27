using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using AtPar.Repository.Interfaces.Deliver;

namespace AtPar.Deliver.Repos
{
    public class DeliverShiptoIDsRepository : IDeliverShiptoIDsRepository
    {
        ILog _log;
        public DeliverShiptoIDsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(DeliverShiptoIDsRepository));
        }

        #region Allocate ShiptoIDs

        /// <summary>
        /// Used to delete the allocated ship to ids from db
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="objContext"></param>
        /// <returns>Returns success or failure code</returns>
        private long DeleteShiptoIDs(string orgGroupID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_DELV_SHIPTO_ID_ALLOCATION WHERE ORG_GROUP_ID='" + orgGroupID + "'");


                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }


                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Used to insert ship to ids to db
        /// </summary>
        /// <param name="lstShiptoIDs"></param>
        /// <param name="objContext"></param>
        /// <returns>error or success code</returns>
        private long InsertShiptoIDs(List<MT_DELV_SHIPTO_ID_ALLOCATION> lstShiptoIDs, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            string strOrgGroupId = "";

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstShiptoIDs)
                {
                    strOrgGroupId = item.ORG_GROUP_ID;
                    sbSql.Clear();

                    sbSql.Append("INSERT INTO MT_DELV_SHIPTO_ID_ALLOCATION (");
                    sbSql.Append("ORG_GROUP_ID, ORG_ID, SHIPTO_ID) VALUES('" + strOrgGroupId + "', ");
                    sbSql.Append("'" + item.ORG_ID + "', '" + item.SHIPTO_ID + "') ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;

            }
        }

        public long ProcessShiptoIDs(List<MT_DELV_SHIPTO_ID_ALLOCATION> lstShiptoIDs)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {                       

                        long StatusCode = DeleteShiptoIDs(lstShiptoIDs[0].ORG_GROUP_ID, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        lstShiptoIDs.RemoveAll(x => x.CHK_VALUE == 0);

                        StatusCode = InsertShiptoIDs(lstShiptoIDs, objContext);

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

        #endregion

        #region Get ShiptoIDs

        public List<MT_DELV_SHIPTO_ID_ALLOCATION> GetOrgGrpShiptoIDs(string orgGroupID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            List<MT_DELV_SHIPTO_ID_ALLOCATION> lstShiptoIDs = new List<MT_DELV_SHIPTO_ID_ALLOCATION>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (orgGroupID.Equals("All"))
                    {
                        lstShiptoIDs = objContext.MT_DELV_SHIPTO_ID_ALLOCATION.ToList();
                    }
                    else
                    {
                        lstShiptoIDs = objContext.MT_DELV_SHIPTO_ID_ALLOCATION.Where(c => c.ORG_GROUP_ID == orgGroupID).ToList();
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstShiptoIDs.Count()); }

                    return lstShiptoIDs;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        #endregion
    }
}
