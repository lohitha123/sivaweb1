using AtPar.Common;
using AtPar.Data;
using AtPar.Repository.Interfaces.PickPlan;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.PickPlan.Repos
{
    public class PickStatusReportRepository : IPickStatusReportRepository
    {
        private ILog _log;
        public PickStatusReportRepository(ILog log)
        {
            _log = log;
        }

        public Tuple<DataSet, long> Getpickstatustransactiondetails(string toDate, string fromDate, string bUnit, string orgValue)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            DataSet ds = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("select ID,SUBSTRING(ID,0,CHARINDEX('-',ID)) AS ORDER_NO, SUBSTRING(ID,CHARINDEX('-',ID)+1,LEN(ID)) AS PICK_BATCH_ID, max(UPDATE_DT_TIME) as UPDATETIME," + " BUSINESS_UNIT,MAU.FIRST_NAME+' '+MAU.MIDDLE_INITIAL+' '+MAU.LAST_NAME+'('+MAT.USER_ID+')' AS USER_ID," + " max(DOWNLOAD_DT_TIME) AS DOWNLOADTIME,DESCR from MT_ATPAR_TRANSACTION MAT  inner join MT_ATPAR_USER MAU on MAU.USER_ID=MAT.USER_ID  AND MAT.APP_ID =5 AND" + " UPDATE_DT_TIME BETWEEN CONVERT(DATETIME,'" + fromDate + "',101) AND DATEADD(DAY,1,CONVERT(DATETIME,'" + toDate + "',101)) AND " + " BUSINESS_UNIT= '" + bUnit + "' AND " + " MAT.USER_ID IN ( SELECT DISTINCT  MAUOG.USER_ID FROM  MT_ATPAR_USER MAU, MT_ATPAR_USER_ORG_GROUPS MAUOG,MT_ATPAR_PROFILE_APP_ACL MAPAA" + " WHERE(MAU.USER_ID = MAUOG.USER_ID) AND STATUS IN(1,11) AND MAU.PROFILE_ID=MAPAA.PROFILE_ID AND MAPAA.APP_ID=5 AND MAUOG.ORG_GROUP_ID='" + orgValue + "')" + " group by ID,BUSINESS_UNIT,MAU.FIRST_NAME,MAU.MIDDLE_INITIAL,MAU.LAST_NAME,MAT.USER_ID,DESCR order by ID ASC,UPDATETIME ASC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var tranDetails = objContext.Database.SqlQuery<VM_PICKPLAN_STATUS_TRANSACTION_DETAILS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of user parameters returned: " + tranDetails.Count()); }

                    ds = tranDetails.ToDataSet();

                    return new Tuple<DataSet, long>(ds, AtparStatusCodes.ATPAR_OK);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return new Tuple<DataSet, long>(ds, AtparStatusCodes.ATPAR_OK);
            }
            finally
            {
                sbSql = null;
            }
        }

        public Tuple<DataSet, long> Getpickplandetails( string plans, string bUnit, string orgValue)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _StatusCode = string.Empty;
            StringBuilder _strSQL = new StringBuilder();
            DataSet pDsPlansDetails = new DataSet();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    _strSQL.Append("select ID,SUBSTRING(ID,0,CHARINDEX('-',ID)) AS ORDER_NO, SUBSTRING(ID,CHARINDEX('-',ID)+1,LEN(ID)) AS PICK_BATCH_ID, max(UPDATE_DT_TIME) as UPDATETIME," + " BUSINESS_UNIT,MAU.FIRST_NAME+' '+MAU.MIDDLE_INITIAL+' '+MAU.LAST_NAME+'('+MAT.USER_ID+')' AS USER_ID," + " max(DOWNLOAD_DT_TIME) AS DOWNLOADTIME,DESCR from MT_ATPAR_TRANSACTION MAT  inner join MT_ATPAR_USER MAU on MAU.USER_ID=MAT.USER_ID  AND MAT.APP_ID =5 AND");
                    if (string.IsNullOrEmpty(plans))
                    {
                        _strSQL.Append(" ID IN('')");
                    }
                    else
                    {
                        _strSQL.Append(" ID IN(" + plans + ")");
                    }

                    _strSQL.Append(" AND BUSINESS_UNIT= '" + bUnit + "' AND " + " MAT.USER_ID IN ( SELECT DISTINCT  MAUOG.USER_ID FROM  MT_ATPAR_USER MAU, MT_ATPAR_USER_ORG_GROUPS MAUOG,MT_ATPAR_PROFILE_APP_ACL MAPAA" + " WHERE(MAU.USER_ID = MAUOG.USER_ID) AND STATUS IN(1,11) AND MAU.PROFILE_ID=MAPAA.PROFILE_ID AND MAPAA.APP_ID=5 AND MAUOG.ORG_GROUP_ID='" + orgValue + "')" + " group by ID,BUSINESS_UNIT,MAU.FIRST_NAME,MAU.MIDDLE_INITIAL,MAU.LAST_NAME,MAT.USER_ID,DESCR order by ID ASC,UPDATETIME ASC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _strSQL.ToString() + ":")); }
                    }
                    var tranDetails = objContext.Database.SqlQuery<VM_PICKPLAN_STATUS_TRANSACTION_DETAILS>(_strSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of user parameters returned: " + tranDetails.Count()); }

                    pDsPlansDetails = tranDetails.ToDataSet();

                    return new Tuple<DataSet, long>(pDsPlansDetails, AtparStatusCodes.ATPAR_OK);
                }


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                return new Tuple<DataSet, long>(pDsPlansDetails, AtparStatusCodes.ATPAR_OK);
            }
            finally
            {
                _strSQL = null;
            }
        }
    }
}
