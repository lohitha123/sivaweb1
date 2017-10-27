using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IPhysicianBenchMarkRepository
    {
        List<VM_POU_PHY_SUMMARY_BY_SPECIALTY> GetPhysicianSummaryBySpeciality(string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
        List<VM_POU_PHY_RANK_DATA> GetPhysicianRankData(string pstrSpecialityCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
        List<VM_POU_PHY_SCORE_CARD_DATA> GetPhysicianScoreCardData(string pstrSpecialityCode,string pstrPhysicianId, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
    }
}
