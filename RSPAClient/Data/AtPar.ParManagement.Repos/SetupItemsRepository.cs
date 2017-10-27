#region Usings
using AtPar.Repository.Interfaces.ParManagement;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using AtPar.Service.Interfaces.Common;
#endregion

namespace AtPar.ParManagement.Repos
{
    public class SetupItemsRepository : ISetupItemsRepository
    {
        ILog _log;
        ICommonService _commonService;
        public const string ITEM_ID_FIELD_NAME = "ITEM_ID";

        public SetupItemsRepository(ILog log, ICommonService commonService)
        {
            _log = log;
            _commonService = commonService;
            _log.SetLoggerType(typeof(SetupItemsRepository));
        }

        /// <summary>
        /// To get the Item Details
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="Descr"></param>
        /// <param name="Vendor"></param>
        /// <param name="UPCcode"></param>
        /// <param name="Manf"></param>
        /// <param name="ItemPriceFrom"></param>
        /// <param name="ItemPriceTo"></param>
        /// <param name="CustItemID"></param>
        /// <param name="VendItemID"></param>
        /// <param name="ManfItemID"></param>
        /// <param name="Lot"></param>
        /// <param name="Serial"></param>
        /// <param name="Mode"></param>
        /// <param name="status"></param>
        /// <param name="OrgGrpID"></param>
        /// <param name="SubItems"></param>
        /// <returns></returns>
        public List<PAR_MNGT_ITEM> GetItemDetails(string ItemID, string Descr, string Vendor, string UPCcode, string Manf, string ItemPriceFrom, string ItemPriceTo, string CustItemID, string VendItemID, string ManfItemID, string Lot, string Serial, string Mode, bool status, string OrgGrpID, bool SubItems)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<PAR_MNGT_ITEM> listItems = null;
            bool sqlFlag = false;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ATORG.ORG_GROUP_NAME, PARITM.ORG_GROUP_ID, PARITM.ITEM_ID, PARITM.CUST_ITEM_ID,  PARITM.SHORT_DESCR, PARITM.LONG_DESCR, PARITM.VENDOR_ID, PARITM.MANUFACTURER, PARITM.MFG_ITEM_ID,  PARITM.VEND_ITEM_ID, PARITM.UNIT_OF_PROCUREMENT, PARITM.UNIT_OF_ISSUE, PARITM.CONV_FACTOR, PARITM.CHARGE_CODE, PARITM.ITEM_PRICE, PARITM.UPC_CODE, PARITM.GTIN, PARITM.STATUS,  PARITM.LOT_CONTROLLED, PARITM.SERIAL_CONTROLLED, PARITM.IMPLANT_FLAG, PARITM.CONV_FACTOR, PARITM.LATEX_FREE, PARITM.CUST_ITEM_DESCR, PARITM.ITEM_CATEGORY, PARITM.USER_FIELD_1,  PARITM.USER_FIELD_2, PARITM.REPLENISHMENT_TYPE, PARITM.LEAD_TIME, PARITM.PHARMACY_FLG, PARITM.SUBSTITUTE_ITEM_FLG, PARITM.STRENGTH, PARITM.DOSAGE, PARITM.EVERIFY_FLG, PARITM.CINDEX, PARITM.PAR_UOM, PARITM.CONV_RATE_PAR_UOM FROM PAR_MNGT_ITEM PARITM INNER JOIN MT_ATPAR_ORG_GROUPS ATORG ON PARITM.ORG_GROUP_ID = ATORG.ORG_GROUP_ID ");

                    if (!string.IsNullOrEmpty(ItemID) || !string.IsNullOrEmpty(Descr) || !string.IsNullOrEmpty(Vendor) || !string.IsNullOrEmpty(UPCcode) || !string.IsNullOrEmpty(Manf) || !string.IsNullOrEmpty(CustItemID) || !string.IsNullOrEmpty(VendItemID) || !string.IsNullOrEmpty(ManfItemID) || (!string.IsNullOrEmpty(ItemPriceFrom) && !string.IsNullOrEmpty(ItemPriceTo)) || status == true || OrgGrpID != "All")
                    {
                        sbSql.Append(" WHERE ");
                    }

                    if (!string.IsNullOrEmpty(ItemID))
                    {
                        if (Mode == "Edit")
                        {
                            sbSql.Append(" ITEM_ID = '" + ItemID + "' ");
                            sqlFlag = true;
                        }
                        else
                        {
                            sbSql.Append("( ITEM_ID LIKE '%" + ItemID + "%' OR");
                            sbSql.Append(" VEND_ITEM_ID LIKE '%" + ItemID + "%' OR");
                            sbSql.Append(" UPC_CODE LIKE '%" + ItemID + "%' OR");
                            sbSql.Append(" MFG_ITEM_ID LIKE '%" + ItemID + "%' OR");
                            sbSql.Append(" CUST_ITEM_ID LIKE '%" + ItemID + "%' )");

                            sqlFlag = true;
                        }
                    }

                    if (!string.IsNullOrEmpty(Descr))
                    {
                        if (sqlFlag)
                        {
                            sbSql.Append(" AND SHORT_DESCR LIKE '%" + Descr + "%' ");
                        }
                        else
                        {
                            sbSql.Append(" SHORT_DESCR LIKE '%" + Descr + "%' ");
                            sqlFlag = true;
                        }
                    }

                    if (!string.IsNullOrEmpty(Vendor))
                    {
                        if (sqlFlag)
                        {
                            sbSql.Append(" AND VENDOR_ID LIKE '%" + Vendor + "%' ");
                        }
                        else
                        {
                            sbSql.Append(" VENDOR_ID LIKE '%" + Vendor + "%' ");
                            sqlFlag = true;
                        }
                    }


                    if (!string.IsNullOrEmpty(Manf))
                    {
                        if (sqlFlag)
                        {
                            sbSql.Append(" AND MANUFACTURER LIKE '%" + Manf + "%' ");
                        }
                        else
                        {
                            sbSql.Append(" MANUFACTURER LIKE '%" + Manf + "%' ");
                            sqlFlag = true;
                        }
                    }


                    if (!string.IsNullOrEmpty(ItemPriceFrom) && !string.IsNullOrEmpty(ItemPriceTo))
                    {
                        if (sqlFlag)
                        {
                            sbSql.Append(" AND (ITEM_PRICE >= " + Convert.ToDouble(ItemPriceFrom) + " AND ITEM_PRICE <= " + Convert.ToDouble(ItemPriceTo) + ") ");
                        }
                        else
                        {
                            sbSql.Append(" (ITEM_PRICE >= " + Convert.ToDouble(ItemPriceFrom) + " AND ITEM_PRICE <= " + Convert.ToDouble(ItemPriceTo) + ") ");
                            sqlFlag = true;
                        }
                    }


                    if (OrgGrpID != "All")
                    {
                        if (sqlFlag)
                        {
                            sbSql.Append(" AND PARITM.ORG_GROUP_ID='" + OrgGrpID + "' ");
                        }
                        else
                        {
                            sbSql.Append(" PARITM.ORG_GROUP_ID='" + OrgGrpID + "' ");
                            sqlFlag = true;
                        }
                    }

                    if (status)
                    {
                        if (sqlFlag)
                        {
                            sbSql.Append("AND PARITM.STATUS = 0 ");
                        }
                        else
                        {
                            sbSql.Append(" PARITM.STATUS = 0 ");
                            sqlFlag = true;
                        }
                    }

                    if (SubItems)
                    {
                        sbSql.Append(" AND PARITM.SUBSTITUTE_ITEM_FLG = 1 ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[]{"ORG_GROUP_NAME", "ORG_GROUP_ID", "ITEM_ID", "CUST_ITEM_ID", "SHORT_DESCR",
"LONG_DESCR", "VENDOR_ID", "MANUFACTURER", "MFG_ITEM_ID", "VEND_ITEM_ID", "UNIT_OF_PROCUREMENT", "UNIT_OF_ISSUE", "CONV_FACTOR", "CHARGE_CODE", "ITEM_PRICE", "UPC_CODE", "GTIN", "STATUS", "LOT_CONTROLLED", "SERIAL_CONTROLLED", "IMPLANT_FLAG", "CONV_FACTOR", "LATEX_FREE", "CUST_ITEM_DESCR", "ITEM_CATEGORY", "USER_FIELD_1", "USER_FIELD_2", "REPLENISHMENT_TYPE", "LEAD_TIME", "PHARMACY_FLG", "SUBSTITUTE_ITEM_FLG", "STRENGTH", "DOSAGE", "EVERIFY_FLG", "CINDEX", "PAR_UOM", "CONV_RATE_PAR_UOM"};

                    listItems = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ITEM>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Item Details Returned: " + listItems.Count()); }

                    return listItems;
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
        /// To get the Items
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgId"></param>
        /// <param name="AppID"></param>
        /// <returns></returns>
        public List<PAR_MNGT_ITEM> GetItems(string ItemID, string OrgId, string AppID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            List<PAR_MNGT_ITEM> listItems = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT PMI.ITEM_ID, PMI.SHORT_DESCR, PMI.ORG_GROUP_ID, PMI.STATUS  FROM PAR_MNGT_ITEM PMI INNER JOIN RM_ORG_UNITS ROU ON PMI.ORG_GROUP_ID=ROU.MASTER_GROUP_ID ");

                    if (!string.IsNullOrEmpty(OrgId))
                    {
                        sbSql.Append(" WHERE ROU.ORG_ID='" + OrgId + "' ");
                    }

                    if (Convert.ToInt32(AppID) == (int)AtParWebEnums.EnumApps.Pharmacy)
                    {
                        sbSql.Append("AND PMI.PHARMACY_FLG='TRUE' AND PMI.SUBSTITUTE_ITEM_FLG='FALSE' ");
                    }
                    else
                    {
                        sbSql.Append("AND PMI.PHARMACY_FLG='FALSE' AND PMI.SUBSTITUTE_ITEM_FLG='FALSE' ");
                    }

                    if (!string.IsNullOrEmpty(ItemID))
                    {
                        sbSql.Append("AND PMI.ITEM_ID LIKE '" + ItemID + "%' AND PMI.STATUS = 0 ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fileds = new[] { "ITEM_ID", "SHORT_DESCR", "ORG_GROUP_ID", "STATUS" };

                    listItems = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ITEM>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Items Returned: " + listItems.Count()); }

                    return listItems;
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
        /// To get the item UOM
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <param name="AppID"></param>
        /// <returns></returns>
        public List<PAR_MNGT_ITEM> GetItemUOM(string ItemID, string OrgGrpID, string AppID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            List<PAR_MNGT_ITEM> listItems = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT  UNIT_OF_ISSUE, CONV_FACTOR, UNIT_OF_PROCUREMENT, SHORT_DESCR, CHARGE_CODE, REPLENISHMENT_TYPE,  SERIAL_CONTROLLED, LOT_CONTROLLED, USER_FIELD_1,PAR_UOM, CONV_RATE_PAR_UOM  FROM PAR_MNGT_ITEM  WHERE ITEM_ID='" + ItemID + "' AND STATUS =0 AND ORG_GROUP_ID = '" + OrgGrpID + "' ");

                    if (Convert.ToUInt32(AppID) == (int)AtParWebEnums.EnumApps.Pharmacy)
                    {
                        sbSql.Append(" AND PHARMACY_FLG='TRUE' and SUBSTITUTE_ITEM_FLG='FALSE' ");
                    }
                    else
                    {
                        sbSql.Append(" AND PHARMACY_FLG='FALSE' and SUBSTITUTE_ITEM_FLG='FALSE' ");
                    }

                    var fileds = new[] { "UNIT_OF_ISSUE", "CONV_FACTOR", "UNIT_OF_PROCUREMENT", "SHORT_DESCR", "CHARGE_CODE", "REPLENISHMENT_TYPE", "SERIAL_CONTROLLED", "LOT_CONTROLLED", "USER_FIELD_1" , "PAR_UOM", "CONV_RATE_PAR_UOM" };

                    listItems = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ITEM>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Items Returned: " + listItems.Count()); }

                    return listItems;
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
        /// To Get the Item data to Add or Update
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <returns></returns>
        public List<PAR_MNGT_ITEM> GetItemDataToAddOrUpdate(string ItemID, string OrgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            List<PAR_MNGT_ITEM> listItems = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT UNIT_OF_ISSUE, CONV_FACTOR, REPLENISHMENT_TYPE, SERIAL_CONTROLLED, LOT_CONTROLLED, CHARGE_CODE, UNIT_OF_PROCUREMENT FROM PAR_MNGT_ITEM WHERE  ITEM_ID = '" + ItemID + "'  AND ORG_GROUP_ID='" + OrgGrpID + "'");

                    var fileds = new[] { "UNIT_OF_ISSUE", "CONV_FACTOR", "REPLENISHMENT_TYPE", "SERIAL_CONTROLLED", "LOT_CONTROLLED", "CHARGE_CODE", "UNIT_OF_PROCUREMENT" };

                    listItems = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ITEM>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Items Returned: " + listItems.Count()); }

                    return listItems;
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
        /// To Get the Substitute Item Details
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <returns></returns>
        public List<PAR_MNGT_ITEM_SUBSTITUTE> GetSubstituteItemDetails(string ItemID, string OrgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            List<PAR_MNGT_ITEM_SUBSTITUTE> listItems = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT PMNGTSUBITM.PRIORITY, PMNGTITM.SHORT_DESCR AS ITEM_DESCR, PMNGTSUBITM.SUBSTITUTE_ITEM_ID, PMNGTSUBITM.STATUS FROM PAR_MNGT_ITEM_SUBSTITUTE PMNGTSUBITM INNER JOIN PAR_MNGT_ITEM PMNGTITM ON PMNGTSUBITM.ORG_GROUP_ID=PMNGTITM.ORG_GROUP_ID AND PMNGTSUBITM.SUBSTITUTE_ITEM_ID=PMNGTITM.ITEM_ID   WHERE PMNGTSUBITM.ORG_GROUP_ID='" + OrgGrpID + "' AND PMNGTSUBITM.ITEM_ID='" + ItemID + "'");


                    var fields = new[] { "PRIORITY", "ITEM_DESCR", "SUBSTITUTE_ITEM_ID", "STATUS" };


                    listItems = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ITEM_SUBSTITUTE>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Substitute Items Returned: " + listItems.Count()); }

                    return listItems;
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
        /// To Get the Pharmacy Locations
        /// </summary>
        /// <param name="ItemID"></param>
        /// <returns></returns>
        public List<PAR_MNGT_PAR_LOC_DETAILS> GetPharmacyItemLocations(string ItemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            List<PAR_MNGT_PAR_LOC_DETAILS> listParLocationDetails = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ORG_ID, PAR_LOC_ID, BIN_LOC, ITEM_ID, STATUS, COUNT_ORDER, OPTIMAL_QTY, COUNT_REQUIRED, REPLENISHMENT_TYPE, FILL_KILL_FLAG, LOT_CONTROLLED, SERIAL_CONTROLLED, MAX_QTY, FOQ_QTY, ORDERING_TYPE, CHARGE_CODE, COST_CENTER, UNIT_OF_ISSUE, CONVERSION_RATE, USER_FIELD_1, LAST_UPDATE_DATE, LAST_UPDATE_USER, LAST_CLIENT_ADDRESS, INV_BUSINESS_UNIT, REQUISITION_TYPE, UNIT_OF_PROCUREMENT  FROM PAR_MNGT_PAR_LOC_DETAILS WHERE ITEM_ID='" + ItemID + "'");

                    var fields = new[] { "ORG_ID", "PAR_LOC_ID", "BIN_LOC", "ITEM_ID", "STATUS", "COUNT_ORDER", "OPTIMAL_QTY", "COUNT_REQUIRED", "REPLENISHMENT_TYPE", "FILL_KILL_FLAG", "LOT_CONTROLLED", "SERIAL_CONTROLLED",
                        "MAX_QTY", "FOQ_QTY", "ORDERING_TYPE", "CHARGE_CODE", "COST_CENTER", "UNIT_OF_ISSUE", "CONVERSION_RATE", "USER_FIELD_1", "LAST_UPDATE_DATE",
                        "LAST_UPDATE_USER", "LAST_CLIENT_ADDRESS", "INV_BUSINESS_UNIT", "REQUISITION_TYPE", "UNIT_OF_PROCUREMENT" };

                    listParLocationDetails = objContext.Database.DifferedExecuteQuery<PAR_MNGT_PAR_LOC_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " No.Of Pharmacy Item locations Returned: " + listParLocationDetails.Count()); }

                    return listParLocationDetails;
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
        /// To Update the Item
        /// </summary>
        /// <param name="Item"></param>
        /// <returns></returns>
        public long UpdateItem(PAR_MNGT_ITEM Item)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE PAR_MNGT_ITEM SET ORG_GROUP_ID='" + Item.ORG_GROUP_ID + "', SHORT_DESCR='" + Item.SHORT_DESCR + "' , LONG_DESCR='" + Item.LONG_DESCR + "', VENDOR_ID='" + Item.VENDOR_ID + "', MANUFACTURER='" + Item.MANUFACTURER + "', CUST_ITEM_ID='" + Item.CUST_ITEM_ID + "', MFG_ITEM_ID='" + Item.MFG_ITEM_ID + "', VEND_ITEM_ID='" + Item.VEND_ITEM_ID + "', UNIT_OF_PROCUREMENT='" + Item.UNIT_OF_PROCUREMENT + "', UNIT_OF_ISSUE='" + Item.UNIT_OF_ISSUE + "', UPC_CODE='" + Item.UPC_CODE + "',GTIN='" + Item.GTIN + "', ITEM_PRICE='" + Item.ITEM_PRICE + "', LOT_CONTROLLED = '" + Item.LOT_CONTROLLED + "', SERIAL_CONTROLLED ='" + Item.SERIAL_CONTROLLED + "', IMPLANT_FLAG ='" + Item.IMPLANT_FLAG + "', CHARGE_CODE ='" + Item.CHARGE_CODE + "', CONV_FACTOR = '" + Item.CONV_FACTOR + "', LATEX_FREE = '" + Item.LATEX_FREE + "', CUST_ITEM_DESCR ='" + Item.CUST_ITEM_DESCR + "', ITEM_CATEGORY = '" + Item.ITEM_CATEGORY + "', LEAD_TIME ='" + Item.LEAD_TIME + "', USER_FIELD_1 = '" + Item.USER_FIELD_1 + "', USER_FIELD_2='" + Item.USER_FIELD_2 + "', LAST_UPDATE_USER = '" + Item.LAST_UPDATE_USER + "', REPLENISHMENT_TYPE='" + Item.REPLENISHMENT_TYPE + "', PHARMACY_FLG='" + Item.PHARMACY_FLG + "', SUBSTITUTE_ITEM_FLG='" + Item.SUBSTITUTE_ITEM_FLG + "', STRENGTH='" + Item.STRENGTH + "', DOSAGE='" + Item.DOSAGE + "', EVERIFY_FLG='" + Item.EVERIFY_FLG + "', CINDEX=" + (Item.CINDEX == null ? "null" : Convert.ToString(Item.CINDEX)) + ", PAR_UOM='" + Item.PAR_UOM + "', CONV_RATE_PAR_UOM='" + Item.CONV_RATE_PAR_UOM + "' WHERE ITEM_ID='" + Item.ITEM_ID + "' AND  ORG_GROUP_ID='" + Item.ORG_GROUP_ID + "'");

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

        /// <summary>
        /// To Insert the Item
        /// </summary>
        /// <param name="Item"></param>
        /// <returns></returns>
        public long InsertItem(PAR_MNGT_ITEM Item)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO PAR_MNGT_ITEM(ORG_GROUP_ID,ITEM_ID, CUST_ITEM_ID, SHORT_DESCR, LONG_DESCR, VENDOR_ID, MANUFACTURER, MFG_ITEM_ID, VEND_ITEM_ID, UNIT_OF_PROCUREMENT, UNIT_OF_ISSUE, UPC_CODE, GTIN, STATUS, ITEM_PRICE, LOT_CONTROLLED, SERIAL_CONTROLLED, IMPLANT_FLAG, CHARGE_CODE, CONV_FACTOR, LEAD_TIME, LATEX_FREE, CUST_ITEM_DESCR, ITEM_CATEGORY, USER_FIELD_1, USER_FIELD_2, LAST_UPDATE_DATE, LAST_UPDATE_USER, REPLENISHMENT_TYPE,PHARMACY_FLG,SUBSTITUTE_ITEM_FLG,STRENGTH,DOSAGE,EVERIFY_FLG,CINDEX,PAR_UOM,CONV_RATE_PAR_UOM) VALUES('" + Item.ORG_GROUP_ID + "','" + Item.ITEM_ID + "','" + Item.CUST_ITEM_ID + "','" + Item.SHORT_DESCR + "','" + Item.LONG_DESCR + "','" + Item.VENDOR_ID + "','" + Item.MANUFACTURER + "','" + Item.MFG_ITEM_ID + "', '" + Item.VEND_ITEM_ID + "','" + Item.UNIT_OF_PROCUREMENT + "','" + Item.UNIT_OF_ISSUE + "','" + Item.UPC_CODE + "','" + Item.GTIN + "', 0, '" + Item.ITEM_PRICE + "', '" + Item.LOT_CONTROLLED + "', '" + Item.SERIAL_CONTROLLED + "', '" + Item.IMPLANT_FLAG + "',  '" + Item.CHARGE_CODE + "' ,'" + Item.CONV_FACTOR + "', '" + Item.LEAD_TIME + "',  '" + Item.LATEX_FREE + "', '" + Item.CUST_ITEM_DESCR + "', '" + Item.ITEM_CATEGORY + "', '" + Item.USER_FIELD_1 + "', '" + Item.USER_FIELD_2 + "', getDate(), '" + Item.LAST_UPDATE_USER + "', '" + Item.REPLENISHMENT_TYPE + "', '" + Item.PHARMACY_FLG + "', '" + Item.SUBSTITUTE_ITEM_FLG + "', '" + Item.STRENGTH + "', '" + Item.DOSAGE + "', '" + Item.EVERIFY_FLG + "', " + (Item.CINDEX == null ? "null" : Convert.ToString(Item.CINDEX)) + ", '" + Item.PAR_UOM + "', '" + Item.CONV_RATE_PAR_UOM + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

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

        /// <summary>
        /// To Check whether Item Exists or not
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <returns></returns>
        public long IsItemExistOrNot(string ItemID, string OrgGrpID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var existingCostCenterCount = objContext.PAR_MNGT_ITEM.Count(c => c.ITEM_ID == ItemID
                                                                            && c.ORG_GROUP_ID == OrgGrpID);

                    if (existingCostCenterCount > 0)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Item ID : " + ItemID + " already exists"); }
                        return AtparStatusCodes.ATPAR_E_ALREADY_EXISTS;
                    }
                    else
                    {
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objContext"></param>
        /// <param name="OrgGrpID"></param>
        /// <param name="ItemID"></param>
        /// <param name="SubItemID"></param>
        /// <returns></returns>
        private int CheckItemExistsorNot(ATPAR_MT_Context objContext, string OrgGrpID, string ItemID, string SubItemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(SUBSTITUTE_ITEM_ID)  FROM PAR_MNGT_ITEM_SUBSTITUTE WHERE ORG_GROUP_ID='" + OrgGrpID + "' AND ITEM_ID='" + ItemID + "' AND SUBSTITUTE_ITEM_ID='" + SubItemID + "'");

                    var ItemCount = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    return ItemCount;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw;
            }

        }

        /// <summary>
        /// To Insert the Substitute Item
        /// </summary>
        /// <param name="OrgGrpID"></param>
        /// <param name="ItemID"></param>
        /// <param name="SubItemID"></param>
        /// <param name="Priority"></param>
        /// <param name="ItemDescr"></param>
        /// <param name="Status"></param>
        /// <returns></returns>
        public long InsertSubstituteItem(string OrgGrpID, string ItemID, string SubItemID, string Priority, string ItemDescr, int Status, bool blnPharmItemAllocated, List<PAR_MNGT_PAR_LOC_DETAILS> PharmItemLocations)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    var ItemCount = CheckItemExistsorNot(objContext, OrgGrpID, ItemID, SubItemID);

                    if (ItemCount > 0)
                    {
                        return AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION;
                    }

                    sbSql.Remove(0, sbSql.Length);

                    sbSql.Append("INSERT INTO PAR_MNGT_ITEM_SUBSTITUTE(ORG_GROUP_ID,ITEM_ID,SUBSTITUTE_ITEM_ID, ");

                    if (!string.IsNullOrEmpty(Priority))
                    {
                        sbSql.Append("PRIORITY, ");
                    }

                    sbSql.Append("ITEM_DESCR,STATUS) VALUES('" + OrgGrpID + "', '" + ItemID + "', '" + SubItemID + "', ");



                    if (!string.IsNullOrEmpty(Priority))
                    {
                        //    sbSql.Append("" + "null" + ", ");

                        //}
                        //else
                        //{
                        sbSql.Append("'" + Convert.ToString(Priority) + "', ");
                    }

                    sbSql.Append("'" + ItemDescr + "', " + Status + ")");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }


                    if (blnPharmItemAllocated)
                    {
                        var itemsCount = 0;

                        foreach (var item in PharmItemLocations)
                        {
                            sbSql.Clear();
                            sbSql.Append("INSERT INTO PAR_MNGT_PAR_LOC_DETAILS(COUNT_ORDER,PAR_LOC_ID, ORG_ID, OPTIMAL_QTY, COUNT_REQUIRED, BIN_LOC, FILL_KILL_FLAG, ORDERING_TYPE, FOQ_QTY, MAX_QTY, CONVERSION_RATE, COST_CENTER, INV_BUSINESS_UNIT, REQUISITION_TYPE, ITEM_ID,LAST_UPDATE_DATE, USER_FIELD_1, REPLENISHMENT_TYPE, LAST_UPDATE_USER, UNIT_OF_PROCUREMENT, STATUS, LOT_CONTROLLED, SERIAL_CONTROLLED, CHARGE_CODE, UNIT_OF_ISSUE)  SELECT PLD.COUNT_ORDER,PLD.PAR_LOC_ID, PLD.ORG_ID, 0, PLD.COUNT_REQUIRED, PLD.BIN_LOC, PLD.FILL_KILL_FLAG, PLD.ORDERING_TYPE, PLD.FOQ_QTY, PLD.MAX_QTY, PLD.CONVERSION_RATE, PLD.COST_CENTER, PLD.INV_BUSINESS_UNIT, PLD.REQUISITION_TYPE, '" + SubItemID + "', GETDATE(), PMI.USER_FIELD_1,PMI.REPLENISHMENT_TYPE,PMI.LAST_UPDATE_USER,PMI.UNIT_OF_PROCUREMENT,  'Y',PMI.LOT_CONTROLLED,PMI.SERIAL_CONTROLLED,PMI.CHARGE_CODE,PMI.UNIT_OF_ISSUE FROM PAR_MNGT_PAR_LOC_DETAILS PLD, PAR_MNGT_ITEM PMI where PLD.ORG_ID='" + item.ORG_ID + "' AND PLD.PAR_LOC_ID='" + item.PAR_LOC_ID + "' AND PLD.BIN_LOC='" + item.BIN_LOC + "' AND PLD.ITEM_ID='" + item.ITEM_ID + "' AND PMI.ITEM_ID='" + item.ITEM_ID + "';");
                            sbSql.Append(System.Environment.NewLine);

                            var result = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                            itemsCount++;

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + itemsCount); }
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

        /// <summary>
        /// To Update the Substitute Item
        /// </summary>
        /// <param name="OrgGrpID"></param>
        /// <param name="ItemID"></param>
        /// <param name="SubItemID"></param>
        /// <param name="Status"></param>
        /// <param name="blnPharmItemAllocated"></param>
        /// <returns></returns>
        public long UpdateSubstituteItem(string OrgGrpID, string ItemID, string SubItemID, int Status, bool blnPharmItemAllocated)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE PAR_MNGT_ITEM_SUBSTITUTE SET STATUS=" + Status + " WHERE ORG_GROUP_ID='" + OrgGrpID + "' AND ITEM_ID='" + ItemID + "' AND SUBSTITUTE_ITEM_ID='" + SubItemID + "';");

                    if (blnPharmItemAllocated)
                    {
                        if (Status == 0)
                        {
                            sbSql.Append(" UPDATE PAR_MNGT_PAR_LOC_DETAILS SET STATUS='N' WHERE ITEM_ID='" + SubItemID + "'");
                        }
                        else
                        {
                            sbSql.Append(" UPDATE PAR_MNGT_PAR_LOC_DETAILS SET STATUS='Y' WHERE ITEM_ID='" + SubItemID + "'");
                        }
                    }

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

        /// <summary>
        /// To Check whether Substitute Item Exists or not
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="SubItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <returns></returns>
        public long IsSubstituteItemExistOrNot(string ItemID, string SubItemID, string OrgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var existingCostCenterCount = objContext.PAR_MNGT_ITEM_SUBSTITUTE.Count(c => c.ITEM_ID == ItemID
                                                                            && c.ORG_GROUP_ID == OrgGrpID && c.SUBSTITUTE_ITEM_ID == SubItemID);

                    if (existingCostCenterCount > 0)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Substitute Item ID : " + ItemID + " already exists"); }
                        return AtparStatusCodes.ATPAR_E_ALREADY_EXISTS;
                    }
                    else
                    {
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }

        }


        //public long GetLatestItemId(int appID)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
        //    long latestItemID = 0;
        //    try
        //    {
        //        var response = new AtParWebApiResponse<long>();
        //        response = _commonService.GetAtparLatestValues(appID, ITEM_ID_FIELD_NAME);
        //       // return response;

        //        //foreach (var item in response.DataVariable)
        //        //{
        //        //    latestItemID = item;
        //        //}

        //public long GetLatestItemId(int appID)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
        //    long latestItemID = 0;
        //    try
        //    {
        //        var response = new AtParWebApiResponse<long>();
        //        response = _commonService.GetAtparLatestValues(appID, ITEM_ID_FIELD_NAME);

        ///// <summary>
        ///// To Get the Latest Item ID
        ///// </summary>
        ///// <param name="appID"></param>
        ///// <returns></returns>
        public long GetLatestItemId(int appID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            long latestItemID = 0;
            try
            {
                var response = new AtParWebApiResponse<long>();
                response = _commonService.GetAtparLatestValues(appID, ITEM_ID_FIELD_NAME);

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }

            return latestItemID;
        }

        /// <summary>
        /// To Update the Item Status
        /// </summary>
        /// <param name="itemID"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public long UpdateItemStaus(string itemID, int status)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    if (status == 1)
                    {
                        sbSql.Append(" SELECT  PAR_LOC_ID FROM PAR_MNGT_PAR_LOC_DETAILS WHERE ITEM_ID ='" + itemID + "' AND STATUS ='Y'");

                        var value = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList().FirstOrDefault(); ;

                        if (!string.IsNullOrEmpty(value))
                        {
                            return AtparStatusCodes.CRCT_S_CANNOTINACTIVATE;
                        }
                    }

                    sbSql.Remove(0, sbSql.Length);
                    sbSql.Append("UPDATE PAR_MNGT_ITEM SET STATUS='" + status + "' WHERE ITEM_ID='" + itemID + "'");

                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());
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
    }
}
