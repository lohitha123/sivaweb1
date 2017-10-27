using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace AtPar.TrackIT.Repos
{
    public class CommonTrackITRepository : ICommonTrackITRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion

        #region Constructor

        public CommonTrackITRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CommonTrackITRepository));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to get the Vendor Details based on Org Group ID, Vendor ID and Search
        /// </summary>
        /// <param name="vendorID"></param>
        /// <param name="orgGroupID"></param>
        /// <returns></returns>
        public List<PAR_MNGT_VENDOR> GetVendorDetails(string vendorID, string orgGroupID, string search)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<PAR_MNGT_VENDOR> listVednors = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ATORG.ORG_GROUP_NAME, PARVNDR.ORG_GROUP_ID, PARVNDR.VENDOR_ID, PARVNDR.VENDOR_NAME, ");
                    sbSql.Append("PARVNDR.CONTACT_NAME, PARVNDR.ADDRESS1, PARVNDR.ADDRESS2, PARVNDR.CITY, PARVNDR.STATE, ");
                    sbSql.Append("PARVNDR.ZIP, PARVNDR.PHONE, PARVNDR.FAX, PARVNDR.CONTACT_E_MAIL, PARVNDR.ORDER_DESPATCH_TYPE, ");
                    sbSql.Append("PARVNDR.STATUS, PARVNDR.COUNTRY, PARVNDR.ALLOW_VEND_ACCESS, PARVNDR.BILL_ONLY_EMAIL, ");
                    sbSql.Append("PARVNDR.REMINDER_FREQ, PARVNDR.VEND_USER_ID FROM PAR_MNGT_VENDOR PARVNDR INNER JOIN  ");
                    sbSql.Append("MT_ATPAR_ORG_GROUPS ATORG ON PARVNDR.ORG_GROUP_ID = ATORG.ORG_GROUP_ID WHERE 1 = 1");

                    if ((!string.IsNullOrEmpty(orgGroupID)) && orgGroupID != "All")
                    {
                        sbSql.Append(" AND PARVNDR.ORG_GROUP_ID = '" + orgGroupID + "' ");

                        if (!string.IsNullOrEmpty(vendorID))
                        {
                            sbSql.Append(" AND PARVNDR.VENDOR_ID = '" + vendorID + "' ");
                        }

                        if (!string.IsNullOrEmpty(search))
                        {
                            sbSql.Append("AND (PARVNDR.VENDOR_ID LIKE '" + search + "%' ");
                            sbSql.Append("OR PARVNDR.VENDOR_NAME LIKE '" + search + "%' )");
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(vendorID))
                        {
                            sbSql.Append(" AND PARVNDR.VENDOR_ID = '" + vendorID + "' ");
                        }

                        if (!string.IsNullOrEmpty(search))
                        {
                            sbSql.Append("AND (PARVNDR.VENDOR_ID LIKE '" + search + "%' ");
                            sbSql.Append("OR PARVNDR.VENDOR_NAME LIKE '" + search + "%' )");
                        }
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "ORG_GROUP_NAME", "ORG_GROUP_ID", "VENDOR_ID", "VENDOR_NAME", "CONTACT_NAME",
                        "ADDRESS1", "ADDRESS2", "CITY", "STATE", "ZIP", "PHONE", "FAX", "CONTACT_E_MAIL", "ORDER_DESPATCH_TYPE",
                        "STATUS", "COUNTRY", "ALLOW_VEND_ACCESS", "BILL_ONLY_EMAIL", "REMINDER_FREQ", "VEND_USER_ID" };

                    listVednors = objContext.Database.DifferedExecuteQuery<PAR_MNGT_VENDOR>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Vendors Returned: " + listVednors.Count()); }

                    return listVednors;
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

        public string GetRequestorDefLoc(string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    string requestorID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID];

                    var defaultLoc = objContext.TKIT_REQUESTOR.Where(c => c.REQUESTOR_ID == requestorID).FirstOrDefault().LOCATION_ID;

                    return defaultLoc;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        /// <summary>
        /// Used to get the Indicators from DB
        /// </summary>
        /// <returns>Returns Indicators, if any exception throws exception</returns>
        public List<TKIT_EQ_INDICATOR> GetEqIndicators()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            List<TKIT_EQ_INDICATOR> lstData;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    lstData = objContext.TKIT_EQ_INDICATOR.OrderBy(c => c.EQ_INDICATOR).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Items Returned " + lstData.Count); }

                    return lstData;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        /// <summary>
        /// Used to get the Requestor Preferences
        /// </summary>
        /// <param name="preference"></param>
        /// <param name="requestorID"></param>
        /// <returns></returns>
        public string GetTKITMyPreferences(string preference, string requestorID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT " + preference + " FROM TKIT_REQUESTOR WHERE ");
                    sbSql.Append("REQUESTOR_ID = '" + requestorID + "'  ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var strRetVal = objContext.Database.SqlQuery<Int16?>(sbSql.ToString()).FirstOrDefault();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + strRetVal.ToString()); }

                    return strRetVal.ToString();
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
        /// Used to get the location form db.
        /// </summary>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public List<RM_SHIP_TO_LOCACTION> GetLocations(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<RM_SHIP_TO_LOCACTION> lstData = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT DISTINCT A.LOCATION_ID, A.LOCATION_NAME");
                    sbSql.Append(" FROM RM_SHIP_TO_LOCACTION A, MT_ATPAR_ORG_GROUP_BUNITS B");
                    sbSql.Append(" WHERE A.ORG_ID = B.BUSINESS_UNIT");
                    sbSql.Append(" AND STATUS = 1");

                    if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] != "All")
                    {
                        sbSql.Append(" AND B.ORG_GROUP_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "' ");
                    }

                    sbSql.Append(" ORDER BY LOCATION_ID ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "LOCATION_ID", "LOCATION_NAME" };

                    lstData = objContext.Database.DifferedExecuteQuery<RM_SHIP_TO_LOCACTION>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Rows Returned: " + lstData.Count()); }

                    return lstData;
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
        /// Gets the Equipment Types
        /// </summary>
        /// <param name="itemIndicator"></param>
        /// <param name="orgGrpId"></param>
        /// <returns></returns>
        public List<TKIT_ITEM_TYPE> GetEquipmentTypes(string itemIndicator, string orgGrpId, string searchEqTypeOrDesc)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ITEM_TYPE, ITEM_TYPE_INDICATOR, ITEM_TYPE_DESCR, ORG_GROUP_ID ");
                    sbSql.Append("FROM TKIT_ITEM_TYPE ");

                    if ((string.IsNullOrEmpty(itemIndicator).Equals(false)) && (itemIndicator.Equals("All") == false))
                    {
                        sbSql.Append("WHERE ITEM_TYPE_INDICATOR ='").Append(itemIndicator).Append("' ");
                    }

                    if ((string.IsNullOrEmpty(orgGrpId).Equals(false)) && (orgGrpId.Equals("All") == false))
                    {
                        StringBuilder sbSubSql = new StringBuilder();
                        sbSubSql.Append("ORG_GROUP_ID IN ( SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ");
                        sbSubSql.Append("BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                        sbSubSql.Append("WHERE ORG_GROUP_ID = '").Append(orgGrpId).Append("'))");

                        if (sbSql.ToString().Contains("WHERE"))
                        {
                            sbSql.Append("AND ");
                        }
                        else
                        {
                            sbSql.Append("WHERE ");
                        }

                        sbSql.Append(sbSubSql.ToString());
                        sbSubSql = null;
                    }

                    //if ((string.IsNullOrEmpty(orgGrpId).Equals(false)) && orgGrpId.Equals("All") == false)
                    //{
                    //    sbSql.Append(" WHERE ORG_GROUP_ID = '" + orgGrpId + "'");
                    //}

                    if (string.IsNullOrEmpty(searchEqTypeOrDesc).Equals(false))
                    {
                        if (sbSql.ToString().Contains("WHERE"))
                        {
                            sbSql.Append("AND ");
                            sbSql.Append(" (ITEM_TYPE LIKE '" + searchEqTypeOrDesc + "%' ");
                            sbSql.Append(" OR ITEM_TYPE_DESCR LIKE '" + searchEqTypeOrDesc + "%') ");
                        }
                        else
                        {
                            sbSql.Append("WHERE ");
                            sbSql.Append(" (ITEM_TYPE LIKE '" + searchEqTypeOrDesc + "%' ");
                            sbSql.Append(" OR ITEM_TYPE_DESCR LIKE '" + searchEqTypeOrDesc + "%') ");
                        }
                    }

                    sbSql.Append(" ORDER BY ITEM_TYPE");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var fields = new[] { "ORG_GROUP_ID", "ITEM_TYPE", "ITEM_TYPE_INDICATOR", "ITEM_TYPE_DESCR" };

                    var lstEquipmentTypes = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_TYPE>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstEquipmentTypes); }

                    return lstEquipmentTypes;
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

        #region Add To Cart

        public long AddToCart(string eqIndicator, TKIT_CART_MANAGER cartManager, List<TKIT_CART_MANAGER> lstDelItems, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        // to do need to pass item indicator
                        var isItemExist = IsItemExistInCartManager(cartManager.ITEM_ID, cartManager.LOCATION_ID, cartManager.PATIENT_ID, cartManager.SERIAL_NO, "", deviceTokenEntry, objContext);

                        if (!isItemExist)
                        {
                            if (eqIndicator == AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString())
                            {
                                var noOfItems = cartManager.REQUEST_QTY;
                                for (int i = 0; i < noOfItems; i++)
                                {
                                    cartManager.SERIAL_NO = (i + 1).ToString();
                                    cartManager.REQUEST_QTY = 1;
                                    StatusCode = InsertCartManager(cartManager, deviceTokenEntry, objContext);

                                    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        return StatusCode;
                                    }
                                }

                            }
                            else
                            {
                                StatusCode = InsertCartManager(cartManager, deviceTokenEntry, objContext);

                                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return StatusCode;
                                }
                            }

                        }
                        else
                        {
                            //return AtparStatusCodes.TKIT_E_ITEM_ADDEDTOTHECART;
                        }
                        //else
                        //{
                        //    StatusCode = UpdateCartManager(cartManager, "", deviceTokenEntry, objContext);

                        //    if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        //    {
                        //        trans.Rollback();
                        //        return StatusCode;
                        //    }
                        //}

                        //StatusCode = DeleteItemsFromCartManager(lstDelItems, deviceTokenEntry, objContext);

                        //if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        //{
                        //    trans.Rollback();
                        //    return StatusCode;
                        //}


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

        private bool IsItemExistInCartManager(string itemID, string deliverToLocaitonID, string patientID, string serialNO, string itemTypeIndicator, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();

            try
            {
                sbSql.Append("SELECT Count(ITEM_ID) FROM TKIT_CART_MANAGER ");
                sbSql.Append("WHERE REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "' ");
                sbSql.Append("AND ITEM_ID = '" + itemID + "'");

                if (!string.IsNullOrEmpty(deliverToLocaitonID))
                {
                    sbSql.Append("AND LOCATION_ID = '" + deliverToLocaitonID + "'");
                }

                //if (!string.IsNullOrEmpty(patientID))
                //{
                //    sbSql.Append("AND PATIENT_ID = '" + patientID + "'");
                //}

                sbSql.Append("AND PATIENT_ID = '" + patientID + "'");

                if (itemTypeIndicator == AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString())
                {
                    sbSql.Append(" AND SERIAL_NO = '" + serialNO + "'");
                }

                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Carts Count " + count); }

                if (count > 0)
                {
                    return true;
                }
                else
                {
                    return false;
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

        private long InsertCartManager(TKIT_CART_MANAGER tkitCartManager, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" INSERT INTO TKIT_CART_MANAGER(");
                sbSql.Append(" ORG_GROUP_ID,");
                sbSql.Append(" REQUESTOR_ID,ITEM_ID,");
                sbSql.Append(" ITEM_DESCR,");
                sbSql.Append(" SERIAL_NO,");
                sbSql.Append(" REQUEST_QTY,");
                sbSql.Append(" LOCATION_ID,");
                sbSql.Append(" ESTIMATED_RETURN_DATE,");
                sbSql.Append(" NEEDED_BY_DATE,");
                sbSql.Append(" PATIENT_ID,");
                sbSql.Append(" PATIENT_LAST_NAME,");
                sbSql.Append(" PROCEDURE_CODE");
                sbSql.Append(") VALUES (");
                sbSql.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() + "', ");
                sbSql.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "', ");
                sbSql.Append("'" + tkitCartManager.ITEM_ID + "', ");
                sbSql.Append("'" + tkitCartManager.ITEM_DESCR.Replace("'", "''") + "', ");

                if (tkitCartManager.SERIAL_NO.ToString() != "" && tkitCartManager.SERIAL_NO.ToString() != "0")
                {
                    sbSql.Append(tkitCartManager.SERIAL_NO + ", ");
                }
                else
                {
                    sbSql.Append("''" + ", ");
                }

                if (tkitCartManager.REQUEST_QTY.ToString() != "")
                {
                    sbSql.Append(tkitCartManager.REQUEST_QTY + ", ");
                }
                else
                {
                    sbSql.Append(1 + ", ");
                }

                sbSql.Append(" '" + tkitCartManager.LOCATION_ID + "', ");

                if (tkitCartManager.ESTIMATED_RETURN_DATE.ToString() != "")
                {
                    sbSql.Append("'" + tkitCartManager.ESTIMATED_RETURN_DATE + "', ");
                }
                else
                {
                    sbSql.Append("NULL, ");
                }

                if (tkitCartManager.NEEDED_BY_DATE.ToString() != "")
                {
                    sbSql.Append("'" + tkitCartManager.NEEDED_BY_DATE + "', ");
                }
                else
                {
                    sbSql.Append("NULL, ");
                }

                sbSql.Append(" '" + tkitCartManager.PATIENT_ID + "', ");
                sbSql.Append(" '" + tkitCartManager.PATIENT_LAST_NAME + "', ");
                sbSql.Append(" '" + tkitCartManager.PROCEDURE_CODE + "')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

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

        private long UpdateCartManager(TKIT_CART_MANAGER tkitCartManager, string itemTypeIndicator, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" UPDATE TKIT_CART_MANAGER SET ");

                if (tkitCartManager.REQUEST_QTY.ToString() != "")
                {
                    sbSql.Append("REQUEST_QTY = " + tkitCartManager.REQUEST_QTY + ", ");
                }
                else
                {
                    sbSql.Append("REQUEST_QTY = NULL" + ", ");
                }

                sbSql.Append(" LOCATION_ID = " + "'" + tkitCartManager.LOCATION_ID + "', ");

                if (tkitCartManager.ESTIMATED_RETURN_DATE.ToString() != "")
                {
                    sbSql.Append("ESTIMATED_RETURN_DATE = " + tkitCartManager.ESTIMATED_RETURN_DATE + ", ");
                }
                else
                {
                    sbSql.Append("ESTIMATED_RETURN_DATE = NULL" + ", ");
                }

                if (tkitCartManager.NEEDED_BY_DATE.ToString() != "")
                {
                    sbSql.Append("NEEDED_BY_DATE = " + tkitCartManager.NEEDED_BY_DATE + ", ");
                }
                else
                {
                    sbSql.Append("NEEDED_BY_DATE = NULL" + ", ");
                }

                if (tkitCartManager.PATIENT_ID.ToString() != "")
                {
                    sbSql.Append("PATIENT_ID = " + tkitCartManager.PATIENT_ID + ", ");
                }
                else
                {
                    sbSql.Append("PATIENT_ID = NULL" + ", ");
                }

                if (tkitCartManager.PATIENT_LAST_NAME.ToString() != "")
                {
                    sbSql.Append("PATIENT_LAST_NAME = " + tkitCartManager.PATIENT_LAST_NAME + ", ");
                }
                else
                {
                    sbSql.Append("PATIENT_LAST_NAME = NULL" + ", ");
                }

                sbSql.Append("WHERE REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "' ");
                sbSql.Append("AND ITEM_ID='" + tkitCartManager.ITEM_ID + "' ");

                if (itemTypeIndicator == AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString())
                {
                    sbSql.Append(" AND SERIAL_NO = '" + tkitCartManager.SERIAL_NO + "'");
                }

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

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

        private long DeleteItemsFromCartManager(List<TKIT_CART_MANAGER> lstDelItems, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                if (lstDelItems.Count > 0)
                {
                    foreach (var item in lstDelItems)
                    {
                        sbSql.Clear();

                        if (item.SERIAL_NO != "")
                        {
                            sbSql.Append(" DELETE FROM TKIT_CART_MANAGER");
                            sbSql.Append(" WHERE REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");
                            sbSql.Append(" AND ITEM_ID = '" + item.ITEM_ID + "'");
                            sbSql.Append(" AND SERIAL_NO = '" + item.SERIAL_NO + "'");
                        }
                        else
                        {
                            sbSql.Append(" DELETE FROM TKIT_CART_MANAGER");
                            sbSql.Append(" WHERE REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");
                            sbSql.Append(" AND ITEM_ID = '" + item.ITEM_ID + "'");
                        }

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

                    }
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

        #endregion

        #region User Details

        public TKIT_REQUESTOR GetUserDetails(string requestorID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var user = objContext.TKIT_REQUESTOR.Where(x => x.REQUESTOR_ID == requestorID).FirstOrDefault();

                    if (user != null)
                    {
                        user.PASSWORD = "";
                        user.NEWPASSWORD = "";
                        if (user.IMAGE == null || (user.IMAGE + "") == "")
                        {
                            byte[] imageDataBytes = null;
                            var filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/users/");
                            var pathFiles = Directory.GetFiles(filePath);
                            if (pathFiles.Count() == 1)
                            {
                                Image img = Image.FromFile(pathFiles[0].ToString());
                                using (MemoryStream mStream = new MemoryStream())
                                {
                                    img.Save(mStream, img.RawFormat);
                                    imageDataBytes = mStream.ToArray();
                                }
                            }
                            user.IMAGE = imageDataBytes;
                        }
                    }



                    return user;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        public long IsUserMatched(string userID, string oldPassword)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int cnt = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    cnt = objContext.TKIT_REQUESTOR.Count(c => c.REQUESTOR_ID == userID && c.PASSWORD == oldPassword);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Users Count " + cnt); }

                    if (cnt > 0)
                    {
                        return AtparStatusCodes.ATPAR_OK;
                    }
                    return AtparStatusCodes.ATPAR_E_OLDPASSWORDNOTMATCHED;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
        }

        /// <summary>
        /// Used to Update the Requestor
        /// </summary>
        /// <param name="requestor"></param>
        /// <param name="objContext"></param>
        /// <returns>If Requestor updated successfully returns ATPAR_OK else returns ATPAR_E_LOCALDBUPDATEFAIL</returns>
        public long UpdateUserDetails(TKIT_REQUESTOR requestor)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    //long checkUserPwd = -1;
                    //if (!string.IsNullOrEmpty(requestor.PASSWORD))
                    //{
                    //    checkUserPwd = IsUserMatched(requestor.REQUESTOR_ID, requestor.PASSWORD);
                    //}
                    //else
                    //{
                    //    checkUserPwd = 0;
                    //}

                    byte[] imageDataBytes = null;
                    var filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/TrackITUserProfileImage/");

                    if (!Directory.Exists(filePath))
                    {
                        filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/users/");
                    }
                    else
                    {
                        //if (Directory.GetFiles(filePath).Count() == 0)
                        //{
                        //    filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/users/");
                        //}
                    }

                    var pathFiles = Directory.GetFiles(filePath);

                    if (pathFiles.Count() == 1)
                    {
                        Image img = Image.FromFile(pathFiles[0].ToString());
                        using (MemoryStream mStream = new MemoryStream())
                        {
                            img.Save(mStream, img.RawFormat);
                            imageDataBytes = mStream.ToArray();
                        }
                        img.Dispose();
                    }




                    sbSql.Append("UPDATE TKIT_REQUESTOR SET");

                    if (!string.IsNullOrEmpty(requestor.NEWPASSWORD))
                    {
                        var StatusCode = IsUserMatched(requestor.REQUESTOR_ID, requestor.PASSWORD);
                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            return StatusCode;
                        }
                    }

                    //if (!string.IsNullOrEmpty(requestor.PASSWORD))
                    //{
                    //    sbSql.Append(" PASSWORD = '" + requestor.PASSWORD + "', ");
                    //}

                    if (!string.IsNullOrEmpty(requestor.NEWPASSWORD))
                    {
                        sbSql.Append(" PASSWORD = @newPassword, ");
                    }

                    sbSql.Append(" FIRST_NAME = @FirstName, ");
                    sbSql.Append("MIDDLE_INIT = @MiddleName, ");
                    sbSql.Append("LAST_NAME = @LastName, ");
                    sbSql.Append("PHONE = @Phone, ");
                    sbSql.Append("EMAIL = @Email, ");
                    sbSql.Append("FAX = @Fax, ");
                    sbSql.Append("PAGER = @Pager, ");
                    sbSql.Append("LOCATION_ID = @LocationID, ");
                    sbSql.Append("ORG_GROUP_ID = @OrgGroup, ");

                    if (!string.IsNullOrEmpty(requestor.STATUS))
                    {
                        sbSql.Append("STATUS =@Status, ");
                    }

                    sbSql.Append("RECORDS_PER_PAGE =@RecordsPage");
                    sbSql.Append(", DEFAULT_REPORT_DURATION = @RDuration");
                    sbSql.Append(", NO_OF_REQUESTS_FOR_SAME_EQ_ITM = @RequestEQTime");

                   
                    if (imageDataBytes != null && imageDataBytes.Length > 0)
                    {
                        sbSql.Append(", IMAGE = @image");
                    }
                    sbSql.Append(" WHERE REQUESTOR_ID = @RequestedId");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    SqlParameter imgcol = null;
                    // if (requestor.IMAGE == null && imageDataBytes != null ) { 
                    imgcol = new SqlParameter("@image", SqlDbType.VarBinary);
                    imgcol.Value = imageDataBytes;
                    //}
                    var firstname = new SqlParameter("@FirstName", requestor.FIRST_NAME);
                    var MiddleName = new SqlParameter("@MiddleName", requestor.MIDDLE_INIT);
                    var LastName = new SqlParameter("@LastName", requestor.LAST_NAME);
                    var Phone = new SqlParameter("@Phone", requestor.PHONE);
                    var Email = new SqlParameter("@Email", requestor.EMAIL);
                    var Fax = new SqlParameter("@Fax", requestor.FAX);
                    var Pager = new SqlParameter("@Pager", requestor.PAGER);
                    var LocationID = new SqlParameter("@LocationID", requestor.LOCATION_ID);
                    var OrgGroup = new SqlParameter("@OrgGroup", requestor.ORG_GROUP_ID);
                    var Status = new SqlParameter("@Status", requestor.STATUS);
                    var RecordsPage = new SqlParameter("@RecordsPage", requestor.RECORDS_PER_PAGE);
                    var RDuration = new SqlParameter("@RDuration", requestor.DEFAULT_REPORT_DURATION);
                    var RequestEQTime = new SqlParameter("@RequestEQTime", requestor.NO_OF_REQUESTS_FOR_SAME_EQ_ITM);
                    var RequestedId = new SqlParameter("@RequestedId", requestor.REQUESTOR_ID);

                    // insertData("<Sp Name>", sp);
                    //var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString(), new SqlParameter("@newPassword", requestor.NEWPASSWORD), imgcol);
                    var count = 0;
                    if (imageDataBytes != null && imageDataBytes.Length > 0)
                    {
                        count = objContext.Database.ExecuteSqlCommand(sbSql.ToString(), new SqlParameter("@newPassword", requestor.NEWPASSWORD), firstname,
                 MiddleName, LastName, Phone, Email, Fax, Pager, LocationID, OrgGroup, Status, RecordsPage, RDuration, RequestEQTime, imgcol, RequestedId);
                    }
                    else
                    {
                        count = objContext.Database.ExecuteSqlCommand(sbSql.ToString(), new SqlParameter("@newPassword", requestor.NEWPASSWORD), firstname,
              MiddleName, LastName, Phone, Email, Fax, Pager, LocationID, OrgGroup, Status, RecordsPage, RDuration, RequestEQTime, RequestedId);
                    }
                    filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/TrackITUserProfileImage/");
                    if (Directory.Exists(filePath))
                    {
                        pathFiles = Directory.GetFiles(filePath);
                        foreach (var file in pathFiles)
                        {
                            if (file.ToString() == filePath + "default.png")
                            {
                                File.Delete(file.ToString());
                            }
                        }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }


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

        #region Item Master

        public List<TKIT_ITEM_MASTER> GetMasterItemsForTheSelectedEqType(string eqType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ORG_GROUP_ID, ITEM_TYPE, ITEM_ID, ITEM_DESCR, COMMENTS ");
                    sbSql.Append("FROM TKIT_ITEM_MASTER WHERE ITEM_TYPE = '" + eqType + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[]
                        {"ORG_GROUP_ID", "ITEM_TYPE", "ITEM_ID", "ITEM_DESCR", "COMMENTS"};

                    var lstMasterItems = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_MASTER>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstMasterItems); }

                    return lstMasterItems;
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


        #region GetAtparLatestValues

        public string GetAtparLatestValues(int appID, string fieldName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long latestVal;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT LATEST_VALUE FROM MT_ATPAR_LATEST_VALUES WHERE APP_ID=" + appID + " AND FIELD_ID='" + fieldName + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    latestVal = objContext.Database.SqlQuery<Int32>(sbSql.ToString()).FirstOrDefault();

                    latestVal += 1;

                    sbSql.Remove(0, sbSql.Length);

                    sbSql.Append("UPDATE MT_ATPAR_LATEST_VALUES  SET LATEST_VALUE=" + latestVal + " WHERE APP_ID=" + appID + "  AND FIELD_ID='" + fieldName + "'");

                    objContext.Database.ExecuteSqlCommand(sbSql.ToString());



                    if (fieldName == "ASSET_ID")
                    {
                        var value = latestVal.ToString().PadLeft(9, '0');
                        return value;
                    }


                    return latestVal.ToString();
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

        #region Get Cart Items        

        public List<VM_VIEW_CART> GetCartItems(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    //sbSQL.Append(" SELECT DISTINCT A.ID, A.ITEM_ID, 0 AS CHK_VALUE, A.ITEM_DESCR, A.SERIAL_NO, A.REQUEST_QTY, A.LOCATION_ID, ");
                    //sbSQL.Append(" A.ESTIMATED_RETURN_DATE, F.ITEM_QTY, C.ITEM_TYPE_INDICATOR, B.IMAGE, A.NEEDED_BY_DATE, ");
                    //sbSQL.Append(" A.PATIENT_ID, A.PATIENT_LAST_NAME, A.PROCEDURE_CODE ");
                    //sbSQL.Append(" FROM TKIT_CART_MANAGER A,TKIT_ITEM_MASTER B, TKIT_ITEM_TYPE C, TKIT_ITEM_INVENTORY F WHERE ");
                    //sbSQL.Append(" A.ITEM_ID=B.ITEM_ID AND B.ITEM_ID = F.ITEM_ID AND B.ITEM_TYPE = C.ITEM_TYPE AND A.REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");

                    sbSQL.Append("SELECT A.ID, A.ITEM_ID, 0 AS CHK_VALUE, A.ITEM_DESCR, A.SERIAL_NO, A.REQUEST_QTY, A.LOCATION_ID, ");
                    sbSQL.Append("A.ESTIMATED_RETURN_DATE, B.IMAGE, A.NEEDED_BY_DATE, ");
                    sbSQL.Append("A.PATIENT_ID, A.PATIENT_LAST_NAME, A.PROCEDURE_CODE, C.ITEM_TYPE, D.ITEM_QTY, C.ITEM_TYPE_INDICATOR ");
                    sbSQL.Append("FROM(SELECT ITEM_ID, ORG_GROUP_ID, ITEM_TYPE, SUM(ITEM_QTY) AS ITEM_QTY FROM TKIT_ITEM_INVENTORY D ");
                    sbSQL.Append("GROUP BY ITEM_ID, ORG_GROUP_ID, ITEM_TYPE) D, TKIT_CART_MANAGER A ");
                    sbSQL.Append("INNER JOIN TKIT_ITEM_MASTER B ON A.ITEM_ID = B.ITEM_ID AND A.ORG_GROUP_ID = B.ORG_GROUP_ID ");
                    sbSQL.Append("INNER JOIN TKIT_ITEM_TYPE C ON B.ITEM_TYPE = C.ITEM_TYPE AND A.ORG_GROUP_ID = C.ORG_GROUP_ID AND B.ORG_GROUP_ID = C.ORG_GROUP_ID ");
                    sbSQL.Append("WHERE A.ITEM_ID = D.ITEM_ID AND A.ORG_GROUP_ID = D.ORG_GROUP_ID AND C.ITEM_TYPE = D.ITEM_TYPE AND B.ITEM_TYPE = D.ITEM_TYPE AND A.REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "' ");



                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var lstCostCostCenters = objContext.Database.SqlQuery<VM_VIEW_CART>(sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstCostCostCenters.Count); }


                    return lstCostCostCenters;

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

        #endregion
    }
}
