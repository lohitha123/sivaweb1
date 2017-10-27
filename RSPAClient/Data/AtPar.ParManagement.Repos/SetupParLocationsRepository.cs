using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.ParManagement;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ParManagement.Repos
{
    public class SetupParLocationsRepository: ISetupParLocationsRepository
    {
        #region Private Variables

        private ILog _log;

        #endregion

        #region Constructor
        public SetupParLocationsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(SetupParLocationsRepository));
        }

        #endregion

        #region GetLocationHeader
        public List<PAR_MNGT_PAR_LOC_HEADER> GetLocationHeader(string locID, string orgID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    
                    sbSql.Append("SELECT ORG_ID,PAR_LOC_ID,LOCATION_NAME,CART_TYPE,COST_CENTER_CODE,STATUS,POU_CART,");
                    sbSql.Append("ASSET_ACCOUNT, SHIPTO_ID, DELV_LOC_ID, DELV_LOC_ADDRESS_1,");
                    sbSql.Append("DELV_LOC_ADDRESS_2, DELV_LOC_CITY,DELV_LOC_STATE, DELV_LOC_ZIP, DELV_LOC_COUNTRY,");
                    sbSql.Append("LAST_UPDATE_DATE,LAST_UPDATE_USER,LAST_CLIENT_ADDRESS,");
                    sbSql.Append("ISNULL(PARLOC_TYPE,2) AS PARLOC_TYPE,PERPECTUAL_IN_MMIS ");
                    sbSql.Append("FROM PAR_MNGT_PAR_LOC_HEADER  WHERE PAR_LOC_ID='" + locID + "'");
                    sbSql.Append("AND ORG_ID ='" + orgID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ORG_ID","PAR_LOC_ID","LOCATION_NAME","CART_TYPE","COST_CENTER_CODE","STATUS","POU_CART",
                    "ASSET_ACCOUNT","SHIPTO_ID","DELV_LOC_ID","DELV_LOC_ADDRESS_1","DELV_LOC_ADDRESS_2","DELV_LOC_CITY",
                    "DELV_LOC_STATE","DELV_LOC_ZIP","DELV_LOC_COUNTRY","LAST_UPDATE_DATE","LAST_UPDATE_USER","LAST_CLIENT_ADDRESS",
                    "PARLOC_TYPE","PERPECTUAL_IN_MMIS"};
                    var lstLocations = objContext.Database.DifferedExecuteQuery<PAR_MNGT_PAR_LOC_HEADER>(fields,sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstLocations.Count); }

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

        #region UpdateLoc
        public int GetCountOrgID(PAR_MNGT_PAR_LOC_HEADER objHeader)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.PAR_MNGT_PAR_LOC_HEADER.Count(c => c.PAR_LOC_ID == objHeader.PAR_LOC_ID && c.ORG_ID==objHeader.ORG_ID);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of rows returned " + count); }

                    return count;
                }

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                throw ex;
            }
            finally
            {
                sbSql = null;
            }
        }

        public long InsertParLoc(PAR_MNGT_PAR_LOC_HEADER objHeader)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO PAR_MNGT_PAR_LOC_HEADER(ORG_ID, PAR_LOC_ID , ");
                    sbSql.Append("LOCATION_NAME,CART_TYPE, POU_CART ,ASSET_ACCOUNT , SHIPTO_ID,DELV_LOC_ID,");
                    sbSql.Append("DELV_LOC_ADDRESS_1,DELV_LOC_ADDRESS_2,DELV_LOC_CITY, DELV_LOC_STATE, DELV_LOC_ZIP,");
                    sbSql.Append("DELV_LOC_COUNTRY,LAST_UPDATE_DATE,LAST_UPDATE_USER,COST_CENTER_CODE,PARLOC_TYPE,PERPECTUAL_IN_MMIS) VALUES");
                    sbSql.Append("('" + objHeader.ORG_ID + "','" + objHeader.PAR_LOC_ID + "',");
                    sbSql.Append("'" + objHeader.LOCATION_NAME + "','"+objHeader.CART_TYPE+"',");
                    sbSql.Append("'" + objHeader.POU_CART + "','" + objHeader.ASSET_ACCOUNT + "',");
                    sbSql.Append("'" + objHeader.SHIPTO_ID + "',");
                    sbSql.Append("'" + objHeader.DELV_LOC_ID + "','" + objHeader.DELV_LOC_ADDRESS_1 + "',");
                    sbSql.Append("'" + objHeader.DELV_LOC_ADDRESS_2 + "','" + objHeader.DELV_LOC_CITY + "',");
                    sbSql.Append("'" + objHeader.DELV_LOC_STATE + "','" + objHeader.DELV_LOC_ZIP + "',");
                    sbSql.Append("'" + objHeader.DELV_LOC_COUNTRY + "',getdate(),");
                    sbSql.Append("'" + objHeader.LAST_UPDATE_USER + "','" + objHeader.COST_CENTER_CODE + "',");
                    sbSql.Append("'" + objHeader.PARLOC_TYPE + "','" + objHeader.PERPECTUAL_IN_MMIS + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }
        public long UpdateParLoc(PAR_MNGT_PAR_LOC_HEADER objHeader)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE PAR_MNGT_PAR_LOC_HEADER SET ORG_ID ='" + objHeader.ORG_ID + "', ");
                    sbSql.Append("LOCATION_NAME='" + objHeader.LOCATION_NAME + "',COST_CENTER_CODE='" + objHeader.COST_CENTER_CODE + "',");
                    sbSql.Append("CART_TYPE='" + objHeader.CART_TYPE + "',POU_CART='" + objHeader.POU_CART + "',");
                    sbSql.Append("ASSET_ACCOUNT='"+objHeader.ASSET_ACCOUNT+ "',SHIPTO_ID='"+objHeader.SHIPTO_ID+"',");
                    sbSql.Append("DELV_LOC_ID='" + objHeader.DELV_LOC_ID + "',DELV_LOC_ADDRESS_1='" + objHeader.DELV_LOC_ADDRESS_1 + "',");
                    sbSql.Append("DELV_LOC_ADDRESS_2='" + objHeader.DELV_LOC_ADDRESS_2 + "',DELV_LOC_CITY='" + objHeader.DELV_LOC_CITY + "',");
                    sbSql.Append("DELV_LOC_STATE='" + objHeader.DELV_LOC_STATE + "',DELV_LOC_ZIP='" + objHeader.DELV_LOC_ZIP + "',");
                    sbSql.Append("DELV_LOC_COUNTRY='" + objHeader.DELV_LOC_COUNTRY + "',LAST_UPDATE_DATE = getdate(),");
                    sbSql.Append("PARLOC_TYPE='" + objHeader.PARLOC_TYPE + "',PERPECTUAL_IN_MMIS='" + objHeader.PERPECTUAL_IN_MMIS + "' ");
                    sbSql.Append("WHERE ORG_ID='" + objHeader.ORG_ID + "'");
                    sbSql.Append(" AND PAR_LOC_ID='" + objHeader.PAR_LOC_ID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

        #region GetLocations
        public List<VM_PAR_MNGT_SETUP_LOCATIONS> GetLocations(string orgID, string locID, string locName,string appID,string orgGroupID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT  PMC.COST_CENTER_CODE,PMH.PAR_LOC_ID,PMH.LOCATION_NAME,PMGB.BUSINESS_UNIT,");
                    sbSql.Append("PMH.CART_TYPE,PMH.POU_CART,ISNULL(PMH.PARLOC_TYPE,2) AS PARLOC_TYPE,PMH.PERPECTUAL_IN_MMIS");
                    sbSql.Append(" FROM PAR_MNGT_PAR_LOC_HEADER PMH,PAR_MNGT_COST_CENTER PMC,MT_ATPAR_ORG_GROUP_BUNITS PMGB");
                    sbSql.Append(" WHERE PMH.ORG_ID = PMGB.BUSINESS_UNIT And PMH.COST_CENTER_CODE = PMC.COST_CENTER_CODE");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    if(orgID!=string.Empty)
                    {
                        sbSql.Append(" AND PMH.ORG_ID = '" + orgID + "'");
                    }
                    if(Convert.ToInt32(appID)==(int)AtParWebEnums.EnumApps.PointOfUse)
                    {
                        sbSql.Append(" AND PMH.POU_CART='Y'");
                    }
                    else if (Convert.ToInt32(appID) == (int)AtParWebEnums.EnumApps.Pharmacy)
                    {
                        sbSql.Append(" AND PMH.POU_CART='P'");
                    }
                    if (locID != string.Empty)
                    {
                        sbSql.Append(" AND PMH.PAR_LOC_ID = '" + locID + "'");
                    }
                    if (locName != string.Empty)
                    {
                        sbSql.Append(" AND PMH.LOCATION_NAME LIKE '%" + locName + "%'");
                    }
                    if(orgID == string.Empty && orgGroupID != "All")
                    {
                        sbSql.Append(" AND PMH.ORG_ID IN(SELECT  DISTINCT BUSINESS_UNIT  FROM MT_ATPAR_ORG_GROUP_BUNITS WHERE ORG_GROUP_ID =(");
                        sbSql.Append("SELECT ORG_GROUP_ID FROM MT_ATPAR_ORG_GROUPS WHERE ORG_GROUP_ID= '" + orgGroupID + "' )  AND BU_TYPE='I')");
                    }
                    sbSql.Append(" ORDER BY PMH.PAR_LOC_ID");
                    var lstLocations = objContext.Database.SqlQuery<VM_PAR_MNGT_SETUP_LOCATIONS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstLocations.Count); }

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

        #region GetShipToIds
        public List<RM_SHIPTO_IDS> GetShipToIds(string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT SHIPTO_ID, SHIPTO_NAME,STATUS FROM RM_SHIPTO_IDS");

                    if(orgID != string.Empty)
                    {
                        sbSql.Append(" WHERE Org_id='" + orgID + "'");
                    }
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var fields = new[] { "SHIPTO_ID", "SHIPTO_NAME","STATUS" };

                    var lstShipToIDs = objContext.Database.DifferedExecuteQuery<RM_SHIPTO_IDS>(fields,sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of ShipToIDs returned " + lstShipToIDs.Count); }

                    return lstShipToIDs;
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

        //public List<MT_RECV_SHIPTO_ID_ALLOCATION> GetLocalDbShipToIds()
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    StringBuilder sbSql = new StringBuilder();

        //    try
        //    {
        //        using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
        //        {
        //            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, dbLog))); }

        //            sbSql.Append("SELECT SETID,SHIPTO_ID,DESCR, A.USER_ID, ");
        //            sbSql.Append("CASE WHEN (MIDDLE_INITIAL IS NULL OR MIDDLE_INITIAL=' ' )  THEN (FIRST_NAME+' '+LAST_NAME+'('+A.USER_ID+')' ) ELSE(FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + '(' + A.USER_ID + ')')  END AS USERNAME ");
        //            sbSql.Append("FROM MT_RECV_SHIPTO_ID_ALLOCATION A, MT_ATPAR_USER B ");
        //            sbSql.Append("WHERE A.USER_ID=B.USER_ID ORDER BY SETID ASC ");

        //            if (!_log.IsDebugEnabled)
        //            {
        //                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(string.Format("{0}{1}{2}:", methodBaseName, Globals.QUERY, sbSql.ToString()))); }
        //            }


        //            var fileds = new[] { "SETID", "SHIPTO_ID", "DESCR", "USER_ID", "USERNAME" };

        //            var lstShipToIdsLDB = objContext.Database.DifferedExecuteQuery<MT_RECV_SHIPTO_ID_ALLOCATION>(fileds, sbSql.ToString()).ToList();


        //            if (_log.IsDebugEnabled) { _log.Debug(string.Format("{0} No.Of ship to Ids Returned from Local DB: {1}", methodBaseName, lstShipToIdsLDB != null ? lstShipToIdsLDB.Count : 0)); }

        //            return lstShipToIdsLDB;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0}{1}{2}", methodBaseName, Globals.EXCEPTION, ex.ToString() + Globals.QUERY + sbSql.ToString())); }
        //        throw ex;
        //    }
        //    finally
        //    {
        //        sbSql = null;
        //    }
        //}
        #endregion

        #region GetOrgIdName
        public string GetOrgIdName(string orgID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT  ORG_NAME + ' (' + ORG_ID + ')' AS   ORG_NAME FROM RM_ORG_UNITS WHERE ORG_ID='" + orgID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var orgIdName = objContext.Database.SqlQuery<string>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " orgIdName: " + orgIdName); }

                    return orgIdName;
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

        #region AddItems
        public List<PAR_MNGT_ITEM> GetItems(string itemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT STATUS,CHARGE_CODE,UNIT_OF_ISSUE,CONV_FACTOR FROM PAR_MNGT_ITEM WHERE ITEM_ID = '" + itemID + "'");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "STATUS", "CHARGE_CODE", "UNIT_OF_ISSUE", "CONV_FACTOR" };
                    var lstItems = objContext.Database.DifferedExecuteQuery<PAR_MNGT_ITEM>(fields,sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of ShipToIDs returned " + lstItems.Count); }

                    return lstItems;
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

        public int GetParItemsCount(string itemID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(*)  FROM PAR_MNGT_ITEM WHERE ITEM_ID ='"+itemID+"'");
                    

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + count); }

                    return count;
                }
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

        public int GetParLocationsCount(string locID, string comp, string itemID, string companyID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(ITEM_ID)  FROM PAR_MNGT_PAR_LOC_DETAILS WHERE PAR_LOC_ID ='" + locID + "'");
                    sbSql.Append(" AND BIN_LOC ='" + comp + "'");
                    sbSql.Append(" AND ITEM_ID='" + itemID + "'");
                    sbSql.Append(" AND ORG_ID='" + companyID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + count); }

                    return count;
                }
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

        public long InsertItems(string locID, string companyID, string comp, string itemID, 
                                double optQty, string cntReq, int cntOrder, int replnshType, 
                                string flag, string orderingType, string foqQty, string maxQty,
                                string lotCntrld, string srCntrld, string userID, string unitOfIssue, 
                                string converstionRate, string costCentercode, string userField1, string status,
                                string invBusinessUnit, string requestionType, string UOMProc, string parUom,
                                string convRtParUom,string chargeCode, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;
            string strPwd = string.Empty;
            string strHashVal = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramOrgID = new SqlParameter("@ORG_ID", SqlDbType.NVarChar);
                    paramOrgID.Value = companyID;

                    SqlParameter paramCount = new SqlParameter("@COUNT_ORDER", SqlDbType.Int);
                    if (!string.IsNullOrEmpty(cntOrder.ToString()))
                    {
                        paramCount.Value = Convert.ToInt32(cntOrder);
                    }
                    else
                    {
                        paramCount.Value = 0;
                    }

                    SqlParameter paramItemID = new SqlParameter("@ITEM_ID", SqlDbType.NVarChar);
                    paramItemID.Value = itemID;

                    SqlParameter paramParLocID = new SqlParameter("@PAR_LOC_ID", SqlDbType.NVarChar);
                    paramParLocID.Value = locID;

                    SqlParameter paramBinLoc = new SqlParameter("@BIN_LOC", SqlDbType.NVarChar);
                    paramBinLoc.Value = comp;

                    SqlParameter paramStatus = new SqlParameter("@STATUS", SqlDbType.Char);
                    paramStatus.Value = status;

                    SqlParameter paramQty = new SqlParameter("@OPTIMAL_QTY", SqlDbType.Float);
                    if (!string.IsNullOrEmpty(optQty.ToString()))
                    {
                        paramQty.Value = Convert.ToDouble(optQty);
                    }
                    else
                    {
                        paramQty.Value = 0;
                    }

                    SqlParameter paramRequired = new SqlParameter("@COUNT_REQUIRED", SqlDbType.NVarChar);
                    paramRequired.Value = cntReq;

                    SqlParameter paramType = new SqlParameter("@REPLENISHMENT_TYPE", SqlDbType.Int);
                    if (!string.IsNullOrEmpty(replnshType.ToString()))
                    {
                        paramType.Value = Convert.ToDouble(replnshType);
                    }
                    else
                    {
                        paramType.Value = 0;
                    }

                    SqlParameter paramFillFlag = new SqlParameter("@FILL_KILL_FLAG", SqlDbType.NVarChar);
                    paramFillFlag.Value = flag;

                    SqlParameter paramLot = new SqlParameter("@LOT_CONTROLLED", SqlDbType.NVarChar);
                    paramLot.Value = lotCntrld;

                    SqlParameter paramSerial = new SqlParameter("@SERIAL_CONTROLLED", SqlDbType.NVarChar);
                    paramSerial.Value = srCntrld;

                    SqlParameter paramMaxQty = new SqlParameter("@MAX_QTY", SqlDbType.Float);
                    if (!string.IsNullOrEmpty(maxQty))
                    {
                        paramMaxQty.Value = Convert.ToDouble(maxQty);
                    }
                    else
                    {
                        paramMaxQty.Value = 0;
                    }

                    SqlParameter paramFQty = new SqlParameter("@FOQ_QTY", SqlDbType.Float);
                    if (!string.IsNullOrEmpty(foqQty))
                    {
                        paramFQty.Value = Convert.ToDouble(foqQty);
                    }
                    else
                    {
                        paramFQty.Value = 0;
                    }

                    SqlParameter paramOrderType = new SqlParameter("@ORDERING_TYPE", SqlDbType.VarChar);
                    paramOrderType.Value = orderingType;

                    SqlParameter paramCode = new SqlParameter("@CHARGE_CODE", SqlDbType.NVarChar);
                    paramCode.Value = chargeCode;

                    SqlParameter paramCenter = new SqlParameter("@COST_CENTER", SqlDbType.NVarChar);
                    paramCenter.Value = costCentercode;

                    SqlParameter paramIssue = new SqlParameter("@UNIT_OF_ISSUE", SqlDbType.NVarChar);
                    paramIssue.Value = unitOfIssue;

                    SqlParameter paramRate = new SqlParameter("@CONVERSION_RATE", SqlDbType.Float);
                    if (!string.IsNullOrEmpty(converstionRate))
                    {
                        paramRate.Value = Convert.ToDouble(converstionRate);
                    }
                    else
                    {
                        paramRate.Value = 0;
                    }

                    SqlParameter paramField = new SqlParameter("@USER_FIELD_1", SqlDbType.NVarChar);
                    paramField.Value = userField1;

                    SqlParameter paramUser = new SqlParameter("@LAST_UPDATE_USER", SqlDbType.NVarChar);
                    paramUser.Value = userID;

                    SqlParameter paramBUnit = new SqlParameter("@INV_BUSINESS_UNIT", SqlDbType.NVarChar);
                    paramBUnit.Value = invBusinessUnit;

                    SqlParameter paramRequisition = new SqlParameter("@REQUISITION_TYPE", SqlDbType.NVarChar);
                    paramRequisition.Value = requestionType;

                    SqlParameter paramProcurement = new SqlParameter("@UNIT_OF_PROCUREMENT", SqlDbType.NVarChar);
                    paramProcurement.Value = UOMProc;

                    SqlParameter paramSelectedItem = new SqlParameter("@SELECTED_ITEM_ID", SqlDbType.NVarChar);
                    paramSelectedItem.Value = string.Empty;

                    SqlParameter paramPrevBin = new SqlParameter("@PREV_BIN_LOC", SqlDbType.NVarChar);
                    paramPrevBin.Value = string.Empty;

                    SqlParameter paramParUom = new SqlParameter("@PAR_UOM", SqlDbType.NVarChar);
                    paramParUom.Value = parUom;

                    SqlParameter paramConvRtParUom = new SqlParameter("@CONV_RATE_PAR_UOM", SqlDbType.Float);
                    if (!string.IsNullOrEmpty(convRtParUom))
                    {
                        paramConvRtParUom.Value = Convert.ToDouble(convRtParUom);
                    }
                    else
                    {
                        paramConvRtParUom.Value = 0;
                    }
                    SqlParameter paramFlag = new SqlParameter("@FLAG", SqlDbType.NVarChar);
                    paramFlag.Value = "INSERT";


                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var count = objContext.Database.ExecuteSqlCommand("exec ADD_SUBSTITUTE_TO_PAR_LOC_DETAILS @ORG_ID,@COUNT_ORDER,@ITEM_ID,"+
                                                            "@PAR_LOC_ID,@BIN_LOC,@STATUS,@OPTIMAL_QTY,@COUNT_REQUIRED,@REPLENISHMENT_TYPE,"+
                                                            "@FILL_KILL_FLAG,@LOT_CONTROLLED,@SERIAL_CONTROLLED,@MAX_QTY,@FOQ_QTY,@ORDERING_TYPE,"+
                                                            "@CHARGE_CODE,@COST_CENTER,@UNIT_OF_ISSUE,@CONVERSION_RATE,@USER_FIELD_1,@LAST_UPDATE_USER,@INV_BUSINESS_UNIT," +
                                                            "@REQUISITION_TYPE,@UNIT_OF_PROCUREMENT,@SELECTED_ITEM_ID,@PREV_BIN_LOC,@PAR_UOM,@CONV_RATE_PAR_UOM,@FLAG ",
                                                              paramOrgID, paramCount, paramItemID, paramParLocID,
                                                              paramBinLoc, paramStatus, paramQty, paramRequired,
                                                              paramType, paramFillFlag, paramLot, paramSerial, paramMaxQty,
                                                              paramFQty, paramOrderType, paramCode, paramCenter,
                                                              paramIssue, paramRate, paramField, paramUser, paramBUnit,
                                                              paramRequisition, paramProcurement, paramSelectedItem,
                                                              paramPrevBin, paramParUom, paramConvRtParUom, paramFlag);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                    return statusCode;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        #endregion

        #region UpdateLocationItems
        public int GetParLocationsBinCount(string locID, string compartment, string itemID, string companyID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT COUNT(BIN_LOC)  FROM PAR_MNGT_PAR_LOC_DETAILS WHERE PAR_LOC_ID ='" + locID + "'");
                    sbSql.Append(" AND BIN_LOC ='" + compartment + "'");
                    sbSql.Append(" AND ITEM_ID='" + itemID + "'");
                    sbSql.Append(" AND ORG_ID='" + companyID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of profiles returned: " + count); }

                    return count;
                }
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

        public int GetParItemStatus(string locID, string compartment, string itemID, string companyID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT STATUS FROM PAR_MNGT_ITEM WHERE ITEM_ID='" + itemID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var status = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Status: " + status); }

                    return status;
                }
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
        public long UpdateItemStatus(string itemID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE PAR_MNGT_ITEM SET  STATUS = 0 WHERE ITEM_ID ='" + itemID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "no of  " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }

            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }
        public long UpdatePOUInvItemBin(string orgID, string parLoc, string itemID, string prvBinLoc,
                                        string binLoc, char newStatus)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;
            string strPwd = string.Empty;
            string strHashVal = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
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
                    string strSql = "exec UpdatePOUInvItemBin @ORG_ID='" + paramOrgID.Value + "', @PAR_LOC='" + paramParLoc.Value + "', @ITEM_ID='" + paramItemID.Value + "', @PRV_BIN_LOC='" + paramPrvBinLoc.Value + "', @BIN_LOC='" + paramBinLoc.Value + "', @NEW_STATUS='" + paramNewStatus.Value + "'";
                                                              
                    var count = objContext.Database.ExecuteSqlCommand(strSql);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                    return statusCode;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }
        public long UpdateLocationItems(string locID, string companyID, string compartment, string oldcomprmnt,
                            string itemID, double optQty, string cntReq, int cntOrder, int replnshType, string flag,
                            string orderingType, string foqQty, string maxQty, string lotCntrld, string srCntrld, 
                            string costCenterCode, string unitOfIssue, string converstionRate, string userField1, 
                            string userID, string status, string invBusinessUnit, string requisitionType, string UOMProc, 
                            string parUom, string convRtParUom, string chargeCode, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long statusCode = 0;
            string strPwd = string.Empty;
            string strHashVal = string.Empty;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter paramOrgID = new SqlParameter("@ORG_ID", SqlDbType.NVarChar);
                    paramOrgID.Value = companyID;

                    SqlParameter paramCount = new SqlParameter("@COUNT_ORDER", SqlDbType.Int);
                    paramCount.Value = cntOrder;

                    SqlParameter paramItemID = new SqlParameter("@ITEM_ID", SqlDbType.NVarChar);
                    paramItemID.Value = itemID;

                    SqlParameter paramParLocID = new SqlParameter("@PAR_LOC_ID", SqlDbType.NVarChar);
                    paramParLocID.Value = locID;

                    SqlParameter paramBinLoc = new SqlParameter("@BIN_LOC", SqlDbType.NVarChar);
                    paramBinLoc.Value = compartment;

                    SqlParameter paramStatus = new SqlParameter("@STATUS", SqlDbType.Char);
                    paramStatus.Value = status;

                    SqlParameter paramQty = new SqlParameter("@OPTIMAL_QTY", SqlDbType.Float);
                    paramQty.Value = optQty;

                    SqlParameter paramRequired = new SqlParameter("@COUNT_REQUIRED", SqlDbType.NVarChar);
                    paramRequired.Value = cntReq;

                    SqlParameter paramType = new SqlParameter("@REPLENISHMENT_TYPE", SqlDbType.Int);
                    paramType.Value = replnshType;

                    SqlParameter paramFillFlag = new SqlParameter("@FILL_KILL_FLAG", SqlDbType.NVarChar);
                    paramFillFlag.Value = flag;

                    SqlParameter paramLot = new SqlParameter("@LOT_CONTROLLED", SqlDbType.NVarChar);
                    paramLot.Value = lotCntrld;

                    SqlParameter paramSerial = new SqlParameter("@SERIAL_CONTROLLED", SqlDbType.NVarChar);
                    paramSerial.Value = srCntrld;

                    SqlParameter paramMaxQty = new SqlParameter("@MAX_QTY", SqlDbType.Float);
                    if (!string.IsNullOrEmpty(maxQty))
                    {
                        paramMaxQty.Value = Convert.ToDouble(maxQty);
                    }
                    else
                    {
                        paramMaxQty.Value = 0;
                    }

                    SqlParameter paramFQty = new SqlParameter("@FOQ_QTY", SqlDbType.Float);
                    if (!string.IsNullOrEmpty(foqQty))
                    {
                        paramFQty.Value = Convert.ToDouble(foqQty);
                    }
                    else
                    {
                        paramFQty.Value = 0;
                    }

                    SqlParameter paramOrderType = new SqlParameter("@ORDERING_TYPE", SqlDbType.VarChar);
                    paramOrderType.Value = orderingType;

                    SqlParameter paramCode = new SqlParameter("@CHARGE_CODE", SqlDbType.NVarChar);
                    paramCode.Value = chargeCode;

                    SqlParameter paramCenter = new SqlParameter("@COST_CENTER", SqlDbType.NVarChar);
                    paramCenter.Value = costCenterCode;

                    SqlParameter paramIssue = new SqlParameter("@UNIT_OF_ISSUE", SqlDbType.NVarChar);
                    paramIssue.Value = unitOfIssue;

                    SqlParameter paramRate = new SqlParameter("@CONVERSION_RATE", SqlDbType.Float);
                    if (!string.IsNullOrEmpty(converstionRate))
                    {
                        paramRate.Value = Convert.ToDouble(converstionRate);
                    }
                    else
                    {
                        paramRate.Value = 0;
                    }

                    SqlParameter paramField = new SqlParameter("@USER_FIELD_1", SqlDbType.NVarChar);
                    paramField.Value = userField1;

                    SqlParameter paramUser = new SqlParameter("@LAST_UPDATE_USER", SqlDbType.NVarChar);
                    paramUser.Value = userID;

                    SqlParameter paramBUnit = new SqlParameter("@INV_BUSINESS_UNIT", SqlDbType.NVarChar);
                    paramBUnit.Value = invBusinessUnit;

                    SqlParameter paramRequisition = new SqlParameter("@REQUISITION_TYPE", SqlDbType.NVarChar);
                    paramRequisition.Value = requisitionType;

                    SqlParameter paramProcurement = new SqlParameter("@UNIT_OF_PROCUREMENT", SqlDbType.NVarChar);
                    paramProcurement.Value = UOMProc;

                    SqlParameter paramSelectedItem = new SqlParameter("@SELECTED_ITEM_ID", SqlDbType.NVarChar);
                    paramSelectedItem.Value = itemID;

                    SqlParameter paramPrevBin = new SqlParameter("@PREV_BIN_LOC", SqlDbType.NVarChar);
                    paramPrevBin.Value = oldcomprmnt;

                    SqlParameter paramParUom = new SqlParameter("@PAR_UOM", SqlDbType.NVarChar);
                    paramParUom.Value = parUom;

                    SqlParameter paramConvRtParUom = new SqlParameter("@CONV_RATE_PAR_UOM", SqlDbType.Float);
                    if (!string.IsNullOrEmpty(convRtParUom))
                    {
                        paramConvRtParUom.Value = Convert.ToDouble(convRtParUom);
                    }
                    else
                    {
                        paramConvRtParUom.Value = 0;
                    }
                    
                    SqlParameter paramFlag = new SqlParameter("@FLAG", SqlDbType.NVarChar);
                    paramFlag.Value = "UPDATE";


                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    StringBuilder sbSql = new StringBuilder();
                    sbSql.Append("exec ADD_SUBSTITUTE_TO_PAR_LOC_DETAILS @ORG_ID='"+ paramOrgID.Value+"',");
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


                    //var count = objContext.Database.ExecuteSqlCommand("exec ADD_SUBSTITUTE_TO_PAR_LOC_DETAILS "+ "@ORG_ID,@COUNT_ORDER,@ITEM_ID," +
                    //                                        "@PAR_LOC_ID,@BIN_LOC,@STATUS,@OPTIMAL_QTY,@COUNT_REQUIRED,@REPLENISHMENT_TYPE," +
                    //                                        "@FILL_KILL_FLAG,@LOT_CONTROLLED,@SERIAL_CONTROLLED,@MAX_QTY,@FOQ_QTY,@ORDERING_TYPE," +
                    //                                        "@CHARGE_CODE,@COST_CENTER,@UNIT_OF_ISSUE,@CONVERSION_RATE,@USER_FIELD_1,@LAST_UPDATE_USER,@INV_BUSINESS_UNIT," +
                    //                                        "@REQUISITION_TYPE,@UNIT_OF_PROCUREMENT,@SELECTED_ITEM_ID,@PREV_BIN_LOC,@PAR_UOM,@CONV_RATE_PAR_UOM,@FLAG ",
                    //                                          paramOrgID.Value, paramCount.Value, paramItemID.Value, paramParLocID.Value,
                    //                                          paramBinLoc.Value, paramStatus.Value, paramQty.Value, paramRequired.Value,
                    //                                          paramType.Value, paramFillFlag.Value, paramLot.Value, paramSerial.Value, paramMaxQty.Value,
                    //                                          paramFQty.Value, paramOrderType.Value, paramCode.Value, paramCenter.Value,
                    //                                          paramIssue.Value, paramRate.Value, paramField.Value, paramUser.Value, paramBUnit.Value,
                    //                                          paramRequisition.Value, paramProcurement.Value, paramSelectedItem.Value,
                    //                                          paramPrevBin.Value, paramParUom.Value, paramConvRtParUom.Value, paramFlag.Value);
                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }
        #endregion

        #region GetLocDetails
        public List<VM_PAR_SETUP_PAR_LOCATIONS> GetLocDetails(string locID, string companyID, string itemID, string deptID, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT A.ORG_ID, A.PAR_LOC_ID, A.BIN_LOC, A.ITEM_ID, ");
                    sbSql.Append(" A.COUNT_ORDER, A.OPTIMAL_QTY,  A.COUNT_REQUIRED,  ");
                    sbSql.Append(" A.FILL_KILL_FLAG, B.SHORT_DESCR, ");
                    sbSql.Append(" A.ORDERING_TYPE, A.MAX_QTY, A.FOQ_QTY,  ");
                    sbSql.Append(" A.UNIT_OF_ISSUE AS LOCDTLSUOI, B.UNIT_OF_ISSUE AS ITMUOI, ");
                    sbSql.Append(" A.PAR_UOM AS LOCDTLSPARUOM, B.PAR_UOM AS ITMPARUOM, ");
                    sbSql.Append(" CASE WHEN A.UNIT_OF_PROCUREMENT = '' THEN B.UNIT_OF_PROCUREMENT ELSE A.UNIT_OF_PROCUREMENT END AS LOCDTLSUOP, ");
                    sbSql.Append(" CASE WHEN A.CONVERSION_RATE='' THEN B.CONV_FACTOR ELSE A.CONVERSION_RATE END AS LOCDTLSCONVRATE, ");
                    sbSql.Append(" CASE WHEN A.CONV_RATE_PAR_UOM='' THEN B.CONV_RATE_PAR_UOM ELSE A.CONV_RATE_PAR_UOM END AS LOCDTLSPARCONVRATE, ");
                    sbSql.Append(" CASE WHEN A.SERIAL_CONTROLLED='' THEN B.SERIAL_CONTROLLED ELSE A.SERIAL_CONTROLLED END AS LOCDTLSSRCNTRL,");
                    sbSql.Append(" CASE WHEN A.LOT_CONTROLLED='' THEN B.LOT_CONTROLLED ELSE A.LOT_CONTROLLED END AS LOCDTLSLOTCNTRL,");
                    sbSql.Append(" CASE WHEN A.REPLENISHMENT_TYPE='' THEN B.REPLENISHMENT_TYPE ELSE A.REPLENISHMENT_TYPE END AS LOCDTLSRPTYPE,");
                    sbSql.Append(" CASE WHEN A.CHARGE_CODE='' THEN B.CHARGE_CODE ELSE A.CHARGE_CODE END AS LOCDTLCCODE, ");
                    sbSql.Append(" A.USER_FIELD_1, A.STATUS, A.COST_CENTER, A.INV_BUSINESS_UNIT, A.STATUS, ");
                    sbSql.Append(" A.REQUISITION_TYPE, B.ORG_GROUP_ID , B.SUBSTITUTE_ITEM_FLG ");
                    sbSql.Append(" FROM  PAR_MNGT_PAR_LOC_DETAILS A, PAR_MNGT_ITEM B, RM_ORG_UNITS R ");
                    sbSql.Append(" WHERE PAR_LOC_ID='" + locID + "' AND A.ITEM_ID=B.ITEM_ID  AND A.ORG_ID='" + companyID + "' ");
                    sbSql.Append(" AND R.MASTER_GROUP_ID=B.ORG_GROUP_ID ");
                    sbSql.Append(" AND R.ORG_ID=A.ORG_ID ");
                    sbSql.Append(" AND R.ORG_TYPE='I'");

                    if (itemID!="")
                    {
                        sbSql.Append("  AND A.ITEM_ID='" + itemID + "'");

                    }
                    if(deptID!="")
                    {
                        sbSql.Append("  AND A.BIN_LOC='" + deptID + "'");
                    }
                    sbSql.Append("  ORDER BY A.ITEM_ID");
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    
                    var lstLocations = objContext.Database.SqlQuery<VM_PAR_SETUP_PAR_LOCATIONS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstLocations.Count); }

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
    }
}
