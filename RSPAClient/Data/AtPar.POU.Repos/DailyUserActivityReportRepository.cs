using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Repos
{
    public class DailyUserActivityReportRepository : IDailyUserActivityReportRepository
    {
        private ILog _log;
        public DailyUserActivityReportRepository(ILog log)
        {
            _log = log;
        }

        public long GetDailyUserActivityRep(string userID, string transType, string date, int appID, ref DataSet returnDS, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long tempGetDailyUserActivityRep = 0;

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sbSql.Append("SELECT BUSINESS_UNIT, REPORT_DATA_2 LOCATION, CONVERT(char(8), START_DT_TIME, 108) START_TIME,CONVERT(char(8), END_DT_TIME, 108) END_TIME, CONVERT(char(8), DATEADD(second, DATEDIFF(SS,START_DT_TIME,END_DT_TIME), '0:00:00'), 108) TOTAL_TIME, TOTAL_REC_SENT, SCANS_COUNT, DEVICE_ID,STATUS FROM MT_ATPAR_TRANSACTION WHERE (USER_ID = '").Append(userID).Append("' OR DOWNLOAD_USERID = '").Append(userID).Append("') AND CONVERT(NVARCHAR(10),UPDATE_DT_TIME,101) = CONVERT(NVARCHAR(10),'").Append(date).Append("',101) ");

                    if (transType == "0")
                    {
                        sbSql.Append("AND STATUS IN (").Append((int)AtParWebEnums.AppTransactionStatus.Issued + ", ").Append((int)AtParWebEnums.AppTransactionStatus.Returned + ") ");
                    }
                    else if (transType == "1")
                    {
                        sbSql.Append("AND STATUS IN (").Append((int)AtParWebEnums.AppTransactionStatus.CycleCount + ", ").Append((int)AtParWebEnums.AppTransactionStatus.PutAway + ") ");
                    }
                    else if (transType == "2")
                    {
                        sbSql.Append("AND STATUS = ").Append((int)AtParWebEnums.AppTransactionStatus.CasePick + " ");
                        sbSql.Append(" UNION SELECT BUSINESS_UNIT, REPORT_DATA_2 LOCATION, CONVERT(char(8), START_DT_TIME, 108) START_TIME, CONVERT(char(8), END_DT_TIME, 108) END_TIME, " + "CONVERT(char(8), DATEADD(second, DATEDIFF(SS,START_DT_TIME,END_DT_TIME), '0:00:00'), 108) TOTAL_TIME, TOTAL_REC_SENT, SCANS_COUNT, DEVICE_ID," + "STATUS FROM MT_ATPAR_TRANSACTION WHERE (USER_ID = '").Append(userID).Append("' OR DOWNLOAD_USERID = '").Append(userID).Append("') AND ").Append("CONVERT(NVARCHAR(10),UPDATE_DT_TIME,101) = CONVERT(NVARCHAR(10),'").Append(date).Append("',101) ");
                        sbSql.Append("AND STATUS IN (").Append((int)AtParWebEnums.CASE_PICK_STATUS.CLOSED).Append(", ").Append((int)AtParWebEnums.CASE_PICK_STATUS.REMOVE).Append(" , ").Append((int)AtParWebEnums.CASE_PICK_STATUS.REVIEWED).Append(" , ").Append((int)AtParWebEnums.CASE_PICK_STATUS.RETURNED).Append(") AND REPORT_DATA_1 = ").Append((int)AtParWebEnums.AppTransactionStatus.CaseReturn);
                    }
                    sbSql.Append(" AND APP_ID=" + appID);

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + " Getting the Daily User Activity Report " + " with following SQL... " + sbSql.ToString() + Environment.NewLine);
                    }
                    try
                    {                       
                        var lstReturn = objContext.Database.SqlQuery<VM_TRANSACTION>(sbSql.ToString()).ToList();
                        returnDS = lstReturn.ToDataSet();

                        returnDS.Tables[0].TableName = "DETAILS";
                     
                    }
                    catch (SqlException sqlEx)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following SQL...." + sbSql.ToString() + Environment.NewLine + " Exception is : " + sqlEx.ToString() + Environment.NewLine);
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following SQL...." + sbSql.ToString() + Environment.NewLine + " Exception is : " + ex.ToString() + Environment.NewLine);
                        }
                        return AtparStatusCodes.E_SERVERERROR;
                    }

                    tempGetDailyUserActivityRep = AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to get the Daily User Activity Report " + " : Exception is : " + ex.ToString() + Environment.NewLine);
                }
                return AtparStatusCodes.E_SERVERERROR;
            }

            return tempGetDailyUserActivityRep;
        }

        public class VM_TRANSACTION
        {
            public string BUSINESS_UNIT { get; set; }
            public string LOCATION { get; set; }
            public string START_TIME { get; set; }
            public string END_TIME { get; set; }
            public string TOTAL_TIME { get; set; }
            public short? TOTAL_REC_SENT { get; set; }
            public short? SCANS_COUNT { get; set; }
            public string DEVICE_ID { get; set; }
            public short? STATUS { get; set; }
        }
       

    }
}
