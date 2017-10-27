#region Usings
using AtPar.Common;
using AtPar.ParManagement.Service;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.ParManagement;
using log4net;
using System;
using System.Collections.Generic;
using System.Web.Http;
#endregion

namespace AtPar.ParManagement.WebApi
{
    public class SetupItemsController : ApiController
    {
        #region Private Variable

        private ISetupItemsService _setupItemsService;
        private ILog _log;

        #endregion

        #region Constructor

        public SetupItemsController(SetupitemsService setupItemsService, ILog log)
        {
            _setupItemsService = setupItemsService;
            _log = log;
            _log.SetLoggerType(typeof(SetupItemsController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// To Get the Items
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgId"></param>
        /// <param name="AppID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItems(string ItemID, string OrgId, string AppID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.GetItems(ItemID, OrgId, AppID);
            return result;

        }

        /// <summary>
        /// To Get the item Details
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="Descr"></param>
        /// <param name="Vendor"></param>
        /// <param name="UPCcode"></param>
        /// <param name="Manf"></param>
        /// <param name="ItemPriceFrom"></param>
        /// <param name="ItemPriceTo"></param>
        /// <param name="CustItemID"></param>
        /// <param name="VendItemID"></param>
        /// <param name="ManfItemID"></param>
        /// <param name="Lot"></param>
        /// <param name="Serial"></param>
        /// <param name="Mode"></param>
        /// <param name="status"></param>
        /// <param name="OrgGrpID"></param>
        /// <param name="SubItems"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDetails(string ItemID, string Descr, string Vendor, string UPCcode, string Manf, string ItemPriceFrom, string ItemPriceTo, string CustItemID, string VendItemID, string ManfItemID, string Lot, string Serial, string Mode, bool status, string OrgGrpID, bool SubItems, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.GetItemDetails(ItemID, Descr, Vendor, UPCcode, Manf, ItemPriceFrom, ItemPriceTo, CustItemID, VendItemID, ManfItemID, Lot, Serial, Mode, status, OrgGrpID, SubItems);
            return result;
        }

        /// <summary>
        /// To Get the Item UOM
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <param name="AppID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItemUOM(string ItemID, string OrgGrpID, string AppID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.GetItemUOM(ItemID, OrgGrpID, AppID);
            return result;

        }

        /// <summary>
        /// Get the Item Data to Add or Update
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDataToAddOrUpdate(string ItemID, string OrgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.GetItemDataToAddOrUpdate(ItemID, OrgGrpID);
            return result;
        }

        /// <summary>
        /// To Get the Substitute Item Details
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_ITEM_SUBSTITUTE> GetSubstituteItemDetails(string ItemID, string OrgGrpID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.GetSubstituteItemDetails(ItemID, OrgGrpID);
            return result;

        }

        /// <summary>
        /// To Get the Pharmacy Item Locations
        /// </summary>
        /// <param name="ItemID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<PAR_MNGT_PAR_LOC_DETAILS> GetPharmacyItemLocations(string ItemID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.GetPharmacyItemLocations(ItemID);
            return result;

        }

        /// <summary>
        /// To Update the Item
        /// </summary>
        /// <param name="Item"></param>
        /// <returns></returns>
        [HttpPut]
        public AtParWebApiResponse<PAR_MNGT_ITEM> UpdateItem(PAR_MNGT_ITEM Item, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.UpdateItem(Item);
            return result;

        }

        /// <summary>
        /// To update the Substitute Item
        /// </summary>
        /// <param name="OrgGrpID"></param>
        /// <param name="ItemID"></param>
        /// <param name="SubItemID"></param>
        /// <param name="Status"></param>
        /// <param name="blnPharmItemAllocated"></param>
        /// <returns></returns>
        [HttpPut]
        public AtParWebApiResponse<long> UpdateSubstituteItem(string OrgGrpID, string ItemID, string SubItemID, int Status, bool blnPharmItemAllocated, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.UpdateSubstituteItem(OrgGrpID, ItemID, SubItemID, Status, blnPharmItemAllocated);
            return result;

        }

        /// <summary>
        /// To Insert the Item
        /// </summary>
        /// <param name="Item"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<PAR_MNGT_ITEM> InsertItem(PAR_MNGT_ITEM Item, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.InsertItem(Item);
            return result;

        }

        /// <summary>
        /// To Insert the Substitute Item
        /// </summary>
        /// <param name="OrgGrpID"></param>
        /// <param name="ItemID"></param>
        /// <param name="SubItemID"></param>
        /// <param name="Priority"></param>
        /// <param name="ItemDescr"></param>
        /// <param name="Status"></param>
        /// <returns></returns>
        [HttpPost]
        public AtParWebApiResponse<long> InsertSubstituteItem(string OrgGrpID, string ItemID, string SubItemID, string Priority, string ItemDescr, int Status, bool blnPharmItemAllocated, List<PAR_MNGT_PAR_LOC_DETAILS> PharmItemLocations, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.InsertSubstituteItem(OrgGrpID, ItemID, SubItemID, Priority, ItemDescr, Status, blnPharmItemAllocated, PharmItemLocations);
            return result;

        }

        /// <summary>
        /// To Get the Latest Item ID
        /// </summary>
        /// <param name="appID"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<long> GetLatestItemId(int appID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.GetLatestItemId(appID);
            return result;

        }

        /// <summary>
        /// To Update the Item Status
        /// </summary>
        /// <param name="itemID"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpPut]
        public AtParWebApiResponse<long> UpdateItemStaus(string itemID, int status, [FromUri] string[] deviceTokenEntry)
        {
            var result = _setupItemsService.UpdateItemStaus(itemID, status);
            return result;
        }

        #endregion

    }
}
