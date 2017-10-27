using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace AtPar.Init.Repos
{
    public class StationaryPrintDesignRepository : IStationaryPrintDesignRepository
    {
        private ILog _log;
        public StationaryPrintDesignRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(StationaryPrintDesignRepository));
        }

        #region SaveDynamicPrintReport
        /// <summary>
        /// Saving Dynamic Print Report
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="objectID"></param>
        /// <param name="printType"></param>
        /// <param name="objectDesc"></param>
        /// <param name="lstReportDtls"></param>
        /// <returns></returns>
        public long SaveDynamicPrintReport(string appID, string objectID, string printType, string objectDesc, List<VM_MT_ATPAR_REPORT_DETAILS> lstReportDtls)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        statusCode = DeletePrintLabelDtls(appID, objectID, objContext);

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }

                        statusCode = DeletePrintObjInfo(appID, objectID, printType, objContext);

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }

                        statusCode = InsertPrintObj(appID, objectID, printType, objectDesc, objContext);

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }

                        statusCode = InsertPrintLabelDtls(appID, objectID, lstReportDtls, objContext);

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
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

        private long DeletePrintLabelDtls(string appID, string objectID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM  MT_ATPAR_PRINT_LABEL_DETAILS WHERE APP_ID='").Append(appID).Append("' AND OBJECT_ID='").Append(objectID).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records deleted : " + count); }

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

        private long DeletePrintObjInfo(string appID, string objectID, string printType, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM  MT_ATPAR_PRINT_OBJECTS_INFO WHERE APP_ID='").Append(appID).Append("' AND OBJECT_ID='").Append(objectID).Append("' AND PRINTER_TYPE='").Append(printType.Trim()).Append("'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records deleted : " + count); }

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

        private long InsertPrintObj(string appID, string objectID, string printType, string objectDesc, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var count = 0;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_ATPAR_PRINT_OBJECTS_INFO(APP_ID, OBJECT_ID, OBJECT_DESC, PRINTER_TYPE,OBJECT_TYPE )").Append(" VALUES('").Append(appID).Append("','").Append(objectID).Append("','").Append(objectDesc).Append("','").Append(printType).Append("',").Append("'REPORT')");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled)
                    {
                        objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                    }
                }
                var status = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                count = count + status;


                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records inserted : " + count); }

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

        private long InsertPrintLabelDtls(string appID, string objectID, List<VM_MT_ATPAR_REPORT_DETAILS> lstReportDtls, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var count = 0;

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var reportDtls in lstReportDtls)
                {
                    sbSql.Clear();
                    sbSql
                        .Append(" INSERT INTO MT_ATPAR_PRINT_LABEL_DETAILS(APP_ID, OBJECT_ID,LINE_NO, FIELD_NAME,")
                        .Append(" TEXT_VALUE,ROW_POSITION, COLUMN_POSITION, DISPLAY_NAME, VISIBLE,HEADERFONT,VALUEFONT )")
                        .Append(" VALUES('" + appID + "','" + objectID + "','" + reportDtls.LINE_NO + "',")
                        .Append(" '" + reportDtls.FIELD_NAME + "','" + reportDtls.TEXT_VALUE + "',")
                        .Append(" '" + reportDtls.ROW_POSITION + "',")
                        .Append(" '" + reportDtls.COLUMN_POSITION + "','" + reportDtls.DISPLAY_NAME + "',")
                        .Append("'1','" + reportDtls.HEADERFONT + "','" + reportDtls.VALUEFONT + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }
                    var Status = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    count = count + Status;
                }
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records inserted : " + count); }

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

        #endregion

        #region GetDynamicReport
        /// <summary>
        /// Getting Dynamic Report
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="objectID"></param>
        /// <returns></returns>
        public Dictionary<string, object> GetDynamicReport(string appID, string objectID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                List<MT_ATPAR_PRINT_FIELD_DEFAULTS> list1 = GetPrintFieldDefaults(appID, objectID);

                List<MT_ATPAR_PRINT_FIELD_DEFAULTS> list2 = GetPrintFieldDefaultsSecDtls(appID, objectID);

                List<VM_MT_ATPAR_DYNAMIC_REPORT> list3 = GetPrintDtls(appID, objectID);

                List<VM_MT_ATPAR_DYNAMIC_REPORT> list4 = GetPrintLabelDtls(appID, objectID);

                List<MT_ATPAR_PRINT_LABEL_DETAILS> list5 = GetDistinctFieldDtls(appID, objectID);

                List<MT_ATPAR_PRINT_LABEL_DETAILS> list6 = GetDistinctPrintDtls(appID, objectID);

                var dictData = new Dictionary<string, object> { { "list1", list1 }, { "list2", list2 }, { "list3", list3 }, { "list4", list4 }, { "list5", list5 }, { "list6", list6 } };
                return dictData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private List<MT_ATPAR_PRINT_FIELD_DEFAULTS> GetPrintFieldDefaults(string appID, string objectID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT * FROM MT_ATPAR_PRINT_FIELD_DEFAULTS WHERE APP_ID=").Append(appID).Append("AND SECTION='HEADER' AND OBJECT_ID='").Append(objectID).Append("' ORDER BY LINE_NO ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstPrintFieldDefaults = objContext.Database.SqlQuery<MT_ATPAR_PRINT_FIELD_DEFAULTS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records returned: " + lstPrintFieldDefaults.Count()); }

                    return lstPrintFieldDefaults;
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

        private List<MT_ATPAR_PRINT_FIELD_DEFAULTS> GetPrintFieldDefaultsSecDtls(string appID, string objectID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT * FROM MT_ATPAR_PRINT_FIELD_DEFAULTS WHERE APP_ID=").Append(appID).Append("AND SECTION='DETAILS' AND OBJECT_ID='").Append(objectID).Append("' ORDER BY LINE_NO ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstPrintFieldDefaults = objContext.Database.SqlQuery<MT_ATPAR_PRINT_FIELD_DEFAULTS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records returned: " + lstPrintFieldDefaults.Count()); }

                    return lstPrintFieldDefaults;
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

        private List<VM_MT_ATPAR_DYNAMIC_REPORT> GetPrintDtls(string appID, string objectID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT PDF.APP_ID,PDF.OBJECT_ID,PDF.LINE_NO,PDF.FIELD_NAME,PDF.FIELD_TYPE,PT.TEXT_VALUE,PDF.FIELD_GROUP,PT.ROW_POSITION,PT.COLUMN_POSITION,PT.DISPLAY_NAME,PT.VISIBLE,  PDF.FIELD_SIZE,PT.ALIGNMENT,PT.HEADERFONT,PT.VALUEFONT,PDF.SECTION FROM  MT_ATPAR_PRINT_FIELD_DEFAULTS PDF, MT_ATPAR_PRINT_LABEL_DETAILS PT WHERE PDF.APP_ID = PT.APP_ID AND PDF.OBJECT_ID = PT.OBJECT_ID AND PDF.FIELD_NAME = PT.FIELD_NAME AND PDF.LINE_NO = PT.LINE_NO AND SECTION = 'HEADER' AND PDF.OBJECT_ID = '" + objectID + "' AND PDF.APP_ID = " + appID + " ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstDynamicReport = objContext.Database.SqlQuery<VM_MT_ATPAR_DYNAMIC_REPORT>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records returned: " + lstDynamicReport.Count()); }

                    return lstDynamicReport;
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

        private List<VM_MT_ATPAR_DYNAMIC_REPORT> GetPrintLabelDtls(string appID, string objectID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT PDF.APP_ID,PDF.OBJECT_ID,PDF.LINE_NO,PDF.FIELD_NAME,PDF.FIELD_TYPE,PT.TEXT_VALUE,PDF.FIELD_GROUP, PT.ROW_POSITION, PT.COLUMN_POSITION, PT.DISPLAY_NAME, PT.VISIBLE, PDF.FIELD_SIZE, PT.ALIGNMENT, PT.HEADERFONT, PT.VALUEFONT, PDF.SECTION FROM  MT_ATPAR_PRINT_FIELD_DEFAULTS PDF, MT_ATPAR_PRINT_LABEL_DETAILS PT WHERE PDF.APP_ID = PT.APP_ID AND PDF.OBJECT_ID = PT.OBJECT_ID AND PDF.FIELD_NAME = PT.FIELD_NAME AND PDF.LINE_NO = PT.LINE_NO AND SECTION = 'DETAILS' AND PDF.OBJECT_ID = '" + objectID + "' AND PDF.APP_ID = " + appID + "");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstDynamicReport = objContext.Database.SqlQuery<VM_MT_ATPAR_DYNAMIC_REPORT>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records returned: " + lstDynamicReport.Count()); }

                    return lstDynamicReport;
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

        private List<MT_ATPAR_PRINT_LABEL_DETAILS> GetDistinctFieldDtls(string appID, string objectID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT HEADERFONT,VALUEFONT FROM  MT_ATPAR_PRINT_LABEL_DETAILS PLD, MT_ATPAR_PRINT_FIELD_DEFAULTS PLH WHERE PLH.APP_ID = PLD.APP_ID And PLH.OBJECT_ID = PLD.OBJECT_ID AND VISIBLE = 1 AND PLH.LINE_NO = PLD.LINE_NO AND PLD.TEXT_VALUE = 'TEXT' AND PLD.APP_ID = " + appID + " AND PLD.OBJECT_ID = '" + objectID + "' AND SECTION = 'HEADER'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "HEADERFONT", "VALUEFONT" };

                    var lstDynamicReport = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PRINT_LABEL_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records returned: " + lstDynamicReport.Count()); }

                    return lstDynamicReport;
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

        private List<MT_ATPAR_PRINT_LABEL_DETAILS> GetDistinctPrintDtls(string appID, string objectID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT HEADERFONT, VALUEFONT FROM  MT_ATPAR_PRINT_LABEL_DETAILS PLD, MT_ATPAR_PRINT_FIELD_DEFAULTS PLH WHERE PLH.APP_ID = PLD.APP_ID And PLH.OBJECT_ID = PLD.OBJECT_ID AND VISIBLE = 1 AND PLH.LINE_NO = PLD.LINE_NO AND PLD.TEXT_VALUE = 'VALUE' AND PLD.APP_ID = " + appID + " AND PLD.OBJECT_ID = '" + objectID + "' AND SECTION = 'DETAILS'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "HEADERFONT", "VALUEFONT" };

                    var lstDynamicReport = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PRINT_LABEL_DETAILS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records returned: " + lstDynamicReport.Count()); }

                    return lstDynamicReport;
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
        #endregion

        #region GetDynamicPrintReportTypes
        /// <summary>
        /// Getting Dynamic Print Report Types
        /// </summary>
        /// <param name="appID"></param>
        /// <returns></returns>
        public List<string> GetDynamicPrintReportTypes(int appID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT (OBJECT_ID) FROM MT_ATPAR_PRINT_FIELD_DEFAULTS WHERE APP_ID=" + appID + "");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstobjectID = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records returned: " + lstobjectID.Count()); }

                    return lstobjectID;
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
        #endregion

        #region GetDynamicPrintProducts
        /// <summary>
        /// Getting Dynamic Print Products
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public List<MT_ATPAR_PROFILE_APP_ACL> GetDynamicPrintProducts(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT B.APP_ID, C.APP_NAME FROM MT_ATPAR_USER A, MT_ATPAR_PROFILE_APP_ACL B,MT_ATPAR_APP  C WHERE A.PROFILE_ID = B.PROFILE_ID AND B.APP_ID = C.APP_ID AND B.SERVER_USER = 'Y' AND A.USER_ID = '" + userID + "' AND(B.APP_ID <> 0)  AND B.APP_ID IN(SELECT DISTINCT APP_ID FROM MT_ATPAR_PRINT_FIELD_DEFAULTS)");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "APP_ID", "APP_NAME" };

                    var lstDynamicReport = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PROFILE_APP_ACL>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of records returned: " + lstDynamicReport.Count()); }

                    return lstDynamicReport;
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
        #endregion
    }
}
