using AtPar.Service.Interfaces.RFID;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.Service.Interfaces.Init;
using log4net;
using AtPar.POCOEntities;
using AtPar.Common.Service;
using AtPar.Repository.Interfaces.Common;

namespace AtPar.RFID.Service
{
    public class RFIDUtilsService : IRFIDUtilsService
    {
        ITokenService _objTokenService;
        ICommonRepository _objCommonRepo; 
        ILog _log;

        public RFIDUtilsService(ILog log, ITokenService objTokenService,ICommonRepository objCommonRepo)
        {
            _objTokenService = objTokenService;
            _objCommonRepo = objCommonRepo;
            _log = log;
        }

        public AtParWebApiResponse<bool> CheckTokenValidity(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            //StringBuilder _sbSQL = new StringBuilder();
            var response = new AtParWebApiResponse<bool>();

            try
            {
                response.DataVariable = false;
                var resultTokens = _objTokenService.GetLiveTokens(0);

                if (resultTokens.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(resultTokens.StatusCode,_objCommonRepo, _log);
                    return response;
                }
                if(resultTokens.DataList!=null && resultTokens.DataList.Count()>0)
                {
                    var ValidTokens = resultTokens.DataList.Where(x => (x.ACCESS_TOKEN == deviceTokenEntry[1].ToString()));
                    if(ValidTokens.Count()>0)
                    {
                        response.DataVariable = true;
                    }

                }
                response.AtParSuccess();
                
                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _objCommonRepo, _log);
                return response;
            }
        }
    }
}
