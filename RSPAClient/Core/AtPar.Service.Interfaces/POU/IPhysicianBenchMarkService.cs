using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.ViewModel;

namespace AtPar.Service.Interfaces.POU
{
    public interface IPhysicianBenchMarkService
    {
        AtParWebApiResponse<VM_POU_PHY_SUMMARY_BY_SPECIALTY> GetPhysicianSummaryBySpeciality(string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
        AtParWebApiResponse<VM_POU_PHY_RANK_DATA> GetPhysicianRankData(string pstrSpecialityCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
        AtParWebApiResponse<VM_POU_PHY_SCORE_CARD_DATA> GetPhysicianScoreCardData(string pstrSpecialityCode, string pstrPhysicianId, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
    }
}
