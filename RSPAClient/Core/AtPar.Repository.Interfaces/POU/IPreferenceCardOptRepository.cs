using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;
using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.POU
{
    public interface IPreferenceCardOptRepository
    {
        List<VM_POU_PREF_OPT_BY_SPECIALTY> GetPrefOptBySpeciality(string strYear, string strHalfYear, string strQuarter, string strMonth);
        List<VM_POU_PREF_OPT_BY_PROCEDURE> GetPrefOptByProcedure(string pstrSpecialityCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
        List<VM_POU_PREF_OPT_BY_PHYSICIAN> GetPrefOptByPhysician(string pstrSpecialityCode, string pstrProcedureCode, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
        List<VM_POU_PREF_OPT_BY_PREFERENCE> GetPrefOptByPreference(string pstrSpecialityCode, string pstrProcedureCode, string pstrPhysicianId, string pstrPrefListId, string pstrRemove,
                                                                   string pstrAddToHoldStart, string pstrAddToHoldEnd, string pstrAddToOpen, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
        List<VM_POU_PREF_OPT_HEADER_DATA> GetPrefOptHeaderData(string pstrSpecialityCode, string pstrProcedureCode, string pstrPhysicianId, string pstrPrefListId, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
        int GetCostVarianceAnalysisSupplyDetails(ref System.Data.DataSet pdsResult, string pstrItemGroup, string pstrPhysicianId, string pstrSpecialityCode, string pstrCodeText, string pstrYear, string pstrHalfYear, string pstrQuarter, string pstrMonth);
    }
}
