using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.StockIssue;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.StockIssue.WebApi
{
    public class DistributionTypesController : ApiController
    {
        #region Private Variable

        private IDistributionTypesService _Service;
        private ILog _log;

        #endregion

        #region Constructor

        public DistributionTypesController(IDistributionTypesService service, ILog log)
        {
            _Service = service;
            _log = log;
            _log.SetLoggerType(typeof(DistributionTypesController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_STIS_DISTRIB_TYPE> GetDistributionTypes(string distributionType, string userID, string orgGroupID,
                                                                              [FromUri] string[] deviceTokenEntry)
        {
            var result = _Service.GetDistributionTypes(distributionType, userID, orgGroupID, deviceTokenEntry);
            return result;
        }

        [HttpPost]
        public AtParWebApiResponse<MT_STIS_DISTRIB_TYPE> AllocateDistributionTypes([FromBody] List<MT_STIS_DISTRIB_TYPE> lstDistAllocation, string loginUserID,
                                                                                    string selectedUserID, bool searched, [FromUri] string[] deviceTokenEntry)
        {            
            var result = _Service.AllocateDistributionTypes(loginUserID, selectedUserID, lstDistAllocation, searched, deviceTokenEntry);
            return result;
        }

        #endregion

    }
}
