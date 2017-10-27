using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.CartCount;
using AtPar.Repository.Interfaces.Common;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.CartCount.Repos
{
    public class ItemUsageReportRepository : IItemUsageReportRepository
    {
        #region private variables

        private ILog _log;
        private ICommonRepository _commonRepo;

        #endregion

        #region Constructor
        public ItemUsageReportRepository(ILog log, ICommonRepository commonRepo)
        {
            _log = log;
            _commonRepo = commonRepo;
        }
        #endregion

        #region methods

        #region GetItemUsageDetails

        private Tuple<DataSet, long> GetItemUsageOptRep(string itemID, DateTime fDate, DateTime tDate, string bUnit, string deptID, string cartID, string intCntFreq, string userID, string comp, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long returnValue = 0;
            long _StatusCode = 0;

            StringBuilder _strSQL = new StringBuilder();
            DataSet _dsDev = new DataSet();
            DateTime? _startDate;
            DateTime? _endDate;
            string dtTemtoDate = "";
            int i = 0;
            double avgTotalUsage = 0;
            double avgUsagePerday = 0;
            double dblOrderQty = 0;
            dtTemtoDate = tDate.ToString();
            int factorOfSafety = 0; //holds FACTOR_OF_SAFETY Parameter Value
            long dateDiff = 0;
            DataSet dsDeviation = new DataSet();

            try
            {
                using (var objContext = new ATPAR_MT_Context())
                {
                    //Step 1
                    // Date and time is required to calculate Min,Max and Avg Usage. Because of this from each select
                    // select statment we need to get the time along with Date
                    _strSQL.Append(" SELECT UPDATE_DATE FROM MT_ATPAR_DEVIATION " + " WHERE KEY_6='" + itemID + "' " + " AND (UPDATE_DATE <= CONVERT(DATETIME, '" + Convert.ToString(fDate) + "', 101))");

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        _strSQL.Append(" AND BUSINESS_UNIT = '" + bUnit + "' ");
                    }

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        _strSQL.Append(" AND KEY_4 = '" + cartID + "' ");
                    }
                    _strSQL.Append(" ORDER BY UPDATE_DATE DESC");

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(_strSQL);
                    }

                    try
                    {
                        _startDate = objContext.Database.SqlQuery<DateTime>(_strSQL.ToString()).FirstOrDefault();
                        if (_startDate.ToString() == "1/1/0001 12:00:00 AM")
                        {
                            _startDate = null;
                        }
                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug(methodBaseName + " start date is : " + _startDate.ToString());
                        }
                    }
                    catch (Exception ex)
                    {
                        returnValue = Convert.ToInt64(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL.ToString() + "\r\n" + "Exception is : " + ex.ToString() + "\r\n");
                        }
                        return new Tuple<DataSet, long>(dsDeviation, returnValue);
                    }

                    //Step 2
                    _strSQL = null;
                    _strSQL = new StringBuilder();

                    _strSQL.Append(" SELECT UPDATE_DATE FROM MT_ATPAR_DEVIATION " + " WHERE KEY_6='" + itemID + "' " + " AND (UPDATE_DATE >= CONVERT(DATETIME, '" + Convert.ToString(tDate) + "', 101))");

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        _strSQL.Append(" AND BUSINESS_UNIT = '" + bUnit + "' ");
                    }

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        _strSQL.Append(" AND KEY_4 = '" + cartID + "' ");
                    }

                    _strSQL.Append(" ORDER BY UPDATE_DATE ASC");

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(_strSQL);
                    }
                    try
                    {

                        _endDate = objContext.Database.SqlQuery<DateTime>(_strSQL.ToString()).FirstOrDefault();
                        if(_endDate.ToString()== "1/1/0001 12:00:00 AM")
                        {
                            _endDate =null;
                        }
                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug(methodBaseName + " end date is : " + _endDate);
                        }
                    }
                    catch (Exception ex)
                    {
                        returnValue = Convert.ToInt64(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL.ToString() + "\r\n" + "Exception is : " + ex.ToString() + "\r\n");
                        }
                        return new Tuple<DataSet, long>(dsDeviation, returnValue);
                    }

                    //Step 3
                    _strSQL = null;
                    _strSQL = new StringBuilder();
                    _strSQL.Append(" SELECT REPORT_DATA_15 AS CUST_ITEM_ID, UPDATE_DATE,BUSINESS_UNIT ,REPORT_DATA_1 AS PAR_QTY, REPORT_DATA_2 AS COUNT_QTY, REPORT_DATA_12 AS USAGE, ");
                    _strSQL.Append("REPORT_DATA_3 AS PRICE, KEY_4 AS CART_ID, KEY_5 AS COMPARTMENT, KEY_6 AS ITEM_ID, ");
                    _strSQL.Append("REPORT_DATA_6 AS UOM, REPORT_DATA_13 AS DESCR FROM MT_ATPAR_DEVIATION  WHERE KEY_6='" + itemID + "' ");
                    _strSQL.Append(" AND KEY_5='" + comp + "' ");

                    if (!string.IsNullOrEmpty(bUnit))
                    {
                        _strSQL.Append(" AND BUSINESS_UNIT = '" + bUnit + "' ");
                    }

                    if (!string.IsNullOrEmpty(cartID))
                    {
                        _strSQL.Append(" AND KEY_4 LIKE '" + cartID + "%' ");
                    }

                    if (_startDate != null)
                    {
                        if (!string.IsNullOrEmpty(_startDate.ToString()))
                        {
                            _strSQL.Append(" AND (UPDATE_DATE > = CONVERT(DATETIME, '" + _startDate + "', 101))");
                        }
                    }
                    else
                    {
                        _strSQL.Append(" AND (UPDATE_DATE > = CONVERT(DATETIME, '" + Convert.ToString(fDate) + "', 101))");
                    }

                    if (_endDate != null)
                    {
                        if (!string.IsNullOrEmpty(_endDate.ToString()))
                        {
                            _strSQL.Append(" AND (UPDATE_DATE <= CONVERT(DATETIME, '" + _endDate + "', 101))");
                        }

                        
                    }
                    else
                    {
                        _strSQL.Append(" AND (UPDATE_DATE <= CONVERT(DATETIME, '" + Convert.ToString(tDate) + "', 101))");
                    }
                    //VD-IT0001282
                    //As per the design document the data retrival should be in ascending order
                    _strSQL.Append(" ORDER BY ITEM_ID, COMPARTMENT, UPDATE_DATE DESC");

                    if (_log.IsInfoEnabled)
                    {
                        _log.Info(_strSQL);
                    }

                    try
                    {


                        var devList = objContext.Database.SqlQuery<VM_ATPAR_DEVIATION>(_strSQL.ToString()).ToList();

                        _dsDev = devList.ToDataSet();

                    }
                    catch (Exception ex)
                    {
                        returnValue = Convert.ToInt64(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL.ToString() + "\r\n" + "Exception is : " + ex.ToString() + "\r\n");
                        }
                        return new Tuple<DataSet, long>(dsDeviation, returnValue);
                    }

                    if (_dsDev.Tables[0].Rows.Count == 0)
                    {
                        return new Tuple<DataSet, long>(dsDeviation, AtparStatusCodes.E_NORECORDFOUND);
                    }

                    //Step 4

                    //Min and Max Usage
                    double minUsagePerDay = 0;
                    minUsagePerDay = 0;
                    double maxUsagePerDay = 0;
                    maxUsagePerDay = 0;
                    double tempUsage = 0;
                    double recommendedPar = 0;
                    DataSet dsTemp = new DataSet();
                    dsTemp = _dsDev.Copy();
                    DateTime prevUpdate = default(DateTime);
                    DateTime updateDate = default(DateTime);
                    DateTime nextUpdate = default(DateTime);
                    int iCnt = 0;
                    double usageQty = 0;
                    bool flag;
                    int tmpcnt = 0;
                    flag = false;
                    //Calculation for Min and Max qty
                    //If the items are counted on the same day more than once on a day
                    string strPrvComp = string.Empty;
                    string strPrvItemID = string.Empty;
                    if (_dsDev.Tables[0].Rows.Count > 1)
                    {

                        if (string.IsNullOrEmpty(_startDate.ToString()))
                        {
                            tmpcnt = Convert.ToInt32(_dsDev.Tables[0].Rows.Count - 1);
                        }
                        else
                        {
                            tmpcnt = Convert.ToInt32(_dsDev.Tables[0].Rows.Count - 2);
                        }
                        if (tmpcnt >= 0)
                        {
                            for (i = 0; i <= tmpcnt; i++)
                            {
                                try
                                {
                                   
                                  //  dateDiff = (updateDate.Date-nextUpdate.Date ).Days;// Convert.ToInt32(nextUpdate.Date - updateDate.Date);
                                    dateDiff = DateDiff(DateInterval.Day, nextUpdate.Date, updateDate.Date)+1;

                                    if (i != 0 && dateDiff == 0)
                                    {
                                        if ((_dsDev.Tables[0].Rows[i - 1]["USAGE"]) != DBNull.Value)
                                        {
                                            if (!string.IsNullOrEmpty(Convert.ToString(_dsDev.Tables[0].Rows[i - 1]["USAGE"]).Trim()))
                                            {
                                                usageQty = usageQty + Convert.ToInt32(_dsDev.Tables[0].Rows[i - 1]["USAGE"]);
                                            }
                                        }

                                        dsTemp.Tables[0].Rows[i - 1].Delete();
                                        if (flag == true)
                                        {
                                            dsTemp.Tables[0].Rows[iCnt - 1]["USAGE"] = Convert.ToInt32(usageQty);
                                        }
                                    }
                                    else
                                    {
                                        iCnt = i;
                                        if (i != 0)
                                        {
                                            if ((_dsDev.Tables[0].Rows[i - 1]["USAGE"]) != DBNull.Value)
                                            {
                                                if (!string.IsNullOrEmpty(Convert.ToString(_dsDev.Tables[0].Rows[i - 1]["USAGE"]).Trim()))
                                                {
                                                    usageQty = Convert.ToDouble(_dsDev.Tables[0].Rows[i - 1]["USAGE"]);
                                                }
                                            }
                                            flag = true;
                                        }
                                    }

                                    if ((i + 1) <= tmpcnt)
                                    {
                                        nextUpdate = Convert.ToDateTime(_dsDev.Tables[0].Rows[i + 1]["UPDATE_DATE"]);
                                    }
                                    else
                                    {
                                        nextUpdate = Convert.ToDateTime(_dsDev.Tables[0].Rows[i]["UPDATE_DATE"]);
                                    }

                                    updateDate = Convert.ToDateTime(_dsDev.Tables[0].Rows[i]["UPDATE_DATE"]);

                                }
                                catch (Exception ex)
                                {
                                    if (_log.IsFatalEnabled)
                                    {
                                        _log.Fatal("Local Call failed " + ex.ToString());
                                    }
                                    returnValue = Convert.ToInt64(AtparStatusCodes.E_SERVERERROR);
                                    return new Tuple<DataSet, long>(dsDeviation, returnValue);
                                }
                            }
                        }
                    }
                    dsTemp.AcceptChanges();

                    //BugID#1535 -  Rajini - 12/07/06
                    if (string.IsNullOrEmpty(_endDate.ToString()))
                    {
                        tDate = Convert.ToDateTime(dsTemp.Tables[0].Rows[0]["UPDATE_DATE"]);
                    }

                    //for min and max calculation, for loop is incremented till rowcount - 2
                    //as we are considering nextUpdate as lastrecord when i = rowcount - 2
                    for (i = 0; i <= dsTemp.Tables[0].Rows.Count - 2; i++)
                    {


                        if ((dsTemp.Tables[0].Rows[i]["USAGE"]) != DBNull.Value)
                        {
                            if (!string.IsNullOrEmpty(Convert.ToString(dsTemp.Tables[0].Rows[i]["USAGE"]).Trim()))
                            {
                                tempUsage = Convert.ToDouble(dsTemp.Tables[0].Rows[i]["USAGE"]);
                            }
                        }

                        nextUpdate = Convert.ToDateTime(dsTemp.Tables[0].Rows[i + 1]["UPDATE_DATE"]);
                        updateDate = Convert.ToDateTime(dsTemp.Tables[0].Rows[i]["UPDATE_DATE"]);

                        dateDiff = (updateDate.Date-nextUpdate.Date).Days;
                       // dateDiff = DateDiff(DateInterval.Day, nextUpdate.Date, updateDate.Date)+1;

                        if (dateDiff != 0)
                        {
                            tempUsage = tempUsage / dateDiff;

                            if (minUsagePerDay == 0 || minUsagePerDay > tempUsage)
                            {
                                minUsagePerDay = tempUsage ; //need to check
                            }
                            if (maxUsagePerDay == 0 || maxUsagePerDay < tempUsage)
                            {
                                maxUsagePerDay = tempUsage ; //need to check
                            }
                        }
                    }

                    _dsDev = dsTemp.Copy();
                    //   _dsDev.WriteXml("C:\atpar\_dsDev.xml")
                    //Avg Logic

                    if (string.IsNullOrEmpty(_startDate.ToString()) && string.IsNullOrEmpty(_endDate.ToString()))
                    {
                        for (i = 0; i <= _dsDev.Tables[0].Rows.Count - 1; i++)
                        {

                            if ((_dsDev.Tables[0].Rows[i]["USAGE"]) != DBNull.Value)
                            {
                                if (!string.IsNullOrEmpty(Convert.ToString(_dsDev.Tables[0].Rows[i]["USAGE"]).Trim()))
                                {
                                    avgTotalUsage = avgTotalUsage + Convert.ToDouble(_dsDev.Tables[0].Rows[i]["USAGE"]);
                                }
                            }

                        }

                       // dateDiff = (tDate.Date-fDate.Date ).Days;
                        dateDiff = DateDiff(DateInterval.Day, fDate.Date, tDate.Date)+1 ;

                        avgUsagePerday = avgTotalUsage / dateDiff;

                    }
                    else
                    {
                        int totalRowcount = 0;
                        totalRowcount = Convert.ToInt32(_dsDev.Tables[0].Rows.Count - 1);
                        double firstUsage = 0;
                        long dateDifference = 0;
                        double usagePerDayFirst = 0;
                        double totalUsageUptoFromdate = 0;
                        double usagePerDayLast = 0;
                        double lastUsage = 0;
                        double totalUsageUptoTodate = 0;
                        //If totalRowcount > 0 Then


                        updateDate = Convert.ToDateTime(_dsDev.Tables[0].Rows[totalRowcount]["UPDATE_DATE"]);
                        if (DateTime.Compare(updateDate.Date, fDate.Date) < 0 & totalRowcount > 0)
                        {

                            if ((_dsDev.Tables[0].Rows[totalRowcount - 1]["USAGE"]) == DBNull.Value)
                            {
                                if (!string.IsNullOrEmpty(Convert.ToString(_dsDev.Tables[0].Rows[totalRowcount - 1]["USAGE"]).Trim()))
                                {
                                    firstUsage = Convert.ToDouble(_dsDev.Tables[0].Rows[totalRowcount - 1]["USAGE"]);
                                }
                            }
                            prevUpdate = Convert.ToDateTime(_dsDev.Tables[0].Rows[totalRowcount - 1]["UPDATE_DATE"]);

                          //  dateDiff = (prevUpdate.Date-updateDate.Date).Days;
                            dateDiff = DateDiff(DateInterval.Day, updateDate.Date, prevUpdate.Date)+1;

                            if (dateDiff != 0)
                            {
                                usagePerDayFirst = firstUsage / dateDiff;
                            }
                            else
                            {
                                usagePerDayFirst = firstUsage;
                            }
                            try
                            {
                               // dateDiff = (fDate.Date-updateDate.Date ).Days;
                                dateDiff = DateDiff(DateInterval.Day, updateDate.Date, fDate.Date)+1;
                                dateDifference = dateDiff;
                                totalUsageUptoFromdate = usagePerDayFirst * dateDifference;
                            }
                            catch (Exception ex)
                            {
                                if (_log.IsFatalEnabled)
                                {
                                    _log.Fatal("Local Call failed " + ex.ToString());
                                }
                                returnValue = Convert.ToInt64(AtparStatusCodes.E_SERVERERROR);
                                return new Tuple<DataSet, long>(dsDeviation, returnValue);
                            }
                        }

                        updateDate = Convert.ToDateTime(_dsDev.Tables[0].Rows[0]["UPDATE_DATE"]);

                        if (DateTime.Compare(updateDate.Date, tDate.Date) > 0)
                        {

                            if ((_dsDev.Tables[0].Rows[0]["USAGE"]) != DBNull.Value)
                            {
                                if (!string.IsNullOrEmpty(Convert.ToString(_dsDev.Tables[0].Rows[0]["USAGE"]).Trim()))
                                {
                                    lastUsage = Convert.ToDouble(_dsDev.Tables[0].Rows[0]["USAGE"]);
                                }
                            }

                            nextUpdate = Convert.ToDateTime(_dsDev.Tables[0].Rows[1]["UPDATE_DATE"]);

                           // dateDiff = (updateDate.Date-nextUpdate.Date ).Days;
                            dateDiff = DateDiff(DateInterval.Day, nextUpdate.Date, updateDate.Date) + 1;

                            if (dateDiff != 0)
                            {
                                usagePerDayLast = lastUsage / dateDiff;
                            }
                            else
                            {
                                usagePerDayLast = lastUsage;
                            }

                            //dateDiff = (updateDate.Date-tDate.Date ).Days;
                            dateDiff = DateDiff(DateInterval.Day, tDate.Date, updateDate.Date)+1;

                            dateDifference = dateDiff - 1;

                            totalUsageUptoTodate = usagePerDayLast * dateDifference;

                        }

                        // If _startDate is less than or eqaul to fDate then we then we will increment
                        // "i"  value to upto _dsDev.Tables[0].Rows.Count - 2. This is because
                        // last value will have the Usage Qty of Previous date
                        if (string.IsNullOrEmpty(_startDate.ToString()))
                        {
                            for (i = 0; i <= _dsDev.Tables[0].Rows.Count - 1; i++)
                            {

                                if ((_dsDev.Tables[0].Rows[i]["USAGE"]) != DBNull.Value)
                                {
                                    if (!string.IsNullOrEmpty(Convert.ToString(_dsDev.Tables[0].Rows[i]["USAGE"]).Trim()))
                                    {
                                        avgTotalUsage = avgTotalUsage + Convert.ToDouble(_dsDev.Tables[0].Rows[i]["USAGE"]);
                                    }
                                }
                            }
                        }
                        else
                        {
                            for (i = 0; i <= _dsDev.Tables[0].Rows.Count - 2; i++)
                            {
                                if ((_dsDev.Tables[0].Rows[i]["USAGE"]) != DBNull.Value)
                                {
                                    if (!string.IsNullOrEmpty(Convert.ToString(_dsDev.Tables[0].Rows[i]["USAGE"]).Trim()))
                                    {
                                        avgTotalUsage = avgTotalUsage + Convert.ToDouble(_dsDev.Tables[0].Rows[i]["USAGE"]);
                                    }
                                }
                            }
                        }
                        if (avgTotalUsage == 0)
                        {
                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug("TOTAL USAGE IS 0");
                            }
                            return new Tuple<DataSet, long>(dsDeviation, returnValue);
                        }
                        avgTotalUsage = avgTotalUsage - (totalUsageUptoTodate + totalUsageUptoFromdate);

                        
                        dateDiff = DateDiff(DateInterval.Day, fDate.Date, tDate.Date) + 1;

                        long intFromToDateRange = dateDiff;

                        if (intFromToDateRange > 0)
                        {
                            avgUsagePerday = Convert.ToDouble((avgTotalUsage) / ((intFromToDateRange) + 1));
                        }
                        //If (DateDiff(DateInterval.Day, fDate.Date, tDate.Date) + 1) <> 0 Then
                        //    avgUsagePerday = (avgTotalUsage) / (DateDiff(DateInterval.Day, fDate.Date, tDate.Date) + 1)
                        //Else
                        //    avgUsagePerday = avgTotalUsage
                        //End If
                        // End If 'totalRowcount

                    }

                    //If only one record is exiting for given search conditions
                    //VD-IT0001282
                    if (avgUsagePerday < 0)
                    {
                        avgUsagePerday = 0;
                    }

                    if (minUsagePerDay < 0)
                    {
                        minUsagePerDay = 0;
                    }

                    if (maxUsagePerDay < 0)
                    {
                        maxUsagePerDay = 0;
                    }

                    if (minUsagePerDay == 0)
                    {
                        minUsagePerDay = avgUsagePerday;
                    }
                    if (maxUsagePerDay == 0)
                    {
                        maxUsagePerDay = avgUsagePerday;
                    }

                    //Step 5
                    //factorOfSafety()
                    //Atpar_Application_Parameters _atparParameters = default(Atpar_Application_Parameters);
                    //_atparParameters = Atpar_Application_Parameters.CreateInstance(deviceTokenEntry[TokenEntry_Enum.SystemId]);
                    string _strFactorOfSafety = string.Empty;

                    try
                    {
                        _strFactorOfSafety = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString(), (int)AtParWebEnums.EnumApps.CartCount, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

                        if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsWarnEnabled)
                            {
                                _log.Warn("GetOrgGroupParamValue : FACTOR_OF_SAFETY:" + _strFactorOfSafety);
                            }
                            return new Tuple<DataSet, long>(dsDeviation, _StatusCode);
                        }

                        if (!string.IsNullOrEmpty(_strFactorOfSafety))
                        {
                            factorOfSafety = int.Parse(_strFactorOfSafety);
                        }

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(methodBaseName + " : Failed to get org parameters with the exception : " + ex.ToString());
                        }
                        return new Tuple<DataSet, long>(dsDeviation, AtparStatusCodes.E_SERVERERROR);
                    }

                    if (avgUsagePerday * (1 + ((double)factorOfSafety / 100)) > maxUsagePerDay)
                    {
                        recommendedPar = Convert.ToDouble((avgUsagePerday * (1 + ((double)factorOfSafety / 100))) * double.Parse(intCntFreq));
                    }
                    else
                    {
                        recommendedPar = Convert.ToDouble((maxUsagePerDay) * double.Parse(intCntFreq));
                    }
                    dsDeviation = _dsDev.Clone();
                    dsDeviation.AcceptChanges();

                    dsDeviation.Tables[0].Columns.Add("AVG_USAGE").DataType = System.Type.GetType("System.Double");
                    dsDeviation.Tables[0].Columns.Add("MIN_USAGE").DataType = System.Type.GetType("System.Double");
                    dsDeviation.Tables[0].Columns.Add("MAX_USAGE").DataType = System.Type.GetType("System.Double");
                    dsDeviation.Tables[0].Columns.Add("RECOMMENDED_PAR").DataType = System.Type.GetType("System.Double");
                    dsDeviation.Tables[0].Columns.Add("DEPT_ID");
                    dsDeviation.Tables[0].Columns.Add("TOTAL_USAGE").DataType = System.Type.GetType("System.Double");
                    dsDeviation.Tables[0].Columns.Add("OrderQty");

                    strPrvItemID = string.Empty;
                    strPrvComp = string.Empty;

                    for (i = 0; i <= _dsDev.Tables[0].Rows.Count - 1; i++)
                    {
                        DataRow dev_frontendRow = default(DataRow);

                        dev_frontendRow = dsDeviation.Tables[0].NewRow();
                        _strSQL = null;
                        _strSQL = new StringBuilder();
                        _strSQL.Append("SELECT ISNULL(SUM(CAST(REPORT_DATA_12 AS FLOAT)),0) AS TOTAL_ORD_QTY FROM MT_ATPAR_DEVIATION " + "WHERE KEY_6 = '" + Convert.ToString(_dsDev.Tables[0].Rows[i]["ITEM_ID"]).Trim() + "' AND " + "BUSINESS_UNIT = '" + _dsDev.Tables[0].Rows[i]["BUSINESS_UNIT"] + "' " + "AND KEY_4 = '" + _dsDev.Tables[0].Rows[i]["CART_ID"] + "' " + "AND KEY_5 = '" + Convert.ToString(_dsDev.Tables[0].Rows[i]["COMPARTMENT"]).Trim() + "'");

                        _strSQL.Append(" AND (UPDATE_DATE > = CONVERT(DATETIME, '" + Convert.ToString(fDate) + "', 101))" + " AND (UPDATE_DATE < DATEADD(DAY,1,CONVERT(DATETIME, '" + dtTemtoDate + "', 101)))");

                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug("GetItemUsageOptRep: OrderQTY: " + _strSQL);
                        }

                        try
                        {
                            //dblOrderQty = Convert.ToDouble(m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL)));

                            dblOrderQty = Convert.ToDouble(objContext.Database.SqlQuery<double>(_strSQL.ToString()).FirstOrDefault());
                        }
                        catch (Exception ex)
                        {
                            returnValue = Convert.ToInt64(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug("GetItemUsageOptRep: " + ex.Message.ToString());
                            }
                            return new Tuple<DataSet, long>(dsDeviation, returnValue);
                        }
                       
                        try
                        {
                            if (strPrvItemID != _dsDev.Tables[0].Rows[i]["ITEM_ID"].ToString().Trim() || strPrvComp != _dsDev.Tables[0].Rows[i]["COMPARTMENT"].ToString().Trim())
                            {
                                dev_frontendRow["UPDATE_DATE"] = _dsDev.Tables[0].Rows[i]["UPDATE_DATE"];
                                dev_frontendRow["ITEM_ID"] = _dsDev.Tables[0].Rows[i]["ITEM_ID"];
                                dev_frontendRow["BUSINESS_UNIT"] = _dsDev.Tables[0].Rows[i]["BUSINESS_UNIT"];
                                dev_frontendRow["CART_ID"] = _dsDev.Tables[0].Rows[i]["CART_ID"];
                                dev_frontendRow["CUST_ITEM_ID"] = _dsDev.Tables[0].Rows[i]["CUST_ITEM_ID"];

                                dev_frontendRow["COMPARTMENT"] = _dsDev.Tables[0].Rows[i]["COMPARTMENT"];
                                dev_frontendRow["PRICE"] = _dsDev.Tables[0].Rows[i]["PRICE"];
                                dev_frontendRow["USAGE"] = _dsDev.Tables[0].Rows[i]["USAGE"];
                                dev_frontendRow["PAR_QTY"] = _dsDev.Tables[0].Rows[i]["PAR_QTY"];
                                dev_frontendRow["COUNT_QTY"] = _dsDev.Tables[0].Rows[i]["COUNT_QTY"];
                                dev_frontendRow["AVG_USAGE"] = Math.Round(avgUsagePerday, 2);
                                dev_frontendRow["MIN_USAGE"] = Math.Round(minUsagePerDay, 2);
                                dev_frontendRow["MAX_USAGE"] = Math.Round(maxUsagePerDay, 2);
                                dev_frontendRow["RECOMMENDED_PAR"] = Math.Ceiling(recommendedPar);
                                dev_frontendRow["UOM"] = _dsDev.Tables[0].Rows[i]["UOM"];
                                dev_frontendRow["OrderQty"] = dblOrderQty;
                                dev_frontendRow["TOTAL_USAGE"] = Math.Round(avgTotalUsage, 2);
                                dev_frontendRow["DESCR"] = _dsDev.Tables[0].Rows[i]["DESCR"];
                                if (deptID != "")
                                {
                                    dev_frontendRow["DEPT_ID"] = deptID;
                                }
                                dsDeviation.Tables[0].Rows.Add(dev_frontendRow);
                            }
                            strPrvComp = _dsDev.Tables[0].Rows[i]["COMPARTMENT"].ToString().Trim();
                            strPrvItemID = _dsDev.Tables[0].Rows[i]["ITEM_ID"].ToString().Trim();
                        }
                        catch (Exception ex)
                        {
                            returnValue = Convert.ToInt64(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug("GetItemUsageOptRep: " + ex.Message.ToString());
                            }
                            return new Tuple<DataSet, long>(dsDeviation, returnValue);
                        }
                    }

                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug("GetItemUsageOptRep: End of the function :");
                    }

                    return new Tuple<DataSet, long>(dsDeviation, returnValue);
                }
            }
            catch (Exception ex)
            {
                if (_log.IsDebugEnabled)
                {
                    _log.Debug("GetItemUsageOptRep: " + ex.Message.ToString());
                }
                return new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
            }
            //return new Tuple<DataSet, long>(dsDeviation, AtparStatusCodes.ATPAR_OK);
        }


        private Tuple<DataSet, long> GetPreviousItemUsageDetails(string itemID, string fDate, string tDate, string bUnit, string deptID, string cartID, string intCntFreq, string userID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            DataSet dsPrevItmUsage = new DataSet();
            var appID = (int)AtParWebEnums.EnumApps.CartCount; //need to check hardcoded

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" SELECT TOP 1 KEY_1,A.BUSINESS_UNIT, KEY_4 AS CART_ID,KEY_5 AS COMPARTMENT,KEY_6 AS ITEM_ID,REPORT_DATA_1 AS PAR_QTY, REPORT_DATA_2 AS COUNT_QTY,REPORT_DATA_11 AS COUNT_DATE,REPORT_DATA_12 AS ORDER_QTY, A.REPORT_DATA_15 AS CUST_ITEM_NO ,REPORT_DATA_1,REPORT_DATA_2,REPORT_DATA_3,REPORT_DATA_4,REPORT_DATA_5,REPORT_DATA_6,REPORT_DATA_7,REPORT_DATA_8,REPORT_DATA_9,REPORT_DATA_10,REPORT_DATA_11,REPORT_DATA_12,REPORT_DATA_13,REPORT_DATA_14,REPORT_DATA_15 FROM MT_ATPAR_DEVIATION A, MT_ATPAR_USER_ORG_GROUPS B WHERE A.USER_ID = B.USER_ID  AND A.APP_ID = " + appID + " AND KEY_4 = '" + cartID + "' AND(KEY_6 = '" + itemID + "' OR REPORT_DATA_15 = '" + itemID + "') AND REPORT_DATA_11 <= DATEADD(DAY, -1, CONVERT(DATETIME, " + fDate + ", 101)) AND A.BUSINESS_UNIT IN ('" + bUnit + "')ORDER BY A.BUSINESS_UNIT, KEY_4, KEY_6, A.REPORT_DATA_11 DESC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var list1 = objContext.Database.SqlQuery<List_GetCartPrevItemUsageData>(sbSql.ToString()).ToList();

                    var dt1 = list1.ToDataTable();

                    sbSql = null;
                    sbSql = new StringBuilder();

                    sbSql.Append("SELECT TOP 1 KEY_1,A.BUSINESS_UNIT, KEY_4 AS CART_ID,KEY_5 AS COMPARTMENT,KEY_6 AS ITEM_ID,REPORT_DATA_1 AS PAR_QTY,REPORT_DATA_2 AS COUNT_QTY,REPORT_DATA_11 AS COUNT_DATE,REPORT_DATA_12 AS ORDER_QTY, A.REPORT_DATA_15 AS CUST_ITEM_NO,REPORT_DATA_1,REPORT_DATA_2,REPORT_DATA_3,REPORT_DATA_4,REPORT_DATA_5,REPORT_DATA_6,REPORT_DATA_7,REPORT_DATA_8,REPORT_DATA_9,REPORT_DATA_10,REPORT_DATA_11,REPORT_DATA_12,REPORT_DATA_13,REPORT_DATA_14,REPORT_DATA_15 FROM MT_ATPAR_DEVIATION A, MT_ATPAR_USER_ORG_GROUPS B WHERE A.USER_ID = B.USER_ID  AND A.APP_ID =" + appID + " AND KEY_4= '" + cartID + "' AND ( KEY_6 ='" + itemID + "' OR REPORT_DATA_15 ='" + itemID + "')  AND REPORT_DATA_11 >= DATEADD(DAY,1,CONVERT(DATETIME, " + tDate + ", 101))  AND A.BUSINESS_UNIT IN ('" + bUnit + "') ORDER BY A.BUSINESS_UNIT,KEY_4, KEY_6, A.REPORT_DATA_11 ASC");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var list2 = objContext.Database.SqlQuery<List_GetCartPrevItemUsageData>(sbSql.ToString()).ToList();
                    var dt2 = list2.ToDataTable();

                    dsPrevItmUsage.Tables.Add(dt1);
                    dsPrevItmUsage.Tables.Add(dt2);

                    return new Tuple<DataSet, long>(dsPrevItmUsage, AtparStatusCodes.ATPAR_OK);
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


        public Tuple<DataSet, long> GetItemUsageDetails(string itemID, string fDate, string toDate, string bUnit, string cartId, string srvrUserID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            StringBuilder _sbSQL = new StringBuilder();
            DataSet DsItemUsagedet = new DataSet();
            string _strSQL = string.Empty;
            string _StatusCode = string.Empty;
            long _UsageStatusCode = -1;
            DataSet DsItmusageDtls = new DataSet();
            string DeptId = string.Empty;
            DataSet pdsCartDetails = new DataSet();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (var connection = objContext.Database.Connection)
                    {
                        SqlParameter[] sqlParms = new SqlParameter[9];

                        sqlParms[0] = new SqlParameter("@Fromdate", SqlDbType.NVarChar);
                        sqlParms[0].Value = fDate;

                        sqlParms[1] = new SqlParameter("@Todate", SqlDbType.NVarChar);
                        sqlParms[1].Value = toDate;

                        sqlParms[2] = new SqlParameter("@app_ID", SqlDbType.NVarChar);
                        sqlParms[2].Value = (int)AtParWebEnums.EnumApps.CartCount; //need to check hardcoded

                        sqlParms[3] = new SqlParameter("@userID", SqlDbType.NVarChar);
                        sqlParms[3].Value = srvrUserID;

                        sqlParms[4] = new SqlParameter("@ItemID", SqlDbType.NVarChar);
                        sqlParms[4].Value = itemID;

                        sqlParms[5] = new SqlParameter("@CartID", SqlDbType.NVarChar);
                        sqlParms[5].Value = cartId;

                        sqlParms[6] = new SqlParameter("@bunit", SqlDbType.NVarChar);
                        sqlParms[6].Value = bUnit;

                        sqlParms[7] = new SqlParameter("@pOrgId", SqlDbType.NVarChar);
                        sqlParms[7].Value = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID];

                        sqlParms[8] = new SqlParameter("@StatusCode", SqlDbType.Int);
                        sqlParms[8].Direction = ParameterDirection.Output;

                        connection.Open();
                        var command = connection.CreateCommand();
                        command.Parameters.AddRange(sqlParms);
                        command.CommandText = "GetCartItemUsageReportDetails";
                        command.CommandType = CommandType.StoredProcedure;

                        _strSQL = "DECLARE @P1 INT " + "SET @P1 = 0 " + "\r\n" + "\r\n" + "EXEC	" + "GetCartItemUsageReportDetails" + "\r\n" + "@Fromdate = N'" + sqlParms[0].Value + "'," + "\r\n" + "@Todate = N'" + sqlParms[1].Value + "'," + "\r\n" + "@app_ID = N'" + sqlParms[2].Value + "'," + "\r\n" + "@userID = N'" + sqlParms[3].Value + "'," + "\r\n" + "@ItemID = N'" + sqlParms[4].Value + "'," + "\r\n" + "@CartID = N'" + sqlParms[5].Value + "'," + "\r\n" + "@bunit = N'" + sqlParms[6].Value + "'," + "\r\n" + "@pOrgId = N'" + sqlParms[7].Value + "'," + "\r\n" + "@StatusCode = N''" + "\r\n" + "\r\n" + "SELECT	@P1 ";

                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug(_strSQL);
                        }

                        try
                        {
                            using (var reader = command.ExecuteReader())
                            {
                                var List1 =
                                    ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<List1_GetCartItemUsageReportDetails>(reader)
                                        .ToList();

                                reader.NextResult();

                                var List2 =
                                    ((IObjectContextAdapter)objContext)
                                        .ObjectContext
                                        .Translate<List2_GetCartItemUsageReportDetails>(reader)
                                        .ToList();

                                reader.NextResult();



                                var dt = List1.ToDataTable();
                                var dt1 = List2.ToDataTable();
                                pdsCartDetails.Tables.Add(dt);
                                pdsCartDetails.Tables.Add(dt1);
                                _StatusCode = Convert.ToString(sqlParms[8].Value);

                                if (_StatusCode != AtparStatusCodes.ATPAR_OK.ToString())
                                {
                                    if (_log.IsFatalEnabled)
                                    {
                                        _log.Fatal(methodBaseName + " Failed to Get the details from middle tier" + " tables: StatusCode is : " + _StatusCode + "\r\n" + " Failed to execute the" + " SQL... " + "\r\n" + _strSQL + "\r\n");
                                    }
                                    return new Tuple<DataSet, long>(pdsCartDetails, AtparStatusCodes.E_SERVERERROR);
                                }
                            }

                            if (pdsCartDetails.Tables[0].Rows.Count > 0)
                            {
                                if (pdsCartDetails.Tables[1].Rows.Count > 0)
                                {
                                    pdsCartDetails.Tables[1].Columns.Add("AVG_USAGE", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("MIN_USAGE", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("MAX_USAGE", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("OrderQty", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("PAR_QTY", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("COUNT_QTY", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("UPDATE_DATE", Type.GetType("System.String"));
                                    pdsCartDetails.Tables[1].Columns.Add("BOrderQty", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("BPAR_QTY", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("BCOUNT_QTY", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("BUPDATE_DATE", Type.GetType("System.String"));
                                    pdsCartDetails.Tables[1].Columns.Add("AOrderQty", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("APAR_QTY", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("ACOUNT_QTY", Type.GetType("System.Double"));
                                    pdsCartDetails.Tables[1].Columns.Add("AUPDATE_DATE", Type.GetType("System.String"));
                                    pdsCartDetails.Tables[1].AcceptChanges();

                                    for (int intCnt1 = 0; intCnt1 <= pdsCartDetails.Tables[1].Rows.Count - 1; intCnt1++)
                                    {
                                        try
                                        {
                                            var result = GetItemUsageOptRep(itemID, DateTime.Parse(fDate), DateTime.Parse(toDate), pdsCartDetails.Tables[1].Rows[intCnt1]["BUSINESS_UNIT"].ToString(), DeptId, pdsCartDetails.Tables[1].Rows[intCnt1]["CART_ID"].ToString(), "0", srvrUserID, pdsCartDetails.Tables[1].Rows[intCnt1]["COMPARTMENT"].ToString(), deviceTokenEntry);

                                            _UsageStatusCode = result.Item2;
                                            DsItmusageDtls = result.Item1;

                                            if (_UsageStatusCode == AtparStatusCodes.ATPAR_OK)
                                            {
                                                if (DsItmusageDtls.Tables.Count > 0)
                                                {
                                                    if (DsItmusageDtls.Tables[0].Rows.Count > 0)
                                                    {
                                                        try
                                                        {
                                                            DataRow[] dr = pdsCartDetails.Tables[1].Select("CART_ID='" + pdsCartDetails.Tables[1].Rows[intCnt1]["CART_ID"].ToString() + "' AND BUSINESS_UNIT='" + pdsCartDetails.Tables[1].Rows[intCnt1]["BUSINESS_UNIT"].ToString() + "' AND COMPARTMENT='" + pdsCartDetails.Tables[1].Rows[intCnt1]["COMPARTMENT"].ToString() + "'");
                                                            if (dr.Length > 0)
                                                            {
                                                                dr[0]["AVG_USAGE"] = DsItmusageDtls.Tables[0].Rows[0]["AVG_USAGE"];
                                                                dr[0]["MIN_USAGE"] = DsItmusageDtls.Tables[0].Rows[0]["MIN_USAGE"];
                                                                dr[0]["MAX_USAGE"] = DsItmusageDtls.Tables[0].Rows[0]["MAX_USAGE"];
                                                                dr[0]["UPDATE_DATE"] = DsItmusageDtls.Tables[0].Rows[0]["UPDATE_DATE"].ToString();
                                                                dr[0]["PAR_QTY"] = DsItmusageDtls.Tables[0].Rows[0]["PAR_QTY"];
                                                                dr[0]["COUNT_QTY"] = DsItmusageDtls.Tables[0].Rows[0]["COUNT_QTY"];
                                                                dr[0]["OrderQty"] = DsItmusageDtls.Tables[0].Rows[0]["OrderQty"];

                                                                dr[0].AcceptChanges();
                                                                pdsCartDetails.Tables[1].AcceptChanges();
                                                            }
                                                        }
                                                        catch (Exception ex)
                                                        {
                                                            if (_log.IsInfoEnabled)
                                                            {
                                                                _log.Info(methodBaseName + ":Failed to get the filtere datarow  with an exception:" + ex.ToString());
                                                            }
                                                            return new Tuple<DataSet, long>(pdsCartDetails, AtparStatusCodes.E_SERVERERROR);
                                                        }

                                                    }
                                                }
                                                //' Previous Item Usage Details
                                                DataSet DsPrevUsageDtls = new DataSet();
                                                long strPrevusage = -1;

                                                var preUsageResult = GetPreviousItemUsageDetails(itemID, fDate, toDate, pdsCartDetails.Tables[1].Rows[intCnt1]["BUSINESS_UNIT"].ToString(), DeptId, pdsCartDetails.Tables[1].Rows[intCnt1]["CART_ID"].ToString(), "0", srvrUserID, deviceTokenEntry);

                                                strPrevusage = preUsageResult.Item2;
                                                DsPrevUsageDtls = preUsageResult.Item1;

                                                if (strPrevusage == AtparStatusCodes.ATPAR_OK)
                                                {
                                                    if (DsPrevUsageDtls.Tables[0].Rows.Count > 0)
                                                    {

                                                        DataRow[] dr1 = pdsCartDetails.Tables[1].Select("CART_ID='" + pdsCartDetails.Tables[1].Rows[intCnt1]["CART_ID"].ToString() + "' AND BUSINESS_UNIT='" + pdsCartDetails.Tables[1].Rows[intCnt1]["BUSINESS_UNIT"].ToString() + "'");
                                                        if (dr1.Length > 0)
                                                        {

                                                            dr1[0]["BUPDATE_DATE"] = DsPrevUsageDtls.Tables[0].Rows[0]["UPDATE_DATE"].ToString();
                                                            dr1[0]["BPAR_QTY"] = DsPrevUsageDtls.Tables[0].Rows[0]["PAR_QTY"];
                                                            dr1[0]["BCOUNT_QTY"] = DsPrevUsageDtls.Tables[0].Rows[0]["COUNT_QTY"];
                                                            dr1[0]["BOrderQty"] = DsPrevUsageDtls.Tables[0].Rows[0]["ORDER_QTY"];

                                                            dr1[0].AcceptChanges();
                                                            pdsCartDetails.Tables[1].AcceptChanges();
                                                        }
                                                    }
                                                    else
                                                    {
                                                        DataRow[] dr1 = pdsCartDetails.Tables[1].Select("CART_ID='" + pdsCartDetails.Tables[1].Rows[intCnt1]["CART_ID"].ToString() + "' AND BUSINESS_UNIT='" + pdsCartDetails.Tables[1].Rows[intCnt1]["BUSINESS_UNIT"].ToString() + "'");

                                                        if (dr1.Length > 0)
                                                        {
                                                            dr1[0]["BUPDATE_DATE"] = 0;
                                                            dr1[0]["BPAR_QTY"] = 0;
                                                            dr1[0]["BCOUNT_QTY"] = 0;
                                                            dr1[0]["BOrderQty"] = 0;
                                                            dr1[0].AcceptChanges();
                                                            pdsCartDetails.Tables[1].AcceptChanges();
                                                        }
                                                    }

                                                    //After Item Usage

                                                    if (DsPrevUsageDtls.Tables[1].Rows.Count > 0)
                                                    {

                                                        DataRow[] dr2 = pdsCartDetails.Tables[1].Select("CART_ID='" + pdsCartDetails.Tables[1].Rows[intCnt1]["CART_ID"].ToString() + "' AND BUSINESS_UNIT='" + pdsCartDetails.Tables[1].Rows[intCnt1]["BUSINESS_UNIT"].ToString() + "'");
                                                        if (dr2.Length > 0)
                                                        {

                                                            dr2[0]["AUPDATE_DATE"] = DsPrevUsageDtls.Tables[1].Rows[0]["UPDATE_DATE"].ToString();
                                                            dr2[0]["APAR_QTY"] = DsPrevUsageDtls.Tables[1].Rows[0]["PAR_QTY"];
                                                            dr2[0]["ACOUNT_QTY"] = DsPrevUsageDtls.Tables[1].Rows[0]["COUNT_QTY"];
                                                            dr2[0]["AOrderQty"] = DsPrevUsageDtls.Tables[1].Rows[0]["ORDER_QTY"];

                                                            dr2[0].AcceptChanges();
                                                            pdsCartDetails.Tables[1].AcceptChanges();
                                                        }
                                                    }
                                                    else
                                                    {
                                                        DataRow[] dr2 = pdsCartDetails.Tables[1].Select("CART_ID='" + pdsCartDetails.Tables[1].Rows[intCnt1]["CART_ID"].ToString() + "' AND BUSINESS_UNIT='" + pdsCartDetails.Tables[1].Rows[intCnt1]["BUSINESS_UNIT"].ToString() + "'");
                                                        if (dr2.Length > 0)
                                                        {

                                                            dr2[0]["AUPDATE_DATE"] = 0;
                                                            dr2[0]["APAR_QTY"] = 0;
                                                            dr2[0]["ACOUNT_QTY"] = 0;
                                                            dr2[0]["AOrderQty"] = 0;
                                                            dr2[0].AcceptChanges();
                                                            pdsCartDetails.Tables[1].AcceptChanges();
                                                        }
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                if (_log.IsFatalEnabled)
                                                {
                                                    _log.Fatal(methodBaseName + " Status Code Returned is : " + Convert.ToString(_UsageStatusCode) + "\r\n");
                                                }
                                            }
                                        }
                                        catch (Exception ex)
                                        {
                                            if (_log.IsInfoEnabled)
                                            {
                                                _log.Info(methodBaseName + ":Failed to get the data from GetItemUsageOptRep with an exception:" + ex.ToString());
                                            }
                                            return new Tuple<DataSet, long>(pdsCartDetails, AtparStatusCodes.E_SERVERERROR);
                                        }
                                    }
                                }
                            }

                            if (pdsCartDetails.Tables[1].Rows.Count > 0)
                            {
                                decimal _minUsage = new decimal();
                                decimal _maxUsage = new decimal();
                                decimal _avgUsage = new decimal();

                                DataTable pdtFinList = new DataTable();
                                pdtFinList = pdsCartDetails.Tables[1].Clone();
                                DataRow _drOutputRow = default(DataRow);
                                for (int imin = 0; imin <= pdsCartDetails.Tables[1].Rows.Count - 1; imin++)
                                {
                                    if (pdsCartDetails.Tables[1].Rows.Count == 0)
                                    {
                                        break;
                                    }
                                    DataRow[] MinUsageRow = pdsCartDetails.Tables[1].Select("CART_ID='" + pdsCartDetails.Tables[1].Rows[imin]["CART_ID"].ToString() + "' AND BUSINESS_UNIT='" + pdsCartDetails.Tables[1].Rows[imin]["BUSINESS_UNIT"].ToString() + "' AND ITEM_ID='" + pdsCartDetails.Tables[1].Rows[imin]["ITEM_ID"].ToString() + "'");

                                    if (MinUsageRow.Length > 1)
                                    {

                                        for (int k = 0; k <= MinUsageRow.Length - 1; k++)
                                        {
                                            _minUsage = _minUsage + Convert.ToDecimal(MinUsageRow[k]["MIN_USAGE"]);
                                            _maxUsage = _maxUsage + Convert.ToDecimal(MinUsageRow[k]["MAX_USAGE"]);
                                            _avgUsage = _avgUsage + Convert.ToDecimal(MinUsageRow[k]["AVG_USAGE"]);
                                            //pdsCartDetails.Tables[1].
                                            // pdsCartDetails.Tables[1].Rows.Remove(MinUsageRow(k))
                                        }
                                        MinUsageRow[0]["MIN_USAGE"] = _minUsage;
                                        MinUsageRow[0]["MAX_USAGE"] = _maxUsage;
                                        MinUsageRow[0]["AVG_USAGE"] = _avgUsage;
                                        pdtFinList.ImportRow(MinUsageRow[0]);
                                        for (int j = 0; j <= MinUsageRow.Length - 1; j++)
                                        {
                                            pdsCartDetails.Tables[1].Rows.Remove(MinUsageRow[j]);
                                        }
                                        imin--;
                                    }
                                    else
                                    {
                                        _drOutputRow = pdsCartDetails.Tables[1].Rows[imin];
                                        pdtFinList.ImportRow(_drOutputRow);
                                        pdsCartDetails.Tables[1].Rows.Remove(_drOutputRow);
                                        imin--;
                                    }
                                }

                                pdsCartDetails.Tables.Remove(pdsCartDetails.Tables[1].TableName);

                                pdsCartDetails.Tables.Add(pdtFinList);

                            }
                            else
                            {
                                return new Tuple<DataSet, long>(pdsCartDetails, AtparStatusCodes.E_NORECORDFOUND);
                            }

                            return new Tuple<DataSet, long>(pdsCartDetails, AtparStatusCodes.ATPAR_OK);
                        }
                        catch (SqlException sqlEx)
                        {
                            if (_log.IsFatalEnabled)
                            {
                                _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _strSQL + "\r\n" + " Exception is : " + sqlEx.ToString() + "\r\n");
                            }
                            return new Tuple<DataSet, long>(pdsCartDetails, AtparStatusCodes.E_SERVERERROR);
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                            {
                                _log.Fatal(methodBaseName + " Failed to execute the following" + " SQL...." + _strSQL + "\r\n" + " Exception is : "
                                    + ex.ToString() + "\r\n");
                            }
                            return new Tuple<DataSet, long>(pdsCartDetails, AtparStatusCodes.E_SERVERERROR);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + " Failed to Get the details in middle tier" + " tables: Exception is : " + ex.ToString() + "\r\n");
                }
                return new Tuple<DataSet, long>(pdsCartDetails, AtparStatusCodes.E_SERVERERROR);
            }
        }


        //private Tuple<DataSet, long> GetRequisitionNo(string pStrIds, string pSvrUser)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    DataSet pDsReqNo = new DataSet();

        //    try
        //    {
        //        using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
        //        {
        //            using (var connection = objContext.Database.Connection)
        //            {
        //                SqlParameter sql_parm_Ids = new SqlParameter("@ids", SqlDbType.VarChar, 4000);
        //                sql_parm_Ids.Value = pStrIds;

        //                connection.Open();
        //                var command = connection.CreateCommand();
        //                command.Parameters.Add(sql_parm_Ids);
        //                command.CommandText = "GetCartItemUsageReportDetails";
        //                command.CommandType = CommandType.StoredProcedure;

        //                if (_log.IsInfoEnabled)
        //                {
        //                    _log.Info("Calling sp_GetRequisitionNo with the following syntax..");

        //                    string _strSQL1 = "EXEC sp_GetRequisitionNo " + "\r\n" + " @ids = N'" + sql_parm_Ids.Value + "'";

        //                    _log.Info(_strSQL1);
        //                }


        //                using (var reader = command.ExecuteReader())
        //                {
        //                    var List1 =
        //                        ((IObjectContextAdapter)objContext)
        //                            .ObjectContext
        //                            .Translate<string>(reader)
        //                            .ToList();

        //                    var dt = List1.ToDataTable();

        //                    pDsReqNo.Tables.Add(dt);
        //                }
        //            }
        //        }
        //        return new Tuple<DataSet, long>(pDsReqNo, AtparStatusCodes.ATPAR_OK);
        //    }
        //    catch (SqlException sqlex)
        //    {
        //        if (_log.IsFatalEnabled)
        //        {
        //            _log.Fatal(methodBaseName + "\r\n" + (sqlex));
        //        }
        //        return new Tuple<DataSet, long>(pDsReqNo, AtparStatusCodes.E_SERVERERROR);
        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled)
        //        {
        //            _log.Fatal(methodBaseName + ex.ToString());
        //        }
        //        return new Tuple<DataSet, long>(pDsReqNo, AtparStatusCodes.E_SERVERERROR);
        //    }
        //}

        public class List1_GetCartItemUsageReportDetails
        {
            public double KEY_1 { get; set; }
            public string BUSINESS_UNIT { get; set; }
            public string CART_ID { get; set; }
            public string COMPARTMENT { get; set; }
            public string ITEM_ID { get; set; }
            public double? PAR_QTY { get; set; }
            public double? COUNT_QTY { get; set; }
            public string COUNTDATE { get; set; }
            public string ORDER_QTY { get; set; }
            public string CUST_ITEM_NO { get; set; }
        }

        public class List2_GetCartItemUsageReportDetails
        {
            public int NO_REC { get; set; }
            public string BUSINESS_UNIT { get; set; }
            public string CART_ID { get; set; }
            public string COMPARTMENT { get; set; }
            public string DESCR { get; set; }
            public string ITEM_ID { get; set; }
            public string ITEM_DESC { get; set; }
        }

        public class List_GetCartPrevItemUsageData
        {
            public short APP_ID { get; set; }
            public int KEY_2 { get; set; }
            public int KEY_3 { get; set; }
            public string KEY_4 { get; set; }
            public string KEY_5 { get; set; }
            public string KEY_6 { get; set; }
            public DateTime UPDATE_DATE { get; set; }
            public double? REPORT_DATA_1 { get; set; }
            public double? REPORT_DATA_2 { get; set; }
            public double? REPORT_DATA_3 { get; set; }
            public int? REPORT_DATA_4 { get; set; }
            public double? REPORT_DATA_5 { get; set; }
            public string REPORT_DATA_6 { get; set; }
            public string REPORT_DATA_7 { get; set; }
            public string REPORT_DATA_8 { get; set; }
            public string REPORT_DATA_9 { get; set; }
            public string REPORT_DATA_10 { get; set; }
            public DateTime? REPORT_DATA_11 { get; set; }
            public string REPORT_DATA_12 { get; set; }
            public string REPORT_DATA_13 { get; set; }
            public string REPORT_DATA_14 { get; set; }
            public string REPORT_DATA_15 { get; set; }
            public string USER_ID { get; set; }
            public string ORG_GROUP_ID { get; set; }
            public DateTime LAST_UPDATE_DATE { get; set; }
            public string LAST_UPDATE_USER { get; set; }
            public string LAST_CLIENT_ADDRESS { get; set; }


            public double KEY_1 { get; set; }
            public string BUSINESS_UNIT { get; set; }
            public string CART_ID { get; set; }
            public string COMPARTMENT { get; set; }
            public string ITEM_ID { get; set; }
            public double? PAR_QTY { get; set; }
            public double? COUNT_QTY { get; set; }
            public DateTime COUNT_DATE { get; set; }
            public string ORDER_QTY { get; set; }
            public string CUST_ITEM_NO { get; set; }
        }

       

        public class VM_ATPAR_DEVIATION
        {
            public string CUST_ITEM_ID { get; set; }
            public DateTime UPDATE_DATE { get; set; }
            public string BUSINESS_UNIT { get; set; }
            public double? PAR_QTY { get; set; }
            public double? COUNT_QTY { get; set; }
            public string USAGE { get; set; }
            public double? PRICE { get; set; }
            public string CART_ID { get; set; }
            public string COMPARTMENT { get; set; }
            public string ITEM_ID { get; set; }
            public string UOM { get; set; }
            public string DESCR { get; set; }
        }

        public enum DateInterval
        {
            Year,
            Month,
            Weekday,
            Day,
            Hour,
            Minute,
            Second
        }


        public static long DateDiff(DateInterval interval, DateTime date1, DateTime date2)
        {

            TimeSpan ts = date2 - date1;

            switch (interval)
            {
                case DateInterval.Year:
                    return date2.Year - date1.Year;
                case DateInterval.Month:
                    return (date2.Month - date1.Month) + (12 * (date2.Year - date1.Year));
                case DateInterval.Weekday:
                    return Fix(ts.TotalDays) / 7;
                case DateInterval.Day:
                    return Fix(ts.TotalDays);
                case DateInterval.Hour:
                    return Fix(ts.TotalHours);
                case DateInterval.Minute:
                    return Fix(ts.TotalMinutes);
                default:
                    return Fix(ts.TotalSeconds);
            }
        }

        private static long Fix(double Number)
        {
            if (Number >= 0)
            {
                return (long)Math.Floor(Number);
            }
            return (long)Math.Ceiling(Number);
        }
    }
}

#endregion

#region GetOrderHistoryRep

//public long GetOrderHistoryRep(string pStrSvrUser, string pStrBUnit, string pStrParLoc, ref DataTable pDtFillValues, ref int pIntLatestValuesCount, ref int pIntTransId, ref object pIntRecCnt, string pOrgGroup, string pProfileID, string[] pDeviceTokenEntry)
//{


//    try
//    {
//        StringBuilder _strSQL = new StringBuilder();
//        long _statusCode = 0;
//        DataTable _dtCartItemInfo = default(DataTable);
//        pIntLatestValuesCount = 0;
//        CultureInfo dtCultureInfo = new CultureInfo("en-US");



//        DataSet _dtCompRep = new DataSet();

//        _statusCode = System.Convert.ToInt64(GetCartItemInfo(pOrgGroup, pIntRecCnt, _dtCompRep, pStrBUnit, pStrParLoc, pStrSvrUser, pProfileID, pDeviceTokenEntry));



//        //DG-0006338
//        //TODO: Need to confirm whether 01 needs to be inserted for itemtype or should the checking be changed
//        if (_dtCompRep.Tables.Count > 0)
//        {
//            if (_dtCompRep.Tables[AtParWebEnums. DataSet_Type.DETAILS.ToString()].Rows.Count > 0)
//            {

//                _dtCartItemInfo = _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()];

//                for (int rowIndex = 0; rowIndex < _dtCartItemInfo.Rows.Count; rowIndex++)
//                {
//                    switch (_dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_OPT].ToString())
//                    {
//                        case "01":
//                        case "1":
//                        case "Y":
//                            _dtCartItemInfo.Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = "Stock";
//                            break;
//                        case "02":
//                        case "2":
//                        case "N":
//                            _dtCartItemInfo.Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = "Non Stock";
//                            break;
//                        case "03":
//                        case "3":
//                            _dtCartItemInfo.Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = "Stockless";
//                            break;
//                        case "04":
//                        case "4":
//                            _dtCartItemInfo.Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = "Consignment";
//                            break;
//                        case "05":
//                        case "5":
//                            _dtCartItemInfo.Rows[rowIndex][(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM] = "Not Replenished";
//                            break;
//                    }
//                }
//            }
//        }

//        DataColumn dColdt1 = null;
//        DataColumn dColdt2 = null;
//        DataColumn dColdt3 = null;
//        DataColumn dColdt4 = null;
//        DataColumn dColdt5 = null;
//        DataColumn _dcRequstionNo = null;

//        dColdt1 = new DataColumn("DATE_1", System.Type.GetType("System.String"));
//        dColdt1.DefaultValue = string.Empty;
//        dColdt2 = new DataColumn("DATE_2", System.Type.GetType("System.String"));
//        dColdt2.DefaultValue = string.Empty;
//        dColdt3 = new DataColumn("DATE_3", System.Type.GetType("System.String"));
//        dColdt3.DefaultValue = string.Empty;
//        dColdt4 = new DataColumn("DATE_4", System.Type.GetType("System.String"));
//        dColdt4.DefaultValue = string.Empty;
//        dColdt5 = new DataColumn("DATE_5", System.Type.GetType("System.String"));
//        dColdt5.DefaultValue = string.Empty;

//        _dtCompRep.Tables[AtParWebEnums. DataSet_Type.DETAILS.ToString()].Columns.Add(dColdt1);
//        _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Add(dColdt2);
//        _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Add(dColdt3);
//        _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Add(dColdt4);
//        _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Add(dColdt5);

//        _dtCompRep.AcceptChanges();

//     DataTable   actualeValuedTable = _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Clone();
//    DataTable  duplicateValuedTable = _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Clone();

//        if (_statusCode == AtparStatusCodes. E_NORECORDFOUND)
//        {
//            return AtparStatusCodes. E_NORECORDFOUND;
//        }
//        else if (_statusCode != AtparStatusCodes. ATPAR_OK)
//        {
//            if (_log.IsWarnEnabled)
//            {
//                _log.Warn("After calling GetCartItemInfo function");
//            }
//            return _statusCode;
//        }

//        if (_log.IsDebugEnabled)
//        {
//            _log.Debug("After calling GetCartItemInfo Function");
//        }
//        _strSQL.Append("SELECT TOP 5 TRANSACTION_ID,CONVERT(NVARCHAR(50),UPDATE_DT_TIME ,121) AS UPDATE_DT_TIME,UPDATE_DAY=(SELECT DATENAME(WEEKDAY,UPDATE_DT_TIME)),UPDATE_HOUR=(SELECT DATENAME(hour,UPDATE_DT_TIME))," + "UPDATE_MINUTE=(SELECT DATENAME(minute,UPDATE_DT_TIME)),CONVERT(NVARCHAR(50),UPDATE_DT_TIME ,101) + ' '+ CONVERT(NVARCHAR(50),UPDATE_DT_TIME ,108) AS DATESTRING " + "FROM MT_ATPAR_TRANSACTION " + "WHERE BUSINESS_UNIT= '" + pStrBUnit + "' AND  ID ='" + pStrParLoc + "' AND STATUS NOT IN ('" + statError + "','" + statCancel + "','" + statDownloaded + "','" + statCartPutAwayDownload + "','" + statPutAway + "') ORDER BY UPDATE_DT_TIME DESC");
//        //"WHERE REPORT_DATA_2='" & pOrgGroup & "' AND BUSINESS_UNIT= '" & pStrBUnit & "' AND  ID ='" & pStrParLoc & "' AND STATUS NOT IN ('" & statError & "','" & statCancel & "','" & statDownloaded & "','" & statCartPutAwayDownload & "','" & statPutAway & "') ORDER BY UPDATE_DT_TIME DESC"
//        if (_log.IsInfoEnabled)
//        {
//            _log.Info("Before Selecting the Records from MT_ATPAR_TRANSACTION : " + _strSQL + ":");
//        }

//        DataSet dsDateValues = default(DataSet);

//        try
//        {
//            dsDateValues = m_LocalDB.ExecuteDataset(m_LocalDB.GetSqlStringCommand(_strSQL));
//        }
//        catch (Exception ex)
//        {
//            if (_log.IsFatalEnabled)
//            {
//                _log.Fatal(methodBaseName + " Failed to execute SQL... " + _strSQL + "\r\n" + "Exception is : " + ex.ToString() + "\r\n");
//            }

//        }

//        StringBuilder _sbTransIDs = new StringBuilder();
//        DataSet _dsReqNo = new DataSet();
//        DataRow[] _drReqNo = null;

//        for (int intRecCount = 0; intRecCount <= dsDateValues.Tables[0].Rows.Count - 1; intRecCount++)
//        {
//            if (intRecCount == 0)
//            {
//                _sbTransIDs.Append(dsDateValues.Tables[0].Rows[intRecCount]["TRANSACTION_ID"]);
//            }
//            else
//            {
//                _sbTransIDs.Append("," + dsDateValues.Tables[0].Rows[intRecCount]["TRANSACTION_ID"]);
//            }
//        }

//        if (log.IsDebugEnabled)
//        {
//            log.Debug("Trans Ids are :" + _sbTransIDs.ToString());
//        }

//        _statusCode = System.Convert.ToInt64(GetRequisitionNo(_sbTransIDs.ToString(), pStrSvrUser, _dsReqNo));

//        if (_statusCode != AtparStatusCodes. ATPAR_OK)
//        {
//            if (_log.IsDebugEnabled)
//            {
//                _log.Warn("After calling GetRequisitionNo function");
//            }
//            return _statusCode;
//        }

//        _dcRequstionNo = new DataColumn("REQ_NO", System.Type.GetType("System.String"));
//        _dcRequstionNo.DefaultValue = string.Empty;
//        dsDateValues.Tables[0].Columns.Add(_dcRequstionNo);

//        if (dsDateValues.Tables[0].Rows.Count > 0)
//        {
//            //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of _dsReqNo.Tables(0).Rows.Count for every iteration:
//            int tempVar = _dsReqNo.Tables[0].Rows.Count;
//            for (int intRowCnt = 0; intRowCnt < tempVar; intRowCnt++)
//            {
//                _drReqNo = _dsReqNo.Tables[0].Select("TRANSID = '" + dsDateValues.Tables[0].Rows[intRowCnt]["TRANSACTION_ID"] + "'");
//                if (_drReqNo.Length > 0)
//                {
//                    var tempVar2 = _drReqNo[0];
//                    if (!string.IsNullOrEmpty(tempVar2["REQNO"].ToString()) && !Convert.IsDBNull(tempVar2["REQNO"]))
//                    {
//                        if (tempVar2["REQNO"].ToString() != "0")
//                        {
//                            dsDateValues.Tables[0].Rows[intRowCnt]["REQ_NO"] = tempVar2["REQNO"];
//                        }
//                    }
//                }
//            }
//        }

//        string strDateValue1 = "";
//        string strDateValue2 = "";
//        string strDateValue3 = "";
//        string strDateValue4 = "";
//        string strDateValue5 = "";
//        string strDateValue6 = "";
//        string strDateValue7 = "";
//        string strDateValue8 = "";
//        string strDateValue9 = "";
//        string strDateValue10 = "";


//        if (_dtCompRep.Tables.Count > 0 && _dtCompRep.Tables[AtParWebEnums. DataSet_Type.DETAILS.ToString()].Rows.Count > 0)
//        {

//            if (dsDateValues.Tables.Count > 0)
//            {

//                if (dsDateValues.Tables[0].Rows.Count > 0)
//                {

//                    pIntLatestValuesCount = dsDateValues.Tables[0].Rows.Count;

//                    var tempVar3 = dsDateValues.Tables[0];
//                    switch (tempVar3.Rows.Count)
//                    {


//                        case 5:
//                            strDateValue1 = tempVar3.Rows[0]["UPDATE_DT_TIME"].ToString();
//                            strDateValue2 = tempVar3.Rows[1]["UPDATE_DT_TIME"].ToString();
//                            strDateValue3 = tempVar3.Rows[2]["UPDATE_DT_TIME"].ToString();
//                            strDateValue4 = tempVar3.Rows[3]["UPDATE_DT_TIME"].ToString();
//                            strDateValue5 = tempVar3.Rows[4]["UPDATE_DT_TIME"].ToString();

//                            strDateValue6 = tempVar3.Rows[0]["DATESTRING"] + " " + tempVar3.Rows[0]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[0]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[0]["REQ_NO"]); //& " " & .Rows(0)("UPDATE_DAY")

//                            strDateValue7 = tempVar3.Rows[1]["DATESTRING"] + " " + tempVar3.Rows(1)["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[1]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[1]["REQ_NO"]); //& " " & .Rows(1)("UPDATE_DAY")

//                            strDateValue8 = tempVar3.Rows[2]["DATESTRING"] + " " + tempVar3.Rows(2)["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[2]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[2]["REQ_NO"]); //& " " & .Rows(2)("UPDATE_DAY")

//                            strDateValue9 = tempVar3.Rows[3]["DATESTRING"] + " " + tempVar3.Rows[3]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[3]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[3]["REQ_NO"]); //& " " & .Rows(3)("UPDATE_DAY")

//                            strDateValue10 = tempVar3.Rows[4]["DATESTRING"] + " " + tempVar3.Rows[4]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[4]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[4]["REQ_NO"]); //& " " & .Rows(4)("UPDATE_DAY")

//                            break;

//                        case 4:
//                            strDateValue1 = tempVar3.Rows[0]["UPDATE_DT_TIME"].ToString();
//                            strDateValue2 = tempVar3.Rows[1]["UPDATE_DT_TIME"].ToString();
//                            strDateValue3 = tempVar3.Rows[2]["UPDATE_DT_TIME"].ToString();
//                            strDateValue4 = tempVar3.Rows[3]["UPDATE_DT_TIME"].ToString();
//                            strDateValue6 = tempVar3.Rows[0]["DATESTRING"] + " " + tempVar3.Rows[0]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows(0)["REQ_NO"]) ? string.Empty : " Req No: " + tempVar3.Rows[0]["REQ_NO"]); //& " " & .Rows(0)("UPDATE_DAY")
//                            strDateValue7 = tempVar3.Rows[1]["DATESTRING"] + " " + tempVar3.Rows(1)["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[1]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[1]["REQ_NO"]); //& " " & .Rows(1)("UPDATE_DAY")
//                            strDateValue8 = tempVar3.Rows[2]["DATESTRING"] + " " + tempVar3.Rows[2]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[2]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows(2)["REQ_NO"]); //& " " & .Rows(2)("UPDATE_DAY")
//                            strDateValue9 = tempVar3.Rows[3]["DATESTRING"] + " " + tempVar3.Rows[3]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows(3)["REQ_NO"]) ? string.Empty : " Req No: " + tempVar3.Rows[3]["REQ_NO"]); //& " " & .Rows(3)("UPDATE_DAY")
//                            strDateValue10 = "1/1/1900 00:00:00 PM ";
//                            break;
//                        case 3:
//                            strDateValue1 = tempVar3.Rows[0]["UPDATE_DT_TIME"].ToString();
//                            strDateValue2 = tempVar3.Rows[1]["UPDATE_DT_TIME"].ToString();
//                            strDateValue3 = tempVar3.Rows[2]["UPDATE_DT_TIME"].ToString();
//                            strDateValue6 = tempVar3.Rows[0]["DATESTRING"] + " " + tempVar3.Rows[0]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[0]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[0]["REQ_NO"]); //& " " & .Rows(0)("UPDATE_DAY")
//                            strDateValue7 = tempVar3.Rows[1]["DATESTRING"] + " " + tempVar3.Rows(1)["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[1]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[1]["REQ_NO"]); //& " " & .Rows(1)("UPDATE_DAY")
//                            strDateValue8 = tempVar3.Rows[2]["DATESTRING"] + " " + tempVar3.Rows[2]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[2]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[2]["REQ_NO"]); //& " " & .Rows(2)("UPDATE_DAY")
//                            strDateValue9 = "1/1/1900 00:00:01 PM ";
//                            strDateValue10 = "1/1/1900 00:00:00 PM ";
//                            break;
//                        case 2:
//                            strDateValue1 = tempVar3.Rows[0]["UPDATE_DT_TIME"].ToString();
//                            strDateValue2 = tempVar3.Rows[1]["UPDATE_DT_TIME"].ToString();
//                            strDateValue6 = tempVar3.Rows[0]["DATESTRING"] + " " + tempVar3.Rows[0]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[0]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[0]["REQ_NO"]); //& " " & .Rows(0)("UPDATE_DAY")
//                            strDateValue7 = tempVar3.Rows[1]["DATESTRING"] + " " + tempVar3.Rows[1]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[1]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[1]["REQ_NO"]); //& " " & .Rows(1)("UPDATE_DAY")
//                            strDateValue8 = "1/1/1900 00:00:02 PM ";
//                            strDateValue9 = "1/1/1900 00:00:01 PM ";
//                            strDateValue10 = "1/1/1900 00:00:00 PM ";
//                            break;
//                        case 1:
//                            strDateValue1 = tempVar3.Rows[0]["UPDATE_DT_TIME"].ToString();
//                            strDateValue6 = tempVar3.Rows[0]["DATESTRING"] + " " + tempVar3.Rows[0]["UPDATE_DAY"] + (string.IsNullOrEmpty(tempVar3.Rows[0]["REQ_NO"].ToString()) ? string.Empty : " Req No: " + tempVar3.Rows[0]["REQ_NO"]); //& " " & .Rows(0)("UPDATE_DAY")
//                            strDateValue7 = "1/1/1900 00:00:03 PM ";
//                            strDateValue8 = "1/1/1900 00:00:02 PM ";
//                            strDateValue9 = "1/1/1900 00:00:01 PM ";
//                            strDateValue10 = "1/1/1900 00:00:00 PM ";
//                            break;
//                        case 0:
//                            //strDateValue1 = ""
//                            //strDateValue2 = ""
//                            //strDateValue3 = ""
//                            //strDateValue4 = ""
//                            //strDateValue5 = ""
//                            strDateValue6 = "1/1/1900 00:00:04 PM ";
//                            strDateValue7 = "1/1/1900 00:00:03 PM ";
//                            strDateValue8 = "1/1/1900 00:00:02 PM ";
//                            strDateValue9 = "1/1/1900 00:00:01 PM ";
//                            strDateValue10 = "1/1/1900 00:00:00 PM ";
//                            break;
//                    }
//                }
//                else
//                {
//                    //strDateValue1 = ""
//                    //strDateValue2 = ""
//                    //strDateValue3 = ""
//                    //strDateValue4 = ""
//                    //strDateValue5 = ""
//                    strDateValue6 = "1/1/1900 00:00:04 PM ";
//                    strDateValue7 = "1/1/1900 00:00:03 PM ";
//                    strDateValue8 = "1/1/1900 00:00:02 PM ";
//                    strDateValue9 = "1/1/1900 00:00:01 PM ";
//                    strDateValue10 = "1/1/1900 00:00:00 PM ";

//                }
//            }
//            else
//            {
//                //strDateValue1 = ""
//                //strDateValue2 = ""
//                //strDateValue3 = ""
//                //strDateValue4 = ""
//                //strDateValue5 = ""
//                strDateValue6 = "1/1/1900 00:00:04 PM ";
//                strDateValue7 = "1/1/1900 00:00:03 PM ";
//                strDateValue8 = "1/1/1900 00:00:02 PM ";
//                strDateValue9 = "1/1/1900 00:00:01 PM ";
//                strDateValue10 = "1/1/1900 00:00:00 PM ";

//            }

//            // This is only to get the repeated ids for the item ids that are present

//            string strIds = string.Empty;
//            int intCnt1 = 0;
//            //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of _dtCompRep.Tables(DataSet_Type.DETAILS.ToString).Rows.Count for every iteration:
//            int tempVar = _dtCompRep.Tables[AtParWebEnums. DataSet_Type.DETAILS.ToString()].Rows.Count;
//            for (intCnt1 = 0; intCnt1 < tempVar; intCnt1++)
//            {
//                if (_dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt1][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] != null)
//                {
//                    if (!string.IsNullOrEmpty(strIds) || !string.IsNullOrEmpty(strIds))
//                    {
//                        strIds = strIds + "," + _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt1][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
//                    }
//                    else
//                    {
//                        strIds = strIds + _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt1][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID];
//                    }
//                }
//            }
//            if (_log.IsDebugEnabled)
//            {
//                _log.Debug("total item Ids are :" + strIds);
//            }
//            // this method gives the repeated ItemIds and non repeated Item Ids in a dataset
//            // To simplify the calculation while getting teh data from sp we seperated as repeated and non repeated Item Id's
//            DataSet dsItemIds = new DataSet();
//            _statusCode = GetItemIds(dsItemIds, strIds, pStrSvrUser);


//            if (dsItemIds.Tables.Count > 0)
//            {
//                if (dsItemIds.Tables[0].Rows.Count > 0)
//                {
//                    if (_log.IsDebugEnabled)
//                    {
//                        _log.Debug("The Actual ids count is :" + dsItemIds.Tables[0].Rows.Count);
//                    }
//                }
//            }

//            if (dsItemIds.Tables.Count > 1)
//            {
//                if (dsItemIds.Tables[1].Rows.Count > 0)
//                {
//                    if (_log.IsDebugEnabled)
//                    {
//                        _log.Debug("The repeated ids count is :" + dsItemIds.Tables[1].Rows.Count);
//                    }

//                }
//            }

//            //this is to get the Ids related to the items which are not repeated 
//            string strItemIdValues = string.Empty;
//            int intCnt5 = 0;

//            if (dsItemIds.Tables.Count > 0)
//            {
//                if (dsItemIds.Tables[0].Rows.Count > 0)
//                {
//                    //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of dsItemIds.Tables(0).Rows.Count for every iteration:
//                    int tempVar2 = dsItemIds.Tables[0].Rows.Count;
//                    for (intCnt5 = 0; intCnt5 < tempVar2; intCnt5++)
//                    {
//                        if (!string.IsNullOrEmpty(strItemIdValues) || !string.IsNullOrEmpty(strItemIdValues))
//                        {
//                            strItemIdValues = strItemIdValues + "," + dsItemIds.Tables[0].Rows[intCnt5]["sId"];
//                        }
//                        else
//                        {
//                            strItemIdValues = strItemIdValues + dsItemIds.Tables[0].Rows[intCnt5]["sId"];
//                        }
//                    }
//                }
//            }

//            if (_log.IsDebugEnabled)
//            {
//                _log.Debug("The non repeated ids are :" + strItemIdValues);
//            }
//            // to get the repeated ids with their compartment ids
//            string strRepeatedItemIds = string.Empty;
//            //INSTANT C# NOTE: Commented this declaration since looping variables in 'foreach' loops are declared in the 'foreach' header in C#:
//            //				DataRow dRow1 = null;
//            int intCnt2 = 0;
//            if (dsItemIds.Tables.Count > 1)
//            {
//                if (dsItemIds.Tables[1].Rows.Count > 0)
//                {
//                    foreach (DataRow dRow1 in dsItemIds.Tables[1].Rows)
//                    {
//                        //INSTANT C# NOTE: The ending condition of VB 'For' loops is tested only on entry to the loop. Instant C# has created a temporary variable in order to use the initial value of _dtCompRep.Tables(DataSet_Type.DETAILS.ToString).Rows.Count for every iteration:
//                        int tempVar3 = _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;
//                        for (intCnt2 = 0; intCnt2 < tempVar3; intCnt2++)
//                        {
//                            if (dRow1["sID"] == _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt2][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID])
//                            {

//                                if (!string.IsNullOrEmpty(strRepeatedItemIds) || !string.IsNullOrEmpty(strRepeatedItemIds))
//                                {
//                                    strRepeatedItemIds = strRepeatedItemIds + "," + _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt2][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] + "&" + _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt2][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT];
//                                }
//                                else
//                                {
//                                    strRepeatedItemIds = strRepeatedItemIds + _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt2][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID] + "&" + _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt2][(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT];
//                                }
//                            }

//                        }
//                    }
//                }
//            }
//            if (_log.IsDebugEnabled)
//            {
//                _log.Debug("The repeated ids are :" + strRepeatedItemIds);
//            }
//            if (_log.IsDebugEnabled)
//            {
//                _log.Debug("The total no of rows :" + _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count);
//            }

//            try
//            {
//                // Getting the data values in to the original table
//                int cnt4 = 0;
//                int nor = 0;

//                //INSTANT C# NOTE: Commented this declaration since looping variables in 'foreach' loops are declared in the 'foreach' header in C#:
//                //					DataRow dRowOld = null;
//                DataRow dRowNew = null;
//                if (dsItemIds.Tables.Count > 0)
//                {
//                    if (dsItemIds.Tables[0].Rows.Count > 0)
//                    {
//                        nor = _dtCompRep.Tables[AtParWebEnums. DataSet_Type.DETAILS.ToString()].Rows.Count;
//                        foreach (DataRow dRowOld in dsItemIds.Tables[0].Rows)
//                        {
//                            for (cnt4 = 0; cnt4 < nor; cnt4++)
//                            {
//                                if (dRowOld["sID"] == _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[cnt4][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID])
//                                {
//                                    dRowNew = actualeValuedTable.NewRow(); //duplicateValuedTable.NewRow()
//                                    BuildNewRow(dRowNew, _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[cnt4], pStrSvrUser);
//                                    actualeValuedTable.Rows.Add(dRowNew);
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                if (_log.IsFatalEnabled)
//                {
//                    _log.Fatal("Error in building the actual table  :" + ex.ToString());
//                }
//            }

//            if (actualeValuedTable.Rows.Count > 0)
//            {
//                if (_log.IsDebugEnabled)
//                {
//                    _log.Debug("The total no of non repeated records count is :" + actualeValuedTable.Rows.Count);
//                }
//            }


//            try
//            {
//                // this is to remove the preticular repeated rows from the dataset to avoid the problems when we are executing the procedure
//                // at the same time we are adding these repeated rows to table which will be added later in this function
//                int cnt3 = 0;
//                int noOfRec = 0;

//                //INSTANT C# NOTE: Commented this declaration since looping variables in 'foreach' loops are declared in the 'foreach' header in C#:
//                //					DataRow dRowpl1 = null;
//                DataRow dRowpl2 = null;
//                if (dsItemIds.Tables.Count > 1)
//                {
//                    if (dsItemIds.Tables[1].Rows.Count > 0)
//                    {
//                        noOfRec = _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;
//                        foreach (DataRow dRowpl1 in dsItemIds.Tables[1].Rows)
//                        {
//                            for (cnt3 = 0; cnt3 < noOfRec; cnt3++)
//                            {


//                                if (dRowpl1["sID"] == _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[cnt3][(int)AtParWebEnums.Get_Cart_Detail_Enum.INV_ITEM_ID])
//                                {
//                                    dRowpl2 = duplicateValuedTable.NewRow();
//                                    BuildNewRow(dRowpl2, _dtCompRep.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[cnt3], pStrSvrUser);
//                                    duplicateValuedTable.Rows.Add(dRowpl2);
//                                }

//                            }
//                        }
//                    }
//                }

//            }
//            catch (Exception ex)
//            {
//                if (_log.IsFatalEnabled)
//                {
//                    _log.Fatal("Error in building the duplicate ids table  :" + ex.ToString());
//                }
//            }

//            if (duplicateValuedTable.Rows.Count > 0)
//            {
//                if (_log.IsDebugEnabled)
//                {
//                    _log.Debug("The total no of repeated records count is :" + duplicateValuedTable.Rows.Count);
//                }
//            }

//            // this is to get the data related to the items which are not repeated after removing teh item ids which are repeated
//            DataSet recSetValue = new DataSet();
//            if (strItemIdValues != "" || strItemIdValues != "")
//            {
//                strItemIdValues = "," + strItemIdValues + ",";
//                _statusCode = GetItemIdDetails(recSetValue, strItemIdValues, strDateValue1, strDateValue2, strDateValue3, strDateValue4, strDateValue5, pStrSvrUser);
//                if (recSetValue.Tables.Count > 0)
//                {
//                    if (recSetValue.Tables[0].Rows.Count > 0)
//                    {
//                        if (_log.IsDebugEnabled)
//                        {
//                            _log.Debug("The total non repeated values are  :" + recSetValue.Tables[0].Rows.Count);
//                        }
//                    }
//                }
//            }


//            // this is to get the data related to the items which are repeated and removded from the item ids 
//            DataSet reprecSetValues = new DataSet();
//            if (strRepeatedItemIds != "" || strRepeatedItemIds != "")
//            {
//                strRepeatedItemIds = "," + strRepeatedItemIds + ",";
//                _statusCode = GetDetailsForRepeatedIds(reprecSetValues, strRepeatedItemIds, strDateValue1, strDateValue2, strDateValue3, strDateValue4, strDateValue5, pStrSvrUser);
//            }


//            if (reprecSetValues.Tables.Count > 0)
//            {
//                if (reprecSetValues.Tables[0].Rows.Count > 0)
//                {
//                    if (_log.IsDebugEnabled)
//                    {
//                        _log.Debug("The total repeated values are  :" + reprecSetValues.Tables[0].Rows.Count);
//                    }
//                }
//            }

//            try
//            {
//                // this is to fill the date values to the non repeated item ids
//                int actualreowCount = 0;
//                int rCnt = 0;
//                int noOfIds = 0;
//                actualreowCount = noOfIds;
//                if (recSetValue.Tables.Count > 0)
//                {
//                    if (recSetValue.Tables[0].Rows.Count > 0)
//                    {
//                        noOfIds = Convert.ToInt32(recSetValue.Tables[0].Rows.Count / 5.0);
//                        if (_log.IsDebugEnabled)
//                        {
//                            _log.Debug("The total no of rows are  :" + noOfIds);
//                        }
//                        for (rCnt = 0; rCnt < noOfIds; rCnt++)
//                        {
//                            actualeValuedTable.Rows[rCnt]["DATE_1"] = (Convert.ToInt32(recSetValue.Tables[0].Rows[(rCnt * 5) + 0]["QTY"]) > -1) ? recSetValue.Tables[0].Rows[(rCnt * 5) + 0]["QTY"] : "NC";
//                            actualeValuedTable.Rows[rCnt]["DATE_2"] = (Convert.ToInt32(recSetValue.Tables[0].Rows[(rCnt * 5) + 1]["QTY"]) > -1) ? recSetValue.Tables[0].Rows[(rCnt * 5) + 1]["QTY"] : "NC";
//                            actualeValuedTable.Rows[rCnt]["DATE_3"] = (Convert.ToInt32(recSetValue.Tables[0].Rows[(rCnt * 5) + 2]["QTY"]) > -1) ? recSetValue.Tables[0].Rows[(rCnt * 5) + 2]["QTY"] : "NC";
//                            actualeValuedTable.Rows[rCnt]["DATE_4"] = (Convert.ToInt32(recSetValue.Tables[0].Rows[(rCnt * 5) + 3]["QTY"]) > -1) ? recSetValue.Tables[0].Rows[(rCnt * 5) + 3]["QTY"] : "NC";
//                            actualeValuedTable.Rows[rCnt]["DATE_5"] = (Convert.ToInt32(recSetValue.Tables[0].Rows[(rCnt * 5) + 4]["QTY"]) > -1) ? recSetValue.Tables[0].Rows[(rCnt * 5) + 4]["QTY"] : "NC";
//                        }
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                if (_log.IsFatalEnabled)
//                {
//                    _log.Fatal("Error in binding actual data table" + ex.ToString());
//                }
//            }

//            try
//            {
//                // This is to fill the date values to the table of repeated ids
//                int rerRowCnt = 0;
//                int noOfRepeatedIds = 0;
//                if (reprecSetValues.Tables.Count > 0)
//                {
//                    if (reprecSetValues.Tables[0].Rows.Count > 0)
//                    {
//                        noOfRepeatedIds = Convert.ToInt32(reprecSetValues.Tables[0].Rows.Count / 5.0);
//                        if (_log.IsDebugEnabled)
//                        {
//                            _log.Debug("The total no of repeated rows are  :" + noOfRepeatedIds);
//                        }
//                        for (rerRowCnt = 0; rerRowCnt < noOfRepeatedIds; rerRowCnt++)
//                        {
//                            duplicateValuedTable.Rows[rerRowCnt]["DATE_1"] = (Convert.ToInt32(reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 0]["QTY"]) > -1) ? reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 0]["QTY"] : "NC";
//                            duplicateValuedTable.Rows[rerRowCnt]["DATE_2"] = (Convert.ToInt32(reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 1]["QTY"]) > -1) ? reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 1]["QTY"] : "NC";
//                            duplicateValuedTable.Rows[rerRowCnt]["DATE_3"] = (Convert.ToInt32(reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 2]["QTY"]) > -1) ? reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 2]["QTY"] : "NC";
//                            duplicateValuedTable.Rows[rerRowCnt]["DATE_4"] = (Convert.ToInt32(reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 3]["QTY"]) > -1) ? reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 3]["QTY"] : "NC";
//                            duplicateValuedTable.Rows[rerRowCnt]["DATE_5"] = (Convert.ToInt32(reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 4]["QTY"]) > -1) ? reprecSetValues.Tables[0].Rows[(rerRowCnt * 5) + 4]["QTY"] : "NC";
//                        }
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                if (_log.IsFatalEnabled)
//                {
//                    _log.Fatal("Error in binding repeated ids data table" + ex.ToString());
//                }
//            }

//            try
//            {
//                // finally we are merging these repeated and no repeated rows in to a sing dataset
//                if (_log.IsDebugEnabled)
//                {
//                    _log.Debug("BEFORE MERGING");
//                }
//                actualeValuedTable.Merge(duplicateValuedTable);


//                if (_log.IsDebugEnabled)
//                {
//                    _log.Debug("AFTER MERGING");
//                }
//            }
//            catch (Exception ex)
//            {
//                if (_log.IsFatalEnabled)
//                {
//                    _log.Fatal("Error in merging data table" + ex.ToString());
//                }
//            }

//            if (_statusCode != AtparStatusCodes. ATPAR_OK)
//            {
//                if (_log.IsWarnEnabled)
//                {
//                    _log.Warn("After calling GetCartInfo function");
//                }
//                return _statusCode;
//            }
//            try
//            {
//                // _dsLatestValues = recSetValue
//                actualeValuedTable.Columns["DATE_1"].ColumnName = strDateValue6;
//                actualeValuedTable.Columns["DATE_2"].ColumnName = strDateValue7;
//                actualeValuedTable.Columns["DATE_3"].ColumnName = strDateValue8;
//                actualeValuedTable.Columns["DATE_4"].ColumnName = strDateValue9;
//                actualeValuedTable.Columns["DATE_5"].ColumnName = strDateValue10;
//            }
//            catch (Exception ex)
//            {
//                if (_log.IsFatalEnabled)
//                {
//                    _log.Fatal("Error in assinging the dates" + ex.ToString());
//                }
//            }


//            try
//            {

//                actualeValuedTable.Columns[(int)AtParWebEnums. Get_Cart_Detail_Enum.INV_ITEM_ID].ColumnName = "Item ID";
//                actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.CUST_ITEM_ID].ColumnName = "Custom Item No";
//                actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.COMPARTMENT].ColumnName = "Compartment";
//                actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_DESCR].ColumnName = "Description";
//                actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.ITEM_PRICE].ColumnName = "Price($)";
//                actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.UOM].ColumnName = "UOM";
//                actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.INVENTORY_ITEM].ColumnName = "ItemType";
//                actualeValuedTable.Columns[(int)AtParWebEnums.Get_Cart_Detail_Enum.OPTIMAL_QTY].ColumnName = "ParValue";

//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.MFG_ITEM_ID.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ITEM_ID.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.UPN_ID.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.ITEM_NDC.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.ITEM_GTIN.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.COUNT_ORDER.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.FOQ.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.COUNT_REQD.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_CTRL.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.CART_REPLEN_OPT.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.CONS_NON_STOCK.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.ORDER_QTY.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.MAX_QTY.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.FILLKILL.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.LOT_CONTROLLED.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.SERIAL_CONTROLLED.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.CONV_FACTOR.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.CHARGE_CODE.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_NAME.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.VENDOR_ID.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.UOM_PROC.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.QTY_OPTION.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.LAST_ORDER_DATE.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.STATUS.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.PACKAGING_STRING.ToString());
//                actualeValuedTable.Columns.Remove("ChkValue");
//                actualeValuedTable.Columns.Remove("ChkField");
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.MFG_ID.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.CONSIGNMENT_ITEM.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.REPORT_FIELD_1.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.REPORT_FIELD_2.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.REPORT_FIELD_3.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.REPORT_FIELD_4.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.ITEM_TYPE.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.SUBSTITUTE_ITEM_FLG.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.USER_FIELD_2.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.IMPLANT_FLAG.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.ITEM_MASTER_ITEM_STATUS.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.NON_CART_ITEM_STATUS.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.BILL_ITEM_STATUS.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.PAR_LOC_STATUS.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.ITEM_MASTER_STATUS.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.ITEM_BU_STATUS.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.INFO_2.ToString());
//                actualeValuedTable.Columns.Remove(AtParWebEnums.Get_Cart_Detail_Enum.INFO_3.ToString());
//                //VD-IT0001114
//                //VD-IT0001116
//                //VD-IT0001129
//                var tempVar = dsDateValues.Tables[0];

//                switch (tempVar.Rows.Count)
//                {

//                    case 4:
//                        actualeValuedTable.Columns.Remove(strDateValue10);
//                        break;
//                    case 3:
//                        actualeValuedTable.Columns.Remove(strDateValue9);
//                        actualeValuedTable.Columns.Remove(strDateValue10);
//                        break;
//                    case 2:
//                        actualeValuedTable.Columns.Remove(strDateValue8);
//                        actualeValuedTable.Columns.Remove(strDateValue9);
//                        actualeValuedTable.Columns.Remove(strDateValue10);
//                        break;
//                    case 1:
//                        actualeValuedTable.Columns.Remove(strDateValue7);
//                        actualeValuedTable.Columns.Remove(strDateValue8);
//                        actualeValuedTable.Columns.Remove(strDateValue9);
//                        actualeValuedTable.Columns.Remove(strDateValue10);
//                        break;
//                    case 0:
//                        actualeValuedTable.Columns.Remove(strDateValue6);
//                        actualeValuedTable.Columns.Remove(strDateValue7);
//                        actualeValuedTable.Columns.Remove(strDateValue8);
//                        actualeValuedTable.Columns.Remove(strDateValue9);
//                        actualeValuedTable.Columns.Remove(strDateValue10);
//                        break;
//                }

//                actualeValuedTable.AcceptChanges();


//            }
//            catch (Exception ex)
//            {
//                if (_log.IsFatalEnabled)
//                {
//                    _log.Fatal("Error in removing the Dates" + ex.ToString());
//                }
//            }

//            pDtFillValues = actualeValuedTable;

//        }

//    }
//    catch (Exception ex)
//    {
//        if (_log.IsFatalEnabled)
//        {
//            _log.Fatal("Exception Thrown in " + methodBaseName + " is.." + ex.ToString());
//        }
//    }


//}

#endregion

#endregion



