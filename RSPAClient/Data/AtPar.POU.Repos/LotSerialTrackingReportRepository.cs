using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.ViewModel;
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
    public class LotSerialTrackingReportRepository : ILotSerialTrackingReportRepository
    {
        ILog _log;

        public LotSerialTrackingReportRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(LotSerialTrackingReportRepository));
        }

        public Tuple<long,DataSet> GetLotSerialTrackReport(string startDate, string endDate, string lotNumber, string srNo, string patientID, string examID, string accountID, string itemId, string strOrgGrpID,
          string deptID, int appID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SqlParameter[] sqlParms = new SqlParameter[10];
            StringBuilder _sbSQL = new StringBuilder();
            DataSet chargeReportDS = new DataSet();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    sqlParms[0] = new SqlParameter("@StartDate", SqlDbType.NVarChar);
                    sqlParms[0].Value =string.IsNullOrEmpty(startDate)?string.Empty:startDate;

                    sqlParms[1] = new SqlParameter("@EndDate", SqlDbType.NVarChar);
                    sqlParms[1].Value = string.IsNullOrEmpty(endDate) ? string.Empty : endDate;

                    sqlParms[2] = new SqlParameter("@LotNumber", SqlDbType.NVarChar);
                    sqlParms[2].Value = string.IsNullOrEmpty(lotNumber) ? string.Empty : lotNumber;

                    sqlParms[3] = new SqlParameter("@SerialNumber", SqlDbType.NVarChar);
                    sqlParms[3].Value = string.IsNullOrEmpty(srNo) ? string.Empty : srNo;

                    sqlParms[4] = new SqlParameter("@PatientID", SqlDbType.NVarChar);
                    sqlParms[4].Value = string.IsNullOrEmpty(patientID) ? string.Empty : patientID;

                    sqlParms[5] = new SqlParameter("@ExamID", SqlDbType.NVarChar);
                    sqlParms[5].Value = string.IsNullOrEmpty(examID) ? string.Empty : examID;

                    sqlParms[6] = new SqlParameter("@AccountID", SqlDbType.NVarChar);
                    sqlParms[6].Value = string.IsNullOrEmpty(accountID) ? string.Empty : accountID;

                    sqlParms[7] = new SqlParameter("@ItemID", SqlDbType.NVarChar);
                    sqlParms[7].Value = string.IsNullOrEmpty(itemId) ? string.Empty : itemId;

                    sqlParms[8] = new SqlParameter("@DeptID", SqlDbType.NVarChar);
                    sqlParms[8].Value = string.IsNullOrEmpty(deptID) ? string.Empty : deptID;

                    sqlParms[9] = new SqlParameter("@AppID", SqlDbType.Int);
                    sqlParms[9].Value = appID;

                    objContext.Database.Connection.Open();

                    var command = objContext.Database.Connection.CreateCommand();
                    command.CommandText = "GetLotSerialTrackReport";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParms);
                    var reader = command.ExecuteReader();

                    List<VM_MT_POU_ISSUED_DETAILS> lstCaptureDetails =
                  ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_MT_POU_ISSUED_DETAILS>
                  (reader).ToList();
                    reader.NextResult();
                    List<VM_MT_POU_ONHAND_DETAILS> lstCaptureHdrDetails =
                        ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_MT_POU_ONHAND_DETAILS>
                (reader).ToList();

                    _sbSQL.Append("exec GetLotSerialTrackReport '").Append(sqlParms[0].Value.ToString()).Append("', ").Append("'")
                        .Append(sqlParms[1].Value.ToString())
                        .Append("', ").Append("'").Append(sqlParms[2].Value.ToString()).Append("', ").Append("'")
                        .Append(sqlParms[3].Value.ToString()).Append("', ").Append("'").Append(sqlParms[4].Value.ToString())
                        .Append("', ").Append("'").Append(sqlParms[5].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParms[6].Value.ToString()).Append("', ").Append("'").Append(sqlParms[7].Value.ToString())
                        .Append("', ").Append("'").Append(sqlParms[8].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParms[9].Value.ToString()).Append("' ");

                    if (_log.IsInfoEnabled)
                        _log.Info(methodBaseName + " Getting the ChargeReport data with the" + " following " + _sbSQL + "\n");
                    objContext.Database.Connection.Close();
                                     
                    
                    DataTable dtCaptureDetails = lstCaptureDetails.ToDataTable();
                    DataTable dtCaptureHdrDetails = lstCaptureHdrDetails.ToDataTable();

                    chargeReportDS.Tables.Add(dtCaptureDetails);
                    chargeReportDS.Tables.Add(dtCaptureHdrDetails);

                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                }

                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, chargeReportDS);


            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL,null);
            }


        }
    }
}
