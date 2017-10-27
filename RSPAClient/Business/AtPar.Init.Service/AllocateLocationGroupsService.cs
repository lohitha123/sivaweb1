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
    public class AllocateLocationGroupsService : IAllocateLocationGroupsService
    {
        #region Private Variable

        IAllocateLocationGroupsRepository _repo;
        ILog _log;
        ICommonRepository _commonRepo;

        #endregion

        #region Constructor

        public AllocateLocationGroupsService(IAllocateLocationGroupsRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _repo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _log.SetLoggerType(typeof(AllocateLocationGroupsService));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// To insert the Location Group details to selected user
        /// </summary>
        /// <param name="lstLocationGroups"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="locationGroupId"></param>
        /// <param name="assignedUserId"></param>
        /// <param name="userId"></param>
        /// <param name="clientIP"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> InsertLocationGroups(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string orgGroupID, string locationGroupId,
                                         string assignedUserId, string userId, string clientIP, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                long StatusCode = _repo.InsertLocationGroups(lstLocationGroups, orgGroupID, locationGroupId, assignedUserId, userId, clientIP, appId);

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


        /// <summary>
        /// To Delete the selected same Location Details of Logged in User in selected user Records
        /// </summary>
        /// <param name="lstLocationGroupDetails"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="locationGroupId"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> DeleteLocationDetails(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroupDetails, string orgGroupID,
                                                               string locationGroupId, string userId, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = -1;

            try
            {
                lstLocationGroupDetails.RemoveAll(x => x.CHK_VALUE == 0);

                foreach (var item in lstLocationGroupDetails)
                {
                    StatusCode = _repo.DeleteLocationDetails(orgGroupID, item.LOC_GROUP_ID, userId, appId);
                }

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

        /// <summary>
        /// To Move the same Location Details of Logged in User to selected user
        /// </summary>
        /// <param name="lstLocationGroups"></param>
        /// <param name="fromUserId"></param>
        /// <param name="toUserId"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="locationGroupId"></param>
        /// <param name="userId"></param>
        /// <param name="clientIP"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> MoveLocationDetails(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string fromUserId, string toUserId,
                                                             string orgGroupID, string locationGroupId, string userId, string clientIP, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = -1;

            try
            {
                lstLocationGroups.RemoveAll(x => x.CHK_VALUE == 0);

                foreach (var item in lstLocationGroups)
                {
                    if (!_repo.IsLocationExists(orgGroupID, item.LOC_GROUP_ID, toUserId, appId))
                    {
                        StatusCode = _repo.InsertLocationDetails(orgGroupID, item.LOC_GROUP_ID, userId, toUserId, clientIP, appId);

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }
                    }

                    StatusCode = _repo.DeleteLocationDetails(orgGroupID, item.LOC_GROUP_ID, fromUserId, appId);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        response.AtParNotOK(StatusCode, _commonRepo, _log);
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

        /// <summary>
        /// To copy the same Location Details of Logged in User to selected user
        /// </summary>
        /// <param name="lstLocationGroups"></param>
        /// <param name="copyToUserId"></param>
        /// <param name="userId"></param>
        /// <param name="orgGroupID"></param>
        /// <param name="locationGroupId"></param>
        /// <param name="clientIP"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<long> CopyLocationDetails(List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationGroups, string copyToUserId, string userId,
                                                             string orgGroupID, string locationGroupId, string clientIP, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            long StatusCode = -1;

            try
            {
                lstLocationGroups.RemoveAll(x => x.CHK_VALUE == 0);

                foreach (var item in lstLocationGroups)
                {
                    if (!_repo.IsLocationExists(orgGroupID, item.LOC_GROUP_ID, copyToUserId, appId))
                    {
                        StatusCode = _repo.InsertLocationDetails(orgGroupID, item.LOC_GROUP_ID, userId, copyToUserId, clientIP, appId);

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }
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

        /// <summary>
        /// Gets the Location Groups
        /// </summary>
        /// <param name="orgGroupID"></param>
        /// <param name="userId"></param>
        /// <param name="locationGroupId"></param>
        /// <param name="displayMode"></param>
        /// <param name="appId"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_ATPAR_LOC_GROUPS> GetLocationGroups(string orgGroupID, string userId, string locationGroupId,
                                                                          string displayMode, short appId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_LOC_GROUPS>();
            StringBuilder sbUsers = new StringBuilder();

            try
            {
                List<MT_ATPAR_LOC_GROUPS> lstLocationgroups = _repo.GetActiveLocationGroups(orgGroupID, locationGroupId);
                List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstLocationsAllocated = _repo.GetLocationGroupsAssignedToUser(orgGroupID, userId, appId);

                if (lstLocationsAllocated.Count == 0)
                {
                    //if (lstLocationgroups.Count > 0)
                    //{
                        foreach (var item in lstLocationgroups)
                        {
                            sbUsers.Clear();
                            List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstUsers = _repo.GetLocGroupUsers(orgGroupID, item.LOC_GROUP_ID, appId);

                            if (lstUsers.Count > 0)
                            {
                                foreach (var user in lstUsers)
                                {
                                    sbUsers.Append(((!string.IsNullOrEmpty(sbUsers.ToString())) ? "," : ""));
                                    sbUsers.Append(user.USERNAME);
                                }
                            }

                            item.USER_ID = sbUsers.ToString();
                            item.CHK_VALUE = 0;
                            item.CHK_ALLOCATED = "0";
                        }
                    //}
                    //else
                   // {
                        //response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                        //return response;
                    //}
                }
                else if (lstLocationsAllocated.Count > 0)
                {
                   // if (lstLocationgroups.Count != 0)
                   // {
                        foreach (var locGroup in lstLocationgroups)
                        {
                            foreach (var allocLocation in lstLocationsAllocated)
                            {
                                sbUsers.Clear();
                                List<MT_ATPAR_LOC_GROUP_ALLOCATION> lstUsers = _repo.GetLocGroupUsers(orgGroupID, locGroup.LOC_GROUP_ID, appId);

                                if (lstUsers.Count > 0)
                                {
                                    foreach (var user in lstUsers)
                                    {
                                        sbUsers.Append(((!string.IsNullOrEmpty(sbUsers.ToString())) ? "," : ""));
                                        sbUsers.Append(user.USERNAME);
                                    }
                                }

                                locGroup.USER_ID = sbUsers.ToString();
                                if (locGroup.LOC_GROUP_ID == allocLocation.LOC_GROUP_ID)
                                {
                                    locGroup.CHK_VALUE = 1;
                                    locGroup.CHK_ALLOCATED = "1";
                                }
                            }

                        }
                   // }
                    //else
                   // {
                        //response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                   //     return response;
                   // }
                }

                int rowIndex = 0;
                foreach (var item in lstLocationgroups)
                {
                    item.ROWINDEX = rowIndex;
                    rowIndex++;
                }
                response.DataList = lstLocationgroups;


                
                //sort 
                response.DataList = lstLocationgroups.OrderByDescending(x => x.CHK_VALUE == 1).ToList();
              
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
        #endregion
    }
}
