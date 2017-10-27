using System.Collections.Generic;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IPhysicianRepository
    {
        List<MT_POU_PHYSICIAN> GetPhysicianList(string strPhysicianID, string strFname, string strLname, string strMinitial);
        List<MT_POU_PHYSICIAN> GetPhysicianList(string physicianId, string physicianName);
        long DeletePhysician(string physicianId, string physicianStatus, string userID);
        long UpdatePhysicianDetails(string physicianId, string fName, string lName, string minitial, string userID);
        long AddPhysicianHeader(string physicianId, string fName, string lName, string minitial, string userID);

    }
}   