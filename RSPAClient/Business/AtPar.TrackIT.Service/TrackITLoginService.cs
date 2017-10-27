using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.Service.Interfaces.TrackIT;
using AtParEncryptionServices;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.TrackIT.Service
{
    public class TrackITLoginService : ITrackITLoginService
    {
        ITrackITLoginRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;

        public TrackITLoginService(ITrackITLoginRepository repo, ILog log, ICommonRepository commonRepository)
        {
            _Repo = repo;
            _log = log;
            _commonRepo = commonRepository;
        }

        public AtParWebApiResponse<TKIT_REQUESTOR> CheckLogin(string userID, string password)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<TKIT_REQUESTOR>();

            password = password.Replace(" ", "+");
            try
            {
                AtParEncryptionServices.AtParEncryptionServices encServices = new AtParEncryptionServices.AtParEncryptionServices();


                string decryptedPassword = string.Empty;

                if (!string.IsNullOrEmpty(password))
                {
                    //decryptedPassword = encServices.DecryptString(pPassword, (short)AtParEncryptionServices.AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase);
                    decryptedPassword = AESEncryptDecryptService.DecryptStringAES(password);
                }
                 string passHash = encServices.EncryptString(decryptedPassword, Convert.ToInt16(AtParEncryptionServices.AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase));
                
                 var result = _Repo.CheckLogin(userID, passHash);

                if (result.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(result.Item1, _commonRepo, _log);
                    return response;
                }
                else
                {
                    response.DataVariable = result.Item2;
                    response.StatusCode = result.Item1;
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
