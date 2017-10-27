using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.Data;
using AtPar.Common;
using log4net;

namespace AtPar.Init.Repos
{
    public class BarcodeTranslationRepository : IBarcodeTranslationRepository
    {
        #region Private Variables

        private StringBuilder _sbSQL;

        private ILog _log;
        #endregion

        #region Constructor

        public BarcodeTranslationRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(BarcodeTranslationRepository));
        }

        #endregion

        #region To Add Barcode translation values
        /// <summary>
        /// To Add Barcode Transalation values based on User ID
        /// </summary>
        /// <param name="DeviceTokenEntry"></param>
        /// <param name="barcodeSymbology"></param>
        /// <returns></returns>
        public long AddBarcodeTranslation(string[] DeviceTokenEntry, MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            _sbSQL = new StringBuilder();
            using (ATPAR_MT_Context context = new ATPAR_MT_Context())
            {
                try
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL.Append(" INSERT INTO MT_ATPAR_BARCODE_SYMBOLOGY(SYMBOLOGY_TYPE,BARCODE_LENGTH,DESCRIPTION,ID_START_POSITION,");
                    _sbSQL.Append(" LENGTH,UPDATE_USERID,UPDATE_DATE) ");
                    _sbSQL.Append(" VALUES('" + barcodeSymbology.SYMBOLOGY_TYPE + "', ");
                    _sbSQL.Append("'" + barcodeSymbology.BARCODE_LENGTH + "',");
                    _sbSQL.Append("'" + barcodeSymbology.DESCRIPTION + "',");
                    _sbSQL.Append(" '" + barcodeSymbology.ID_START_POSITION + "',");
                    _sbSQL.Append("'" + barcodeSymbology.LENGTH + "',");
                    _sbSQL.Append("'" + barcodeSymbology.UPDATE_USERID + "',");
                    _sbSQL.Append("'" + System.Convert.ToString(DateTime.Now) + "')");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }


                    var result = context.Database.ExecuteSqlCommand(_sbSQL.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : successfully added : " + result); }

                    return AtparStatusCodes.ATPAR_OK;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }

                    return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                }
                finally
                {
                    _sbSQL = null;
                }

            }

        }
        #endregion

        #region Check Existing Barcode translation values
        /// <summary>
        /// To Check For Existing Barcode Transalation values based on SymbologyType and BarcodeLength
        /// </summary>
        /// <param name="DeviceTokenEntry"></param>
        /// <param name="barcodeSymbology"></param>
        /// <returns></returns>

        public long CheckForExistingBarCodeTranslation(string[] DeviceTokenEntry, MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            _sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    _sbSQL
                        .Append(" SELECT COUNT(SYMBOLOGY_TYPE) FROM MT_ATPAR_BARCODE_SYMBOLOGY WHERE ")
                        .Append(" SYMBOLOGY_TYPE = '" + barcodeSymbology.SYMBOLOGY_TYPE + "'")
                        .Append(" AND BARCODE_LENGTH = '" + barcodeSymbology.BARCODE_LENGTH + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    //var test = context.Database.SqlQuery<int>(_sbSQL.ToString()).First();

                    int pintSymbologyTypeExist = context.MT_ATPAR_BARCODE_SYMBOLOGY
                        .Where(a => a.SYMBOLOGY_TYPE == barcodeSymbology.SYMBOLOGY_TYPE && a.BARCODE_LENGTH == barcodeSymbology.BARCODE_LENGTH)
                        .Select(a => a.SYMBOLOGY_TYPE).Count();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Existing Barcode Translatin Count is: " + pintSymbologyTypeExist); }

                    return pintSymbologyTypeExist;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }

                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSQL = null;
            }
        }
        #endregion

        #region  Delete Barcode translation values 
        /// <summary>
        /// To Delete Barcode Transalation values based on SymbologyType and BarcodeLength
        /// </summary>
        /// <param name="DeviceTokenEntry"></param>
        /// <param name="barcodeSymbology"></param>
        /// <returns></returns>
        public long DeleteBarcodeTranslation(string[] DeviceTokenEntry, MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            _sbSQL = new StringBuilder();

            using (ATPAR_MT_Context context = new ATPAR_MT_Context())
            {
                try
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL
                    .Append(" DELETE FROM MT_ATPAR_BARCODE_SYMBOLOGY WHERE ")
                    .Append(" SYMBOLOGY_TYPE = '" + barcodeSymbology.SYMBOLOGY_TYPE + "'")
                    .Append(" AND BARCODE_LENGTH = '" + barcodeSymbology.BARCODE_LENGTH + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    int response = context.Database.ExecuteSqlCommand(_sbSQL.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : records deleted: " + response); }

                    return AtparStatusCodes.ATPAR_OK;
                }

                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }

                    return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                }
                finally
                {
                    _sbSQL = null;
                }
            }
        }
        #endregion

        #region Get Barcode translation values
        /// <summary>
        /// To get Barcode Transalation values based on User ID
        /// </summary>
        /// <param name="pUserID"></param>
        /// <param name="DeviceTokenEntry"></param>
        /// <returns>barcode data list</returns>
        public List<MT_ATPAR_BARCODE_SYMBOLOGY> GetBarcodeTranslationValues(string UserID, string[] DeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            _sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context context = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL.Append("select * from MT_ATPAR_BARCODE_SYMBOLOGY");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    var result = context.MT_ATPAR_BARCODE_SYMBOLOGY.ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : Security Params Count : " + result.Count); }

                    return result;
                }
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }

                throw ex;
            }
            finally
            {
                _sbSQL = null;
            }

        }
        #endregion

        #region Update Barcode translation values
        /// <summary>
        /// To Update Barcode Transalation values based on User ID
        /// </summary>
        /// <param name="DeviceTokenEntry"></param>
        /// <param name="barcodeSymbology"></param>
        /// <returns></returns>
        public long UpdateBarcodeTranslation(string[] DeviceTokenEntry, MT_ATPAR_BARCODE_SYMBOLOGY barcodeSymbology)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            _sbSQL = new StringBuilder();

            using (ATPAR_MT_Context context = new ATPAR_MT_Context())
            {
                try
                {
                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSQL
                    .Append(" UPDATE MT_ATPAR_BARCODE_SYMBOLOGY SET ")
                    .Append(" DESCRIPTION = '" + barcodeSymbology.DESCRIPTION + "',")
                    .Append(" ID_START_POSITION = '" + barcodeSymbology.ID_START_POSITION + "',")
                    .Append(" LENGTH = '" + barcodeSymbology.LENGTH + "',")
                    .Append(" UPDATE_USERID = '" + barcodeSymbology.UPDATE_USERID + "',")
                    .Append(" UPDATE_DATE = '" + DateTime.Now + "'")
                    .Append(" WHERE SYMBOLOGY_TYPE = '" + barcodeSymbology.SYMBOLOGY_TYPE + "' ")
                    .Append(" AND BARCODE_LENGTH = '" + barcodeSymbology.BARCODE_LENGTH + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    int response = context.Database.ExecuteSqlCommand(_sbSQL.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : records updated : " + response); }

                    return AtparStatusCodes.ATPAR_OK;

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }

                    return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                }
                finally
                {
                    _sbSQL = null;
                }
            }


        }



        #endregion
    }
}
