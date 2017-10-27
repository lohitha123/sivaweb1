using AtPar.Common;
using AtPar.Data;
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
    public class QuantityOnHandReportRepository :IQuantityOnHandReportRepository
    {
        private ILog _log;
        public QuantityOnHandReportRepository(ILog log)
        {
            _log = log;
        }

        public long GetQtyOnHandItems(string businessUnit, string cartID,
            string itemID, string serialNumber, string lotNumber, string orgGrpID,
            bool negativeStatus, int appID, ref DataSet qtyOnHandDataDS)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SqlParameter[] sqlParms = new SqlParameter[8];
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

                            sqlParms[3] = new SqlParameter("@SerialNumber", SqlDbType.NVarChar);
                            sqlParms[3].Value = serialNumber;

                            sqlParms[4] = new SqlParameter("@LotNumber", SqlDbType.NVarChar);
                            sqlParms[4].Value = lotNumber;


                            sqlParms[5] = new SqlParameter("@OrgGrpID", SqlDbType.NVarChar);

                            if (orgGrpID != "All")
                            {
                                sqlParms[5].Value = orgGrpID;
                            }
                            else
                            {
                                sqlParms[5].Value = string.Empty;
                            }

                            sqlParms[6] = new SqlParameter("@NegativeStatus", SqlDbType.Bit);
                            sqlParms[6].Value = negativeStatus;

                            sqlParms[7] = new SqlParameter("@AppID", SqlDbType.Int);
                            sqlParms[7].Value = appID;

                            connection.Open();
                            var command = connection.CreateCommand();
                            command.Parameters.AddRange(sqlParms);
                            command.CommandText = "GetQtyOnHandItems";
                            command.CommandType = CommandType.StoredProcedure;

                            _strSQL = "exec GetQtyOnHandItems '" + sqlParms[0].Value.ToString() + "', " + "'" + sqlParms[1].Value.ToString() + "', " + "'" + sqlParms[2].Value.ToString() + "', " + "'" + sqlParms[3].Value.ToString() + "'";

                            using (var reader = command.ExecuteReader())
                            {
                                var List1 =
                                    ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<VM_QuantityOnHand1>(reader) //VM_QuantityOnHand1
                                        .ToList();

                                var dt = List1.ToDataTable();

                                reader.NextResult();

                                var List2 =
                                   ((IObjectContextAdapter)objContext)
                                       .ObjectContext
                                       .Translate<VM_QuantityOnHand2>(reader) //VM_QuantityOnHand2
                                       .ToList();

                                var dt1 = List2.ToDataTable();

                                reader.NextResult();

                                var returnValue =
                                  ((IObjectContextAdapter)objContext)
                                      .ObjectContext
                                      .Translate<VM_QuantityOnHand2>(reader) //VM_QuantityOnHand2
                                      .FirstOrDefault();
                                

                                qtyOnHandDataDS.Tables.Add(dt);
                                qtyOnHandDataDS.Tables.Add(dt1);
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

        public long GetChargeCaptureDetailsForCart(string bUnit, string cartID,
             ref DataSet dsChargeCaptureDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SqlParameter[] sqlParms = new SqlParameter[2];
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
                            sqlParms[0].Value = bUnit;

                            sqlParms[1] = new SqlParameter("@CartId", SqlDbType.NVarChar);
                            sqlParms[1].Value = cartID;


                            connection.Open();
                            var command = connection.CreateCommand();
                            command.Parameters.AddRange(sqlParms);
                            command.CommandText = "GetChargeCaptureDetails";
                            command.CommandType = CommandType.StoredProcedure;

                            //    _strSQL = "exec GetChargeCaptureDetails '" + sqlParms[0].Value.ToString() + "', " + "'" + sqlParms[1].Value.ToString() + "', " + "'" + sqlParms[2].Value.ToString() + "', " + "'" + sqlParms[3].Value.ToString() + "'";

                            using (var reader = command.ExecuteReader())
                            {
                                var List1 =
                                    ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<VM_GetChargeCaptureDetails>(reader)
                                        .ToList();

                                var dt = List1.ToDataTable();

                                reader.NextResult();

                                var List2 =
                                   ((IObjectContextAdapter)objContext)
                                       .ObjectContext
                                       .Translate<VM_GetChargeCaptureDetails>(reader)
                                       .ToList();

                                var dt1 = List2.ToDataTable();

                                dsChargeCaptureDetails.Tables.Add(dt);
                                dsChargeCaptureDetails.Tables.Add(dt1);
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

        public class VM_QuantityOnHand1
        {
            public string BUSINESS_UNIT { get; set; }
            public string CART_ID { get; set; }
            public string ITEM_ID { get; set; }
            public double? ITEM_QUANTITY_PAR { get; set; }
            public double? ITEM_QUANTITY_ON_HAND { get; set; }
            public double? ACTUAL_QUANTITY { get; set; }
            public string MAIN_ITEM_ID { get; set; }
            public string COMPARTMENT { get; set; }
        }

        public class VM_QuantityOnHand2
        {
            public string BUSINESS_UNIT { get; set; }
            public string CART_ID { get; set; }
            public string ITEM_ID { get; set; }
            public string LOT_NUMBER { get; set; }
            public string SERIAL_NUMBER { get; set; }
            public double? ITEM_QUANTITY_ON_HAND { get; set; }
            public double? ACTUAL_QUANTITY { get; set; }
            public string COMPARTMENT { get; set; }
            public string EXPIRY_DATE { get; set; }
        }

        public class VM_GetChargeCaptureDetails
        {
            public double? ITEM_COUNT { get; set; }
            public string ITEM_ID { get; set; }
            public string ITEM_LOTNUMBER { get; set; }
            public string ITEM_SRNUMBER { get; set; }
            public string COMPARTMENT { get; set; }
        }

        public Tuple<DataSet, long> GetManagementVendor(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSQL.Append("SELECT VENDOR_ID FROM PAR_MNGT_VENDOR ");
                    sbSQL.Append("WHERE VEND_USER_ID = '");
                    sbSQL.Append(userID);
                    sbSQL.Append("'");

                    var lstResult = objContext.Database.SqlQuery<string>(sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstResult.Count); }

                    var ds = lstResult.ToDataSet();
                    return new Tuple<DataSet, long>(ds, AtparStatusCodes.ATPAR_OK);
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                return new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
            }
            finally
            {
                sbSQL = null;
            }
        }

        


        public long GetBillOnlyItems(string deptID, ref DataSet dsBillOnlyItems, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSQL.Append("SELECT B.ITEM_ID, B.DEPT_ID, B.UPC_ID, B.MFG_ITEM_ID, B.VEND_ITEM_ID, ");
                    sbSQL.Append("B.VENDOR_ID, B.DESCRIPTION, B.LOT_ID, B.SERIAL_ID, B.MANUFACTURER, B.EXPIRY_DATE, B.CATALOG_FLG, B.UOM, B.ITEM_PRICE, ");
                    sbSQL.Append("'Y' AS BILL_ITEM_STATUS, CASE I.STATUS WHEN 0 THEN 'Y' WHEN 1 THEN 'N' WHEN 2 THEN 'P' ELSE '' END AS ITEM_MASTER_ITEM_STATUS, ISNULL(I.IMPLANT_FLAG,'N') IMPLANT_FLAG ");
                    sbSQL.Append("FROM MT_POU_BILLONLY_ITEMS B ");
                    sbSQL.Append("LEFT JOIN PAR_MNGT_ITEM I ON B.ITEM_ID = I.ITEM_ID ");
                    sbSQL.Append("WHERE B.ORG_GROUP_ID = '");
                    sbSQL.Append(deviceTokenEntry[(int)AtParWebEnums. TokenEntry_Enum.OrgGrpID]);
                    sbSQL.Append("' ");
                    if (!string.IsNullOrEmpty(deptID))
                    {
                        sbSQL.Append("AND B.DEPT_ID = '");
                        sbSQL.Append(deptID);
                        sbSQL.Append("' ");
                    }

                    var lstResult = objContext.Database.SqlQuery<VM_BILLONLY_ITEMS>(sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstResult.Count); }

                    dsBillOnlyItems = lstResult.ToDataSet();
                   
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                return  AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSQL = null;
            }
        }

        public class VM_BILLONLY_ITEMS
        {
            public string ITEM_ID { get; set; }
            public string DEPT_ID { get; set; }
            public string UPC_ID { get; set; }
            public string MFG_ITEM_ID { get; set; }
            public string VEND_ITEM_ID { get; set; }
            public string VENDOR_ID { get; set; }
            public string DESCRIPTION { get; set; }
            public string LOT_ID { get; set; }
            public string SERIAL_ID { get; set; }
            public string MANUFACTURER { get; set; }
            public DateTime? EXPIRY_DATE { get; set; }
            public bool CATALOG_FLG { get; set; }
            public string UOM { get; set; }
            public double? ITEM_PRICE { get; set; }
            public string BILL_ITEM_STATUS { get; set; }
            public string ITEM_MASTER_ITEM_STATUS { get; set; }
            public string IMPLANT_FLAG { get; set; }
        }

        public Tuple<List<string>, long> GetDepartmentID(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();
            DataTable dt = new DataTable();
            DataSet ds = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSQL.Append("SELECT DEPARTMENT_ID FROM MT_POU_DEPT_USER_ALLOCATIONS ");
                    sbSQL.Append("WHERE USER_ID = '" + userID + "'");

                    var lstResult = objContext.Database.SqlQuery<string>(sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstResult.Count); }

                    
                    return new Tuple<List<string>, long>(lstResult, AtparStatusCodes.ATPAR_OK);
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                return new Tuple<List<string>, long>(null, AtparStatusCodes.E_SERVERERROR);
            }
            finally
            {
                sbSQL = null;
            }
        }
    }
}
