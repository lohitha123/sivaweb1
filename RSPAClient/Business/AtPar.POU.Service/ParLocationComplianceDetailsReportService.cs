using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using System.Data;
using System.Xml;
using AtPar_BusinessRules;
using AtPar.POCOEntities;
using System.Data.SqlClient;
using AtPar.Common.Service;
using AtPar.ViewModel;

namespace AtPar.POU.Service
{
    public class ParLocationComplianceDetailsReportService: IParLocationComplianceDetailsReportService
    {
        IParLocationComplianceDetailsReportRepository _parLocationComplianceDetailsReportRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonPOURepository _commonPOURepo;

        ICommonPOUService _commonPOUService;
        public ParLocationComplianceDetailsReportService(IParLocationComplianceDetailsReportRepository parLocationComplianceDetailsReportRepo, ILog log, ICommonRepository commonRepository,ICommonPOURepository commonPOURepo, ICommonPOUService commonPOUService)
        {
            _parLocationComplianceDetailsReportRepo = parLocationComplianceDetailsReportRepo;
            _log = log;
            _commonRepo = commonRepository;
            _commonPOURepo = commonPOURepo;
            _commonPOUService = commonPOUService;
        }

        /// <summary>
        /// GetComplianceDetails
        /// </summary>
        /// <param name="pStrDept"></param>
        /// <param name="pStrLoc"></param>
        /// <param name="pStrUserId"></param>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <param name="pStrOrgGrpID"></param>
        /// <param name="pAppID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetComplianceDetails(string pStrDept, string pStrLoc, string pStrUserId, string pStrFromDate, string pStrToDate, string pStrOrgGrpID, int pAppID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            pStrDept = string.IsNullOrEmpty(pStrDept) ? string.Empty : pStrDept;
            pStrLoc = string.IsNullOrEmpty(pStrLoc) ? string.Empty : pStrLoc;
            pStrUserId = string.IsNullOrEmpty(pStrUserId) ? string.Empty : pStrUserId;
            var response = new AtParWebApiResponse<long>();

          
            DataTable _retTbl;
            DataSet _detDS;
            DataRow[] _rowsDescr;
            DataRow[] _rowsIssue;
            DataRow _retRow;
            string _strBUnit = string.Empty;
            string _strCart = string.Empty;
            string _strLocType = string.Empty;
            string _strItemID = string.Empty;
            string _strSearch = string.Empty;
            double _dblPrice;
            double _intUnAccQty;
            double _dblLostCharges;
            double _intIssueQty;
            string _strDescr;
            int Item_ID=0;
            DataSet _dsNonCart=new DataSet();
            DataSet pDSDetails;
            double _dblConvRt = 1;

            try
            {
                var _dsComplianceDet = _parLocationComplianceDetailsReportRepo.GetComplianceDetails(pStrDept, pStrLoc, pStrUserId, pStrFromDate, pStrToDate, pStrOrgGrpID, pAppID);

                if (_dsComplianceDet.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(_dsComplianceDet.Item1, _commonRepo, _log);
                    return response;
                }
                
                _retTbl = new DataTable("COMPLIANCE_DETAILS");
                _retTbl.Columns.Add("TRANS_DATE", Type.GetType("System.DateTime"));
                _retTbl.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                _retTbl.Columns.Add("ITEM_DESCR", Type.GetType("System.String"));
                _retTbl.Columns.Add("PRICE", Type.GetType("System.Double"));
                _retTbl.Columns.Add("ISSUE_QTY", Type.GetType("System.Double"));
                _retTbl.Columns.Add("UN_ACC_QTY", Type.GetType("System.Double"));
                _retTbl.Columns.Add("LOST_CHARGES", Type.GetType("System.Double"));

                _detDS = default(DataSet);
                for (int intCnt = 0; (intCnt
                        <= (_dsComplianceDet.Item2.Tables[0].Rows.Count - 1)); intCnt++)
                {
                    _dblConvRt = 1;
                    if (((_strBUnit != _dsComplianceDet.Item2.Tables[0].Rows[intCnt]["BUSINESS_UNIT"].ToString())
                                || (_strCart == _dsComplianceDet.Item2.Tables[0].Rows[intCnt]["CART_ID"].ToString())))
                    {
                        _strBUnit = _dsComplianceDet.Item2.Tables[0].Rows[intCnt]["BUSINESS_UNIT"].ToString();
                        _strCart = _dsComplianceDet.Item2.Tables[0].Rows[intCnt]["CART_ID"].ToString();
                        // Getting Location Type

                        try
                        {
                            _strLocType = _commonPOURepo.GetLocationType(_strBUnit, _strCart, _strLocType);

                        }
                        catch (Exception ex)
                        {

                            if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                            response.AtParException(ex, _commonRepo, _log);
                            return response;
                        }
                        try
                        {
                           
                            var dsgetCartDetails = _commonPOUService.GetCartDetails(_strCart, _strBUnit, _detDS, pStrOrgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(),locationType:_strLocType);
                            if ((dsgetCartDetails.Item1 != AtparStatusCodes.ATPAR_OK))
                            {
                                response.AtParNotOK(dsgetCartDetails.Item1, _commonRepo, _log);
                                return response;
                            }
                            _detDS = dsgetCartDetails.Item2;
                           // cartDetails = GetCartDetails(cartName, businessUnit, detDS, orgGrpID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId].ToString(), string.Empty, strLocType);
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                            response.AtParException(ex, _commonRepo, _log);
                            return response;
                        }

                        

                        try
                        {
                            // Getting non cart inventory
                            var dsNonCart = _commonPOURepo.GetNonCartItems(_strBUnit, _strCart);
                            _dsNonCart.Tables.Add(dsNonCart.ToDataTable());
                            
                        }
                        catch (Exception ex)
                        {
                           
                            if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                            response.AtParException(ex, _commonRepo, _log);
                            return response;
                            
                        }

                    }

                    _strBUnit = _dsComplianceDet.Item2.Tables[0].Rows[intCnt]["BUSINESS_UNIT"].ToString();
                    _strCart = _dsComplianceDet.Item2.Tables[0].Rows[intCnt]["CART_ID"].ToString();
                    _strItemID = _dsComplianceDet.Item2.Tables[0].Rows[intCnt]["ITEM_ID"].ToString();
                    _strSearch = ("ITEM_ID=\'"
                                + (_strItemID + ("\' AND CART_ID=\'"
                                + (_strCart + ("\' AND BUSINESS_UNIT=\'"
                                + (_strBUnit + "\'"))))));
                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug((methodBaseName + (" Search String :" + _strSearch)));
                    }

                    if ((_detDS.Tables[1].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType.ToString() == "System.String"))
                    {
                        _rowsDescr = _detDS.Tables[1].Select(("["
                                        + (_detDS.Tables[1].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName + ("]  = \'"
                                        + (_strItemID + "\'")))));
                    }
                    else if (int.TryParse(_strItemID,out Item_ID))
                    {
                        _rowsDescr = _detDS.Tables[1].Select(("["
                                        + (_detDS.Tables[1].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName + ("]  = "
                                        + (_strItemID + "")))));
                    }
                    else
                    {
                        _rowsDescr = _detDS.Tables[1].Select("0=-1");
                    }

                    _rowsIssue = _dsComplianceDet.Item2.Tables[1].Select(_strSearch);
                    if ((_rowsDescr.Length > 0))
                    {
                        if (((_rowsDescr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString() == null)
                                    || string.IsNullOrEmpty(_rowsDescr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString())))
                        {
                            _strDescr = string.Empty;
                        }
                        else
                        {
                            _strDescr = _rowsDescr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ToString();
                        }

                        if (((_rowsDescr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString() == null)
                                    || string.IsNullOrEmpty(_rowsDescr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ToString())))
                        {
                            _dblPrice = (double)Decimal.Zero;
                        }
                        else
                        {
                            _dblPrice = (double)_rowsDescr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE];
                        }

                        if (_rowsDescr[0].Table.Columns.Contains(AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR.ToString()))
                        {
                            if (((_rowsDescr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR]==DBNull.Value)
                                        && !string.IsNullOrEmpty(_rowsDescr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR].ToString())))
                            {
                                _dblConvRt = (double)_rowsDescr[0][(int)AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR];
                            }

                        }

                       
                        _dblPrice = (_dblPrice / _dblConvRt);
                      
                    }
                    else
                    {
                        // Search in noncart details for description / price
                        _rowsDescr = _dsNonCart.Tables[0].Select(("ITEM_ID=\'"
                                        + (_strItemID + "\'")));
                        if ((_rowsDescr.Length > 0))
                        {
                            if ((_rowsDescr[0].Table.Columns.Contains("CONV_RATE_PAR_TO_ISSUE")
                                        && !string.IsNullOrEmpty(_rowsDescr[0]["CONV_RATE_PAR_TO_ISSUE"].ToString())))
                            {
                                _dblConvRt = (double)_rowsDescr[0]["CONV_RATE_PAR_TO_ISSUE"];
                            }

                            _dblPrice = ((_rowsDescr[0]["ITEM_PRICE"]==DBNull.Value) ? (double)Decimal.Zero :(double) _rowsDescr[0]["ITEM_PRICE"]);
                            
                            _dblPrice = (_dblPrice / _dblConvRt);
                            
                            _strDescr = ((_rowsDescr[0]["ITEM_DESCRIPTION"]==DBNull.Value) ? String.Empty : _rowsDescr[0]["ITEM_DESCRIPTION"].ToString());
                        }
                        else
                        {
                            _rowsDescr = _dsComplianceDet.Item2.Tables[0].Select(_strSearch);
                            if ((_rowsDescr.Length > 0))
                            {
                                _dblPrice = (double)_rowsDescr[0]["ITEM_PRICE"];
                                _strDescr = String.Empty;
                            }
                            else
                            {
                                _dblPrice = (double)decimal.Zero;
                                _strDescr = string.Empty;
                            }

                        }

                    }

                    _intUnAccQty = ((double)_dsComplianceDet.Item2.Tables[0].Rows[intCnt]["UNACCT"] * _dblConvRt);
                    _dblLostCharges = Math.Round((_intUnAccQty * _dblPrice), 2);
                    if ((_rowsIssue.Length > 0))
                    {
                        _intIssueQty = ((_rowsIssue[0]["ISSUE"]==DBNull.Value) ? 0 : (double)_rowsIssue[0]["ISSUE"]);
                    }
                    else
                    {
                        _intIssueQty = 0;
                    }

                    _retRow = _retTbl.NewRow();
                    _retRow["TRANS_DATE"] = _dsComplianceDet.Item2.Tables[0].Rows[intCnt]["CYCT_DATE_TIME"];
                    _retRow["ITEM_ID"] = _strItemID;
                    _retRow["ITEM_DESCR"] = _strDescr;
                    _retRow["PRICE"] = _dblPrice;
                    _retRow["ISSUE_QTY"] = _intIssueQty;
                    _retRow["UN_ACC_QTY"] = _intUnAccQty;
                    _retRow["LOST_CHARGES"] = _dblLostCharges;
                    _retTbl.Rows.Add(_retRow);
                }
                if (_log.IsDebugEnabled)
                {
                    _log.Debug((methodBaseName + (" Total Records found:" + _retTbl.Rows.Count)));
                }

                pDSDetails = new DataSet();
                pDSDetails.Tables.Add(_retTbl);
                var ds = new Dictionary<string, object> { { "pDSDetails", pDSDetails } };
                response.AtParSuccess();
                response.DataDictionary = ds;
                return response;

            }
            catch (Exception  ex)
            {

                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to get the Par location ComplianceDetails report data" + " : Exception is : " + ex.ToString() + "\n");
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

            
        }

        public AtParWebApiResponse<VM_COMPLIANCE_DETAILS_DEPT_HEADER_INFO> GetDeptCartAllocations(string pBusinessUnit, string pDeptId, int pAppID, string pLocationType = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<VM_COMPLIANCE_DETAILS_DEPT_HEADER_INFO>();
            try
            {
               
                response.DataList = _parLocationComplianceDetailsReportRepo.GetDeptCartAllocations(pBusinessUnit, pDeptId, pAppID, pLocationType);

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
    }
}
