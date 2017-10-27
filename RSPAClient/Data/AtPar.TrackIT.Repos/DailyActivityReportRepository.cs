using AtPar.Common;
using AtPar.Data;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;
using AtPar.Repository.Interfaces.TrackIT;
using System.Data.SqlClient;

namespace AtPar.TrackIT.Repos
{
    public class DailyActivityReportRepository: IDailyActivityreportRepository
    {
        private ILog _log;
        public DailyActivityReportRepository(ILog log)
        {
            _log = log;
        }
        public Tuple<long,DataSet> GetTKITDailyUserActivityRep(string pToDate, string[] pDeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            StringBuilder _sbTKITReportSQL = new StringBuilder();
            DataSet TkitDailyAcrRepDS = null;
            DataSet TkitDailyAcyDataDS = null;
            Tuple<long, DataSet> tupl = null;
            int _Servercount;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (_sbSQL.Length > 0)
                    {
                        _sbSQL.Remove(0, _sbSQL.Length);
                    }
                    _sbSQL.Append("SELECT COUNT(SERVER_USER) FROM MT_ATPAR_USER_GROUPS,MT_ATPAR_USER B WHERE APP_ID= " + (int)AtParWebEnums.EnumApps.TrackIT + "  AND SERVER_USER ='" + pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");
                    _Servercount = objContext.Database.SqlQuery<int>(_sbSQL.ToString()).FirstOrDefault();
                    if (_log.IsInfoEnabled) { _log.Info(methodBaseName + "ServerCount:" + _Servercount); }
                    _sbSQL.Remove(0, _sbSQL.Length);
                    if (_Servercount > 0)
                    {
                        _sbSQL.Append("SELECT COUNT(*) AS NO_ITEMS_DELIVERED,COUNT(DISTINCT(REPORT_DATA_5)) AS NO_LOCATIONS_DELIVERED, ");
                        _sbSQL.Append("FIRST_NAME+' '+MIDDLE_INITIAL+' '+LAST_NAME+'('+CLIENT_USER+')' AS USERNAME, CLIENT_USER AS UID ");
                        _sbSQL.Append("FROM MT_ATPAR_DETAIL_TRANSACTION A, MT_ATPAR_USER_GROUPS B,MT_DELV_ITEM_TRIP C, ");
                        _sbSQL.Append("MT_ATPAR_USER D WHERE A.USER_ID = D.USER_ID AND A.APP_ID = B.APP_ID AND SERVER_USER = '" + pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "' AND A.APP_ID = " + (int)AtParWebEnums.EnumApps.TrackIT + " AND STATUS IN (" + (int)AtParWebEnums.EventStatus_Enum.Deliver + "," + (int)AtParWebEnums.EventStatus_Enum.Take + "," + (int)AtParWebEnums.EventStatus_Enum.Returns + ")");
                        _sbSQL.Append("AND A.TRANSACTION_ID = C.TRANSACTION_ID AND A.STATUS = C.EVENT_ID AND A.USER_ID = C.USER_ID ");
                        _sbSQL.Append("AND (A.DOWNLOAD_USER_ID = B.CLIENT_USER OR A.USER_ID = B.CLIENT_USER) ");
                        _sbSQL.Append("AND C.UPDATE_DATE >= CONVERT(DATETIME, '" + pToDate + "', 101) ");
                        _sbSQL.Append("AND C.UPDATE_DATE < DATEADD(day, 1, CONVERT(DATETIME, '" + pToDate + "', 101)) ");

                        if (pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() != "ALL")
                        {
                            _sbSQL.Append(" AND B.ORG_GROUP_ID IN(SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ");
                            _sbSQL.Append(" BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                            _sbSQL.Append(" WHERE ORG_GROUP_ID = '" + pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() + " '))");
                        }
                        _sbSQL.Append(" GROUP BY CLIENT_USER,FIRST_NAME,MIDDLE_INITIAL,LAST_NAME ORDER BY CLIENT_USER");

                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + "Getting the data from the following SQL" + _sbSQL.ToString()); }

                        var fields = new[] { "NO_ITEMS_DELIVERED", "NO_LOCATIONS_DELIVERED", "USERNAME", "UID" };

                        var lstDailyAcrRep = objContext.Database.DifferedExecuteQuery<VM_TKIT_DAILYACTIVITY_DETAILS>(fields, _sbSQL.ToString()).ToList();
                        TkitDailyAcrRepDS = lstDailyAcrRep.ToDataSet();

                        if (TkitDailyAcrRepDS.Tables[0].Rows.Count > 0)
                        {
                            //TkitDailyAcrRepDS.Tables[0].Columns.Add("AVG_DELIVER_TIME");
                            for (int i = 0; i <= TkitDailyAcrRepDS.Tables[0].Rows.Count - 1; i++)
                            {
                                _sbTKITReportSQL.Append("SELECT (SUM(DATEDIFF(MI,A.UPDATE_DATE,B.UPDATE_DATE))/count(*)) AS AVG_DELIVER_TIME ");
                                _sbTKITReportSQL.Append("FROM MT_DELV_ITEM_TRIP A,MT_DELV_ITEM_TRIP B,MT_ATPAR_DETAIL_TRANSACTION C,MT_ATPAR_USER_GROUPS D ");
                                _sbTKITReportSQL.Append("WHERE A.TRANSACTION_ID = B.TRANSACTION_ID AND  A.EVENT_ID=" + (int)AtParWebEnums.EventStatus_Enum.Pick + " AND B.EVENT_ID=" + (int)AtParWebEnums.EventStatus_Enum.Deliver + " ");
                                _sbTKITReportSQL.Append("AND A.USER_ID =D.CLIENT_USER AND A.USER_ID =C.USER_ID AND A.USER_ID =D.CLIENT_USER ");
                                _sbTKITReportSQL.Append("AND A.TRANSACTION_ID = C.TRANSACTION_ID ");
                                _sbTKITReportSQL.Append("AND C.UPDATE_DATE >= CONVERT(DATETIME, '" + pToDate + "', 101) ");
                                _sbTKITReportSQL.Append("AND C.UPDATE_DATE < DATEADD(day, 1, CONVERT(DATETIME, '" + pToDate + "', 101)) ");
                                _sbTKITReportSQL.Append("GROUP BY A.USER_ID ");

                                if (_log.IsInfoEnabled) { _log.Info(methodBaseName + "Getting the data from the following SQL" + _sbTKITReportSQL.ToString()); }

                                fields = new[] { "AVG_DELIVER_TIME" };

                                var lstDailyActData = objContext.Database.DifferedExecuteQuery<VM_TKIT_DAILYACTIVITY_DETAILS>(fields, _sbTKITReportSQL.ToString()).ToList();
                                TkitDailyAcyDataDS = lstDailyActData.ToDataSet();

                                if (TkitDailyAcyDataDS.Tables[0].Rows.Count > 0)
                                {
                                    TkitDailyAcrRepDS.Tables[0].Rows[i]["AVG_DELIVER_TIME"] = TkitDailyAcyDataDS.Tables[0].Rows[0]["AVG_DELIVER_TIME"].ToString();
                                }
                                TkitDailyAcrRepDS.Tables[0].AcceptChanges();
                            }
                        }
                        else
                        {
                            if (_log.IsWarnEnabled)
                            { _log.Warn(methodBaseName + "No Data Found"); }
                            tupl = new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, null);
                            return tupl;
                        }

                    }
                    else
                    {
                        _sbSQL.Remove(0, _sbSQL.Length);
                        _sbSQL.Append("SELECT COUNT(*) AS NO_ITEMS_DELIVERED,COUNT(DISTINCT(REPORT_DATA_5)) AS NO_LOCATIONS_DELIVERED, ");
                        _sbSQL.Append("FIRST_NAME+' '+MIDDLE_INITIAL+' '+LAST_NAME+'('+B.USER_ID+')' AS USERNAME, B.USER_ID AS UID ");
                        _sbSQL.Append("FROM MT_ATPAR_DETAIL_TRANSACTION A, MT_ATPAR_USER_ORG_GROUPS B,MT_DELV_ITEM_TRIP C, ");
                        _sbSQL.Append("MT_ATPAR_USER D WHERE A.USER_ID = D.USER_ID AND B.USER_ID = D.USER_ID AND A.APP_ID = " + (int)AtParWebEnums.EnumApps.TrackIT + " AND STATUS IN (" + (int)AtParWebEnums.EventStatus_Enum.Deliver + "," + (int)AtParWebEnums.EventStatus_Enum.Take + "," + (int)AtParWebEnums.EventStatus_Enum.Returns + ")");
                        _sbSQL.Append("AND A.TRANSACTION_ID = C.TRANSACTION_ID AND A.STATUS = C.EVENT_ID AND A.USER_ID = C.USER_ID ");
                        _sbSQL.Append("AND (A.DOWNLOAD_USER_ID = B.USER_ID OR A.USER_ID = B.USER_ID) ");
                        _sbSQL.Append("AND C.UPDATE_DATE >= CONVERT(DATETIME, '" + pToDate + "', 101) ");
                        _sbSQL.Append("AND C.UPDATE_DATE < DATEADD(day, 1, CONVERT(DATETIME, '" + pToDate + "', 101)) ");

                        if (pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() != "ALL")
                        {
                            _sbSQL.Append(" AND B.ORG_GROUP_ID IN ( SELECT DISTINCT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ");
                            _sbSQL.Append(" BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS ");
                            _sbSQL.Append(" WHERE ORG_GROUP_ID = '" + pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() + " '))");
                        }
                        _sbSQL.Append(" GROUP BY B.USER_ID,FIRST_NAME,MIDDLE_INITIAL,LAST_NAME ORDER BY B.USER_ID");

                        var fields = new[] { "NO_ITEMS_DELIVERED","NO_LOCATIONS_DELIVERED","USERNAME","UID" };

                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + "Getting the data from the following SQL" + _sbSQL.ToString()); }

                        var lstDailyAcrRep = objContext.Database.DifferedExecuteQuery<VM_TKIT_DAILYACTIVITY_DETAILS>(fields,_sbSQL.ToString()).ToList();
                        TkitDailyAcrRepDS = lstDailyAcrRep.ToDataSet();
                        if (TkitDailyAcrRepDS.Tables[0].Rows.Count > 0)
                        {
                            //TkitDailyAcrRepDS.Tables[0].Columns.Add("AVG_DELIVER_TIME");
                            for (int i = 0; i <= TkitDailyAcrRepDS.Tables[0].Rows.Count - 1; i++)
                            {
                                _sbTKITReportSQL.Remove(0, _sbTKITReportSQL.Length);
                                _sbTKITReportSQL.Append("SELECT (SUM(DATEDIFF(MI,A.UPDATE_DATE,B.UPDATE_DATE))/count(*)) AS AVG_DELIVER_TIME ");
                                _sbTKITReportSQL.Append("FROM MT_DELV_ITEM_TRIP A,MT_DELV_ITEM_TRIP B,MT_ATPAR_DETAIL_TRANSACTION C,MT_ATPAR_USER_ORG_GROUPS D ");
                                _sbTKITReportSQL.Append("WHERE A.TRANSACTION_ID = B.TRANSACTION_ID AND  A.EVENT_ID=" + (int)AtParWebEnums.EventStatus_Enum.Pick + " AND B.EVENT_ID=" + (int)AtParWebEnums.EventStatus_Enum.Deliver + " ");
                                _sbTKITReportSQL.Append("AND A.USER_ID =D.USER_ID AND A.USER_ID =C.USER_ID AND A.USER_ID =D.USER_ID ");
                                _sbTKITReportSQL.Append("AND A.TRANSACTION_ID = C.TRANSACTION_ID ");
                                _sbTKITReportSQL.Append("AND C.UPDATE_DATE >= CONVERT(DATETIME, '" + pToDate + "', 101) ");
                                _sbTKITReportSQL.Append("AND C.UPDATE_DATE < DATEADD(day, 1, CONVERT(DATETIME, '" + pToDate + "', 101)) ");
                                _sbTKITReportSQL.Append("GROUP BY A.USER_ID ");

                                fields = new[] { "AVG_DELIVER_TIME" };
                                if (_log.IsInfoEnabled) { _log.Info(methodBaseName + "Getting the data from the following SQL" + _sbTKITReportSQL.ToString()); }

                                var lstDailyActData = objContext.Database.DifferedExecuteQuery<VM_TKIT_DAILYACTIVITY_DETAILS>(fields,_sbTKITReportSQL.ToString()).ToList();
                                TkitDailyAcyDataDS = lstDailyActData.ToDataSet();

                                if (TkitDailyAcyDataDS.Tables[0].Rows.Count > 0)
                                {
                                    TkitDailyAcrRepDS.Tables[0].Rows[i]["AVG_DELIVER_TIME"] = TkitDailyAcyDataDS.Tables[0].Rows[0]["AVG_DELIVER_TIME"].ToString();
                                }
                                TkitDailyAcrRepDS.Tables[0].AcceptChanges();
                            }
                        }
                        else
                        {
                            if (_log.IsWarnEnabled)
                            { _log.Warn(methodBaseName + "No Data Found"); }
                            tupl = new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, null);
                            return tupl;
                        }
                    }

                }
            }
            catch (SqlException sqlEx)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get data : " + "Exception is : " + sqlEx.ToString());

                tupl = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                return tupl;
               
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to get TKIT Daily Activity Report : " + "Exception is : " + ex.ToString());

                tupl = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupl;
                
            }
            finally
            {
                _sbSQL = null;
            }

            tupl = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, TkitDailyAcrRepDS);
            return tupl;            
        }
    }
}
