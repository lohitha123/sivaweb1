using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;
using AtPar.Common;

namespace AtPar.Init.Repos
{
    public class ReportsAdHocExtensionRepository : IReportsAdHocExtensionRepository
    {
        #region private variables

        private ILog _log;
        string appID = string.Empty;
        #endregion

        #region constructor

        public ReportsAdHocExtensionRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ReportsAdHocExtensionRepository));
        }

        #endregion

        public List<VM_MT_USER_DETAILS> GetOrgGroupsProductUsers(string userID, Guid? reportID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            string orgGrpID = string.Empty;
            string sqlstr = string.Empty;
            List<VM_MT_USER_DETAILS> usersOrgList = null;
            var listOrg = new AtParWebApiResponse<object>();
            try
            {

                using (ATPAR_REP_CONFIGContext context = new ATPAR_REP_CONFIGContext())
                {


                    if (_log.IsDebugEnabled) { context.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    Guid? report = reportID;
                    _sbSQL.Append("SELECT A.Name FROM IzendaReportCategory A join IzendaReport B on A.Id=B.CategoryId  and B.Id='" + reportID + "'");
                    var cname = context.Database.SqlQuery<string>(_sbSQL.ToString()).ToList().FirstOrDefault().ToString();
                    switch (cname)
                    {

                        case "Cart Count":
                            appID = "2";
                            break;
                        case "Cycle Count":
                            appID = "3";
                            break;
                        case "Receiving":
                            appID = "4";
                            break;
                        case "Pick":
                            appID = "5";
                            break;
                        case "Deliver":
                            appID = "6";
                            break;
                        case "Putaway":
                            appID = "7";
                            break;
                        case "TrackIT":
                            appID = "9";
                            break;
                        case "Stock Issue":
                            appID = "10";
                            break;
                        case "AssetManagement":
                            appID = "11";
                            break;
                        case "Point Of Use":
                            appID = "15";
                            break;
                        default:
                            break;
                    }
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
            try
            {
                using (ATPAR_MT_Context context1 = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context1.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    try
                    {
                        orgGrpID = GetUserOrgGrpID(userID);
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                        throw ex;

                    }
                    SqlParameter paramappID = new SqlParameter("@app_ID", appID);
                    SqlParameter paramorgGrpID = new SqlParameter("@OrgGrp_ID", orgGrpID);
                    SqlParameter paramuserID = new SqlParameter("@userID", userID);
                    object[] parameters = { paramappID, paramorgGrpID, paramuserID };
                    sqlstr = "EXEC GetHeirarchyUsersAndOrgGroupsList @app_ID,@OrgGrp_ID,@userID";
                    var output = new[] { "ORGGROUP", "FULLNAME" };
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context1.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sqlstr))); }
                    }

                    usersOrgList = context1.Database.DifferedExecuteQuery<VM_MT_USER_DETAILS>(output, sqlstr, parameters).ToList();
                    #region cmt
                    //return userslist;
                    //if ((orgGrpID == "ALL"))
                    //{
                    //    _sbSQL.Clear();
                    //    _sbSQL.Append("SELECT D.ORG_GROUP_ID+' '+'-'+' '+D.ORG_GROUP_NAME AS ORG_GROUP_ID, TEMP1.CLIENT_USER FROM");
                    //    _sbSQL.Append(" (SELECT DISTINCT A.FIRST_NAME+' '+A.MIDDLE_INITIAL+' '+A.LAST_NAME+' '+'('+B.CLIENT_USER+' '+' '+')' AS CLIENT_USER,B.ORG_GROUP_ID");
                    //    _sbSQL.Append(" FROM MT_ATPAR_USER A, MT_ATPAR_USER_GROUPS B,MT_ATPAR_USER_ACL C WHERE A.USER_ID = B.CLIENT_USER");
                    //    _sbSQL.Append(" AND A.USER_ID=C.USER_ID AND C.ACCOUNT_DISABLED=0 AND B.SERVER_USER ='"+userID+"' AND B.APP_ID='" + appID + "') AS TEMP1");
                    //    _sbSQL.Append(" JOIN MT_ATPAR_ORG_GROUPS D ON TEMP1.ORG_GROUP_ID= D.ORG_GROUP_ID WHERE D.ORG_GROUP_ID<>'ALL'");
                    //    string[] columns = { "ORG_GROUP_ID", "CLIENT_USER" };
                    //    var orgusersall = context1.Database.DifferedExecuteQuery<MT_ATPAR_USER_GROUPS>(columns, _sbSQL.ToString()).ToList();
                    //    if(orgusersall.Count == 0)
                    //    {
                    //        _sbSQL.Clear();
                    //        _sbSQL.Append("SELECT D.ORG_GROUP_ID+' '+'-'+' '+D.ORG_GROUP_NAME AS ORG_GROUP_ID, TEMP.CLIENT_USER FROM");
                    //        _sbSQL.Append(" (SELECT B.ORG_GROUP_ID, A.FIRST_NAME+' '+A.MIDDLE_INITIAL+' '+A.LAST_NAME+' '+'('+A.USER_ID+' '+' '+')' AS CLIENT_USER");
                    //        _sbSQL.Append(" FROM MT_ATPAR_USER A,MT_ATPAR_USER_ORG_GROUPS B,MT_ATPAR_USER_ACL C");
                    //        _sbSQL.Append(" WHERE A.USER_ID=B.USER_ID AND A.USER_ID=C.USER_ID AND C.ACCOUNT_DISABLED=0) AS TEMP");
                    //        _sbSQL.Append(" JOIN MT_ATPAR_ORG_GROUPS D ON TEMP.ORG_GROUP_ID= D.ORG_GROUP_ID WHERE D.ORG_GROUP_ID<>'All'");
                    //        string[] columns1 = { "ORG_GROUP_ID", "CLIENT_USER" };
                    //        orgusersall = context1.Database.DifferedExecuteQuery<MT_ATPAR_USER_GROUPS>(columns1, _sbSQL.ToString()).ToList();
                    //    }
                    //    return new List<MT_ATPAR_USER_GROUPS>(orgusersall);
                    //}
                    //else
                    //{
                    //    _sbSQL.Clear();
                    //    _sbSQL.Append(" SELECT COUNT(DISTINCT ORG_GROUP_ID) FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE BUSINESS_UNIT IN");
                    //    _sbSQL.Append(" (SELECT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  WHERE ORG_GROUP_ID='" + orgGrpID + "')");
                    //    var orgGrpCnt = context1.Database.SqlQuery<int>(_sbSQL.ToString()).FirstOrDefault();
                    //    //isuserexists = configContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();
                    //    if (orgGrpCnt > 1)
                    //    {
                    //        _sbSQL.Clear();
                    //        _sbSQL.Append("SELECT E.ORG_GROUP_ID+' '+'-'+' '+E.ORG_GROUP_NAME AS ORG_GROUP_ID,");
                    //        _sbSQL.Append(" A.FIRST_NAME+' '+A.MIDDLE_INITIAL+' '+A.LAST_NAME+' '+'('+A.USER_ID+' '+' '+')' AS CLIENT_USER");
                    //        _sbSQL.Append(" FROM MT_ATPAR_USER A,MT_ATPAR_USER_ORG_GROUPS B,MT_ATPAR_PROFILE_APP_ACL C,MT_ATPAR_USER_ACL D,MT_ATPAR_ORG_GROUPS E");
                    //        _sbSQL.Append(" WHERE A.USER_ID = B.USER_ID AND A.PROFILE_ID=C.PROFILE_ID AND A.USER_ID= D.USER_ID AND C.APP_ID= 2");
                    //        _sbSQL.Append(" AND D.ACCOUNT_DISABLED=0 AND B.ORG_GROUP_ID=E.ORG_GROUP_ID AND B.ORG_GROUP_ID IN");
                    //        _sbSQL.Append(" (SELECT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUP_BUNITS  WHERE BUSINESS_UNIT IN");
                    //        _sbSQL.Append(" (SELECT BUSINESS_UNIT FROM MT_ATPAR_ORG_GROUP_BUNITS  WHERE ORG_GROUP_ID='" + orgGrpID + "'))");
                    //        string[] columnsh = { "ORG_GROUP_ID", "CLIENT_USER" };
                    //        var husers = context1.Database.DifferedExecuteQuery<MT_ATPAR_USER_GROUPS>(columnsh, _sbSQL.ToString()).ToList();
                    //        return new List<MT_ATPAR_USER_GROUPS>(husers);
                    //    }

                    //    else
                    //    {
                    //        _sbSQL.Clear();
                    //        _sbSQL.Append(" SELECT D.ORG_GROUP_ID+' '+'-'+' '+D.ORG_GROUP_NAME AS ORG_GROUP_ID, TEMP1.CLIENT_USER FROM");
                    //        _sbSQL.Append(" (SELECT DISTINCT A.FIRST_NAME+' '+A.MIDDLE_INITIAL+' '+A.LAST_NAME+' '+'('+B.CLIENT_USER+' '+' '+')' AS CLIENT_USER,B.ORG_GROUP_ID");
                    //        _sbSQL.Append(" FROM MT_ATPAR_USER A, MT_ATPAR_USER_GROUPS B,MT_ATPAR_USER_ACL C WHERE A.USER_ID = B.CLIENT_USER");
                    //        _sbSQL.Append(" AND A.USER_ID=C.USER_ID AND C.ACCOUNT_DISABLED=0 AND B.SERVER_USER ='" + userID + "' AND B.APP_ID='" + appID + "') AS TEMP1");
                    //        _sbSQL.Append(" JOIN MT_ATPAR_ORG_GROUPS D ON TEMP1.ORG_GROUP_ID= D.ORG_GROUP_ID WHERE D.ORG_GROUP_ID='" + orgGrpID + "'");
                    //        string[] columns = { "ORG_GROUP_ID", "CLIENT_USER" };
                    //        var orgusers = context1.Database.DifferedExecuteQuery<MT_ATPAR_USER_GROUPS>(columns, _sbSQL.ToString()).ToList();
                    //        if (orgusers.Count == 0)
                    //        {
                    //            _sbSQL.Clear();
                    //            _sbSQL.Append("SELECT D.ORG_GROUP_ID+' '+'-'+' '+D.ORG_GROUP_NAME AS ORG_GROUP_ID, TEMP.CLIENT_USER FROM");
                    //            _sbSQL.Append(" (SELECT B.ORG_GROUP_ID, A.FIRST_NAME+' '+A.MIDDLE_INITIAL+' '+A.LAST_NAME+' '+'('+A.USER_ID+' '+' '+')' AS CLIENT_USER");
                    //            _sbSQL.Append(" FROM MT_ATPAR_USER A,MT_ATPAR_USER_ORG_GROUPS B,MT_ATPAR_USER_ACL C");
                    //            _sbSQL.Append(" WHERE A.USER_ID=B.USER_ID AND A.USER_ID=C.USER_ID AND C.ACCOUNT_DISABLED=0) AS TEMP");
                    //            _sbSQL.Append(" JOIN MT_ATPAR_ORG_GROUPS D ON TEMP.ORG_GROUP_ID= D.ORG_GROUP_ID  D.ORG_GROUP_ID='" + orgGrpID + "'");
                    //            string[] columns1 = { "ORG_GROUP_ID", "CLIENT_USER" };
                    //            orgusers = context1.Database.DifferedExecuteQuery<MT_ATPAR_USER_GROUPS>(columns1, _sbSQL.ToString()).ToList();
                    //        }
                    //        return new List<MT_ATPAR_USER_GROUPS>(orgusers);
                    //    }
                    //}
                    #endregion

                }
                return usersOrgList;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                throw ex;
            }
        }
        private string GetUserOrgGrpID(string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            if (userID == "IzendaAdmin@system.com")
            {
                userID = string.Empty;
                userID = "Admin";
            }
            StringBuilder _sbSQL = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context context1 = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { context1.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    List<string> sample = context1.MT_ATPAR_USER_ORG_GROUPS.Where(x => x.USER_ID == userID).Select(g => g.ORG_GROUP_ID).ToList();
                    _sbSQL.Append("SELECT ORG_GROUP_ID FROM  MT_ATPAR_USER_ORG_GROUPS  WHERE USER_ID='").Append(userID).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { context1.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }

                    var orgGrpID = context1.Database.SqlQuery<string>(_sbSQL.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : org Group ID is  " + orgGrpID); }

                    return orgGrpID;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSQL.ToString()); }
                throw ex;
            }
        }



    }

}

