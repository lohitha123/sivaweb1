using AtPar.Service.Interfaces.Init;
using System;
using AtPar.POCOEntities;
using AtPar.Common;
using AtPar.Repository.Interfaces.Init;
using log4net;
using AtPar.Repository.Interfaces.Common;
using AtPar.Common.Service;
//using System.Linq;

namespace AtPar.Init.Service
{
    public class TokenService : ITokenService
    {
        ITokensRepository _tokenRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        /// <summary>
        /// TokenService constructor
        /// </summary>
        /// <param name="repository"></param>
        /// <param name="log"></param>
        /// <param name="commonRepository"></param>
        public TokenService(ITokensRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _tokenRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(TokenService));
        }
        /// <summary>
        /// Used to get live tokens
        /// </summary>
        /// <param name="pChkValue"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_TOKENS> GetLiveTokens(int pChkValue)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_TOKENS>();
            try
            {
                response.DataList = _tokenRepo.GetLiveTokens(pChkValue);
                //response.DataList= response.DataList.OrderBy(x => x.USER_ID).ToList();

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
        /// Used to delete the token by access token
        /// </summary>
        /// <param name="strAccessToken"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_TOKENS> DeleteTokenEntry(string strAccessToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_ATPAR_TOKENS>();
            try
            {
                long StatusCode = _tokenRepo.DeleteTokenEntry(strAccessToken);
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
        /// Used to delete all expired tokens at time
        /// </summary>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_TOKENS> RunTokenGC()
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_ATPAR_TOKENS>();
            try
            {
                long StatusCode = _tokenRepo.RunTokenGC();
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
