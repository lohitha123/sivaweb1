using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class PhysicianController :ApiController
    {
        #region Private Variable

        private IPhysicianService _physicianService;
        private ILog _log;

        #endregion

        #region Constructor
        
        public PhysicianController(IPhysicianService physicianService, ILog log)
        {
            _physicianService = physicianService;
            _log = log;
            _log.SetLoggerType(typeof(PhysicianController));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Used to get the physician list
        /// </summary>
        /// <param name="strPhysicianID"></param>
        /// <param name="strFname"></param>
        /// <param name="strLname"></param>
        /// <param name="strMinitial"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_POU_PHYSICIAN> GetPhysicianList(string strPhysicianID, string strFname, string strLname, string strMinitial, [FromUri] string[] deviceTokenEntry)
        {          
                var result = _physicianService.GetPhysicianList(strPhysicianID, strFname, strLname, strMinitial);
                return result;            
        }

        /// <summary>
        /// Gets the Physician Details for the Specified PhysicainId, Physician First Name and Last Name
        /// </summary>
        /// <param name="physicianId"></param>
        /// <param name="physicianName"></param>
        /// <returns></returns>
        [HttpGet]
        public AtParWebApiResponse<MT_POU_PHYSICIAN> GetPhysicianList(string physicianId, string physicianName)
        {
            var result = _physicianService.GetPhysicianList(physicianId, physicianName);
            return result;
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
        [HttpPost]
        public AtParWebApiResponse<MT_POU_PHYSICIAN> AddPhysicianHeader(string physicianId, string fName, string lName, string minitial, string userID, [FromUri] string[] deviceTokenEntry)
        {
                var result = _physicianService.AddPhysicianHeader(physicianId, fName, lName, minitial, userID);
                return result;          
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
        [HttpPut]
        public AtParWebApiResponse<MT_POU_PHYSICIAN> UpdatePhysicianDetails(string physicianId, string fName, string lName, string minitial, string userID, [FromUri] string[] deviceTokenEntry)
        {
            var result = _physicianService.UpdatePhysicianDetails(physicianId, fName, lName, minitial, userID);
            return result;           
        }

        /// <summary>
        /// Used to delete the physician
        /// </summary>
        /// <param name="physicianId"></param>
        /// <param name="physicianStatus"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpPut]
        public AtParWebApiResponse<MT_POU_PHYSICIAN> DeletePhysician(string physicianId, string physicianStatus, string userID, [FromUri] string[] deviceTokenEntry)
        {           
                var result = _physicianService.DeletePhysician(physicianId, physicianStatus, userID);               
                return result;
        }

        #endregion

    }
}
