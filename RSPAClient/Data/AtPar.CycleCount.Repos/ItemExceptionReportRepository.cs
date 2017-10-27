using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.CycleCount;
using log4net;
using System;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;

namespace AtPar.CycleCount.Repos
{
    public class ItemExceptionReportRepository : IItemExceptionReportRepository
    {
        private ILog _log;
        public ItemExceptionReportRepository(ILog log)
        {
            _log = log;
        }

        public long GetCycleExceptionReport(string bUnit, string eventID,
            string itemID, string fromDate, string toDate, string orgGrpId, ref DataSet dsExpRep)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SqlParameter[] sqlParms = new SqlParameter[8];
            string _strSQL = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        sqlParms[0] = new SqlParameter("@Fromdate", SqlDbType.NVarChar);
                        sqlParms[0].Value = fromDate;

                        sqlParms[1] = new SqlParameter("@ToDate", SqlDbType.NVarChar);
                        sqlParms[1].Value = toDate;

                        sqlParms[2] = new SqlParameter("@eventID", SqlDbType.NVarChar);
                        sqlParms[2].Value = eventID;

                        sqlParms[3] = new SqlParameter("@ItemID", SqlDbType.NVarChar);
                        sqlParms[3].Value = itemID;

                        sqlParms[4] = new SqlParameter("@app_ID", SqlDbType.NVarChar);
                        sqlParms[4].Value = Convert.ToString((int)AtParWebEnums.EnumApps.CycleCount);


                        sqlParms[5] = new SqlParameter("@bunit", SqlDbType.NVarChar);
                        sqlParms[5].Value = bUnit;

                        sqlParms[6] = new SqlParameter("@OrgID", SqlDbType.NVarChar);
                        sqlParms[6].Value = orgGrpId;

                        sqlParms[7] = new SqlParameter("@StatusCode", SqlDbType.Int);
                        sqlParms[7].Value = ParameterDirection.Output;

                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.AddRange(sqlParms);
                        command.CommandText = "GetCycleExceptionReportData";
                        command.CommandType = CommandType.StoredProcedure;

                        _strSQL = "exec GetCycleExceptionReportData '" + sqlParms[0].Value.ToString() + "', " + "'" + sqlParms[1].Value.ToString() + 
                            "', " + "'" + sqlParms[2].Value.ToString() + "', " + "'" + sqlParms[3].Value.ToString() + "'" + "', " + "'" +
                            sqlParms[4].Value.ToString() + "', " + "'" + sqlParms[5].Value.ToString() + "', " + "'" + sqlParms[6].Value.ToString()
                            + "'" + "', " + "'" + sqlParms[7].Value.ToString() + "'"; 

                        using (var reader = command.ExecuteReader())
                        {
                            var List1 =
                                ((IObjectContextAdapter)objContext)
                                    .ObjectContext
                                    .Translate<VM_GETCYCLEEXCEPTIONREPORTDATA1>(reader)
                                    .ToList();

                            var dt = List1.ToDataTable();

                            reader.NextResult();

                            var List2 =
                               ((IObjectContextAdapter)objContext)
                                   .ObjectContext
                                   .Translate<VM_GETCYCLEEXCEPTIONREPORTDATA2>(reader)
                                   .ToList();

                            var dt1 = List2.ToDataTable();

                            dsExpRep.Tables.Add(dt);
                            dsExpRep.Tables.Add(dt1);
                        }
                    }
                }
            }
            catch (SqlException sqlex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + "\r\n" + (sqlex));
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
            return AtparStatusCodes.ATPAR_OK;
        }
    }

    public class VM_GETCYCLEEXCEPTIONREPORTDATA1
    {
        public string BUSINESS_UNIT { get; set; }
        public string EVENT_ID { get; set; }
        public string PARENT_EVENT_ID { get; set; }
        public string ITEM_ID { get; set; }
        public string LOCATION { get; set; }
        public string ITEM_DESC { get; set; }
        public string REPORT_DATA_15 { get; set; }
    }

    public class VM_GETCYCLEEXCEPTIONREPORTDATA2
    {
        public string BUSINESS_UNIT { get; set; }
        public string EVENT_ID { get; set; }
        public string LOCATION { get; set; }
        public string ITEM_ID { get; set; }
        public double? SYS_QTY { get; set; }
        public double? COUNT_QTY { get; set; }
        public string PARENT_EVENT_ID { get; set; }
        public DateTime? COUNT_DATE { get; set; }
        public string COUNT_PERCENT { get; set; }
        public string REPORT_DATA_15 { get; set; }
    }
}

