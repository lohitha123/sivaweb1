using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Service.Interfaces.ParManagement
{
    public interface ISetupParLocationsService
    {
        AtParWebApiResponse<PAR_MNGT_PAR_LOC_HEADER> GetLocationHeader(string locID, string orgID);
        AtParWebApiResponse<long> UpdateLoc(PAR_MNGT_PAR_LOC_HEADER objHeader, string mode);
        AtParWebApiResponse<VM_PAR_MNGT_SETUP_LOCATIONS> GetLocations(string orgID, string locID,
                                                                      string locName, string appID,
                                                                      string orgGroupID);
        AtParWebApiResponse<RM_SHIPTO_IDS> GetShipToIds(string orgID);
        AtParWebApiResponse<string> GetOrgIdName(string orgID);
        AtParWebApiResponse<long> AddItems(string locID, string companyID, string comp, string itemID,
                                double optQty, string cntReq, int cntOrder, int replnshType,
                                string flag, string orderingType, string foqQty, string maxQty,
                                string lotCntrld, string srCntrld, string userID, string unitOfIssue,
                                string converstionRate, string costCentercode, string userField1, string status,
                                string invBusinessUnit, string requestionType, string UOMProc, string parUom, string convRtParUom,
                                string chargeCode, string[] deviceTokenEntry);
        AtParWebApiResponse<long> UpdateLocationItems(string locID, string companyID, string compartment, string oldcomprmnt,
                            string itemID, double optQty, string cntReq, int cntOrder, int replnshType, string flag,
                            string orderingType, string foqQty, string maxQty, string lotCntrld, string srCntrld,
                            string costCenterCode, string unitOfIssue, string converstionRate, string userField1,
                            string userID, string status, string invBusinessUnit, string requisitionType, string UOMProc,
                            string parUom, string convRtParUom, List<VM_SETUP_PAR_AUDIT> lstInsertParAudit,
                            string chargeCode, string[] deviceTokenEntry);
        AtParWebApiResponse<VM_PAR_SETUP_PAR_LOCATIONS> GetLocDetails(string locID, string companyID, string itemID, string deptID, string[] deviceTokenEntry);
    }
}
