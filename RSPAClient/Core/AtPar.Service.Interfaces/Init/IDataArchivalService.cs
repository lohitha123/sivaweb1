using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.Init
{
  public  interface IDataArchivalService
    {
        AtParWebApiResponse<MT_ATPAR_CONFIGURATION_SECTION_DTLS> DoArchivalData(string appID, string archiveDate, string[] deviceTokenEntry);
        AtParWebApiResponse<MT_ATPAR_APP> GetPurgeAppIDs(string[] deviceTokenEntry);
    }
}
