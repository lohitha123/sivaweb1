using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CycleCount.Repos
{
    public class AllocateEventsRepository : IAllocateEventsRepository
    {
        #region Private Variable

        private ILog _log;

        #endregion
        public AllocateEventsRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(AllocateEventsRepository));
        }

        #region Public Methods

        public Tuple<DataSet, long> Get_SplitEvents(DataSet inputParameter, DataSet outputParameter)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<DataSet, long> tupleResult = null;
            //DataSet outputParameter = new DataSet();
            long Statuscode = -1;

            StringBuilder sbSql = new StringBuilder();
            DataRow drSplitEvent;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (inputParameter.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i <= inputParameter.Tables[0].Rows.Count - 1; i++)
                        {
                            sbSql.Clear();
                            sbSql.Append("SELECT BUSINESS_UNIT, EVENT_ID, PARENT_EVENT_ID, ");
                            sbSql.Append("NO_OF_ITEMS, [FROM]  , [TO]  ");
                            sbSql.Append("FROM MT_CYCT_EVENT_HDR_MASTER ");
                            sbSql.Append("WHERE PARENT_EVENT_ID = '" + inputParameter.Tables[0].Rows[i]["EVENT_ID"] + "'");
                            sbSql.Append(" AND BUSINESS_UNIT ='" + inputParameter.Tables[0].Rows[i]["BUSINESS_UNIT"] + "' ");


                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + " Checking if the specified event split in the " + "localdb with the following sql... " + System.Environment.NewLine + sbSql.ToString() + System.Environment.NewLine);

                            var fileds = new[] { "BUSINESS_UNIT", "EVENT_ID", "PARENT_EVENT_ID", "NO_OF_ITEMS", "FROM", "TO" };


                            var drSplitEventDetails = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR_MASTER>(fileds, sbSql.ToString()).ToList();


                            if (drSplitEventDetails != null && drSplitEventDetails.Count > 0)
                            {

                                foreach (var item in drSplitEventDetails)
                                {
                                    drSplitEvent = outputParameter.Tables[AtParWebEnums.DataSet_Type.OUTPUT+""].NewRow();

                                    drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.BUSINESS_UNIT] = item.BUSINESS_UNIT;

                                    drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.EVENT_ID] = item.EVENT_ID;

                                    drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.NO_RECORDS] = item.NO_OF_ITEMS;

                                    drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.FROM_STOR_LOC] = item.FROM;

                                    drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.TO_STOR_LOC] = item.TO;

                                    drSplitEvent[(int)AtParWebEnums.Get_Event_Header_Output_Enum.COUNT_HDR_STATUS] = inputParameter.Tables[0].Rows[i]["COUNT_HDR_STATUS"];

                                    outputParameter.Tables[AtParWebEnums.DataSet_Type.OUTPUT+""].Rows.Add(drSplitEvent);

                                }
                                outputParameter.Tables[0].Rows[i].Delete();
                            }

                        }

                    }
                }

                outputParameter.AcceptChanges();

                tupleResult = new Tuple<DataSet, long>(outputParameter, AtparStatusCodes.ATPAR_OK);
                return tupleResult;
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

        public Tuple<DataSet, long> GetEventDetails(DataSet inputParameter)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<DataSet, long> tupleResult = null;
            DataSet outputParameter = new DataSet();
            long Statuscode = -1;

            StringBuilder sbSql = new StringBuilder();
            StringBuilder sbBunitList = new StringBuilder();
            DataRow drSplitEvent;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append("SELECT BUSINESS_UNIT, EVENT_ID, NO_RECORDS, FROM_STOR_LOC, TO_STOR_LOC ");
                    sbSql.Append("FROM MT_CYCT_EVENT_ALLOCATION ");
                    sbSql.Append("WHERE EVENT_TYPE = " + (int)AtParWebEnums.EventType.Regular + " AND USER_ID ='" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.USER_ID].ToString() + "' ");

                    if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID] != null)
                    {
                        if (!string.IsNullOrEmpty(inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID].ToString()))
                        {
                            sbSql.Append("AND EVENT_ID = '" + inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Get_Event_Header_Enum.EVENT_ID] + "'");
                        }
                    }


                    for (int _intBunitsCnt = 0; _intBunitsCnt <= inputParameter.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows.Count - 1; _intBunitsCnt++)
                    {
                        //Append single Quote for each BUnit (multiple BUnits may exist)

                        if (!string.IsNullOrEmpty(sbBunitList.ToString()))
                        {
                            sbBunitList.Append(",");
                            sbBunitList.Append("'");
                            sbBunitList.Append(inputParameter.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows[_intBunitsCnt][0]);
                            sbBunitList.Append("'");
                        }
                        else
                        {
                            sbBunitList.Append("'");
                            sbBunitList.Append(inputParameter.Tables[AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()].Rows[_intBunitsCnt][0]);
                            sbBunitList.Append("'");

                        }
                    }

                    if (!string.IsNullOrEmpty(sbBunitList.ToString()))
                    {
                        sbSql.Append("AND BUSINESS_UNIT IN (" + sbBunitList.ToString() + ") ");
                    }
                    var fields = new[] { "BUSINESS_UNIT", "EVENT_ID", "NO_RECORDS", "FROM_STOR_LOC", "TO_STOR_LOC" };
                    var dsEventDetails = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_ALLOCATION>(fields, sbSql.ToString()).ToList();
                    tupleResult = new Tuple<DataSet, long>(dsEventDetails.ToDataSet(), AtparStatusCodes.ATPAR_OK);
                }

                return tupleResult;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                throw ex;

            }
            finally
            {
                sbSql=null;
            }
        }
        public Tuple<DataSet, long> GetUserEventDetails(DataSet inputParameter)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<DataSet, long> tupleResult = null;
            DataSet outputParameter = new DataSet();
            StringBuilder sbSql = new StringBuilder();
            StringBuilder sbUsersList = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    for (int i = 0; i <= inputParameter.Tables[0].Rows.Count - 1; i++)
                    {
                        sbSql.Clear();
                        sbSql.Append("SELECT BUSINESS_UNIT,EVENT_ID,CASE WHEN (MIDDLE_INITIAL IS NULL OR MIDDLE_INITIAL=' ' )  THEN (FIRST_NAME+' '+LAST_NAME+ ' (' + A.USER_ID + ')' ) ELSE(FIRST_NAME + ' ' + MIDDLE_INITIAL + ' ' + LAST_NAME + ' (' + A.USER_ID + ')')  END AS USERNAME, ");
                        sbSql.Append(" A.USER_ID AS UID FROM MT_CYCT_EVENT_ALLOCATION A,MT_ATPAR_USER B ");
                        sbSql.Append("WHERE A.EVENT_TYPE = " + (int)AtParWebEnums.EventType.Regular + " AND A.USER_ID=B.USER_ID AND A.BUSINESS_UNIT ='" + inputParameter.Tables[0].Rows[i]["BUSINESS_UNIT"] + "' ");
                        sbSql.Append(" AND A.EVENT_ID ='" + inputParameter.Tables[0].Rows[i]["EVENT_ID"] + "' ");
                        var fields = new[] { "BUSINESS_UNIT", "EVENT_ID", "USERNAME", "UID" };
                        //var dsUserEventDetails = null;
                        var dsUserEventDetails = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_ALLOCATION>(fields, sbSql.ToString()).ToList();

                        if ((dsUserEventDetails != null))
                        {
                            sbUsersList.Remove(0, sbUsersList.Length);


                            if (dsUserEventDetails.Count > 0)
                            {

                                foreach (var item in dsUserEventDetails)
                                {
                                    sbUsersList.Append(item.USERNAME);
                                    sbUsersList.Append(",");
                                }
                                DataRow[] dr = inputParameter.Tables[0].Select("EVENT_ID='" + inputParameter.Tables[0].Rows[i]["EVENT_ID"].ToString() + "' AND BUSINESS_UNIT='" + inputParameter.Tables[0].Rows[i]["BUSINESS_UNIT"].ToString() + "'");
                                if ((dr.Length > 0))
                                {
                                    dr[0]["USER_ID"] = sbUsersList.ToString().Substring(0, sbUsersList.Length - 1);
                                    dr[0].AcceptChanges();
                                    inputParameter.Tables[0].AcceptChanges();
                                }
                            }

                        }
                      
                        tupleResult = new Tuple<DataSet, long>(inputParameter, AtparStatusCodes.ATPAR_OK);

                    }
                }

                return tupleResult;
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

        #region AllocateEvents
        public Tuple<string, long> AllocateEvents(List<VM_CYCT_EVENT_HEADER_OUTPUT> inputParam)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<string, long> tupleOutput = null;

            long statusCode = -1;
            string errorMsg = string.Empty;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        if (inputParam.Count > 0)
                        {

                            foreach (var item in inputParam)
                            {
                                if (item.ALLOCATION_STATUS == false)
                                {
                                    int count = GetCountEventHdr(item, objContext);
                                    if (count > 0)
                                    {
                                        errorMsg = "Events in Complete /Counting /Download status cannot be unallocated";
                                        tupleOutput = new Tuple<string, long>(errorMsg, AtparStatusCodes.S_CYCT_EVENTS_CNCT_UNALLOCATE);
                                        return tupleOutput;
                                    }
                                }
                            }
                            foreach (var item in inputParam)
                            {
                                if (item.ALLOCATION_STATUS == false)
                                {
                                    int transID = GetTransactionID(item,objContext);
                                    //if (!string.IsNullOrEmpty(transID) && transID != "")
                                    //{
                                        statusCode = DeleteTransID(transID,objContext);
                                    if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        tupleOutput = new Tuple<string, long>(null, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                                        return tupleOutput;
                                    }
                                    //}
                                }
                            }
                            foreach (var item in inputParam)
                            {
                                if (item.ALLOCATION_STATUS == true)
                                {
                                    int count = GetCountEventAllocation(item,objContext);
                                    if (count == 0)
                                    {
                                        statusCode = InsertEventAllocation(item,objContext);
                                        if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                        {
                                            trans.Rollback();
                                            tupleOutput = new Tuple<string, long>(null, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                                            return tupleOutput;
                                        }

                                    }
                                }
                                else
                                {
                                    statusCode = DeleteEventAllocation(item,objContext);
                                    if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                    {
                                        trans.Rollback();
                                        tupleOutput = new Tuple<string, long>(null, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                                        return tupleOutput;
                                    }
                                }
                            }

                        }

                        trans.Commit();
                        tupleOutput = new Tuple<string, long>(errorMsg, AtparStatusCodes.ATPAR_OK);
                        return tupleOutput;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                tupleOutput = new Tuple<string, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;
            }
        }
        private int GetCountEventHdr(VM_CYCT_EVENT_HEADER_OUTPUT inputParameter, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT COUNT(*) FROM MT_CYCT_EVENT_HDR WHERE BUSINESS_UNIT = '" + inputParameter.BUSINESS_UNIT + "' ");
                sbSql.Append("AND EVENT_ID = '" + inputParameter.EVENT_ID + "' AND USER_ID='" + inputParameter.USER_ID + "' ");
                sbSql.Append("AND EVENT_STATUS IN ('" +(int)AtParWebEnums.AppTransactionStatus.Downloaded + "','" + (int)AtParWebEnums.AppTransactionStatus.EventCounting + "','" + (int)AtParWebEnums.AppTransactionStatus.EventCountComplete + "')");

                var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                return count;

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
        private int GetTransactionID(VM_CYCT_EVENT_HEADER_OUTPUT inputParameter, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR WHERE BUSINESS_UNIT = '" + inputParameter.BUSINESS_UNIT + "' ");
                sbSql.Append("AND EVENT_ID = '" + inputParameter.EVENT_ID + "' AND USER_ID='" + inputParameter.USER_ID + "' ");
                sbSql.Append(" AND EVENT_STATUS IN ('" + (int)AtParWebEnums.AppTransactionStatus.Cancel + "')");

                var transID = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                return transID;
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
        private long DeleteTransID(int transactionID, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_CYCT_EVENT_HDR WHERE TRANSACTION_ID = '" + transactionID + "'");

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;

            }
            finally
            {
                sbSql = null;
            }
        }

        private int GetCountEventAllocation(VM_CYCT_EVENT_HEADER_OUTPUT inputParameter, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {

                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("SELECT COUNT(*) FROM MT_CYCT_EVENT_ALLOCATION WHERE BUSINESS_UNIT = '" + inputParameter.BUSINESS_UNIT + "' ");
                sbSql.Append("AND EVENT_ID = '" + inputParameter.EVENT_ID + "' AND USER_ID='" + inputParameter.USER_ID + "'");

                var count = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();
                return count;

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
        private long InsertEventAllocation(VM_CYCT_EVENT_HEADER_OUTPUT inputParameter, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append(" INSERT INTO MT_CYCT_EVENT_ALLOCATION (BUSINESS_UNIT, EVENT_ID, USER_ID,FROM_STOR_LOC,TO_STOR_LOC,NO_RECORDS,UPDATE_DATE)");
                sbSql.Append(" VALUES ('" + inputParameter.BUSINESS_UNIT + "',");
                sbSql.Append("'" + inputParameter.EVENT_ID + "',");
                sbSql.Append("'" + inputParameter.USER_ID + "',");
                sbSql.Append("'" + inputParameter.FROM_STOR_LOC + "',");
                sbSql.Append("'" + inputParameter.TO_STOR_LOC + "',");
                sbSql.Append("" + inputParameter.NO_RECORDS + ",'" + DateTime.Now + "')");

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;

            }
            finally
            {
                sbSql = null;
            }
        }

        private long DeleteEventAllocation(VM_CYCT_EVENT_HEADER_OUTPUT inputParameter, ATPAR_MT_Context objContext)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("DELETE FROM MT_CYCT_EVENT_ALLOCATION WHERE BUSINESS_UNIT = '" + inputParameter.BUSINESS_UNIT + "' ");
                sbSql.Append("AND EVENT_ID = '" + inputParameter.EVENT_ID + "' AND USER_ID='" + inputParameter.USER_ID + "'");

                var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;

            }
            finally
            {
                sbSql = null;
            }
        }

        #endregion

    }
}
