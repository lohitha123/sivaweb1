using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Service
{

    public class ReleaseOrdersService : IReleaseOrdersService
    {
        IReleaseOrdersRepository _releaseOrderRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public ReleaseOrdersService(IReleaseOrdersRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _releaseOrderRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(ReleaseOrdersService));
        }

        public AtParWebApiResponse<MT_ATPAR_TRANSACTION> GetReleaseOrders(int appID, string userID, string bUnit, string ordNo,
                                        string orgGrpID, bool updateRequired, string transID = "", params string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_TRANSACTION>();
            long StatusCode = -1;

            try
            {
                string _OrgGrpID = string.Empty;

                if (string.IsNullOrEmpty(orgGrpID))
                {
                    _OrgGrpID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();
                }
                else
                {
                    _OrgGrpID = orgGrpID;
                }

                if (updateRequired)
                {
                    StatusCode = _releaseOrderRepo.UpdateTransactionStatus(appID, userID, transID.TrimEnd(','));

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
                        return response;
                    }
                }


                Tuple<List<MT_ATPAR_TRANSACTION>, string> tuplereleaseorders = null;
                tuplereleaseorders = _releaseOrderRepo.GetReleaseOrders(appID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(), bUnit, ordNo, _OrgGrpID);

                response.DataList = tuplereleaseorders.Item1;
                if (Convert.ToInt64(tuplereleaseorders.Item2) != AtparStatusCodes.ATPAR_OK)
                {
                    response.StatusCode = AtparStatusCodes.E_SERVERERROR;
                }
                if (response.DataList == null || response.DataList.Count() <= 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Return Release Orders Count: " + response.DataList.Count() + ":"); }
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
