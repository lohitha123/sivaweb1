using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Service.Interfaces.CartCount;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.CartCount;
using log4net;
using AtPar.Common;
using AtPar.ViewModel;
using AtPar.Common.Service;

namespace AtPar.CartCount.Service
{
    public class ActivityReportService : IActivityReportService
    {
        #region Private Variables

        IActivityReportRepository _activityRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public ActivityReportService(IActivityReportRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _activityRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
        }
        #endregion

        #region GetActivityRepData

        /// <summary>
        /// To get ActivityRepData
        /// </summary>
        /// <param name="fDate"></param>
        /// <param name="tDate"></param>
        /// <param name="appId"></param>
        /// <param name="fltr"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>

        public AtParWebApiResponse<VM_MT_ATPAR_TRANSACTION> GetActivityReportData(DateTime fDate, DateTime tDate, int appId, int fltr,
                                                            string[] deviceTokenEntry, string orgGroupID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_MT_ATPAR_TRANSACTION>();

          
            List<VM_MT_ATPAR_TRANSACTION> lstActivityDetails = new List<VM_MT_ATPAR_TRANSACTION>();
            Tuple<long, List<VM_MT_ATPAR_TRANSACTION>> tupleResult = null;
            long statusCode = -1;
            List<VM_MT_ATPAR_TRANSACTION> lstActivityDtls = new List<VM_MT_ATPAR_TRANSACTION>();

         
            int totCountDownload = 0;
            int totCountError = 0;
            int totCountSent = 0;
            int totCountUnlock = 0;
            int totCountCancel = 0;
            int totCountPutawayDownload = 0;
            int totCountPutaway = 0;

            int countDownload = 0;
            int countSent = 0;
            int countError = 0;
            int countUnlock = 0;
            int countCancel = 0;
            int countPutaway = 0;
            int countPutawayDownload = 0;

            try
            {
                tupleResult = _activityRepo.GetActivityReportData(fDate, tDate, appId, fltr, deviceTokenEntry, orgGroupID);
                statusCode = tupleResult.Item1;

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                lstActivityDetails = tupleResult.Item2;                


                if (fltr == 0) {

                    if (lstActivityDetails.Count > 0)
                    {
                        for (int i = 0; i <= lstActivityDetails.Count - 1; i++)
                        {
                            switch (lstActivityDetails[i].STATUS)
                            {
                                case (short)(AtParWebEnums.AppTransactionStatus.Downloaded):
                                    totCountDownload = lstActivityDetails[i].STC;
                                    break;
                                case (short)(AtParWebEnums.AppTransactionStatus.Error):
                                    totCountError = lstActivityDetails[i].STC;
                                    break;
                                case (short)(AtParWebEnums.AppTransactionStatus.Sent):
                                    totCountSent = lstActivityDetails[i].STC;
                                    break;
                                case (short)(AtParWebEnums.AppTransactionStatus.Unlock):
                                    totCountUnlock = lstActivityDetails[i].STC;
                                    break;
                                case (short)(AtParWebEnums.AppTransactionStatus.Cancel):
                                    totCountCancel = lstActivityDetails[i].STC;
                                    break;
                                case (short)(AtParWebEnums.AppTransactionStatus.CartPutAwayDownload):
                                    totCountPutawayDownload=lstActivityDetails[i].STC;
                                    break;
                                case (short)(AtParWebEnums.AppTransactionStatus.PutAway):
                                    totCountPutaway = lstActivityDetails[i].STC;
                                    break;
                            }
                        }
                        VM_MT_ATPAR_TRANSACTION _objReportData = new VM_MT_ATPAR_TRANSACTION();
                        totCountDownload = totCountDownload + totCountSent + totCountError + totCountUnlock + totCountCancel + totCountPutawayDownload + totCountPutaway;
                        countDownload = totCountDownload;
                        countSent = totCountSent + totCountPutaway;
                        countError = totCountError;
                        countUnlock = totCountUnlock;
                        countCancel = totCountCancel;
                        
                        _objReportData.TOTAL = "Total";
                        _objReportData.DOWNLOAD = countDownload;
                        _objReportData.SENT = countSent;
                        if (appId == (int)AtParWebEnums.EnumApps.Receiving || appId == (int)AtParWebEnums.EnumApps.PickPlan || appId == (int)AtParWebEnums.EnumApps.PutAway)
                        {
                            _objReportData.INVALID = countUnlock;
                        }
                        _objReportData.ERROR = countError;
                        
                        lstActivityDtls.Add(_objReportData);                        
                    }
                }
                else if(fltr==1 || fltr==2)
                {
                    if (lstActivityDetails.Count > 0)
                    {
                        string tempRecordValue=string.Empty;
                        string strBunitUserId = string.Empty;
                        string tempLastName = string.Empty;
                        string tempFirstName = string.Empty;
                        string tempMiddleInitial = string.Empty;

                        for (int i = 0; i <= lstActivityDetails.Count-1; i++)
                        {
                            VM_MT_ATPAR_TRANSACTION _objReportData = new VM_MT_ATPAR_TRANSACTION();

                            if (i == 0)
                            {
                                if (fltr == 1)
                                {
                                    tempRecordValue = lstActivityDetails[i].BUSINESS_UNIT;
                                }

                                if (fltr == 2)
                                {
                                    tempRecordValue = lstActivityDetails[i].USER_ID;
                                    tempFirstName = lstActivityDetails[i].FIRST_NAME;
                                    tempLastName = lstActivityDetails[i].LAST_NAME;
                                    tempMiddleInitial = lstActivityDetails[i].MIDDLE_INITIAL;
                                }
                            }

                            if(fltr==1)
                            {
                                strBunitUserId = lstActivityDetails[i].BUSINESS_UNIT;
                            }
                            if(fltr==2)
                            {
                                strBunitUserId = lstActivityDetails[i].USER_ID;
                            }

                            if(strBunitUserId == tempRecordValue)
                            {
                                switch(lstActivityDetails[i].STATUS)
                                {
                                    case (short)(AtParWebEnums.AppTransactionStatus.Downloaded):
                                        totCountDownload = totCountDownload + lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.Error):
                                        totCountError = totCountError + lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.Sent):
                                        totCountSent = totCountSent + lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.Unlock):
                                        totCountUnlock = totCountUnlock + lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.Cancel):
                                        totCountCancel = totCountCancel + lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.CartPutAwayDownload):
                                        totCountPutawayDownload = totCountPutawayDownload + lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.PutAway):
                                        totCountPutaway = totCountPutaway + lstActivityDetails[i].STC;
                                        break;
                                }
                            }
                            else
                            {
                                totCountDownload = totCountDownload + totCountSent + totCountError + totCountUnlock + totCountCancel + totCountPutawayDownload + totCountPutaway;
                                countDownload = totCountDownload;
                                countSent = totCountSent + totCountPutaway;
                                countError = totCountError;
                                countUnlock = totCountUnlock;
                                countCancel = totCountCancel;

                                if (fltr == 1)
                                {
                                    _objReportData.BUSINESS_UNIT = tempRecordValue;
                                }
                                if (fltr == 2)
                                {
                                    _objReportData.USER_ID = tempFirstName + " " + tempMiddleInitial + " " + tempLastName + " " + "(" + tempRecordValue + ")";

                                }
                                _objReportData.DOWNLOAD = countDownload;
                                _objReportData.SENT = countSent + countPutaway;
                                if(appId == (int)AtParWebEnums.EnumApps.Receiving || appId == (int)AtParWebEnums.EnumApps.PickPlan || appId == (int)AtParWebEnums.EnumApps.PutAway)
                                {
                                    _objReportData.INVALID = countUnlock;
                                }
                                _objReportData.ERROR = countError;
                                
                                lstActivityDtls.Add(_objReportData);

                                if (fltr==1)
                                {
                                    tempRecordValue = lstActivityDetails[i].BUSINESS_UNIT;
                                }
                                if(fltr==2)
                                {
                                    tempRecordValue = lstActivityDetails[i].USER_ID;
                                    tempFirstName = lstActivityDetails[i].FIRST_NAME;
                                    tempLastName = lstActivityDetails[i].LAST_NAME;
                                    tempMiddleInitial = lstActivityDetails[i].MIDDLE_INITIAL;
                                }

                                countDownload = 0;
                                countError = 0;
                                countSent = 0;
                                countUnlock = 0;
                                countCancel = 0;
                                countPutaway = 0;
                                countPutawayDownload = 0;
                                totCountDownload = 0;

                                totCountPutawayDownload = 0;
                                totCountError = 0;
                                totCountPutaway = 0;
                                totCountSent = 0;
                                totCountUnlock = 0;
                                totCountCancel = 0;

                                switch (lstActivityDetails[i].STATUS)
                                {
                                    case (short)(AtParWebEnums.AppTransactionStatus.Downloaded):
                                        totCountDownload = lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.Error):
                                        totCountError = lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.Sent):
                                        totCountSent = lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.Unlock):
                                        totCountUnlock = lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.Cancel):
                                        totCountCancel = lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.CartPutAwayDownload):
                                        totCountPutawayDownload = lstActivityDetails[i].STC;
                                        break;
                                    case (short)(AtParWebEnums.AppTransactionStatus.PutAway):
                                        totCountPutaway = lstActivityDetails[i].STC;
                                        break;
                                }
                            }

                            if (i == lstActivityDetails.Count - 1)
                            {
                                VM_MT_ATPAR_TRANSACTION _objRptData = new VM_MT_ATPAR_TRANSACTION();
                                totCountDownload = totCountDownload + totCountSent + totCountError + totCountUnlock + totCountCancel + totCountPutawayDownload + totCountPutaway;
                                countDownload = totCountDownload;
                                countSent = totCountSent + totCountPutaway;
                                countError = totCountError;
                                countUnlock = totCountUnlock;
                                countCancel = totCountCancel;

                                if (fltr == 1)
                                {
                                    _objRptData.BUSINESS_UNIT = tempRecordValue;
                                }
                                else if(fltr==2)
                                {
                                    _objRptData.USER_ID = tempFirstName + " " + tempMiddleInitial + " " + tempLastName + " " + "(" + tempRecordValue + ")";
                                }
                                _objRptData.DOWNLOAD = countDownload;
                                _objRptData.SENT = countSent;
                                if(appId == (int)AtParWebEnums.EnumApps.Receiving || appId == (int)AtParWebEnums.EnumApps.PickPlan || appId == (int)AtParWebEnums.EnumApps.PutAway)
                                {
                                    _objRptData.INVALID = countUnlock;
                                }

                                _objRptData.ERROR = countError;
                                lstActivityDtls.Add(_objRptData);

                                countDownload = 0;
                                countError = 0;
                                countSent = 0;
                                countUnlock = 0;
                                countCancel = 0;
                                countPutaway = 0;
                                countPutawayDownload = 0;

                                totCountDownload = 0;
                                totCountPutawayDownload = 0;
                                totCountError = 0;
                                totCountSent = 0;
                                totCountUnlock = 0;
                                totCountCancel = 0;
                                totCountPutaway = 0;
                            }
                        }
                                                
                        int cnt = 0;
                        VM_MT_ATPAR_TRANSACTION _totalReportData = new VM_MT_ATPAR_TRANSACTION();

                        if (fltr == 1)
                        {                            
                            _totalReportData.BUSINESS_UNIT = "Total";
                        }
                        else if (fltr == 2)
                        {
                            _totalReportData.USER_ID = "Total";
                        }

                        if (appId == (int)AtParWebEnums.EnumApps.Receiving || appId == (int)AtParWebEnums.EnumApps.PickPlan || appId == (int)AtParWebEnums.EnumApps.PutAway)
                        {
                            for (cnt = 0; cnt <= lstActivityDtls.Count-1; cnt++)
                            {
                                countDownload = countDownload + lstActivityDtls[cnt].DOWNLOAD;
                                countSent = countSent + lstActivityDtls[cnt].SENT;
                                countUnlock = countUnlock + lstActivityDtls[cnt].INVALID;
                                countError = countError + lstActivityDtls[cnt].ERROR;
                            }
                        }
                        else
                        {
                            for (cnt = 0; cnt <= lstActivityDtls.Count-1; cnt++)
                            {
                                countDownload = countDownload + lstActivityDtls[cnt].DOWNLOAD;
                                countSent = countSent + lstActivityDtls[cnt].SENT;
                                countError = countError + lstActivityDtls[cnt].ERROR;
                            }
                        }
                        _totalReportData.DOWNLOAD = countDownload;
                        _totalReportData.SENT = countSent;
                        if(appId == (int)AtParWebEnums.EnumApps.Receiving || appId == (int)AtParWebEnums.EnumApps.PickPlan || appId == (int)AtParWebEnums.EnumApps.PutAway)
                        {
                            _totalReportData.INVALID = countUnlock;
                        }
                        _totalReportData.ERROR = countError;
                        lstActivityDtls.Add(_totalReportData);                        
                    }
                }                
                               
                response.DataList = lstActivityDtls;
                response.AtParSuccess();
                return response;         
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);                
                return response;
               // throw ex;
            }

            
        }

        #endregion       

    }
   
}
