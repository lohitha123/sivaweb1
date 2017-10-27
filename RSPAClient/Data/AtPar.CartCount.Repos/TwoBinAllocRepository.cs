using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using AtPar.Repository.Interfaces.CartCount;

namespace AtPar.CartCount.Repos
{
    public class TwoBinAllocRepository : ITwoBinAllocRepository
    {
        ILog _log;
        public TwoBinAllocRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(TwoBinAllocRepository));
        }

        #region AllocateBins

        /// <summary>
        /// Used to delete the Bins based on BUnit
        /// </summary>
        /// <param name="lstBins"></param>
        /// <param name="bUnit"></param>
        /// <param name="objContext"></param>
        /// <returns>Success or Failure code</returns>
        private long DeleteBins(List<MT_CRCT_TWO_BIN_ALLOCATION> lstBins, string bUnit, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_CRCT_TWO_BIN_ALLOCATION WHERE BUSINESS_UNIT = '" + bUnit + "' ");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows deleted " + count); }

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
        /// 
        /// </summary>
        /// <param name="lstBins"></param>
        /// <param name="objContext"></param>
        /// <returns></returns>
        private long InsertBins(List<MT_CRCT_TWO_BIN_ALLOCATION> lstBins, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                foreach (var item in lstBins)
                {

                    

                    sbSql.Clear();

                    item.ReplaceProperty(c => c.BUSINESS_UNIT);

                    sbSql.Append("INSERT INTO MT_CRCT_TWO_BIN_ALLOCATION(BUSINESS_UNIT, CART_ID, DESCR, TWO_BIN_ALLOCATION, ");
                    sbSql.Append("DEF_PERCENTAGE_VALUE, UPDATE_USER_ID, UPDATE_DATE) VALUES(");
                    sbSql.Append("'" + item.BUSINESS_UNIT + "', '" + item.CART_ID + "', '" + item.DESCR + "', ");
                    sbSql.Append("'" + item.TWO_BIN_ALLOCATION + "', '" + item.DEF_PERCENTAGE_VALUE + "', '" + item.UPDATE_USER_ID + "', ");
                    sbSql.Append(" CONVERT(date,getdate()) )");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows inserted " + count); }

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

        public long TwoBinSaving(List<MT_CRCT_TWO_BIN_ALLOCATION> lstBins, string bUnit)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {

                        long StatusCode = DeleteBins(lstBins, bUnit, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
                        }

                        StatusCode = InsertBins(lstBins, objContext);

                        if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                        {
                            trans.Rollback();
                            return StatusCode;
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

        #region GetTwoBinCartsAllocation
        public List<MT_CRCT_TWO_BIN_ALLOCATION> GetTwoBinCartsAllocation(string bUnit, string cartID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID, DESCR, DEF_PERCENTAGE_VALUE, UPDATE_USER_ID,  ");
                    sbSql.Append("UPDATE_DATE, CASE TWO_BIN_ALLOCATION WHEN 'Y' THEN 'TRUE' ELSE 'FALSE' END AS TWO_BIN_ALLOCATION ");
                    sbSql.Append("FROM MT_CRCT_TWO_BIN_ALLOCATION WHERE BUSINESS_UNIT = '" + bUnit + "' ");


                    if(!string.IsNullOrEmpty(cartID) && cartID !="null" && cartID !="undefined")
                    {
                        //sbSql.Append("AND CART_ID LIKE '" + cartID + "%'  ");
                        sbSql.Append("AND CART_ID LIKE '%" + cartID + "%' ");
                    }
                   

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fileds = new[] { "BUSINESS_UNIT", "CART_ID", "DESCR", "DEF_PERCENTAGE_VALUE", "UPDATE_USER_ID", "UPDATE_DATE", "TWO_BIN_ALLOCATION",   };

                    var lstBusinessUnits = objContext.Database.DifferedExecuteQuery<MT_CRCT_TWO_BIN_ALLOCATION>(fileds, sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstBusinessUnits); }

                    return lstBusinessUnits;

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
