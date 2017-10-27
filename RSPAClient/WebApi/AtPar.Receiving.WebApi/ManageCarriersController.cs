#region Usings
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.Receiving;
using log4net;
using System;
using System.Web.Http;
#endregion

namespace AtPar.Receiving.WebApi
{
    public class ManageCarriersController : ApiController
    {
        #region Private Variable

        private IManageCarriersService _manageCarriersService;
        private ICommonService _commonService;
        private ILog _log;

        #endregion

        #region Constructor

        public ManageCarriersController(IManageCarriersService manageCarriersService, ICommonService commonService, ILog log)
        {
            _manageCarriersService = manageCarriersService;
            _log = log;
            _commonService = commonService;
            _log.SetLoggerType(typeof(ManageCarriersController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// To Get the Carriers Data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_RECV_MANAGE_CARRIERS> GetCarriersData(string search, [FromUri] string[] deviceTokenEntry)
        {

            var result = _manageCarriersService.GetCarriersData(search);

            return result;

        }

        /// <summary>
        /// To Insert or Update the Carriers Data
        /// </summary>
        /// <param name="mode"></param>
        /// <param name="searchString"></param>
        /// <param name="startPosition"></param>
        /// <param name="carrier"></param>
        /// <param name="status"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> UpdateCarriers(string mode, string searchString, string startPosition, string carrier, int status, [FromUri] string[] deviceTokenEntry)
        {
 
                var result = _manageCarriersService.UpdateCarriers(mode, searchString, startPosition, carrier, status, deviceTokenEntry);
                
                return result;

        }

        #endregion
    }
}
