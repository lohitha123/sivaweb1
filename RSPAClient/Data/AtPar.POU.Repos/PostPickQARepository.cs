using AtPar.Repository.Interfaces.POU;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.Common;
using log4net;

using AtPar.Data;
using System.Data.SqlClient;
using AtPar.ViewModel;
using System.Diagnostics;
using System.Reflection;

using System.Data;
using AtPar.POCOEntities;

namespace AtPar.POU.Repos
{
    public class PostPickQARepository : IPostPickQARepository
    {
        ILog _log;
        public PostPickQARepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(PostPickQARepository));
        }

        #region BuildReportPrint

        public List<MT_ATPAR_PRINT_LABEL_DETAILS> BuildReportPrint(string appID, string objectID, string section, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT PLD.APP_ID,PLD.OBJECT_ID,PLD.FIELD_NAME,PLD.TEXT_VALUE,PLD.FIELD_GROUP,PLD.ROW_POSITION,PLD.COLUMN_POSITION " + " ,PLD.DISPLAY_NAME,PLD.VISIBLE,ALIGNMENT,PLD.HEADERFONT,PLD.VALUEFONT,PLH.FIELD_TYPE,PLH.FIELD_SIZE  FROM MT_ATPAR_PRINT_LABEL_DETAILS PLD,MT_ATPAR_PRINT_FIELD_DEFAULTS PLH WHERE  PLH.APP_ID = PLD.APP_ID And PLH.OBJECT_ID = PLD.OBJECT_ID And PLH.OBJECT_ID = '" + objectID + "'  AND PLD.APP_ID ='" + appID + "' AND VISIBLE='1' AND PLH.LINE_NO=PLD.LINE_NO AND SECTION='" + section + "' ORDER BY ROW_POSITION,COLUMN_POSITION ASC ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "APP_ID", "OBJECT_ID", "FIELD_NAME", "TEXT_VALUE", "FIELD_GROUP", "ROW_POSITION", "COLUMN_POSITION", "DISPLAY_NAME", "VISIBLE", "ALIGNMENT", "HEADERFONT", "VALUEFONT", "FIELD_TYPE", "FIELD_SIZE" };

                    var lstPrintlblDetails = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PRINT_LABEL_DETAILS>(fields,sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstPrintlblDetails.Count); }

                    return lstPrintlblDetails;
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

        #region Pou_Case_Items


        public VM_MT_POU_DEPT_CART_ALLOCATIONS GetPostPickQAItems(string caseID, int appID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            VM_MT_POU_DEPT_CART_ALLOCATIONS lstData = new VM_MT_POU_DEPT_CART_ALLOCATIONS();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("Select DISTINCT DCA.BUSINESS_UNIT,DCA.CART_ID,DCA.LOCATION_TYPE FROM MT_POU_DEPT_CART_ALLOCATIONS DCA JOIN MT_POU_DEPT_USER_ALLOCATIONS DUA ON DCA.DEPARTMENT_ID = DUA.DEPARTMENT_ID WHERE DCA.ORG_GROUP_ID='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "' AND DCA.ORG_GROUP_ID = DUA.ORG_GROUP_ID AND DUA.USER_ID='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' AND DCA.APP_ID= '" + appID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "BUSINESS_UNIT", "CART_ID", "LOCATION_TYPE" };

                    var lstUserAllocated = objContext.Database.DifferedExecuteQuery<VM_MT_POU_DEPT_CART_ALLOCATIONS_TB>(fields,sbSql.ToString()).ToList();

                    lstData.lstPouDeptCartAllocation = lstUserAllocated;
                    lstData.lstPouChargeCaptureDetails = GetPickedAndPartially(caseID);
                    lstData.lstPouCaseCartAllocation = GetNonPickedItems(caseID);
                    lstData.lstPouPhysician = GetPhysicians(caseID);
                    lstData.lstPouLotSerial = GetLotSerials(caseID);

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstUserAllocated.Count); }

                    return lstData;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
        }

        private List<VM_MT_POU_CHARGECAPTURE_DETAILS> GetPickedAndPartially(string caseID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT CHDR.CASE_ID,CHDR.PREF_LIST_ID, CHDR.EXAM_ID PROCEDURE_CODE, CDTLS.ITEM_ID ,CDTLS.ITEM_DESCRIPTION ITEM_DESCR, CDTLS.ITEM_DESCRIPTION ITEM_DESCR,SUM(ISNULL(CDTLS.ITEM_COUNT, 0)) QTY,CDTLS.CUST_ITEM_NO FROM MT_POU_CHARGECAPTURE_DETAILS CDTLS JOIN MT_POU_CHARGECAPTURE_HEADER CHDR ON CHDR.TRANSACTION_ID = CDTLS.TRANSACTION_ID JOIN MT_POU_CASE_CART_HEADER HDR ON HDR.CASE_ID = CHDR.CASE_ID WHERE CHDR.CASE_ID ='" + caseID + "' AND HDR.PREF_LIST_ID = CHDR.PREF_LIST_ID AND HDR.PROCEDURE_CODE = CHDR.EXAM_ID AND  CHDR.CHARGE_STATUS NOT IN(13, 17)  AND   HDR.STATUS NOT IN(13, 17) GROUP BY CHDR.CASE_ID, CHDR.PREF_LIST_ID, CHDR.EXAM_ID, CDTLS.ITEM_ID, CDTLS.ITEM_DESCRIPTION, CDTLS.CUST_ITEM_NO ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "CASE_ID", "PREF_LIST_ID", "EXAM_ID","PROCEDURE_CODE","ITEM_ID", "ITEM_DESCR", "QTY","CUST_ITEM_NO", };
                    var lstPickedAndPartially = objContext.Database.DifferedExecuteQuery<VM_MT_POU_CHARGECAPTURE_DETAILS>(fields,sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstPickedAndPartially.Count); }

                    return lstPickedAndPartially;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
        }

        private List<VM_MT_POU_CASE_CART_DETAILS> GetNonPickedItems(string caseID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DTLS.CASE_ID, DTLS.PREF_LIST_ID,DTLS.PROCEDURE_CODE,DTLS.ITEM_ID, DTLS.ITEM_DESCR,ISNULL(DTLS.PICK_QTY, 0) PICK_QTY, ISNULL(DTLS.HOLD_QTY, 0) HOLD_QTY, DTLS.CUST_ITEM_NO FROM MT_POU_CASE_CART_DETAILS DTLS JOIN MT_POU_CASE_CART_HEADER HDR ON HDR.CASE_ID = DTLS.CASE_ID AND HDR.PREF_LIST_ID = DTLS.PREF_LIST_ID AND HDR.PROCEDURE_CODE = DTLS.PROCEDURE_CODE AND HDR.STATUS NOT IN(13, 17) AND DTLS.STATUS NOT IN(13, 17) WHERE HDR.CASE_ID ='" + caseID + "' AND DTLS.ITEM_STATUS = 'Y'  ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "CASE_ID", "PREF_LIST_ID", "PROCEDURE_CODE", "ITEM_ID", "ITEM_DESCR", "PICK_QTY", "HOLD_QTY","CUST_ITEM_NO", };
                    var lstNonPickedItems = objContext.Database.DifferedExecuteQuery<VM_MT_POU_CASE_CART_DETAILS>(fields,sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstNonPickedItems.Count); }

                    return lstNonPickedItems;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
        }

        private List<VM_MT_POU_PHYSICIAN> GetPhysicians(string caseID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT CASE WHEN ((PHY.FIRST_NAME IS NULL OR PHY.FIRST_NAME = '') AND(PHY.MIDDLE_INITIAL IS NULL OR PHY.MIDDLE_INITIAL = '') AND(PHY.LAST_NAME IS NULL OR PHY.LAST_NAME = '')) THEN HDR.PHYSICIAN      ELSE PHY.PHYSICIAN_ID + ' - ' + ISNULL(PHY.FIRST_NAME, '') + ' ' + ISNULL(PHY.MIDDLE_INITIAL, '') + ' ' + ISNULL(PHY.LAST_NAME, '') END PHYSICIAN_DESCR,CASE WHEN (PROCE.DESCRIPTION IS NULL OR PROCE.DESCRIPTION = '')  THEN HDR.PROCEDURE_CODE ELSE PROCE.PROCEDURE_CODE + ' - ' + ISNULL(PROCE.DESCRIPTION, '') END PROC_DESCR, CASE WHEN(PREF.PREF_LIST_DESCR IS NULL OR PREF.PREF_LIST_DESCR = '')  THEN HDR.PREF_LIST_ID ELSE PREF.PREF_LIST_ID + ' - ' + ISNULL(PREF.PREF_LIST_DESCR, '') END PREF_DESCR FROM MT_POU_CASE_CART_HEADER HDR LEFT OUTER JOIN MT_POU_PREF_LIST_HEADER PREF ON HDR.PREF_LIST_ID = PREF.PREF_LIST_ID AND HDR.PROCEDURE_CODE = PREF.PROCEDURE_ID LEFT OUTER JOIN MT_POU_PHYSICIAN PHY ON HDR.PHYSICIAN = PHY.PHYSICIAN_ID LEFT OUTER JOIN MT_POU_PROCEDURE_CODE PROCE ON HDR.PROCEDURE_CODE = PROCE.PROCEDURE_CODE WHERE HDR.CASE_ID = '" + caseID + "' AND HDR.STATUS NOT IN(13, 17)");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "PHYSICIAN_DESCR", "PROC_DESCR", "PREF_DESCR" };
                    var lstPhysicians = objContext.Database.DifferedExecuteQuery<VM_MT_POU_PHYSICIAN>(fields,sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstPhysicians.Count); }

                    return lstPhysicians;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
        }

        private List<VM_MT_ATPAR_SERIAL> GetLotSerials(string caseID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT CHDR.CASE_ID,CDTLS.ITEM_ID,CDTLS.ITEM_DESCRIPTION ITEM_DESCR,CHDR.EXAM_ID,CHDR.PREF_LIST_ID, CDTLS.ITEM_LOTNUMBER,CDTLS.ITEM_SRNUMBER,CDTLS.COMPARTMENT,CDTLS.CART_ID,SUM(ISNULL(CDTLS.ITEM_COUNT, 0)) QTY,CDTLS.CUST_ITEM_NO FROM MT_POU_CHARGECAPTURE_DETAILS CDTLS JOIN MT_POU_CHARGECAPTURE_HEADER CHDR ON CHDR.TRANSACTION_ID = CDTLS.TRANSACTION_ID JOIN MT_POU_CASE_CART_HEADER HDR ON HDR.CASE_ID = CHDR.CASE_ID WHERE CHDR.CASE_ID = 'Case1' AND HDR.PREF_LIST_ID = CHDR.PREF_LIST_ID AND HDR.PROCEDURE_CODE = CHDR.EXAM_ID AND CHDR.CHARGE_STATUS NOT IN(13, 17)  AND HDR.STATUS NOT IN(13, 17) GROUP BY CHDR.CASE_ID,CDTLS.ITEM_ID,CDTLS.ITEM_DESCRIPTION,CHDR.EXAM_ID,CHDR.PREF_LIST_ID,CDTLS.CUST_ITEM_NO,CDTLS.ITEM_LOTNUMBER,CDTLS.ITEM_SRNUMBER,CDTLS.COMPARTMENT,CDTLS.CART_ID  ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "CASE_ID", "ITEM_ID", "ITEM_DESCR","EXAM_ID","PREF_LIST_ID","ITEM_LOTNUMBER","ITEM_SRNUMBER","COMPARTMENT","CART_ID","QTY","CUST_ITEM_NO" };
                    var lstLotSerials = objContext.Database.DifferedExecuteQuery<VM_MT_ATPAR_SERIAL>(fields,sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstLotSerials.Count); }

                    return lstLotSerials;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;
            }
        }


        public Tuple<long, List<MT_POU_NONCART_ITEMS>> GetNonCartItems(string pStrBUnit, string pStrCartId)
        {

            StackFrame stackFrame = new StackFrame();
            MethodBase methodBase = stackFrame.GetMethod();
            string methodBaseName = methodBase.Name;
            if (_log.IsDebugEnabled)
                _log.Debug(methodBaseName);

            StringBuilder _sbSQL = new StringBuilder();
            List<MT_POU_NONCART_ITEMS> lstNonCartItemDetails = new List<MT_POU_NONCART_ITEMS>();
            var sbSql = _sbSQL;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID,ITEM_ID, MANUFACTURE_ITEM_ID, VENDOR_ITEM_ID, CUST_ITEM_ID, ITEM_DESCRIPTION,VENDOR VENDOR_ID, ");
                    sbSql.Append("COUNT_ORDER, OPTIMUM_QTY, CHARGE_CODE, UOM, LOT_CONTROLLED, SERIALIZED, UPC_ID, ITEM_PRICE, COMPARTMENT ,STATUS ");
                    sbSql.Append("FROM MT_POU_NONCART_ITEMS ");
                    sbSql.Append("WHERE CART_ID='" + pStrCartId + "' ");
                    sbSql.Append("AND BUSINESS_UNIT='" + pStrBUnit + "' ");
                    sbSql.Append("AND STATUS != '" + AtParWebEnums.YesNo_Enum.N.ToString() + "'");

                    if (_log.IsInfoEnabled)
                        _log.Info(methodBaseName + " Getting the Non cart item details with the" + " following SQL...." + _sbSQL.ToString());


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "BUSINESS_UNIT", "CART_ID", "ITEM_ID", "MANUFACTURE_ITEM_ID", "VENDOR_ITEM_ID", "CUST_ITEM_ID", "ITEM_DESCRIPTION", "VENDOR_ID", "COUNT_ORDER", "OPTIMUM_QTY", "CHARGE_CODE","UOM","LOT_CONTROLLED","SERIALIZED","UPC_ID","ITEM_PRICE","COMPARTMENT","STATUS" };

                    lstNonCartItemDetails = objContext.Database.DifferedExecuteQuery<MT_POU_NONCART_ITEMS>(fields,_sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstNonCartItemDetails.Count); }

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                // return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                return new Tuple<long, List<MT_POU_NONCART_ITEMS>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
            }

            finally
            {
                _sbSQL = null;
            }

            // return AtparStatusCodes.ATPAR_OK;
            return new Tuple<long, List<MT_POU_NONCART_ITEMS>>(AtparStatusCodes.ATPAR_OK, lstNonCartItemDetails);
        }


        public Tuple<long,List<MT_POU_CART_INVENTORY>> GetItemQuantityOnHand(string businessUnit, string cartId)
        {

            StackFrame stackFrame = new StackFrame();
            MethodBase methodBase = stackFrame.GetMethod();
            string methodBaseName = methodBase.Name;
            if (_log.IsDebugEnabled)
                _log.Debug(methodBaseName);

            System.Text.StringBuilder _sbSQL = new System.Text.StringBuilder();
            List<MT_POU_CART_INVENTORY> lstQtyOnHandDS = new List<MT_POU_CART_INVENTORY>();

            var sbSql = _sbSQL;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT BUSINESS_UNIT, CART_ID, ITEM_ID, SUM(ITEM_QUANTITY_ON_HAND) AS QUANTITY_ON_HAND ");
                    sbSql.Append(", LOT_NUMBER, SERIAL_NUMBER, CONVERT(DATETIME, EXPIRY_DATE, 120) AS EXPIRY_DATE, COMPARTMENT ");
                    sbSql.Append(" FROM MT_POU_CART_INVENTORY WHERE BUSINESS_UNIT ='" + businessUnit + "'");
                    sbSql.Append(" AND CART_ID='" + cartId + "' GROUP BY BUSINESS_UNIT, CART_ID, ITEM_ID, LOT_NUMBER, ");
                    sbSql.Append("SERIAL_NUMBER, EXPIRY_DATE, COMPARTMENT");

                    if (_log.IsInfoEnabled)
                        _log.Info(methodBaseName + " Getting the Non cart item details with the" + " following SQL...." + _sbSQL.ToString());


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + _sbSQL.ToString() + ":")); }
                    }
                    string[] fields = new string[] { "BUSINESS_UNIT", "CART_ID", "ITEM_ID", "QUANTITY_ON_HAND", "LOT_NUMBER", "SERIAL_NUMBER", "EXPIRY_DATE", "COMPARTMENT" };

                    lstQtyOnHandDS = objContext.Database.DifferedExecuteQuery<MT_POU_CART_INVENTORY>(fields,_sbSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstQtyOnHandDS.Count); }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                //return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                return new Tuple<long, List<MT_POU_CART_INVENTORY>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
            }

            finally
            {
                _sbSQL = null;
            }

          //  return AtparStatusCodes.ATPAR_OK;
            return new Tuple<long, List<MT_POU_CART_INVENTORY>>(AtparStatusCodes.ATPAR_OK, lstQtyOnHandDS);

        }




        #endregion

        #region GetCasesforQA

        public VM_MT_POU_CASE_CART_HEADER GetCasesforQA(string startDate, string endDate, int reviewType, string deptID, string serviceCode, string CaseID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            VM_MT_POU_CASE_CART_HEADER obj = new VM_MT_POU_CASE_CART_HEADER();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT HDR.CASE_ID, '' AS DESCRIPTION, HDR.PERFORM_DATE, HDR.PROCEDURE_CODE,");
                    sbSql.Append("HDR.PREF_LIST_ID, HDR.PHYSICIAN,HDR.PATIENT_ID, HDR.EMERGENCY_CASE");
                    sbSql.Append(",CASE HDR.STATUS ");
                    sbSql.Append("WHEN '0' THEN 'OPEN' ");
                    sbSql.Append("WHEN '1' THEN 'READY' ");
                    sbSql.Append("WHEN '3' THEN 'PARTIALLY PICKED' ");
                    sbSql.Append("WHEN '5' THEN 'PICKED' ");
                    sbSql.Append("WHEN '7' THEN 'RETURNED' ");
                    sbSql.Append("WHEN '9' THEN 'REVIEWED' ");
                    sbSql.Append("WHEN '11' THEN 'REPLACED' ");
                    sbSql.Append("WHEN '13' THEN 'CANCELLED' ");
                    sbSql.Append("WHEN '17' THEN 'PREF REPLACED' ");
                    sbSql.Append("WHEN '25' THEN 'CASEISSUED' ");
                    sbSql.Append("END [STATUS], '' AS CHANGE_STATUS, 'False' AS CHECKED, ");
                    sbSql.Append("CASE WHEN ((PHY.FIRST_NAME IS NULL OR PHY.FIRST_NAME = '') AND (PHY.MIDDLE_INITIAL IS NULL OR PHY.MIDDLE_INITIAL = '') AND (PHY.LAST_NAME IS NULL OR PHY.LAST_NAME = '')) THEN HDR.PHYSICIAN ");
                    sbSql.Append("ELSE HDR.PHYSICIAN + ' - ' + ISNULL(PHY.FIRST_NAME,'')+ ' ' + ISNULL(PHY.MIDDLE_INITIAL,'') +' ' + ISNULL(PHY.LAST_NAME,'') END PHYSICIAN_NAME , ");
                    sbSql.Append("CASE WHEN (PRC.DESCRIPTION IS NULL OR PRC.DESCRIPTION = '')  THEN HDR.PROCEDURE_CODE ELSE PRC.PROCEDURE_CODE + ' - ' + PRC.DESCRIPTION END AS PROCEDURENAME, ");
                    sbSql.Append("CASE WHEN (PREF.PREF_LIST_DESCR IS NULL OR PREF.PREF_LIST_DESCR = '') THEN HDR.PREF_LIST_ID ELSE PREF.PREF_LIST_ID + ' - ' + PREF.PREF_LIST_DESCR END AS PREFERENCENAME, ");
                    sbSql.Append("CASE WHEN (PAT.PATIENT_NAME IS NULL OR PAT.PATIENT_NAME = '')  THEN HDR.PATIENT_ID ELSE PAT.PATIENT_MRC + ' - ' + PAT.PATIENT_NAME END AS PATIENTNAME, ");
                    sbSql.Append("HDR.DEPT_ID,");
                    sbSql.Append("CASE WHEN (DT.DEPT_NAME IS NULL OR DT.DEPT_NAME = '')  THEN HDR.DEPT_ID ELSE DT.DEPT_ID + ' - ' + DT.DEPT_NAME END AS DEPTNAME,");
                    sbSql.Append("HDR.SERVICE_CODE,");
                    sbSql.Append("CASE WHEN (SPL.DESCRIPTION IS NULL OR SPL.DESCRIPTION = '')  THEN HDR.SERVICE_CODE ELSE SPL.SPECIALTY_CODE + ' - ' + SPL.DESCRIPTION END AS SERVICENAME ");
                    sbSql.Append("FROM MT_POU_CASE_CART_HEADER HDR ");
                    sbSql.Append("LEFT JOIN MT_POU_PHYSICIAN PHY ON PHY.PHYSICIAN_ID = HDR.PHYSICIAN ");
                    sbSql.Append("LEFT JOIN MT_POU_PROCEDURE_CODE PRC ON PRC.PROCEDURE_CODE = HDR.PROCEDURE_CODE ");
                    sbSql.Append("LEFT JOIN MT_POU_PREF_LIST_HEADER PREF ON PREF.PREF_LIST_ID = HDR.PREF_LIST_ID ");
                    sbSql.Append("AND PREF.PROCEDURE_ID = HDR.PROCEDURE_CODE ");
                    sbSql.Append("LEFT JOIN MT_ATPAR_PATIENT_CACHE PAT ON PAT.PATIENT_MRC = HDR.PATIENT_ID ");
                    sbSql.Append("LEFT JOIN MT_POU_DEPT DT ON DT.DEPT_ID = HDR.DEPT_ID ");
                    sbSql.Append("LEFT JOIN MT_POU_SPECIALTY_CODE SPL ON SPL.SPECIALTY_CODE = HDR.SERVICE_CODE ");
                    sbSql.Append("WHERE ");
                    sbSql.Append("HDR.PERFORM_DATE >= '" + startDate + "' AND HDR.PERFORM_DATE < DATEADD(DAY,1,CONVERT(DATETIME,'" + endDate + "', 101)) AND ");

                    if (reviewType == 0)/*--For Manage Cases Screen*/
                    {
                        sbSql.Append("HDR.STATUS IN (0,1,3,5,7,9,13,25) AND (HDR.MERGED_CASE_ID IS NULL OR HDR.MERGED_CASE_ID = '') ");

                        if (!string.IsNullOrEmpty(deptID))
                        {
                            sbSql.Append("AND HDR.DEPT_ID = '" + deptID + "' ");
                        }
                        if (!string.IsNullOrEmpty(serviceCode))
                        {
                            sbSql.Append("AND HDR.SERVICE_CODE = '" + serviceCode + "' ");
                        }
                        if (!string.IsNullOrEmpty(CaseID))
                        {
                            sbSql.Append("AND HDR.CASE_ID = '" + CaseID + "'");
                        }

                        sbSql.Append("UNION SELECT HDR2.CASE_ID, '' AS DESCRIPTION, HDR2.PERFORM_DATE, HDR2.PROCEDURE_CODE, ");
                        sbSql.Append("HDR2.PREF_LIST_ID, HDR2.PHYSICIAN,HDR2.PATIENT_ID, HDR2.EMERGENCY_CASE ");
                        sbSql.Append(",CASE HDR2.STATUS ");
                        sbSql.Append("WHEN '0' THEN 'OPEN' ");
                        sbSql.Append("WHEN '1' THEN 'READY' ");
                        sbSql.Append("WHEN '3' THEN 'PARTIALLY PICKED' ");
                        sbSql.Append("WHEN '5' THEN 'PICKED' ");
                        sbSql.Append("WHEN '7' THEN 'RETURNED' ");
                        sbSql.Append("WHEN '9' THEN 'REVIEWED' ");
                        sbSql.Append("WHEN '11' THEN 'REPLACED' ");
                        sbSql.Append("WHEN '13' THEN 'CANCELLED' ");
                        sbSql.Append("WHEN '17' THEN 'PREF REPLACED' ");
                        sbSql.Append("WHEN '25' THEN 'CASEISSUED' ");
                        sbSql.Append("END [STATUS], '' AS CHANGE_STATUS, 'False' AS CHECKED, ");
                        sbSql.Append("CASE WHEN ((PHY.FIRST_NAME IS NULL OR PHY.FIRST_NAME = '') AND (PHY.MIDDLE_INITIAL IS NULL OR PHY.MIDDLE_INITIAL = '') AND (PHY.LAST_NAME IS NULL OR PHY.LAST_NAME = '')) THEN HDR2.PHYSICIAN  ");
                        sbSql.Append("ELSE HDR2.PHYSICIAN + ' - ' + ISNULL(PHY.FIRST_NAME,'')+ ' ' + ISNULL(PHY.MIDDLE_INITIAL,'') +' ' + ISNULL(PHY.LAST_NAME,'') END PHYSICIAN_NAME , ");
                        sbSql.Append("CASE WHEN (PRC.DESCRIPTION IS NULL OR PRC.DESCRIPTION = '')  THEN HDR2.PROCEDURE_CODE ELSE PRC.PROCEDURE_CODE + ' - ' + PRC.DESCRIPTION END AS PROCEDURENAME, ");
                        sbSql.Append("CASE WHEN (PREF.PREF_LIST_DESCR IS NULL OR PREF.PREF_LIST_DESCR = '') THEN HDR2.PREF_LIST_ID ELSE PREF.PREF_LIST_ID + ' - ' + PREF.PREF_LIST_DESCR END AS PREFERENCENAME, ");
                        sbSql.Append("CASE WHEN (PAT.PATIENT_NAME IS NULL OR PAT.PATIENT_NAME = '')  THEN HDR2.PATIENT_ID ELSE PAT.PATIENT_MRC + ' - ' + PAT.PATIENT_NAME END AS PATIENTNAME,  ");
                        sbSql.Append("HDR2.DEPT_ID,");
                        sbSql.Append("CASE WHEN (DT.DEPT_NAME IS NULL OR DT.DEPT_NAME = '')  THEN HDR2.DEPT_ID ELSE DT.DEPT_ID + ' - ' + DT.DEPT_NAME END AS DEPTNAME,");
                        sbSql.Append("HDR2.SERVICE_CODE,");
                        sbSql.Append("CASE WHEN (SPL.DESCRIPTION IS NULL OR SPL.DESCRIPTION = '')  THEN HDR2.SERVICE_CODE ELSE SPL.SPECIALTY_CODE + ' - ' + SPL.DESCRIPTION END AS SERVICENAME ");
                        sbSql.Append("FROM MT_POU_CASE_CART_HEADER HDR1 JOIN MT_POU_CASE_CART_HEADER HDR2 ");
                        sbSql.Append("ON HDR2.MERGED_CASE_ID = HDR1.CASE_ID ");
                        sbSql.Append("AND HDR1.STATUS IN (0,1,3,5,7,9,25)  ");
                        sbSql.Append("LEFT JOIN MT_POU_PHYSICIAN PHY ON PHY.PHYSICIAN_ID = HDR2.PHYSICIAN ");
                        sbSql.Append("LEFT JOIN MT_POU_PROCEDURE_CODE PRC ON PRC.PROCEDURE_CODE = HDR2.PROCEDURE_CODE ");
                        sbSql.Append("LEFT JOIN MT_POU_PREF_LIST_HEADER PREF ON PREF.PREF_LIST_ID = HDR2.PREF_LIST_ID ");
                        sbSql.Append("AND PREF.PROCEDURE_ID = HDR2.PROCEDURE_CODE ");
                        sbSql.Append("LEFT JOIN MT_ATPAR_PATIENT_CACHE PAT ON PAT.PATIENT_MRC = HDR2.PATIENT_ID ");
                        sbSql.Append("LEFT JOIN MT_POU_DEPT DT ON DT.DEPT_ID = HDR2.DEPT_ID ");
                        sbSql.Append("LEFT JOIN MT_POU_SPECIALTY_CODE SPL ON SPL.SPECIALTY_CODE = HDR2.SERVICE_CODE ");
                        sbSql.Append("WHERE  ");
                        sbSql.Append("HDR2.PERFORM_DATE >='" + startDate + "' AND HDR2.PERFORM_DATE < DATEADD(DAY,1,CONVERT(DATETIME,'" + endDate + "', 101)) ");


                        if (!string.IsNullOrEmpty(deptID))
                        {
                            sbSql.Append("AND HDR2.DEPT_ID = '" + deptID + "' ");
                        }
                        if (!string.IsNullOrEmpty(serviceCode))
                        {
                            sbSql.Append("AND HDR2.SERVICE_CODE = '" + serviceCode + "' ");
                        }
                        if (!string.IsNullOrEmpty(CaseID))
                        {
                            sbSql.Append("AND HDR2.CASE_ID = '" + CaseID + "' ");
                        }
                    }
                    else
                    {
                        sbSql.Append("HDR.STATUS IN (3,5,25) ");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    string[] fields = new string[] { "CASE_ID", "DESCRIPTION", "PERFORM_DATE", "PROCEDURE_CODE", "PREF_LIST_ID", "PHYSICIAN", "PATIENT_ID", "EMERGENCY_CASE", "STATUS", "CHANGE_STATUS", "CHECKED", "PHYSICIAN_NAME", "PROCEDURENAME", "PREFERENCENAME", "PATIENTNAME", "DEPT_ID", "DEPTNAME", "SERVICE_CODE", "SERVICENAME" };

                    var lstCaseCartDetails = objContext.Database.DifferedExecuteQuery<VM_MT_POU_CASE_CART_HEADER_TB>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstCaseCartDetails.Count); }


                    obj.lstCaseforQA = lstCaseCartDetails;
                    obj.lstCaseInfo = GetCasesforQA1(startDate, endDate, reviewType, deptID, serviceCode, CaseID, deviceTokenEntry, objContext);
                    obj.lstDstCaseCartHeader = GetEmgDistCasesCartHeader(startDate, endDate, reviewType, deptID, serviceCode, CaseID, deviceTokenEntry, objContext);
                    obj.lstDescDistCase = GetDistCasesCartHeader(startDate, endDate, reviewType, deptID, serviceCode, CaseID, deviceTokenEntry, objContext);
                    obj.lstCaseIdDesc = GetCasesCartHeader(startDate, endDate, reviewType, deptID, serviceCode, CaseID, deviceTokenEntry, objContext);

                    return obj;
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


        private List<VM_MT_POU_CASE_CART_HEADER_TB> GetCasesforQA1(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                // using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                // {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT DISTINCT HDR.CASE_ID, '' AS DESCRIPTION, HDR.PERFORM_DATE, '' AS EMERGENCY_CASE, '' AS PROCEDURE_CODE,'' AS PREF_LIST_ID, '' AS PHYSICIAN,'' AS PHYSICIAN_NAME, '' AS PROCEDURENAME, '' AS PREFERENCENAME, '' AS PATIENTNAME,'' AS PATIENT_ID, '' AS STATUS, '' AS REPLACE_CASE, '' AS CHANGE_STATUS, 'False' AS CHECKED,'' AS DEPT_ID,'' AS DEPTNAME,'' AS SERVICE_CODE, '' AS SERVICENAME FROM MT_POU_CASE_CART_HEADER HDR WHERE HDR.PERFORM_DATE >= '" + startDate + "' AND HDR.PERFORM_DATE < DATEADD(DAY, 1, CONVERT(DATETIME, '" + endDate + "', 101)) AND");

                if (reviewType == 0)
                {
                    sbSql.Append(" HDR.STATUS IN (0,1,3,5,7,9,13,25) AND (HDR.MERGED_CASE_ID IS NULL OR HDR.MERGED_CASE_ID = '')");

                    if (deptId != "")
                    {
                        sbSql.Append(" AND HDR.DEPT_ID = '" + deptId + "'");
                    }
                    if (serviceCode != "")
                    {
                        sbSql.Append(" AND HDR.SERVICE_CODE = '" + serviceCode + "'");
                    }
                    if (CaseId != "")
                    {
                        sbSql.Append(" AND HDR.CASE_ID = '" + CaseId + "'");
                    }

                    sbSql.Append("UNION SELECT DISTINCT HDR2.CASE_ID, '' AS DESCRIPTION, HDR2.PERFORM_DATE, '' AS EMERGENCY_CASE,'' AS PROCEDURE_CODE,'' AS PREF_LIST_ID, '' AS PHYSICIAN,'' AS PHYSICIAN_NAME, '' AS PROCEDURENAME, '' AS PREFERENCENAME, '' AS PATIENTNAME,'' AS PATIENT_ID, '' AS STATUS, '' AS REPLACE_CASE, '''' AS CHANGE_STATUS, 'False' AS CHECKED,'' AS DEPT_ID,'' AS DEPTNAME,'' AS SERVICE_CODE, '' AS SERVICENAME FROM MT_POU_CASE_CART_HEADER HDR1 JOIN MT_POU_CASE_CART_HEADER HDR2 ON HDR2.MERGED_CASE_ID = HDR1.CASE_ID AND HDR1.STATUS IN (0, 1, 3, 5, 7, 9, 25) WHERE HDR2.PERFORM_DATE >= '" + startDate + "' AND HDR2.PERFORM_DATE < DATEADD(DAY, 1, CONVERT(DATETIME, '" + endDate + "', 101)) ");

                    if (deptId != "")
                    {
                        sbSql.Append(" AND HDR2.DEPT_ID = '" + deptId + "'");
                    }
                    if (serviceCode != "")
                    {
                        sbSql.Append(" AND HDR2.SERVICE_CODE = '" + serviceCode + "'");
                    }
                    if (CaseId != "")
                    {
                        sbSql.Append(" AND HDR2.CASE_ID = '" + CaseId + "'");
                    }
                }
                else
                {
                    sbSql.Append(" HDR.STATUS IN (3,5,25)");
                }

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                string[] fields = new string[] { "CASE_ID", "DESCRIPTION", "PERFORM_DATE", "PROCEDURE_CODE", "PREF_LIST_ID", "PHYSICIAN", "PATIENT_ID", "EMERGENCY_CASE", "STATUS","REPLACE_CASE", "CHANGE_STATUS", "CHECKED", "PHYSICIAN_NAME", "PROCEDURENAME", "PREFERENCENAME", "PATIENTNAME", "DEPT_ID", "DEPTNAME", "SERVICE_CODE", "SERVICENAME" };

                var lstDstHeaderDetails = objContext.Database.DifferedExecuteQuery<VM_MT_POU_CASE_CART_HEADER_TB>(fields,sbSql.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstDstHeaderDetails.Count); }

                return lstDstHeaderDetails;
            }
            // }

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


        private List<VM_MT_POU_CASE_DISCRIPTON> GetEmgDistCasesCartHeader(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                //  using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                // {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT DISTINCT CASE_DESCR = REPLACE(STUFF((SELECT DISTINCT ', ' + DESCRIPTION           FROM MT_POU_CASE_CART_HEADER A WHERE A.CASE_ID = B.CASE_ID FOR XML PATH('')), 1, 1, ''), ' ,', ','),CASE_ID FROM MT_POU_CASE_CART_HEADER B WHERE EMERGENCY_CASE = 'Y' AND STATUS IN(1, 3, 5, 7, 9, 25) ");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                string[] fields = new string[] { "CASE_ID", "CASE_DESCR" };
                var lstEmgDistCartHeader = objContext.Database.DifferedExecuteQuery<VM_MT_POU_CASE_DISCRIPTON>(fields,sbSql.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstEmgDistCartHeader.Count); }

                return lstEmgDistCartHeader;
                //}
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

        private List<VM_MT_POU_CASE_DISCRIPTON> GetDistCasesCartHeader(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                //  using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                // {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT DISTINCT CASE_DESCR = REPLACE(STUFF((SELECT DISTINCT ',' + DESCRIPTION FROM MT_POU_CASE_CART_HEADER A WHERE A.CASE_ID = B.CASE_ID FOR XML PATH('')), 1, 1, ''), ',', ','),CASE_ID FROM MT_POU_CASE_CART_HEADER B WHERE PERFORM_DATE >= '" + startDate + "' AND PERFORM_DATE < DATEADD(DAY, 1, CONVERT(DATETIME, '" + endDate + "' , 101)) AND STATUS IN(0, 1, 3, 5, 7, 9, 11, 13, 25)");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                string[] fields = new string[] { "CASE_ID", "CASE_DESCR" };
                var lstDistCartHeader = objContext.Database.DifferedExecuteQuery<VM_MT_POU_CASE_DISCRIPTON>(fields,sbSql.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstDistCartHeader.Count); }

                return lstDistCartHeader;
                // }
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

        private List<VM_MT_POU_CASE_CART> GetCasesCartHeader(string startDate, string endDate, int reviewType, string deptId, string serviceCode, string CaseId, string[] deviceTokenEntry, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
           
            StringBuilder sbSql = new StringBuilder();
            try
            {
                // using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                // {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT CASE_ID, PROCEDURE_CODE, PREF_LIST_ID, PHYSICIAN FROM MT_POU_CASE_CART_HEADER WHERE EMERGENCY_CASE = 'Y' AND STATUS IN(1, 3, 5, 7, 9, 25)");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                string[] fields = new string[] { "CASE_ID", "PROCEDURE_CODE", "PREF_LIST_ID", "PHYSICIAN" };

                var lstCaseCartHeader = objContext.Database.DifferedExecuteQuery<VM_MT_POU_CASE_CART>(fields,sbSql.ToString()).ToList();

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Returned value " + lstCaseCartHeader.Count); }

                return lstCaseCartHeader;
                //  }
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
