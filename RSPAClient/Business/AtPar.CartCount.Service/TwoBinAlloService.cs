using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;
using AtPar.Common;
using System.Reflection;
using System.Xml.Linq;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;
using AtPar_BusinessRules;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.POCOEntities;
using System.Data;
using AtPar.Service.Interfaces.CartCount;

namespace AtPar.CartCount.Service
{
    public class TwoBinAlloService : ITwoBinAlloService
    {
        ITwoBinAllocRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;
        IGetHeaderService _getHeaderService;

        public TwoBinAlloService(ITwoBinAllocRepository repository, ILog log, ICommonRepository commonRepository,
                                 IGetHeaderService cartcountCommonService)
        {
            _Repo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _getHeaderService = cartcountCommonService;
            _log.SetLoggerType(typeof(TwoBinAlloService));
        }

        #region AllocateBins

        public AtParWebApiResponse<MT_CRCT_TWO_BIN_ALLOCATION> TwoBinSaving(List<MT_CRCT_TWO_BIN_ALLOCATION> lstBins, string bUnit)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            var response = new AtParWebApiResponse<MT_CRCT_TWO_BIN_ALLOCATION>();

            try
            {
                StatusCode = _Repo.TwoBinSaving(lstBins, bUnit);

                if (!StatusCode.Equals(AtparStatusCodes.ATPAR_OK))
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
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

        #region GetBUnits
        public AtParWebApiResponse<MT_CRCT_TWO_BIN_ALLOCATION> GetTwoBinCartsAllocation(string bUnit, string cartID, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_CRCT_TWO_BIN_ALLOCATION>();

            string fldOrdby  = "BUSINESS_UNIT";

            //Tuple<long, SortedList> tupleRes = null;
            string order = string.Empty;
            DataSet outputParameters = new DataSet();
            List<MT_CRCT_TWO_BIN_ALLOCATION> lstERPBins = new List<MT_CRCT_TWO_BIN_ALLOCATION>();

            try
            {

                Tuple<long, DataSet> tupleResult = _getHeaderService.GetHeader(string.Empty, bUnit, string.Empty, fldOrdby, order, deviceTokenEntry);


                if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    response.AtParNotOK(tupleResult.Item1, _commonRepo, _log);
                    return response;
                }

                outputParameters = tupleResult.Item2;
                if (outputParameters.Tables[0].Rows.Count > 0)
                {

                    lstERPBins = (from DataRow dr in outputParameters.Tables[0].Rows
                                  select new MT_CRCT_TWO_BIN_ALLOCATION()
                                  {
                                      CART_ID = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ToString(),
                                      BUSINESS_UNIT = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ToString(),
                                      DESCR = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR].ToString(),
                                      TWO_BIN_ALLOCATION = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.TWO_BIN_ALLOCATION].ToString()
                                      //DEF_PERCENTAGE_VALUE = dr[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DEF_PERCENTAGE_VALUE].ToString(),

                                  }).ToList();
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                List<MT_CRCT_TWO_BIN_ALLOCATION> lstSQLBins = _Repo.GetTwoBinCartsAllocation(bUnit, cartID);

                if (lstSQLBins != null && lstSQLBins.Count() == 0)
                {
                    lstERPBins.ToList().ForEach(x =>
                    {
                        x.CHK_VALUE = 0;
                        x.CHK_ALLOCATED = 0;
                    });

                }
                else if (lstSQLBins != null && lstSQLBins.Count() > 0)
                {
                    foreach (var item in lstSQLBins)
                    {
                        var isExists = lstERPBins.Where(c => c.BUSINESS_UNIT == item.BUSINESS_UNIT && c.CART_ID == item.CART_ID).FirstOrDefault();

                        if (isExists != null)
                        {
                            isExists.CHK_VALUE = 1;
                            isExists.CHK_ALLOCATED = 1;
                            isExists.TWO_BIN_ALLOCATION = item.TWO_BIN_ALLOCATION;
                            isExists.DEF_PERCENTAGE_VALUE = item.DEF_PERCENTAGE_VALUE;

                        }
                    }   

                }

                lstERPBins.ToList().Select((x, idx) => { x.ROWINDEX = idx; return x; });
                response.DataList = lstERPBins.OrderByDescending(x => x.TWO_BIN_ALLOCATION == "TRUE").ToList();
                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.StatType = AtParWebEnums.StatusType.Error;
                response.ExceptionMessage = ex.ToString();
                return response;
            }
        }

        #endregion
    }
}
