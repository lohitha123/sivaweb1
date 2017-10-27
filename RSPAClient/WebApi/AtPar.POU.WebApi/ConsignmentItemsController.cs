using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class ConsignmentItemsController : ApiController
    {
        #region Private Variable

        private IConsignmentItemsService _consignmentItemsService;
        private ILog _log;

        #endregion

        #region Constructor

        public ConsignmentItemsController(IConsignmentItemsService consignmentItemsService, ILog log)
        {
            _consignmentItemsService = consignmentItemsService;
            _log = log;
            _log.SetLoggerType(typeof(ConsignmentItemsController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// To Get the User Departments
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGroupID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_MT_POU_DEPT> GetUserDepartments(string userID, string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
                var result = _consignmentItemsService.GetUserDepartments(userID, orgGroupID);
                return result;
        }

        /// <summary>
        /// To get the user Department Carts
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="locationType"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_MT_POU_DEPT_CARTS> GetUserdepartmentsCarts(string userID, string orgGrpID, [FromUri] string[] deviceTokenEntry, string locationType = "" )
        {
                var result = _consignmentItemsService.GetUserdepartmentsCarts(userID, orgGrpID, locationType);
                return result;
        }

        /// <summary>
        /// To get the consignment Items
        /// </summary>
        /// <param name="businessUnit"></param>
        /// <param name="cartID"></param>
        /// <param name="itemID"></param>
        /// <param name="itemDescription"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_POU_NONCART_ITEMS> GetConsignmentItems(string businessUnit, string cartID, string itemID, string itemDescription, [FromUri] string[] deviceTokenEntry)
        {    
                var result = _consignmentItemsService.GetConsignmentItems(businessUnit, cartID, itemID, itemDescription);
                return result;
        }

        /// <summary>
        /// To Add the consignment Item
        /// </summary>
        /// <param name="lstConsignmentItems"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> AddConsignmentItem(List<VM_CONSIGNMENT_ITEM_TABLE> lstConsignmentItems, [FromUri] string[] deviceTokenEntry)
        {
                var result = _consignmentItemsService.AddConsignmentItem(lstConsignmentItems);
                return result;
        }

        /// <summary>
        /// To Update the Consignment Item
        /// </summary>
        /// <param name="lstConsignmentItems"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> UpdateConsignmentItem(List<VM_CONSIGNMENT_ITEM_TABLE> lstConsignmentItems, [FromUri] string[] deviceTokenEntry)
        {           
               var result = _consignmentItemsService.UpdateConsignmentItem(lstConsignmentItems);
               return result;
        }

        /// <summary>
        /// To get the Preference List Details
        /// </summary>
        /// <param name="prefID"></param>
        /// <param name="procID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC> GetPrefListDetails(string prefID, [FromUri] string[] deviceTokenEntry, string procID = "" )
        {
              var result = _consignmentItemsService.GetPrefListDetails(prefID, procID);
              return result;
        }

        /// <summary>
        /// To Get the Items Adjustment Quantity
        /// </summary>
        /// <param name="bUnit"></param>
        /// <param name="cartID"></param>
        /// <param name="itemID"></param>
        /// <param name="compartment"></param>
        /// <param name="userID"></param>
        /// <param name="orgGrpID"></param>
        /// <param name="systemID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<VM_INVENTORY_CART_ITEMS> GetItemsAdjustQty(string bUnit, string cartID, string itemID, string compartment, string userID, string orgGrpID, string systemID, [FromUri] string[] deviceTokenEntry)
        {
               var result = _consignmentItemsService.GetItemsAdjustQty(bUnit, cartID, itemID, compartment, userID, orgGrpID, systemID);
               return result;    
        }

        /// <summary>
        /// To Update the Cart Inventory
        /// </summary>
        /// <param name="lstCartInvItemList"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> UpdateCartInventory(List<VM_INVENTORY_ITEMS_TABLE> lstCartInvItemList, [FromUri] string[] deviceTokenEntry)
        {
            var result = _consignmentItemsService.UpdateCartInventory(lstCartInvItemList);
            return result;           
        }

        #endregion
    }
}
