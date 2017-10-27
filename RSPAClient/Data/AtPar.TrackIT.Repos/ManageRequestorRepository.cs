using AtPar.Repository.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using System.Data.Entity;
using AtPar.ViewModel;
using System.Web;
using System.IO;
using System.Drawing;

namespace AtPar.TrackIT.Repos
{
    public class ManageRequestorRepository : IManageRequestorRepository
    {
        private ILog _log;

        public ManageRequestorRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageRequestorRepository));
        }

        /// <summary>
        /// Used to check the department exist or not 
        /// </summary>
        /// <param name="deptID"></param>
        /// <returns>Returns true if department exists elese returns false</returns>
        public bool IsUserDepartmentExists(string deptID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int cnt = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    cnt = objContext.TKIT_REQUESTOR_DEPT.Count(c => c.DEPT_ID == deptID);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Rows Returned " + cnt); }

                    if (cnt > 0)
                    {
                        return true;
                    }

                    return false;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        /// <summary>
        /// Used to get all departments
        /// </summary>
        /// <param name="deptID"></param>
        /// <param name="status"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public List<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<TKIT_DEPT> lstData = null;
            bool blnWhere = false;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DEPT_ID, DESCRIPTION, UPDATE_DATE, ");
                    sbSql.Append("UPDATE_USER_ID, STATUS, ORG_GROUP_ID FROM TKIT_DEPT ");

                    if (!string.IsNullOrEmpty(deptID))
                    {
                        sbSql.Append(" WHERE DEPT_ID LIKE '%" + deptID + "%' ");
                        blnWhere = true;
                    }

                    if (!string.IsNullOrEmpty(status))
                    {
                        if (blnWhere)
                        {
                            sbSql.Append(" AND STATUS = '" + status + "' ");
                        }
                        else
                        {
                            sbSql.Append(" WHERE STATUS = '" + status + "'");
                            blnWhere = true;
                        }
                    }

                    if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] != "All")
                    {
                        if (blnWhere)
                        {
                            sbSql.Append(" AND ORG_GROUP_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "' ");
                        }
                        else
                        {
                            sbSql.Append(" WHERE ORG_GROUP_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "' ");
                        }

                    }

                    sbSql.Append(" ORDER BY DEPT_ID ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "DEPT_ID", "DESCRIPTION", "UPDATE_DATE", "UPDATE_USER_ID", "STATUS", "ORG_GROUP_ID" };

                    lstData = objContext.Database.DifferedExecuteQuery<TKIT_DEPT>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Vendors Returned: " + lstData.Count()); }

                    return lstData;
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
        /// Used to get All Requestor Details
        /// </summary>
        /// <param name="requestorID"></param>
        /// <returns></returns>
        public Dictionary<string, object> GetRequestorDetails(string requestorID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            List<string> lstDepts = new List<string>();
            List<TKIT_REQUESTOR> lstRequestors = new List<TKIT_REQUESTOR>();

            Dictionary<string, object> dicOutput = new Dictionary<string, object>();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    lstRequestors = objContext.TKIT_REQUESTOR.Where(x => x.REQUESTOR_ID == requestorID).ToList();

                    if (lstRequestors.Count > 0)
                    {
                        dicOutput.Add("Requestors", lstRequestors);
                        lstDepts = objContext.TKIT_REQUESTOR_DEPT.Where(x => x.REQUESTOR_ID == requestorID).Select(p => p.DEPT_ID).ToList();
                    }

                    if (lstDepts.Count > 0)
                    {
                        dicOutput.Add("Departments", lstDepts);
                    }

                    return dicOutput;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        /// <summary>
        /// Used to get All Requestors
        /// </summary>
        /// <param name="inactiveStatusCheck"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public List<TKIT_REQUESTOR> GetAllRequestors(string search, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<TKIT_REQUESTOR> lstData = null;
            bool blnWhere = false;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT ORG_GROUP_ID, REQUESTOR_ID, FIRST_NAME, LAST_NAME, MIDDLE_INIT, STATUS");
                    sbSql.Append(" FROM TKIT_REQUESTOR");

                    if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] != "All")
                    {
                        sbSql.Append(" WHERE ORG_GROUP_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "'");
                        blnWhere = true;
                    }

                    if (search != null && search != string.Empty)
                    {
                        if (blnWhere)
                        {
                            sbSql.Append(" AND (REQUESTOR_ID like '" + search + "%' OR FIRST_NAME like '" + search + "%' OR LAST_NAME like '" + search + "%')");
                        }
                        else
                        {
                            sbSql.Append(" WHERE (REQUESTOR_ID like '" + search + "%' OR FIRST_NAME like '" + search + "%' OR LAST_NAME like '" + search + "%')");
                        }
                    }

                    sbSql.Append(" ORDER BY REQUESTOR_ID");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "REQUESTOR_ID", "FIRST_NAME", "LAST_NAME", "MIDDLE_INIT", "STATUS" };

                    lstData = objContext.Database.DifferedExecuteQuery<TKIT_REQUESTOR>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Vendors Returned: " + lstData.Count()); }

                    return lstData;
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

        #region Save & Update Requestor Details

        /// <summary>
        /// Used to check Requestor exist or not
        /// </summary>
        /// <param name="requestorID"></param>
        /// <returns>Returns True if exists else False</returns>
        private bool IsRequestorExists(string requestorID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int cnt = -1;

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                cnt = objContext.TKIT_REQUESTOR.Count(c => c.REQUESTOR_ID == requestorID);

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Rows Returned " + cnt); }

                if (cnt > 0)
                {
                    return true;
                }

                return false;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
        }

        /// <summary>
        /// Used to Create the Requestor
        /// </summary>
        /// <param name="requestor"></param>
        /// <param name="objContext"></param>
        /// <returns>If Requestor created successfully returns ATPAR_OK else returns ATPAR_E_LOCALDBINSERTFAIL</returns>
        private long CreateRequestor(TKIT_REQUESTOR requestor, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                byte[] imageDataBytes = null;
                var filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/TrackITUserProfileImage/");

                if (!Directory.Exists(filePath))
                {
                    filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/users/");
                }
                else
                {
                    if (Directory.GetFiles(filePath).Count() == 0)
                    {
                        filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/users/");
                    }
                }

                var pathFiles = Directory.GetFiles(filePath);

                if (pathFiles.Count() == 1)
                {
                    Image img = Image.FromFile(pathFiles[0].ToString());
                    using (MemoryStream mStream = new MemoryStream())
                    {
                        img.Save(mStream, img.RawFormat);
                        imageDataBytes = mStream.ToArray();
                    }
                    img.Dispose();
                }

                sbSql.Append(" INSERT INTO TKIT_REQUESTOR(");
                sbSql.Append(" REQUESTOR_ID,");
                sbSql.Append(" PASSWORD,");
                sbSql.Append(" FIRST_NAME,");
                sbSql.Append(" MIDDLE_INIT,");
                sbSql.Append(" LAST_NAME,");
                sbSql.Append(" PHONE,");
                sbSql.Append(" EMAIL,");
                sbSql.Append(" FAX,");
                sbSql.Append(" PAGER,");
                sbSql.Append(" LOCATION_ID,");
                sbSql.Append(" ORG_GROUP_ID,");
                sbSql.Append(" STATUS,");
                sbSql.Append(" RECORDS_PER_PAGE,");
                sbSql.Append(" DEFAULT_REPORT_DURATION");
                if (requestor.NO_OF_REQUESTS_FOR_SAME_EQ_ITM != null && requestor.NO_OF_REQUESTS_FOR_SAME_EQ_ITM != 0)
                    sbSql.Append(", NO_OF_REQUESTS_FOR_SAME_EQ_ITM");
                //sbSql.Append(", IMAGE");
                sbSql.Append(" )");
                sbSql.Append(" VALUES (");
                sbSql.Append("'" + requestor.REQUESTOR_ID + "', ");
                sbSql.Append("'" + requestor.PASSWORD + "', ");
                sbSql.Append("'" + requestor.FIRST_NAME + "', ");
                sbSql.Append("'" + requestor.MIDDLE_INIT + "', ");
                sbSql.Append("'" + requestor.LAST_NAME + "', ");
                sbSql.Append("'" + requestor.PHONE + "', ");
                sbSql.Append("'" + requestor.EMAIL + "', ");
                sbSql.Append("'" + requestor.FAX + "', ");
                sbSql.Append("'" + requestor.PAGER + "', ");
                sbSql.Append("'" + requestor.LOCATION_ID + "', ");
                sbSql.Append("'" + requestor.ORG_GROUP_ID + "', ");
                sbSql.Append("'" + requestor.STATUS + "', ");
                sbSql.Append("" + requestor.RECORDS_PER_PAGE + ",");
                sbSql.Append(requestor.DEFAULT_REPORT_DURATION);
                if (requestor.NO_OF_REQUESTS_FOR_SAME_EQ_ITM != null && requestor.NO_OF_REQUESTS_FOR_SAME_EQ_ITM != 0)
                    sbSql.Append("," + requestor.NO_OF_REQUESTS_FOR_SAME_EQ_ITM);
                //sbSql.Append("," + imageDataBytes);
                sbSql.Append(");");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                //filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/TrackITUserProfileImage/");
                //if (Directory.Exists(filePath))
                //{
                //    pathFiles = Directory.GetFiles(filePath);
                //    foreach (var file in pathFiles)
                //    {
                //        if (file.ToString() == filePath + "default.png")
                //        {
                //            File.Delete(file.ToString());
                //        }
                //    }
                //}

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;

            }
        }

        public long UpdateRequestorStatus(string requestorID, string status)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE TKIT_REQUESTOR SET ");
                    sbSql.Append("STATUS = '" + status + "' ");
                    sbSql.Append(" WHERE REQUESTOR_ID = '" + requestorID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Used to Update the Requestor
        /// </summary>
        /// <param name="requestor"></param>
        /// <param name="objContext"></param>
        /// <returns>If Requestor updated successfully returns ATPAR_OK else returns ATPAR_E_LOCALDBUPDATEFAIL</returns>
        private long UpdateRequestor(TKIT_REQUESTOR requestor, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                byte[] imageDataBytes = null;
                var filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/TrackITUserProfileImage/");

                if (!Directory.Exists(filePath))
                {
                    filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/users/");
                }
                else
                {
                    if (Directory.GetFiles(filePath).Count() == 0)
                    {
                        filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/users/");
                    }
                }

                var pathFiles = Directory.GetFiles(filePath);

                if (pathFiles.Count() == 1)
                {
                    Image img = Image.FromFile(pathFiles[0].ToString());
                    using (MemoryStream mStream = new MemoryStream())
                    {
                        img.Save(mStream, img.RawFormat);
                        imageDataBytes = mStream.ToArray();
                    }
                    img.Dispose();
                }

                sbSql.Append("UPDATE TKIT_REQUESTOR SET");

                if (!string.IsNullOrEmpty(requestor.PASSWORD))
                {
                    sbSql.Append(" PASSWORD = '" + requestor.PASSWORD + "', ");
                }



                sbSql.Append(" FIRST_NAME = '" + requestor.FIRST_NAME + "', ");
                sbSql.Append("MIDDLE_INIT = '" + requestor.MIDDLE_INIT + "', ");
                sbSql.Append("LAST_NAME = '" + requestor.LAST_NAME + "', ");
                sbSql.Append("PHONE = '" + requestor.PHONE + "', ");
                sbSql.Append("EMAIL = '" + requestor.EMAIL + "', ");
                sbSql.Append("FAX = '" + requestor.FAX + "', ");
                sbSql.Append("PAGER = '" + requestor.PAGER + "', ");
                sbSql.Append("LOCATION_ID = '" + requestor.LOCATION_ID + "', ");
                sbSql.Append("ORG_GROUP_ID = '" + requestor.ORG_GROUP_ID + "', ");

                if (!string.IsNullOrEmpty(requestor.STATUS))
                {
                    sbSql.Append("STATUS = '" + requestor.STATUS + "', ");
                }

                sbSql.Append("RECORDS_PER_PAGE = " + requestor.RECORDS_PER_PAGE + "");
                sbSql.Append(", DEFAULT_REPORT_DURATION = " + requestor.DEFAULT_REPORT_DURATION + "");
                if (requestor.NO_OF_REQUESTS_FOR_SAME_EQ_ITM != null && requestor.NO_OF_REQUESTS_FOR_SAME_EQ_ITM != 0)
                {
                    sbSql.Append(", NO_OF_REQUESTS_FOR_SAME_EQ_ITM = " + requestor.NO_OF_REQUESTS_FOR_SAME_EQ_ITM + "");
                }
                //sbSql.Append(", IMAGE = " + imageDataBytes + "");
                sbSql.Append(" WHERE REQUESTOR_ID = '" + requestor.REQUESTOR_ID + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                //filePath = HttpContext.Current.Server.MapPath(@"~/assets/images/TrackITUserProfileImage/");
                //if (Directory.Exists(filePath))
                //{
                //    pathFiles = Directory.GetFiles(filePath);
                //    foreach (var file in pathFiles)
                //    {
                //        if (file.ToString() == filePath + "default.png")
                //        {
                //            File.Delete(file.ToString());
                //        }
                //    }
                //}

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }


                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Used to Delete the Requestor
        /// </summary>
        /// <param name="requestorID"></param>
        /// <param name="objContext"></param>
        /// <returns>If Requestor updated successfully returns ATPAR_OK else returns ATPAR_E_LOCALDBDELETEFAIL</returns>
        private long DeleteRequestor(string requestorID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM TKIT_REQUESTOR_DEPT ");
                sbSql.Append(" WHERE REQUESTOR_ID = '" + requestorID + "'");


                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Deleted " + count); }


                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Used to create the Requestor Departments
        /// </summary>
        /// <param name="lstRequestorDepts"></param>
        /// <param name="objContext"></param>
        /// <returns>If Requestor created successfully returns ATPAR_OK else returns ATPAR_E_LOCALDBINSERTFAIL</returns>
        private long CreateRequestorDepartments(List<TKIT_REQUESTOR_DEPT> lstRequestorDepts, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstRequestorDepts)
                {
                    sbSql.Clear();

                    sbSql.Append("INSERT INTO TKIT_REQUESTOR_DEPT ");
                    sbSql.Append("(ORG_GROUP_ID, REQUESTOR_ID, DEPT_ID)");
                    sbSql.Append(" VALUES(");
                    sbSql.Append("'" + item.ORG_GROUP_ID + "', ");
                    sbSql.Append("'" + item.REQUESTOR_ID + "', ");
                    sbSql.Append("'" + item.DEPT_ID + "' );");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;

            }
        }

        public long UpdateRequestorDetails(TKIT_REQUESTOR requestor, List<TKIT_REQUESTOR_DEPT> lstRequestorDepts)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        StatusCode = UpdateRequestor(requestor, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        // Deleting the existing departments and re create.

                        if (lstRequestorDepts.Count > 0)
                        {
                            StatusCode = DeleteRequestor(requestor.REQUESTOR_ID, objContext);

                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }

                            StatusCode = CreateRequestorDepartments(lstRequestorDepts, objContext);

                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }

                        }

                        trans.Commit();
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        public long SaveRequestorDetails(TKIT_REQUESTOR requestor, List<TKIT_REQUESTOR_DEPT> lstRequestorDepts)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        bool IsRequestorExist = IsRequestorExists(requestor.REQUESTOR_ID, objContext);

                        if (IsRequestorExist)
                        {
                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Requestor " + requestor.REQUESTOR_ID + " already exists"); }
                            return AtparStatusCodes.ATPAR_E_USERALREADYEXISTS;
                        }
                        else
                        {
                            StatusCode = CreateRequestor(requestor, objContext);

                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }
                        }

                        // Deleting the existing departments and re create.

                        if (lstRequestorDepts.Count > 0)
                        {
                            StatusCode = DeleteRequestor(requestor.REQUESTOR_ID, objContext);

                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }

                            StatusCode = CreateRequestorDepartments(lstRequestorDepts, objContext);

                            if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return StatusCode;
                            }

                        }


                        trans.Commit();
                        return AtparStatusCodes.ATPAR_OK;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        #endregion
    }
}
