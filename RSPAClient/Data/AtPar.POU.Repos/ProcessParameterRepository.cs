using AtPar.Repository.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using log4net;
using AtPar.Common;
using AtPar.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json;
//using System.Web.Script.Serialization;
//using Newtonsoft.Json;

namespace AtPar.POU.Repos
{
    public class ProcessParameterRepository : IProcessParameterRepository
    {
        ILog _log;
        public ProcessParameterRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ProcessParameterRepository));
        }

        public long AssignAlertSchedules(List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> lstCartSchedules, int appID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {

                            foreach (var lstItem in lstCartSchedules)
                            {
                                _sbSQL.Append("DELETE FROM MT_POU_PAR_LOC_PROCESS_SCHEDULE WHERE ORG_ID = '" + lstItem.ORG_ID + "'");
                                _sbSQL.Append(" AND ID = '" + lstItem.ID + "'");
                                _sbSQL.Append(" AND APP_ID = " + appID + "");
                                _sbSQL.Append(" AND PROCESS_TYPE IN (");
                                _sbSQL.Append(((int)AtParWebEnums.Process_Type.LowStock).ToString());
                                _sbSQL.Append(" , ");
                                _sbSQL.Append(((int)AtParWebEnums.Process_Type.Expiration).ToString());
                                _sbSQL.Append(" , ");
                                _sbSQL.Append(((int)AtParWebEnums.Process_Type.Recall).ToString());
                                _sbSQL.Append(" , ");
                                _sbSQL.Append(((int)AtParWebEnums.Process_Type.BillOnly).ToString());
                                _sbSQL.Append(")");

                                try
                                {

                                    if (_log.IsInfoEnabled)
                                    {
                                        _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString());
                                    }

                                    var count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                                }
                                catch (SqlException sqlEx)
                                {
                                    trans.Rollback();
                                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }

                                    return AtparStatusCodes.E_SERVERERROR;
                                }
                                catch (Exception ex)
                                {
                                    trans.Rollback();
                                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }

                                    return AtparStatusCodes.E_SERVERERROR;
                                }
                                finally
                                {
                                    _sbSQL.Remove(0, _sbSQL.Length);
                                }

                                if (lstItem.CHK_VALUE == true)
                                {
                                    if (!string.IsNullOrEmpty(lstItem.LOW_STK_SCHEDULE_ID))
                                    {
                                        _sbSQL.Append("INSERT INTO MT_POU_PAR_LOC_PROCESS_SCHEDULE (ORG_ID, ID, ");
                                        _sbSQL.Append("SCHEDULE_ID, REVIEW_CHARGES, LAST_UPDATE_DATE, LAST_UPDATE_USER, ");
                                        _sbSQL.Append("BILLING_OPTION,PROCESS_TYPE,APP_ID) ");
                                        _sbSQL.Append("VALUES ('" + lstItem.ORG_ID + "', '" + lstItem.ID + "', ");
                                        _sbSQL.Append("'" + lstItem.LOW_STK_SCHEDULE_ID + "',");
                                        _sbSQL.Append("'" + lstItem.REVIEW_CHARGES + "', GETDATE(),");
                                        _sbSQL.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "', ");
                                        _sbSQL.Append("'" + lstItem.BILLING_OPTION + "',");
                                        _sbSQL.Append(((int)AtParWebEnums.Process_Type.LowStock) + ", ");
                                        _sbSQL.Append(appID + ") ");
                                    }

                                    if (!string.IsNullOrEmpty(lstItem.EXP_SCHEDULE_ID))
                                    {
                                        //_sbSQL.Append(Constants.vbCrLf);
                                        //_sbSQL.Append("\n");
                                        _sbSQL.Append("INSERT INTO MT_POU_PAR_LOC_PROCESS_SCHEDULE (ORG_ID, ID, ");
                                        _sbSQL.Append("SCHEDULE_ID, REVIEW_CHARGES, LAST_UPDATE_DATE, LAST_UPDATE_USER, ");
                                        _sbSQL.Append("BILLING_OPTION,PROCESS_TYPE,APP_ID) ");
                                        _sbSQL.Append("VALUES ('" + lstItem.ORG_ID + "', '" + lstItem.ID + "', ");
                                        _sbSQL.Append("'" + lstItem.EXP_SCHEDULE_ID + "',");
                                        _sbSQL.Append("'" + lstItem.REVIEW_CHARGES + "', GETDATE(),");
                                        _sbSQL.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "', ");
                                        _sbSQL.Append("'" + lstItem.BILLING_OPTION + "',");
                                        _sbSQL.Append(((int)AtParWebEnums.Process_Type.Expiration) + ", ");
                                        _sbSQL.Append(appID + ") ");
                                    }

                                    if (!string.IsNullOrEmpty(lstItem.RECALL_SCHEDULE_ID))
                                    {
                                        //_sbSQL.Append("\n");
                                        _sbSQL.Append("INSERT INTO MT_POU_PAR_LOC_PROCESS_SCHEDULE (ORG_ID, ID, ");
                                        _sbSQL.Append("SCHEDULE_ID, REVIEW_CHARGES, LAST_UPDATE_DATE, LAST_UPDATE_USER, ");
                                        _sbSQL.Append("BILLING_OPTION,PROCESS_TYPE,APP_ID) ");
                                        _sbSQL.Append("VALUES ('" + lstItem.ORG_ID + "', '" + lstItem.ID + "', ");
                                        _sbSQL.Append("'" + lstItem.RECALL_SCHEDULE_ID + "',");
                                        _sbSQL.Append("'" + lstItem.REVIEW_CHARGES + "', GETDATE(), ");
                                        _sbSQL.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "', ");
                                        _sbSQL.Append("'" + lstItem.BILLING_OPTION + "',");
                                        _sbSQL.Append(((int)AtParWebEnums.Process_Type.Recall) + ", ");
                                        _sbSQL.Append(appID + ") ");
                                    }

                                    if (!string.IsNullOrEmpty(lstItem.BILLONLY_SCHEDULE_ID))
                                    {
                                        //_sbSQL.Append("\n");
                                        _sbSQL.Append("INSERT INTO MT_POU_PAR_LOC_PROCESS_SCHEDULE (ORG_ID, ID, ");
                                        _sbSQL.Append("SCHEDULE_ID, REVIEW_CHARGES, LAST_UPDATE_DATE, LAST_UPDATE_USER, ");
                                        _sbSQL.Append("BILLING_OPTION,PROCESS_TYPE,APP_ID) ");
                                        _sbSQL.Append("VALUES ('" + lstItem.ORG_ID + "', '" + lstItem.ID + "', ");
                                        _sbSQL.Append("'" + lstItem.BILLONLY_SCHEDULE_ID + "',");
                                        _sbSQL.Append("'" + lstItem.REVIEW_CHARGES + "', GETDATE(), ");
                                        _sbSQL.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString() + "', ");
                                        _sbSQL.Append("'" + lstItem.BILLING_OPTION + "',");
                                        _sbSQL.Append(((int)AtParWebEnums.Process_Type.BillOnly) + ", ");
                                        _sbSQL.Append(appID + ") ");
                                    }

                                    try
                                    {
                                        if (_log.IsInfoEnabled)
                                        {
                                            _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString());
                                        }
                                        var count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                                    }
                                    catch (SqlException sqlEx)
                                    {
                                        trans.Rollback();
                                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }

                                        return AtparStatusCodes.E_SERVERERROR;
                                    }
                                    catch (Exception ex)
                                    {
                                        trans.Rollback();
                                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                                        return AtparStatusCodes.E_SERVERERROR;
                                    }
                                    finally
                                    {
                                        _sbSQL.Remove(0, _sbSQL.Length);
                                    }

                                }

                            }

                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            trans.Rollback();
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        public long AssignScheduleToCarts(Dictionary<string, dynamic> dsAssignSchedule, string strBunit, string strUserId, int appID,
                                          string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSQL = null;
            StringBuilder _sbSQLReplenish = null;

            try
            {
                List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> lstParLocProcessSchedules = null;
                List<MT_POU_REPLEN_SOURCE_LOCATION> lstPouReplanLocation = null;

                lstParLocProcessSchedules = JsonConvert.DeserializeObject<List<MT_POU_PAR_LOC_PROCESS_SCHEDULE>>(dsAssignSchedule["lstParLocProcessSchedules"].ToString());
                var replanLocationData = dsAssignSchedule["lstPouReplanLocation"];
                if (replanLocationData != null && replanLocationData.ToString() != string.Empty)
                {
                    lstPouReplanLocation = JsonConvert.DeserializeObject<List<MT_POU_REPLEN_SOURCE_LOCATION>>(replanLocationData.ToString());
                }

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        try
                        {
                            if (lstParLocProcessSchedules != null && lstParLocProcessSchedules.Count() > 0)
                            {
                                foreach (var deleteItem in lstParLocProcessSchedules)
                                {
                                    _sbSQLReplenish = new StringBuilder();

                                    if (deleteItem.REPLENISH_FROM == null)
                                    {
                                        continue;
                                    }

                                    if (deleteItem.REPLENISH_FROM == null)
                                    {
                                        continue;
                                    }
                                    if (deleteItem.REPLENISH_FROM != 1 & !string.IsNullOrEmpty(deleteItem.SOURCELOCATIONS))
                                    {
                                        _sbSQLReplenish.Append("DELETE FROM MT_POU_REPLEN_SOURCE_LOCATION  where ");
                                        _sbSQLReplenish.Append("ORG_ID = '" + strBunit + "' AND ");
                                        _sbSQLReplenish.Append("PAR_LOC_ID = '" + deleteItem.ID + "'");
                                    }
                                    else
                                    {
                                        continue;
                                    }

                                    try
                                    {
                                        if (_log.IsInfoEnabled)
                                        {
                                            _log.Info(methodBaseName + Globals.QUERY + _sbSQLReplenish.ToString());
                                        }

                                        var count = objContext.Database.ExecuteSqlCommand(_sbSQLReplenish.ToString());

                                    }
                                    catch (SqlException sqlEx)
                                    {
                                        trans.Rollback();
                                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQLReplenish.ToString() + ":"); }

                                        return AtparStatusCodes.E_SERVERERROR;
                                    }
                                    catch (Exception ex)
                                    {
                                        trans.Rollback();
                                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQLReplenish.ToString() + ":"); }

                                        return AtparStatusCodes.E_SERVERERROR;
                                    }
                                    finally
                                    {
                                        _sbSQLReplenish.Remove(0, _sbSQLReplenish.Length);
                                    }

                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        finally
                        {
                            _sbSQLReplenish = null;
                        }

                        try
                        {
                            if (lstParLocProcessSchedules != null && lstParLocProcessSchedules.Count() > 0)
                            {
                                foreach (var item in lstParLocProcessSchedules)
                                {
                                    _sbSQL = new StringBuilder();
                                    _sbSQL.Append("DELETE FROM MT_POU_PAR_LOC_PROCESS_SCHEDULE WHERE ORG_ID = '" + strBunit + "' ");
                                    _sbSQL.Append("AND ID = '" + item.ID + "' ");
                                    _sbSQL.Append("AND APP_ID =" + appID + " ");

                                    if (item.PROCESS_TYPE == Convert.ToInt16(((int)AtParWebEnums.Process_Type.Alert)))
                                    {
                                        _sbSQL.Append("AND PROCESS_TYPE IN (");
                                        _sbSQL.Append(((int)AtParWebEnums.Process_Type.LowStock));
                                        _sbSQL.Append(",");
                                        _sbSQL.Append(((int)AtParWebEnums.Process_Type.Expiration));
                                        _sbSQL.Append(",");
                                        _sbSQL.Append(((int)AtParWebEnums.Process_Type.Recall));
                                        _sbSQL.Append(",");
                                        _sbSQL.Append(((int)AtParWebEnums.Process_Type.BillOnly));
                                        _sbSQL.Append(")");
                                    }
                                    else
                                    {
                                        _sbSQL.Append("AND PROCESS_TYPE =");
                                        _sbSQL.Append(item.PROCESS_TYPE);
                                    }

                                    try
                                    {
                                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString()); }

                                        var count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());

                                    }
                                    catch (SqlException sqlEx)
                                    {
                                        trans.Rollback();
                                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }

                                        return AtparStatusCodes.E_SERVERERROR;
                                    }
                                    catch (Exception ex)
                                    {
                                        trans.Rollback();
                                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }

                                        return AtparStatusCodes.E_SERVERERROR;
                                    }
                                    finally
                                    {
                                        _sbSQL.Remove(0, _sbSQL.Length);
                                    }

                                    if (item.CHK_VALUE == true)
                                    {
                                        _sbSQL = new StringBuilder();
                                        _sbSQL.Append("INSERT INTO MT_POU_PAR_LOC_PROCESS_SCHEDULE (ORG_ID, ID, ");
                                        _sbSQL.Append("SCHEDULE_ID,");
                                        _sbSQL.Append("REVIEW_CHARGES, LAST_UPDATE_DATE, LAST_UPDATE_USER, BILLING_OPTION,PROCESS_TYPE,APP_ID ");
                                        if (item.PROCESS_TYPE == Convert.ToInt16(((int)AtParWebEnums.Process_Type.Replenishment)))
                                        {
                                            _sbSQL.Append(", REPLENISH_FROM ");
                                        }
                                        _sbSQL.Append(") VALUES ('" + strBunit + "', '" + item.ID + "', ");
                                        _sbSQL.Append("'" + item.SCHEDULE_ID + "',");
                                        _sbSQL.Append("'" + item.REVIEW_CHARGES + "', GETDATE(), '" + strUserId + "', ");
                                        _sbSQL.Append("'" + item.BILLING_OPTION + "',");
                                        _sbSQL.Append(item.PROCESS_TYPE + ", ");
                                        _sbSQL.Append(appID);
                                        if (item.PROCESS_TYPE == Convert.ToInt16(((int)AtParWebEnums.Process_Type.Replenishment)))
                                        {
                                            _sbSQL.Append("," + item.REPLENISH_FROM);
                                        }
                                        _sbSQL.Append(")");

                                        try
                                        {
                                            if (_log.IsInfoEnabled)
                                            {
                                                _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString());
                                            }

                                            var count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                                        }
                                        catch (SqlException sqlEx)
                                        {
                                            trans.Rollback();
                                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }

                                            return AtparStatusCodes.E_SERVERERROR;
                                        }
                                        catch (Exception ex)
                                        {
                                            trans.Rollback();
                                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                                            return AtparStatusCodes.E_SERVERERROR;
                                        }
                                        finally
                                        {
                                            _sbSQL.Remove(0, _sbSQL.Length);
                                        }

                                    }
                                }
                            }

                            string _strOrgId = string.Empty;
                            string _strLocGroupId = string.Empty;
                            string _strLocId = string.Empty;
                            string _strSourceOrgId = string.Empty;
                            string _strSQL = string.Empty;
                            string _strSqlForCheck = string.Empty;

                            if (lstPouReplanLocation != null && lstPouReplanLocation.Count() > 0)
                            {
                                //foreach (var item in lstPouReplanLocation)
                                //{
                                //    _strSQL = string.Empty;
                                //    _strOrgId = string.Empty;
                                //    _strOrgId = item.ORG_ID.ReplaceNullwithEmpty();//M_BUSINESS_UNIT
                                //    _strLocGroupId = string.Empty;
                                //    _strLocGroupId = item.PAR_LOC_ID.ReplaceNullwithEmpty();//M_LOCATION
                                //    _strLocId = string.Empty;
                                //    _strLocId = item.LOCATION.ReplaceNullwithEmpty();
                                //    _strSourceOrgId = string.Empty;
                                //    _strSourceOrgId = item.BUSINESS_UNIT.ReplaceNullwithEmpty();

                                //    _strSQL = " DELETE FROM MT_POU_REPLEN_SOURCE_LOCATION  WHERE PAR_LOC_ID = '" + _strLocGroupId + "' ";

                                //    if (!string.IsNullOrEmpty(_strOrgId))
                                //    {
                                //        _strSQL += " AND ORG_ID='" + _strOrgId + "' AND ORG_GROUP_ID='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "'";
                                //    }

                                //    try
                                //    {
                                //        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + _strSQL.ToString()); }

                                //        var count = objContext.Database.ExecuteSqlCommand(_strSQL.ToString());
                                //    }
                                //    catch (Exception ex)
                                //    {
                                //        trans.Rollback();
                                //        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString() + ":"); }

                                //        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                                //    }
                                //}

                                foreach (var item in lstPouReplanLocation)
                                {
                                    _sbSQL = new StringBuilder();
                                    if (item.PERFORM_ACTION.ReplaceNullwithEmpty() == "2")
                                    {
                                        continue;
                                    }
                                    _strOrgId = string.Empty;
                                    _strOrgId = item.ORG_ID.ReplaceNullwithEmpty();//M_BUSINESS_UNIT
                                    _strLocGroupId = string.Empty;
                                    _strLocGroupId = item.PAR_LOC_ID.ReplaceNullwithEmpty(); //== "" ? item.M_LOCATION : item.PAR_LOC_ID;;// M_LOCATION
                                    _strLocId = string.Empty;
                                    _strLocId = item.SOURCE_LOCATION.ReplaceNullwithEmpty();// == "" ? item.LOCATION : item.SOURCE_LOCATION; ;//LOCATION
                                    _strSourceOrgId = string.Empty;
                                    _strSourceOrgId = item.SOURCE_ORG_ID.ReplaceNullwithEmpty();//BUSINESS_UNIT

                                    bool blnChckValue = false;
                                    blnChckValue = item.CHK_VALUE;
                                    _strSQL = " DELETE FROM MT_POU_REPLEN_SOURCE_LOCATION  WHERE PAR_LOC_ID = '" + _strLocGroupId + "' ";

                                    if (!string.IsNullOrEmpty(_strOrgId))
                                    {
                                        _strSQL += " AND ORG_ID='" + _strOrgId + "' AND ORG_GROUP_ID='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "'";
                                    }
                                    if (!string.IsNullOrEmpty(_strLocId))
                                    {
                                        _strSQL += " AND SOURCE_LOCATION='" + _strLocId + "'";
                                    }
                                    if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + _strSQL.ToString()); }

                                    var deletecount = objContext.Database.ExecuteSqlCommand(_strSQL.ToString());


                                    //if (_strOrgId != string.Empty)
                                    //{
                                    if (blnChckValue)
                                    {

                                        _sbSQL.Append("INSERT INTO MT_POU_REPLEN_SOURCE_LOCATION(");
                                        _sbSQL.Append("ORG_ID, ");
                                        _sbSQL.Append("PAR_LOC_ID, ");
                                        _sbSQL.Append("SOURCE_LOCATION, ");
                                        _sbSQL.Append("SOURCE_ORG_ID, ");
                                        _sbSQL.Append("ORG_GROUP_ID) ");
                                        _sbSQL.Append("VALUES(");
                                        _sbSQL.Append("'" + _strOrgId + "',");
                                        _sbSQL.Append("'" + _strLocGroupId + "',");
                                        _sbSQL.Append("'" + _strLocId + "',");
                                        _sbSQL.Append("'" + _strSourceOrgId + "',");
                                        _sbSQL.Append("'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "')");

                                        try
                                        {
                                            if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString()); }

                                            var count = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());
                                        }
                                        catch (Exception ex)
                                        {
                                            trans.Rollback();
                                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                                            return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                                        }
                                        finally
                                        {
                                            _sbSQL.Remove(0, _sbSQL.Length);
                                        }
                                    }
                                    // }


                                }
                            }
                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }
                        catch (Exception ex)
                        {
                            trans.Rollback();
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        public Tuple<List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>, long> GetAllocDepartment(string departmentID, string bUnit, int appID,
                                                                                              string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstDepartments = null;
            long severStatusCode = -1;
            Tuple<List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>, long> tupleResult = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    try
                    {
                        lstDepartments = GetAllocatedDepartment(departmentID, bUnit, appID, deviceTokenEntry, objContext);

                        if (lstDepartments.Count() == 0)
                        {
                            if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + ":No Departments assigned to Org ID:" + bUnit); }
                            severStatusCode = AtparStatusCodes.E_NORECORDFOUND;
                        }
                        else
                        {
                            severStatusCode = GetDeptCount(departmentID, bUnit, appID, deviceTokenEntry, objContext);
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        severStatusCode = AtparStatusCodes.E_SERVERERROR;
                    }

                }
                tupleResult = new Tuple<List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>, long>(lstDepartments, severStatusCode);
                return tupleResult;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }

                throw ex;
            }


        }

        public Tuple<List<MT_POU_PAR_LOC_PROCESS_SCHEDULE>, List<MT_POU_REPLEN_SOURCE_LOCATION>, long> GetCartSchedules(string strBunit,
                                                 string strCartID, string strUserId, string procType, int appID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> lstParLocProcessSchedules = null;
            List<MT_POU_REPLEN_SOURCE_LOCATION> replenSourceLoc = null;
            long statusCode = -1;
            Tuple<List<MT_POU_PAR_LOC_PROCESS_SCHEDULE>, List<MT_POU_REPLEN_SOURCE_LOCATION>, long> tupleResult = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    try
                    {
                        lstParLocProcessSchedules = GetParLocProcessSchedules(strBunit, strCartID,
                                                      procType, appID, objContext);

                        replenSourceLoc = GetReplenSourceLocation("", objContext);

                        if (lstParLocProcessSchedules == null || replenSourceLoc == null)
                        {
                            statusCode = AtparStatusCodes.E_SERVERERROR;
                        }
                        else
                        {
                            statusCode = AtparStatusCodes.ATPAR_OK;
                        }

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        statusCode = AtparStatusCodes.E_SERVERERROR;
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                statusCode = AtparStatusCodes.E_SERVERERROR;
            }

            tupleResult = new Tuple<List<MT_POU_PAR_LOC_PROCESS_SCHEDULE>, List<MT_POU_REPLEN_SOURCE_LOCATION>, long>(lstParLocProcessSchedules, replenSourceLoc, statusCode);

            return tupleResult;
        }

        public Tuple<List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>, List<MT_POU_REPLEN_SOURCE_LOCATION>, long> GetDeptAllocatedCarts(string departmentID,
                         string strUserId, string strBunit, string strCartID, int appID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstCartDepartments = null;

            List<MT_POU_REPLEN_SOURCE_LOCATION> replenSourceLoc = null;

            long severStatusCode = -1;

            Tuple<List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>, List<MT_POU_REPLEN_SOURCE_LOCATION>, long> tupleResult = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    try
                    {
                        lstCartDepartments = GetDeptCarts(departmentID, strUserId, strBunit, strCartID,
                                                          appID, deviceTokenEntry, objContext);

                        replenSourceLoc = GetReplenSourceLocation(strBunit, objContext);

                        if (lstCartDepartments.Count() == 0)
                        {
                            if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + ":No locations assigned to Org ID: " + strBunit); }
                            severStatusCode = AtparStatusCodes.E_NORECORDFOUND;
                        }
                        else
                        {
                            severStatusCode = GetCartsDeptCount(departmentID, strBunit, appID, deviceTokenEntry, objContext);
                        }

                        tupleResult = new Tuple<List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>, List<MT_POU_REPLEN_SOURCE_LOCATION>, long>(lstCartDepartments, replenSourceLoc, severStatusCode);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                        throw ex;
                    }

                }

                return tupleResult;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }

                throw ex;
            }

        }

        public List<MT_ATPAR_SCHEDULE_HEADER> GetSheduleIDs(string userId, string strOrgGroupID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _strSQL = new StringBuilder();
            try
            {

                List<MT_ATPAR_SCHEDULE_HEADER> lstScheduleHdr = null;

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    _strSQL.Append("SELECT ORG_GROUP_ID, SCHEDULE_ID, DESCRIPTION FROM MT_ATPAR_SCHEDULE_HEADER");

                    if (strOrgGroupID != "All")
                    {
                        _strSQL.Append(" WHERE ORG_GROUP_ID='" + strOrgGroupID + "'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + _strSQL.ToString() + ":"); }
                    }
                    try
                    {
                        var fields = new[] { "ORG_GROUP_ID", "SCHEDULE_ID", "DESCRIPTION" };
                        lstScheduleHdr = objContext.Database.DifferedExecuteQuery<MT_ATPAR_SCHEDULE_HEADER>(fields, _strSQL.ToString()).ToList();

                        return lstScheduleHdr;
                    }
                    catch (Exception ex)
                    {

                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString() + ":");
                        }
                        throw ex;
                    }
                }


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }

                throw ex;
            }

        }

        public List<MT_POU_REPLEN_SOURCE_LOCATION> GetAssignedLocationDetails(string pLocGroupId, string pBUnit, string pOrgGrpID, string pLocationOrgId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _strSQL = new StringBuilder();
            List<MT_POU_REPLEN_SOURCE_LOCATION> lstReplenSourceLocations = null;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _strSQL.Append("SELECT ORG_ID,PAR_LOC_ID,SOURCE_LOCATION,SOURCE_ORG_ID,ORG_GROUP_ID FROM MT_POU_REPLEN_SOURCE_LOCATION ");

                    if (!string.IsNullOrEmpty(pLocGroupId))
                    {
                        _strSQL.Append(" WHERE PAR_LOC_ID = '" + pLocGroupId + "'");
                    }
                    if (!string.IsNullOrEmpty(pLocationOrgId))
                    {
                        _strSQL.Append(" AND  ORG_ID = '" + pLocationOrgId + "'");
                    }
                    if (!string.IsNullOrEmpty(pBUnit))
                    {
                        _strSQL.Append(" AND  SOURCE_ORG_ID = '" + pBUnit + "'");
                    }
                    if (!string.IsNullOrEmpty(pBUnit))
                    {
                        _strSQL.Append(" AND  ORG_GROUP_ID = '" + pOrgGrpID + "'");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { _log.Info(methodBaseName + Globals.QUERY + _strSQL.ToString() + ":"); }
                    }
                    try
                    {
                        var fields = new[] { "ORG_ID", "PAR_LOC_ID", "SOURCE_LOCATION", "SOURCE_ORG_ID", "ORG_GROUP_ID" };
                        lstReplenSourceLocations = objContext.Database.DifferedExecuteQuery<MT_POU_REPLEN_SOURCE_LOCATION>(fields, _strSQL.ToString()).ToList();

                        return lstReplenSourceLocations;
                    }
                    catch (Exception ex)
                    {

                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString() + ":");
                        }
                        throw ex;
                    }

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }

                throw ex;
            }
        }

        #region PrivateMethods

        private List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetAllocatedDepartment(string departmentID, string bUnit,
                                                               int appID, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstData = null;

            SqlParameter[] sqlParms = new SqlParameter[4];

            string _strSQL = null;

            StringBuilder _sbSQL = new StringBuilder();
            try
            {

                sqlParms[0] = new SqlParameter("@DepID", SqlDbType.NVarChar);
                sqlParms[0].Value = departmentID;

                sqlParms[1] = new SqlParameter("@BUnit", SqlDbType.NVarChar);
                sqlParms[1].Value = bUnit;

                sqlParms[2] = new SqlParameter("@OrgGroupID", SqlDbType.NVarChar);
                sqlParms[2].Value = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();

                sqlParms[3] = new SqlParameter("@AppID", SqlDbType.Int);
                sqlParms[3].Value = appID;

                string strSql = "exec GetAllocDepartment @DepID,@BUnit,@OrgGroupID,@AppID";

                //_strSQL = "exec GetAllocDepartment '" + departmentID + "', " + "'" + bUnit + "', " +
                //          "'" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString() +
                //          "', " + "'" + appID + "'";

                if (_log.IsInfoEnabled)
                {
                    _log.Info(methodBaseName + Globals.QUERY + strSql.ToString());
                }
                try
                {
                    lstData = objContext.Database.SqlQuery<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>(strSql, sqlParms).ToList();

                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return lstData;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return lstData;
                }
                finally
                {
                    _sbSQL.Remove(0, _sbSQL.Length);
                }
                return lstData;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                return lstData;
            }

        }

        private long GetDeptCount(string departmentID, string bUnit, int appID, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                int _cnt = 0;
                StringBuilder _sbSQL = new StringBuilder();

                _sbSQL.Append("SELECT COUNT(D.DEPT_ID) FROM MT_POU_DEPT D,MT_POU_DEPT_CART_ALLOCATIONS DC  ");
                _sbSQL.Append(" WHERE DC.DEPARTMENT_ID=D.DEPT_ID AND DC.ORG_GROUP_ID=D.ORG_GROUP_ID ");
                _sbSQL.Append(" AND D.BILLING_ENABLE ='Y'");
                _sbSQL.Append(" AND D.ORG_GROUP_ID = '");
                _sbSQL.Append(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]).Append("'");

                if (!string.IsNullOrEmpty(bUnit))
                {
                    _sbSQL.Append(" AND DC.BUSINESS_UNIT = '").Append(bUnit).Append("'");
                }
                if (!string.IsNullOrEmpty(departmentID))
                {
                    _sbSQL.Append(" AND DEPT_ID ='").Append(departmentID).Append("'");
                }
                _sbSQL.Append(" AND DC.APP_ID =").Append(appID);

                if (_log.IsInfoEnabled)
                {
                    _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString());
                }
                try
                {
                    _cnt = objContext.Database.SqlQuery<int>(_sbSQL.ToString()).FirstOrDefault();
                    //_cnt = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());

                    if (_cnt == 0)
                    {
                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + ":Billing is not managed in @Par for the department:"); }

                        return AtparStatusCodes.BILNG_NOT_MNGD_IN_ATPAR;
                    }
                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return AtparStatusCodes.E_SERVERERROR;
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetDeptCarts(string departmentID, string strUserId,
                string strBunit, string strCartID, int appID, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstData = null;

            StringBuilder _sbSQL = new StringBuilder();
            //strCartID = substituteString(strCartID); Check Once

            try
            {

                _sbSQL.Append("SELECT DISTINCT DC.DEPARTMENT_ID, DC.BUSINESS_UNIT, DC.CART_ID,DC.LOCATION_TYPE,");
                _sbSQL.Append("D.INV_INTERFACE_ENABLE,D.BILLING_ENABLE");
                _sbSQL.Append(" FROM MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS DC ");
                if (appID == Convert.ToInt32(AtParWebEnums.EnumApps.Pharmacy))
                {
                    _sbSQL.Append(" JOIN PAR_MNGT_PAR_LOC_HEADER H ON DC.CART_ID=H.PAR_LOC_ID AND DC.BUSINESS_UNIT =H.ORG_ID ");
                }
                _sbSQL.Append(",MT_POU_DEPT D WHERE ");
                _sbSQL.Append("DC.LOCATION_TYPE <> '").Append(AtParWebEnums.LocationType.I.ToString()).Append("'");
                _sbSQL.Append(" AND DC.DEPARTMENT_ID=D.DEPT_ID AND DC.ORG_GROUP_ID=D.ORG_GROUP_ID ");
                _sbSQL.Append(" AND DC.DEPARTMENT_ID LIKE '%" + departmentID + "%' ");
                _sbSQL.Append(" AND DC.BUSINESS_UNIT= '").Append(strBunit).Append("'");
                _sbSQL.Append(" AND DC.CART_ID LIKE '%" + strCartID + "%' ");
                if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] != "All")
                {
                    _sbSQL.Append(" AND DC.ORG_GROUP_ID = '");
                    _sbSQL.Append(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]).Append("'");
                }
                _sbSQL.Append(" AND DC.APP_ID=" + appID);
                if (appID == Convert.ToInt32(AtParWebEnums.EnumApps.Pharmacy))
                {
                    _sbSQL.Append(" AND H.PARLOC_TYPE <> 5 ");
                }

                if (_log.IsInfoEnabled)
                {
                    _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString());
                }
                try
                {
                    var fields = new[] { "DEPARTMENT_ID", "BUSINESS_UNIT", "CART_ID", "LOCATION_TYPE", "INV_INTERFACE_ENABLE", "BILLING_ENABLE" };

                    lstData = objContext.Database.DifferedExecuteQuery<VM_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>(fields, _sbSQL.ToString()).ToList(); ;

                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return lstData;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return lstData;
                }
                return lstData;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                return lstData;
            }

        }

        private List<MT_POU_REPLEN_SOURCE_LOCATION> GetReplenSourceLocation(string strBunit, ATPAR_MT_Context objContext)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_POU_REPLEN_SOURCE_LOCATION> lstData = null;

            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                _sbSQL.Append("SELECT ORG_ID,PAR_LOC_ID,SOURCE_LOCATION,SOURCE_ORG_ID,ORG_GROUP_ID from MT_POU_REPLEN_SOURCE_LOCATION ");
                if (strBunit != "")
                {
                    _sbSQL.Append("where ORG_ID='" + strBunit + "'");
                }

                if (_log.IsInfoEnabled)
                {
                    _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString());
                }
                try
                {
                    // lstData = objContext.Database.SqlQuery<MT_POU_REPLEN_SOURCE_LOCATION>(_sbSQL.ToString()).ToList();

                    var fields = new[] { "ORG_ID", "PAR_LOC_ID", "SOURCE_LOCATION", "SOURCE_ORG_ID", "ORG_GROUP_ID" };
                    lstData = objContext.Database.DifferedExecuteQuery<MT_POU_REPLEN_SOURCE_LOCATION>(fields, _sbSQL.ToString()).ToList(); ;


                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return lstData;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return lstData;
                }
                return lstData;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                return lstData;
            }

        }

        private long GetCartsDeptCount(string departmentID, string bUnit, int appID, string[] deviceTokenEntry,
                                       ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            try
            {
                int _cnt = 0;
                StringBuilder _sbSQL = new StringBuilder();

                _sbSQL.Append("SELECT COUNT(D.DEPT_ID) FROM MT_POU_DEPT D,MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS DC  ");
                if (appID == Convert.ToInt32(AtParWebEnums.EnumApps.Pharmacy))
                {
                    _sbSQL.Append(" JOIN PAR_MNGT_PAR_LOC_HEADER H ON DC.CART_ID=H.PAR_LOC_ID AND DC.BUSINESS_UNIT =H.ORG_ID ");
                }
                _sbSQL.Append(" WHERE DC.DEPARTMENT_ID=D.DEPT_ID AND DC.ORG_GROUP_ID=D.ORG_GROUP_ID ");
                _sbSQL.Append(" AND D.INV_INTERFACE_ENABLE ='Y'");
                _sbSQL.Append(" AND DC.BUSINESS_UNIT = '").Append(bUnit).Append("'");
                _sbSQL.Append(" AND D.ORG_GROUP_ID = '");
                _sbSQL.Append(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]).Append("'");
                if (!string.IsNullOrEmpty(departmentID))
                {
                    _sbSQL.Append(" AND DEPT_ID ='").Append(departmentID).Append("'");
                }
                _sbSQL.Append(" AND DC.APP_ID=" + appID);
                if (appID == Convert.ToInt32(AtParWebEnums.EnumApps.Pharmacy))
                {
                    _sbSQL.Append(" AND H.PARLOC_TYPE != 5 ");
                }

                if (_log.IsInfoEnabled)
                {
                    _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString());
                }
                try
                {
                    _cnt = objContext.Database.SqlQuery<int>(_sbSQL.ToString()).FirstOrDefault();
                    //  _cnt = objContext.Database.SqlQuery<Int16>(_sbSQL.ToString());//ExecuteSqlCommand

                    if (_cnt == 0 || _cnt == -1)
                    {
                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + ":Billing is not managed in @Par for the department:"); }

                        return AtparStatusCodes.INV_NOT_MNGD_IN_ATPAR;
                    }
                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return AtparStatusCodes.E_SERVERERROR;
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> GetParLocProcessSchedules(string strBunit, string strCartID,
                                                      string procType, int appID, ATPAR_MT_Context objContext)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<MT_POU_PAR_LOC_PROCESS_SCHEDULE> lstData = null;

            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                _sbSQL.Append("SELECT ORG_ID, ID, SCHEDULE_ID, REVIEW_CHARGES, BILLING_OPTION,PROCESS_TYPE,REPLENISH_FROM  ");
                _sbSQL.Append("FROM MT_POU_PAR_LOC_PROCESS_SCHEDULE WHERE APP_ID = " + appID + " ");

                if (procType == ((int)AtParWebEnums.Process_Type.Replenishment).ToString())
                {
                    _sbSQL.Append(" AND PROCESS_TYPE = ");
                    _sbSQL.Append(((int)AtParWebEnums.Process_Type.Replenishment));
                }
                else if (procType == ((int)AtParWebEnums.Process_Type.Billing).ToString())
                {
                    _sbSQL.Append("AND PROCESS_TYPE = ");
                    _sbSQL.Append(((int)AtParWebEnums.Process_Type.Billing));
                }
                else if (procType == ((int)AtParWebEnums.Process_Type.Alerts).ToString())
                {
                    _sbSQL.Append("AND PROCESS_TYPE IN (");
                    _sbSQL.Append(((int)AtParWebEnums.Process_Type.LowStock));
                    _sbSQL.Append(" , ");
                    _sbSQL.Append(((int)AtParWebEnums.Process_Type.Expiration));
                    _sbSQL.Append(" , ");
                    _sbSQL.Append(((int)AtParWebEnums.Process_Type.Recall));
                    _sbSQL.Append(" , ");
                    _sbSQL.Append(((int)AtParWebEnums.Process_Type.BillOnly));
                    _sbSQL.Append(")");
                }

                if (!(string.IsNullOrEmpty(strBunit) && string.IsNullOrEmpty(strCartID)))
                {
                    _sbSQL.Append(" AND ORG_ID = '" + strBunit + "' ");
                }

                if (!string.IsNullOrEmpty(strCartID))
                {
                    _sbSQL.Append(" AND ID LIKE '%" + strCartID + "%'");
                }

                if (_log.IsInfoEnabled)
                {
                    _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString());
                }
                try
                {
                    var fields = new[] { "ORG_ID", "ID", "SCHEDULE_ID", "REVIEW_CHARGES", "BILLING_OPTION", "PROCESS_TYPE", "REPLENISH_FROM" };

                    lstData = objContext.Database.DifferedExecuteQuery<MT_POU_PAR_LOC_PROCESS_SCHEDULE>(fields, _sbSQL.ToString()).ToList(); ;

                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + sqlEx.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return lstData;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString() + ":"); }
                    return lstData;
                }
                return lstData;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + ":"); }
                return lstData;
            }

        }

        #endregion
    }
}
