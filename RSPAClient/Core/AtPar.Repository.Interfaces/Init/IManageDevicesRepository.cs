using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IManageDevicesRepository
    {
        List<MT_ATPAR_SYSTEM_DEVICES> GetDevIDs(string userID, string search, string[] deviceTokenEntry);

        int CheckIsDevIDExistOrNot(string userID, string devID, string macAddr, string[] deviceTokenEntry);

        long SaveDevIDs(string userID, string devID, string desc, string macAddr,  string[] deviceTokenEntry);

        long UpdateDevIDs(string userID, string devID, string desc,string oldMacAddr, string newMacAddr,  string[] deviceTokenEntry);

        //long DisableDevIDs(string userID, string devID, string desc, string MACAddr, string Mode, string[] deviceTokenEntry);

        long UpdateDevStatus_Inactive(string userID, string devID,  string[] deviceTokenEntry);

        long UpdateDevStatus_Active(string userID, string devID, string[] deviceTokenEntry);

    }
}
