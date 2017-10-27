using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.CycleCount;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace AtPar.CycleCount.Repos
{
    public class ReviewCountsRepository : IReviewCountsRepository
    {
        #region private variables

        private ILog _log;
        private ICommonRepository _commonRepo;

        #endregion

        #region Constructor
        public ReviewCountsRepository(ILog log, ICommonRepository commonRepo)
        {
            _log = log;
            _commonRepo = commonRepo;
        }
        #endregion

        #region Methods   

        public Tuple<long, Dictionary<string, object>> UpdateReviewCountEvent(string pReviewedUser, string bUnit, string eventID, DataSet pDsReviewCountDtls, string userID, string reCntUser, string[] pDeviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            string pErrorMsg = string.Empty;
            string _strSQL = string.Empty;
            long _StatusCode = -1;
            int _intEvntItmStatus = 0;
            int _intStatusCode = 0;
            int _intTransId = 0;
            DataRow[] _drChangedReviewCounts = null;

            try
            {
                if (pDsReviewCountDtls.Tables[0].Rows.Count == 0)
                    return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.E_NORECORDFOUND, null);

                /////To check whether events are Complete / Counting / Download status///' 
                _sbSQL = null;
                _sbSQL = new StringBuilder();
                _intEvntItmStatus = GetUsersCount(reCntUser, bUnit, eventID, userID);

                if (_intEvntItmStatus > 0)
                {
                    _drChangedReviewCounts = pDsReviewCountDtls.Tables[0].Select("[" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString() + "] = '" + AtParWebEnums.YesNo_Enum.N.ToString() + "'  AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString() + "] = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "'");

                    if (_drChangedReviewCounts.Length > 0)
                    {

                        pErrorMsg = "The event is in Complete / Counting / Download status for this user, cannot be unassigned.";
                        var res = new Dictionary<string, object> { { "pErrorMsg", pErrorMsg }, { "pDsReviewCountDtls", pDsReviewCountDtls } };
                        return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.ATPAR_OK, res);
                    }

                    _drChangedReviewCounts = pDsReviewCountDtls.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Select("[" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString() + "] = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "' AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString() + "] = '" + AtParWebEnums.YesNo_Enum.N.ToString() + "'");

                    if (_drChangedReviewCounts.Length > 0)
                    {
                        pErrorMsg = "The event is in Complete / Counting / Download status for this user, cannot be assigned.";
                        var res = new Dictionary<string, object> { { "pErrorMsg", pErrorMsg }, { "pDsReviewCountDtls", pDsReviewCountDtls } };
                        return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.ATPAR_OK, res);
                    }
                }

                /////End of To check whether events are Complete / Counting / Download status///'

                /////LOGIC TO HANDLE IF SAME ITEM IS AGAIN ASIGNED TO RECOUNT///'

                _sbSQL = null;
                _sbSQL = new StringBuilder();
                if (!string.IsNullOrEmpty(reCntUser))
                {
                    _intTransId = GetCyctTransactiondId(reCntUser, bUnit, eventID, userID);

                    if (_intTransId > 0)
                    {
                        DataRow[] _drEventDtls = null;
                        DataRow[] _drEventDtls1 = null;
                        //RECOUNT FLAG = N
                        DataRow[] _drEventDtls2 = null;
                        //RECOUNT FLAG = Y
                        DataTable _dtEventDtls = new DataTable();

                        _drEventDtls = pDsReviewCountDtls.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()]
                            .Select("[" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString() + "] = '" + AtParWebEnums.YesNo_Enum.Y.ToString()
                            + "' AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString() + "] = '"
                            + AtParWebEnums.YesNo_Enum.N.ToString() + "'" + " AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString() + "] = '" + reCntUser + "'");

                        if (_drEventDtls.Length > 0)
                        {
                            DataSet _dsEventDtls = new DataSet();
                            string _strUserID = string.Empty;
                            _sbSQL = null;
                            _sbSQL = new StringBuilder();

                            _dsEventDtls = GetExistedEventsList(reCntUser, _intTransId).ToDataSet();

                            if (_dsEventDtls.Tables.Count > 0 && _dsEventDtls.Tables[0].Rows.Count > 0)
                            {
                                DataRow[] _drRecountDtls = null;
                                string _strSearch = string.Empty;

                                for (int intcnt = 0; intcnt <= _drEventDtls.Length - 1; intcnt++)
                                {
                                    _strSearch = "INV_ITEM_ID = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID.ToString()]
                                        + "' " + "AND STORAGE_AREA = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA.ToString()].ToString().substituteString()
                                        + "' " + "AND STOR_LEVEL_1 = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1.ToString()]
                                        + "' " + "AND STOR_LEVEL_2 = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2.ToString()]
                                        + "' " + "AND STOR_LEVEL_3 = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3.ToString()]
                                        + "' " + "AND STOR_LEVEL_4 = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4.ToString()]
                                        + "' " + "AND CONTAINER_ID = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID.ToString()]
                                        + "' " + "AND STAGED_DATE = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE.ToString()]
                                        + "' " + "AND SERIAL_ID = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID.ToString()]
                                        + "' " + "AND INV_LOT_ID = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID.ToString()]
                                     + "' " + "AND UNIT_OF_MEASURE = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE.ToString()] + "' ";


                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + ":Filter condition: " + _strSearch);
                                    _drRecountDtls = _dsEventDtls.Tables[0].Select(_strSearch);
                                    if (_drRecountDtls.Length > 0)
                                    {
                                        try
                                        {
                                            _intStatusCode = 1;
                                            _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECNT_CHECK.ToString()] = AtParWebEnums.YesNo_Enum.Y.ToString();
                                            _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString()] = "";
                                            _drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] =
                                                (_drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] == DBNull.Value) ? -1 :
                                                _drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT];
                                            _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY.ToString()] =
                                                (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY.ToString()] == DBNull.Value) ? 0 :
                                                 _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY.ToString()];

                                        }
                                        catch (Exception ex)
                                        {
                                            if (_log.IsFatalEnabled)
                                                _log.Fatal(methodBaseName + " :ATPAR_E_LOCALDBSELECTFAIL: " + "\n" + ex.ToString());
                                            return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, new Dictionary<string, object> { { "pErrorMsg", pErrorMsg }, { "pDsReviewCountDtls", pDsReviewCountDtls } });
                                        }

                                    }
                                    else
                                    {
                                        try
                                        {
                                            _drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] =
                                                ((_drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] == DBNull.Value) ? -1 :
                                                _drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT]);
                                            _drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY] =
                                                ((_drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY] == DBNull.Value) ? 0 :
                                                _drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY]);
                                            _dtEventDtls.ImportRow(_drEventDtls[intcnt]);
                                        }
                                        catch (Exception ex)
                                        {
                                            if (_log.IsFatalEnabled)
                                                _log.Fatal(methodBaseName + " :ATPAR_E_LOCALDBSELECTFAIL: " + "\n" + ex.ToString());
                                            return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, new Dictionary<string, object> { { "pErrorMsg", pErrorMsg }, { "pDsReviewCountDtls", pDsReviewCountDtls } });
                                        }

                                    }
                                }
                            }
                            _dsEventDtls = null;
                            if (_intStatusCode == 1)
                            {
                                _drEventDtls1 = pDsReviewCountDtls.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()]
                                    .Select("[" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString() + "] = '"
                                    + AtParWebEnums.YesNo_Enum.N.ToString() + "' AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString()
                                    + "] = '" + AtParWebEnums.YesNo_Enum.N.ToString() + "'");

                                _drEventDtls2 = pDsReviewCountDtls.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()]
                                    .Select("[" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString() + "] = '"
                                    + AtParWebEnums.YesNo_Enum.Y.ToString() + "' AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString() + "] = '"
                                    + AtParWebEnums.YesNo_Enum.Y.ToString() + "'");
                                foreach (DataRow _dr in _drEventDtls1)
                                {
                                    _dr[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] =
                                        ((_dr[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] == DBNull.Value) ? -1 :
                                        _dr[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT]);
                                    _dr[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY] =
                                        ((_dr[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY] == DBNull.Value) ? 0 :
                                        _dr[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY]);

                                    _dtEventDtls.ImportRow(_dr);
                                }
                                foreach (DataRow _dr1 in _drEventDtls2)
                                {
                                    _dr1[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] =
                                        ((_dr1[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] == DBNull.Value) ? -1 :
                                        _dr1[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT]);
                                    _dr1[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY] =
                                        ((_dr1[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY] == DBNull.Value) ? 0 :
                                        _dr1[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY]);
                                    _dtEventDtls.ImportRow(_dr1);
                                }
                                pDsReviewCountDtls.Tables.Add(_dtEventDtls.Copy());
                                return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.S_CYCT_RECOUNT_USER, new Dictionary<string, object> { { "pErrorMsg", pErrorMsg }, { "pDsReviewCountDtls", pDsReviewCountDtls } });
                            }


                        }
                    }
                }

                /////END OF LOGIC TO HANDLE IF SAME ITEM IS AGAIN ASIGNED TO RECOUNT///'
                //need to create context and transaction
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var trans = objContext.Database.BeginTransaction())
                    {


                        string _strCntUserId = string.Empty;
                        string _strCountUserId = string.Empty;
                        //sqlConnection = m_LocalDB.CreateConnection();  need to uncomment
                        //sqlConnection.Open();                          need to uncomment
                        //_trans = sqlConnection.BeginTransaction();     need to uncomment
                        for (int intCnt = 0; intCnt <= pDsReviewCountDtls.Tables[0].Rows.Count - 1; intCnt++)
                        {
                            _strCntUserId = pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.COUNT_USER_ID.ToString()].ToString();

                            //If Not String.IsNullOrEmpty(_strCntUserId) Then
                            if (pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] != DBNull.Value)
                            {
                                if ((pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT].ToString() !=
                                     pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_COUNT_QTY.ToString()].ToString() &&
                                    !string.IsNullOrEmpty(pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT].ToString())))
                                {
                                    _strCountUserId = _strCntUserId;
                                }
                                else
                                {
                                    _strCountUserId = string.Empty;
                                }
                            }
                            else
                            {
                                _strCountUserId = string.Empty;
                            }

                            //To update records only when Count qty is changed or recounts asigned.

                            if (!string.IsNullOrEmpty(_strCountUserId) || (pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString()].ToString() !=
                                pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString()].ToString()))
                            {
                                if (pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] != DBNull.Value)
                                {
                                    _strSQL = string.Empty;
                                    _sbSQL = null;
                                    _sbSQL = new StringBuilder();


                                    if (!string.IsNullOrEmpty(pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPDATE_DATE.ToString()].ToString()))
                                    {
                                        _sbSQL.Append(" UPDATE MT_CYCT_EVENT_DETAIL SET RECOUNT_FLAG = '");
                                        _sbSQL.Append(pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString()] + "', ");
                                        _sbSQL.Append(" UPDATE_USER_ID='" + _strCntUserId + "', ");
                                        if (!string.IsNullOrEmpty(_strCountUserId))
                                        {
                                            _sbSQL.Append(" COUNT_USER_ID='" + _strCountUserId + "',  ");
                                        }
                                        _sbSQL.Append(" RECOUNT_USER_ID='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString()] + "',  ");
                                        _sbSQL.Append(" COUNT_QTY='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] + "', ");
                                        _sbSQL.Append(" COUNT_QTY1='" + (pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT1] == DBNull.Value ? 0 : pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT1]) + "', ");
                                        _sbSQL.Append(" COUNT_QTY2='" + (pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT2] == DBNull.Value ? 0 : pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT2]) + "', ");
                                        _sbSQL.Append(" UPDATE_DATE ='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPDATE_DATE] + "' , ");
                                        _sbSQL.Append(" LATEST_UPDATE_DATE = '" + DateTime.Now + "' WHERE TRANSACTION_ID='"
                                            + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID.ToString()] + "' ");
                                        _sbSQL.Append(" AND ITEM_REC_NUM='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] + "'");

                                    }
                                    else
                                    {
                                        _sbSQL.Append(" UPDATE MT_CYCT_EVENT_DETAIL SET RECOUNT_FLAG ='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString()] + "', ");
                                        _sbSQL.Append(" UPDATE_USER_ID='" + _strCntUserId + "', ");
                                        if (!string.IsNullOrEmpty(_strCountUserId))
                                        {
                                            _sbSQL.Append(" COUNT_USER_ID='" + _strCountUserId + "',  ");
                                        }
                                        _sbSQL.Append(" RECOUNT_USER_ID='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString()] + "',  ");
                                        _sbSQL.Append(" COUNT_QTY='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] + "', ");
                                        _sbSQL.Append(" COUNT_QTY1='" + ((pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT1] == DBNull.Value) ? 0 :
                                            pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT1]) + "', ");
                                        _sbSQL.Append(" COUNT_QTY2='" + ((pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT2] == DBNull.Value) ? 0 :
                                            pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT2]) + "', ");
                                        _sbSQL.Append(" LATEST_UPDATE_DATE = '" + DateTime.Now + "' WHERE TRANSACTION_ID='" + pDsReviewCountDtls.Tables[0]
                                            .Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID.ToString()] + "' ");
                                        _sbSQL.Append(" AND ITEM_REC_NUM='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] + "'");

                                    }

                                }
                                else
                                {
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + ": Count Quantity Empty Else Part Called:" + pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT]);
                                    _sbSQL = null;
                                    _sbSQL = new StringBuilder();



                                    _sbSQL.Append("UPDATE MT_CYCT_EVENT_DETAIL SET RECOUNT_FLAG ='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString()] + "',");
                                    _sbSQL.Append(" RECOUNT_USER_ID='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString()] + "'");
                                    _sbSQL.Append(" WHERE TRANSACTION_ID='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID.ToString()] + "' AND ITEM_REC_NUM='");
                                    _sbSQL.Append(pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] + "'");

                                }

                                try
                                {
                                    int intRecUpdated = 0;
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + ":Updating event details with following query: " + _sbSQL.ToString());

                                    intRecUpdated = objContext.Database.ExecuteSqlCommand(_sbSQL.ToString());


                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to Update due to..." + "\n" + ex.ToString() + "\n");
                                    trans.Rollback();
                                    return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL, new Dictionary<string, object> { { "pErrorMsg", pErrorMsg }, { "pDsReviewCountDtls", pDsReviewCountDtls } });
                                }
                                finally
                                {
                                    _sbSQL.Remove(0, _sbSQL.Length);
                                    _sbSQL = null;
                                }
                            }

                            //End If

                        }
                        //Recount functionality
                        if (!string.IsNullOrEmpty(reCntUser))
                        {

                            DataRow[] _drActRcntEventDtls = null;
                            DataRow[] _drCrrntRcntEventDtls = null;
                            int _intFirstTime = 0;

                            if (_intTransId == 0)
                            {
                                _drActRcntEventDtls = pDsReviewCountDtls.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()]
                                    .Select("[" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString() + "] = '"
                                    + AtParWebEnums.YesNo_Enum.Y.ToString() + "'" + " AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString() + "] = '" + reCntUser + "'");


                                if (_drActRcntEventDtls.Length == 0)
                                {
                                    _drCrrntRcntEventDtls = pDsReviewCountDtls.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()]
                                        .Select("[" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString() + "] = '"
                                        + AtParWebEnums.YesNo_Enum.Y.ToString() + "'" + " AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString() + "] = '" + reCntUser + "'");

                                    if (_drCrrntRcntEventDtls.Length > 0)
                                    {
                                        _intFirstTime = 1;
                                        _StatusCode = ChkUserEventsAllocation(bUnit, eventID, userID, reCntUser, pDeviceTokenEntry);

                                        if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                        {
                                            if (_log.IsFatalEnabled)
                                                _log.Fatal(methodBaseName + " : Failed to execute ChkUserEventsAllocation :" + " : StatusCode is : " + _StatusCode + "\n");
                                            return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.E_SERVERERROR, new Dictionary<string, object> { { "pErrorMsg", pErrorMsg }, { "pDsReviewCountDtls", pDsReviewCountDtls } });
                                        }
                                    }

                                }
                            }

                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + " :Is first time flag :" + _intFirstTime + ": " + ":Recount user Transaction ID: " + _intTransId);

                            _StatusCode = CheckEventDtlsforUser(bUnit, eventID, userID, reCntUser, pDsReviewCountDtls, _intFirstTime, _intTransId, pDeviceTokenEntry);

                            if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " : Failed to execute CheckEventDtlsforUser :" + " : StatusCode is : " + _StatusCode + "\n");
                                return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.E_SERVERERROR, new Dictionary<string, object> { { "pErrorMsg", pErrorMsg }, { "pDsReviewCountDtls", pDsReviewCountDtls } });
                            }

                        }
                        trans.Commit();
                        var result = new Dictionary<string, object> { { "pDsReviewCountDtls", pDsReviewCountDtls }, { "pErrorMsg", pErrorMsg } };
                        return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.ATPAR_OK, result);

                    }
                }

            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " :Failed to Update Review Counts..." + "\n" + ex.ToString());
                return new Tuple<long, Dictionary<string, object>>(AtparStatusCodes.E_SERVERERROR, null);
            }

        }


        private int GetUsersCount(string reCntUser, string bUnit, string eventID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    if (!string.IsNullOrEmpty(reCntUser))
                    {

                        sbSQl.Append("SELECT COUNT([USER_ID]) FROM MT_CYCT_EVENT_HDR WHERE ");
                        sbSQl.Append("[USER_ID]='" + reCntUser + "' ");
                        sbSQl.Append("AND BUSINESS_UNIT = '" + bUnit + "' ");
                        sbSQl.Append("AND EVENT_ID = '" + eventID + "' ");
                        sbSQl.Append("AND EVENT_STATUS IN ('" + (int)AtParWebEnums.AppTransactionStatus.Downloaded + "','"
                            + (int)AtParWebEnums.AppTransactionStatus.EventCounting + "','" + (int)AtParWebEnums.AppTransactionStatus.EventCountComplete + "')");
                    }
                    else
                    {

                        sbSQl.Append("SELECT COUNT(HDR.[USER_ID]) FROM MT_CYCT_EVENT_HDR HDR, MT_CYCT_EVENT_DETAIL DTL ");
                        sbSQl.Append("WHERE DTL.RECOUNT_USER_ID = '" + userID + "' ");
                        sbSQl.Append("AND HDR.TRANSACTION_ID = DTL.TRANSACTION_ID ");
                        sbSQl.Append("AND USER_ID <> '" + userID + "' ");
                        sbSQl.Append("AND BUSINESS_UNIT = '" + bUnit + "' ");
                        sbSQl.Append("AND EVENT_ID = '" + eventID + "' ");
                        sbSQl.Append("AND EVENT_STATUS IN ('" + (int)AtParWebEnums.AppTransactionStatus.Downloaded + "','" + (int)AtParWebEnums.AppTransactionStatus.EventCounting + "','"
                            + (int)AtParWebEnums.AppTransactionStatus.EventCountComplete + "')");
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
      " :Checking Event Id Status Weather Downloaded / Counted with Following SQL: " + sbSQl.ToString() + ":"));
                        }
                    }


                    var userIDCnt = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " users count  : " + userIDCnt); }

                    return userIDCnt;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private int GetCyctTransactiondId(string reCntUser, string bUnit, string eventID, string userID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl.Append("SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR WHERE ");
                    sbSQl.Append("[USER_ID]='" + reCntUser + "' ");
                    sbSQl.Append("AND BUSINESS_UNIT = '" + bUnit + "' ");
                    sbSQl.Append("AND EVENT_ID = '" + eventID + "' ");
                    sbSQl.Append("AND (EVENT_STATUS NOT IN ('" + (int)AtParDefns.statCancel + "' , '" + (int)AtParDefns.statEventCountComplete + "' , '" + (int)AtParDefns.statSent + "' )");
                    sbSQl.Append(" OR EVENT_STATUS IS NULL)");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                            " :Checking Event exist in header table with Following SQL: " + sbSQl.ToString() + ":"));
                        }
                    }


                    var transId = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " transaction id is  : " + transId); }

                    return transId;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        private List<MT_CYCT_EVENT_DETAIL> GetExistedEventsList(string reCntUser, int _intTransId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl.Append("SELECT INV_ITEM_ID,STORAGE_AREA,STOR_LEVEL_1,STOR_LEVEL_2,");
                    sbSQl.Append("STOR_LEVEL_3,STOR_LEVEL_4,CONTAINER_ID,CONVERT(VARCHAR,STAGED_DATE,121) STAGED_DATE,");
                    sbSQl.Append("SERIAL_ID,INV_LOT_ID,UNIT_OF_MEASURE");
                    sbSQl.Append(" FROM MT_CYCT_EVENT_DETAIL WHERE");
                    sbSQl.Append(" TRANSACTION_ID = " + _intTransId);
                    sbSQl.Append(" AND RECOUNT_FLAG = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "'");
                    sbSQl.Append(" AND RECOUNT_USER_ID = '").Append(reCntUser).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                            " :Checking Event exist in header table with Following SQL: " + sbSQl.ToString() + ":"));
                        }
                    }

                    string[] columns = new[] { "INV_ITEM_ID", "STORAGE_AREA", "STOR_LEVEL_1", "STOR_LEVEL_2", "STOR_LEVEL_3", "STOR_LEVEL_4",
                        "CONTAINER_ID", "STAGED_DATE", "SERIAL_ID", "INV_LOT_ID", "UNIT_OF_MEASURE" };
                    var lstEventDtls = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_DETAIL>(columns,sbSQl.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Events count : " + lstEventDtls.Count); }

                    return lstEventDtls;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public List<MT_CYCT_EVENT_HDR> CheckIfEventHasMultipleTransactions(string pEventId, string pBunit, string pUserID, string[] pDeviceTokenEntry)//need to check return type parameter
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();

            List<MT_CYCT_EVENT_HDR> lstEventHdr = new List<MT_CYCT_EVENT_HDR>();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSQl.Append(" SELECT EVENT_ID FROM MT_CYCT_EVENT_HDR_MASTER WHERE PARENT_EVENT_ID= '").Append(pEventId).Append("' AND BUSINESS_UNIT='").Append(pBunit).Append("'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                             sbSQl.ToString() + ":"));
                        }
                    }

                    var columns = new[] { "EVENT_ID" };
                    var lstHdrMaster = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR_MASTER>(columns, sbSQl.ToString()).ToList();
                    sbSQl.Clear();
                    StringBuilder _strEvents = new StringBuilder();

                    if (lstHdrMaster.Count > 0)
                    {
                        for (int i = 0; i <= lstHdrMaster.Count - 1; i++)
                        {
                            //Append single Quote for each EventID (multiple Events may exist)
                            if (_strEvents.ToString() != string.Empty)
                            {
                                _strEvents.Append(",").Append("'").Append(lstHdrMaster[i].EVENT_ID.ToString()).Append("'");
                            }
                            else
                            {
                                _strEvents.Append("'").Append(lstHdrMaster[i].EVENT_ID.ToString()).Append("'");
                            }
                        }
                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + ":Events when split are:" + _strEvents.ToString());

                        sbSQl.Append("SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR WHERE EVENT_ID IN (").Append(_strEvents.ToString()).Append(") AND BUSINESS_UNIT='")
                            .Append(pBunit).Append("' AND EVENT_STATUS IN " + "('").Append((int)AtParWebEnums.AppTransactionStatus.Downloaded)
                            .Append("' , '").Append((int)AtParWebEnums.AppTransactionStatus.EventCounting).Append("') AND USER_ID <> '").Append(pUserID).Append("'");

                        if (_log.IsDebugEnabled)
                            _log.Debug(sbSQl);
                        var column = new[] { "TRANSACTION_ID" };
                        lstEventHdr = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR>(column, sbSQl.ToString()).ToList();

                    }
                    return lstEventHdr;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }

        }

        public long CheckIfSplitEvntIsPartEvnt(string bUnit, string eventID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                    sbSQl.Append("SELECT COUNT(TRANSACTION_ID) FROM MT_CYCT_EVENT_HDR_MASTER ");
                    sbSQl.Append("WHERE BUSINESS_UNIT = '").Append(bUnit).Append("' AND PARENT_EVENT_ID = '").Append(eventID).Append("' ");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                            " Checking if the selected event is parent event" + " with the following.... " + sbSQl.ToString() + ":"));
                        }
                    }


                    var _intCount = objContext.Database.SqlQuery<int>(sbSQl.ToString()).FirstOrDefault();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Transaction IDs Count : " + _intCount); }

                    return _intCount;
                }
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }
                throw ex;
            }
            finally
            {
                sbSQl = null;
            }
        }

        public Tuple<long, List<MT_ATPAR_USER>> GetReCountUsersList(string appID, string orgGrpID, string[] deviceTokenEntry)
        {


            SqlCommand _sqlCmd = default(SqlCommand);
            string _strSQL = string.Empty;
            long _StatusCode = -1;

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSQl = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlParms = new SqlParameter[4];

                    sqlParms[0] = new SqlParameter("@appId", SqlDbType.NVarChar);
                    sqlParms[0].Value = appID;

                    sqlParms[1] = new SqlParameter("@orgGrpId", SqlDbType.NVarChar);
                    sqlParms[1].Value = orgGrpID;

                    sqlParms[2] = new SqlParameter("@userId", SqlDbType.NVarChar);
                    sqlParms[2].Value = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID];

                    sqlParms[3] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlParms[3].Direction = ParameterDirection.Output;

                    _strSQL = "DECLARE @P1 INT " + "SET @P1 = 0 " + "\n" + "EXEC\t" + "GetClientUsersList" + "\n" + "@appId = N'" + sqlParms[0].Value + "'," + "\n" + "@orgGrpId = N'" + sqlParms[1].Value
                        + "'," + "\n" + "@userId = N'" + sqlParms[2].Value + "'," + "\n" + "@StatusCode = 0" + "\n" + "\n" + "SELECT\t@P1 ";

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                            " :executing the following.....: " + _strSQL + ":"));
                        }
                    }
                    var columns = new[] { "FIRST_NAME", "LAST_NAME", "MIDDLE_INITIAL", "USER_ID", "FULLNAME" };
                    var lstUserList = objContext.Database.DifferedExecuteQuery<MT_ATPAR_USER>(columns, "EXEC GetClientUsersList @appId,@orgGrpId,@userId,@StatusCode OUT", sqlParms).ToList();

                    _StatusCode = Convert.ToInt64(sqlParms[3].Value);
                    // _sqlCmd.Parameters.Clear();

                    if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to get data from middle tier" + " tables: StatusCode is : " + _StatusCode + " Failed to execute the" + " SQL... " + "\n" + _strSQL + "\n");
                        return new Tuple<long, List<MT_ATPAR_USER>>(_StatusCode, null);
                    }
                    return new Tuple<long, List<MT_ATPAR_USER>>(AtparStatusCodes.ATPAR_OK, lstUserList);

                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSQl.ToString()); }

                return new Tuple<long, List<MT_ATPAR_USER>>(AtparStatusCodes.E_SERVERERROR, null);
            }
            finally
            {
                _sqlCmd = null;
            }

        }

        public List<MT_CYCT_EVENT_HDR_MASTER> GetEventDetails(string bUnit, string eventID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbEvntSQL = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbEvntSQL.Append("SELECT COUNT(EVENT_ID) AS NO_OF_SUBEVENTS, PARENT_EVENT_ID FROM MT_CYCT_EVENT_HDR_MASTER WHERE ");
                    _sbEvntSQL.Append(" BUSINESS_UNIT = '").Append(bUnit).Append("' AND EVENT_ID ='").Append(eventID).Append("' GROUP BY PARENT_EVENT_ID");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                            " :Query to get the no of sub event and parent event id: " + _sbEvntSQL.ToString() + ":"));
                        }
                    }
                    var columns = new[] { "NO_OF_SUBEVENTS", "PARENT_EVENT_ID" };
                    var lstEvnts = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR_MASTER>(columns, _sbEvntSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " no of sub event and parent event id Count : " + lstEvnts.Count); }

                    return lstEvnts;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbEvntSQL.ToString()); }

                throw ex;
            }
            finally
            {
                _sbEvntSQL = null;
            }
        }

        public List<MT_CYCT_EVENT_HDR_MASTER> GetLatestUpdatesFromHdr(string bUnit, string eventID, string userID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSelSQL = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSelSQL.Append(" SELECT  UPDATE_DATE, A.FIRST_NAME+' '+ A.MIDDLE_INITIAL+' '+ A.LAST_NAME + '(' + B.USER_ID  + ') ' AS USER_ID ");
                    _sbSelSQL.Append(" FROM MT_CYCT_EVENT_HDR B, MT_ATPAR_USER A WHERE  A.USER_ID= B.USER_ID AND  ");
                    _sbSelSQL.Append(" B.BUSINESS_UNIT = '").Append(bUnit).Append("'  AND B.USER_ID='").Append(userID).Append("' AND B.PARENT_EVENT_ID='").Append(eventID).Append("' ");
                    _sbSelSQL.Append(" AND B.EVENT_STATUS IN ('").Append((int)AtParWebEnums.AppTransactionStatus.EventCounting).Append("', '")
                        .Append((int)AtParWebEnums.AppTransactionStatus.Downloaded)
                        .Append("') ORDER BY UPDATE_DATE DESC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                            " :Query to get the no of sub event and parent event id: " + _sbSelSQL.ToString() + ":"));
                        }
                    }
                    var columns = new[] { "UPDATE_DATE", "USER_ID" };
                    var lstEvnts = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR_MASTER>(columns, _sbSelSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " no of sub event and parent event id Count : " + lstEvnts.Count); }

                    return lstEvnts;

                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSelSQL.ToString()); }

                throw ex;
            }
            finally
            {
                _sbSelSQL = null;
            }
            #endregion

        }

        public List<MT_CYCT_EVENT_HDR> GetReviewCountsEventIds(string bUnit, string userID, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSelSQL = new StringBuilder();
            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _sbSelSQL.Append("SELECT DISTINCT (EVENT_ID) AS EVENT_ID,BUSINESS_UNIT, USER_ID, EVENT_TYPE FROM MT_CYCT_EVENT_HDR  Where  BUSINESS_UNIT='")
                        .Append(bUnit).Append("' AND USER_ID='").Append(userID).Append("' AND (EVENT_STATUS = '").Append((int)AtParWebEnums.AppTransactionStatus.EventCounting)
                        .Append("' Or EVENT_STATUS = '").Append((int)AtParWebEnums.AppTransactionStatus.Downloaded).Append("') ")
                        .Append("Union  SELECT DISTINCT PARENT_EVENT_ID AS EVENT_ID, BUSINESS_UNIT, USER_ID, EVENT_TYPE FROM MT_CYCT_EVENT_HDR  WHERE PARENT_EVENT_ID  <> EVENT_ID AND  BUSINESS_UNIT='")
                        .Append(bUnit).Append("'AND USER_ID='").Append(userID).Append("' AND EVENT_STATUS NOT IN ('")
                        .Append((int)AtParWebEnums.AppTransactionStatus.Cancel).Append("','").Append((int)AtParWebEnums.AppTransactionStatus.Sent).Append("','")
                        .Append((int)AtParWebEnums.AppTransactionStatus.EventCountComplete + "') ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                            " :Query to get the events from MT_CYCT_EVENT_HDR: " + _sbSelSQL.ToString() + ":"));
                        }
                    }
                    var columns = new[] { "EVENT_ID", "BUSINESS_UNIT", "USER_ID", "EVENT_TYPE" };

                    var lstEventId = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR>(columns, _sbSelSQL.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " no of events from MT_CYCT_EVENT_HDR : " + lstEventId.Count); }

                    return lstEventId;

                }
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSelSQL.ToString()); }

                throw ex;
            }
            finally
            {
                _sbSelSQL = null;
            }
        }


        private long ChkUserEventsAllocation(string bUnit, string eventID, string userID, string recntuserID, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSelSQL = new StringBuilder();
            long statusCode = -1;

            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    SqlParameter[] sqlParms = new SqlParameter[5];

                    sqlParms[0] = new SqlParameter("@bunit", SqlDbType.NVarChar);
                    sqlParms[0].Value = bUnit;

                    sqlParms[1] = new SqlParameter("@userID", SqlDbType.NVarChar);
                    sqlParms[1].Value = userID;

                    sqlParms[2] = new SqlParameter("@recntuserID", SqlDbType.NVarChar);
                    sqlParms[2].Value = recntuserID;

                    sqlParms[3] = new SqlParameter("@eventID", SqlDbType.NVarChar);
                    sqlParms[3].Value = eventID;

                    sqlParms[4] = new SqlParameter("@StatusCode", SqlDbType.Int);
                    sqlParms[4].Direction = ParameterDirection.Output;

                    _sbSelSQL.Append("DECLARE @P1 INT ").Append("SET @P1 = 0 ")
                        .Append("EXEC\t").Append("ChkUserEventsAllocation\n").Append("@bunit = N'").Append(sqlParms[0].Value).Append("',\n").Append("@userID = N'").Append(sqlParms[1].Value)
                        .Append("',").Append("\n").Append("@recntuserID = N'").Append(sqlParms[2].Value).Append("',").Append("\n").Append("@eventID = N'")
                        .Append(sqlParms[3].Value).Append("',").Append("\n").Append("@StatusCode = 0").Append("\n").Append("\n").Append("SELECT\t@P1 ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                           ":executing the following.....:" + _sbSelSQL.ToString() + ":"));
                        }
                    }
                    objContext.Database.ExecuteSqlCommand("EXEC ChkUserEventsAllocation @bunit,@userID,@recntuserID,@eventID,@StatusCode out", sqlParms);
                    statusCode = Convert.ToInt64(sqlParms[4].Value);

                    if (statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to insert the data in middle tier" + " tables: StatusCode is : " + statusCode + "\n" + " Failed to execute the" + " SQL... " + "\n" + _sbSelSQL.ToString() + "\n");
                        return AtparStatusCodes.E_SERVERERROR;
                    }


                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSelSQL.ToString()); }

                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSelSQL = null;
            }


        }
        /// <summary>
        /// Checks and inserts details in header,details and UOM 
        /// </summary>
        /// <param name="pBunit"></param>
        /// <param name="pEventId"></param>
        /// <param name="pUserID"></param>
        /// <param name="pRecntuserID"></param>
        /// <param name="pDsReviewCountDtls"></param>
        /// <param name="pFirstTime"></param>
        /// <param name="pTransId"></param>
        /// <param name="pTrans"></param>
        /// <param name="pDeviceTokenEntry"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        private long CheckEventDtlsforUser(string pBunit, string pEventId, string pUserID, string pRecntuserID, DataSet pDsReviewCountDtls, int pFirstTime, int pTransId, string[] pDeviceTokenEntry)
        {



            dynamic _sbSelectCount = default(StringBuilder);
            StringBuilder _sbHdrDtls = new StringBuilder();
            string _strSQL = string.Empty;
            long _lngTransID = -1;
            long _statusCode = -1;
            DataRow[] _drEventDtls = null;
            DataRow[] _drUnAsgnEventDtls = null;
            SqlCommand _sqlCmd = default(SqlCommand);
            SqlParameter[] sqlParms = new SqlParameter[7];
            DateTime _dtLatestDate = Convert.ToDateTime("1900-01-01 00:00:00");
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSelSQL = new StringBuilder();
            long statusCode = -1;

            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    using (var trans = objContext.Database.BeginTransaction())
                    {


                        _drEventDtls = pDsReviewCountDtls.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Select("[" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString() + "] = '"
                            + AtParWebEnums.YesNo_Enum.Y.ToString() + "'  AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString() + "] = '" + AtParWebEnums.YesNo_Enum.N.ToString()
                            + "'" + " AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString() + "] = '" + pRecntuserID + "'");

                        ///VALIDATING AND INSERTION MT_CYCT_EVENT_HDR TABLE///'

                        if (pTransId == 0 && pFirstTime == 1)
                        {
                            //GENERATING NEW TRANSACTION ID                  
                            try
                            {
                                _lngTransID = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.CycleCount, objContext);
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " :Failed to get New transaction id: " + "\n" + " Exception is:" + ex.ToString());
                                return AtparStatusCodes.E_SERVERERROR;
                            }

                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + " :New Transaction Id is: " + _lngTransID + "\n");

                            _sbHdrDtls = null;
                            _sbHdrDtls = new StringBuilder();

                            var _with1 = _sbHdrDtls;
                            _with1.Append("INSERT INTO MT_CYCT_EVENT_HDR ( ");
                            _with1.Append("BUSINESS_UNIT,");
                            _with1.Append("EVENT_ID,");
                            _with1.Append("UPDATE_DATE,");
                            _with1.Append("TRANSACTION_ID,");
                            _with1.Append("[USER_ID],");
                            _with1.Append("PARENT_EVENT_ID,");
                            _with1.Append("EVENT_TYPE )");
                            _with1.Append(" SELECT TOP 1");
                            _with1.Append("BUSINESS_UNIT,");
                            _with1.Append("EVENT_ID,");
                            _with1.Append("GETDATE(),");
                            _with1.Append(_lngTransID + ",");
                            _with1.Append("'" + pRecntuserID + "',");
                            _with1.Append("PARENT_EVENT_ID, ");
                            _with1.Append("EVENT_TYPE ");
                            _with1.Append("FROM MT_CYCT_EVENT_HDR ");
                            _with1.Append("WHERE  ");
                            _with1.Append("BUSINESS_UNIT = '" + pBunit + "'");
                            _with1.Append(" AND EVENT_ID = '" + pEventId + "'");
                            _with1.Append(" AND [USER_ID] = '" + pUserID + "'");


                            try
                            {
                                if (_log.IsInfoEnabled)
                                    _log.Info(methodBaseName + " Insert the event header details " + "with the following SQL...." + "\n"
                                        + _sbHdrDtls.ToString());
                                objContext.Database.ExecuteSqlCommand(_sbHdrDtls.ToString());
                            }

                            catch (Exception ex)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "Failed to insert into event header details table " + "\n" + " Exception is "
                                        + "\n" + ex.ToString());
                                return AtparStatusCodes.E_SERVERERROR;
                            }
                            finally
                            {
                                _sbHdrDtls = null;
                            }

                        }
                        else
                        {
                            _lngTransID = pTransId;

                        }
                        /////END OF VALIDATING AND INSERTION MT_CYCT_EVENT_HDR TABLE///'

                        /////INSERT INTO MT_CYCT_EVENT_DETAIL TABLE///'
                        if (_drEventDtls.Length > 0)
                        {
                            for (int intcnt = 0; intcnt <= _drEventDtls.Length - 1; intcnt++)
                            {
                                _sbHdrDtls = null;
                                _sbHdrDtls = new StringBuilder();


                                _sbHdrDtls.Append("INSERT INTO MT_CYCT_EVENT_DETAIL( ");
                                _sbHdrDtls.Append("TRANSACTION_ID, ");
                                _sbHdrDtls.Append("INV_ITEM_ID, ");
                                _sbHdrDtls.Append("STORAGE_AREA, ");
                                _sbHdrDtls.Append("STOR_LEVEL_1, ");
                                _sbHdrDtls.Append("STOR_LEVEL_2, ");
                                _sbHdrDtls.Append("STOR_LEVEL_3, ");
                                _sbHdrDtls.Append("STOR_LEVEL_4, ");
                                _sbHdrDtls.Append("CONTAINER_ID, ");
                                _sbHdrDtls.Append("INVENTORY_TAG_ID, ");
                                _sbHdrDtls.Append("SERIAL_ID, ");
                                _sbHdrDtls.Append("INV_LOT_ID, ");
                                _sbHdrDtls.Append("UNIT_OF_MEASURE, ");
                                _sbHdrDtls.Append("LATEST_UPDATE_DATE, ");
                                _sbHdrDtls.Append("SYS_QTY, ");

                                if (_drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append("DESCRIPTION, ");
                                }

                                _sbHdrDtls.Append("UPC_ID, ");
                                _sbHdrDtls.Append("MFG_ITEM_ID, ");
                                _sbHdrDtls.Append("VEND_ITEM_ID, ");
                                _sbHdrDtls.Append("GTIN, ");
                                _sbHdrDtls.Append("ITEM_PRICE, ");
                                _sbHdrDtls.Append("RECOUNT_FLAG, ");
                                _sbHdrDtls.Append("ITEM_REC_NUM, ");
                                _sbHdrDtls.Append("STAGED_DATE, ");
                                _sbHdrDtls.Append("CUST_ITEM_NO ");

                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MANUFACTURER.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(", MANUFACTURER ");
                                }

                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PROJECT_ID.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(",PROJECT_ID ");
                                }

                                _sbHdrDtls.Append(",RECOUNT_USER_ID ");
                                _sbHdrDtls.Append(",UOM_TYPE ");
                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(", L_S_CONTROLLED ");
                                }
                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(", CONSIGNED_FLAG ");
                                }

                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(", STD_PACK_UOM ");
                                }

                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONVERSION_RATE.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(", CONVERSION_RATE ");
                                }
                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(", LOT_CONTROLLED ");
                                }
                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(", SERIAL_CONTROLLED ");
                                }
                                _sbHdrDtls.Append(") VALUES( ");

                                _sbHdrDtls.Append(_lngTransID + ",");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID.ToString()] + "', ");

                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append("'" + AtParDefns.GetDatabaseString(_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA.ToString()].ToString()) + "', ");
                                }
                                else
                                {
                                    _sbHdrDtls.Append("'',");
                                }

                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _dtLatestDate + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY] + "', ");

                                if (_drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append("'" + AtParDefns.GetDatabaseString(_drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR].ToString()) + "', ");
                                }
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPC_ID.ToString()] + "', ");

                                if (_drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MITMID] != DBNull.Value)
                                {

                                    _sbHdrDtls.Append("'" + AtParDefns.GetDatabaseString(_drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MITMID].ToString()) + "', ");
                                }
                                else
                                {
                                    _sbHdrDtls.Append("'',");
                                }

                                if (_drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VITMID] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append("'" + AtParDefns.GetDatabaseString(_drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VITMID].ToString()) + "', ");
                                }
                                else
                                {
                                    _sbHdrDtls.Append("'',");
                                }

                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.GTIN] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PRICE] + "', ");
                                _sbHdrDtls.Append("'" + AtParWebEnums.YesNo_Enum.Y.ToString() + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE.ToString()] + "', ");
                                _sbHdrDtls.Append("'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO.ToString()] + "' ");

                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MANUFACTURER.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(", '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MANUFACTURER.ToString()] + "' ");
                                }

                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PROJECT_ID.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(", '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PROJECT_ID.ToString()] + "' ");
                                }
                                _sbHdrDtls.Append(", '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString()] + "' ");
                                _sbHdrDtls.Append(", '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UOM_TYPE.ToString()] + "' ");
                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(", '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED.ToString()] + "' ");
                                }
                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(",'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG.ToString()] + "' ");
                                }

                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(",'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM.ToString()] + "' ");
                                }

                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONVERSION_RATE.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(",'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONVERSION_RATE.ToString()] + "' ");
                                }
                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(",'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED.ToString()] + "' ");
                                }
                                if (_drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED.ToString()] != DBNull.Value)
                                {
                                    _sbHdrDtls.Append(",'" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED.ToString()] + "' ");
                                }
                                _sbHdrDtls.Append(")");



                                try
                                {
                                    if (_log.IsInfoEnabled)
                                        _log.Info(methodBaseName + " Insert the event details " + "with the following SQL...."
                                            + "\n" + _sbHdrDtls.ToString());

                                    objContext.Database.ExecuteSqlCommand(_sbHdrDtls.ToString());
                                }

                                catch (Exception ex)
                                {
                                    trans.Rollback();
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + "Failed to insert into event details table " + "\n" + " Exception is "
                                            + "\n" + ex.ToString());
                                    return AtparStatusCodes.E_SERVERERROR;
                                }
                                finally
                                {
                                    _sbHdrDtls = null;
                                }

                                /////END OF INSERT INTO MT_CYCT_EVENT_DETAIL TABLE///'

                                /////INSERT INTO MT_CYCT_ITEM_UOM TABLE///'
                                try
                                {
                                    _sbSelectCount = null;
                                    _sbSelectCount = new StringBuilder();


                                    _sbSelectCount.Append(" INSERT INTO MT_CYCT_ITEM_UOM (");
                                    _sbSelectCount.Append("ITEM_REC_NUM, ");
                                    _sbSelectCount.Append("USER_ID, ");
                                    _sbSelectCount.Append("UOM, ");
                                    _sbSelectCount.Append("CONVERSION_RATE, ");
                                    _sbSelectCount.Append("BUSINESS_UNIT, ");
                                    _sbSelectCount.Append("EVENT_ID, ");
                                    _sbSelectCount.Append("INV_ITEM_ID,");
                                    _sbSelectCount.Append("UOM_TYPE )");
                                    _sbSelectCount.Append(" SELECT ");
                                    _sbSelectCount.Append("ITEM_REC_NUM,");
                                    _sbSelectCount.Append("'" + pRecntuserID + "',");
                                    _sbSelectCount.Append("UOM,");
                                    _sbSelectCount.Append("CONVERSION_RATE,");
                                    _sbSelectCount.Append("BUSINESS_UNIT, ");
                                    _sbSelectCount.Append("EVENT_ID,");
                                    _sbSelectCount.Append("INV_ITEM_ID,");
                                    _sbSelectCount.Append("UOM_TYPE ");
                                    _sbSelectCount.Append(" FROM MT_CYCT_ITEM_UOM ");
                                    _sbSelectCount.Append(" WHERE ITEM_REC_NUM = '" + _drEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] + "'");
                                    _sbSelectCount.Append(" AND USER_ID = '" + pUserID + "'");
                                    _sbSelectCount.Append(" AND BUSINESS_UNIT = '").Append(pBunit).Append("'");
                                    if (_log.IsInfoEnabled)
                                        _log.Info(methodBaseName + " Insert the event default and Alternate uom details " + "with the following SQL...." + "\n" + _sbSelectCount.ToString());

                                    objContext.Database.ExecuteSqlCommand(_sbSelectCount.ToString());
                                }

                                catch (Exception ex)
                                {
                                    trans.Rollback();
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + "Failed to insert into event alternate uom table " + "\n" + " Exception is " + "\n" + ex.ToString());
                                    return AtparStatusCodes.E_SERVERERROR;
                                }
                                finally
                                {
                                    _sbSelectCount = null;
                                }

                                /////END OF INSERT INTO MT_CYCT_ITEM_UOM TABLE///'
                            }

                        }


                        //HANDLNG IF UN CHECK RECOUNTS
                        _drUnAsgnEventDtls = pDsReviewCountDtls.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()]
                        .Select("[" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString() + "] = '" + AtParWebEnums.YesNo_Enum.N.ToString()
                        + "'  AND [" + AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString() + "] = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "'");


                        if (_drUnAsgnEventDtls.Length > 0)
                        {
                            /////HANDLNG IF UN CHECK RECOUNTS///'
                            for (int intcnt = 0; intcnt <= _drUnAsgnEventDtls.Length - 1; intcnt++)
                            {
                                try
                                {
                                    _sbSelectCount = null;
                                    _sbSelectCount = new StringBuilder();


                                    _sbSelectCount.Append("DELETE FROM MT_CYCT_EVENT_DETAIL WHERE ");
                                    _sbSelectCount.Append("INV_ITEM_ID = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID.ToString()] + "' ");
                                    _sbSelectCount.Append("AND STORAGE_AREA = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA.ToString()].ToString().substituteString() + "' ");
                                    _sbSelectCount.Append("AND STOR_LEVEL_1 = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1.ToString()] + "' ");
                                    _sbSelectCount.Append("AND STOR_LEVEL_2 = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2.ToString()] + "' ");
                                    _sbSelectCount.Append("AND STOR_LEVEL_3 = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3.ToString()] + "' ");
                                    _sbSelectCount.Append("AND STOR_LEVEL_4 = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4.ToString()] + "' ");
                                    _sbSelectCount.Append("AND CONTAINER_ID = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID.ToString()] + "' ");
                                    _sbSelectCount.Append("AND STAGED_DATE = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE.ToString()] + "' ");
                                    _sbSelectCount.Append("AND SERIAL_ID = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID.ToString()] + "' ");
                                    _sbSelectCount.Append("AND INV_LOT_ID = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID.ToString()] + "' ");
                                    _sbSelectCount.Append("AND UNIT_OF_MEASURE = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE.ToString()] + "' ");
                                    _sbSelectCount.Append("AND RECOUNT_USER_ID = '").Append(pRecntuserID).Append("'");
                                    _sbSelectCount.Append(" AND TRANSACTION_ID = ").Append(_lngTransID);
                                    _sbSelectCount.Append(" AND RECOUNT_FLAG = '").Append(AtParWebEnums.YesNo_Enum.Y.ToString()).Append("' ");
                                    _sbSelectCount.Append("\n");
                                    _sbSelectCount.Append(" DELETE FROM MT_CYCT_ITEM_UOM WHERE ");
                                    _sbSelectCount.Append("INV_ITEM_ID = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID.ToString()] + "' ");
                                    _sbSelectCount.Append("AND ITEM_REC_NUM = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] + "' ");
                                    _sbSelectCount.Append("AND EVENT_ID = '" + pEventId + "' ");
                                    _sbSelectCount.Append("AND BUSINESS_UNIT = '" + pBunit + "' ");
                                    _sbSelectCount.Append("AND UOM = '" + _drUnAsgnEventDtls[intcnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE.ToString()] + "' ");
                                    _sbSelectCount.Append("AND USER_ID = '").Append(pRecntuserID).Append("'");

                                    if (_log.IsInfoEnabled)
                                        _log.Info(methodBaseName + "Deleting recount event details " + "with the following SQL...." + "\n" + _sbSelectCount.ToString());

                                    objContext.Database.ExecuteSqlCommand(_sbSelectCount.ToString());
                                }

                                catch (Exception ex)
                                {
                                    trans.Rollback();
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + "Failed to Deleting event details " + "\n" + " Exception is " + "\n" + ex.ToString());
                                    return AtparStatusCodes.E_SERVERERROR;
                                }
                                finally
                                {
                                    _sbSelectCount = null;
                                }
                            }
                            /////HANDLNG IF UN CHECK RECOUNTS///'

                            /////DELETE HEADER RECORD IF NO RECOUNTS EXIST///' 
                            try
                            {
                                _sbSelectCount = null;
                                _sbSelectCount = new StringBuilder();

                                _sbSelectCount.Append("IF NOT EXISTS(SELECT HDR.[USER_ID] FROM MT_CYCT_EVENT_HDR HDR,");
                                _sbSelectCount.Append(" MT_CYCT_EVENT_DETAIL DTL WHERE ");
                                _sbSelectCount.Append(" HDR.BUSINESS_UNIT = '" + pBunit + "' ");
                                _sbSelectCount.Append(" AND HDR.EVENT_ID = '" + pEventId + "' ");
                                _sbSelectCount.Append(" AND DTL.TRANSACTION_ID = ").Append(_lngTransID);
                                _sbSelectCount.Append(" AND DTL.RECOUNT_USER_ID = '" + pRecntuserID + "'");
                                _sbSelectCount.Append(" AND DTL.RECOUNT_FLAG = '").Append(AtParWebEnums.YesNo_Enum.Y.ToString()).Append("'");
                                _sbSelectCount.Append(" AND HDR.TRANSACTION_ID = DTL.TRANSACTION_ID");
                                _sbSelectCount.Append(" AND (HDR.EVENT_STATUS NOT IN (13,11,7) OR HDR.EVENT_STATUS IS NULL))");
                                _sbSelectCount.Append(" DELETE FROM MT_CYCT_EVENT_HDR");
                                _sbSelectCount.Append(" WHERE TRANSACTION_ID = ").Append(_lngTransID);
                                _sbSelectCount.Append(" AND [USER_ID] = '").Append(pRecntuserID).Append("'");

                                if (_log.IsInfoEnabled)
                                    _log.Info(methodBaseName + "Deleting Header " + "with the following SQL...." + "\n" + _sbSelectCount.ToString());

                                objContext.Database.ExecuteSqlCommand(_sbSelectCount.ToString());
                            }

                            catch (Exception ex)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "Failed to Deleting header " + "\n" + " Exception is " + "\n" + ex.ToString());
                                return AtparStatusCodes.E_SERVERERROR;
                            }
                            finally
                            {
                                _sbSelectCount = null;
                            }
                            /////END OF DELETE HEADER RECORD IF NO RECOUNTS EXIST///' 

                        }
                        trans.Commit();

                    }
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "Failed to insert into event header table " + "\n" + " Exception is " + "\n" + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbSelectCount = null;
                _sbHdrDtls = null;
            }

        }

        public Tuple<long, Dictionary<string, string>, Dictionary<string, object>> GetReviewCountEventDetails(string pbUnit, string peventId, string puserID, string pRecntuserID, string[] pDeviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int noOfSubEvents = 0;
            int noOfItems = 0;
            int countSubEvent = 0;
            int allocRecCount = 0;
            int intCount = 0;
            int totalNoOfItems = 0;
            int itemRecCount = 0;
            DataSet pDsDetails = new DataSet();
            string precCount = string.Empty; string pErrMsg = string.Empty; string pflgParentEvent = string.Empty;

            DataSet DsDetails1 = new DataSet();
            DataSet DsDetails2 = new DataSet();
            DataTable _dtDetailsData = default(DataTable);
            StringBuilder _strSQL = new StringBuilder();
            int inteventId = 0;
            int inEvntId = 0;
            int intEvntUserCnt = 0;
            int intSplitEvntCnt = 0;
            SqlCommand _sqlCmd = default(SqlCommand);
            long _strStatusCode = -1;
            DataTable dtItemsTable = new DataTable();

            int _intRecountFlag = 0;

            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    _strSQL.Append("SELECT COUNT(EVENT_ID) AS NO_OF_SUBEVENTS, SUM(NO_OF_ITEMS) AS TOTAL_NO_ITEMS ");
                    _strSQL.Append(" FROM MT_CYCT_EVENT_HDR_MASTER WHERE PARENT_EVENT_ID ='" + peventId + "' AND ");
                    _strSQL.Append(" BUSINESS_UNIT='" + pbUnit + "'");


                    try
                    {
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled)
                            {
                                objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                                ":Query to get the no of sub event and no of items: " + _strSQL.ToString() + ":"));
                            }
                        }

                        var lstDetails1 = objContext.Database.SqlQuery<VM_MT_CYCT_EVENT_HDR_MASTER>(_strSQL.ToString()).ToList();
                        DsDetails1 = lstDetails1.ToDataSet();
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " no of sub event and no of items count : " + DsDetails1.Tables[0].Rows.Count); }

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                        return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);

                    }
                    finally
                    {
                        _strSQL.Remove(0, _strSQL.Length);
                    }

                    //'

                    _strSQL.Append("SELECT COUNT(*) FROM MT_CYCT_EVENT_HDR H,MT_CYCT_EVENT_DETAIL D ");
                    _strSQL.Append(" WHERE H.TRANSACTION_ID = D.TRANSACTION_ID");
                    _strSQL.Append(" AND H.BUSINESS_UNIT = '" + pbUnit + "'");
                    _strSQL.Append(" AND (H.EVENT_ID = '" + peventId + "' OR H.PARENT_EVENT_ID = '" + peventId + "')");
                    _strSQL.Append(" AND H.[USER_ID] = '" + puserID + "'");
                    _strSQL.Append(" AND D.RECOUNT_FLAG = 'Y'");
                    _strSQL.Append(" AND H.EVENT_STATUS NOT IN ('").Append((int)AtParWebEnums.AppTransactionStatus.Cancel);
                    _strSQL.Append("','").Append((int)AtParWebEnums.AppTransactionStatus.Sent).Append("','").Append((int)AtParWebEnums.AppTransactionStatus.EventCountComplete);
                    _strSQL.Append("')");


                    try
                    {
                        if (!_log.IsDebugEnabled)
                        {
                            if (_log.IsInfoEnabled)
                            {
                                objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                                ":Query to get count for recountflag: " + _strSQL.ToString() + ":"));
                            }
                        }

                        _intRecountFlag = objContext.Database.SqlQuery<int>(_strSQL.ToString()).FirstOrDefault();
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " count for recountflag: " + _intRecountFlag); }

                        if (_intRecountFlag > 0)
                        {
                            precCount = AtParWebEnums.YesNo_Enum.Y.ToString();
                        }
                        else
                        {
                            precCount = AtParWebEnums.YesNo_Enum.N.ToString();
                        }


                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }
                        return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                    }
                    finally
                    {
                        _strSQL.Remove(0, _strSQL.Length);
                    }
                    //'


                    try
                    {

                        if ((DsDetails1.Tables[0].Rows.Count > 0))
                        {
                            noOfSubEvents = 0;

                            if ((DsDetails1.Tables[0].Rows[0]["NO_OF_SUBEVENTS"] != DBNull.Value))
                            {
                                noOfSubEvents = Convert.ToInt32(DsDetails1.Tables[0].Rows[0]["NO_OF_SUBEVENTS"].ToString());
                            }
                            else
                            {
                                noOfSubEvents = 0;
                            }

                            if ((DsDetails1.Tables[0].Rows[0]["TOTAL_NO_ITEMS"] != DBNull.Value))
                            {
                                totalNoOfItems = Convert.ToInt32(DsDetails1.Tables[0].Rows[0]["TOTAL_NO_ITEMS"].ToString());
                            }
                            else
                            {
                                totalNoOfItems = 0;
                            }




                            if (noOfSubEvents == 0)
                            {
                                _strSQL.Remove(0, _strSQL.Length);

                                _strSQL.Append("SELECT COUNT(EVENT_ID) AS NO_OF_EVENTS  FROM MT_CYCT_EVENT_HDR_MASTER WHERE  ");
                                _strSQL.Append(" EVENT_ID ='").Append(peventId).Append("' AND BUSINESS_UNIT='").Append(pbUnit).Append("'");


                                countSubEvent = 0;


                                try
                                {
                                    if (!_log.IsDebugEnabled)
                                    {
                                        if (_log.IsInfoEnabled)
                                        {
                                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                                            ":Query to get the no of event : " + _strSQL.ToString() + ":"));
                                        }
                                    }

                                    countSubEvent = objContext.Database.SqlQuery<int>(_strSQL.ToString()).FirstOrDefault();


                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                    { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }

                                    return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                }
                                finally
                                {
                                    _strSQL.Remove(0, _strSQL.Length);
                                }

                                if (countSubEvent == 0)
                                {
                                    pflgParentEvent = "visible";
                                }



                                _strSQL.Append(" SELECT COUNT(*)  FROM MT_CYCT_EVENT_HDR WHERE");
                                _strSQL.Append(" PARENT_EVENT_ID='").Append(peventId).Append("' ");
                                _strSQL.Append(" AND USER_ID='").Append(puserID).Append("' ");
                                _strSQL.Append(" AND BUSINESS_UNIT='").Append(pbUnit).Append("' ");
                                _strSQL.Append(" AND EVENT_STATUS = ").Append((int)AtParWebEnums.AppTransactionStatus.EventCountComplete);

                                DataSet dsEvntCntComp = new DataSet();

                                try
                                {
                                    if (!_log.IsDebugEnabled)
                                    {
                                        if (_log.IsInfoEnabled)
                                        {
                                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                                            ":Query to get the  event ID:  " + _strSQL.ToString() + ":"));
                                        }
                                    }

                                    inteventId = objContext.Database.SqlQuery<int>(_strSQL.ToString()).FirstOrDefault();

                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":inteventId :" + inteventId); }
                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                    { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }

                                    return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                }
                                finally
                                {
                                    _strSQL.Remove(0, _strSQL.Length);
                                }
                                if (inteventId == 0)
                                {
                                    pflgParentEvent = "visible";

                                }


                                /// CHECKING IF MULTIPLE USERS DOWNLOADED THE EVENT 


                                _strSQL.Append("SELECT COUNT(DISTINCT[USER_ID]) USERSCOUNT FROM MT_CYCT_EVENT_HDR WHERE ");
                                _strSQL.Append(" PARENT_EVENT_ID='").Append(peventId).Append("' ");
                                _strSQL.Append(" AND BUSINESS_UNIT='").Append(pbUnit).Append("' ");
                                _strSQL.Append(" AND EVENT_STATUS NOT IN ('").Append((int)AtParWebEnums.AppTransactionStatus.Cancel);
                                _strSQL.Append("','").Append((int)AtParWebEnums.AppTransactionStatus.Sent).Append("','").Append((int)AtParWebEnums.AppTransactionStatus.EventCountComplete);
                                _strSQL.Append("')");


                                try
                                {
                                    if (!_log.IsDebugEnabled)
                                    {
                                        if (_log.IsInfoEnabled)
                                        {
                                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                                            ":Query to get the  event ID:  " + _strSQL.ToString() + ":"));
                                        }
                                    }


                                    intEvntUserCnt = objContext.Database.SqlQuery<int>(_strSQL.ToString()).FirstOrDefault();
                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":inteventId :" + intEvntUserCnt); }


                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                    { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }

                                    return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                }
                                finally
                                {
                                    _strSQL.Remove(0, _strSQL.Length);
                                }

                                if (intEvntUserCnt > 1)
                                {
                                    pflgParentEvent = "hidden";
                                }

                                //' CHECKING FOR SPLIT EVENTS


                                _strSQL.Append("SELECT COUNT(*)  FROM MT_CYCT_EVENT_HDR WHERE ");
                                _strSQL.Append(" PARENT_EVENT_ID='" + peventId + "' ");
                                _strSQL.Append(" AND USER_ID='" + puserID + "' ");
                                _strSQL.Append(" AND BUSINESS_UNIT='" + pbUnit + "' ").Append(" AND EVENT_STATUS NOT IN ('");
                                _strSQL.Append((int)AtParWebEnums.AppTransactionStatus.EventCountComplete).Append("', '");
                                _strSQL.Append((int)AtParWebEnums.AppTransactionStatus.Cancel).Append("','").Append((int)AtParWebEnums.AppTransactionStatus.Sent).Append("')");



                                try
                                {
                                    if (!_log.IsDebugEnabled)
                                    {
                                        if (_log.IsInfoEnabled)
                                        {
                                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                                            ":Query to get the  event ID:  " + _strSQL.ToString() + ":"));
                                        }
                                    }


                                    intSplitEvntCnt = objContext.Database.SqlQuery<int>(_strSQL.ToString()).FirstOrDefault();
                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + ":inteventId :" + intSplitEvntCnt); }

                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                    { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _strSQL.ToString()); }

                                    return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                }
                                finally
                                {
                                    _strSQL.Remove(0, _strSQL.Length);
                                }

                                if (intSplitEvntCnt == 0)
                                {
                                    pflgParentEvent = "hidden";
                                }


                                try
                                {
                                    DataSet pDsDetails1 = new DataSet();
                                    _strStatusCode = GetReviewCountEventsDataSet(pbUnit, peventId, puserID, pRecntuserID, ref pDsDetails1);

                                    if (_strStatusCode == AtparStatusCodes.ATPAR_OK)
                                    {

                                        _dtDetailsData = new DataTable();
                                        _dtDetailsData = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Event_DetailOutput_Details_Defns, AtParWebEnums.DataSet_Type.DETAILS.ToString());
                                        PrepareReviewCountsDataset(pDsDetails1, ref _dtDetailsData);
                                        SetReviewCountsDataTableColumnNames(ref _dtDetailsData);
                                        PrepareItemsData(pDsDetails1.Tables[0], ref dtItemsTable);
                                        pDsDetails.Tables.Add(_dtDetailsData);
                                        if (pDsDetails1.Tables.Count > 1)
                                        {
                                            DataTable _dtUsersList = new DataTable();
                                            _dtUsersList.TableName = "Users";
                                            _dtUsersList = pDsDetails1.Tables[1].Copy();
                                            pDsDetails.Tables.Add(_dtUsersList);
                                        }

                                    }
                                    else
                                    {
                                        if (_log.IsFatalEnabled)
                                            _log.Fatal(methodBaseName + " Failed to Get Event details Dataset... " + _strSQL.ToString() + "\n" + "Status Code Returned is : " + _strStatusCode + "\n");
                                        return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                    }


                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL.ToString() + "\n" + "Exception is : " + ex.ToString() + "\n");
                                    return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                }
                                finally
                                {
                                    _strSQL.Remove(0, _strSQL.Length);
                                }


                            }
                            else if (noOfSubEvents > 0)
                            {
                                ///''''''''''  CHECKING FOR SUB EVENTS ''''''''''''''''''''''''''''''''

                                _strSQL.Remove(0, _strSQL.Length);

                                _strSQL.Append("SELECT DISTINCT EVENT_ID  FROM MT_CYCT_EVENT_HDR WHERE ");
                                _strSQL.Append(" PARENT_EVENT_ID='").Append(peventId).Append("' AND USER_ID='").Append(puserID);
                                _strSQL.Append("' AND ");
                                _strSQL.Append(" BUSINESS_UNIT='");
                                _strSQL.Append(pbUnit);
                                _strSQL.Append("' AND EVENT_STATUS IN ( '").Append((int)AtParWebEnums.AppTransactionStatus.EventCounting).Append("', ");
                                _strSQL.Append("'").Append((int)AtParWebEnums.AppTransactionStatus.Downloaded).Append("', '").Append((int)AtParWebEnums.AppTransactionStatus.EventCountComplete)
                                    .Append("')");


                                try
                                {
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + ":Query to get the events when sub events exists : " + _strSQL.ToString());
                                    var columns = new[] { "EVENT_ID" };
                                    DsDetails2 = objContext.Database.DifferedExecuteQuery<MT_CYCT_EVENT_HDR>(columns, _strSQL.ToString()).ToList().ToDataSet();


                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL.ToString() + "\n" + "Exception is : " + ex.ToString() + "\n");
                                    return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                }
                                finally
                                {
                                    _strSQL.Remove(0, _strSQL.Length);
                                }

                                allocRecCount = 0;
                                intCount = 0;
                                allocRecCount = Convert.ToInt32(DsDetails2.Tables[0].Rows.Count);

                                if (noOfSubEvents == allocRecCount)
                                {
                                    pflgParentEvent = "visible";
                                }
                                else if (noOfSubEvents != allocRecCount)
                                {
                                    pflgParentEvent = "hidden";
                                }


                                ///' CHECKING IF EVENT HAS BEEN COMPLETED '''''''''''''''
                                _strSQL.Append("SELECT COUNT(*)  FROM MT_CYCT_EVENT_HDR WHERE");
                                _strSQL.Append(" PARENT_EVENT_ID='" + peventId + "' ");
                                _strSQL.Append(" AND USER_ID='" + puserID + "' ");
                                _strSQL.Append(" AND BUSINESS_UNIT='" + pbUnit + "' ");
                                _strSQL.Append(" AND EVENT_STATUS = ").Append((int)AtParWebEnums.AppTransactionStatus.EventCountComplete);

                                try
                                {
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + ":Query to get the event with Count Completed Status : " + _strSQL.ToString());
                                    inEvntId = objContext.Database.SqlQuery<int>(_strSQL.ToString()).FirstOrDefault();
                                    if (_log.IsInfoEnabled)
                                        _log.Info(":inEvntId :" + inEvntId);

                                    if (inEvntId == 0)
                                    {
                                        pflgParentEvent = "visible";
                                        ///''''''''''''''''''''''''''''''''''''

                                        /// CHECKING IF MULTIPLE USERS DOWNLOADED THE EVENT 

                                        _strSQL.Append(" SELECT COUNT(DISTINCT[USER_ID]) USERSCOUNT FROM MT_CYCT_EVENT_HDR WHERE  ");
                                        _strSQL.Append(" PARENT_EVENT_ID='").Append(peventId).Append("' ");
                                        _strSQL.Append(" AND BUSINESS_UNIT='").Append(pbUnit).Append("' ");
                                        _strSQL.Append(" AND EVENT_STATUS NOT IN ('").Append((int)AtParWebEnums.AppTransactionStatus.Cancel);
                                        _strSQL.Append("','").Append((int)AtParWebEnums.AppTransactionStatus.Sent).Append("','")
                                            .Append((int)AtParWebEnums.AppTransactionStatus.EventCountComplete);
                                        _strSQL.Append("')");



                                        try
                                        {
                                            if (_log.IsDebugEnabled)
                                                _log.Debug(methodBaseName + ":Query to get the  event ID: " + _strSQL.ToString());
                                            intEvntUserCnt = objContext.Database.SqlQuery<int>(_strSQL.ToString()).FirstOrDefault();
                                            if (_log.IsInfoEnabled)
                                                _log.Info(":inteventId :" + inteventId);

                                        }
                                        catch (Exception ex)
                                        {
                                            if (_log.IsFatalEnabled)
                                                _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL.ToString() + "\n" + "Exception is : " + ex.ToString() + "\n");
                                            return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                        }
                                        finally
                                        {
                                            _strSQL.Remove(0, _strSQL.Length);
                                        }

                                        if (intEvntUserCnt > 1)
                                        {
                                            pflgParentEvent = "hidden";
                                        }

                                        int IntEventsCount = 0;
                                        int IntSplitEventsCount = 0;

                                        if (intEvntUserCnt < 1)
                                        {
                                            //select count(*) from mt_cyct_event_hdr_master where business_unit = 'US010' and Parent_event_id = 1
                                            //select count(distinct(event_id)) from mt_cyct_event_hdr where business_unit = 'US010' and Parent_event_id = 1
                                            _strSQL.Append(" SELECT COUNT(*) FROM MT_CYCT_EVENT_HDR_MASTER WHERE  ");
                                            _strSQL.Append(" PARENT_EVENT_ID='").Append(peventId).Append("' ");
                                            _strSQL.Append(" AND BUSINESS_UNIT='").Append(pbUnit).Append("' ");



                                            try
                                            {
                                                if (_log.IsDebugEnabled)
                                                    _log.Debug(methodBaseName + ":Query to get the  event ID: " + _strSQL.ToString());
                                                IntEventsCount = objContext.Database.SqlQuery<int>(_strSQL.ToString()).FirstOrDefault();
                                                if (_log.IsInfoEnabled)
                                                    _log.Info(":inteventId :" + inteventId);

                                            }
                                            catch (Exception ex)
                                            {
                                                if (_log.IsFatalEnabled)
                                                    _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL.ToString() + "\n" + "Exception is : " + ex.ToString() + "\n");
                                                return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                            }
                                            finally
                                            {
                                                _strSQL.Remove(0, _strSQL.Length);
                                            }

                                            _strSQL.Append(" SELECT COUNT(DISTINCT(EVENT_ID)) FROM MT_CYCT_EVENT_HDR WHERE  ");
                                            _strSQL.Append(" PARENT_EVENT_ID='").Append(peventId).Append("' ");
                                            _strSQL.Append(" AND BUSINESS_UNIT='").Append(pbUnit).Append("' ");
                                            _strSQL.Append(" AND EVENT_STATUS NOT IN ('").Append((int)AtParWebEnums.AppTransactionStatus.Cancel);
                                            _strSQL.Append("','");
                                            _strSQL.Append((int)AtParWebEnums.AppTransactionStatus.Sent);
                                            _strSQL.Append("')");



                                            try
                                            {
                                                if (_log.IsDebugEnabled)
                                                    _log.Debug(methodBaseName + ":Query to get the  event ID: " + _strSQL.ToString());
                                                IntSplitEventsCount = objContext.Database.SqlQuery<int>(_strSQL.ToString()).FirstOrDefault();
                                                if (_log.IsInfoEnabled)
                                                    _log.Info(":inteventId :" + inteventId);

                                            }
                                            catch (Exception ex)
                                            {
                                                if (_log.IsFatalEnabled)
                                                    _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL.ToString() + "\n" + "Exception is : " + ex.ToString() + "\n");
                                                return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                            }
                                            finally
                                            {
                                                _strSQL.Remove(0, _strSQL.Length);
                                            }


                                            if (IntEventsCount != IntSplitEventsCount)
                                            {
                                                pflgParentEvent = "hidden";
                                            }

                                        }

                                    }
                                    else if (inEvntId > 0)
                                    {
                                        pflgParentEvent = "hidden";
                                    }



                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL.ToString() + "\n" + "Exception is : " + ex.ToString() + "\n");
                                    return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                }
                                finally
                                {
                                    _strSQL.Remove(0, _strSQL.Length);
                                }



                                if (DsDetails2.Tables[0].Rows.Count > 0)
                                {
                                    DataSet pDsDetails2 = new DataSet();
                                    _dtDetailsData = new DataTable();
                                    _dtDetailsData = ApplicationDataSetDefns.CreateAtParTableDefn(ApplicationDataSetDefns.Get_Event_DetailOutput_Details_Defns, AtParWebEnums.DataSet_Type.DETAILS.ToString());

                                    for (int i = 0; i <= DsDetails2.Tables[0].Rows.Count - 1; i++)
                                    {

                                        try
                                        {
                                            pDsDetails2 = new DataSet();

                                            _strStatusCode = GetReviewCountEventsDataSet(pbUnit, DsDetails2.Tables[0].Rows[i]["EVENT_ID"].ToString(), puserID, pRecntuserID, ref pDsDetails2);
                                            if (_strStatusCode == AtparStatusCodes.ATPAR_OK)
                                            {
                                                PrepareReviewCountsDataset(pDsDetails2, ref _dtDetailsData);
                                            }
                                            else
                                            {
                                                if (_log.IsFatalEnabled)
                                                    _log.Fatal(methodBaseName + " Failed to Get Event details Dataset... " + _strSQL.ToString() + "\n" + "Status Code Returned is : " + _strStatusCode + "\n");
                                                return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                            }



                                        }
                                        catch (Exception ex)
                                        {
                                            if (_log.IsFatalEnabled)
                                                _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL.ToString() + "\n" + "Exception is : " + ex.ToString() + "\n");
                                            return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
                                        }
                                        finally
                                        {
                                            _strSQL.Remove(0, _strSQL.Length);
                                        }

                                    }
                                    SetReviewCountsDataTableColumnNames(ref _dtDetailsData);
                                    pDsDetails.Tables.Add(_dtDetailsData);
                                    if (pDsDetails2.Tables.Count > 1)
                                    {
                                        DataTable _dtUsers = new DataTable();
                                        _dtUsers.TableName = "Users";
                                        _dtUsers = pDsDetails2.Tables[1].Copy();
                                        pDsDetails.Tables.Add(_dtUsers);
                                    }
                                }



                            }

                        }



                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + ": Failed to Get Review Count Event Details : " + "\n" + ex.ToString() + "\n");
                        return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.E_SERVERERROR, null, null);


                    }


                }
                if (_log.IsInfoEnabled)
                    _log.Info(methodBaseName + ":pflgParentEvent:" + pflgParentEvent);

                Dictionary<string, string> resultVariable = new Dictionary<string, string> { { "precCount", precCount }, { "pErrMsg", pErrMsg }, { "pflgParentEvent", pflgParentEvent } };
                Dictionary<string, object> resultDataSet = new Dictionary<string, object> { { "pDsDetails", pDsDetails }, { "dtItemsTable", dtItemsTable } };

                return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_OK, resultVariable, resultDataSet);
            }
            catch (Exception ex)
            {
                return new Tuple<long, Dictionary<string, string>, Dictionary<string, object>>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null, null);
            }

        }
        public void PrepareReviewCountsDataset(DataSet pDsReviewDetails, ref DataTable PsDetailsTable)
        {


            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                for (int j = 0; j <= pDsReviewDetails.Tables[0].Rows.Count - 1; j++)
                {
                    DataRow dr = PsDetailsTable.NewRow();

                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["INV_ITEM_ID"].ToString();

                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["ITEM_REC_NUM"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MITMID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["MFG_ITEM_ID"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VITMID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["VEND_ITEM_ID"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["DESCRIPTION"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["STORAGE_AREA"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["STOR_LEVEL_1"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["STOR_LEVEL_2"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["STOR_LEVEL_3"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["STOR_LEVEL_4"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["UNIT_OF_MEASURE"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PRICE.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["ITEM_PRICE"].ToString();

                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["CONTAINER_ID"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["STAGED_DATE"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["SERIAL_ID"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["INV_LOT_ID"].ToString();

                    dr[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT] = (pDsReviewDetails.Tables[0].Rows[j]["COUNT_QTY"] == DBNull.Value) ? -1 : pDsReviewDetails.Tables[0].Rows[j]["COUNT_QTY"];
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY.ToString()] = (pDsReviewDetails.Tables[0].Rows[j]["SYS_QTY"] == DBNull.Value) ? 0 : pDsReviewDetails.Tables[0].Rows[j]["SYS_QTY"];

                    if (pDsReviewDetails.Tables[0].Rows[j]["INVENTORY_TAG_ID"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(pDsReviewDetails.Tables[0].Rows[j]["INVENTORY_TAG_ID"].ToString()))
                        {
                            dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["INVENTORY_TAG_ID"];
                        }
                        else
                        {
                            dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID.ToString()] = 0;
                        }
                    }
                    else
                    {
                        dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID.ToString()] = 0;
                    }
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPC_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["UPC_ID"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PROJECT_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["PROJECT_ID"].ToString();



                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.EVENT_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["EVENT_ID"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["TRANSACTION_ID"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.BUSINESS_UNIT.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["BUSINESS_UNIT"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORLOC.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["STORLOC"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.COUNT_USER_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["COUNT_USER_ID"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.USERNAME.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["USERNAME"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["CUST_ITEM_NO"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_MANUFACTURER_NAME.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["ITEM_MANUFACTURER_NAME"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPDATE_DATE.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["UPDATE_DATE"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["RECOUNT_FLAG"].ToString();

                    if (pDsReviewDetails.Tables[0].Rows[j]["VALUEDIFF"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(pDsReviewDetails.Tables[0].Rows[j]["VALUEDIFF"].ToString()))
                        {
                            dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VALUEDIFF.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["VALUEDIFF"];
                            dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REALVALUEDIFF.ToString()] = Math.Abs(Convert.ToDecimal(pDsReviewDetails.Tables[0].Rows[j]["VALUEDIFF"]));
                        }
                        else
                        {
                            dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VALUEDIFF.ToString()] = 0;
                            dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REALVALUEDIFF.ToString()] = -99999999800L;
                        }
                    }
                    else
                    {
                        dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VALUEDIFF.ToString()] = 0;
                        dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REALVALUEDIFF.ToString()] = -99999999800L;
                    }
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["RECOUNT_USER_ID"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["RECOUNT_FLAG"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_COUNT_QTY.ToString()] = (pDsReviewDetails.Tables[0].Rows[j]["COUNT_QTY"] == DBNull.Value) ? -1 : pDsReviewDetails.Tables[0].Rows[j]["COUNT_QTY"];
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECNT_CHECK.ToString()] = AtParWebEnums.YesNo_Enum.N.ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_NAME.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["RECOUNT_USER_NAME"].ToString();
                    dr[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT1] = (pDsReviewDetails.Tables[0].Rows[j]["COUNT_QTY1"] == DBNull.Value) ? 0 : pDsReviewDetails.Tables[0].Rows[j]["COUNT_QTY1"];
                    dr[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT2] = (pDsReviewDetails.Tables[0].Rows[j]["COUNT_QTY2"] == DBNull.Value) ? 0 : pDsReviewDetails.Tables[0].Rows[j]["COUNT_QTY2"];
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UOM_TYPE.ToString()] = (pDsReviewDetails.Tables[0].Rows[j]["UOM_TYPE"].ToString() == "") ? 0.0 : Convert.ToDouble(pDsReviewDetails.Tables[0].Rows[j]["UOM_TYPE"]);
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LATEST_SYSQTY.ToString()] = (pDsReviewDetails.Tables[0].Rows[j]["SYS_QTY"] == DBNull.Value) ? 0 : pDsReviewDetails.Tables[0].Rows[j]["SYS_QTY"];

                    if (pDsReviewDetails.Tables[0].Rows[j]["CONSIGNED_FLAG"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(pDsReviewDetails.Tables[0].Rows[j]["CONSIGNED_FLAG"].ToString()))
                        {
                            dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["CONSIGNED_FLAG"];
                        }
                    }
                    if (pDsReviewDetails.Tables[0].Rows[j]["L_S_CONTROLLED"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(pDsReviewDetails.Tables[0].Rows[j]["L_S_CONTROLLED"].ToString()))
                        {
                            dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["L_S_CONTROLLED"];
                        }
                    }
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.EVENT_TYPE.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["EVENT_TYPE"];
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["STD_PACK_UOM"].ToString();
                    dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONVERSION_RATE.ToString()] = (pDsReviewDetails.Tables[0].Rows[j]["CONVERSION_RATE"] == DBNull.Value)
                        ? 0 : pDsReviewDetails.Tables[0].Rows[j]["CONVERSION_RATE"];
                    if (pDsReviewDetails.Tables[0].Rows[j]["LOT_CONTROLLED"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(pDsReviewDetails.Tables[0].Rows[j]["LOT_CONTROLLED"].ToString()))
                        {
                            dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["LOT_CONTROLLED"];
                        }
                    }
                    if (pDsReviewDetails.Tables[0].Rows[j]["SERIAL_CONTROLLED"] != DBNull.Value)
                    {
                        if (!string.IsNullOrEmpty(pDsReviewDetails.Tables[0].Rows[j]["SERIAL_CONTROLLED"].ToString()))
                        {
                            dr[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED.ToString()] = pDsReviewDetails.Tables[0].Rows[j]["SERIAL_CONTROLLED"];
                        }
                    }
                    PsDetailsTable.Rows.Add(dr);
                }

            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY); }

                throw ex;
            }

        }
        public void SetReviewCountsDataTableColumnNames(ref DataTable PsDetailsTable)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID.ToString()].ColumnName = "INV_ITEM_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()].ColumnName = "ITEM_REC_NUM";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.MITMID.ToString()].ColumnName = "MFG_ITEM_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VITMID.ToString()].ColumnName = "VEND_ITEM_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.DESCR.ToString()].ColumnName = "DESCRIPTION";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORAGE_AREA.ToString()].ColumnName = "STORAGE_AREA";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1.ToString()].ColumnName = "STOR_LEVEL_1";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2.ToString()].ColumnName = "STOR_LEVEL_2";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3.ToString()].ColumnName = "STOR_LEVEL_3";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4.ToString()].ColumnName = "STOR_LEVEL_4";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE.ToString()].ColumnName = "UNIT_OF_MEASURE";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PRICE.ToString()].ColumnName = "ITEM_PRICE";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONTAINER_ID.ToString()].ColumnName = "CONTAINER_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STAGED_DATE.ToString()].ColumnName = "STAGED_DATE";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_ID.ToString()].ColumnName = "SERIAL_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INV_LOT_ID.ToString()].ColumnName = "INV_LOT_ID";
                PsDetailsTable.Columns[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT].ColumnName = "COUNT_QTY";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SYSQTY.ToString()].ColumnName = "SYS_QTY";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID.ToString()].ColumnName = "INVENTORY_TAG_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPC_ID.ToString()].ColumnName = "UPC_ID";
                // PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO.ToString()].ColumnName = "CUST_ITEM_NO";// Exception occures already column exists in table
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.PROJECT_ID.ToString()].ColumnName = "PROJECT_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.EVENT_ID.ToString()].ColumnName = "EVENT_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID.ToString()].ColumnName = "TRANSACTION_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.BUSINESS_UNIT.ToString()].ColumnName = "BUSINESS_UNIT";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STORLOC.ToString()].ColumnName = "STORLOC";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.COUNT_USER_ID.ToString()].ColumnName = "COUNT_USER_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.USERNAME.ToString()].ColumnName = "USERNAME";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_MANUFACTURER_NAME.ToString()].ColumnName = "ITEM_MANUFACTURER_NAME";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPDATE_DATE.ToString()].ColumnName = "UPDATE_DATE";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString()].ColumnName = "RECOUNT_FLAG";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.VALUEDIFF.ToString()].ColumnName = "VALUEDIFF";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.REALVALUEDIFF.ToString()].ColumnName = "REALVALUEDIFF";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString()].ColumnName = "RECOUNT_USER_ID";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString()].ColumnName = "ACTUAL_RECOUNT_FLAG";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ACTUAL_COUNT_QTY.ToString()].ColumnName = "ACTUAL_COUNT_QTY";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECNT_CHECK.ToString()].ColumnName = "RECNT_CHECK";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_NAME.ToString()].ColumnName = "RECOUNT_USER_NAME";
                PsDetailsTable.Columns[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT1].ColumnName = "COUNT_QTY1";
                PsDetailsTable.Columns[(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT2].ColumnName = "COUNT_QTY2";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UOM_TYPE.ToString()].ColumnName = "UOM_TYPE";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG.ToString()].ColumnName = "CONSIGNED_FLAG";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED.ToString()].ColumnName = "L_S_CONTROLLED";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LATEST_SYSQTY.ToString()].ColumnName = "LATEST_SYSQTY";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.EVENT_TYPE.ToString()].ColumnName = "EVENT_TYPE";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM.ToString()].ColumnName = "STD_PACK_UOM";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.CONVERSION_RATE.ToString()].ColumnName = "CONVERSION_RATE";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED.ToString()].ColumnName = "LOT_CONTROLLED";
                PsDetailsTable.Columns[AtParWebEnums.Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED.ToString()].ColumnName = "SERIAL_CONTROLLED";
                PsDetailsTable.AcceptChanges();

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY); }
                throw ex;
            }


        }
        public void PrepareItemsData(DataTable pDetails, ref DataTable pItemDetails)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataTable _dtItemDetails = new DataTable();
            string _strItems = string.Empty;


            try
            {
                pItemDetails.Columns.Add("ITEMS");
                DataRow dr = pItemDetails.NewRow();
                for (int j = 0; j <= pDetails.Rows.Count - 1; j++)
                {
                    if (_strItems == string.Empty)
                    {
                        _strItems = "'" + pDetails.Rows[j]["INV_ITEM_ID"].ToString() + "'";
                    }
                    else
                    {
                        _strItems = _strItems + ",'" + pDetails.Rows[j]["INV_ITEM_ID"].ToString() + "'";
                    }
                }

                dr["ITEMS"] = _strItems;
                pItemDetails.Rows.Add(dr);
                pItemDetails.TableName = "ITEMS_LIST_TABLE";

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to prepare items details Dataset" + ex.ToString());
            }

        }
        public long GetReviewCountEventsDataSet(string pBunit, string pEventID, string pUserId, string pRecntuserID, ref DataSet pDsEventsDs)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long _StatusCode = -1;

            StringBuilder _sbSelSQL = new StringBuilder();

            try
            {
                SqlParameter[] sqlParms = new SqlParameter[5];

                sqlParms[0] = new SqlParameter("@bunit", SqlDbType.NVarChar);
                sqlParms[0].Value = pBunit;

                sqlParms[1] = new SqlParameter("@userID", SqlDbType.NVarChar);
                sqlParms[1].Value = pUserId;

                sqlParms[2] = new SqlParameter("@eventID", SqlDbType.NVarChar);
                sqlParms[2].Value = pEventID;

                sqlParms[3] = new SqlParameter("@recntuserID", SqlDbType.NVarChar);
                sqlParms[3].Value = pRecntuserID;

                sqlParms[4] = new SqlParameter("@StatusCode", SqlDbType.Int);
                sqlParms[4].Direction = ParameterDirection.Output;

                using (var objContext = new ATPAR_MT_Context())
                {
                    objContext.Database.Connection.Open();
                    //need to add one column in entity EventUsers
                    var command = objContext.Database.Connection.CreateCommand();
                    command.CommandText = "GetReviewCountsEventData";
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParms);
                    var reader = command.ExecuteReader();

                    List<VM_REVIEW_COUNTS_EVENT_DATA> lstEvents =
                    ((IObjectContextAdapter)objContext).ObjectContext.Translate<VM_REVIEW_COUNTS_EVENT_DATA>
                    (reader).ToList();
                    reader.NextResult();
                    List<UsersList> lstUsers =
                        ((IObjectContextAdapter)objContext).ObjectContext.Translate<UsersList>
                (reader).ToList();

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }



                    _sbSelSQL.Append("DECLARE @P1 INT ").Append("SET @P1 = 0 ")
                        .Append("\n").Append("\n").Append("EXEC\t").Append("GetReviewCountsEventData").Append("\n").Append("@bunit = N'").Append(sqlParms[0].Value).Append("',").Append("\n")
                        .Append("@userID = N'").Append(sqlParms[1].Value).Append("',").Append("\n").Append("@eventID = N'").Append(sqlParms[2].Value)
                        .Append("',").Append("\n").Append("@recntuserID = N'").Append(sqlParms[3].Value).Append("',").Append("\n").Append("\n").Append("SELECT\t@P1 ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY +
                            " :executing the following....:" + _sbSelSQL.ToString() + ":"));
                        }
                    }



                    _StatusCode = Convert.ToInt64(sqlParms[4].Value);


                    if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to insert the data in middle tier" + " tables: StatusCode is : " + _StatusCode + "\n" + " Failed to execute the" + " SQL... " + "\n" + _sbSelSQL.ToString() + "\n");
                        return AtparStatusCodes.E_SERVERERROR;
                    }

                    DataTable dtEvents = lstEvents.ToDataTable();
                    DataTable dtUsers = lstUsers.ToDataTable();
                    pDsEventsDs.Tables.Add(dtEvents);
                    pDsEventsDs.Tables.Add(dtUsers);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + _sbSelSQL.ToString()); }

                return AtparStatusCodes.E_SERVERERROR;
            }



            return AtparStatusCodes.ATPAR_OK;

        }
        #region SendRevCntEvntsToERP

        public Tuple<long, string> SendRevCntEvntsToERP(string pLoginUser, string pReviewedUser, string pBUnit, string pEventId, DataSet pDsReviewCountDtls, string pProfileID, string pOrgGroupId, string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            string _strSQL = string.Empty;
            string _strCntUserId = string.Empty;
            List<string> lstParameters = new List<string>();

            XmlDocument _xmlDoc = new XmlDocument();
            XmlNodeList _xmlNodeList = default(XmlNodeList);
            string _strXml = null;
            long pTransactionId = -1;
            // To parser xml string
            XmlNode _xmlRoot = default(XmlNode);
            long _StatusCode = -1;
            long _erpStatusCode = -1;
            string pStrErrMessage = string.Empty;

            StringBuilder _sbERPInXml = new StringBuilder();

            try
            {
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFILEPATH.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());

                var lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                string _strErpObjName = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString()
                && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault().ToString();

                string _strErpUserId = string.Empty;
                SortedList<string, string> _userParams = default(SortedList<string, string>);
                SortedList<string, string> _orgParams = default(SortedList<string, string>);
                string _strDtldCntHst = string.Empty;

                string _strUpdateDateWeb = string.Empty;

                try
                {
                    _orgParams = new SortedList<string, string>();
                    _orgParams["STORE_DETAILED_COUNT_HISTORY"] = string.Empty;
                    _orgParams["UPDATE_COUNTDATE_WEB"] = string.Empty;

                    //Get User Parameters  
                    _userParams = new SortedList<string, string>();
                    _userParams[AtParWebEnums.Send_Cart_BusinessRules_Enum.ERP_USER_ID.ToString()] = string.Empty;
                    _commonRepo.GetUserParamValues(_userParams, (int)AtParWebEnums.EnumApps.CycleCount, pReviewedUser);
                    _strErpUserId = _userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()];

                    //Getting OrgParam Values
                    _commonRepo.GetOrgGroupParamValues(_orgParams, (int)AtParWebEnums.EnumApps.CycleCount, pOrgGroupId);

                    _strDtldCntHst = _orgParams["STORE_DETAILED_COUNT_HISTORY"];
                    _strUpdateDateWeb = _orgParams["UPDATE_COUNTDATE_WEB"];
                    if (_log.IsInfoEnabled)
                        _log.Info(methodBaseName + ":_strDtldCntHst returned is:" + _strDtldCntHst);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal("Failed to Call GetOrgGroupParamValues:" + ex.ToString());
                    return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, pStrErrMessage);
                }

                if (pDsReviewCountDtls.Tables[0].Rows.Count == 0)
                {
                    return new Tuple<long, string>(AtparStatusCodes.E_NORECORDFOUND, pStrErrMessage);
                }

                DataColumn dc = new DataColumn("COUNT_DTTM", System.Type.GetType("System.DateTime"));
                dc.DefaultValue = DateTime.Now;

                pDsReviewCountDtls.Tables[0].Columns.Add(dc);
                pDsReviewCountDtls.AcceptChanges();

                pTransactionId = Convert.ToInt64(pDsReviewCountDtls.Tables[0].Rows[0][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID.ToString()]);//need to check



                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var trans = objContext.Database.BeginTransaction())
                    {

                        if (_log.IsDebugEnabled)
                            _log.Debug(pDsReviewCountDtls.Tables[0].Rows.Count);

                        for (int intCnt = 0; intCnt <= pDsReviewCountDtls.Tables[0].Rows.Count - 1; intCnt++)
                        {
                            _strCntUserId = pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.COUNT_USER_ID.ToString()].ToString();

                            if ((pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPDATE_DATE.ToString()]) != DBNull.Value & !string.IsNullOrEmpty(pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPDATE_DATE.ToString()].ToString()))
                            {
                                pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_DTTM"] = pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPDATE_DATE.ToString()];
                            }

                            if (!string.IsNullOrEmpty(_strCntUserId))
                            {
                                if ((pDsReviewCountDtls.Tables[0].Rows[intCnt][(int)AtParWebEnums.Get_Event_DetailOutput_Details_Enum.QTY_COUNT]) != DBNull.Value)
                                {
                                    _strSQL = string.Empty;

                                    if (!string.IsNullOrEmpty(pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPDATE_DATE.ToString()].ToString()))
                                    {
                                        _strSQL = " UPDATE MT_CYCT_EVENT_DETAIL SET RECOUNT_FLAG ='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString()]
                                            + "', " + " UPDATE_USER_ID='" + _strCntUserId + "', " + " COUNT_USER_ID='" + _strCntUserId + "',  " + " COUNT_QTY='"
                                            + pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_QTY"] + "', "
                                            + " COUNT_QTY1='" + ((pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_QTY1"]) == DBNull.Value
                                            ? 0 : pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_QTY1"]) + "', " + " COUNT_QTY2='"
                                            + ((pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_QTY2"]) == DBNull.Value ?
                                            0 : pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_QTY2"]) + "', "
                                            + " UPDATE_DATE ='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.UPDATE_DATE.ToString()]
                                            + "' , " + " LATEST_UPDATE_DATE = '" + DateTime.Now + "' WHERE TRANSACTION_ID='"
                                            + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID.ToString()]
                                            + "' " + " AND ITEM_REC_NUM='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] + "'";
                                    }
                                    else
                                    {
                                        _strSQL = " UPDATE MT_CYCT_EVENT_DETAIL SET RECOUNT_FLAG ='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString()]
                                            + "', " + " UPDATE_USER_ID='" + _strCntUserId + "', " + " COUNT_USER_ID='" + _strCntUserId + "',  " + " COUNT_QTY='"
                                            + pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_QTY"]
                                            + "', " + " COUNT_QTY1='"
                                            + ((pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_QTY1"]) == DBNull.Value ? 0 :
                                            pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_QTY1"]) + "', " + " COUNT_QTY2='"
                                            + ((pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_QTY2"]) == DBNull.Value ? 0 :
                                            pDsReviewCountDtls.Tables[0].Rows[intCnt]["COUNT_QTY2"]) + "', " +
                                            " LATEST_UPDATE_DATE = '" + DateTime.Now + "' WHERE TRANSACTION_ID='" +
                                            pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID.ToString()] + "' " +
                                            " AND ITEM_REC_NUM='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] + "'";
                                    }
                                }
                                else
                                {
                                    _strSQL = "";
                                    _strSQL = " UPDATE MT_CYCT_EVENT_DETAIL SET RECOUNT_FLAG ='"
                                        + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString()] + "'" +
                                        " WHERE TRANSACTION_ID='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID.ToString()]
                                        + "' AND ITEM_REC_NUM='" + pDsReviewCountDtls.Tables[0].Rows[intCnt][AtParWebEnums.Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString()] + "'";
                                }

                                try
                                {
                                    int intRecUpdated = 0;
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + ":Query to update the MT_CYCT_EVENT_DETAIL table with recount flag data : " + _strSQL);

                                    intRecUpdated = objContext.Database.ExecuteSqlCommand(_strSQL.ToString());

                                }
                                catch (Exception ex)
                                {
                                    trans.Rollback();
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to Update due to..." + ex.ToString());
                                    return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, pStrErrMessage);

                                }
                            }
                        }


                        try
                        {
                            string _strXml1 = string.Empty;
                            pDsReviewCountDtls.Tables[0].Columns["INV_ITEM_ID"].ColumnName = "ITEM_ID";
                            pDsReviewCountDtls.Tables[0].TableName = "DETAIL";
                            pDsReviewCountDtls.Tables[0].AcceptChanges();
                            string eventsXML = pDsReviewCountDtls.GetXml();
                            using (StringReader s = new StringReader(eventsXML))
                            {
                                _xmlDoc.Load(s);
                            }
                            //_xmlDoc.LoadXml(pDsReviewCountDtls.GetXml());
                            _xmlNodeList = _xmlDoc.SelectNodes("/NewDataSet");

                            _sbERPInXml.Append("<ROOT>");
                            _sbERPInXml.Append("<HEADER>");
                            _sbERPInXml.Append("<BUSINESS_UNIT>" + pBUnit + "</BUSINESS_UNIT>");
                            _sbERPInXml.Append("<EVENT_ID>" + pEventId + "</EVENT_ID>");
                            _sbERPInXml.Append("<TRANSACTION_ID>" + pTransactionId + "</TRANSACTION_ID>");
                            _sbERPInXml.Append("<UPDATE_DT_TIME>" + DateTime.Now + "</UPDATE_DT_TIME>");
                            _sbERPInXml.Append("<ERP_USER_ID>" + _strErpUserId + "</ERP_USER_ID>");
                            _sbERPInXml.Append("<EVETYPE>" + pDsReviewCountDtls.Tables[0].Rows[0]["EVENT_TYPE"] + "</EVETYPE>");
                            _sbERPInXml.Append("</HEADER>");
                            _sbERPInXml.Append(_xmlNodeList.Item(0).InnerXml);
                            _sbERPInXml.Append("</ROOT>");

                            _strXml = _sbERPInXml.ToString().Replace("'", "''");

                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + " Input xml for ERP is " + _strXml);
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " Failed to build the input xml :" + " Exception is : " + ex.ToString());

                            return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, pStrErrMessage);

                        }
                        finally
                        {
                            pDsReviewCountDtls = null;
                            _xmlDoc = null;
                        }
                        try
                        {
                            string _erpObjName = null;

                            if (string.IsNullOrEmpty(_strErpObjName))
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal("Remote Object Failed");
                                return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, pStrErrMessage);

                            }
                            else
                            {
                                _erpObjName = AtParWebEnums.EnumApps.CycleCount.ToString() + "_" + _strErpObjName;
                            }

                            var result = SendEventERP(_erpObjName, _strXml, pDeviceTokenEntry);

                            //   var result = SendEventERP(_erpObjName, _strXml, pDeviceTokenEntry);
                            _strXml = result.Item2;
                            _erpStatusCode = result.Item1;
                            if (_erpStatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + ": Failed to send event " + " StatusCode :" + _erpStatusCode);

                                _xmlDoc = new XmlDocument();
                                _xmlDoc.LoadXml(_strXml);
                                _xmlRoot = _xmlDoc.FirstChild;

                                if ((_xmlRoot.SelectSingleNode("//OUTPUT") != null))
                                {
                                    if ((_xmlRoot.SelectSingleNode("//OUTPUT/ErrorDesc") != null))
                                    {
                                        if (!string.IsNullOrEmpty(_xmlRoot.SelectSingleNode("//OUTPUT/ErrorDesc").InnerText))
                                        {
                                            pStrErrMessage = _xmlRoot.SelectSingleNode("//OUTPUT/ErrorDesc").InnerText;
                                        }
                                    }
                                }

                                if (_erpStatusCode == AtparStatusCodes.S_EVENT_PROCESSED_INERP)
                                {
                                    return new Tuple<long, string>(AtparStatusCodes.S_EVENT_PROCESSED_INERP, pStrErrMessage);
                                }

                                return new Tuple<long, string>(_erpStatusCode, pStrErrMessage);

                            }

                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + ": Erp call Failed with Exception : " + ex.ToString());
                            return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, pStrErrMessage);
                        }
                        finally
                        {
                            _xmlDoc = null;
                        }

                        //' XML Building COmpleted

                        //' Calling SEND EVENT In ERP Interface

                        if (_erpStatusCode == AtparStatusCodes.ATPAR_OK)
                        {
                            try
                            {
                                _StatusCode = InsertDeviationReportData(_strXml.Replace("<ITEM_REC_NUM>", "<ITMREC>").Replace("</ITEM_REC_NUM>", "</ITMREC>"), pReviewedUser, pProfileID, pDeviceTokenEntry, objContext, pBUnit, pEventId );


                                if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    trans.Rollback();
                                    if (_log.IsWarnEnabled)
                                        _log.Warn(methodBaseName + " Failed to insert into Deviation table ");
                                    return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, pStrErrMessage);
                                }
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed to insert into Deviation table " + ex.ToString());
                                return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, pStrErrMessage);
                            }

                            ///To delete the processed events

                            try
                            {
                                _StatusCode = DeleteEvents(pBUnit, pEventId, pReviewedUser, _strDtldCntHst, objContext);
                                if ((_StatusCode != AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    if (_log.IsWarnEnabled)
                                        _log.Warn(methodBaseName + " Failed to delete event data " + "with status code" + _StatusCode);
                                    return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, pStrErrMessage);

                                }

                                if (_StatusCode == AtparStatusCodes.ATPAR_OK & _strErpObjName == AtParWebEnums.Enterprise_Enum.IMMS.ToString())
                                {
                                    string _strOutputEventID = string.Empty;
                                    string _filename = string.Empty;
                                    string _strOutputBUnit = string.Empty;
                                    string _strDirectoryPath = string.Empty;
                                    string[] _dirFiles = null;
                                    string _file = null;
                                    string dt = string.Empty;
                                    long _lngExLineNO = 0;
                                    XmlDocument _xmlFile = new XmlDocument();

                                    string m_strDownloadPath = lstConfigSectionDtls.Where(x => x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFILEPATH.ToString() && x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString()).Select(x => x.PARAMETER_VALUE).ToString();

                                    _strDirectoryPath = m_strDownloadPath + AtParWebEnums.EnumApps.CycleCount.ToString() + "\\";
                                    string _strProcessPath = _strDirectoryPath + "PROCESSED\\";

                                    try
                                    {
                                        _dirFiles = Directory.GetFiles(_strDirectoryPath);
                                    }
                                    catch (Exception ex)
                                    {
                                        if (_log.IsFatalEnabled)
                                            _log.Fatal(methodBaseName + " Failed to get the files from the" + " download path " + m_strDownloadPath + " Exception is : " + ex.ToString());
                                        return new Tuple<long, string>(AtparStatusCodes.E_REMOTEERROR, pStrErrMessage);
                                    }

                                    //// Iterater through all files 
                                    foreach (string _file_loopVariable in _dirFiles)
                                    {
                                        _file = _file_loopVariable;
                                        try
                                        {
                                            _filename = _file.Substring(_file.LastIndexOf("\\") + 1);
                                            _xmlFile.Load(_file);
                                        }
                                        catch (XmlException ex)
                                        {
                                            if (_log.IsFatalEnabled)
                                                _log.Fatal(methodBaseName + " Failed to load the xml file :" + " Exception is : " + ex.ToString());

                                            FileStream fs = default(FileStream);
                                            string xmlString = string.Empty;
                                            fs = File.Open(_file, FileMode.Open, FileAccess.Read, FileShare.Delete | FileShare.Read);
                                            byte[] buffer = new byte[fs.Length + 1];
                                            fs.Read(buffer, 0, Convert.ToInt32(fs.Length));


                                            //need to check indexOf
                                            xmlString = Encoding.UTF8.GetString(buffer).Substring(0, Encoding.UTF8.GetString(buffer).IndexOf("</ROOT>") + 6);

                                            fs.Close();

                                            xmlString = (xmlString).substituteString();
                                            StreamWriter writerFile = new StreamWriter(_file, false);
                                            writerFile.WriteLine(xmlString);
                                            writerFile.Close();
                                            writerFile.Dispose();

                                            try
                                            {
                                                _xmlFile.Load(_file);
                                            }
                                            catch (XmlException ex1)
                                            {
                                                _lngExLineNO = ex1.LineNumber;
                                                if (_log.IsDebugEnabled)
                                                    _log.Debug(methodBaseName + " :After Error Loading Xml String @ Line No:" + _lngExLineNO + ":Error Message:" + ex1.Message + ":");
                                                string[] lines = File.ReadAllLines(_file);

                                                _StatusCode = AtParDefns.Process_XML_SpecialChars(_lngExLineNO, _file, AtParWebEnums.EnumApps.CycleCount.ToString(), lines);

                                                if (_StatusCode == AtparStatusCodes.ATPAR_OK)
                                                {
                                                    _xmlFile.Load(_file);
                                                }
                                            }

                                        }

                                        XmlNodeList _nodeListEvents = default(XmlNodeList);

                                        _nodeListEvents = _xmlFile.FirstChild.SelectNodes("//CART");

                                        foreach (XmlNode _nodeHeader in _nodeListEvents)
                                        {
                                            _strOutputEventID = string.Empty;
                                            _strOutputBUnit = string.Empty;

                                            _strOutputEventID = _nodeHeader.Attributes["HEADER"].Attributes["CRTID"].InnerText;
                                            _strOutputBUnit = _nodeHeader.Attributes["HEADER"].Attributes["BUNIT"].InnerText;
                                            if (_strOutputBUnit == pBUnit & _strOutputEventID == pEventId)
                                            {
                                                dt = DateTime.Now.Month + "-" + DateTime.Now.Day + "-" + DateTime.Now.Year + "-" + DateTime.Now.Hour + DateTime.Now.Minute + DateTime.Now.Second + "-";
                                                if (_log.IsDebugEnabled)
                                                    _log.Debug(": _strDirectoryPath & _file : " + _strDirectoryPath + _file);
                                                if (_log.IsDebugEnabled)
                                                    _log.Debug(": _strProcessPath & dt & _file : " + _strProcessPath + dt + _file);

                                                File.Move(_strDirectoryPath + _filename, _strProcessPath + dt + _filename);
                                                break; // TODO: might not be correct. Was : Exit For
                                            }
                                        }
                                    }

                                }

                            }
                            catch (Exception ex)
                            {
                                trans.Rollback();
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed to delete event details " + ex.ToString());
                                return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, pStrErrMessage);
                            }
                        }
                        trans.Commit();
                    }
                    
                }
                return new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, pStrErrMessage);
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to Update Review Counts..." + ex.ToString());
                return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, pStrErrMessage);
            }

        }


        public Tuple<long, string> SendEventERP(string erpObjName, string strXml, string[] pDeviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            Tuple<long, string> tupleOutput = null;

            try
            {


                string className = null;
                string methodName = string.Empty;
                System.Reflection.MethodInfo MethodName = null;
                object reflectObject = null;

                className = "sendEvent";
                methodName = "sendEvent";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { strXml, pDeviceTokenEntry };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<long, string>(StatusCode, null);
                    return tupleOutput;
                }

                strXml = (string)args[0];


                tupleOutput = new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, strXml);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }
        }

        public long DeleteEvents(string pBunit, string pEventID, string pUserID, string pDtldHstFlag, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder _sbSelSQL = new StringBuilder();
            StringBuilder _sbUpdateSQL = new StringBuilder();
            StringBuilder _sbDelSQL = new StringBuilder();

            try
            {

                if (pDtldHstFlag == AtParWebEnums.YesNo_Enum.Y.ToString())
                {

                    _sbUpdateSQL.Append(" UPDATE MT_CYCT_EVENT_HDR SET EVENT_STATUS = '").Append((int)AtParWebEnums.AppTransactionStatus.Sent);
                    _sbUpdateSQL.Append("', SEND_DATE_TIME = '").Append(DateTime.Now).Append("'");
                    _sbUpdateSQL.Append(" WHERE TRANSACTION_ID IN  (SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR WHERE ");
                    _sbUpdateSQL.Append(" BUSINESS_UNIT = '").Append(pBunit).Append("' AND PARENT_EVENT_ID ='");
                    _sbUpdateSQL.Append(pEventID).Append("' ").Append(" AND EVENT_STATUS NOT IN ('");
                    _sbUpdateSQL.Append((int)AtParWebEnums.AppTransactionStatus.Sent).Append("','").Append((int)AtParWebEnums.AppTransactionStatus.Cancel).Append("')");
                    _sbUpdateSQL.Append(")");

                    try
                    {
                        if (_log.IsInfoEnabled)
                        {
                            _log.Info(methodBaseName + ":Query to update the event status to SENT " + " when detailed history flag is YES:" + _sbUpdateSQL.ToString());
                        }
                        objContext.Database.ExecuteSqlCommand(_sbUpdateSQL.ToString());

                    }
                    catch (SqlException sqlEx)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbUpdateSQL.ToString() + "\r\n" + " Exception is : " + sqlEx.ToString() + "\r\n");
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbUpdateSQL.ToString() + "\r\n" + " Exception is : " + ex.ToString() + "\r\n");
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;


                    }

                }

                int _intSplitCnt = 0;
                //--- CHECK IF EVENT IS SPLIT
                _sbSelSQL.Append(" SELECT  COUNT(*) FROM MT_CYCT_EVENT_HDR_MASTER WHERE BUSINESS_UNIT = '").Append(pBunit).Append("' ");
                _sbSelSQL.Append(" AND PARENT_EVENT_ID = '").Append(pEventID).Append("'");
                try
                {
                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + ":Query to get the splits count data: " + _sbSelSQL.ToString());
                    }
                    _intSplitCnt = objContext.Database.SqlQuery<int> (_sbSelSQL.ToString()).FirstOrDefault();

                    if (_intSplitCnt > 0)
                    {
                        _sbDelSQL.Append(" DELETE FROM MT_CYCT_EVENT_ALLOCATION WHERE BUSINESS_UNIT = '");
                        _sbDelSQL.Append(pBunit).Append("' AND EVENT_ID IN  ");
                        _sbDelSQL.Append(" (SELECT EVENT_ID FROM MT_CYCT_EVENT_HDR_MASTER WHERE BUSINESS_UNIT  ='");
                        _sbDelSQL.Append(pBunit).Append("' AND PARENT_EVENT_ID = '").Append(pEventID).Append("') ");

                    }
                    else
                    {
                        _sbDelSQL.Append("DELETE FROM MT_CYCT_EVENT_ALLOCATION WHERE BUSINESS_UNIT = '");
                        _sbDelSQL.Append(pBunit).Append("' AND EVENT_ID ='").Append(pEventID).Append("'");
                    }
                    try
                    {
                        if (_log.IsInfoEnabled)
                        {
                            _log.Info(methodBaseName + ":Query to delete the event allocation event data: " + _sbDelSQL.ToString());
                        }
                        objContext.Database.ExecuteSqlCommand(_sbDelSQL.ToString());
                    }
                    catch (SqlException sqlEx)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + sqlEx.ToString() + "\r\n");
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + ex.ToString() + "\r\n");
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + ex.ToString() + "\r\n");
                    }
                    return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
                }


                // MASTER DETAILS DELETION

                //--- DELETE FROM UOM MASTER TABLE
                _sbDelSQL = new StringBuilder();
                _sbDelSQL.Append(" DELETE FROM MT_CYCT_ITEM_UOM_MASTER WHERE TRANSACTION_ID IN ");
                _sbDelSQL.Append(" (SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR_MASTER WHERE BUSINESS_UNIT = '");
                _sbDelSQL.Append(pBunit).Append("'  AND PARENT_EVENT_ID = '").Append(pEventID).Append("')");
                try
                {
                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + ":Query to delete the item uom master   data: " + _sbDelSQL.ToString());
                    }
                    objContext.Database.ExecuteSqlCommand(_sbDelSQL.ToString());
                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n"
                            + " Exception is : " + sqlEx.ToString() + "\r\n");
                    }
                    return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + ex.ToString() + "\r\n");
                    }
                    return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                }
                //--- DELETE FROM DETAIL MASTER
                _sbDelSQL = new StringBuilder();
                _sbDelSQL.Append(" DELETE FROM MT_CYCT_EVENT_DETAIL_MASTER WHERE TRANSACTION_ID IN ");
                _sbDelSQL.Append(" (SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR_MASTER WHERE BUSINESS_UNIT = '");
                _sbDelSQL.Append(pBunit).Append("'  AND PARENT_EVENT_ID = '").Append(pEventID).Append("')");
                try
                {
                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + ":Query to delete the event MT_CYCT_EVENT_DETAIL_MASTER data: " + _sbDelSQL.ToString());
                    }
                    objContext.Database.ExecuteSqlCommand(_sbDelSQL.ToString());
                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + sqlEx.ToString() + "\r\n");
                    }
                    return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + ex.ToString() + "\r\n");
                    }
                    return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;

                }

                //--- DELETE FROM HEADER MASTER
                _sbDelSQL = new StringBuilder();
                _sbDelSQL.Append(" DELETE FROM MT_CYCT_EVENT_HDR_MASTER WHERE BUSINESS_UNIT = '");
                _sbDelSQL.Append(pBunit).Append("'  AND PARENT_EVENT_ID = '").Append(pEventID).Append("'");
                try
                {
                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(methodBaseName + ":Query to delete the event MT_CYCT_EVENT_HDR_MASTER data: " + _sbDelSQL.ToString());
                    }
                    objContext.Database.ExecuteSqlCommand(_sbDelSQL.ToString());

                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + sqlEx.ToString() + "\r\n");
                    }
                    return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + ex.ToString() + "\r\n");
                    }
                    return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;

                }


                if (pDtldHstFlag == AtParWebEnums.YesNo_Enum.N.ToString())
                {
                    //--- ITEM UOM TABLE DELETION
                    _sbDelSQL = new StringBuilder();
                    _sbDelSQL.Append(" DELETE FROM MT_CYCT_ITEM_UOM WHERE BUSINESS_UNIT = '").Append(pBunit).Append("'  AND EVENT_ID IN  ");
                    _sbDelSQL.Append(" (SELECT EVENT_ID FROM MT_CYCT_EVENT_HDR WHERE BUSINESS_UNIT = '");
                    _sbDelSQL.Append(pBunit).Append("'  AND PARENT_EVENT_ID = '").Append(pEventID).Append("' AND EVENT_STATUS <> ")
                        .Append((int)AtParWebEnums.AppTransactionStatus.Cancel).Append(")");

                    try
                    {
                        if (_log.IsInfoEnabled)
                        {
                            _log.Info(methodBaseName + ":Query to delete the event   MT_CYCT_ITEM_UOM table data: " + _sbDelSQL.ToString());
                        }
                        objContext.Database.ExecuteSqlCommand(_sbDelSQL.ToString());
                    }
                    catch (SqlException sqlEx)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : "
                                + sqlEx.ToString() + "\r\n");
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + ex.ToString() + "\r\n");
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                    //--- DETAIL TABLE DELETION
                    _sbDelSQL = new StringBuilder();
                    _sbDelSQL.Append(" DELETE FROM MT_CYCT_EVENT_DETAIL WHERE TRANSACTION_ID IN ");
                    _sbDelSQL.Append(" (SELECT TRANSACTION_ID FROM MT_CYCT_EVENT_HDR WHERE BUSINESS_UNIT = '");
                    _sbDelSQL.Append(pBunit).Append("'  AND PARENT_EVENT_ID = '").Append(pEventID).Append("' AND EVENT_STATUS <> ")
                        .Append((int)AtParWebEnums.AppTransactionStatus.Cancel).Append(")");

                    try
                    {
                        if (_log.IsInfoEnabled)
                        {
                            _log.Info(methodBaseName + ":Query to delete the event   MT_CYCT_EVENT_DETAIL table data: " + _sbDelSQL.ToString());
                        }
                        objContext.Database.ExecuteSqlCommand(_sbDelSQL.ToString());
                    }
                    catch (SqlException sqlEx)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + sqlEx.ToString() + "\r\n");
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + ex.ToString() + "\r\n");
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                    //--- HEADER TABLE DELETION
                    _sbDelSQL = new StringBuilder();
                    _sbDelSQL.Append(" DELETE FROM MT_CYCT_EVENT_HDR WHERE BUSINESS_UNIT = '");
                    _sbDelSQL.Append(pBunit).Append("'  AND PARENT_EVENT_ID = '").Append(pEventID).Append("' AND EVENT_STATUS <> ")
                        .Append((int)AtParWebEnums.AppTransactionStatus.Cancel);
                    try
                    {
                        if (_log.IsInfoEnabled)
                        {
                            _log.Info(methodBaseName + ":Query to delete the event   MT_CYCT_EVENT_HDR table data: " + _sbDelSQL.ToString());
                        }
                        objContext.Database.ExecuteSqlCommand(_sbDelSQL.ToString());

                    }
                    catch (SqlException sqlEx)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + sqlEx.ToString() + "\r\n");
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _sbDelSQL.ToString() + "\r\n" + " Exception is : " + ex.ToString() + "\r\n");
                        }
                        return AtparStatusCodes.ATPAR_E_LOCALDBDELETEFAIL;
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed with the following  Exception : " + ex.ToString() + "\r\n");
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                _sbDelSQL = null;
                _sbUpdateSQL = null;
                _sbSelSQL = null;
            }
            return AtparStatusCodes.ATPAR_OK;
        }


        private long InsertDeviationReportData(string xmlStr, string userID, string pProfileId, string[] pDeviceTokenEntry, ATPAR_MT_Context objContext, string pStrBunit = null, string pStrEventID = null )
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSql = string.Empty;
            long _statusCode = -1;
            string _strSysCountPctDeviation = "";


            try
            {
                //Get User Param values for SYS_COUNT_PCT_DEVIATION

                SortedList<string, string> profParams = new SortedList<string, string>();

                profParams[AtParWebEnums.AppParameters_Enum.SYS_COUNT_PCT_DEVIATION.ToString()] = string.Empty;


                _commonRepo.GetProfileParamValues(profParams, (int)AtParWebEnums.EnumApps.CycleCount, pProfileId);

                _strSysCountPctDeviation = profParams[AtParWebEnums.AppParameters_Enum.SYS_COUNT_PCT_DEVIATION.ToString()];

                SqlParameter[] sqlParms = new SqlParameter[4];
                sqlParms[0] = new SqlParameter("@countDevPer", SqlDbType.Int);
                sqlParms[0].Value = _strSysCountPctDeviation;

                sqlParms[1] = new SqlParameter("@bunit", SqlDbType.NVarChar);
                sqlParms[1].Value = pStrBunit;

                sqlParms[2] = new SqlParameter("@eventID", SqlDbType.NVarChar);
                sqlParms[2].Value = pStrEventID;

                sqlParms[3] = new SqlParameter("@StatusCode", SqlDbType.Int);
                sqlParms[3].Direction = ParameterDirection.Output;

                if (_log.IsDebugEnabled)
                {
                    _log.Debug(methodBaseName + ": Inserting DEVIATION and" + " EVENT SUMMARY , with" + " the following SQL.... "
                        + "\r\n" + _strSql + "\r\n");
                }

                try
                {
                    objContext.Database.ExecuteSqlCommand("EXEC SendReviewedEvent @countDevPer,@bunit,@eventID,@StatusCode OUT", sqlParms);

                }
                catch (SqlException sqlEx)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + ": Failed to execute the following" + " SQL...." + _strSql + "\r\n" + " Exception is : "
                            + sqlEx.ToString() + "\r\n");
                    }
                    return AtparStatusCodes.E_SERVERERROR;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + ": Failed to execute the following" + " SQL...." + _strSql + "\r\n" + " Exception is : "
                            + ex.ToString() + "\r\n");
                    }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                _statusCode = Convert.ToInt64(sqlParms[3].Value);

                if (_statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(methodBaseName + ": Failed to insert the data in middle tier" + " tables: StatusCode is : " + System.Convert.ToString(_statusCode) + "\r\n" + " Failed to execute the" + " SQL... " + "\r\n" + _strSql + "\r\n");
                    }
                    return AtparStatusCodes.E_SERVERERROR;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ":Failed to insert the data in middle tier" + " tables: Exception is : " + ex.ToString() + "\r\n");
                }
                return AtparStatusCodes.E_SERVERERROR;
            }


            return AtparStatusCodes.ATPAR_OK;

        }


        #endregion

        public class UsersList
        {
            public string Users { get; set; }
        }
        public class VM_MT_CYCT_EVENT_HDR_MASTER
        {
            public int NO_OF_SUBEVENTS { get; set; }
            public Nullable<double> TOTAL_NO_ITEMS { get; set; }
        }
    }
}
