using System;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.Repository.Interfaces.POU;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
using AtPar.Service.Interfaces.POU;

namespace AtPar.POU.Service
{

    public class ReasonCodeService : IReasonCodeService
    {
        IReasonCodesRepository _reasonCodesRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        
        public ReasonCodeService(IReasonCodesRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _reasonCodesRepo = repository;
            _log = log; 
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ReasonCodeService));
        }
        /// <summary>
        /// Used to get specialty codes
        /// </summary>
        /// <param name="codeType"></param>
        /// <param name="code"></param>
        /// <param name="descr"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_REASON_CODE> GetCodes(string codeType, string code, string descr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            codeType = codeType.ReplaceNullwithEmpty().ReplaceString();
            code = code.ReplaceNullwithEmpty().ReplaceString();
            descr = descr.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<MT_POU_REASON_CODE>();

            try
            {
                response.DataList = _reasonCodesRepo.GetPOUCodes(codeType,  code, descr);

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

        /// <summary>
        /// Gets the Reason Code Details with matching search criteria for Reason Code/Reason Description
        /// </summary>
        /// <param name="reasonCodeOrDescription"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_REASON_CODE> GetCodes(string reasonCodeOrDescription)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_REASON_CODE>();

            try
            {
                response.DataList = _reasonCodesRepo.GetPOUCodes(reasonCodeOrDescription.ReplaceNullwithEmpty().ReplaceString());

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
        /// <summary>
        /// Used to add the specialty codes
        /// </summary>
        /// <param name="codeType"></param>
        /// <param name="pUserId"></param>
        /// <param name="code"></param>
        /// <param name="descr"></param>
        /// <param name="specCode"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_REASON_CODE> AddCodes(string codeType, string pUserId, string code = "", string descr = "", string specCode = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_POU_REASON_CODE>();
            codeType = codeType.ReplaceNullwithEmpty().ReplaceString();
            code = code.ReplaceNullwithEmpty().ReplaceString();
            descr = descr.ReplaceNullwithEmpty().ReplaceString();
            pUserId = pUserId.ReplaceNullwithEmpty().ReplaceString();
            specCode = specCode.ReplaceNullwithEmpty().ReplaceString();
            try
            {
                long StatusCode = _reasonCodesRepo.AddCodes(codeType, pUserId, code, descr, specCode);
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
        /// Used to update the specialty codes
        /// </summary>
        /// <param name="codeType"></param>
        /// <param name="code"></param>
        /// <param name="descr"></param>
        /// <param name="specCode"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_REASON_CODE> UpdateCodes(string codeType, string code = "", string descr = "", string specCode = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_POU_REASON_CODE>();
            codeType = codeType.ReplaceNullwithEmpty().ReplaceString();
            code = code.ReplaceNullwithEmpty().ReplaceString();
            descr = descr.ReplaceNullwithEmpty().ReplaceString();
            specCode = specCode.ReplaceNullwithEmpty().ReplaceString();
            try
            {
                long StatusCode = _reasonCodesRepo.UpdateCodes(codeType, code, descr, specCode);
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
        /// Used to delete the specalty codes
        /// </summary>
        /// <param name="codeType"></param>
        /// <param name="code"></param>
        /// <param name="descr"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_REASON_CODE> DeleteCodes(string codeType, string code = "", string descr = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_POU_REASON_CODE>();
            codeType = codeType.ReplaceNullwithEmpty().ReplaceString();
            code = code.ReplaceNullwithEmpty().ReplaceString();
            descr = descr.ReplaceNullwithEmpty().ReplaceString();
            try
            {
                long StatusCode = _reasonCodesRepo.DeleteCodes(codeType,  code, descr);
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
