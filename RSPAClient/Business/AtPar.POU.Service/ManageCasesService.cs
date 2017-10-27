#region Usings
using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Xml;

#endregion

namespace AtPar.POU.Service
{
    public class ManageCasesService : IManageCasesService
    {

        #region Private

        ICommonPOUService _PouCommonService;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonPOURepository _commonPOURepo;
        IManageCasesRepository _manageCasesRepository;
        AtPar.Service.Interfaces.CartCount.IGetDetailsService _getDetailsService;
        #endregion

        #region Constructor
        public ManageCasesService(ILog log, ICommonRepository commonRepository, ICommonPOUService pouService, IManageCasesRepository repository,
            AtPar.Service.Interfaces.CartCount.IGetDetailsService getDetailsService, ICommonPOURepository commonPOURepo)
        {
            _PouCommonService = pouService;
            _log = log;
            _commonRepo = commonRepository;
            _commonPOURepo = commonPOURepo;
            _manageCasesRepository = repository;
            _getDetailsService = getDetailsService;
            _log.SetLoggerType(typeof(ProcedureCodeService));
        }
        #endregion

        #region GetDepartments
        public AtParWebApiResponse<MT_POU_DEPT> GetDepartments()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_DEPT>();

            try
            {
                response.DataList = _manageCasesRepository.GetDepartments();

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        public AtParWebApiResponse<PAR_MNGT_COST_CENTER> GetDeptCostCenters()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_COST_CENTER>();

            try
            {
                response.DataList = _manageCasesRepository.GetDeptCostCenters();

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        #region GetServiceCodes
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> GetServiceCodes()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_SPECIALTY_CODE>();

            try
            {
                response.DataList = _manageCasesRepository.GetServiceCodes();

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        #region GetCases
        public AtParWebApiResponse<MT_POU_CASE_CART_HEADER> GetCases()
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_CASE_CART_HEADER>();

            try
            {
                response.DataList = _manageCasesRepository.GetCases();

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        #region ProcessCases
        public AtParWebApiResponse<long> ProcessCases(List<VM_MT_POU_CASE_CART_HEADER_TB> lstCaseInfo,
             string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            DataSet dsCancelCasesInfo = new DataSet();
            try
            {
                //Converting list to Dataset
                DataSet dsCaseInfo = new DataSet();
                DataTable itemAttributesDt = new DataTable();
                itemAttributesDt = lstCaseInfo.ToDataTable();
                dsCaseInfo.Tables.Add(itemAttributesDt);

                response.StatusCode = VerifyReviewerdata(dsCaseInfo);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }


                DataRow[] drTrans = dsCaseInfo.Tables[0].Select("CHANGED_STATUS <> ''");

                if (drTrans.Length > 0)
                {
                    for (int i = 0; i <= drTrans.Length - 1; i++)
                    {
                        int intCaseIssueStatus = 0;

                        if ((drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.PICKED.ToString() || 
                            drTrans[i]["CURRENT_STATUS"].ToString() == "PARTIALLY PICKED") ||
                            drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.READY.ToString() &&
                            drTrans[i]["CHANGED_STATUS"].ToString() == ((int)AtParWebEnums.CASE_PICK_STATUS.CANCELLED).ToString() ||
                            (drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.REVIEWED.ToString() && 
                            drTrans[i]["CHANGED_STATUS"].ToString() == ((int)AtParWebEnums.CASE_PICK_STATUS.REMOVE).ToString()) ||
                            (drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.RETURNED.ToString() && 
                            drTrans[i]["CHANGED_STATUS"].ToString() == ((int)AtParWebEnums.CASE_PICK_STATUS.REMOVE).ToString()))
                        {
                            response.StatusCode = _manageCasesRepository.UpdateTransaction(drTrans[i]);
                            if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + response.StatusCode + drTrans[i]["CASE_ID"]);
                            }

                            if ((drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.REVIEWED.ToString() && 
                                drTrans[i]["CHANGED_STATUS"].ToString() == ((int)AtParWebEnums.CASE_PICK_STATUS.REMOVE).ToString()) ||
                                (drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.RETURNED.ToString() && 
                                drTrans[i]["CHANGED_STATUS"].ToString() == ((int)AtParWebEnums.CASE_PICK_STATUS.REMOVE).ToString()))
                            {
                                response.StatusCode = _manageCasesRepository.UpdateCaseCartHeader(drTrans[i]["CASE_ID"].ToString(), drTrans[i]["PROCEDURE_CODE"].ToString(),
                                    drTrans[i]["PREF_LIST_ID"].ToString(), drTrans[i]["CHANGED_STATUS"].ToString());

                                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                                    return response;
                                }

                            }

                            intCaseIssueStatus = _manageCasesRepository.GetCaseIssueStatus(drTrans[i]["CASE_ID"].ToString(), drTrans[i]["PREF_LIST_ID"].ToString(),
                                drTrans[i]["PROCEDURE_CODE"].ToString());

                        }

                        if ((drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.PICKED.ToString() ||
                            drTrans[i]["CURRENT_STATUS"].ToString() == "PARTIALLY PICKED"||
                            drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.RETURNED.ToString() ||
                            drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.REVIEWED.ToString() ||
                            (drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.READY.ToString() && intCaseIssueStatus > 0) ||
                            drTrans[i]["CURRENT_STATUS"].ToString() == AtParWebEnums.CASE_PICK_STATUS.CASEISSUED.ToString()) &&
                             (drTrans[i]["CHANGED_STATUS"].ToString() == ((int)AtParWebEnums.CASE_PICK_STATUS.CANCELLED).ToString()))
                        {

                            Tuple<long, List<VM_POU_CHECK_CART_ALLOCATION>, List<MT_POU_CHARGECAPTURE_DETAILS>> tpl = _manageCasesRepository.BuildCancelCases(drTrans[i]["CASE_ID"].ToString(),
                                drTrans[i]["PROCEDURE_CODE"].ToString(), drTrans[i]["PREF_LIST_ID"].ToString(),
                                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

                            response.StatusCode = tpl.Item1;

                            if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                                return response;
                            }

                            //Converting list to Dataset 


                            List<VM_POU_CHECK_CART_ALLOCATION> lstCartallocation = tpl.Item2;
                            DataTable itemAttributesDt1 = new DataTable();
                            itemAttributesDt1 = lstCartallocation.ToDataTable();

                            List<MT_POU_CHARGECAPTURE_DETAILS> lstchargeCapture = tpl.Item3;
                            DataTable itemAttributesDt2 = new DataTable();
                            itemAttributesDt2 = lstchargeCapture.ToDataTable();


                            dsCancelCasesInfo.Tables.Add(itemAttributesDt1);
                            dsCancelCasesInfo.Tables.Add(itemAttributesDt2);

                        }
                        else
                        {
                            response.StatusCode = _manageCasesRepository.UpdateCaseCartHeader(drTrans[i]["CASE_ID"].ToString(), drTrans[i]["PROCEDURE_CODE"].ToString(),
                                    drTrans[i]["PREF_LIST_ID"].ToString(), drTrans[i]["CHANGED_STATUS"].ToString());
                            if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                                return response;
                            }

                        }

                    }
                }

                if (dsCancelCasesInfo.Tables.Count > 0)
                {
                    if (dsCancelCasesInfo.Tables[0].Rows.Count > 0)
                    {
                        response.StatusCode = Do_CancelCases(dsCancelCasesInfo, deviceTokenEntry);

                        if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                            return response;
                        }

                    }
                }


                drTrans = dsCaseInfo.Tables[0].Select("REPLACE_CASE <> ''");

                if (drTrans.Length > 0)
                {
                    for (int j = 0; j <= drTrans.Length - 1; j++)
                    {
                        int cnt = 0;
                        cnt = _manageCasesRepository.IsNewCaseExistInCaseCardHeader(drTrans[j]["REPLACE_CASE"].ToString(), drTrans[j]["CASE_ID"].ToString());

                        if (cnt > 0)
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + " :Case status changed for case :" + drTrans[j]["REPLACE_CASE"].ToString());

                            response.AtParNotOK(AtparStatusCodes.S_POU_REVIEW_LATEST_DATA, _commonRepo, _log);
                            return response;
                        }
                    }

                    response.StatusCode = _manageCasesRepository.Do_ReplaceCaseSP(drTrans, deviceTokenEntry);

                    if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                        return response;
                    }
                }
                bool blnIsReplacecase = false;

                drTrans = dsCaseInfo.Tables[0].Select("CHANGED_STATUS <> ''");
                if (drTrans.Length == 0)
                {
                    drTrans = dsCaseInfo.Tables[0].Select("REPLACE_CASE <> ''");
                    blnIsReplacecase = true;
                }
                if (drTrans.Length > 0)
                {
                    string strCaseId = string.Empty;
                    string strPrefId = string.Empty;
                    string strProcId = string.Empty;
                    int intStatus = 0;

                    for (int k = 0; k <= drTrans.Length - 1; k++)
                    {
                        if (blnIsReplacecase)
                        {

                            strCaseId = string.Empty;
                            strPrefId = string.Empty;
                            strProcId = string.Empty;
                            intStatus = 0;

                            List<MT_POU_CASE_CART_HEADER> lstCartHeader = _manageCasesRepository.GetDataForSelectedCase(drTrans[k]["REPLACE_CASE"].ToString());


                            if (lstCartHeader != null && lstCartHeader.Count > 0)
                            {
                                strCaseId = drTrans[k]["REPLACE_CASE"].ToString();
                                strPrefId = lstCartHeader[0].PREF_LIST_ID.ToString();
                                strProcId = lstCartHeader[0].PROCEDURE_CODE.ToString();
                                intStatus = (int)AtParWebEnums.CASE_PICK_STATUS.REPLACED;
                            }
                            else
                            {
                                strCaseId = drTrans[k]["CASE_ID"].ToString();
                                strPrefId = drTrans[k]["PREF_LIST_ID"].ToString();
                                strProcId = drTrans[k]["PROCEDURE_CODE"].ToString();
                                intStatus = (int)drTrans[k]["CHANGED_STATUS"];
                            }

                            response.StatusCode = _manageCasesRepository.InsertCaseTrackHistory(strCaseId, strPrefId, strProcId,
                                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID],
                                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeptID], intStatus,
                                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID], true);

                            if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                                return response;
                            }


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

        private long Do_CancelCases(DataSet dsCancelCases, string[] deviceTokenEntry, string replacePrefCard = "", string newPrefCard = "",
            string newProcId = "")
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strLocationType = string.Empty;
            string strInvInterfaceEnabled = string.Empty;
            string strDefaultDestLocation = string.Empty;
            string strDeptID = string.Empty;
            string strDistribType = string.Empty;
            string strResvrQtyOption = string.Empty;
            string cartName = string.Empty;
            string businessUnit = string.Empty;
            string strLocType = string.Empty;
            string strCartDescr = string.Empty;

            DataSet inputParameters = new DataSet();
            DataSet outputParameters = new DataSet();
            DataTable retTbl = new DataTable();
            DataSet quantityOnHandDS = new DataSet();
            List<MT_POU_CART_INVENTORY> lstcartinventory = null;
            List<MT_POU_NONCART_ITEMS> lstNonCart = null;
            long Statuscode = -1;

            string strEnterprizeType = "";
            string erpObjName = "";
            string locType = "";
            Double DblConverFact = 1;
            

            try
            {

                if (dsCancelCases.Tables[0].Rows.Count > 0)
                {
                    retTbl = new DataTable("LOOKUPITEMS");
                    retTbl.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                    retTbl.Columns.Add("ITEM_DESCRIPTION", Type.GetType("System.String"));
                    retTbl.Columns.Add("CUST_ITEM_NO", Type.GetType("System.String"));
                    retTbl.Columns.Add("MANF_ID", Type.GetType("System.String"));
                    retTbl.Columns.Add("QUANTITY_ON_HAND", Type.GetType("System.String"));
                    retTbl.Columns.Add("CART_ID", Type.GetType("System.String"));
                    retTbl.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
                    retTbl.Columns.Add("CART_DESCR", Type.GetType("System.String"));
                    retTbl.Columns.Add("COMPARTMENT", Type.GetType("System.String"));
                    retTbl.Columns.Add("LOTCONTROLLED", Type.GetType("System.String"));
                    retTbl.Columns.Add("SERIALIZED", Type.GetType("System.String"));
                    retTbl.Columns.Add("CONVERSION_RATE", Type.GetType("System.String"));



                    for (int i = 0; i <= dsCancelCases.Tables[0].Rows.Count - 1; i++)
                    {
                        cartName = dsCancelCases.Tables[0].Rows[i]["CART_ID"].ToString();
                        businessUnit = dsCancelCases.Tables[0].Rows[i]["BUSINESS_UNIT"].ToString();
                        strLocType = dsCancelCases.Tables[0].Rows[i]["LOCATION_TYPE"].ToString();

                        DataSet detDs = new DataSet();
                        StringBuilder sb = new StringBuilder();

                        var tupleResult = _GetCartDetails(cartName, businessUnit, detDs, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID],
                            deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], deviceTokenEntry,
                            deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID], strLocationType, sb, "");


                        Statuscode = tupleResult.Item1;

                        if (Statuscode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (Statuscode == AtparStatusCodes.E_NORECORDFOUND)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " : No Items found for the Cart : " + cartName + ": Bunit : " + businessUnit + ":" + System.Environment.NewLine);

                            }
                            else if (Statuscode == AtparStatusCodes.CRCT_E_CARTDOESNOTEXIST)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " : Cart does not exists : " + cartName + ":" + System.Environment.NewLine);

                            }
                            else
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " : Failed to get cart details  : " + " StatusCode is : " + System.Environment.NewLine);

                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " : No Items found for the Cart  : " + cartName + ": BUnit :" + businessUnit + " :" + System.Environment.NewLine);
                            }
                        }

                        if (detDs.Tables[0].Rows.Count > 0)
                        {
                            strCartDescr = detDs.Tables[0].Rows[0][(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.DESCR].ToString();

                            if (detDs.Tables[1].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType.ToString() != System.Type.GetType("System.String").ToString())
                            {

                                Tuple<long, DataSet> tuple = ConvertColumnType(detDs);
                                Statuscode = tuple.Item1;
                                detDs = tuple.Item2;

                                if (Statuscode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsWarnEnabled)
                                        _log.Warn(methodBaseName + " : Failed to convert column's data type : " + " Status Code is : " + Statuscode + System.Environment.NewLine);

                                }


                            }
                        }

                        Tuple<long, DataTable> tpl = null;


                        if (strLocType == AtParWebEnums.LocationType.I.ToString())
                        {

                            tpl = PopulateCartItems(detDs, cartName, strCartDescr, businessUnit, AtParWebEnums.YesNo_Enum.Y.ToString(),
                                 strLocType, deviceTokenEntry, null, true);

                            Statuscode = tpl.Item1;
                            retTbl = tpl.Item2;

                            if (Statuscode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " : Failed in populating inventory items : " + " Status Code is : " + Statuscode + System.Environment.NewLine);

                                return AtparStatusCodes.E_SERVERERROR;
                            }

                        }
                        else
                        {
                            Tuple<long, List<MT_POU_CART_INVENTORY>> tlp = _manageCasesRepository.GetItemQuantityOnHand(businessUnit, cartName);

                            Statuscode = tlp.Item1;
                            lstcartinventory = tlp.Item2;

                            if (Statuscode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " :Failed to get the quantity on  : " + " hand for the items : " + "Exception is:" + System.Environment.NewLine);

                                return AtparStatusCodes.E_SERVERERROR;
                            }

                            //Converting list to Dataset
                            DataTable itemAttributesDt = new DataTable();
                            itemAttributesDt = lstcartinventory.ToDataTable();
                            quantityOnHandDS.Tables.Add(itemAttributesDt);


                            tpl = PopulateCartItems(detDs, cartName, strCartDescr, businessUnit, AtParWebEnums.YesNo_Enum.Y.ToString(),
                                  strLocType, deviceTokenEntry, quantityOnHandDS, true);

                            Statuscode = tpl.Item1;
                            retTbl = tpl.Item2;

                            if (Statuscode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " : Failed in populating ERP par items: " + " Status Code is : " + Statuscode + System.Environment.NewLine);

                                return AtparStatusCodes.E_SERVERERROR;
                            }

                            Tuple<long, List<MT_POU_NONCART_ITEMS>> tpl1 = _manageCasesRepository.GetNonCartItems(businessUnit, cartName);

                            Statuscode = tpl1.Item1;
                            lstNonCart = tpl1.Item2;

                            if (Statuscode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed to get the non cart " + " Status Code is : " + Statuscode + System.Environment.NewLine);

                                return Statuscode;
                            }

                            //Converting list to Dataset
                            DataTable itemAttributesDt1 = new DataTable();
                            DataSet nonCartItemDS = new DataSet();
                            itemAttributesDt1 = lstNonCart.ToDataTable();
                            nonCartItemDS.Tables.Add(itemAttributesDt1);

                            tpl = PopulateCartItems(nonCartItemDS, cartName, strCartDescr, businessUnit, AtParWebEnums.YesNo_Enum.N.ToString(),
                                strLocType, deviceTokenEntry, quantityOnHandDS, true);

                            Statuscode = tpl.Item1;
                            retTbl = tpl.Item2;

                            if (Statuscode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " : Failed in populating non cart items: " + " Status Code is : " + Statuscode + System.Environment.NewLine);

                                return AtparStatusCodes.E_SERVERERROR;
                            }

                        }

                    }
                }

                SortedList<string, string> orgParams;
                string OrgGroupId = string.Empty;

                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.RESERVE_QTY.ToString()] = string.Empty;

                OrgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();
                int appID = (int)AtParWebEnums.EnumApps.PointOfUse;

                _commonRepo.GetOrgGroupParamValues(orgParams, appID, OrgGroupId);

                strResvrQtyOption = orgParams[AtParWebEnums.AppParameters_Enum.RESERVE_QTY.ToString()];

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " : strResvrQtyOption: " + strResvrQtyOption);


                Tuple<DataSet, DataSet, long> tpltri = PrepareInputDataset(inputParameters, outputParameters);
                inputParameters = tpltri.Item1;
                outputParameters = tpltri.Item2;
                Statuscode = tpltri.Item3;

                if (Statuscode != AtparStatusCodes.ATPAR_OK)
                {

                    return Statuscode;
                }

                //GetConfigData();

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                strEnterprizeType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                              x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(strEnterprizeType))
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " : Remote Object Failed");
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.StockIssue.ToString() + "_" + strEnterprizeType;
                }

                if (Statuscode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " : Failed to create the input parameters " + "dataset: StatusCode is: " + Statuscode + System.Environment.NewLine);

                    return AtparStatusCodes.E_SERVERERROR;

                }



                DataView dvCarts = new DataView();
                DataTable dtCarts = new DataTable();

                dvCarts = dsCancelCases.Tables[1].DefaultView;
                dtCarts = dvCarts.ToTable(true, "CART_ID", "BUSINESS_UNIT", "CASE_ID", "PREF_LIST_ID", "PROCEDURE_CODE");


                for (int j = 0; j <= dtCarts.Rows.Count - 1; j++)
                {
                    DataRow[] drSearch = null;
                    DataRow[] drFilter = null;

                    if ((dtCarts.Rows[j]["CART_ID"] != null && !string.IsNullOrEmpty(dtCarts.Rows[j]["CART_ID"].ToString())) &&
                       (dtCarts.Rows[j]["BUSINESS_UNIT"] != null && !string.IsNullOrEmpty(dtCarts.Rows[j]["BUSINESS_UNIT"].ToString())))
                    {
                        int intCaseStatus = 0;
                        intCaseStatus = _manageCasesRepository.GetCaseStatus(dtCarts.Rows[j]["CASE_ID"].ToString(), dtCarts.Rows[j]["PREF_LIST_ID"].ToString(),
                                dtCarts.Rows[j]["PROCEDURE_CODE"].ToString());


                        //if (Statuscode != AtparStatusCodes.ATPAR_OK)
                        //{
                        //    if (_log.IsFatalEnabled)
                        //        _log.Fatal(methodBaseName + " : Failed in GetCaseStatus : StatusCode is: " + Statuscode);


                        //    return Statuscode;
                        //}

                        drSearch = dsCancelCases.Tables[0].Select("CART_ID = '" + dtCarts.Rows[j]["CART_ID"] + "' AND BUSINESS_UNIT = '" + dtCarts.Rows[j]["BUSINESS_UNIT"] + "'");

                        strLocationType = drSearch[0]["LOCATION_TYPE"].ToString();
                        if (strLocationType == AtParWebEnums.LocationType.I.ToString())
                        {
                            List<VM_POU_CASE_CART_HEADER_AND_DEPT> lstCaseCart = _manageCasesRepository.GetCaseCartItemDetails(dtCarts.Rows[j]["CART_ID"].ToString(), dtCarts.Rows[j]["PREF_LIST_ID"].ToString(),
                                dtCarts.Rows[j]["PROCEDURE_CODE"].ToString());

                            strInvInterfaceEnabled = lstCaseCart[0].INV_INTERFACE_ENABLE == null ? "\0" : lstCaseCart[0].INV_INTERFACE_ENABLE.ToString();
                            strDefaultDestLocation = lstCaseCart[0].DEFAULT_DESTINATION_LOCATION == null ? string.Empty : lstCaseCart[0].DEFAULT_DESTINATION_LOCATION;
                            strDeptID = lstCaseCart[0].COST_CENTER_CODE == null ? string.Empty : lstCaseCart[0].COST_CENTER_CODE;
                            strDistribType = lstCaseCart[0].DEFAULT_DISTRIBUTION_TYPE == null ? string.Empty : lstCaseCart[0].DEFAULT_DISTRIBUTION_TYPE;


                        }


                        if (strLocationType == AtParWebEnums.LocationType.I.ToString() && strInvInterfaceEnabled == AtParWebEnums.YesNo_Enum.Y.ToString()
                            && strResvrQtyOption.ToUpper() != AtParWebEnums.RESVR_QTY_OPTION.TOTALPICKQTY.ToString())
                        {
                            inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Clear();
                            inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Clear();

                            drFilter = dsCancelCases.Tables[1].Select("CART_ID = '" + dtCarts.Rows[j]["CART_ID"] + "' AND BUSINESS_UNIT = '" + dtCarts.Rows[j]["BUSINESS_UNIT"] + "' AND CASE_ID = '" + dtCarts.Rows[j]["CASE_ID"] + "' AND PREF_LIST_ID = '" + dtCarts.Rows[j]["PREF_LIST_ID"] + "' AND PROCEDURE_CODE = '" + dtCarts.Rows[j]["PROCEDURE_CODE"] + "'");

                            for (int k = 0; k <= drFilter.Length - 1; k++)
                            {
                                if ((int)drFilter[k]["ITEM_COUNT"] == 0)
                                {
                                    if (_log.IsWarnEnabled)
                                        _log.Warn(methodBaseName + ":Qty is 0. So skipping the Item : " + drFilter[k]["ITEM_ID"] + System.Environment.NewLine);
                                }

                                DataRow dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].NewRow();

                                dr[(int)AtParWebEnums.Send_StockIssue_Details_Enum.ITEM_ID] = drFilter[k]["ITEM_ID"];
                                dr[(int)AtParWebEnums.Send_StockIssue_Details_Enum.STORAGE_LOCATION] = drFilter[k]["COMPARTMENT"];
                                dr[(int)AtParWebEnums.Send_StockIssue_Details_Enum.STORAGE_AREA] = drFilter[k]["STORAGE_AREA"];
                                dr[(int)AtParWebEnums.Send_StockIssue_Details_Enum.STOR_LEVEL_1] = drFilter[k]["STOR_LEVEL_1"];
                                dr[(int)AtParWebEnums.Send_StockIssue_Details_Enum.STOR_LEVEL_2] = drFilter[k]["STOR_LEVEL_2"];
                                dr[(int)AtParWebEnums.Send_StockIssue_Details_Enum.STOR_LEVEL_3] = drFilter[k]["STOR_LEVEL_3"];
                                dr[(int)AtParWebEnums.Send_StockIssue_Details_Enum.STOR_LEVEL_4] = drFilter[k]["STOR_LEVEL_4"];
                                dr[(int)AtParWebEnums.Send_StockIssue_Details_Enum.QTY] = drFilter[k]["ITEM_COUNT"];
                                dr[(int)AtParWebEnums.Send_StockIssue_Details_Enum.UOM] = drFilter[k]["UOM"];
                                dr[(int)AtParWebEnums.Send_StockIssue_Details_Enum.PROCESS_TYPE] = string.Empty;

                                inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Add(dr);

                            }

                            if (inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count > 0)
                            {
                                DataRow drhdr = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].NewRow();


                                Tuple<DataRow, long> tuple = PopulateHeaderTable(dtCarts.Rows[j]["CART_ID"].ToString(), 0, strDefaultDestLocation, (int)AtParWebEnums.AppTransactionStatus.Returned,
                                    strDeptID, drFilter[0]["UPDATE_USER_ID"].ToString(), DateTime.Now.ToString(), DateTime.Now.ToString(), 0, string.Empty,
                                    strDistribType, drhdr, dtCarts.Rows[j]["BUSINESS_UNIT"].ToString());

                                Statuscode = tuple.Item2;

                                if (Statuscode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " : Failed to create header table: " + " Status Code is : " + Statuscode + System.Environment.NewLine);

                                    return AtparStatusCodes.E_SERVERERROR;
                                }

                                inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(drhdr);

                                Tuple<DataSet, long> tpl = null;

                                tpl = Populate_SendDetails_Prerequisites(inputParameters, deviceTokenEntry);

                                Statuscode = tpl.Item2;

                                if (Statuscode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " : Failed to populate " + " the prereq table : StatusCode is  : " + Statuscode + System.Environment.NewLine);

                                    return AtparStatusCodes.E_SERVERERROR;
                                }

                                tpl = ERPsendStockIssue(inputParameters, outputParameters, deviceTokenEntry);


                            }

                        }
                        else
                        {
                            DataSet dsItemsQOH = new DataSet();
                            string strSrCntrld = string.Empty;
                            string strLotCntrld = string.Empty;
                            Double dblConverFact = 1;
                           
                            if ((intCaseStatus == 9 || intCaseStatus == 7) ||
                               (strResvrQtyOption.ToUpper() != AtParWebEnums.RESVR_QTY_OPTION.TOTALPICKQTY.ToString() && intCaseStatus != 9 && intCaseStatus != 7))
                            {
                                drSearch = dsCancelCases.Tables[1].Select("CART_ID = '" + dtCarts.Rows[j]["CART_ID"] + "' AND BUSINESS_UNIT = '" + dtCarts.Rows[j]["BUSINESS_UNIT"] + "' AND CASE_ID = '" + dtCarts.Rows[j]["CASE_ID"] + "' AND PREF_LIST_ID = '" + dtCarts.Rows[j]["PREF_LIST_ID"] + "' AND PROCEDURE_CODE = '" + dtCarts.Rows[j]["PROCEDURE_CODE"] + "'");

                                for (int l = 0; l <= drSearch.Length - 1; l++)
                                {
                                    strSrCntrld = AtParWebEnums.YesNo_Enum.N.ToString();
                                    strLotCntrld = AtParWebEnums.YesNo_Enum.N.ToString();

                                    DataRow[] drRow = null;
                                    StringBuilder sbLookUpSql = new StringBuilder();
                                    sbLookUpSql.Remove(0, sbLookUpSql.Length);
                                    sbLookUpSql.Append("BUSINESS_UNIT = '" + drSearch[l]["BUSINESS_UNIT"] + "' AND");
                                    sbLookUpSql.Append("CART_ID = '" + drSearch[l]["CART_ID"] + "' AND");
                                    sbLookUpSql.Append("ITEM_ID = '" + drSearch[l]["ITEM_ID"] + "' ");
                                    sbLookUpSql.Append("AND COMPARTMENT =' ");
                                    sbLookUpSql.Append(" " + drSearch[l]["COMPARTMENT"].ToString().substituteString() + "' ");

                                    if (_log.IsInfoEnabled)
                                        _log.Info(methodBaseName + " : Search String " + sbLookUpSql.ToString());

                                    if (retTbl != null && retTbl.Rows.Count > 0)
                                    {
                                        drRow = retTbl.Select(sbLookUpSql.ToString());

                                        if (drRow.Length > 0)
                                        {
                                            if (drRow[0]["SERIALIZED"] != null && !string.IsNullOrEmpty(drRow[0]["SERIALIZED"].ToString()))
                                            {
                                                strSrCntrld = drRow[0]["SERIALIZED"].ToString();
                                            }
                                            else
                                            {
                                                strSrCntrld = AtParWebEnums.YesNo_Enum.Y.ToString();
                                            }

                                            if (drRow[0]["LOTCONTROLLED"] != null && !string.IsNullOrEmpty(drRow[0]["LOTCONTROLLED"].ToString()))
                                            {
                                                strLotCntrld = drRow[0]["LOTCONTROLLED"].ToString();
                                            }
                                            else
                                            {
                                                strLotCntrld = AtParWebEnums.YesNo_Enum.N.ToString();
                                            }


                                            if (drRow[0]["CONVERSION_RATE"] != null && !string.IsNullOrEmpty(drRow[0]["CONVERSION_RATE"].ToString()))
                                            {
                                                dblConverFact = Convert.ToDouble(drRow[0]["CONVERSION_RATE"].ToString());
                                            }

                                        }
                                    }

                                    if (string.IsNullOrEmpty(locType))
                                    {
                                        locType = _commonRepo.GetLocationType(drSearch[l]["BUSINESS_UNIT"].ToString(), drSearch[l]["CART_ID"].ToString());
                                    }

                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " :  Conversion factor is ... " + dblConverFact);
                                    Tuple<double, string> tpleget = _manageCasesRepository.GetItemAttributesCnvFact(drSearch[l]["CART_ID"].ToString(), 
                                                                drSearch[l]["BUSINESS_UNIT"].ToString(), drSearch[l]["ITEM_ID"].ToString(), drSearch[l]["UOM"].ToString());

                                    dblConverFact = tpleget.Item1;

                                    if (locType == AtParWebEnums.LocationType.A.ToString())
                                    {
                                        DblConverFact = dblConverFact;
                                    }

                                    Statuscode = _manageCasesRepository.UpdatecartInventory(intCaseStatus, strResvrQtyOption, drSearch[l],
                                        DblConverFact, strLotCntrld, strSrCntrld);
                                    if (Statuscode != AtparStatusCodes.ATPAR_OK)
                                    {

                                        return Statuscode;
                                    }

                                    Statuscode = _manageCasesRepository.SaveTransactionHistory(drSearch[l], retTbl, replacePrefCard);

                                    if (Statuscode != AtparStatusCodes.ATPAR_OK)
                                    {
                                        return AtparStatusCodes.E_SERVERERROR;
                                    }
                                }

                            }
                        }

                    }
                }

                DataView dvCases = new DataView();
                DataTable dtCases = new DataTable();
                if (string.IsNullOrEmpty(replacePrefCard))
                {
                    dvCases = dsCancelCases.Tables[1].DefaultView;
                    dtCases = dvCases.ToTable(true, "CASE_ID", "PROCEDURE_CODE", "PREF_LIST_ID", "BUSINESS_UNIT");

                    for (int v = 0; v <= dtCases.Rows.Count - 1; v++)
                    {
                        int ret = 0;
                        ret = _manageCasesRepository.DoCancelCaseProcessSP(dtCases.Rows[v]["CASE_ID"].ToString(), dtCases.Rows[v]["PROCEDURE_CODE"].ToString(),
                            dtCases.Rows[v]["PREF_LIST_ID"].ToString(), dtCases.Rows[v]["BUSINESS_UNIT"].ToString());
                        if (ret == 1)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " : Failed to execute storedprocedure ReplacePrefCard.");
                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }
                    }
                }
                else
                {
                    dvCases = dsCancelCases.Tables[1].DefaultView;
                    dtCases = dvCases.ToTable(true, "CASE_ID", "PROCEDURE_CODE", "PREF_LIST_ID");

                    for (int y = 0; y <= dtCases.Rows.Count - 1; y++)
                    {
                        int ret = 0;

                        ret = _manageCasesRepository.ReplacePrefCardSP(dtCases.Rows[y]["CASE_ID"].ToString(),
                            dtCases.Rows[y]["PROCEDURE_CODE"].ToString(), dtCases.Rows[y]["PREF_LIST_ID"].ToString(),
                           newPrefCard, newProcId, AtParWebEnums.YesNo_Enum.Y.ToString());

                        if (ret == 1)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " : Failed to execute storedprocedure ReplacePrefCard.");

                            return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                        }

                    }
                }
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public Tuple<DataSet, DataSet, long> PrepareInputDataset(DataSet InputputParameters, DataSet OutParameters)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<DataSet, DataSet, long> tpl = null;

            DataTable pouIssueheaderTbl = default(DataTable);
            DataTable pouIssuedetailsTbl = default(DataTable);
            DataTable pouIssuePreReqTbl = default(DataTable);
            DataTable pouIssueOutPutTbl = default(DataTable);
            try
            {
                InputputParameters = new DataSet("POU_Send_DS");
                try
                {
                    pouIssueheaderTbl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_StockIssue_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} :", " Failed to create the input parameters header :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                    tpl = new Tuple<DataSet, DataSet, long>(InputputParameters, OutParameters, AtparStatusCodes.E_SERVERERROR);
                    return tpl;
                }
                try
                {
                    pouIssuedetailsTbl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_StockIssue_Details_Defns, AtParWebEnums.DataSet_Type.DETAILS.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} :", " Failed to create the input parameters details :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                    tpl = new Tuple<DataSet, DataSet, long>(InputputParameters, OutParameters, AtparStatusCodes.E_SERVERERROR);
                    return tpl;
                }
                try
                {
                    pouIssuePreReqTbl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_StockIssue_BusinessRules_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} :", " Failed to create the input parameters PreReq table :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                    tpl = new Tuple<DataSet, DataSet, long>(InputputParameters, OutParameters, AtparStatusCodes.E_SERVERERROR);
                    return tpl;
                }

                try
                {
                    if (OutParameters.Tables.Count > 0)
                    {
                        OutParameters.Tables.Clear();
                        OutParameters.AcceptChanges();
                    }
                    pouIssueOutPutTbl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Send_StockIssue_Output_Defns, AtParWebEnums.DataSet_Type.OUTPUT.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} {3} :", " Failed to create the input parameters Output table :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                    tpl = new Tuple<DataSet, DataSet, long>(InputputParameters, OutParameters, AtparStatusCodes.E_SERVERERROR);
                    return tpl;
                }
                InputputParameters.Tables.Add(pouIssueheaderTbl);
                InputputParameters.Tables.Add(pouIssuedetailsTbl);
                InputputParameters.Tables.Add(pouIssuePreReqTbl);
                OutParameters.Tables.Add(pouIssueOutPutTbl);

                DataRow _drDet = OutParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].NewRow();
                _drDet[(Int16)AtParWebEnums.Send_POU_Issue_Output_Enum.STATUS_CODE] = AtparStatusCodes.E_SERVERERROR;

                OutParameters.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Add(_drDet);
                OutParameters.AcceptChanges();
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tpl = new Tuple<DataSet, DataSet, long>(InputputParameters, OutParameters, AtparStatusCodes.E_SERVERERROR);
                return tpl;
            }
            tpl = new Tuple<DataSet, DataSet, long>(InputputParameters, OutParameters, AtparStatusCodes.ATPAR_OK);
            return tpl;
        }
        private Tuple<long, DataSet> ConvertColumnType(DataSet dS)
        {
            DataTable dtTemp = new DataTable();
            Tuple<long, DataSet> tpl = null;

            try
            {
                dtTemp = dS.Tables["Details"].Clone();

                //Cloning Details table
                dtTemp.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType = System.Type.GetType("System.String");


                foreach (DataRow dr in dS.Tables["Details"].Rows)
                {
                    dtTemp.ImportRow(dr);
                }
                dS.Tables.Remove("Details");
                dS.Tables.Add(dtTemp);

                tpl = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, dS);
                return tpl;

            }
            catch (Exception ex)
            {
                tpl = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, dS);
                return tpl;

            }


        }
        private Tuple<DataRow, long> PopulateHeaderTable(string cartId, long orderNo, string location, int status, string deptID,
            string userId, string startDate, string endDate, long transID, string patientID, string distribType, DataRow drhdr,
            string bunit)
        {
            Tuple<DataRow, long> tpl = null;


            try
            {
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.BUSINESS_UNIT] = cartId;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.ORDER_NO] = orderNo;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.LOCATION] = location;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.STATUS] = status;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.DEPARTMENT_ID] = deptID;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.ISSUETO_USER_ID] = userId;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.CURRENT_USER_ID] = userId;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.SUSER_ID] = userId;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.START_DATE] = startDate;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.END_DATE] = endDate;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.TRANSACTION_ID] = transID;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.PATIENT_ID] = patientID;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.COUNT_FLAG] = AtParWebEnums.YesNo_Enum.Y.ToString();
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.DISTRIB_TYPE] = distribType;
                drhdr[(int)AtParWebEnums.Send_StockIssue_Header_Enum.COMPANY] = bunit;

                tpl = new Tuple<DataRow, long>(drhdr, AtparStatusCodes.ATPAR_OK);
                return tpl;


            }
            catch (Exception ex)
            {
                tpl = new Tuple<DataRow, long>(drhdr, AtparStatusCodes.E_SERVERERROR);
                return tpl;

            }
        }
        //private void GetConfigData()
        //{

        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}
        private Tuple<DataSet, long> ERPsendStockIssue(DataSet inputParameters, DataSet OutputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<DataSet, long> tupleOutput = null;

            try
            {


                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                //GetConfigData();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                  x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(" Remote Object Failed ");
                    tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.StockIssue.ToString() + "_" + erpObjName;
                }



                className = "sendStockIssue";
                methodName = "sendStockIssue";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, OutputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "sendStockIssue failed from ERP")); }
                    tupleOutput = new Tuple<DataSet, long>(null, StatusCode);
                    return tupleOutput;
                }

                OutputParameters = (DataSet)args[1];


                tupleOutput = new Tuple<DataSet, long>(OutputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;
            }
        }
        private Tuple<DataSet, long> Populate_SendDetails_Prerequisites(DataSet inputParameters,
           string[] deviceTokenEntry, int appID = 15)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SortedList<string, string> userParams;
            SortedList<string, string> orgParams;


            string erpObjName = "";
            string remoteDBType = "";
            string remoteSchema = "";
            string erpDetails = "";
            string erpVersion = "";
            string compartmentname = "";
            string putwyCIName = "";
            string rmaCIName = "";
            string rmaReceiptCIName = "";

            string orgGroupId = string.Empty;
            string profileId = string.Empty;
            string userId = string.Empty;

            long StatusCode = -1;
            Tuple<DataSet, long> tupleResult = null;



            try
            {

                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.CREATE_MSR_FOR_ISSUE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.RMA_COMPONENT_INTERFACE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ADJ_REASON_CODE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.PS_USER.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.SKIP_ISSUE_ITEMS_IN_PEOPLESOFT.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.DOC_ID_GENERATION.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ALLOW_NEGATIVE_INVENTORY.ToString()] = string.Empty;

                orgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();


                //Getting OrgParam Values
                _commonRepo.GetOrgGroupParamValues(orgParams, appID, orgGroupId);



                //Getting UserParams values
                userParams = new SortedList<string, string>();

                userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()] = string.Empty;
                userParams[AtParWebEnums.AppParameters_Enum.DEFAULT_COMPANY.ToString()] = string.Empty;

                userId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                _commonRepo.GetUserParamValues(userParams, appID, userId);



                //GetConfigData();

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ERPSICOMPINTERFACE.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.EXP_PUTAWAY_CI_NAME.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.RMA_CI_NAME.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();




                compartmentname = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                              x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ERPSICOMPINTERFACE.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                putwyCIName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                               x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.EXP_PUTAWAY_CI_NAME.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                rmaCIName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                           x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.RMA_CI_NAME.ToString())
                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                erpDetails = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString())
                                                      .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                erpVersion = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                          x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISEVERSION.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                remoteDBType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                        x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                  x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                  .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                rmaReceiptCIName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                         x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.RMA_RECEIPT_CI_NAME.ToString())
                                                       .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                DataRow dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();

                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.CREATE_MSR_FOR_ISSUE] = orgParams[AtParWebEnums.AppParameters_Enum.CREATE_MSR_FOR_ISSUE.ToString()];
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.ALLOW_NEGATIVE_INVENTORY] = orgParams[AtParWebEnums.AppParameters_Enum.ALLOW_NEGATIVE_INVENTORY.ToString()];
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.ONE_ITEM_IN_MSR] = AtParWebEnums.YesNo_Enum.N.ToString();
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.STOR_LOC_REQD] = AtParWebEnums.YesNo_Enum.N.ToString();
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.DEFAULT_LOC_AS_DEPT] = AtParWebEnums.YesNo_Enum.N.ToString();
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.RMA_COMPONENT_INTERFACE] = orgParams[AtParWebEnums.AppParameters_Enum.RMA_COMPONENT_INTERFACE.ToString()];
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.DOC_ID_GENERATION] = orgParams[AtParWebEnums.AppParameters_Enum.DOC_ID_GENERATION.ToString()];
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.COMPONENT_NAME] = compartmentname;
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.EXP_PUTAWAY_CI_NAME] = putwyCIName;
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.RMA_CI_NAME] = rmaCIName;
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME] = erpDetails;
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.ENTERPRISE_VERSION] = erpVersion;
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.REMOTE_DB_TYPE] = remoteDBType;
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.REMOTE_SCHEMA] = remoteSchema;

                if (userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()] != null)
                {
                    if (!string.IsNullOrEmpty(userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()]))
                    {
                        dr[AtParWebEnums.Send_StockIssue_BusinessRules_Enum.OPRID_MODIFIED_BY.ToString()] = userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()];
                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + " ERP User ID is  " + userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()]);
                    }
                    else
                    {
                        dr[AtParWebEnums.Send_StockIssue_BusinessRules_Enum.OPRID_MODIFIED_BY.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.PS_USER.ToString()];
                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + " ERP User ID is  " + orgParams[AtParWebEnums.AppParameters_Enum.PS_USER.ToString()]);

                    }
                }
                else
                {
                    dr[AtParWebEnums.Send_StockIssue_BusinessRules_Enum.OPRID_MODIFIED_BY.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.PS_USER.ToString()];
                }



                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.INV_DATA_SYNC] = AtParWebEnums.YesNo_Enum.Y.ToString();
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.REASON_CD] = orgParams[AtParWebEnums.AppParameters_Enum.ADJ_REASON_CODE.ToString()];
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.DEFAULT_COMPANY] = userParams[AtParWebEnums.AppParameters_Enum.DEFAULT_COMPANY.ToString()];
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.SKIP_ISSUE_ITEMS_IN_PEOPLESOFT] = orgParams[AtParWebEnums.AppParameters_Enum.SKIP_ISSUE_ITEMS_IN_PEOPLESOFT.ToString()];
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.CREATE_RMA_RECEIPT] = AtParWebEnums.YesNo_Enum.Y.ToString();
                dr[(int)AtParWebEnums.Send_StockIssue_BusinessRules_Enum.RMA_RECEIPT_CI_NAME] = rmaReceiptCIName;

                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(dr);


                tupleResult = new Tuple<DataSet, long>(inputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());

                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }
        }
        private long VerifyReviewerdata(DataSet dsCaseInfo, bool replacePref = false)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataRow[] drChkTrans = null;

            try
            {


                if (!replacePref)
                {
                    drChkTrans = dsCaseInfo.Tables[0].Select("CHANGED_STATUS <> ''");

                    if (drChkTrans.Length == 0)
                    {
                        drChkTrans = dsCaseInfo.Tables[0].Select("REPLACE_CASE <> ''");
                    }
                }
                else
                {
                    drChkTrans = dsCaseInfo.Tables[0].Select("1=1");
                }

                if (drChkTrans.Length > 0)
                {

                    for (int i = 0; i <= drChkTrans.Length - 1; i++)
                    {
                        int intcaseCurr_Status = 0;
                        int intCount = 0;
                        string strStatus = string.Empty;


                        if (!replacePref)
                        {
                            strStatus = drChkTrans[i]["CURRENT_STATUS"].ToString();
                        }
                        else
                        {
                            strStatus = drChkTrans[i]["STATUS"].ToString();
                        }

                        switch (strStatus)
                        {
                            case "OPEN":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.OPEN;
                                break;
                            case "READY":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.READY;
                                break;
                            case "PARTIALLY PICKED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.PARTIALLYPICKED;
                                break;
                            case "PICKED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.PICKED;
                                break;
                            case "RETURNED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.RETURNED;
                                break;
                            case "REVIEWED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.REVIEWED;
                                break;
                            case "CLOSED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.CLOSED;
                                break;
                            case "REPLACED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.REPLACED;
                                break;
                            case "INACTIVE":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.INACTIVE;
                                break;
                            case "CANCELLED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.CANCELLED;
                                break;
                            case "PENDING":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.PENDING;
                                break;
                            case "CASEISSUED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.CASEISSUED;
                                break;
                            case "PREF_REPLACED":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.PREF_REPLACED;
                                break;
                            case "REMOVE":
                                intcaseCurr_Status = (int)AtParWebEnums.CASE_PICK_STATUS.REMOVE;
                                break;
                        }


                        intCount = _manageCasesRepository.GetCaseIdCount(drChkTrans[i]["CASE_ID"].ToString(),
                            drChkTrans[i]["PROCEDURE_CODE"].ToString(), drChkTrans[i]["PREF_LIST_ID"].ToString(),
                           intcaseCurr_Status);


                        if (intCount > 0)
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + " :Case status changed for case :" + drChkTrans[i]["CASE_ID"]);
                            return AtparStatusCodes.S_POU_REVIEW_LATEST_DATA;
                        }
                    }
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ": Failed with exception :" + ex.ToString() + System.Environment.NewLine);
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        #region common
        private Tuple<long, DataSet> _GetCartDetails(string cartID, string bUnit, DataSet cartDetailsDS, string orgGrpID, string systemID, string[] deviceTokenEntry, string profileID, string locationType, StringBuilder syncData = null, string syncFlag = "", int appID = 15, string deptID = "")
        {

            try
            {

                string itemDescrType = null;
                string defaultMfgItemID = null;
                string itemPriceType = null;
                DataSet inputParameters = new DataSet();
                string erpObjName = null;

                long statusCode = 0;
                char cartManagedAtpar = '\0';

                string ndcType = string.Empty;
                string upnType = string.Empty;


                SortedList<string, string> orgParams = new SortedList<string, string>();
                SortedList<string, string> userParams = new SortedList<string, string>();
                SortedList<string, string> profParams = new SortedList<string, string>();


                orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.SYNC_MULTIPLE_LOC_INFO.ToString()] = string.Empty;

                _commonRepo.GetOrgGroupParamValues(orgParams, appID, orgGrpID);



                itemDescrType = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                defaultMfgItemID = orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                itemPriceType = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];

                if (orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()].ToString() != string.Empty)
                {
                    cartManagedAtpar = Convert.ToChar(orgParams[AtParWebEnums.AppParameters_Enum.CARTS_MNGD_ATPAR.ToString()]);
                }

                userParams[AtParWebEnums.AppParameters_Enum.DEFAULT_COMPANY.ToString()] = string.Empty;



                //Not getting profile parameter values when there is no ProfileID
                if (profileID != "" & profileID != string.Empty)
                {
                    profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()] = string.Empty;
                    profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()] = string.Empty;

                    _commonRepo.GetProfileParamValues(profParams, appID, profileID);

                    upnType = profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                    ndcType = profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];


                }

                if (string.IsNullOrEmpty(locationType))
                {
                    locationType = _commonRepo.GetLocationType(bUnit, cartID);
                }


                var dtHdrData = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Detail_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                var dtPreReq = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_PreReqData_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                var dtListView = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_Detail_ListView_RequiredParams, AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString());


                var dtOutPutHdr = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_DetailOutput_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());

                var dtOutPutDtl = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_DetailOutput_Details_Defns, AtParWebEnums.DataSet_Type.DETAILS.ToString());

                cartDetailsDS.Tables.Clear();
                cartDetailsDS.Tables.Add(dtOutPutHdr);
                cartDetailsDS.Tables.Add(dtOutPutDtl);

                if (locationType == AtParWebEnums.LocationType.I.ToString())
                {
                    var dtOutPutLotSerial = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Cart_DetailOutput_LotSerial_Defns, AtParWebEnums.DataSet_Type.LOTSERIAL_INFO.ToString());
                    cartDetailsDS.Tables.Add(dtOutPutLotSerial);
                }

                var drHdr = dtHdrData.NewRow();

                drHdr[(int)AtParWebEnums.Get_Detail_Defns_Enum.USER_ID] = string.Empty;
                drHdr[(int)AtParWebEnums.Get_Detail_Defns_Enum.BUSINESS_UNIT] = bUnit;
                drHdr[(int)AtParWebEnums.Get_Detail_Defns_Enum.CART_ID] = cartID;
                dtHdrData.Rows.Add(drHdr);

                var drPreReq = dtPreReq.NewRow();

                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_PRICE] = itemPriceType;
                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_DESCR] = itemDescrType;
                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.DEFAULT_MFG_ITEM_ID] = defaultMfgItemID;
                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_UPN_TYPE_CODE] = upnType;
                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.ITEM_NDC_TYPE_CODE] = ndcType;



                List<string> lstParameters = new List<string>
                    {
                        AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString(),
                        AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString()
                    };

                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var remoteSchema = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;

                var remoteDbType = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                drPreReq[(int)AtParWebEnums.Get_Cart_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDbType;

                dtPreReq.Rows.Add(drPreReq);


                var drListView = dtListView.NewRow();
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_CTRL] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_OPT] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COMPARTMENT] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CONS_NON_STOCK] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_QTY] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_REQUIRED] = false;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.CUST_ITEM_NO] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.DESCR] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.FOQ] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.GTIN] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.INVENTORY_ITEM] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_COUNT_ORDER] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_ID] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.MAXIMUM_QTY] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.OPTIMAL_QTY] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.PRICE] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.PRINT_LATER_FLAG] = false;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.UOM] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.UPC_ID] = true;
                drListView[(int)AtParWebEnums.Get_Cart_Detail_ListView_Reqparams_Enum.VNDR_ITEM_ID] = true;

                dtListView.Rows.Add(drListView);

                inputParameters.Tables.Add(dtHdrData);
                inputParameters.Tables.Add(dtPreReq);
                inputParameters.Tables.Add(dtListView);


                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DateTime] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] = orgGrpID;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.AccessToken] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.LdapUser] = string.Empty;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType] = AtParWebEnums.ClientType.WEB.ToString();
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId] = systemID;
                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeptID] = deptID;

                if (locationType == AtParWebEnums.LocationType.P.ToString())
                {

                    lstParameters =
                          new List<string> { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };

                    var lstConfigSectionDtls1 = _commonRepo.GetConfigData(lstParameters).ToList();

                    erpObjName = AtParWebEnums.EnumApps.CartCount + "_" + lstConfigSectionDtls1.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    var tupleCartDetails = _getDetailsService.GetCartDetails(erpObjName, inputParameters, cartDetailsDS, deviceTokenEntry);
                    cartDetailsDS = tupleCartDetails.Item2;

                    if (cartDetailsDS != null)
                    {
                        var resultTuple = UpdateLotSerFlags(bUnit, cartID, cartDetailsDS, AtParWebEnums.YesNo_Enum.Y.ToString());

                        cartDetailsDS = resultTuple.Item2;
                        statusCode = resultTuple.Item1;


                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            return new Tuple<long, DataSet>(statusCode, null);
                        }
                    }

                }
                else if (locationType == AtParWebEnums.LocationType.A.ToString())
                {

                    erpObjName = AtParWebEnums.Erp_Obj_Name.CartCount_Atpar.ToString();

                    var tupleCartDetails = _getDetailsService.GetCartDetails(erpObjName, inputParameters, cartDetailsDS, deviceTokenEntry);
                    cartDetailsDS = tupleCartDetails.Item2;

                    var resultTuple = UpdateLotSerFlags(bUnit, cartID, cartDetailsDS, AtParWebEnums.YesNo_Enum.Y.ToString());

                    cartDetailsDS = resultTuple.Item2;
                    statusCode = resultTuple.Item1;

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(statusCode, null);
                    }


                }
                else if (locationType == AtParWebEnums.LocationType.I.ToString())
                {
                    var resultTuple = GetLocationDetails(bUnit, cartID, orgParams, profParams, cartDetailsDS, deviceTokenEntry, syncData, syncFlag);
                    statusCode = resultTuple.Item1;
                    cartDetailsDS = resultTuple.Item2;

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(statusCode, null);
                    }

                    var result = UpdateLotSerFlags(bUnit, cartID, cartDetailsDS, AtParWebEnums.YesNo_Enum.Y.ToString());
                    cartDetailsDS = result.Item2;
                    statusCode = result.Item1;

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(statusCode, null);
                    }

                }
                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, cartDetailsDS);
            }
            catch (Exception ex)
            {
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }

        }
        private Tuple<long, DataSet> GetLocationDetails(string bunit, string cartID, SortedList<string, string> orgParm, SortedList<string, string> profileParam, DataSet dsLocDetails, string[] deviceTokenEntry, StringBuilder syncData = null, string syncFlag = "")
        {
            StringBuilder sbInputXml = new StringBuilder();
            string outXml = string.Empty;

            XmlDocument xmlDoc = new XmlDocument();
            long statusCode = -1;
            string parLocStatus = string.Empty;
            dynamic info2 = string.Empty;
            dynamic info3 = string.Empty;
            dynamic packingString = string.Empty;

            string itemPriceType = string.Empty;
            string itemDescrType = string.Empty;
            string defaultMfgItemID = string.Empty;
            string syncFrmMultiLoc = string.Empty;
            string upnType = string.Empty;
            try
            {

                itemPriceType = orgParm[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];
                itemDescrType = orgParm[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                defaultMfgItemID = orgParm[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                syncFrmMultiLoc = orgParm[AtParWebEnums.AppParameters_Enum.SYNC_MULTIPLE_LOC_INFO.ToString()];

                upnType = profileParam[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                var ndcType = profileParam[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];
                var deptID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeptID] = null ?? string.Empty;


                string storageArea = string.Empty;

                if (!string.IsNullOrEmpty(deptID))
                {
                    storageArea = _manageCasesRepository.GetStorageArea(deptID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                    }
                }
                else
                {
                    storageArea = string.Empty;
                }

                sbInputXml.Append("<ROOT><BUNIT><RECORD>");
                sbInputXml.Append(cartID);
                sbInputXml.Append("</RECORD>");
                sbInputXml.Append("<BUNIT_COUNT_FLAG>");
                sbInputXml.Append(cartID);
                sbInputXml.Append(",");
                sbInputXml.Append("0");
                sbInputXml.Append("</BUNIT_COUNT_FLAG>");
                sbInputXml.Append("</BUNIT><ITEM_PRICE_TYPE>");
                sbInputXml.Append(itemPriceType);
                sbInputXml.Append("</ITEM_PRICE_TYPE><USER_ID>");
                sbInputXml.Append(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID]);
                sbInputXml.Append("</USER_ID>");
                sbInputXml.Append("<MFG_ITEM_REQD>");
                sbInputXml.Append("True");
                sbInputXml.Append("</MFG_ITEM_REQD>");
                sbInputXml.Append("<VENDOR_ITEM_REQD>");
                sbInputXml.Append("True");
                sbInputXml.Append("</VENDOR_ITEM_REQD>");
                sbInputXml.Append("<PRICE_REQD>");
                sbInputXml.Append("True");
                sbInputXml.Append("</PRICE_REQD>");
                sbInputXml.Append("<ITEM_DESCR>");
                sbInputXml.Append(itemDescrType);
                sbInputXml.Append("</ITEM_DESCR>");
                sbInputXml.Append("<DEFAULT_MFG_ITEM_ID>");
                sbInputXml.Append(defaultMfgItemID);
                sbInputXml.Append("</DEFAULT_MFG_ITEM_ID>");
                sbInputXml.Append("<ITEM_UPN_TYPE_CODE>");
                sbInputXml.Append(upnType);
                sbInputXml.Append("</ITEM_UPN_TYPE_CODE>");
                sbInputXml.Append("<ITEM_NDC_TYPE_CODE>");
                sbInputXml.Append(ndcType);
                sbInputXml.Append("</ITEM_NDC_TYPE_CODE>");
                sbInputXml.Append("<BIN_TO_BIN_ACCESS>");
                sbInputXml.Append("False");
                sbInputXml.Append("</BIN_TO_BIN_ACCESS>");
                sbInputXml.Append("<ALLOW_NEGATIVE_INVENTORY>");
                sbInputXml.Append("N");
                sbInputXml.Append("</ALLOW_NEGATIVE_INVENTORY>");
                sbInputXml.Append("<SYNC_MULTIPLE_LOC_INFO>");
                sbInputXml.Append(syncFrmMultiLoc);
                sbInputXml.Append("</SYNC_MULTIPLE_LOC_INFO>");
                sbInputXml.Append("<DEFAULT_COMPANY>");
                sbInputXml.Append(bunit);
                sbInputXml.Append("</DEFAULT_COMPANY>");
                sbInputXml.Append("<STORAGE_AREA>");
                sbInputXml.Append(storageArea);
                sbInputXml.Append("</STORAGE_AREA>");
                sbInputXml.Append("</ROOT>");

                List<string> lstParameters = new List<string> { AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() };

                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                var erpObjName = AtParWebEnums.EnumApps.StockIssue + "_" + lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                var erpResult = ERPGetLocationDetails(erpObjName, sbInputXml.ToString(), outXml, deviceTokenEntry);

                if (!string.IsNullOrEmpty(erpResult.Item2))
                {
                    xmlDoc.LoadXml(erpResult.Item2);
                }

                if (!string.IsNullOrEmpty(syncFlag) && syncFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    syncData.Append(outXml);
                }
                else
                {
                    var nodeList = xmlDoc.SelectNodes("ROOT/ITEM");

                    var drLocHeaderRow = dsLocDetails.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].NewRow();

                    drLocHeaderRow[(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.BUSINESS_UNIT] = bunit;
                    drLocHeaderRow[(int)AtParWebEnums.Get_Cart_Detail_Output_Header_Enum.CART_ID] = cartID;

                    dsLocDetails.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Add(drLocHeaderRow);

                    string itemID;

                    if (nodeList != null)

                        foreach (XmlNode node in nodeList)
                        {
                            itemID = string.Empty;
                            var descr = string.Empty;
                            double price = 0;
                            var serFlg = string.Empty;
                            var lotFlg = string.Empty;
                            var mfgItemId = string.Empty;
                            var srVndItemId = string.Empty;
                            var upcID = string.Empty;
                            var gtin = string.Empty;
                            var custItemId = string.Empty;
                            var chargeCode = string.Empty;
                            var implantFlag = string.Empty;
                            var itemMaster = string.Empty;
                            var billonlyItms = string.Empty;
                            var nonCartItms = string.Empty;
                            var itemType = 0;
                            dynamic itemMasterStatus = string.Empty;
                            dynamic itemBuStatus = string.Empty;

                            if ((node.SelectSingleNode("B") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("B");
                                if (selectSingleNode != null)
                                    itemID = selectSingleNode.InnerText;
                            }
                            if ((node.SelectSingleNode("J") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("J");
                                if (selectSingleNode != null)
                                    descr = selectSingleNode.InnerText;
                            }

                            price = 0.0;
                            if ((node.SelectSingleNode("K") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("K");
                                var singleNode = node.SelectSingleNode("K");
                                if (singleNode != null)
                                    price = (selectSingleNode != null &&
                                             string.IsNullOrEmpty(selectSingleNode.InnerText)
                                        ? 0.0
                                        : Convert.ToDouble(singleNode.InnerText));
                            }

                            if ((node.SelectSingleNode("IT") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("IT");
                                if (selectSingleNode != null)
                                    itemType = Convert.ToInt32(selectSingleNode.InnerText);
                            }

                            if ((node.SelectSingleNode("H") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("H");
                                if (selectSingleNode != null)
                                    serFlg = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("I") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("I");
                                if (selectSingleNode != null)
                                    lotFlg = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("C") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("C");
                                if (selectSingleNode != null)
                                    mfgItemId = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("G") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("G");
                                if (selectSingleNode != null)
                                    custItemId = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("E") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("E");
                                if (selectSingleNode != null)
                                    srVndItemId = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("F") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("F");
                                if (selectSingleNode != null)
                                    upcID = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("D") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("D");
                                if (selectSingleNode != null) gtin = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("AX") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("AX");
                                if (selectSingleNode != null)
                                    chargeCode = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("AY") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("AY");
                                if (selectSingleNode != null)
                                    parLocStatus = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("AZ") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("AZ");
                                if (selectSingleNode != null)
                                    itemMaster = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("BA") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("BA");
                                if (selectSingleNode != null)
                                    nonCartItms = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("BB") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("BB");
                                if (selectSingleNode != null)
                                    billonlyItms = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("BC") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("BC");
                                if (selectSingleNode != null)
                                    implantFlag = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("P") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("P");
                                if (selectSingleNode != null)
                                    itemMasterStatus = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("Q") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("Q");
                                if (selectSingleNode != null)
                                    itemBuStatus = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("M") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("M");
                                if (selectSingleNode != null)
                                    info2 = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("N") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("N");
                                if (selectSingleNode != null)
                                    info3 = selectSingleNode.InnerText;
                            }

                            if ((node.SelectSingleNode("O") != null))
                            {
                                var selectSingleNode = node.SelectSingleNode("O");
                                if (selectSingleNode != null)
                                    packingString = selectSingleNode.InnerText;
                            }


                            var drLocDetail = dsLocDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].NewRow();

                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] = itemID;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT] = string.Empty;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR] = descr;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE] = price;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM] = string.Empty;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED] = lotFlg;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED] = serFlg;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID] = mfgItemId;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ITEM_ID] = srVndItemId;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.UPN_ID] = upcID;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY] = 0;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_NDC] = gtin;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID] = custItemId;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_TYPE] = itemType;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.CHARGE_CODE] = chargeCode;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.IMPLANT_FLAG] = implantFlag;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_LOC_STATUS] = parLocStatus;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_MASTER_ITEM_STATUS] =
                                itemMaster;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.BILL_ITEM_STATUS] = billonlyItms;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.NON_CART_ITEM_STATUS] =
                                nonCartItms;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_MASTER_STATUS] =
                                itemMasterStatus;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_BU_STATUS] = itemBuStatus;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.INFO_2] = info2;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.INFO_3] = info3;
                            drLocDetail[(int)AtParWebEnums.Get_Cart_Detail_Enum.PACKAGING_STRING] = packingString;

                            dsLocDetails.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Add(drLocDetail);
                        }

                    var stkNodeList = xmlDoc.SelectNodes("ROOT/STOCK");

                    if (stkNodeList != null)
                        foreach (XmlNode stkNode in stkNodeList)
                        {
                            itemID = string.Empty;
                            var strLoc = string.Empty;
                            var area = string.Empty;
                            var level1 = string.Empty;
                            var level2 = string.Empty;
                            var level3 = string.Empty;
                            var level4 = string.Empty;
                            var serNo = string.Empty;
                            var lotNo = string.Empty;
                            var sysQty = string.Empty;
                            dynamic stdPackUom = string.Empty;
                            dynamic stdUom = string.Empty;

                            if (stkNode.SelectSingleNode("B") != null)
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("B");
                                if (selectSingleNode != null)
                                    itemID = selectSingleNode.InnerText;//ITEM_ID

                            }
                            if ((stkNode.SelectSingleNode("V") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("V");
                                if (selectSingleNode != null)
                                    strLoc = selectSingleNode.InnerText; //STORAGE_LOCATION
                            }
                            if ((stkNode.SelectSingleNode("U") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("U");
                                if (selectSingleNode != null)
                                    area = selectSingleNode.InnerText;  //STORAGE_AREA
                            }

                            if ((stkNode.SelectSingleNode("AC") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("AC");
                                if (selectSingleNode != null)
                                    level1 = selectSingleNode.InnerText;//STOR_LEVEL_1
                            }
                            if ((stkNode.SelectSingleNode("AD") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("AD");
                                if (selectSingleNode != null)
                                    level2 = selectSingleNode.InnerText;  //STOR_LEVEL_2
                            }
                            if ((stkNode.SelectSingleNode("AE") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("AE");
                                if (selectSingleNode != null)
                                    level3 = selectSingleNode.InnerText;   //STOR_LEVEL_3
                            }
                            if ((stkNode.SelectSingleNode("AF") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("AF");
                                if (selectSingleNode != null)
                                    level4 = selectSingleNode.InnerText; //STOR_LEVEL_4
                            }
                            if ((stkNode.SelectSingleNode("T") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("T");
                                if (selectSingleNode != null)
                                    serNo = selectSingleNode.InnerText; //SERIAL_ID
                            }

                            if ((stkNode.SelectSingleNode("S") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("S");
                                if (selectSingleNode != null)
                                    lotNo = selectSingleNode.InnerText;  //LOT_ID
                            }

                            if ((stkNode.SelectSingleNode("Z") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("Z");
                                if (selectSingleNode != null)
                                    sysQty = selectSingleNode.InnerText;  //SYSTEM_QTY
                            }

                            if ((stkNode.SelectSingleNode("X") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("X");
                                if (selectSingleNode != null)
                                    stdUom = selectSingleNode.InnerText;  //STDUOM
                            }

                            if ((stkNode.SelectSingleNode("AI") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("AI");
                                if (selectSingleNode != null)
                                    stdPackUom = selectSingleNode.InnerText; //STD_PACK_UOM
                            }

                            var drLotSerial = dsLocDetails.Tables[AtParWebEnums.DataSet_Type.LOTSERIAL_INFO.ToString()]
                                .NewRow();

                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.BUSINESS_UNIT] = bunit;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.CART_ID] = cartID;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION] = strLoc;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_AREA] = area;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_1] = level1;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_2] = level2;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_3] = level3;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_4] = level4;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.ITEM_ID] = itemID;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.LOT_NUMBER] = lotNo;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.SERIAL_NUMBER] = serNo;

                            //STAGED_DATE
                            if ((stkNode.SelectSingleNode("R") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("R");
                                if (selectSingleNode != null)
                                    drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STAGED_DATE] =
                                        selectSingleNode.InnerText;
                            }
                            else
                            {
                                drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STAGED_DATE] =
                                    string.Empty;
                            }

                            //CONTAINER_ID
                            if ((stkNode.SelectSingleNode("Y") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("Y");
                                if (selectSingleNode != null)
                                    drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.CONTAINER_ID] =
                                        selectSingleNode.InnerText;
                            }
                            else
                            {
                                drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.CONTAINER_ID] =
                                    string.Empty;
                            }
                            //ITEM_UOM
                            if ((stkNode.SelectSingleNode("W") != null))
                            {
                                var selectSingleNode = stkNode.SelectSingleNode("W");
                                if (selectSingleNode != null)
                                    drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.UOM] =
                                        selectSingleNode.InnerText;
                            }
                            else
                            {
                                drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.UOM] = string.Empty;
                            }
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.SYSTEM_QTY] = sysQty;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STDUOM] = stdUom;
                            drLotSerial[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STD_PACK_UOM] = stdPackUom;

                            dsLocDetails.Tables[AtParWebEnums.DataSet_Type.LOTSERIAL_INFO.ToString()]
                                .Rows.Add(drLotSerial);
                        }
                }


                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, dsLocDetails);
            }
            catch (Exception ex)
            {
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, dsLocDetails);
            }
        }
        private Tuple<long, string> ERPGetLocationDetails(string erpObjName, string sbInputXml, string outXml, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                //GetConfigData();
                string className = null;
                object reflectObject = null;

                className = "GetInventoryItems";
                var methodName = "GetInventoryItems";

                var MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { sbInputXml, outXml, deviceTokenEntry };

                var statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "ERPGetLocationDetails getting failed from ERP")); }
                    return new Tuple<long, string>(statusCode, string.Empty);
                }
                outXml = args[1].ToString();

                return new Tuple<long, string>(statusCode, outXml);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }

                return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, string.Empty);
            }
        }
        private Tuple<long, DataSet> UpdateLotSerFlags(string bUnit, string cartID, DataSet locDetails, string cartItemFlag)
        {
            try
            {


                List<MT_ATPAR_ITEM_ATTRIBUTES> lstItemAttributes = _commonRepo.GetItemAttributes(bUnit, cartID);

                //List to DataSet Conversion

                DataSet dsitemAtt = new DataSet();
                DataTable dtitemAtt = lstItemAttributes.ToDataTable();//Utils.ToDataTable(lstItemAttributes);

                dsitemAtt.Tables.Add(dtitemAtt);


                foreach (DataRow AttItems in dsitemAtt.Tables[0].Rows)
                {
                    if (locDetails != null && locDetails.Tables.Count > 0)
                    {
                        if (cartItemFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                        {
                            dynamic UpdateLotSerFlagItems = from look in locDetails.Tables[1].AsEnumerable()
                                                            where look.Field<string>(AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID.ToString()) ==
                                                            AttItems["ITEM_ID"].ToString()
                                                            select look;

                            foreach (var item in UpdateLotSerFlagItems)
                            {
                                item[AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED.ToString()] =
                                    AttItems["LOT_CONTROLLED"].ToString();
                                item[AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED.ToString()] =
                                    AttItems["SERIAL_CONTROLLED"].ToString();

                            }
                        }
                        else
                        {
                            dynamic UpdateLotSerFlagItems = (from look in locDetails.Tables[0].AsEnumerable()
                                                             where look.Field<string>("ITEM_ID") == AttItems["ITEM_ID"].ToString()
                                                             select look);
                            foreach (var item in UpdateLotSerFlagItems)
                            {

                                item["LOT_CONTROLLED"] = AttItems["LOT_CONTROLLED"].ToString();
                                item["SERIALIZED"] = AttItems["SERIAL_CONTROLLED"].ToString();
                            }
                        }
                    }
                }
                locDetails.AcceptChanges();
                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, locDetails);
            }
            catch (Exception ex)
            {
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, locDetails);
            }
        }

        private Tuple<long, DataTable> PopulateCartItems(DataSet pDsItem, string pStrCartID, string pStrCartDescr, string pStrBunit,
            string pStrCartItemFlag, string pStrLocType, string[] pDeviceTokenEntry, DataSet pDsInventoryItems, bool pLotSerCntrld = false)
        {
            DataTable pTblItems = new DataTable();

            pTblItems = new DataTable("LOOKUPITEMS");
            pTblItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
            pTblItems.Columns.Add("ITEM_DESCRIPTION", Type.GetType("System.String"));
            pTblItems.Columns.Add("CUST_ITEM_NO", Type.GetType("System.String"));
            pTblItems.Columns.Add("MANF_ID", Type.GetType("System.String"));
            pTblItems.Columns.Add("QUANTITY_ON_HAND", Type.GetType("System.String"));
            pTblItems.Columns.Add("CART_ID", Type.GetType("System.String"));
            pTblItems.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
            pTblItems.Columns.Add("CART_DESCR", Type.GetType("System.String"));
            pTblItems.Columns.Add("COMPARTMENT", Type.GetType("System.String"));
            pTblItems.Columns.Add("LOTCONTROLLED", Type.GetType("System.String"));
            pTblItems.Columns.Add("SERIALIZED", Type.GetType("System.String"));
            pTblItems.Columns.Add("CONVERSION_RATE", Type.GetType("System.String"));

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                DataRow retRow;

                bool blnCustItemColumnExists = false;
                bool blnMItmIdColumnExists = false;
                bool blnSrCtrlColumnExists = false;
                bool blnLotCtrlColumnExists = false;
                string strItemID = string.Empty;
                string strMfgItemID = string.Empty;
                string strCustItemID = string.Empty;
                string strItemDescr = string.Empty;
                DataRow[] drInvItems = null;
                double dblQtyOnHand = 0;
                DataTable dtItems = new DataTable();
                StringBuilder sbSearch = new StringBuilder();
                string strCompartment = string.Empty;
                string strLotControlled = AtParWebEnums.YesNo_Enum.N.ToString();
                string strSerialControlled = AtParWebEnums.YesNo_Enum.N.ToString();

                if (pStrCartItemFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                {

                    blnCustItemColumnExists = (pDsItem.Tables[1].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID).ToString()) ? true : false);
                    blnMItmIdColumnExists = (pDsItem.Tables[1].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID).ToString()) ? true : false);
                    blnSrCtrlColumnExists = (pDsItem.Tables[1].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED).ToString()) ? true : false);
                    blnLotCtrlColumnExists = (pDsItem.Tables[1].Columns.Contains(((int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED).ToString()) ? true : false);


                    //If the dataset is built with ERP items then we need to filter the Details table in the dataset
                    dtItems = pDsItem.Tables[1].Copy();
                }
                else
                {
                    dtItems = pDsItem.Tables[0].Copy();
                }


                foreach (DataRow dr in dtItems.Rows)
                {
                    strItemID = string.Empty;
                    strMfgItemID = string.Empty;
                    strCustItemID = string.Empty;
                    strItemDescr = string.Empty;
                    strCompartment = string.Empty;
                    strLotControlled = string.Empty;
                    strSerialControlled = string.Empty;
                    dblQtyOnHand = 0;


                    if (pStrCartItemFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString()))
                        {
                            strItemID = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString();
                        }

                        if (blnMItmIdColumnExists)
                        {
                            if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID].ToString()))
                            {
                                strMfgItemID = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID].ToString();
                            }
                        }

                        if (blnCustItemColumnExists)
                        {
                            if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID].ToString()))
                            {
                                strCustItemID = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID].ToString();
                            }
                        }

                        if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString()))
                        {
                            strItemDescr = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString();
                        }

                        if (blnSrCtrlColumnExists)
                        {
                            if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED].ToString()))
                            {
                                strSerialControlled = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED].ToString();
                            }
                        }

                        if (blnLotCtrlColumnExists)
                        {
                            if (!string.IsNullOrEmpty(dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED].ToString()))
                            {
                                strLotControlled = dr[(int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED].ToString();
                            }
                        }


                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(dr["ITEM_ID"].ToString()))
                        {
                            strItemID = dr["ITEM_ID"].ToString();
                        }

                        if (!string.IsNullOrEmpty(dr["MANUFACTURE_ITEM_ID"].ToString()))
                        {
                            strMfgItemID = dr["MANUFACTURE_ITEM_ID"].ToString();
                        }

                        if (!string.IsNullOrEmpty(dr["CUST_ITEM_ID"].ToString()))
                        {
                            strCustItemID = dr["CUST_ITEM_ID"].ToString();
                        }
                        if (!string.IsNullOrEmpty(dr["ITEM_DESCRIPTION"].ToString()))
                        {
                            strItemDescr = dr["ITEM_DESCRIPTION"].ToString();
                        }

                        if (!string.IsNullOrEmpty(dr["LOT_CONTROLLED"].ToString()))
                        {
                            strLotControlled = dr["LOT_CONTROLLED"].ToString();
                        }

                        if (!string.IsNullOrEmpty(dr["SERIALIZED"].ToString()))
                        {
                            strSerialControlled = dr["SERIALIZED"].ToString();
                        }

                    }

                    if (pStrLocType == AtParWebEnums.LocationType.I.ToString())
                    {
                        var with1 = sbSearch;
                        with1.Remove(0, with1.Length);
                        with1.Append("[" + pDsItem.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.BUSINESS_UNIT].ColumnName + "] = ");
                        with1.Append("'" + pStrBunit + "' AND ");
                        with1.Append("[" + pDsItem.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.CART_ID].ColumnName + "] = ");
                        with1.Append("'" + pStrCartID + "' AND ");
                        with1.Append("[" + pDsItem.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.ITEM_ID].ColumnName + "] = ");
                        with1.Append("'" + strItemID + "'");

                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + ":Search string for items is : " + sbSearch.ToString());

                        drInvItems = pDsItem.Tables[0].Select(sbSearch.ToString());
                    }
                    else
                    {
                        var with2 = sbSearch;
                        with2.Remove(0, with2.Length);
                        with2.Append("BUSINESS_UNIT ='" + pStrBunit + "'");
                        with2.Append(" AND CART_ID='" + pStrCartID + "'");
                        with2.Append(" AND ITEM_ID = '" + strItemID + "'");

                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + ":Search string for items is : " + sbSearch.ToString());

                        if (pDsInventoryItems.Tables.Count > 0)
                        {
                            drInvItems = pDsInventoryItems.Tables[0].Select(sbSearch.ToString());
                        }
                    }


                    if (drInvItems.Length > 0)
                    {
                        dblQtyOnHand = 0;
                        for (int intcnt = 0; intcnt <= drInvItems.Length - 1; intcnt++)
                        {
                            if (pStrLocType == AtParWebEnums.LocationType.I.ToString())
                            {
                                dblQtyOnHand = dblQtyOnHand + Convert.ToDouble(drInvItems[intcnt][(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.SYSTEM_QTY]);
                                if (!strCompartment.Contains(drInvItems[intcnt][(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION].ToString()))
                                {
                                    strCompartment += ((strCompartment == string.Empty) ? drInvItems[intcnt][(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION] : ", " + drInvItems[intcnt][(int)AtParWebEnums.Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION].ToString());
                                }

                            }
                            else
                            {
                                dblQtyOnHand = dblQtyOnHand + Convert.ToDouble(drInvItems[intcnt]["QUANTITY_ON_HAND"]);
                                if (!strCompartment.Contains(drInvItems[intcnt]["COMPARTMENT"].ToString()))
                                {
                                    strCompartment += ((strCompartment == string.Empty) ? drInvItems[intcnt]["COMPARTMENT"] : ", " + drInvItems[intcnt]["COMPARTMENT"].ToString());
                                }

                            }
                        }
                        retRow = pTblItems.NewRow();
                        retRow["ITEM_ID"] = strItemID;
                        retRow["MANF_ID"] = strMfgItemID;
                        retRow["CUST_ITEM_NO"] = strCustItemID;
                        retRow["ITEM_DESCRIPTION"] = strItemDescr;
                        retRow["QUANTITY_ON_HAND"] = dblQtyOnHand;
                        retRow["CART_ID"] = pStrCartID;
                        retRow["BUSINESS_UNIT"] = pStrBunit;
                        if (string.IsNullOrEmpty(pStrCartDescr))
                        {
                            retRow["CART_DESCR"] = pStrCartID;
                        }
                        else
                        {
                            retRow["CART_DESCR"] = pStrCartDescr;
                        }
                        retRow["COMPARTMENT"] = strCompartment;

                        if (pLotSerCntrld == true)
                        {
                            retRow["LOTCONTROLLED"] = strLotControlled;
                            retRow["SERIALIZED"] = strSerialControlled;
                        }

                        pTblItems.Rows.Add(retRow);

                    }

                }
                return new Tuple<long, DataTable>(AtparStatusCodes.ATPAR_OK, pTblItems);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to generate a new row : Exception" + " is : " + ex.ToString());
                return new Tuple<long, DataTable>(AtparStatusCodes.E_SERVERERROR, null);

            }


        }

        #endregion

        #endregion

        #region SearchItem

        public AtParWebApiResponse<Dictionary<string, object>> SearchItem(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<Dictionary<string, object>>();
            try
            {
                Tuple<long, DataSet> tpl = GetUserDepartmentsItemsData(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID], deviceTokenEntry);

                response.StatusCode = tpl.Item1;
                DataSet dsSearchItems = tpl.Item2;
                List<VM_SEARCHITEM_DETAILS> lstSearchDetails = null;
                List<MT_ATPAR_GROUP_ORG_BUNITS> lstBUnits = null;
                List<MT_CRCT_USER_ALLOCATION_GROUPS> lstCarts = null;

                //Datset to list Conversion
                lstSearchDetails = (from rw in dsSearchItems.Tables[0].AsEnumerable()
                                    select new VM_SEARCHITEM_DETAILS()
                                    {
                                        CART_ID = rw["CART_ID"] == null ? string.Empty : rw["CART_ID"].ToString(),
                                        ITEMID = rw["ITEM_ID"] == null ? string.Empty : rw["ITEM_ID"].ToString(),
                                        ITEM_DESCR = rw["ITEM_DESCR"] == null ? string.Empty : rw["ITEM_DESCR"].ToString(),
                                        CUST_ITEM_ID = rw["CUST_ITEM_ID"] == null ? string.Empty : rw["CUST_ITEM_ID"].ToString(),
                                        UPCID = rw["UPC_ID"] == null ? string.Empty : rw["UPC_ID"].ToString(),
                                        VENDOR_ITEM_ID = rw["VNDR_ITEM_ID"] == null ? string.Empty : rw["VNDR_ITEM_ID"].ToString(),
                                        MFG_ITEM_ID = rw["MFG_ITEM_ID"] == null ? string.Empty : rw["MFG_ITEM_ID"].ToString(),
                                        COMPARTMENT = rw["COMPARTMENT"] == null ? string.Empty : rw["COMPARTMENT"].ToString(),
                                        GTIN = rw["GTIN"] == null ? string.Empty : rw["GTIN"].ToString(),
                                        UOM = rw["UOM"] == null ? string.Empty : rw["UOM"].ToString(),
                                        ISSUE_UOM = rw["ISSUE_UOM"] == null ? string.Empty : rw["ISSUE_UOM"].ToString(),
                                        PAR_UOM = rw["PAR_UOM"] == null ? string.Empty : rw["PAR_UOM"].ToString()

                                    }).ToList();

                lstCarts = (from rw in dsSearchItems.Tables[1].AsEnumerable()
                            select new MT_CRCT_USER_ALLOCATION_GROUPS()
                            {
                                CART_ID = rw["CART_ID"] == null ? string.Empty : rw["CART_ID"].ToString(),
                            }).ToList();
                lstBUnits = (from rw in dsSearchItems.Tables[2].AsEnumerable()
                             select new MT_ATPAR_GROUP_ORG_BUNITS()
                             {
                                 BUSINESS_UNIT = rw["BUSINESS_UNIT"] == null ? string.Empty : rw["BUSINESS_UNIT"].ToString(),
                             }).ToList();

                response.DataDictionary = new Dictionary<string, object> { { "lstSearchDetails", lstSearchDetails }, { "lstCarts", lstCarts }, { "lstBUnits", lstBUnits } };
                //need to know the list type
                // response.DataList =;

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }
        }

        public Tuple<long, DataSet> GetUserDepartmentsItemsData(string userID, string[] deviceTokenEntry, int appID = 15)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSearch = new StringBuilder();
            Tuple<long, DataSet> tupl = null;
            long Statuscode = -1;
            DataSet detDs = new DataSet();
            string profileID = string.Empty;
            string orgGrpID = string.Empty;
            string systemID = string.Empty;

            try
            {

                profileID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID];
                orgGrpID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID];
                systemID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId];

                List<MT_POU_DEPT_USER_ALLOCATIONS> depts = _manageCasesRepository.GetDepartmentID(userID);

                //Converting list to Dataset
                DataSet userDeptsDS = new DataSet();
                DataTable itemAttributesDt = new DataTable();
                itemAttributesDt = depts.ToDataTable();
                userDeptsDS.Tables.Add(itemAttributesDt);

                if (depts != null && depts.Count > 0)
                {
                    for (int i = 0; i <= userDeptsDS.Tables[0].Rows.Count - 1; i++)
                    {
                        sbSearch.Append("DEPARTMENT_ID = '" + userDeptsDS.Tables[0].Rows[i]["DEPARTMENT_ID"] + "' OR ");
                    }

                    if (sbSearch.Length > 0)
                    {
                        sbSearch.Remove(sbSearch.Length - 3, 3);
                    }

                }
                else
                {
                    sbSearch.Append("DEPARTMENT_ID=''");
                }

                List<VM_MT_POU_DEPT_CARTS> allocatedCarts = _commonPOURepo.GetAllocatedCarts("", "", appID);

                DataRow[] selRows = null;

                //Converting list to Dataset
                DataSet allocatedCartsDS = new DataSet();
                DataTable itemAttributesDt1 = new DataTable();
                itemAttributesDt1 = allocatedCarts.ToDataTable();
                allocatedCartsDS.Tables.Add(itemAttributesDt1);

                selRows = allocatedCartsDS.Tables[0].Select(sbSearch.ToString());
                DataSet allocDS = new DataSet();
                DataTable selCartsTbl = allocatedCartsDS.Tables[0].Clone();

                foreach (DataRow row in selRows)
                {
                    selCartsTbl.ImportRow(row);
                }
                selCartsTbl.AcceptChanges();
                allocDS.Tables.Add(selCartsTbl);

                int totalAllocations = allocDS.Tables[0].Rows.Count;

                DataSet retDS = new DataSet();
                DataTable retTbl = new DataTable();
                DataRow retRow = null;

                retTbl = new DataTable("DEPARTMENT_CART_ITEMS");
                retTbl.Columns.Add("CART_ID", Type.GetType("System.String"));
                retTbl.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                retTbl.Columns.Add("ITEM_DESCR", Type.GetType("System.String"));
                retTbl.Columns.Add("CUST_ITEM_ID", Type.GetType("System.String"));
                retTbl.Columns.Add("UPC_ID", Type.GetType("System.String"));
                retTbl.Columns.Add("VNDR_ITEM_ID", Type.GetType("System.String"));
                retTbl.Columns.Add("MFG_ITEM_ID", Type.GetType("System.String"));
                retTbl.Columns.Add("COMPARTMENT", Type.GetType("System.String"));
                retTbl.Columns.Add("GTIN", Type.GetType("System.String"));
                retTbl.Columns.Add("UOM", Type.GetType("System.String"));
                retTbl.Columns.Add("ISSUE_UOM", Type.GetType("System.String"));
                retTbl.Columns.Add("PAR_UOM", Type.GetType("System.String"));

                DataTable deptCartsTbl = new DataTable();
                DataRow deptCartRow = null;
                deptCartsTbl = new DataTable("DEPARTMENT_CARTS");
                deptCartsTbl.Columns.Add("CART_ID", Type.GetType("System.String"));


                DataTable deptBusinessUnitTbl = new DataTable();
                DataRow deptBURow = null;
                deptBusinessUnitTbl = new DataTable("DEPARTMENT_BUSINESSUNIT");
                deptBusinessUnitTbl.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));

                if (totalAllocations > 0)
                {
                    bool isSameCart = false;
                    bool isSameBU = false;
                    string cartName = string.Empty;
                    string businessUnit = string.Empty;
                    string locationType = string.Empty;

                    for (int cartCntr = 0; cartCntr <= totalAllocations - 1; cartCntr++)
                    {

                        if (cartName == allocDS.Tables[0].Rows[cartCntr]["CART_ID"].ToString())
                        {
                            isSameCart = true;
                            cartName = allocDS.Tables[0].Rows[cartCntr]["CART_ID"].ToString();
                        }
                        else
                        {
                            isSameCart = false;
                            cartName = allocDS.Tables[0].Rows[cartCntr]["CART_ID"].ToString();
                        }

                        if (businessUnit == allocDS.Tables[0].Rows[cartCntr]["BUSINESS_UNIT"].ToString())
                        {
                            isSameBU = true;
                            businessUnit = allocDS.Tables[0].Rows[cartCntr]["BUSINESS_UNIT"].ToString();
                        }
                        else
                        {
                            isSameBU = false;
                            businessUnit = allocDS.Tables[0].Rows[cartCntr]["BUSINESS_UNIT"].ToString();
                        }

                        locationType = allocDS.Tables[0].Rows[cartCntr]["LOCATION_TYPE"].ToString();

                        if (isSameCart == false)
                        {
                            deptCartRow = deptCartsTbl.NewRow();
                            deptCartRow["CART_ID"] = cartName;
                            deptCartsTbl.Rows.Add(deptCartRow);
                            deptCartsTbl.AcceptChanges();
                        }

                        if (isSameBU == false)
                        {
                            deptBURow = deptBusinessUnitTbl.NewRow();
                            deptBURow["BUSINESS_UNIT"] = businessUnit;
                            deptBusinessUnitTbl.Rows.Add(deptBURow);
                            deptBusinessUnitTbl.AcceptChanges();
                        }



                        var tupleResult = _GetCartDetails(cartName, businessUnit, detDs, orgGrpID,
                                                 systemID, deviceTokenEntry,
                                                 profileID, locationType, null, "", appID);


                        Statuscode = tupleResult.Item1;

                        if (Statuscode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (Statuscode == AtparStatusCodes.E_NORECORDFOUND)
                            {
                                detDs = tupleResult.Item2;
                                tupl = new Tuple<long, DataSet>(Statuscode, detDs);
                                return tupl;

                            }
                            else
                            {
                                tupl = new Tuple<long, DataSet>(Statuscode, null);
                                return tupl;
                            }

                        }
                        detDs = tupleResult.Item2;
                        if (detDs.Tables.Count > 0)
                        {
                            for (int z = 0; z <= detDs.Tables[1].Rows.Count - 1; z++)
                            {
                                retRow = retTbl.NewRow();
                                retRow["CART_ID"] = cartName;

                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] != null)
                                {
                                    retRow["ITEM_ID"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString().Trim();
                                }
                                else
                                {
                                    retRow["ITEM_ID"] = string.Empty;
                                }

                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR] != null)
                                {
                                    retRow["ITEM_DESCR"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString().Trim();
                                }
                                else
                                {
                                    retRow["ITEM_DESCR"] = string.Empty;
                                }

                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID] != null)
                                {
                                    retRow["CUST_ITEM_ID"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID].ToString().Trim();
                                }
                                else
                                {
                                    retRow["CUST_ITEM_ID"] = string.Empty;
                                }

                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.UPN_ID] != null)
                                {
                                    retRow["UPC_ID"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.UPN_ID].ToString().Trim();
                                }
                                else
                                {
                                    retRow["UPC_ID"] = string.Empty;
                                }

                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ITEM_ID] != null)
                                {
                                    retRow["VNDR_ITEM_ID"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ITEM_ID].ToString().Trim();
                                }
                                else
                                {
                                    retRow["VNDR_ITEM_ID"] = string.Empty;
                                }

                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID] != null)
                                {
                                    retRow["MFG_ITEM_ID"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID].ToString().Trim();
                                }
                                else
                                {
                                    retRow["MFG_ITEM_ID"] = string.Empty;
                                }

                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT] != null)
                                {
                                    retRow["COMPARTMENT"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ToString().Trim();
                                }
                                else
                                {
                                    retRow["COMPARTMENT"] = string.Empty;
                                }

                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_NDC] != null)
                                {
                                    retRow["GTIN"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_NDC].ToString().Trim();
                                }
                                else
                                {
                                    retRow["GTIN"] = string.Empty;
                                }

                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM] != null)
                                {
                                    retRow["UOM"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString().Trim();
                                }
                                else
                                {
                                    retRow["UOM"] = string.Empty;
                                }

                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM] != null)
                                {
                                    retRow["PAR_UOM"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM].ToString().Trim();
                                }
                                else
                                {
                                    retRow["PAR_UOM"] = string.Empty;
                                }
                                if (detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ISSUE_UOM] != null)
                                {
                                    retRow["ISSUE_UOM"] = detDs.Tables[1].Rows[z][(int)AtParWebEnums.Get_Cart_Detail_Enum.ISSUE_UOM].ToString().Trim();
                                }
                                else
                                {
                                    retRow["ISSUE_UOM"] = string.Empty;
                                }
                                retTbl.Rows.Add(retRow);

                            }
                        }

                        List<MT_POU_NONCART_ITEMS> lstNonCarts = null;
                        Tuple<long, List<MT_POU_NONCART_ITEMS>> tpl = _manageCasesRepository.GetNonCartItems(businessUnit, cartName);

                        Statuscode = tpl.Item1;
                        lstNonCarts = tpl.Item2;

                        //Converting list to Dataset
                        DataSet nonCartItemsDS = new DataSet();
                        DataTable itemAttributesDt2 = new DataTable();
                        itemAttributesDt1 = depts.ToDataTable();
                        itemAttributesDt2 = lstNonCarts.ToDataTable();
                        nonCartItemsDS.Tables.Add(itemAttributesDt2);

                        if (Statuscode != AtparStatusCodes.ATPAR_OK)
                        {
                            tupl = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, detDs);
                            return tupl;
                        }

                        for (int j = 0; j <= nonCartItemsDS.Tables[0].Rows.Count - 1; j++)
                        {
                            retRow = retTbl.NewRow();
                            retRow["CART_ID"] = nonCartItemsDS.Tables[0].Rows[j]["CART_ID"];

                            if (nonCartItemsDS.Tables[0].Rows[j]["ITEM_ID"] != null)
                            {
                                retRow["ITEM_ID"] = nonCartItemsDS.Tables[0].Rows[j]["ITEM_ID"].ToString().Trim();
                            }
                            else
                            {
                                retRow["UOM"] = string.Empty;
                            }

                            if (nonCartItemsDS.Tables[0].Rows[j]["ITEM_DESCRIPTION"] != null)
                            {
                                retRow["ITEM_DESCR"] = nonCartItemsDS.Tables[0].Rows[j]["ITEM_DESCRIPTION"].ToString().Trim();
                            }
                            else
                            {
                                retRow["ITEM_DESCR"] = string.Empty;
                            }

                            if (nonCartItemsDS.Tables[0].Rows[j]["CUST_ITEM_ID"] != null)
                            {
                                retRow["CUST_ITEM_ID"] = nonCartItemsDS.Tables[0].Rows[j]["CUST_ITEM_ID"].ToString().Trim();
                            }
                            else
                            {
                                retRow["CUST_ITEM_ID"] = string.Empty;
                            }

                            if (nonCartItemsDS.Tables[0].Rows[j]["UPC_ID"] != null)
                            {
                                retRow["UPC_ID"] = nonCartItemsDS.Tables[0].Rows[j]["UPC_ID"].ToString().Trim();
                            }
                            else
                            {
                                retRow["UPC_ID"] = string.Empty;
                            }

                            if (nonCartItemsDS.Tables[0].Rows[j]["VENDOR_ITEM_ID"] != null)
                            {
                                retRow["VNDR_ITEM_ID"] = nonCartItemsDS.Tables[0].Rows[j]["VENDOR_ITEM_ID"].ToString().Trim();
                            }
                            else
                            {
                                retRow["VNDR_ITEM_ID"] = string.Empty;
                            }

                            if (nonCartItemsDS.Tables[0].Rows[j]["MANUFACTURE_ITEM_ID"] != null)
                            {
                                retRow["MFG_ITEM_ID"] = nonCartItemsDS.Tables[0].Rows[j]["MANUFACTURE_ITEM_ID"].ToString().Trim();
                            }
                            else
                            {
                                retRow["MFG_ITEM_ID"] = string.Empty;
                            }

                            if (nonCartItemsDS.Tables[0].Rows[j]["COMPARTMENT"] != null)
                            {
                                retRow["COMPARTMENT"] = nonCartItemsDS.Tables[0].Rows[j]["COMPARTMENT"].ToString().Trim();
                            }
                            else
                            {
                                retRow["COMPARTMENT"] = string.Empty;
                            }

                            if (nonCartItemsDS.Tables[0].Rows[j]["UOM"] != null)
                            {
                                retRow["UOM"] = nonCartItemsDS.Tables[0].Rows[j]["UOM"].ToString().Trim();
                            }
                            else
                            {
                                retRow["UOM"] = string.Empty;
                            }

                            if (nonCartItemsDS.Tables[0].Rows[j]["ISSUE_UOM"] != null)
                            {
                                retRow["ISSUE_UOM"] = nonCartItemsDS.Tables[0].Rows[j]["ISSUE_UOM"].ToString().Trim();
                            }
                            else
                            {
                                retRow["ISSUE_UOM"] = string.Empty;
                            }

                            retRow["GTIN"] = string.Empty;
                            retTbl.Rows.Add(retRow);


                        }
                    }


                }
                else
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + "No Carts allocated to this Department" + System.Environment.NewLine);
                }

                retDS.Tables.Add(retTbl);
                retDS.Tables.Add(deptCartsTbl);
                retDS.Tables.Add(deptBusinessUnitTbl);

                tupl = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, retDS);
                return tupl;

            }
            catch (Exception ex)
            {
                tupl = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupl;
            }
        }
        #endregion

        #region SaveReviewCaseItems
        public AtParWebApiResponse<long> SaveReviewCaseItems(List<MT_POU_CASE_CART_DETAILS> cartDetails)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            try
            {
                response.StatusCode = _manageCasesRepository.SaveReviewCaseItems(cartDetails);
                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
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

        #region GetCaseItems
        public AtParWebApiResponse<Dictionary<string, object>> GetCaseItems(string caseID, int previewType, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<Dictionary<string, object>>();
            try
            {
                response.DataDictionary = _manageCasesRepository.GetCaseItems(caseID, previewType);
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

        #region ReplacePrefCard
        public AtParWebApiResponse<long> ReplacePrefCard(List<VM_MT_POU_CASE_INFO> lstCaseInfo, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            DataSet dsReplaceCasesInfo = new DataSet();
            try
            {
                response.StatusCode = _manageCasesRepository.VerifyReviewerdata(lstCaseInfo, true);



                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }
                if (lstCaseInfo[0].STATUS == AtParWebEnums.CASE_PICK_STATUS.READY.ToString())
                {
                    response.StatusCode = _manageCasesRepository.ReplacePrefCard(lstCaseInfo);

                    if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                        return response;
                    }
                }

                if (lstCaseInfo[0].STATUS == AtParWebEnums.CASE_PICK_STATUS.PICKED.ToString() || lstCaseInfo[0].STATUS == "PARTIALLY PICKED" ||
                    lstCaseInfo[0].STATUS == AtParWebEnums.CASE_PICK_STATUS.REVIEWED.ToString() || lstCaseInfo[0].STATUS == AtParWebEnums.CASE_PICK_STATUS.CASEISSUED.ToString())
                {
                    Tuple<long, List<VM_POU_CHECK_CART_ALLOCATION>, List<MT_POU_CHARGECAPTURE_DETAILS>> tpl = _manageCasesRepository.BuildCancelCases(lstCaseInfo[0].CASE_ID, lstCaseInfo[0].PROCEDURE_CODE, lstCaseInfo[0].PREF_LIST_ID,
                                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

                    response.StatusCode = tpl.Item1;


                    if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                        return response;
                    }

                    List<VM_POU_CHECK_CART_ALLOCATION> lstpoucheck = tpl.Item2;
                    List<MT_POU_CHARGECAPTURE_DETAILS> lstpoucharge = tpl.Item3;


                    DataTable dt = new DataTable();
                    dt = lstpoucheck.ToDataTable();
                    DataTable dt1 = new DataTable();
                    dt1 = lstpoucharge.ToDataTable();

                    dsReplaceCasesInfo.Tables.Add(dt);
                    dsReplaceCasesInfo.Tables.Add(dt1);

                    
                }

                else if (lstCaseInfo[0].STATUS == AtParWebEnums.CASE_PICK_STATUS.READY.ToString() || lstCaseInfo[0].STATUS == AtParWebEnums.CASE_PICK_STATUS.OPEN.ToString())
                {
                    int ret = _manageCasesRepository.ReplacePrefCardSP(lstCaseInfo[0].CASE_ID, lstCaseInfo[0].PROCEDURE_CODE,
                          lstCaseInfo[0].PREF_LIST_ID, lstCaseInfo[0].NEW_PREF_LIST_ID, lstCaseInfo[0].NEW_PROCEDURE_CODE,
                          AtParWebEnums.YesNo_Enum.N.ToString());

                    if (ret == 1)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " : Failed to execute storedprocedure ReplacePrefCard.");
                        response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL, _commonRepo, _log);
                        return response;
                    }
                    else if (ret == 1102020)
                    {
                        response.AtParNotOK(AtparStatusCodes.S_POU_CASE_PREF_ALREADY_EXISTS, _commonRepo, _log);
                        return response;
                    }
                }

                if (dsReplaceCasesInfo.Tables.Count > 0)
                {
                    if (dsReplaceCasesInfo.Tables[0].Rows.Count > 0)
                    {
                        //converting list to dataset
                        //DataSet dsReplaceCasesInfo = new DataSet();
                        //DataTable dt = new DataTable();
                        //dt = lstCaseInfo.ToDataTable();
                        //dsReplaceCasesInfo.Tables.Add(dt);

                        response.StatusCode = Do_CancelCases(dsReplaceCasesInfo, deviceTokenEntry,AtParWebEnums.YesNo_Enum.Y.ToString(),
                            lstCaseInfo[0].NEW_PREF_LIST_ID, lstCaseInfo[0].NEW_PROCEDURE_CODE);

                        if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                            return response;
                        }
                    }

                }

                response.StatusCode = _manageCasesRepository.InsertCaseTrackHistory(lstCaseInfo[0].CASE_ID, lstCaseInfo[0].PREF_LIST_ID, lstCaseInfo[0].PROCEDURE_CODE,
                               deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID],
                               deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeptID], (int)AtParWebEnums.CASE_PICK_STATUS.PREF_REPLACED,
                               deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID], true);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
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
    }
}
