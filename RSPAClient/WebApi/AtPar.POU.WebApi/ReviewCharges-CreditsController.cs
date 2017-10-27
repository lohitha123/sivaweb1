﻿using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class ReviewCharges_CreditsController : ApiController
    {
        #region Private Variable

        private ILog _log;
        private IReviewCharges_CreditsService _service;

        #endregion

        #region Constructor

        public ReviewCharges_CreditsController(ILog log, IReviewCharges_CreditsService service)
        {
            _log = log;
            _service = service;
            _log.SetLoggerType(typeof(ReviewCharges_CreditsController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<object> GetCredits(string fromDate, string toDate, string patientID, string examID,
                               string accountID, string deptID, string comments,
                               bool reviewed, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetCredits(fromDate, toDate, patientID, examID, accountID, deptID, comments, reviewed); ;
            return result;
        }

        [HttpGet]
        public AtParWebApiResponse<object> GetCharges(string fromDate, string toDate, string patientID, string examID,
                               string accountID, string deptID, string comments, int status,
                               int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.GetCharges(fromDate, toDate, patientID, examID, accountID, deptID, comments, status, appID); ;
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> SetReviewed(List<MT_POU_CHARGECAPTURE_HEADER> lstReviewed, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.SetReviewed(lstReviewed);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> InsertPouChargeCaptureDetails(string transactionID, string itemID, string itemDescription,
                                           string itemLotNumber, string itemSerialnumber, string itemChargeCode,
                                           string itemPrice, string lineNo, decimal pQty, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.InsertPouChargeCaptureDetails(transactionID, itemID, itemDescription, itemLotNumber,
                                                                itemSerialnumber, itemChargeCode, itemPrice, lineNo, pQty);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateCharges(long transID, Dictionary<string, dynamic> dicDataItems, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateCharges(transID, dicDataItems);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateCredits([FromBody] Dictionary<string, dynamic> dicDataItems, [FromUri] string[] deviceTokenEntry)
        {
            var result = _service.UpdateCredits(dicDataItems, deviceTokenEntry);
            return result;
        }

        #endregion

    }
}
