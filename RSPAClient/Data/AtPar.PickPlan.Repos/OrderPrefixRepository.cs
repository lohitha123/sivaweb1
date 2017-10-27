using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using System.Data;
using log4net;
using AtPar.Repository.Interfaces.PickPlan;
using AtPar.Common;

namespace AtPar.PickPlan.Repos
{
    public class OrderPrefixRepository : IOrderPrefixRepository
    {
        ILog _log;

        public OrderPrefixRepository(ILog log)
        {
            _log = log;
        }

        public List<MT_PKPL_ORDER_PREFIX> GetOrderPrefixSetUp()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

           List<MT_PKPL_ORDER_PREFIX> lstOrderPrefix = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    lstOrderPrefix = objContext.MT_PKPL_ORDER_PREFIX.ToList();


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }

                        }
                    }                  

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Orders Returned: " + lstOrderPrefix.Count()); }

                    return lstOrderPrefix;
                }

                
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
          

        }

        public long SaveOrderPrefixSetUp(List<MT_PKPL_ORDER_PREFIX> orderPrefix)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = string.Empty;
            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    _strSQL = "DELETE FROM MT_PKPL_ORDER_PREFIX";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _strSQL.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(_strSQL.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + count); }
                                        
                    try
                    {
                        foreach (var item in orderPrefix)
                        {
                            sbSql.Clear();


                            if (item.CHK_VALUE == 1)
                            {
                                sbSql.Append(" INSERT INTO MT_PKPL_ORDER_PREFIX (ORDER_PREFIX, PREFIX_DESCR) ");
                                sbSql.Append(" VALUES('" + item.ORDER_PREFIX + "', '" + item.PREFIX_DESCR + "')");

                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                                }

                                var insertCount = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + insertCount); }

                            }

                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }

                        return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
                    }

                }

                return AtparStatusCodes.ATPAR_OK;
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

    }
}
