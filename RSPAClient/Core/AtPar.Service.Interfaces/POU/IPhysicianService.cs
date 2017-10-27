using AtPar.Common;
using AtPar.POCOEntities;


namespace AtPar.Service.Interfaces.POU
{
    public interface IPhysicianService
    {
        AtParWebApiResponse<MT_POU_PHYSICIAN> GetPhysicianList(string strPhysicianID, string strFname, string strLname, string strMinitial);
        AtParWebApiResponse<MT_POU_PHYSICIAN> GetPhysicianList(string physicianId, string physicianName);
        AtParWebApiResponse<MT_POU_PHYSICIAN> DeletePhysician(string physicianId, string physicianStatus, string userID);
        AtParWebApiResponse<MT_POU_PHYSICIAN> UpdatePhysicianDetails(string physicianId, string fName, string lName, string minitial, string userID);
        AtParWebApiResponse<MT_POU_PHYSICIAN> AddPhysicianHeader(string physicianId, string fName, string lName, string minitial, string userID);
    }
}
