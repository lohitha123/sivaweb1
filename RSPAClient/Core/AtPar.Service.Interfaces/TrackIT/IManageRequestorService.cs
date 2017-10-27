using System.Collections.Generic;
using AtPar.Common;
using AtPar.POCOEntities;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface IManageRequestorService
    {
        AtParWebApiResponse<TKIT_REQUESTOR> GetAllRequestors(string search, string[] deviceTokenEntry);        
        AtParWebApiResponse<long> GetRequestorDetails(string requestorID);
        AtParWebApiResponse<TKIT_DEPT> GetTKITAllDepts(string deptID, string status, string[] deviceTokenEntry);
        // AtParWebApiResponse<long> SaveRequestorDetails(TKIT_REQUESTOR requestor, List<TKIT_REQUESTOR_DEPT> lstRequestorDepts);
        AtParWebApiResponse<long> UpdateRequestorStatus(string requestorID, string status);
 
         AtParWebApiResponse<long> UpdateRequestorDetails(Dictionary<string, dynamic> requestorDetails, string Password);
        AtParWebApiResponse<long> SaveRequestorDetails(Dictionary<string, dynamic> requestorDetails,string Password);
    }
}
