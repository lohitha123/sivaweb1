using AtPar.Service.Interfaces.CycleCount;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.Common.Service;
using AtPar_BusinessRules;
using AtPar.POCOEntities;
using System.Data;
using System.Globalization;
using System.Xml;
using System.IO;
using System.Reflection;
using AtPar.ViewModel;

namespace AtPar.CycleCount.Service
{
    public class ReviewCountsService : IReviewCountsService
    {
        #region Private Variable
        ILog _log;
        ICommonRepository _commonRepo;
        IReviewCountsRepository _repo;
        ISplitEventsService _splitService;
        IProcessCountsService _processService;
        #endregion

        #region Constructor
        public ReviewCountsService(ILog log,
                                    ICommonRepository commonRepository,
                                    IReviewCountsRepository repo,IProcessCountsService proccessService)
        {
            _log = log;
            _commonRepo = commonRepository;
            _repo = repo;
            _processService = proccessService;
            _log.SetLoggerType(typeof(ProcessCountsService));
            //GetConfigData();
        }

        #endregion

        #region Methods
        //private void GetConfigData()
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
        //        throw ex;
        //    }
        //}
       
        public AtParWebApiResponse<MT_ATPAR_USER> GetReCountUsersList(string appID, string orgGrpID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_ATPAR_USER>();
            try
            {
                var lstUserList = _repo.GetReCountUsersList(appID, orgGrpID, deviceTokenEntry);
                if (lstUserList.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(lstUserList.Item1, _commonRepo, _log);
                    return response;

                }
                response.DataList = lstUserList.Item2;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }
        private Tuple<long, string> SendEventERP(string erpObjName, string strXml, string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            Tuple<long, string> tupleOutput = null;

            try
            {
                

                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                className = "sendEvent";
                methodName = "sendEvent";

                //GetConfigData();
                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { strXml, pDeviceTokenEntry };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<long, string>(StatusCode, null);
                    return tupleOutput;
                }

                strXml = (string)args[1];


                tupleOutput = new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, strXml);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }
        }


        public AtParWebApiResponse<bool> CheckIfSplitEvntIsPartEvnt(string bUnit, string eventID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<bool>();
            bool blnIsParentEvent;
            try
            {
                var _intCount = _repo.CheckIfSplitEvntIsPartEvnt(bUnit, eventID, deviceTokenEntry);
                if (_intCount > 0)
                {
                    blnIsParentEvent = true;
                }

                else
                {
                    blnIsParentEvent = false;
                }
                response.DataVariable = blnIsParentEvent;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        public AtParWebApiResponse<long> GetUser_Date(string bUnit, string eventID, string userID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            string updateDtTime = "";
            int recCount = 0;
            string updateUserId = "";
            try
            {
                var lstEvnts = _repo.GetEventDetails(bUnit, eventID);
                if (lstEvnts.Count > 0)
                {
                    eventID = lstEvnts[0].PARENT_EVENT_ID.ToString();
                }
                var lstUpdateData = _repo.GetLatestUpdatesFromHdr(bUnit, eventID, userID);
                if (lstUpdateData.Count > 0)
                {
                    updateDtTime =Convert.ToDateTime(lstUpdateData[0].UPDATE_DATE).ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
                     updateUserId = lstUpdateData[0].USER_ID.ToString();
                }
                Dictionary<string, object> objects = new Dictionary<string, object> { { "updateDtTime", updateDtTime }, { "updateUserId", updateUserId }, { "recCount", recCount } };
                response.DataDictionary = objects;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        public AtParWebApiResponse<MT_CYCT_EVENT_HDR> GetReviewCountsEventIds(string bUnit, string userID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_CYCT_EVENT_HDR>();
            try
            {
                var lstEventId = _repo.GetReviewCountsEventIds(bUnit, userID, deviceTokenEntry);
                response.DataList = lstEventId;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

  
        public AtParWebApiResponse<MT_CYCT_EVENT_HDR> CheckIfEventHasMultipleTransactions(string eventId, string bunit, string userID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_CYCT_EVENT_HDR>();
            string enable = string.Empty;
            try
            {
                var lstEventHdr = _repo.CheckIfEventHasMultipleTransactions(eventId, bunit, userID, deviceTokenEntry);
                if ((lstEventHdr.Count > 0))
                {
                    enable = "disable";
                }
                else
                {
                    enable = "enable";
                }

                response.DataVariable = enable;
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        public AtParWebApiResponse<long> GetReviewCountEventDetails(string bUnit, string eventID, string userID, string recntuserID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            DataSet pDsDetails = new DataSet();
            DataTable dtItemsTable = new DataTable();
            try
            {
                var result = _repo.GetReviewCountEventDetails(bUnit, eventID, userID,recntuserID,deviceTokenEntry);

                if (result.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(result.Item1, _commonRepo, _log);
                    return response;
                }
                pDsDetails = result.Item3["pDsDetails"] as DataSet;
                dtItemsTable = result.Item3["dtItemsTable"] as DataTable;
               
                    SortedList<string,string> _orgParams = default(SortedList<string,string>);
                    _orgParams = new SortedList<string, string>();
                    _orgParams[AtParWebEnums.AppParameters_Enum.DISPLAY_CURRENT_SYS_QTY.ToString()] = string.Empty;
             
                     _commonRepo.GetOrgGroupParamValues(_orgParams,(int)AtParWebEnums.EnumApps.CycleCount,deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);                   

                    if (_orgParams[AtParWebEnums.AppParameters_Enum.DISPLAY_CURRENT_SYS_QTY.ToString()] == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        pDsDetails.Tables.Add(dtItemsTable);
                        _processService.GetEventItemsForSysQty(bUnit, eventID, userID, deviceTokenEntry,ref pDsDetails);
                    }


                    Dictionary<string, object> objects = new Dictionary<string, object> { { "pDsDetails", pDsDetails },  { "precCount", result.Item2["precCount"] },
                        { "pErrMsg", result.Item2["pErrMsg"] }, { "pflgParentEvent", result.Item2["pflgParentEvent"] }};
                    response.DataDictionary = objects;
                    response.AtParSuccess();
                    return response;

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                    response.AtParException(ex, _commonRepo, _log);
                    return response;
                }                             

        }
        #region SendRevCntEvntsToERP
        public AtParWebApiResponse<long> SendRevCntEvntsToERP(string pLoginUser, string pReviewedUser, string pBUnit, string pEventId, List<MT_CYCT_EVENT_DETAIL> lstReviewCountDtls, string pProfileID, string pOrgGroupId, string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
           
            var response = new AtParWebApiResponse<long>();
            //List<string> lstParameters = new List<string>();
            DataSet pDsReviewCountDtls = null;
            pDsReviewCountDtls = lstReviewCountDtls.ToDataSet();
            pDsReviewCountDtls.Tables[0].TableName = "DETAILS";
            pDsReviewCountDtls.AcceptChanges();
            try
            {
         
                 var    resp = _repo.SendRevCntEvntsToERP(pLoginUser, pReviewedUser, pBUnit, pEventId, pDsReviewCountDtls, pProfileID, pOrgGroupId, pDeviceTokenEntry);
                if (resp.Item1 != AtparStatusCodes.ATPAR_OK)
                {

                    response.AtParNotOK(resp.Item1, _commonRepo, _log);
                    response.DataVariable = resp.Item2;
                    return response;
                }
                response.AtParSuccess();
                response.DataVariable = resp.Item2;
                return response;
               
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }
       

        #endregion

        #region UpdateReviewCountEvent
        public AtParWebApiResponse<long> UpdateReviewCountEvent(string pReviewedUser, string bUnit, string eventID, List<VM_REVIEW_COUNTS_EVENT_DATA> pDsReviewCountDtl, string userID, string reCntUser, string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            DataSet pDsReviewCountDtls = new DataSet();
            try
            {

                pDsReviewCountDtls = pDsReviewCountDtl.ToDataSet();
                pDsReviewCountDtls.Tables[0].TableName = "DETAILS";
                pDsReviewCountDtls.AcceptChanges();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var enterprise = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                var reviewwdUser = _repo.UpdateReviewCountEvent(pReviewedUser, bUnit, eventID, pDsReviewCountDtls, userID, reCntUser, pDeviceTokenEntry);

                if (reviewwdUser.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(reviewwdUser.Item1, _commonRepo, _log);
                    return response;
                }
                if(string.IsNullOrEmpty(reviewwdUser.Item2["pErrorMsg"].ToString()))
                {
                    response.DataDictionary = reviewwdUser.Item2;
                    response.AtParSuccess();
                    return response;
                }  
                pDsReviewCountDtls = reviewwdUser.Item2["pDsReviewCountDtls"] as DataSet;
                if (pDsReviewCountDtls.Tables[0].Rows.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                response.DataDictionary = reviewwdUser.Item2;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }
        #endregion
        #endregion
    }
}
