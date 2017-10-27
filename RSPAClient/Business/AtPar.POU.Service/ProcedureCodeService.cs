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
    public class ProcedureCodeService : IProcedureCodeService
    {
        IProcedureCodesRepository _procedureCodesRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ProcedureCodeService(IProcedureCodesRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _procedureCodesRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ProcedureCodeService));
        }
        /// <summary>
        /// Used to get specialty codes
        /// </summary>
        /// <param name="codeType"></param>
        /// <param name="code"></param>
        /// <param name="descr"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_SPECIALTY_CODE> GetSpecialtyCodes(string codeType, string code, string descr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            codeType = codeType.ReplaceNullwithEmpty().ReplaceString();
            code = code.ReplaceNullwithEmpty().ReplaceString();
            descr = descr.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<MT_POU_SPECIALTY_CODE>();

            try
            {
                response.DataList = _procedureCodesRepo.GetSpecialtyCodes(codeType, code, descr);

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
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string codeType, string code, string descr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            codeType = codeType.ReplaceNullwithEmpty().ReplaceString();
            code = code.ReplaceNullwithEmpty().ReplaceString();
            descr = descr.ReplaceNullwithEmpty().ReplaceString();

            var response = new AtParWebApiResponse<MT_POU_PROCEDURE_CODE>();

            try
            {
                response.DataList = _procedureCodesRepo.GetProcedureCodes(codeType, code, descr);

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
        /// Gets the Procedures based on Procedure Code/Description search criteria
        /// </summary>
        /// <param name="procedureCodeOrDescr"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> GetProcedureCodes(string procedureCodeOrDescr)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_PROCEDURE_CODE>();

            try
            {
                response.DataList = _procedureCodesRepo.GetProcedureCodes(procedureCodeOrDescr.ReplaceNullwithEmpty().ReplaceString());

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
        /// <param name="pCodeType"></param>
        /// <param name="pUserId"></param>
        /// <param name="pCode"></param>
        /// <param name="pDescr"></param>
        /// <param name="pSpecCode"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> AddCodes(string pCodeType, string pUserId, string pCode = "", string pDescr = "", string pSpecCode = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_POU_PROCEDURE_CODE>();
            pCodeType = pCodeType.ReplaceNullwithEmpty().ReplaceString();
            pCode = pCode.ReplaceNullwithEmpty().ReplaceString();
            pDescr = pDescr.ReplaceNullwithEmpty().ReplaceString();
            pUserId = pUserId.ReplaceNullwithEmpty().ReplaceString();
            pSpecCode = pSpecCode.ReplaceNullwithEmpty().ReplaceString();
            try
            {
                long StatusCode = _procedureCodesRepo.AddCodes(pCodeType, pUserId, pCode, pDescr, pSpecCode);
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
        /// <param name="pCodeType"></param>
        /// <param name="pCode"></param>
        /// <param name="pDescr"></param>
        /// <param name="pSpecCode"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> UpdateCodes(string pCodeType, string pCode = "", string pDescr = "", string pSpecCode = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_POU_PROCEDURE_CODE>();
            pCodeType = pCodeType.ReplaceNullwithEmpty().ReplaceString();
            pCode = pCode.ReplaceNullwithEmpty().ReplaceString();
            pDescr = pDescr.ReplaceNullwithEmpty().ReplaceString();
            pSpecCode = pSpecCode.ReplaceNullwithEmpty().ReplaceString();
            try
            {
                long StatusCode = _procedureCodesRepo.UpdateCodes(pCodeType, pCode, pDescr, pSpecCode);
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
        /// <param name="pCodeType"></param>
        /// <param name="pCode"></param>
        /// <param name="pDescr"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_PROCEDURE_CODE> DeleteCodes(string pCodeType, string pCode = "", string pDescr = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_POU_PROCEDURE_CODE>();
            pCodeType = pCodeType.ReplaceNullwithEmpty().ReplaceString();
            pCode = pCode.ReplaceNullwithEmpty().ReplaceString();
            pDescr = pDescr.ReplaceNullwithEmpty().ReplaceString();
            try
            {
                long StatusCode = _procedureCodesRepo.DeleteCodes(pCodeType, pCode, pDescr);
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
