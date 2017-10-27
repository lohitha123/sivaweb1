using AtPar.Common;
using AtPar.Common.Service;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.Repository.Interfaces.Common;
using AtPar.Service.Interfaces.CartCount;
using AtPar.Service.Interfaces.Common;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CartCount.Service
{
    public class AllocateCartsService : IAllocateCartsService
    {
        #region Private Variable

        IAllocateCartsRepository _cartsRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;
        IGetHeaderService _getHeaderService;

        #endregion

        #region Constructor
        public AllocateCartsService(IAllocateCartsRepository repository, ILog log,
                                    ICommonRepository commonRepository, ICommonService commonService,
                                    IGetHeaderService cartcountCommonService)
        {
            _cartsRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _getHeaderService = cartcountCommonService;
			_log.SetLoggerType(typeof(AllocateCartsService));
        }

        #endregion

        #region GetCarts
        /// <summary>
        /// To get carts
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="userID"></param>
        /// <param name="bUnit"></param>
        /// <param name="cartID"></param>
        /// <param name="order"></param>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<object> GetCarts(string orgGroupID, string userID, string bUnit,
                                                  string cartID, string order, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<object>();
            string fldOrdby = "BUSINESS_UNIT, INV_CART_ID";

            DataSet dsHeaderDtls = new DataSet();
            long statusCode = -1;
            Tuple<int, List<VM_MT_CRCT_ALLOCATE_CARTS>> output = null;
            try
            {

                Tuple<long, DataSet> tupleResult = _getHeaderService.GetHeader(userID, bUnit, cartID, fldOrdby, order, deviceTokenEntry);

                statusCode = tupleResult.Item1;
               
                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }
                dsHeaderDtls = tupleResult.Item2;

                dsHeaderDtls.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ColumnName =
                                                    AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID.ToString();
                dsHeaderDtls.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ColumnName =
                                                    AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT.ToString();
                dsHeaderDtls.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR].ColumnName =
                                                    AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR.ToString();
                dsHeaderDtls.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.SHADOW_FLAG].ColumnName =
                                                    AtParWebEnums.Get_Cart_Header_Output_Carts.SHADOW_FLAG.ToString();
                dsHeaderDtls.Tables[0].Columns[(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_COUNT_ORDER].ColumnName =
                                                    AtParWebEnums.Get_Cart_Header_Output_Carts.CART_COUNT_ORDER.ToString();

                
                Tuple<long, DataSet> tupleOrphanCarts = GetOrphanCarts(userID, dsHeaderDtls, cartID, bUnit);
                statusCode = tupleOrphanCarts.Item1;

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                    return response;

                }
                dsHeaderDtls = tupleOrphanCarts.Item2;
                int intSelectedcartsCnt = 0;
                string strDescr = string.Empty;
                string sFlg = string.Empty;
                string strOrphanCartid = string.Empty;
                string strOrphanBunit = string.Empty;

                // string userString = string.Empty;

                DataSet dsGetCarts = new DataSet();
                DataTable dtGetcarts = new DataTable();
                DataRow drGetcarts = default(DataRow);
                DataTable _dtGetScheduleInfo = new DataTable();
                DataSet dsOrphanCarts = new DataSet();

                dtGetcarts.Columns.Add("IsOrphan", Type.GetType("System.String")).DefaultValue = AtParWebEnums.YesNo_Enum.N.ToString();
                dtGetcarts.Columns.Add("SNO", Type.GetType("System.Int64")).DefaultValue = 0;
                dtGetcarts.Columns.Add("BUSINESS_UNIT", Type.GetType("System.String")).DefaultValue = string.Empty;
                dtGetcarts.Columns.Add("CART_ID");
                dtGetcarts.Columns.Add("DESCR", Type.GetType("System.String")).DefaultValue = string.Empty;
                dtGetcarts.Columns.Add("USERS", Type.GetType("System.String")).DefaultValue = string.Empty;
                //Allocated users of a Cart
                dtGetcarts.Columns.Add("CART_COUNT_ORDER", Type.GetType("System.String")).DefaultValue = string.Empty;
                dtGetcarts.Columns.Add("SHADOW_FLAG", Type.GetType("System.String")).DefaultValue = string.Empty;
                dtGetcarts.Columns.Add("COUNT_BEFORE", Type.GetType("System.String")).DefaultValue = string.Empty;

                dtGetcarts.Columns.Add("ALL", Type.GetType("System.Boolean")).DefaultValue = false;
                dtGetcarts.Columns.Add("MON", Type.GetType("System.Boolean")).DefaultValue = false;
                dtGetcarts.Columns.Add("TUE", Type.GetType("System.Boolean")).DefaultValue = false;
                dtGetcarts.Columns.Add("WED", Type.GetType("System.Boolean")).DefaultValue = false;
                dtGetcarts.Columns.Add("THU", Type.GetType("System.Boolean")).DefaultValue = false;
                dtGetcarts.Columns.Add("FRI", Type.GetType("System.Boolean")).DefaultValue = false;
                dtGetcarts.Columns.Add("SAT", Type.GetType("System.Boolean")).DefaultValue = false;
                dtGetcarts.Columns.Add("SUN", Type.GetType("System.Boolean")).DefaultValue = false;
                dtGetcarts.Columns.Add("CHK_ALLOCATED", Type.GetType("System.Boolean")).DefaultValue = false;

                dtGetcarts.Columns["CART_ID"].DataType = dsHeaderDtls.Tables[0].Columns[AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID.ToString()].DataType;
                for (int i = 0; i <= dsHeaderDtls.Tables[0].Rows.Count - 1; i++)
                {
                    drGetcarts = dtGetcarts.NewRow();
                    string strCartID = dsHeaderDtls.Tables[0].Rows[i][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID].ToString();
                    string strBunit = dsHeaderDtls.Tables[0].Rows[i][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT].ToString();
                    string strDescription = dsHeaderDtls.Tables[0].Rows[i][(int)AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR].ToString();
                    drGetcarts["SNO"] = i + 1;
                    drGetcarts["BUSINESS_UNIT"] = strBunit;
                    drGetcarts["CART_ID"] = strCartID;
                    drGetcarts["DESCR"] = strDescription;
                    if (!string.IsNullOrEmpty(dsHeaderDtls.Tables[0].Rows[i]["ORPHANCART"].ToString()))
                    {
                        drGetcarts["IsOrphan"] = dsHeaderDtls.Tables[0].Rows[i]["ORPHANCART"].ToString();
                    }
                    List<VM_MT_CRCT_USER_ALLOCATION> lstCartDetails = new List<VM_MT_CRCT_USER_ALLOCATION>();
                    try
                    {
                        lstCartDetails = _cartsRepo.GetCartDetails(strCartID, strBunit);
                    }
                    catch
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                        return response;
                    }
                    if (lstCartDetails.Count > 0)
                    {
                        string cartString = string.Empty;
                        string userString = string.Empty;
                        for (int countCarts = 0; countCarts <= lstCartDetails.Count - 1; countCarts++)
                        {
                            if (cartString == string.Empty)
                                cartString = lstCartDetails[countCarts].CART_ID;

                            if (userString != string.Empty)
                            {
                                userString = userString + ((!string.IsNullOrEmpty(userString)) ? ", " : "");
                            }

                            if (cartString == lstCartDetails[countCarts].CART_ID)
                            {
                                userString = userString + "" + lstCartDetails[countCarts].USERNAME;
                            }
                            drGetcarts["USERS"] = userString;
                            if (userID == lstCartDetails[countCarts].USER_ID)
                            {
                                intSelectedcartsCnt = intSelectedcartsCnt + 1;
                                drGetcarts["CART_COUNT_ORDER"] = lstCartDetails[countCarts].CART_COUNT_ORDER;
                                drGetcarts["SHADOW_FLAG"] = lstCartDetails[countCarts].SHADOW_FLAG;
                                drGetcarts["COUNT_BEFORE"] = lstCartDetails[countCarts].COUNT_BEFORE;
                            }
                        }
                        List<short> lstdays = _cartsRepo.GetSchedule(userID, strCartID, strBunit);
                        if (lstdays.Count != 0)
                        {
                            drGetcarts["ALL"] = true;
                            drGetcarts["CHK_ALLOCATED"] = true;
                            foreach(int day in lstdays)
                            {
                                switch (day)
                                {
                                    case 1:
                                        drGetcarts["MON"] = true;
                                        break;
                                    case 2:
                                        drGetcarts["TUE"] = true;
                                        break;
                                    case 3:
                                        drGetcarts["WED"] = true;
                                        break;
                                    case 4:
                                        drGetcarts["THU"] = true;
                                        break;
                                    case 5:
                                        drGetcarts["FRI"] = true;
                                        break;
                                    case 6:
                                        drGetcarts["SAT"] = true;
                                        break;
                                    case 7:
                                        drGetcarts["SUN"] = true;
                                        break;
                                }
                            }
                        }                        
                    }
                    dtGetcarts.Rows.Add(drGetcarts);
                }
                dsGetCarts.Tables.Add(dtGetcarts);
                List<VM_MT_CRCT_ALLOCATE_CARTS> lstusers = new List<VM_MT_CRCT_ALLOCATE_CARTS>();
                lstusers = dsGetCarts.Tables[0].ToList<VM_MT_CRCT_ALLOCATE_CARTS>();
                lstusers = lstusers.OrderByDescending(x => x.CHK_ALLOCATED).ToList();
                output = new Tuple<int, List<VM_MT_CRCT_ALLOCATE_CARTS>>(intSelectedcartsCnt, lstusers);
                response.DataVariable = output;
                //response.DataList = lstusers;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                throw ex;

            }

        }
        #endregion

        #region MoveCarts
        /// <summary>
        /// To move carts
        /// </summary>
        /// <param name="lstSelectedCarts"></param>
        /// <param name="userID"></param>
        /// <param name="seletedUserID"></param>
        /// <param name="bUnit"></param>
        /// <param name="cartID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> MoveCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts, string userID, string seletedUserID,
                                                   string bUnit, string cartID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            string strBUnit = string.Empty;
            string strCartID = string.Empty;
            string Desc = string.Empty;
            string shadowFlag = string.Empty;
            string countBefore = string.Empty;
            int cartCountOrder = -1;
            string all = string.Empty;
            try
            {
                foreach (var selectedCart in lstSelectedCarts)
                {
                    string selectedDay = string.Empty;
                    if (selectedCart.MON.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",1") : "1";
                    }
                    if (selectedCart.TUE.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",2") : "2";
                    }
                    if (selectedCart.WED.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",3") : "3";
                    }
                    if (selectedCart.THU.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",4") : "4";
                    }
                    if (selectedCart.FRI.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",5") : "5";
                    }
                    if (selectedCart.SAT.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",6") : "6";
                    }
                    if (selectedCart.SUN.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",7") : "7";
                    }
                    if (selectedCart.ALL == true)
                    {
                        strBUnit = selectedCart.BUSINESS_UNIT;
                        strCartID = selectedCart.CART_ID;//GetDatabaseString
                        Desc = selectedCart.DESCR;//substituteString
                        cartCountOrder = selectedCart.CART_COUNT_ORDER;
                        if (selectedCart.SHADOW_FLAG.Length == 0)
                        {
                            shadowFlag = string.Empty;
                        }
                        else
                        {
                            shadowFlag = selectedCart.SHADOW_FLAG;
                        }
                        countBefore = selectedCart.COUNT_BEFORE;
                    }
                    response.StatusCode = _cartsRepo.MoveCarts(userID, seletedUserID, strCartID, strBUnit, Desc,
                              cartCountOrder, shadowFlag, countBefore, selectedDay, selectedCart.ALL);
                    all = "false";

                    if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
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

        #endregion

        #region DeleteCarts
        /// <summary>
        /// To delete carts
        /// </summary>
        /// <param name="lstSelectedCarts"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> DeleteCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            string bUnit = string.Empty;
            string cartID = string.Empty;

            try
            {
                foreach (var selectedCart in lstSelectedCarts)
                {
                    if (selectedCart.ALL.ToString().ToUpper() == "TRUE")
                    {
                        bUnit = selectedCart.BUSINESS_UNIT;
                        cartID = selectedCart.CART_ID;//GetDatabaseString

                    }
                    response.StatusCode = _cartsRepo.DeleteCarts(userID, cartID, bUnit);

                    if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
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

        #endregion

        #region AllocateCarts
        /// <summary>
        /// To allocate carts
        /// </summary>
        /// <param name="lstSelectedCarts"></param>
        /// <param name="userID"></param>
        /// <param name="seletedUserID"></param>
        /// <param name="bUnit"></param>
        /// <param name="cartID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> AllocateCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts, string userID, string seletedUserID,
                                                   string bUnit, string cartID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            string strBUnit = string.Empty;
            string strCartID = string.Empty;
            string Desc = string.Empty;
            string shadowFlag = string.Empty;
            string countBefore = string.Empty;
            int cartCountOrder = -1;
            string all = string.Empty;

            try
            {
                foreach (var selectedCart in lstSelectedCarts)
                {
                    string selectedDay = string.Empty;
                    strBUnit = selectedCart.BUSINESS_UNIT;
                    strCartID = selectedCart.CART_ID;//GetDatabaseString
                    if (selectedCart.DESCR != DBNull.Value.ToString())
                    {
                        if (!string.IsNullOrEmpty(selectedCart.DESCR.ToString()))
                        {
                            Desc = selectedCart.DESCR;
                        }
                    }
                    if (selectedCart.CART_COUNT_ORDER.ToString() != DBNull.Value.ToString())
                    {
                        cartCountOrder = selectedCart.CART_COUNT_ORDER;
                    }
                    shadowFlag = selectedCart.SHADOW_FLAG;
                    countBefore = selectedCart.COUNT_BEFORE;
                    if (selectedCart.ALL.ToString().ToUpper() == "TRUE")
                    {
                        all = "TRUE";
                        if (selectedCart.MON.ToString().ToUpper() == "TRUE")
                        {
                            selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",1") : "1";
                        }
                        if (selectedCart.TUE.ToString().ToUpper() == "TRUE")
                        {
                            selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",2") : "2";
                        }
                        if (selectedCart.WED.ToString().ToUpper() == "TRUE")
                        {
                            selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",3") : "3";
                        }
                        if (selectedCart.THU.ToString().ToUpper() == "TRUE")
                        {
                            selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",4") : "4";
                        }
                        if (selectedCart.FRI.ToString().ToUpper() == "TRUE")
                        {
                            selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",5") : "5";
                        }
                        if (selectedCart.SAT.ToString().ToUpper() == "TRUE")
                        {
                            selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",6") : "6";
                        }
                        if (selectedCart.SUN.ToString().ToUpper() == "TRUE")
                        {
                            selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",7") : "7";
                        }


                    }
                    response.StatusCode = _cartsRepo.AllocateCarts(userID, seletedUserID, strCartID, strBUnit, Desc,
                                   cartCountOrder, shadowFlag, countBefore, selectedDay, all);
                    all = "false";
                    if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
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

        #endregion

        #region CopyCarts
        /// <summary>
        /// To copy carts
        /// </summary>
        /// <param name="lstSelectedCarts"></param>
        /// <param name="userID"></param>
        /// <param name="seletedUserID"></param>
        /// <param name="bUnit"></param>
        /// <param name="cartID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> CopyCarts(List<VM_MT_CRCT_ALLOCATE_CARTS> lstSelectedCarts, string userID, string seletedUserID,
                                                  string bUnit, string cartID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            string strBUnit = string.Empty;
            string strCartID = string.Empty;
            string Desc = string.Empty;
            string shadowFlag = string.Empty;
            string countBefore = string.Empty;
            int cartCountOrder = -1;

            try
            {
                foreach (var selectedCart in lstSelectedCarts)
                {
                    string selectedDay = string.Empty;
                    if (selectedCart.MON.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",1") : "1";
                    }
                    if (selectedCart.TUE.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",2") : "2";
                    }
                    if (selectedCart.WED.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",3") : "3";
                    }
                    if (selectedCart.THU.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",4") : "4";
                    }
                    if (selectedCart.FRI.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",5") : "5";
                    }
                    if (selectedCart.SAT.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",6") : "6";
                    }
                    if (selectedCart.SUN.ToString().ToUpper() == "TRUE")
                    {
                        selectedDay = !string.IsNullOrEmpty(selectedDay) ? (selectedDay + ",7") : "7";
                    }
                    if (selectedCart.ALL == true)
                    {
                        strBUnit = selectedCart.BUSINESS_UNIT;
                        strCartID = selectedCart.CART_ID;//GetDatabaseString
                        Desc = selectedCart.DESCR;//substituteString
                        cartCountOrder = selectedCart.CART_COUNT_ORDER;
                        if (selectedCart.SHADOW_FLAG.Length == 0)
                        {
                            shadowFlag = string.Empty;
                        }
                        else
                        {
                            shadowFlag = selectedCart.SHADOW_FLAG;
                        }
                        countBefore = selectedCart.COUNT_BEFORE;
                    }
                    response.StatusCode = _cartsRepo.CopyCarts(seletedUserID, strCartID, strBUnit, Desc,
                              cartCountOrder, shadowFlag, countBefore, selectedDay, selectedCart.ALL);
                   
                    if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
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

        #endregion

        #region Private Methods
        private Tuple<long, DataSet> GetOrphanCarts(string userID, DataSet dsHeader, string cartID, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strCartID;
            string strBUnit;
            string strDescr;
            string strShdwFlg;
            int count;
            Tuple<long, DataSet> tupleOutput = null;
            StringBuilder sbSql = new StringBuilder();
            List<MT_CRCT_USER_ALLOCATION> lstOrphanCarts = new List<MT_CRCT_USER_ALLOCATION>();
            DataColumn dcOrphanCart = new DataColumn();
            dcOrphanCart.ColumnName = "ORPHANCART";
            dcOrphanCart.DefaultValue = AtParWebEnums.YesNo_Enum.N.ToString();

            dsHeader.Tables[0].Columns.Add(dcOrphanCart);

            try
            {
                lstOrphanCarts = _cartsRepo.GetOrphanCarts(userID, cartID, bUnit);
                if (lstOrphanCarts.Count > 0)
                {
                    for (int i = 0; i <= lstOrphanCarts.Count - 1; i++)
                    {
                        strCartID = lstOrphanCarts[i].CART_ID.ToString();
                        strBUnit = lstOrphanCarts[i].BUSINESS_UNIT.ToString();
                        strDescr = lstOrphanCarts[i].DESCR.ToString();
                        strShdwFlg = lstOrphanCarts[i].SHADOW_FLAG.ToString();
                        string strSelect = AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID.ToString() + "='" + strCartID + "' and " + AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT.ToString() + "='" + strBUnit + "'";
                        count = dsHeader.Tables[0].Select(strSelect).Length;
                        if (count == 0)
                        {
                            DataRow drCart;

                            drCart = dsHeader.Tables[0].NewRow();

                            drCart[AtParWebEnums.Get_Cart_Header_Output_Carts.CART_ID.ToString()] = strCartID;
                            drCart[AtParWebEnums.Get_Cart_Header_Output_Carts.BUSINESS_UNIT.ToString()] = strBUnit;
                            drCart[AtParWebEnums.Get_Cart_Header_Output_Carts.DESCR.ToString()] = strDescr;
                            drCart[AtParWebEnums.Get_Cart_Header_Output_Carts.SHADOW_FLAG.ToString()] = strShdwFlg;

                            drCart["ORPHANCART"] = AtParWebEnums.YesNo_Enum.Y.ToString();

                            dsHeader.Tables[0].Rows.Add(drCart);

                        }
                    }
                }
                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, dsHeader);
                return tupleOutput;


            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion
    }
}
