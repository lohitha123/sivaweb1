#region Usings
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Web.Http;
#endregion

namespace AtPar.Init.WebApi
{
    [RoutePrefix("api/CarrierInformation")]
    public class CarrierInformationController : ApiController
    {
        #region Private Variable

        private ICarrierInformationService _carrierInformationService;
        private ILog _log;

        #endregion

        #region Constructor

        public CarrierInformationController(ICarrierInformationService carrierInformationService, ILog log)
        {
            _carrierInformationService = carrierInformationService;
            _log = log;
            _log.SetLoggerType(typeof(CarrierInformationController));
        }

        #endregion

        #region  Public Methods

        /// <summary>
        /// To Get the Carriers from the ERP
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<long> GetCarriers(string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _carrierInformationService.GetCarriers(userID, deviceTokenEntry);
            return result;
        }

        /// <summary>
        /// To Get the Carriers from MT_RECV_CARRIER Table
        /// </summary>
        /// <returns></returns>
        [Route("GetCarriersData")]
        [HttpGet]
        public AtParWebApiResponse<MT_RECV_CARRIER> GetCarriersData([FromUri] string[] deviceTokenEntry)
        {
            var result = _carrierInformationService.GetCarriersData();
            return result;
        }

        /// <summary>
        /// To Insert the Carrier
        /// </summary>
        /// <param name="carrierID"></param>
        /// <param name="descr"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> AddCarrier(string carrierID, string descr, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _carrierInformationService.AddCarrier(carrierID, descr, userID);
            return result;
        }

        /// <summary>
        /// To Delete the carrier(Updating the Status to D)
        /// </summary>
        /// <param name="carrierID"></param>
        /// <param name="descr"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> DeleteCarrier(string carrierID, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _carrierInformationService.DeleteCarrier(carrierID, userID);
            return result;
        }

        #endregion
    }
}
