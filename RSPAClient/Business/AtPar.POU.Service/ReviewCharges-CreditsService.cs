using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using System.Net;
using AtPar.Service.Interfaces.Common;

namespace AtPar.POU.Service
{
    public class ReviewCharges_CreditsService : IReviewCharges_CreditsService
    {
        #region Private Variables

        IReviewCharges_CreditsRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;

        #endregion

        #region Constructor
        public ReviewCharges_CreditsService(IReviewCharges_CreditsRepository reviewChargessRepos, ILog log, ICommonRepository commonRepository, ICommonService commonService)
        {
            _Repo = reviewChargessRepos;
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _log.SetLoggerType(typeof(ReviewCharges_CreditsService));
        }

        #endregion

        #region SetReviewed
        public AtParWebApiResponse<long> SetReviewed(List<MT_POU_CHARGECAPTURE_HEADER> lstReviewed)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            StringBuilder sbTransIDchecked = new StringBuilder();
            StringBuilder sbTransIDUnchecked = new StringBuilder();
            int reviewChecked = -1;
            int reviewUnchecked = -1;
            long statusCode = -1;
            try
            {
                foreach (var item in lstReviewed)
                {
                    if (item.REVIEWED)
                    {
                        reviewChecked = 1;
                        sbTransIDchecked.Append(item.TRANSACTION_ID);
                        sbTransIDchecked.Append(",");
                    }
                    else
                    {
                        reviewUnchecked = 0;
                        sbTransIDUnchecked.Append(item.TRANSACTION_ID);
                        sbTransIDUnchecked.Append(",");
                    }
                }
                if (sbTransIDchecked.Length > 0)
                {
                    sbTransIDchecked.Remove(sbTransIDchecked.Length - 1, 1);
                    statusCode = _Repo.SetReviewed(reviewChecked, sbTransIDchecked.ToString());

                    if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                }
                if (sbTransIDUnchecked.Length > 0)
                {
                    sbTransIDUnchecked.Remove(sbTransIDUnchecked.Length - 1, 1);
                    statusCode = _Repo.SetReviewed(reviewUnchecked, sbTransIDUnchecked.ToString());

                    if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL);
                return response;
            }
        }

        #endregion

        #region GetCredits
        public AtParWebApiResponse<object> GetCredits(string fromDate, string toDate, string patientID, string examID,
                               string accountID, string deptID, string comments,
                               bool reviewed)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<object>();

            fromDate = fromDate.ReplaceNullwithEmpty();
            toDate = toDate.ReplaceNullwithEmpty();
            patientID = patientID.ReplaceNullwithEmpty();
            examID = examID.ReplaceNullwithEmpty();
            accountID = accountID.ReplaceNullwithEmpty();
            deptID = deptID.ReplaceNullwithEmpty();
            comments = comments.ReplaceNullwithEmpty();
            //fromDate = "06/09/2017";
            //toDate = "06/20/2017";

            try
            {
                response.DataDictionary = _Repo.GetCredits(fromDate, toDate, patientID, examID, accountID, deptID, comments, reviewed);

                if (response.DataDictionary == null)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                else if ((response.DataDictionary[AtParWebEnums.DataSet_Type.HEADERS.ToString()] as List<VM_POU_CREDIT_HEADER>).Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

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

        #region GetCharges
        public AtParWebApiResponse<object> GetCharges(string fromDate, string toDate, string patientID, string examID,
                               string accountID, string deptID, string comments, int status,
                               int appID)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<object>();

            fromDate = fromDate.ReplaceNullwithEmpty();
            toDate = toDate.ReplaceNullwithEmpty();
            patientID = patientID.ReplaceNullwithEmpty();
            examID = examID.ReplaceNullwithEmpty();
            accountID = accountID.ReplaceNullwithEmpty();
            deptID = deptID.ReplaceNullwithEmpty();
            comments = comments.ReplaceNullwithEmpty();

            //fromDate = "06/05/2017";
            //toDate = "06/13/2017";


            try
            {
                response.DataDictionary = _Repo.GetCharges(fromDate, toDate, patientID, examID, accountID, deptID, comments, status, appID);

                if (response.DataDictionary == null)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                else if ((response.DataDictionary[AtParWebEnums.DataSet_Type.HEADERS.ToString()] as List<VM_POU_CREDIT_HEADER>).Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

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

        #region InsertPouChargeCaptureDetails
        public AtParWebApiResponse<long> InsertPouChargeCaptureDetails(string transactionID, string itemID, string itemDescription,
                                           string itemLotNumber, string itemSerialnumber, string itemChargeCode,
                                           string itemPrice, string lineNo, decimal pQty)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            transactionID = transactionID.ReplaceNullwithEmpty();
            itemID = itemID.ReplaceNullwithEmpty();
            itemDescription = itemDescription.ReplaceNullwithEmpty();
            itemLotNumber = itemLotNumber.ReplaceNullwithEmpty();
            itemSerialnumber = itemSerialnumber.ReplaceNullwithEmpty();
            itemChargeCode = itemChargeCode.ReplaceNullwithEmpty();
            itemPrice = itemPrice.ReplaceNullwithEmpty();
            lineNo = lineNo.ReplaceNullwithEmpty();

            try
            {
                long statusCode = _Repo.InsertPouChargeCaptureDetails(transactionID, itemID, itemDescription,
                                                                                itemLotNumber, itemSerialnumber, itemChargeCode,
                                                                                itemPrice, lineNo, pQty);


                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion

        #region UpdateCharges
        public AtParWebApiResponse<long> UpdateCharges(long transID, Dictionary<string, dynamic> dicDataItems)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            List<VM_POU_CREDIT_HEADER> lstChargesHeader = new List<VM_POU_CREDIT_HEADER>();
            List<VM_POU_CREDIT_DETAILS> lstChargesDetails = new List<VM_POU_CREDIT_DETAILS>();
            var response = new AtParWebApiResponse<long>();

            try
            {
                foreach (var keyValuePair in dicDataItems)
                {
                    switch (keyValuePair.Key)
                    {
                        case "CHARGES_HEADER":
                            {
                                VM_POU_CREDIT_HEADER header = null;
                                foreach (var item in keyValuePair.Value)
                                {
                                    header = new VM_POU_CREDIT_HEADER();
                                    header.TRANSACTION_ID = item.TRANSACTION_ID;
                                    header.PATIENT_ID = item.PATIENT_ID;
                                    header.ACCOUNT_ID = item.ACCOUNT_ID;
                                    header.COMMENTS = item.COMMENTS;
                                    header.EXAM_ID = item.EXAM_ID;
                                    header.DATE_TIME = item.DATE_TIME;
                                    lstChargesHeader.Add(header);
                                }
                                break;
                            }
                        case "CHARGES_DETAILS":
                            {
                                VM_POU_CREDIT_DETAILS detail = null;
                                foreach (var item in keyValuePair.Value)
                                {
                                    detail = new VM_POU_CREDIT_DETAILS();
                                    detail.ITEM_ID = item.ITEM_ID;
                                    detail.LINE_NO = item.LINE_NO;
                                    detail.ITEM_COUNT = item.ITEM_COUNT;
                                    detail.CHARGE_CODE = item.CHARGE_CODE;
                                    detail.ITEM_PRICE = item.ITEM_PRICE;
                                    lstChargesDetails.Add(detail);

                                }
                                break;
                            }
                    }
                }

                statusCode = _Repo.UpdateChargesHeader(lstChargesHeader);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                statusCode = _Repo.UpdateChargesDetails(lstChargesHeader[0].TRANSACTION_ID, lstChargesDetails);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        #endregion

        #region UpdateCredits
        public AtParWebApiResponse<long> UpdateCredits(Dictionary<string, dynamic> dicDataItems, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            List<VM_POU_CREDIT_HEADER> lstCreditHeader = null;
            List<VM_POU_CREDIT_DETAILS> lstCreditDetails = null;
            List<VM_POU_CREDIT_DETAILS> drCredits = null;
            bool isCreditsChanged = false;
            long transID;
            long statusCode = -1;
            DataTable tblCreditHeader = new DataTable();
            DataTable tblCreditDetails = new DataTable();
            try
            {
                foreach (var keyValuePair in dicDataItems)
                {
                    switch (keyValuePair.Key)
                    {
                        case "CREDIT_HEADER":
                            {

                                tblCreditHeader = new DataTable("CREDIT_HEADER");
                                tblCreditHeader.Columns.Add("TRANSACTION_ID", Type.GetType("System.String"));
                                tblCreditHeader.Columns.Add("PATIENT_ID", Type.GetType("System.String"));
                                tblCreditHeader.Columns.Add("ACCOUNT_ID", Type.GetType("System.String"));
                                tblCreditHeader.Columns.Add("EXAM_ID", Type.GetType("System.String"));
                                tblCreditHeader.Columns.Add("COMMENTS", Type.GetType("System.String"));
                                tblCreditHeader.Columns.Add("DATE_OF_SERVICE", Type.GetType("System.String"));
                                tblCreditHeader.Columns.Add("PATIENTID_CHANGED", Type.GetType("System.String"));

                                foreach (var item in keyValuePair.Value)
                                {



                                    DataRow _drHed = tblCreditHeader.NewRow();
                                    _drHed["TRANSACTION_ID"] = item.TRANSACTION_ID;
                                    _drHed["PATIENT_ID"] = item.PATIENT_ID;
                                    _drHed["ACCOUNT_ID"] = item.ACCOUNT_ID;
                                    _drHed["EXAM_ID"] = item.EXAM_ID;
                                    _drHed["COMMENTS"] = item.COMMENTS;
                                    _drHed["DATE_OF_SERVICE"] = item.DATE_OF_SERVICE;
                                    _drHed["PATIENTID_CHANGED"] = item.PATIENTID_CHANGED;


                                    tblCreditHeader.Rows.Add(_drHed);
                                    // lstCreditHeader = dicDataItems[keyValuePair.Key];
                                }
                            }
                            break;
                        case "CREDIT_DETAILS":
                            {
                                tblCreditDetails = new DataTable("CREDIT_DETAILS");
                                tblCreditDetails.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                                tblCreditDetails.Columns.Add("LINE_NO", Type.GetType("System.String"));
                                tblCreditDetails.Columns.Add("ITEM_COUNT", Type.GetType("System.String"));
                                tblCreditDetails.Columns.Add("CHARGE_CODE", Type.GetType("System.String"));
                                tblCreditDetails.Columns.Add("ITEM_PRICE", Type.GetType("System.String"));
                                tblCreditDetails.Columns.Add("CREDIT_CHANGED", Type.GetType("System.String"));
                                foreach (var item in keyValuePair.Value)
                                {

                                    DataRow _drDetails = tblCreditDetails.NewRow();
                                    _drDetails["ITEM_ID"] = item.ITEM_ID;
                                    _drDetails["LINE_NO"] = item.LINE_NO;
                                    _drDetails["ITEM_COUNT"] = item.ITEM_COUNT;
                                    _drDetails["CHARGE_CODE"] = item.CHARGE_CODE;
                                    _drDetails["ITEM_PRICE"] = item.ITEM_PRICE;
                                    _drDetails["CREDIT_CHANGED"] = item.CREDIT_CHANGED;

                                    tblCreditDetails.Rows.Add(_drDetails);
                                    // lstCreditDetails = dicDataItems[keyValuePair.Key];
                                }
                                break;
                            }
                    }
                }

                DataSet outputParameters = new DataSet();

                outputParameters.Tables.Add(tblCreditHeader);
                outputParameters.Tables.Add(tblCreditDetails);


                // DataSet to List Conversion
                lstCreditHeader = (from rw in outputParameters.Tables[0].AsEnumerable()
                                   select new VM_POU_CREDIT_HEADER()
                                   {
                                       TRANSACTION_ID = Convert.ToInt64(rw["TRANSACTION_ID"]),
                                       PATIENT_ID = rw["PATIENT_ID"].ToString(),
                                       ACCOUNT_ID = rw["ACCOUNT_ID"].ToString(),
                                       EXAM_ID = rw["EXAM_ID"].ToString(),
                                       COMMENTS = rw["COMMENTS"].ToString(),
                                       DATE_OF_SERVICE = rw["DATE_OF_SERVICE"].ToString(),
                                       PATIENTID_CHANGED = rw["PATIENTID_CHANGED"].ToString()
                                   }).ToList();
                if (outputParameters.Tables[1].Rows.Count > 0)
                {
                    lstCreditDetails = (from rw in outputParameters.Tables[1].AsEnumerable()
                                        select new VM_POU_CREDIT_DETAILS()
                                        {
                                            ITEM_ID = rw["ITEM_ID"] == DBNull.Value ? string.Empty : rw["ITEM_ID"].ToString(),
                                            LINE_NO = rw["LINE_NO"] == DBNull.Value ? 0 : Convert.ToInt32(rw["LINE_NO"]),
                                            ITEM_COUNT = rw["ITEM_COUNT"] == DBNull.Value || rw["ITEM_COUNT"] + "" == "" ? 0.00 : double.Parse(rw["ITEM_COUNT"] + ""),
                                            CHARGE_CODE = rw["CHARGE_CODE"] == DBNull.Value ? string.Empty : rw["CHARGE_CODE"].ToString(),
                                            ITEM_PRICE = rw["ITEM_PRICE"] == DBNull.Value || rw["ITEM_PRICE"] + "" == "" ? double.Parse("0") : double.Parse(rw["ITEM_PRICE"] + ""),
                                            CREDIT_CHANGED = rw["CREDIT_CHANGED"] == null ? string.Empty : rw["CREDIT_CHANGED"].ToString()
                                        }).ToList();

                }
                drCredits = lstCreditDetails.Where(x => x.CREDIT_CHANGED == "Y").ToList();
                if (drCredits.Count > 0)
                {
                    isCreditsChanged = true;
                }
                if (lstCreditHeader[0].PATIENTID_CHANGED == AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    transID = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.PointOfUse);
                    statusCode = _Repo.InsertCreditValues(lstCreditHeader[0].TRANSACTION_ID, transID);
                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }

                    statusCode = UpdateCreditInfo(transID, lstCreditHeader, lstCreditDetails);
                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }

                    statusCode = ProcessCredits(lstCreditHeader[0].TRANSACTION_ID, "CR", false, lstCreditDetails, deviceTokenEntry);
                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        statusCode = _Repo.DeletePatientInfo(transID);
                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(statusCode, _commonRepo, _log);
                            return response;
                        }
                        response.AtParNotOK(AtparStatusCodes.S_FAILEDTOCREDITOLDPATIENT, _commonRepo, _log);
                        return response;
                    }

                    statusCode = ProcessCredits(transID, "CH", false, lstCreditDetails, deviceTokenEntry);
                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(AtparStatusCodes.S_FAILEDTOCHARGE, _commonRepo, _log);
                        return response;
                    }
                    if (isCreditsChanged)
                    {
                        statusCode = ProcessCredits(transID, "CR", true, lstCreditDetails, deviceTokenEntry);
                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(AtparStatusCodes.S_FAILEDTOCREDITNEWPATIENT, _commonRepo, _log);
                            return response;
                        }
                    }
                }
                else
                {
                    statusCode = UpdateCreditInfo(lstCreditHeader[0].TRANSACTION_ID, lstCreditHeader, lstCreditDetails);
                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                    if (isCreditsChanged)
                    {
                        statusCode = ProcessCredits(lstCreditHeader[0].TRANSACTION_ID, "CR", true, lstCreditDetails, deviceTokenEntry);
                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(AtparStatusCodes.S_FAILEDTOCREDITOLDPATIENT, _commonRepo, _log);
                            return response;
                        }
                    }
                }
                response.AtParSuccess();
                return response;
            }

            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion

        #region Private Methods
        private DataSet PopulateInputParameters()
        {
            DataTable dtHeader = new DataTable();
            DataTable dtDetail = new DataTable();
            DataTable dtPreReq = new DataTable();
            DataSet inputParams = new DataSet();

            dtHeader = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Charge_Capture_Header_Defns,
                                      AtParWebEnums.DataSet_Type.HEADERS.ToString());

            dtDetail = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_Charge_Capture_Details_Defns,
                               AtParWebEnums.DataSet_Type.DETAILS.ToString());

            dtPreReq = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.POU_Billing_Process_PreReq_Defns,
                                AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

            inputParams.Tables.Add(dtHeader);
            inputParams.Tables.Add(dtDetail);
            inputParams.Tables.Add(dtPreReq);

            return inputParams;

        }

        private string PopulatePreReqValues(DataSet inputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SortedList<string, string> orgParams;
            StringBuilder sbExcludeChargecode = new StringBuilder();
            string chargecodeFilter = string.Empty;

            try
            {
                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.HL7_BILLING_MESG.ToString()] = string.Empty;
                orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.EXCLUDE_CHRG_CODE_ITEMS_BILING.ToString()] = string.Empty;
                orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT.ToString()] = string.Empty;
                orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION.ToString()] = string.Empty;
                orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY.ToString()] = string.Empty;

                _commonRepo.GetOrgGroupParamValues(orgParams, (int)AtParWebEnums.EnumApps.PointOfUse, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

                DataRow dr = null;
                dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.HL7_BILLING_MESG] = orgParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.HL7_BILLING_MESG.ToString()];
                dr[(int)AtParWebEnums.Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR] = string.Empty;
                dr[(int)AtParWebEnums.Billing_Process_PreReq_Enum.EXCLUDE_CHRG_CODE_ITEMS_BILING] = orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.EXCLUDE_CHRG_CODE_ITEMS_BILING.ToString()];
                dr[(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS] = orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS.ToString()];
                dr[(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT] = orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT.ToString()];
                dr[(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE] = orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE.ToString()];
                dr[(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION] = orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION.ToString()];
                dr[(int)AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY] = orgParams[AtParWebEnums.Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY.ToString()];
                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(dr);

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.EXCLUDE_CHRG_CODE_ITEMS_BILING] != null)
                {
                    if (!string.IsNullOrEmpty(inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.EXCLUDE_CHRG_CODE_ITEMS_BILING].ToString()))
                    {
                        chargecodeFilter = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][(int)AtParWebEnums.Billing_Process_PreReq_Enum.EXCLUDE_CHRG_CODE_ITEMS_BILING].ToString();
                    }
                }
                if (!string.IsNullOrEmpty(chargecodeFilter))
                {
                    // string_sbExcludeChargecode = new StringBuilder();
                    string[] _strvalue = null;


                    if (chargecodeFilter.Contains(","))
                    {
                        _strvalue = chargecodeFilter.Split(',');
                        for (int i = 0; i <= _strvalue.Length - 1; i++)
                        {
                            if (sbExcludeChargecode.ToString() != string.Empty)
                            {
                                sbExcludeChargecode.Append(",'" + _strvalue[i] + "'");
                            }
                            else
                            {
                                sbExcludeChargecode.Append("'" + _strvalue[i] + "'");
                            }
                        }
                    }
                    else
                    {
                        sbExcludeChargecode.Append("'" + chargecodeFilter + "'");
                    }
                    chargecodeFilter = sbExcludeChargecode.ToString();
                }
                return chargecodeFilter;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                throw ex;
            }

        }
        private long PopulateHeaderAndDetailsForCredits(DataSet inputParameters, List<VM_POU_CREDIT_INFO> lstCreditValuesFromDB, bool pIsCredtsChanged,
                                                        List<VM_POU_CREDIT_DETAILS> lstCreditsInfoFromWeb, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                DataRow drHeader = null;
                DataRow drDetails = null;
                // List<VM_POU_CREDIT_DETAILS> lstCreditsInfoFromWeb = null;
                List<VM_POU_CREDIT_DETAILS> drCreditDetails = null;
                //List<VM_POU_CREDIT_INFO> lstCreditValuesFromDB = null;

                if (pIsCredtsChanged)
                {
                    DataRow[] _drCreditDetails = null;

                    // _drCreditDetails = pDSCreditsInfoFromWeb.Tables["CREDIT_DETAILS"].Select("CREDIT_CHANGED = 'Y'");
                    drCreditDetails = lstCreditsInfoFromWeb.Where(x => x.CREDIT_CHANGED == "Y").ToList();
                    if (drCreditDetails.Count > 0)
                    {
                        int i = 0;
                        foreach (var item in drCreditDetails)
                        {
                            List<VM_POU_CREDIT_INFO> dr = null;
                            // DataRow[] dr = null;
                            // dr = pCreditValuesFromDB.Tables[0].Select("LINE_NO = '" + _drCreditDetails[intCnt]["LINE_NO"] + "'");
                            dr = lstCreditValuesFromDB.Where(x => x.LINE_NO == item.LINE_NO).ToList();

                            if (dr.Count > 0)
                            {
                                if (i == 0)
                                {

                                    drHeader = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].NewRow();
                                    drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.TRANSACTION_ID] = dr[0].TRANSACTION_ID;
                                    drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.CHARGE_CAPTURE_ID] = dr[0].TRANSACTION_ID;
                                    drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.PATIENT_ID] = dr[0].PATIENT_ID;
                                    drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.STATUS] = 0;
                                    drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.TRANSACTION_DATE] = dr[0].CAPTURE_DATE_TIME;
                                    drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.PATIENT_NAME] = dr[0].PATIENT_NAME;
                                    drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.PATIENT_SEX] = dr[0].PATIENT_SEX;
                                    drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.PATIENT_ACCOUNT_NUMBER] = dr[0].PATIENT_ACCNUMBER;
                                    drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.PATIENT_VISIT_NUMBER] = dr[0].PATIENT_VISIT_NUMBER;

                                    inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(drHeader);


                                }

                                drDetails = inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].NewRow();
                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.CHARGE_CAPTURE_ID] = dr[0].TRANSACTION_ID;
                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_ID] = dr[0].ITEM_ID;
                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_COUNT] = item.ITEM_COUNT;
                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.CAPTURE_DATE_TIME] = dr[0].CAPTURE_DATE_TIME;
                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.TRANSACTION_ID] = dr[0].TRANSACTION_ID;
                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.AMOUNT] = dr[0].AMOUNT == null ? 0 : dr[0].AMOUNT;

                                if (!string.IsNullOrEmpty(dr[0].TRANSACTION_CODE))
                                {
                                    drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.TRANSACTION_CODE] = dr[0].TRANSACTION_CODE;
                                }
                                else
                                {
                                    drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.TRANSACTION_CODE] = string.Empty;
                                }

                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.TRANSACTION_TYPE] = dr[0].TRANSACTION_TYPE;

                                if (dr[0].ITEM_PRICE == null)
                                {
                                    drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_PRICE] = dr[0].ITEM_PRICE;
                                }
                                else
                                {
                                    drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_PRICE] = 0;
                                }

                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.PHYSICIAN_ID] = dr[0].PHYSICIAN_ID;
                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.PATIENT_TYPE] = dr[0].PATIENT_TYPE;
                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_DESCRIPTION] = dr[0].ITEM_DESCRIPTION;
                                drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.LINE_NO] = dr[0].LINE_NO;
                                if ((drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.DEPARTMENT_ID] != null) && !string.IsNullOrEmpty(drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.DEPARTMENT_ID].ToString()))
                                {
                                    drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.DEPARTMENT_ID] = dr[0].DEPARTMENT_ID;
                                }

                                inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Add(drDetails);

                            }
                            i = i + 1;
                        }
                    }


                }
                else
                {
                    int i = 0;
                    foreach (var item in lstCreditValuesFromDB)
                    {

                        if (i == 0)
                        {
                            drHeader = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].NewRow();
                            drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.TRANSACTION_ID] = item.TRANSACTION_ID;
                            drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.CHARGE_CAPTURE_ID] = item.TRANSACTION_ID;
                            drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.PATIENT_ID] = item.PATIENT_ID;
                            drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.STATUS] = 0;
                            drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.TRANSACTION_DATE] = item.CAPTURE_DATE_TIME;
                            drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.PATIENT_NAME] = item.PATIENT_NAME;
                            drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.PATIENT_SEX] = item.PATIENT_SEX;
                            drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.PATIENT_ACCOUNT_NUMBER] = item.PATIENT_ACCNUMBER;
                            drHeader[(int)AtParWebEnums.Send_Charge_Capture_Header_Enum.PATIENT_VISIT_NUMBER] = item.PATIENT_VISIT_NUMBER;

                            inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(drHeader);

                        }




                        drDetails = inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].NewRow();
                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.CHARGE_CAPTURE_ID] = item.TRANSACTION_ID;
                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_ID] = item.ITEM_ID;
                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_COUNT] = item.ITEM_COUNT;
                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.CAPTURE_DATE_TIME] = item.CAPTURE_DATE_TIME;
                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.TRANSACTION_ID] = item.TRANSACTION_ID;
                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.AMOUNT] = item.AMOUNT;

                        if (!string.IsNullOrEmpty(item.TRANSACTION_CODE.ToString()))
                        {
                            drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.TRANSACTION_CODE] = item.TRANSACTION_CODE;
                        }
                        else
                        {
                            drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.TRANSACTION_CODE] = string.Empty;
                        }

                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.TRANSACTION_TYPE] = item.TRANSACTION_TYPE;

                        if (item.ITEM_PRICE.ToString() == null)
                        {
                            drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_PRICE] = item.ITEM_PRICE;
                        }
                        else
                        {
                            drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_PRICE] = 0;
                        }

                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.PHYSICIAN_ID] = item.PHYSICIAN_ID;
                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.PATIENT_TYPE] = item.PATIENT_TYPE;
                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.ITEM_DESCRIPTION] = item.ITEM_DESCRIPTION;
                        drDetails[(int)AtParWebEnums.Send_Charge_Capture_Details_Enum.LINE_NO] = item.LINE_NO;

                        inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Add(drDetails);

                        i = i + 1;

                    }

                }
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                throw ex;
            }

        }
        private long ProcessCredits(long transID, string transType, bool isCreditsChanged,
        List<VM_POU_CREDIT_DETAILS> lstCreditsInfoFromWeb, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            DataSet dsInputParams = new DataSet();
            DataTable dtCredits = new DataTable();
            // dtCredits = null;
            string strChargecodeFilter = string.Empty;
            List<VM_POU_CREDIT_INFO> lstCreditinfo = new List<VM_POU_CREDIT_INFO>();

            try
            {
                dsInputParams = PopulateInputParameters();
                strChargecodeFilter = PopulatePreReqValues(dsInputParams, deviceTokenEntry);
                lstCreditinfo = _Repo.GetCreditsInfo(transID, transType, strChargecodeFilter);

                statusCode = PopulateHeaderAndDetailsForCredits(dsInputParams, lstCreditinfo, isCreditsChanged, lstCreditsInfoFromWeb, deviceTokenEntry);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    return statusCode;
                }
                if (dsInputParams.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count == 0)
                {
                    return AtparStatusCodes.ATPAR_OK;
                }
                dtCredits = _commonService.ProcessBillingData(dsInputParams, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);
                //DataTable dt = new DataTable();
                //dt = lstCartDetails.ToDataTable();
                List<VM_POU_CREDIT_DETAILS> lstCredits = new List<VM_POU_CREDIT_DETAILS>();
                lstCredits = dtCredits.ToList<VM_POU_CREDIT_DETAILS>();

                if (dtCredits.Rows.Count == 0)
                {
                    return AtparStatusCodes.ATPAR_OK;
                }
                statusCode = _Repo.UpdateChargeCaptureDetails(transType, lstCredits, isCreditsChanged);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    return statusCode;
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }


        }
        private long UpdateCreditInfo(long transID, List<VM_POU_CREDIT_HEADER> lstCreditHeader,
        List<VM_POU_CREDIT_DETAILS> lstCreditDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;

            try
            {
                statusCode = _Repo.UpdateCreditHeader(transID, lstCreditHeader[0]);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    return statusCode;
                }

                statusCode = _Repo.UpdateCreditDetails(transID, lstCreditDetails);
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    return statusCode;
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed with exception ... " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }


        }

        #endregion

    }
}
