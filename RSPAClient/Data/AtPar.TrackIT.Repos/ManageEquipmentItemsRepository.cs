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
using System.Globalization;
using System.Linq;
using System.Text;

namespace AtPar.TrackIT.Repos
{
    public class ManageEquipmentItemsRepository : IManageEquipmentItemsRepository
    {
        #region Private Variable

        private ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public ManageEquipmentItemsRepository(ILog log, ICommonRepository commonRepository)
        {
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ManageEquipmentItemsRepository));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets all Master Items
        /// </summary>
        /// <returns></returns>
        public List<TKIT_ITEM_MASTER> GetMasterItems()
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
                    sbSql.Append("FROM TKIT_ITEM_MASTER ");

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




        /// <summary>
        /// Gets all Master Items
        /// </summary>
        /// <returns></returns>
        public List<TKIT_ITEM_MASTER> GetMasterItems(string itemID,string description)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if(itemID == null ||itemID == "undefined" )
                    {
                        itemID = string.Empty;
                    }

                    if (description == null || description == "undefined" )
                    {
                        description = string.Empty;
                    }


                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ORG_GROUP_ID, ITEM_TYPE, ITEM_ID, ITEM_DESCR, COMMENTS  ");

                    sbSql.Append(" FROM TKIT_ITEM_MASTER ");

                    if (!string.IsNullOrEmpty(itemID) || !string.IsNullOrEmpty(description)) {
                        sbSql.Append(" WHERE ");
                    }


                    if (!string.IsNullOrEmpty(itemID))
                    {
                       
                        sbSql.Append("ITEM_ID  LIKE '" + itemID + "%' ");

                        if (!string.IsNullOrEmpty(description))
                        {
                            sbSql.Append(" AND ");
                        }
                        
                    }

                    if (!string.IsNullOrEmpty(description))
                    {
                                         
                        sbSql.Append("ITEM_DESCR  LIKE '%" + description + "%' ");                     
                    }
                  
                    

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] {"ORG_GROUP_ID", "ITEM_TYPE", "ITEM_ID", "ITEM_DESCR", "COMMENTS"};

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


        /// <summary>
        /// Gets the Items for the passed Equipment type
        /// </summary>
        /// <param name="equipmentType"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public Tuple<string, List<VM_TKIT_ITEM_MASTER>> GetItemsForSelectedEqType(string equipmentType, string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string equipmentIndicator = string.Empty;
            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    equipmentIndicator = objContext.TKIT_ITEM_TYPE.Where(x => x.ITEM_TYPE == equipmentType).FirstOrDefault().ITEM_TYPE_INDICATOR;

                    sbSql.Append("SELECT distinct (A.ITEM_ID), A.ITEM_DESCR, (A.ITEM_DESCR + ' (' + A.ITEM_ID + ')') AS DESCRIPTION ");
                    sbSql.Append("FROM TKIT_ITEM_MASTER A JOIN TKIT_ITEM_INVENTORY B ON A.ITEM_ID =B.ITEM_ID ");
                    sbSql.Append("JOIN MT_ATPAR_USER C ON A.CREATE_USERID = C.USER_ID ");
                    sbSql.Append("WHERE A.ITEM_TYPE = '").Append(equipmentType).Append("'");

                    if (string.IsNullOrEmpty(itemId).Equals(false))
                    {
                        sbSql.Append(" AND A.ITEM_ID = '").Append(itemId).Append("'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_ID", "ITEM_DESCR", "DESCRIPTION" };

                    var lstItems = objContext.Database.DifferedExecuteQuery<VM_TKIT_ITEM_MASTER>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItems); }

                    return new Tuple<string, List<VM_TKIT_ITEM_MASTER>>(equipmentIndicator, lstItems);
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
        /// Gets the Item Departments
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="orgGrpId"></param>
        /// <returns></returns>
        public List<VM_TKIT_ITEM_DEPT> GetItemDepartments(string itemId, string orgGrpId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string equipmentIndicator = string.Empty;
            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.DEPT_ID, A.STATUS, B.DESCRIPTION FROM ");
                    sbSql.Append("( ");
                    sbSql.Append(" SELECT DEPT_ID, 'SELECTED' AS STATUS FROM TKIT_ITEM_DEPT WHERE ITEM_ID = '").Append(itemId).Append("' ");

                    if (orgGrpId.Equals("All") == false)
                    {
                        sbSql.Append(" AND ORG_GROUP_ID ='").Append(orgGrpId).Append("' ");
                    }

                    sbSql.Append("UNION ");
                    sbSql.Append(" SELECT DEPT_ID, 'UNSELECTED' AS STATUS FROM TKIT_DEPT WHERE STATUS <> 'I' ");

                    if (orgGrpId.Equals("All") == false)
                    {
                        sbSql.Append(" AND ORG_GROUP_ID ='").Append(orgGrpId).Append("' ");
                    }
                    sbSql.Append("AND DEPT_ID NOT IN  ");
                    sbSql.Append("( ");
                    sbSql.Append("SELECT DEPT_ID FROM TKIT_ITEM_DEPT WHERE ITEM_ID = '").Append(itemId).Append("' ");

                    if (orgGrpId.Equals("All") == false)
                    {
                        sbSql.Append(" AND ORG_GROUP_ID ='").Append(orgGrpId).Append("' ");
                    }

                    sbSql.Append(" ) ) A ");
                    sbSql.Append("JOIN TKIT_DEPT B ON A.DEPT_ID = B.DEPT_ID ");
                    sbSql.Append("WHERE A.DEPT_ID <> '' ");
                    sbSql.Append("ORDER BY A.STATUS ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "DEPT_ID", "STATUS", "DESCRIPTION" };

                    var lstItemDepartments = objContext.Database.DifferedExecuteQuery<VM_TKIT_ITEM_DEPT>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemDepartments); }

                    return lstItemDepartments;
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
        /// Checks if the Item is Ordered or not
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public long CheckIfItemIsOrdered(string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    sbSql.Append("SELECT ITEM_ID ");
                    sbSql.Append("FROM TKIT_ORDER_DETAILS ");
                    sbSql.Append("WHERE ITEM_ID = '").Append(itemId).Append("' ");
                    sbSql.Append("AND DELIVER_ITEM_STATUS = 'OPEN' ");
                    sbSql.Append("UNION ");
                    sbSql.Append("SELECT KEY_5 AS ITEM_ID ");
                    sbSql.Append("FROM MT_ATPAR_DETAIL_TRANSACTION ");
                    sbSql.Append("WHERE KEY_5 = '").Append(itemId).Append("' ");
                    sbSql.Append("AND STATUS <> ").Append((int)AtParWebEnums.enum_TKIT_OrderStatus.Delivered);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_ID" };

                    var itemCount = objContext.Database.DifferedExecuteQuery<TKIT_ORDER_DETAILS>(fields, sbSql.ToString()).ToList().Count;

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Item Count " + itemCount); }

                    return itemCount;
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
        public List<TKIT_ITEM_TYPE> GetEquipmentTypes(string itemIndicator, string orgGrpId)
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

                    sbSql.Append(" ORDER BY ITEM_TYPE");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstEquipmentTypes = objContext.Database.SqlQuery<TKIT_ITEM_TYPE>(sbSql.ToString()).ToList();

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

        /// <summary>
        /// Gets the Item Type Indicator
        /// </summary>
        /// <param name="itemType"></param>
        /// <returns></returns>
        public string GetItemTypeIndicator(string itemType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    return objContext.TKIT_ITEM_TYPE.Where(x => x.ITEM_TYPE == itemType).FirstOrDefault().ITEM_TYPE_INDICATOR;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        /// <summary>
        /// Gets the Box Type Item Details
        /// </summary>
        /// <param name="itemType"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public List<VM_TKIT_ITEM_DETAILS> GetBoxItemDetails(string itemType, string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.ITEM_TYPE, A.ORG_GROUP_ID, A.ITEM_ID, A.ITEM_DESCR, B.STORAGE_LOCATION, A.COMMENTS, ");
                    sbSql.Append("CONVERT(NVARCHAR,A.DESTRUCTION_DATE,101) DESTRUCTION_DATE, UPDATE_DATE, ");
                    sbSql.Append("C.FIRST_NAME+' '+C.MIDDLE_INITIAL+' '+C.LAST_NAME+'('+B.UPDATE_USER_ID+')' AS UPDATEUSERNAME, ");
                    sbSql.Append("A.ITEM_INACTIVATED, A.CREATE_DATE, ");
                    sbSql.Append("C.FIRST_NAME+' '+C.MIDDLE_INITIAL+' '+C.LAST_NAME+'('+A.CREATE_USERID+')' AS CREATEUSERNAME, ");
                    sbSql.Append("A.OWNER, A.OWNER_TYPE, (A.ITEM_DESCR + ' (' + A.ITEM_ID + ')') as DESCRIPTION  ");
                    sbSql.Append("FROM TKIT_ITEM_MASTER A JOIN TKIT_ITEM_INVENTORY B ON A.ITEM_ID =B.ITEM_ID ");
                    sbSql.Append("JOIN MT_ATPAR_USER C ON A.CREATE_USERID = C.USER_ID ");
                    sbSql.Append("WHERE A.ITEM_TYPE = '").Append(itemType).Append("' ");

                    if (string.IsNullOrWhiteSpace(itemId).Equals(false))
                    {
                        sbSql.Append("AND A.ITEM_ID = '").Append(itemId).Append("'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_TYPE", "ITEM_ID", "ITEM_DESCR", "STORAGE_LOCATION", "COMMENTS", "UPDATE_DATE",
                                         "UPDATEUSERNAME", "DESTRUCTION_DATE", "CREATEUSERNAME", "ITEM_INACTIVATED", "CREATE_DATE", "OWNER", "OWNER_TYPE", "DESCRIPTION"};

                    var lstBoxItemDetails = objContext.Database.DifferedExecuteQuery<VM_TKIT_ITEM_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstBoxItemDetails); }

                    return lstBoxItemDetails;
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
        /// Gets the Equipment Type Item Details
        /// </summary>
        /// <param name="itemType"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public List<VM_TKIT_ITEM_DETAILS> GetEquipmentItemDetails(string itemType, string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT A.ITEM_ID, A.ITEM_TYPE, A.ITEM_DESCR, B.STORAGE_LOCATION, A1.ITEM_QTY,");
                    sbSql.Append("A.MANUFACTURER, A.VENDOR, A.[IMAGE], A1.UPDATE_DATE,");
                    sbSql.Append("C.FIRST_NAME+' '+C.MIDDLE_INITIAL+' '+C.LAST_NAME+'('+B.UPDATE_USER_ID+')' AS UPDATEUSERNAME,");
                    sbSql.Append("A.ITEM_INACTIVATED, A.CREATE_DATE,");
                    sbSql.Append("C.FIRST_NAME+' '+C.MIDDLE_INITIAL+' '+C.LAST_NAME+'('+A.CREATE_USERID+')' AS CREATEUSERNAME,");
                    sbSql.Append("A.COMMENTS, A.OWNER, A.OWNER_TYPE, (A.ITEM_DESCR + ' (' + A.ITEM_ID + ')') as DESCRIPTION  ");
                    sbSql.Append("FROM (SELECT COUNT(ITEM_QTY) AS ITEM_QTY,ITEM_ID,MAX(UPDATE_DATE) as UPDATE_DATE FROM TKIT_ITEM_INVENTORY GROUP BY ITEM_ID) A1, ");
                    sbSql.Append("TKIT_ITEM_MASTER A JOIN TKIT_ITEM_INVENTORY B ON A.ITEM_ID =B.ITEM_ID ");
                    sbSql.Append("JOIN MT_ATPAR_USER C ON A.CREATE_USERID = C.USER_ID ");
                    sbSql.Append("WHERE A.ITEM_TYPE = '").Append(itemType).Append("' AND A1.ITEM_ID=B.ITEM_ID ");

                    if (string.IsNullOrWhiteSpace(itemId).Equals(false))
                    {
                        sbSql.Append("AND A.ITEM_ID = '").Append(itemId).Append("'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_TYPE", "ITEM_ID", "ITEM_DESCR", "STORAGE_LOCATION", "ITEM_QTY", "MANUFACTURER", "VENDOR", "IMAGE", "UPDATE_DATE",
                                         "UPDATEUSERNAME", "CREATEUSERNAME", "ITEM_INACTIVATED", "CREATE_DATE", "COMMENTS", "OWNER", "OWNER_TYPE", "DESCRIPTION"};

                    var lstEquipmentItemDetails = objContext.Database.DifferedExecuteQuery<VM_TKIT_ITEM_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstEquipmentItemDetails); }

                    return lstEquipmentItemDetails;
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
        /// Gets the Furniture Type Item Details
        /// </summary>
        /// <param name="itemType"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public List<VM_TKIT_ITEM_DETAILS> GetFurnitureItemDetails(string itemType, string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT A.ITEM_TYPE, A.ITEM_ID, A.ITEM_DESCR, B.STORAGE_LOCATION, B.ITEM_QTY, ");
                    sbSql.Append("A.MANUFACTURER, A.VENDOR, A.[IMAGE], B.UPDATE_DATE, ");
                    sbSql.Append("C.FIRST_NAME+' '+C.MIDDLE_INITIAL+' '+C.LAST_NAME+'('+B.UPDATE_USER_ID+')' AS UPDATEUSERNAME, ");
                    sbSql.Append("CONVERT(NVARCHAR, A.DESTRUCTION_DATE,101)DESTRUCTION_DATE, ");
                    sbSql.Append("C.FIRST_NAME+' '+C.MIDDLE_INITIAL+' '+C.LAST_NAME+'('+A.CREATE_USERID+')' AS CREATEUSERNAME, ");
                    sbSql.Append("A.ITEM_INACTIVATED, A.CREATE_DATE, A.COMMENTS ,A.OWNER, A.OWNER_TYPE, (A.ITEM_DESCR + ' (' + A.ITEM_ID + ')') as DESCRIPTION ");
                    sbSql.Append("FROM TKIT_ITEM_MASTER A JOIN TKIT_ITEM_INVENTORY B ON A.ITEM_ID =B.ITEM_ID ");
                    sbSql.Append("JOIN MT_ATPAR_USER C ON A.CREATE_USERID = C.USER_ID ");
                    sbSql.Append("WHERE A.ITEM_TYPE = '").Append(itemType).Append("' ");

                    if (string.IsNullOrWhiteSpace(itemId).Equals(false))
                    {
                        sbSql.Append("AND A.ITEM_ID = '").Append(itemId).Append("'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_TYPE", "ITEM_ID", "ITEM_DESCR", "STORAGE_LOCATION", "ITEM_QTY", "MANUFACTURER", "VENDOR", "IMAGE", "UPDATE_DATE",
                                         "UPDATEUSERNAME", "DESTRUCTION_DATE", "CREATEUSERNAME", "ITEM_INACTIVATED", "CREATE_DATE", "COMMENTS", "OWNER", "OWNER_TYPE", "DESCRIPTION"};

                    var lstFurnitureItemDetails = objContext.Database.DifferedExecuteQuery<VM_TKIT_ITEM_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstFurnitureItemDetails); }

                    return lstFurnitureItemDetails;
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
        /// Gets the Item Departments
        /// </summary>
        /// <returns></returns>
        public List<TKIT_ITEM_DEPT> GetDepartments()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sql = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sql = "SELECT DEPT_ID, ITEM_ID FROM TKIT_ITEM_DEPT ";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sql + ":")); }
                    }

                    var fields = new[] { "DEPT_ID", "ITEM_ID" };

                    var lstItemDepartments = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_DEPT>(fields, sql).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstItemDepartments); }

                    return lstItemDepartments;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sql); }
                throw ex;
            }
        }

        /// <summary>
        /// Gets the Lot/Serial values for the Equipment Type Items
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public List<TKIT_ITEM_INVENTORY> GetLotSerialDetails(string itemId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT SERIAL_NO, LOT_NO,ASSET_ID, ITEM_QTY, STORAGE_LOCATION, SERVICE_DT_TIME,");
                    sbSql.Append(" STATUS, USER_FIELD_1,ASSET_ID, AVAILABILITY, UPDATE_DATE ");
                    sbSql.Append(" FROM TKIT_ITEM_INVENTORY");
                    sbSql.Append(" WHERE ITEM_ID = '").Append(itemId).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "SERIAL_NO", "LOT_NO", "ITEM_QTY","ASSET_ID", "STORAGE_LOCATION", "SERVICE_DT_TIME", "STATUS", "USER_FIELD_1",
                                         "AVAILABILITY", "UPDATE_DATE"};

                    var lstLotSerialDetails = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_INVENTORY>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstLotSerialDetails); }

                    if (lstLotSerialDetails != null)
                    {
                        int rowIndex = 0;
                        foreach (var item in lstLotSerialDetails)
                        {
                            item.ROW_INDEX = rowIndex;
                            rowIndex++;
                        }
                    }

                    return lstLotSerialDetails;
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
        /// Updates the Box Type Item Info
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <returns></returns>
        public long UpdateBoxItemInfo(List<VM_TKIT_ITEM_DETAILS> lstItemDetails)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            UpdateItemMasterInfoForBox(lstItemDetails, objContext);
                            UpdateItemInventoryInfoForBox(lstItemDetails, objContext);
                        }
                        catch
                        {
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

        /// <summary>
        /// Updates the Equipment Type Item Info
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <returns></returns>
        public long UpdateEquipmentItemInfo(List<VM_TKIT_ITEM_DETAILS> lstItemDetails)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            UpdateItemMasterInfoForEquipment(lstItemDetails, objContext);
                            UpdateItemInventoryInfoForEquipment(lstItemDetails, objContext);
                        }
                        catch
                        {
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

        /// <summary>
        /// Updates the Furniture Type Item Info
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <returns></returns>
        public long UpdateFurnitureItemInfo(List<VM_TKIT_ITEM_DETAILS> lstItemDetails)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            UpdateItemMasterInfoForFurniture(lstItemDetails, objContext);
                            UpdateItemInventoryInfoForFurniture(lstItemDetails, objContext);
                        }
                        catch
                        {
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

        /// <summary>
        /// Inserts the Item into TKIT_ITEM_MASTER and TKIT_ITEM_INVENTORY tables
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="lstItemInvDetails"></param>
        /// <param name="itemTypeIndicator"></param>
        /// <returns></returns>
        public long CreateItem(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, List<TKIT_ITEM_INVENTORY> lstItemInvDetails, string itemTypeIndicator)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()))
                            {
                              var result = InsertBoxItemMasterDetails(lstItemDetails, objContext);

                                //for handling th primary key exception
                                if(result != AtparStatusCodes.ATPAR_OK)
                                {
                                    return result;
                                }
                               
                            }
                            else if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                            {
                                InsertEquipmentItemMasterDetails(lstItemDetails, objContext);
                            }
                            else if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.F.ToString()))
                            {
                                InsertFurnitureItemMasterDetails(lstItemDetails, objContext);
                            }

                            foreach (var item in lstItemInvDetails)
                            {

                                if (item.ITEM_ID != null)
                                {
                                    if (CheckIfSerialNoExists(item.ITEM_ID, item.SERIAL_NO, objContext).Equals(0))
                                    {
                                        InsertItemInventoryDetails(item, "CREATE", objContext);
                                    }
                                    else
                                    {
                                        return AtparStatusCodes.TKIT_E_SERIALEXISTS;
                                    }
                                }


                            }

                            if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()) || itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                            {
                                DeleteItemDepartments(lstItemDetails, objContext);
                                InsertItemDepartments(lstItemDetails, objContext);
                            }
                        }
                        catch
                        {
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

        /// <summary>
        /// Updates the Item in TKIT_ITEM_MASTER and TKIT_ITEM_INVENTORY tables
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="lstItemInvDetails"></param>
        /// <param name="itemTypeIndicator"></param>
        /// <returns></returns>
        public long UpdateItem(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, List<TKIT_ITEM_INVENTORY> lstItemInvDetails, string itemTypeIndicator)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            CultureInfo cultureInfo = new CultureInfo("en-US");

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {

                            if(lstItemDetails[0].DESTRUCTION_DATE == null || lstItemDetails[0].DESTRUCTION_DATE== "undefined")
                            {
                                lstItemDetails[0].DESTRUCTION_DATE = DateTime.Now.ToString();
                            }
                            DateTime mydatvalue = DateTime.Parse(lstItemDetails[0].DESTRUCTION_DATE).Date;

                            var mydate = stripTime(Convert.ToDateTime(lstItemDetails[0].DESTRUCTION_DATE));


                            if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()))
                            {
                                if ((DateTime.ParseExact(DateTime.Now.ToString("MM/dd/yyyy"), "d", cultureInfo) - DateTime.ParseExact(mydate, "d", cultureInfo)).TotalMinutes > 0)
                                {
                                    //UpdateItemInactivated(lstItemDetails, objContext);
                                    UpdateBoxItemMasterDetails(lstItemDetails, objContext);
                                   // trans.Commit();
                                   // return AtparStatusCodes.ATPAR_OK;
                                }
                                else
                                {
                                    UpdateBoxItemMasterDetails(lstItemDetails, objContext);
                                }
                            }
                            else if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                            {
                                UpdateEquipmentItemMasterDetails(lstItemDetails, objContext);
                            }
                            else if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.F.ToString()))
                            {
                                if ((DateTime.ParseExact(DateTime.Now.ToString("MM/dd/yyyy"), "d", cultureInfo) - DateTime.ParseExact(mydate, "d", cultureInfo)).TotalMinutes > 0)
                                {
                                    UpdateFurnitureItemMasterDetails(lstItemDetails, objContext);
                                    // UpdateItemInactivated(lstItemDetails, objContext);
                                   // trans.Commit();
                                   // return AtparStatusCodes.ATPAR_OK;
                                }
                                else
                                {
                                    UpdateFurnitureItemMasterDetails(lstItemDetails, objContext);
                                }
                            }

                            foreach (var item in lstItemInvDetails)
                            {
                                if (CheckIfSerialNoExists(item.ITEM_ID, item.SERIAL_NO, objContext).Equals(0))
                                {
                                    InsertItemInventoryDetails(item, "UPDATE", objContext);
                                }
                                else
                                {
                                    UpdateItemInventoryDetails(item, objContext);
                                }

                            }


                            if (itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()) || itemTypeIndicator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                            {
                                DeleteItemDepartments(lstItemDetails, objContext);
                                InsertItemDepartments(lstItemDetails, objContext);
                            }
                        }
                        catch (Exception ex)
                        {
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




        public static string stripTime(DateTime d)
        {
            string date = "";
            date = d.Date.ToString("MM/dd/yyyy");
            return date;
        }


        #endregion

        #region Private Methods

        /// <summary>
        /// Updated the Item Master Info for the Box Type Item
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateItemMasterInfoForBox(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    string destructionDate = string.IsNullOrWhiteSpace(item.DESTRUCTION_DATE) ? "NULL" : string.Concat("'", item.DESTRUCTION_DATE, "' ");
                    sbSql.Append(" UPDATE TKIT_ITEM_MASTER SET");
                    sbSql.Append(" ITEM_DESCR = '").Append(item.ITEM_DESCR.ToString().Replace("'", "''")).Append("',");
                    sbSql.Append(" DESTRUCTION_DATE = ").Append(destructionDate);
                    sbSql.Append(" WHERE ITEM_ID = '").Append(item.ITEM_ID).Append("'");
                    sbSql.Append(" AND ITEM_TYPE = '").Append(item.ITEM_TYPE).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
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
        /// Updated the Item Inventory Info for the Box Type Item
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateItemInventoryInfoForBox(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" UPDATE TKIT_ITEM_INVENTORY SET");
                    sbSql.Append(" STORAGE_LOCATION = '").Append(item.STORAGE_LOCATION).Append("',");
                    sbSql.Append(" UPDATE_DATE = '").Append(DateTime.Now).Append("',");
                    sbSql.Append(" UPDATE_USER_ID ='").Append(item.UPDATEUSERNAME).Append("'");
                    sbSql.Append(" WHERE ITEM_ID = '").Append(item.ITEM_ID).Append("'");
                    sbSql.Append(" AND ITEM_TYPE = '").Append(item.ITEM_TYPE).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
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
        /// Updated the Item Master Info for the Equipment Type Item
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateItemMasterInfoForEquipment(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" UPDATE TKIT_ITEM_MASTER SET");
                    sbSql.Append(" ITEM_DESCR = '").Append(item.ITEM_DESCR.ToString().Replace("'", "''")).Append("',");
                    sbSql.Append(" MANUFACTURER = '").Append(item.MANUFACTURER).Append("',");
                    sbSql.Append(" VENDOR = '").Append(item.VENDOR).Append("'");
                    sbSql.Append(" WHERE ITEM_ID = '").Append(item.ITEM_ID).Append("'");
                    sbSql.Append(" AND ITEM_TYPE = '").Append(item.ITEM_TYPE).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
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
        /// Updated the Item Inventory Info for the Equipment Type Item
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateItemInventoryInfoForEquipment(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" UPDATE TKIT_ITEM_INVENTORY SET");
                    sbSql.Append(" STORAGE_LOCATION = '").Append(item.STORAGE_LOCATION).Append("',");
                    sbSql.Append(" UPDATE_DATE = '").Append(DateTime.Now).Append("',");
                    sbSql.Append(" UPDATE_USER_ID ='").Append(item.UPDATEUSERNAME).Append("'");
                    sbSql.Append(" WHERE ITEM_ID = '").Append(item.ITEM_ID).Append("'");
                    sbSql.Append(" AND ITEM_TYPE = '").Append(item.ITEM_TYPE).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
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
        /// Updated the Item Master Info for the Furniture Type Item
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateItemMasterInfoForFurniture(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    string destructionDate = string.IsNullOrWhiteSpace(item.DESTRUCTION_DATE) ? "NULL" : string.Concat("'", item.DESTRUCTION_DATE, "' ");
                    sbSql.Append(" UPDATE TKIT_ITEM_MASTER SET");
                    sbSql.Append(" ITEM_DESCR = '").Append(item.ITEM_DESCR.ToString().Replace("'", "''")).Append("',");
                    sbSql.Append(" DESTRUCTION_DATE = ").Append(destructionDate).Append(",");
                    sbSql.Append(" MANUFACTURER = '").Append(item.MANUFACTURER).Append("',");
                    sbSql.Append(" VENDOR = '").Append(item.VENDOR).Append("'");
                    sbSql.Append(" WHERE ITEM_ID = '").Append(item.ITEM_ID).Append("'");
                    sbSql.Append(" AND ITEM_TYPE = '").Append(item.ITEM_TYPE).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
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
        /// Updated the Item Inventory Info for the Furniture Type Item
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateItemInventoryInfoForFurniture(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" UPDATE TKIT_ITEM_INVENTORY SET");
                    sbSql.Append(" STORAGE_LOCATION = '").Append(item.STORAGE_LOCATION).Append("',");
                    sbSql.Append(" ITEM_QTY = '").Append(item.ITEM_QTY).Append("', ");
                    sbSql.Append(" UPDATE_DATE = '").Append(DateTime.Now).Append("',");
                    sbSql.Append(" UPDATE_USER_ID ='").Append(item.UPDATEUSERNAME).Append("'");
                    sbSql.Append(" WHERE ITEM_ID = '").Append(item.ITEM_ID).Append("'");
                    sbSql.Append(" AND ITEM_TYPE = '").Append(item.ITEM_TYPE).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
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
        /// Inserts the Box Item Type into TKIT_ITEM_MASTER table
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertBoxItemMasterDetails(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    string destructionDate = string.IsNullOrWhiteSpace(item.DESTRUCTION_DATE) ? "NULL" : string.Concat("'", item.DESTRUCTION_DATE, "' ");

                    sbSql.Append(" INSERT INTO TKIT_ITEM_MASTER (");
                    sbSql.Append(" ORG_GROUP_ID,");
                    sbSql.Append(" ITEM_TYPE,");
                    sbSql.Append(" ITEM_ID,");
                    sbSql.Append(" ITEM_DESCR,");
                    sbSql.Append(" OWNER, ");
                    sbSql.Append(" OWNER_TYPE, ");
                    sbSql.Append(" DESTRUCTION_DATE,");
                    sbSql.Append(" COMMENTS,");
                    sbSql.Append(" ITEM_INACTIVATED,");
                    sbSql.Append(" CREATE_DATE,");
                    sbSql.Append(" CREATE_USERID)");
                    sbSql.Append(" VALUES (");
                    sbSql.Append("'").Append(item.ORG_GROUP_ID).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_TYPE).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_ID).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_DESCR.ToString().Replace("'", "''")).Append("', ");
                    sbSql.Append("'").Append(item.OWNER).Append("', ");
                    sbSql.Append("'").Append(item.OWNER_TYPE).Append("', ");
                    sbSql.Append(destructionDate).Append(", ");
                    sbSql.Append("'").Append(item.COMMENTS.ToString().Replace("'", "''")).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_INACTIVATED).Append("', ");
                    sbSql.Append("'").Append(item.CREATE_DATE).Append("', ");
                    sbSql.Append("'").Append(item.CREATEUSERNAME).Append("')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
              
                if(ex.ToString().ToUpper().Contains("PRIMARY KEY"))
                {
                    // return AtparStatusCodes.ATPAR_E_PRIMARYKEYVIOLATED;

                    return AtparStatusCodes.E_ITEMEXISTS;
                }
                else
                {
                    return AtparStatusCodes.E_SERVERERROR;
                }

          
            }
            finally
            {
                sbSql = null;
            }

            return AtparStatusCodes.ATPAR_OK;
        }

        /// <summary>
        /// Inserts the Equipment Item Type into TKIT_ITEM_MASTER table
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void InsertEquipmentItemMasterDetails(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" INSERT INTO TKIT_ITEM_MASTER (");
                    sbSql.Append(" ORG_GROUP_ID,");
                    sbSql.Append(" ITEM_TYPE,");
                    sbSql.Append(" ITEM_ID,");
                    sbSql.Append(" ITEM_DESCR,");
                    sbSql.Append(" OWNER, ");
                    sbSql.Append(" OWNER_TYPE, ");
                    sbSql.Append(" COMMENTS,");
                    sbSql.Append(" MANUFACTURER,");
                    sbSql.Append(" VENDOR,");
                    sbSql.Append(" [IMAGE],");
                    sbSql.Append(" ITEM_INACTIVATED,");
                    sbSql.Append(" CREATE_DATE,");
                    sbSql.Append(" CREATE_USERID)");
                    sbSql.Append(" VALUES (");
                    sbSql.Append("'").Append(item.ORG_GROUP_ID).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_TYPE).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_ID).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_DESCR.ToString().Replace("'", "''")).Append("', ");
                    sbSql.Append("'").Append(item.OWNER).Append("', ");
                    sbSql.Append("'").Append(item.OWNER_TYPE).Append("', ");
                    sbSql.Append("'").Append(item.COMMENTS.ToString().Replace("'", "''")).Append("', ");
                    sbSql.Append("'").Append(item.MANUFACTURER).Append("', ");
                    sbSql.Append("'").Append(item.VENDOR).Append("', ");
                    sbSql.Append("'").Append(item.IMAGE).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_INACTIVATED).Append("', ");
                    sbSql.Append("'").Append(item.CREATE_DATE).Append("', ");
                    sbSql.Append("'").Append(item.CREATEUSERNAME).Append("')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
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
        /// Inserts the Furniture Item Type into TKIT_ITEM_MASTER table
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void InsertFurnitureItemMasterDetails(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    string destructionDate = string.IsNullOrWhiteSpace(item.DESTRUCTION_DATE) ? "NULL" : string.Concat("'", item.DESTRUCTION_DATE, "' ");

                    sbSql.Append(" INSERT INTO TKIT_ITEM_MASTER (");
                    sbSql.Append(" ORG_GROUP_ID,");
                    sbSql.Append(" ITEM_TYPE,");
                    sbSql.Append(" ITEM_ID,");
                    sbSql.Append(" ITEM_DESCR,");
                    sbSql.Append(" OWNER, ");
                    sbSql.Append(" OWNER_TYPE, ");
                    sbSql.Append(" DESTRUCTION_DATE,");
                    sbSql.Append(" COMMENTS,");
                    sbSql.Append(" MANUFACTURER,");
                    sbSql.Append(" VENDOR,");
                    sbSql.Append(" [IMAGE],");
                    sbSql.Append(" ITEM_INACTIVATED,");
                    sbSql.Append(" CREATE_DATE,");
                    sbSql.Append(" CREATE_USERID)");
                    sbSql.Append(" VALUES (");
                    sbSql.Append("'").Append(item.ORG_GROUP_ID).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_TYPE).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_ID).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_DESCR.ToString().Replace("'", "''")).Append("', ");
                    sbSql.Append("'").Append(item.OWNER).Append("', ");
                    sbSql.Append("'").Append(item.OWNER_TYPE).Append("', ");
                    sbSql.Append(destructionDate).Append(", ");
                    sbSql.Append("'").Append(item.COMMENTS.ToString().Replace("'", "''")).Append("', ");
                    sbSql.Append("'").Append(item.MANUFACTURER).Append("', ");
                    sbSql.Append("'").Append(item.VENDOR).Append("', ");
                    sbSql.Append("'").Append(item.IMAGE).Append("', ");
                    sbSql.Append("'").Append(item.ITEM_INACTIVATED).Append("', ");
                    sbSql.Append("'").Append(item.CREATE_DATE).Append("', ");
                    sbSql.Append("'").Append(item.CREATEUSERNAME).Append("')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
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
        /// Inserts the Box Item Type into TKIT_ITEM_INVENTORY table
        /// </summary>
        /// <param name="lstItemInvDetails"></param>
        /// <param name="mode"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void InsertItemInventoryDetails(TKIT_ITEM_INVENTORY lstItemInvDetails, string mode, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                string serviceDateTime = string.IsNullOrWhiteSpace(lstItemInvDetails.SERVICE_DT_TIME.ToString()) ? "NULL" : string.Concat("'", lstItemInvDetails.SERVICE_DT_TIME.ToString(), "' ");
                sbSql.Append(" INSERT INTO TKIT_ITEM_INVENTORY (");
                sbSql.Append(" ORG_GROUP_ID, ");

                if(lstItemInvDetails.ASSET_ID != null && string.IsNullOrEmpty(lstItemInvDetails.ASSET_ID).Equals(false))
                {
                    sbSql.Append(" ASSET_ID, ");
                }

                sbSql.Append(" ITEM_TYPE, ");
                sbSql.Append(" ITEM_ID, ");
                sbSql.Append(" SERIAL_NO, ");
                sbSql.Append(" LOT_NO, ");
                sbSql.Append(" ITEM_QTY, ");
                sbSql.Append(" STORAGE_LOCATION, ");
                sbSql.Append(" SERVICE_DT_TIME, ");
                sbSql.Append(" STATUS, ");
                sbSql.Append(" USER_FIELD_1, ");
                sbSql.Append(" UPDATE_DATE ");

                if (mode.Equals("UPDATE"))
                {
                    sbSql.Append(", UPDATE_USER_ID");
                }

                sbSql.Append(") VALUES (");
                sbSql.Append("'").Append(lstItemInvDetails.ORG_GROUP_ID).Append("', ");

                if (lstItemInvDetails.ASSET_ID != null && string.IsNullOrEmpty(lstItemInvDetails.ASSET_ID).Equals(false))
                {
                    sbSql.Append("'").Append(string.Concat(lstItemInvDetails.ASSET_ID.Substring(0, 4), 
                                            _commonRepo.GetAtparLatestValues((int)AtParWebEnums.EnumApps.TrackIT, "ASSET_ID").ToString().PadLeft(9, '0'))).Append("', ");
                }
                
                sbSql.Append("'").Append(lstItemInvDetails.ITEM_TYPE).Append("', ");
                sbSql.Append("'").Append(lstItemInvDetails.ITEM_ID).Append("', ");

                if (string.IsNullOrEmpty(lstItemInvDetails.SERIAL_NO).Equals(false))
                {
                    sbSql.Append("'").Append(lstItemInvDetails.SERIAL_NO).Append("', ");
                }
                else
                {
                    sbSql.Append("' ', ");
                }
                if (string.IsNullOrEmpty(lstItemInvDetails.LOT_NO).Equals(false))
                {
                    sbSql.Append("'").Append(lstItemInvDetails.LOT_NO).Append("', ");
                }
                else
                {
                    sbSql.Append("' ', ");
                }
                if (string.IsNullOrEmpty(lstItemInvDetails.SERIAL_NO.Trim()).Equals(false))
                {
                    sbSql.Append("'").Append(lstItemInvDetails.ITEM_QTY).Append("', ");
                }
                else
                {
                    sbSql.Append("'1', ");
                }

                sbSql.Append("'").Append(lstItemInvDetails.STORAGE_LOCATION).Append("', ");
                sbSql.Append(serviceDateTime).Append(", ");
                sbSql.Append("'").Append((lstItemInvDetails.STATUS.ToString().ToUpper().Equals("FALSE")) ? "0" : "1").Append("', ");
                sbSql.Append("'").Append(lstItemInvDetails.USER_FIELD_1).Append("', ");
                sbSql.Append("'").Append(DateTime.Now).Append("' ");

                if (mode.Equals("UPDATE"))
                {
                    sbSql.Append(", '").Append(lstItemInvDetails.UPDATE_USER_ID).Append("'");
                }

                sbSql.Append(") ");

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
        /// Checks Item Existence with ItemId and Serial combination in TKIT_ITEM_INVENTORY table
        /// </summary>
        /// <param name="itemId"></param>
        /// <param name="serialNo"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private int CheckIfSerialNoExists(string itemId, string serialNo, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                sbSql.Append(" SELECT COUNT(SERIAL_NO)");
                sbSql.Append(" FROM TKIT_ITEM_INVENTORY");
                sbSql.Append(" WHERE ITEM_ID = '").Append(itemId).Append("'");
                sbSql.Append(" AND SERIAL_NO = '").Append(serialNo).Append("'");

                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }

                return objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();
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
        /// Updates the Item to INACTIVE in TKIT_ITEM_MASTER table
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateItemInactivated(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE TKIT_ITEM_MASTER SET ");
                    sbSql.Append("ITEM_INACTIVATED = '").Append(item.ITEM_INACTIVATED).Append("' ");
                    sbSql.Append("WHERE ITEM_ID = '").Append(item.ITEM_ID).Append("' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

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
        /// Updates the Box Item Type details in TKIT_ITEM_MASTER table
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateBoxItemMasterDetails(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    string destructionDate = string.IsNullOrWhiteSpace(item.DESTRUCTION_DATE) ? "NULL" : string.Concat("'", item.DESTRUCTION_DATE, "' ");
                    sbSql.Append("UPDATE TKIT_ITEM_MASTER SET ");
                    sbSql.Append("ORG_GROUP_ID = '").Append(item.ORG_GROUP_ID).Append("', ");
                    sbSql.Append("ITEM_DESCR = '").Append(item.ITEM_DESCR.ToString().Replace("'", "''")).Append("', ");
                    sbSql.Append("OWNER = '").Append(item.OWNER).Append("', ");
                    sbSql.Append("OWNER_TYPE = '").Append(item.OWNER_TYPE).Append("', ");
                    sbSql.Append("ITEM_INACTIVATED = '").Append(item.ITEM_INACTIVATED).Append("', ");
                    sbSql.Append("DESTRUCTION_DATE = ").Append(destructionDate).Append(", ");
                    sbSql.Append("COMMENTS = '").Append(item.COMMENTS.ToString().Replace("'", "''")).Append("' "); ;
                    sbSql.Append("WHERE ITEM_ID = '").Append(item.ITEM_ID).Append("' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
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
        /// Updates the Equipment Item Type details in TKIT_ITEM_MASTER table
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateEquipmentItemMasterDetails(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE TKIT_ITEM_MASTER SET ");
                    sbSql.Append("ORG_GROUP_ID = '").Append(item.ORG_GROUP_ID).Append("', ");
                    sbSql.Append("ITEM_DESCR = '").Append(item.ITEM_DESCR.ToString().Replace("'", "''")).Append("', ");
                    sbSql.Append("OWNER = '").Append(item.OWNER).Append("', ");
                    sbSql.Append("OWNER_TYPE = '").Append(item.OWNER_TYPE).Append("', ");
                    sbSql.Append("ITEM_INACTIVATED = '").Append(item.ITEM_INACTIVATED).Append("', ");
                    sbSql.Append("COMMENTS = '").Append(item.COMMENTS.ToString().Replace("'", "''")).Append("', "); ;
                    sbSql.Append("MANUFACTURER = '").Append(item.MANUFACTURER).Append("', ");
                    sbSql.Append("VENDOR = '").Append(item.VENDOR).Append("', ");
                    sbSql.Append("[IMAGE] = '").Append(item.IMAGE).Append("' ");
                    sbSql.Append(" WHERE ITEM_ID = '").Append(item.ITEM_ID).Append("' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
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
        /// Updates the Furniture Item Type details in TKIT_ITEM_MASTER table
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateFurnitureItemMasterDetails(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                foreach (var item in lstItemDetails)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    string destructionDate = string.IsNullOrWhiteSpace(item.DESTRUCTION_DATE) ? "NULL" : string.Concat("'", item.DESTRUCTION_DATE, "' ");
                    sbSql.Append("UPDATE TKIT_ITEM_MASTER SET ");
                    sbSql.Append("ORG_GROUP_ID = '").Append(item.ORG_GROUP_ID).Append("', ");
                    sbSql.Append("ITEM_DESCR = '").Append(item.ITEM_DESCR.ToString().Replace("'", "''")).Append("', ");
                    sbSql.Append("OWNER = '").Append(item.OWNER).Append("', ");
                    sbSql.Append("OWNER_TYPE = '").Append(item.OWNER_TYPE).Append("', ");
                    sbSql.Append("ITEM_INACTIVATED = '").Append(item.ITEM_INACTIVATED).Append("', ");
                    sbSql.Append("DESTRUCTION_DATE = ").Append(destructionDate).Append(", ");
                    sbSql.Append("COMMENTS = '").Append(item.COMMENTS.ToString().Replace("'", "''")).Append("', "); ;
                    sbSql.Append("MANUFACTURER = '").Append(item.MANUFACTURER).Append("', ");
                    sbSql.Append("VENDOR = '").Append(item.VENDOR).Append("', ");
                    sbSql.Append("[IMAGE] = '").Append(item.IMAGE).Append("' ");
                    sbSql.Append(" WHERE ITEM_ID = '").Append(item.ITEM_ID).Append("' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }
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
        /// Updates the TKIT_ITEM_INVENTORY table
        /// </summary>
        /// <param name="lstItemInvDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void UpdateItemInventoryDetails(TKIT_ITEM_INVENTORY lstItemInvDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                string serviceDateTime = string.IsNullOrWhiteSpace(lstItemInvDetails.SERVICE_DT_TIME.ToString()) ? "NULL" : string.Concat("'", lstItemInvDetails.SERVICE_DT_TIME.ToString(), "' ");
                sbSql.Append("UPDATE TKIT_ITEM_INVENTORY SET ");
                sbSql.Append("ORG_GROUP_ID = '").Append(lstItemInvDetails.ORG_GROUP_ID).Append("', ");
                sbSql.Append("LOT_NO = '").Append(lstItemInvDetails.LOT_NO).Append("', ");

                if (string.IsNullOrWhiteSpace(lstItemInvDetails.SERIAL_NO.ToString()).Equals(false))
                {
                    sbSql.Append("ITEM_QTY= '1', ");
                }
                else
                {
                    sbSql.Append("ITEM_QTY = '").Append(lstItemInvDetails.ITEM_QTY).Append("', ");
                }

                sbSql.Append("STORAGE_LOCATION ='").Append(lstItemInvDetails.STORAGE_LOCATION).Append("', ");
                sbSql.Append("ASSET_ID ='").Append(lstItemInvDetails.ASSET_ID).Append("', ");
                sbSql.Append("SERVICE_DT_TIME = ").Append(serviceDateTime).Append(", ");
                sbSql.Append("USER_FIELD_1 = '").Append(lstItemInvDetails.USER_FIELD_1).Append("', ");
                sbSql.Append("STATUS = '").Append(lstItemInvDetails.STATUS.ToString().ToUpper().Equals("FALSE") ? "0" : "1").Append("', ");
                sbSql.Append("UPDATE_DATE = '").Append(DateTime.Now).Append("', ");
                sbSql.Append("UPDATE_USER_ID = '").Append(lstItemInvDetails.UPDATE_USER_ID).Append("' ");
                sbSql.Append("WHERE ITEM_ID = '").Append(lstItemInvDetails.ITEM_ID).Append("' ");
                sbSql.Append("AND SERIAL_NO = '").Append(lstItemInvDetails.SERIAL_NO).Append("' ");

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
        /// Delets the Departments with the specified ItemID from the TKIT_ITEM_DEPT table
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void DeleteItemDepartments(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM TKIT_ITEM_DEPT ");
                sbSql.Append("WHERE ITEM_ID = '").Append(lstItemDetails[0].ITEM_ID).Append("'");

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
        /// Inserts the Department details with the Specified ItemID into TKIT_ITEM_DEPT table
        /// </summary>
        /// <param name="lstItemDetails"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private void InsertItemDepartments(List<VM_TKIT_ITEM_DETAILS> lstItemDetails, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                Array deptInfo = lstItemDetails[0].DEPT_ID.ToString().Trim().Split(',');

                foreach (var dept in deptInfo)
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" INSERT INTO TKIT_ITEM_DEPT");
                    sbSql.Append(" (ITEM_ID, DEPT_ID, ORG_GROUP_ID)");
                    sbSql.Append(" VALUES");
                    sbSql.Append(" ('").Append(lstItemDetails[0].ITEM_ID).Append("', ");
                    sbSql.Append(" '").Append(dept).Append("', ");
                    sbSql.Append(" '").Append(lstItemDetails[0].ORG_GROUP_ID).Append("') ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                    sbSql.Remove(0, sbSql.Length);
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
