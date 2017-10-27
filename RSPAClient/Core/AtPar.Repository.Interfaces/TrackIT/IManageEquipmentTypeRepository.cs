using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.TrackIT
{
    public interface IManageEquipmentTypeRepository
    {
        bool IsItemTypeExistOrNot(string eqType);
        long SaveEqTypeData(TKIT_ITEM_TYPE itemType);
        long UpdateEqTypeData(TKIT_ITEM_TYPE itemType);
    }
}
