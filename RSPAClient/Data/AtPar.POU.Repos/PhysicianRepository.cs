using AtPar.Repository.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.Common;
using log4net;
using AtPar.POCOEntities;
using AtPar.Data;
using System.Data.SqlClient;
using System.Data;

namespace AtPar.POU.Repos
{
    public class PhysicianRepository: IPhysicianRepository
    {
        ILog _log;
        public PhysicianRepository(ILog log)
        {
            _log = log;
        }
        /// <summary>
        /// Used to get the physician list
        /// </summary>
        /// <param name="strPhysicianID"></param>
        /// <param name="strFname"></param>
        /// <param name="strLname"></param>
        /// <param name="strMinitial"></param>
        /// <returns></returns>
        public List<MT_POU_PHYSICIAN> GetPhysicianList(string strPhysicianID, string strFname, string strLname, string strMinitial)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                List<MT_POU_PHYSICIAN> lstTokens = null;
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    SqlParameter sqlPhysicianID = new SqlParameter("@ID", SqlDbType.NVarChar);
                    sqlPhysicianID.Value = strPhysicianID;
                    SqlParameter sqlFname = new SqlParameter("@FName", SqlDbType.NVarChar);
                    sqlFname.Value = strFname;
                    SqlParameter sqlLname = new SqlParameter("@LName", SqlDbType.NVarChar);
                    sqlLname.Value = strLname;
                    SqlParameter sqlMinitial = new SqlParameter("@MInitial", SqlDbType.NVarChar);
                    sqlMinitial.Value = strMinitial;
                    string[] columns = { "PHYSICIAN_ID", "FIRST_NAME", "LAST_NAME", "MIDDLE_INITIAL", "STATUS" };

                    lstTokens = objContext.Database.DifferedExecuteQuery<MT_POU_PHYSICIAN>(columns,"exec GetPhysicianList @ID,@FName,@LName,@MInitial", sqlPhysicianID,sqlFname,sqlLname,sqlMinitial).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Physicians Returned: " + lstTokens.Count()); }

                }
                return lstTokens;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Gets the Physician Details for the Specified PhysicainId, Physician First Name and Last Name
        /// </summary>
        /// <param name="physicianId"></param>
        /// <param name="physicianName"></param>
        /// <returns></returns>
        public List<MT_POU_PHYSICIAN> GetPhysicianList(string physicianId, string physicianName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                List<MT_POU_PHYSICIAN> lstPhysicainDetails = null;
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter sqlPhysicianID = new SqlParameter("@PhysicianId", SqlDbType.NVarChar);
                    sqlPhysicianID.Value = physicianId;
                    SqlParameter sqlPhysicianName = new SqlParameter("@PhysicianName", SqlDbType.NVarChar);
                    sqlPhysicianName.Value = physicianName;
                    
                    string[] columns = { "PHYSICIAN_ID", "FIRST_NAME", "LAST_NAME", "MIDDLE_INITIAL", "STATUS" };

                    lstPhysicainDetails = objContext.Database.DifferedExecuteQuery<MT_POU_PHYSICIAN>(columns, "exec GetPhysicianList @PhysicianId, @PhysicianName", sqlPhysicianID, sqlPhysicianName).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Physicians Returned: " + lstPhysicainDetails.Count()); }

                }
                return lstPhysicainDetails;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                throw ex;
            }
           
        }

        /// <summary>
        /// Used to delete the physician
        /// </summary>
        /// <param name="physicianId"></param>
        /// <param name="physicianStatus"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public long DeletePhysician(string physicianId, string physicianStatus, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = null, _infoMsg = null;
            int intStatus = 0;
            if (physicianStatus == "Disable")
            {
                intStatus = 1;
            }
           
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    
                        _strSQL = "UPDATE MT_POU_PHYSICIAN SET  STATUS = " + intStatus + " " + " , UPDATE_DATE = GETDATE() , UPDATE_USERID = '" + userID + "' WHERE PHYSICIAN_ID = '" + physicianId + "'";
                        _infoMsg = " Updating the physician status to active/inactive with the following SQL.... " + _strSQL + "\r\n";
                    

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(_strSQL);
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " " + _infoMsg + " " + count); }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (SqlException sqlEx)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _strSQL.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _strSQL = null;
            }
        }
        /// <summary>
        /// Used to update the physician
        /// </summary>
        /// <param name="physicianId"></param>
        /// <param name="fName"></param>
        /// <param name="lName"></param>
        /// <param name="minitial"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public long UpdatePhysicianDetails(string physicianId, string fName, string lName, string minitial, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = null, _infoMsg = null;            

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    
                        _strSQL = "UPDATE MT_POU_PHYSICIAN SET FIRST_NAME = '" + fName + "', LAST_NAME = '" + lName + "', MIDDLE_INITIAL = '" + minitial + "'  , UPDATE_DATE = getdate(), UPDATE_USERID='" + userID + "' WHERE PHYSICIAN_ID = '" + physicianId + "'";
                        _infoMsg = " Updating Physician with the following Sql.... " + _strSQL + "\r\n";                   

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(_strSQL);
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " " + _infoMsg + " " + count); }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (SqlException sqlEx)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _strSQL.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _strSQL = null;
            }
        }
        /// <summary>
        /// Used to add the physician
        /// </summary>
        /// <param name="physicianId"></param>
        /// <param name="fName"></param>
        /// <param name="lName"></param>
        /// <param name="minitial"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public long AddPhysicianHeader(string physicianId, string fName, string lName, string minitial, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string  _infoMsg = null;
            System.Text.StringBuilder _strSQL = new System.Text.StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var _with1 = _strSQL;
                    _with1.Append("INSERT INTO MT_POU_PHYSICIAN(PHYSICIAN_ID, FIRST_NAME, LAST_NAME, MIDDLE_INITIAL, ");
                    _with1.Append("UPDATE_DATE, UPDATE_USERID");
                    _with1.Append(") VALUES('");
                    _with1.Append(physicianId);
                    _with1.Append("','");
                    _with1.Append(fName);
                    _with1.Append("','");
                    _with1.Append(lName);
                    _with1.Append("','");
                    _with1.Append(minitial);
                    _with1.Append("',");
                    _with1.Append("GETDATE()");
                    _with1.Append(",'");
                    _with1.Append(userID);
                    _with1.Append("')");
                    _infoMsg = "  Adding physician with the following SQL... " + _strSQL.ToString() + "\r\n";                    

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(_strSQL.ToString());
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " " + _infoMsg + " " + count); }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (SqlException sqlEx)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _strSQL.ToString() + ":"); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _strSQL = null;
            }
        }


    }
}
