using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AtPar.POU.Repos
{
    public class PreferenceListsRepository : IPreferenceListsRepository
    {
        private ILog _log;

        public PreferenceListsRepository(ILog log)
        {
            this._log = log;
        }

        #region AddPreferenceListHeader
        public long AddPreferenceListHeader(string prefListID, string prefListDesc, string deptID, string userID, string procedureID, string physicianID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _SqlStr = new StringBuilder();
            long count = -1;
            int noOfPrefsInserted = 0;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    count = GetPreferenceList(prefListID, procedureID, objContext);
                    if (count > 0)
                    {
                        return AtparStatusCodes.S_PREF_LIST_EXIST;
                    }
                    else
                    {
                        _SqlStr.Append("INSERT INTO MT_POU_PREF_LIST_HEADER(PREF_LIST_ID, PREF_LIST_DESCR, DEPARTMENT_ID, ");
                        _SqlStr.Append("UPDATE_DATE, UPDATE_USERID, PROCEDURE_ID, PHYSICIAN_ID,STATUS)");
                        _SqlStr.Append(" VALUES('" + prefListID + "','" + prefListDesc + "','" + deptID + "',GETDATE(),'" + userID + "', ");
                        _SqlStr.Append("'" + procedureID + "','" + physicianID + "','" + 0 + "')");

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Inserting into the Preference List Header with the following SQL...." + _SqlStr); }
                    }
                    try
                    {
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _SqlStr.ToString() + ":")); }
                        }
                        noOfPrefsInserted = objContext.Database.ExecuteSqlCommand(_SqlStr.ToString());
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _SqlStr.ToString()); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.of rows Inserted " + noOfPrefsInserted); }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _SqlStr.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _SqlStr = null;
            }
        }
        #endregion

        #region GetPreferenceList
        private long GetPreferenceList(string prefListID, string procedureID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string SqlStr = string.Empty;
            List<string> lstPrefListHeader = new List<string>();

            SqlStr = "SELECT PREF_LIST_ID FROM MT_POU_PREF_LIST_HEADER WHERE PREF_LIST_ID='" + prefListID + "' AND PROCEDURE_ID='" + procedureID + "'";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Getting the Preference List with the following SQL...." + SqlStr); }
            try
            {
                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + SqlStr.ToString() + ":")); }
                }
                lstPrefListHeader = objContext.Database.SqlQuery<string>(SqlStr.ToString()).ToList();
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + SqlStr.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                SqlStr = string.Empty;
            }
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records returned : " + lstPrefListHeader.Count()); }
            return lstPrefListHeader.Count();
        }
        #endregion

        #region DeletePreferenceList
        public long DeletePreferenceList(string prefListID, string procedureID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _SqlStr = string.Empty;
            long recordsDel = 0;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    _SqlStr = "DELETE MT_POU_PREF_LIST_HEADER WHERE PREF_LIST_ID='" + prefListID + "' AND PROCEDURE_ID='" + procedureID + "'";
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Deleting the preference list header with the following SQL...." + _SqlStr); }
                    try
                    {
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _SqlStr.ToString() + ":")); }
                        }
                        recordsDel = objContext.Database.ExecuteSqlCommand(_SqlStr);
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.of rows Deleted in the MT_POU_PREF_LIST_HEADER:" + recordsDel); }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _SqlStr.ToString()); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                    finally
                    {
                        _SqlStr = string.Empty;
                        recordsDel = 0;
                    }
                    _SqlStr = "DELETE MT_POU_PREF_LIST_ALLOC WHERE PREF_LIST_ID='" + prefListID + "' AND PROCEDURE_ID='" + procedureID + "'";
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Deleting the item in the preference list with the following SQL...." + _SqlStr + "\r\n"); }
                    try
                    {
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _SqlStr.ToString() + ":")); }
                        }
                        recordsDel = objContext.Database.ExecuteSqlCommand(_SqlStr);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _SqlStr.ToString()); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.of rows Deleted in the MT_POU_PREF_LIST_ALLOC: " + recordsDel); }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _SqlStr.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _SqlStr = string.Empty;
                recordsDel = 0;
            }
        }
        #endregion

        #region DisablePrefList
        public long DisablePrefList(string prefListID, string procedureID, string status, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _SqlStr = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    _SqlStr.Append("UPDATE MT_POU_PREF_LIST_HEADER SET STATUS ='" + status + "',");
                    _SqlStr.Append(" UPDATE_DATE = GETDATE(), UPDATE_USERID='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");
                    _SqlStr.Append(" WHERE PREF_LIST_ID='" + prefListID + "' AND PROCEDURE_ID='" + procedureID + "'");

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Updating the preference list header with the following SQL...." + _SqlStr); }
                    try
                    {
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _SqlStr.ToString() + ":")); }
                        }
                        objContext.Database.ExecuteSqlCommand(_SqlStr.ToString());
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _SqlStr.ToString()); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                    }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _SqlStr.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _SqlStr = null;
            }
        }
        #endregion

        #region UpdatePreferenceListItem
        public long UpdatePreferenceListItem(string prefListID, string procedureID, string itemID, string itemQty, string holdQty, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _Sql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    _Sql.Append("UPDATE MT_POU_PREF_LIST_ALLOC SET QUANTITY = '" + itemQty + "',");
                    _Sql.Append(" HOLD_QTY = '" + holdQty + "' WHERE PREF_LIST_ID = '" + prefListID + "'");
                    _Sql.Append(" AND ITEM_ID = '" + itemID + "' AND PROCEDURE_ID = '" + procedureID + "'");
                    _Sql.Append("  UPDATE MT_POU_PREF_LIST_HEADER SET");
                    _Sql.Append(" UPDATE_DATE = GETDATE(), UPDATE_USERID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "'");
                    _Sql.Append(" WHERE PREF_LIST_ID = '" + prefListID + "' AND PROCEDURE_ID = '" + procedureID + "'");

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Updating the item quantity in the preference list with the following SQL...." + _Sql); }
                    try
                    {
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _Sql.ToString() + ":")); }
                        }
                        objContext.Database.ExecuteSqlCommand(_Sql.ToString());
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _Sql.ToString()); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                    }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _Sql.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _Sql = null;
            }
        }
        #endregion

        #region AddPreferenceListItem
        public long AddPreferenceListItem(string prefListID, string procedureID, string itemID, string itemDesc, string itemQty, string holdQty, string userID, string custItemNo)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _Sql = new StringBuilder();
            long ItemCount = 0;
            try
            {
                if (itemQty == null || string.IsNullOrEmpty(itemQty))
                {
                    itemQty = "0";
                }
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

                    ItemCount = GetPrefListItemID(prefListID, procedureID, itemID, objContext);
                    if (ItemCount > 0)
                    {
                        //_Sql.Append("UPDATE MT_POU_PREF_LIST_ALLOC SET STATUS = 0 WHERE PREF_LIST_ID = '" + prefListID + "'");
                        //_Sql.Append(" AND ITEM_ID='" + itemID + "' AND PROCEDURE_ID='" + procedureID + "'");
                        //_Sql.Append("  UPDATE MT_POU_PREF_LIST_HEADER SET UPDATE_DATE = GETDATE(), UPDATE_USERID ='" + userID + "'");
                        //_Sql.Append(" WHERE PREF_LIST_ID = '" + prefListID + "' AND PROCEDURE_ID = '" + procedureID + "'");

                        //if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Updating the items in the preference list with the following SQL...." + _Sql); }
                        //try
                        //{
                        //    if (!_log.IsDebugEnabled)
                        //    {
                        //        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _Sql.ToString() + ":")); }
                        //    }
                        //    objContext.Database.ExecuteSqlCommand(_Sql.ToString());
                        //}
                        //catch (Exception ex)
                        //{
                        //    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _Sql.ToString()); }
                        //    return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        //}

                        //item already added
                        return AtparStatusCodes.ATPAR_E_ALREADY_EXISTS;
                    }
                    else
                    {
                        _Sql.Append("INSERT INTO MT_POU_PREF_LIST_ALLOC(PREF_LIST_ID, ITEM_ID, PROCEDURE_ID, ITEM_DESCR, QUANTITY, HOLD_QTY, UPDATE_DATE, UPDATE_USERID, CUST_ITEM_NO)");
                        _Sql.Append(" VALUES('" + prefListID + "', '" + itemID + "', '" + procedureID + "', '" + itemDesc.substituteString() + "'");
                        _Sql.Append(", '" + itemQty + "', '" + holdQty + "', GETDATE(), '" + userID + "', '" + custItemNo + "')");
                        _Sql.Append("  UPDATE MT_POU_PREF_LIST_HEADER SET UPDATE_DATE=GETDATE(), UPDATE_USERID ='" + userID + "' WHERE PREF_LIST_ID = '" + prefListID + "' AND PROCEDURE_ID = '" + procedureID + "'");

                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Inserting the items into the preference list with the following SQL...." + _Sql + "\r\n"); }
                        try
                        {
                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _Sql.ToString() + ":")); }
                            }
                          var count=  objContext.Database.ExecuteSqlCommand(_Sql.ToString());
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _Sql.ToString()); }
                            return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                        }
                    }
                   
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _Sql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _Sql = null;
            }
        }
        #endregion

        #region GetPrefListItemID
        private long GetPrefListItemID(string prefListID, string procedureID, string itemID, ATPAR_MT_Context atparContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _SqlStr = string.Empty;
            List<string> lstItemId = new List<string>();
            try
            {
                _SqlStr = "SELECT ITEM_ID FROM MT_POU_PREF_LIST_ALLOC WHERE PREF_LIST_ID='" + prefListID + "' AND ITEM_ID='" + itemID + "' AND PROCEDURE_ID='" + procedureID + "'";

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Getting the item in the preference list with the following SQL...." + _SqlStr); }

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { atparContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _SqlStr.ToString() + ":")); }
                }

                lstItemId = atparContext.Database.SqlQuery<string>(_SqlStr).ToList();
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _SqlStr.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
            finally
            {
                _SqlStr = string.Empty;
            }
            return lstItemId.Count();
        }
        #endregion

        #region DeletePreferenceListItem
        public long DeletePreferenceListItem(string prefListID, string procedureID, string itemID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _Sql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }
                    _Sql.Append("DELETE FROM MT_POU_PREF_LIST_ALLOC WHERE PREF_LIST_ID = '" + prefListID + "'");
                    _Sql.Append(" AND ITEM_ID = '" + itemID + "' AND PROCEDURE_ID = '" + procedureID + "'");
                    _Sql.Append("  UPDATE MT_POU_PREF_LIST_HEADER SET UPDATE_DATE = GETDATE() , UPDATE_USERID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "' ");
                    _Sql.Append(" WHERE PREF_LIST_ID = '" + prefListID + "' AND PROCEDURE_ID = '" + procedureID + "'");

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Unallocating the items in the preference list with the following SQL...." + _Sql); }
                    try
                    {
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _Sql.ToString() + ":")); }
                        }

                        objContext.Database.ExecuteSqlCommand(_Sql.ToString());
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _Sql.ToString()); }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _Sql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _Sql = null;
            }
        }
        #endregion
    }
}
