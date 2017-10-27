using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;

namespace AtPar.POU.Repos
{

    public class ExpirationTrackingReportRepository: IExpirationTrackingReportRepository
    {
        private ILog _log;
        private ICommonRepository _commonRepo;
        public ExpirationTrackingReportRepository(ILog log, ICommonRepository commonRepo)
        {
            _log = log;
            _commonRepo = commonRepo;
        }

        public Tuple<DataSet, long> GetExpireTrackRep(int pIntDuration, string pStrFromDate,
           string pStrToDate, string pStrDeptID, string pStrCartID, string pStrOrgGrpID, int pAppID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet dsInvItems = new DataSet();
            if (pStrDeptID == null) pStrDeptID = string.Empty;
            if (pStrCartID == null) pStrCartID = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        SqlParameter[] sqlParms = new SqlParameter[7];

                        sqlParms[0] = new SqlParameter("@Duration", SqlDbType.BigInt);
                        sqlParms[0].Value = pIntDuration;

                        sqlParms[1] = new SqlParameter("@StartDate", SqlDbType.NVarChar);
                        sqlParms[1].Value = pStrFromDate;

                        sqlParms[2] = new SqlParameter("@EndDate", SqlDbType.NVarChar);
                        sqlParms[2].Value = pStrToDate;

                        sqlParms[3] = new SqlParameter("@DeptID", SqlDbType.NVarChar);
                        sqlParms[3].Value = pStrDeptID;

                        sqlParms[4] = new SqlParameter("@CartId", SqlDbType.NVarChar);
                        sqlParms[4].Value = pStrCartID;

                        sqlParms[5] = new SqlParameter("@OrgGrpID", SqlDbType.NVarChar);
                        sqlParms[5].Value = pStrOrgGrpID;

                        sqlParms[6] = new SqlParameter("@AppID", SqlDbType.Int);
                        sqlParms[6].Value = pAppID;

                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.AddRange(sqlParms);
                        command.CommandText = "GetExpireTrackRep";
                        command.CommandType = CommandType.StoredProcedure;

                        if (_log.IsInfoEnabled)
                        {
                            _log.Info("Calling GetExpireTrackRep with the following syntax..");

                            string _strSQL1 = "EXEC sp_GetExpireTrackRep " + "\r\n" + " @ids = N'" + sqlParms + "'";

                            _log.Info(_strSQL1);
                        }

                        using (var reader = command.ExecuteReader())
                        {
                            var List1 =
                                ((IObjectContextAdapter)objContext)
                                    .ObjectContext
                                    .Translate<VM_GetExpireTrackRep>(reader)
                                    .ToList();

                            var dt = List1.ToDataTable();

                            reader.NextResult();

                            var List2 =
                               ((IObjectContextAdapter)objContext)
                                   .ObjectContext
                                   .Translate<VM_GetExpireTrackRep>(reader)
                                   .ToList();

                            var dt1 = List2.ToDataTable();

                            dsInvItems.Tables.Add(dt);
                            dsInvItems.Tables.Add(dt1);

                        }
                    }
                }
                return new Tuple<DataSet, long>(dsInvItems, AtparStatusCodes.ATPAR_OK);
            }
            catch (SqlException sqlex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + "\r\n" + (sqlex));
                }
                return new Tuple<DataSet, long>(dsInvItems, AtparStatusCodes.E_SERVERERROR);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ex.ToString());
                }
                return new Tuple<DataSet, long>(dsInvItems, AtparStatusCodes.E_SERVERERROR);
            }
        }

        public class VM_GetExpireTrackRep
        {
            public string ITEM_ID { get; set; }
            public string BUSINESS_UNIT { get; set; }
            public string CART_ID { get; set; }
            public string EXPIRY_DATE { get; set; }
            public double? ITEM_QUANTITY_ON_HAND { get; set; }
            public string LOT_NUMBER { get; set; }
            public string SERIAL_NUMBER { get; set; }
            public string DEPARTMENT_ID { get; set; }
            public string LOCATION_TYPE { get; set; }
            public string COMPARTMENT { get; set; }
        }


        public long GetExpItemCnt(string pStrOrgGrpID, string pStrUserID,
            int pAppID, string[] pDeviceTokenEntry, ref int pIntDuration,
            ref int pIntExpiredCnt, ref int pIntExpiringCnt)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
           
            DataSet _dsExpCnt = new DataSet();
           
            SqlParameter[] sqlParms = new SqlParameter[4];
            string _strSQL = string.Empty;
            int val1;
            int val2;

            try
            {
                pIntDuration = Convert.ToInt32(_commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.DURATION_TRACKING_EXP.ToString(), pAppID, pStrOrgGrpID));

                try
                {
                    using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                    {
                        using (var connection = objContext.Database.Connection)
                        {


                            sqlParms[0] = new SqlParameter("@Duration", SqlDbType.BigInt);
                            sqlParms[0].Value = pIntDuration;

                            sqlParms[1] = new SqlParameter("@OrgGrpID", SqlDbType.NVarChar);
                            sqlParms[1].Value = pStrOrgGrpID;

                            sqlParms[2] = new SqlParameter("@UserID", SqlDbType.NVarChar);
                            sqlParms[2].Value = pStrUserID;

                            sqlParms[3] = new SqlParameter("@AppID", SqlDbType.Int);
                            sqlParms[3].Value = pAppID;

                            connection.Open();
                            var command = connection.CreateCommand();
                            command.Parameters.AddRange(sqlParms);
                            command.CommandText = "GetExpItemCnt";
                            command.CommandType = CommandType.StoredProcedure;

                             _strSQL = "exec GetExpItemCnt '" + sqlParms[0].Value.ToString() + "', " + "'" + sqlParms[1].Value.ToString() + "', " + "'" + sqlParms[2].Value.ToString() + "', " + "'" + sqlParms[3].Value.ToString() + "'";

                            using (var reader = command.ExecuteReader())
                            {
                                 val1 =
                                    ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<int>(reader)
                                        .FirstOrDefault();

                               
                               
                               

                                reader.NextResult();

                                 val2 =
                                   ((IObjectContextAdapter)objContext)
                                       .ObjectContext
                                       .Translate<int>(reader)
                                       .FirstOrDefault();

                               
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
                    return  AtparStatusCodes.E_SERVERERROR;
                }
               
               
                    pIntExpiredCnt = val1; 
               
                    pIntExpiringCnt = val2;
               
                   
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _strSQL.ToString() + Environment.NewLine + " Exception is : " + ex.ToString() + Environment.NewLine);
                }
                return AtparStatusCodes. E_SERVERERROR;
            }
                return AtparStatusCodes. ATPAR_OK;
            }

        public List<VM_GetDeptCartAllocations> GetDeptCartAllocations(string businessUnit, string deptID, int appID, string locType)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

          
            SqlParameter[] sqlParms = new SqlParameter[4];
            string _strSQL = string.Empty;
            if (businessUnit == null)
            {
                businessUnit = string.Empty;
            }
            List<VM_GetDeptCartAllocations> lstparLocations = new List<VM_GetDeptCartAllocations>();
            try {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {


                        sqlParms[0] = new SqlParameter("@BusinessUnit", SqlDbType.NVarChar);
                        sqlParms[0].Value = businessUnit;

                        sqlParms[1] = new SqlParameter("@DepartmentID", SqlDbType.NVarChar);
                        sqlParms[1].Value = deptID;

                        sqlParms[2] = new SqlParameter("@LocationType", SqlDbType.NVarChar);
                        sqlParms[2].Value = locType;

                        sqlParms[3] = new SqlParameter("@AppID", SqlDbType.Int);
                        sqlParms[3].Value = appID;

                        _strSQL = "exec GetDeptCartAllocations '" + sqlParms[0].Value.ToString() + "', " + "'" + sqlParms[1].Value.ToString() + "', " + "'" + sqlParms[2].Value.ToString() + "', " + "'" + sqlParms[3].Value.ToString() + "'";

                        lstparLocations = objContext.Database.SqlQuery<VM_GetDeptCartAllocations>(_strSQL).ToList();

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned list " + lstparLocations); }
                        return lstparLocations;
                      
                    }
                }                

            } catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _strSQL.ToString() + Environment.NewLine + " Exception is : " + ex.ToString() + Environment.NewLine);
                }
                return lstparLocations;
            }
        }
    }
}
