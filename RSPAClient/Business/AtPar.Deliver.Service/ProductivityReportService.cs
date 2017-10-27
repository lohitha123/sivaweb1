using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Deliver;
using AtPar.Service.Interfaces.Deliver;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Deliver.Service
{
   public class ProductivityReportService : IProductivityReportService
    {
        private ILog _log;
        private IProductivityReportRepository _repo;
        private IDeliveryReportService _deliveryRepo;
        private ICommonRepository _commonRepo;
        public ProductivityReportService(ILog log, IProductivityReportRepository repo, ICommonRepository commonRepo, IDeliveryReportService deliveryRepo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;
            _deliveryRepo = deliveryRepo;
        }


        public AtParWebApiResponse<long> GetCycleTimeReport(string orgGroupID, string fromDate, string toDate,
            string userID, string startEvent, string endEvent,
            string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataSet pDsDelvDetailRep = new DataSet();
            DataSet pDSTransRep = new DataSet();
            string strDeliveredBy = string.Empty;
            long _StatusCode = 0;
            long functionReturnValue = 0;
            var response = new AtParWebApiResponse<long>();
            var tupleResult=  _repo.GetCycleTimeReportRepo(orgGroupID, fromDate, toDate, userID, startEvent, endEvent, deviceTokenEntry);
            pDsDelvDetailRep= tupleResult.Item1;


            DataTable dtDelDetTable = new DataTable();
            _StatusCode = _deliveryRepo.BuildDelvDetailsTable(deviceTokenEntry[(int)AtParWebEnums. TokenEntry_Enum.UserID], orgGroupID,ref dtDelDetTable, pDsDelvDetailRep);
            if (_StatusCode != AtparStatusCodes.ATPAR_OK)
            {
                _StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                functionReturnValue = _StatusCode;
                if (_log.IsFatalEnabled)
                    _log.Fatal("ATPAR_E_LOCALDBSELECTFAIL :");
                response.StatusCode = _StatusCode;
                return response;
            }

            pDsDelvDetailRep.Tables.Clear();
            pDsDelvDetailRep.Tables.Add(dtDelDetTable);
            pDSTransRep = pDsDelvDetailRep.Copy();
            int currtrans = 0;
            int deleteCount = 0;
            //int nexttrans = 0;

            //To build a dataset that contains only Delivery Report headers
            for (int cnt = 0; cnt <= pDsDelvDetailRep.Tables[0].Rows.Count - 1; cnt++)
            {
                var _with1 = pDsDelvDetailRep.Tables[0].Rows[cnt];
                if (currtrans == Convert.ToInt32(_with1["TRANSACTION_ID"]))
                {
                    pDSTransRep.Tables[0].Rows.RemoveAt(cnt - 1 - deleteCount);
                    deleteCount = deleteCount + 1;
                }
                else
                {
                    currtrans = Convert.ToInt32(_with1["TRANSACTION_ID"]);
                }
                if (_with1["DELIVERED_BY"] != DBNull.Value)
                {
                    strDeliveredBy = string.Empty;
                    var tupleResult1 = _repo.GetUserFullName(_with1["DELIVERED_BY"].ToString());
                    strDeliveredBy = tupleResult1.Item1;
                    _StatusCode = tupleResult1.Item2;

                    if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("E_SERVERERROR :");
                        functionReturnValue = _StatusCode;
                        response.StatusCode = _StatusCode;
                        return response;
                    }
                }
                if (_log.IsDebugEnabled)
                    _log.Debug("df" + strDeliveredBy);

                _with1["DELIVERED_BY"] = strDeliveredBy;
            }
            //To fill the Dataset with two different data tables namely Deliver Report and Deliver Details
            DataSet _ds = new DataSet();
            DataTable tableRep = default(DataTable);
            tableRep = new DataTable("DELIVERYREPORT");
            pDSTransRep.Tables[0].TableName = "DELIVERYREPORT";
            tableRep = pDSTransRep.Tables[0].Copy();
            _ds.Tables.Add(tableRep);
            DataTable tblDet = new DataTable("DELIVERDETAILS");
            pDsDelvDetailRep.Tables[0].TableName = "DELIVERDETAILS";
            tblDet = pDsDelvDetailRep.Tables[0].Copy();
            _ds.Tables.Add(tblDet);
            pDsDelvDetailRep.Clear();
            pDsDelvDetailRep = _ds.Copy();

            pDsDelvDetailRep.Tables["DELIVERYREPORT"].TableName = "TRANSACTIONS";
            pDsDelvDetailRep.Tables["DELIVERDETAILS"].TableName = "EVENTDETAILS";
            pDsDelvDetailRep.AcceptChanges();
            //return new Tuple<DataSet, long>(pDsDelvDetailRep, _StatusCode);
            var dictionaryResult = new Dictionary<string, object> { { "pDsDelvDetailRep", pDsDelvDetailRep } };
            response.DataDictionary = dictionaryResult;
            response.AtParSuccess() ;
            return response;
        }

        public AtParWebApiResponse<long> GetProductivityReport(string orgGroupID, string fromDate,
            string todate, string userID, int interval, string fTime, string toTime)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = -1;
            var response = new AtParWebApiResponse<long>();
           
            try
            {
                var result = _repo.GetProductivityReport(orgGroupID, fromDate, todate, userID, 
                    interval, fTime, toTime);

                var pDsProductivityRep = result.Item1;
                statusCode = result.Item2;

                var dictionaryResult = new Dictionary<string, object> { { "pDsProductivityRep", pDsProductivityRep } };

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
