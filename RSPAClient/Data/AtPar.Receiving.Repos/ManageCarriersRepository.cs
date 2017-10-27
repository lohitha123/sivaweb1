#region Usings
using AtPar.Repository.Interfaces.Receiving;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using log4net;
using AtPar.Data;
using AtPar.Common;
using System.Data.SqlClient;
#endregion

namespace AtPar.Receiving.Repos
{
    public class ManageCarriersRepository : IManageCarriersRepository
    {
        ILog _log;

        public ManageCarriersRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageCarriersRepository));
        }

        /// <summary>
        /// To Get the Carriers Data
        /// </summary>
        /// <returns></returns>
        public List<MT_RECV_MANAGE_CARRIERS> GetCarriersData(string search)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    sbSql.Append(" SELECT SEARCH_STRING, START_POSITION, CARRIER, [STATUS] FROM MT_RECV_MANAGE_CARRIERS");

                    if (!string.IsNullOrEmpty(search))
                    {
                        sbSql.Append(" WHERE CARRIER LIKE '").Append(search).Append("%'");                        
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
                    }

                    var fileds = new[] { "SEARCH_STRING", "START_POSITION", "CARRIER", "STATUS" };

                    var lstCarriersData = objContext.Database.DifferedExecuteQuery<MT_RECV_MANAGE_CARRIERS>(fileds, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of Carriers Returned from Local DB: {1}", methodBaseName, lstCarriersData != null ? lstCarriersData.Count : 0)); }

                    return lstCarriersData;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// To Insert or Update the Carriers
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="searchString"></param>
        /// <param name="startPosition"></param>
        /// <param name="carrier"></param>
        /// <param name="status"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public long UpdateCarriers(string mode, string searchString, string startPosition, string carrier, int status, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string sbSql = string.Empty;
            long statusCode = -1;
            int intMode;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (mode.ToUpper() == AtParWebEnums.AddEdit_Enum.ADD.ToString())
                    {
                        intMode = (int)ManageCarriers.Insert;
                    }
                    else if (mode.ToUpper() == AtParWebEnums.AddEdit_Enum.EDIT.ToString())
                    {
                        intMode = (int)ManageCarriers.Update;
                    }
                    else
                    {
                        intMode = (int)ManageCarriers.Status;
                    }

                    SqlParameter paramMode = new SqlParameter("@Mode", intMode);
                    SqlParameter paramSearchString = new SqlParameter("@SearchString", searchString);
                    SqlParameter paramStartPosition = new SqlParameter("@StartPosition", startPosition);
                    SqlParameter paramCarrier = new SqlParameter("@Carrier", carrier);
                    SqlParameter paramStatus = new SqlParameter("@Status", status);
                    SqlParameter paramUserID = new SqlParameter("@UserID", deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID]);
                    SqlParameter paramStatusCode = new SqlParameter("@StatusCode", System.Data.SqlDbType.Int);
                    paramStatusCode.Direction = System.Data.ParameterDirection.Output;

                    sbSql = "EXEC UpdateManageCarriers @Mode, @SearchString, @StartPosition, @Carrier, @Status, @UserID, @StatusCode";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    }

                    var result = objContext.Database.ExecuteSqlCommand("EXEC UpdateManageCarriers @Mode, @SearchString, @StartPosition, @Carrier, @Status, @UserID, @StatusCode out", paramMode, paramSearchString, paramStartPosition, paramCarrier, paramStatus, paramUserID, paramStatusCode);
                    statusCode = long.Parse(paramStatusCode.Value.ToString());
                }

                return statusCode;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        private enum ManageCarriers
        {
            Insert = 1,
            Update = 2,
            Status = 3
        }
    }
}
