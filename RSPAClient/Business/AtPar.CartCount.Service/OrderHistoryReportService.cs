using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.Service.Interfaces.CartCount;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Text;

namespace AtPar.CartCount.Service
{
    public class OrderHistoryReportService : IOrderHistoryReportService
    {
        ILog _log;
        private ICriticalItemsService _criticalItemsService;
        private ICreateOrdersRepository _createOrderRepo;
        private IOrderHistoryReportRepository _repo;
        private IGetDetailsService _getDetailService;

        public OrderHistoryReportService(ILog log, ICriticalItemsService criticalItemsService, ICreateOrdersRepository createOrderRepo, IOrderHistoryReportRepository repo, IGetDetailsService getDetailService)
        {
            _log = log;
            _criticalItemsService = criticalItemsService;
            _createOrderRepo = createOrderRepo;
            _repo = repo;
            _getDetailService = getDetailService;
        }

        public AtParWebApiResponse<string> GetOrderHistoryRep(string svrUser, string bUnit, string parLoc, string orgGroup, string profileID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQL = new StringBuilder();
            long _statusCode = 0;
            DataTable dtCartItemInfo = default(DataTable);
            CultureInfo dtCultureInfo = new CultureInfo("en-US");
            DataTable dtFillValues = new DataTable();
            int latestValuesCount = 0;
            DataSet dtCompRep = new DataSet();
            // DataSet dtFillValuesDataSet = new DataSet();
            DataColumn dcCheckValue = new DataColumn();
            DataColumn dcCheckField = new DataColumn();
            DataTable dtCartItemInfo1 = new DataTable();
            DataSet dsInfo = new DataSet();
            var dynamicColumns = new List<string>();
            bool tmpFlag = false;
            var response = new AtParWebApiResponse<string>();
            try
            {
                var result = _getDetailService.GetDetails(orgGroup, bUnit, parLoc, deviceTokenEntry);

                dtCompRep = result.Item2;

                try
                {
                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(sbSQL);
                    }
                    var result6 = _repo.getCriticalItems(bUnit, parLoc);
                    dsInfo = result6.Item1;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to execute SQL... " + sbSQL.ToString() + Environment.NewLine + "Exception is : " + ex.ToString() + Environment.NewLine);
                    }
                }

                if (dsInfo.Tables[0].Rows.Count > 0)
                {
                    tmpFlag = true;
                }

                dtCartItemInfo1 = dtCompRep.Tables[1];

                dcCheckValue.ColumnName = "ChkValue";
                dcCheckField.ColumnName = "ChkField";

                dcCheckValue.DefaultValue = AtParWebEnums.YesNo_Enum.N.ToString();

                dtCartItemInfo1.Columns.Add(dcCheckValue);
                dtCartItemInfo1.Columns.Add(dcCheckField);

                for (int rowIndex = 0; rowIndex < dtCartItemInfo1.Rows.Count; rowIndex++)
                {

                    if (tmpFlag)
                    {
                        if (dsInfo.Tables[0].Select("ITEM_ID = '" + dtCartItemInfo.Rows[rowIndex][AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID.ToString()] + "'").Length > 0)
                        {
                            dtCartItemInfo.Rows[rowIndex]["ChkValue"] = AtParWebEnums.YesNo_Enum.Y.ToString();
                        }
                        dtCartItemInfo1.Rows[rowIndex]["ChkField"] = "CB" + (rowIndex + 1) + "0";
                    }
                }

                dtCompRep.AcceptChanges();

                if (dtCompRep.Tables.Count > 0)
                {
                    if (dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count > 0)
                    {

                        dtCartItemInfo = dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()];

                        for (int rowIndex = 0; rowIndex < dtCartItemInfo.Rows.Count; rowIndex++)
                        {
                            switch (dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_OPT].ToString())
                            {
                                case "01":
                                case "1":
                                case "Y":
                                    dtCartItemInfo.Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = "Stock";
                                    break;
                                case "02":
                                case "2":
                                case "N":
                                    dtCartItemInfo.Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = "Non Stock";
                                    break;
                                case "03":
                                case "3":
                                    dtCartItemInfo.Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = "Stockless";
                                    break;
                                case "04":
                                case "4":
                                    dtCartItemInfo.Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = "Consignment";
                                    break;
                                case "05":
                                case "5":
                                    dtCartItemInfo.Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = "Not Replenished";
                                    break;
                            }
                        }
                    }
                }

                DataColumn dColdt1 = null;
                DataColumn dColdt2 = null;
                DataColumn dColdt3 = null;
                DataColumn dColdt4 = null;
                DataColumn dColdt5 = null;
                DataColumn dcRequstionNo = null;

                dColdt1 = new DataColumn("DATE_1", System.Type.GetType("System.String"));
                dColdt1.DefaultValue = string.Empty;
                dColdt2 = new DataColumn("DATE_2", System.Type.GetType("System.String"));
                dColdt2.DefaultValue = string.Empty;
                dColdt3 = new DataColumn("DATE_3", System.Type.GetType("System.String"));
                dColdt3.DefaultValue = string.Empty;
                dColdt4 = new DataColumn("DATE_4", System.Type.GetType("System.String"));
                dColdt4.DefaultValue = string.Empty;
                dColdt5 = new DataColumn("DATE_5", System.Type.GetType("System.String"));
                dColdt5.DefaultValue = string.Empty;

                dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Add(dColdt1);
                dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Add(dColdt2);
                dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Add(dColdt3);
                dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Add(dColdt4);
                dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Add(dColdt5);

                dtCompRep.AcceptChanges();

                DataTable actualeValuedTable = dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Clone();
                DataTable duplicateValuedTable = dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Clone();

                if (_statusCode == AtparStatusCodes.E_NORECORDFOUND)
                {
                    response.DataList = dynamicColumns;
                    response.DataVariable = latestValuesCount;
                    response.StatusCode = AtparStatusCodes.E_NORECORDFOUND;
                    return response;

                }
                else if (_statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn("After calling GetCartItemInfo function");
                    }

                    response.DataList = dynamicColumns;
                    response.DataVariable = latestValuesCount;
                    response.StatusCode = _statusCode;
                    return response;
                }

                if (_log.IsDebugEnabled)
                {
                    _log.Debug("After calling GetCartItemInfo Function");
                }

                DataSet dsDateValues = new DataSet();
                var result5 = _repo.selectTransaction(bUnit, parLoc);
                dsDateValues = result5.Item1;

                StringBuilder sbTransIDs = new StringBuilder();
                DataSet dsReqNo = new DataSet();
                DataRow[] drReqNo = null;

                for (int intRecCount = 0; intRecCount <= dsDateValues.Tables[0].Rows.Count - 1; intRecCount++)
                {
                    if (intRecCount == 0)
                    {
                        sbTransIDs.Append(dsDateValues.Tables[0].Rows[intRecCount]["TRANSACTION_ID"]);
                    }
                    else
                    {
                        sbTransIDs.Append("," + dsDateValues.Tables[0].Rows[intRecCount]["TRANSACTION_ID"]);
                    }
                }

                if (_log.IsDebugEnabled)
                {
                    _log.Debug("Trans Ids are :" + sbTransIDs.ToString());
                }

                var result4 = _repo.GetRequisitionNo(sbTransIDs.ToString(), svrUser); //dsReqNo
                dsReqNo = result4.Item1;
                _statusCode = result4.Item2;

                if (_statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsDebugEnabled)
                    {
                        _log.Warn("After calling GetRequisitionNo function");
                    }

                    response.DataList = dynamicColumns;
                    response.DataVariable = latestValuesCount;
                    response.StatusCode = _statusCode;
                    return response;
                }

                dcRequstionNo = new DataColumn("REQ_NO", System.Type.GetType("System.String"));
                dcRequstionNo.DefaultValue = string.Empty;
                dsDateValues.Tables[0].Columns.Add(dcRequstionNo);

                if (dsDateValues.Tables[0].Rows.Count > 0)
                {
                    int tempVar = dsReqNo.Tables[0].Rows.Count;
                    for (int intRowCnt = 0; intRowCnt < tempVar; intRowCnt++)
                    {
                        drReqNo = dsReqNo.Tables[0].Select("TRANSID = '" + dsDateValues.Tables[0].Rows[intRowCnt]["TRANSACTION_ID"] + "'");
                        if (drReqNo.Length > 0)
                        {
                            var tempVar2 = drReqNo[0];
                            if (!string.IsNullOrEmpty(tempVar2["REQNO"].ToString()) && !Convert.IsDBNull(tempVar2["REQNO"]))
                            {
                                if (tempVar2["REQNO"].ToString() != "0")
                                {
                                    dsDateValues.Tables[0].Rows[intRowCnt]["REQ_NO"] = tempVar2["REQNO"];
                                }
                            }
                        }
                    }
                }

                string strDateValue1 = "";
                string strDateValue2 = "";
                string strDateValue3 = "";
                string strDateValue4 = "";
                string strDateValue5 = "";
                string strDateValue6 = "";
                string strDateValue7 = "";
                string strDateValue8 = "";
                string strDateValue9 = "";
                string strDateValue10 = "";


                if (dtCompRep.Tables.Count > 0 && dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count > 0)
                {

                    if (dsDateValues.Tables.Count > 0)
                    {

                        if (dsDateValues.Tables[0].Rows.Count > 0)
                        {

                            latestValuesCount = dsDateValues.Tables[0].Rows.Count;

                            var tempVar3 = dsDateValues.Tables[0];
                            switch (tempVar3.Rows.Count)
                            {


                                case 5:
                                    strDateValue1 = tempVar3.Rows[0]["UPDATE_DT_TIME"].ToString();
                                    strDateValue2 = tempVar3.Rows[1]["UPDATE_DT_TIME"].ToString();
                                    strDateValue3 = tempVar3.Rows[2]["UPDATE_DT_TIME"].ToString();
                                    strDateValue4 = tempVar3.Rows[3]["UPDATE_DT_TIME"].ToString();
                                    strDateValue5 = tempVar3.Rows[4]["UPDATE_DT_TIME"].ToString();

                                    strDateValue6 = tempVar3.Rows[0]["DATESTRING"] + " " + tempVar3.Rows[0]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[0]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[0]["REQ_NO"]); //& " " & .Rows(0)("UPDATE_DAY")

                                    strDateValue7 = tempVar3.Rows[1]["DATESTRING"] + " " + tempVar3.Rows[1]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[1]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[1]["REQ_NO"]); //& " " & .Rows(1)("UPDATE_DAY")

                                    strDateValue8 = tempVar3.Rows[2]["DATESTRING"] + " " + tempVar3.Rows[2]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[2]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[2]["REQ_NO"]); //& " " & .Rows(2)("UPDATE_DAY")

                                    strDateValue9 = tempVar3.Rows[3]["DATESTRING"] + " " + tempVar3.Rows[3]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[3]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[3]["REQ_NO"]); //& " " & .Rows(3)("UPDATE_DAY")

                                    strDateValue10 = tempVar3.Rows[4]["DATESTRING"] + " " + tempVar3.Rows[4]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[4]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[4]["REQ_NO"]); //& " " & .Rows(4)("UPDATE_DAY")

                                    break;

                                case 4:
                                    strDateValue1 = tempVar3.Rows[0]["UPDATE_DT_TIME"].ToString();
                                    strDateValue2 = tempVar3.Rows[1]["UPDATE_DT_TIME"].ToString();
                                    strDateValue3 = tempVar3.Rows[2]["UPDATE_DT_TIME"].ToString();
                                    strDateValue4 = tempVar3.Rows[3]["UPDATE_DT_TIME"].ToString();
                                    strDateValue6 = tempVar3.Rows[0]["DATESTRING"] + " " + tempVar3.Rows[0]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[0]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[0]["REQ_NO"]); //& " " & .Rows(0)("UPDATE_DAY")
                                    strDateValue7 = tempVar3.Rows[1]["DATESTRING"] + " " + tempVar3.Rows[1]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[1]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[1]["REQ_NO"]); //& " " & .Rows(1)("UPDATE_DAY")
                                    strDateValue8 = tempVar3.Rows[2]["DATESTRING"] + " " + tempVar3.Rows[2]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[2]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[2]["REQ_NO"]); //& " " & .Rows(2)("UPDATE_DAY")
                                    strDateValue9 = tempVar3.Rows[3]["DATESTRING"] + " " + tempVar3.Rows[3]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[3]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[3]["REQ_NO"]); //& " " & .Rows(3)("UPDATE_DAY")
                                    strDateValue10 = "1/1/1900 00:00:00 PM ";
                                    break;
                                case 3:
                                    strDateValue1 = tempVar3.Rows[0]["UPDATE_DT_TIME"].ToString();
                                    strDateValue2 = tempVar3.Rows[1]["UPDATE_DT_TIME"].ToString();
                                    strDateValue3 = tempVar3.Rows[2]["UPDATE_DT_TIME"].ToString();
                                    strDateValue6 = tempVar3.Rows[0]["DATESTRING"] + " " + tempVar3.Rows[0]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[0]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[0]["REQ_NO"]); //& " " & .Rows(0)("UPDATE_DAY")
                                    strDateValue7 = tempVar3.Rows[1]["DATESTRING"] + " " + tempVar3.Rows[1]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[1]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[1]["REQ_NO"]); //& " " & .Rows(1)("UPDATE_DAY")
                                    strDateValue8 = tempVar3.Rows[2]["DATESTRING"] + " " + tempVar3.Rows[2]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[2]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[2]["REQ_NO"]); //& " " & .Rows(2)("UPDATE_DAY")
                                    strDateValue9 = "1/1/1900 00:00:01 PM ";
                                    strDateValue10 = "1/1/1900 00:00:00 PM ";
                                    break;
                                case 2:
                                    strDateValue1 = tempVar3.Rows[0]["UPDATE_DT_TIME"].ToString();
                                    strDateValue2 = tempVar3.Rows[1]["UPDATE_DT_TIME"].ToString();
                                    strDateValue6 = tempVar3.Rows[0]["DATESTRING"] + " " + tempVar3.Rows[0]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[0]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[0]["REQ_NO"]); //& " " & .Rows(0)("UPDATE_DAY")
                                    strDateValue7 = tempVar3.Rows[1]["DATESTRING"] + " " + tempVar3.Rows[1]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[1]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[1]["REQ_NO"]); //& " " & .Rows(1)("UPDATE_DAY")
                                    strDateValue8 = "1/1/1900 00:00:02 PM ";
                                    strDateValue9 = "1/1/1900 00:00:01 PM ";
                                    strDateValue10 = "1/1/1900 00:00:00 PM ";
                                    break;
                                case 1:
                                    strDateValue1 = tempVar3.Rows[0]["UPDATE_DT_TIME"].ToString();
                                    strDateValue6 = tempVar3.Rows[0]["DATESTRING"] + " " + tempVar3.Rows[0]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[0]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[0]["REQ_NO"]); //& " " & .Rows(0)("UPDATE_DAY")
                                    strDateValue7 = "1/1/1900 00:00:03 PM ";
                                    strDateValue8 = "1/1/1900 00:00:02 PM ";
                                    strDateValue9 = "1/1/1900 00:00:01 PM ";
                                    strDateValue10 = "1/1/1900 00:00:00 PM ";
                                    break;
                                case 0:
                                    strDateValue6 = "1/1/1900 00:00:04 PM ";
                                    strDateValue7 = "1/1/1900 00:00:03 PM ";
                                    strDateValue8 = "1/1/1900 00:00:02 PM ";
                                    strDateValue9 = "1/1/1900 00:00:01 PM ";
                                    strDateValue10 = "1/1/1900 00:00:00 PM ";
                                    break;
                            }
                        }
                        else
                        {
                            strDateValue6 = "1/1/1900 00:00:04 PM ";
                            strDateValue7 = "1/1/1900 00:00:03 PM ";
                            strDateValue8 = "1/1/1900 00:00:02 PM ";
                            strDateValue9 = "1/1/1900 00:00:01 PM ";
                            strDateValue10 = "1/1/1900 00:00:00 PM ";

                        }
                    }
                    else
                    {
                        strDateValue6 = "1/1/1900 00:00:04 PM ";
                        strDateValue7 = "1/1/1900 00:00:03 PM ";
                        strDateValue8 = "1/1/1900 00:00:02 PM ";
                        strDateValue9 = "1/1/1900 00:00:01 PM ";
                        strDateValue10 = "1/1/1900 00:00:00 PM ";

                    }

                    string strIds = string.Empty;
                    int intCnt1 = 0;
                    int tempVar = dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;
                    for (intCnt1 = 0; intCnt1 < tempVar; intCnt1++)
                    {
                        if (dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt1][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] != null)
                        {
                            if (!string.IsNullOrEmpty(strIds) || !string.IsNullOrEmpty(strIds))
                            {
                                strIds = strIds + "," + dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt1][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
                            }
                            else
                            {
                                strIds = strIds + dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt1][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
                            }
                        }
                    }
                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug("total item Ids are :" + strIds);
                    }
                    DataSet dsItemIds = new DataSet();
                    var result1 = _createOrderRepo.GetItemIds(strIds);
                    var dt1 = new DataTable();
                    var dt2 = new DataTable();
                    dt1.Columns.Add("sID", typeof(string));
                    dt2.Columns.Add("sID", typeof(string));

                    DataRow row = dt1.NewRow();
                    foreach (var item in result1.Item1)
                    {

                        dt1.Rows.Add(item);

                    }
                    foreach (var item in result1.Item2)
                    {
                        dt2.Rows.Add(item);
                    }

                    dsItemIds.Tables.Add(dt1);
                    dsItemIds.Tables.Add(dt2);

                    if (dsItemIds.Tables.Count > 0)
                    {
                        if (dsItemIds.Tables[0].Rows.Count > 0)
                        {
                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug("The Actual ids count is :" + dsItemIds.Tables[0].Rows.Count);
                            }
                        }
                    }

                    if (dsItemIds.Tables.Count > 1)
                    {
                        if (dsItemIds.Tables[1].Rows.Count > 0)
                        {
                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug("The repeated ids count is :" + dsItemIds.Tables[1].Rows.Count);
                            }

                        }
                    }

                    string strItemIdValues = string.Empty;
                    int intCnt5 = 0;

                    if (dsItemIds.Tables.Count > 0)
                    {
                        if (dsItemIds.Tables[0].Rows.Count > 0)
                        {
                            int tempVar2 = dsItemIds.Tables[0].Rows.Count;
                            for (intCnt5 = 0; intCnt5 < tempVar2; intCnt5++)
                            {
                                if (!string.IsNullOrEmpty(strItemIdValues) || !string.IsNullOrEmpty(strItemIdValues))
                                {
                                    strItemIdValues = strItemIdValues + "," + dsItemIds.Tables[0].Rows[intCnt5]["sId"];
                                }
                                else
                                {
                                    strItemIdValues = strItemIdValues + dsItemIds.Tables[0].Rows[intCnt5]["sId"];
                                }
                            }
                        }
                    }

                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug("The non repeated ids are :" + strItemIdValues);
                    }
                    string strRepeatedItemIds = string.Empty;
                    int intCnt2 = 0;
                    if (dsItemIds.Tables.Count > 1)
                    {
                        if (dsItemIds.Tables[1].Rows.Count > 0)
                        {
                            foreach (DataRow dRow1 in dsItemIds.Tables[1].Rows)
                            {
                                int tempVar3 = dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;
                                for (intCnt2 = 0; intCnt2 < tempVar3; intCnt2++)
                                {
                                    if (dRow1["sID"] == dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt2][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID])
                                    {

                                        if (!string.IsNullOrEmpty(strRepeatedItemIds) || !string.IsNullOrEmpty(strRepeatedItemIds))
                                        {
                                            strRepeatedItemIds = strRepeatedItemIds + "," + dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt2][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] + "&" + dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt2][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT];
                                        }
                                        else
                                        {
                                            strRepeatedItemIds = strRepeatedItemIds + dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt2][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] + "&" + dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt2][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT];
                                        }
                                    }

                                }
                            }
                        }
                    }
                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug("The repeated ids are :" + strRepeatedItemIds);
                    }
                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug("The total no of rows :" + dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count);
                    }

                    try
                    {
                        int cnt4 = 0;
                        int nor = 0;

                        DataRow dRowNew = null;
                        if (dsItemIds.Tables.Count > 0)
                        {
                            if (dsItemIds.Tables[0].Rows.Count > 0)
                            {
                                nor = dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;
                                foreach (DataRow dRowOld in dsItemIds.Tables[0].Rows)
                                {
                                    for (cnt4 = 0; cnt4 < nor; cnt4++)
                                    {
                                        if (dRowOld["sID"].ToString() == dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[cnt4][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ToString())
                                        {
                                            dRowNew = actualeValuedTable.NewRow(); //duplicateValuedTable.NewRow()
                                            dRowNew = BuildNewRow(dRowNew, dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[cnt4], svrUser);
                                            actualeValuedTable.Rows.Add(dRowNew);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal("Error in building the actual table  :" + ex.ToString());
                        }
                    }

                    if (actualeValuedTable.Rows.Count > 0)
                    {
                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug("The total no of non repeated records count is :" + actualeValuedTable.Rows.Count);
                        }
                    }


                    try
                    {
                        int cnt3 = 0;
                        int noOfRec = 0;
                        DataRow dRowpl2 = null;
                        if (dsItemIds.Tables.Count > 1)
                        {
                            if (dsItemIds.Tables[1].Rows.Count > 0)
                            {
                                noOfRec = dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;
                                foreach (DataRow dRowpl1 in dsItemIds.Tables[1].Rows)
                                {
                                    for (cnt3 = 0; cnt3 < noOfRec; cnt3++)
                                    {
                                        if (dRowpl1["sID"] == dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[cnt3][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID])
                                        {
                                            dRowpl2 = duplicateValuedTable.NewRow();
                                            dRowpl2 = BuildNewRow(dRowpl2, dtCompRep.Tables[(int)AtParWebEnums.DataSet_Type.DETAILS].Rows[cnt3], svrUser);
                                            duplicateValuedTable.Rows.Add(dRowpl2);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal("Error in building the duplicate ids table  :" + ex.ToString());
                        }
                    }

                    if (duplicateValuedTable.Rows.Count > 0)
                    {
                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug("The total no of repeated records count is :" + duplicateValuedTable.Rows.Count);
                        }
                    }

                    DataSet recSetValue = new DataSet();
                    if (strItemIdValues != "" || strItemIdValues != "")
                    {
                        strItemIdValues = "," + strItemIdValues + ",";
                        var result2 = _createOrderRepo.GetItemIdDetails(strItemIdValues, strDateValue1, strDateValue2, strDateValue3, strDateValue4, strDateValue5);
                        recSetValue = result2.ToDataSet();
                        if (recSetValue.Tables.Count > 0)
                        {
                            if (recSetValue.Tables[0].Rows.Count > 0)
                            {
                                if (_log.IsDebugEnabled)
                                {
                                    _log.Debug("The total non repeated values are  :" + recSetValue.Tables[0].Rows.Count);
                                }
                            }
                        }
                    }
                    DataSet reprecSetValues = new DataSet();
                    if (strRepeatedItemIds != "" || strRepeatedItemIds != "")
                    {
                        strRepeatedItemIds = "," + strRepeatedItemIds + ",";
                        var result3 = _createOrderRepo.GetDetailsForRepeatedIds(strRepeatedItemIds, strDateValue1, strDateValue2, strDateValue3, strDateValue4, strDateValue5);
                        reprecSetValues = result3.ToDataSet();
                    }
                    if (reprecSetValues.Tables.Count > 0)
                    {
                        if (reprecSetValues.Tables[0].Rows.Count > 0)
                        {
                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug("The total repeated values are  :" + reprecSetValues.Tables[0].Rows.Count);
                            }
                        }
                    }

                    try
                    {
                        int actualreowCount = 0;
                        int rCnt = 0;
                        int noOfIds = 0;
                        actualreowCount = noOfIds;
                        if (recSetValue.Tables.Count > 0)
                        {
                            if (recSetValue.Tables[0].Rows.Count > 0)
                            {
                                noOfIds = Convert.ToInt32(recSetValue.Tables[0].Rows.Count / 5.0);
                                if (_log.IsDebugEnabled)
                                {
                                    _log.Debug("The total no of rows are  :" + noOfIds);
                                }
                                for (rCnt = 0; rCnt < noOfIds; rCnt++)
                                {
                                                                    
                                    actualeValuedTable.Rows[rCnt]["DATE_1"] = (Convert.ToDouble(recSetValue.Tables[0].Rows[(rCnt * 5) + 0]["QTY"]) > -1) ? recSetValue.Tables[0].Rows[(rCnt * 5) + 0]["QTY"] : "NC";
                                    actualeValuedTable.Rows[rCnt]["DATE_2"] = (Convert.ToDouble(recSetValue.Tables[0].Rows[(rCnt * 5) + 1]["QTY"]) > -1) ? recSetValue.Tables[0].Rows[(rCnt * 5) + 1]["QTY"] : "NC";
                                    actualeValuedTable.Rows[rCnt]["DATE_3"] = (Convert.ToDouble(recSetValue.Tables[0].Rows[(rCnt * 5) + 2]["QTY"]) > -1) ? recSetValue.Tables[0].Rows[(rCnt * 5) + 2]["QTY"] : "NC";
                                    actualeValuedTable.Rows[rCnt]["DATE_4"] = (Convert.ToDouble(recSetValue.Tables[0].Rows[(rCnt * 5) + 3]["QTY"]) > -1) ? recSetValue.Tables[0].Rows[(rCnt * 5) + 3]["QTY"] : "NC";
                                    actualeValuedTable.Rows[rCnt]["DATE_5"] = (Convert.ToDouble(recSetValue.Tables[0].Rows[(rCnt * 5) + 4]["QTY"]) > -1) ? recSetValue.Tables[0].Rows[(rCnt * 5) + 4]["QTY"] : "NC";
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal("Error in binding actual data table" + ex.ToString());
                        }
                    }

                    try
                    {
                        int rerRowCnt = 0;
                        int noOfRepeatedIds = 0;
                        if (reprecSetValues.Tables.Count > 0)
                        {
                            if (reprecSetValues.Tables[0].Rows.Count > 0)
                            {
                                noOfRepeatedIds = Convert.ToInt32(reprecSetValues.Tables[0].Rows.Count / 5.0);
                                if (_log.IsDebugEnabled)
                                {
                                    _log.Debug("The total no of repeated rows are  :" + noOfRepeatedIds);
                                }
                                for (rerRowCnt = 0; rerRowCnt < noOfRepeatedIds; rerRowCnt++)
                                {
                                    duplicateValuedTable.Rows[rerRowCnt]["DATE_1"] = (Convert.ToInt32(reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 0]["QTY"]) > -1) ? reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 0]["QTY"] : "NC";
                                    duplicateValuedTable.Rows[rerRowCnt]["DATE_2"] = (Convert.ToInt32(reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 1]["QTY"]) > -1) ? reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 1]["QTY"] : "NC";
                                    duplicateValuedTable.Rows[rerRowCnt]["DATE_3"] = (Convert.ToInt32(reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 2]["QTY"]) > -1) ? reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 2]["QTY"] : "NC";
                                    duplicateValuedTable.Rows[rerRowCnt]["DATE_4"] = (Convert.ToInt32(reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 3]["QTY"]) > -1) ? reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 3]["QTY"] : "NC";
                                    duplicateValuedTable.Rows[rerRowCnt]["DATE_5"] = (Convert.ToInt32(reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 4]["QTY"]) > -1) ? reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 4]["QTY"] : "NC";
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal("Error in binding repeated ids data table" + ex.ToString());
                        }
                    }

                    try
                    {
                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug("BEFORE MERGING");
                        }
                        actualeValuedTable.Merge(duplicateValuedTable);


                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug("AFTER MERGING");
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal("Error in merging data table" + ex.ToString());
                        }
                    }

                    if (_statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsWarnEnabled)
                        {
                            _log.Warn("After calling GetCartInfo function");
                        }
                        response.DataList = dynamicColumns;
                        response.DataVariable = latestValuesCount;
                        response.StatusCode = _statusCode;
                        return response;
                    }

                    try
                    {

                        actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName = "ITEM_ID";
                        actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID].ColumnName = "CUST_ITEM_ID";
                        actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ColumnName = "COMPARTMENT";
                        actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ColumnName = "DESCR";
                        actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ColumnName = "PRICE";
                        actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ColumnName = "UOM";
                        actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM].ColumnName = "ITEM_TYPE";
                        actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY].ColumnName = "PAR_QTY";

                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ITEM_ID).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.UPN_ID).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_NDC).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_GTIN).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.COUNT_ORDER).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.FOQ).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.COUNT_REQD).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_CTRL).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_OPT).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.CONS_NON_STOCK).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.ORDER_QTY).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.MAX_QTY).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.FILLKILL).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.CHARGE_CODE).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_NAME).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ID).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.QTY_OPTION).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.LAST_ORDER_DATE).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.STATUS).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.PACKAGING_STRING).ToString());
                        actualeValuedTable.Columns.Remove("ChkValue");
                        actualeValuedTable.Columns.Remove("ChkField");
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.MFG_ID).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.CONSIGNMENT_ITEM).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.REPORT_FIELD_1).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.REPORT_FIELD_2).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.REPORT_FIELD_3).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.REPORT_FIELD_4).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_TYPE).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.SUBSTITUTE_ITEM_FLG).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.USER_FIELD_2).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.IMPLANT_FLAG).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_MASTER_ITEM_STATUS).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.NON_CART_ITEM_STATUS).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.BILL_ITEM_STATUS).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.PAR_LOC_STATUS).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_MASTER_STATUS).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_BU_STATUS).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.INFO_2).ToString());
                        actualeValuedTable.Columns.Remove(((int)AtParWebEnums.Get_Cart_Detail_Enum.INFO_3).ToString());
                        var tempVar1 = dsDateValues.Tables[0];


                        switch (tempVar1.Rows.Count)
                        {
                            case 5:                                
                                dynamicColumns.Add(strDateValue6);
                                dynamicColumns.Add(strDateValue7);
                                dynamicColumns.Add(strDateValue8);
                                dynamicColumns.Add(strDateValue9);
                                dynamicColumns.Add(strDateValue10);
                                break;
                            case 4:
                                actualeValuedTable.Columns.Remove("DATE_5");
                                dynamicColumns.Add(strDateValue6);
                                dynamicColumns.Add(strDateValue7);
                                dynamicColumns.Add(strDateValue8);
                                dynamicColumns.Add(strDateValue9);
                                break;
                            case 3:
                                actualeValuedTable.Columns.Remove("DATE_4");
                                actualeValuedTable.Columns.Remove("DATE_5");
                                dynamicColumns.Add(strDateValue6);
                                dynamicColumns.Add(strDateValue7);
                                dynamicColumns.Add(strDateValue8);
                                break;
                            case 2:
                                actualeValuedTable.Columns.Remove("DATE_3");
                                actualeValuedTable.Columns.Remove("DATE_4");
                                actualeValuedTable.Columns.Remove("DATE_5");
                                dynamicColumns.Add(strDateValue6);
                                dynamicColumns.Add(strDateValue7);
                                break;
                            case 1:
                                actualeValuedTable.Columns.Remove("DATE_2");
                                actualeValuedTable.Columns.Remove("DATE_3");
                                actualeValuedTable.Columns.Remove("DATE_4");
                                actualeValuedTable.Columns.Remove("DATE_5");
                                dynamicColumns.Add(strDateValue6);
                                break;
                            case 0:
                                actualeValuedTable.Columns.Remove("DATE_1");
                                actualeValuedTable.Columns.Remove("DATE_2");
                                actualeValuedTable.Columns.Remove("DATE_3");
                                actualeValuedTable.Columns.Remove("DATE_4");
                                actualeValuedTable.Columns.Remove("DATE_5");
                                break;
                        }
                        actualeValuedTable.AcceptChanges();
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal("Error in removing the Dates" + ex.ToString());
                        }
                    }

                    dtFillValues = actualeValuedTable;
                }
                else
                {
                    response.DataList = dynamicColumns;
                    response.DataVariable = latestValuesCount;
                    response.StatusCode = AtparStatusCodes.E_NORECORDFOUND;
                    return response;
                }
                var dictionaryResult = new Dictionary<string, object> { { "dtFillValues", dtFillValues } };
                response.DataDictionary = dictionaryResult;
                response.DataList = dynamicColumns;
                response.DataVariable = latestValuesCount;
                response.StatusCode = AtparStatusCodes.ATPAR_OK;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal("Exception Thrown in " + methodBaseName + " is.." + ex.ToString());
                }

                response.StatusCode = AtparStatusCodes.E_SERVERERROR;
                return response;
            }
        }

        private DataRow BuildNewRow(DataRow newRow, DataRow drOrigRow, string svrUser)
        {
            try
            {
                newRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] = drOrigRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
                newRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR] = drOrigRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR];
                newRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE] = drOrigRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE];
                newRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM] = drOrigRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM];
                newRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT] = drOrigRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT];
                newRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = drOrigRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM];
                newRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY] = drOrigRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY];
                newRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID] = drOrigRow[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID];
                newRow["DATE_1"] = drOrigRow["DATE_1"];
                newRow["DATE_2"] = drOrigRow["DATE_2"];
                newRow["DATE_3"] = drOrigRow["DATE_3"];
                newRow["DATE_4"] = drOrigRow["DATE_4"];
                newRow["DATE_5"] = drOrigRow["DATE_5"];
                if (_log.IsDebugEnabled)
                {
                    _log.Debug("End of SubRoutine");
                }
                return newRow;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal("Exception in  Building NewRow " + ex.ToString());
                }
            }
            return newRow;
        }
    }
}
