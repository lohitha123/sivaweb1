using AtPar.Common;
using AtPar.Data;
using AtPar.ParManagement.Repos;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.ParManagement;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ParManagement.Repos
{
    public class SetupInventoryRepository : ISetupInventoryRepository
    {
        ILog _log;

        public SetupInventoryRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(SetupInventoryRepository));
        }


        public long DelStorLocDtls(MT_ATPAR_PHYSICAL_INVENTORY inventory, string oldStorLoc, string oldUom)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("DELETE FROM MT_ATPAR_PHYSICAL_INVENTORY  ");
                    sbSql.Append("WHERE ORG_ID= '" + inventory.ORG_ID + "' AND INV_ITEM_ID= '" + inventory.INV_ITEM_ID + "' ");
                    sbSql.Append("AND UOM= '" + oldUom + "' ");
                    sbSql.Append("AND STOR_LOC = '" + oldStorLoc + "' ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Deleted " + count); }

                }

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

        public long UpdateInvItmData(MT_ATPAR_PHYSICAL_INVENTORY inventory, string oldStorLoc, string oldUOM,
                                     string oldAltStorLoc1, string oldAltStorLoc2)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }



                    sbSql.Append(" UPDATE MT_ATPAR_PHYSICAL_INVENTORY SET ");
                    sbSql.Append(" LAST_UPDATE_DATE= '" + DateTime.Now + "', ");
                    sbSql.Append(" UOM= '" + inventory.UOM + "' ,");

                    if (!string.IsNullOrEmpty(inventory.CHARGE_CODE))
                    {
                        sbSql.Append(" CHARGE_CODE= '" + inventory.CHARGE_CODE + "',");
                    }                   

                    if (((inventory.QUANTITY_ON_HAND != 0) & (inventory.QUANTITY_ON_HAND > 0)))
                    {
                        sbSql.Append(" QUANTITY_ON_HAND= '" + inventory.QUANTITY_ON_HAND + "',");
                    }

                    if (!string.IsNullOrEmpty(inventory.REPLENISHMENT_TYPE))
                    {
                        sbSql.Append(" REPLENISHMENT_TYPE= '" + inventory.REPLENISHMENT_TYPE + "',");
                    }

                    // to do in old code used string.empty need to check
                    
                    if ((inventory.STATUS != null))
                    {
                        sbSql.Append("  STATUS= '" + inventory.STATUS + "' ");
                    }

                    sbSql.Append(" WHERE ORG_ID= '" + inventory.ORG_ID + "' AND INV_ITEM_ID= '" + inventory.INV_ITEM_ID + "' AND UOM = '" + oldUOM + "' ");
                    sbSql.Append(" AND STOR_LOC IN ('" + oldStorLoc + "'");

                    if (!string.IsNullOrEmpty(oldAltStorLoc1))
                    {
                        sbSql.Append(" , '" + oldAltStorLoc1 + "' ");
                    }

                    if (!string.IsNullOrEmpty(oldAltStorLoc2))
                    {
                        sbSql.Append(" , '" + oldAltStorLoc2 + "' ");
                    }                   

                    sbSql.Append(" )");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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

        public List<VM_INVENTORY_ITEM_DETAILS> GetExistingItemDetails(string orgID, string orgGroupID, string itemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            var lstFinalInvItems = new List<VM_INVENTORY_ITEM_DETAILS>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQL.Append("SELECT DISTINCT MAPI.STOR_LOC, MAPI.ORG_ID, MAPI.INV_ITEM_ID, PMI.SHORT_DESCR, ");
                    sbSQL.Append("MAPI.UOM, MAPI.CHARGE_CODE, MAPI.LOT_ID, MAPI.SERIAL_ID, MAPI.QUANTITY_ON_HAND, MAPI.DEFAULT_LOC_FLAG, ");
                    sbSQL.Append("MAPI.REPLENISHMENT_TYPE, MAPI.STATUS FROM ");
                    sbSQL.Append("MT_ATPAR_PHYSICAL_INVENTORY MAPI, ");
                    sbSQL.Append("PAR_MNGT_ITEM PMI, ");
                    sbSQL.Append("RM_ORG_UNITS ROU ");
                    sbSQL.Append("WHERE MAPI.ORG_ID = '" + orgID + "' AND ");

                    if (!string.IsNullOrEmpty(itemID))
                    {
                        sbSQL.Append(" MAPI.INV_ITEM_ID = '" + itemID + "'  AND ");
                    }
                    sbSQL.Append(" PMI.ORG_GROUP_ID = (SELECT MASTER_GROUP_ID  ");
                    sbSQL.Append(" FROM RM_ORG_UNITS WHERE ORG_ID = '" + orgID + "' AND ORG_TYPE='I' )");
                    sbSQL.Append(" AND MAPI.INV_ITEM_ID = PMI.ITEM_ID AND ");
                    sbSQL.Append(" PMI.ORG_GROUP_ID = ROU.MASTER_GROUP_ID ");
                    sbSQL.Append(" ORDER BY MAPI.INV_ITEM_ID ASC ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstInvItems = objContext.Database.SqlQuery<VM_INVENTORY_ITEM_DETAILS>(sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstInvItems.Count); }

                    foreach (var item in lstInvItems)
                    {
                        if(item.DEFAULT_LOC_FLAG == "Y")
                        {
                            var searchResult = lstInvItems.Where(c => c.ORG_ID == item.ORG_ID && c.INV_ITEM_ID == item.INV_ITEM_ID && c.UOM == item.UOM && c.DEFAULT_LOC_FLAG == "N");

                            if (searchResult != null)
                            {
                                if (searchResult.Count() == 1)
                                {
                                    if (searchResult.FirstOrDefault().DEFAULT_LOC_FLAG == "N")
                                    {
                                        item.ALT_STOR_LOC1 = searchResult.FirstOrDefault().STOR_LOC;
                                    }

                                }
                                else if (searchResult.Count() == 2)
                                {
                                    if (searchResult.LastOrDefault().DEFAULT_LOC_FLAG == "N")
                                    {
                                        item.ALT_STOR_LOC1 = searchResult.FirstOrDefault().STOR_LOC;
                                        item.ALT_STOR_LOC2 = searchResult.LastOrDefault().STOR_LOC;
                                    }
                                }
                            }

                            lstFinalInvItems.Add(item);

                        }
                       
                    }
                    
                    return lstFinalInvItems;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }

        }

        public long UpdateStorLocDtls(MT_ATPAR_PHYSICAL_INVENTORY inventory, string oldStorLoc, string newStorLoc, string oldUOM)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" UPDATE MT_ATPAR_PHYSICAL_INVENTORY SET UOM= '" + inventory.UOM + "', STOR_LOC= '" + newStorLoc + "',");
                    sbSql.Append(" CHARGE_CODE= '" + inventory.CHARGE_CODE + "', LOT_ID= '" + inventory.LOT_ID + "', ");
                    sbSql.Append(" SERIAL_ID= '" + inventory.SERIAL_ID + "', QUANTITY_ON_HAND= " + inventory.QUANTITY_ON_HAND + ", LAST_UPDATE_DATE= '" + DateTime.Now + "', ");
                    sbSql.Append(" REPLENISHMENT_TYPE= '" + inventory.REPLENISHMENT_TYPE + "', STATUS= '" + inventory.STATUS + "' ");
                    sbSql.Append(" WHERE ORG_ID= '" + inventory.ORG_ID + "' AND INV_ITEM_ID= '" + inventory.INV_ITEM_ID + "'");
                    sbSql.Append(" AND UOM= '" + oldUOM + "' ");
                    sbSql.Append(" AND STOR_LOC = '" + oldStorLoc + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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

        public int CheckItemExistence(string orgID, string itemID, string uom, string dfltStorLoc, string altStorLoc1, string altStorLoc2)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            var lstFinalInvItems = new List<VM_INVENTORY_ITEM_DETAILS>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSQL.Append(" SELECT COUNT(INV_ITEM_ID) FROM MT_ATPAR_PHYSICAL_INVENTORY WHERE ");
                    sbSQL.Append(" ORG_ID='" + orgID + "' AND INV_ITEM_ID='" + itemID + "' ");

                    if (uom != string.Empty)
                    {
                        sbSQL.Append(" AND UOM = '" + uom + "' ");
                    }


                    if (dfltStorLoc != string.Empty)
                    {
                        sbSQL.Append("  AND STOR_LOC IN ('" + dfltStorLoc + "' ");
                    }

                    if (((dfltStorLoc != string.Empty) & (altStorLoc1 != string.Empty)))
                    {
                        sbSQL.Append(" , '" + altStorLoc1 + "' ");
                    }
                    else if (((dfltStorLoc == string.Empty) & (altStorLoc1 != string.Empty)))
                    {
                        sbSQL.Append("  AND STOR_LOC IN ('" + altStorLoc1 + "' ");
                    }


                    if (((dfltStorLoc != string.Empty) & (altStorLoc1 != string.Empty) & (altStorLoc2 != string.Empty)))
                    {
                        sbSQL.Append(" , '" + altStorLoc2 + "') ");
                    }
                    else if (((dfltStorLoc == string.Empty) & (altStorLoc1 != string.Empty) & (altStorLoc2 != string.Empty)))
                    {
                        sbSQL.Append(" , '" + altStorLoc2 + "') ");
                    }
                    else if (((dfltStorLoc != string.Empty) & (altStorLoc1 == string.Empty) & (altStorLoc2 != string.Empty)))
                    {
                        sbSQL.Append(" , '" + altStorLoc2 + "' )");
                    }
                    else if (((dfltStorLoc == string.Empty) & (altStorLoc1 == string.Empty) & (altStorLoc2 != string.Empty)))
                    {
                        sbSQL.Append("  AND STOR_LOC IN ('" + altStorLoc2 + "' )");
                    }
                    else if (((dfltStorLoc != string.Empty) & (altStorLoc1 == string.Empty) & (altStorLoc2 == string.Empty)))
                    {
                        sbSQL.Append(" )");
                    }
                    else if (((dfltStorLoc != string.Empty) & (altStorLoc1 != string.Empty) & (altStorLoc2 == string.Empty)))
                    {
                        sbSQL.Append(" )");
                    }
                    else if (((dfltStorLoc == string.Empty) & (altStorLoc1 != string.Empty) & (altStorLoc2 == string.Empty)))
                    {
                        sbSQL.Append(" )");

                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSQL.ToString()).ToList();

                    if (count != null)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + count[0]); }

                        return Convert.ToInt32(count[0]);
                    }
                    else
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + count[0]); }
                        return 0;
                    }

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }

        }

        //UpdateOrgItemStatus we can do this in B Service

        #region GetItemDetails

        // Call this from B Service
        public List<PAR_MNGT_ITEM> GetItemDetails(string orgGroupID, string itemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var fields = new[] { "ITEM_ID", "SHORT_DESCR", "CHARGE_CODE", "REPLENISHMENT_TYPE", "UNIT_OF_PROCUREMENT" };

                    sbSQL.Append("SELECT ITEM_ID, SHORT_DESCR, CHARGE_CODE, REPLENISHMENT_TYPE, UNIT_OF_PROCUREMENT ");
                    sbSQL.Append("FROM PAR_MNGT_ITEM ");
                    sbSQL.Append("WHERE ORG_GROUP_ID = '" + orgGroupID + "'  AND STATUS = 0 ");
                    if (!string.IsNullOrEmpty(itemID))
                    {
                        sbSQL.Append(" AND ITEM_ID = '" + itemID + "' ");
                    }

                    var lstItems = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ITEM>(fields, sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstItems.Count); }

                    return lstItems;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }


        }

        public List<PAR_MNGT_ITEM> GetItemDetailsForAutoComplete(string orgGroupID, string itemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var fields = new[] { "ITEM_ID", "SHORT_DESCR", "CHARGE_CODE", "REPLENISHMENT_TYPE", "UNIT_OF_PROCUREMENT" };

                    sbSQL.Append("SELECT ITEM_ID, SHORT_DESCR, CHARGE_CODE, REPLENISHMENT_TYPE, UNIT_OF_PROCUREMENT ");
                    sbSQL.Append("FROM PAR_MNGT_ITEM ");
                    sbSQL.Append("WHERE ORG_GROUP_ID = '" + orgGroupID + "'  AND STATUS = 0 ");
                    if (!string.IsNullOrEmpty(itemID))
                    {
                        sbSQL.Append(" AND ITEM_ID LIKE '" + itemID + "%' ");
                    }

                    var lstItems = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ITEM>(fields, sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstItems.Count); }

                    return lstItems;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQL = null;
            }


        }

        public string GetMasterOrgGroupID(string orgID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var result = objContext.RM_ORG_UNITS.Where(c => c.ORG_ID == orgID).FirstOrDefault();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (result != null)
                    {
                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug(string.Format("{0}: Org Group Id for the provided Org ID {1} is {2} :",
                                                 methodBaseName, orgID, result.MASTER_GROUP_ID));
                        }
                        return result.MASTER_GROUP_ID;
                    }
                    else
                    {
                        return string.Empty;
                    }
                    
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        #endregion

        #region UpdateOrgItemStatus
        
        public long ChangeStatus(string orgID, string itemID, string uom, string dfltStorLoc, string status)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append(" UPDATE MT_ATPAR_PHYSICAL_INVENTORY SET STATUS= '" + status + "'");
                    sbSql.Append(" WHERE ORG_ID= '" + orgID + "' AND INV_ITEM_ID= '" + itemID + "'");
                    sbSql.Append(" AND UOM= '" + uom + "' AND STOR_LOC= '" + dfltStorLoc + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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

        #endregion

        #region InsertInventoryItems

        public int IsItemExistInItemMaster(string itemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int cnt = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    cnt = objContext.PAR_MNGT_ITEM.Count(c => c.ITEM_ID == itemID);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Items Count " + cnt); }

                    return cnt;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        public int IsItemExistInItemMasterForOrgGroup(string itemID, string orgGroupID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int cnt = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    cnt = objContext.PAR_MNGT_ITEM.Count(c => c.ITEM_ID == itemID && c.ORG_GROUP_ID == orgGroupID);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Items Count " + cnt); }

                    return cnt;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        public long InsertStorLocDtls(MT_ATPAR_PHYSICAL_INVENTORY inventory, string storLoc, string dfltStorLocFlg)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" INSERT INTO MT_ATPAR_PHYSICAL_INVENTORY(ORG_ID, INV_ITEM_ID, UOM, STOR_LOC, ");
                    sbSql.Append(" DEFAULT_LOC_FLAG, CHARGE_CODE,LOT_ID, SERIAL_ID, ");
                    sbSql.Append(" QUANTITY_ON_HAND, LAST_UPDATE_DATE, REPLENISHMENT_TYPE, STATUS) ");
                    sbSql.Append(" VALUES('" + inventory.ORG_ID + "','" + inventory.INV_ITEM_ID + "','" + inventory.UOM + "', '" + storLoc + "','" + dfltStorLocFlg + "',");
                    sbSql.Append(" '" + inventory.CHARGE_CODE + "', '" + inventory.LOT_ID + "',");
                    sbSql.Append(" '" + inventory.SERIAL_ID + "'," + inventory.QUANTITY_ON_HAND + ",'" + DateTime.Now + "', ");
                    sbSql.Append(" '" + inventory.REPLENISHMENT_TYPE + "','" + inventory.STATUS + "')");



                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
             
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }

        }
       

        #endregion

        #region UpdateInvenotryItems

        public long CheckItemHasLocationsOrNot(string orgID, string itemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int cnt = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    cnt = objContext.RM_PKPL_DETAILS.Count(c => c.BUSINESS_UNIT == orgID && c.ITEM_ID == itemID);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Items Count " + cnt); }

                    if (cnt > 0)
                    {
                        return AtparStatusCodes.PKPL_S_CANNOTINACTIVATE;
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
        }

        #endregion



    }
}
