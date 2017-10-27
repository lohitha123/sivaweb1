using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.POU;
using log4net;
using System;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;

namespace AtPar.POU.Repos
{
    public class TransactionHistoryReportRepository : ITransactionHistoryReportRepository
    {
        private ILog _log;
       
        public TransactionHistoryReportRepository(ILog log)
        {
            _log = log;
           
        }

        public Tuple<DataSet, long> GetProductivityReport(string startDate, string endDate,
            string bUnit, string parLoc, string itemID, string orgID, bool negInventory)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet pTransDS = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        SqlParameter[] sqlParms = new SqlParameter[7];
                        sqlParms[0] = new SqlParameter("@StartDate", SqlDbType.NVarChar);
                        sqlParms[0].Value = startDate;

                        sqlParms[1] = new SqlParameter("@EndDate", SqlDbType.NVarChar);
                        sqlParms[1].Value = endDate;

                        sqlParms[2] = new SqlParameter("@BUnit", SqlDbType.NVarChar);
                        sqlParms[2].Value = bUnit;

                        sqlParms[3] = new SqlParameter("@ParLoc", SqlDbType.NVarChar);
                        sqlParms[3].Value = parLoc;

                        sqlParms[4] = new SqlParameter("@ItemID", SqlDbType.NVarChar);
                        sqlParms[4].Value = itemID;

                        sqlParms[5] = new SqlParameter("@OrgID", SqlDbType.NVarChar);
                        sqlParms[5].Value = orgID;

                        sqlParms[6] = new SqlParameter("@NegInventory", SqlDbType.Bit);
                        sqlParms[6].Value = negInventory;

                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.AddRange(sqlParms);
                        command.CommandText = "GetInventoryTrackHistoryReport";
                        command.CommandType = CommandType.StoredProcedure;

                        if (_log.IsInfoEnabled)
                        {
                            _log.Info("Calling GetInventoryTrackHistoryReport with the following syntax..");

                            string _strSQL1 = "EXEC GetInventoryTrackHistoryReport " + "\r\n" + " @ids = N'" + sqlParms + "'";

                            _log.Info(_strSQL1);
                        }

                        using (var reader = command.ExecuteReader())
                        {
                            var List1 =
                                ((IObjectContextAdapter)objContext)
                                    .ObjectContext
                                    .Translate<VM_GetInventoryTrackHistoryReport>(reader)
                                    .ToList();

                            var dt = List1.ToDataTable();


                            pTransDS.Tables.Add(dt);
                            
                        }
                    }
                }
                return new Tuple<DataSet, long>(pTransDS, AtparStatusCodes.ATPAR_OK);
            }
            catch (SqlException sqlex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + "\r\n" + (sqlex));
                }
                return new Tuple<DataSet, long>(pTransDS, AtparStatusCodes.E_SERVERERROR);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ex.ToString());
                }
                return new Tuple<DataSet, long>(pTransDS, AtparStatusCodes.E_SERVERERROR);
            }
        }

        public class VM_GetInventoryTrackHistoryReport
        {
            public string CART_ID { get; set; }
            public string ITEM_ID { get; set; }
            public string COMPARTMENT { get; set; }
            public double? QOH { get; set; }
            public DateTime UPDATE_DATE { get; set; }
            public short? EVENT_TYPE { get; set; }
            public double? ON_HAND_QTY { get; set; }
            public double? QTY_ADJUSTED { get; set; }
            public double? QTY_ISSUED { get; set; }
            public double? QTY_RETPUTAWAY { get; set; }
            public string DOWNLOAD_USERID { get; set; }
            public string REASON_CODE { get; set; }
        }
    }
}
