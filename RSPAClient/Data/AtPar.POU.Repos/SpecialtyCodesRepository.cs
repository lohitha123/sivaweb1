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

namespace AtPar.POU.Repos
{
   public class SpecialtyCodesRepository : ISpecialtyCodesRepository
    {
        ILog _log;
        public SpecialtyCodesRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(SpecialtyCodesRepository));
        }

        /// <summary>
        /// used to et the specialty codes
        /// </summary>
        /// <param name="codeType"></param>
        /// <param name="code"></param>
        /// <param name="descr"></param>
        /// <returns></returns>
        public List<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string codeType,  string code, string descr)
        {           
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            int intStatus = 0;

            try
            {
                List<MT_POU_PROCEDURE_CODE> lstCodes = null;

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                   
                        sbSql.Append("SELECT PROCEDURE_CODE AS CODE, SPECIALTY_CODE AS SCODE, DESCRIPTION, UPDATE_USER_ID, STATUS ");
                        sbSql.Append(", CASE WHEN ([DESCRIPTION] IS NULL OR [DESCRIPTION] = '') THEN PROCEDURE_CODE ELSE PROCEDURE_CODE + ' - ' + [DESCRIPTION] END AS PROCEDURENAME ");
                        sbSql.Append("FROM MT_POU_PROCEDURE_CODE ");
                  
                        sbSql.Append("WHERE STATUS = " + intStatus + " ");
                    

                    if (!string.IsNullOrEmpty(code))
                    {
                        
                            sbSql.Append("AND PROCEDURE_CODE LIKE '%" + code + "%' ");
                       

                        if (!string.IsNullOrEmpty(descr))
                        {
                            sbSql.Append("AND DESCRIPTION LIKE '%" + descr + "%' ");
                        }

                    }
                    else if (!string.IsNullOrEmpty(descr))
                    {
                        sbSql.Append("AND DESCRIPTION LIKE '%" + descr + "%' ");
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    try
                    {
                        var fields = new[] { "CODE", "SCODE", "DESCRIPTION", "UPDATE_USER_ID", "STATUS", "PROCEDURENAME"};
                        lstCodes = objContext.Database.DifferedExecuteQuery<MT_POU_PROCEDURE_CODE>(fields, sbSql.ToString()).ToList();
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Specialty Codes Returned: " + lstCodes.Count()); }

                        return lstCodes;
                    }
                    catch (Exception ex)
                    {
                        
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() ); }
                        throw ex;
                    }                   
                }              

            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() ); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        public List<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string codeType, string code, string descr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            int intStatus = 0;

            try
            {
                List<MT_POU_SPECIALTY_CODE> lstCodes = null;

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                   
                        sbSql.Append("SELECT SPECIALTY_CODE AS CODE, DESCRIPTION, UPDATE_USER_ID, STATUS ");
                        sbSql.Append("FROM MT_POU_SPECIALTY_CODE ");
                  
                        sbSql.Append("WHERE STATUS = " + intStatus + " ");
                   

                    if (!string.IsNullOrEmpty(code))
                    {                        
                        sbSql.Append("AND SPECIALTY_CODE LIKE '%" + code + "%' ");                        

                        if (!string.IsNullOrEmpty(descr))
                        {
                            sbSql.Append("AND DESCRIPTION LIKE '%" + descr + "%' ");
                        }

                    }
                    else if (!string.IsNullOrEmpty(descr))
                    {
                        sbSql.Append("AND DESCRIPTION LIKE '%" + descr + "%' ");
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    try
                    {
                        var fields = new[] { "CODE", "DESCRIPTION", "UPDATE_USER_ID", "STATUS" };
                        lstCodes = objContext.Database.DifferedExecuteQuery<MT_POU_SPECIALTY_CODE>(fields, sbSql.ToString()).ToList();
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Specialty Codes Returned: " + lstCodes.Count()); }

                        return lstCodes;
                    }
                    catch (Exception ex)
                    {

                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                        throw ex;
                    }
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

        /// <summary>
        /// Gets the Specialty Code Details with matching search criteria for Specialty Code/Description
        /// </summary>
        /// <param name="specialityServiceCodeOrDesc"></param>
        /// <returns></returns>
        public List<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string specialityServiceCodeOrDesc)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            int intStatus = 0;

            try
            {
                List<MT_POU_SPECIALTY_CODE> lstCodes = null;

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT SPECIALTY_CODE AS CODE, DESCRIPTION, UPDATE_USER_ID, STATUS ");
                    sbSql.Append("FROM MT_POU_SPECIALTY_CODE ");
                    sbSql.Append("WHERE STATUS = " + intStatus + " ");
                    sbSql.Append("AND (SPECIALTY_CODE LIKE '%" + specialityServiceCodeOrDesc + "%' OR DESCRIPTION LIKE '%" + specialityServiceCodeOrDesc + "%')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql)); }
                    }

                    var fields = new[] { "CODE", "DESCRIPTION", "UPDATE_USER_ID", "STATUS" };
                    lstCodes = objContext.Database.DifferedExecuteQuery<MT_POU_SPECIALTY_CODE>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Specialty Codes Returned: " + lstCodes.Count()); }

                    return lstCodes;
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

        /// <summary>
        /// Used to delete the specialty codes
        /// </summary>
        /// <param name="codeType"></param>
        /// <param name="code"></param>
        /// <param name="descr"></param>
        /// <returns></returns>
        public long DeleteCodes(string codeType,string code = "", string descr = "")
        {            
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            
            string _strSQL = null, _infoMsg = null;
            int intStatus = 1;
            
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (codeType.ToUpper() == AtParDefns.POU_Setup_SPECIALTY.ToUpper())
                    {
                        _strSQL = "UPDATE MT_POU_SPECIALTY_CODE SET STATUS = " + intStatus + ", UPDATE_DATE = GETDATE() WHERE SPECIALTY_CODE = '" + code + "'";
                        _infoMsg = " Updating the specialty codes status to inactive with the following SQL.... " + _strSQL;
                    }
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(_strSQL);
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " " + _infoMsg + " " + count); }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                _strSQL = null;
            }           
        }
        /// <summary>
        /// Used to add the specialty codes
        /// </summary>
        /// <param name="codeType"></param>
        /// <param name="pUserId"></param>
        /// <param name="code"></param>
        /// <param name="descr"></param>
        /// <param name="specCode"></param>
        /// <returns></returns>
        public long AddCodes(string codeType, string userId, string code = "", string descr = "", string specCode = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = null;
            int intStatus = 0;
            long _count = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (codeType.ToUpper() == AtParDefns.POU_Setup_SPECIALTY.ToUpper())
                    {
                        _strSQL = "SELECT COUNT(*) FROM MT_POU_SPECIALTY_CODE " + "WHERE SPECIALTY_CODE = '" + code + "' AND STATUS = 1 ";
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "  Getting the Specialty/Service Code with the following SQL....  " + _strSQL); }
                        try
                        {                          
                           _count=objContext.Database.SqlQuery<int>(_strSQL.ToString()).FirstOrDefault();
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                        }

                        if (_count > 0)
                        {
                            _strSQL = "UPDATE MT_POU_SPECIALTY_CODE SET DESCRIPTION = '" + descr + "', " + "STATUS = " + intStatus + ", UPDATE_DATE = GETDATE() WHERE SPECIALTY_CODE = '" + code + "'";
                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "  Updating the Specialty/Service Codes details with the following SQL.... " + _strSQL ); }
                            try
                            {
                               objContext.Database.ExecuteSqlCommand(_strSQL);
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                            }
                            return AtparStatusCodes.ATPAR_OK;                            
                        }
                        else
                        {
                            _strSQL = "INSERT INTO MT_POU_SPECIALTY_CODE(SPECIALTY_CODE, DESCRIPTION, UPDATE_DATE," + " UPDATE_USER_ID, STATUS) VALUES('" + code + "', '" + descr + "', GETDATE(), " + "'" + userId + "', " + intStatus + ")";
                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Inserting the Specialty/Service Codes with the following SQL....  " + _strSQL ); }

                            try
                            {
                                objContext.Database.ExecuteSqlCommand(_strSQL);
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                            }
                           
                        }
                       
                    }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _strSQL = null;
            }            

        }

        /// <summary>
        /// Used to update the specialty codes
        /// </summary>
        /// <param name="codeType"></param>
        /// <param name="code"></param>
        /// <param name="descr"></param>
        /// <param name="specCode"></param>
        /// <returns></returns>
        public long UpdateCodes(string codeType,  string code = "", string descr = "", string specCode = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }    
            string _strSQL = null;
            int intStatus = 0;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    if (codeType.ToUpper() == AtParDefns.POU_Setup_SPECIALTY.ToUpper())
                    {
                        _strSQL = "UPDATE MT_POU_SPECIALTY_CODE SET SPECIALTY_CODE = '" + code + "', DESCRIPTION ='" + descr + "'," + " UPDATE_DATE=getdate(),STATUS=" + intStatus + " WHERE SPECIALTY_CODE='" + code + "'";
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    try
                    {
                       var count= objContext.Database.ExecuteSqlCommand(_strSQL);
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }
                    }
                   catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }               
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }
        
    }
}
