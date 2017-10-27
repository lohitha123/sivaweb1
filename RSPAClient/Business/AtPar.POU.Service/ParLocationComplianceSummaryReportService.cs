using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Repository.Interfaces.Common;
using System.Data.SqlClient;
using System.Data;
using AtPar.Common.Service;

namespace AtPar.POU.Service
{
    public class ParLocationComplianceSummaryReportService : IParLocationComplianceSummaryReportService
    {
        ILog _log;
        IParLocationComplianceSummaryReportRepository _parLocationComplianceSummaryReportRepo;
        ICommonRepository _commonRepo;
        public ParLocationComplianceSummaryReportService(IParLocationComplianceSummaryReportRepository parLocationComplianceSummaryReportRepo, ILog log, ICommonRepository commonRepository)
        {
            _log = log;
            _parLocationComplianceSummaryReportRepo = parLocationComplianceSummaryReportRepo;
            _commonRepo = commonRepository;
        }
        /// <summary>
        /// GetComplianceSummary
        /// </summary>
        /// <param name="pStrFromDate"></param>
        /// <param name="pStrToDate"></param>
        /// <param name="pStrDeptID"></param>
        /// <param name="pStrCartID"></param>
        /// <param name="pStrOrgGrpID"></param>
        /// <param name="pAppID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetComplianceSummary(string pStrFromDate, string pStrToDate, string pStrDeptID, string pStrCartID, string pStrOrgGrpID, int pAppID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<long>();
           // long _statusCode = -1;
           // SqlCommand _Cmd;
            DataTable _dtRet;
          //  DataSet _detDS;
            DataRow[] _rowsIssue;
            DataRow[] _rowsRet;
            DataRow[] _rowsUnAcc;
            DataRow _retRow;
           // string _strBUnit;
            string _strCart;
            string _strSearch;
            double _intIssueQty;
            double _intIssueValue;
            double _intRetQty;
            double _intRetValue;
            double _intUnAccQty;
            double _intUnAccValue;
            double _compliance;
            double _dollarsCaptured;
            string _strDeptID;
            DataSet pReturnDS;
            try
            {
                var dsCompliance = _parLocationComplianceSummaryReportRepo.GetComplianceSummary(pStrFromDate, pStrToDate, pStrDeptID, pStrCartID, pStrOrgGrpID, pAppID);

                if (dsCompliance.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(dsCompliance.Item2, _commonRepo, _log);
                    return response;
                }
                DataSet _dsCompliance = dsCompliance.Item1;
                _dtRet = new DataTable();
                _dtRet.Columns.Add("POU_LOC", Type.GetType("System.String"));
                _dtRet.Columns.Add("ISSUE_QTY", Type.GetType("System.Double"));
                _dtRet.Columns.Add("ISSUE_VALUE", Type.GetType("System.Double"));
                _dtRet.Columns.Add("RET_QTY", Type.GetType("System.Double"));
                _dtRet.Columns.Add("RET_VALUE", Type.GetType("System.Double"));
                _dtRet.Columns.Add("UN_ACC_QTY", Type.GetType("System.Double"));
                _dtRet.Columns.Add("UN_ACC_VALUE", Type.GetType("System.Double"));
                _dtRet.Columns.Add("COMPLIANCE", Type.GetType("System.Double"));
                _dtRet.Columns.Add("DOLLARS_CAPTURED", Type.GetType("System.Double"));
                _dtRet.Columns.Add("DEPARTMENT_ID", Type.GetType("System.String"));
                for (int intCnt = 0; (intCnt
                     <= (_dsCompliance.Tables[0].Rows.Count - 1)); intCnt++)
                {
                    _strDeptID = _dsCompliance.Tables[0].Rows[intCnt]["DEPARTMENT_ID"].ToString();
                    _strCart = _dsCompliance.Tables[0].Rows[intCnt]["CART_ID"].ToString();
                    _strSearch = ("CART_ID=\'"
                                + (_strCart + "\'"));
                    _rowsIssue = _dsCompliance.Tables[1].Select(_strSearch);
                    if ((_rowsIssue.Length > 0))
                    {
                        // _intIssueQty = (IsDBNull(_rowsIssue[0]["ISSUE_QTY"]) ? 0 : _rowsIssue[0]["ISSUE_QTY"]);
                        // _intIssueValue = (IsDBNull(_rowsIssue[0]["ISSUE_VALUE"]) ? 0 : Math.Round(_rowsIssue[0]["ISSUE_VALUE"], 2));
                        _intIssueQty = (_rowsIssue[0]["ISSUE_QTY"] == DBNull.Value) ? 0 : (double)_rowsIssue[0]["ISSUE_QTY"];
                        _intIssueValue=(_rowsIssue[0]["ISSUE_VALUE"]==DBNull.Value)?0: Math.Round((double)_rowsIssue[0]["ISSUE_VALUE"], 2);

                    }
                    else
                    {
                        _intIssueQty = 0;
                        _intIssueValue = 0;
                    }

                    _rowsRet = _dsCompliance.Tables[2].Select(_strSearch);
                    if ((_rowsRet.Length > 0))
                    {

                      
                        if (_rowsRet[0]["RET_QTY"]!=DBNull.Value && !string.IsNullOrEmpty(_rowsRet[0]["RET_QTY"].ToString()))
                        {
                            _intRetQty = (double)_rowsRet[0]["RET_QTY"];
                        }
          
                        else
                        {
                            _intRetQty = 0;
                        }
                  
                        if (_rowsRet[0]["RET_VALUE"] != DBNull.Value && !string.IsNullOrEmpty(_rowsRet[0]["RET_VALUE"].ToString()))
                        {
                            _intRetValue = Math.Round((double)_rowsRet[0]["RET_VALUE"],2);
                        }
                   
                        else
                        {
                            _intRetValue = 0;
                        }

                    }
                    else
                    {
                        _intRetQty = 0;
                        _intRetValue = 0;
                    }

                    _rowsUnAcc = _dsCompliance.Tables[3].Select(_strSearch);
                    if ((_rowsUnAcc.Length > 0))
                    {
                        _intUnAccQty = (double)_rowsUnAcc[0]["UN_ACC_QTY"];
                        _intUnAccValue = Math.Round((double)_rowsUnAcc[0]["UN_ACC_VALULE"], 2);
                    }
                    else
                    {
                        _intUnAccQty = 0;
                        _intUnAccValue = 0;
                    }

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info((methodBaseName + (" : _intUnAccQty : " + _intUnAccQty)));
                    }

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info((methodBaseName + (" : _intIssueQty : " + _intIssueQty)));
                    }

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info((methodBaseName + (" : _intRetQty : " + _intRetQty)));
                    }

                    _compliance = Math.Round((100 * (1
                                    + (_intUnAccQty
                                    / ((_intIssueQty - _intRetQty)
                                    + _intUnAccQty)))), 2);
                    _dollarsCaptured = Math.Round((100 * (1
                                    + (_intUnAccValue
                                    / ((_intIssueValue - _intRetValue)
                                    + _intUnAccValue)))), 2);
                    if (_log.IsInfoEnabled)
                    {
                        _log.Info((methodBaseName + (" : _compliance : " + _compliance)));
                    }

                    _retRow = _dtRet.NewRow();
                    _retRow["POU_LOC"] = _strCart;
                    _retRow["ISSUE_QTY"] = _intIssueQty;
                    _retRow["ISSUE_VALUE"] = _intIssueValue;
                    _retRow["RET_QTY"] = _intRetQty;
                    _retRow["RET_VALUE"] = _intRetValue;
                    _retRow["UN_ACC_QTY"] = _intUnAccQty;
                    _retRow["UN_ACC_VALUE"] = _intUnAccValue;
                    if ((double.IsNaN(_compliance) || double.IsInfinity(_compliance)))
                    {
                        _retRow["COMPLIANCE"] = 0;
                    }
                    else
                    {
                        _retRow["COMPLIANCE"] = _compliance;
                    }

                    if ((double.IsNaN(_dollarsCaptured) || double.IsInfinity(_dollarsCaptured)))
                    {
                        _retRow["DOLLARS_CAPTURED"] = 0;
                    }
                    else
                    {
                        _retRow["DOLLARS_CAPTURED"] = _dollarsCaptured;
                    }

                    _retRow["DEPARTMENT_ID"] = _strDeptID;
                    _dtRet.Rows.Add(_retRow);
                }
                pReturnDS = new DataSet();
                pReturnDS.Tables.Add(_dtRet);
                var ds = new Dictionary<string, object> { { "pReturnDS", pReturnDS } };
                response.AtParSuccess();
                response.DataDictionary = ds;
                return response;
  
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to get the Par location ComplianceSummary report data" + " : Exception is : " + ex.ToString() + "\n");
                response.AtParException(ex, _commonRepo, _log);
                return response;
                
               
            }
            

        }
    }
}
