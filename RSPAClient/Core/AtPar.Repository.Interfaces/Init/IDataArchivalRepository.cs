using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
   public interface IDataArchivalRepository
    {
        List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> DoArchivalData(string appID, string archiveDate, string[] deviceTokenEntry);
        List<MT_ATPAR_APP> GetPurgeAppIDs(string[] deviceTokenEntry);
        long DoArchivalData_DataArchiving(string appID, string archiveDate, string strArchiveDataSource, string strArchiveUserID, string[] deviceTokenEntry);
    }
}
