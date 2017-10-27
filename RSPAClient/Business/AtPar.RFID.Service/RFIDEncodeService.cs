using AtPar.Service.Interfaces.RFID;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.RFID;
using AtPar.Repository.Interfaces.Common;
using log4net;
using AtPar.Common.Service;
using AtPar.ViewModel;
using System.Data;
using AtPar.Service.Interfaces.POU;

namespace AtPar.RFID.Service
{
    public class RFIDEncodeService : IRFIDEncodeService
    {
        IRFIDEncodeRepository _rfidEncodeRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonPOUService _commonPOUService;
        IQuantityOnHandReportService _QtyOnHandReportService;

        public RFIDEncodeService(ILog log, IRFIDEncodeRepository rfidEncodeRepo, ICommonRepository commonRepo, ICommonPOUService commonPOUService, IQuantityOnHandReportService QtyOnHandReportService)
        {
            _rfidEncodeRepo = rfidEncodeRepo;
            _log = log;
            _commonRepo = commonRepo;
            _commonPOUService = commonPOUService;
            _QtyOnHandReportService = QtyOnHandReportService;
            _log.SetLoggerType(typeof(IRFIDEncodeRepository));
        }

        public AtParWebApiResponse<long> WriteBinTags(List<RF_BIN_MAPPING> lstTags)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            //StringBuilder _sbSQL = new StringBuilder();
            var response = new AtParWebApiResponse<long>();

            try
            {
                Tuple<long,string> resultStatus = _rfidEncodeRepo.WriteBinTags(lstTags) ;

                if (resultStatus.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(resultStatus.Item1, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                response.StatusMessage = resultStatus.Item2;
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> WriteItemTags(List<RF_ITEM_MAPPING> lstTags)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            //StringBuilder _sbSQL = new StringBuilder();
            var response = new AtParWebApiResponse<long>();

            try
            {
                Tuple<long,string> resultStatus = _rfidEncodeRepo.WriteItemTags(lstTags);

                if (resultStatus.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(resultStatus.Item1, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                response.StatusMessage = resultStatus.Item2;
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<VM_SEARCHITEM_DETAILS> SearchItem(string strItemID, string[] deviceTokenEntry, bool blnScanFlag = false, string strFileType = "", bool blnLocSelection = false)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            //StringBuilder _sbSQL = new StringBuilder();
            var response = new AtParWebApiResponse<VM_SEARCHITEM_DETAILS>();

            try
            {
                response = _commonPOUService.SearchItem(strItemID,15, deviceTokenEntry,blnScanFlag,strFileType,false);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (response.StatusCode == (int)AtparStatusCodes.S_FOUNDIN_ATPAR_ITEMMASTER || response.StatusCode == (int)AtparStatusCodes.S_FOUNDIN_ERP_ITEMMASTER || response.StatusCode == (int)AtparStatusCodes.S_FOUNDIN_ALLOCATEDCART)
                    {
                        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + ":No of items returned is: " + response.DataList.Count() + "StatusCode is :" + response.StatusCode); }
                        response.AtParSuccess();
                        return response;

                    }
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

        public AtParWebApiResponse<VM_SEARCHITEM_DETAILS> GetItemDetailsData(string Bunit,string CartId,string UserId,string OrgGroupId,string[] deviceTokenEntry)

        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            //StringBuilder _sbSQL = new StringBuilder();
            var response = new AtParWebApiResponse<VM_SEARCHITEM_DETAILS>();

            try
            {
                var result = _QtyOnHandReportService.GetQtyOnHandReportData(Bunit, CartId, string.Empty, string.Empty, UserId, string.Empty, false, string.Empty, OrgGroupId, 15, deviceTokenEntry);

                if (result.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(result.StatusCode, _commonRepo, _log);
                    return response;
                }

                var dsCartItems = ((System.Data.DataSet)(result.DataDictionary["pQtyOnHandReportDS"]));
                  response.DataList = (from rw in dsCartItems.Tables[1].AsEnumerable()
                                      select new VM_SEARCHITEM_DETAILS()
                                      {
                                           //INV_ITEM_ID = rw["REPORT_KEY"] == null ? string.Empty : rw["REPORT_KEY"].ToString(),
                                          BUSINESS_UNIT = rw["BUSINESS_UNIT"] == null ? string.Empty : rw["BUSINESS_UNIT"].ToString(),
                                          CART_ID = rw["CART_ID"] == null ? string.Empty : rw["CART_ID"].ToString(),
                                          ITEMID = rw["ITEM_ID"] == null ? string.Empty : rw["ITEM_ID"].ToString(),
                                          //SUBSTITUTE_ITEM_ID = rw["SUBSTITUTE_ITEM_ID"] == null ? string.Empty : rw["SUBSTITUTE_ITEM_ID"].ToString(),
                                          LOT_NUMBER = rw["ITEM_LOTNUMBER"] == null ? string.Empty :rw["ITEM_LOTNUMBER"].ToString(),
                                          SERIAL_NUMBER = rw["ITEM_SRNUMBER"] == null ? string.Empty : rw["ITEM_SRNUMBER"].ToString(),
                                          //ITEM_QUANTITY_ON_HAND = rw["ITEM_QUANTITY_ON_HAND"] == DBNull.Value ? 0 : Convert.ToDouble(rw["ITEM_QUANTITY_ON_HAND"]),
                                          //ACTUAL_QUANTITY = rw["ACTUAL_QUANTITY"] == DBNull.Value ? 0 : Convert.ToDouble(rw["ACTUAL_QUANTITY"]),
                                          //ITEM_COUNT = rw["ITEM_COUNT"] == DBNull.Value ? 0 : Convert.ToDouble(rw["ITEM_COUNT"]),
                                          EXP_DATE = rw["EXP_DATE"] == null ? string.Empty : rw["EXP_DATE"].ToString(),
                                          COMPARTMENT = rw["COMPARTMENT"] == null ? string.Empty: rw["COMPARTMENT"].ToString()

                                      }).ToList();

                                
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
