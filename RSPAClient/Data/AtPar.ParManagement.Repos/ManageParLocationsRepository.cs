using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.ParManagement;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ParManagement.Repos
{
    public class ManageParLocationsRepository : IManageParLocationsRepository
    {
        #region Private Variables

        private ILog _log;

        #endregion

        #region Constructor
        public ManageParLocationsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageParLocationsRepository));
        }

        #endregion

        #region GetMultipleLocations
        public List<VM_PAR_MNGT_SETUP_LOCATIONS> GetMultipleLocations(string orgID, string locID, string locName,
                                                                string orgGroupID, string depID, string depName,
                                                                string itemID, string itemName, string priceFrom,
                                                                string priceTo, int appID, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            String[] fields = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (itemID != string.Empty || itemName != string.Empty || priceFrom != string.Empty || priceTo != string.Empty)
                    {

                        sbSql.Append(" SELECT DISTINCT PLH.COST_CENTER_CODE,PLH.PAR_LOC_ID,PLH.LOCATION_NAME, ");
                        sbSql.Append(" PMLD.ORG_ID BUSINESS_UNIT   ");
                        sbSql.Append(" FROM PAR_MNGT_PAR_LOC_HEADER PLH, PAR_MNGT_PAR_LOC_DETAILS PMLD, PAR_MNGT_COST_CENTER PCC, ");
                        sbSql.Append(" PAR_MNGT_ITEM PMI WHERE PLH.COST_CENTER_CODE = PCC.COST_CENTER_CODE AND PMLD.PAR_LOC_ID =  PLH.PAR_LOC_ID AND PMLD.ITEM_ID = PMI.ITEM_ID AND PLH.ORG_ID = PMLD.ORG_ID ");

                        if (!string.IsNullOrEmpty(orgID))
                        {
                            sbSql.Append(" AND PMLD.ORG_ID= '" + orgID + "'");
                        }

                        if (!string.IsNullOrEmpty(depID))
                        {
                            sbSql.Append(" AND PCC.COST_CENTER_CODE LIKE '" + depID + "%'");
                        }
                        if (!string.IsNullOrEmpty(depName))
                        {
                            sbSql.Append(" AND PCC.DESCRIPTION LIKE '" + depName + "%'");
                        }

                        if (!string.IsNullOrEmpty(locID))
                        {
                            sbSql.Append(" AND PMLD.PAR_LOC_ID LIKE '" + locID + "%'");
                        }

                        if (!string.IsNullOrEmpty(itemID))
                        {
                            sbSql.Append(" AND PMLD.ITEM_ID LIKE '" + itemID + "%'");
                        }

                        if (!string.IsNullOrEmpty(itemName))
                        {
                            sbSql.Append(" AND PMI.SHORT_DESCR LIKE '" + itemName + "%'");
                        }

                        if (!string.IsNullOrEmpty(priceFrom) & !string.IsNullOrEmpty(priceTo))
                        {
                            sbSql.Append(" AND ( PMI.ITEM_PRICE >= " + Convert.ToDouble(priceFrom) + " AND PMI.ITEM_PRICE <= " + Convert.ToDouble(priceTo) + ")");
                        }
                        fields = new[] { "COST_CENTER_CODE", "PAR_LOC_ID", "LOCATION_NAME", "BUSINESS_UNIT" };

                    }
                    else
                    {
                        sbSql.Append("SELECT DISTINCT  PMC.COST_CENTER_CODE,PMH.PAR_LOC_ID,PMH.LOCATION_NAME,PMGB.BUSINESS_UNIT,");
                        sbSql.Append(" PMH.CART_TYPE,PMH.POU_CART");
                        sbSql.Append(" FROM PAR_MNGT_PAR_LOC_HEADER PMH,PAR_MNGT_COST_CENTER PMC,MT_ATPAR_ORG_GROUP_BUNITS PMGB");
                        sbSql.Append(" WHERE PMH.ORG_ID = PMGB.BUSINESS_UNIT And PMH.COST_CENTER_CODE = PMC.COST_CENTER_CODE");

                        if (appID == (int)AtParWebEnums.EnumApps.PointOfUse)
                        {
                            sbSql.Append(" AND PMH.POU_CART='Y'");
                        }
                        else if (appID == (int)AtParWebEnums.EnumApps.Pharmacy)
                        {
                            sbSql.Append(" AND PMH.POU_CART='P'");
                        }

                        if (orgID != string.Empty)
                        {
                            sbSql.Append(" AND PMH.ORG_ID LIKE '" + orgID + "%'");
                        }

                        if (!string.IsNullOrEmpty(depID))
                        {
                            sbSql.Append(" AND PMC.COST_CENTER_CODE LIKE '" + depID + "%'");
                        }
                        if (!string.IsNullOrEmpty(depName))
                        {
                            sbSql.Append(" AND PMC.DESCRIPTION LIKE '" + depName + "%'");
                        }


                        if (locID != string.Empty)
                        {
                            sbSql.Append(" AND PMH.PAR_LOC_ID LIKE '" + locID + "%'");
                        }

                        if (locName != string.Empty)
                        {
                            sbSql.Append(" AND PMH.LOCATION_NAME LIKE '" + locName + "%'");
                        }

                        if (orgID == string.Empty & orgGroupID != "All")
                        {
                            sbSql.Append(" AND PMH.ORG_ID IN(SELECT  DISTINCT BUSINESS_UNIT  FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID =(");
                            sbSql.Append(" SELECT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUPS WHERE ORG_GROUP_ID= '" + orgGroupID + "' )  AND BU_TYPE='I')");
                        }
                        fields = new[] { "COST_CENTER_CODE", "PAR_LOC_ID", "LOCATION_NAME", "BUSINESS_UNIT", "CART_TYPE", "POU_CART" };
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }



                    //var lstLocations = objContext.Database.SqlQuery<VM_PAR_MNGT_PAR_LOCATION>(sbSql.ToString()).ToList();
                    var lstLocations = objContext.Database.DifferedExecuteQuery<VM_PAR_MNGT_SETUP_LOCATIONS>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstLocations); }

                    return lstLocations;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region GetItemsToAddMultipleParLocations
        public List<VM_PAR_MNGT_PAR_LOCATION> GetItemsToAddMulParLocReqTypeU(string itemID, string orgGroupID, string orgID,
                                             string parLocations, string appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            String[] fields = null;
            var parLocIDs = parLocations.Replace("^", "','");

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT PMLD.ORG_ID BUSINESS_UNIT, A.PAR_LOC_ID +' - '+A.LOCATION_NAME PARDESC, ");
                    sbSql.Append("PMI.ITEM_ID +' - '+ PMI.SHORT_DESCR ITEMDESC, PMI.ITEM_PRICE, PMLD.ORG_ID, PMLD.PAR_LOC_ID, ");
                    sbSql.Append("PMLD.BIN_LOC, PMLD.ITEM_ID, PMLD.STATUS, PMLD.COUNT_ORDER, PMLD.OPTIMAL_QTY, PMLD.COUNT_REQUIRED, ");
                    sbSql.Append("PMLD.FILL_KILL_FLAG, PMLD.MAX_QTY, PMLD.FOQ_QTY, PMLD.ORDERING_TYPE, ");
                    sbSql.Append("PMLD.USER_FIELD_1, PMLD.LAST_UPDATE_DATE, ");
                    sbSql.Append("PMLD.LAST_UPDATE_USER, PMLD.LAST_CLIENT_ADDRESS, PMLD.INV_BUSINESS_UNIT, PMLD.REQUISITION_TYPE, ");
                    sbSql.Append("CASE WHEN PMLD.UNIT_OF_PROCUREMENT = '' THEN PMI.UNIT_OF_PROCUREMENT ELSE PMLD.UNIT_OF_PROCUREMENT END AS UNIT_OF_PROCUREMENT, ");
                    sbSql.Append("CASE WHEN PMLD.UNIT_OF_ISSUE='' THEN PMI.UNIT_OF_ISSUE ELSE PMLD.UNIT_OF_ISSUE END AS UNIT_OF_ISSUE, ");
                    sbSql.Append("CASE WHEN PMLD.REPLENISHMENT_TYPE='' THEN PMI.REPLENISHMENT_TYPE ELSE PMLD.REPLENISHMENT_TYPE END AS REPLENISHMENT_TYPE, ");
                    sbSql.Append("CASE WHEN PMLD.SERIAL_CONTROLLED='' THEN PMI.SERIAL_CONTROLLED ELSE PMLD.SERIAL_CONTROLLED END AS SERIAL_CONTROLLED, ");
                    sbSql.Append("CASE WHEN PMLD.LOT_CONTROLLED='' THEN PMI.LOT_CONTROLLED ELSE PMLD.LOT_CONTROLLED END AS LOT_CONTROLLED, ");
                    sbSql.Append("CASE WHEN PMLD.CHARGE_CODE='' THEN PMI.CHARGE_CODE ELSE PMLD.CHARGE_CODE END AS CHARGE_CODE, ");
                    sbSql.Append("CASE WHEN PMLD.COST_CENTER='' THEN A.COST_CENTER_CODE ELSE PMLD.COST_CENTER END AS COST_CENTER, ");
                    sbSql.Append("CASE WHEN PMLD.PAR_UOM='' THEN PMI.PAR_UOM ELSE PMLD.PAR_UOM END AS PAR_UOM, ");
                    sbSql.Append("CASE WHEN PMLD.CONV_RATE_PAR_UOM='' THEN PMI.CONV_RATE_PAR_UOM ELSE PMLD.CONV_RATE_PAR_UOM END AS CONV_RATE_PAR_UOM, ");
                    sbSql.Append("CASE WHEN PMLD.CONVERSION_RATE='' THEN PMI.CONV_FACTOR ELSE PMLD.CONVERSION_RATE END AS CONVERSION_RATE, PMI.SUBSTITUTE_ITEM_FLG ");
                    sbSql.Append("FROM PAR_MNGT_PAR_LOC_HEADER A, PAR_MNGT_PAR_LOC_DETAILS PMLD, PAR_MNGT_ITEM PMI, RM_ORG_UNITS R ");
                    sbSql.Append("WHERE PMLD.ITEM_ID = PMI.ITEM_ID AND PMLD.PAR_LOC_ID =  A.PAR_LOC_ID AND PMLD.ORG_ID =   A.ORG_ID AND ");
                    sbSql.Append("PMI.STATUS = 0  AND ");

                    if (itemID == "All")
                    {
                        sbSql.Append("  PMLD.PAR_LOC_ID IN ('" + parLocIDs.Substring(0, parLocIDs.Length - 3) + "') AND PMLD.ORG_ID='" + orgID + "'  ");
                    }
                    else
                    {
                        sbSql.Append("  PMLD.ITEM_ID like'" + itemID + "%' AND PMLD.PAR_LOC_ID IN ('" + parLocIDs.Substring(0, parLocIDs.Length - 3) + "') AND PMLD.ORG_ID='" + orgID + "'  ");
                    }


                    sbSql.Append("AND R.MASTER_GROUP_ID= PMI.ORG_GROUP_ID  AND R.ORG_ID = PMLD.ORG_ID ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    fields = new[] { "BUSINESS_UNIT", "PAR_LOC_ID", "PARDESC", "ITEM_ID", "ITEMDESC", "ITEM_PRICE",
                            "ORG_ID", "BIN_LOC", "STATUS", "COUNT_ORDER", "OPTIMAL_QTY", "COUNT_REQUIRED", "FILL_KILL_FLAG",
                            "MAX_QTY", "FOQ_QTY", "ORDERING_TYPE", "USER_FIELD_1", "LAST_UPDATE_DATE", "LAST_UPDATE_USER",
                            "LAST_CLIENT_ADDRESS", "INV_BUSINESS_UNIT", "REQUISITION_TYPE","UNIT_OF_PROCUREMENT","UNIT_OF_ISSUE",
                            "REPLENISHMENT_TYPE","SERIAL_CONTROLLED","COST_CENTER","CONVERSION_RATE","CONV_RATE_PAR_UOM","PAR_UOM","CHARGE_CODE","LOT_CONTROLLED"
                        };

                    var lstParLocations = objContext.Database.DifferedExecuteQuery<VM_PAR_MNGT_PAR_LOCATION>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of parlocations returned " + lstParLocations.Count); }

                    return lstParLocations;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        public List<VM_PAR_MNGT_PAR_HEADER> GetItemsToAddMulParLoc(string itemID, string orgGroupID, string orgID,
                                              string parLocations,string appID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            var parLocIDs = parLocations.Replace("^", "','");

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    parLocIDs = parLocIDs.Substring(0, parLocIDs.Length - 3);
                    sbSql.Append("SELECT DISTINCT PMH.ORG_ID, PMH.PAR_LOC_ID,PMH.LOCATION_NAME,'' BIN_LOC ,'' REQUISITION_TYPE,");
                    sbSql.Append("'Y' STATUS ,PMH.PAR_LOC_ID +' - '+PMH.LOCATION_NAME  PARDESC ,PMGB.BUSINESS_UNIT,");
                    sbSql.Append("ITM.ITEM_ID + ' - '+ ITM.SHORT_DESCR  ITEMDESC, ITM.*,'' OPTIMAL_QTY,'' FOQ_QTY,'' ");
                    sbSql.Append("MAX_QTY,'' ORDERING_TYPE,ITM.CONV_FACTOR CONVERSION_RATE,PMH.ORG_ID INV_BUSINESS_UNIT,");
                    sbSql.Append("'0' FILL_KILL_FLAG,PMH.COST_CENTER_CODE COST_CENTER,'' COUNT_REQUIRED ,'' COUNT_ORDER  ");
                    sbSql.Append("FROM PAR_MNGT_PAR_LOC_HEADER PMH,PAR_MNGT_COST_CENTER PMC,MT_ATPAR_ORG_GROUP_BUNITS PMGB ,");
                    sbSql.Append("PAR_MNGT_ITEM ITM WHERE PMH.ORG_ID = PMGB.BUSINESS_UNIT And PMH.COST_CENTER_CODE = PMC.COST_CENTER_CODE");
                    sbSql.Append(" AND ITM.ITEM_ID='" + itemID + "' AND PMH.PAR_LOC_ID in ");
                    sbSql.Append("('" + parLocIDs + "')");
                    sbSql.Append(" AND PMH.ORG_ID='" + orgID + "' AND ITM.STATUS = 0 ");
                    if (appID == AtParWebEnums.EnumApps.Pharmacy.ToString())
                    {
                        sbSql.Append("AND ITM.PHARMACY_FLG=1 AND ITM.SUBSTITUTE_ITEM_FLG=0 ");

                    }
                    else
                    {
                        sbSql.Append("AND ITM.PHARMACY_FLG=0 AND ITM.SUBSTITUTE_ITEM_FLG=0 ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstParLocations = objContext.Database.SqlQuery<VM_PAR_MNGT_PAR_HEADER>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of parlocations returned " + lstParLocations.Count); }
                    return lstParLocations;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        #endregion

        #region UpdateMultipleParItems

        public long UpdateMultipleParItems(List<PAR_MNGT_PAR_LOC_DETAILS> objParItems, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long statusCode = -1;
            int itmCount = 0;
            string flag;
            List<VM_SETUP_PAR_AUDIT> lstParAudits = new List<VM_SETUP_PAR_AUDIT>();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        foreach (var item in objParItems)
                        {
                            if (item.RECORDTYPE == "N")
                            {
                                itmCount = GetParLocationCount(item, objContext);

                                if (itmCount == 0)
                                {
                                    flag = "INSERT";
                                    statusCode = InsertParLoc(item, deviceTokenEntry, flag, objContext);
                                    if(statusCode== AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION)
                                    {
                                        return statusCode;
                                    }
                                    if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        return statusCode;
                                    }
                                }
                                else
                                {
                                    return AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION;
                                }
                            }
                            else
                            {
                                string itemID = string.Empty;
                                if (!string.IsNullOrEmpty(item.PREV_BIN_LOC))
                                {
                                    itemID = item.PREV_BIN_LOC;
                                }
                                else
                                {
                                    itemID = item.ITEM_ID;
                                }
                                statusCode = UpdatePOUInvItemBin(item.ORG_ID, item.PAR_LOC_ID, itemID, item.PREV_BIN_LOC, item.BIN_LOC, Convert.ToChar(item.STATUS), objContext);
                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                                flag = "UPDATE";
                                statusCode = InsertParLoc(item, deviceTokenEntry, flag, objContext);
                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }


                                VM_SETUP_PAR_AUDIT objParAudit = new VM_SETUP_PAR_AUDIT();
                                objParAudit.BUNIT = item.INV_BUSINESS_UNIT;
                                objParAudit.CRTID = item.PAR_LOC_ID;
                                objParAudit.ITEMID = item.ITEM_ID;
                                objParAudit.COMPARTMENT = item.BIN_LOC;
                                objParAudit.PARQTY = item.PREV_OPTIMAL_QTY;
                                objParAudit.USERID = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID];
                                objParAudit.UOM = item.UNIT_OF_ISSUE;
                                objParAudit.NOPQTY = item.OPTIMAL_QTY.ToString();
                                lstParAudits.Add(objParAudit);
                            }
                        }
                        DataSet dsInsertParAudit = new DataSet();
                        DataTable dsATbl = lstParAudits.ToDataTable();
                        if (dsATbl.Rows.Count > 0)
                        {
                            dsInsertParAudit.Tables.Add(dsATbl);
                            if (dsInsertParAudit.Tables.Count > 0)
                            {
                                statusCode = InsertParAuditReport(dsInsertParAudit, deviceTokenEntry);
                                if (statusCode == AtparStatusCodes.ATPAR_OK)
                                {
                                    trans.Commit();
                                }
                                else
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                            }
                        }
                        else
                        {
                            trans.Commit();
                        }

                    }
                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        private long InsertParAuditReport(DataSet dsInsertParAudit, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {

                DataSet dsHeaders = new DataSet();
                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                GetConfigData();

                erpObjName = "CartCount_Atpar";
                className = "SendCart";
                methodName = "InsertParAuditReport";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { dsInsertParAudit, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                return StatusCode;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }
        private long UpdatePOUInvItemBin(string orgID, string parLoc, string itemID, string prvBinLoc,
                                         string binLoc, char newStatus, ATPAR_MT_Context objContext)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;
            string strPwd = string.Empty;
            string strHashVal = string.Empty;

            try
            {
                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                SqlParameter paramOrgID = new SqlParameter("@ORG_ID", SqlDbType.NVarChar, 50);
                paramOrgID.Value = orgID;

                SqlParameter paramParLoc = new SqlParameter("@PAR_LOC", SqlDbType.NVarChar, 50);
                paramParLoc.Value = parLoc;

                SqlParameter paramItemID = new SqlParameter("@ITEM_ID", SqlDbType.NVarChar, 50);
                paramItemID.Value = itemID;

                SqlParameter paramPrvBinLoc = new SqlParameter("@PRV_BIN_LOC", SqlDbType.NVarChar, 50);
                paramPrvBinLoc.Value = prvBinLoc;

                SqlParameter paramBinLoc = new SqlParameter("@BIN_LOC", SqlDbType.NVarChar, 50);
                paramBinLoc.Value = binLoc;

                SqlParameter paramNewStatus = new SqlParameter("@NEW_STATUS", SqlDbType.Char, 1);
                paramNewStatus.Value = newStatus;


                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                var count = objContext.Database.ExecuteSqlCommand("exec UpdatePOUInvItemBin @ORG_ID," +
                                                         "@PAR_LOC,@ITEM_ID,@PRV_BIN_LOC,@BIN_LOC,@NEW_STATUS",
                                                          paramOrgID, paramParLoc, paramItemID, paramPrvBinLoc,
                                                          paramBinLoc, paramNewStatus);

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                return statusCode;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        private int GetParLocationCount(PAR_MNGT_PAR_LOC_DETAILS objLocDetails, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT COUNT(*) FROM PAR_MNGT_PAR_LOC_DETAILS ");
                sbSql.Append("WHERE BIN_LOC='" + objLocDetails.BIN_LOC + "'");
                sbSql.Append(" AND PAR_LOC_ID='" + objLocDetails.PAR_LOC_ID + "'");
                sbSql.Append(" AND ORG_ID='" + objLocDetails.ORG_ID + "'");
                sbSql.Append(" AND ITEM_ID='" + objLocDetails.ITEM_ID + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }

                var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + count); }

                return count;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }
        private long InsertParLoc(PAR_MNGT_PAR_LOC_DETAILS objLocDetails, string[] deviceTokenEntry, string flag, ATPAR_MT_Context objContext)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;
            string strPwd = string.Empty;
            string strHashVal = string.Empty;
            StringBuilder sbSql = new StringBuilder();

            try
            {
                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                SqlParameter paramOrgID = new SqlParameter("@ORG_ID", SqlDbType.NVarChar);
                paramOrgID.Value = objLocDetails.ORG_ID;

                SqlParameter paramCount = new SqlParameter("@COUNT_ORDER", SqlDbType.Int);
                if (!string.IsNullOrEmpty(objLocDetails.COUNT_ORDER.ToString()))
                {
                    paramCount.Value = Convert.ToInt32(objLocDetails.COUNT_ORDER);
                }
                else
                {
                    paramCount.Value = 0;
                }

                SqlParameter paramItemID = new SqlParameter("@ITEM_ID", SqlDbType.NVarChar);
                if (flag == "INSERT")
                {
                    paramItemID.Value = objLocDetails.ITEM_ID;
                }
                else
                {
                    if (!string.IsNullOrEmpty(objLocDetails.PREV_ITM_ID))
                    {
                        paramItemID.Value = objLocDetails.PREV_ITM_ID;
                    }
                    else
                    {
                        paramItemID.Value = objLocDetails.ITEM_ID;
                    }
                }
                SqlParameter paramParLocID = new SqlParameter("@PAR_LOC_ID", SqlDbType.NVarChar);
                paramParLocID.Value = objLocDetails.PAR_LOC_ID;

                SqlParameter paramBinLoc = new SqlParameter("@BIN_LOC", SqlDbType.NVarChar);
                paramBinLoc.Value = objLocDetails.BIN_LOC;

                SqlParameter paramStatus = new SqlParameter("@STATUS", SqlDbType.Char);
                paramStatus.Value = objLocDetails.STATUS;

                SqlParameter paramQty = new SqlParameter("@OPTIMAL_QTY", SqlDbType.Float);
                if (!string.IsNullOrEmpty(objLocDetails.OPTIMAL_QTY.ToString()))
                {
                    paramQty.Value = Convert.ToDouble(objLocDetails.OPTIMAL_QTY);
                }
                else
                {
                    paramQty.Value = 0;
                }

                SqlParameter paramRequired = new SqlParameter("@COUNT_REQUIRED", SqlDbType.NVarChar);
                paramRequired.Value = objLocDetails.COUNT_REQUIRED;

                SqlParameter paramType = new SqlParameter("@REPLENISHMENT_TYPE", SqlDbType.Int);
                if (!string.IsNullOrEmpty(objLocDetails.REPLENISHMENT_TYPE.ToString()))
                {
                    paramType.Value = Convert.ToDouble(objLocDetails.REPLENISHMENT_TYPE);
                }
                else
                {
                    paramType.Value = 0;
                }

                SqlParameter paramFillFlag = new SqlParameter("@FILL_KILL_FLAG", SqlDbType.NVarChar);
                paramFillFlag.Value = objLocDetails.FILL_KILL_FLAG;

                SqlParameter paramLot = new SqlParameter("@LOT_CONTROLLED", SqlDbType.NVarChar);
                paramLot.Value = objLocDetails.LOT_CONTROLLED;

                SqlParameter paramSerial = new SqlParameter("@SERIAL_CONTROLLED", SqlDbType.NVarChar);
                paramSerial.Value = objLocDetails.SERIAL_CONTROLLED;

                SqlParameter paramMaxQty = new SqlParameter("@MAX_QTY", SqlDbType.Float);
                if (!string.IsNullOrEmpty(objLocDetails.MAX_QTY.ToString()))
                {
                    paramMaxQty.Value = Convert.ToDouble(objLocDetails.MAX_QTY);
                }
                else
                {
                    paramMaxQty.Value = 0;
                }

                SqlParameter paramFQty = new SqlParameter("@FOQ_QTY", SqlDbType.Float);
                if (!string.IsNullOrEmpty(objLocDetails.FOQ_QTY.ToString()))
                {
                    paramFQty.Value = Convert.ToDouble(objLocDetails.FOQ_QTY);
                }
                else
                {
                    paramFQty.Value = 0;
                }

                SqlParameter paramOrderType = new SqlParameter("@ORDERING_TYPE", SqlDbType.VarChar);
                paramOrderType.Value = objLocDetails.ORDERING_TYPE;

                SqlParameter paramCode = new SqlParameter("@CHARGE_CODE", SqlDbType.NVarChar);
                paramCode.Value = objLocDetails.CHARGE_CODE;

                SqlParameter paramCenter = new SqlParameter("@COST_CENTER", SqlDbType.NVarChar);
                paramCenter.Value = objLocDetails.COST_CENTER;

                SqlParameter paramIssue = new SqlParameter("@UNIT_OF_ISSUE", SqlDbType.NVarChar);
                paramIssue.Value = objLocDetails.UNIT_OF_ISSUE;

                SqlParameter paramRate = new SqlParameter("@CONVERSION_RATE", SqlDbType.Float);
                if (!string.IsNullOrEmpty(objLocDetails.CONVERSION_RATE.ToString()))
                {
                    paramRate.Value = Convert.ToDouble(objLocDetails.CONVERSION_RATE);
                }
                else
                {
                    paramRate.Value = 0;
                }

                SqlParameter paramField = new SqlParameter("@USER_FIELD_1", SqlDbType.NVarChar);
                paramField.Value = objLocDetails.USER_FIELD_1;

                SqlParameter paramUser = new SqlParameter("@LAST_UPDATE_USER", SqlDbType.NVarChar);
                paramUser.Value = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID];

                SqlParameter paramBUnit = new SqlParameter("@INV_BUSINESS_UNIT", SqlDbType.NVarChar);
                paramBUnit.Value = objLocDetails.INV_BUSINESS_UNIT;

                SqlParameter paramRequisition = new SqlParameter("@REQUISITION_TYPE", SqlDbType.NVarChar);
                paramRequisition.Value = objLocDetails.REQUISITION_TYPE;

                SqlParameter paramProcurement = new SqlParameter("@UNIT_OF_PROCUREMENT", SqlDbType.NVarChar);
                paramProcurement.Value = objLocDetails.UNIT_OF_PROCUREMENT;

                SqlParameter paramSelectedItem = new SqlParameter("@SELECTED_ITEM_ID", SqlDbType.NVarChar);
                paramSelectedItem.Value = objLocDetails.ITEM_ID;

                SqlParameter paramPrevBin = new SqlParameter("@PREV_BIN_LOC", SqlDbType.NVarChar);
                paramPrevBin.Value = objLocDetails.PREV_BIN_LOC;

                SqlParameter paramParUom = new SqlParameter("@PAR_UOM", SqlDbType.NVarChar);
                paramParUom.Value = objLocDetails.PAR_UOM;

                SqlParameter paramConvRtParUom = new SqlParameter("@CONV_RATE_PAR_UOM", SqlDbType.Float);
                if (!string.IsNullOrEmpty(objLocDetails.CONV_RATE_PAR_UOM.ToString()))
                {
                    paramConvRtParUom.Value = Convert.ToDouble(objLocDetails.CONV_RATE_PAR_UOM);
                }
                else
                {
                    paramConvRtParUom.Value = 0;
                }

                SqlParameter paramFlag = new SqlParameter("@FLAG", SqlDbType.NVarChar);
                paramFlag.Value = flag;


                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }


                sbSql.Append("exec ADD_SUBSTITUTE_TO_PAR_LOC_DETAILS @ORG_ID='" + paramOrgID.Value + "',");
                sbSql.Append("@COUNT_ORDER=" + paramCount.Value + ",");
                sbSql.Append("@ITEM_ID='" + paramItemID.Value + "',");
                sbSql.Append("@PAR_LOC_ID='" + paramParLocID.Value + "',");
                sbSql.Append("@BIN_LOC='" + paramBinLoc.Value + "',");
                sbSql.Append("@STATUS='" + paramStatus.Value + "',");
                sbSql.Append("@OPTIMAL_QTY=" + paramQty.Value + ",");
                sbSql.Append("@COUNT_REQUIRED='" + paramRequired.Value + "',");
                sbSql.Append("@REPLENISHMENT_TYPE=" + paramType.Value + ",");
                sbSql.Append("@FILL_KILL_FLAG='" + paramFillFlag.Value + "',");
                sbSql.Append("@LOT_CONTROLLED='" + paramLot.Value + "',");
                sbSql.Append("@SERIAL_CONTROLLED='" + paramSerial.Value + "',");
                sbSql.Append("@MAX_QTY=" + paramMaxQty.Value + ",");
                sbSql.Append("@FOQ_QTY=" + paramFQty.Value + ",");
                sbSql.Append("@ORDERING_TYPE='" + paramOrderType.Value + "',");
                sbSql.Append("@CHARGE_CODE='" + paramCode.Value + "',");
                sbSql.Append("@COST_CENTER='" + paramCenter.Value + "',");
                sbSql.Append("@UNIT_OF_ISSUE='" + paramIssue.Value + "',");
                sbSql.Append("@CONVERSION_RATE=" + paramRate.Value + ",");
                sbSql.Append("@USER_FIELD_1='" + paramField.Value + "',");
                sbSql.Append("@LAST_UPDATE_USER='" + paramUser.Value + "',");
                sbSql.Append("@INV_BUSINESS_UNIT='" + paramBUnit.Value + "',");
                sbSql.Append("@REQUISITION_TYPE='" + paramRequisition.Value + "',");
                sbSql.Append("@UNIT_OF_PROCUREMENT='" + paramProcurement.Value + "',");
                sbSql.Append("@SELECTED_ITEM_ID='" + paramSelectedItem.Value + "',");
                sbSql.Append("@PREV_BIN_LOC='" + paramPrevBin.Value + "',");
                sbSql.Append("@PAR_UOM='" + paramParUom.Value + "',");
                sbSql.Append("@CONV_RATE_PAR_UOM='" + paramConvRtParUom.Value + "',");
                sbSql.Append("@FLAG='" + paramFlag.Value + "'");

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updates " + count); }

                return statusCode;

            }
            catch(SqlException ex)
            {
                if(ex.Number==2627)
                {
                    return AtparStatusCodes.ATPAR_E_PRIMARYKEYVOILATION;
                }
                else
                {
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }

        }
        private void GetConfigData()
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                var objCls = new Utilities();
                objCls.InitializeAtParSystem();

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
                throw ex;
            }
        }

        #endregion
    }
}
