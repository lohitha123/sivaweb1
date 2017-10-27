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
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;

namespace AtPar.POU.Service
{
    public class TransactionHistoryReportService : ITransactionHistoryReportService
    {
        private ILog _log;
        private ITransactionHistoryReportRepository _repo;
        private ICommonPOURepository _commonPOURepo;
        private ICommonPOUService _commonPOUService;
        private IManageCasesService _manageCasesService;
        private ICommonRepository _commonRepo;
        List<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS> lstCartHeaders = new List<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS>();
        private IDeptLocWrkStationAllocationRepository _repo1;
        public TransactionHistoryReportService(ILog log, ITransactionHistoryReportRepository repo,
            ICommonPOURepository commonPOURepo, ICommonPOUService commonPOUService, 
            IManageCasesService manageCasesService, ICommonRepository commonRepo, IDeptLocWrkStationAllocationRepository repo1)
        {
            _log = log;
            _repo = repo;
            _repo1 = repo1;
            _commonPOURepo = commonPOURepo;
            _commonPOUService = commonPOUService;
            _manageCasesService = manageCasesService;
            _commonRepo = commonRepo;
        }

        public AtParWebApiResponse<long> GetInventoryTrackHistoryReport(string startDate, string endDate,
            string bUnit, string parLoc, string itemID, string orgID, bool negInventory
            , int appID, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();
            if (parLoc == null) parLoc = string.Empty;
            if (itemID == null) itemID = string.Empty;

            DataSet dsCartDetails = null;
            DataSet _dsNonCartItemDetails = null;
            DataSet _dsItemDetails = null;
            long statusCode = -1;
            string pLocType = "";
            DataSet pTransDS = new DataSet();//output
            var response = new AtParWebApiResponse<long>();            
            DataTable dtHedTbl = new DataTable();
            DataRow[] deSelrows;
            DataTable dtHeaders = new DataTable();
            DataTable dtDetails = new DataTable();


            try
            {

                dtHeaders.TableName = "Headers";
                dtHeaders.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                dtHeaders.Columns.Add("ITEM_DESCR", Type.GetType("System.String"));
                dtHeaders.Columns.Add("CUST_ITEM_ID", Type.GetType("System.String"));
                dtHeaders.Columns.Add("UPC_ID", Type.GetType("System.String"));
                dtHeaders.Columns.Add("VNDR_ITEM_ID", Type.GetType("System.String"));
                dtHeaders.Columns.Add("MFG_ITEM_ID", Type.GetType("System.String"));
                dtHeaders.Columns.Add("QOH", Type.GetType("System.Double"));
                dtHeaders.Columns.Add("CART_ID", Type.GetType("System.String"));
                dtHeaders.Columns.Add("COMPARTMENT", Type.GetType("System.String"));
                dtHeaders.Columns.Add("PAR_UOM", Type.GetType("System.String"));

                dtDetails.TableName = "Details";
                dtDetails.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                dtDetails.Columns.Add("COMPARTMENT", Type.GetType("System.String"));
                dtDetails.Columns.Add("CART_ID", Type.GetType("System.String"));
                dtDetails.Columns.Add("UPDATE_DATE", Type.GetType("System.DateTime"));
                dtDetails.Columns.Add("EVENT_TYPE_DATA", Type.GetType("System.String"));
                dtDetails.Columns.Add("QTY_ISSUED", Type.GetType("System.String"));
                dtDetails.Columns.Add("QTY_RETPUTAWAY", Type.GetType("System.String"));
                dtDetails.Columns.Add("QTY_ADJUSTED", Type.GetType("System.String"));
                dtDetails.Columns.Add("ON_HAND_QTY", Type.GetType("System.String"));
                dtDetails.Columns.Add("DOWNLOAD_USERID", Type.GetType("System.String")); 
                dtDetails.Columns.Add("REASON_CODE", Type.GetType("System.String"));
                dtDetails.Columns.Add("ISSUE_UOM", Type.GetType("System.String"));
                // pTransDS = m_LocalDB.ExecuteDataSet(_Cmd);
                var tupleResult = _repo.GetProductivityReport(startDate, endDate, bUnit, parLoc, itemID, orgID, negInventory);
                pTransDS = tupleResult.Item1;
            }
            catch (SqlException sqlex)
            {

                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " : Failed to execute the following :" + " Exception is : " + sqlex.ToString() + Environment.NewLine);
                }             
                response.AtParNotOK(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, _commonRepo, _log);
                return response;
                
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " : Failed to execute the following :" + " Exception is : " + ex.ToString() + Environment.NewLine);
                }             
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
            finally
            {
                sbSQL.Remove(0, sbSQL.Length);
            }


            //Getting Cart details

            DataColumn newcol1 = new DataColumn("CUST_ITEM_ID", Type.GetType("System.String"));
            DataColumn newcol2 = new DataColumn("UPC_ID", Type.GetType("System.String"));
            DataColumn newcol3 = new DataColumn("VNDR_ITEM_ID", Type.GetType("System.String"));
            DataColumn newcol4 = new DataColumn("MFG_ITEM_ID", Type.GetType("System.String"));
            DataColumn newcol5 = new DataColumn("ITEM_DESCR", Type.GetType("System.String"));
            DataColumn newcol6 = new DataColumn("EVENT_TYPE_DATA", Type.GetType("System.String"));
            DataColumn newcol7 = new DataColumn("PAR_UOM", Type.GetType("System.String"));
            DataColumn newcol8 = new DataColumn("ISSUE_UOM", Type.GetType("System.String"));
            pTransDS.Tables[0].Columns.Add(newcol1);
            pTransDS.Tables[0].Columns.Add(newcol2);
            pTransDS.Tables[0].Columns.Add(newcol3);
            pTransDS.Tables[0].Columns.Add(newcol4);
            pTransDS.Tables[0].Columns.Add(newcol5);
            pTransDS.Tables[0].Columns.Add(newcol6);
            pTransDS.Tables[0].Columns.Add(newcol7);
            pTransDS.Tables[0].Columns.Add(newcol8);

            if (!string.IsNullOrEmpty(parLoc))
            {
                try
                {
                    var tupleResult = _commonPOUService.GetCartDetails(parLoc, bUnit, dsCartDetails, orgID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), string.Empty, string.Empty, null, "", appID);
                    dsCartDetails = tupleResult.Item2;
                    statusCode = tupleResult.Item1;

                    if (statusCode == AtparStatusCodes.E_NORECORDFOUND)
                    {
                        statusCode = 0;                        
                    }

                  else  if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to get the cart item" + " details for the cart :" + " StatusCode is : " + statusCode + Environment.NewLine);
                        }
                       
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                        return response;
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to get the cart item" + " details for the cart :" + " Exception is : " + ex.ToString() + Environment.NewLine);
                    }
                   
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;
                }

                try
                {

                    var lstNonCartItems = _commonPOURepo.GetNonCartItems(bUnit, parLoc);
                    _dsNonCartItemDetails = lstNonCartItems.ToDataSet();

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to get the non cart item" + " details for the cart :" + " Exception is : " + ex.ToString() + Environment.NewLine);
                    }
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                    return response;
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(itemID))
                {
                    try
                    {
                        var tupleResult = _manageCasesService.GetUserDepartmentsItemsData(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID],
                              deviceTokenEntry, appID);
                        _dsItemDetails = tupleResult.Item2;
                        statusCode = tupleResult.Item1;

                        if (statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (statusCode == AtparStatusCodes.E_NORECORDFOUND)
                            {
                               
                                response.AtParNotOK(statusCode, _commonRepo, _log);
                                return response;
                            }
                            else
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal(methodBaseName + " Failed to get the item" + " details for the cart :" + " StatusCode is : " + statusCode + Environment.NewLine);
                                }
                              
                                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                return response;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to get the item" + " details for the cart :" + " Exception is : " + ex.ToString() + Environment.NewLine);
                        }
                        
                        response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                        return response;
                    }
                }
            }
            if (string.IsNullOrEmpty(pLocType))
            {               
                pLocType = _commonPOURepo.GetLocationType(bUnit, parLoc);

            }
            if (pTransDS.Tables.Count > 0)
            {
                //INSTANT C# NOTE: Commented this declaration since looping variables in 'foreach' loops are declared in the 'foreach' header in C#:
                //				DataRow retRow = null;
                foreach (DataRow retRow in pTransDS.Tables[0].Rows)
                {
                    DataRow[] _drItems = null;
                    if (dsCartDetails != null)
                    {
                        if (dsCartDetails.Tables.Count > 0)
                        {
                            //_drItems = dsCartDetails.Tables["Details"].Select("[" & AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID & "] = '" & retRow("ITEM_ID").ToString & "' ")
                            if (dsCartDetails.Tables["Details"].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType.ToString() == "System.String")
                            {
                                _drItems = dsCartDetails.Tables["Details"].Select("[" + (int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID + "] = '" + retRow["ITEM_ID"].ToString() + "' ");
                            }
                            else
                            {
                                if (NumericHelper.IsNumeric(retRow["ITEM_ID"]))
                                {
                                    _drItems = dsCartDetails.Tables["Details"].Select("[" + (int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID + "] = " + retRow["ITEM_ID"].ToString() + " ");
                                }
                                else
                                {
                                    _drItems = dsCartDetails.Tables["Details"].Select("0=-1");
                                }
                            }
                        }
                        if (_drItems.Length > 0)
                        {
                            if (!Convert.IsDBNull(_drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID]))
                            {
                                retRow["CUST_ITEM_ID"] = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID].ToString();
                            }
                            else
                            {
                                retRow["CUST_ITEM_ID"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UPN_ID]))
                            {
                                retRow["UPC_ID"] = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UPN_ID].ToString();
                            }
                            else
                            {
                                retRow["UPC_ID"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ITEM_ID]))
                            {
                                retRow["VNDR_ITEM_ID"] = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ITEM_ID].ToString();
                            }
                            else
                            {
                                retRow["VNDR_ITEM_ID"] = string.Empty;
                            }

                            if (!Convert.IsDBNull(_drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID]))
                            {
                                retRow["MFG_ITEM_ID"] = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID].ToString();
                            }
                            else
                            {
                                retRow["MFG_ITEM_ID"] = string.Empty;
                            }

                            if (!Convert.IsDBNull(_drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR]))
                            {
                                retRow["ITEM_DESCR"] = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString();
                            }
                            else
                            {
                                retRow["ITEM_DESCR"] = string.Empty;
                            }
                            if (pLocType == AtParWebEnums.LocationType.A.ToString())
                            {
                                if (!Convert.IsDBNull(_drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM]))
                                {
                                    retRow["PAR_UOM"] = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_UOM].ToString();
                                }
                                else
                                {
                                    retRow["PAR_UOM"] = string.Empty;
                                }
                                if (string.IsNullOrEmpty(Convert.ToString(retRow["PAR_UOM"])))
                                {
                                    retRow["PAR_UOM"] = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString();
                                }

                                if (!Convert.IsDBNull(_drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM]))
                                {
                                    retRow["ISSUE_UOM"] = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString();
                                }
                                else
                                {
                                    retRow["ISSUE_UOM"] = string.Empty;
                                }
                            }
                            else
                            {
                                if (!Convert.IsDBNull(_drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM]))
                                {
                                    retRow["PAR_UOM"] = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ToString();
                                }
                                else
                                {
                                    retRow["PAR_UOM"] = string.Empty;
                                }

                                if (!Convert.IsDBNull(_drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ISSUE_UOM]))
                                {
                                    retRow["ISSUE_UOM"] = _drItems[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ISSUE_UOM].ToString();
                                }
                                else
                                {
                                    retRow["ISSUE_UOM"] = string.Empty;
                                }
                            }
                        }
                    }

                    if (_dsNonCartItemDetails != null)
                    {

                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug(methodBaseName + ": Details not found in Cart Items, looking in Non Cart Items. Items ID:" + retRow["ITEM_ID"].ToString());
                        }
                        if (_dsNonCartItemDetails.Tables.Count > 0)
                        {
                            //_drItems = _dsNonCartItemDetails.Tables[0].Select("ITEM_ID = '" & retRow("ITEM_ID").ToString & "' ")
                            _drItems = _dsNonCartItemDetails.Tables[0].Select("CART_ID = '" + retRow["CART_ID"].ToString() + "' AND ITEM_ID = '" + retRow["ITEM_ID"].ToString() + "' AND COMPARTMENT = '" + (retRow["COMPARTMENT"].ToString().substituteString()) + "' ");
                        }

                        if (_drItems.Length > 0)
                        {
                            if (!Convert.IsDBNull(_drItems[0]["CUST_ITEM_ID"]))
                            {
                                retRow["CUST_ITEM_ID"] = _drItems[0]["CUST_ITEM_ID"].ToString();
                            }
                            else
                            {
                                retRow["CUST_ITEM_ID"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0]["UPC_ID"]))
                            {
                                retRow["UPC_ID"] = _drItems[0]["UPC_ID"].ToString();
                            }
                            else
                            {
                                retRow["UPC_ID"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0]["VENDOR_ITEM_ID"]))
                            {
                                retRow["VNDR_ITEM_ID"] = _drItems[0]["VENDOR_ITEM_ID"].ToString();
                            }
                            else
                            {
                                retRow["VNDR_ITEM_ID"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0]["MANUFACTURE_ITEM_ID"]))
                            {
                                retRow["MFG_ITEM_ID"] = _drItems[0]["MANUFACTURE_ITEM_ID"].ToString();
                            }
                            else
                            {
                                retRow["MFG_ITEM_ID"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0]["ITEM_DESCRIPTION"]))
                            {
                                retRow["ITEM_DESCR"] = _drItems[0]["ITEM_DESCRIPTION"].ToString();
                            }
                            else
                            {
                                retRow["ITEM_DESCR"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0]["UOM"]))
                            {
                                retRow["PAR_UOM"] = _drItems[0]["UOM"].ToString();
                            }
                            else
                            {
                                retRow["PAR_UOM"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0]["ISSUE_UOM"]))
                            {
                                retRow["ISSUE_UOM"] = _drItems[0]["ISSUE_UOM"].ToString();
                            }
                            else
                            {
                                retRow["ISSUE_UOM"] = string.Empty;
                            }
                        }
                    }

                    if (_dsItemDetails != null)
                    {
                        if (_dsItemDetails.Tables.Count > 0)
                        {
                            _drItems = _dsItemDetails.Tables[0].Select("CART_ID = '" + retRow["CART_ID"].ToString() + "' AND ITEM_ID = '" + retRow["ITEM_ID"].ToString() + "' AND COMPARTMENT = '" + (retRow["COMPARTMENT"].ToString().substituteString()) + "' ");
                        }
                        if (_drItems.Length > 0)
                        {
                            if (!Convert.IsDBNull(_drItems[0]["CUST_ITEM_ID"]))
                            {
                                retRow["CUST_ITEM_ID"] = _drItems[0]["CUST_ITEM_ID"].ToString();
                            }
                            else
                            {
                                retRow["CUST_ITEM_ID"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0]["UPC_ID"]))
                            {
                                retRow["UPC_ID"] = _drItems[0]["UPC_ID"].ToString();
                            }
                            else
                            {
                                retRow["UPC_ID"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0]["VNDR_ITEM_ID"]))
                            {
                                retRow["VNDR_ITEM_ID"] = _drItems[0]["VNDR_ITEM_ID"].ToString();
                            }
                            else
                            {
                                retRow["VNDR_ITEM_ID"] = string.Empty;
                            }

                            if (!Convert.IsDBNull(_drItems[0]["MFG_ITEM_ID"]))
                            {
                                retRow["MFG_ITEM_ID"] = _drItems[0]["MFG_ITEM_ID"].ToString();
                            }
                            else
                            {
                                retRow["MFG_ITEM_ID"] = string.Empty;
                            }

                            if (!Convert.IsDBNull(_drItems[0]["ITEM_DESCR"]))
                            {
                                retRow["ITEM_DESCR"] = _drItems[0]["ITEM_DESCR"].ToString();
                            }
                            else
                            {
                                retRow["ITEM_DESCR"] = string.Empty;
                            }
                            if (!Convert.IsDBNull(_drItems[0]["PAR_UOM"]))
                            {
                                retRow["PAR_UOM"] = _drItems[0]["PAR_UOM"].ToString();
                            }
                            else
                            {
                                retRow["PAR_UOM"] = _drItems[0]["UOM"].ToString();
                            }

                            if (!Convert.IsDBNull(_drItems[0]["ISSUE_UOM"]))
                            {
                                retRow["ISSUE_UOM"] = _drItems[0]["UOM"].ToString();
                            }
                            else
                            {
                                retRow["ISSUE_UOM"] = string.Empty;
                            }
                        }
                    }

                    if (retRow["EVENT_TYPE"].ToString() ==((int)AtParWebEnums.INV_TRANS.CycleCount).ToString())
                    {
                        retRow["EVENT_TYPE_DATA"] = AtParWebEnums.INV_TRANS.CycleCount.ToString();
                    }
                    else if (retRow["EVENT_TYPE"].ToString() == ((int)AtParWebEnums.INV_TRANS.Issue).ToString())
                    {

                        retRow["EVENT_TYPE_DATA"] = AtParWebEnums.INV_TRANS.Issue.ToString();
                    }
                    else if (retRow["EVENT_TYPE"].ToString() == ((int)AtParWebEnums.INV_TRANS.Returned).ToString())
                    {

                        retRow["EVENT_TYPE_DATA"] = AtParWebEnums.INV_TRANS.Returned.ToString();
                    }
                    else if (retRow["EVENT_TYPE"].ToString() == ((int)AtParWebEnums.INV_TRANS.Putaway).ToString())
                    {

                        retRow["EVENT_TYPE_DATA"] = AtParWebEnums.INV_TRANS.Putaway.ToString();
                    }
                    else if (retRow["EVENT_TYPE"].ToString() == ((int)AtParWebEnums.INV_TRANS.CasePick).ToString())
                    {

                        retRow["EVENT_TYPE_DATA"] = AtParWebEnums.INV_TRANS.CasePick.ToString();
                    }
                    else if (retRow["EVENT_TYPE"].ToString() == ((int)AtParWebEnums.INV_TRANS.CaseIssued).ToString())
                    {

                        retRow["EVENT_TYPE_DATA"] = AtParWebEnums.INV_TRANS.CaseIssued.ToString();
                    }
                    else if (retRow["EVENT_TYPE"].ToString() == ((int)AtParWebEnums.INV_TRANS.RecordConsumption).ToString() || retRow["EVENT_TYPE"].ToString() == ((int)AtParWebEnums.INV_TRANS.ReConIssue).ToString())
                    {

                        retRow["EVENT_TYPE_DATA"] = AtParWebEnums.INV_TRANS.RecordConsumption.ToString();
                    }
                    else if (retRow["EVENT_TYPE"].ToString() == ((int)AtParWebEnums.INV_TRANS.CaseCancel).ToString())
                    {

                        retRow["EVENT_TYPE_DATA"] = AtParWebEnums.INV_TRANS.CaseCancel.ToString();
                    }
                    else if (retRow["EVENT_TYPE"].ToString() == ((int)AtParWebEnums.INV_TRANS.PrefReplaced).ToString())
                    {

                        retRow["EVENT_TYPE_DATA"] = AtParWebEnums.INV_TRANS.PrefReplaced.ToString();
                    }
                    else if (retRow["EVENT_TYPE"].ToString() == ((int)AtParWebEnums.INV_TRANS.Pick).ToString())
                    {

                        retRow["EVENT_TYPE_DATA"] = AtParWebEnums.INV_TRANS.Pick.ToString();
                    }

                    pTransDS.AcceptChanges();
                }
            }

            if(pTransDS!=null)
            {
                string _strCompartment = string.Empty;
                string str = string.Empty;
                DataView view = new DataView(pTransDS.Tables[0]);
                dtHedTbl = view.ToTable(true, "CART_ID", "ITEM_ID", "COMPARTMENT");
                    if(dtHedTbl.Rows.Count>0)
                {
                    for(int i=0;i<= dtHedTbl.Rows.Count-1;i++)
                    {
                        if((dtHedTbl.Rows[i]["COMPARTMENT"]==null )|| (dtHedTbl.Rows[i]["COMPARTMENT"]==DBNull.Value))
                        {
                            _strCompartment = string.Empty;
                        }
                        else
                            {
                            _strCompartment = dtHedTbl.Rows[i]["COMPARTMENT"].ToString().Replace("'", "''");
                        }
                        str = "CART_ID ='" + dtHedTbl.Rows[i]["CART_ID"] + "' AND ITEM_ID='" + dtHedTbl.Rows[i]["ITEM_ID"] + "' AND COMPARTMENT='" + _strCompartment + "'";
                        deSelrows = pTransDS.Tables[0].Select(str);
                        if (deSelrows.Length > 0)
                        {

                            for (int j = 0; j <= deSelrows.Length - 1; j++)
                            {
                                if (deSelrows[j]["ON_HAND_QTY"].ToString().Contains("."))
                                {
                                    //deSelrows(j)("ON_HAND_QTY") = FormatAtParNumber(deSelrows(j)("ON_HAND_QTY").ToString, 2)
                                    deSelrows[j]["ON_HAND_QTY"] = deSelrows[j]["ON_HAND_QTY"].ToString();
                                }
                                dtDetails.ImportRow(deSelrows[j]);
                            }
                            dtHeaders.ImportRow(deSelrows[0]);
                            if(dtHeaders.Rows[i]["QOH"].ToString().Contains("."))
                            {
                                dtHeaders.Rows[i]["QOH"] = dtHeaders.Rows[i]["QOH"].ToString();
                            }


                        }

                        
                    }
                }
                dtHeaders.TableName = "Headers";
                dtDetails.TableName = "Details";
                dtDetails.AcceptChanges();
                pTransDS.Tables.Clear();
                pTransDS.Tables.Add(dtHeaders);
                pTransDS.Tables.Add(dtDetails);
                pTransDS.AcceptChanges();

            }


            
            Dictionary<string,object> dictionaryResult = new Dictionary<string, object>() { { "pTransDS" , pTransDS } };
            response.DataDictionary = dictionaryResult;
            response.AtParSuccess();
            return response;
        }


        public AtParWebApiResponse<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS> GetDeptAllocCarts(string businessUnit, string cartId, int display, string locationType, int appId,string orgGrpId, string[] deviceTokenEntry)
        {
            DataSet dsCarts = new DataSet();


            var response = new AtParWebApiResponse<VM_MT_POU_DEPT_LOCATION_ALLOCATIONS>();

            try
            {
                var tupleResult = GetDeptAllocatedCartDetails(businessUnit, cartId, display, locationType, appId, orgGrpId, deviceTokenEntry);
                dsCarts = tupleResult.Item2;
                var statusCode = tupleResult.Item1;



                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }


                var lstDeptLocationAlloc = (from DataRow dr in dsCarts.Tables[0].Rows
                                            select new VM_MT_POU_DEPT_LOCATION_ALLOCATIONS()
                                            {
                                                ASSIGN_CART = dr["ASSIGN_CART"].ToString(),

                                                BUSINESS_UNIT = dr["BUSINESS_UNIT"].ToString(),
                                                LOCATION = dr["LOCATION"].ToString(),
                                                LOCATION_DESCR = dr["LOCATION_DESCR"].ToString(),
                                                DEPT_ID = dr["DEPT_ID"].ToString(),
                                                ACT_ASSIGN_CART = dr["ACT_ASSIGN_CART"].ToString(),

                                                LOCATION_TYPE = dr["LOCATION_TYPE"].ToString(),

                                            }).ToList();

                lstCartHeaders= lstDeptLocationAlloc;

                response.DataList = lstCartHeaders;
                

                if (response.DataList != null && response.DataList.Count > 0)
                {

                    response.AtParSuccess();
                }
                else
                {

                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                
                return response;

            }
            catch (Exception ex)
            {

                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        private Tuple<long, DataSet> GetDeptAllocatedCartDetails(string businessUnit, string cartID, int display, string locationType, int appId,string orgGrpId, string[] deviceTokenEntry)
        {
            StringBuilder sbSearch = new StringBuilder();
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet cartHeadersDS = new DataSet();

            var dtRet = new DataTable();
            dtRet.Columns.Add("ASSIGN_CART", Type.GetType("System.String"));
            dtRet.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION_DESCR", Type.GetType("System.String"));
            dtRet.Columns.Add("DEPT_ID", Type.GetType("System.String"));
            dtRet.Columns.Add("ACT_ASSIGN_CART", Type.GetType("System.String"));
            dtRet.Columns.Add("LOCATION_TYPE", Type.GetType("System.String"));

            var with1 = sbSearch;
            try
            {

                DataSet dsCartHeader;
                try
                {
                    var tupleResult = _commonPOUService.GetCart_Headers(orgGrpId, deviceTokenEntry, locationType);

                    dsCartHeader = tupleResult.Item2;
                    var statusCode = tupleResult.Item1;

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        return new Tuple<long, DataSet>(statusCode, null);
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                }

                with1.Remove(0, sbSearch.Length);

                if (!string.IsNullOrEmpty(businessUnit))
                {
                    with1.Append("[" + dsCartHeader.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ColumnName + "] = '" + businessUnit + "' ");
                }
                if (!string.IsNullOrEmpty(cartID))
                {
                    if (with1.Length > 0)
                    {
                        with1.Append(" AND ");
                    }
                    with1.Append("[" + dsCartHeader.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ColumnName + "] = '" + cartID + "' ");
                }

                var dvCartHeader = dsCartHeader.Tables[0].DefaultView;

                if (sbSearch.Length > 0)
                {
                    dvCartHeader.RowFilter = sbSearch.ToString();
                    sbSearch.Remove(0, sbSearch.Length);
                }

                if (dvCartHeader.ToTable().Rows.Count == 0)
                {
                    return new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, null);
                }

                DataSet dsAllocatedCarts = new DataSet();

                try
                {

                    List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstDeptCartWrkAllocations =
                        _repo1.GetDeptCartWrkAllocations(orgGrpId, appId);



                    dsAllocatedCarts = lstDeptCartWrkAllocations.ToDataSet();
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                }


                DataSet dsCartAlloc = new DataSet();

                try
                {

                    List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptCartAllocations =
                        _repo1.GetDeptCartAllocations(orgGrpId);



                    dsCartAlloc = lstDeptCartAllocations.ToDataSet();
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                }



                for (int intCnt = 0; intCnt <= dvCartHeader.ToTable().Rows.Count - 1; intCnt++)
                {
                    var retRow = dtRet.NewRow();

                    var strBu = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ToString();
                    var strLocation = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ToString();
                    var strLocType = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE].ToString();

                    retRow["BUSINESS_UNIT"] = strBu;
                    retRow["LOCATION"] = strLocation;
                    retRow["LOCATION_DESCR"] = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR].ToString();
                    retRow["LOCATION_TYPE"] = dvCartHeader.ToTable().Rows[intCnt][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.LOCATION_TYPE].ToString();

                    var rows = dsAllocatedCarts.Tables[0].Select("BUSINESS_UNIT = '" + strBu + "' AND CART_ID = '" + strLocation + "' AND LOCATION_TYPE = '" + strLocType + "'");


                    if (rows.Length > 0)
                    {
                        retRow["ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.Y.ToString();
                        retRow["ACT_ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.Y.ToString();
                        retRow["DEPT_ID"] = rows[0]["DEPARTMENT_ID"];

                    }
                    else
                    {
                        retRow["ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.N.ToString();
                        retRow["ACT_ASSIGN_CART"] = AtParWebEnums.YesNo_Enum.N.ToString();
                        retRow["DEPT_ID"] = "";

                    }
                    dtRet.Rows.Add(retRow);
                }

                var dvDisplay = dtRet.DefaultView;





                if (_log.IsDebugEnabled) { _log.Fatal(methodBaseName + "Display filter is (0 - All, 1 - Allocated, 2 - UnAllocated" + display); }


                DataSet dSDeptWks = new DataSet();

                try
                {

                    List<MT_POU_DEPT_WORKSTATIONS> lstDeptWrkStations =
                        _repo1.GetDeptWrkStations(orgGrpId);

                    dSDeptWks = lstDeptWrkStations.ToDataSet();
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                    return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
                }


                dvDisplay.Table.TableName = "CartHeaders";
                dsAllocatedCarts.Tables[0].TableName = "AllocatedCarts";
                dSDeptWks.Tables[0].TableName = "DeptWKS";



                DataTable dFilteredTable = new DataTable();

                dFilteredTable = dvDisplay.ToTable().Clone();




                var Filteredlist = (from x in dsCartAlloc.Tables[0].AsEnumerable()
                                    join z in dvDisplay.ToTable().AsEnumerable()

                                   on new { a = x.Field<string>("BUSINESS_UNIT"), b = x.Field<string>("CART_ID") }
                                   equals new { a = z.Field<string>("BUSINESS_UNIT"), b = z.Field<string>("LOCATION") }


                                    select new
                                    {
                                        ASSIGN_CART = z.Field<string>("ASSIGN_CART"),
                                        BUSINESS_UNIT = z.Field<string>("BUSINESS_UNIT"),
                                        LOCATION = z.Field<string>("LOCATION"),
                                        LOCATION_DESCR = z.Field<string>("LOCATION_DESCR"),
                                        DEPT_ID = x.Field<string>("DEPARTMENT_ID"),
                                        ACT_ASSIGN_CART = z.Field<string>("ACT_ASSIGN_CART"),
                                        LOCATION_TYPE = z.Field<string>("LOCATION_TYPE")


                                    }).ToList();



                foreach (var items in Filteredlist)
                {

                    dFilteredTable.Rows.Add(items.ASSIGN_CART, items.BUSINESS_UNIT, items.LOCATION, items.LOCATION_DESCR, items.DEPT_ID, items.ACT_ASSIGN_CART, items.LOCATION_TYPE);                   

                }


                DataView dvCartHeaders = new DataView();
                DataTable dtSortedTable = new DataTable();

                dvCartHeaders = dFilteredTable.DefaultView;


                dtSortedTable = dvCartHeaders.ToTable(true, "ASSIGN_CART", "BUSINESS_UNIT", "LOCATION", "LOCATION_DESCR", "DEPT_ID", "ACT_ASSIGN_CART", "LOCATION_TYPE");



                cartHeadersDS = new DataSet();
                cartHeadersDS.Tables.Add(dtSortedTable);

                cartHeadersDS.Tables.Add(dsAllocatedCarts.Tables["AllocatedCarts"].Copy());
                cartHeadersDS.Tables.Add(dSDeptWks.Tables["DeptWKS"].Copy());

                return new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, cartHeadersDS);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
        }


    }



    public static class NumericHelper
    {
        public static bool IsNumeric(object expression)
        {
            if (expression == null)
                return false;

            double testDouble;
            if (expression is string)
            {
                CultureInfo provider;
                if (((string)expression).StartsWith("$"))
                    provider = new CultureInfo("en-US");
                else
                    provider = CultureInfo.InvariantCulture;

                if (double.TryParse((string)expression, NumberStyles.Any, provider, out testDouble))
                    return true;
            }
            else
            {
                if (double.TryParse(expression.ToString(), out testDouble))
                    return true;
            }

            //VB's 'IsNumeric' returns true for any boolean value:
            bool testBool;
            if (bool.TryParse(expression.ToString(), out testBool))
                return true;

            return false;
        }

        public static double Val(string expression)
        {
            if (expression == null)
                return 0;

            //try the entire string, then progressively smaller substrings to replicate the behavior of VB's 'Val', which ignores trailing characters after a recognizable value:
            for (int size = expression.Length; size > 0; size--)
            {
                double testDouble;
                if (double.TryParse(expression.Substring(0, size), out testDouble))
                    return testDouble;
            }

            //no value is recognized, so return 0:
            return 0;
        }

        public static double Val(object expression)
        {
            if (expression == null)
                return 0;

            double testDouble;
            if (double.TryParse(expression.ToString(), out testDouble))
                return testDouble;

            //VB's 'Val' function returns -1 for 'true':
            bool testBool;
            if (bool.TryParse(expression.ToString(), out testBool))
                return testBool ? -1 : 0;

            //VB's 'Val' function returns the day of the month for dates:
            DateTime testDate;
            if (DateTime.TryParse(expression.ToString(), out testDate))
                return testDate.Day;

            //no value is recognized, so return 0:
            return 0;
        }

        public static int Val(char expression)
        {
            int testInt;
            if (int.TryParse(expression.ToString(), out testInt))
                return testInt;
            else
                return 0;
        }


    }
}


