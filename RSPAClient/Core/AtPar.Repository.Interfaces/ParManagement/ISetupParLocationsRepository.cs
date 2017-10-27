using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.ParManagement
{
    public interface ISetupParLocationsRepository
    {
        List<PAR_MNGT_PAR_LOC_HEADER> GetLocationHeader(string locID, string orgID);
        int GetCountOrgID(PAR_MNGT_PAR_LOC_HEADER objHeader);
        long InsertParLoc(PAR_MNGT_PAR_LOC_HEADER objHeader);
        long UpdateParLoc(PAR_MNGT_PAR_LOC_HEADER objHeader);
        List<VM_PAR_MNGT_SETUP_LOCATIONS> GetLocations(string orgID, string locID, string locName, string appID, string orgGroupID);
        List<RM_SHIPTO_IDS> GetShipToIds(string orgID);
        string GetOrgIdName(string orgID);
        int GetParItemsCount(string itemID);
        int GetParLocationsCount(string locID, string comp, string itemID, string companyID);
        List<PAR_MNGT_ITEM> GetItems(string itemID);
        long InsertItems(string locID, string companyID, string comp, string itemID,
                                double optQty, string cntReq, int cntOrder, int replnshType,
                                string flag, string orderingType, string foqQty, string maxQty,
                                string lotCntrld, string srCntrld, string userID, string unitOfIssue,
                                string converstionRate, string costCentercode, string userField1, string status,
                                string invBusinessUnit, string requestionType, string UOMProc, string parUom,
                                string convRtParUom,string chargeCode, string[] deviceTokenEntry);
        int GetParLocationsBinCount(string locID, string compartment, string itemID, string companyID);
        int GetParItemStatus(string locID, string compartment, string itemID, string companyID);
        long UpdateItemStatus(string itemID);
        long UpdatePOUInvItemBin(string orgID, string parLoc, string itemID, string prvBinLoc,
                                         string binLoc, char newStatus);
        long UpdateLocationItems(string locID, string companyID, string compartment, string oldcomprmnt,
                            string itemID, double optQty, string cntReq, int cntOrder, int replnshType, string flag,
                            string orderingType, string foqQty, string maxQty, string lotCntrld, string srCntrld,
                            string costCenterCode, string unitOfIssue, string converstionRate, string userField1,
                            string userID, string status, string invBusinessUnit, string requisitionType, string UOMProc, string parUom,
                            string convRtParUom, string chargeCode, string[] deviceTokenEntry);
        List<VM_PAR_SETUP_PAR_LOCATIONS> GetLocDetails(string locID, string companyID, string itemID, string deptID, string[] deviceTokenEntry);
    }
}
