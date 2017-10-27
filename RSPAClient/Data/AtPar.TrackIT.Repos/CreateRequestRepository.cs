using AtPar.Repository.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using System.Data.Entity;
using AtPar.ViewModel;

namespace AtPar.TrackIT.Repos
{
    public class CreateRequestRepository : ICreateRequestRepository
    {
        private ILog _log;

        public CreateRequestRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CreateRequestRepository));
        }

        public List<TKIT_ITEM_TYPE> GetEquipmentType(string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    bool isDeptHasRows = IsDepartmentTableHasRecords();


                    sbSql.Append(" SELECT DISTINCT C.ITEM_TYPE, ");
                    sbSql.Append(" C.ITEM_TYPE_DESCR, ");
                    sbSql.Append(" C.ITEM_TYPE_INDICATOR");
                    sbSql.Append(" FROM TKIT_REQUESTOR_DEPT A ,TKIT_ITEM_TYPE C,");
                    sbSql.Append(" TKIT_ITEM_MASTER D , TKIT_ITEM_INVENTORY F, TKIT_DEPT E");

                    if (isDeptHasRows)
                    {
                        sbSql.Append(" , TKIT_ITEM_DEPT B ");
                    }

                    sbSql.Append(" WHERE (D.OWNER = A.DEPT_ID OR D.OWNER = ' ' ");

                    if (isDeptHasRows)
                    {
                        sbSql.Append(" OR A.DEPT_ID = B.DEPT_ID ) ");
                    }
                    else
                    {
                        sbSql.Append(" ) ");
                    }

                    sbSql.Append(" AND C.ORG_GROUP_ID = F.ORG_GROUP_ID ");
                    sbSql.Append(" AND D.ORG_GROUP_ID = F.ORG_GROUP_ID AND D.ITEM_ID = F.ITEM_ID ");
                    sbSql.Append(" AND D.ITEM_TYPE = F.ITEM_TYPE ");

                    if (isDeptHasRows)
                    {
                        sbSql.Append(" AND B.ORG_GROUP_ID = E.ORG_GROUP_ID AND B.DEPT_ID = E.DEPT_ID");
                    }

                    sbSql.Append(" AND D.ORG_GROUP_ID = E.ORG_GROUP_ID AND A.ORG_GROUP_ID = E.ORG_GROUP_ID AND A.DEPT_ID = E.DEPT_ID");
                    sbSql.Append(" AND E.STATUS <> 'I'");
                    sbSql.Append(" AND C.ORG_GROUP_ID = D.ORG_GROUP_ID");
                    sbSql.Append(" AND C.ORG_GROUP_ID = A.ORG_GROUP_ID");
                    sbSql.Append(" AND C.ORG_GROUP_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "'");
                    sbSql.Append(" AND A.REQUESTOR_ID ='" + userID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ITEM_TYPE", "ITEM_TYPE_DESCR", "ITEM_TYPE_INDICATOR" };

                    var lstEquipmentTypes = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_TYPE>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstEquipmentTypes); }

                    return lstEquipmentTypes;
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

        private bool IsDepartmentTableHasRecords()
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var count = objContext.TKIT_ITEM_DEPT.Count();

                    if (count > 0)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Records in Department Table " + count); }
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        private List<TKIT_ITEM_MASTER> GetMasterItems()
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var lstItemMaster = objContext.TKIT_ITEM_MASTER.ToList();

                    return lstItemMaster;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        private string QueryToGetBoxTypeItems(string eqpType, string search, string[] deviceTokenEntry, bool isCalledFromAutoSearch)
        {
            StringBuilder sbSql = new StringBuilder();

            sbSql.Append(" SELECT DISTINCT A.ITEM_ID, A.ITEM_DESCR ");

            if (!isCalledFromAutoSearch)
            {
                sbSql.Append(", F.ITEM_QTY, A.IMAGE, A.COMMENTS, 0 AS CHK_VALUE, B.ITEM_TYPE_INDICATOR, 0 AS ROW_INDEX, 0 AS SERIAL_NO ");
            }

            sbSql.Append("FROM TKIT_ITEM_MASTER A, TKIT_ITEM_TYPE B, TKIT_REQUESTOR_DEPT C, TKIT_ITEM_DEPT D,TKIT_DEPT E, TKIT_ITEM_INVENTORY F ");
            sbSql.Append("WHERE B.ITEM_TYPE = A.ITEM_TYPE ");
            sbSql.Append("AND D.DEPT_ID = C.DEPT_ID ");
            sbSql.Append("AND D.DEPT_ID = E.DEPT_ID ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND A.ORG_GROUP_ID = F.ORG_GROUP_ID ");
            sbSql.Append("AND A.ITEM_TYPE = F.ITEM_TYPE ");
            sbSql.Append("AND E.STATUS <>'I' ");
            sbSql.Append("AND A.ITEM_ID = D.ITEM_ID ");
            sbSql.Append("AND A.ORG_GROUP_ID = D.ORG_GROUP_ID ");
            sbSql.Append("AND C.REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "'");
            sbSql.Append("AND A.ITEM_TYPE ='" + eqpType + "' ");
            sbSql.Append("AND A.DESTRUCTION_DATE > CONVERT(DATETIME, '" + DateTime.Now.Date + "', 101) ");
            sbSql.Append("AND A.ITEM_INACTIVATED = 0 ");
            sbSql.Append("AND F.ITEM_QTY > 0 ");

            if (!isCalledFromAutoSearch)
            {
                sbSql.Append("AND (A.ITEM_ID LIKE '%" + search + "%' ");
                sbSql.Append("OR A.ITEM_DESCR LIKE '%" + search + "%' )");
            }

            sbSql.Append(" UNION ");

            sbSql.Append(" SELECT DISTINCT A.ITEM_ID, A.ITEM_DESCR ");
            if (!isCalledFromAutoSearch)
            {
                sbSql.Append(", F.ITEM_QTY, A.IMAGE, A.COMMENTS, 0 AS CHK_VALUE, B.ITEM_TYPE_INDICATOR,0 AS ROW_INDEX, 0 AS SERIAL_NO ");
            }
            sbSql.Append(" FROM TKIT_ITEM_MASTER A, TKIT_ITEM_TYPE B,TKIT_DEPT E, TKIT_ITEM_INVENTORY F ");
            sbSql.Append("WHERE B.ITEM_TYPE = A.ITEM_TYPE ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND A.ORG_GROUP_ID = F.ORG_GROUP_ID ");
            sbSql.Append("AND A.ITEM_TYPE = F.ITEM_TYPE ");
            sbSql.Append("AND E.STATUS <>'I' ");
            sbSql.Append("AND A.ITEM_TYPE ='" + eqpType + "' ");
            sbSql.Append("AND A.DESTRUCTION_DATE > CONVERT(DATETIME, '" + DateTime.Now.Date + "', 101) ");
            sbSql.Append("AND A.ITEM_INACTIVATED = 0 ");
            sbSql.Append("AND F.ITEM_QTY > 0 ");
            sbSql.Append("AND A.ITEM_ID IN (SELECT A.ITEM_ID FROM TKIT_ITEM_MASTER A, TKIT_REQUESTOR_DEPT C, TKIT_ITEM_INVENTORY F ");
            sbSql.Append("WHERE C.REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "'");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND A.OWNER = C.DEPT_ID ");
            sbSql.Append("AND A.ORG_GROUP_ID = F.ORG_GROUP_ID ");
            sbSql.Append("AND A.ITEM_TYPE = F.ITEM_TYPE ) ");

            if (!isCalledFromAutoSearch)
            {
                sbSql.Append("AND (A.ITEM_ID LIKE '%" + search + "%' ");
                sbSql.Append("OR A.ITEM_DESCR LIKE '%" + search + "%' )");
            }

            sbSql.Append(" UNION ");

            sbSql.Append(" SELECT DISTINCT A.ITEM_ID, A.ITEM_DESCR ");
            if (!isCalledFromAutoSearch)
            {
                sbSql.Append(", F.ITEM_QTY, A.IMAGE, A.COMMENTS, 0 AS CHK_VALUE, B.ITEM_TYPE_INDICATOR,0 AS ROW_INDEX, 0 AS SERIAL_NO ");
            }
            sbSql.Append("FROM TKIT_ITEM_MASTER A, TKIT_ITEM_TYPE B, TKIT_DEPT E, TKIT_ITEM_INVENTORY F ");
            sbSql.Append("WHERE B.ITEM_TYPE = A.ITEM_TYPE ");
            sbSql.Append("AND  B.ORG_GROUP_ID = A.ORG_GROUP_ID ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND A.ORG_GROUP_ID = F.ORG_GROUP_ID ");
            sbSql.Append("AND A.ITEM_TYPE = F.ITEM_TYPE ");
            sbSql.Append("AND E.STATUS <>'I' ");
            sbSql.Append("AND A.ITEM_TYPE ='" + eqpType + "' ");
            sbSql.Append("AND A.DESTRUCTION_DATE > CONVERT(DATETIME, '" + DateTime.Now.Date + "', 101) ");
            sbSql.Append("AND A.ITEM_INACTIVATED = 0 ");
            sbSql.Append("AND F.ITEM_QTY > 0 ");
            sbSql.Append("AND A.ITEM_ID IN (SELECT DISTINCT A.ITEM_ID FROM TKIT_ITEM_MASTER A, TKIT_ITEM_INVENTORY F ");
            sbSql.Append("WHERE A.ITEM_TYPE = '" + eqpType + "' ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND A.ORG_GROUP_ID = F.ORG_GROUP_ID ");
            sbSql.Append("AND A.ITEM_TYPE = F.ITEM_TYPE ");
            sbSql.Append("AND A.OWNER ='' ) ");

            if (!isCalledFromAutoSearch)
            {
                sbSql.Append("AND (A.ITEM_ID LIKE '%" + search + "%' ");
                sbSql.Append("OR A.ITEM_DESCR LIKE '%" + search + "%' )");
            }

            sbSql.Append("ORDER BY A.ITEM_ID");

            return sbSql.ToString();

        }

        private string QueryToGetFurnitureTypeItems(string eqpType, string search, string[] deviceTokenEntry, bool isCalledFromAutoSearch)
        {
            StringBuilder sbSql = new StringBuilder();

            sbSql.Append("SELECT DISTINCT A.ITEM_ID, A.ITEM_DESCR ");
            if (!isCalledFromAutoSearch)
            {
                sbSql.Append(", B.ITEM_TYPE_INDICATOR, F.ITEM_QTY, A.IMAGE ,A.COMMENTS,  0 AS ROW_INDEX, 0 AS SERIAL_NO,  0 AS CHK_VALUE ");
            }
            sbSql.Append("FROM TKIT_ITEM_MASTER A,TKIT_ITEM_TYPE B,TKIT_REQUESTOR_DEPT C,TKIT_ITEM_INVENTORY  F ");
            sbSql.Append("WHERE B.ITEM_TYPE = A.ITEM_TYPE ");
            sbSql.Append("AND A.ITEM_TYPE = '" + eqpType + "' ");
            sbSql.Append("AND C.REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' ");
            sbSql.Append("AND A.OWNER = C.DEPT_ID ");
            sbSql.Append("AND A.DESTRUCTION_DATE > CONVERT(DATETIME, '" + DateTime.Now.Date + "', 101) ");
            sbSql.Append("AND A.ITEM_INACTIVATED = 0 ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND F.ITEM_QTY > 0 ");
            if (!isCalledFromAutoSearch)
            {
                sbSql.Append("AND (A.ITEM_ID LIKE '%" + search + "%' ");
                sbSql.Append("OR A.ITEM_DESCR LIKE '%" + search + "%' )");
            }

            sbSql.Append(" UNION ");

            sbSql.Append("SELECT DISTINCT A.ITEM_ID, A.ITEM_DESCR ");
            if (!isCalledFromAutoSearch)
            {
                sbSql.Append(", B.ITEM_TYPE_INDICATOR, F.ITEM_QTY, A.IMAGE ,A.COMMENTS,  0 AS ROW_INDEX, 0 AS SERIAL_NO,  0 AS CHK_VALUE ");
            }
            sbSql.Append("FROM TKIT_ITEM_MASTER A,TKIT_ITEM_TYPE B,TKIT_REQUESTOR_DEPT C,TKIT_ITEM_INVENTORY  F ");
            sbSql.Append("WHERE B.ITEM_TYPE = A.ITEM_TYPE ");
            sbSql.Append("AND A.ITEM_TYPE = '" + eqpType + "' ");
            sbSql.Append("AND C.REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' ");
            sbSql.Append("AND A.DESTRUCTION_DATE > CONVERT(DATETIME, '" + DateTime.Now.Date + "', 101) ");
            sbSql.Append("AND A.ITEM_INACTIVATED = 0 ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND F.ITEM_QTY > 0 ");
            sbSql.Append("AND A.ITEM_ID IN (SELECT DISTINCT A.ITEM_ID FROM TKIT_ITEM_MASTER A, TKIT_REQUESTOR_DEPT C, TKIT_ITEM_INVENTORY F ");
            sbSql.Append("WHERE A.ITEM_TYPE = '" + eqpType + "' ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID AND A.OWNER ='' ) ");
            if (!isCalledFromAutoSearch)
            {
                sbSql.Append("AND (A.ITEM_ID LIKE '%" + search + "%' ");
                sbSql.Append("OR A.ITEM_DESCR LIKE '%" + search + "%' ) ");
            }

            sbSql.Append("ORDER BY A.ITEM_ID");

            return sbSql.ToString();
        }

        private string QueryToGetEquipmentTypeItems(string eqpType, string search, string[] deviceTokenEntry, bool isCalledFromAutoSearch)
        {
            StringBuilder sbSql = new StringBuilder();

            sbSql.Append("SELECT DISTINCT A.ITEM_ID, A.ITEM_DESCR ");
            if (!isCalledFromAutoSearch)
            {
                sbSql.Append(", B.ITEM_TYPE_INDICATOR, F.SUM_ITEM_QTY as ITEM_QTY, A.IMAGE ,A.COMMENTS,  0 AS ROW_INDEX, 0 AS SERIAL_NO,  0 AS CHK_VALUE ");
            }

            sbSql.Append("FROM TKIT_ITEM_MASTER A, TKIT_ITEM_TYPE B, TKIT_ITEM_DEPT C,TKIT_REQUESTOR_DEPT D, TKIT_DEPT E, ");
            sbSql.Append("(SELECT ITEM_ID, ORG_GROUP_ID, ITEM_TYPE, SUM(ITEM_QTY) AS SUM_ITEM_QTY ");
            sbSql.Append("FROM TKIT_ITEM_INVENTORY D GROUP BY ITEM_ID, ORG_GROUP_ID, ITEM_TYPE) F ");
            sbSql.Append("WHERE A.ITEM_TYPE = B.ITEM_TYPE ");
            sbSql.Append("AND C.DEPT_ID = D.DEPT_ID ");
            sbSql.Append("AND C.DEPT_ID = E.DEPT_ID ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND E.STATUS <> 'I' ");
            sbSql.Append("AND A.ITEM_ID = C.ITEM_ID ");
            sbSql.Append("AND (A.ITEM_TYPE = '" + eqpType + "') ");
            sbSql.Append("AND (A.ITEM_INACTIVATED = 0) ");
            sbSql.Append("AND F.SUM_ITEM_QTY > 0 ");
            sbSql.Append("AND D.REQUESTOR_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' ");

            if (!isCalledFromAutoSearch)
            {
                sbSql.Append("AND (A.ITEM_ID LIKE '%" + search + "%' ");
                sbSql.Append("OR A.ITEM_DESCR LIKE '%" + search + "%' )");
            }

            sbSql.Append(" UNION ");

            sbSql.Append("SELECT DISTINCT A.ITEM_ID, A.ITEM_DESCR ");
            if (!isCalledFromAutoSearch)
            {
                sbSql.Append(", B.ITEM_TYPE_INDICATOR, F.SUM_ITEM_QTY as ITEM_QTY, A.IMAGE ,A.COMMENTS,  0 AS ROW_INDEX, 0 AS SERIAL_NO,  0 AS CHK_VALUE ");
            }
            sbSql.Append("FROM TKIT_ITEM_MASTER A, TKIT_ITEM_TYPE B, TKIT_REQUESTOR_DEPT C, TKIT_DEPT E, ");
            sbSql.Append("(SELECT ITEM_ID, ORG_GROUP_ID, ITEM_TYPE, SUM(ITEM_QTY) AS SUM_ITEM_QTY ");
            sbSql.Append("FROM TKIT_ITEM_INVENTORY D GROUP BY ITEM_ID, ORG_GROUP_ID, ITEM_TYPE) F ");
            sbSql.Append("WHERE A.ITEM_TYPE = B.ITEM_TYPE ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND E.STATUS <> 'I' ");
            sbSql.Append("AND (A.ITEM_TYPE = '" + eqpType + "') ");
            sbSql.Append("AND (A.ITEM_INACTIVATED = 0) ");
            sbSql.Append("AND F.SUM_ITEM_QTY > 0 ");
            sbSql.Append("AND A.ITEM_ID IN (SELECT A.ITEM_ID FROM TKIT_ITEM_MASTER A, TKIT_REQUESTOR_DEPT C, TKIT_ITEM_INVENTORY F ");
            sbSql.Append("WHERE C.REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "'");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND A.OWNER = C.DEPT_ID )");

            if (!isCalledFromAutoSearch)
            {
                sbSql.Append("AND (A.ITEM_ID LIKE '%" + search + "%' ");
                sbSql.Append("OR A.ITEM_DESCR LIKE '%" + search + "%' )");
            }

            sbSql.Append(" UNION ");

            sbSql.Append("SELECT DISTINCT A.ITEM_ID, A.ITEM_DESCR ");
            if (!isCalledFromAutoSearch)
            {
                sbSql.Append(", B.ITEM_TYPE_INDICATOR, F.SUM_ITEM_QTY as ITEM_QTY, A.IMAGE ,A.COMMENTS,  0 AS ROW_INDEX, 0 AS SERIAL_NO,  0 AS CHK_VALUE ");
            }
            sbSql.Append("FROM TKIT_ITEM_MASTER A, TKIT_ITEM_TYPE B, TKIT_REQUESTOR_DEPT C,TKIT_DEPT E, ");
            sbSql.Append("(SELECT ITEM_ID, ORG_GROUP_ID, ITEM_TYPE, SUM(ITEM_QTY) AS SUM_ITEM_QTY ");
            sbSql.Append("FROM TKIT_ITEM_INVENTORY D GROUP BY ITEM_ID, ORG_GROUP_ID, ITEM_TYPE) F ");
            sbSql.Append("WHERE B.ITEM_TYPE = A.ITEM_TYPE  ");
            sbSql.Append("AND E.STATUS <>'I' ");
            sbSql.Append("AND (A.ITEM_TYPE = '" + eqpType + "') ");
            sbSql.Append("AND A.ITEM_INACTIVATED = 0 ");
            sbSql.Append("AND F.SUM_ITEM_QTY > 0 ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID ");
            sbSql.Append("AND A.ITEM_ID IN (SELECT DISTINCT A.ITEM_ID FROM TKIT_ITEM_MASTER A, TKIT_REQUESTOR_DEPT C, TKIT_ITEM_INVENTORY F ");
            sbSql.Append("WHERE  A.ITEM_TYPE = '" + eqpType + "' ");
            sbSql.Append("AND A.ITEM_ID = F.ITEM_ID AND A.OWNER='' ) ");

            if (!isCalledFromAutoSearch)
            {
                sbSql.Append("AND (A.ITEM_ID LIKE '%" + search + "%' ");
                sbSql.Append("OR A.ITEM_DESCR LIKE '%" + search + "%' )");
            }

            sbSql.Append(" ORDER BY A.ITEM_ID ");

            return sbSql.ToString();
        }

        private string GetItemTypeIndicator(string eqpType)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var indicator = objContext.TKIT_ITEM_TYPE.Where(c => c.ITEM_TYPE == eqpType).FirstOrDefault().ITEM_TYPE_INDICATOR;

                    return indicator;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        public Tuple<string, List<VM_TKIT_EQPITEMS>> GetEquipmentItems(string eqpType, string search, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            string eqpInidcator = string.Empty;
            string queryToBeExecuted = string.Empty;
            int intRowCount = 0;
            int intSerialNo = 1;

            try
            {
                if (string.IsNullOrEmpty(eqpType).Equals(false))
                {
                    eqpInidcator = GetItemTypeIndicator(eqpType);
                }

                if (eqpInidcator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()))
                {
                    queryToBeExecuted = QueryToGetBoxTypeItems(eqpType, search, deviceTokenEntry, false);
                }
                else if (eqpInidcator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.F.ToString()))
                {
                    queryToBeExecuted = QueryToGetFurnitureTypeItems(eqpType, search, deviceTokenEntry, false);
                }
                else if (eqpInidcator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                {
                    queryToBeExecuted = QueryToGetEquipmentTypeItems(eqpType, search, deviceTokenEntry, false);
                }


                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + queryToBeExecuted.ToString() + ":")); }
                    }

                    var lstEquipmentTypes = objContext.Database.SqlQuery<VM_TKIT_EQPITEMS>(queryToBeExecuted.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstEquipmentTypes); }

                    string prvItemID = string.Empty;

                    if (lstEquipmentTypes.Count > 0)
                    {
                        foreach (var item in lstEquipmentTypes)
                        {
                            item.ROW_INDEX = intRowCount;

                            if (eqpInidcator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                            {
                                if (prvItemID != item.ITEM_ID)
                                {
                                    intSerialNo = 1;
                                }
                                else
                                {
                                    intSerialNo += 1;
                                }

                                item.SERIAL_NO = intSerialNo;
                            }

                            intRowCount += 1;
                            prvItemID = item.ITEM_ID;
                        }

                    }




                    return new Tuple<string, List<VM_TKIT_EQPITEMS>>(eqpInidcator, lstEquipmentTypes);
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

        public List<VM_TKIT_EQPITEMS> GetSearchItems(string itemID, string itemDescr, string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                sbSql.Append(" SELECT A.ITEM_ID, 0 AS CHK_VALUE, B.ITEM_TYPE_INDICATOR, A.ITEM_DESCR, F.ITEM_QTY, A.IMAGE, A.COMMENTS");
                sbSql.Append(" 0 AS ROW_INDEX, 0 AS SERIAL_NO ");
                sbSql.Append(" FROM TKIT_ITEM_MASTER A, TKIT_ITEM_TYPE B, TKIT_REQUESTOR_DEPT C, TKIT_ITEM_DEPT D, TKIT_DEPT E, TKIT_ITEM_INVENTORY F ");
                sbSql.Append(" WHERE B.ITEM_TYPE = A.ITEM_TYPE AND D.DEPT_ID = C.DEPT_ID AND D.DEPT_ID = E.DEPT_ID AND A.ITEM_ID = F.ITEM_ID ");
                sbSql.Append(" AND E.STATUS <> 'I' AND A.ITEM_ID= D.ITEM_ID AND C.REQUESTOR_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' AND B.ITEM_TYPE_INDICATOR = 'B' ");
                sbSql.Append(" AND ( A.ITEM_DESCR LIKE '%" + itemDescr.Replace("'", "''") + "%' OR  A.ITEM_ID LIKE '%" + itemID.Replace("'", "''") + "%') ");
                sbSql.Append(" AND A.DESTRUCTION_DATE > CONVERT(DATETIME, '" + DateTime.Now + "', 101) ");
                sbSql.Append(" AND A.ITEM_INACTIVATED = 0 AND A.ORG_GROUP_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "' ");
                sbSql.Append(" UNION ");
                sbSql.Append(" SELECT A.ITEM_ID, 0 AS CHK_VALUE, B.ITEM_TYPE_INDICATOR, A.ITEM_DESCR, F.ITEM_QTY, A.IMAGE, A.COMMENTS ");
                sbSql.Append(" FROM TKIT_ITEM_MASTER A, TKIT_ITEM_TYPE B, TKIT_ITEM_INVENTORY F ");
                sbSql.Append(" WHERE B.ITEM_TYPE = A.ITEM_TYPE AND A.ITEM_ID = F.ITEM_ID AND B.ITEM_TYPE_INDICATOR = 'F'");
                sbSql.Append(" AND ( A.ITEM_DESCR LIKE '%" + itemDescr.Replace("'", "''") + "%' OR  A.ITEM_ID LIKE '%" + itemID.Replace("'", "''") + "%') ");
                sbSql.Append(" AND A.DESTRUCTION_DATE > CONVERT(DATETIME, '" + DateTime.Now + "', 101) ");
                sbSql.Append(" AND A.ITEM_INACTIVATED = 0 AND F.ITEM_QTY > 0 AND A.ORG_GROUP_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "' ");
                sbSql.Append(" UNION ");
                sbSql.Append(" SELECT DISTINCT A.ITEM_ID, 0 AS CHK_VALUE,B.ITEM_TYPE_INDICATOR, A.ITEM_DESCR, A1.ITEM_QTY, A.IMAGE, A.COMMENTS ");
                sbSql.Append(" FROM (Select Count(ITEM_ID) As ITEM_QTY,ITEM_ID from TKIT_ITEM_INVENTORY Group by ITEM_ID) A1, ");
                sbSql.Append(" TKIT_ITEM_MASTER A, TKIT_ITEM_TYPE B, TKIT_ITEM_DEPT C, TKIT_REQUESTOR_DEPT D, TKIT_DEPT E, TKIT_ITEM_INVENTORY F ");
                sbSql.Append(" FROM TKIT_ITEM_MASTER A, TKIT_ITEM_TYPE B, TKIT_ITEM_DEPT C, TKIT_REQUESTOR_DEPT D, TKIT_DEPT E, TKIT_ITEM_INVENTORY F ");
                sbSql.Append(" WHERE B.ITEM_TYPE = A.ITEM_TYPE AND B.ITEM_TYPE_INDICATOR = 'E' AND A.ITEM_ID= C.ITEM_ID AND C.DEPT_ID = D.DEPT_ID ");
                sbSql.Append(" AND C.DEPT_ID=E.DEPT_ID AND A.ITEM_ID = F.ITEM_ID AND E.STATUS <> 'I' ");
                sbSql.Append(" AND ( A.ITEM_DESCR LIKE '%" + itemDescr.Replace("'", "''") + "%' OR  A.ITEM_ID LIKE '%" + itemID.Replace("'", "''") + "%') ");
                sbSql.Append(" AND (A.ITEM_INACTIVATED = 0)  AND A1.ITEM_ID=F.ITEM_ID ");
                sbSql.Append(" AND D.REQUESTOR_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' AND A.ORG_GROUP_ID ='" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + "' ORDER BY A.ITEM_ID ");

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var lstEquipmentTypes = objContext.Database.SqlQuery<VM_TKIT_EQPITEMS>(sbSql.ToString()).ToList();
                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstEquipmentTypes); }

                    lstEquipmentTypes.ToList().Select((x, idx) => { x.ROW_INDEX = idx; return x; });
                    return lstEquipmentTypes;
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

        public List<MT_ATPAR_PATIENT_CACHE> GetPatientList()
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var lstPatients = objContext.MT_ATPAR_PATIENT_CACHE.ToList().Where(x=>x.STATUS!="D").ToList();

                    return lstPatients;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        public List<MT_ATPAR_PATIENT_CACHE> GetPatientList(string itemID, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder sbSql = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    bool isDeptHasRows = IsDepartmentTableHasRecords();

                    sbSql.Append("SELECT PATIENT_DEPARTMENT, PATIENT_NAME, PATIENT_MRC, PATIENT_ACCNUMBER, PATIENT_BEDNUMBER, ITEM_ID ");
                    sbSql.Append("from MT_ATPAR_PATIENT_CACHE A LEFT OUTER JOIN TKIT_CART_MANAGER B ");
                    sbSql.Append("ON A.PATIENT_MRC = B.PATIENT_ID AND B.ITEM_ID = '" + itemID + "' AND B.REQUESTOR_ID = '" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID] + "' AND A.STATUS!='D' ");

                    var fields = new[] { "PATIENT_DEPARTMENT", "PATIENT_NAME", "PATIENT_MRC", "PATIENT_ACCNUMBER", "PATIENT_BEDNUMBER", "ITEM_ID" };

                    var lstEquipmentTypes = objContext.Database.DifferedExecuteQuery<MT_ATPAR_PATIENT_CACHE>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstEquipmentTypes); }

                    return lstEquipmentTypes;
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

        public List<TKIT_ITEM_MASTER> GetItemsForAutoSearch(string eqType, string eqpInidcator, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string queryToBeExecuted = string.Empty;

            try
            {
                if (eqpInidcator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.B.ToString()))
                {
                    queryToBeExecuted = QueryToGetBoxTypeItems(eqType, "", deviceTokenEntry, true);
                }
                else if (eqpInidcator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.F.ToString()))
                {
                    queryToBeExecuted = QueryToGetFurnitureTypeItems(eqType, "", deviceTokenEntry, true);
                }
                else if (eqpInidcator.Equals(AtParWebEnums.enum_TKIT_EQP_TYPE.E.ToString()))
                {
                    queryToBeExecuted = QueryToGetEquipmentTypeItems(eqType, "", deviceTokenEntry, true);
                }


                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + queryToBeExecuted + ":")); }
                    }

                    var fields = new[] { "ITEM_ID", "ITEM_DESCR" };

                    var lstMasterItems = objContext.Database.DifferedExecuteQuery<TKIT_ITEM_MASTER>(fields, queryToBeExecuted).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No of records returned: " + lstMasterItems.Count); }

                    return lstMasterItems;
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + queryToBeExecuted); }
                throw ex;
            }

        }

    }
}
