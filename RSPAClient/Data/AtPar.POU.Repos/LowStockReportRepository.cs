using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Repos
{
   public class LowStockReportRepository : ILowStockReportRepository
    {
        private ILog _log;
        public LowStockReportRepository(ILog log)
        {
            _log = log;
        }

        public Tuple<DataSet, long> GetLowStockRep(int appID, string orgGroupID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (appID == 20)
                    {
                        sbSQL.Append("SELECT BUSINESS_UNIT, CART_ID, MAIN_ITEM_ID AS ITEM_ID, SUM(ITEM_QUANTITY_ON_HAND)AS ITEM_QUANTITY_ON_HAND, COMPARTMENT FROM ( SELECT BUSINESS_UNIT, CART_ID, A.ITEM_ID, ITEM_QUANTITY_ON_HAND, ISNULL(B.ITEM_ID, A.ITEM_ID) AS MAIN_ITEM_ID, COMPARTMENT FROM ( SELECT BUSINESS_UNIT,CART_ID,ITEM_ID,SUM(ITEM_QUANTITY_ON_HAND) AS ITEM_QUANTITY_ON_HAND, COMPARTMENT FROM MT_POU_CART_INVENTORY WHERE CART_ID IN (SELECT DISTINCT C.CART_ID FROM MT_POU_DEPT_CART_ALLOCATIONS C,MT_POU_DEPT_USER_ALLOCATIONS U WHERE C.APP_ID="+ appID +" AND U.ORG_GROUP_ID=C.ORG_GROUP_ID AND U.ORG_GROUP_ID = '" + orgGroupID + "' AND U.USER_ID = '" + userID + "') GROUP BY BUSINESS_UNIT,CART_ID, ITEM_ID,COMPARTMENT) A LEFT OUTER JOIN PAR_MNGT_ITEM_SUBSTITUTE B ON A.ITEM_ID=B.SUBSTITUTE_ITEM_ID) B GROUP BY BUSINESS_UNIT,CART_ID, MAIN_ITEM_ID,COMPARTMENT ORDER BY BUSINESS_UNIT, CART_ID, ITEM_ID, COMPARTMENT");
                    }
                    else
                    {
                        sbSQL.Append("SELECT BUSINESS_UNIT,CART_ID,ITEM_ID,SUM(ITEM_QUANTITY_ON_HAND) AS ITEM_QUANTITY_ON_HAND,COMPARTMENT FROM MT_POU_CART_INVENTORY WHERE CART_ID IN (SELECT DISTINCT C.CART_ID FROM MT_POU_DEPT_CART_ALLOCATIONS C,MT_POU_DEPT_USER_ALLOCATIONS U WHERE C.APP_ID="+ appID +" AND U.ORG_GROUP_ID=C.ORG_GROUP_ID AND U.ORG_GROUP_ID = '"+ orgGroupID +"' AND U.USER_ID = '"+ userID +"') GROUP BY BUSINESS_UNIT,ITEM_ID,CART_ID, COMPARTMENT");
                    }
                    var lstResult = objContext.Database.SqlQuery<VM_GETLOWSTOCKREP>(sbSQL.ToString()).ToList();

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstResult.Count); }

                    var ds= lstResult.ToDataSet();
                    return new Tuple<DataSet, long>(ds, AtparStatusCodes.ATPAR_OK);
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQL.ToString()); }
                return new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
            }
            finally
            {
                sbSQL = null;
            }
        }

        public class VM_GETLOWSTOCKREP
        {
            public string BUSINESS_UNIT { get; set; }
            public string CART_ID { get; set; }
            public string ITEM_ID { get; set; }
            public double ITEM_QUANTITY_ON_HAND { get; set; }
            public string COMPARTMENT { get; set; }
        }
    }
}
