using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.StockIssue;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Service.Interfaces.StockIssue;
using AtParVbUtilities;
using System.Web;
using System.IO;

namespace AtPar.StockIssue.Service
{
    public class IssueReportService : IIssueReportService
    {
        private ILog _log;
        private IIssueReportRepository _repo;
        private ICommonRepository _commonRepo;
        public IssueReportService(ILog log, IIssueReportRepository repo, ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
        }

        public AtParWebApiResponse<long> GetHeirarchyUsersList(string orgGrpID, string appID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();


            try
            {
                var result = _repo.GetHeirarchyUsersList(orgGrpID, appID, userID);

                var pDSUserList = result.Item1;
                statusCode = result.Item2;

                var dictionaryResult = new Dictionary<string, object> { { "pDSUserList", pDSUserList } };

                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                response.DataDictionary = dictionaryResult;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        public AtParWebApiResponse<string> GetOrgGroupAllocInvBUnits(int appID, string userID,
            string orgGroupID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder _sbSQL = new StringBuilder();
            string _strOrgId = string.Empty;
            string _strOrgValue = string.Empty;
            int intRCnt = 0;
            System.Data.DataSet _dsUserList = null;
            string _strUserList = string.Empty;
            DataSet pDsBUnit = new DataSet();
            string _strOrgGrpID = string.Empty;
            var dsList = new List<string>();



            var response = new AtParWebApiResponse<string>();


            if (!string.IsNullOrEmpty(orgGroupID))
            {
                _strOrgGrpID = orgGroupID;
            }
            else
            {
                _strOrgGrpID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID];
            }

            try
            {
                // var response1 = new AtParWebApiResponse<MT_ATPAR_USER>();
                var userResultTuple = _repo.GetUsersList(userID, appID.ToString(), orgGroupID);
                _dsUserList = userResultTuple.Item1;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal("Failed to  GetUsersList " + Environment.NewLine + ex.ToString());
                }

                response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL, _commonRepo, _log);
                return response;
            }

            if (_dsUserList.Tables[0].Rows.Count == 0)
            {
                if (_log.IsWarnEnabled)
                {
                    _log.Warn(methodBaseName + ": Users are not allocated to Org Group : " + _strOrgGrpID);
                }

                response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                return response;
            }

            //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of _dsUserList.Tables(0).Rows.Count for every iteration:
            int tempVar = _dsUserList.Tables[0].Rows.Count;
            for (intRCnt = 0; intRCnt < tempVar; intRCnt++)
            {

                if (!string.IsNullOrEmpty(_strUserList))
                {
                    _strUserList = _strUserList + "," + "'" + _dsUserList.Tables[0].Rows[intRCnt]["USER_ID"].ToString() + "'";
                }
                else
                {
                    _strUserList = "'" + _dsUserList.Tables[0].Rows[intRCnt]["USER_ID"].ToString() + "'";
                }

            }


            try
            {
                var result = _repo.GetDistinctBunits(appID.ToString(), _strUserList);
                dsList = result.Item1;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to Get Allocated Inv BUnits " + Environment.NewLine + " with the following SQL :" + _sbSQL.ToString() + Environment.NewLine + " Exception is:" + ex.ToString() + Environment.NewLine);
                }

                response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL, _commonRepo, _log);
                return response;
            }

            if (dsList.Count == 0)
            {
                if (_log.IsWarnEnabled)
                {
                    _log.Warn(methodBaseName + " Inventory BUnits are not allocated");
                }
                response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                return response;
                // return AtparStatusCodes. E_NORECORDFOUND;
            }
            //var dictionaryResult = new Dictionary<string, object> { { "pDsBUnit", pDsBUnit } };
            response.DataList = dsList;
            response.AtParSuccess();
            return response;
        }

        public AtParWebApiResponse<long> GetIssueReport(string bUnit, string userID,
            string deptID, string patientID, string issueToUser,
            string itemID, string itemDesc, string price, DateTime fromDt,
            DateTime toDt, string status, string serverUserID,
            string issueToLocation, List<VM_STOCKISSUE_USERDETAILS> userList, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();

            var pDsUserList = new DataSet();// userList.ToDataSet();
            if (userList != null) pDsUserList = userList.ToDataSet();
            try
            {
                var result = _repo.GetIssueReport(bUnit, userID,
             deptID, patientID, issueToUser,
             itemID, itemDesc, price, fromDt,
             toDt, status, serverUserID,
             issueToLocation, pDsUserList, deviceTokenEntry);

                var pDSUserList = result.Item1;
                statusCode = result.Item2;

                VbUtilities ObjVButil = new VbUtilities();


                for (int i = 0; i < pDSUserList.Tables[0].Rows.Count; i++)
                {
                    if (!string.IsNullOrEmpty(pDSUserList.Tables[0].Rows[i]["SIGNATURE"].ToString()))
                    {
                        //string strPath = "D:\\Images\\" + pDSUserList.Tables[0].Rows[i]["TRANS_ID"].ToString() + ".jpg";
                        //string path = HttpContext.Current.Server.MapPath(@"~/Uploaded"); //Path                                                                                        

                        string path = AppDomain.CurrentDomain.BaseDirectory[0].ToString() + ":\\AtPar\\AtParWebApi\\Uploaded\\";

                        _log.Debug(path + " Signature Path");

                        if (!Directory.Exists(path)) //Check if directory exist
                        {
                            Directory.CreateDirectory(path); //Create directory if it doesn't exist
                        }
                        string strPath= path+ pDSUserList.Tables[0].Rows[i]["TRANS_ID"].ToString() + ".jpg";

                        pDSUserList.Tables[0].Rows[i]["SIGNATURE"] = ObjVButil.Signature(strPath, pDSUserList.Tables[0].Rows[i]["SIGNATURE"].ToString());

                       
                    }
                }



                var dictionaryResult = new Dictionary<string, object> { { "pDSUserList", pDSUserList } };

                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                response.DataDictionary = dictionaryResult;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
    }
}
