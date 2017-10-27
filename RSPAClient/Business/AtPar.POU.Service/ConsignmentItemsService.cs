using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POU.Service
{
    public class ConsignmentItemsService : IConsignmentItemsService
    {
        IConsignmentItemsRepository _consignmentItemsRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonPOUService _commonPOUService;

        public ConsignmentItemsService(IConsignmentItemsRepository repository, ILog log, ICommonRepository commonRepository, ICommonPOUService commonPOUService)
        {
            _consignmentItemsRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonPOUService = commonPOUService;
            _log.SetLoggerType(typeof(DepartmentDeviceAllocationService));
        }

        public AtParWebApiResponse<VM_MT_POU_DEPT> GetUserDepartments(string userID, string orgGroupID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_POU_DEPT>();

            try
            {
                response.DataList = _consignmentItemsRepo.GetUserDepartments(userID, orgGroupID);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<VM_MT_POU_DEPT_CARTS> GetUserdepartmentsCarts(string userID, string orgGrpID, string locationType = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_MT_POU_DEPT_CARTS>();

            try
            {
                response.DataList = _consignmentItemsRepo.GetUserdepartmentsCarts(userID, orgGrpID, locationType);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<MT_POU_NONCART_ITEMS> GetConsignmentItems(string businessUnit, string cartID, string itemID, string itemDescription)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_NONCART_ITEMS>();
            if (itemID == null)
            {
                itemID = string.Empty;
            }
            if (itemDescription == null)
            {
                itemDescription = string.Empty;
            }
            try
            {
                response.DataList = _consignmentItemsRepo.GetConsignmentItems(businessUnit, cartID, itemID, itemDescription);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> AddConsignmentItem(List<VM_CONSIGNMENT_ITEM_TABLE> lstConsignmentItems)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _consignmentItemsRepo.AddConsignmentItem(lstConsignmentItems);

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

        public AtParWebApiResponse<long> UpdateConsignmentItem(List<VM_CONSIGNMENT_ITEM_TABLE> lstConsignmentItems)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _consignmentItemsRepo.UpdateConsignmentItem(lstConsignmentItems);

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

        public AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC> GetPrefListDetails(string prefID, string procID = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_PREF_LIST_ALLOC>();

            try
            {
                response.DataList = _commonRepo.GetPrefListDetails(prefID, procID);

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                    return response;
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<VM_INVENTORY_CART_ITEMS> GetItemsAdjustQty(string bUnit, string cartID, string itemID, string compartment, string userID, string orgGrpID, string systemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_INVENTORY_CART_ITEMS>();
            DataSet cartDetailsDS = new DataSet();
            DataTable dtCartDetails = new DataTable();
            StringBuilder sbSearch = new StringBuilder();
            DataRow[] selRows;
            List<VM_INVENTORY_CART_ITEMS> lstRet = new List<VM_INVENTORY_CART_ITEMS>(); ;
            List<MT_POU_NONCART_ITEMS> lstNonCartItems = null;
            long statusCode = -1;
            try
            {
                string locType = _commonRepo.GetLocationType(bUnit, cartID);

                var tupleCartDetails = _commonPOUService.GetCartDetails(cartID, bUnit, cartDetailsDS, orgGrpID, systemID, "", locType);
                statusCode = tupleCartDetails.Item1;
                cartDetailsDS = tupleCartDetails.Item2;

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (statusCode != AtparStatusCodes.E_NORECORDFOUND)
                    {
                        response.AtParNotOK(statusCode, _commonRepo, _log);
                        return response;
                    }
                }

                if (cartDetailsDS != null)
                {
                    if (cartDetailsDS.Tables.Count > 0)
                    {
                        cartDetailsDS.Tables[1].TableName = "Details";

                        if (cartDetailsDS.Tables["Details"].Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].DataType.ToString() != System.Type.GetType("System.String").ToString())
                        {
                            // To be verified
                            //statusCode = ConvertColumnType(cartDetailsDS);

                            if (statusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                response.AtParNotOK(statusCode, _commonRepo, _log);
                                return response;
                            }
                        }

                        dtCartDetails = cartDetailsDS.Tables["Details"];

                        sbSearch.Remove(0, sbSearch.Length);

                        if (itemID.Length > 0)
                        {
                            sbSearch.Append("[" + dtCartDetails.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName + "] = '" + itemID + "'");
                            sbSearch.Append(" AND [" + dtCartDetails.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ColumnName + "] = '" + compartment.HandleNull().substituteString() + "'");
                        }

                        selRows = dtCartDetails.Select(sbSearch.ToString());

                        if (selRows.Length > 0)
                        {
                            foreach (DataRow selRow in selRows)
                            {
                                VM_INVENTORY_CART_ITEMS lstItem = new VM_INVENTORY_CART_ITEMS();
                                lstItem.CART_ID = cartID;
                                lstItem.BUSINESS_UNIT = bUnit;
                                lstItem.ITEM_ID = selRow[AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID.ToString()].ToString();
                                lstItem.ITEM_DESCRIPTION = selRow[AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR.ToString()].ToString();
                                lstItem.LOT_C0NTROLLED = selRow[AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED.ToString()].ToString();
                                lstItem.SERIAL_CONTROLLED = selRow[AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED.ToString()].ToString();
                                lstItem.COMPARTMENT = selRow[AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT.ToString()].ToString();
                                lstItem.OPT_QTY = selRow[AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY.ToString()].ToString();
                                lstItem.CONV_RT_PAR = selRow[AtParWebEnums.Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM.ToString()].ToString();

                                lstRet.Add(lstItem);
                            }
                        }
                    }
                }

                if (lstRet.Count == 0)
                {
                    lstNonCartItems = _consignmentItemsRepo.GetNonCartItems(bUnit, cartID);

                    if (lstNonCartItems != null)
                    {
                        if (lstNonCartItems.Count > 0)
                        {
                            lstNonCartItems = lstNonCartItems.Where(x => x.ITEM_ID == itemID && x.COMPARTMENT == compartment.HandleNull().substituteString()).ToList();

                            if (lstNonCartItems.Count > 0)
                            {
                                foreach (MT_POU_NONCART_ITEMS item in lstNonCartItems)
                                {
                                    VM_INVENTORY_CART_ITEMS lstItem = new VM_INVENTORY_CART_ITEMS();
                                    lstItem.CART_ID = cartID;
                                    lstItem.BUSINESS_UNIT = bUnit;
                                    lstItem.ITEM_ID = item.ITEM_ID;
                                    lstItem.ITEM_DESCRIPTION = item.ITEM_DESCRIPTION;
                                    lstItem.LOT_C0NTROLLED = item.LOT_CONTROLLED;
                                    lstItem.SERIAL_CONTROLLED = item.SERIALIZED;
                                    lstItem.COMPARTMENT = item.COMPARTMENT;
                                    lstItem.OPT_QTY = item.OPTIMUM_QTY.ToString();
                                    lstItem.CONV_RT_PAR = item.CONV_RATE_PAR_TO_ISSUE.ToString();

                                    lstRet.Add(lstItem);
                                }
                            }
                        }
                    }
                }

                if(lstRet != null)
                {
                    if (lstRet.Count > 0)
                    {
                        response.DataList = lstRet;
                        response.AtParSuccess();
                        return response;
                    }
                    else
                    {
                        response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        return response;
                    }
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> UpdateCartInventory(List<VM_INVENTORY_ITEMS_TABLE> lstCartInvItemList)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _consignmentItemsRepo.UpdateCartInventory(lstCartInvItemList);

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
    }
}
