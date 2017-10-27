using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Repos

{
    public class MaintainPrintersRepository : IMaintainPrintersRepository
    {
        #region Private Variables

        private ILog _log;

        #endregion

        #region Constructor
        public MaintainPrintersRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(MaintainPrintersRepository));
        }

        #endregion

        #region UpdatePrinterStatus
        /// <summary>
        /// To update printer status
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="friendlyName"></param>
        /// <param name="functionality"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public long UpdatePrinterStatus(int appID, string friendlyName, int functionality, int status)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE MT_ATPAR_SETUP_PRO_PRINTERES SET STATUS = ")
                        .Append(status).Append(",UPDATE_DATE = '")
                        .Append(DateTime.Now.ToString())
                        .Append("' WHERE APP_ID = ").Append(appID)
                        .Append(" AND FRIENDLY_NAME = '").Append(friendlyName)
                        .Append("' AND LABEL_TYPE = ").Append(functionality)
                        .Append(" AND STATUS != 3 ");

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
        #endregion

        #region GetPrinterModels
        /// <summary>
        /// To get Printer Models
        /// </summary>
        /// <returns></returns>
        public List<MT_ATPAR_LBL_PRINTERS> GetPrinterModels()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT CODE, NAME, TYPE FROM MT_ATPAR_LBL_PRINTERS");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var fields = new[] { "CODE", "NAME", "TYPE" };

                    var lstPrinters = objContext.Database.DifferedExecuteQuery<MT_ATPAR_LBL_PRINTERS>(fields, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstPrinters); }

                    return lstPrinters;
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

        #region GetPrinterData
        /// <summary>
        /// To get Printer Data
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="friendlyName"></param>
        /// <param name="functionality"></param>
        /// <returns></returns>
        public List<MT_ATPAR_SETUP_PRO_PRINTERES> GetPrinterData(int appID, string friendlyName,
                                                                 string functionality)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT APP_ID, PRINTER_CODE, NETWORK_TYPE, IP_ADDRESS, PORT_NO,");
                    sbSql.Append(" FRIENDLY_NAME, LABEL_TYPE, MODEL");
                    sbSql.Append(" FROM MT_ATPAR_SETUP_PRO_PRINTERES");
                    sbSql.Append(" WHERE APP_ID = " + appID + "");
                    sbSql.Append(" AND FRIENDLY_NAME = '" + friendlyName.ReplaceString() + "' ");
                    sbSql.Append(" AND LABEL_TYPE = '" + functionality + "'");
                    sbSql.Append(" AND STATUS <> 3 ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var fields = new[] { "APP_ID","PRINTER_CODE","NETWORK_TYPE","IP_ADDRESS", "PORT_NO","FRIENDLY_NAME",
                                         "LABEL_TYPE","MODEL"};

                    var lstPrinterData = objContext.Database.DifferedExecuteQuery<MT_ATPAR_SETUP_PRO_PRINTERES>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstPrinterData); }

                    return lstPrinterData;
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

        #region GetFunctionalities
        /// <summary>
        /// To get functionalities
        /// </summary>
        /// <param name="appID"></param>
        /// <returns></returns>
        public List<MT_ATPAR_APP_LABELS> GetFunctionalities(int appID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT APP_ID, LABEL_TYPE, LABEL_DESCRIPTION ");
                    sbSql.Append("FROM MT_ATPAR_APP_LABELS");
                    sbSql.Append(" WHERE APP_ID = " + appID + " ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var fields = new[] { "APP_ID", "LABEL_TYPE", "LABEL_DESCRIPTION" };

                    var lstApps = objContext.Database.DifferedExecuteQuery<MT_ATPAR_APP_LABELS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstApps); }

                    return lstApps;
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

        #region GetModels
        /// <summary>
        /// To get models
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="functionality"></param>
        /// <param name="printerCode"></param>
        /// <returns></returns>
        public List<string> GetModels(int appID, int functionality, string printerCode)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT MODEL FROM MT_ATPAR_LABELS_DATA");
                    sbSql.Append(" WHERE APP_ID = " + appID + "");
                    sbSql.Append(" AND LABEL_TYPE = " + functionality + " ");
                    sbSql.Append(" AND PRINTER_CODE = '" + printerCode + "' ");
                    sbSql.Append(" GROUP BY MODEL");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstModels = objContext.Database.SqlQuery<string>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstModels); }

                    return lstModels;
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

        #region GetModelImage
        /// <summary>
        /// To get model image
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="model"></param>
        /// <param name="functionality"></param>
        /// <param name="printerModelType"></param>
        /// <returns></returns>
        public List<MT_ATPAR_LABELS_DATA> GetModelImage(int appID, string model, int functionality, string printerModelType)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT LABEL_IMAGE, WIDTH, HEIGHT, LABEL_FILE_NAME FROM MT_ATPAR_LABELS_DATA");
                    sbSql.Append(" WHERE APP_ID = " + appID + "");
                    sbSql.Append(" AND LABEL_TYPE = " + functionality + " ");
                    sbSql.Append(" AND MODEL = '" + model + "'");
                    sbSql.Append(" AND PRINTER_CODE  = '" + printerModelType + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "LABEL_IMAGE", "WIDTH", "HEIGHT", "LABEL_FILE_NAME" };

                    var lstModelImage = objContext.Database.DifferedExecuteQuery<MT_ATPAR_LABELS_DATA>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstModelImage); }

                    return lstModelImage;
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

        #region GetLinkedFunctionalities
        /// <summary>
        /// To get linked functionalities
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="labelType"></param>
        /// <returns></returns>
        public List<MT_ATPAR_APP_LINKED_LABELS> GetLinkedFunctionalities(int appID, int labelType)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT APP_ID, LABEL_TYPE, ");
                    sbSql.Append("LABEL_LNK_TYPE, LABEL_LNK_DESCRIPTION ");
                    sbSql.Append("FROM MT_ATPAR_APP_LINKED_LABELS ");
                    sbSql.Append(" WHERE APP_ID = " + appID + "");
                    sbSql.Append(" AND LABEL_TYPE = " + labelType + " ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "APP_ID", "LABEL_TYPE", "LABEL_LNK_TYPE", "LABEL_LNK_DESCRIPTION" };

                    var lstFunctionalities = objContext.Database.DifferedExecuteQuery<MT_ATPAR_APP_LINKED_LABELS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstFunctionalities); }

                    return lstFunctionalities;
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

        #region InsertModel
        /// <summary>
        /// To insert model
        /// </summary>
        /// <param name="appID"></param>
        /// <param name="fileName"></param>
        /// <param name="PNLData"></param>
        /// <param name="LVXData"></param>
        /// <param name="image"></param>
        /// <param name="model"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="userID"></param>
        /// <param name="functionality"></param>
        /// <param name="linkFunctionality"></param>
        /// <param name="printerCode"></param>
        /// <returns></returns>
        public long InsertModel(int appID, string fileName, byte[] PNLData, string LVXData, byte[] image, string model,
                                 double width, double height, string userID, int functionality, int linkFunctionality,
                                 string printerCode)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter pAppID = new SqlParameter("@appid", SqlDbType.SmallInt);
                    pAppID.Value = appID;

                    SqlParameter pFileName = new SqlParameter("@labelfname", SqlDbType.NVarChar);
                    pFileName.Value = fileName;

                    SqlParameter pPNLData = new SqlParameter("@labelpnl", SqlDbType.VarBinary);
                    pPNLData.Value = PNLData;

                    // pPNLData.Value= string.Concat(PNLData.Select(b => Convert.ToString(b, 2).PadLeft(8, '0')));

                    SqlParameter pLVXData = new SqlParameter("@labellvx", SqlDbType.NVarChar);
                    pLVXData.Value = LVXData;

                    SqlParameter pImage = new SqlParameter("@labelimage", SqlDbType.VarBinary);
                    pImage.Value = image;
                    // pImage.Value = string.Concat(image.Select(b => Convert.ToString(b, 2).PadLeft(8, '0')));

                    SqlParameter pModel = new SqlParameter("@model", SqlDbType.VarChar);
                    pModel.Value = model;

                    SqlParameter pWidth = new SqlParameter("@width", SqlDbType.Float);
                    pWidth.Value = width;

                    SqlParameter pHeight = new SqlParameter("@height", SqlDbType.Float);
                    pHeight.Value = height;

                    SqlParameter pUserID = new SqlParameter("@userid", SqlDbType.NVarChar);
                    pUserID.Value = userID;

                    SqlParameter pDate = new SqlParameter("@updatetime", SqlDbType.DateTime);
                    pDate.Value = DateTime.Now.ToString();

                    SqlParameter pFunctionality = new SqlParameter("@labeltype", SqlDbType.Int);
                    pFunctionality.Value = functionality;

                    SqlParameter pLinkFunctionality = new SqlParameter("@linklabeltype", SqlDbType.Int);
                    pLinkFunctionality.Value = linkFunctionality;

                    SqlParameter pPrinterCode = new SqlParameter("@printercode", SqlDbType.NVarChar);
                    pPrinterCode.Value = printerCode;

                    //sbSql.Append("INSERT INTO MT_ATPAR_LABELS_DATA(APP_ID, LABEL_FILE_NAME, LABEL_DATA_PNL, ");
                    //sbSql.Append("LABEL_DATA_LVX, LABEL_IMAGE, MODEL, WIDTH, HEIGHT, USER_ID,");
                    //sbSql.Append("UPDATE_DATE, LABEL_TYPE, LINK_LABEL_TYPE, PRINTER_CODE)");
                    //sbSql.Append("values ('"+pAppID.Value+"', '"+pFileName.Value+"', '"+pPNLData.Value+"', '"+pLVXData.Value+"',");
                    //sbSql.Append("'"+pImage.Value+"', '"+pModel.Value+"', '"+pWidth.Value+"', '"+pHeight.Value+"', '"+pUserID+"', '"+pDate.Value+"',");
                    //sbSql.Append("'"+pFunctionality.Value+"','"+pLinkFunctionality.Value+"', '"+pPrinterCode.Value+"')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand("exec Insertmodel @appid,@labelfname,@labelpnl,@labellvx,@labelimage,@model,@width,@height,@userid,@updatetime,@labeltype,@linklabeltype,@printercode", pAppID, pFileName, pPNLData, pLVXData, pImage, pModel, pWidth, pHeight, pUserID, pDate, pFunctionality, pLinkFunctionality, pPrinterCode);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

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
        #endregion

        #region SavePrinterDetails
        /// <summary>
        /// To save printer details
        /// </summary>
        /// <param name="lstPrintData"></param>
        /// <returns></returns>
        public long SavePrinterDetails(List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int printerCount;
            StringBuilder sbSql = new StringBuilder();
            try
            {
                if (lstPrintData.Count > 0)
                {
                    printerCount = CheckPrinterAvailable(lstPrintData[0].APP_ID, lstPrintData[0].FRIENDLY_NAME.ReplaceString(),
                                   lstPrintData[0].LABEL_TYPE.ToString());
                    if (printerCount > 0)
                    {
                        return AtparStatusCodes.S_DATAEXISTS_INTABLE;
                    }
                }
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            for (int i = 0; i <= lstPrintData.Count - 1; i++)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                                sbSql.Clear();

                                sbSql.Append("INSERT INTO MT_ATPAR_SETUP_PRO_PRINTERES (");
                                sbSql.Append("APP_ID,PRINTER_CODE,IP_ADDRESS,PORT_NO,FRIENDLY_NAME,STATUS,");
                                sbSql.Append("UPDATE_DATE,USER_ID,LABEL_FILE_NAME,NETWORK_TYPE,LABEL_TYPE,");
                                sbSql.Append("LINKED_LABEL_TYPE,MODEL)");
                                sbSql.Append("VALUES('" + lstPrintData[i].APP_ID + "','" + lstPrintData[i].PRINTER_CODE + "',");
                                sbSql.Append("'" + lstPrintData[i].IP_ADDRESS + "','" + lstPrintData[i].PORT_NO + "',");
                                sbSql.Append("'" + lstPrintData[i].FRIENDLY_NAME.ReplaceString() + "','" + lstPrintData[i].STATUS + "',");
                                sbSql.Append("'" + DateTime.Now + "','" + lstPrintData[i].USER_ID + "',");
                                sbSql.Append("'" + lstPrintData[i].LABEL_FILE_NAME + "','" + lstPrintData[i].NETWORK_TYPE + "',");
                                sbSql.Append("'" + lstPrintData[i].LABEL_TYPE + "','" + lstPrintData[i].LINKED_LABEL_TYPE + "',");
                                sbSql.Append("'" + lstPrintData[i].MODEL + "')");

                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                }

                                var insCount = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + insCount); }
                            }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        finally
                        {
                            sbSql.Clear();
                        }
                        long statusCode = CreateOrUpdateNiceLabel(lstPrintData);

                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
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
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region UpdatePrinterDetails
        /// <summary>
        /// To update printer details
        /// </summary>
        /// <param name="oldFriendlyName"></param>
        /// <param name="blnPrinterExists"></param>
        /// <param name="lstPrintData"></param>
        /// <returns></returns>
        public long UpdatePrinterDetails(string oldFriendlyName, bool blnPrinterExists, List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int count;
            StringBuilder sbSql = new StringBuilder();
            try
            {
                if (lstPrintData.Count > 0)
                {
                    if (blnPrinterExists)
                    {
                        count = CheckPrinterAvailable(lstPrintData[0].APP_ID, lstPrintData[0].FRIENDLY_NAME.ReplaceString(),
                                  lstPrintData[0].LABEL_TYPE.ToString());
                        if (count > 0)
                        {
                            return AtparStatusCodes.S_DATAEXISTS_INTABLE;
                        }
                    }
                }
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            for (int i = 0; i <= lstPrintData.Count - 1; i++)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                                sbSql.Append("UPDATE MT_ATPAR_SETUP_PRO_PRINTERES SET ");
                                sbSql.Append("IP_ADDRESS = '" + lstPrintData[i].IP_ADDRESS + "', ");
                                sbSql.Append("PORT_NO = " + lstPrintData[i].PORT_NO + ", ");
                                sbSql.Append("FRIENDLY_NAME = '" + lstPrintData[i].FRIENDLY_NAME.ReplaceString() + "', ");
                                sbSql.Append("UPDATE_DATE = '" + DateTime.Now + "', ");
                                sbSql.Append("USER_ID = '" + lstPrintData[i].USER_ID + "', ");
                                sbSql.Append("LABEL_FILE_NAME = '" + lstPrintData[i].LABEL_FILE_NAME + "', ");
                                sbSql.Append("NETWORK_TYPE = '" + lstPrintData[i].NETWORK_TYPE + "', ");
                                sbSql.Append("MODEL = '" + lstPrintData[i].MODEL + "' ");
                                sbSql.Append("WHERE APP_ID = " + lstPrintData[i].APP_ID + " ");
                                sbSql.Append("AND LABEL_TYPE = " + lstPrintData[i].LABEL_TYPE + " ");
                                sbSql.Append("AND LINKED_LABEL_TYPE = " + lstPrintData[i].LINKED_LABEL_TYPE + " ");
                                sbSql.Append("AND FRIENDLY_NAME = '" + oldFriendlyName.ReplaceString() + "'");

                                var insCount = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                                sbSql.Clear();

                            }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                        finally
                        {
                            sbSql.Clear();
                        }
                        long statusCode = CreateOrUpdateNiceLabel(lstPrintData);

                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
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
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region Private Methods
        private int CheckPrinterAvailable(int appID, string friendlyName, string functionality)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSql.Append("SELECT COUNT(*) FROM MT_ATPAR_SETUP_PRO_PRINTERES");
                    sbSql.Append(" WHERE APP_ID = " + appID + "");
                    sbSql.Append(" AND FRIENDLY_NAME = '" + friendlyName + "'");
                    sbSql.Append(" AND LABEL_TYPE = " + functionality + "");
                    sbSql.Append(" AND STATUS <> 3 ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned printers Count " + count); }
                    return count;
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

        private long CreateOrUpdateNiceLabel(List<MT_ATPAR_SETUP_PRO_PRINTERES> lstPrintData)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_ATPAR_LABELS_DATA> lstLabelsData = new List<MT_ATPAR_LABELS_DATA>();

            try
            {
                string _appPath = null;
                _appPath = AppDomain.CurrentDomain.BaseDirectory[0] + @":\Atpar\Labels\";

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (lstPrintData.Count > 0)
                    {
                        for (int i = 0; i <= lstPrintData.Count - 1; i++)
                        {
                            string _Labelfilename = string.Empty;

                            _Labelfilename = lstPrintData[i].LABEL_FILE_NAME;

                            _Labelfilename = _appPath + _Labelfilename;

                            sbSql.Append("SELECT APP_ID, LABEL_DATA_PNL, LABEL_DATA_LVX ");
                            sbSql.Append(" FROM MT_ATPAR_LABELS_DATA");
                            sbSql.Append(" WHERE APP_ID = " + lstPrintData[i].APP_ID + "");
                            sbSql.Append(" AND LABEL_FILE_NAME = '" + lstPrintData[i].LABEL_FILE_NAME + "' ");
                            var fields = new[] { "APP_ID", "LABEL_DATA_PNL", "LABEL_DATA_LVX" };

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }

                            lstLabelsData = objContext.Database.DifferedExecuteQuery<MT_ATPAR_LABELS_DATA>(fields, sbSql.ToString()).ToList();

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of LabelsData Returned: " + lstLabelsData.Count()); }

                            if (lstLabelsData.Count > 0)
                            {
                                FileStream _fsPNL = default(FileStream);
                                _fsPNL = new FileStream(_Labelfilename + ".pnl", FileMode.Create, FileAccess.Write);
                                byte[] _filePnlData = lstLabelsData[0].LABEL_DATA_PNL;
                                _fsPNL.Write(_filePnlData, 0, _filePnlData.Length);
                                _fsPNL.Close();

                                FileStream _fsLVX = default(FileStream);
                                _fsLVX = new FileStream(_Labelfilename + ".lvx", FileMode.Create, FileAccess.Write);
                                byte[] info = new UTF8Encoding(true).GetBytes(lstLabelsData[0].LABEL_DATA_LVX.ToString());
                                _fsLVX.Write(info, 0, info.Length);
                                _fsLVX.Close();
                            }
                            sbSql.Clear();
                        }

                    }
                    return AtparStatusCodes.ATPAR_OK;
                }
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
    }
}
