using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;

namespace AtPar.POU.Service
{
    public class DailyUserActivityReportService : IDailyUserActivityReportService
    {
        private ILog _log;
        private IDailyUserActivityReportRepository _repo;
        private ICommonRepository _commonRepo;
        public DailyUserActivityReportService(ILog log, IDailyUserActivityReportRepository repo , ICommonRepository commonRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
        }

        public AtParWebApiResponse<long> GetDailyUserActivityRep(string userID, string transType, string date, int appID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
          
            var response = new AtParWebApiResponse<long>();
            DataSet returnDS = new DataSet();
            try
            {
                var result = _repo.GetDailyUserActivityRep( userID,  transType,  date,  appID, ref returnDS,  deviceTokenEntry);

                if (!result.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(result, _commonRepo, _log);
                    return response;
                }


                if (returnDS.Tables[0].Rows.Count > 0)
                {
                    int _strStatus = 0;
                    int _totalIssues = 0;
                    int _totalReturns = 0;

                    DataView _dv = new DataView();
                    TimeSpan totalTime = new TimeSpan(0, 0, 0);
                    string _strMinDate = string.Empty;
                    string _strMaxDate = string.Empty;
                    TimeSpan totalTimeIssues = new TimeSpan(0, 0, 0);
                    double avgTotalTimeIssues1 = 0;
                    string avgTotalTimeIssuesstr = null;

                    DataView _dv1 = new DataView();
                    string _strMinDate1 = string.Empty;
                    string _strMaxDate1 = string.Empty;
                    TimeSpan totalTimeReturn = new TimeSpan(0, 0, 0);
                    double avgTotalTimeReturns1 = 0;
                    string avgTotalTimeReturnsstr = null;
                    if (transType == "0")
                    {

                        for (int intcount = 0; intcount <= returnDS.Tables[0].Rows.Count - 1; intcount++)
                        {
                            _strStatus = int.Parse(returnDS.Tables[0].Rows[intcount]["STATUS"].ToString());

                            Int32 _strTotalRec = int.Parse(returnDS.Tables[0].Rows[intcount]["TOTAL_REC_SENT"].ToString());

                            if (_strStatus == (int)AtParWebEnums.AppTransactionStatus.Issued)
                            {
                                _totalIssues = _totalIssues + _strTotalRec;

                            }
                            else if (_strStatus == (int)AtParWebEnums.AppTransactionStatus.Returned)
                            {
                                _totalReturns = _totalReturns + _strTotalRec;

                            }
                        }

                        _dv = returnDS.Tables[0].DefaultView;
                        _dv.Sort = "TOTAL_TIME ASC";

                        if (_dv.Count > 0)
                        {
                            for (int i = 0; i <= _dv.Count - 1; i++)
                            {
                                string[] arrStr = _dv[i]["TOTAL_TIME"].ToString().Split(Convert.ToChar(":"));
                                TimeSpan timTmp = new TimeSpan(Convert.ToInt32(arrStr[0]), Convert.ToInt32(arrStr[1]), Convert.ToInt32(arrStr[2]));
                                totalTime = totalTime.Add(timTmp);
                            }
                        }


                        _dv.RowFilter = "STATUS = " + (int)AtParWebEnums.AppTransactionStatus.Issued;
                        if (_dv.Count > 0)
                        {
                            _strMinDate = _dv[0]["TOTAL_TIME"].ToString();
                            _strMaxDate = _dv[_dv.Count - 1]["TOTAL_TIME"].ToString();
                            int avgTimeIssues = _dv.Count;
                            for (int i = 0; i <= _dv.Count - 1; i++)
                            {
                                string[] arrStr = _dv[i]["TOTAL_TIME"].ToString().Split(Convert.ToChar(":"));
                                TimeSpan timTmp = new TimeSpan(Convert.ToInt32(arrStr[0]), Convert.ToInt32(arrStr[1]), Convert.ToInt32(arrStr[2]));
                                totalTimeIssues = totalTimeIssues.Add(timTmp);
                                avgTotalTimeIssues1 = totalTimeIssues.TotalSeconds / avgTimeIssues;
                            }
                        }
                        else
                        {
                            _strMinDate = "0";
                            _strMaxDate = "0";
                        }

                        Int64 _issueSeconds = (long)Math.Round(avgTotalTimeIssues1);
                        TimeSpan avgTotalTimeIssues = new TimeSpan(TimeSpan.TicksPerSecond * _issueSeconds);
                        avgTotalTimeIssuesstr = avgTotalTimeIssues.Hours.ToString("00") + ":" + avgTotalTimeIssues.Minutes.ToString("00") + ":" + avgTotalTimeIssues.Seconds.ToString("00");


                        _dv1 = returnDS.Tables[0].DefaultView;
                        _dv1.Sort = "TOTAL_TIME ASC";
                        _dv1.RowFilter = "STATUS = " + (int)AtParWebEnums.AppTransactionStatus.Returned;
                        if (_dv1.Count > 0)
                        {
                            _strMinDate1 = _dv1[0]["TOTAL_TIME"].ToString();
                            _strMaxDate1 = _dv1[_dv1.Count - 1]["TOTAL_TIME"].ToString();

                            int avgTimeReturn = _dv1.Count;
                            for (int i = 0; i <= _dv1.Count - 1; i++)
                            {
                                string[] arrStr = _dv1[i]["TOTAL_TIME"].ToString().Split(Convert.ToChar(":"));
                                TimeSpan timTmp = new TimeSpan(Convert.ToInt32(arrStr[0]), Convert.ToInt32(arrStr[1]), Convert.ToInt32(arrStr[2]));
                                totalTimeReturn = totalTimeReturn.Add(timTmp);
                                avgTotalTimeReturns1 = totalTimeReturn.TotalSeconds / avgTimeReturn;
                            }
                        }
                        else
                        {
                            _strMinDate1 = "0";
                            _strMaxDate1 = "0";
                        }

                        Int64 _returnSeconds = (long)Math.Round(avgTotalTimeReturns1);
                        TimeSpan avgTotalTimereturn = new TimeSpan(TimeSpan.TicksPerSecond * _returnSeconds);
                        avgTotalTimeReturnsstr = avgTotalTimereturn.Hours.ToString("00") + ":" + avgTotalTimereturn.Minutes.ToString("00") + ":" + avgTotalTimereturn.Seconds.ToString("00");
                    }
                    else if (transType == "1")
                    {
                        for (int intcount = 0; intcount <= returnDS.Tables[0].Rows.Count - 1; intcount++)
                        {
                            _strStatus = int.Parse(returnDS.Tables[0].Rows[intcount]["STATUS"].ToString());

                            Int32 _strTotalRec = int.Parse(returnDS.Tables[0].Rows[intcount]["TOTAL_REC_SENT"].ToString());

                            if (_strStatus == (int)AtParWebEnums.AppTransactionStatus.CycleCount)
                            {
                                _totalIssues = _totalIssues + _strTotalRec;

                            }
                            else if (_strStatus == (int)AtParWebEnums.AppTransactionStatus.PutAway)
                            {
                                _totalReturns = _totalReturns + _strTotalRec;

                            }
                        }

                        _dv = returnDS.Tables[0].DefaultView;
                        _dv.Sort = "TOTAL_TIME ASC";

                        if (_dv.Count > 0)
                        {
                            for (int i = 0; i <= _dv.Count - 1; i++)
                            {
                                string[] arrStr = _dv[i]["TOTAL_TIME"].ToString().Split(Convert.ToChar(":"));
                                TimeSpan timTmp = new TimeSpan(Convert.ToInt32(arrStr[0]), Convert.ToInt32(arrStr[1]), Convert.ToInt32(arrStr[2]));
                                totalTime = totalTime.Add(timTmp);
                            }
                        }


                        _dv.RowFilter = "STATUS = " + (int)AtParWebEnums.AppTransactionStatus.CycleCount;
                        if (_dv.Count > 0)
                        {
                            _strMinDate = _dv[0]["TOTAL_TIME"].ToString();
                            _strMaxDate = _dv[_dv.Count - 1]["TOTAL_TIME"].ToString();
                            int avgTimeIssues = _dv.Count;
                            for (int i = 0; i <= _dv.Count - 1; i++)
                            {
                                string[] arrStr = _dv[i]["TOTAL_TIME"].ToString().Split(Convert.ToChar(":"));
                                TimeSpan timTmp = new TimeSpan(Convert.ToInt32(arrStr[0]), Convert.ToInt32(arrStr[1]), Convert.ToInt32(arrStr[2]));
                                totalTimeIssues = totalTimeIssues.Add(timTmp);
                                avgTotalTimeIssues1 = totalTimeIssues.TotalSeconds / avgTimeIssues;
                            }
                        }
                        else
                        {
                            _strMinDate = "0";
                            _strMaxDate = "0";
                        }

                        Int64 _issueSeconds = (long)Math.Round(avgTotalTimeIssues1);
                        TimeSpan avgTotalTimeIssues = new TimeSpan(TimeSpan.TicksPerSecond * _issueSeconds);
                        avgTotalTimeIssuesstr = avgTotalTimeIssues.Hours.ToString("00") + ":" + avgTotalTimeIssues.Minutes.ToString("00") + ":" + avgTotalTimeIssues.Seconds.ToString("00");


                        _dv1 = returnDS.Tables[0].DefaultView;
                        _dv1.Sort = "TOTAL_TIME ASC";
                        _dv1.RowFilter = "STATUS = " + (int)AtParWebEnums.AppTransactionStatus.PutAway;
                        if (_dv1.Count > 0)
                        {
                            _strMinDate1 = _dv1[0]["TOTAL_TIME"].ToString();
                            _strMaxDate1 = _dv1[_dv1.Count - 1]["TOTAL_TIME"].ToString();

                            int avgTimeReturn = _dv1.Count;
                            for (int i = 0; i <= _dv1.Count - 1; i++)
                            {
                                string[] arrStr = _dv1[i]["TOTAL_TIME"].ToString().Split(Convert.ToChar(":"));
                                TimeSpan timTmp = new TimeSpan(Convert.ToInt32(arrStr[0]), Convert.ToInt32(arrStr[1]), Convert.ToInt32(arrStr[2]));
                                totalTimeReturn = totalTimeReturn.Add(timTmp);
                                avgTotalTimeReturns1 = totalTimeReturn.TotalSeconds / avgTimeReturn;
                            }
                        }
                        else
                        {
                            _strMinDate1 = "0";
                            _strMaxDate1 = "0";
                        }

                        Int64 _returnSeconds = (long)Math.Round(avgTotalTimeReturns1);
                        TimeSpan avgTotalTimereturn = new TimeSpan(TimeSpan.TicksPerSecond * _returnSeconds);
                        avgTotalTimeReturnsstr = avgTotalTimereturn.Hours.ToString("00") + ":" + avgTotalTimereturn.Minutes.ToString("00") + ":" + avgTotalTimereturn.Seconds.ToString("00");

                    }
                    else if (transType == "2")
                    {
                        for (int intcount = 0; intcount <= returnDS.Tables[0].Rows.Count - 1; intcount++)
                        {
                            _strStatus = int.Parse(returnDS.Tables[0].Rows[intcount]["STATUS"].ToString());

                            Int32 _strTotalRec = int.Parse(returnDS.Tables[0].Rows[intcount]["TOTAL_REC_SENT"].ToString());

                            if (_strStatus == (int)AtParWebEnums.AppTransactionStatus.CasePick)
                            {
                                _totalIssues = _totalIssues + _strTotalRec;

                            }
                            else if (_strStatus == (int)AtParWebEnums.CASE_PICK_STATUS.CLOSED || _strStatus == (int)AtParWebEnums.CASE_PICK_STATUS.REMOVE || _strStatus == (int)AtParWebEnums.CASE_PICK_STATUS.REVIEWED || _strStatus == (int)AtParWebEnums.CASE_PICK_STATUS.RETURNED)
                            {
                                _totalReturns = _totalReturns + _strTotalRec;

                            }
                        }

                        _dv = returnDS.Tables[0].DefaultView;
                        _dv.Sort = "TOTAL_TIME ASC";

                        if (_dv.Count > 0)
                        {
                            for (int i = 0; i <= _dv.Count - 1; i++)
                            {
                                string[] arrStr = _dv[i]["TOTAL_TIME"].ToString().Split(Convert.ToChar(":"));
                                TimeSpan timTmp = new TimeSpan(Convert.ToInt32(arrStr[0]), Convert.ToInt32(arrStr[1]), Convert.ToInt32(arrStr[2]));
                                totalTime = totalTime.Add(timTmp);
                            }
                        }


                        _dv.RowFilter = "STATUS = " + (int)AtParWebEnums.AppTransactionStatus.CasePick;
                        if (_dv.Count > 0)
                        {
                            _strMinDate = _dv[0]["TOTAL_TIME"].ToString();
                            _strMaxDate = _dv[_dv.Count - 1]["TOTAL_TIME"].ToString();
                            int avgTimeIssues = _dv.Count;
                            for (int i = 0; i <= _dv.Count - 1; i++)
                            {
                                string[] arrStr = _dv[i]["TOTAL_TIME"].ToString().Split(Convert.ToChar(":"));
                                TimeSpan timTmp = new TimeSpan(Convert.ToInt32(arrStr[0]), Convert.ToInt32(arrStr[1]), Convert.ToInt32(arrStr[2]));
                                totalTimeIssues = totalTimeIssues.Add(timTmp);
                                avgTotalTimeIssues1 = totalTimeIssues.TotalSeconds / avgTimeIssues;
                            }
                        }
                        else
                        {
                            _strMinDate = "0";
                            _strMaxDate = "0";
                        }

                        Int64 _issueSeconds = (long)Math.Round(avgTotalTimeIssues1);
                        TimeSpan avgTotalTimeIssues = new TimeSpan(TimeSpan.TicksPerSecond * _issueSeconds);
                        avgTotalTimeIssuesstr = avgTotalTimeIssues.Hours.ToString("00") + ":" + avgTotalTimeIssues.Minutes.ToString("00") + ":" + avgTotalTimeIssues.Seconds.ToString("00");


                        _dv1 = returnDS.Tables[0].DefaultView;
                        _dv1.Sort = "TOTAL_TIME ASC";
                        _dv1.RowFilter = "STATUS IN (" + (int)AtParWebEnums.CASE_PICK_STATUS.CLOSED + ", " + (int)AtParWebEnums.CASE_PICK_STATUS.REMOVE + ", " + (int)AtParWebEnums.CASE_PICK_STATUS.REVIEWED + ", " + (int)AtParWebEnums.CASE_PICK_STATUS.RETURNED + ")";
                        if (_dv1.Count > 0)
                        {
                            _strMinDate1 = _dv1[0]["TOTAL_TIME"].ToString();
                            _strMaxDate1 = _dv1[_dv1.Count - 1]["TOTAL_TIME"].ToString();

                            int avgTimeReturn = _dv1.Count;
                            for (int i = 0; i <= _dv1.Count - 1; i++)
                            {
                                string[] arrStr = _dv1[i]["TOTAL_TIME"].ToString().Split(Convert.ToChar(":"));
                                TimeSpan timTmp = new TimeSpan(Convert.ToInt32(arrStr[0]), Convert.ToInt32(arrStr[1]), Convert.ToInt32(arrStr[2]));
                                totalTimeReturn = totalTimeReturn.Add(timTmp);
                                avgTotalTimeReturns1 = totalTimeReturn.TotalSeconds / avgTimeReturn;
                            }
                        }
                        else
                        {
                            _strMinDate1 = "0";
                            _strMaxDate1 = "0";
                        }

                        Int64 _returnSeconds = (long)Math.Round(avgTotalTimeReturns1);
                        TimeSpan avgTotalTimereturn = new TimeSpan(TimeSpan.TicksPerSecond * _returnSeconds);
                        avgTotalTimeReturnsstr = avgTotalTimereturn.Hours.ToString("00") + ":" + avgTotalTimereturn.Minutes.ToString("00") + ":" + avgTotalTimereturn.Seconds.ToString("00");
                    }

                    List<VM_TRANSACTION_SUMMARY> TSlist = new List<VM_TRANSACTION_SUMMARY>();
                    VM_TRANSACTION_SUMMARY Tsobj = new VM_TRANSACTION_SUMMARY();
                    Tsobj.TOT_ISSUE_TIME = (totalTimeIssues.Days * 24 + totalTimeIssues.Hours).ToString("00") + ":" + totalTimeIssues.Minutes.ToString("00") + ":" + totalTimeIssues.Seconds.ToString("00");
                    Tsobj.TOT_RETURN_TIME = (totalTimeReturn.Days * 24 + totalTimeReturn.Hours).ToString("00") + ":" + totalTimeReturn.Minutes.ToString("00") + ":" + totalTimeReturn.Seconds.ToString("00");
                    Tsobj.AVG_ISSUE_TIME = avgTotalTimeIssuesstr;
                    Tsobj.AVG_RETURN_TIME = avgTotalTimeReturnsstr;
                    Tsobj.TOT_ISSUE_ITEMS = _totalIssues.ToString();
                    Tsobj.TOT_RETURN_ITEMS = _totalReturns.ToString();
                    Tsobj.MAX_ISSUE_TIME = _strMaxDate;
                    Tsobj.MAX_RETURN_TIME = _strMaxDate1;
                    Tsobj.MIN_ISSUE_TIME = _strMinDate;
                    Tsobj.MIN_RETURN_TIME = _strMinDate1;
                    Tsobj.TOT_TIME = (totalTime.Days * 24 + totalTime.Hours).ToString("00") + ":" + totalTime.Minutes.ToString("00") + ":" + totalTime.Seconds.ToString("00");
                    TSlist.Add(Tsobj);
                    returnDS.Tables.Add(TSlist.ToDataTable());
                    returnDS.Tables[1].TableName = "SUMMARY";
                }

                var dictionaryResult = new Dictionary<string, object> { { "pReturnDS", returnDS } };          

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

        public class VM_TRANSACTION_SUMMARY
        {
            public string TOT_ISSUE_TIME { get; set; }
            public string TOT_RETURN_TIME { get; set; }
            public string AVG_ISSUE_TIME { get; set; }
            public string AVG_RETURN_TIME { get; set; }
            public string TOT_ISSUE_ITEMS { get; set; }
            public string TOT_RETURN_ITEMS { get; set; }
            public string MAX_ISSUE_TIME { get; set; }
            public string MAX_RETURN_TIME { get; set; }
            public string MIN_ISSUE_TIME { get; set; }
            public string MIN_RETURN_TIME { get; set; }
            public string TOT_TIME { get; set; }

        }
    }
}
