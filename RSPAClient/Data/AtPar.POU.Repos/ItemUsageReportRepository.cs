using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Repos
{
    
   public class ItemUsageReportRepository : IItemUsageReportRepository
    {
        private ILog _log;
        public ItemUsageReportRepository(ILog log)
        {
            _log = log;
        }

        public long GetItemUsageReport(string businessUnit, string cartID,
            string itemID, string fromDate, string toDate, int appID, ref DataSet pItemUsageDS)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SqlParameter[] sqlParms = new SqlParameter[6];
            string _strSQL = string.Empty;

            try
            {

                try
                {
                    using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                    {
                        using (var connection = objContext.Database.Connection)
                        {


                            sqlParms[0] = new SqlParameter("@BusinessUnit", SqlDbType.NVarChar);
                            sqlParms[0].Value = businessUnit;

                            sqlParms[1] = new SqlParameter("@CartId", SqlDbType.NVarChar);
                            sqlParms[1].Value = cartID;

                            sqlParms[2] = new SqlParameter("@ItemId", SqlDbType.NVarChar);
                            sqlParms[2].Value = itemID;

                            sqlParms[3] = new SqlParameter("@FromDate", SqlDbType.NVarChar);
                            sqlParms[3].Value = fromDate;

                            sqlParms[4] = new SqlParameter("@ToDate", SqlDbType.NVarChar);
                            sqlParms[4].Value = toDate;


                            sqlParms[5] = new SqlParameter("@AppID", SqlDbType.Int);
                            sqlParms[5].Value = appID;

                            connection.Open();
                            var command = connection.CreateCommand();
                            command.Parameters.AddRange(sqlParms);
                            command.CommandText = "GetItemUsage";
                            command.CommandType = CommandType.StoredProcedure;

                            _strSQL = "exec GetItemUsage '" + sqlParms[0].Value.ToString() + "', " + "'" + sqlParms[1].Value.ToString() + "', " + "'" + sqlParms[2].Value.ToString() + "', " + "'" + sqlParms[3].Value.ToString() + "'";

                            using (var reader = command.ExecuteReader())
                            {
                                var List1 =
                                    ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<VM_GETITEMUSAGE>(reader) //VM_QuantityOnHand1
                                        .ToList();

                                var dt = List1.ToDataTable();

                                reader.NextResult();
                                
                                var List2 =
                                   ((IObjectContextAdapter)objContext)
                                       .ObjectContext
                                       .Translate<VM_GETITEMUSAGE1>(reader) //VM_QuantityOnHand2
                                       .ToList();

                                var dt1 = List2.ToDataTable();

                               


                                pItemUsageDS.Tables.Add(dt);
                                pItemUsageDS.Tables.Add(dt1);
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
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _strSQL.ToString() + Environment.NewLine + " Exception is : " + ex.ToString() + Environment.NewLine);
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
            return AtparStatusCodes.ATPAR_OK;
        }

        public class VM_GETITEMUSAGE
        {
            public string ITEM_ID { get; set; }
            public string UPDATE_DATE { get; set; }
            public double? ITEM_COUNT { get; set; }
        }

        public class VM_GETITEMUSAGE1
        {
            public string ITEM_ID { get; set; }
           
            public double? ITEM_QUANTITY_PAR { get; set; }
        }
    }
}
