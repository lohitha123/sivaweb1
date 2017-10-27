using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.PickPlan;
using AtPar.Service.Interfaces.PickPlan;
using AtPar.Service.Interfaces.POU;
using AtPar_BusinessRules;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace AtPar.PickPlan.Service
{
    public class PickStatusReportService : IPickStatusReportService
    {
        private ILog _log;
        private ICommonRepository _commonRepo;
        private IPickStatusReportRepository _repo;

        public PickStatusReportService(ILog log, ICommonRepository commonRepo, IPickStatusReportRepository repo)
        {
            _log = log;
            _commonRepo = commonRepo;
            _repo = repo;
        }


        public AtParWebApiResponse<long> GetPickstatusReport(string inputXml, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            long _statusCode = 0;
            DataRow[] _dr = null;
            string strsearch = null;
            int index = 0;
            StringBuilder plans = new StringBuilder();
            string m_orgvalue = string.Empty;

            var response = new AtParWebApiResponse<long>();
            DataSet outputParameters = new DataSet();


            try
            {
                //HiPerfTimer _timer = new HiPerfTimer();
                ////Dim _statusCode As Long = -1

                DataSet _RempotePlans = new DataSet();

                //if (perflog.IsInfoEnabled)
                //    _timer.Start();
                try
                {
                    //_statusCode = Check_GetHeader_InputParameters(_RempotePlans, ref outputParameters, deviceTokenEntry);
                    //if (_statusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    //return _statusCode;
                    //    response.AtParNotOK(_statusCode, _commonRepo, _log);
                    //    return response;
                    //}
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(string.Format(":{0}: Exception thrown is... :{1}:", methodBaseName, ex.ToString()));
                   
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                    return response;
                }

                try
                {
                    _statusCode = Execute_GetHeader_PreProcessTasks(_RempotePlans, ref outputParameters, deviceTokenEntry);
                    if (_statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                       
                        response.AtParNotOK(_statusCode, _commonRepo, _log);
                        return response;
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(string.Format(":{0}: Exception thrown is... :{1}:", methodBaseName, ex.ToString()));
                   
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                    return response;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + "inputXml String:" + inputXml.ToString());
                XmlDocument _xmlDoc = new XmlDocument();
                XmlNodeList _XmlBUnitNodeList = default(XmlNodeList);
                string _strBunit = string.Empty;

                XmlNodeList _XmlStatusNodeList = default(XmlNodeList);
                string _strStatus = string.Empty;

                XmlNodeList _XmlBatchidNodeList = default(XmlNodeList);
                string _strBatchid = string.Empty;

                XmlNodeList _XmlOderNodeList = default(XmlNodeList);
                string _strOrder = string.Empty;

                XmlNodeList _XmlDeliveryLocationNodeList = default(XmlNodeList);
                string _strDeliveryLocation = string.Empty;

                XmlNodeList _XmlFromDateNodeList = default(XmlNodeList);
                string _strFromDate = string.Empty;

                XmlNodeList _XmlToDateNodeList = default(XmlNodeList);
                string _strTodate = string.Empty;

                XmlNodeList _XmlORGGROUPIDNodeList = default(XmlNodeList);
                string _strORGGROUPID = string.Empty;

                try
                {
                    _xmlDoc.Load(new StringReader(inputXml.ToString()));

                    _XmlBUnitNodeList = _xmlDoc.SelectNodes("/ROOT/BUSINESS_UNIT");
                    if (_XmlBUnitNodeList.Count > 0)
                    {
                        _strBunit = _XmlBUnitNodeList.Item(0).InnerText;
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(_strBunit);



                    _XmlStatusNodeList = _xmlDoc.SelectNodes("/ROOT/STATUS");
                    if (_XmlStatusNodeList.Count > 0)
                    {
                        _strStatus = _XmlStatusNodeList.Item(0).InnerText;
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(_strStatus);



                    _XmlBatchidNodeList = _xmlDoc.SelectNodes("/ROOT/BATCHID");
                    if (_XmlBatchidNodeList.Count > 0)
                    {
                        _strBatchid = _XmlBatchidNodeList.Item(0).InnerText;
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(_strBatchid);


                    _XmlOderNodeList = _xmlDoc.SelectNodes("/ROOT/ORDER");
                    if (_XmlOderNodeList.Count > 0)
                    {
                        _strOrder = _XmlOderNodeList.Item(0).InnerText;
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(_strOrder);


                    _XmlDeliveryLocationNodeList = _xmlDoc.SelectNodes("/ROOT/DELIVERYLOCATION");
                    if (_XmlDeliveryLocationNodeList.Count > 0)
                    {
                        _strDeliveryLocation = _XmlDeliveryLocationNodeList.Item(0).InnerText;
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(_strDeliveryLocation);


                    _XmlFromDateNodeList = _xmlDoc.SelectNodes("/ROOT/FROMDATE");
                    if (_XmlFromDateNodeList.Count > 0)
                    {
                        _strFromDate = _XmlFromDateNodeList.Item(0).InnerText;
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(_strFromDate);


                    _XmlToDateNodeList = _xmlDoc.SelectNodes("/ROOT/TODATE");
                    if (_XmlToDateNodeList.Count > 0)
                    {
                        _strTodate = _XmlToDateNodeList.Item(0).InnerText;
                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(_strTodate);


                    _XmlORGGROUPIDNodeList = _xmlDoc.SelectNodes("/ROOT/ORGGROUPID");
                    if (_XmlORGGROUPIDNodeList.Count > 0)
                    {
                        _strORGGROUPID = _XmlORGGROUPIDNodeList.Item(0).InnerText;
                        string[] orgarray = null;
                        orgarray = _strORGGROUPID.Split('-');
                        m_orgvalue = orgarray[0];


                    }
                    if (_log.IsDebugEnabled)
                        _log.Debug(_strORGGROUPID);


                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + "XML load failed:" + ex.ToString());
                    //Return E_XMLSTRINGNOTLOADED
                }


                DataRow _drBusinessUnit = _RempotePlans.Tables[AtParWebEnums.DataSet_Type.INVENTORY_BUSINESSUNITS.ToString()].NewRow();
                _drBusinessUnit[(int)AtParWebEnums.Get_Pick_IP_Header_Inventory_BusinessUnits_Enum.INVENTORY_BUSINESSUNIT] = _strBunit;
                _RempotePlans.Tables[AtParWebEnums.DataSet_Type.INVENTORY_BUSINESSUNITS.ToString()].Rows.Add(_drBusinessUnit);


                try
                {
                    _statusCode = Execute_GetHeader_ProcessTasks(_RempotePlans, ref outputParameters, deviceTokenEntry);
                    if (_statusCode != AtparStatusCodes.ATPAR_OK)
                    {

                        response.AtParNotOK(_statusCode, _commonRepo, _log);
                        return response;
                    }
                    DataView dview = new DataView();
                    DataTable dtable = new DataTable();
                    outputParameters.Tables[0].Columns[0].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.BUSINESS_UNIT.ToString();
                    outputParameters.Tables[0].Columns[1].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.PICK_BATCH_ID.ToString();
                    outputParameters.Tables[0].Columns[2].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.ORDER_NO.ToString();
                    outputParameters.Tables[0].Columns[3].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.SHIP_TO_CUST_ID.ToString();
                    outputParameters.Tables[0].Columns[4].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.SHIP_CUST_NAME1.ToString();
                    outputParameters.Tables[0].Columns[5].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.LOCATION.ToString();
                    outputParameters.Tables[0].Columns[6].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.DMDSRC.ToString();
                    outputParameters.Tables[0].Columns[7].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.SBUNIT.ToString();
                    outputParameters.Tables[0].Columns[8].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.PRIORITY.ToString();
                    outputParameters.Tables[0].Columns[9].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.USER_ID.ToString();
                    outputParameters.Tables[0].Columns[10].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.INV_BUSINESS_UNIT.ToString();
                    outputParameters.Tables[0].Columns[11].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.LOCATION_DESC.ToString();
                    outputParameters.Tables[0].Columns[12].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.INV_BUNIT_DESC.ToString();
                    outputParameters.Tables[0].Columns[13].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.ADDRESS1.ToString();
                    outputParameters.Tables[0].Columns[14].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.ADDRESS2.ToString();
                    outputParameters.Tables[0].Columns[15].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.ADDRESS3.ToString();
                    outputParameters.Tables[0].Columns[16].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.ADDRESS4.ToString();
                    outputParameters.Tables[0].Columns[17].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.CITY.ToString();
                    outputParameters.Tables[0].Columns[18].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.STATE.ToString();
                    outputParameters.Tables[0].Columns[19].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.ZIP_CODE.ToString();
                    outputParameters.Tables[0].Columns[20].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.ATTN_TO.ToString();
                    outputParameters.Tables[0].Columns[21].ColumnName = AtParWebEnums.Get_Pick_OP_Header_Details_Enum.REQUEST_DATE.ToString();


                    DataSet transactiondetailsdatatset = new DataSet();
                    DataSet daterangeds = new DataSet();
                    DataSet erporderds = new DataSet();
                    plans.Clear();

                    //Concatinating all the Orders that we got from the ERP
                    for (int j = 0; j <= outputParameters.Tables[0].Rows.Count - 1; j++)
                    {
                        if (plans.Length == 0)
                        {
                            plans.Append("'");
                            plans.Append(outputParameters.Tables[0].Rows[j]["ORDER_NO"].ToString() + "-" + outputParameters.Tables[0].Rows[j]["PICK_BATCH_ID"].ToString());
                            plans.Append("'");
                        }
                        else
                        {
                            plans.Append(", '");
                            plans.Append(outputParameters.Tables[0].Rows[j]["ORDER_NO"].ToString() + "-" + outputParameters.Tables[0].Rows[j]["PICK_BATCH_ID"].ToString());
                            plans.Append("'");
                        }
                    }

                    //Getting the Details of pick plan orders from the Transcation Table between the date range given
                    var tupleResult1 = _repo.Getpickstatustransactiondetails(_strTodate, _strFromDate, _strBunit, m_orgvalue); //need to check this m_orgvalue
                    daterangeds = tupleResult1.Item1;
                    _statusCode = tupleResult1.Item2;
                    //Getting the Details of pick plan orders from the Transcation Table that are matching with the plans in ERP
                    var tupleResult2 = _repo.Getpickplandetails(plans.ToString(), _strBunit, m_orgvalue);
                    erporderds = tupleResult2.Item1;
                    _statusCode = tupleResult2.Item2;
                    //Merging the two datasets
                    daterangeds.Tables[0].Merge(erporderds.Tables[0]);

                    //Eliminating the duplicate rows after merging the datasets
                    DataView dvduplicates = new DataView(daterangeds.Tables[0]);
                    string[] arrstring = {
                "ID",
                "ORDER_NO",
                "PICK_BATCH_ID",
                "UPDATETIME",
                "BUSINESS_UNIT",
                "USER_ID",
                "DOWNLOADTIME",
                "DESCR"
            };
                    DataTable dt = dvduplicates.ToTable(true, arrstring);
                    transactiondetailsdatatset.Tables.Add(dt);
                    transactiondetailsdatatset.AcceptChanges();




                    DataColumn StatusCOLUMN = new DataColumn();
                    StatusCOLUMN.ColumnName = "Status";
                    StatusCOLUMN.DefaultValue = "Picked(Sent)";
                    transactiondetailsdatatset.Tables[0].Columns.Add(StatusCOLUMN);

                    DataColumn pickedordownloaddataetimecolumn = new DataColumn();
                    pickedordownloaddataetimecolumn.ColumnName = "pickedordownloaddataetime";
                    pickedordownloaddataetimecolumn.DefaultValue = string.Empty;
                    transactiondetailsdatatset.Tables[0].Columns.Add(pickedordownloaddataetimecolumn);

                    DataColumn Usercolumn = new DataColumn();
                    Usercolumn.ColumnName = "User";
                    Usercolumn.DefaultValue = string.Empty;
                    transactiondetailsdatatset.Tables[0].Columns.Add(Usercolumn);


                    DataColumn RequestDatacolumn = new DataColumn();
                    RequestDatacolumn.ColumnName = "REQUEST_DATE";
                    RequestDatacolumn.DefaultValue = "";
                    transactiondetailsdatatset.Tables[0].Columns.Add(RequestDatacolumn);

                    DataColumn orggroupidcolumn = new DataColumn();
                    orggroupidcolumn.ColumnName = "orggroupid";
                    orggroupidcolumn.DefaultValue = _strORGGROUPID;
                    transactiondetailsdatatset.Tables[0].Columns.Add(orggroupidcolumn);



                    if (transactiondetailsdatatset.Tables[0].Rows.Count > 0)
                    {
                        bool isexists = false;
                        for (int i = 0; i <= outputParameters.Tables[0].Rows.Count - 1; i++)
                        {
                            strsearch = (outputParameters.Tables[0].Rows[i]["ORDER_NO"].ToString() + "-" + outputParameters.Tables[0].Rows[i]["PICK_BATCH_ID"].ToString());
                            if (_log.IsDebugEnabled)
                                _log.Debug("strsearch: " + strsearch);

                            _dr = transactiondetailsdatatset.Tables[0].Select("ID='" + strsearch + "'");

                            //If ERP order is found in transaction table then order is in Download status

                            if (_dr.Length > 0)
                            {
                                index = transactiondetailsdatatset.Tables[0].Rows.IndexOf(_dr[0]);
                                transactiondetailsdatatset.Tables[0].Rows[index]["Status"] = "Downloaded";
                                transactiondetailsdatatset.Tables[0].Rows[index]["pickedordownloaddataetime"] = _dr[0]["DOWNLOADTIME"];
                                transactiondetailsdatatset.Tables[0].Rows[index]["REQUEST_DATE"] = outputParameters.Tables[0].Rows[i]["REQUEST_DATE"];
                                transactiondetailsdatatset.Tables[0].Rows[index]["UPDATETIME"] = outputParameters.Tables[0].Rows[i]["REQUEST_DATE"];
                                transactiondetailsdatatset.Tables[0].Rows[index]["DESCR"] = outputParameters.Tables[0].Rows[i]["LOCATION"];
                                isexists = true;

                                //If ERP order is not found in transaction table then order will be in open status.

                            }
                            else
                            {
                                DataRow drow = default(DataRow);
                                drow = transactiondetailsdatatset.Tables[0].NewRow();
                                drow["BUSINESS_UNIT"] = outputParameters.Tables[0].Rows[i]["BUSINESS_UNIT"];
                                drow["USER_ID"] = "";
                                drow["ORDER_NO"] = outputParameters.Tables[0].Rows[i]["ORDER_NO"];
                                drow["PICK_BATCH_ID"] = outputParameters.Tables[0].Rows[i]["PICK_BATCH_ID"];
                                drow["DESCR"] = outputParameters.Tables[0].Rows[i]["LOCATION"];
                                drow["Status"] = "OPEN";
                                drow["pickedordownloaddataetime"] = "";
                                drow["REQUEST_DATE"] = outputParameters.Tables[0].Rows[i]["REQUEST_DATE"];
                                drow["UPDATETIME"] = outputParameters.Tables[0].Rows[i]["REQUEST_DATE"];
                                //outputParameters.Tables[0].Rows.Add(drow)
                                transactiondetailsdatatset.Tables[0].Rows.Add(drow);
                            }
                        }
                    }

                    transactiondetailsdatatset.Tables[0].Columns["DESCR"].ColumnName = "LOCATION";
                    dview = transactiondetailsdatatset.Tables[0].DefaultView;
                    StringBuilder pickquery = new StringBuilder();
                    //add one day extra to to date
                    DateTime actualDate = Convert.ToDateTime(_strTodate);
                    DateTime finalDate = actualDate.AddDays(1.0);

                    if (!string.IsNullOrEmpty(_strBatchid))
                    {
                        pickquery.Append(" PICK_BATCH_ID LIKE   '" + _strBatchid + "%'");
                    }

                    if (!string.IsNullOrEmpty(_strOrder))
                    {
                        if (pickquery.Length > 0)
                        {
                            pickquery.Append(" AND ");
                        }
                        pickquery.Append(" ORDER_NO LIKE     '" + _strOrder + "%'");
                    }

                    if (!string.IsNullOrEmpty(_strDeliveryLocation))
                    {
                        if (pickquery.Length > 0)
                        {
                            pickquery.Append(" AND ");
                        }
                        pickquery.Append(" LOCATION LIKE    '" + _strDeliveryLocation + "%'");
                    }
                    dview.RowFilter = pickquery.ToString();
                    outputParameters = new DataSet();

                    DataTable pickquerytemptable = new DataTable();
                    pickquerytemptable = dview.ToTable();
                    outputParameters.Tables.Add(pickquerytemptable);

                    if (_statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                       
                        response.AtParNotOK(_statusCode, _commonRepo, _log);
                        return response;
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(string.Format(":{0}: Exception thrown is... :{1}:", methodBaseName, ex.ToString()));
                   
                    response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                    return response;
                }


                //if (perflog.IsInfoEnabled)
                //{
                //    _timer.Stop();
                //    perflog.Info(methodBaseName + " " + _timer.Duration + " seconds");
                //}

                //return AtparStatusCodes.ATPAR_OK;
                Dictionary<string,object> dictionaryResult = new Dictionary<string, object> { { "outputParameters", outputParameters } };
                response.DataDictionary = dictionaryResult;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(string.Format(":{0}: Exception thrown is... :{1}:", methodBaseName, ex.ToString()));
                
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.E_SERVERERROR);
                return response;
            }
        }

        private long Check_GetHeader_InputParameters(DataSet inputParameters, ref DataSet outputParameters, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                long _statusCode = -1;
                ///// Printing Input Dataset. ///'
                if (_log.IsDebugEnabled)
                {
                    try
                    {
                        //  _statusCode = PrintDatasetStatistics(inputParameters, deviceTokenEntry);
                        if (_statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                            {
                                _log.Fatal(string.Format(":{0}: Error occured in PrintDatasetStatistics." + " Status Code Returned is... :{1}:", methodBaseName, _statusCode));
                            }
                            return _statusCode;
                        }
                        else
                        {
                            return AtparStatusCodes.ATPAR_OK;
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsDebugEnabled)
                        {
                            _log.Debug(string.Format(":{0}: Exception thrown while calling PrintDatasetStatistics is... :{1}:", methodBaseName, ex.ToString()));
                        }
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }
                ///// End Of Printing Input DataSet. ///'
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(string.Format(":{0}: Exception thrown is... :{1}:", methodBaseName, ex.ToString()));
                }
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }
            //INSTANT C# NOTE: Inserted the following 'return' since all code paths must return a value in C#:
            return 0;
        }

        private long Execute_GetHeader_PreProcessTasks(DataSet inputParameters, ref DataSet outputParameters, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long _statusCode = -1;

            ///// Populating Get Header Input Parameteres. ///'
            try
            {
                _statusCode = Populate_GetHeader_InputParamerters(ref inputParameters, ref deviceTokenEntry);

                if (_statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn(string.Format(":{0}: Failed while calling the method Populate_GetHeader_InputParameters :" + " Status Code Returned is... :{1}:", methodBaseName, _statusCode));
                    }
                    return _statusCode;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Warn(string.Format(":{0} Exception thrown while calling Pick Plan" + " Populate_GetHeader_InputParameters is... :{1}:", methodBaseName, ex.ToString()));
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
            ///// End Of Populating Get Header Input Parameteres. ///'

            ///// Populating Get Header Output Parameteres. ///'
            try
            {
                _statusCode = Populate_GetHeader_OutPutParameters(ref outputParameters, ref deviceTokenEntry);
                if (_statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn(string.Format(":{0}: Failed while calling the method Populate_GetHeader_OutPutParameters :" + " Status Code Returned is... :{1}:", methodBaseName, _statusCode));
                    }
                    return _statusCode;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Warn(string.Format(":{0}: Exception thrown while calling Populate_GetHeader_OutputParameters is... :{1}:", methodBaseName, ex.ToString()));
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
            ///// End Of Populating Get Header Output Parameteres. ///'

            ///// Populating Get Header Pre requisits. ///'
            try
            {
                _statusCode = Populate_GetHeader_Prerequisits(ref inputParameters, ref deviceTokenEntry);

                if (_statusCode == AtparStatusCodes.S_ALLOCATELOCREQUIRED)
                {
                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn(string.Format(":{0}: No Locations Allocated : Status Code Returned :{1}:", methodBaseName, _statusCode));
                    }
                    return _statusCode;
                }
                else if (_statusCode == AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS)
                {
                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn(string.Format(":{0}: No Business Units Allocated : Status Code Returned :{1}:", methodBaseName, _statusCode));
                    }
                    return _statusCode;
                }
                else if (_statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn(string.Format(":{0}: Failed while calling the method Populate_GetHeader_Prerequisites :" + " Status Code Returned is... :{1}:", methodBaseName, _statusCode));
                    }
                    return _statusCode;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(string.Format(":{0}: Exception thrown while executing Populate_GetHeader_Prerequisites is... :{1}:", methodBaseName, ex.ToString()));
                }
                return AtparStatusCodes.E_SERVERERROR;
            }

            return AtparStatusCodes.ATPAR_OK;
        }

        private long Populate_GetHeader_OutPutParameters(ref DataSet outParameters, ref string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                ///// Output table creation. ///'
                DataTable _dtOutPut = null;
                try
                {
                    _dtOutPut = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Pick_OP_Header_Details_Defns, AtParWebEnums.DataSet_Type.OUTPUT.ToString());
                    outParameters.Tables.Add(_dtOutPut);
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(string.Format(":{0}: Failed to create OUTPUT table :{1}:", methodBaseName, ex.ToString()));
                    }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(string.Format(":{0}: Exception thrown is... :{1}:", methodBaseName, ex.ToString()));
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private long Populate_GetHeader_Prerequisits(ref DataSet inputParameters, ref string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                string _strBUnit = string.Empty;

                SortedList<string, string> _orgParams = null;
                SortedList<string, string> _userParams = null;
                string _strRemoteSchema = string.Empty;
                string _strRemoteDB = string.Empty;

                DataRow _drPreReq = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                _strRemoteDB = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (string.IsNullOrEmpty(_strRemoteDB))
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(string.Format(":{0}: Not a Valid RemoteDBType. :", methodBaseName));
                    }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                _strRemoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                         x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (string.IsNullOrEmpty(_strRemoteSchema))
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(string.Format(":{0}: Not a valid Remote Schema. :", methodBaseName));
                    }
                }

                _drPreReq[(int)AtParWebEnums.Get_Pick_IP_Header_Pre_Req_Enum.REMOTE_DATABASE] = _strRemoteDB;
                _drPreReq[(int)AtParWebEnums.Get_Pick_IP_Header_Pre_Req_Enum.REMOTE_SCHEMA] = _strRemoteSchema;

                try
                {
                    ///// Getting Org Parameters. ///'
                    _orgParams = new SortedList<string, string>();
                    _orgParams[AtParWebEnums.AppParameters_Enum.LOCATION_ALLOCATION.ToString()] = string.Empty;
                    _orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_PRIORITY.ToString()] = string.Empty;
                    _orgParams[AtParWebEnums.AppParameters_Enum.LIMIT_OF_LISTS.ToString()] = string.Empty;
                    _orgParams[AtParWebEnums.AppParameters_Enum.CHECK_PLANS_SENT.ToString()] = string.Empty;
                    _orgParams[AtParWebEnums.AppParameters_Enum.PICK_ALLOC_STORAGE_LOC_REQ.ToString()] = string.Empty;
                    _orgParams[AtParWebEnums.AppParameters_Enum.PICK_MULT_USERS_DOWNLOAD_PLAN.ToString()] = string.Empty;

                    _commonRepo.GetOrgGroupParamValues(_orgParams, (int)AtParWebEnums.EnumApps.PickPlan, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString());



                    ///// Getting User Parameters. ///'
                    _userParams = new SortedList<string, string>();
                    _userParams[AtParWebEnums.AppParameters_Enum.DEFAULT_PICKUP_BUNIT.ToString()] = string.Empty;

                    _commonRepo.GetUserParamValues(_userParams, (int)AtParWebEnums.EnumApps.PickPlan, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());



                    _drPreReq[(int)AtParWebEnums.Get_Pick_IP_Header_Pre_Req_Enum.LOCATION_ALLOCATION] = _orgParams[AtParWebEnums.AppParameters_Enum.LOCATION_ALLOCATION.ToString()];
                    _drPreReq[(int)AtParWebEnums.Get_Pick_IP_Header_Pre_Req_Enum.DEFAULT_PRIORITY] = _orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_PRIORITY.ToString()];
                    _drPreReq[(int)AtParWebEnums.Get_Pick_IP_Header_Pre_Req_Enum.LIMIT_OF_LISTS] = _orgParams[AtParWebEnums.AppParameters_Enum.LIMIT_OF_LISTS.ToString()];
                    _drPreReq[(int)AtParWebEnums.Get_Pick_IP_Header_Pre_Req_Enum.CHCK_PLANS_SENT] = _orgParams[AtParWebEnums.AppParameters_Enum.CHECK_PLANS_SENT.ToString()];
                    _drPreReq[(int)AtParWebEnums.Get_Pick_IP_Header_Pre_Req_Enum.DEFAULT_BUNIT] = _userParams[AtParWebEnums.AppParameters_Enum.DEFAULT_PICKUP_BUNIT.ToString()];
                    _drPreReq[(int)AtParWebEnums.Get_Pick_IP_Header_Pre_Req_Enum.PICK_ALLOC_STORAGE_LOC_REQ] = _orgParams[AtParWebEnums.AppParameters_Enum.PICK_ALLOC_STORAGE_LOC_REQ.ToString()];
                    _drPreReq[(int)AtParWebEnums.Get_Pick_IP_Header_Pre_Req_Enum.PICK_MULT_USERS_DOWNLOAD_PLAN] = _orgParams[AtParWebEnums.AppParameters_Enum.PICK_MULT_USERS_DOWNLOAD_PLAN.ToString()];
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(string.Format(":{0}: Exception thrown is... :{1}:", methodBaseName, ex.ToString()));
                    }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(_drPreReq);

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(methodBaseName + ex.ToString());
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private long Populate_GetHeader_InputParamerters(ref DataSet inputParameters, ref string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                DataTable _dtPreReq = null;
                DataTable _dtOrderPrefix = null;
                DataTable _dtLocBusinessUnit = null;
                DataTable _dtExcludeOrders = null;
                DataTable _dtInvBUnits = null;

                try
                {
                    ///// Input table creation. ///'
                    _dtPreReq = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Pick_IP_Header_Pre_Req_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());
                    inputParameters.Tables.Add(_dtPreReq);

                    _dtOrderPrefix = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Pick_IP_Header_Order_Prefix_Defns, AtParWebEnums.DataSet_Type.ORDER_PREFIX.ToString());
                    inputParameters.Tables.Add(_dtOrderPrefix);

                    _dtLocBusinessUnit = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Pick_IP_Header_Location_BusinessUnit_Defns, AtParWebEnums.DataSet_Type.LOCATION_BUSINESSUNIT.ToString());
                    inputParameters.Tables.Add(_dtLocBusinessUnit);

                    _dtExcludeOrders = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Pick_IP_Header_Exclude_Orders_Defns, AtParWebEnums.DataSet_Type.EXCLUDE_ORDERS.ToString());
                    inputParameters.Tables.Add(_dtExcludeOrders);

                    _dtInvBUnits = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Pick_IP_Header_Inventory_BusinessUnits_Defns, AtParWebEnums.DataSet_Type.INVENTORY_BUSINESSUNITS.ToString());
                    inputParameters.Tables.Add(_dtInvBUnits);
                    ///// End of Input table creation and adding to input Dataset. ///'

                    return AtparStatusCodes.ATPAR_OK;
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(string.Format(":{0}: Failed to Populate InputParameters Datatable. Exception... :{1}:", methodBaseName, ex.ToString()));
                    }
                    return AtparStatusCodes.E_SERVERERROR;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(string.Format(":{0}: Exception thrown is... :{1}:", methodBaseName, ex.ToString()));
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private long Execute_GetHeader_ProcessTasks(DataSet inputParameters, ref DataSet outputParameters, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string _strSQL = string.Empty;
            string _strPro = string.Empty;
            long _statusCode = -1;
            StringBuilder _strLBUnit = new StringBuilder();

            DataTable pdtFinList = new DataTable();

            try
            {

                if (_log.IsDebugEnabled)
                {
                    _log.Debug(string.Format(":{0}: Calling Remote Object :", methodBaseName));
                }

                string _erpObjName = null;

                try
                {
                    List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                    List<string> lstParameters = new List<string>();
                    lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());
                    lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISEVERSION.ToString());
                    lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                    var remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                              x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString()) //REMOTEDBCONNECTION.SCHEMA.ToString()
                                                              .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    _erpObjName = AtParWebEnums.EnumApps.PickPlan.ToString() + "_" + remoteSchema;

                    if (string.IsNullOrEmpty(_erpObjName))
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(string.Format(":{0}: Not a valid Erp Object Name :", methodBaseName));
                        }
                        return AtparStatusCodes.E_SERVERERROR;
                    }


                    string _strErpVersion = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                         x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISEVERSION.ToString())
                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug("ERP Version : " + _strErpVersion);
                    }

                    if ((_strErpVersion.IndexOf("8.0") + 1) != 0)
                    {
                        _erpObjName = "PickPlan_PeopleSoft80";
                    }

                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug(string.Format(":{0}: Calling Remote Object :", methodBaseName));
                    }

                    var tupleResult = ERPGetHeader(_erpObjName, inputParameters, outputParameters, deviceTokenEntry);
                    outputParameters = tupleResult.Item2;
                    _statusCode = tupleResult.Item1;

                    if (_statusCode == AtparStatusCodes.E_NORECORDFOUND)
                    {
                        if (_log.IsWarnEnabled)
                        {
                            _log.Warn(string.Format(":{0}: No Record Found :{1}", methodBaseName, _statusCode));
                        }
                        return _statusCode;
                    }
                    else if (_statusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                        {
                            _log.Fatal(string.Format(":{0}: Error while calling remote object. Status Code Returned is... :{1}:", methodBaseName, _statusCode));
                        }
                        return _statusCode;
                    }

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                    {
                        _log.Fatal(string.Format(":{0}: Exception thrown while calling remote object is... {1}{2}:", methodBaseName, Environment.NewLine, ex.ToString()));
                    }
                    return AtparStatusCodes.E_SERVERERROR;
                }

                if (_log.IsDebugEnabled)
                {
                    _log.Debug(string.Format(":{0}: After Calling Remote GetHeader method :", methodBaseName));
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(string.Format(":{0}: Exception thrown is... :{1}: ", methodBaseName, ex.ToString()));
                }
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private Tuple<long, DataSet> ERPGetHeader(string erpObjName, DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                //GetConfigData();
                MethodInfo MethodName = null;
                object reflectObject = null;

                var className = "GetHeader";
                var methodName = "GetHeader";

                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, outputParameters, deviceTokenEntry };

                var statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "ERPGetHeaders getting failed from ERP")); }
                    return new Tuple<long, DataSet>(statusCode, null);
                }
                outputParameters = (DataSet)args[1];

                return new Tuple<long, DataSet>(statusCode, outputParameters);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }

                return new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
            }
        }

        //private void GetConfigData()
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Globals.EXCEPTION, ex.ToString())); }
        //        throw ex;
        //    }

        //}
    }
}
