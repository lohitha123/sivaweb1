using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace AtPar.TrackIT.Repos
{
    public class CheckInCheckOutItemsRepository : ICheckInCheckOutItemsRepository
    {
        #region Private Variable

        private ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public CheckInCheckOutItemsRepository(ILog log, ICommonRepository commonRepository)
        {
            _log = log;
            _log.SetLoggerType(typeof(CheckInCheckOutItemsRepository));
            _commonRepo = commonRepository;
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the Item Status
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public List<TKIT_ITEM_MASTER> GetItemStatus(string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT M.ITEM_ID, M.ITEM_INACTIVATED ");
                    sbSql.Append("FROM TKIT_ITEM_MASTER M JOIN TKIT_ITEM_INVENTORY I ON ");
                    sbSql.Append("M.ORG_GROUP_ID = I.ORG_GROUP_ID AND M.ITEM_TYPE = I.ITEM_TYPE AND M.ITEM_ID = I.ITEM_ID ");
                    sbSql.Append("WHERE M.ITEM_ID = '").Append(itemId).Append("'");
                    sbSql.Append("OR I.ASSET_ID = '").Append(itemId).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_ID", "ITEM_INACTIVATED" };

                    var lstItemDetails = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_MASTER>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Items Returned " + lstItemDetails.Count); }

                    return lstItemDetails;
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
        /// Gets the ItemType Indicator
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public string GetItemTypeIndicator(string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ITEM_TYPE_INDICATOR ");
                    sbSql.Append("FROM TKIT_ITEM_TYPE ");
                    sbSql.Append("WHERE ITEM_TYPE = (SELECT ITEM_TYPE FROM TKIT_ITEM_MASTER WHERE ITEM_ID = '");
                    sbSql.Append(itemId).Append("')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_TYPE_INDICATOR" };

                    return objContext.Database.DifferedExecuteQuery<TKIT_ITEM_TYPE>(fields, sbSql.ToString()).FirstOrDefault().ITEM_TYPE_INDICATOR;
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
        /// Checks the EQItem Availability
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="requestor"></param>
        /// <returns></returns>
        public List<TKIT_ITEM_INVENTORY> CheckEqItemAvailability(string itemId, string requestor)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    List<TKIT_ITEM_DEPT> lstItemDeptInfo = objContext.TKIT_ITEM_DEPT.Where(c => c.ITEM_ID == itemId).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Items Returned " + lstItemDeptInfo.Count); }

                    sbSql.Append("SELECT DISTINCT A.ITEM_QTY ");
                    sbSql.Append("FROM TKIT_ITEM_INVENTORY A, TKIT_ITEM_MASTER M, TKIT_REQUESTOR_DEPT C ");

                    if (lstItemDeptInfo.Count > 0)
                    {
                        sbSql.Append(", TKIT_ITEM_DEPT B ");
                    }

                    sbSql.Append("WHERE ( (A.OWNER = C.DEPT_ID) OR (A.OWNER = ' ') ");

                    if (lstItemDeptInfo.Count > 0)
                    {
                        sbSql.Append("OR (C.DEPT_ID = B.DEPT_ID AND A.ITEM_ID = B.ITEM_ID)");
                    }

                    sbSql.Append(" ) ");
                    sbSql.Append("AND M.ORG_GROUP_ID = A.ORG_GROUP_ID AND M.ITEM_TYPE = A.ITEM_TYPE AND  M.ITEM_ID = A.ITEM_ID ");
                    sbSql.Append("AND A.ITEM_ID = '").Append(itemId).Append("' ");
                    sbSql.Append("AND C.REQUESTOR_ID = '").Append(requestor).Append("' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_QTY" };

                    var lstItemInvDetails = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_INVENTORY>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemInvDetails); }

                    return lstItemInvDetails;
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
        /// Checks the Item Availability
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public List<TKIT_ITEM_INVENTORY> CheckItemAvailability(string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.ITEM_QTY ");
                    sbSql.Append("FROM TKIT_ITEM_INVENTORY A JOIN TKIT_ITEM_MASTER B ");
                    sbSql.Append("ON A.ITEM_ID = B.ITEM_ID ");
                    sbSql.Append("WHERE A.ITEM_ID = '").Append(itemId).Append("' ");
                    sbSql.Append("AND B.DESTRUCTION_DATE >= '").Append(DateTime.Now.Date.ToString()).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_QTY" };

                    var lstInvItemDetails = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_INVENTORY>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstInvItemDetails); }

                    return lstInvItemDetails;
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
        /// Gets the Item Qty
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="requestor"></param>
        /// <param name="itemTypeIndicator"></param>
        /// <returns></returns>
        public List<TKIT_ITEM_INVENTORY> GetItemQty(string itemId, string requestor, string itemTypeIndicator)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (string.IsNullOrEmpty(requestor).Equals(false) && itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.F.ToString()).Equals(false))
                    {
                        List<TKIT_ITEM_DEPT> lstItemDeptInfo = objContext.TKIT_ITEM_DEPT.Where(c => c.ITEM_ID == itemId).ToList();

                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                        }

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Items Returned " + lstItemDeptInfo.Count); }

                        sbSql.Append("SELECT A.ITEM_QTY ");
                        sbSql.Append("FROM TKIT_ITEM_INVENTORY A, TKIT_ITEM_MASTER M, TKIT_REQUESTOR_DEPT C ");

                        if (lstItemDeptInfo.Count > 0)
                        {
                            sbSql.Append(", TKIT_ITEM_DEPT B ");
                        }

                        sbSql.Append("WHERE ( (M.OWNER = C.DEPT_ID) OR (M.OWNER = ' ') ");

                        if (lstItemDeptInfo.Count > 0)
                        {
                            sbSql.Append("OR (C.DEPT_ID = B.DEPT_ID AND A.ITEM_ID = B.ITEM_ID)");
                        }

                        sbSql.Append(" ) ");
                        sbSql.Append("AND M.ORG_GROUP_ID = A.ORG_GROUP_ID AND M.ITEM_TYPE = A.ITEM_TYPE AND M.ITEM_ID = A.ITEM_ID ");
                        sbSql.Append("AND A.ITEM_ID = '").Append(itemId).Append("' ");
                        sbSql.Append("AND C.REQUESTOR_ID = '").Append(requestor).Append("' ");
                    }
                    else
                    {
                        sbSql.Append("SELECT A.ITEM_QTY ");
                        sbSql.Append("FROM TKIT_ITEM_INVENTORY A JOIN TKIT_ITEM_MASTER B ");
                        sbSql.Append("ON A.ITEM_ID = B.ITEM_ID ");
                        sbSql.Append("WHERE A.ITEM_ID = '").Append(itemId).Append("' ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_QTY" };

                    var lstItemInvDetails = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_INVENTORY>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemInvDetails); }

                    return lstItemInvDetails;
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
        /// CHecks the Existence of Serial ID
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="serialId"></param>
        /// <returns></returns>
        public List<TKIT_ITEM_INVENTORY> CheckSerialId(string itemId, string serialId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT AVAILABILITY, STATUS ");
                    sbSql.Append("FROM TKIT_ITEM_INVENTORY ");
                    sbSql.Append("WHERE ITEM_ID = '").Append(itemId).Append("' ");
                    sbSql.Append("AND SERIAL_NO ='").Append(serialId).Append("' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "AVAILABILITY", "STATUS" };

                    var lstItemInvDetails = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_INVENTORY>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemInvDetails); }

                    return lstItemInvDetails;
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
        /// Gets the Item Details
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="requestor"></param>
        /// <param name="itemTypeIndicator"></param>
        /// <param name="serialId"></param>
        /// <returns></returns>
        public List<VM_TKIT_ITEM_DETAILS> GetItemDetails(string itemId, string requestor, string itemTypeIndicator, string serialId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var fields = new[] { "" };

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.F.ToString()))
                    {
                        sbSql.Append(" SELECT B.ASSET_ID, A.ITEM_ID, A.ITEM_DESCR, B.ITEM_QTY, B.STORAGE_LOCATION, A.MANUFACTURER, A.VENDOR");
                        sbSql.Append(" FROM TKIT_ITEM_MASTER A JOIN TKIT_ITEM_INVENTORY B ON A.ITEM_ID = B.ITEM_ID");
                        sbSql.Append(" WHERE A.ITEM_ID = '" + itemId + "'");

                        fields = new[] { "ASSET_ID", "ITEM_ID", "ITEM_DESCR", "ITEM_QTY", "STORAGE_LOCATION", "MANUFACTURER", "VENDOR" };
                    }
                    else if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()))
                    {
                        if (string.IsNullOrEmpty(requestor).Equals(false))
                        {
                            sbSql.Append(" SELECT DISTINCT B.ASSET_ID, A.ITEM_ID, B.STORAGE_LOCATION, A.ITEM_DESCR, B.ITEM_QTY");
                            sbSql.Append(" FROM TKIT_ITEM_MASTER A, TKIT_ITEM_INVENTORY B, TKIT_ITEM_DEPT C, TKIT_REQUESTOR_DEPT D");
                            sbSql.Append(" WHERE  C.DEPT_ID = D.DEPT_ID");
                            sbSql.Append(" AND A.ITEM_ID = B.ITEM_ID ");
                            sbSql.Append(" AND A.ITEM_ID = '" + itemId + "'");
                            sbSql.Append(" AND D.REQUESTOR_ID = '" + requestor + "'");

                            fields = new[] { "ASSET_ID", "ITEM_ID", "ITEM_DESCR", "ITEM_QTY", "STORAGE_LOCATION" };
                        }
                        else
                        {
                            sbSql.Append(" SELECT B.ASSET_ID, A.ITEM_ID, B.STORAGE_LOCATION, A.ITEM_DESCR, B.ITEM_QTY");
                            sbSql.Append(" FROM TKIT_ITEM_MASTER A, TKIT_ITEM_INVENTORY B");
                            sbSql.Append(" WHERE A.ITEM_ID = B.ITEM_ID AND A.ITEM_ID = '" + itemId + "'");

                            fields = new[] { "ASSET_ID", "ITEM_ID", "ITEM_DESCR", "ITEM_QTY", "STORAGE_LOCATION" };
                        }
                    }
                    else
                    {
                        if (string.IsNullOrEmpty(requestor).Equals(false))
                        {
                            sbSql.Append(" SELECT DISTINCT D.ASSET_ID, A.ITEM_ID, D.STORAGE_LOCATION, A.ITEM_DESCR, D.SERIAL_NO, ");
                            sbSql.Append(" D.ITEM_QTY, A.MANUFACTURER, A.VENDOR ");
                            sbSql.Append(" FROM TKIT_ITEM_MASTER A, TKIT_ITEM_DEPT B, TKIT_REQUESTOR_DEPT C, TKIT_ITEM_INVENTORY D");
                            sbSql.Append(" WHERE  B.DEPT_ID = C.DEPT_ID");
                            sbSql.Append(" AND A.ITEM_ID = D.ITEM_ID");
                            sbSql.Append(" AND A.ITEM_ID = '" + itemId + "'");
                            sbSql.Append(" AND C.REQUESTOR_ID = '" + requestor + "'");

                            if (string.IsNullOrEmpty(serialId).Equals(false))
                            {
                                sbSql.Append(" AND D.SERIAL_NO = '" + serialId + "'");
                            }

                            fields = new[] { "ASSET_ID", "ITEM_ID", "ITEM_DESCR", "ITEM_QTY", "STORAGE_LOCATION", "MANUFACTURER", "VENDOR", "SERIAL_NO" };
                        }
                        else
                        {
                            sbSql.Append(" SELECT DISTINCT B.ASSET_ID, A.ITEM_ID, B.STORAGE_LOCATION, A.ITEM_DESCR, B.SERIAL_NO,");
                            sbSql.Append(" B.ITEM_QTY, A.MANUFACTURER, A.VENDOR");
                            sbSql.Append(" FROM TKIT_ITEM_MASTER A, TKIT_ITEM_INVENTORY B");
                            sbSql.Append(" WHERE (A.ITEM_ID = '" + itemId + "'");
                            sbSql.Append(" OR B.ASSET_ID= '" + itemId + "')");

                            if (string.IsNullOrEmpty(serialId).Equals(false))
                            {
                                sbSql.Append(" AND B.SERIAL_NO = '" + serialId + "'");
                            }
                            else
                            {
                                sbSql.Append(" AND A.ITEM_ID=B.ITEM_ID");
                            }

                            fields = new[] { "ASSET_ID", "ITEM_ID", "ITEM_DESCR", "ITEM_QTY", "STORAGE_LOCATION", "MANUFACTURER", "VENDOR", "SERIAL_NO" };
                        }

                        sbSql.Append(" AND A.ITEM_INACTIVATED = 0");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstItemDetails = objContext.Database.DifferedExecuteQuery<VM_TKIT_ITEM_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemDetails); }

                    return lstItemDetails;
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
        /// Gets the Requester Details
        /// </summary>
        /// <param name="inActiveCheck"></param>
        /// <param name="orgGroupId"></param>
        /// <returns></returns>
        public List<TKIT_REQUESTOR> GetRequestors(Boolean inActiveCheck, string orgGroupId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT ORG_GROUP_ID, REQUESTOR_ID, FIRST_NAME, LAST_NAME");
                    sbSql.Append(" FROM TKIT_REQUESTOR");

                    if (orgGroupId.ToUpper().Equals("ALL").Equals(false))
                    {
                        sbSql.Append(" WHERE ORG_GROUP_ID IN ( SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ");
                        sbSql.Append(" BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                        sbSql.Append(" WHERE ORG_GROUP_ID = '" + orgGroupId + " '))");
                    }

                    if (inActiveCheck)
                    {
                        if (sbSql.ToString().Contains("WHERE"))
                        {
                            sbSql.Append(" AND ");
                        }
                        else
                        {
                            sbSql.Append(" WHERE ");
                        }

                        sbSql.Append(" STATUS = '" + AtParWebEnums.enum_Requestor_Status.A.ToString() + "'");
                    }

                    sbSql.Append(" ORDER BY REQUESTOR_ID");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "REQUESTOR_ID", "FIRST_NAME", "LAST_NAME" };

                    var lstRequestorInfo = objContext.Database.DifferedExecuteQuery<TKIT_REQUESTOR>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstRequestorInfo); }

                    return lstRequestorInfo;
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
        /// Saves the Item Details based on CheckIn/CheckOut action
        /// </summary>
        /// <param name="lstCheckInOutItemDetails"></param>
        /// <param name="requestedUserId"></param>
        /// <param name="checkInOutMode"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public long CheckInOutItems(List<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS> lstCheckInOutItemDetails, string requestedUserId,
                                    string checkInOutMode, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long transId = -1;
            long statusCode = AtparStatusCodes.ATPAR_OK;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            foreach (var item in lstCheckInOutItemDetails)
                            {
                                if ((item.EQP_INDICATOR.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.F.ToString()) && checkInOutMode.Equals(AtParWebEnums.enum_CHECKINOUT.CIN.ToString())) |
                                    (checkInOutMode.Equals(AtParWebEnums.enum_CHECKINOUT.COUT.ToString())))
                                {
                                    // To get the New Transaction ID
                                    transId = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.TrackIT);

                                    if (checkInOutMode.Equals(AtParWebEnums.enum_CHECKINOUT.COUT.ToString()))
                                    {
                                        statusCode = InsertTransactionDetailsForCheckOutItems(item, transId, requestedUserId, deviceTokenEntry, objContext);

                                        if (statusCode.Equals(AtparStatusCodes.ATPAR_OK).Equals(false))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }

                                        if (string.IsNullOrEmpty(item.SERIAL_NO).Equals(false))
                                        {
                                            InsertEqLocationDetails(item.SERIAL_NO, item.DELIVER_LOCATION, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(),
                                                                    deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString(), objContext);
                                        }
                                    }
                                    else
                                    {
                                        statusCode = InsertTransactionDetailsForCheckInItems(item, transId, deviceTokenEntry, objContext);

                                        if (statusCode.Equals(AtparStatusCodes.ATPAR_OK).Equals(false))
                                        {
                                            trans.Rollback();
                                            return statusCode;
                                        }
                                    }
                                }

                                if (checkInOutMode.Equals(AtParWebEnums.enum_CHECKINOUT.CIN.ToString()))
                                {
                                    statusCode = ProcessCheckInItems(item, deviceTokenEntry, AtParWebEnums.enum_CHECKINOUT.CIN, objContext);

                                    if (statusCode.Equals(AtparStatusCodes.ATPAR_OK).Equals(false))
                                    {
                                        trans.Rollback();
                                        return statusCode;
                                    }
                                }
                                else if (checkInOutMode.Equals(AtParWebEnums.enum_CHECKINOUT.COUT.ToString()))
                                {
                                    statusCode = ProcessCheckOutItems(item, transId, deviceTokenEntry, AtParWebEnums.enum_CHECKINOUT.COUT, objContext);

                                    if (statusCode.Equals(AtparStatusCodes.ATPAR_OK).Equals(false))
                                    {
                                        trans.Rollback();
                                        return statusCode;
                                    }
                                }
                            }
                        }
                        catch(Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
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

        public List<RM_SHIP_TO_LOCACTION> GetLocations(string pOrgGrpId)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append(" SELECT DISTINCT A.LOCATION_ID, A.LOCATION_NAME");
                    sbSql.Append(" FROM RM_SHIP_TO_LOCACTION A, MT_ATPAR_ORG_GROUP_BUNITS B");
                    sbSql.Append(" WHERE A.ORG_ID = B.BUSINESS_UNIT");
                    sbSql.Append(" AND STATUS = 1");
                    if (pOrgGrpId != "All")
                    {
                        sbSql.Append(" AND B.ORG_GROUP_ID = '" + pOrgGrpId + "'");
                    }

                    sbSql.Append(" ORDER BY LOCATION_ID ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"); }
                    }

                    var fields = new[] { "LOCATION_ID", "LOCATION_NAME" };

                    var lstRequestorInfo = objContext.Database.DifferedExecuteQuery<RM_SHIP_TO_LOCACTION>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstRequestorInfo); }

                    return lstRequestorInfo;
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

        public List<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS> GetItems(string itemID)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    //sbSql.Append("SELECT DISTINCT ITEM_ID,ASSET_ID, FROM TKIT_ITEM_INVENTORY");
                    sbSql.Append("SELECT DISTINCT B.ASSET_ID, A.ITEM_ID, A.ITEM_DESCR FROM TKIT_ITEM_MASTER A, TKIT_ITEM_INVENTORY B");
                    sbSql.Append(" WHERE A.ITEM_ID=B.ITEM_ID");

                    if(!string.IsNullOrEmpty(itemID))
                    {
                        sbSql.Append(" AND ITEM_ID='" + itemID + "' OR ASSET_ID='" + itemID + "'");
                    }
                   

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"); }
                    }

                    var lstItems = objContext.Database.SqlQuery<VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItems); }

                    return lstItems;
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

        public List<TKIT_ITEM_INVENTORY> GetSerialIDs(string itemID)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT SERIAL_NO FROM TKIT_ITEM_INVENTORY");

                    if (!string.IsNullOrEmpty(itemID))
                    {
                        sbSql.Append(" WHERE ITEM_ID='" + itemID + "' OR ASSET_ID='" + itemID + "'");
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"); }
                    }

                    var fields = new[] { "SERIAL_NO" };

                    var lstItems = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_INVENTORY>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItems); }

                    return lstItems;
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

        public List<TKIT_REQUESTOR_DEPT> GetUserDepts(string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append(" SELECT DEPT_ID FROM TKIT_REQUESTOR_DEPT");
                    sbSql.Append(" WHERE REQUESTOR_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"); }
                    }

                    var fields = new[] { "DEPT_ID" };

                    var lstDepts = objContext.Database.DifferedExecuteQuery<TKIT_REQUESTOR_DEPT>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstDepts.Count); }

                    return lstDepts;
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
        public List<TKIT_DEPT> GetTKITDepts(string deptID, string status, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            bool blnWhere = false;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append(" SELECT DEPT_ID, DESCRIPTION ,UPDATE_DATE,");
                    sbSql.Append(" UPDATE_USER_ID, STATUS, ORG_GROUP_ID");
                    sbSql.Append(" FROM TKIT_DEPT");

                    if (!string.IsNullOrEmpty(deptID))
                    {
                        sbSql.Append(" WHERE DEPT_ID LIKE '%" + deptID + "%'");
                        blnWhere = true;
                    }
                    if (!string.IsNullOrEmpty(status))
                    {
                        if (blnWhere)
                        {
                            sbSql.Append(" AND STATUS ='" + status + "'");
                        }
                        else
                        {
                            sbSql.Append(" WHERE STATUS ='" + status + "'");
                            blnWhere = true;
                        }
                    }
                    if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() != "All")
                    {
                        if (blnWhere)
                        {
                            sbSql.Append(" AND ORG_GROUP_ID IN ( SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ");
                            sbSql.Append(" BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                            sbSql.Append(" WHERE ORG_GROUP_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() + "'))");
                        }
                        else
                        {
                            sbSql.Append(" WHERE ORG_GROUP_ID IN ( SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ");
                            sbSql.Append(" BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                            sbSql.Append(" WHERE ORG_GROUP_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() + "'))");
                            blnWhere = true;
                        }
                    }
                    sbSql.Append(" ORDER BY DEPT_ID ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"); }
                    }

                    var lstRequestorInfo = objContext.Database.SqlQuery<TKIT_DEPT>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstRequestorInfo); }

                    return lstRequestorInfo;
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

        public string GetDeptID(string deptID, string orgGrpID, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append(" SELECT DEPT_ID FROM TKIT_REQUESTOR_DEPT");
                    sbSql.Append(" WHERE DEPT_ID ='" + deptID + "'");

                    if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() != "All")
                    {
                        sbSql.Append(" AND ORG_GROUP_ID = '" + orgGrpID + "'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"); }
                    }

                    var dept = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToString();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: "); }

                    return dept;
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

        #region Private Methods

        /// <summary>
        /// Inserts the checkout item details into MT_ATPAR_DETAIL_TRANSACTION table
        /// </summary>
        /// <param name="itemDetails"></param>
        /// <param name="transId"></param>
        /// <param name="requestedUserId"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="objContext"></param>
        private long InsertTransactionDetailsForCheckOutItems(VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS itemDetails, long transId,
                                                              string requestedUserId, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                string departmentId = objContext.RM_SHIP_TO_LOCACTION.Where(c => c.LOCATION_ID == itemDetails.DELIVER_LOCATION).FirstOrDefault().DEPARTMENT_ID;

                AtPar_Detail_Transaction_Entity atparDetailTransEntity = new AtPar_Detail_Transaction_Entity();
                atparDetailTransEntity.Transaction_Id = (int)transId;
                atparDetailTransEntity.ApplicationId = (int)AtParWebEnums.EnumApps.TrackIT;
                atparDetailTransEntity.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                atparDetailTransEntity.DeviceId = "1";
                atparDetailTransEntity.Key1 = string.Empty;
                atparDetailTransEntity.Key2 = itemDetails.SERIAL_NO;
                atparDetailTransEntity.Key3 = string.Empty;
                atparDetailTransEntity.Key4 = string.Empty;
                atparDetailTransEntity.Key5 = itemDetails.ITEM_ID;
                atparDetailTransEntity.Key6 = itemDetails.ITEM_QTY;
                atparDetailTransEntity.Key7 = itemDetails.ITEM_QTY;
                atparDetailTransEntity.Key8 = 0;
                atparDetailTransEntity.Status = (int)AtParWebEnums.AppTransactionStatus.statDelivery;
                atparDetailTransEntity.ReportData1 = string.Empty;
                atparDetailTransEntity.ReportData2 = 0;
                atparDetailTransEntity.ReportData3 = string.Empty;
                atparDetailTransEntity.ReportData4 = requestedUserId;
                atparDetailTransEntity.ReportData5 = itemDetails.DELIVER_LOCATION;
                atparDetailTransEntity.ReportData6 = itemDetails.PATIENT_LNAME;
                atparDetailTransEntity.ReportData7 = itemDetails.PATIENT_ID;
                atparDetailTransEntity.ReportData8 = itemDetails.ITEM_DESCR.Replace("'", "''");
                atparDetailTransEntity.ReportData9 = itemDetails.VENDOR;
                atparDetailTransEntity.ReportData10 = itemDetails.PROCEDURE_CODE;
                atparDetailTransEntity.ReportData11 = requestedUserId;
                atparDetailTransEntity.ReportData12 = DateTime.Now;
                atparDetailTransEntity.ReportData13 = DateTime.Now;
                atparDetailTransEntity.ReportData14 = string.Empty;
                atparDetailTransEntity.ReportData15 = string.Empty;
                atparDetailTransEntity.ReportData16 = string.Empty;
                atparDetailTransEntity.ReportData17 = 0;
                atparDetailTransEntity.ReportData18 = DateTime.Now;
                atparDetailTransEntity.ReportData19 = string.Empty;
                atparDetailTransEntity.ReportData25 = departmentId;

                return InsertTransactionDetails(atparDetailTransEntity, objContext);

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        /// <summary>
        /// Inserts the checkin item details into MT_ATPAR_DETAIL_TRANSACTION table
        /// </summary>
        /// <param name="itemDetails"></param>
        /// <param name="transId"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="objContext"></param>
        private long InsertTransactionDetailsForCheckInItems(VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS itemDetails, long transId,
                                                             string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                AtPar_Detail_Transaction_Entity atparDetailTransEntity = new AtPar_Detail_Transaction_Entity();
                atparDetailTransEntity.Transaction_Id = (int)transId;
                atparDetailTransEntity.ApplicationId = (int)AtParWebEnums.EnumApps.TrackIT;
                atparDetailTransEntity.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                atparDetailTransEntity.DeviceId = "1";
                atparDetailTransEntity.Key1 = string.Empty;
                atparDetailTransEntity.Key2 = itemDetails.SERIAL_NO;
                atparDetailTransEntity.Key3 = string.Empty;
                atparDetailTransEntity.Key4 = string.Empty;
                atparDetailTransEntity.Key5 = itemDetails.ITEM_ID;
                atparDetailTransEntity.Key6 = itemDetails.ITEM_QTY;
                atparDetailTransEntity.Key7 = itemDetails.ITEM_QTY;
                atparDetailTransEntity.Key8 = 0;
                atparDetailTransEntity.Status = 0;
                atparDetailTransEntity.ReportData1 = string.Empty;
                atparDetailTransEntity.ReportData2 = 0;
                atparDetailTransEntity.ReportData3 = string.Empty;
                atparDetailTransEntity.ReportData4 = string.Empty;
                atparDetailTransEntity.ReportData5 = string.Empty;
                atparDetailTransEntity.ReportData6 = string.Empty;
                atparDetailTransEntity.ReportData7 = string.Empty;
                atparDetailTransEntity.ReportData8 = itemDetails.ITEM_DESCR.Replace("'", "''");
                atparDetailTransEntity.ReportData9 = itemDetails.VENDOR;
                atparDetailTransEntity.ReportData10 = string.Empty;
                atparDetailTransEntity.ReportData11 = string.Empty;
                atparDetailTransEntity.ReportData12 = DateTime.Now;

                return InsertTransactionDetails(atparDetailTransEntity, objContext);

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        /// <summary>
        /// Inserts item details into TKIT_EQ_LOCATION table
        /// </summary>
        /// <param name="serialNo"></param>
        /// <param name="storageLocation"></param>
        /// <param name="userId"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="objContext"></param>
        private void InsertEqLocationDetails(string serialNo, string storageLocation, string userId, string orgGroupId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" INSERT INTO TKIT_EQ_LOCATION(");
                sbSql.Append(" ORG_GROUP_ID,");
                sbSql.Append(" SERIAL_NO,");
                sbSql.Append(" STORAGE_LOCATION,");
                sbSql.Append(" SCAN_DATETIME,");
                sbSql.Append(" SCAN_USER)");
                sbSql.Append(" VALUES (");
                sbSql.Append("'").Append(orgGroupId).Append("', ");
                sbSql.Append("'").Append(serialNo).Append("', ");
                sbSql.Append("'").Append(storageLocation).Append("', ");
                sbSql.Append("'").Append(DateTime.Now).Append("', ");
                sbSql.Append("'").Append(userId).Append("')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

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
        /// Process the CheckIn item details for Inventory update and Delivery Trip details
        /// </summary>
        /// <param name="itemDetails"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="checkInOutMode"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long ProcessCheckInItems(VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS itemDetails, string[] deviceTokenEntry,
                                         AtParWebEnums.enum_CHECKINOUT checkInOutMode, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                if (itemDetails.EQP_INDICATOR.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()) || itemDetails.EQP_INDICATOR.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                {
                    List<MT_ATPAR_DETAIL_TRANSACTION> lstTransDetails = GetTransactionId(itemDetails, objContext);

                    if (lstTransDetails.Count == 0)
                    {
                        return AtparStatusCodes.E_INVALIDPARAMETER;
                    }

                    InsertDeliverItemTrip(lstTransDetails[0].TRANSACTION_ID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(),
                                          (int)AtParWebEnums.AppTransactionStatus.statReturn, objContext);

                    UpdateDetailTransaction(lstTransDetails[0].TRANSACTION_ID, objContext);
                }

                if (itemDetails.EQP_INDICATOR.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                {
                    InsertEqLocationDetails(itemDetails.SERIAL_NO, GetStorageLocation(itemDetails.SERIAL_NO, objContext),
                                            deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(),
                                            deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString(), objContext);

                    UpdateItemInventory(itemDetails.ITEM_ID, itemDetails.ITEM_QTY, itemDetails.SERIAL_NO, checkInOutMode, objContext);
                }
                else
                {
                    UpdateItemQty(itemDetails.ITEM_ID, itemDetails.ITEM_QTY, checkInOutMode, objContext);
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        /// <summary>
        /// Process CheckOut item details for Inventory update and Delivery Trip details
        /// </summary>
        /// <param name="itemDetails"></param>
        /// <param name="transId"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <param name="checkInOutMode"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long ProcessCheckOutItems(VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS itemDetails, long transId, string[] deviceTokenEntry,
                                          AtParWebEnums.enum_CHECKINOUT checkInOutMode, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                if (itemDetails.EQP_INDICATOR.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.F.ToString()))
                {
                    if (GetItemQty(itemDetails.ITEM_ID, objContext) < itemDetails.ITEM_QTY)
                    {
                        return AtparStatusCodes.TKIT_E_QTYEXCEEDS;
                    }
                }

                int[] statusValues = new int[2] { (int)AtParWebEnums.AppTransactionStatus.statPickup, (int)AtParWebEnums.AppTransactionStatus.statDelivery };

                for (int count = 0; count <= 1; count++)
                {
                    InsertDeliverItemTrip(transId, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(),
                                          statusValues[count], objContext);
                }

                if (itemDetails.EQP_INDICATOR.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                {
                    UpdateItemInventory(itemDetails.ITEM_ID, itemDetails.ITEM_QTY, itemDetails.SERIAL_NO, checkInOutMode, objContext);
                }
                else
                {
                    UpdateItemQty(itemDetails.ITEM_ID, itemDetails.ITEM_QTY, checkInOutMode, objContext);
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        /// <summary>
        /// Gets the TransactionID from MT_ATPAR_DETAIL_TRANSACTION table
        /// </summary>
        /// <param name="itemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private List<MT_ATPAR_DETAIL_TRANSACTION> GetTransactionId(VM_TKIT_CHECK_IN_OUT_ITEM_DETAILS itemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" SELECT TRANSACTION_ID");
                sbSql.Append(" FROM MT_ATPAR_DETAIL_TRANSACTION");
                sbSql.Append(" WHERE APP_ID = ").Append((int)AtParWebEnums.EnumApps.TrackIT);
                sbSql.Append(" AND KEY_5 = '").Append(itemDetails.ITEM_ID).Append("'");

                if (itemDetails.EQP_INDICATOR.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                {
                    sbSql.Append("AND KEY_2 = '").Append(itemDetails.SERIAL_NO).Append("'");
                }

                sbSql.Append(" AND STATUS = ").Append((int)AtParWebEnums.AppTransactionStatus.statDelivery);
                sbSql.Append(" ORDER BY UPDATE_DATE DESC");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var fields = new[] { "TRANSACTION_ID" };

                var lstTransactionDetails = objContext.Database.DifferedExecuteQuery<MT_ATPAR_DETAIL_TRANSACTION>(fields, sbSql.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstTransactionDetails); }

                return lstTransactionDetails;
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
        /// Inserts the Item Details into MT_DELV_ITEM_TRIP table
        /// </summary>
        /// <param name="transId"></param>
        /// <param name="userId"></param>
        /// <param name="status"></param>
        /// <param name="objContext"></param>
        private void InsertDeliverItemTrip(long transId, string userId, int status, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" INSERT INTO MT_DELV_ITEM_TRIP(");
                sbSql.Append(" TRANSACTION_ID,");
                sbSql.Append(" EVENT_ID,");
                sbSql.Append(" UPDATE_DATE,");
                sbSql.Append(" USER_ID");
                sbSql.Append(" ) VALUES (");
                sbSql.Append("'").Append(transId).Append("', ");
                sbSql.Append("'").Append(status).Append("', ");
                sbSql.Append("'").Append(DateTime.Now).Append("', ");
                sbSql.Append("'").Append(userId).Append("')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

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
        /// Updates the MT_ATPAR_DETAIL_TRANSACTION table
        /// </summary>
        /// <param name="transId"></param>
        /// <param name="objContext"></param>
        private void UpdateDetailTransaction(long transId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" UPDATE MT_ATPAR_DETAIL_TRANSACTION");
                sbSql.Append(" SET STATUS = ").Append((int)AtParWebEnums.AppTransactionStatus.statReturn);
                sbSql.Append(" WHERE TRANSACTION_ID = ").Append(transId).Append("");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Gets the Storage Location Details
        /// </summary>
        /// <param name="serialNo"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private string GetStorageLocation(string serialNo, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" SELECT B.STORAGE_LOCATION");
                sbSql.Append(" FROM TKIT_ITEM_MASTER A, TKIT_ITEM_INVENTORY B");
                sbSql.Append(" WHERE A.ITEM_ID = B.ITEM_ID AND");
                sbSql.Append(" B.SERIAL_NO = '").Append(serialNo).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var fields = new[] { "STORAGE_LOCATION" };

                return objContext.Database.DifferedExecuteQuery<TKIT_ITEM_INVENTORY>(fields, sbSql.ToString()).FirstOrDefault().STORAGE_LOCATION;

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
        /// Updates the Item Inventory based on Item and SerialNo
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="itemQty"></param>
        /// <param name="serialNo"></param>
        /// <param name="checkInOutMode"></param>
        /// <param name="objContext"></param>
        private void UpdateItemInventory(string itemId, int itemQty, string serialNo, AtParWebEnums.enum_CHECKINOUT checkInOutMode, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" UPDATE TKIT_ITEM_INVENTORY");
                sbSql.Append(" SET AVAILABILITY = 1,");
                sbSql.Append(" ITEM_QTY = ITEM_QTY");

                if (checkInOutMode.Equals(AtParWebEnums.enum_CHECKINOUT.CIN))
                {
                    sbSql.Append(" + ");
                }
                else
                {
                    sbSql.Append(" - ");
                }
                sbSql.Append(itemQty);
                sbSql.Append(" WHERE ITEM_ID = '").Append(itemId).Append("'");
                sbSql.Append(" AND SERIAL_NO ='").Append(serialNo).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Updates the Item Inventory based on Item
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="itemQty"></param>
        /// <param name="checkInOutMode"></param>
        /// <param name="objContext"></param>
        private void UpdateItemQty(string itemId, int itemQty, AtParWebEnums.enum_CHECKINOUT checkInOutMode, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" UPDATE TKIT_ITEM_INVENTORY");
                sbSql.Append(" SET ITEM_QTY = ITEM_QTY");

                if (checkInOutMode.Equals(AtParWebEnums.enum_CHECKINOUT.CIN))
                {
                    sbSql.Append(" + ");
                }
                else
                {
                    sbSql.Append(" - ");
                }

                sbSql.Append(itemQty);
                sbSql.Append(" WHERE ITEM_ID = '").Append(itemId).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Gets the Item Qty
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int GetItemQty(string itemId, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" SELECT ITEM_QTY");
                sbSql.Append(" FROM TKIT_ITEM_INVENTORY");
                sbSql.Append(" WHERE ITEM_ID = '").Append(itemId).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var fields = new[] { "ITEM_QTY" };

                int? itemQty = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_INVENTORY>(fields, sbSql.ToString()).FirstOrDefault().ITEM_QTY;

                if (itemId != null)
                {
                    return itemQty.Value;
                }

                else
                {
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
        /// Logs the entry into Atpat Detail Transaction table
        /// </summary>
        /// <param name="transactionDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertTransactionDetails(AtPar_Detail_Transaction_Entity transactionDetails, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            StringBuilder sbSqlValues = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                if ((transactionDetails.Transaction_Id == 0) || (transactionDetails.ApplicationId == 0) || (transactionDetails.UserId == string.Empty) || (transactionDetails.DeviceId == string.Empty))
                {
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }


                sbSql.Append("INSERT INTO MT_ATPAR_DETAIL_TRANSACTION (TRANSACTION_ID, APP_ID,  ");
                sbSql.Append("USER_ID,DOWNLOAD_USER_ID, DEVICE_ID, UPDATE_DATE ");

                sbSqlValues.Append(" )VALUES (").Append(transactionDetails.Transaction_Id).Append(",").Append(transactionDetails.ApplicationId).Append(",");
                sbSqlValues.Append("'").Append(transactionDetails.UserId).Append("','").Append(transactionDetails.UserId).Append("',");
                sbSqlValues.Append("'").Append(transactionDetails.DeviceId).Append("','").Append(DateTime.Now.ToString()).Append("'");

                if (transactionDetails.Key1 != null)
                {
                    sbSql.Append(", KEY_1 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.Key1).Append("'");
                }

                if (transactionDetails.Key2 != null)
                {
                    sbSql.Append(", KEY_2 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.Key2).Append("'");
                }


                if (transactionDetails.Key3 != null)
                {
                    sbSql.Append(", KEY_3 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.Key3).Append("'");
                }

                if (transactionDetails.Key4 != null)
                {
                    sbSql.Append(", KEY_4 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.Key4).Append("'");
                }

                if (transactionDetails.Key5 != null)
                {
                    sbSql.Append(", KEY_5 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.Key5).Append("'");
                }

                if (transactionDetails.Key6 != null)
                {
                    sbSql.Append(", KEY_6 ");
                    sbSqlValues.Append(",").Append(transactionDetails.Key6);
                }

                if (transactionDetails.Key7 != null)
                {
                    sbSql.Append(", KEY_7 ");
                    sbSqlValues.Append(",").Append(transactionDetails.Key7);
                }

                if (transactionDetails.Key8 != null)
                {
                    sbSql.Append(", KEY_8 ");
                    sbSqlValues.Append(",").Append(transactionDetails.Key8);
                }


                if (transactionDetails.Status != null)
                {
                    sbSql.Append(", STATUS ");
                    sbSqlValues.Append(",'").Append(transactionDetails.Status).Append("'");
                }

                if (transactionDetails.ReportData1 != null)
                {
                    sbSql.Append(", REPORT_DATA_1 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData1).Append("'");
                }

                if (transactionDetails.ReportData2 != null)
                {
                    sbSql.Append(", REPORT_DATA_2 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData2).Append("'");
                }

                if (transactionDetails.ReportData3 != null)
                {
                    sbSql.Append(", REPORT_DATA_3 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData3).Append("'");
                }


                if (transactionDetails.ReportData4 != null)
                {
                    sbSql.Append(", REPORT_DATA_4 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData4.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData5 != null)
                {
                    sbSql.Append(", REPORT_DATA_5 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData5.Replace("'", "''")).Append("'");
                }


                if (transactionDetails.ReportData5 != null)
                {
                    sbSql.Append(", REPORT_DATA_40 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData5.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData6 != null)
                {
                    sbSql.Append(", REPORT_DATA_6 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData6.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData7 != null)
                {
                    sbSql.Append(", REPORT_DATA_7 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData7.Replace("'", "''")).Append("'");
                }


                if (transactionDetails.ReportData8 != null)
                {
                    sbSql.Append(", REPORT_DATA_8 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData8.Replace("'", "''")).Append("'");
                }


                if (transactionDetails.ReportData9 != null)
                {
                    sbSql.Append(", REPORT_DATA_9 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData9.Replace("'", "''")).Append("'");
                }


                if (transactionDetails.ReportData10 != null)
                {
                    sbSql.Append(", REPORT_DATA_10 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData10.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData11 != null)
                {
                    sbSql.Append(", REPORT_DATA_11 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData11.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData12 != null)
                {
                    if (transactionDetails.ReportData12 != DateTime.MinValue)
                    {
                        sbSql.Append(", REPORT_DATA_12 ");
                        sbSqlValues.Append(",'").Append(transactionDetails.ReportData12.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                    }

                }

                if (transactionDetails.ReportData13 != null)
                {
                    if (transactionDetails.ReportData13 != DateTime.MinValue)
                    {
                        sbSql.Append(", REPORT_DATA_13 ");
                        sbSqlValues.Append(",'").Append(transactionDetails.ReportData13.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                    }

                }

                if (transactionDetails.ReportData14 != null)
                {
                    sbSql.Append(", REPORT_DATA_14 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData14.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData16 != null)
                {
                    sbSql.Append(", REPORT_DATA_16 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData16.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData17 != null)
                {
                    sbSql.Append(", REPORT_DATA_17 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData17).Append("'");
                }

                if (transactionDetails.NonPoItem != null)
                {
                    sbSql.Append(", NON_PO_ITEM ");
                    sbSqlValues.Append(",'").Append(transactionDetails.NonPoItem).Append("'");
                }

                if (transactionDetails.ReportData15 != null)
                {
                    sbSql.Append(", REPORT_DATA_15 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData15).Append("'");
                }

                if (transactionDetails.ReportData18 != null)
                {
                    if (transactionDetails.ReportData18 != DateTime.MinValue)
                    {
                        sbSql.Append(", REPORT_DATA_18 ");
                        sbSqlValues.Append(",'").Append(transactionDetails.ReportData18.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                    }

                }

                if (transactionDetails.ReportData19 != null)
                {
                    sbSql.Append(", REPORT_DATA_19 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData19.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData20 != null)
                {
                    sbSql.Append(", REPORT_DATA_20 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData20.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData21 != null)
                {
                    sbSql.Append(", REPORT_DATA_21 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData21.Replace("'", "''")).Append("'");
                }
                if (transactionDetails.ReportData22 != null)
                {
                    sbSql.Append(", REPORT_DATA_22 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData22.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData23 != null)
                {
                    sbSql.Append(", REPORT_DATA_23 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData23.Replace("'", "''")).Append("'");
                }
                if (transactionDetails.ReportData24 != null)
                {
                    sbSql.Append(", REPORT_DATA_24 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData24.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData25 != null)
                {
                    sbSql.Append(", REPORT_DATA_25 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData25.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData26 != null)
                {
                    sbSql.Append(", REPORT_DATA_26 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData26.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData27 != null)
                {
                    sbSql.Append(", REPORT_DATA_27 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData27.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData28 != null)
                {
                    sbSql.Append(", REPORT_DATA_28 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData28.Replace("'", "''")).Append("'");
                }


                if (transactionDetails.ReportData29 != null)
                {
                    sbSql.Append(", REPORT_DATA_29 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData29.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.SignatureId != null)
                {
                    sbSql.Append(", SIGNATURE_ID ");
                    sbSqlValues.Append(",'").Append(transactionDetails.SignatureId).Append("'");
                }

                if (transactionDetails.ReportData30 != null)
                {
                    if (transactionDetails.ReportData30 != DateTime.MinValue)
                    {
                        sbSql.Append(", REPORT_DATA_30 ");
                        sbSqlValues.Append(",'").Append(transactionDetails.ReportData30.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                    }

                }


                if (transactionDetails.ReportData31 != null)
                {
                    sbSql.Append(", REPORT_DATA_31 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData31.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData32 != null)
                {
                    sbSql.Append(", REPORT_DATA_32 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData32.Replace("'", "''")).Append("'");
                }
                if (transactionDetails.ReportData33 != null)
                {
                    sbSql.Append(", REPORT_DATA_33 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData33.Replace("'", "''")).Append("'");
                }
                if (transactionDetails.ReportData34 != null)
                {
                    sbSql.Append(", REPORT_DATA_34 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData34.Replace("'", "''")).Append("'");
                }
                if (transactionDetails.ReportData35 != null)
                {
                    sbSql.Append(", REPORT_DATA_35 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData35.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.StartDateTime != null)
                {
                    if (transactionDetails.StartDateTime != DateTime.MinValue)
                    {
                        sbSql.Append(", START_DT_TIME ");
                        sbSqlValues.Append(",'").Append(transactionDetails.StartDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                    }

                }

                if (transactionDetails.EndDateTime != null)
                {
                    if (transactionDetails.EndDateTime != DateTime.MinValue)
                    {
                        sbSql.Append(", END_DT_TIME ");
                        sbSqlValues.Append(",'").Append(transactionDetails.EndDateTime.ToString("MM/dd/yyyy hh:mm:ss tt")).Append("'");
                    }

                }

                if (transactionDetails.ReportData36 != null)
                {
                    sbSql.Append(", REPORT_DATA_36 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData36.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData37 != null)
                {
                    sbSql.Append(", REPORT_DATA_37 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData37.Replace("'", "''")).Append("'");
                }
                if (transactionDetails.ReportData38 != null)
                {
                    sbSql.Append(", REPORT_DATA_38 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData38.Replace("'", "''")).Append("'");
                }
                if (transactionDetails.ReportData42 != null)
                {
                    sbSql.Append(", REPORT_DATA_42 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData42.Replace("'", "''")).Append("'");
                }
                if (transactionDetails.ReportData43 != null)
                {
                    sbSql.Append(", REPORT_DATA_43 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData43.Replace("'", "''")).Append("'");
                }
                if (transactionDetails.ReportData44 != null)
                {
                    sbSql.Append(", REPORT_DATA_44 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData44.Replace("'", "''")).Append("'");
                }
                if (transactionDetails.ReportData47 != null)
                {
                    sbSql.Append(", REPORT_DATA_47 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData47.Replace("'", "''")).Append("'");
                }

                if (transactionDetails.ReportData46 != null)
                {
                    sbSql.Append(", REPORT_DATA_46 ");
                    sbSqlValues.Append(",'").Append(transactionDetails.ReportData46.Replace("'", "''")).Append("')");
                }
                else
                {
                    sbSqlValues.Append(")");
                }

                sbSql.Append(sbSqlValues.ToString());
                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
                sbSqlValues = null;
            }
        }
        #endregion

    }
}
