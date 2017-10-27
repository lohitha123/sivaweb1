using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.ParManagement;
using AtPar.Service.Interfaces.ParManagement;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ParManagement.Service
{
    public class SetupInventoryService : ISetupInventoryService
    {
        ISetupInventoryRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public SetupInventoryService(ISetupInventoryRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _Repo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(SetupInventoryService));
        }

        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDetails(string orgID, string orgGroupID, string itemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ITEM>();
            string orgGroupIDFromDB = string.Empty;


            try
            {

                orgGroupIDFromDB = _Repo.GetMasterOrgGroupID(orgID);

                if (orgGroupIDFromDB == "Select One" || string.IsNullOrEmpty(orgGroupIDFromDB))
                {
                    orgGroupIDFromDB = orgGroupID;
                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " :Value of ORG_GROUP_ID: " + orgGroupIDFromDB); }

                response.DataList = _Repo.GetItemDetails(orgGroupID, itemID);

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

        public AtParWebApiResponse<PAR_MNGT_ITEM> GetItemDetailsForAutoComplete(string orgID, string orgGroupID, string itemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<PAR_MNGT_ITEM>();
            string orgGroupIDFromDB = string.Empty;


            try
            {

                orgGroupIDFromDB = _Repo.GetMasterOrgGroupID(orgID);

                if (orgGroupIDFromDB == "Select One" || string.IsNullOrEmpty(orgGroupIDFromDB))
                {
                    orgGroupIDFromDB = orgGroupID;
                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " :Value of ORG_GROUP_ID: " + orgGroupIDFromDB); }

                response.DataList = _Repo.GetItemDetailsForAutoComplete(orgGroupID, itemID);

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

        public AtParWebApiResponse<long> UpdateOrgItemStatus(string orgID, string itemID, string uom, string dfltStorLoc,
                                                             string altStorloc1, string altStorLoc2, string status)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            string orgGroupIDFromDB = string.Empty;


            try
            {
                long StatusCode = _Repo.CheckItemHasLocationsOrNot(orgID, itemID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                // Change Status for dfltStorLoc
                StatusCode = _Repo.ChangeStatus(orgID, itemID, uom, dfltStorLoc, status);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                // Change Status for altStorLoc1
                if (!string.IsNullOrEmpty(altStorloc1))
                {
                    StatusCode = _Repo.ChangeStatus(orgID, itemID, uom, altStorloc1, status);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
                }

                // Change Status for altStorLoc2
                if (!string.IsNullOrEmpty(altStorLoc2))
                {
                    StatusCode = _Repo.ChangeStatus(orgID, itemID, uom, altStorLoc2, status);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
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

        public AtParWebApiResponse<long> InsertInventoryItems(MT_ATPAR_PHYSICAL_INVENTORY inventory, string altStorLoc1, string altStorLoc2,
                                                              string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            string orgGroupIDFromDB = string.Empty;


            try
            {
                int count = _Repo.IsItemExistInItemMaster(inventory.INV_ITEM_ID);

                if (count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                else if (count > 0)
                {
                    orgGroupIDFromDB = _Repo.GetMasterOrgGroupID(inventory.ORG_ID);

                    if (orgGroupIDFromDB == "Select One" || string.IsNullOrEmpty(orgGroupIDFromDB))
                    {
                        orgGroupIDFromDB = orgGroupID;
                    }

                    int itemCount = _Repo.IsItemExistInItemMasterForOrgGroup(inventory.INV_ITEM_ID, orgGroupID);
                    if (itemCount == 0)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }

                }

                int invetoryItemCount = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID,
                                                inventory.UOM, string.Empty, string.Empty, string.Empty);

                if (invetoryItemCount > 0)
                {
                    response.AtParNotOK(AtparStatusCodes.ATPAR_E_ALREADY_EXISTS, _commonRepo, _log, inventory.INV_ITEM_ID);
                    return response;
                }

                // Inserting Default Storage Location
                long StatusCode = _Repo.InsertStorLocDtls(inventory, inventory.STOR_LOC, "Y");
                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                // Inserting Alt Storage Location1
                if (!string.IsNullOrEmpty(altStorLoc1))
                {
                    StatusCode = _Repo.InsertStorLocDtls(inventory, altStorLoc1, "N");
                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
                }

                // Inserting Alt Storage Location2
                if (!string.IsNullOrEmpty(altStorLoc2))
                {
                    StatusCode = _Repo.InsertStorLocDtls(inventory, altStorLoc2, "N");
                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
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

        public AtParWebApiResponse<long> UpdateInventoryItems(MT_ATPAR_PHYSICAL_INVENTORY inventory, string oldUOM, string oldDfltStorLoc,
                                 string altStorLoc1, string oldAltStorLoc1, string altStorLoc2, string oldAltStorLoc2, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = -1;

            try
            {
                // to do need to check this against existing code pStatus = 1
                if (inventory.STATUS == true)
                {
                    StatusCode = _Repo.CheckItemHasLocationsOrNot(inventory.ORG_ID, inventory.INV_ITEM_ID);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
                }


                if (((oldUOM != inventory.UOM)
                                && ((oldDfltStorLoc != inventory.STOR_LOC)
                                && ((oldAltStorLoc1 != altStorLoc1)
                                && (oldAltStorLoc2 != altStorLoc2)))))
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":When all the storage locations and uom are changed:"); }

                    int count = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                                    inventory.STOR_LOC, altStorLoc1, altStorLoc2);

                    if (count == 0)
                    {
                        StatusCode = _Repo.UpdateStorLocDtls(inventory, oldDfltStorLoc, inventory.STOR_LOC, oldUOM);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                        StatusCode = _Repo.UpdateStorLocDtls(inventory, oldAltStorLoc1, altStorLoc1, oldUOM);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                        StatusCode = _Repo.UpdateStorLocDtls(inventory, oldAltStorLoc2, altStorLoc2, oldUOM);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.E_ITEMEXISTS, _commonRepo, _log);
                        return response;
                    }


                }
                else if ((oldUOM != inventory.UOM)
                        && ((oldDfltStorLoc != inventory.STOR_LOC)
                        && (oldAltStorLoc1 != altStorLoc1)))
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":When two storage locations and uom are changed :"); }

                    int count = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                                    inventory.STOR_LOC, altStorLoc1, string.Empty);

                    if (count == 0)
                    {

                        StatusCode = _Repo.UpdateStorLocDtls(inventory, oldDfltStorLoc, inventory.STOR_LOC, oldUOM);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                        StatusCode = _Repo.UpdateStorLocDtls(inventory, oldAltStorLoc1, altStorLoc1, oldUOM);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                        StatusCode = _Repo.UpdateInvItmData(inventory, oldDfltStorLoc, oldUOM, oldAltStorLoc1, oldAltStorLoc2);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }


                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.E_ITEMEXISTS, _commonRepo, _log);
                        return response;
                    }
                }
                else if ((oldUOM != inventory.UOM) && (oldDfltStorLoc != inventory.STOR_LOC))
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":When one storage location and uom are changed :"); }

                    int count = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                                    inventory.STOR_LOC, string.Empty, string.Empty);

                    if (count == 0)
                    {
                        StatusCode = _Repo.UpdateInvItmData(inventory, oldDfltStorLoc, oldUOM, oldAltStorLoc1, oldAltStorLoc2);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                        StatusCode = _Repo.UpdateStorLocDtls(inventory, oldDfltStorLoc, inventory.STOR_LOC, inventory.UOM);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.E_ITEMEXISTS, _commonRepo, _log);
                        return response;
                    }
                }
                else if (oldUOM != inventory.UOM && (oldAltStorLoc1 != altStorLoc1))
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":When alternate storage location1 and uom are changed :"); }

                    int count = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                                    string.Empty, altStorLoc1, string.Empty);

                    if (count == 0)
                    {
                        StatusCode = _Repo.UpdateInvItmData(inventory, oldDfltStorLoc, oldUOM, oldAltStorLoc1, oldAltStorLoc2);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                        StatusCode = _Repo.UpdateStorLocDtls(inventory, oldAltStorLoc1, altStorLoc1, inventory.UOM);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.E_ITEMEXISTS, _commonRepo, _log);
                        return response;
                    }
                }
                else if (oldUOM != inventory.UOM && (oldAltStorLoc2 != altStorLoc2))
                {
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":When alternate storage location2 and uom are changed :"); }

                    int count = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                                    string.Empty, string.Empty, altStorLoc2);

                    if (count == 0)
                    {
                        StatusCode = _Repo.UpdateInvItmData(inventory, oldDfltStorLoc, oldUOM, oldAltStorLoc1, oldAltStorLoc2);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                        StatusCode = _Repo.UpdateStorLocDtls(inventory, oldAltStorLoc2, altStorLoc1, inventory.UOM);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.E_ITEMEXISTS, _commonRepo, _log);
                        return response;
                    }
                }
                else
                {
                    // different
                    if ((!string.IsNullOrEmpty(inventory.STOR_LOC)) && (!string.IsNullOrEmpty(oldDfltStorLoc)))
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":Checking for Default storage location existence:"); }

                        if (oldDfltStorLoc != inventory.STOR_LOC)
                        {
                            int count = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, oldUOM,
                                                                   oldDfltStorLoc, string.Empty, string.Empty);

                            if (count == 1)
                            {
                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":Checking for New Default storage location existence:"); }


                                int cnt = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                                   inventory.STOR_LOC, string.Empty, string.Empty);

                                if (cnt == 0)
                                {
                                    StatusCode = _Repo.UpdateStorLocDtls(inventory, oldDfltStorLoc, inventory.STOR_LOC, oldUOM);
                                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                    {
                                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                                        return response;
                                    }
                                }
                            }
                        }
                    }


                    if (!string.IsNullOrEmpty(oldAltStorLoc1))
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":Checking for alternate location1 existence:"); }

                        int count = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, oldUOM,
                                                                   string.Empty, oldAltStorLoc1, string.Empty);

                        if (count == 1)
                        {
                            if (altStorLoc1 != oldAltStorLoc1)
                            {
                                if ((!string.IsNullOrEmpty(altStorLoc1)) && (!string.IsNullOrEmpty(oldAltStorLoc1)))
                                {
                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":Checking for New alternate location1 existence:"); }

                                    int cnt = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                                  string.Empty, altStorLoc1, string.Empty);

                                    if (cnt == 0)
                                    {
                                        StatusCode = _Repo.UpdateStorLocDtls(inventory, oldAltStorLoc1, altStorLoc1, oldUOM);
                                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                        {
                                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                                            return response;
                                        }
                                    }
                                }
                                else if ((string.IsNullOrEmpty(altStorLoc1)) && (!string.IsNullOrEmpty(oldAltStorLoc1)))
                                {
                                    StatusCode = _Repo.DelStorLocDtls(inventory, oldAltStorLoc1, oldUOM);
                                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                    {
                                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                                        return response;
                                    }
                                }
                            }

                        }

                    }
                    else if (string.IsNullOrEmpty(oldAltStorLoc1))
                    {
                        if ((!string.IsNullOrEmpty(altStorLoc1)) && (string.IsNullOrEmpty(oldAltStorLoc1)))
                        {
                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":Checking for New alternate location1 existence to insert when old value is empty:"); }

                            int count = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                                  string.Empty, altStorLoc1, string.Empty);

                            if (count == 0)
                            {
                                StatusCode = _Repo.InsertStorLocDtls(inventory, altStorLoc1, "N");
                                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                                    return response;
                                }
                            }
                        }
                    }

                    if (!string.IsNullOrEmpty(oldAltStorLoc2))
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":Checking for alternate location2 existence:"); }

                        int count = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, oldUOM,
                                                              string.Empty, string.Empty, oldAltStorLoc2);

                        if (count == 1)
                        {
                            if (altStorLoc2 != oldAltStorLoc2)
                            {
                                if ((!string.IsNullOrEmpty(altStorLoc2)) && (!string.IsNullOrEmpty(oldAltStorLoc2)))
                                {
                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":Checking for New alternate location1 existence:"); }

                                    int cnt = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                              string.Empty, string.Empty, altStorLoc2);

                                    if (cnt == 0)
                                    {
                                        StatusCode = _Repo.UpdateStorLocDtls(inventory, oldAltStorLoc2, altStorLoc2, oldUOM);
                                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                        {
                                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                                            return response;
                                        }
                                    }
                                }
                                else if ((string.IsNullOrEmpty(altStorLoc2)) && (!string.IsNullOrEmpty(oldAltStorLoc2)))
                                {
                                    StatusCode = _Repo.DelStorLocDtls(inventory, oldAltStorLoc2, oldUOM);
                                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                    {
                                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                                        return response;
                                    }
                                }
                            }

                        }
                    }
                    else if (string.IsNullOrEmpty(oldAltStorLoc2))
                    {
                        if ((!string.IsNullOrEmpty(altStorLoc2)) && (string.IsNullOrEmpty(oldAltStorLoc2)))
                        {
                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":Checking for New alternate location2 existence to insert when old value is empty:"); }

                            int cnt = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                              string.Empty, string.Empty, altStorLoc2);

                            if (cnt == 0)
                            {
                                StatusCode = _Repo.InsertStorLocDtls(inventory, altStorLoc2, "N");
                                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                                    return response;
                                }
                            }

                        }
                    }

                    //When all the Storage Locations are same :
                    if ((oldDfltStorLoc == inventory.STOR_LOC) && (oldAltStorLoc1 == altStorLoc1) && (oldAltStorLoc2 == altStorLoc2))
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":Checking for Item existence when all the storage locations are same:"); }



                        if (oldUOM != inventory.UOM)
                        {
                            int cnt = _Repo.CheckItemExistence(inventory.ORG_ID, inventory.INV_ITEM_ID, inventory.UOM,
                                                               string.Empty, string.Empty, string.Empty);

                            if (cnt == 0)
                            {
                                StatusCode = _Repo.UpdateInvItmData(inventory, oldDfltStorLoc, oldUOM, oldAltStorLoc1, oldAltStorLoc2);
                                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                                    return response;
                                }
                            }
                            else
                            {
                                response.AtParNotOK(AtparStatusCodes.E_ITEMEXISTS, _commonRepo, _log);
                                return response;
                            }
                        }
                        else
                        {
                            StatusCode = _Repo.UpdateInvItmData(inventory, oldDfltStorLoc, oldUOM, oldAltStorLoc1, oldAltStorLoc2);
                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                response.AtParNotOK(StatusCode, _commonRepo, _log);
                                return response;
                            }
                        }
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


        public AtParWebApiResponse<VM_INVENTORY_ITEM_DETAILS> GetExistingItemDetails(string orgID, string orgGroupID, string itemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_INVENTORY_ITEM_DETAILS>();
            string orgGroupIDFromDB = string.Empty;

            try
            {
                response.DataList = _Repo.GetExistingItemDetails(orgID, orgGroupID, itemID);

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
    }
}
