using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using log4net;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using AtPar.ViewModel;
using System.Data.Entity.Infrastructure;

namespace AtPar.CartCount.Repos
{
    public class ScheduleComplianceReportRepository : IScheduleComplianceReportRepository
    {
        private ILog _log;

        public ScheduleComplianceReportRepository(ILog log)
        {
            _log = log;
        }

        public Tuple<DataSet,long> GetCartSchedComplianceRep(string SvrUser, string userID, DateTime dt, string orgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int gAppId = 2;
            var sbSql = new StringBuilder();
            int intRecCnt = 0;
            DayOfWeek Weekday = dt.DayOfWeek;
            int selectedDay = 0;
            DataSet dsCompRep = new DataSet();
            if (!userID.Contains("'"))
            {
                userID = "'"+userID+"'";
            }
            if (Weekday == DayOfWeek.Sunday)
            {
                selectedDay = 7;
            }
            else
            {
                selectedDay = Convert.ToInt32(Weekday);
            }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append(" SELECT COUNT(SERVER_USER) FROM MT_ATPAR_USER_GROUPS,MT_ATPAR_USER B WHERE APP_ID= ").Append( gAppId ).Append( " AND SERVER_USER ='").Append( SvrUser ).Append( "'");

                    try
                    {
                        if (_log.IsInfoEnabled)
                        {
                            _log.Info(sbSql);
                        }
                        intRecCnt = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute SQL... " + sbSql.ToString() + Environment.NewLine + "Exception is : " + ex.ToString() + Environment.NewLine);
                        }
                        return new Tuple<DataSet, long>(dsCompRep, Convert.ToInt32(StatusXMLBuild(AtparStatusCodes.E_SERVERERROR)));
                    }
                    sbSql = null;
                    sbSql = new StringBuilder();
                    if (intRecCnt > 0)
                    {
                        sbSql.Append(" SELECT DISTINCT A.FIRST_NAME, A.LAST_NAME, A.USER_ID, A.MIDDLE_INITIAL FROM MT_ATPAR_USER A  " + " INNER JOIN MT_ATPAR_USER_GROUPS C ON A.USER_ID = C.CLIENT_USER WHERE C.APP_ID = ").Append( gAppId ).Append( " AND C.SERVER_USER = '" ).Append( SvrUser ).Append( "' ");
                    }
                    else
                    {
                        sbSql.Append(" SELECT DISTINCT A.FIRST_NAME, A.LAST_NAME, A.USER_ID, A.MIDDLE_INITIAL FROM MT_ATPAR_USER A INNER JOIN MT_ATPAR_USER_ORG_GROUPS C ON   A.USER_ID = C.USER_ID WHERE  1=1 ");

                    }

                    sbSql.Append(" AND  A.USER_ID IN (" ).Append( userID).Append(")");

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(sbSql);
                    }
                    var fields = new[] { "FIRST_NAME", "MIDDLE_INITIAL", "USER_ID", "LAST_NAME" };
                    var list = objContext.Database.DifferedExecuteQuery<MT_ATPAR_USER>(fields, sbSql.ToString()).ToList();
                    var listDt = list.ToDataTable();
                    dsCompRep = new DataSet();
                    sbSql = null;
                    sbSql = new StringBuilder();
                    sbSql.Append(" SELECT A.BUSINESS_UNIT, ");
                    sbSql.Append(" CASE WHEN B.DESCR IS NULL THEN A.CART_ID ELSE A.CART_ID + ' - ' + B.DESCR END AS CART_ID, ");
                    sbSql.Append(" A.USER_ID,C.REPORT_DATA_8 AS COUNT_BEFORE, C.END_DT_TIME " + " FROM MT_CRCT_USER_SCHEDULE A INNER JOIN MT_CRCT_USER_ALLOCATION B ON A.BUSINESS_UNIT = B.BUSINESS_UNIT AND A.CART_ID = B.CART_ID " + " AND A.USER_ID = B.USER_ID AND A.DAY = " ).Append( selectedDay ).Append( " ");

                    sbSql.Append(" LEFT OUTER JOIN MT_ATPAR_TRANSACTION C ON A.BUSINESS_UNIT = C.BUSINESS_UNIT AND A.CART_ID = C.ID AND A.USER_ID = C.USER_ID AND C.APP_ID = ").Append( gAppId ).Append( " AND CONVERT(CHAR(10),C.END_DT_TIME, 101) = '" ).Append( dt.ToString("MM/dd/yyyy") + "'");

                    sbSql.Append(" WHERE A.USER_ID IN (" + userID + ")");

                    if (orgGrpID != "All")
                    {
                        sbSql.Append(" AND B.BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID='").Append( orgGrpID + "') ");
                    }

                    sbSql.Append(" UNION ");

                    sbSql.Append(" SELECT A.BUSINESS_UNIT, ");
                    sbSql.Append(" CASE WHEN B.DESCR IS NULL THEN A.ID ELSE A.ID + ' - ' + B.DESCR END AS CART_ID, ");
                    sbSql.Append("A.USER_ID, A.REPORT_DATA_8 AS COUNT_BEFORE, A.END_DT_TIME FROM MT_ATPAR_TRANSACTION A LEFT OUTER JOIN MT_CRCT_USER_ALLOCATION B ON A.BUSINESS_UNIT = B.BUSINESS_UNIT AND A.ID = B.CART_ID ");
                    sbSql.Append(" WHERE A.APP_ID = ").Append( gAppId ).Append( " AND CONVERT(CHAR(10),A.END_DT_TIME, 101) = '").Append( dt.ToString("MM/dd/yyyy") ).Append( "'");
                    sbSql.Append(" AND (A.USER_ID IN (").Append( userID ).Append( ") OR A.REPORT_DATA_4 IN (" ).Append( userID ).Append( ")) AND A.REPORT_DATA_3 IN (1,2) ");

                    if (orgGrpID != "All")
                    {
                        sbSql.Append(" AND B.BUSINESS_UNIT IN (SELECT DISTINCT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID='" ).Append( orgGrpID ).Append( "') ");
                    }

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(sbSql);
                    }

                    try
                    {
                        //var fields = new[] { "FIRST_NAME", "MIDDLE_INITIAL", "USER_ID", "LAST_NAME" };
                        var lstCompRep = objContext.Database.SqlQuery<VM_USER_CART_ALLOCATION>( sbSql.ToString()).ToList();
                       var list1Dt= lstCompRep.ToDataTable();
                        //dsCompRep = lstCompRep.ToDataSet();
                        dsCompRep.Tables.Add(listDt);
                        dsCompRep.Tables.Add(list1Dt);
                    }
                    catch (SqlException ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute SQL... " + sbSql.ToString() + Environment.NewLine + "Exception is : " + ex.ToString() + Environment.NewLine);
                        }
                        return new Tuple<DataSet, long>(dsCompRep, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                    }

                    dsCompRep.Tables[0].TableName = "UsersList";
                    dsCompRep.Tables[1].TableName = "Records";

                    if (dsCompRep.Tables["Records"].Rows.Count == 0)
                    {
                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug("E_NORECORDFOUND");
                        }
                        return new Tuple<DataSet, long>(dsCompRep, AtparStatusCodes.E_NORECORDFOUND);
                    }

                    DataColumn _dcTimeDiff = new DataColumn("TIME_DIFFERENCE", Type.GetType("System.Int32"));
                    DataColumn _dcActualCT = new DataColumn("ACTUAL_COUNT_TIME", Type.GetType("System.String"));
                    DataColumn _dcStatus = new DataColumn("STATUS", Type.GetType("System.Int32"));

                    dsCompRep.Tables["Records"].Columns.Add(_dcTimeDiff);
                    dsCompRep.Tables["Records"].Columns.Add(_dcActualCT);
                    dsCompRep.Tables["Records"].Columns.Add(_dcStatus);

                    string strHour = null;

                    foreach (DataRow row in dsCompRep.Tables["Records"].Rows)
                    {
                        if (!(Convert.IsDBNull(row["END_DT_TIME"])))
                        {
                            row["ACTUAL_COUNT_TIME"] = Convert.ToString(row["END_DT_TIME"]).Substring(Convert.ToString(row["END_DT_TIME"]).IndexOf(" ", StringComparison.OrdinalIgnoreCase) + 1);
                            strHour = row["ACTUAL_COUNT_TIME"].ToString().Split(':')[0];
                            row["ACTUAL_COUNT_TIME"] = strHour + ":" + row["ACTUAL_COUNT_TIME"].ToString().Split(':')[1] + " " + row["ACTUAL_COUNT_TIME"].ToString().Split(' ')[1];

                            if (!(Convert.IsDBNull(row["COUNT_BEFORE"])))
                            {
                                if (Convert.ToString(row["COUNT_BEFORE"]) != "" && IsDate(row["COUNT_BEFORE"]))
                                {
                                    row["TIME_DIFFERENCE"] = DateDiff(DateInterval.Minute, Convert.ToDateTime(row["COUNT_BEFORE"]), Convert.ToDateTime(row["ACTUAL_COUNT_TIME"]));
                                    if (Convert.ToInt32(row["TIME_DIFFERENCE"]) <= 0)
                                    {
                                        row["STATUS"] = AtParWebEnums.ScheduleType.COUNTEDINTIME;
                                    }
                                    else
                                    {
                                        row["STATUS"] = AtParWebEnums.ScheduleType.COUNTEDNOTINTIME;
                                    }
                                }
                                else
                                {
                                    row["STATUS"] = AtParWebEnums.ScheduleType.COUNTEDINTIME;
                                }
                            }
                            else
                            {
                                row["STATUS"] = AtParWebEnums.ScheduleType.COUNTEDINTIME;
                            }
                        }
                        else
                        {
                            row["STATUS"] = AtParWebEnums.ScheduleType.NOTCOUNTED;
                        }

                        if (!(Convert.IsDBNull(row["TIME_DIFFERENCE"])))
                        {
                            if (Convert.ToInt32(row["TIME_DIFFERENCE"]) < 0)
                            {
                                row["TIME_DIFFERENCE"] = -Convert.ToInt32((row["TIME_DIFFERENCE"]));
                            }
                        }
                    }
                    DataColumn parent = dsCompRep.Tables["UsersList"].Columns["USER_ID"];
                    DataColumn child = dsCompRep.Tables["Records"].Columns["USER_ID"];
                    DataRelation UserCartRelation = new DataRelation("UserCartRelation", parent, child, false);
                    dsCompRep.Relations.Add(UserCartRelation);
                    return new Tuple<DataSet, long>(dsCompRep, AtparStatusCodes.ATPAR_OK);
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

        public Tuple<DataSet, long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet dsUserList = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        SqlParameter[] sqlParms = new SqlParameter[3];

                        sqlParms[0] = new SqlParameter("@OrgGrp_ID", SqlDbType.NVarChar);
                        sqlParms[0].Value = orgGrpID;


                        sqlParms[1] = new SqlParameter("@app_ID", SqlDbType.NVarChar);
                        sqlParms[1].Value = appID;

                        sqlParms[2] = new SqlParameter("@userID", SqlDbType.NVarChar);
                        sqlParms[2].Value = userID;


                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.AddRange(sqlParms);
                        command.CommandText = "GetHeirarchyUsersList";
                        command.CommandType = CommandType.StoredProcedure;

                        using (var reader = command.ExecuteReader())
                        {
                            var List1 =
                                ((IObjectContextAdapter)objContext)
                                    .ObjectContext
                                    .Translate<VM_STOCKISSUE_USERDETAILS>(reader)
                                    .ToList();

                            dsUserList = List1.ToDataSet();

                        }
                    }
                }
                return new Tuple<DataSet, long>(dsUserList, AtparStatusCodes.ATPAR_OK);
            }
            catch (SqlException sqlex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + "\r\n" + (sqlex));
                }
                return new Tuple<DataSet, long>(dsUserList, AtparStatusCodes.E_SERVERERROR);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ex.ToString());
                }
                return new Tuple<DataSet, long>(dsUserList, AtparStatusCodes.E_SERVERERROR);
            }
        }

        private string StatusXMLBuild(long pStatusCode)
        {
            string strValue = string.Empty;
            strValue = "<ROOT><STATUS_CODE>" + pStatusCode + "</STATUS_CODE></ROOT>";
            return strValue;
        }

        public static bool IsDate(object expression)
        {
            if (expression == null)
                return false;
            DateTime testDate;
            return DateTime.TryParse(expression.ToString(), out testDate);
        }

        public enum DateInterval
        {
            Day,
            DayOfYear,
            Hour,
            Minute,
            Month,
            Quarter,
            Second,
            Weekday,
            WeekOfYear,
            Year
        }

        public static long DateDiff(DateInterval intervalType, DateTime dateOne, DateTime dateTwo)
        {
            switch (intervalType)
            {
                case DateInterval.Day:
                case DateInterval.DayOfYear:
                    TimeSpan spanForDays = dateTwo - dateOne;
                    return (long)spanForDays.TotalDays;
                case DateInterval.Hour:
                    TimeSpan spanForHours = dateTwo - dateOne;
                    return (long)spanForHours.TotalHours;
                case DateInterval.Minute:
                    TimeSpan spanForMinutes = dateTwo - dateOne;
                    return (long)spanForMinutes.TotalMinutes;
                case DateInterval.Month:
                    return ((dateTwo.Year - dateOne.Year) * 12) + (dateTwo.Month - dateOne.Month);
                case DateInterval.Quarter:
                    long dateOneQuarter = (long)Math.Ceiling(dateOne.Month / 3.0);
                    long dateTwoQuarter = (long)Math.Ceiling(dateTwo.Month / 3.0);
                    return (4 * (dateTwo.Year - dateOne.Year)) + dateTwoQuarter - dateOneQuarter;
                case DateInterval.Second:
                    TimeSpan spanForSeconds = dateTwo - dateOne;
                    return (long)spanForSeconds.TotalSeconds;
                case DateInterval.Weekday:
                    TimeSpan spanForWeekdays = dateTwo - dateOne;
                    return (long)(spanForWeekdays.TotalDays / 7.0);
                case DateInterval.WeekOfYear:
                    DateTime dateOneModified = dateOne;
                    DateTime dateTwoModified = dateTwo;
                    while (dateTwoModified.DayOfWeek != DateTimeFormatInfo.CurrentInfo.FirstDayOfWeek)
                    {
                        dateTwoModified = dateTwoModified.AddDays(-1);
                    }
                    while (dateOneModified.DayOfWeek != DateTimeFormatInfo.CurrentInfo.FirstDayOfWeek)
                    {
                        dateOneModified = dateOneModified.AddDays(-1);
                    }
                    TimeSpan spanForWeekOfYear = dateTwoModified - dateOneModified;
                    return (long)(spanForWeekOfYear.TotalDays / 7.0);
                case DateInterval.Year:
                    return dateTwo.Year - dateOne.Year;
                default:
                    return 0;
            }
        }

        public class VM_USER_CART_ALLOCATION
        {
            public string BUSINESS_UNIT { get; set; }
            public string CART_ID { get; set; }
            public string USER_ID { get; set; }
            public string COUNT_BEFORE { get; set; }
            public DateTime? END_DT_TIME { get; set; }
        }
    }



    //public static class DateHelper
    //{
    //    public static bool IsDate(object expression)
    //    {
    //        if (expression == null)
    //            return false;
    //        DateTime testDate;
    //        return DateTime.TryParse(expression.ToString(), out testDate);
    //    }

    //    public enum DateInterval
    //    {
    //        Day,
    //        DayOfYear,
    //        Hour,
    //        Minute,
    //        Month,
    //        Quarter,
    //        Second,
    //        Weekday,
    //        WeekOfYear,
    //        Year
    //    }

    //    public static long DateDiff(DateInterval intervalType, DateTime dateOne, DateTime dateTwo)
    //    {
    //        switch (intervalType)
    //        {
    //            case DateInterval.Day:
    //            case DateInterval.DayOfYear:
    //                TimeSpan spanForDays = dateTwo - dateOne;
    //                return (long)spanForDays.TotalDays;
    //            case DateInterval.Hour:
    //                TimeSpan spanForHours = dateTwo - dateOne;
    //                return (long)spanForHours.TotalHours;
    //            case DateInterval.Minute:
    //                TimeSpan spanForMinutes = dateTwo - dateOne;
    //                return (long)spanForMinutes.TotalMinutes;
    //            case DateInterval.Month:
    //                return ((dateTwo.Year - dateOne.Year) * 12) + (dateTwo.Month - dateOne.Month);
    //            case DateInterval.Quarter:
    //                long dateOneQuarter = (long)Math.Ceiling(dateOne.Month / 3.0);
    //                long dateTwoQuarter = (long)Math.Ceiling(dateTwo.Month / 3.0);
    //                return (4 * (dateTwo.Year - dateOne.Year)) + dateTwoQuarter - dateOneQuarter;
    //            case DateInterval.Second:
    //                TimeSpan spanForSeconds = dateTwo - dateOne;
    //                return (long)spanForSeconds.TotalSeconds;
    //            case DateInterval.Weekday:
    //                TimeSpan spanForWeekdays = dateTwo - dateOne;
    //                return (long)(spanForWeekdays.TotalDays / 7.0);
    //            case DateInterval.WeekOfYear:
    //                DateTime dateOneModified = dateOne;
    //                DateTime dateTwoModified = dateTwo;
    //                while (dateTwoModified.DayOfWeek != DateTimeFormatInfo.CurrentInfo.FirstDayOfWeek)
    //                {
    //                    dateTwoModified = dateTwoModified.AddDays(-1);
    //                }
    //                while (dateOneModified.DayOfWeek != DateTimeFormatInfo.CurrentInfo.FirstDayOfWeek)
    //                {
    //                    dateOneModified = dateOneModified.AddDays(-1);
    //                }
    //                TimeSpan spanForWeekOfYear = dateTwoModified - dateOneModified;
    //                return (long)(spanForWeekOfYear.TotalDays / 7.0);
    //            case DateInterval.Year:
    //                return dateTwo.Year - dateOne.Year;
    //            default:
    //                return 0;
    //        }
    //    }
    //}
}

