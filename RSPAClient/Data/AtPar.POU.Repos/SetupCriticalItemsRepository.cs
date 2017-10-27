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
using System.Data.Entity;

namespace AtPar.POU.Repos
{
    public class SetupCriticalItemsRepository : ISetupCriticalItemsRepository
    {

        ILog _log;
        public SetupCriticalItemsRepository(ILog log)
        {
            _log = log;
        }


        public long ProcessCriticalItems(string bUnit, string cartID, List<MT_POU_CRITICAL_ITEMS> lstItems)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                        statusCode = DeleteCriticalItems(bUnit, cartID, objContext);

                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return statusCode;
                        }

                        if (lstItems.Count > 0)
                        {
                            statusCode = InsertCriticalItems(bUnit, cartID, lstItems, objContext);

                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
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

        public long DeleteCriticalItems(string bUnit, string cartID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = null, _infoMsg = null;

            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                _strSQL = "DELETE FROM MT_POU_CRITICAL_ITEMS WHERE BUSINESS_UNIT = '" + bUnit + "' AND CART_ID = '" + cartID + "'";
                _infoMsg = "  Deleting the critical items with the following SQL..." + _strSQL;
                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                }
                var count = objContext.Database.ExecuteSqlCommand(_strSQL);
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " " + _infoMsg + " " + count); }
                return AtparStatusCodes.ATPAR_OK;

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

        public long InsertCriticalItems(string bUnit, string cartID, List<MT_POU_CRITICAL_ITEMS> lstItems, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = null, _infoMsg = null;

            try
            {

                foreach (var item in lstItems)
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    _strSQL = "INSERT INTO MT_POU_CRITICAL_ITEMS (BUSINESS_UNIT, CART_ID, ITEM_ID) VALUES('" + bUnit + "','" + cartID + "', '" + item.ITEM_ID + "')";
                    _infoMsg = "  Inserting the critical items with the following SQL..." + _strSQL;
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }
                    var count = objContext.Database.ExecuteSqlCommand(_strSQL);
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " " + _infoMsg + " " + count); }

                }
                return AtparStatusCodes.ATPAR_OK;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                _strSQL = null;
            }
        }

    }
}
