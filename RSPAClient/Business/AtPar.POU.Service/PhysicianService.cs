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
    public class PhysicianService : IPhysicianService
    {
        IPhysicianRepository _physicianRepo;
        ILog _log;
        ICommonRepository _commonRepo;

        public PhysicianService(IPhysicianRepository repository, ILog log, ICommonRepository commonRepository)
        {
            _physicianRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
        }
        /// <summary>
        /// Used to get the physician list
        /// </summary>
        /// <param name="strPhysicianID"></param>
        /// <param name="strFname"></param>
        /// <param name="strLname"></param>
        /// <param name="strMinitial"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_PHYSICIAN> GetPhysicianList(string strPhysicianID, string strFname, string strLname, string strMinitial)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            strPhysicianID = strPhysicianID.ReplaceNullwithEmpty().ReplaceString();
            strFname = strFname.ReplaceNullwithEmpty().ReplaceString();
            strLname = strLname.ReplaceNullwithEmpty().ReplaceString();
            strMinitial = strMinitial.ReplaceNullwithEmpty().ReplaceString();
            var response = new AtParWebApiResponse<MT_POU_PHYSICIAN>();

            try
            {
                response.DataList = _physicianRepo.GetPhysicianList(strPhysicianID, strFname, strLname,strMinitial);

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
        /// Gets the Physician Details for the Specified PhysicainId, Physician First Name and Last Name
        /// </summary>
        /// <param name="physicianId"></param>
        /// <param name="physicianName"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_PHYSICIAN> GetPhysicianList(string physicianId, string physicianName)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_POU_PHYSICIAN>();

            try
            {
                response.DataList = _physicianRepo.GetPhysicianList(physicianId.ReplaceNullwithEmpty().ReplaceString(), 
                                                                    physicianName.ReplaceNullwithEmpty().ReplaceString());

                if (response.DataList.Count > 0)
                {
                    response.AtParSuccess();
                }
                else
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                }

                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        /// <summary>
        /// Used to delete the physician
        /// </summary>
        /// <param name="physicianId"></param>
        /// <param name="physicianStatus"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_PHYSICIAN> DeletePhysician(string physicianId, string physicianStatus, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_POU_PHYSICIAN>();
            physicianId = physicianId.ReplaceNullwithEmpty().ReplaceString();
            physicianStatus = physicianStatus.ReplaceNullwithEmpty().ReplaceString();
            userID = userID.ReplaceNullwithEmpty().ReplaceString();
            try
            {
                long StatusCode = _physicianRepo.DeletePhysician(physicianId, physicianStatus, userID);
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
        /// Used to update the physician
        /// </summary>
        /// <param name="physicianId"></param>
        /// <param name="fName"></param>
        /// <param name="lName"></param>
        /// <param name="minitial"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_PHYSICIAN> UpdatePhysicianDetails(string physicianId, string fName, string lName, string minitial, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_POU_PHYSICIAN>();
            physicianId = physicianId.ReplaceNullwithEmpty().ReplaceString();
            fName = fName.ReplaceNullwithEmpty().ReplaceString();
            lName = lName.ReplaceNullwithEmpty().ReplaceString();
            minitial = minitial.ReplaceNullwithEmpty().ReplaceString();
            userID = userID.ReplaceNullwithEmpty().ReplaceString();
            try
            {
                long StatusCode = _physicianRepo.UpdatePhysicianDetails(physicianId, fName, lName, minitial, userID);
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
        /// Used to add the physician
        /// </summary>
        /// <param name="physicianId"></param>
        /// <param name="fName"></param>
        /// <param name="lName"></param>
        /// <param name="minitial"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        public AtParWebApiResponse<MT_POU_PHYSICIAN> AddPhysicianHeader(string physicianId, string fName, string lName, string minitial, string userID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            var response = new AtParWebApiResponse<MT_POU_PHYSICIAN>();
            physicianId = physicianId.ReplaceNullwithEmpty().ReplaceString();
            fName = fName.ReplaceNullwithEmpty().ReplaceString();
            lName = lName.ReplaceNullwithEmpty().ReplaceString();
            minitial = minitial.ReplaceNullwithEmpty().ReplaceString();
            userID = userID.ReplaceNullwithEmpty().ReplaceString();
            try
            {
                long StatusCode = _physicianRepo.AddPhysicianHeader(physicianId, fName, lName, minitial, userID);
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
