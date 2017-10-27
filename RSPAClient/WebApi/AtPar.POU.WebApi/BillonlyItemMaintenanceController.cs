using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using log4net;
using System.Web.Http;
using AtPar.ViewModel;

namespace AtPar.POU.WebApi
{
    public class BillonlyItemMaintenanceController : ApiController
    {
        #region Private Variable

        private ILog _log;
        private IBillOnlyItemMaintenanceService _billOnlyItemsservice;

        #endregion

        #region Constructor

        public BillonlyItemMaintenanceController(ILog log, IBillOnlyItemMaintenanceService billOnlyItemsservice)
        {
            _log = log;
            _billOnlyItemsservice = billOnlyItemsservice;
             _log.SetLoggerType(typeof(BillonlyItemMaintenanceController));
        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_POU_BILLONLY_ITEMS> GetAllBillOnlyItems([FromUri] string[] deviceTokenEntry)
        {            
               var result = _billOnlyItemsservice.GetAllBillOnlyItems();               
               return result;          
        }

        [HttpGet]
        public AtParWebApiResponse<MT_POU_BILLONLY_ITEMS> GetBillonlyItemsDtls(string itemID, string orgGrpID, string deptID, string descr, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _billOnlyItemsservice.GetBillonlyItemsDtls(itemID, orgGrpID, deptID, descr);                
                return result;           
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateBillonlyItemsDtls([FromBody] List<MT_POU_BILLONLY_ITEMS> lstBillOnlyItems, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _billOnlyItemsservice.UpdateBillonlyItemsDtls(lstBillOnlyItems);              
                return result;            
        }

        [HttpGet]
        public AtParWebApiResponse<VM_ATPAR_POU_LOCATIONS> GetLocations(int appID, string orgID, string userID, string deptID, [FromUri] string[] deviceTokenEntry)
        {            
                var result = _billOnlyItemsservice.GetLocations(appID, orgID, userID, deptID);              
                return result;            
        }

        [HttpGet]
        public AtParWebApiResponse<string> GetInventoryBUnits(string userID, [FromUri] string[] deviceTokenEntry)
        {           
                var result = _billOnlyItemsservice.GetInventoryBUnits(userID);               
                return result;            
        }

        [HttpGet]
        public AtParWebApiResponse<string> GetCostCenterOrgIds(string userID, [FromUri] string[] deviceTokenEntry)
        {
                var result = _billOnlyItemsservice.GetCostCenterOrgIds(userID);                
                return result;            
        }

        [HttpPost]
        public AtParWebApiResponse<long> ConvertBillonlyItem([FromBody] List<VM_MT_POU_BILLONLY_ITEMS> lstBillOnlyItems, [FromUri] string[] deviceTokenEntry)
        {
              var result = _billOnlyItemsservice.ConvertBillonlyItem(lstBillOnlyItems);
              return result;
        }

        #endregion
    }
}
