using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace AtPar.POU.Repos
{
    public class SetupItemAttributesRepository : ISetupItemAttributesRepository
    {
        private ILog _log;
        public SetupItemAttributesRepository(ILog log)
        {
            _log = log;
        }

        #region SaveDeptItemAttributes
        public Tuple<long, List<string>> SaveDeptItemAttributes(List<VM_MT_POU_ITEM_ATTRIBUTES> lstItemAtributes, string deptID, string bUnit, string locationType, string itemID, string orgGrpID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            double qtyOnHand = 0;
            List<string> lstItemID = new List<string>();
            string serial = string.Empty;
            long statusCode = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (lstItemAtributes != null && lstItemAtributes.Count > 0)
                        {
                            foreach (var item in lstItemAtributes)
                            {
                                if (item.CART_INVENTORY_ITEM == "Y")
                                {
                                    continue;
                                }

                                if (item.LOT == true | item.SERIAL == true)
                                {
                                    if (item.CART_INVENTORY_ITEM != "CI")
                                    {
                                        try
                                        {
                                            qtyOnHand = GetItemQuantityOnHandCount(item.LOCATION, item.ITEM_ID, item.BUSINESS_UNIT, objContext);
                                        }
                                        catch (Exception ex)
                                        {
                                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                                            trans.Rollback();
                                            return new Tuple<long, List<string>>(AtparStatusCodes.S_POU_ITEMEXIST, null);
                                        }
                                        if (qtyOnHand != 0)
                                        {
                                            string itID = item.ITEM_ID;
                                            lstItemID.Add(itID);
                                        }
                                    }
                                }
                                statusCode = DeleteItemAttributes(orgGrpID, item.BUSINESS_UNIT, item.LOCATION, item.ITEM_ID, objContext);

                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return new Tuple<long, List<string>>(statusCode, null);
                                }

                            }

                            if (lstItemID.Count > 0)
                            {
                                return new Tuple<long, List<string>>(AtparStatusCodes.S_POU_ITEMEXIST, lstItemID);
                            }

                           

                            foreach (var item in lstItemAtributes)
                            {
                                string lot = string.Empty;

                                if (item.LOT == true)
                                {
                                    lot = "Y";
                                }
                                else
                                {
                                    lot = "N";
                                }

                                serial = string.Empty;
                                if (item.SERIAL == true)
                                {
                                    serial = "Y";
                                }
                                else
                                {
                                    serial = "N";
                                }

                                string _strIssueUOM = string.Empty;

                                string issueUOM = !string.IsNullOrEmpty(item.ISSUE_UOM) ? item.ISSUE_UOM : string.Empty;
                                string conversionFactor = item.CONVERSION_FACTOR;
                                string parUom = item.PAR_UOM;
                                string convRtParToCF = string.Empty;
                                convRtParToCF = !string.IsNullOrEmpty(item.CONV_RATE_PAR_TO_ISSUE_CF) ? item.CONV_RATE_PAR_TO_ISSUE_CF : string.Empty;

                                //'Update LOT_NUMBER and SERIAL_NUMBER in MT_POU_CART_INVENTORY

                                if (lot == "Y" || serial == "Y")
                                {
                                    try
                                    {
                                        qtyOnHand = GetCartInventoryCount(item.LOCATION, item.ITEM_ID, item.BUSINESS_UNIT, objContext);
                                    }
                                    catch (Exception ex)
                                    {
                                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                                        trans.Rollback();
                                        return new Tuple<long, List<string>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                                    }

                                    if (qtyOnHand > 0)
                                    {
                                        statusCode = DeleteCartInventory(item.LOCATION, item.ITEM_ID, item.BUSINESS_UNIT, objContext);

                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            return new Tuple<long, List<string>>(statusCode, null);
                                        }

                                        string itID = item.ITEM_ID;
                                        lstItemID.Add(itID);
                                    }
                                }

                                if (lot == "Y" || serial == "Y" || !(item.ISSUE_UOM == string.Empty) || !(item.CONVERSION_FACTOR == string.Empty))
                                {



                                    statusCode = InsertItemAttributes(item.ITEM_ID, item.BUSINESS_UNIT, item.LOCATION, lot, serial, userID, item.ISSUE_UOM, item.CONVERSION_FACTOR,parUom, convRtParToCF, orgGrpID, objContext);

                                    if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        return new Tuple<long, List<string>>(statusCode, null);
                                    }
                                }
                            }
                        }
                        trans.Commit();
                    }
                }
                return new Tuple<long, List<string>>(AtparStatusCodes.ATPAR_OK, lstItemID);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, List<string>>(AtparStatusCodes.E_SERVERERROR, null);
            }
        }

        private double GetItemQuantityOnHandCount(string cartID, string itemID, string bUnit, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT ITEM_QUANTITY_ON_HAND FROM MT_POU_CART_INVENTORY WHERE CART_ID='").Append(cartID).Append("' AND ITEM_ID = '").Append(itemID).Append("'").Append("  AND BUSINESS_UNIT='").Append(bUnit).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                var itemQuantityCount = objContext.Database.SqlQuery<double>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of userId's  returned : " + itemQuantityCount); }

                return itemQuantityCount;
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

        private long DeleteItemAttributes(string orgGrpID, string bUnit, string locationType, string itemID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_ATPAR_ITEM_ATTRIBUTES WHERE  ORG_GROUP_ID ='").Append(orgGrpID).Append("'");

                if (!(string.IsNullOrEmpty(bUnit)))
                {
                    sbSql.Append(" AND BUSINESS_UNIT = '").Append(bUnit).Append("'");
                }

                if (!string.IsNullOrEmpty(locationType))
                {
                    sbSql.Append(" AND CART_ID ='").Append(locationType).Append("'");
                }

                if (!string.IsNullOrEmpty(itemID))
                {
                    sbSql.Append(" AND ITEM_ID = '").Append(itemID).Append("'");
                }

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.of rows deleted " + count); }

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

        private int GetCartInventoryCount(string cartID, string itemID, string bUnit, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT COUNT(*) FROM MT_POU_CART_INVENTORY WHERE CART_ID='").Append(cartID).Append("' AND ITEM_ID = '").Append(itemID).Append("'").Append("  AND BUSINESS_UNIT='").Append(bUnit).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                var cartInventoryCount = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of userId's  returned : " + cartInventoryCount); }

                return cartInventoryCount;
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

        private long DeleteCartInventory(string cartID, string itemID, string bUnit, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                //sbSql.Append("DELETE FROM MT_POU_CART_INVENTORY WHERE CART_ID='").Append(cartID).Append("'").Append("' AND ITEM_ID = '").Append(itemID).Append(" AND BUSINESS_UNIT='").Append(bUnit).Append("' AND ITEM_QUANTITY_ON_HAND = 0");


                sbSql = "DELETE FROM MT_POU_CART_INVENTORY WHERE CART_ID='" + cartID + "' AND ITEM_ID = '" + itemID + "'  AND BUSINESS_UNIT='" + bUnit + "' AND ITEM_QUANTITY_ON_HAND = 0";

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.of rows deleted " + count); }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        private long InsertItemAttributes(string itemID, string bUnit, string cartID, string lot, string serial, string userID, string issueUOM, string conversionFactor,string parUom,string convRtParToCF,  string orgGrpID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_ATPAR_ITEM_ATTRIBUTES(").Append("ITEM_ID, ")
                            .Append("BUSINESS_UNIT, ")
                            .Append("CART_ID, ")
                            .Append("LOT_CONTROLLED, ")
                            .Append("SERIAL_CONTROLLED, ")
                            .Append("LAST_UPDATE_DATE, ")
                            .Append("LAST_UPDATE_USERID, ")
                            .Append("ISSUE_UOM, ")
                            .Append("CONVERSION_FACTOR, ")
                            .Append("PAR_UOM, ")
                            .Append("CONV_RATE_PAR_TO_ISSUE_CF, ")
                            .Append("ORG_GROUP_ID) ")
                            .Append("VALUES(")
                            .Append("'").Append(itemID).Append("',")
                            .Append("'").Append(bUnit).Append("',")
                            .Append("'").Append(cartID).Append("',")
                            .Append("'").Append(lot).Append("',")
                            .Append("'").Append(serial).Append("',")
                            .Append(" GETDATE(),")
                            .Append("'").Append(userID).Append("',")
                            .Append("'").Append(issueUOM).Append("',")
                            .Append("'").Append(conversionFactor).Append("',")
                            .Append("'").Append(parUom).Append("',")
                            .Append("'").Append(convRtParToCF).Append("',")
                            .Append("'").Append(orgGrpID).Append("')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
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

     

        #region GetItemAttributesDetails

      

        public string GetStorageArea(string deptID, string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string storageArea = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ISNULL(STORAGE_AREA,'') FROM MT_POU_DEPT WHERE DEPT_ID ='").Append(deptID).Append("'").Append("AND ORG_GROUP_ID='").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    storageArea = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Storage Area Returned: " + storageArea); }

                    return storageArea;
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

        public List<MT_POU_CRITICAL_ITEMS> GetCriticalItems(string cartID, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_POU_CRITICAL_ITEMS> lstCriticalItems = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ITEM_ID, CART_ID, BUSINESS_UNIT FROM MT_POU_CRITICAL_ITEMS WHERE CART_ID = '").Append(cartID).Append(" ' AND BUSINESS_UNIT = '").Append(bUnit).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    lstCriticalItems = objContext.Database.SqlQuery<MT_POU_CRITICAL_ITEMS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Business units returned: " + lstCriticalItems.Count()); }

                    return lstCriticalItems;
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

       

        public List<MT_POU_DEPT_CART_ALLOCATIONS> GetDeptCartAllocations(string orgGrpID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT CART_ID, DEPARTMENT_ID,BUSINESS_UNIT, ORG_GROUP_ID, 'I' FLAG, LOCATION_TYPE FROM MT_POU_DEPT_CART_ALLOCATIONS WHERE ORG_GROUP_ID = '").Append(orgGrpID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[]
                        {"CART_ID", "DEPARTMENT_ID", "BUSINESS_UNIT", "ORG_GROUP_ID","FLAG", "LOCATION_TYPE"};

                    var lstDeptCartAllocations = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_CART_ALLOCATIONS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstDeptCartAllocations); }

                    return lstDeptCartAllocations;
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

        public List<MT_POU_CART_INVENTORY> GetCartInventory(string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT CART_ID,ITEM_ID,ITEM_QUANTITY_ON_HAND,BUSINESS_UNIT,LOT_NUMBER,SERIAL_NUMBER FROM MT_POU_CART_INVENTORY");

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        sbSql.Append(" WHERE BUSINESS_UNIT = '").Append(bUnit).Append("'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[]
                        {"CART_ID", "ITEM_ID", "ITEM_QUANTITY_ON_HAND", "BUSINESS_UNIT", "LOT_NUMBER", "SERIAL_NUMBER"};

                    var lstcartInventory = objContext.Database.DifferedExecuteQuery<MT_POU_CART_INVENTORY>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstcartInventory); }

                    return lstcartInventory;
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

        public List<MT_ATPAR_ITEM_ATTRIBUTES> GetItemAttributes(string bUnit, string cartID,string orgGroupID,string itemID )
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ITEM_ID,BUSINESS_UNIT,CART_ID,LOT_CONTROLLED,SERIAL_CONTROLLED,LAST_UPDATE_DATE,LAST_UPDATE_USERID, ISSUE_UOM,CONVERSION_FACTOR,PAR_UOM,CONV_RATE_PAR_TO_ISSUE_CF,ORG_GROUP_ID FROM MT_ATPAR_ITEM_ATTRIBUTES  WHERE ORG_GROUP_ID = '").Append(orgGroupID).Append("'");

                        if(!string.IsNullOrEmpty(bUnit))
                    {
                        sbSql.Append(" AND BUSINESS_UNIT = '").Append(bUnit).Append("'");
                    }

                        if(!string.IsNullOrEmpty(cartID))
                    {
                        sbSql.Append(" AND CART_ID ='").Append(cartID).Append("'");
                    }
                        if(!string.IsNullOrEmpty(itemID))
                    {
                        sbSql.Append(" AND ITEM_ID = '").Append(itemID).Append("'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstItemAttributes = objContext.Database.SqlQuery<MT_ATPAR_ITEM_ATTRIBUTES>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemAttributes); }

                    return lstItemAttributes;
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
    }
}
