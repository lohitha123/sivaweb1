using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.POU;
using AtPar.Service.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.POU.WebApi
{
    public class DepartmentDeviceAllocationController : ApiController
    {
        #region Private Variable

        private ILog _log;
        private IDepartmentDeviceAllocationService _deptwrkStationAllocationService;

        #endregion

        #region Constructor

        public DepartmentDeviceAllocationController(ILog log, IDepartmentDeviceAllocationService deptwrkStationAllocationService)
        {
            _log = log;
            _deptwrkStationAllocationService = deptwrkStationAllocationService;
            _log.SetLoggerType(typeof(DepartmentDeviceAllocationController));     

        }

        #endregion

        #region Public Methods

        [HttpGet]
        public AtParWebApiResponse<MT_POU_DEPT_WORKSTATIONS> GetDeptWorkstations(string departmentID, string orgGrpID, [FromUri] string[] deviceTokenEntry)
        {           
               var result = _deptwrkStationAllocationService.GetDeptWorkstations(departmentID, orgGrpID);
               return result;           
        }

        [HttpPost]
        public AtParWebApiResponse<long> DeleteHospgroupWorkstation(string departmentId, string workStationID, [FromUri] string[] deviceTokenEntry)
        {
              var result = _deptwrkStationAllocationService.DeleteHospgroupWorkstation(departmentId, workStationID);
              return result;            
        }

        [HttpPost]
        public AtParWebApiResponse<long> UpdateHospGroupWorkstations(string departmentId, string workStationID,string workStationDescr, string workStationMacAddr, [FromUri] string[] deviceTokenEntry)
        {            
              var result = _deptwrkStationAllocationService.UpdateHospGroupWorkstations(departmentId, workStationID, workStationDescr,workStationMacAddr);
              return result;            
        }

        [HttpPost]
        public AtParWebApiResponse<long> AddHospGroupWorkstations(string departmentId, string workStationID, string workStationDescr, string workStationMacAddr,string orgGroupID, [FromUri] string[] deviceTokenEntry)
        {
             var result = _deptwrkStationAllocationService.AddHospGroupWorkstations(departmentId, workStationID, workStationDescr, workStationMacAddr, orgGroupID);
             return result;            
        }

        #endregion
    }
}
