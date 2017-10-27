using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.TrackIT
{   
    public interface IManageRequestorRepository
    {
        List<TKIT_REQUESTOR> GetAllRequestors(string search, string[] deviceTokenEntry);        
        Dictionary<string, object> GetRequestorDetails(string requestorID);
        List<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, string[] deviceTokenEntry);
        bool IsUserDepartmentExists(string deptID);
        long SaveRequestorDetails(TKIT_REQUESTOR requestor, List<TKIT_REQUESTOR_DEPT> lstRequestorDepts);
        long UpdateRequestorDetails(TKIT_REQUESTOR requestor, List<TKIT_REQUESTOR_DEPT> lstRequestorDepts);
        long UpdateRequestorStatus(string requestorID, string status);
    }
}
