using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.Repository.Interfaces.Common;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CartCount.Repos
{
  public  class OrderHistoryReportRepository : IOrderHistoryReportRepository
    {
        private ILog _log;
        private ICommonRepository _commonRepo;
        public OrderHistoryReportRepository(ILog log, ICommonRepository commonRepo)
        {
            _commonRepo = commonRepo;
            _log = log;
        }

        public Tuple<DataSet, long> GetRequisitionNo(string ids, string user)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet pDsReqNo = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        SqlParameter sql_parm_Ids = new SqlParameter("@ids", SqlDbType.VarChar, 4000);
                        sql_parm_Ids.Value = ids;

                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.Add(sql_parm_Ids);
                        command.CommandText = "sp_GetRequisitionNo";
                        command.CommandType = CommandType.StoredProcedure;

                        if (_log.IsInfoEnabled)
                        {
                            _log.Info("Calling sp_GetRequisitionNo with the following syntax..");

                            string _strSQL1 = "EXEC sp_GetRequisitionNo " + "\r\n" + " @ids = N'" + sql_parm_Ids.Value + "'";

                            _log.Info(_strSQL1);
                        }

                        using (var reader = command.ExecuteReader())
                        {
                            var List1 =
                                ((IObjectContextAdapter)objContext)
                                    .ObjectContext
                                    .Translate<VM_List_GetRequisitionNo>(reader)
                                    .ToList();

                            var dt = List1.ToDataTable();

                            pDsReqNo.Tables.Add(dt);
                        }
                    }
                }
                return new Tuple<DataSet, long>(pDsReqNo, AtparStatusCodes.ATPAR_OK);
            }
            catch (SqlException sqlex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + "\r\n" + (sqlex));
                }
                return new Tuple<DataSet, long>(pDsReqNo, AtparStatusCodes.E_SERVERERROR);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ex.ToString());
                }
                return new Tuple<DataSet, long>(pDsReqNo, AtparStatusCodes.E_SERVERERROR);
            }
        }

        public Tuple<DataSet,long> selectTransaction(string bUnit, string parLoc)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<VM_MT_ATPAR_TRANSACTION> lstUserParams = null;
            DataSet dsDateValues = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT TOP 5 TRANSACTION_ID,CONVERT(NVARCHAR(50),UPDATE_DT_TIME ,121) AS UPDATE_DT_TIME,UPDATE_DAY=(SELECT DATENAME(WEEKDAY,UPDATE_DT_TIME)),UPDATE_HOUR=(SELECT DATENAME(hour,UPDATE_DT_TIME)),UPDATE_MINUTE=(SELECT DATENAME(minute,UPDATE_DT_TIME)),CONVERT(NVARCHAR(50),UPDATE_DT_TIME ,101) + ' '+ CONVERT(NVARCHAR(50),UPDATE_DT_TIME ,108) AS DATESTRING FROM MT_ATPAR_TRANSACTION " + "WHERE BUSINESS_UNIT= '" + bUnit + "' AND  ID ='" + parLoc + "' AND STATUS NOT IN ('" + AtParDefns.statError + "','" + AtParDefns.statCancel + "','" + AtParDefns.statDownloaded + "','" + AtParDefns.statCartPutAwayDownload + "','" + AtParDefns.statPutAway + "') ORDER BY UPDATE_DT_TIME DESC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    lstUserParams = objContext.Database.SqlQuery<VM_MT_ATPAR_TRANSACTION>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of user parameters returned: " + lstUserParams.Count()); }

                    dsDateValues= lstUserParams.ToDataSet();

                    return new Tuple<DataSet, long>( dsDateValues,AtparStatusCodes.ATPAR_OK);
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

        public Tuple<DataSet,long> getCriticalItems(string bUnit,string cartID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_CRCT_CRITICAL_ITEMS> lstcriticalItems = null;
            DataSet dsItems = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID,ITEM_ID " + "FROM MT_CRCT_CRITICAL_ITEMS WHERE BUSINESS_UNIT = '" + bUnit + "' " + "AND CART_ID ='" + cartID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    lstcriticalItems = objContext.Database.SqlQuery<MT_CRCT_CRITICAL_ITEMS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of user parameters returned: " + lstcriticalItems.Count()); }

                    dsItems = lstcriticalItems.ToDataSet();

                    return new Tuple<DataSet, long>(dsItems, AtparStatusCodes.ATPAR_OK);
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

        public class VM_MT_ATPAR_TRANSACTION
        {
            public int TRANSACTION_ID { get; set; }
            public string UPDATE_DT_TIME { get; set; }
            public string UPDATE_DAY { get; set; }
            public string UPDATE_HOUR { get; set; }
            public string UPDATE_MINUTE { get; set; }
            public string DATESTRING { get; set; }
        }

        public class VM_List_GetRequisitionNo
        {
            public string TRANSID { get; set; }
            public string REQNO { get; set; }
        }
    }
}
