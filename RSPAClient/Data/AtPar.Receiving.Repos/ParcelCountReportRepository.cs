using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Repository.Interfaces.Receiving;
using log4net;
using AtPar.Common;
using AtPar.ViewModel;
using System.Data;
using System.Data.SqlClient;
using AtPar.Data;
using System.Data.Entity.Infrastructure;
using AtParVbUtilities;
using System.IO;

namespace AtPar.Receiving.Repos
{
    public class ParcelCountReportRepository : IParcelCountReportRepository 
    {
        #region Private Variables

        private ILog _log;

        #endregion

        #region Constructor

        public ParcelCountReportRepository(ILog log) {
            _log = log;
            _log.SetLoggerType(typeof(ParcelCountReportRepository));
        }

        #endregion

        #region Public Methods

        public Tuple<long, Dictionary<string, object>> GetParcelCountReport(DateTime fDate, DateTime tDate, string carrierID,
                                                                                        string trackingNo, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            Tuple<long, Dictionary<string, object>> tupleResult = null;
            List<VM_MT_RECV_PARCEL_COUNTS_HEADER> lstParcelCountHeader = null;
            List<VM_MT_RECV_PARCEL_COUNTS_DETAIL> lstParcelCountDetails = null;
            string strPath = string.Empty;
            AtParVbUtilities.VbUtilities objUtil = new VbUtilities();

            try
            {
                var result = new Dictionary<string, object>();
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    SqlParameter[] sqlParams = new SqlParameter[7];
                    sqlParams[0] = new SqlParameter("@CarrierId", SqlDbType.NVarChar);
                    sqlParams[0].Value = carrierID;

                    sqlParams[1] = new SqlParameter("@FromDate", SqlDbType.Date);
                    sqlParams[1].Value = fDate;

                    sqlParams[2] = new SqlParameter("@ToDate", SqlDbType.Date);
                    sqlParams[2].Value = tDate;

                    sqlParams[3] = new SqlParameter("@userID", SqlDbType.NVarChar);
                    sqlParams[3].Value = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                    sqlParams[4] = new SqlParameter("@OrgGrp_ID", SqlDbType.NVarChar);
                    sqlParams[4].Value = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();

                    sqlParams[5] = new SqlParameter("@Tracking_NO", SqlDbType.NVarChar);
                    sqlParams[5].Value = trackingNo;

                    sqlParams[6] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlParams[6].Direction = ParameterDirection.Output;

                    objContext.Database.Connection.Open();
                    var command = objContext.Database.Connection.CreateCommand();
                    command.CommandText = "GetParcelCountRep";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParams);
                    var reader = command.ExecuteReader();

                    lstParcelCountHeader = ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_MT_RECV_PARCEL_COUNTS_HEADER>
                    (reader).ToList();

                    reader.NextResult();

                    lstParcelCountDetails = ((IObjectContextAdapter)objContext)
                        .ObjectContext
                        .Translate<VM_MT_RECV_PARCEL_COUNTS_DETAIL>(reader)
                        .ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    }

                    sbSQl
                        .Append("exec ").Append(command.CommandText)
                        .Append(" '").Append(sqlParams[0].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParams[1].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParams[2].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParams[3].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParams[4].Value.ToString()).Append("', ")
                        .Append("'").Append(sqlParams[5].Value.ToString()).Append("'");
                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug("Calling " + command.CommandText + " with the following syntax..." + sbSQl.ToString());

                    }
                    objContext.Database.Connection.Close();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Total No of Rows Returned in Header : " + lstParcelCountHeader.Count); }
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Total No of Rows Returned in Details : " + lstParcelCountDetails.Count); }

                    if (lstParcelCountHeader.Count > 0)
                    {
                        for (var i = 0; i < lstParcelCountHeader.Count; i++) {
                            string signature = lstParcelCountHeader[i].SIGNATURE;                            
                            if (!string.IsNullOrEmpty(signature)) {                                
                                strPath = AppDomain.CurrentDomain.BaseDirectory[0].ToString() + ":\\AtPar\\AtParWebApi\\Uploaded\\";
                                if (!Directory.Exists(strPath)){ Directory.CreateDirectory(strPath); }
                                strPath += lstParcelCountHeader[i].TRANSACTION_ID.ToString() + ".jpg";
                                lstParcelCountHeader[i].SIGNATURE = objUtil.Signature(strPath, signature);
                            }
                        }
                    }

                    result.Add("lstGetParcelCountRepHeader", lstParcelCountHeader);
                    result.Add("lstGetParcelCountRepDetails", lstParcelCountDetails);

                    tupleResult = new Tuple<long, Dictionary<string,object>>(Convert.ToInt64(sqlParams[6].Value), result);
                    return tupleResult;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally { sbSQl = null; }

        }

        #endregion
    }
}
