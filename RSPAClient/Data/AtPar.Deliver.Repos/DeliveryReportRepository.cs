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
using System.Data.SqlClient;
using System.Xml;
using System.Data;
using AtPar.ViewModel;
using AtPar.Repository.Interfaces.Common;

namespace AtPar.Deliver.Repos
{
    public class DeliveryReportRepository : IDeliveryReportRepository
    {


        ILog _log;
        ICommonRepository _commonRepo;


        public DeliveryReportRepository(ILog log, ICommonRepository commonRepository)
        {
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(DeliveryReportRepository));
        }

        #region Main Functions
        public List<VM_DELV_DELIVERY_REPORT> GetDeliveryReportData(string OrgGroupID, string fromDate, string ToDate,
           string srvrUserID, string PoId, string DeliverTo, string TrackingNo, string DeliverdBy,
           string DeptId, string VendorName, string ItmDesc, string Loc, string ItemId,
           string Carrier, string Requestor, string BlnTflag, string DeliveryLoc, string Status, string CurrStatus,
           string LocDescr, string PakageType, string Pallet)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long _StatusCode = -1;
            List<VM_DELV_DELIVERY_REPORT> lstDeliveryData = new List<VM_DELV_DELIVERY_REPORT>();

            StringBuilder sbSql = new StringBuilder();

            try
            {
                string _strNonStockStore = string.Empty;

                _strNonStockStore = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.NON_STOCK_STORE.ToString(), (int)AtParWebEnums.EnumApps.Receiving, OrgGroupID);
                int Usrscnt;
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(*) FROM MT_ATPAR_USER_GROUPS,MT_ATPAR_USER B WHERE APP_ID=").Append((int)AtParWebEnums.EnumApps.Deliver)
                        .Append(" AND SERVER_USER = '").Append(srvrUserID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    Usrscnt = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + Usrscnt); }

                    // return bUnits.ToString();
                }

                if (Usrscnt > 0)
                {

                    sbSql.Clear();
                    sbSql.Append("SELECT * FROM (SELECT DTTRANS.TRANSACTION_ID, DTTRANSITEMS.TO_USER_OR_LOCGRP AS CURRENT_STATUS_USER,  DTTRANS.STATUS,DTTRANS.REPORT_DATA_1 AS PO_ID,  DTTRANSITEMS.EVENT_ID,DTTRANS.REPORT_DATA_1, ")
                    .Append(" DTTRANS.REPORT_DATA_2 AS LINE_NO, DTTRANS.REPORT_DATA_3, DTTRANS.REPORT_DATA_31 , DTTRANS.REPORT_DATA_6 AS  CARRIER_ID,  ")
                     .Append(" DTTRANS.REPORT_DATA_7 AS DEPT_ID, DTTRANS.HAND_OVER_DATE, DTTRANS.USER_ID AS HANDOVERUSER,   ")
                     .Append(" REPORT_DATA_4 AS DELIVERED_TO, DTTRANS.TRANSACTION_ID AS TRANS_ID, DTTRANS.KEY_6 AS DELIVER_NON_PO,DTTRANS.KEY_7 AS SCH_LINE_NO,  ")
                     .Append(" DTTRANS.SIGNATURE_ID, DTTRANS.REPORT_DATA_11 AS RECEIVER_NAME,  DTTRANS.REPORT_DATA_19, DTTRANS.REPORT_DATA_20, ")
                     .Append(" DTTRANS.REPORT_DATA_8, DTTRANS.REPORT_DATA_10, DTTRANS.KEY_4, DTTRANS.UPDATE_DATE AS UPDATE_DT_TIME, DTTRANS.REPORT_DATA_9 AS VENDOR_NAME,   ")
                     .Append(" DTTRANS.REPORT_DATA_12 AS RECEIPT_DATE, (CASE WHEN (REPORT_DATA_5 IS NULL OR REPORT_DATA_5='') AND (REPORT_DATA_26 IS NULL OR REPORT_DATA_26='') THEN '' ")
                    .Append(" WHEN REPORT_DATA_5 IS NULL OR REPORT_DATA_5='' THEN ' - ' + REPORT_DATA_26 WHEN REPORT_DATA_26 IS NULL OR REPORT_DATA_26='' THEN REPORT_DATA_5 + ' - ' ")
                     .Append(" ELSE REPORT_DATA_5 + ' - ' + REPORT_DATA_26 END)AS LOCATION ,(CASE WHEN (REPORT_DATA_40 IS NULL OR REPORT_DATA_40='') THEN '' ")
                    .Append(" ELSE REPORT_DATA_40 END)AS OLD_LOCATION, DTTRANS.REPORT_DATA_16 AS ITEM_ID, DTTRANS.REPORT_DATA_39 AS PALLET,  ")
                     .Append(" DTTRANS.REPORT_DATA_17 AS QTY, DTTRANS.REPORT_DATA_32 AS DELIVERY_LOCATION,   ")
                     .Append(" DTTRANS.DOWNLOAD_USER_ID, DTTRANS.REPORT_DATA_29 AS RECEIVE_USERID, DTTRANS.REPORT_DATA_30 AS DOWNLOAD_DT_TIME,  ")
                    .Append(" DTTRANSITEMS.USER_ID AS  DELIVERED_BY, DTTRANSITEMS.USER_ID AS EVENT_USER_ID, DTTRANSITEMS.UPDATE_DATE,  ")
                    .Append(" (CASE WHEN DTTRANSITEMS.EVENT_ID = 20  THEN (SELECT FIRST_NAME+' '+MIDDLE_INITIAL+' '+LAST_NAME+'(' + USER_ID + ')'  ")
                    .Append(" FROM MT_ATPAR_USER WHERE USER_ID= DTTRANSITEMS.USER_ID ) ELSE '' END) AS PICKUP_USER, DTTRANS.REPORT_DATA_27 AS COMMENTS, DTTRANS.REPORT_DATA_37 AS HDR_COMMENTS, DTTRANS.REPORT_DATA_41 AS REDELIVER, ")
                     .Append(" (SELECT NOTES FROM MT_ATPAR_NOTES WHERE KEY_11=DTTRANS.TRANSACTION_ID AND CODE='TRACKING NUMBER' ) AS ITEM_NOTES ")
                    .Append(" FROM (SELECT DISTINCT ATDTTRANS.*, ATUSRGRPS.ORG_GROUP_ID, ATUSRGRPS.SERVER_USER FROM MT_ATPAR_DETAIL_TRANSACTION ATDTTRANS ")
                    .Append(" INNER JOIN MT_ATPAR_USER_GROUPS ATUSRGRPS ON  ")
                     .Append(" (ATDTTRANS.DOWNLOAD_USER_ID =ATUSRGRPS.CLIENT_USER OR ATDTTRANS.DOWNLOAD_USER_ID=ATUSRGRPS.CLIENT_USER) ")
                     .Append(" WHERE ATUSRGRPS.APP_ID = ").Append((int)AtParWebEnums.EnumApps.Deliver).Append(" AND ATUSRGRPS.SERVER_USER='").Append(srvrUserID).Append("' ) AS DTTRANS ")
                     .Append("  LEFT OUTER JOIN  ")
                    .Append(" (SELECT TRANSACTION_ID,EVENT_ID,TO_USER_OR_LOCGRP,UPDATE_DATE,USER_ID FROM MT_DELV_ITEM_TRIP_MISC_EVENT  ")
                     .Append(" UNION  ")
                    .Append(" SELECT TRANSACTION_ID,EVENT_ID,USER_ID,UPDATE_DATE,USER_ID FROM MT_DELV_ITEM_TRIP) DTTRANSITEMS ")
                    .Append(" ON DTTRANSITEMS.TRANSACTION_ID=DTTRANS.TRANSACTION_ID ")
                     .Append(" WHERE DTTRANS.APP_ID = ").Append((int)AtParWebEnums.EnumApps.Deliver)
                    .Append(" AND DTTRANS.SERVER_USER='" + srvrUserID + "' ");

                }
                else
                {

                    sbSql.Clear();

                    sbSql.Append("SELECT * FROM (SELECT DTTRANS.TRANSACTION_ID, DTTRANSITEMS.TO_USER_OR_LOCGRP AS CURRENT_STATUS_USER, DTTRANS.STATUS,DTTRANS.REPORT_DATA_1 AS PO_ID,  DTTRANSITEMS.EVENT_ID,DTTRANS.REPORT_DATA_1, ")
                         .Append(" DTTRANS.REPORT_DATA_2 AS LINE_NO, DTTRANS.REPORT_DATA_3, DTTRANS.REPORT_DATA_31 , DTTRANS.REPORT_DATA_6 AS  CARRIER_ID,  ")
                         .Append(" DTTRANS.REPORT_DATA_7 AS DEPT_ID, DTTRANS.HAND_OVER_DATE, DTTRANS.USER_ID AS HANDOVERUSER,   ")
                        .Append(" REPORT_DATA_4 AS DELIVERED_TO, DTTRANS.TRANSACTION_ID AS TRANS_ID, DTTRANS.KEY_6 AS DELIVER_NON_PO,DTTRANS.KEY_7 AS SCH_LINE_NO,  ")
                        .Append(" DTTRANS.SIGNATURE_ID, DTTRANS.REPORT_DATA_11 AS RECEIVER_NAME, DTTRANS.REPORT_DATA_19, DTTRANS.REPORT_DATA_20, ")
                         .Append(" DTTRANS.REPORT_DATA_8, DTTRANS.REPORT_DATA_10, DTTRANS.KEY_4, DTTRANS.UPDATE_DATE AS UPDATE_DT_TIME, DTTRANS.REPORT_DATA_9 AS VENDOR_NAME,   ")
                         .Append(" DTTRANS.REPORT_DATA_12 AS RECEIPT_DATE, (CASE WHEN (REPORT_DATA_5 IS NULL OR REPORT_DATA_5='') AND (REPORT_DATA_26 IS NULL OR REPORT_DATA_26='') THEN '' ")
                         .Append(" WHEN REPORT_DATA_5 IS NULL OR REPORT_DATA_5='' THEN ' - ' + REPORT_DATA_26 WHEN REPORT_DATA_26 IS NULL OR REPORT_DATA_26='' THEN REPORT_DATA_5 + ' - ' ")
                         .Append(" ELSE REPORT_DATA_5 + ' - ' + REPORT_DATA_26 END)AS LOCATION, (CASE WHEN (REPORT_DATA_40 IS NULL OR REPORT_DATA_40='') THEN '' ")
                         .Append(" ELSE REPORT_DATA_40 END)AS OLD_LOCATION, DTTRANS.REPORT_DATA_16 AS ITEM_ID, DTTRANS.REPORT_DATA_39 AS PALLET, ")
                         .Append(" DTTRANS.REPORT_DATA_17 AS QTY, DTTRANS.REPORT_DATA_32 AS DELIVERY_LOCATION,   ")
                         .Append(" DTTRANS.DOWNLOAD_USER_ID, DTTRANS.REPORT_DATA_29 AS RECEIVE_USERID, DTTRANS.REPORT_DATA_30 AS DOWNLOAD_DT_TIME,  ")
                        .Append(" DTTRANSITEMS.USER_ID AS  DELIVERED_BY, DTTRANSITEMS.USER_ID AS EVENT_USER_ID, DTTRANSITEMS.UPDATE_DATE,  ")
                        .Append(" (CASE WHEN DTTRANSITEMS.EVENT_ID = 20  THEN  (SELECT FIRST_NAME+' '+MIDDLE_INITIAL+' '+LAST_NAME+'(' + USER_ID + ')'  ")
                        .Append(" FROM MT_ATPAR_USER WHERE USER_ID= DTTRANSITEMS.USER_ID )  ELSE '' END) AS PICKUP_USER, DTTRANS.REPORT_DATA_27 AS COMMENTS, DTTRANS.REPORT_DATA_37 AS HDR_COMMENTS, DTTRANS.REPORT_DATA_41 AS REDELIVER, ")
                        .Append(" (SELECT NOTES FROM MT_ATPAR_NOTES WHERE KEY_11=DTTRANS.TRANSACTION_ID AND CODE='TRACKING NUMBER' ) AS ITEM_NOTES ")
                        .Append(" FROM (SELECT ATDTTRANS.*, ATORGGRPS.ORG_GROUP_ID FROM MT_ATPAR_DETAIL_TRANSACTION ATDTTRANS ")
                        .Append(" INNER JOIN MT_ATPAR_USER_ORG_GROUPS ATORGGRPS ON  ")
                        .Append(" (ATDTTRANS.DOWNLOAD_USER_ID =ATORGGRPS.USER_ID OR ATDTTRANS.DOWNLOAD_USER_ID=ATORGGRPS.USER_ID)) AS DTTRANS ")
                         .Append("  LEFT OUTER JOIN  ")
                        .Append(" (SELECT TRANSACTION_ID,EVENT_ID,TO_USER_OR_LOCGRP,UPDATE_DATE,USER_ID FROM MT_DELV_ITEM_TRIP_MISC_EVENT  ")
                        .Append(" UNION  ")
                        .Append(" SELECT TRANSACTION_ID,EVENT_ID,USER_ID,UPDATE_DATE,USER_ID FROM MT_DELV_ITEM_TRIP) DTTRANSITEMS ")
                         .Append(" ON DTTRANSITEMS.TRANSACTION_ID=DTTRANS.TRANSACTION_ID ")
                        .Append(" WHERE DTTRANS.APP_ID = " + (int)AtParWebEnums.EnumApps.Deliver + " ");

                    if (OrgGroupID != "All")
                    {

                        sbSql.Append(" AND EXISTS ( SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ")
                            .Append(" BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS B")
                            .Append(" WHERE B.ORG_GROUP_ID = '").Append(OrgGroupID).Append("' AND DTTRANS.ORG_GROUP_ID = B.ORG_GROUP_ID))");


                    }

                }

                if (PakageType == "PO")
                {
                    sbSql.Append(" AND DTTRANS.NON_PO_ITEM='N'");
                }
                else if (PakageType == "NON PO")
                {
                    sbSql.Append("AND DTTRANS.NON_PO_ITEM='Y'");
                }

                if (!string.IsNullOrEmpty(CurrStatus))
                {
                    sbSql.Append(" AND DTTRANS.STATUS  = " + CurrStatus + "");

                    if (!string.IsNullOrEmpty(DeliverdBy))
                    {
                        sbSql.Append(" AND DTTRANS.USER_ID  = '" + DeliverdBy + "' ");
                    }

                    sbSql.Append(" AND DTTRANS.UPDATE_DATE >= CONVERT(DATETIME,'" + fromDate + " ',101) AND " + " DTTRANS.UPDATE_DATE <= DATEADD(DAY,1,CONVERT(DATETIME,'" + ToDate + "',101)) ");
                }
                else if (!string.IsNullOrEmpty(Status))
                {
                    if ((Status == "1" | Status == "0" | Status == "13"))
                    {
                        if ((Status == "1" | Status == "13"))
                        {
                            sbSql.Append(" AND DTTRANS.REPORT_DATA_30 >= CONVERT(DATETIME,'" + fromDate + " ',101) AND " + " DTTRANS.REPORT_DATA_30 <= DATEADD(DAY,1,CONVERT(DATETIME,'" + ToDate + "',101)) ");

                            if (!string.IsNullOrEmpty(DeliverdBy))
                            {
                                sbSql.Append(" AND DTTRANS.USER_ID  = '" + DeliverdBy + "' ");
                            }
                        }
                        else if (Status == "0")
                        {
                            sbSql.Append(" AND DTTRANS.REPORT_DATA_12 >= CONVERT(DATETIME,'" + fromDate + "',101) AND " + "DTTRANS.REPORT_DATA_12 <= DATEADD(DAY,1,CONVERT(DATETIME,'" + ToDate + "',101)) ");

                            if (!string.IsNullOrEmpty(DeliverdBy))
                            {
                                sbSql.Append(" AND DTTRANS.REPORT_DATA_29  = '" + DeliverdBy + "' ");
                            }
                        }

                        sbSql.Append(" AND DTTRANS.STATUS  = " + Status + "");
                    }
                    else
                    {
                        sbSql.Append(" AND DTTRANSITEMS.UPDATE_DATE >= CONVERT(DATETIME,'" + fromDate + "',101) AND " + " DTTRANSITEMS.UPDATE_DATE <= DATEADD(DAY,1,CONVERT(DATETIME,'" + ToDate + "',101))");

                        if (!string.IsNullOrEmpty(DeliverdBy))
                        {
                            sbSql.Append(" AND DTTRANSITEMS.USER_ID = '" + DeliverdBy + "' ");
                        }
                        sbSql.Append(" AND DTTRANSITEMS.EVENT_ID  = " + Status + " ");
                    }
                }
                else
                {
                    sbSql.Append(" AND ((DTTRANS.REPORT_DATA_30 >= CONVERT(DATETIME,'" + fromDate + "',101) AND " + " DTTRANS.REPORT_DATA_30 <= DATEADD(DAY,1,CONVERT(DATETIME,'" + ToDate + "',101)) AND " + " (DTTRANS.STATUS = 1 OR DTTRANS.STATUS = 13) ");

                    if (!string.IsNullOrEmpty(DeliverdBy))
                    {
                        sbSql.Append(" AND DTTRANS.USER_ID  = '" + DeliverdBy + "'");
                    }

                    sbSql.Append(") OR  (DTTRANS.REPORT_DATA_12 >= CONVERT(DATETIME,'" + fromDate + "',101) AND " + " DTTRANS.REPORT_DATA_12 <= DATEADD(DAY,1,CONVERT(DATETIME,'" + ToDate + "',101)) AND " + " DTTRANS.STATUS = 0 ");

                    if (!string.IsNullOrEmpty(DeliverdBy))
                    {
                        sbSql.Append(" AND DTTRANS.REPORT_DATA_29  = '" + DeliverdBy + "'");
                    }

                    sbSql.Append(") OR (DTTRANSITEMS.UPDATE_DATE >= CONVERT(DATETIME,'" + fromDate + "',101) AND" + " DTTRANSITEMS.UPDATE_DATE <= DATEADD(DAY,1,CONVERT(DATETIME,'" + ToDate + "',101)) AND" + " DTTRANSITEMS.EVENT_ID IN (1,20,30,40,50,100))");


                    if (!string.IsNullOrEmpty(DeliverdBy))
                    {
                        sbSql.Append(" AND DTTRANSITEMS.USER_ID  = '" + DeliverdBy + "' ");
                    }

                    sbSql.Append(" )");
                }

                string whereClauseSql = string.Empty;


                if (!string.IsNullOrEmpty(TrackingNo))
                {
                    whereClauseSql = whereClauseSql + " AND (DTTRANS.REPORT_DATA_3 LIKE '%" + TrackingNo + "%'  OR DTTRANS.REPORT_DATA_31 LIKE '%" + TrackingNo + "%'" + " OR EXISTS (SELECT NOTES FROM MT_ATPAR_NOTES WHERE KEY_11=DTTRANS.TRANSACTION_ID AND NOTES LIKE '%" + TrackingNo + "%'))";
                }


                if (!string.IsNullOrEmpty(DeptId))
                {
                    whereClauseSql = whereClauseSql + " AND DTTRANS.REPORT_DATA_7 LIKE '%" + DeptId + "%'";
                }

                if (!string.IsNullOrEmpty(PoId))
                {
                    whereClauseSql = whereClauseSql + " AND (DTTRANS.REPORT_DATA_1 LIKE '%" + PoId + "%'" + "OR KEY_4 LIKE '%" + PoId + "%')";
                }

                if (!string.IsNullOrEmpty(VendorName))
                {
                    whereClauseSql = whereClauseSql + " AND DTTRANS.REPORT_DATA_9 LIKE '%" + VendorName.substituteString().ReplaceString() + "%'";
                }


                if (!string.IsNullOrEmpty(DeliveryLoc))
                {
                    whereClauseSql = whereClauseSql + " AND DTTRANS.REPORT_DATA_32 LIKE '%" + DeliveryLoc + "%'";
                }

                if (!string.IsNullOrEmpty(ItmDesc))
                {
                    whereClauseSql = whereClauseSql + " AND DTTRANS.REPORT_DATA_8 LIKE '%" + ItmDesc.CleanString().substituteString().ReplaceString() + "%'";
                }

                if (!string.IsNullOrEmpty(Loc))
                {
                    whereClauseSql = whereClauseSql + " AND DTTRANS.REPORT_DATA_5 LIKE '%" + Loc + "%'";
                }

                if (!string.IsNullOrEmpty(DeliverTo))
                {
                    whereClauseSql = whereClauseSql + " AND (DTTRANS.REPORT_DATA_4 LIKE '%" + DeliverTo.substituteString().ReplaceString() + "%' OR DTTRANS.REPORT_DATA_11 LIKE '%" + DeliverTo.substituteString() + "%')";
                }

                if (!string.IsNullOrEmpty(ItemId))
                {
                    whereClauseSql = whereClauseSql + " AND DTTRANS.REPORT_DATA_16 LIKE '%" + ItemId + "%'";
                }

                if (!string.IsNullOrEmpty(Carrier))
                {
                    whereClauseSql = whereClauseSql + " AND DTTRANS.REPORT_DATA_6 LIKE '%" + Carrier + "%'";
                }

                if (!string.IsNullOrEmpty(Requestor))
                {
                    whereClauseSql = whereClauseSql + " AND DTTRANS.REPORT_DATA_4 LIKE '%" + Requestor.substituteString().ReplaceString() + "%'";
                }

                if (!string.IsNullOrEmpty(LocDescr))
                {
                    whereClauseSql = whereClauseSql + " AND DTTRANS.REPORT_DATA_26 LIKE '%" + LocDescr.substituteString().ReplaceString() + "%'";
                }

                if (!string.IsNullOrEmpty(Pallet))
                {
                    whereClauseSql = whereClauseSql + " AND DTTRANS.REPORT_DATA_39 LIKE '%" + Pallet + "%'";
                }

                sbSql.Append(whereClauseSql).Append(" ) As A ");
                sbSql.Append(" WHERE UPDATE_DT_TIME BETWEEN CONVERT(DATETIME,'" + fromDate + " ',101) AND DATEADD(DAY,1,CONVERT(DATETIME,'" + ToDate + "',101)) ");
                sbSql.Append(" ORDER BY TRANSACTION_ID, UPDATE_DATE, EVENT_ID ");
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    lstDeliveryData = objContext.Database.SqlQuery<VM_DELV_DELIVERY_REPORT>(sbSql.ToString()).ToList();
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

            return lstDeliveryData;

        }


        public long GetUserFullName(string UserId, ref string UserFullName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + ' (' + USER_ID + ')' AS FULLNAME FROM MT_ATPAR_USER WHERE USER_ID='").Append(UserId).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var UserName = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (!string.IsNullOrEmpty(UserName))
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + UserName.ToString()); }
                        UserFullName = UserName.ToString();
                    }
                    return AtparStatusCodes.ATPAR_OK;
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

        public List<VM_DELV_PARCELCOUNT_DETAILS> ParcelCountDetails()
        {
            List<VM_DELV_PARCELCOUNT_DETAILS> lstParcelCount = null;
            try
            {
                StringBuilder sbSql = new StringBuilder();

                sbSql.Append("SELECT CONVERT(NVARCHAR(MAX),PCD.TRACKING_NO) TRACKING_NO, PCD.SCAN_DATE, AT.USER_ID, PCD.TRANSACTION_ID FROM MT_RECV_PARCEL_COUNTS_DETAIL PCD ")
                           .Append(" INNER JOIN MT_ATPAR_TRANSACTION AT ON PCD.TRANSACTION_ID = AT.TRANSACTION_ID AND AT.APP_ID = 4");

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    lstParcelCount = objContext.Database.SqlQuery<VM_DELV_PARCELCOUNT_DETAILS>(sbSql.ToString()).ToList();
                }

            }
            catch (Exception ex)
            {


            }
            return lstParcelCount;
        }

        public List<RM_USER_LOCATIONS> GetBadgeDetails(string badgeId)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<RM_USER_LOCATIONS> lstBadgeDetails = new List<RM_USER_LOCATIONS>();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT CASE (ISNULL(USER_ID,'')) WHEN '' THEN  ISNULL(FIRST_NAME,'') + ' ' + ISNULL(MIDDLE_NAME,'') + ' ' + ISNULL(LAST_NAME,'') ELSE ")
                      .Append("ISNULL(FIRST_NAME,'') + ' ' + ISNULL(MIDDLE_NAME,'') + ' ' + ISNULL(LAST_NAME,'') + ' (' + USER_ID + ') ' END AS RECIEPENTNAME ,")
                      .Append("EMPLOYEE_ID, PHONE_NO, ADDRESS_1, ADDRESS_2, ADDRESS_3, ADDRESS_4, LOCATION , BADGE_ID, SSN_NO  FROM  RM_USER_LOCATIONS WHERE ID='").Append(badgeId).Append("'");



                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var Columns = new[] { "RECIEPENTNAME", "EMPLOYEE_ID", "PHONE_NO", "ADDRESS_1", "ADDRESS_2", "ADDRESS_3", "ADDRESS_4", "LOCATION", "BADGE_ID", "SSN_NO" };
                    lstBadgeDetails = objContext.Database.DifferedExecuteQuery<RM_USER_LOCATIONS>(Columns, sbSql.ToString()).ToList();

                    return lstBadgeDetails;
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


        public string GetSignature(string sigID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT SIGNATURE FROM MT_DELV_RECV_SIGNATURE WHERE SIGNATURE_ID='").Append(sigID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var signature = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + signature.ToString()); }

                    return signature;
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

        public string GetDeliveryTripUpdateDate(int transactionID, string updateDt)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT MAX(UPDATE_DATE) UPDATE_DATE  FROM MT_DELV_ITEM_TRIP_MISC_EVENT  WHERE TRANSACTION_ID=" + transactionID + "    AND UPDATE_DATE <='" + updateDt + "' and EVENT_ID=1");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var UpdateDate = objContext.Database.SqlQuery<DateTime?>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned value " + UpdateDate.ToString()); }

                    return UpdateDate.ToString();
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

        public List<MT_DELV_DLVR_ATTEMPT> GetDeliveryAttempts(int transactionID)
        {
            List<MT_DELV_DLVR_ATTEMPT> lstdlvrAttempts = new List<MT_DELV_DLVR_ATTEMPT>();

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT TRANSACTION_ID,ATTEMPT_DATE,COMMENT ")
                      .Append(" FROM  MT_DELV_DLVR_ATTEMPT WHERE TRANSACTION_ID=").Append(transactionID);



                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    lstdlvrAttempts = objContext.Database.SqlQuery<MT_DELV_DLVR_ATTEMPT>(sbSql.ToString()).ToList();

                    return lstdlvrAttempts;
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
