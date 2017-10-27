using AtPar.Common;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.TrackIT
{
    public interface IManageEquipmentTypeService
    {
        AtParWebApiResponse<long> SaveEqTypeData(TKIT_ITEM_TYPE itemType);
        AtParWebApiResponse<long> UpdateEqTypeData(TKIT_ITEM_TYPE itemType);
    }
}
