using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Common.Service
{
    public static class DataSetExtensions
    {       
        public static void PrintDatasetStatistics(this DataSet dataset, ILog _log, 
                                    string[] deviceTokenEntry, string logMsgMode = "")
        {
           
            var callingMethod =  System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(callingMethod); }

            string strMsg = string.Empty;
            strMsg = callingMethod;
            DisplaylogMsg(logMsgMode, strMsg, _log);

            string strHeading = null;
            strHeading = "Column Name ".PadRight(40) + "-" + " Value ".PadRight(40) + "-";

            try
            {
                strMsg = callingMethod + System.Environment.NewLine + "Number of Tables in Dataset:" + dataset.Tables.Count;
                DisplaylogMsg(logMsgMode, strMsg, _log);

                if (dataset.Tables.Count > 0)
                {
                    for (int iTableNum = 0; iTableNum <= dataset.Tables.Count - 1; iTableNum++)
                    {
                        StringBuilder sbDebugDetails = new StringBuilder();

                        var _with1 = dataset.Tables[iTableNum];
                        sbDebugDetails.AppendLine(":Table Name:" + _with1.TableName + " And Total No. of Rows are :" + _with1.Rows.Count + ":");

                        if (_with1.Rows.Count > 0)
                        {
                            for (int iTableRow = 0; iTableRow <= _with1.Rows.Count - 1; iTableRow++)
                            {
                                sbDebugDetails.AppendLine("Row : " + (iTableRow + 1).ToString());

                                sbDebugDetails.AppendLine(strHeading);

                                for (int iTableColumn = 0; iTableColumn <= _with1.Columns.Count - 1; iTableColumn++)
                                {
                                    sbDebugDetails.AppendLine(_with1.Columns[iTableColumn].Caption.PadRight(40) + "-" + " :" + _with1.Rows[iTableRow][iTableColumn].ToString() + ":");
                                }

                            }
                        }
                        else
                        {
                            strMsg = callingMethod + ":No Rows in Table:" + _with1.TableName;
                            DisplaylogMsg(logMsgMode, strMsg, _log);
                        }
                        strMsg = System.Environment.NewLine + sbDebugDetails.ToString();
                        DisplaylogMsg(logMsgMode, strMsg, _log);
                    }
                }
                else
                {
                    strMsg = callingMethod + ":No Tables in DataSet:";
                    DisplaylogMsg(logMsgMode, strMsg, _log);
                }
                 
            }
            catch (Exception ex)
            {
                if (_log.IsDebugEnabled)
                    _log.Debug(callingMethod + ":Error while Printing InputParameters :" + ex.ToString());
                throw ex;
            }
        }
        public static void DisplaylogMsg(string logMsgMode, string logMsg, ILog _log)
        {
           
            var callingMethod = System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(callingMethod); }

            try
            {

                if (string.IsNullOrEmpty(logMsgMode))
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(logMsg);


                }
                else if (logMsgMode == AtParWebEnums.Log_Msg_Mode.FATAL.ToString())
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(logMsg);


                }
                else if (logMsgMode == AtParWebEnums.Log_Msg_Mode.INFO.ToString())
                {
                    if (_log.IsInfoEnabled)
                        _log.Info(logMsg);


                }
                else if (logMsgMode == AtParWebEnums.Log_Msg_Mode.WARN.ToString())
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(logMsg);


                }
                else
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(logMsg);

                }


            }
            catch (Exception ex)
            {
                logMsg = callingMethod + ":Error while Printing InputParameters :" + ex.ToString();

                if (string.IsNullOrEmpty(logMsgMode))
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(logMsg);


                }
                else if (logMsgMode == AtParWebEnums.Log_Msg_Mode.FATAL.ToString())
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(logMsg);


                }
                else if (logMsgMode == AtParWebEnums.Log_Msg_Mode.INFO.ToString())
                {
                    if (_log.IsInfoEnabled)
                        _log.Info(logMsg);


                }
                else if (logMsgMode == AtParWebEnums.Log_Msg_Mode.WARN.ToString())
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(logMsg);


                }
                else
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(logMsg);

                }
            }

        }
        public static void CreateInputParametersDataset(this DataSet dataset, 
                                                string[,] tableDefn, string tableType)
        {
            DataTable _dt;
           
            try
            {
                _dt = AtPar.Common.ApplicationDataSetDefns.CreateAtParTableDefn(tableDefn, tableType);

                dataset.Tables.Add(_dt);                 
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public static long Check_GetDetails_InputParameters(this DataSet inputParameters, 
                                                 string[] deviceTokenEntry, ILog _log)
        {

        
            var callingMethod = System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(callingMethod); }
            

            try
            {
                // Printing InPut DataSet 
                if (_log.IsDebugEnabled)
                {
                    try
                    {
                        inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);
                       
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(callingMethod + "Error while calling PrintDatasetStatistics :" + ex.ToString());
                        return AtparStatusCodes.E_SERVERERROR;
                    }
                }
                //End of Printing InPut DataSet 

                // check if the right number of tables are in there
                if (inputParameters.Tables.Count != 1)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(callingMethod + " Incorrect InputParameters DataTable Count " + inputParameters.Tables.Count);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(callingMethod + " row count is ... :" + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count.ToString() +
                                ": for Cart :" + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.Send_Cart_Header_Enum.CART_ID] + ":");
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(" Exception thrown in " + callingMethod + " is... " + ex.ToString());
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }

        }

    }
}
