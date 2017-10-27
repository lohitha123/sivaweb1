using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.RFID
{
    public interface IRFIDEncodeRepository
    {

        Tuple<long, string> WriteBinTags(List<RF_BIN_MAPPING> lstTags);
        Tuple<long, string> WriteItemTags(List<RF_ITEM_MAPPING> lstTags);
    }
}
