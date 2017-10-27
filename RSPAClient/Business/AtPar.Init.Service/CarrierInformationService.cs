#region Usings
using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;

#endregion

namespace AtPar.Init.Service
{
    public class CarrierInformationService : ICarrierInformationService
    {
        #region Private Variable

        IConfigData _configDataRepo = null;
        ICommonRepository _commonRepo = null;
        ICarrierInformationRepository _carrierInformationRepo = null;
        ILog _log;

        string GET_CARRIERS_CLASS = "GetCarriers";

        #endregion

        #region Constructor

        public CarrierInformationService(ILog log, IConfigData objConfigData, ICommonRepository objCommonRepo, ICarrierInformationRepository objCarrierInformationRepo)
        {
            _log = log;
            _configDataRepo = objConfigData;
            _commonRepo = objCommonRepo;
            _carrierInformationRepo = objCarrierInformationRepo;
            _log.SetLoggerType(typeof(CarrierInformationService));
            //GetConfigData();
        }

        #endregion

        /// <summary>
        /// To Initialize AtPar System
        /// </summary>
        //private void GetConfigData()
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        /// <summary>
        /// To Get the Carriers from the ERP
        /// </summary>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> GetCarriers(string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var CarriersERPCall = new AtParWebApiResponse<RM_CARRIER_INFORMATION>();
            var response = new AtParWebApiResponse<long>();
            long StatusCode = -1;
            string carrierID = string.Empty;
            string descr = string.Empty;

            try
            {
                StatusCode = _carrierInformationRepo.UpdateCarrierStaus();

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                CarriersERPCall.DataList = GetCarriersERPCall(deviceTokenEntry);

                foreach (RM_CARRIER_INFORMATION item in CarriersERPCall.DataList)
                {
                    carrierID = item.CARRIER_ID.TrimEnd();
                    descr = item.DESCR.ReplaceString();
                    descr = item.DESCR.ReplaceAmpersand();

                    List<MT_RECV_CARRIER> lstLocalDbCarriers = _carrierInformationRepo.GetCarrierInformation(carrierID);
                    MT_RECV_CARRIER lstItem = lstLocalDbCarriers.FirstOrDefault();

                    if (lstLocalDbCarriers.Count() > 0)
                    {
                        StatusCode = _carrierInformationRepo.UpdateCarrierInformation(lstItem, carrierID, descr, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }
                    }
                    else
                    {
                        StatusCode = _carrierInformationRepo.InsertCarrierInformation(carrierID, descr, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }
                    }

                    StatusCode = _carrierInformationRepo.UpdateCarrierStaus(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Return Carriers : " + response.DataList + ":"); }

                response.AtParSuccess();
                return response;

            }
            catch (Exception ex)
            {
                response.StatType = AtParWebEnums.StatusType.Error;
                response.StatusCode = AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                response.ExceptionMessage = ex.ToString();
                return response;
            }

        }

        /// <summary>
        /// Gets the Carriers from ERP
        /// </summary>
        /// <param name="deviceTokenEntry"></param>
        /// <returns></returns>
        private IList<RM_CARRIER_INFORMATION> GetCarriersERPCall(string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                DataSet outputParameters = new DataSet();
                string _erpObjName = string.Empty;
                string _methodName = "GetCarriers";
                object _reflectObject = null;
                MethodInfo _methodInfo = null;
                object _statusCode;

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                _erpObjName = string.Concat(AtParDefns.CONST_ATPAR, "_", lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString()
                                                     && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault());

                _methodInfo = Utils.CreateERPObjectInstance(_erpObjName, GET_CARRIERS_CLASS, _methodName, out _reflectObject);
                object[] args = { outputParameters, deviceTokenEntry };

                _statusCode = _methodInfo.Invoke(_reflectObject, args);
                outputParameters = (DataSet)args[0];

                IEnumerable<RM_CARRIER_INFORMATION> objOut = ParseListViewElement(outputParameters.Tables[0]);
                return objOut.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Converts DataTable object to IEnumerable list
        /// </summary>
        /// <param name="outputData"></param>
        /// <returns></returns>
        private IEnumerable<RM_CARRIER_INFORMATION> ParseListViewElement(DataTable outputData)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                IEnumerable<RM_CARRIER_INFORMATION> result = from x in outputData.AsEnumerable()
                                                             select new RM_CARRIER_INFORMATION
                                                             {
                                                                 CARRIER_ID = x.Field<string>("CARRIER_ID") ?? string.Empty,
                                                                 DESCR = x.Field<string>("DESCR") ?? string.Empty,
                                                                 SET_CNTRL_VALUE = x.Field<string>("SETCNTRLVALUE") ?? string.Empty,
                                                             };
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// To Get the Carriers from MT_RECV_CARRIER Table
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<MT_RECV_CARRIER> GetCarriersData()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_RECV_CARRIER>();

            try
            {
                response.DataList = _carrierInformationRepo.GetCarriersData();

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
        /// To Insert the Carrier 
        /// </summary>
        /// <param name="carrierID"></param>
        /// <param name="descr"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> AddCarrier(string carrierID, string descr, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = -1;

            try
            {
                StatusCode = _carrierInformationRepo.AddCarrier(carrierID.ReplaceString(), descr.ReplaceString(), userID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Insert Success"); }

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
        /// To Delete the carrier(Updating the Status to D)
        /// </summary>
        /// <param name="carrierID"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> DeleteCarrier(string carrierID, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = -1;

            try
            {
                StatusCode = _carrierInformationRepo.DeleteCarrier(carrierID, userID);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Delete Success"); }

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
