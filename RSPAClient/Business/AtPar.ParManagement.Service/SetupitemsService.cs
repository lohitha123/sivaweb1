#region Usings
using AtPar.Service.Interfaces.ParManagement;
using System;
using AtPar.Repository.Interfaces.ParManagement;
using log4net;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using System.Collections.Generic;
#endregion

namespace AtPar.ParManagement.Service
{
    public class SetupitemsService : ISetupItemsService
    {
        ISetupItemsRepository _setupItemsRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        public const string ITEM_ID_FIELD_NAME = "ITEM_ID";

        public SetupitemsService(ISetupItemsRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _setupItemsRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(SetupitemsService));
        }

        /// <summary>
        /// To Get items
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgId"></param>
        /// <param name="AppID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItems(string ItemID, string OrgId, string AppID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ITEM>();

            try
            {
                response.DataList = _setupItemsRepo.GetItems(ItemID, OrgId, AppID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        /// <summary>
        /// To Get the Item Details
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
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDetails(string ItemID, string Descr, string Vendor, string UPCcode, string Manf, string ItemPriceFrom, string ItemPriceTo, string CustItemID, string VendItemID, string ManfItemID, string Lot, string Serial, string Mode, bool status, string OrgGrpID, bool SubItems)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ITEM>();

            try
            {
                if (string.IsNullOrEmpty(ItemID))
                {
                    ItemID = "";
                }
                if (string.IsNullOrEmpty(Descr))
                {
                    Descr = "";
                }
                if (string.IsNullOrEmpty(Vendor))
                {
                    Vendor = "";
                }
                if (string.IsNullOrEmpty(UPCcode))
                {
                    UPCcode = "";
                }
                if (string.IsNullOrEmpty(Manf))
                {
                    Manf = "";
                }
                if (string.IsNullOrEmpty(ItemPriceFrom))
                {
                    ItemPriceFrom = "";
                }
                if (string.IsNullOrEmpty(ItemPriceTo))
                {
                    ItemPriceTo = "";
                }
                if (string.IsNullOrEmpty(CustItemID))
                {
                    CustItemID = "";
                }
                if (string.IsNullOrEmpty(ManfItemID))
                {
                    ManfItemID = "";
                }
                if (string.IsNullOrEmpty(VendItemID))
                {
                    VendItemID = "";
                }
                if (string.IsNullOrEmpty(Lot))
                {
                    Lot = "";
                }
                if (string.IsNullOrEmpty(Serial))
                {
                    Serial = "";
                }
                if (string.IsNullOrEmpty(Mode))
                {
                    Mode = "";
                }
                
                response.DataList = _setupItemsRepo.GetItemDetails(ItemID.ReplaceString(), Descr.ReplaceString(), Vendor.ReplaceString(), UPCcode.ReplaceString(), 
                                                                Manf.ReplaceString(), ItemPriceFrom, ItemPriceTo, CustItemID.ReplaceString(), VendItemID.ReplaceString(), 
                                                                ManfItemID.ReplaceString(), Lot, Serial, Mode, status, OrgGrpID.ReplaceString(), SubItems);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        /// <summary>
        /// To Get the Item UOM
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <param name="AppID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItemUOM(string ItemID, string OrgGrpID, string AppID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ITEM>();
            if (string.IsNullOrEmpty(ItemID))
            {
                ItemID = string.Empty;
            }
            try
            {
                response.DataList = _setupItemsRepo.GetItemUOM(ItemID.ReplaceString(), OrgGrpID, AppID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        /// <summary>
        /// To Get the Item Data to ADD or Update
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDataToAddOrUpdate(string ItemID, string OrgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ITEM>();

            try
            {
                response.DataList = _setupItemsRepo.GetItemDataToAddOrUpdate(ItemID, OrgGrpID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        /// <summary>
        /// To Get the Substitute Item Details
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="OrgGrpID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<PAR_MNGT_ITEM_SUBSTITUTE> GetSubstituteItemDetails(string ItemID, string OrgGrpID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ITEM_SUBSTITUTE>();

            try
            {
                response.DataList = _setupItemsRepo.GetSubstituteItemDetails(ItemID, OrgGrpID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        /// <summary>
        /// To Get the Pharmacy item Locations
        /// </summary>
        /// <param name="ItemID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<PAR_MNGT_PAR_LOC_DETAILS> GetPharmacyItemLocations(string ItemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_PAR_LOC_DETAILS>();

            try
            {
                response.DataList = _setupItemsRepo.GetPharmacyItemLocations(ItemID);

                if (response.DataList.Count.Equals(0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
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

        /// <summary>
        /// To Update the Item
        /// </summary>
        /// <param name="Item"></param>
        /// <returns></returns>
        public AtParWebApiResponse<PAR_MNGT_ITEM> UpdateItem(PAR_MNGT_ITEM Item)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ITEM>();

            try
            {
                long StatusCode = _setupItemsRepo.UpdateItem(Item);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
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

        /// <summary>
        /// To Insert the Item
        /// </summary>
        /// <param name="Item"></param>
        /// <returns></returns>
        public AtParWebApiResponse<PAR_MNGT_ITEM> InsertItem(PAR_MNGT_ITEM Item)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ITEM>();

            try
            {
                long StatusCode = _setupItemsRepo.IsItemExistOrNot(Item.ITEM_ID, Item.ORG_GROUP_ID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    StatusCode = _setupItemsRepo.InsertItem(Item);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

                    response.AtParSuccess();
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
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
        public AtParWebApiResponse<long> InsertSubstituteItem(string OrgGrpID, string ItemID, string SubItemID, string Priority, string ItemDescr, int Status, bool blnPharmItemAllocated, List<PAR_MNGT_PAR_LOC_DETAILS> PharmItemLocations)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            if (Priority == "null"||string.IsNullOrEmpty(Priority)|| Priority == "null"|| Priority== "undefined")
            {
                Priority = null;
            }

            try
            {
                long StatusCode = _setupItemsRepo.IsSubstituteItemExistOrNot(ItemID, SubItemID, OrgGrpID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log, SubItemID);
                    return response;
                }
                else
                {
                    StatusCode = _setupItemsRepo.InsertSubstituteItem(OrgGrpID, ItemID, SubItemID, Priority, ItemDescr, Status, blnPharmItemAllocated, PharmItemLocations);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }

                    response.AtParSuccess();
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        /// <summary>
        /// To Update the Substitute Item
        /// </summary>
        /// <param name="OrgGrpID"></param>
        /// <param name="ItemID"></param>
        /// <param name="SubItemID"></param>
        /// <param name="Status"></param>
        /// <param name="blnPharmItemAllocated"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateSubstituteItem(string OrgGrpID, string ItemID, string SubItemID, int Status, bool blnPharmItemAllocated)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _setupItemsRepo.UpdateSubstituteItem(OrgGrpID, ItemID, SubItemID, Status, blnPharmItemAllocated);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
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

        /// <summary>
        /// To Get the Latest Item ID
        /// </summary>
        /// <param name="appID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetLatestItemId(int appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.DataVariable = _commonRepo.GetAtparLatestValues(appID, ITEM_ID_FIELD_NAME);

                //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                //{
                //    response.AtParNotOK(StatusCode, _commonRepo, _log);
                //    return response;
                //}

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        /// <summary>
        /// To Update the Item status
        /// </summary>
        /// <param name="itemID"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> UpdateItemStaus(string itemID, int status)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _setupItemsRepo.UpdateItemStaus(itemID, status);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (StatusCode == AtparStatusCodes.CRCT_S_CANNOTINACTIVATE)
                    {
                        response.AtParNotOK(AtparStatusCodes.CRCT_S_ITEMCANNOTINACTIVATE, _commonRepo, _log);
                        return response;
                    }
                    else
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
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

    }
}
