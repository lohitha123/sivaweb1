using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace AtPar.Init.Service
{
    public class AllocatePickingZonesService : IAllocatePickingZonesService
    {
        #region Private Variable

        IAllocatePickingZonesRepository _repo;
        ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public AllocatePickingZonesService(IAllocatePickingZonesRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _repo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(AllocatePickingZonesService));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Gets the STorage Zones Allocated to the User
        /// </summary>
        /// <param name="orgGroupId"></param>
        /// <param name="storageZoneId"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE> GetUserStorageZones(string orgGroupId, string storageZoneId, string userId, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_STORAGE_ZONE>();
            StringBuilder sbUsers = new StringBuilder();

            try
            {
                List<MT_ATPAR_STORAGE_ZONE> lstActiveStorageZones = _repo.GetActiveStorageZones(orgGroupId);
                List<MT_ATPAR_STORAGE_ZONES_ALLOCATION> lstAllocatedStorageZones = _repo.GetAllocatedStorageZones(orgGroupId, storageZoneId, userId, appId);

                if (lstAllocatedStorageZones.Count == 0)
                {
                    foreach (var zone in lstActiveStorageZones)
                    {
                        sbUsers.Clear();
                        List<MT_ATPAR_STORAGE_ZONES_ALLOCATION> lstUsers = _repo.GetStorageZoneUsers(orgGroupId, zone.STORAGE_ZONE_ID);

                        if (lstUsers.Count > 0)
                        {
                            foreach (var user in lstUsers)
                            {
                                sbUsers.Append(((!string.IsNullOrEmpty(sbUsers.ToString())) ? "," : ""));
                                sbUsers.Append(user.USERNAME);
                            }
                        }

                        zone.USER_ID = sbUsers.ToString();
                        zone.CHK_VALUE = 0;
                        zone.CHK_ALLOCATED = 0;
                    }
                }
                else if (lstAllocatedStorageZones.Count > 0)
                {
                    foreach (var zone in lstActiveStorageZones)
                    {
                        sbUsers.Clear();
                        List<MT_ATPAR_STORAGE_ZONES_ALLOCATION> lstUsers = _repo.GetStorageZoneUsers(orgGroupId, zone.STORAGE_ZONE_ID);

                        if (lstUsers.Count > 0)
                        {
                            foreach (var user in lstUsers)
                            {
                                sbUsers.Append(((!string.IsNullOrEmpty(sbUsers.ToString())) ? "," : ""));
                                sbUsers.Append(user.USERNAME);
                            }
                        }

                        zone.USER_ID = sbUsers.ToString();

                        var allocatedZone = lstAllocatedStorageZones.Where(x => x.STORAGE_ZONE_ID == zone.STORAGE_ZONE_ID).FirstOrDefault();

                        if(allocatedZone != null)
                        {
                            zone.CHK_VALUE = 1;
                            zone.CHK_ALLOCATED = 1;
                        }
                    }
                }

                int rowIndex = 0;
                foreach (var item in lstActiveStorageZones)
                {
                    item.ROWINDEX = rowIndex;
                    rowIndex++;
                }

                //sort 
                response.DataList = lstActiveStorageZones.OrderByDescending(x => x.CHK_VALUE == 1).ToList();

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
            finally
            {
                sbUsers = null;
            }
        }

        /// <summary>
        /// Inserts the Allocated Picking Zones to the User
        /// </summary>
        /// <param name="lstAllocatedStorageZones"></param>
        /// <param name="orgGroupId"></param>
        /// <param name="storageZoneId"></param>
        /// <param name="assignedUserId"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> InsertUserStorageZones(List<MT_ATPAR_STORAGE_ZONE> lstAllocatedStorageZones, string orgGroupId,
                                                                string storageZoneId, string assignedUserId, string userId, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _repo.InsertUserStorageZones(lstAllocatedStorageZones, orgGroupId, storageZoneId, assignedUserId, userId, appId);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    response.AtParSuccess();
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        #endregion


    }
}
