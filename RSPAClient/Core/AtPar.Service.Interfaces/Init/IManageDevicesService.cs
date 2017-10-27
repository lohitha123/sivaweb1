using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;

namespace AtPar.Service.Interfaces.Init
{
    public interface IManageDevicesService
    {
        AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> GetDevIDs(string userID, string search, string[] deviceTokenEntry);

        AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> SaveDevIDs(string userID, string devID, string desc, string macAddr, string[] deviceTokenEntry);

        AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> UpdateDevIDs(string userID, string devID, string desc,string oldMacAddr, string newMacAddr, string[] deviceTokenEntry);

        AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> DisableDevIDs(string userID, string devID, string desc, string macAddr, string[] deviceTokenEntry);

        AtParWebApiResponse<MT_ATPAR_SYSTEM_DEVICES> UpdateDevStatus(string userID, string devID, string Status, string[] deviceTokenEntry);

    }
}
