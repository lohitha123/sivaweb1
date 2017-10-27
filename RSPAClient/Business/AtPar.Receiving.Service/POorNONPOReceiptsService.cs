using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Receiving;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.Receiving;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using BarcodeDefns;
using log4net;
using ReportPrinting;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Drawing.Printing;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace AtPar.Receiving.Service
{
    public class POorNONPOReceiptsService : IPOorNONPOReceiptsService
    {
        #region Private Variable

        IPOorNONPOReceiptsRepository _poNonPoRepo;
        ILog _log;
        ICommonRepository _commonRepo;
        ICommonService _commonService;
        BarcodeDefns.BarcodeDefns barcodedef = new BarcodeDefns.BarcodeDefns();
        PocketNiceEngine.IEngine PNE = null;
        PocketNiceEngine.IOutput pneOutput;
        PocketNiceEngine.ILabel pneLabel;
        string m_strTableName = string.Empty;
        int ASN_DEVIATION = 1;
        int lineNum = 1;
        int PrevColumnspan = 0;
        int PrintColumns = 0;
        ArrayList strAllowedSpnColmnsLst = new ArrayList();
     

        #endregion

        #region Constructor
        public POorNONPOReceiptsService(ILog log, ICommonRepository commonRepository, IPOorNONPOReceiptsRepository repository, ICommonService commonService)
        {
            _poNonPoRepo = repository;
            _log = log;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _log.SetLoggerType(typeof(POorNONPOReceiptsService));
            GetConfigData();
        }

        #endregion

        #region PrintNiceLabel
        public AtParWebApiResponse<long> PrintNiceLabel(string printerAddressOrName, string printerPort, string printerTye,
            string niceLabelName, string noOfPrints, string errMsg, List<VM_PRINTLABEL_RECEIVE_HEADER> lstprintDetails,
            string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            var response = new AtParWebApiResponse<long>();
            string strLblFileName = string.Empty;



            try
            {
                if (lstprintDetails != null && lstprintDetails.Count > 0)
                {
                    //Converting list to DataSet

                    DataSet dsprintDetails = new DataSet();
                    DataTable dtprintDetails = new DataTable();
                    dtprintDetails = lstprintDetails.ToDataTable();
                    dsprintDetails.Tables.Add(dtprintDetails);

                    if (_log.IsDebugEnabled)
                    {
                        try
                        {
                            //DataSetExtensions.PrintDatasetStatistics(dsprintDetails, _log, deviceTokenEntry);
                            dsprintDetails.PrintDatasetStatistics(_log, deviceTokenEntry);
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + "Error while calling PrintDatasetStatistics :" + ex.ToString());
                        }
                    }

                    strLblFileName = AppDomain.CurrentDomain.BaseDirectory[0] + ":\\Atpar\\Labels\\" + niceLabelName + AtParDefns.LabelFileNameSuffix;

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "Print Label File Name : " + strLblFileName);

                    //Create and initialize Pocket Nice Engine

                    // don't try to reinitialize if the engine has already been created
                    if (PNE == null)
                    {
                        PNE = PocketNiceEngine.EngineClassFactory.CreateEngine();
                        PNE.Init();
                    }

                    if (PNE.IsDemo)
                    {
                        PNE.Registration("VA59334KVAVDYL798LK5LA76Y", "Srinivas Repala", "AtPar Inc");
                    }


                    pneLabel = PNE.OpenLabel(strLblFileName);


                    for (int i = 0; i <= dsprintDetails.Tables[0].Rows.Count - 1; i++)
                    {

                        Tuple<long, string> tpl = ProcessLabelVariables(dsprintDetails.Tables[0].Rows[i], errMsg);
                        long StatusCode = tpl.Item1;
                        errMsg = tpl.Item2;

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }

                        pneOutput = PocketNiceEngine.EngineClassFactory.CreateOutput();
                        pneOutput.Kind = PocketNiceEngine.OutputKindType.TcpIP;
                        pneOutput.SetTcpIp(printerAddressOrName, Convert.ToInt64(printerPort));
                        pneLabel.Output = pneOutput;
                        pneLabel.Print(noOfPrints);
                    }


                    if (pneLabel != null)
                    {
                        PNE.CloseLabel(pneLabel);
                        pneLabel = null;
                    }
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }

        }

        private Tuple<long, string> ProcessLabelVariables(DataRow data, string errMsg)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<long, string> tpl = null;

            try
            {
                int i = 0;
                string _data = string.Empty;
                while ((i != pneLabel.LabelVariables.Count))
                {
                    PocketNiceEngine.IPromptVariable labelVar = (PocketNiceEngine.IPromptVariable)pneLabel.LabelVariables.GetAt(i);
                    //  if the variable is not used, ignore the rule check
                    if (labelVar.IsUsed)
                    {
                        string _lblVarPrompt = labelVar.Prompt;
                        if (data.Table.Columns.Contains(labelVar.Name))
                        {
                            if (data[labelVar.Name] != null)
                            {
                                _data = data[labelVar.Name].ToString();
                            }

                        }
                        else
                        {
                            _data = String.Empty;
                        }

                        if ((_lblVarPrompt == AtParDefns.LABEL_PROMPT_BARCODE))
                        {
                            // 
                            //  Note: NO_LABEL_BARCODE_DATA_INDICATOR is used at this time because nicelabel doesn't support
                            //  removing(or not printing) a barcode variable if there's no data for it.
                            // if there's no data available for this barcode set the data to NO_LABEL_BARCODE_DATA_INDICATOR
                            if ((_data.Length == 0))
                            {
                                _data = AtparStatusCodes.NO_LABEL_BARCODE_DATA_INDICATOR;
                            }

                            if ((_data.Length > labelVar.Length))
                            {
                                if (_log.IsDebugEnabled)
                                    _log.Debug("PrintNiceLabel:ProcessLabelVariables :" + "Barcode " + labelVar.Name + " Data length: " + _data.Length + " too large");

                                errMsg = "Incorrect data length for field: " + labelVar.Name + " and value: " + _data;

                                tpl = new Tuple<long, string>(AtparStatusCodes.E_LABEL_DATA_LENGTH_ERROR, errMsg);
                                return tpl;
                            }

                            if (labelVar.DataFormat.IsDataOk(_data))
                            {
                                labelVar.Value = _data;
                            }
                            else
                            {

                                if (_log.IsDebugEnabled)
                                    _log.Debug("PrintNiceLabel:ProcessLabelVariables :" + "Incorrect Data Format: " + labelVar.Name + System.Environment.NewLine + "value :" + _data);

                                errMsg = "Incorrect label data for field: " + labelVar.Name + " and value: " + _data;
                                tpl = new Tuple<long, string>(AtparStatusCodes.E_LABEL_DATA_FORMAT_ERROR, errMsg);
                                return tpl;

                            }

                        }
                        else if ((_lblVarPrompt == AtParDefns.LABEL_PROMPT_IGNORE))
                        {
                            //  IGNORE prompts are used for all but the first LabelVariables of multiline sets
                            //  their values are populated within the case LABEL_PROMPT_MULTILINE block
                            i = (i + 1);
                            continue;
                            // TODO: Continue Do... Warning!!! not translated
                        }
                        else if (_lblVarPrompt.StartsWith(AtParDefns.LABEL_PROMPT_MULTILINE))
                        {
                            // parse prompt and get max number of lines
                            int _maxMultLines = int.Parse(_lblVarPrompt.Substring(AtParDefns.LABEL_PROMPT_MULTILINE.Length));
                            //  get the data name based on the label variable name (i.e. remove _1)
                            string _labelName = labelVar.Name.Substring(0, labelVar.Name.IndexOf(AtParDefns.LABEL_PROMPT_SEP));
                            _data = data[_labelName].ToString();
                            int _prevLoc = 0;
                            for (int _linenum = 1; (_linenum <= _maxMultLines); _linenum++)
                            {
                                //   size the data according to a label variable's length
                                PocketNiceEngine.IPromptVariable _multLabelVar = (PocketNiceEngine.IPromptVariable)pneLabel.LabelVariables[(_labelName
                                            + (AtParDefns.LABEL_PROMPT_SEP + _linenum))];
                                //  a rudimentary word wrap.. cut data to size, disregarding word completions
                                string _cutdata;
                                if ((_data.Length
                                            > (_prevLoc + _multLabelVar.Length)))
                                {
                                    _cutdata = _data.Substring(_prevLoc, _multLabelVar.Length);
                                    _prevLoc = (_prevLoc + _multLabelVar.Length);
                                    _multLabelVar.Value = _cutdata;
                                }
                                else
                                {
                                    _cutdata = _data.Substring(_prevLoc);
                                    _multLabelVar.Value = _cutdata;
                                    break;
                                }

                            }

                            _prevLoc = 0;
                            i = (i + 1);
                            continue;// Do... Warning!!! not translated
                        }
                        else
                        {
                            //  all other labelvars should have data truncated to labelvar.length
                            //  Dim _data As String = pData(labelVar.Name)
                            if ((_data.Length > labelVar.Length))
                            {
                                _data = _data.Substring(0, labelVar.Length);
                            }

                            //  TODO: this is probably not required for string data
                            if (labelVar.DataFormat.IsDataOk(_data))
                            {
                                labelVar.Value = _data;
                            }
                            else
                            {

                                if (_log.IsDebugEnabled)
                                    _log.Debug("PrintNiceLabel:ProcessLabelVariables :" + "Incorrect Data Format: " + labelVar.Name + System.Environment.NewLine + "value :" + _data);
                                errMsg = "Incorrect label data for field: " + labelVar.Name + " and value: " + _data;

                                tpl = new Tuple<long, string>(AtparStatusCodes.E_LABEL_DATA_FORMAT_ERROR, errMsg);
                                return tpl;

                            }

                        }

                    }

                    i = (i + 1);
                }

                tpl = new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, errMsg);
                return tpl;
            }
            catch (System.FormatException fex)
            {

                if (_log.IsDebugEnabled)
                    _log.Debug("PrintNiceLabel:ProcessLabelVariables :" + "Error Processing Variables" + fex.ToString());
                tpl = new Tuple<long, string>(AtparStatusCodes.E_MULTI_LINE_ERROR, errMsg);
                return tpl;


            }
            catch (Exception ex)
            {
                if (_log.IsDebugEnabled)
                    _log.Debug("PrintNiceLabel:ProcessLabelVariables :" + "Error Processing Variables" + ex.ToString());
                tpl = new Tuple<long, string>(AtparStatusCodes.E_PRINTERROR, errMsg);
                return tpl;
            }

        }


        //private long ProcessLabelVariables(DataRow pData, ref string pErrMsg)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        int i = 0;
        //        string _data = string.Empty;
        //        while ((i != pneLabel.LabelVariables.Count))
        //        {
        //            PocketNiceEngine.IPromptVariable labelVar = (PocketNiceEngine.IPromptVariable)pneLabel.LabelVariables.GetAt(i);
        //            //  if the variable is not used, ignore the rule check
        //            if (labelVar.IsUsed)
        //            {
        //                string _lblVarPrompt = labelVar.Prompt;
        //                if (pData.Table.Columns.Contains(labelVar.Name))
        //                {
        //                    if (pData[labelVar.Name] != null)
        //                    {
        //                        _data = pData[labelVar.Name].ToString();
        //                    }

        //                }
        //                else
        //                {
        //                    _data = String.Empty;
        //                }

        //                if ((_lblVarPrompt == AtParDefns.LABEL_PROMPT_BARCODE))
        //                {
        //                    // 
        //                    //  Note: NO_LABEL_BARCODE_DATA_INDICATOR is used at this time because nicelabel doesn't support
        //                    //  removing(or not printing) a barcode variable if there's no data for it.
        //                    // if there's no data available for this barcode set the data to NO_LABEL_BARCODE_DATA_INDICATOR
        //                    if ((_data.Length == 0))
        //                    {
        //                        _data = AtparStatusCodes.NO_LABEL_BARCODE_DATA_INDICATOR;
        //                    }

        //                    if ((_data.Length > labelVar.Length))
        //                    {
        //                        //if (log.IsDebugEnabled)
        //                        //{
        //                        //    log.Debug(("PrintNiceLabel:ProcessLabelVariables :" + ("Barcode "
        //                        //                    + (labelVar.Name + (" Data length: "
        //                        //                    + (_data.Length + " too large"))))));
        //                        //}

        //                        pErrMsg = ("Incorrect data length for field: "
        //                                    + (labelVar.Name + (" and value: " + _data)));
        //                        return AtparStatusCodes.E_LABEL_DATA_LENGTH_ERROR;

        //                    }

        //                    if (labelVar.DataFormat.IsDataOk(_data))
        //                    {
        //                        labelVar.Value = _data;
        //                    }
        //                    else
        //                    {
        //                        //if (log.IsDebugEnabled)
        //                        //{
        //                        //    log.Debug(("PrintNiceLabel:ProcessLabelVariables :" + ("Incorrect Data Format: "
        //                        //                    + (labelVar.Name + ("\r\n" + ("value :" + _data))))));
        //                        //}

        //                        // TO DO : Need to get the error message from DB
        //                        pErrMsg = ("Incorrect label data for field: "
        //                                    + (labelVar.Name + (" and value: " + _data)));
        //                        return AtparStatusCodes.E_LABEL_DATA_FORMAT_ERROR;

        //                    }

        //                }
        //                else if ((_lblVarPrompt == AtParDefns.LABEL_PROMPT_IGNORE))
        //                {
        //                    //  IGNORE prompts are used for all but the first LabelVariables of multiline sets
        //                    //  their values are populated within the case LABEL_PROMPT_MULTILINE block
        //                    i = (i + 1);
        //                    // TODO: Continue Do... Warning!!! not translated
        //                }
        //                else if (_lblVarPrompt.StartsWith(AtParDefns.LABEL_PROMPT_MULTILINE))
        //                {
        //                    // parse prompt and get max number of lines
        //                    int _maxMultLines = int.Parse(_lblVarPrompt.Substring(AtParDefns.LABEL_PROMPT_MULTILINE.Length));
        //                    //  get the data name based on the label variable name (i.e. remove _1)
        //                    string _labelName = labelVar.Name.Substring(0, labelVar.Name.IndexOf(AtParDefns.LABEL_PROMPT_SEP));
        //                    _data = pData[_labelName].ToString();
        //                    int _prevLoc = 0;
        //                    for (int _linenum = 1; (_linenum <= _maxMultLines); _linenum++)
        //                    {
        //                        //   size the data according to a label variable's length
        //                        PocketNiceEngine.IPromptVariable _multLabelVar = (PocketNiceEngine.IPromptVariable)pneLabel.LabelVariables[(_labelName
        //                                    + (AtParDefns.LABEL_PROMPT_SEP + _linenum))];
        //                        //  a rudimentary word wrap.. cut data to size, disregarding word completions
        //                        string _cutdata;
        //                        if ((_data.Length
        //                                    > (_prevLoc + _multLabelVar.Length)))
        //                        {
        //                            _cutdata = _data.Substring(_prevLoc, _multLabelVar.Length);
        //                            _prevLoc = (_prevLoc + _multLabelVar.Length);
        //                            _multLabelVar.Value = _cutdata;
        //                        }
        //                        else
        //                        {
        //                            _cutdata = _data.Substring(_prevLoc);
        //                            _multLabelVar.Value = _cutdata;
        //                            break;
        //                        }

        //                    }

        //                    _prevLoc = 0;
        //                    i = (i + 1);
        //                    // TODO: Continue Do... Warning!!! not translated
        //                }
        //                else
        //                {
        //                    //  all other labelvars should have data truncated to labelvar.length
        //                    //  Dim _data As String = pData(labelVar.Name)
        //                    if ((_data.Length > labelVar.Length))
        //                    {
        //                        _data = _data.Substring(0, labelVar.Length);
        //                    }

        //                    //  TODO: this is probably not required for string data
        //                    if (labelVar.DataFormat.IsDataOk(_data))
        //                    {
        //                        labelVar.Value = _data;
        //                    }
        //                    else
        //                    {
        //                        //if (log.IsDebugEnabled)
        //                        //{
        //                        //    log.Debug(("PrintNiceLabel:ProcessLabelVariables :" + ("Incorrect Data Format: "
        //                        //                    + (labelVar.Name + ("\r\n" + ("value :" + _data))))));
        //                        //}

        //                        pErrMsg = ("Incorrect label data for field: "
        //                                    + (labelVar.Name + (" and value: " + _data)));
        //                        return AtparStatusCodes.E_LABEL_DATA_FORMAT_ERROR;

        //                    }

        //                }

        //            }

        //            i = (i + 1);
        //        }

        //        return AtparStatusCodes.ATPAR_OK;
        //    }
        //    catch (System.FormatException fex)
        //    {
        //        //if (log.IsDebugEnabled)
        //        //{
        //        //    log.Debug(("PrintNiceLabel:ProcessLabelVariables :" + ("Multiline Variable prompt is not well formed" + fex.ToString)));
        //        //}

        //        return AtparStatusCodes.E_MULTI_LINE_ERROR;
        //    }
        //    catch (Exception ex)
        //    {
        //        //if (log.IsDebugEnabled)
        //        //{
        //        //    log.Debug(("PrintNiceLabel:ProcessLabelVariables :" + ("Error Processing Variables" + ex.ToString)));
        //        //}

        //        return AtparStatusCodes.E_PRINTERROR;
        //    }

        //}

        //private Tuple<long, string> ProcessLabelVariables(DataRow data, string errMsg)
        //{

        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    long StatusCode = -1;
        //    Tuple<long, string> tpl = null;
        //    try
        //    {
        //        int i = 0;
        //        string strData = string.Empty;

        //        for (i = 0; i <= pneLabel.LabelVariables.Count - 1; i++)
        //        {
        //            PocketNiceEngine.IPromptVariable labelVar = (PocketNiceEngine.IPromptVariable)pneLabel.LabelVariables.GetAt(i);

        //            // if the variable is not used, ignore the rule check

        //            if (labelVar.IsUsed)
        //            {
        //                string lblVarPrompt = labelVar.Prompt;

        //                if (data.Table.Columns.Contains(labelVar.Name))
        //                {
        //                    if (data[labelVar.Name] != null)
        //                    {
        //                        strData = data[labelVar.Name].ToString();
        //                    }
        //                }
        //                else
        //                {
        //                    strData = string.Empty;
        //                }


        //                if (lblVarPrompt == AtParDefns.LABEL_PROMPT_BARCODE)
        //                {

        //                    if (strData.Length == 0)
        //                    {
        //                        strData = AtparStatusCodes.NO_LABEL_BARCODE_DATA_INDICATOR;
        //                    }

        //                    if (strData.Length > labelVar.Length)
        //                    {
        //                        if (_log.IsDebugEnabled)
        //                            _log.Debug("PrintNiceLabel:ProcessLabelVariables :" + "Barcode " + labelVar.Name + " Data length: " + strData.Length + " too large");
        //                        errMsg = "Incorrect data length for field: " + labelVar.Name + " and value: " + strData;

        //                        tpl = new Tuple<long, string>(AtparStatusCodes.E_LABEL_DATA_LENGTH_ERROR, errMsg);
        //                        return tpl;
        //                    }

        //                    if (labelVar.DataFormat.IsDataOk(strData))
        //                    {
        //                        labelVar.Value = strData;
        //                    }
        //                    else
        //                    {
        //                        if (_log.IsDebugEnabled)
        //                            _log.Debug("PrintNiceLabel:ProcessLabelVariables :" + "Incorrect Data Format: " + labelVar.Name + System.Environment.NewLine + "value :" + strData);

        //                        errMsg = "Incorrect label data for field: " + labelVar.Name + " and value: " + strData;
        //                        tpl = new Tuple<long, string>(AtparStatusCodes.E_LABEL_DATA_FORMAT_ERROR, errMsg);
        //                        return tpl;
        //                    }
        //                }
        //                else if (lblVarPrompt == AtParDefns.LABEL_PROMPT_IGNORE)
        //                {

        //                    i = i + 1;
        //                    continue;

        //                }
        //                else if (lblVarPrompt.StartsWith(AtParDefns.LABEL_PROMPT_MULTILINE))
        //                {
        //                    //parse prompt and get max number of lines
        //                    int maxMultLines = int.Parse(lblVarPrompt.Substring(AtParDefns.LABEL_PROMPT_MULTILINE.Length));

        //                    // get the data name based on the label variable name (i.e. remove _1)
        //                    string labelName = labelVar.Name.Substring(0, labelVar.Name.IndexOf(AtParDefns.LABEL_PROMPT_SEP));

        //                    strData = data[labelName].ToString();

        //                    int _prevLoc = 0;

        //                    for (int linenum = 1; linenum <= maxMultLines; linenum++)
        //                    {
        //                        //  size the data according to a label variable's length

        //                        PocketNiceEngine.IPromptVariable multLabelVar = (PocketNiceEngine.IPromptVariable)pneLabel.LabelVariables[labelName + AtParDefns.LABEL_PROMPT_SEP + linenum];


        //                        // a rudimentary word wrap.. cut data to size, disregarding word completions
        //                        string cutdata = null;
        //                        if (strData.Length > _prevLoc + multLabelVar.Length)
        //                        {
        //                            cutdata = strData.Substring(_prevLoc, multLabelVar.Length);
        //                            _prevLoc = _prevLoc + multLabelVar.Length;
        //                            multLabelVar.Value = cutdata;
        //                        }
        //                        else
        //                        {
        //                            cutdata = strData.Substring(_prevLoc);
        //                            multLabelVar.Value = cutdata;
        //                            break; // TODO: might not be correct. Was : Exit For
        //                        }

        //                    }
        //                    _prevLoc = 0;
        //                    i = i + 1;
        //                    continue;
        //                    // all other labelvars should have data truncated to labelvar.length
        //                }
        //                else
        //                {
        //                    // Dim _data As String = pData(labelVar.Name)
        //                    if (strData.Length > labelVar.Length)
        //                        strData = strData.Substring(0, labelVar.Length);

        //                    // TODO: this is probably not required for string data
        //                    if (labelVar.DataFormat.IsDataOk(strData))
        //                    {
        //                        labelVar.Value = strData;
        //                    }
        //                    else
        //                    {
        //                        if (_log.IsDebugEnabled)
        //                            _log.Debug("PrintNiceLabel:ProcessLabelVariables :" + "Incorrect Data Format: " + labelVar.Name + System.Environment.NewLine + "value :" + strData);
        //                        errMsg = "Incorrect label data for field: " + labelVar.Name + " and value: " + strData;

        //                        tpl = new Tuple<long, string>(AtparStatusCodes.E_LABEL_DATA_FORMAT_ERROR, errMsg);
        //                        return tpl;

        //                    }

        //                }

        //            }

        //            i = i + 1;
        //        }
        //        tpl = new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, errMsg);
        //        return tpl;

        //    }
        //    //catch (System.FormatException fex)
        //    //{
        //    //    if (_log.IsDebugEnabled)
        //    //        _log.Debug("PrintNiceLabel:ProcessLabelVariables :" + "Multiline Variable prompt is not well formed" + fex.ToString());
        //    //    return AtparStatusCodes.E_MULTI_LINE_ERROR;
        //    //}
        //    catch (Exception ex)
        //    {
        //        if (_log.IsDebugEnabled)
        //            _log.Debug("PrintNiceLabel:ProcessLabelVariables :" + "Error Processing Variables" + ex.ToString());
        //        tpl = new Tuple<long, string>(AtparStatusCodes.E_PRINTERROR, errMsg);
        //        return tpl;

        //    }

        //}

        #endregion

        #region GetIUTDetails

        public AtParWebApiResponse<VM_PTWY_HEADER> GetIUTDetails(List<VM_IUT_HEADER> lstIUTHeader, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_PTWY_HEADER>();
            long StatusCode = -1;
            List<VM_PTWY_HEADER> lstHeader = new List<VM_PTWY_HEADER>();


            try
            {
                DataSet OutputParameter = new DataSet();

                Tuple<DataSet, long> tupleResult = GetIUTDetails_Implementation(lstIUTHeader, OutputParameter, deviceTokenEntry);

                if (tupleResult.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tupleResult.Item2, _commonRepo, _log);
                    return response;
                }

                // DataSet to List Conversion
                lstHeader = (from rw in OutputParameter.Tables[0].AsEnumerable()
                             select new VM_PTWY_HEADER()
                             {
                                 DESTIN_BU = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DESTIN_BU)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DESTIN_BU)].ToString(),
                                 ORIG_BU = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.ORIG_BU)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.ORIG_BU)].ToString(),
                                 INTERUNIT_ID = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.INTERUNIT_ID)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.INTERUNIT_ID)].ToString(),
                                 INTERUNIT_LINE = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.INTERUNIT_LINE)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.INTERUNIT_LINE)].ToString(),
                                 INV_ITEM_ID = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.INV_ITEM_ID)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.INV_ITEM_ID)].ToString(),
                                 STORAGE_AREA = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.STORAGE_AREA)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.STORAGE_AREA)].ToString(),
                                 STOR_LEVEL_1 = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.STOR_LEVEL_1)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.STOR_LEVEL_1)].ToString(),
                                 STOR_LEVEL_2 = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.STOR_LEVEL_2)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.STOR_LEVEL_2)].ToString(),
                                 STOR_LEVEL_3 = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.STOR_LEVEL_3)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.STOR_LEVEL_3)].ToString(),
                                 STOR_LEVEL_4 = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.STOR_LEVEL_4)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.STOR_LEVEL_4)].ToString(),
                                 QTY_SHIPPED = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.QTY_SHIPPED)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.QTY_SHIPPED)].ToString(),
                                 LAST_QTY_SHIP = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.LAST_QTY_SHIP)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.LAST_QTY_SHIP)].ToString(),
                                 DEST_SA = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DEST_SA)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DEST_SA)].ToString(),
                                 DEST_SL1 = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DEST_SL1)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DEST_SL1)].ToString(),
                                 DEST_SL2 = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DEST_SL2)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DEST_SL2)].ToString(),
                                 DEST_SL3 = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DEST_SL3)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DEST_SL3)].ToString(),
                                 DEST_SL4 = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DEST_SL4)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DEST_SL4)].ToString(),
                                 UNIT_MEASURE_SHIP = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.UNIT_MEASURE_SHIP)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.UNIT_MEASURE_SHIP)].ToString(),
                                 SHIP_DTTM = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.SHIP_DTTM)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.SHIP_DTTM)].ToString(),
                                 TRANSACTION_ID = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.TRANSACTION_ID)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.TRANSACTION_ID)].ToString(),
                                 DESCRIPTION = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DESCRIPTION)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.DESCRIPTION)].ToString(),
                                 UPC_ID = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.UPC_ID)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.UPC_ID)].ToString(),
                                 VENDOR_ITEM_ID = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.VENDOR_ITEM_ID)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.VENDOR_ITEM_ID)].ToString(),
                                 MFG_ITEM_ID = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.MFG_ITEM_ID)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.MFG_ITEM_ID)].ToString(),
                                 GTIN = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.GTIN)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.GTIN)].ToString(),
                                 SERIAL_FLAG = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.SERIAL_FLAG)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.SERIAL_FLAG)].ToString(),
                                 LOT_FLAG = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.LOT_FLAG)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.LOT_FLAG)].ToString(),
                                 QTY_RECEIVED = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.QTY_RECEIVED)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.QTY_RECEIVED)].ToString(),
                                 INV_LOT_ID = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.INV_LOT_ID)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.INV_LOT_ID)].ToString(),
                                 SERIAL_ID = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.SERIAL_ID)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.SERIAL_ID)].ToString(),
                                 PRICE = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.PRICE)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.PRICE)].ToString(),
                                 PACKAGING_STRING = rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.PACKAGING_STRING)] == null ? string.Empty : rw[((int)AtParWebEnums.GetIUT_ERP_Header_Enum.PACKAGING_STRING)].ToString(),
                             }).ToList();

                response.DataList = lstHeader;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }

        }

        public Tuple<DataSet, long> GetIUTDetails_Implementation(List<VM_IUT_HEADER> lstIUTHeader, DataSet outputParameter, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<DataSet, long> tupleResult = null;

            try
            {
                //HiPerfTimer _timer = new HiPerfTimer();
                //_timer.Start();

                //Converting list to DataSet

                DataSet inputParameters = new DataSet();
                DataTable dtinputParameters = new DataTable();
                dtinputParameters = lstIUTHeader.ToDataTable();
                inputParameters.Tables.Add(dtinputParameters);

                //Setting HeaderName Table1 to HEADERS

                inputParameters.Tables[0].TableName = AtParWebEnums.DataSet_Type.HEADERS.ToString();


                //Checking input Parameters

                StatusCode = Check_GetIUTHeader_InputParameters(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, long>(null, StatusCode);

                    return tupleResult;
                }


                //Preprocess Tasks

                Tuple<DataSet, DataSet, long> tpleResult1 = Execute_GetIUTHeader_PreProcessTasks(inputParameters, outputParameter, deviceTokenEntry);
                inputParameters = tpleResult1.Item1;
                outputParameter = tpleResult1.Item2;

                if (tpleResult1.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, long>(null, tpleResult1.Item3);

                    return tupleResult;
                }


                //Process Tasks

                tupleResult = Execute_GetIUTHeader_ProcessTasks(inputParameters, outputParameter, deviceTokenEntry);
                outputParameter = tupleResult.Item1;

                if (tupleResult.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, long>(null, tupleResult.Item2);

                    return tupleResult;
                }


                //PostProcess Tasks

                tupleResult = Execute_GetIUTHeader_PostProcessTasks(inputParameters, outputParameter, deviceTokenEntry);

                outputParameter = tupleResult.Item1;

                if (tupleResult.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, long>(null, tupleResult.Item2);

                    return tupleResult;
                }

                //_timer.Stop();
                //if (perflog.IsInfoEnabled)
                //    perflog.Info(methodBaseName + " " + _timer.Duration + " seconds");

                tupleResult = new Tuple<DataSet, long>(outputParameter, AtparStatusCodes.ATPAR_OK);
                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ":E_SERVERERROR: " + ex.ToString());
                tupleResult = new Tuple<DataSet, long>(outputParameter, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }
        }

        private long Check_GetIUTHeader_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {

                // Printing InPut DataSet 
                if (_log.IsDebugEnabled)
                {
                    //DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                    inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);

                    //StatusCode = PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);

                    //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //        _log.Fatal(methodBaseName + " Error occured in PrintDatasetStatistics. Status Code Returned is : " + StatusCode);
                    //    return StatusCode;
                    //}

                }

                // End of Printing InPut DataSet 

                if (inputParameters.Tables.Count != 1)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Incorrect DataTable Count " + inputParameters.Tables.Count);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Headers Rows count: " + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count.ToString());

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed which checking count of Headers : " + ex.ToString());

                return AtparStatusCodes.E_INVALIDPARAMETER;
            }

        }

        private Tuple<DataSet, DataSet, long> Execute_GetIUTHeader_PreProcessTasks(DataSet inputParameters, DataSet outputParameter, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = 0;
            Tuple<DataSet, DataSet, long> tplOutput = null;
            try
            {

                Tuple<DataSet, long> tplResult = null;

                tplResult = Populate_GetIUTHeader_InputParameters(inputParameters);

                inputParameters = tplResult.Item1;

                if (tplResult.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tplOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, AtparStatusCodes.E_SERVERERROR);

                    return tplOutput;
                }


                tplResult = Populate_GetIUTHeader_OutputParameters(outputParameter);
                outputParameter = tplResult.Item1;

                if (tplResult.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tplOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, AtparStatusCodes.E_SERVERERROR);

                    return tplOutput;

                }


                tplResult = Populate_GetIUTHeader_Prerequisites(inputParameters, deviceTokenEntry);

                inputParameters = tplResult.Item1;

                if (tplResult.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tplOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, AtparStatusCodes.E_SERVERERROR);

                    return tplOutput;
                }

                tplOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, AtparStatusCodes.ATPAR_OK);

                return tplOutput;



            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Populate_GetIUTHeader_Prerequisites failed " + System.Environment.NewLine + ex.ToString());

                tplOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, AtparStatusCodes.E_SERVERERROR);

                return tplOutput;

            }

        }

        private Tuple<DataSet, long> Populate_GetIUTHeader_InputParameters(DataSet inputParameters)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<DataSet, long> tupleResult = null;
            long StatusCode = -1;

            try
            {
                DataTable recvPreReq = new DataTable();
                DataTable inputListViewTable = new DataTable();

                //' Table to add Parameters
                try
                {
                    recvPreReq = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.GetIUT_Params_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Failed to create PREREQDATA table " + ex.ToString());
                    tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleResult;

                }

                try
                {
                    inputListViewTable = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.GetIUT_ListView_Params_Defns, AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString());
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Failed to create PREREQLISTVIEWPARAMS table " + ex.ToString());
                    tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleResult;
                }

                //' Add these tables to actual input parameters
                inputParameters.Tables.Add(recvPreReq);
                inputParameters.Tables.Add(inputListViewTable);

                tupleResult = new Tuple<DataSet, long>(inputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to populate prereq data with the exception... " + ex.ToString());
                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;
            }
        }

        private Tuple<DataSet, long> Populate_GetIUTHeader_OutputParameters(DataSet OutputParameter)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<DataSet, long> tupleResult = null;
            long StatusCode = -1;


            try
            {
                DataTable dtRecvOutputHeader = new DataTable();


                dtRecvOutputHeader = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.GetIUT_ERP_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());


                // Add these tables to actual input parameters
                OutputParameter.Tables.Add(dtRecvOutputHeader);

                tupleResult = new Tuple<DataSet, long>(OutputParameter, AtparStatusCodes.ATPAR_OK);

                return tupleResult;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to populate output parameters with the exception... " + ex.ToString());
                tupleResult = new Tuple<DataSet, long>(OutputParameter, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;
            }

        }

        private Tuple<DataSet, long> Populate_GetIUTHeader_Prerequisites(DataSet inputParameter, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<DataSet, long> tupleResult = null;
            long StatusCode = -1;

            string cancelTransID = string.Empty;
            string OrgGroupId = string.Empty;
            string profileId = string.Empty;
            SortedList<string, string> transIDStatus;
            SortedList<string, string> orgParams;
            SortedList<string, string> profParams;
            int appID = 0;
            bool blnPackagingString = false;
            string remoteDBType = "";
            string remoteSchema = "";

            try
            {

                try
                {
                    if (inputParameter.Tables.Count > 0)
                    {
                        if (inputParameter.Tables.Contains(AtParWebEnums.DataSet_Type.HEADERS.ToString()))
                        {
                            if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                            {
                                cancelTransID = inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.CANCEL_TRANSID.ToString()].ToString();

                                if (!string.IsNullOrEmpty(cancelTransID))
                                {
                                    transIDStatus = new SortedList<string, string>();
                                    transIDStatus[cancelTransID] = "0";

                                    if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.PRODUCT.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                                    {
                                        StatusCode = _commonRepo.GetTransactionStatus(transIDStatus, (int)AtParWebEnums.EnumApps.Receiving);
                                    }
                                    else
                                    {
                                        StatusCode = _commonRepo.GetTransactionStatus(transIDStatus, (int)AtParWebEnums.EnumApps.PutAway);
                                    }


                                    if (StatusCode == AtparStatusCodes.ATPAR_OK)
                                    {
                                        if (transIDStatus[cancelTransID] == AtParDefns.statDownloaded.ToString())
                                        {
                                            POCOEntities.AtPar_Transaction_Entity pTransactionDetails = new POCOEntities.AtPar_Transaction_Entity();


                                            pTransactionDetails.TransactionId = Convert.ToInt32(cancelTransID);

                                            if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.PRODUCT.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                                            {
                                                pTransactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.Receiving;
                                            }
                                            else
                                            {
                                                pTransactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.PutAway;
                                            }

                                            pTransactionDetails.Status = AtParDefns.statCancel;
                                            pTransactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                                            pTransactionDetails.StartDateTime = DateTime.Now;

                                            if (_log.IsDebugEnabled)
                                                _log.Debug(methodBaseName + ": Updating the Transaction( " + pTransactionDetails.TransactionId + " ) to Cancel ");

                                            StatusCode = _commonRepo.UpdateTransaction(pTransactionDetails);

                                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                            {
                                                if (_log.IsFatalEnabled)
                                                    _log.Fatal(methodBaseName + " Error while trying to update the Transaction to Cancel." + " Status Code Returned is : " + StatusCode);
                                                tupleResult = new Tuple<DataSet, long>(null, StatusCode);
                                                return tupleResult;
                                            }

                                            if (_log.IsDebugEnabled)
                                                _log.Debug(methodBaseName + ": Updated the Transaction( " + pTransactionDetails.TransactionId + " ) to Cancel ");
                                        }
                                    }
                                    else
                                    {
                                        if (_log.IsFatalEnabled)
                                            _log.Fatal(methodBaseName + " Error while getting the Transaction Status. Status Code Returned is: " + StatusCode);
                                        tupleResult = new Tuple<DataSet, long>(null, StatusCode);
                                        return tupleResult;
                                    }
                                    ///// End of Updating the transaction status to Cancel ///'
                                }
                            }
                            else
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "Invalid Parameters. Headers Table has no rows..");

                                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_INVALIDPARAMETER);
                                return tupleResult;
                            }
                        }
                        else
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + "Invalid Parameters. Input Parameters does'nt contain Headers Table.");
                            tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_INVALIDPARAMETER);
                            return tupleResult;

                        }
                    }
                    else
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + "Invalid Parameters. No Tables in Input Parameters.");
                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_INVALIDPARAMETER);
                        return tupleResult;
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Exception Thrown while getting the Transaction Id." + ex.ToString());

                    tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleResult;
                }
                ///// End of Getting Transaction Id and Update the Status to Cancel if it is in Downloaded Status ///'

                try
                {
                    orgParams = new SortedList<string, string>();


                    orgParams[AtParWebEnums.AppParameters_Enum.MULTI_IUT_DOWNLOAD.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()] = string.Empty;
                    orgParams[AtParWebEnums.AppParameters_Enum.PACKAGING_STRING_FOR_LABELS.ToString()] = string.Empty;


                    OrgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();

                    if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.PRODUCT.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                    {
                        appID = (int)AtParWebEnums.EnumApps.Receiving;
                    }
                    else
                    {
                        appID = (int)AtParWebEnums.EnumApps.PutAway;
                    }

                    _commonRepo.GetOrgGroupParamValues(orgParams, appID, OrgGroupId);

                    ///// Get Profile Parameters ///'
                    profParams = new SortedList<string, string>();
                    profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()] = string.Empty;
                    profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()] = string.Empty;

                    if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.PRODUCT.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                    {
                        appID = (int)AtParWebEnums.EnumApps.Receiving;
                    }
                    else
                    {
                        appID = (int)AtParWebEnums.EnumApps.PutAway;
                    }

                    profileId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString();


                    _commonRepo.GetProfileParamValues(profParams, appID, profileId);

                    try
                    {


                        blnPackagingString = false;
                        List<string> reqdParams = new List<string>();

                        if (inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.PRODUCT.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                        {
                            reqdParams = _commonRepo.GetListViewDetails(((int)AtParWebEnums.EnumApps.Receiving).ToString(), "IUT ITEMS", profileId);
                        }
                        else
                        {
                            reqdParams = _commonRepo.GetListViewDetails(((int)AtParWebEnums.EnumApps.PutAway).ToString(), "IUT ITEMS", profileId);
                        }


                        if (reqdParams != null)
                        {
                            if (!(reqdParams.Count > 0))
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " Screen Display Setup did not return any rows for screen name: IUT ITEMS" + " for Profile ID :" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString()
                                + ":");
                            }
                            else
                            {
                                foreach (var item in reqdParams)
                                {
                                    //switch ((AtParWebEnums.GetDetails_PutAway_ListView_Enum)Enum.Parse(typeof(AtParWebEnums.GetDetails_PutAway_ListView_Enum), item))
                                    //{
                                    //    case AtParWebEnums.GetDetails_PutAway_ListView_Enum.PACKAGING_STRING:
                                    //        blnPackagingString = true;
                                    //        break;
                                    //}

                                    switch (item.ToString())
                                    {
                                        case "PACKAGING_STRING":
                                            blnPackagingString = true;
                                            break;
                                    }
                                }
                            }
                        }

                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + " LISTVIEW DETAILS :: PackagingString :" + blnPackagingString);

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Failed to Populate ListView Parameters in PreRequisite data " + ex.ToString());
                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        return tupleResult;
                    }



                    DataRow drPreReq = inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();
                    DataRow drListViewParams = inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString()].NewRow();

                    //GetConfigData();
                    List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                    List<string> lstParameters = new List<string>();

                    lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                    lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());

                    lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                    remoteDBType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                    x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                                    .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                    if (string.IsNullOrEmpty(remoteDBType))
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + ": Not a valid RemoteDBType ");

                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        return tupleResult;
                    }

                    remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                      x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                      .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                    if (string.IsNullOrEmpty(remoteSchema))
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + ": Not a valid Remote Schema ");

                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        return tupleResult;
                    }

                    drPreReq[(int)AtParWebEnums.GetIUT_PreReqData_Enum.MULTI_IUT_DOWNLOAD] = orgParams[AtParWebEnums.AppParameters_Enum.MULTI_IUT_DOWNLOAD.ToString()];
                    drPreReq[(int)AtParWebEnums.GetIUT_PreReqData_Enum.ITEM_UPN_TYPE_CODE] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                    drPreReq[(int)AtParWebEnums.GetIUT_PreReqData_Enum.ITEM_NDC_TYPE_CODE] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];
                    drPreReq[(int)AtParWebEnums.GetIUT_PreReqData_Enum.SCHEMA_NAME] = remoteSchema;
                    drPreReq[(int)AtParWebEnums.GetIUT_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDBType;
                    drPreReq[(int)AtParWebEnums.GetIUT_PreReqData_Enum.DEFAULT_MFG_ITEM_ID] = orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                    drPreReq[(int)AtParWebEnums.GetIUT_PreReqData_Enum.ITEM_DESCR] = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                    drPreReq[(int)AtParWebEnums.GetIUT_PreReqData_Enum.ITEM_PRICE] = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];
                    drPreReq[(int)AtParWebEnums.GetIUT_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS] = orgParams[AtParWebEnums.AppParameters_Enum.PACKAGING_STRING_FOR_LABELS.ToString()];

                    drListViewParams[(int)AtParWebEnums.GetIUT_ListView_Enum.PACKAGING_STRING] = blnPackagingString;

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ": Got the following ListView details " + System.Environment.NewLine + "PACKAGING_STRING -:" + drListViewParams[(int)AtParWebEnums.GetIUT_ListView_Enum.PACKAGING_STRING] + System.Environment.NewLine);

                    inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(drPreReq);
                    inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString()].Rows.Add(drListViewParams);


                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Error occured while trying to read Org and Profile Parameters : " + ex.ToString());


                    tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleResult;
                }

                tupleResult = new Tuple<DataSet, long>(inputParameter, AtparStatusCodes.ATPAR_OK);
                return tupleResult;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Error occured in Getting PRERequisites : " + ex.ToString());
                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;
            }
        }

        public Tuple<DataSet, long> Execute_GetIUTHeader_ProcessTasks(DataSet inputParameters, DataSet OutputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            string cancelTransID = string.Empty;
            string strBUnit = string.Empty;
            string strIUTID = string.Empty;
            string chrMultiDownloadAccess = "";
            long StatusCode = -1;
            int count = 0;

            Tuple<DataSet, long> tupleOutput = null;

            try
            {

                if (inputParameters.Tables.Count > 0)
                {
                    if (inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.HEADERS.ToString()))
                    {
                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                        {
                            cancelTransID = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.CANCEL_TRANSID.ToString()].ToString();

                            strBUnit = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.BUSINESS_UNIT.ToString()].ToString();

                            strIUTID = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.IUT_ORDERNO.ToString()].ToString();

                            chrMultiDownloadAccess = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.GetIUT_PreReqData_Enum.MULTI_IUT_DOWNLOAD.ToString()].ToString();
                        }
                        else
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + ":E_INVALIDPARAMETER: " + " No Rows in Headers Table of Input Parameters " + ":");

                            tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_INVALIDPARAMETER);

                            return tupleOutput;

                        }
                    }
                    else
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + ":E_INVALIDPARAMETER: " + " No Headers Table Exists in Input Parameters " + ":");

                        tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_INVALIDPARAMETER);

                        return tupleOutput;
                    }
                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + ":E_INVALIDPARAMETER: " + " Incorrect DataTable Count " + ":" + inputParameters.Tables.Count);

                    tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_INVALIDPARAMETER);

                    return tupleOutput;
                }

                //To check if the IUT Orderis already downloaded by the same user

                if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.WEB).ToString() && string.IsNullOrEmpty(cancelTransID))
                {

                    int transactionID = _poNonPoRepo.CheckIfPoDownlodedForSameUser(strBUnit, strIUTID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());


                }




                StatusCode = CancelTransaction(cancelTransID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(), Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.PRODUCT.ToString()]), deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + ":" + StatusCode);

                    tupleOutput = new Tuple<DataSet, long>(null, StatusCode);

                    return tupleOutput;

                }




                ///// Check if any other User has downloaded the same PO ///'

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + ":After Checking and Cancelling the previous transactions:");

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.PRODUCT.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                {
                    count = _commonRepo.GetReceiveIDCount(strBUnit, strIUTID, deviceTokenEntry);

                }
                else
                {
                    count = _commonRepo.GetPutawayIDCount(strBUnit, strIUTID, deviceTokenEntry);
                }


                ///// End of Checking if any other User has downloaded the same PO ///'




                if (chrMultiDownloadAccess.ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() || (chrMultiDownloadAccess.ToString() == AtParWebEnums.YesNo_Enum.N.ToString()
                    && count == 0))
                {


                    tupleOutput = GetERPIUTDetails(inputParameters, OutputParameters, deviceTokenEntry);

                    if (tupleOutput.Item2 != AtparStatusCodes.ATPAR_OK)
                    {
                        if (tupleOutput.Item2 == AtparStatusCodes.E_NORECORDFOUND)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + "NO Records Found :" + tupleOutput.Item2);

                            tupleOutput = new Tuple<DataSet, long>(null, tupleOutput.Item2);
                            return tupleOutput;

                        }
                        else
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + "Failed to Get IUT Details  :" + StatusCode);
                            tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                            return tupleOutput;

                        }
                    }

                }
                else if (chrMultiDownloadAccess.ToString() == AtParWebEnums.YesNo_Enum.N.ToString() && count > 0)
                {
                    tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.ATPAR_E_IUT_LOCKEDBYOTHERUSER);
                    return tupleOutput;

                }
                tupleOutput = new Tuple<DataSet, long>(OutputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleOutput;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetIUTHeader_ProcessTasks failed " + System.Environment.NewLine + ex.ToString());
                tupleOutput = new Tuple<DataSet, long>(OutputParameters, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;

            }


        }
        private long CancelTransaction(string transID, string userID, int appID, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SortedList<string, string> transIDStatus;
            long StatusCode = -1;
            short transStatus = 0;

            try
            {
                if (!string.IsNullOrEmpty(transID))
                {
                    transIDStatus = new SortedList<string, string>();
                    transIDStatus[transID] = "0";

                    StatusCode = _commonRepo.GetTransactionStatus(transIDStatus, appID);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " Error " + StatusCode + " getting status for " + transID);
                        return StatusCode;
                    }
                    transStatus = Convert.ToInt16(transIDStatus[transID]);
                    ///// End of Getting Transaction Status ///'


                    ///// Update Transaction Status to Cancel if the status is Downloaded. ///'
                    if (transStatus.ToString() == AtParWebEnums.AppTransactionStatus.Downloaded.ToString())
                    {


                        POCOEntities.AtPar_Transaction_Entity transactionDetails = new POCOEntities.AtPar_Transaction_Entity();

                        transactionDetails.TransactionId = Convert.ToInt32(transID);
                        transactionDetails.ApplicationId = appID;
                        transactionDetails.Status = Convert.ToInt32(AtParWebEnums.AppTransactionStatus.Cancel);
                        transactionDetails.UserId = userID;
                        transactionDetails.StartDateTime = DateTime.Now;

                        StatusCode = _commonRepo.UpdateTransaction(transactionDetails);

                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + ": Updating Transaction (" + transID + ") to Cancel.");

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + ": Updating Transaction failed for Transaction id... " + transID + "  and " + " returned status code :" + StatusCode);
                            return StatusCode;
                        }
                        else
                        {
                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + ": Successfully Updated Transaction for Transaction id " + transID);
                        }

                    }
                    ///// End of Updating Transaction Status to Cancel ///'
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ":E_SERVERERROR: " + ex.ToString() + ":");
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private Tuple<DataSet, long> GetERPIUTDetails(DataSet inputParameters, DataSet OutputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            //DataSet OutputParameters = new DataSet();
            Tuple<DataSet, long> tupleOutput = null;

            try
            {


                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                //GetConfigData();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.GetIUT_Header_Enum.PRODUCT].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                {

                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.PutAway.ToString() + "_" + erpObjName;
                }


                if (string.IsNullOrEmpty(erpObjName))
                {

                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + ": Not a valid Erp Object Name ");

                    tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleOutput;
                }

                className = "GetIUTDetails";
                methodName = "GetIUTDetails";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, OutputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<DataSet, long>(null, StatusCode);
                    return tupleOutput;
                }

                OutputParameters = (DataSet)args[1];


                tupleOutput = new Tuple<DataSet, long>(OutputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;
            }
        }

        private void GetConfigData()
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                var objCls = new Utilities();
                objCls.InitializeAtParSystem();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public Tuple<DataSet, long> Execute_GetIUTHeader_PostProcessTasks(DataSet inputParameters, DataSet OutputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strIUTID = string.Empty;
            string strBUnit = string.Empty;

            long StatusCode = 0;
            long transId = -1;
            Tuple<DataSet, long> tupleOutput = null;

            try
            {

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.PRODUCT.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                {
                    transId = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.Receiving);
                }
                else
                {
                    transId = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.PutAway);
                }

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + ": Failed to get the Transaction Id from GetTransactionId with StatusCode :" + StatusCode);

                    tupleOutput = new Tuple<DataSet, long>(OutputParameters, StatusCode);
                    return tupleOutput;
                }
                else if (StatusCode == AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ": Populated Transaction Id is.. :" + transId + ":");
                }



                if (OutputParameters.Tables.Count > 0)
                {
                    if (OutputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.HEADERS.ToString()))
                    {
                        if (OutputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                        {
                            DataRow item = OutputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];

                            strIUTID = item[AtParWebEnums.GetIUT_ERP_Header_Enum.INTERUNIT_ID.ToString()].ToString();
                            strBUnit = item[AtParWebEnums.GetIUT_ERP_Header_Enum.DESTIN_BU.ToString()].ToString();
                        }
                        else
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + ":E_SERVERERROR: " + " No Rows in Headers Table of OutputParameters");
                            tupleOutput = new Tuple<DataSet, long>(OutputParameters, AtparStatusCodes.E_SERVERERROR);
                            return tupleOutput;

                        }
                    }
                    else
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + ":E_SERVERERROR: " + " Headers Table Doesn't exist in OutputParameters");
                        tupleOutput = new Tuple<DataSet, long>(OutputParameters, AtparStatusCodes.E_SERVERERROR);
                        return tupleOutput;
                    }
                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + ":E_SERVERERROR: " + "Invalid Output Parmeters Count : " + OutputParameters.Tables.Count);
                    tupleOutput = new Tuple<DataSet, long>(OutputParameters, AtparStatusCodes.E_SERVERERROR);
                    return tupleOutput;
                }

                OutputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_ERP_Header_Enum.TRANSACTION_ID.ToString()] = transId;



                POCOEntities.AtPar_Transaction_Entity objHdrTransEntity = new POCOEntities.AtPar_Transaction_Entity();

                objHdrTransEntity.TransactionId = Convert.ToInt32(transId);

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetIUT_Header_Enum.PRODUCT.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                {
                    objHdrTransEntity.ApplicationId = (int)AtParWebEnums.EnumApps.Receiving;
                }
                else
                {
                    objHdrTransEntity.ApplicationId = (int)AtParWebEnums.EnumApps.PutAway;
                }

                objHdrTransEntity.ID = strIUTID;
                objHdrTransEntity.BusinessUnit = strBUnit;
                objHdrTransEntity.Status = AtParDefns.statDownloaded;
                objHdrTransEntity.TotalRecordDownloaded = OutputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count;
                objHdrTransEntity.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                objHdrTransEntity.DeviceId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].ToString();
                objHdrTransEntity.DownloadUserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                objHdrTransEntity.ReportData8 = AtParDefns.IUT_RECEIVING.ToString();
                objHdrTransEntity.ReportData11 = "5";

                StatusCode = _commonRepo.InsertTransaction(objHdrTransEntity);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + ":InsertTransaction Failed");
                    tupleOutput = new Tuple<DataSet, long>(OutputParameters, StatusCode);
                    return tupleOutput;

                }
                tupleOutput = new Tuple<DataSet, long>(OutputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleOutput;


            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetIUTHeader_PostProcessTasks failed " + System.Environment.NewLine + ex.ToString());

                tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;

            }
        }

        #endregion
        
        #region GetHeader

        public AtParWebApiResponse<Dictionary<string, object>> GetHeader(List<VM_RECV_POHEADER> lstPoHeader, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<Dictionary<string, object>>();
            string outputXML = string.Empty;
            List<VM_RECV_SENDPOHEADER> lstHeader = null;
            List<VM_RECV_SENDLINEHEADER> lstLine = null;
            List<VM_RECV_ALTUOM> lstAltUom = null;
            List<VM_RECV_RECEIVER_IDS> lstReceiverIds = new List<VM_RECV_RECEIVER_IDS>();
            List<VM_RECALL_INFO> lstRecallItems = null;
            try
            {
                Tuple<long, string> tupleOutput = GetHeader_Implementation(lstPoHeader, outputXML, deviceTokenEntry);

                outputXML = tupleOutput.Item2;


                //Converting String XML to List
                if (!String.IsNullOrEmpty(outputXML))
                {
                    IEnumerable<VM_RECV_SENDPOHEADER> parsedHeaderData = ParseXmlToHeaderList(outputXML.ToString().Replace("&", "&amp;").Replace("$ $", string.Empty));
                    IEnumerable<VM_RECV_SENDLINEHEADER> parsedLineData = ParseXmlToLineList(outputXML.ToString().Replace("&", "&amp;").Replace("$ $", string.Empty));
                    IEnumerable<VM_RECV_ALTUOM> parsedALTUOMData = ParseXmlToAltUOMList(outputXML.ToString().Replace("&", "&amp;").Replace("$ $", string.Empty));
                    IEnumerable<VM_RECV_RECEIVER_IDS> parsedRecverIds = ParseXmlToRecverIdsList(outputXML.ToString().Replace("&", "&amp;").Replace("$ $", string.Empty));
                    IEnumerable<VM_RECALL_INFO> parsedRecallItems = ParseXmlToRecallList(outputXML.ToString().Replace("&", "&amp;").Replace("$ $", string.Empty));

                    if (parsedHeaderData != null)
                    {
                        //Converting Ienumerable to List
                        lstHeader = parsedHeaderData.ToList();
                    }
                    if (parsedLineData != null)
                    {
                        //Converting Ienumerable to List
                        lstLine = parsedLineData.ToList();

                    }
                    if (parsedALTUOMData != null)
                    {
                        //Converting Ienumerable to List
                        lstAltUom = parsedALTUOMData.ToList();
                    }
                    if (parsedRecverIds != null)
                    {
                        //Converting Ienumerable to List
                        lstReceiverIds = parsedRecverIds.ToList();
                    }
                    else
                    {
                        lstReceiverIds = new List<VM_RECV_RECEIVER_IDS>();
                    }
                    if (parsedRecallItems != null)
                    {
                        //Converting Ienumerable to List
                        lstRecallItems = parsedRecallItems.ToList();
                    }
                }

                response.StatusCode = tupleOutput.Item1;
                if (response.StatusCode == AtparStatusCodes.RECV_S_MULTIPLERECEIVERSEXISTS)
                {
                    response.DataDictionary = new Dictionary<string, object> { { "listHeaders", lstHeader }, { "listLines", lstLine }, { "lstAltUOM", lstAltUom }, { "lstReceiverIds", lstReceiverIds }, { "lstRecallItems", lstRecallItems } };
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }
                else if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }

                response.DataDictionary = new Dictionary<string, object> { { "listHeaders", lstHeader }, { "listLines", lstLine }, { "lstAltUOM", lstAltUom }, { "lstReceiverIds", lstReceiverIds }, { "lstRecallItems", lstRecallItems } };
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }

        }
        //Converting string to List
        public IEnumerable<VM_RECV_SENDPOHEADER> ParseXmlToHeaderList(string outputXMl)
        {
            IEnumerable<VM_RECV_SENDPOHEADER> result = null;
            try
            {

                XElement inputXmlData = XElement.Parse(outputXMl);
                result = from x in inputXmlData.Descendants("HEADER")
                         select new VM_RECV_SENDPOHEADER()
                         {
                             PO_DT = string.IsNullOrEmpty(GetValueFromXElement(x, "a")) ? string.Empty : Convert.ToDateTime(GetValueFromXElement(x, "a"), CultureInfo.InvariantCulture).ToString(AtParDefns.ATPAR_SHORTDATE) +
                                   " " + Convert.ToDateTime(DateTime.Now, CultureInfo.InvariantCulture).ToString(AtParDefns.ATPAR_SHORTTIME),
                             TRANSACTION_CODE = string.IsNullOrEmpty(GetValueFromXElement(x, "b")) ? string.Empty : GetValueFromXElement(x, "b"),
                             BUSINESS_UNIT_PO = GetValueFromXElement(x, "c"),
                             VENDOR_ID = string.IsNullOrEmpty(GetValueFromXElement(x, "d")) ? string.Empty : GetValueFromXElement(x, "d"),
                             VENDOR_NAME1 = string.IsNullOrEmpty(GetValueFromXElement(x, "e")) ? string.Empty : GetValueFromXElement(x, "e"),
                             SHIPMENT_NO = string.IsNullOrEmpty(GetValueFromXElement(x, "f")) ? string.Empty : GetValueFromXElement(x, "f"),
                             TRANSACTION_ID = Convert.ToInt32(GetValueFromXElement(x, "g")),
                             COMMENTS = string.IsNullOrEmpty(GetValueFromXElement(x, "h")) ? string.Empty : GetValueFromXElement(x, "h"),
                             RECEIVER_ID = string.IsNullOrEmpty(GetValueFromXElement(x, "i")) ? string.Empty : GetValueFromXElement(x, "i"),
                             PO_ID = string.IsNullOrEmpty(GetValueFromXElement(x, "j")) ? string.Empty : GetValueFromXElement(x, "j"),
                             DROP_SHIP_NAME = string.IsNullOrEmpty(GetValueFromXElement(x, "m")) ? string.Empty : GetValueFromXElement(x, "m"),
                             SHIP_ADDR1 = string.IsNullOrEmpty(GetValueFromXElement(x, "a1")) ? string.Empty : GetValueFromXElement(x, "a1"),
                             SHIP_ADDR2 = string.IsNullOrEmpty(GetValueFromXElement(x, "a2")) ? string.Empty : GetValueFromXElement(x, "a2"),
                             SHIP_ADDR3 = string.IsNullOrEmpty(GetValueFromXElement(x, "a3")) ? string.Empty : GetValueFromXElement(x, "a3"),
                             SHIP_ADDR4 = string.IsNullOrEmpty(GetValueFromXElement(x, "a4")) ? string.Empty : GetValueFromXElement(x, "a4"),
                             SHIP_ADDR5 = string.IsNullOrEmpty(GetValueFromXElement(x, "a5")) ? string.Empty : GetValueFromXElement(x, "a5"),
                             BUYER_ID = string.IsNullOrEmpty(GetValueFromXElement(x, "o")) ? string.Empty : GetValueFromXElement(x, "o"),
                             PHONE = string.IsNullOrEmpty(GetValueFromXElement(x, "p")) ? string.Empty : GetValueFromXElement(x, "p"),
                             INV_MTHD_CODE = string.IsNullOrEmpty(GetValueFromXElement(x, "k")) ? string.Empty : GetValueFromXElement(x, "k"),
                             DROP_SHIP_FL = string.IsNullOrEmpty(GetValueFromXElement(x, "l")) ? string.Empty : GetValueFromXElement(x, "l"),
                             STR_WARNING_CODE = string.IsNullOrEmpty(GetValueFromXElement(x, "w")) ? string.Empty : GetValueFromXElement(x, "w")
                         };

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
        public IEnumerable<VM_RECV_SENDLINEHEADER> ParseXmlToLineList(string pOutputXMl)
        {
            IEnumerable<VM_RECV_SENDLINEHEADER> result = null;
            try
            {


                XElement inputXmlData = XElement.Parse(pOutputXMl);
                result = from x in inputXmlData.Descendants("LINE")
                         select new VM_RECV_SENDLINEHEADER()
                         {
                             INV_ITEM_ID = string.IsNullOrEmpty(GetValueFromXElement(x, "a")) ? string.Empty : GetValueFromXElement(x, "a"),
                             STORAGE_LOCATION = string.IsNullOrEmpty(GetValueFromXElement(x, "SL")) ? string.Empty : GetValueFromXElement(x, "SL"),
                             ITM_ID_VNDR = string.IsNullOrEmpty(GetValueFromXElement(x, "b")) ? string.Empty : GetValueFromXElement(x, "b"),
                             MFG_ITEM_ID = string.IsNullOrEmpty(GetValueFromXElement(x, "c")) ? string.Empty : GetValueFromXElement(x, "c"),
                             DESCR = string.IsNullOrEmpty(GetValueFromXElement(x, "d")) ? string.Empty : GetValueFromXElement(x, "d").Replace("&amp;", "&"),
                             UPC_ID = string.IsNullOrEmpty(GetValueFromXElement(x, "e")) ? string.Empty : GetValueFromXElement(x, "e"),
                             INVENTORY_ITEM = string.IsNullOrEmpty(GetValueFromXElement(x, "f")) ? string.Empty : GetValueFromXElement(x, "f"),
                             COMMENTS = string.IsNullOrEmpty(GetValueFromXElement(x, "g")) ? string.Empty : GetValueFromXElement(x, "g"),
                             DUE_DT = string.IsNullOrEmpty(GetValueFromXElement(x, "h")) ? string.Empty : GetValueFromXElement(x, "h"),                            
                             RECEIVED_FLAG = AtParWebEnums.YesNo_Enum.N.ToString(),
                             SCHED_COUNT = 1,
                             SCHED_NBR = string.IsNullOrEmpty(GetValueFromXElement(x, "i")) ? 0 : Convert.ToInt32(GetValueFromXElement(x, "i")),
                             QTY_PO = string.IsNullOrEmpty(GetValueFromXElement(x, "j")) ? (float?)null : float.Parse(GetValueFromXElement(x, "j")),
                             LINE_PO_QTY = string.IsNullOrEmpty(GetValueFromXElement(x, "j")) ? (float?)null : float.Parse(GetValueFromXElement(x, "j")),
                             RECEIVED_QTY = string.IsNullOrEmpty(GetValueFromXElement(x, "k")) ? (float?)null : float.Parse(GetValueFromXElement(x, "k")),
                             UNIT_OF_MEASURE = string.IsNullOrEmpty(GetValueFromXElement(x, "l")) ? string.Empty : GetValueFromXElement(x, "l"),

                             ISSUE_UOM = string.IsNullOrEmpty(GetValueFromXElement(x, "Y")) ? string.Empty : GetValueFromXElement(x, "Y"),
                             CONVERSION_RATE = string.IsNullOrEmpty(GetValueFromXElement(x, "Z")) ? (int?)null : Convert.ToInt32(GetValueFromXElement(x, "Z")),

                             LOCATION = string.IsNullOrEmpty(GetValueFromXElement(x, "m")) ? string.Empty : GetValueFromXElement(x, "m"),
                             SHIPTO_ID = string.IsNullOrEmpty(GetValueFromXElement(x, "n")) ? string.Empty : GetValueFromXElement(x, "n"),
                             LINE_NBR = string.IsNullOrEmpty(GetValueFromXElement(x, "o")) ? 0 : Convert.ToInt32(GetValueFromXElement(x, "o")),
                             INSP_FLAG = string.IsNullOrEmpty(GetValueFromXElement(x, "p")) ? string.Empty : GetValueFromXElement(x, "p"),
                             LINE_QTY = string.IsNullOrEmpty(GetValueFromXElement(x, "q")) ? (float?)null : float.Parse(GetValueFromXElement(x, "q")),
                             QTY = string.IsNullOrEmpty(GetValueFromXElement(x, "q")) ? (float?)null : float.Parse(GetValueFromXElement(x, "q")),
                             ASN_QTY = string.IsNullOrEmpty(GetValueFromXElement(x, "q")) ? (float?)null : float.Parse(GetValueFromXElement(x, "q")),
                             BILL_OF_LADING = string.IsNullOrEmpty(GetValueFromXElement(x, "bol")) ? string.Empty : GetValueFromXElement(x, "bol"),
                             ASN_BILL_OF_LADING = string.IsNullOrEmpty(GetValueFromXElement(x, "bol")) ? string.Empty : GetValueFromXElement(x, "bol"),
                             QTY_RECV_TOL_PCT = string.IsNullOrEmpty(GetValueFromXElement(x, "r")) ? (float?)null : float.Parse(GetValueFromXElement(x, "r")),
                             DELIVER_TO = string.IsNullOrEmpty(GetValueFromXElement(x, "s")) ? string.Empty : GetValueFromXElement(x, "s"),

                             CUST_ITEM_NO = string.IsNullOrEmpty(GetValueFromXElement(x, "u")) ? GetValueFromXElement(x, "a") : GetValueFromXElement(x, "u"),
                             RECEIVING_ROUTING_ID = string.IsNullOrEmpty(GetValueFromXElement(x, "v")) ? string.Empty : GetValueFromXElement(x, "v"),
                             BIN_TRACK_FLAG = string.IsNullOrEmpty(GetValueFromXElement(x, "w")) ? string.Empty : GetValueFromXElement(x, "w"),
                             ALT_UOM = string.IsNullOrEmpty(GetValueFromXElement(x, "ALTUOM")) ? string.Empty : GetValueFromXElement(x, "ALTUOM"),
                             GTIN = string.IsNullOrEmpty(GetValueFromXElement(x, "GTIN")) ? string.Empty : GetValueFromXElement(x, "GTIN"),
                             LOT_CONTROLLED = string.IsNullOrEmpty(GetValueFromXElement(x, "LFLG")) ? string.Empty : GetValueFromXElement(x, "LFLG"),
                             SERIAL_CONTROLLED = string.IsNullOrEmpty(GetValueFromXElement(x, "SFLG")) ? string.Empty : GetValueFromXElement(x, "SFLG"),
                             RECAL_FLAG = string.IsNullOrEmpty(GetValueFromXElement(x, "RECAL_FLAG")) ? string.Empty : GetValueFromXElement(x, "RECAL_FLAG"),
                             ADDRESS1 = string.IsNullOrEmpty(GetValueFromXElement(x, "ADDR1")) ? string.Empty : GetValueFromXElement(x, "ADDR1"),
                             ADDRESS2 = string.IsNullOrEmpty(GetValueFromXElement(x, "ADDR2")) ? string.Empty : GetValueFromXElement(x, "ADDR2"),
                             ADDRESS3 = string.IsNullOrEmpty(GetValueFromXElement(x, "ADDR3")) ? string.Empty : GetValueFromXElement(x, "ADDR3"),
                             PHONE = string.IsNullOrEmpty(GetValueFromXElement(x, "PHONE")) ? string.Empty : GetValueFromXElement(x, "PHONE"),
                             REQ_NUM = string.IsNullOrEmpty(GetValueFromXElement(x, "REQ_NUM")) ? string.Empty : GetValueFromXElement(x, "REQ_NUM"),
                             PRICE = string.IsNullOrEmpty(GetValueFromXElement(x, "PRICE")) ? (float?)null : float.Parse(GetValueFromXElement(x, "PRICE")),
                             PACKAGING_STRING = string.IsNullOrEmpty(GetValueFromXElement(x, "PACKAGING_STRING")) ? string.Empty : GetValueFromXElement(x, "PACKAGING_STRING"),
                             BUILDING = string.IsNullOrEmpty(GetValueFromXElement(x, "BUILDING")) ? string.Empty : GetValueFromXElement(x, "BUILDING"),
                             FLOOR = string.IsNullOrEmpty(GetValueFromXElement(x, "FLOOR")) ? string.Empty : GetValueFromXElement(x, "FLOOR"),
                             SECTOR = string.IsNullOrEmpty(GetValueFromXElement(x, "SECTOR")) ? string.Empty : GetValueFromXElement(x, "SECTOR"),
                             REQUISITION_NAME = string.IsNullOrEmpty(GetValueFromXElement(x, "REQUISITION_NAME")) ? string.Empty : GetValueFromXElement(x, "REQUISITION_NAME"),
                             BUYER_NAME = string.IsNullOrEmpty(GetValueFromXElement(x, "BUYER_NAME")) ? string.Empty : GetValueFromXElement(x, "BUYER_NAME"),
                             LOC_DESCR = string.IsNullOrEmpty(GetValueFromXElement(x, "LOC_DESCR")) ? string.Empty : GetValueFromXElement(x, "LOC_DESCR")


                         };
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return result;
        }

        public IEnumerable<VM_RECV_ALTUOM> ParseXmlToAltUOMList(string pOutputXMl)
        {
            IEnumerable<VM_RECV_ALTUOM> result = null;
            try
            {

                XElement inputXmlData = XElement.Parse(pOutputXMl);
                var forRemoval = new List<XElement>();

                result = from x in inputXmlData.Descendants("LINE").Descendants("ALTUOM")
                         select new VM_RECV_ALTUOM()
                         {
                             LN_NBR = string.IsNullOrEmpty(GetValueFromXElement(x, "LN_NBR")) ? string.Empty : GetValueFromXElement(x, "LN_NBR"),
                             UOM = string.IsNullOrEmpty(GetValueFromXElement(x, "UOM")) ? string.Empty : GetValueFromXElement(x, "UOM"),
                             CONV_FACT = string.IsNullOrEmpty(GetValueFromXElement(x, "CONFAC")) ? string.Empty : GetValueFromXElement(x, "CONFAC")
                         };

            }
            catch (Exception ex)
            {

                throw ex;
            }
            return result;
        }

        public IEnumerable<VM_RECV_RECEIVER_IDS> ParseXmlToRecverIdsList(string pOutputXMl)
        {
            IEnumerable<VM_RECV_RECEIVER_IDS> result = null;
            try
            {

                XElement inputXmlData = XElement.Parse(pOutputXMl);
                var forRemoval = new List<XElement>();

                result = from x in inputXmlData.Descendants("RECEIVER_IDS").Descendants("RECORD")
                         select new VM_RECV_RECEIVER_IDS()
                         {
                             RECEIVERID = string.IsNullOrEmpty(GetValueFromXElement(x, "RECEIVERID")) ? string.Empty : GetValueFromXElement(x, "RECEIVERID"),
                             RECPT_DATE = string.IsNullOrEmpty(GetValueFromXElement(x, "RECPT_DATE")) ? string.Empty : GetValueFromXElement(x, "RECPT_DATE"),
                             INVOICE_NO = string.IsNullOrEmpty(GetValueFromXElement(x, "INVOICE_NO")) ? string.Empty : GetValueFromXElement(x, "INVOICE_NO"),
                             PACKSLIP_NO = string.IsNullOrEmpty(GetValueFromXElement(x, "PACKSLIP_NO")) ? string.Empty : GetValueFromXElement(x, "PACKSLIP_NO"),
                             RBFlAG = false
                         };

            }
            catch (Exception ex)
            {

                throw ex;
            }
            return result;
        }

        public IEnumerable<VM_RECALL_INFO> ParseXmlToRecallList(string pOutputXMl)
        {
            IEnumerable<VM_RECALL_INFO> result = null;
            try
            {

                XElement inputXmlData = XElement.Parse(pOutputXMl);
                var forRemoval = new List<XElement>();

                result = from x in inputXmlData.Descendants("RECALL_INFO").Descendants("ITEMS_INFO")
                         select new VM_RECALL_INFO()
                         {
                             ITEM_ID = string.IsNullOrEmpty(GetValueFromXElement(x, "ITEM_ID")) ? string.Empty : GetValueFromXElement(x, "ITEM_ID"),
                             LOT_NO = string.IsNullOrEmpty(GetValueFromXElement(x, "LOT_NO")) ? string.Empty : GetValueFromXElement(x, "LOT_NO"),
                             SERIAL_NO = string.IsNullOrEmpty(GetValueFromXElement(x, "SERIAL_NO")) ? string.Empty : GetValueFromXElement(x, "SERIAL_NO")

                         };

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;

        }

        //checking for null or empty
        public string GetValueFromXElement(XElement inputData, string nodeName)
        {
            try
            {
                var strSpace = (char)160;

                XElement ele = inputData.Element(nodeName);

                if (ele != null)
                {
                    if (string.IsNullOrEmpty(ele.Value))
                    {
                        return string.Empty;
                    }
                    else
                    {
                        if (ele.Value == "$ $")
                        {
                            ele.Value = strSpace.ToString();
                        }
                        return ele.Value.ToString();
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return string.Empty;
        }

        public Tuple<long, string> GetHeader_Implementation(List<VM_RECV_POHEADER> lstPoHeader, string OutputXML, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<long, string> tupleResult = null;

            try
            {
                //Converting list to DataSet

                DataSet inputParameters = new DataSet();
                DataTable dtinputParameters = new DataTable();
                dtinputParameters = lstPoHeader.ToDataTable();
                inputParameters.Tables.Add(dtinputParameters);

                //Setting HeaderName Table1 to HEADERS

                inputParameters.Tables[0].TableName = AtParWebEnums.DataSet_Type.HEADERS.ToString();

                //Checking input Parameters

                StatusCode = Check_GetHeader_InputParameters(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<long, string>(StatusCode, string.Empty);
                    return tupleResult;
                }


                //Preprocess Tasks
                DataSet outputParameter = new DataSet();
                Tuple<DataSet, DataSet, long> tupleOutput1 = null;
                tupleOutput1 = Execute_GetHeader_PreProcessTasks(inputParameters, outputParameter, deviceTokenEntry);

                inputParameters = tupleOutput1.Item1;
                outputParameter = tupleOutput1.Item2;

                if (tupleOutput1.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<long, string>(tupleOutput1.Item3, string.Empty);
                    return tupleResult;
                }


                //Process Tasks

                tupleOutput1 = Execute_GetHeader_ProcessTasks(inputParameters, outputParameter, deviceTokenEntry);

                outputParameter = tupleOutput1.Item1;
                inputParameters = tupleOutput1.Item2;
                StatusCode = tupleOutput1.Item3;
                if (tupleOutput1.Item3 == AtparStatusCodes.E_NORECORDFOUND)
                {
                    tupleResult = new Tuple<long, string>(tupleOutput1.Item3, string.Empty);
                    return tupleResult;
                }
                else if (tupleOutput1.Item3 == AtparStatusCodes.RECV_S_MULTIPLERECEIVERSEXISTS)
                {
                    //Building Output XML                    
                    tupleResult = Build_GetPO_OutputXML(inputParameters, outputParameter, OutputXML, deviceTokenEntry, StatusCode);

                    OutputXML = tupleResult.Item2;

                    if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                    {
                        tupleResult = new Tuple<long, string>(tupleResult.Item1, OutputXML);
                        return tupleResult;
                    }
                }
                else if (tupleOutput1.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<long, string>(tupleOutput1.Item3, string.Empty);
                    return tupleResult;
                }


                //PostProcess Tasks

                tupleOutput1 = Execute_GetHeader_PostProcessTasks(inputParameters, outputParameter, deviceTokenEntry);

                outputParameter = tupleOutput1.Item1;
                inputParameters = tupleOutput1.Item2;
                StatusCode = tupleOutput1.Item3;
                if (tupleOutput1.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<long, string>(tupleOutput1.Item3, string.Empty);
                    return tupleResult;
                }


                // Building Output XML
                tupleResult = Build_GetPO_OutputXML(inputParameters, outputParameter, OutputXML, deviceTokenEntry, StatusCode);
                OutputXML = tupleResult.Item2;

                if (tupleResult.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<long, string>(tupleResult.Item1, string.Empty);
                    return tupleResult;
                }

                tupleResult = new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, OutputXML);
                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ":E_SERVERERROR: " + ex.ToString());
                tupleResult = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, string.Empty);
                return tupleResult;

            }
        }
        private long Check_GetHeader_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {

                if (_log.IsDebugEnabled)
                {
                    //DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                    inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);
                }


                if (inputParameters.Tables.Count != 1)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Incorrect DataTable Count " + inputParameters.Tables.Count);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Headers Rows count: " + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count.ToString());

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString());
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }
        }
        private Tuple<DataSet, DataSet, long> Execute_GetHeader_PreProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            long StatusCode = 0;

            Tuple<DataSet, DataSet, long> tupleOutput = null;
            //DataSet outputParameters = new DataSet();

            try
            {
                tupleOutput = Populate_GetHeader_InputParameters(inputParameters, outputParameters);

                inputParameters = tupleOutput.Item1;
                outputParameters = tupleOutput.Item2;

                if (tupleOutput.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, tupleOutput.Item3);

                    return tupleOutput;
                }

                tupleOutput = Populate_GetHeader_OutputParameters(inputParameters, outputParameters);

                outputParameters = tupleOutput.Item1;
                inputParameters = tupleOutput.Item2;

                if (tupleOutput.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, tupleOutput.Item3);

                    return tupleOutput;

                }

                tupleOutput = Populate_GetHeader_Prerequisites(inputParameters, outputParameters, deviceTokenEntry);

                inputParameters = tupleOutput.Item1;
                outputParameters = tupleOutput.Item2;

                if (tupleOutput.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<DataSet, DataSet, long>(null, null, tupleOutput.Item3);

                    return tupleOutput;
                }




                tupleOutput = Populate_GetHeader_ListViewData(inputParameters, outputParameters, deviceTokenEntry);

                inputParameters = tupleOutput.Item1;
                outputParameters = tupleOutput.Item2;

                if (tupleOutput.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<DataSet, DataSet, long>(null, null, tupleOutput.Item3);

                    return tupleOutput;
                }

                tupleOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, tupleOutput.Item3);

                return tupleOutput;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Populate_GetHeader_ListViewData failed " + System.Environment.NewLine + ex.ToString());
                tupleOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;

            }
        }
        private Tuple<DataSet, DataSet, long> Populate_GetHeader_InputParameters(DataSet inputParameters, DataSet outputParameters)
        {


            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<DataSet, DataSet, long> tupleResult = null;
            long StatusCode = -1;


            try
            {
                DataTable recv_prereq_dt = new DataTable();
                DataTable recv_prereq_lv_dt = new DataTable();

                // Table to add Preq Req Parameters

                recv_prereq_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.GetPO_Params_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());


                // Table to add List view Preq Req Parameters

                recv_prereq_lv_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.GetPO_ListView_Params_Defns, AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString());

                // Add these tables to actual input parameters
                inputParameters.Tables.Add(recv_prereq_dt);
                inputParameters.Tables.Add(recv_prereq_lv_dt);


                tupleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.ATPAR_OK);

                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());

                tupleResult = new Tuple<DataSet, DataSet, long>(null, null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }

        }

        private Tuple<DataSet, DataSet, long> Populate_GetHeader_OutputParameters(DataSet inputParameters, DataSet outputParameters)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataTable recv_recvIds = new DataTable();
            DataTable recv_Hdr = new DataTable();
            DataTable recv_Dtls = new DataTable();
            DataTable recv_AltUOM = new DataTable();
            DataTable recv_Locs = new DataTable();

            Tuple<DataSet, DataSet, long> tupleResult = null;
            long StatusCode = -1;

            try
            {
                // Table to add Preq Req Parameters

                recv_recvIds = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.GetPO_Recv_ERP_RecvIDs_Defns, AtParWebEnums.DataSet_Type.RECEIVERIDS.ToString());

                recv_Hdr = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.GetPO_Recv_ERP_Header_Defns, AtParWebEnums.DataSet_Type.HEADERS.ToString());



                recv_Dtls = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.GetPO_Recv_ERP_Details_Defns, AtParWebEnums.DataSet_Type.DETAILS.ToString());



                recv_AltUOM = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.GetPO_Recv_ERP_AltUOM_Defns, AtParWebEnums.DataSet_Type.SUBDETAILS.ToString());



                recv_Locs = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.GetPO_Recv_ERP_LOC_Defns, AtParWebEnums.DataSet_Type.LOCATIONS.ToString());


                // Add these tables to actual input parameters
                outputParameters.Tables.Add(recv_recvIds);
                outputParameters.Tables.Add(recv_Hdr);
                outputParameters.Tables.Add(recv_Dtls);
                outputParameters.Tables.Add(recv_AltUOM);
                outputParameters.Tables.Add(recv_Locs);

                tupleResult = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.ATPAR_OK);

                return tupleResult;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());

                tupleResult = new Tuple<DataSet, DataSet, long>(null, null, AtparStatusCodes.E_SERVERERROR);

                return tupleResult;

            }

        }

        private Tuple<DataSet, DataSet, long> Populate_GetHeader_Prerequisites(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SortedList<string, string> userParams;
            SortedList<string, string> orgParams;
            SortedList<string, string> profParams;
            string remoteDBType = "";
            string remoteSchema = "";

            string orgGroupId = string.Empty;
            string profileId = string.Empty;
            string userId = string.Empty;
            int appID = 0;

            long StatusCode = -1;
            Tuple<DataSet, DataSet, long> tupleResult = null;

            try
            {

                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.NON_STOCK_STORE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.MULTIPLE_USER_DOWNLOAD.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.PS_USER.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.REQUESTOR_EMAIL_TABLE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ASN_RECEIPT_STATUS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.POU_IMPLEMENTED.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.PACKAGING_STRING_FOR_LABELS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.RECV_EXCLUDE_CAPITAL_POS.ToString()] = string.Empty;

                orgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();
                appID = (int)AtParWebEnums.EnumApps.Receiving;


                //Getting OrgParam Values
                _commonRepo.GetOrgGroupParamValues(orgParams, appID, orgGroupId);



                //Getting UserParams values
                userParams = new SortedList<string, string>();

                userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()] = string.Empty;
                appID = (int)AtParWebEnums.EnumApps.Receiving;
                profileId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString();
                userId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                _commonRepo.GetUserParamValues(userParams, appID, userId);


                //Getting Profile Params
                profParams = new SortedList<string, string>();
                profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.EDIT_UOM.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.SEARCH_PO_WITHOUT_BU.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.RECEIVE_ITEM.ToString()] = string.Empty;

                appID = (int)AtParWebEnums.EnumApps.Receiving;
                profileId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString();

                _commonRepo.GetProfileParamValues(profParams, appID, profileId);


                DataRow dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.NON_STOCK_STORE] = orgParams[AtParWebEnums.AppParameters_Enum.NON_STOCK_STORE.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.MULTIPLE_USER_DOWNLOAD] = orgParams[AtParWebEnums.AppParameters_Enum.MULTIPLE_USER_DOWNLOAD.ToString()];

                if (!string.IsNullOrEmpty(userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()]))
                {
                    dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.PS_USER] = userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()];
                }
                else
                {
                    dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.PS_USER] = orgParams[AtParWebEnums.AppParameters_Enum.PS_USER.ToString()];
                }

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                remoteDBType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                   x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                                .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
              x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
              .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.REQUESTOR_EMAIL_TABLE] = orgParams[AtParWebEnums.AppParameters_Enum.REQUESTOR_EMAIL_TABLE.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.ASN_RECEIPT_STATUS] = orgParams[AtParWebEnums.AppParameters_Enum.ASN_RECEIPT_STATUS.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.ITEM_UPN_TYPE_CODE] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_UPN_TYPE_CODE.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.ITEM_NDC_TYPE_CODE] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_NDC_TYPE_CODE.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.EDIT_UOM] = profParams[AtParWebEnums.AppParameters_Enum.EDIT_UOM.ToString()];

                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.SCHEMA_NAME] = remoteSchema;
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDBType;
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.ITEM_DESCR] = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.LOT_SERIAL_ENABLED] = orgParams[AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.POU_IMPLEMENTED] = orgParams[AtParWebEnums.AppParameters_Enum.POU_IMPLEMENTED.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS] = orgParams[AtParWebEnums.AppParameters_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR] = orgParams[AtParWebEnums.AppParameters_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.ITEM_PRICE] = orgParams[AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS] = orgParams[AtParWebEnums.AppParameters_Enum.PACKAGING_STRING_FOR_LABELS.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.RECV_EXCLUDE_CAPITAL_POS] = orgParams[AtParWebEnums.AppParameters_Enum.RECV_EXCLUDE_CAPITAL_POS.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.SEARCH_PO_WITHOUT_BU] = profParams[AtParWebEnums.AppParameters_Enum.SEARCH_PO_WITHOUT_BU.ToString()];
                dr[(int)AtParWebEnums.GetPO_PreReqData_Enum.RECEIVE_ITEM] = profParams[AtParWebEnums.AppParameters_Enum.RECEIVE_ITEM.ToString()];

                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(dr);


                tupleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());

                tupleResult = new Tuple<DataSet, DataSet, long>(null, null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }
        }

        private Tuple<DataSet, DataSet, long> Populate_GetHeader_ListViewData(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            bool blnInvItemID = false;
            bool blnDescr = false;
            bool blnInvItem = false;
            bool blnDueDt = false;
            bool blnUPCID = false;
            bool blnUOM = false;
            bool blnLineQty = false;
            bool blnRecvdQty = false;
            bool blnLineNBR = false;
            bool blnLocation = false;
            bool blnLinePOQty = false;
            bool blnItmIDVndr = false;
            bool blnMfgItemID = false;
            bool blnShiptoID = false;
            bool blnInspFlag = false;
            bool blnAddress1 = false;
            bool blnAddress2 = false;
            bool blnAddress3 = false;
            bool blnReqNo = false;
            bool blnReqName = false;
            bool blnPrice = false;
            bool blnPackagingString = false;
            bool blnBuilding = false;
            bool blnFloor = false;
            bool blnSector = false;

            long StatusCode = -1;
            Tuple<DataSet, DataSet, long> tupleResult = null;
            //DataSet inputParameters = new DataSet();

            try
            {

                List<string> reqdParams = _commonRepo.GetListViewDetails(((int)AtParWebEnums.EnumApps.Receiving).ToString(), "RECEIVE ITEMS", deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString());


                if (reqdParams != null)
                {
                    if (!(reqdParams.Count > 0))
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + " Screen Display Setup did not return any rows for screen name: RECEIVE ITEMS" + " for Profile ID :" + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString() + ":");
                    }
                    else
                    {
                        foreach (var item in reqdParams)
                        {
                            //switch ((AtParWebEnums.GetPO_ListView_Enum)Enum.Parse(typeof(AtParWebEnums.GetPO_ListView_Enum), item))
                            //{
                            //    case AtParWebEnums.GetPO_ListView_Enum.INV_ITEM_ID:
                            //        blnInvItemID = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.DESCR:
                            //        blnDescr = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.INVENTORY_ITEM:
                            //        blnInvItem = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.DUE_DT:
                            //        blnDueDt = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.UPC_ID:
                            //        blnUPCID = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.UNIT_OF_MEASURE:
                            //        blnUOM = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.LINE_QTY:
                            //        blnLineQty = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.RECEIVED_QTY:
                            //        blnRecvdQty = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.LINE_NBR:
                            //        blnLineNBR = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.LOCATION:
                            //        blnLocation = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.LINE_PO_QTY:
                            //        blnLinePOQty = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.ITM_ID_VNDR:
                            //        blnItmIDVndr = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.MFG_ITEM_ID:
                            //        blnMfgItemID = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.SHIPTO_ID:
                            //        blnShiptoID = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.INSP_FLAG:
                            //        blnInspFlag = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.ADDRESS1:
                            //        blnAddress1 = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.ADDRESS2:
                            //        blnAddress2 = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.ADDRESS3:
                            //        blnAddress3 = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.REQ_NUM:
                            //        blnReqNo = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.DELIVER_TO:
                            //        blnReqName = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.PRICE:
                            //        blnPrice = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.PACKAGING_STRING:
                            //        blnPackagingString = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.BUILDING:
                            //        blnBuilding = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.FLOOR:
                            //        blnFloor = true;

                            //        break;
                            //    case AtParWebEnums.GetPO_ListView_Enum.SECTOR:
                            //        blnSector = true;

                            //        break;
                            //}
                            switch (item.ToString())
                            {
                                case "INV_ITEM_ID":
                                    blnInvItemID = true;

                                    break;
                                case "DESCR":
                                    blnDescr = true;

                                    break;
                                case "INVENTORY_ITEM":
                                    blnInvItem = true;

                                    break;
                                case "DUE_DT":
                                    blnDueDt = true;

                                    break;
                                case "UPC_ID":
                                    blnUPCID = true;

                                    break;
                                case "UNIT_OF_MEASURE":
                                    blnUOM = true;

                                    break;
                                case "LINE_QTY":
                                    blnLineQty = true;

                                    break;
                                case "RECEIVED_QTY":
                                    blnRecvdQty = true;

                                    break;
                                case "LINE_NBR":
                                    blnLineNBR = true;

                                    break;
                                case "LOCATION":
                                    blnLocation = true;

                                    break;
                                case "LINE_PO_QTY":
                                    blnLinePOQty = true;

                                    break;
                                case "ITM_ID_VNDR":
                                    blnItmIDVndr = true;

                                    break;
                                case "MFG_ITEM_ID":
                                    blnMfgItemID = true;

                                    break;
                                case "SHIPTO_ID":
                                    blnShiptoID = true;

                                    break;
                                case "INSP_FLAG":
                                    blnInspFlag = true;

                                    break;
                                case "ADDRESS1":
                                    blnAddress1 = true;

                                    break;
                                case "ADDRESS2":
                                    blnAddress2 = true;

                                    break;
                                case "ADDRESS3":
                                    blnAddress3 = true;

                                    break;
                                case "REQ_NUM":
                                    blnReqNo = true;

                                    break;
                                case "DELIVER_TO":
                                    blnReqName = true;

                                    break;
                                case "PRICE":
                                    blnPrice = true;

                                    break;
                                case "PACKAGING_STRING":
                                    blnPackagingString = true;

                                    break;
                                case "BUILDING":
                                    blnBuilding = true;

                                    break;
                                case "FLOOR":
                                    blnFloor = true;

                                    break;
                                case "SECTOR":
                                    blnSector = true;

                                    break;
                            }


                        }
                    }
                }

                DataRow dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString()].NewRow();
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.INV_ITEM_ID] = blnInvItemID;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.DESCR] = blnDescr;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.INVENTORY_ITEM] = blnInvItem;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.DUE_DT] = blnDueDt;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.UPC_ID] = blnUPCID;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.UNIT_OF_MEASURE] = blnUOM;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.LINE_QTY] = blnLineQty;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.RECEIVED_QTY] = blnRecvdQty;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.LINE_NBR] = blnLineNBR;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.LOCATION] = blnLocation;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.LINE_PO_QTY] = blnLinePOQty;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.ITM_ID_VNDR] = blnItmIDVndr;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.MFG_ITEM_ID] = blnMfgItemID;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.SHIPTO_ID] = blnShiptoID;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.INSP_FLAG] = blnInspFlag;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.ADDRESS1] = blnAddress1;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.ADDRESS2] = blnAddress2;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.ADDRESS3] = blnAddress3;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.REQ_NUM] = blnReqNo;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.DELIVER_TO] = blnReqName;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.PRICE] = blnPrice;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.PACKAGING_STRING] = blnPackagingString;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.BUILDING] = blnBuilding;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.FLOOR] = blnFloor;
                dr[(int)AtParWebEnums.GetPO_ListView_Enum.SECTOR] = blnSector;

                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString()].Rows.Add(dr);


                tupleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleResult;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());
                tupleResult = new Tuple<DataSet, DataSet, long>(null, null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }
        }

        private Tuple<DataSet, DataSet, long> Execute_GetHeader_ProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string transID = string.Empty;
            string bUnit = string.Empty;
            string pOId = string.Empty;
            char chrMultiUserDownLoad = '\0';
            string strPOWithOutBU = string.Empty;

            long StatusCode = -1;
            Tuple<DataSet, DataSet, long> tupleOutput = null;

            try
            {

                if (inputParameters.Tables.Count > 0)
                {
                    if (inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.HEADERS.ToString()))
                    {
                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                        {
                            transID = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetPO_Receive_Header.TRANS_ID.ToString()].ToString();

                            bUnit = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetPO_Receive_Header.BUSINESS_UNIT.ToString()].ToString();

                            pOId = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetPO_Receive_Header.PO_NO.ToString()].ToString();

                            chrMultiUserDownLoad = Convert.ToChar(inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.GetPO_PreReqData_Enum.MULTIPLE_USER_DOWNLOAD.ToString()].ToString());

                            if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.GetPO_PreReqData_Enum.SEARCH_PO_WITHOUT_BU.ToString()] != null)
                            {
                                strPOWithOutBU = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.GetPO_PreReqData_Enum.SEARCH_PO_WITHOUT_BU.ToString()].ToString();

                            }
                        }
                        else
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " No Rows in Headers Table :E_INVALIDPARAMETER: " + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count + ":");

                            tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_INVALIDPARAMETER);
                            return tupleOutput;
                        }
                    }
                    else
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " No Headers Table in Input Paramters :E_INVALIDPARAMETER:");
                        tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_INVALIDPARAMETER);
                        return tupleOutput;
                    }
                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No Tables in Input Paramters :E_INVALIDPARAMETER:");
                    tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_INVALIDPARAMETER);
                    return tupleOutput;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Search PO without BU profile parameter value: " + strPOWithOutBU);

                if (strPOWithOutBU == null)
                {
                    strPOWithOutBU = string.Empty;
                }


                //To check if the PO is already downloaded by the same user
                if (deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ClientType].ToString() == ((int)AtParWebEnums.ClientType.WEB).ToString() && string.IsNullOrEmpty(transID))
                {

                    int transactionID = _poNonPoRepo.CheckIfPoDownlodedForSameUser(bUnit, pOId, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                    transID = transactionID.ToString();
                }

                //checking and cancelling the previous transaction of the POID

                StatusCode = CancelTransaction(transID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(),
                    (int)AtParWebEnums.EnumApps.Receiving, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + ":" + StatusCode);

                    tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);
                    return tupleOutput;

                }


                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + ":After Checking and Cancelling the previous transactions:");

                if (strPOWithOutBU != AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    //To check if the PO is already downloaded by user otherthan logged in user

                    bool blnDownloaded = _poNonPoRepo.CheckIfPoAlreadyDownloaded(bUnit, pOId, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());


                    //Checking if the Bunit is allocated to OrgGroup

                    StatusCode = CheckBUnitAllocation(deviceTokenEntry, bUnit);

                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + "ATPAR_E_ASSIGN_ORGBUS");
                        tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);
                        return tupleOutput;
                    }


                    //Checking multi user download permission

                    if (chrMultiUserDownLoad.ToString() == AtParWebEnums.YesNo_Enum.N.ToString() && blnDownloaded)
                    {
                        StatusCode = AtparStatusCodes.RECV_E_LOCKEDBYOTHERUSER;
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + ":PO Locked by other user");
                        tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);
                        return tupleOutput;

                    }
                }

                Tuple<DataSet, long> tupleOutput1 = GetDetails(inputParameters, outputParameters, deviceTokenEntry);

                outputParameters = tupleOutput1.Item1;

                if (tupleOutput1.Item2 == AtparStatusCodes.E_NORECORDFOUND)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + ":" + tupleOutput1.Item2);

                    tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, tupleOutput1.Item2);
                    return tupleOutput;

                }
                else if (tupleOutput1.Item2 == AtparStatusCodes.RECV_S_MULTIPLERECEIVERSEXISTS)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + ":" + tupleOutput1.Item2);
                    tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, tupleOutput1.Item2);
                    return tupleOutput;
                }
                else if (tupleOutput1.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + ":" + tupleOutput1.Item2);
                    tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, tupleOutput1.Item2);
                    return tupleOutput;
                }
                tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetPO_ProcessTasks failed " + System.Environment.NewLine + ex.ToString());
                tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;
            }


        }
        private long CheckBUnitAllocation(string[] deviceTokenEntry, string bUnit)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            AtParWebApiResponse<string> result = new AtParWebApiResponse<string>();

            long StatusCode = 0;


            try
            {
                result = _commonService.GetBusinessUnits(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID], AtParWebEnums.BusinessType.Purchasing.ToString());

                StatusCode = result.StatusCode;

                if (StatusCode == AtparStatusCodes.ATPAR_OK)
                {
                    if (result.DataList.Count > 0)
                    {
                        //DataRow[] drOrgBunit = result.Tables[0].Select("BUSINESS_UNIT =  '" + bUnit + "' ");

                        //var drOrgBunit = result.DataList.Select(item => item == bUnit);
                       
                        var drOrgBunit = result.DataList.Where(item => item == bUnit);

                        if (drOrgBunit == null || drOrgBunit.Count()== 0) //(result.DataList == null || result.DataList.Count() == 0)//drOrgBunit.Count() == 0
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + "ATPAR_E_ASSIGN_ORGBUS");
                            return AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS;
                        }
                    }
                }
                else if (StatusCode == AtparStatusCodes.E_NORECORDFOUND)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + "ATPAR_E_ASSIGN_ORGBUS");
                    return AtparStatusCodes.ATPAR_E_ASSIGN_ORGBUS;
                }
                else if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + StatusCode);
                    return StatusCode;
                }

                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + "call failed " + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        private Tuple<DataSet, long> GetDetails(DataSet inputParameters, DataSet outputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<DataSet, long> tupleOutput = null;


            try
            {


                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                // GetConfigData();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }

                    tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleOutput;

                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;
                }

                className = "GetDetails";
                methodName = "GetDetails";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, outputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));
                outputParameters = (DataSet)args[1];
                if (StatusCode != AtparStatusCodes.RECV_S_MULTIPLERECEIVERSEXISTS)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<DataSet, long>(outputParameters, StatusCode);
                    return tupleOutput;
                }
                else if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<DataSet, long>(outputParameters, StatusCode);
                    return tupleOutput;
                }

                tupleOutput = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;
            }
        }

        private Tuple<long, string> Build_GetPO_OutputXML(DataSet inputParameter, DataSet outputParameter, string strXML, string[] deviceTokenEntry,
            long statusCode = 0)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<long, string> tupleOutput = null;
            long StatusCode = -1;

            int i = 0;
            StringBuilder sbXML = new StringBuilder();
            StringBuilder sbPOItems = new StringBuilder();
            string strRcvrID = string.Empty;
            string strRcptDt = string.Empty;
            string strInvNo = string.Empty;
            string strPKSlipNo = string.Empty;
            string strLnNbr = string.Empty;

            bool blnInvItemID = false;
            bool blnDescr = false;
            bool blnInvItem = false;
            bool blnDueDt = false;
            bool blnUPCID = false;
            bool blnUOM = false;
            bool blnLineQty = false;
            bool blnRecvdQty = false;
            bool blnLineNBR = false;
            bool blnLocation = false;
            bool blnLinePOQty = false;
            bool blnItmIDVndr = false;
            bool blnMfgItemID = false;
            bool blnShiptoID = false;
            bool blnInspFlag = false;
            bool blnAddress1 = false;
            bool blnAddress2 = false;
            bool blnAddress3 = false;
            bool blnReqNo = false;
            bool blnReqName = false;
            bool blnPrice = false;
            bool blnPackagingString = false;
            bool recallFlag = false;
            string strRecallItems = string.Empty;
            DataSet dsRecalItms = new DataSet();

            try
            {
                if (inputParameter.Tables.Count > 0)
                {
                    if (inputParameter.Tables.Contains(AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString()))
                    {
                        DataRow item = inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQLISTVIEWPARAMS.ToString()].Rows[0];

                        blnInvItemID = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.INV_ITEM_ID.ToString()]);

                        blnDescr = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.DESCR.ToString()]);

                        blnInvItem = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.INVENTORY_ITEM.ToString()]);

                        blnDueDt = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.DUE_DT.ToString()]);

                        blnUPCID = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.UPC_ID.ToString()]);

                        blnUOM = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.UNIT_OF_MEASURE.ToString()]);

                        blnLineQty = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.LINE_QTY.ToString()]);

                        blnRecvdQty = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.RECEIVED_QTY.ToString()]);

                        blnLineNBR = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.LINE_NBR.ToString()]);

                        blnLocation = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.LOCATION.ToString()]);

                        blnLinePOQty = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.LINE_PO_QTY.ToString()]);

                        blnItmIDVndr = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.ITM_ID_VNDR.ToString()]);

                        blnMfgItemID = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.MFG_ITEM_ID.ToString()]);

                        blnShiptoID = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.SHIPTO_ID.ToString()]);

                        blnInspFlag = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.INSP_FLAG.ToString()]);

                        blnAddress1 = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.ADDRESS1.ToString()]);

                        blnAddress2 = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.ADDRESS2.ToString()]);

                        blnAddress3 = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.ADDRESS3.ToString()]);

                        blnReqNo = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.REQ_NUM.ToString()]);

                        blnReqName = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.DELIVER_TO.ToString()]);

                        blnPrice = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.PRICE.ToString()]);

                        blnPackagingString = Convert.ToBoolean(item[AtParWebEnums.GetPO_ListView_Enum.PACKAGING_STRING.ToString()]);
                    }
                    else
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("E_SERVERERROR : PREREQLISTVIEWPARAMS Table doesn't exist in Input Parameters");

                        tupleOutput = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, string.Empty);
                        return tupleOutput;

                    }
                }


                if (statusCode == AtparStatusCodes.RECV_S_MULTIPLERECEIVERSEXISTS)
                {

                    sbXML.Append("<ROOT>");
                    sbXML.Append("<STATUS_CODE>");
                    sbXML.Append(AtparStatusCodes.RECV_S_MULTIPLERECEIVERSEXISTS);
                    sbXML.Append("</STATUS_CODE>");
                    sbXML.Append("<RECEIVER_IDS>");

                    if (outputParameter.Tables.Count > 0)
                    {
                        if (outputParameter.Tables.Contains(AtParWebEnums.DataSet_Type.RECEIVERIDS.ToString()))
                        {
                            for (i = 0; i <= outputParameter.Tables[AtParWebEnums.DataSet_Type.RECEIVERIDS.ToString()].Rows.Count - 1; i++)
                            {

                                DataRow item = outputParameter.Tables[AtParWebEnums.DataSet_Type.RECEIVERIDS.ToString()].Rows[i];

                                strRcvrID = item[AtParWebEnums.GetPO_Recv_ERP_RecvIDs_Enum.RECEIVERID.ToString()].ToString();

                                strRcptDt = item[AtParWebEnums.GetPO_Recv_ERP_RecvIDs_Enum.RECPT_DATE.ToString()].ToString();

                                strInvNo = item[AtParWebEnums.GetPO_Recv_ERP_RecvIDs_Enum.INVOICE_NO.ToString()].ToString();

                                strPKSlipNo = item[AtParWebEnums.GetPO_Recv_ERP_RecvIDs_Enum.PACKSLIP_NO.ToString()].ToString();

                                sbXML.Append("<RECORD>");
                                sbXML.Append("<RECEIVERID>");
                                sbXML.Append(strRcvrID);
                                sbXML.Append("</RECEIVERID>");
                                sbXML.Append("<RECPT_DATE>");
                                sbXML.Append(strRcptDt);
                                sbXML.Append("</RECPT_DATE>");
                                sbXML.Append("<INVOICE_NO>");
                                sbXML.Append(strInvNo);
                                sbXML.Append("</INVOICE_NO>");
                                sbXML.Append("<PACKSLIP_NO>");
                                sbXML.Append(strPKSlipNo);
                                sbXML.Append("</PACKSLIP_NO>");
                                sbXML.Append("</RECORD>");
                            }
                        }
                    }


                    sbXML.Append("</RECEIVER_IDS>");
                    sbXML.Append("</ROOT>");

                    strXML = sbXML.ToString().substituteString();
                    tupleOutput = new Tuple<long, string>(statusCode, strXML);
                    return tupleOutput;
                }
                else
                {
                    sbXML.Append("<ROOT>");
                    sbXML.Append("<HEADER>");

                    if (outputParameter.Tables.Count > 0)
                    {
                        if (outputParameter.Tables.Contains(AtParWebEnums.DataSet_Type.HEADERS.ToString()))
                        {

                            DataRow item = outputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];


                            sbXML.Append("<j>");
                            //PO_ID
                            sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.PO_ID.ToString()].ToString());
                            sbXML.Append("</j>");
                            sbXML.Append("<c>");
                            //BUPO
                            sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.BUSINESS_UNIT.ToString()].ToString());
                            sbXML.Append("</c>");

                            if (outputParameter.Tables[AtParWebEnums.DataSet_Type.RECEIVERIDS.ToString()].Rows.Count == 0)
                            {
                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Header.RECEIVER_ID.ToString()].ToString()))
                                {
                                    sbXML.Append("<i>");
                                    //RECEIVER_ID 
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.RECEIVER_ID.ToString()].ToString());
                                    sbXML.Append("</i>");
                                }
                            }
                            else
                            {
                                if (!string.IsNullOrEmpty(outputParameter.Tables[AtParWebEnums.DataSet_Type.RECEIVERIDS.ToString()].Rows[0][AtParWebEnums.GetPO_Recv_ERP_RecvIDs_Enum.RECEIVERID.ToString()].ToString()))
                                {
                                    sbXML.Append("<i>");
                                    //RECEIVER_ID 
                                    sbXML.Append(outputParameter.Tables[AtParWebEnums.DataSet_Type.RECEIVERIDS.ToString()].Rows[0][AtParWebEnums.GetPO_Recv_ERP_RecvIDs_Enum.RECEIVERID.ToString()].ToString());
                                    sbXML.Append("</i>");
                                }
                            }

                            if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Header.VENDOR_ID.ToString()].ToString()))
                            {
                                sbXML.Append("<d>");
                                //VNDRID
                                sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.VENDOR_ID.ToString()].ToString());
                                sbXML.Append("</d>");
                            }

                            sbXML.Append("<a>");
                            //PODT
                            sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.PO_DT.ToString()].ToString());
                            sbXML.Append("</a>");

                            if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Header.ERS_TYPE.ToString()].ToString()))
                            {
                                sbXML.Append("<k>");
                                //ERS Type
                                sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.ERS_TYPE.ToString()].ToString());
                                sbXML.Append("</k>");
                            }

                            if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Header.HDR_CMTS.ToString()].ToString()))
                            {
                                sbXML.Append("<h>");
                                //HDRCMT
                                sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.HDR_CMTS.ToString()].ToString());
                                sbXML.Append("</h>");
                            }

                            if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Header.VNDR_NAME.ToString()].ToString()))
                            {
                                sbXML.Append("<e>");
                                //VNAME
                                sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.VNDR_NAME.ToString()].ToString());
                                sbXML.Append("</e>");
                            }

                            if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Header.TRANS_CODE.ToString()].ToString()))
                            {
                                sbXML.Append("<b>");
                                //TRNSCD
                                sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.TRANS_CODE.ToString()].ToString());
                                sbXML.Append("</b>");
                            }

                            if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Header.BUYER_ID.ToString()].ToString()))
                            {
                                sbXML.Append("<o>");
                                //BUYER_ID
                                sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.BUYER_ID.ToString()].ToString());
                                sbXML.Append("</o>");
                            }

                            if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Header.PHONE.ToString()].ToString()))
                            {
                                sbXML.Append("<p>");
                                //PHONE
                                sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.PHONE.ToString()].ToString());
                                sbXML.Append("</p>");
                            }

                            if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Header.TRANSID.ToString()].ToString()))
                            {
                                sbXML.Append("<g>");
                                //TRANSID
                                sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Header.TRANSID.ToString()].ToString());
                                sbXML.Append("</g>");
                            }
                        }
                    }

                    sbXML.Append("</HEADER>");

                    if (outputParameter.Tables.Count > 0)
                    {

                        if (outputParameter.Tables.Contains(AtParWebEnums.DataSet_Type.DETAILS.ToString()))
                        {
                            ///// Starting of recall items tag building ///'

                            //GetConfigData();
                            List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                            List<string> lstParameters = new List<string>();
                            lstParameters.Add(AtParWebEnums.ATPAR_SYSTEM.RECALL_MGMT_IMPLEMENTED.ToString());

                            lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                            recallFlag = Convert.ToBoolean(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ATPAR_SYSTEM.ToString() &&
                                                                         x.PARAMETER_ID == AtParWebEnums.ATPAR_SYSTEM.RECALL_MGMT_IMPLEMENTED.ToString())
                                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault());


                            if (_log.IsDebugEnabled)
                                _log.Debug(string.Format(" :{0}:RecallFlag: {1}", methodBaseName, recallFlag));

                            if (recallFlag)
                            {
                                Tuple<long, string, DataSet> tpl = BuildRecallItems(strRecallItems, dsRecalItms, sbPOItems.ToString());

                                StatusCode = tpl.Item1;
                                strRecallItems = tpl.Item2;
                                dsRecalItms = tpl.Item3;

                                if (StatusCode == AtparStatusCodes.E_NORECORDFOUND)
                                {
                                    if (_log.IsWarnEnabled)
                                        _log.Warn(string.Format(":{0}:No Records Found and status code" + " returned is:{1}:", methodBaseName, StatusCode));

                                }
                                else if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(string.Format(":{0}:Failed to build recall items xml:" + "And status code returned:{1}:", methodBaseName, StatusCode));

                                    tupleOutput = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, string.Empty);
                                    return tupleOutput;


                                }
                            }

                            ///// Ending of recall items tag building ///'


                            for (i = 0; i <= outputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count - 1; i++)
                            {
                                sbXML.Append("<LINE>");
                                DataRow item = outputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[i];


                                strLnNbr = item[AtParWebEnums.GetPO_Recv_ERP_Details.LN_NBR.ToString()].ToString();


                                if (blnLineNBR)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.LN_NBR.ToString()].ToString()))
                                    {
                                        sbXML.Append("<o>");
                                        //LNBR
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.LN_NBR.ToString()]);
                                        sbXML.Append("</o>");
                                    }
                                }

                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.SCHED_NBR.ToString()].ToString()))
                                {
                                    sbXML.Append("<i>");
                                    //SCHNBR
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.SCHED_NBR.ToString()]);
                                    sbXML.Append("</i>");
                                }

                                if (blnInvItemID)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.ITEM_ID.ToString()].ToString()))
                                    {
                                        string strItemID = item[AtParWebEnums.GetPO_Recv_ERP_Details.ITEM_ID.ToString()].ToString();
                                        sbXML.Append("<a>");
                                        //ITMID
                                        sbXML.Append(strItemID.ToString().Trim().Length > 0 ? strItemID : "$ $");
                                        sbXML.Append("</a>");
                                        sbPOItems.Append("'").Append(strItemID).Append("'").Append(",");

                                    }
                                    else
                                    {
                                        sbXML.Append("<a>");
                                        //ITMID
                                        sbXML.Append("$ $");
                                        sbXML.Append("</a>");
                                    }
                                }

                                if (blnDescr)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.DESCR.ToString()].ToString()))
                                    {
                                        string strDescr = item[AtParWebEnums.GetPO_Recv_ERP_Details.DESCR.ToString()].ToString();

                                        sbXML.Append("<d>");
                                        //DESCR
                                        sbXML.Append(strDescr.ToString().Trim().Length > 0 ? strDescr : "$ $");
                                        sbXML.Append("</d>");
                                    }
                                    else
                                    {
                                        sbXML.Append("<d>");
                                        //DESCR
                                        sbXML.Append("$ $");
                                        sbXML.Append("</d>");
                                    }
                                }

                                if (blnMfgItemID)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.MFG_ITM_ID.ToString()].ToString()))
                                    {
                                        sbXML.Append("<c>");
                                        //MITMID
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.MFG_ITM_ID.ToString()]);

                                        sbXML.Append("</c>");
                                    }
                                }


                                if (blnItmIDVndr)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.VNDR_ITM_ID.ToString()].ToString()))
                                    {
                                        sbXML.Append("<b>");
                                        //VITMID
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.VNDR_ITM_ID.ToString()]);
                                        sbXML.Append("</b>");
                                    }
                                }

                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.GTIN.ToString()].ToString()))
                                {
                                    sbXML.Append("<GTIN>");
                                    //GTIN
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.GTIN.ToString()]);
                                    sbXML.Append("</GTIN>");
                                }

                                if (blnUPCID)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.UPC_ID.ToString()].ToString()))
                                    {
                                        string strUPCID = item[AtParWebEnums.GetPO_Recv_ERP_Details.UPC_ID.ToString()].ToString();
                                        sbXML.Append("<e>");
                                        //UPCID
                                        sbXML.Append(strUPCID.ToString().Trim().Length > 0 ? strUPCID : "$ $");
                                        sbXML.Append("</e>");
                                    }
                                    else
                                    {
                                        sbXML.Append("<e>");
                                        //UPCID
                                        sbXML.Append("$ $");
                                        sbXML.Append("</e>");
                                    }
                                }

                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.LCMNTS.ToString()].ToString()))

                                {
                                    sbXML.Append("<g>");
                                    //LCMNTS
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.LCMNTS.ToString()]);
                                    sbXML.Append("</g>");
                                }
                                if (blnDueDt)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.DUE_DT.ToString()].ToString()))
                                    {
                                        sbXML.Append("<h>");
                                        //DUEDT
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.DUE_DT.ToString()]);
                                        sbXML.Append("</h>");
                                    }
                                }

                                if (blnUOM)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.UOM.ToString()].ToString()))
                                    {
                                        sbXML.Append("<l>");
                                        //UOM
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.UOM.ToString()]);
                                        sbXML.Append("</l>");
                                    }
                                }


                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.ISSUE_UOM.ToString()].ToString()))
                                {
                                    sbXML.Append("<Y>");
                                    //ISSUE UOM
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.ISSUE_UOM.ToString()]);
                                    sbXML.Append("</Y>");
                                }

                                //While fetching PO information from erps if the conversion rate is null or empty
                                //consider 1 as default value.
                                if (item[AtParWebEnums.GetPO_Recv_ERP_Details.CONV_RATE.ToString()] != null)

                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.CONV_RATE.ToString()].ToString()))
                                    {
                                        sbXML.Append("<Z>");
                                        //CONVERSION_RATE
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.CONV_RATE.ToString()]);
                                        sbXML.Append("</Z>");
                                    }
                                    else
                                    {
                                        sbXML.Append("<Z>");
                                        //CONVERSION_RATE
                                        sbXML.Append("1");
                                        sbXML.Append("</Z>");
                                    }
                                }
                                else
                                {
                                    sbXML.Append("<Z>");
                                    //CONVERSION_RATE
                                    sbXML.Append("1");
                                    sbXML.Append("</Z>");
                                }

                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.PURCHASE_REQ_NO.ToString()].ToString()))
                                {
                                    sbXML.Append("<PURCHASE_REQ_NO>");
                                    //Req No
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.PURCHASE_REQ_NO.ToString()]);
                                    sbXML.Append("</PURCHASE_REQ_NO>");

                                }



                                DataRow[] UOMrows = null;

                                string search = string.Empty;
                                search = "[" + AtParWebEnums.GetPO_Recv_ERP_AltUOM.LN_NBR + "]='" + strLnNbr + "'";
                                UOMrows = outputParameter.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Select(search);


                                if (UOMrows != null)
                                {

                                    if (UOMrows.Length > 0)
                                    {

                                        foreach (DataRow dataRow in UOMrows)
                                        {
                                            sbXML.Append("<ALTUOM>");
                                            sbXML.Append("<LN_NBR>");
                                            sbXML.Append(strLnNbr);
                                            sbXML.Append("</LN_NBR>");
                                            sbXML.Append("<UOM>");
                                            //_sbXML.Append(.Item(GetPO_Recv_ERP_AltUOM.UOM))
                                            sbXML.Append(dataRow[1]);
                                            sbXML.Append("</UOM>");

                                            sbXML.Append("<CONFAC>");
                                            //_sbXML.Append(.Item(GetPO_Recv_ERP_AltUOM.CONV_FACT))
                                            sbXML.Append(dataRow[2]);
                                            sbXML.Append("</CONFAC>");

                                            sbXML.Append("</ALTUOM>");

                                        }


                                    }

                                }

                                if (blnLinePOQty)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.QTY_PO.ToString()].ToString()))
                                    {
                                        sbXML.Append("<j>");
                                        //QTYPO
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.QTY_PO.ToString()]);
                                        sbXML.Append("</j>");
                                    }
                                }

                                if (blnRecvdQty)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.RECV_QTY.ToString()].ToString()))
                                    {
                                        sbXML.Append("<k>");
                                        //RCVQTY
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.RECV_QTY.ToString()]);
                                        sbXML.Append("</k>");
                                    }
                                }

                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.QTY_SH_RECVD.ToString()].ToString()))
                                {
                                    sbXML.Append("<q>");
                                    //SHRCVQTY
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.QTY_SH_RECVD.ToString()]);
                                    sbXML.Append("</q>");
                                }
                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.BILL_OF_LADING.ToString()].ToString()))
                                {
                                    sbXML.Append("<bol>");
                                    //BILLOFLADING
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.BILL_OF_LADING.ToString()]);
                                    sbXML.Append("</bol>");
                                }
                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.TOLPCT.ToString()].ToString()))
                                {
                                    sbXML.Append("<r>");
                                    //TOLPCT
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.TOLPCT.ToString()]);
                                    sbXML.Append("</r>");
                                }

                                if (blnInspFlag)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.INSP_FLAG.ToString()].ToString()))
                                    {
                                        sbXML.Append("<p>");
                                        //Inspection Flag
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.INSP_FLAG.ToString()]);
                                        sbXML.Append("</p>");
                                    }
                                }

                                if (blnShiptoID)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.SHIPTO_ID.ToString()].ToString()))
                                    {
                                        sbXML.Append("<n>");
                                        //SHPTID
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.SHIPTO_ID.ToString()]);
                                        sbXML.Append("</n>");
                                    }
                                }
                                if (blnLocation)
                                {
                                    //Building Location tags
                                    string strLoc = string.Empty;
                                    string strLocDescr = string.Empty;
                                    string strAddress1 = string.Empty;
                                    string strAddress2 = string.Empty;
                                    string strAddress3 = string.Empty;
                                    string strPhone = string.Empty;
                                    string strFloor = string.Empty;
                                    string strSector = string.Empty;
                                    string strBuilding = string.Empty;
                                    string strReqName = string.Empty;
                                    string strBuyerName = string.Empty;
                                    string prevLnNbr = string.Empty;
                                    string strDeliverTo = string.Empty;
                                    string strStorLoc = string.Empty;
                                    string strReqNo = string.Empty;
                                    DataRow[] drLoc = null;

                                    drLoc = outputParameter.Tables[AtParWebEnums.DataSet_Type.LOCATIONS.ToString()].Select("[" + AtParWebEnums.GetPO_Recv_ERP_LOC.LN_NBR + "] = '" + item[AtParWebEnums.GetPO_Recv_ERP_Details.LN_NBR.ToString()].ToString() + "' AND [" + AtParWebEnums.GetPO_Recv_ERP_LOC.SCHED_NBR + "] = '" +
                                        item[AtParWebEnums.GetPO_Recv_ERP_Details.SCHED_NBR.ToString()].ToString() + "'");

                                    if (drLoc.Length > 0)
                                    {
                                        for (int j = 0; j <= drLoc.Length - 1; j++)
                                        {
                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.DESCR.ToString()].ToString()))
                                            {
                                                strLoc = (strLoc.Length > 0 ? strLoc + "," + drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.LOCATION.ToString()].ToString() + "£-£" + drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.DESCR.ToString()].ToString() : drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.LOCATION.ToString()].ToString() + "£-£" + drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.DESCR.ToString()].ToString());
                                                strLocDescr = (strLocDescr.Length > 0 ? strLocDescr + "," + drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.DESCR.ToString()].ToString() : drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.DESCR.ToString()].ToString());
                                            }
                                            else
                                            {
                                                strLoc = (strLoc.Length > 0 ? strLoc + "," + drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.LOCATION.ToString()].ToString() : drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.LOCATION.ToString()].ToString());
                                            }
                                            strDeliverTo = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.DELV_TO_NAME.ToString()].ToString();
                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS1.ToString()].ToString()))
                                            {
                                                strAddress1 = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS1.ToString()].ToString();
                                            }
                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS2.ToString()].ToString()))
                                            {
                                                strAddress2 = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS2.ToString()].ToString();
                                            }
                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS3.ToString()].ToString()))
                                            {
                                                strAddress3 = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS3.ToString()].ToString();
                                            }
                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.PHONE.ToString()].ToString()))
                                            {
                                                strPhone = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.PHONE.ToString()].ToString();
                                            }

                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.STORAGE_LOCATION.ToString()].ToString()))
                                            {
                                                strStorLoc = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.STORAGE_LOCATION.ToString()].ToString();
                                            }

                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.REQ_NUM.ToString()].ToString()))
                                            {
                                                strReqNo = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.REQ_NUM.ToString()].ToString();
                                            }

                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.FLOOR.ToString()].ToString()))
                                            {
                                                strFloor = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.FLOOR.ToString()].ToString();
                                            }

                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.SECTOR.ToString()].ToString()))
                                            {
                                                strSector = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.SECTOR.ToString()].ToString();
                                            }

                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.BUILDING.ToString()].ToString()))
                                            {
                                                strBuilding = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.BUILDING.ToString()].ToString();
                                            }
                                            //Requisition Name
                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.REQUISITION_NAME.ToString()].ToString()))
                                            {
                                                strReqName = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.REQUISITION_NAME.ToString()].ToString();
                                            }
                                            //Buyer  name  for printing purpose
                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.BUYER_NAME.ToString()].ToString()))
                                            {
                                                strBuyerName = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.BUYER_NAME.ToString()].ToString();
                                            }
                                            //Req ID For People soft related mapping temp
                                            if (!string.IsNullOrEmpty(drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.REQ_ID.ToString()].ToString()))
                                            {
                                                strReqNo = drLoc[j][AtParWebEnums.GetPO_Recv_ERP_LOC.REQ_ID.ToString()].ToString();
                                            }

                                        }
                                    }



                                    if (blnAddress1)
                                    {
                                        if (!string.IsNullOrEmpty(strAddress1))
                                        {
                                            sbXML.Append("<ADDR1>");
                                            //Address1 field
                                            sbXML.Append(strAddress1);
                                            sbXML.Append("</ADDR1>");
                                        }
                                    }

                                    if (blnAddress2)
                                    {
                                        if (!string.IsNullOrEmpty(strAddress2))
                                        {
                                            sbXML.Append("<ADDR2>");
                                            //Address2 field
                                            sbXML.Append(strAddress2);
                                            sbXML.Append("</ADDR2>");
                                        }
                                    }

                                    if (blnAddress3)
                                    {
                                        if (!string.IsNullOrEmpty(strAddress3))
                                        {
                                            sbXML.Append("<ADDR3>");
                                            //Address3 field
                                            sbXML.Append(strAddress3);
                                            sbXML.Append("</ADDR3>");
                                        }
                                    }


                                    sbXML.Append("<PHONE>");
                                    //Phone field
                                    sbXML.Append(strPhone);
                                    sbXML.Append("</PHONE>");

                                    sbXML.Append("<FLOOR>");
                                    //Floor field
                                    sbXML.Append(strFloor);
                                    sbXML.Append("</FLOOR>");

                                    sbXML.Append("<SECTOR>");
                                    //Sector field
                                    sbXML.Append(strSector);
                                    sbXML.Append("</SECTOR>");

                                    sbXML.Append("<BUILDING>");
                                    //Building field
                                    sbXML.Append(strBuilding);
                                    sbXML.Append("</BUILDING>");

                                    sbXML.Append("<REQUISITION_NAME>");
                                    //Requisition Name
                                    sbXML.Append(strReqName);
                                    sbXML.Append("</REQUISITION_NAME>");

                                    sbXML.Append("<BUYER_NAME>");
                                    //Buyer  Name
                                    sbXML.Append(strBuyerName);
                                    sbXML.Append("</BUYER_NAME>");



                                    sbXML.Append("<LOC_DESCR>");
                                    //Location description
                                    sbXML.Append(strLocDescr);
                                    sbXML.Append("</LOC_DESCR>");

                                    if (blnReqName)
                                    {
                                        if (!string.IsNullOrEmpty(strDeliverTo))
                                        {
                                            sbXML.Append("<s>");
                                            sbXML.Append(strDeliverTo);
                                            sbXML.Append("</s>");
                                        }
                                    }

                                    sbXML.Append("<m>");
                                    if (strLoc.Length > 0)
                                    {
                                        sbXML.Append(strLoc);
                                    }
                                    else
                                    {
                                        sbXML.Append("$ $");
                                    }
                                    sbXML.Append("</m>");

                                    sbXML.Append("<SL>");
                                    sbXML.Append(strStorLoc);
                                    sbXML.Append("</SL>");

                                    if (blnReqNo)
                                    {
                                        if (!string.IsNullOrEmpty(strReqNo))
                                        {
                                            sbXML.Append("<REQ_NUM>");
                                            sbXML.Append(strReqNo);
                                            sbXML.Append("</REQ_NUM>");
                                        }
                                    }


                                }
                                if (blnInvItem)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.INV_ITM_FLAG.ToString()].ToString()))
                                    {
                                        sbXML.Append("<f>");
                                        //INVITM
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.INV_ITM_FLAG.ToString()]);
                                        sbXML.Append("</f>");
                                    }
                                }

                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.ASSET_ITM_FLAG.ToString()].ToString()))
                                {
                                    sbXML.Append("<x>");
                                    //asset Item flag
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.ASSET_ITM_FLAG.ToString()]);
                                    sbXML.Append("</x>");
                                }

                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.LOT_FLAG.ToString()].ToString()))
                                {
                                    sbXML.Append("<LFLG>");
                                    //LotControl
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.LOT_FLAG.ToString()]);
                                    sbXML.Append("</LFLG>");
                                }

                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.SRL_FLAG.ToString()].ToString()))
                                {
                                    sbXML.Append("<SFLG>");
                                    //SerialControl
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.SRL_FLAG.ToString()]);
                                    sbXML.Append("</SFLG>");
                                }

                                if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.CUST_ITEM_NO.ToString()].ToString()))
                                {
                                    sbXML.Append("<u>");
                                    //Cust Item No
                                    sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.CUST_ITEM_NO.ToString()]);
                                    sbXML.Append("</u>");
                                }

                                if (blnPrice)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.PRICE.ToString()].ToString()))
                                    {
                                        sbXML.Append("<PRICE>");
                                        //PRICE
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.PRICE.ToString()]);
                                        sbXML.Append("</PRICE>");
                                    }
                                }

                                if (blnPackagingString)
                                {
                                    if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.PACKAGING_STRING.ToString()].ToString()))
                                    {
                                        sbXML.Append("<PACKAGING_STRING>");
                                        //PACKAGING_STRING
                                        sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.PACKAGING_STRING.ToString()]);
                                        sbXML.Append("</PACKAGING_STRING>");
                                    }
                                }


                                if (outputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Columns.Contains(AtParWebEnums.GetPO_Recv_ERP_Details.RECEIVING_ROUTING_ID.ToString()))
                                {
                                    if (item[AtParWebEnums.GetPO_Recv_ERP_Details.RECEIVING_ROUTING_ID.ToString()].ToString() != null)
                                    {
                                        if (!string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_Details.RECEIVING_ROUTING_ID.ToString()].ToString()))
                                        {
                                            sbXML.Append("<v>");
                                            //Rceive Routing ID
                                            sbXML.Append(item[AtParWebEnums.GetPO_Recv_ERP_Details.RECEIVING_ROUTING_ID.ToString()]);
                                            sbXML.Append("</v>");
                                        }
                                    }

                                }


                                if (recallFlag)
                                {
                                    if (dsRecalItms.Tables.Count > 0)
                                    {
                                        if (dsRecalItms.Tables[0].Rows.Count > 0)
                                        {
                                            DataRow[] recalItems = null;

                                            recalItems = dsRecalItms.Tables[0].Select(string.Format("ITEM_ID = '{0}'", item[AtParWebEnums.GetPO_Recv_ERP_Details.ITEM_ID.ToString()]));
                                            //  recalItems = tupleResult.Item3.Where(x => x.ITEM_ID == string.Format("ITEM_ID = '{0}'", item[AtParWebEnums.GetPO_Recv_ERP_Details.ITEM_ID.ToString()])).ToList();

                                            if (recalItems.Length > 0)
                                            {
                                                sbXML.Append("<RECAL_FLAG>");
                                                sbXML.Append("Y");
                                                sbXML.Append("</RECAL_FLAG>");
                                            }
                                            else
                                            {
                                                sbXML.Append("<RECAL_FLAG>");
                                                sbXML.Append("N");
                                                sbXML.Append("</RECAL_FLAG>");
                                            }
                                        }
                                        else
                                        {
                                            sbXML.Append("<RECAL_FLAG>");
                                            sbXML.Append("N");
                                            sbXML.Append("</RECAL_FLAG>");
                                        }
                                    }
                                }
                                sbXML.Append("</LINE>");
                            }
                        }
                    }
                    if (recallFlag)
                    {

                        Tuple<long, string, DataSet> tpl = BuildRecallItems(strRecallItems, dsRecalItms, sbPOItems.ToString());

                        StatusCode = tpl.Item1;
                        strRecallItems = tpl.Item2;
                        dsRecalItms = tpl.Item3;

                        if (StatusCode == AtparStatusCodes.E_NORECORDFOUND)
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(string.Format(":{0}:No Records Found and status code" + " returned is:{1}:", methodBaseName, StatusCode));

                        }
                        else if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(string.Format(":{0}:Failed to build recall items xml:" + "And status code returned:{1}:", methodBaseName, StatusCode));
                            tupleOutput = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, string.Empty);
                            return tupleOutput;


                        }


                        sbXML.Append(strRecallItems.ToString());
                    }
                    sbXML.Append("</ROOT>");

                }
                if (_log.IsDebugEnabled)
                    _log.Debug("XML Output:" + sbXML.ToString().substituteString());
                strXML = sbXML.ToString().substituteString();

                tupleOutput = new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, strXML);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal("E_SERVERERROR :" + ex.ToString());
                tupleOutput = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, string.Empty);
                return tupleOutput;

            }
            finally
            {
                sbXML = null;
                sbPOItems = null;

            }

        }

        private Tuple<long, string, DataSet> BuildRecallItems(string recallitems, DataSet dsRecalItms, string poItems)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbXml = new StringBuilder();

            Tuple<long, string, DataSet> tpl = null;
            long StatusCode = -1;

            try
            {


                List<MT_ATPAR_RECALL_INFO> lstRecallInfo = _poNonPoRepo.GetRecallitems(poItems);

                //List to DataSet Conversion               
                DataTable dtRecallInfo = new DataTable();
                dtRecallInfo = lstRecallInfo.ToDataTable();
                dsRecalItms.Tables.Add(dtRecallInfo);


                if (!string.IsNullOrEmpty(poItems))
                {

                    if (dsRecalItms.Tables[0].Rows.Count > 0)
                    {
                        sbXml.Append("<RECALL_INFO>");


                        for (int i = 0; i < dsRecalItms.Tables[0].Rows.Count; i++)
                        {
                            DataRow row = dsRecalItms.Tables[0].Rows[i];

                            sbXml.Append("<ITEMS_INFO>");
                            sbXml.Append("<ITEM_ID>").Append(row["ITEM_ID"]).Append("</ITEM_ID>");
                            sbXml.Append("<LOT_NO>").Append(row["LOT_NO"]).Append("</LOT_NO>");
                            sbXml.Append("<SERIAL_NO>").Append(row["SERIAL_NO"]).Append("</SERIAL_NO>");
                            sbXml.Append("</ITEMS_INFO>");
                        }

                        sbXml.Append("</RECALL_INFO>");

                        recallitems = sbXml.ToString();

                    }
                    else
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(string.Format(":{0}:No Records Found and status code" + " returned is:{1}:", methodBaseName, lstRecallInfo));
                        tpl = new Tuple<long, string, DataSet>(AtparStatusCodes.E_NORECORDFOUND, recallitems, null);

                        return tpl;

                    }
                }
                else
                {
                    recallitems = string.Empty;
                }




                tpl = new Tuple<long, string, DataSet>(AtparStatusCodes.ATPAR_OK, recallitems, dsRecalItms);
                return tpl;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(string.Format(":{0}: Failed to build recall items xml." + "Exception is :{1}{2}", methodBaseName, ex.ToString(), System.Environment.NewLine));
                tpl = new Tuple<long, string, DataSet>(AtparStatusCodes.E_SERVERERROR, string.Empty, null);

                return tpl;


            }
            finally
            {
                sbXml = null;
            }


        }

        private Tuple<DataSet, DataSet, long> Execute_GetHeader_PostProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {


            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            char chrMultiUserDownLoad = '\0';
            bool downLoaded = false;
            bool deliverFlag = false;
            long transId = -1;
            string strShipToID = string.Empty;
            char chrInvItem = '\0';
            string strBUnit = string.Empty;
            string strPOID = string.Empty;
            string strLineNo = string.Empty;
            string strSchNo = string.Empty;
            string strDescr = string.Empty;
            string strVendorName = string.Empty;
            string strPODate = string.Empty;
            string strItemID = string.Empty;
            string strPOQty = string.Empty;
            string strDueDate = string.Empty;
            string strMItmID = string.Empty;
            string strUOM = string.Empty;
            string strUPCID = string.Empty;
            string strVendorID = string.Empty;
            string strVendItmID = string.Empty;
            string strLocDescr = string.Empty;
            string strAddress1 = string.Empty;
            string strAddress2 = string.Empty;
            string strAddress3 = string.Empty;
            string strPhone = string.Empty;
            string strFloor = string.Empty;
            string strSector = string.Empty;
            string strBuilding = string.Empty;
            string strComments = string.Empty;
            string strLocReqId = string.Empty;
            string strLocLocaId = string.Empty;
            string strLocDeptId = string.Empty;
            string strLocEmailId = string.Empty;
            string strLocSetId = string.Empty;
            string strHdrCmts = string.Empty;
            string strPOWithOutBU = string.Empty;
            string strPrice = string.Empty;
            string strRequisitionNo = string.Empty;

            Tuple<DataSet, DataSet, long> tupleOutput = null;
            long StatusCode = -1;

            try
            {
                //Reading data from Output ds
                DataRow drHeader = null;

                if (inputParameters.Tables.Count > 0)
                {
                    if (inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.HEADERS.ToString()))
                    {
                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                        {
                            chrMultiUserDownLoad = Convert.ToChar(inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.GetPO_PreReqData_Enum.MULTIPLE_USER_DOWNLOAD.ToString()]);
                        }
                        else
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " No Rows in Headers Table :E_INVALIDPARAMETER: " + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count + ":");
                            tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_INVALIDPARAMETER);

                            return tupleOutput;
                        }
                    }
                    else
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " No Headers Table in Input Paramters :E_INVALIDPARAMETER:");
                        tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_INVALIDPARAMETER);
                        return tupleOutput;
                    }
                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No Tables in Input Paramters :E_INVALIDPARAMETER:");
                    tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_INVALIDPARAMETER);

                    return tupleOutput;
                }

                if (outputParameters.Tables.Count > 0)
                {
                    if (outputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.HEADERS.ToString()))
                    {
                        if (outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                        {
                            drHeader = outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];
                        }
                        else
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " No Rows in Output Headers Table : " + outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count);
                            tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_SERVERERROR);
                            return tupleOutput;
                        }
                    }
                    else
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " No Headers Table in pOutputParameters : ");
                        tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_SERVERERROR);

                        return tupleOutput;
                    }
                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No Tables in pOutputParameters : Table Count : " + outputParameters.Tables.Count + ":");
                    tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_SERVERERROR);

                    return tupleOutput;
                }


                strBUnit = drHeader[AtParWebEnums.GetPO_Recv_ERP_Header.BUSINESS_UNIT.ToString()].ToString();
                strPOID = drHeader[AtParWebEnums.GetPO_Recv_ERP_Header.PO_ID.ToString()].ToString();
                strVendorName = drHeader[AtParWebEnums.GetPO_Recv_ERP_Header.VNDR_NAME.ToString()].ToString();
                strPODate = drHeader[AtParWebEnums.GetPO_Recv_ERP_Header.PO_DT.ToString()].ToString();
                strVendorID = drHeader[AtParWebEnums.GetPO_Recv_ERP_Header.VENDOR_ID.ToString()].ToString();
                strHdrCmts = drHeader[AtParWebEnums.GetPO_Recv_ERP_Header.HDR_CMTS.ToString()].ToString();

                if (strPOWithOutBU == null)
                {
                    strPOWithOutBU = string.Empty;
                }


                if (strPOWithOutBU == AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ":Search PO Without BU Parameter:" + strPOWithOutBU);
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ":Bunit:" + strBUnit);
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ":PO ID:" + strPOID);


                    if (!string.IsNullOrEmpty(strBUnit))
                    {
                        //To check if the PO is already downloaded by user otherthan logged in user
                        try
                        {
                            bool blnDownloaded = _poNonPoRepo.CheckIfPoAlreadyDownloaded(strBUnit, strPOID,
                                deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + ":" + StatusCode);
                                tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);

                                return tupleOutput;
                            }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + ":E_SERVERERROR: " + ex.ToString() + ":");
                            tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_SERVERERROR);

                            return tupleOutput;
                        }
                        //Checking if the Bunit is allocated to OrgGroup

                        try
                        {
                            StatusCode = CheckBUnitAllocation(deviceTokenEntry, strBUnit);

                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + "ATPAR_E_ASSIGN_ORGBUS");
                                tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);

                                return tupleOutput;
                            }

                        }
                        catch (SqlException sqlex)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + "ATPAR_E_REMOTEDBCONNECTFAIL : " + sqlex.ToString());
                            tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.ATPAR_E_REMOTEDBCONNECTFAIL);

                            return tupleOutput;
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + "E_SERVERERROR: " + ex.ToString());
                            tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_SERVERERROR);

                            return tupleOutput;
                        }

                        //Checking multi user download permission
                        if (chrMultiUserDownLoad.ToString() == AtParWebEnums.YesNo_Enum.N.ToString() && downLoaded)
                        {
                            StatusCode = AtparStatusCodes.RECV_E_LOCKEDBYOTHERUSER;
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + ":PO Locked by other user");
                            tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);

                            return tupleOutput;
                        }

                    }

                }

                // calling Get Transaction method to get a new transaction Id

                transId = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.Receiving);

                outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.GetPO_Recv_ERP_Header.TRANSID.ToString()] = transId;

                if (inputParameters.Tables.Count > 0)
                {
                    if (inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.PREREQDATA.ToString()))
                    {
                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.GetPO_PreReqData_Enum.NON_STOCK_STORE.ToString()].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                        {
                            deliverFlag = _poNonPoRepo.checkDeliver();

                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + ": _deliverFlag:" + deliverFlag);

                            //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                            //{
                            //    if (_log.IsWarnEnabled)
                            //        _log.Warn(methodBaseName + ":" + StatusCode);
                            //    tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);

                            //    return tupleOutput;
                            //}
                        }
                    }
                }

                StatusCode = AtparStatusCodes.ATPAR_OK;

                for (int i = 0; i <= outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count - 1; i++)
                {
                    DataRow drDetails = null;

                    chrInvItem = 'N';
                    drDetails = outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[i];

                    strShipToID = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.SHIPTO_ID.ToString()].ToString();
                    chrInvItem = Convert.ToChar(drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.INV_ITM_FLAG.ToString()].ToString());
                    strLineNo = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.LN_NBR.ToString()].ToString();
                    strSchNo = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.SCHED_NBR.ToString()].ToString();
                    strDescr = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.DESCR.ToString()].ToString();
                    strItemID = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.ITEM_ID.ToString()].ToString();
                    strPOQty = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.QTY_PO.ToString()].ToString();

                    if (drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.PURCHASE_REQ_NO.ToString()] != null)
                    {
                        strRequisitionNo = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.PURCHASE_REQ_NO.ToString()].ToString();
                    }
                    else
                    {
                        strRequisitionNo = string.Empty;
                    }

                    //// We have possibility to get Due date empty from ERPs
                    if (drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.DUE_DT.ToString()] != null)
                    {
                        if (!string.IsNullOrEmpty(drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.DUE_DT.ToString()].ToString()))
                        {
                            strDueDate = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.DUE_DT.ToString()].ToString();
                        }
                        else
                        {
                            strDueDate = "01/01/1900";
                        }
                    }
                    else
                    {
                        strDueDate = "01/01/1900";
                    }
                    strMItmID = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.MFG_ITM_ID.ToString()].ToString();
                    strUOM = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.UOM.ToString()].ToString();
                    strUPCID = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.UPC_ID.ToString()].ToString();
                    strVendItmID = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.VNDR_ITM_ID.ToString()].ToString();
                    strComments = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.LCMNTS.ToString()].ToString();
                    strPrice = drDetails[AtParWebEnums.GetPO_Recv_ERP_Details.PRICE.ToString()].ToString();

                    if (inputParameters.Tables.Count > 0)
                    {
                        if (inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.PREREQDATA.ToString()))
                        {
                            if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.GetPO_PreReqData_Enum.NON_STOCK_STORE.ToString()].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                            {
                                if (deliverFlag)
                                {
                                    bool blnStockItem = false;

                                    blnStockItem = _poNonPoRepo.CheckShipToIDAllocation(strShipToID, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString(), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                                    if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                    {
                                        //_trans.Rollback();
                                        if (_log.IsWarnEnabled)
                                            _log.Warn(methodBaseName + "Check NonStockItem Failed ");
                                        tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);

                                        return tupleOutput;
                                    }


                                    for (int j = 0; j <= outputParameters.Tables[AtParWebEnums.DataSet_Type.LOCATIONS.ToString()].Rows.Count - 1; j++)
                                    {
                                        DataRow item = outputParameters.Tables[AtParWebEnums.DataSet_Type.LOCATIONS.ToString()].Rows[j];

                                        if (item[0].ToString() == strLineNo)
                                        {
                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.REQUESTOR_ID.ToString()].ToString()) != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.REQUESTOR_ID.ToString()].ToString()))
                                            {
                                                strLocReqId = item[AtParWebEnums.GetPO_Recv_ERP_LOC.REQUESTOR_ID.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strLocReqId = string.Empty;
                                            }

                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.LOCATION.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.LOCATION.ToString()].ToString())))
                                            {
                                                strLocLocaId = item[AtParWebEnums.GetPO_Recv_ERP_LOC.LOCATION.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strLocLocaId = string.Empty;
                                            }
                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.DEPTID.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.DEPTID.ToString()].ToString())))

                                            {
                                                strLocDeptId = item[AtParWebEnums.GetPO_Recv_ERP_LOC.DEPTID.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strLocDeptId = string.Empty;
                                            }

                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.EMAILID.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.EMAILID.ToString()].ToString())))
                                            {
                                                strLocEmailId = item[AtParWebEnums.GetPO_Recv_ERP_LOC.EMAILID.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strLocEmailId = string.Empty;
                                            }

                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.SETID.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.SETID.ToString()].ToString())))

                                            {
                                                strLocSetId = item[AtParWebEnums.GetPO_Recv_ERP_LOC.SETID.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strLocSetId = string.Empty;
                                            }
                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.DESCR.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.DESCR.ToString()].ToString())))


                                            {
                                                strLocDescr = item[AtParWebEnums.GetPO_Recv_ERP_LOC.DESCR.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strLocDescr = string.Empty;
                                            }

                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS1.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS1.ToString()].ToString())))
                                            {
                                                strAddress1 = item[AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS1.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strAddress1 = string.Empty;
                                            }

                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS2.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS2.ToString()].ToString())))

                                            {
                                                strAddress2 = item[AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS2.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strAddress2 = string.Empty;
                                            }

                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS3.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS3.ToString()].ToString())))

                                            {
                                                strAddress3 = item[AtParWebEnums.GetPO_Recv_ERP_LOC.ADDRESS3.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strAddress3 = string.Empty;
                                            }

                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.PHONE.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.PHONE.ToString()].ToString())))

                                            {
                                                strPhone = item[AtParWebEnums.GetPO_Recv_ERP_LOC.PHONE.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strPhone = string.Empty;
                                            }

                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.FLOOR.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.FLOOR.ToString()].ToString())))

                                            {
                                                strFloor = item[AtParWebEnums.GetPO_Recv_ERP_LOC.FLOOR.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strFloor = string.Empty;
                                            }

                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.BUILDING.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.BUILDING.ToString()].ToString())))

                                            {
                                                strBuilding = item[AtParWebEnums.GetPO_Recv_ERP_LOC.BUILDING.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strBuilding = string.Empty;
                                            }

                                            if ((item[AtParWebEnums.GetPO_Recv_ERP_LOC.SECTOR.ToString()].ToString() != null ||
                                                string.IsNullOrEmpty(item[AtParWebEnums.GetPO_Recv_ERP_LOC.SECTOR.ToString()].ToString())))

                                            {
                                                strSector = item[AtParWebEnums.GetPO_Recv_ERP_LOC.SECTOR.ToString()].ToString();
                                            }
                                            else
                                            {
                                                strSector = string.Empty;
                                            }

                                            break; // TODO: might not be correct. Was : Exit For
                                        }
                                    }

                                    if (chrInvItem.ToString() == AtParWebEnums.YesNo_Enum.N.ToString() ||
                                        (chrInvItem.ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() && blnStockItem == true))
                                    {
                                        int transactionId = 0;


                                        transactionId = _poNonPoRepo.GetExistingDetailTransForPOItem(strBUnit, strPOID, strLineNo, strSchNo);

                                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                        {
                                            if (_log.IsWarnEnabled)
                                                _log.Warn(methodBaseName + ": Error while retreiving Transaction Id for " + " Business Unit= " + strBUnit + ", POId= " + strPOID + " Line Number= " + strLineNo + " AND Schedule No= " + strSchNo + " Status Code Returned  : " + StatusCode);

                                            // _trans.Rollback();

                                            tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);

                                            return tupleOutput;
                                        }

                                        if (_log.IsDebugEnabled)
                                            _log.Debug(" Transaction Id Returned for " + " Business Unit= " + strBUnit + ", POId= " + strPOID + " Line Number= " + strLineNo + " AND Schedule No= " + strSchNo + " is :" + transactionId + ":");



                                        if (transactionId == 0)
                                        {
                                            //To get the latest transaction id

                                            transId = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.Deliver);

                                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                            {
                                                // _trans.Rollback();
                                                if (_log.IsWarnEnabled)
                                                    _log.Warn(methodBaseName + ":" + StatusCode);
                                                tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);

                                                return tupleOutput;
                                            }


                                            //Inserting into Transaction Table

                                            POCOEntities.AtPar_Detail_Transaction_Entity objDetTransEntity = new POCOEntities.AtPar_Detail_Transaction_Entity();

                                            objDetTransEntity.Transaction_Id = (int)transId;
                                            objDetTransEntity.ApplicationId = (int)AtParWebEnums.EnumApps.Deliver;
                                            objDetTransEntity.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                                            objDetTransEntity.DeviceId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].ToString();
                                            objDetTransEntity.Key1 = strBUnit;
                                            objDetTransEntity.Key7 = Convert.ToInt32(strSchNo);
                                            objDetTransEntity.Status = AtParDefns.m_statDetailOpen;
                                            objDetTransEntity.ReportData1 = strPOID;
                                            objDetTransEntity.ReportData2 = Convert.ToInt32(strLineNo);
                                            objDetTransEntity.ReportData4 = strLocReqId;
                                            objDetTransEntity.ReportData5 = strLocLocaId;
                                            objDetTransEntity.ReportData7 = strLocDeptId;
                                            objDetTransEntity.ReportData8 = strDescr.substituteString();
                                            if (!string.IsNullOrEmpty(strVendorName))
                                            {
                                                objDetTransEntity.ReportData9 = strVendorName.Replace("'", "''").Replace("\"", string.Empty);
                                            }

                                            if (chrInvItem.ToString() == AtParWebEnums.YesNo_Enum.N.ToString())
                                            {
                                                objDetTransEntity.ReportData10 = AtParWebEnums.YesNo_Enum.N.ToString();
                                            }
                                            else if (chrInvItem.ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                                            {
                                                objDetTransEntity.ReportData10 = AtParWebEnums.YesNo_Enum.Y.ToString();
                                            }

                                            objDetTransEntity.ReportData13 = Convert.ToDateTime(strPODate);
                                            objDetTransEntity.ReportData14 = strLocEmailId;
                                            objDetTransEntity.ReportData16 = strItemID;
                                            objDetTransEntity.ReportData17 = Convert.ToDouble(strPOQty);
                                            objDetTransEntity.NonPoItem = AtParWebEnums.YesNo_Enum.N.ToString();
                                            objDetTransEntity.ReportData15 = strShipToID;

                                            if (!string.IsNullOrEmpty(strDueDate))
                                            {
                                                objDetTransEntity.ReportData18 = Convert.ToDateTime(strDueDate);
                                            }
                                            objDetTransEntity.ReportData19 = strMItmID;
                                            objDetTransEntity.ReportData20 = strUOM;
                                            objDetTransEntity.ReportData21 = strUPCID;
                                            objDetTransEntity.ReportData22 = strVendorID;

                                            if (!string.IsNullOrEmpty(strVendItmID))
                                            {
                                                objDetTransEntity.ReportData23 = strVendItmID.Replace("'", "''").Replace("\"", string.Empty);
                                            }

                                            objDetTransEntity.ReportData25 = strLocSetId;
                                            objDetTransEntity.ReportData26 = strLocDescr.substituteString();
                                            objDetTransEntity.ReportData27 = strComments.substituteString();
                                            objDetTransEntity.ReportData33 = strAddress1.substituteString();
                                            objDetTransEntity.ReportData34 = strAddress2.substituteString();
                                            objDetTransEntity.ReportData35 = strAddress3.substituteString();
                                            objDetTransEntity.ReportData36 = strPhone.substituteString();
                                            objDetTransEntity.StartDateTime = DateTime.Now;
                                            objDetTransEntity.EndDateTime = DateTime.Now;
                                            objDetTransEntity.ReportData12 = DateTime.Now;
                                            objDetTransEntity.ReportData37 = strHdrCmts.substituteString();
                                            objDetTransEntity.ReportData38 = strPrice;
                                            objDetTransEntity.ReportData42 = strFloor;
                                            objDetTransEntity.ReportData43 = strSector;
                                            objDetTransEntity.ReportData44 = strBuilding;
                                            objDetTransEntity.ReportData46 = strRequisitionNo;

                                            StatusCode = _commonRepo.InsertDetailTransaction(objDetTransEntity);

                                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                            {
                                                // _trans.Rollback();
                                                if (_log.IsWarnEnabled)
                                                    _log.Warn(methodBaseName + ":InsertDetailTransaction Failed");
                                                tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);

                                                return tupleOutput;
                                            }

                                        }
                                        // _dsTransId = null;
                                    }
                                }
                            }
                        }
                    }
                }


                //Inserting into Transaction Table


                POCOEntities.AtPar_Transaction_Entity objHdrTransEntity = new POCOEntities.AtPar_Transaction_Entity();

                objHdrTransEntity.TransactionId = (int)transId;
                objHdrTransEntity.ApplicationId = (int)AtParWebEnums.EnumApps.Receiving;
                objHdrTransEntity.ID = strPOID;
                objHdrTransEntity.BusinessUnit = strBUnit;
                objHdrTransEntity.Status = AtParDefns.statDownloaded;
                objHdrTransEntity.TotalRecordDownloaded = outputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;
                objHdrTransEntity.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                objHdrTransEntity.DeviceId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].ToString();
                objHdrTransEntity.DownloadUserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();


                StatusCode = _commonRepo.InsertTransaction(objHdrTransEntity);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    // _trans.Rollback();
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + ":InsertTransaction Failed");
                    tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, StatusCode);

                    return tupleOutput;
                }
                //_trans.Commit();

                tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.ATPAR_OK);

                return tupleOutput;
            }
            catch (Exception ex)
            {
                // _trans.Rollback();
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetHeader_PostProcessTasks failed " + System.Environment.NewLine + ex.ToString());

                tupleOutput = new Tuple<DataSet, DataSet, long>(outputParameters, inputParameters, AtparStatusCodes.E_SERVERERROR);

                return tupleOutput;
            }

        }


        #endregion

        #region DeleteHeader
        public AtParWebApiResponse<long> DeleteHeader(List<VM_RECV_POHEADER> lstDeleteHeader, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            DataSet OutputParameter = new DataSet();
            //Tuple<DataSet, long> tupleResult = null;


            try
            {
                long StatusCode = DeleteHeader_Implementation(lstDeleteHeader, OutputParameter, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }

        }
        public long DeleteHeader_Implementation(List<VM_RECV_POHEADER> lstDeleteHeader, DataSet outputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {


                //Converting list to DataSet
                DataSet inputParameters = new DataSet();
                DataTable dtinputParameters = new DataTable();
                dtinputParameters = lstDeleteHeader.ToDataTable();
                inputParameters.Tables.Add(dtinputParameters);

                //Setting HeaderName Table1 to HEADERS

                inputParameters.Tables[0].TableName = AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString();


                //Checking input Parameters

                StatusCode = Check_DeleteHeader_InputParameters(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    //tupleResult = new Tuple<DataSet, long>(null, StatusCode);

                    return StatusCode;
                }


                //Preprocess Tasks

                //StatusCode = Execute_DeleteHeader_PreProcessTasks(inputParameters,ref outputParameters,deviceTokenEntry);

                //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                //{
                //   // tupleResult = new Tuple<DataSet, long>(OutputParameter, StatusCode);

                //    return StatusCode;
                //}


                //Process Tasks

                StatusCode = Execute_DeleteHeader_ProcessTasks(inputParameters, outputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    //tupleResult = new Tuple<DataSet, long>(OutputParameter, tplResult.Item1);

                    return StatusCode;
                }



                //PostProcess Tasks

                //StatusCode = Execute_DeleteHeader_PostProcessTasks(inputParameters, ref outputParameters, deviceTokenEntry);

                //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                //{
                //    //tupleResult = new Tuple<DataSet, long>(OutputParameter, StatusCode);

                //    return StatusCode;
                //}


                //tupleResult = new Tuple<DataSet, long>(OutputParameter, AtparStatusCodes.ATPAR_OK);
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ":E_SERVERERROR: " + ex.ToString());
                //tupleResult = new Tuple<DataSet, long>(OutputParameter, AtparStatusCodes.E_SERVERERROR);
                return AtparStatusCodes.E_SERVERERROR;

            }
        }
        private long Check_DeleteHeader_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long _statusCode = -1;

            try
            {
                ///// Printing InPut DataSet ///'
                if (_log.IsDebugEnabled)
                {
                    //DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                    inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);

                    //StatusCode = PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);

                    //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //        _log.Fatal(methodBaseName + " Error occured in PrintDatasetStatistics. Status Code Returned is : " + StatusCode);
                    //    return StatusCode;
                    //}

                }
                ///// End of Printing InPut DataSet ///'

                if (inputParameters.Tables.Count != 1)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Incorrect DataTable Count " + inputParameters.Tables.Count);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Transaction table Rows count : " + inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows.Count.ToString());

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows.Count == 0)
                {
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }


                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString());
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }
        }
        private long Execute_DeleteHeader_ProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            string fldTransactionId = string.Empty;

            try
            {

                if (inputParameters.Tables.Count > 0)
                {
                    if (inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()))
                    {
                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows.Count > 0)
                        {
                            fldTransactionId = inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows[0][AtParWebEnums.DeletePO_Recv_Header_Enum.TRANS_ID.ToString()].ToString();


                            POCOEntities.AtPar_Transaction_Entity updateTrans = new POCOEntities.AtPar_Transaction_Entity();

                            if (!string.IsNullOrEmpty(fldTransactionId))
                            {
                                updateTrans.TransactionId = Convert.ToInt32(fldTransactionId);
                            }
                            updateTrans.ApplicationId = (int)AtParWebEnums.EnumApps.Receiving;
                            updateTrans.Status = AtParDefns.statCancel;
                            updateTrans.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                            StatusCode = _commonRepo.UpdateTransaction(updateTrans);

                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsWarnEnabled)
                                    _log.Warn(methodBaseName + " Status code Returned form UpdateTransaction is " + ":" + StatusCode + ": ");
                                return AtparStatusCodes.E_SERVERERROR;
                            }
                        }
                        else
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " No Transaction Id in Transactions Table of InputParameters ");
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                    }
                    else
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " No Transaction Id in Transactions Table of InputParameters ");
                        return AtparStatusCodes.E_SERVERERROR;

                    }
                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No  Tables  in InputParameters ");
                    return AtparStatusCodes.E_SERVERERROR;

                }


                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_DeleteHeader_ProcessTasks failed " + System.Environment.NewLine + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }


        }

        #endregion

        #region SendDetails
        public AtParWebApiResponse<long> SendDetails(Dictionary<string, dynamic> dicDataItems, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            DataSet inputParameters = new DataSet();

            DataTable receive_header_dt = new DataTable();//VM_RECV_SENDPOHEADER//
            DataTable receive_details_dt = new DataTable();//VM_RECV_SENDPODETAILS
            DataTable receive_itemSubdetails_dt = new DataTable();//VM_RECV_SENDPOSUBDETAILS
            try
            {


                receive_header_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendPO_Receive_Header_Defns,
                        AtParWebEnums.DataSet_Type.HEADERS.ToString());

                receive_details_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendPO_Receive_Details_Defns,
                        AtParWebEnums.DataSet_Type.DETAILS.ToString());

                receive_itemSubdetails_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendPO_Receive_ItemSubDetails_Defns,
                      AtParWebEnums.DataSet_Type.SUBDETAILS.ToString());


                foreach (var keyValuePair in dicDataItems)
                {
                    switch (keyValuePair.Key)
                    {
                        case "HEADER":


                            foreach (var item in keyValuePair.Value)
                            {
                                DataRow _drHed = receive_header_dt.NewRow();

                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.BUSINESS_UNIT.ToString()] = item.BUSINESS_UNIT == null ? string.Empty : item.BUSINESS_UNIT;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.PO_ID.ToString()] = (item.PO_ID).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.VENDOR_ID.ToString()] = (item.VENDOR_ID).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.BUSINESS_UNIT_PO.ToString()] = (item.BUSINESS_UNIT_PO).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.TRANSACTION_CODE.ToString()] = (item.TRANSACTION_CODE).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.DROP_SHIP_FL.ToString()] = (item.DROP_SHIP_FL).Value;
                                _drHed[(int)AtParWebEnums.SendPO_Receive_Header_Enum.TRANSACTION_ID] = (item.TRANSACTION_ID).Value;
                                _drHed[(int)AtParWebEnums.SendPO_Receive_Header_Enum.START_DT_TIME] = DateTime.Now.ToString(AtParDateTimes.ATPAR_LONGDATETIME_24H);
                                _drHed[(int)AtParWebEnums.SendPO_Receive_Header_Enum.END_DT_TIME] = DateTime.Now.ToString(AtParDateTimes.ATPAR_LONGDATETIME_24H); //(item.END_DT_TIME).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.CARRIER_ID.ToString()] = (item.CARRIER_ID).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.BILL_OF_LADING.ToString()] = (item.BILL_OF_LADING).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.INVOICE_NO.ToString()] = item.INVOICE_NO == null ? " " : (item.INVOICE_NO).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.STATUS.ToString()] = (int)AtParWebEnums.EnumApps.Receiving;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.USER_ID.ToString()] = (item.USER_ID).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.NON_STOCK_COUNT.ToString()] = (item.NON_STOCK_COUNT).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.STOCK_COUNT.ToString()] = (item.STOCK_COUNT).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.RECEIVER_ID.ToString()] = item.RECEIVER_ID == null ? string.Empty : (item.RECEIVER_ID).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.HDR_CMTS.ToString()] = (item.HDR_CMTS).Value;
                                _drHed[AtParWebEnums.SendPO_Receive_Header_Enum.PO_DT.ToString()] = (item.PO_DT).Value;

                                receive_header_dt.Rows.Add(_drHed);
                            }

                            break;

                        case "DETAILS":

                            foreach (var item in keyValuePair.Value)
                            {
                                DataRow _drDet = receive_details_dt.NewRow();

                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR.ToString()] = (item.LINE_NBR).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()] = (item.SCHED_NBR).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()] = (item.QTY).Value;
                                _drDet[(int)AtParWebEnums.SendPO_Receive_Details_Enum.UNIT_OF_MEASURE] = (item.UNIT_OF_MEASURE).Value;
                                _drDet[(int)AtParWebEnums.SendPO_Receive_Details_Enum.CARRIER_ID] = (item.CARRIER_ID).Value;
                                _drDet[(int)AtParWebEnums.SendPO_Receive_Details_Enum.BILL_OF_LADING] = (item.BILL_OF_LADING).Value;
                                _drDet[(int)AtParWebEnums.SendPO_Receive_Details_Enum.SHIPTO_ID] = (item.SHIPTO_ID).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.NO_OF_BOXES.ToString()] = (item.NO_OF_BOXES).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID.ToString()] = (item.INV_ITEM_ID).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.INVENTORY_ITEM.ToString()] = (item.INVENTORY_ITEM).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.QTY_PO.ToString()] = item.QTY_PO == null ? 0 : Convert.ToDouble((item.QTY_PO).Value);
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.TRACKING_ID.ToString()] = (item.TRACKING_ID).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.EXT_TRK_NO.ToString()] = (item.EXT_TRK_NO).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.RECEIVING_ROUTING_ID.ToString()] = (item.RECEIVING_ROUTING_ID).Value;
                                _drDet[(int)AtParWebEnums.SendPO_Receive_Details_Enum.LOCATION] = (item.LOCATION).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.RECEIVED_QTY.ToString()] = item.RECEIVED_QTY == null ? 0 : Convert.ToDouble((item.RECEIVED_QTY).Value);
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()] = item.RECV_UOM == null ? " " : (item.RECV_UOM).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()] = item.RECV_CONVERSION_RATE == null ? 0 : Convert.ToDouble((item.RECV_CONVERSION_RATE).Value);
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()] = item.LOT_ID == null ? " " : (item.LOT_ID).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()] = item.SERIAL_ID == null ? " " : (item.SERIAL_ID).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.CONVERSION_RATE.ToString()] = item.CONVERSION_RATE == null ? 0 : Convert.ToDouble((item.CONVERSION_RATE).Value);
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.ASN_QTY.ToString()] = (item.ASN_QTY == null ? 0 : Convert.ToDouble((item.ASN_QTY).Value));
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_CMTS.ToString()] = item.LINE_CMTS == null ? " " : (item.LINE_CMTS).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.CUST_ITEM_NO.ToString()] = item.CUST_ITEM_NO == null ? " " : (item.CUST_ITEM_NO).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()] = item.EXPIRY_DATE == null ? " " : (item.EXPIRY_DATE).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.DESCRIPTION.ToString()] = item.DESCRIPTION == null ? " " : (item.DESCRIPTION).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.DUE_DT.ToString()] = item.DUE_DT == null ? " " : (item.DUE_DT).Value;
                                _drDet[AtParWebEnums.SendPO_Receive_Details_Enum.STORAGE_LOCATION.ToString()] = item.STORAGE_LOCATION == null ? " " : (item.STORAGE_LOCATION).Value;

                                receive_details_dt.Rows.Add(_drDet);
                            }

                            break;
                        case "SUBDETAILS":

                            if (keyValuePair.Value != null)
                            {
                                foreach (var item in keyValuePair.Value)
                                {
                                    DataRow _drDet1 = receive_itemSubdetails_dt.NewRow();
                                    _drDet1[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LINE_NBR.ToString()] = (item.LINE_NBR).Value;
                                    _drDet1[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR.ToString()] = (item.SCHED_NBR).Value;
                                    _drDet1[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LOT_ID.ToString()] = item.LOT_ID == null ? "" : (item.LOT_ID).Value;
                                    _drDet1[(int)AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SERIAL_ID] = item.SERIAL_ID == null ? "" : (item.SERIAL_ID).Value;
                                    _drDet1[(int)AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.UNIT_OF_MEASURE] = item.UOM == null ? "" : (item.UOM).Value;
                                    _drDet1[(int)AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.CONVERSION_RATE] = item.CONVERSION_RATE == null ? 0 : (item.CONVERSION_RATE).Value == "" ? 0 : Convert.ToDouble((item.CONVERSION_RATE).Value);
                                    _drDet1[(int)AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE] = item.EXPIRY_DATE == null ? "" : (item.EXPIRY_DATE).Value;
                                    _drDet1[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.QTY.ToString()] = item.QTY == null ? 0 : (item.QTY).Value == "" ? 0 : Convert.ToDouble((item.QTY).Value);
                                    receive_itemSubdetails_dt.Rows.Add(_drDet1);
                                }
                            }
                            break;
                    }
                }

                inputParameters.Tables.Add(receive_header_dt);
                inputParameters.Tables.Add(receive_details_dt);
                inputParameters.Tables.Add(receive_itemSubdetails_dt);


                DataSet OutputParameter = new DataSet();
                Tuple<DataSet, long> tpleOutput = SendDetails_Implementation(inputParameters, OutputParameter, deviceTokenEntry);
                OutputParameter = tpleOutput.Item1;

                if (tpleOutput.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tpleOutput.Item2, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }

        }

        private Tuple<DataSet, long> SendDetails_Implementation(DataSet inputParameters, DataSet outputParameter, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            long StatusCode = -1;
            Tuple<DataSet, long> tupleResult = null;

            try
            {

                //HiPerfTimer _timer = new HiPerfTimer();
                // _timer.Start();
                // long _StatusCode = -1;

                Tuple<DataSet, DataSet, long> tpleOutput = Do_SendPO(inputParameters, outputParameter, deviceTokenEntry);

                inputParameters = tpleOutput.Item1;
                outputParameter = tpleOutput.Item2;
                StatusCode = tpleOutput.Item3;
                if (outputParameter != null)
                {
                    if (outputParameter.Tables.Count > 0)
                    {
                        if (outputParameter.Tables.Contains(AtParWebEnums.DataSet_Type.OUTPUT.ToString()))
                        {
                            if (outputParameter.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows.Count > 0)
                            {

                                outputParameter.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows[0].BeginEdit();

                                outputParameter.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Output_Enum.STATUS_CODE.ToString()] = StatusCode;

                                outputParameter.Tables[AtParWebEnums.DataSet_Type.OUTPUT.ToString()].Rows[0].EndEdit();
                            }
                        }
                    }
                }
                //OutputParameters = pOutputParams.Copy;

                tupleResult = new Tuple<DataSet, long>(outputParameter, StatusCode);
                return tupleResult;
                //_timer.Stop();
                //if (perflog.IsInfoEnabled)
                //    perflog.Info(methodBaseName + " " + _timer.Duration + " seconds");

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString());
                tupleResult = new Tuple<DataSet, long>(outputParameter, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;
            }
        }
        public Tuple<DataSet, DataSet, long> Do_SendPO(DataSet inputParameters, DataSet outputParameter, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<DataSet, DataSet, long> tupleResult = null;

            try
            {

                //Checking input Parameters

                StatusCode = Check_SendDetails_InputParameters(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, DataSet, long>(null, null, StatusCode);

                    return tupleResult;
                }


                //Preprocess Tasks

                tupleResult = Execute_SendDetails_PreProcessTasks(inputParameters, outputParameter, deviceTokenEntry);
                inputParameters = tupleResult.Item1;
                outputParameter = tupleResult.Item2;
                StatusCode = tupleResult.Item3;

                if (tupleResult.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, tupleResult.Item3);

                    return tupleResult;
                }


                //Process Tasks

                tupleResult = Execute_SendDetails_ProcessTasks(inputParameters, outputParameter, deviceTokenEntry);

                inputParameters = tupleResult.Item1;
                outputParameter = tupleResult.Item2;
                StatusCode = tupleResult.Item3;

                if (tupleResult.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, tupleResult.Item3);

                    return tupleResult;
                }


                //PostProcess Tasks

                //StatusCode = Execute_SendDetails_PostProcessTasks(ref inputParameters, ref outputParameter, deviceTokenEntry);

                //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                //{
                //   // tupleResult = new Tuple<DataSet, long>(OutputParameter, StatusCode);

                //    return StatusCode;
                //}

                tupleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, StatusCode);

                return tupleResult;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ":E_SERVERERROR: " + ex.ToString());
                tupleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }
        }

        private long Check_SendDetails_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long _statusCode = -1;

            try
            {
                ///// Printing InPut DataSet ///'
                if (_log.IsDebugEnabled)
                {
                    //DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                    inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);

                    //StatusCode = PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);

                    //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //        _log.Fatal(methodBaseName + " Error occured in PrintDatasetStatistics. Status Code Returned is : " + StatusCode);
                    //    return StatusCode;
                    //}

                }
                ///// End of Printing InPut DataSet ///'

                if (inputParameters.Tables.Count < 3)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Incorrect DataTable Count " + inputParameters.Tables.Count);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " " + inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count.ToString() + " lines received for PO : " + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.PO_ID.ToString()]);

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString());
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }
        }

        private Tuple<DataSet, DataSet, long> Execute_SendDetails_PreProcessTasks(DataSet inputParameters, DataSet outputParameters,
            string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            long StatusCode = 0;
            Tuple<DataSet, DataSet, long> tupleOutput = null;

            try
            {
                Tuple<DataSet, long> tple = null;

                tple = Populate_SendDetails_InputParameters(inputParameters);
                inputParameters = tple.Item1;

                if (tple.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, tple.Item2);

                    return tupleOutput;
                }




                tple = Populate_SendDetails_OutputParameters(outputParameters);
                outputParameters = tple.Item1;

                if (tple.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, tple.Item2);

                    return tupleOutput;

                }



                tupleOutput = Populate_SendDetails_Prerequisites(inputParameters, outputParameters, deviceTokenEntry);

                inputParameters = tupleOutput.Item1;
                outputParameters = tupleOutput.Item2;

                if (tupleOutput.Item3 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<DataSet, DataSet, long>(null, null, tupleOutput.Item3);

                    return tupleOutput;
                }

                tupleOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.ATPAR_OK);

                return tupleOutput;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Populate_GetHeader_ListViewData failed " + System.Environment.NewLine + ex.ToString());
                tupleOutput = new Tuple<DataSet, DataSet, long>(null, null, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;

            }
        }

        private Tuple<DataSet, long> Populate_SendDetails_InputParameters(DataSet inputParameters)
        {


            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<DataSet, long> tupleResult = null;
            long StatusCode = -1;
            //DataSet inputParameters = new DataSet();


            try
            {
                DataTable br_dt = new DataTable();

                br_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendPO_Receive_BusinessRules_Defns, "PREREQDATA");

                // Add these tables to actual input parameters
                inputParameters.Tables.Add(br_dt);


                tupleResult = new Tuple<DataSet, long>(inputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());

                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }

        }

        private Tuple<DataSet, long> Populate_SendDetails_OutputParameters(DataSet outputParameters)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataTable out_dt = new DataTable();
            long StatusCode = -1;
            Tuple<DataSet, long> tupleResult = null;
            try
            {


                out_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendPO_Receive_Output_Defns, "OUTPUT");

                // Add these tables to actual input parameters
                outputParameters.Tables.Add(out_dt);


                DataRow drDet = outputParameters.Tables["OUTPUT"].NewRow();
                //  drDet[AtParWebEnums.SendPO_Receive_Output_Enum.STATUS_CODE.ToString()] = AtparStatusCodes.E_SERVERERROR;

                outputParameters.Tables["OUTPUT"].Rows.Add(drDet);


                tupleResult = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleResult;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());
                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }

        }

        private Tuple<DataSet, DataSet, long> Populate_SendDetails_Prerequisites(DataSet inputParameters, DataSet outputParameters,
            string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SortedList<string, string> userParams;
            SortedList<string, string> orgParams;
            SortedList<string, string> profParams;


            string erpObjName = "";
            string remoteDBType = "";
            string remoteSchema = "";
            string erpDetails = "";
            string erpVersion = "";

            string orgGroupId = string.Empty;
            string profileId = string.Empty;
            string userId = string.Empty;
            int appID = 0;

            long StatusCode = -1;
            Tuple<DataSet, DataSet, long> tupleResult = null;



            try
            {

                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.NON_STOCK_STORE.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.PS_USER.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ASN_RECEIPT_STATUS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.POU_IMPLEMENTED.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.CUSTOM_VIEW_ERPUSER.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.RESTRICT_ZERO_QTY.ToString()] = string.Empty;

                orgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();
                appID = (int)AtParWebEnums.EnumApps.Receiving;


                //Getting OrgParam Values
                _commonRepo.GetOrgGroupParamValues(orgParams, appID, orgGroupId);



                //Getting Profile Params
                profParams = new SortedList<string, string>();
                profParams[AtParWebEnums.AppParameters_Enum.ITEM_RECV_HIGH_PCT.ToString()] = string.Empty;
                profParams[AtParWebEnums.AppParameters_Enum.ITEM_RECV_LOW_PCT.ToString()] = string.Empty;


                appID = (int)AtParWebEnums.EnumApps.Receiving;
                profileId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString();

                _commonRepo.GetProfileParamValues(profParams, appID, profileId);


                //Getting UserParams values
                userParams = new SortedList<string, string>();

                userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()] = string.Empty;
                userParams[AtParWebEnums.AppParameters_Enum.PRINTER_ADDRESS.ToString()] = string.Empty;

                appID = (int)AtParWebEnums.EnumApps.Receiving;
                profileId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString();
                userId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                _commonRepo.GetUserParamValues(userParams, appID, userId);



                DataRow dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.NON_STOCK_STORE] = orgParams[AtParWebEnums.AppParameters_Enum.NON_STOCK_STORE.ToString()];

                //GetConfigData();

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISEVERSION.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                remoteDBType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                            x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                            .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                  x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                  .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                erpDetails = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString())
                                                      .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                erpVersion = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                          x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISEVERSION.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (erpObjName == AtParWebEnums.Enterprise_Enum.Oracle.ToString())
                {
                    if (!string.IsNullOrEmpty(userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()]))
                    {
                        dr[AtParWebEnums.SendPO_Receive_BusinessRules_Enum.ERP_USER_ID.ToString()] = userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()];
                    }
                    else
                    {
                        tupleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.E_INVALIDPARAMETER);
                    }
                }
                if (!string.IsNullOrEmpty(userParams[AtParWebEnums.AppParameters_Enum.PRINTER_ADDRESS.ToString()]))
                {
                    dr[AtParWebEnums.SendPO_Receive_BusinessRules_Enum.PRINTER_ADDRESS.ToString()] = userParams[AtParWebEnums.AppParameters_Enum.PRINTER_ADDRESS.ToString()];
                }
                if (!string.IsNullOrEmpty(userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()]))
                {
                    dr[AtParWebEnums.SendPO_Receive_BusinessRules_Enum.PS_USER.ToString()] = userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()];
                }
                else
                {
                    dr[AtParWebEnums.SendPO_Receive_BusinessRules_Enum.PS_USER.ToString()] = orgParams[AtParWebEnums.AppParameters_Enum.PS_USER.ToString()];
                }


                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.ASN_RECEIPT_STATUS] = orgParams[AtParWebEnums.AppParameters_Enum.ASN_RECEIPT_STATUS.ToString()];
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.ITEM_RECV_HIGH_PCT] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_RECV_HIGH_PCT.ToString()];
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.ITEM_RECV_LOW_PCT] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_RECV_LOW_PCT.ToString()];
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.REMOTE_SCHEMA] = remoteSchema;
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.REMOTE_DB_TYPE] = remoteDBType;
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME] = erpDetails;
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.ENTERPRISE_VERSION] = erpVersion;
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.LOT_SERIAL_ENABLED] = orgParams[AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()];
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS] = orgParams[AtParWebEnums.AppParameters_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString()];
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR] = orgParams[AtParWebEnums.AppParameters_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR.ToString()];
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.POU_IMPLEMENTED] = orgParams[AtParWebEnums.AppParameters_Enum.POU_IMPLEMENTED.ToString()];
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.CUSTOM_VIEW_ERPUSER] = orgParams[AtParWebEnums.AppParameters_Enum.CUSTOM_VIEW_ERPUSER.ToString()];
                dr[(int)AtParWebEnums.SendPO_Receive_BusinessRules_Enum.RESTRICT_ZERO_QTY] = orgParams[AtParWebEnums.AppParameters_Enum.RESTRICT_ZERO_QTY.ToString()];

                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(dr);


                tupleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());

                tupleResult = new Tuple<DataSet, DataSet, long>(null, null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }
        }

        private Tuple<DataSet, DataSet, long> Execute_SendDetails_ProcessTasks(DataSet inputParameters, DataSet outputParameters,
            string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            int transaction_id = 0;
            string po_id = string.Empty;
            string poHeaderStatus = string.Empty;
            SortedList<string, string> transStatus;
            long transIDStatus = -1;
            int i = 0;

            Tuple<DataSet, DataSet, long> tpleResult = null;

            try
            {

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                {
                    transaction_id = Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.TRANSACTION_ID.ToString()]);
                }

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                {
                    po_id = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.PO_ID.ToString()].ToString();
                }


                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                {
                    poHeaderStatus = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.STATUS.ToString()].ToString();
                }


                if (!string.IsNullOrEmpty(poHeaderStatus))
                {
                    if (poHeaderStatus == ((int)AtParDefns.statCancel).ToString())
                    {
                        POCOEntities.AtPar_Transaction_Entity updateTrans = new POCOEntities.AtPar_Transaction_Entity();

                        updateTrans.TransactionId = transaction_id;
                        updateTrans.ApplicationId = (int)AtParWebEnums.EnumApps.Receiving;
                        updateTrans.Status = (int)AtParDefns.statCancel;
                        updateTrans.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                        _commonRepo.UpdateTransaction(updateTrans);

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + " Status code Returned form UpdateTransaction is " + ":" + StatusCode + ":");

                            tpleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.E_SERVERERROR);
                            return tpleResult;
                        }
                    }
                }

                transStatus = new SortedList<string, string>();
                transStatus[transaction_id.ToString()] = "0";

                StatusCode = _commonRepo.GetTransactionStatus(transStatus, (int)AtParWebEnums.EnumApps.Receiving);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Error " + StatusCode + " getting status for " + transaction_id);
                    tpleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, StatusCode);
                    return tpleResult;
                }



                transIDStatus = Convert.ToInt64(transStatus[transaction_id.ToString()]);

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Count status for previously downloaded PO : " + po_id + " with transaction id : " + transaction_id + "is '" + Enum.GetName(typeof(AtParWebEnums.AppTransactionStatus), transIDStatus) + "'");



                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_BusinessRules_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString()].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() && inputParameters.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Rows.Count > 0)
                {
                    DataTable dtNewDetails = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendPO_Receive_Details_Defns, AtParWebEnums.DataSet_Type.NEWDETAILS.ToString());

                    inputParameters.Tables.Add(dtNewDetails);


                    DataRow lineItem = null;
                    DataRow[] drSubDetailsRows = null;
                    int linenumber = 0;
                    int schedNumber = 0;
                    DataRow rowDtls = null;

                    for (i = 0; i <= inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count - 1; i++)
                    {
                        lineItem = inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[i];

                        linenumber = Convert.ToInt32(lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR.ToString()]);

                        schedNumber = Convert.ToInt32(lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()]);

                        if (_log.IsDebugEnabled)
                            _log.Debug(string.Format(":{0}: Main Details table row count:{1}", methodBaseName, inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count));

                        if (_log.IsDebugEnabled)
                            _log.Debug(string.Format(":{0}: Line No:{1}:Schedule No:{2}", methodBaseName, linenumber, schedNumber));



                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Rows.Count > 0)
                        {
                            if (_log.IsDebugEnabled)
                                _log.Debug(string.Format(":{0}:Applying following filter on subdetails table" + " with Line no ={1} and Scheduled No= {2}:", methodBaseName, linenumber, schedNumber));

                            drSubDetailsRows = inputParameters.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Select("[" + AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LINE_NBR + "] = " + linenumber + " AND " + "[" + AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR + "] = " + schedNumber);

                            if (_log.IsDebugEnabled)
                                _log.Debug(string.Format(":{0}: Sub Details rows count:{1}", methodBaseName, drSubDetailsRows.Length));
                            if (drSubDetailsRows.Length > 0)
                            {
                                // For each Lot/Serial info of given LineNo and Sched No
                                for (i = 0; i <= drSubDetailsRows.Length - 1; i++)
                                {
                                    rowDtls = inputParameters.Tables[AtParWebEnums.DataSet_Type.NEWDETAILS.ToString()].NewRow();


                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()] = drSubDetailsRows[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.QTY.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.UNIT_OF_MEASURE.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.UNIT_OF_MEASURE.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.CARRIER_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.CARRIER_ID.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.BILL_OF_LADING.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.BILL_OF_LADING.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.SHIPTO_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.SHIPTO_ID.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.NO_OF_BOXES.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.NO_OF_BOXES.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.INVENTORY_ITEM.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.INVENTORY_ITEM.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.QTY_PO.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.QTY_PO.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.TRACKING_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.TRACKING_ID.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.EXT_TRK_NO.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.EXT_TRK_NO.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.RECEIVING_ROUTING_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.RECEIVING_ROUTING_ID.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.CUST_ITEM_NO.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.CUST_ITEM_NO.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LOCATION.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.LOCATION.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.RECEIVED_QTY.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.RECEIVED_QTY.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()] = drSubDetailsRows[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.UNIT_OF_MEASURE.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()] = drSubDetailsRows[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.CONVERSION_RATE.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_CMTS.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_CMTS.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()] = drSubDetailsRows[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LOT_ID.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()] = drSubDetailsRows[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SERIAL_ID.ToString()];

                                    if (drSubDetailsRows[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE.ToString()] != null)
                                    {
                                        rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()] = drSubDetailsRows[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE.ToString()];
                                    }
                                    else
                                    {
                                        rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()] = null;
                                    }
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.DESCRIPTION.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.DESCRIPTION.ToString()];
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.STORAGE_LOCATION.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.STORAGE_LOCATION.ToString()];

                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + ":Lot Id:" + rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()]);
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + ":Serial Id:" + rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()]);

                                    inputParameters.Tables[AtParWebEnums.DataSet_Type.NEWDETAILS.ToString()].Rows.Add(rowDtls);
                                }
                            }
                            else
                            {
                                rowDtls = inputParameters.Tables[AtParWebEnums.DataSet_Type.NEWDETAILS.ToString()].NewRow();

                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.UNIT_OF_MEASURE.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.UNIT_OF_MEASURE.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.CARRIER_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.CARRIER_ID.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.BILL_OF_LADING.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.BILL_OF_LADING.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.SHIPTO_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.SHIPTO_ID.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.NO_OF_BOXES.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.NO_OF_BOXES.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.INVENTORY_ITEM.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.INVENTORY_ITEM.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.QTY_PO.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.QTY_PO.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.TRACKING_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.TRACKING_ID.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.EXT_TRK_NO.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.EXT_TRK_NO.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.RECEIVING_ROUTING_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.RECEIVING_ROUTING_ID.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.CUST_ITEM_NO.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.CUST_ITEM_NO.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LOCATION.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.LOCATION.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.RECEIVED_QTY.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.RECEIVED_QTY.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_CMTS.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_CMTS.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()];

                                if (lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()] != null)
                                {
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()];
                                }
                                else
                                {
                                    rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()] = null;
                                }
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.DESCRIPTION.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.DESCRIPTION.ToString()];
                                rowDtls[AtParWebEnums.SendPO_Receive_Details_Enum.STORAGE_LOCATION.ToString()] = lineItem[AtParWebEnums.SendPO_Receive_Details_Enum.STORAGE_LOCATION.ToString()];

                                inputParameters.Tables[AtParWebEnums.DataSet_Type.NEWDETAILS.ToString()].Rows.Add(rowDtls);

                            }
                        }
                    }
                    if (dtNewDetails.Rows.Count > 0)
                    {
                        inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].TableName = "ACTUAL_DETAILS";
                        inputParameters.Tables[AtParWebEnums.DataSet_Type.NEWDETAILS.ToString()].TableName = AtParWebEnums.DataSet_Type.DETAILS.ToString();
                        m_strTableName = "ACTUAL_DETAILS";
                    }
                    else
                    {
                        m_strTableName = AtParWebEnums.DataSet_Type.DETAILS.ToString();
                    }

                    if (_log.IsDebugEnabled)
                    {
                        ////DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                        //inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);

                        //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        //{
                        //    if (_log.IsFatalEnabled)
                        //        _log.Fatal(methodBaseName + " :After adding data table to dataset: " + " Error occured in PrintDatasetStatistics. Status Code Returned is : " + StatusCode);
                        //    tpleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, StatusCode);
                        //    return tpleResult;
                        //}
                    }
                }
                else
                {
                    m_strTableName = AtParWebEnums.DataSet_Type.DETAILS.ToString();
                }


                Tuple<DataSet, long> tupleResult = null;

                //switch (transIDStatus)
                //{
                // case AtParWebEnums.AppTransactionStatus.Downloaded:
                //case AtParWebEnums.AppTransactionStatus.Error:


                tupleResult = GetERPSendDetails(inputParameters, outputParameters, deviceTokenEntry);
                outputParameters = tupleResult.Item1;

                switch (tupleResult.Item2)
                {
                    case AtparStatusCodes.ATPAR_OK:

                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                        {
                            if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.RECEIVER_ID.ToString()] != null)
                            {
                                tupleResult = GetERPSendDetailsLoadASNQtyInfo(inputParameters, deviceTokenEntry);
                                inputParameters = tupleResult.Item1;

                            }
                        }


                        int count = inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;

                        POCOEntities.AtPar_Transaction_Entity atparUpdateTrans = new POCOEntities.AtPar_Transaction_Entity();


                        atparUpdateTrans.TransactionId = transaction_id;
                        atparUpdateTrans.ApplicationId = (int)AtParWebEnums.EnumApps.Receiving;
                        atparUpdateTrans.Status = (int)AtParWebEnums.AppTransactionStatus.RemoteSucess;
                        atparUpdateTrans.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                        atparUpdateTrans.TotalRecordDownloaded = count;
                        atparUpdateTrans.StatusCode = (int)AtparStatusCodes.ATPAR_OK;

                        long nRet = _commonRepo.UpdateTransaction(atparUpdateTrans);

                        if (nRet != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                            {
                                _log.Fatal(methodBaseName + " Failed to update transaction to AtPar Middletier for " + po_id);

                                tpleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, nRet);
                                return tpleResult;
                            }


                        }

                        tpleResult = Execute_SendDetails_ProcessLogic(inputParameters, outputParameters, deviceTokenEntry);

                        nRet = tpleResult.Item3;
                        inputParameters = tpleResult.Item1;
                        outputParameters = tpleResult.Item2;

                        if (nRet != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                            {
                                _log.Fatal(methodBaseName + " Failed to Process data for PO ID " + po_id);

                                tpleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, nRet);
                                return tpleResult;
                            }


                        }

                        POCOEntities.AtPar_Transaction_Entity updateTrans = new POCOEntities.AtPar_Transaction_Entity();

                        updateTrans.TransactionId = transaction_id;
                        updateTrans.ApplicationId = (int)AtParWebEnums.EnumApps.Receiving;
                        updateTrans.Status = (int)AtParWebEnums.AppTransactionStatus.Error;
                        updateTrans.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                        updateTrans.StatusCode = Convert.ToInt32(StatusCode);

                        nRet = _commonRepo.UpdateTransaction(updateTrans);

                        if (nRet != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                            {
                                _log.Fatal(methodBaseName + " Failed to update  transaction to AtPar Middletier for " + po_id);

                                tpleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, nRet);
                                return tpleResult;
                            }


                        }


                        //case AtParWebEnums.AppTransactionStatus.RemoteSucess:

                        //if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                        //{
                        //    if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.RECEIVER_ID.ToString()] != null)
                        //    {
                        //        tupleResult = GetERPSendDetailsLoadASNQtyInfo(inputParameters, deviceTokenEntry);
                        //        outputParameters = tupleResult.Item1;
                        //    }
                        //}

                        //tpleResult = Execute_SendDetails_ProcessLogic(inputParameters, outputParameters, deviceTokenEntry);

                        //nRet = tpleResult.Item3;
                        //inputParameters = tpleResult.Item1;
                        //outputParameters = tpleResult.Item2;


                        //nRet = tpleResult.Item3;


                        //if (nRet != AtparStatusCodes.ATPAR_OK)
                        //{
                        //    if (_log.IsFatalEnabled)
                        //    {
                        //        _log.Fatal(methodBaseName + " Failed to Process data for " + po_id);
                        //        tpleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, nRet);
                        //        return tpleResult;
                        //    }

                        //}
                        //case AtParWebEnums.AppTransactionStatus.Sent:

                        tpleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.ATPAR_OK);
                        return tpleResult;

                }
                //}
                tpleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.ATPAR_OK);
                return tpleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetPO_ProcessTasks failed " + System.Environment.NewLine + ex.ToString());

                tpleResult = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameters, AtparStatusCodes.E_SERVERERROR);
                return tpleResult;
            }


        }

        private Tuple<DataSet, long> GetERPSendDetails(DataSet inputParameters, DataSet OutputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<DataSet, long> tupleOutput = null;

            try
            {


                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                //GetConfigData();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                  x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(" Remote Object Failed ");
                    tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;
                }



                className = "SendDetails";
                methodName = "SendDetails";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, OutputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<DataSet, long>(null, StatusCode);
                    return tupleOutput;
                }

                OutputParameters = (DataSet)args[1];


                tupleOutput = new Tuple<DataSet, long>(OutputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;
            }
        }

        private Tuple<DataSet, long> GetERPSendDetailsLoadASNQtyInfo(DataSet inputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            DataSet OutputParameters = new DataSet();
            Tuple<DataSet, long> tupleOutput = null;

            try
            {


                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                //GetConfigData();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                  x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString())
                   .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(" Remote Object Failed ");
                    tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleOutput;
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;
                }



                className = "SendDetails";
                methodName = "LoadASNQtyInfo";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<DataSet, long>(null, StatusCode);
                    return tupleOutput;
                }

                inputParameters = (DataSet)args[0];


                tupleOutput = new Tuple<DataSet, long>(inputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;
            }
        }

        private Tuple<DataSet, DataSet, long> Execute_SendDetails_ProcessLogic(DataSet inputparameters, DataSet pOutputParams,
            string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int transaction_id = 0;
            string po_id = string.Empty;

            long StatusCode = -1;
            int intNoOfItems = 0;
            Tuple<DataSet, DataSet, long> tple = null;
            try
            {
                if (inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                {
                    transaction_id = Convert.ToInt32(inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.TRANSACTION_ID.ToString()]);
                }

                if (inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                {
                    po_id = inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.PO_ID.ToString()].ToString();
                }


                // Notes Details Update with Details Transaction Id
                if (inputparameters.Tables.Contains(AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()))
                {

                    if (inputparameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].Rows.Count > 0)
                    {

                        for (int i = 0; i <= inputparameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].Rows.Count - 1; i++)
                        {
                            string bUnit = null;
                            string poId = null;
                            string lineNo = null;
                            string schNo = null;
                            int detailTransID = -1;

                            DataRow item = inputparameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].Rows[i];

                            if (item[AtParWebEnums.Send_Notes_Input_DETAILS_Enum.SCREEN_NAME.ToString()].ToString().ToUpper() != "RECEIVE STATUS")
                            {
                                bUnit = item[AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_1.ToString()].ToString();
                                poId = item[AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_2.ToString()].ToString();
                                lineNo = item[AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_3.ToString()].ToString();
                                schNo = item[AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_5.ToString()].ToString();


                                detailTransID = _poNonPoRepo.GetExistingDetailTransForPOItem(bUnit, poId, lineNo, schNo);

                                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsWarnEnabled)
                                        _log.Warn(methodBaseName + ": GetExistingDetailTransForPOItem Failed");
                                    tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, StatusCode);
                                    return tple;
                                }

                                if (_log.IsDebugEnabled)
                                    _log.Debug("DetailTransID: " + detailTransID.ToString());

                                if (detailTransID != -1)
                                {
                                    item[AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_11.ToString()] = detailTransID.ToString();
                                }
                                item[AtParWebEnums.Send_Notes_Input_DETAILS_Enum.TRANS_ID.ToString()] = transaction_id.ToString();
                            }
                            inputparameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].AcceptChanges();
                        }

                    }
                }

                // End of Notes Details Update

                // check if its a non stock store
                if (inputparameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Count > 0)
                {
                    if (inputparameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_BusinessRules_Enum.NON_STOCK_STORE.ToString()].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
                    {
                        bool deliverInstalled = false;

                        StatusCode = AtparStatusCodes.ATPAR_OK;
                        deliverInstalled = _poNonPoRepo.IsProductInstalled((int)AtParWebEnums.EnumApps.Deliver);

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " IsProductInstalled Failed");

                            tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, StatusCode);
                            return tple;
                        }


                        if (deliverInstalled)
                        {
                            bool isShiptoIDAllocated = false;

                            foreach (DataRow dr in inputparameters.Tables[m_strTableName].Rows)
                            {

                                isShiptoIDAllocated = _poNonPoRepo.CheckShipToIDAllocation(dr[AtParWebEnums.SendPO_Receive_Details_Enum.SHIPTO_ID.ToString()].ToString(), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString(), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString());

                                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " failed to CheckShipToIDAllocation");
                                    tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, StatusCode);
                                    return tple;
                                }



                                //If isnonstock or IsStockItem & Shipto_ID Allocated to ORG

                                if (dr[AtParWebEnums.SendPO_Receive_Details_Enum.INVENTORY_ITEM.ToString()].ToString() == AtParWebEnums.YesNo_Enum.N.ToString() || (dr[AtParWebEnums.SendPO_Receive_Details_Enum.INVENTORY_ITEM.ToString()].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() && isShiptoIDAllocated))
                                {
                                    double actualQtyReceived = 0;
                                    double itemRecvPercent = 0;

                                    double recvQty = Convert.ToDouble(dr[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()]);

                                    // if ITEM UOM <> RECV UOM
                                    if (dr[AtParWebEnums.SendPO_Receive_Details_Enum.UNIT_OF_MEASURE.ToString()] != dr[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()])
                                    {
                                        // convert based on conversion rate
                                        actualQtyReceived = Convert.ToDouble(recvQty) * Convert.ToDouble(dr[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()]);
                                    }

                                    // TODO: update detail transaction
                                    Tuple<DataSet, DataRow, long> tpleTranscations = _poNonPoRepo.UpdateDeliverTransactions(deviceTokenEntry, dr, inputparameters);
                                    if (tpleTranscations.Item3 != AtparStatusCodes.ATPAR_OK)
                                    {
                                        // _trans.Rollback();
                                        if (_log.IsFatalEnabled)
                                            _log.Fatal(methodBaseName + " failed to UpdateDetailTransaction");
                                        StatusCode = tpleTranscations.Item3;
                                        tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, StatusCode);
                                        return tple;
                                    }

                                }
                            }

                        }
                        else
                        {
                            // jump to - Save and Insert deviation section
                        }
                    }
                    else
                    {
                        // jump to - Save and insert deviation section
                    }
                }
                else
                {
                    // jump to - Save and insert deviation section
                }


                ///'''''''''
                // Save and Insert deviation section
                ///''''''''
                int intCnt = 0;
                if (_log.IsDebugEnabled)
                    _log.Debug(string.Format(":{0}:Table using for deviation details and receipt box information is:{1}:", methodBaseName, m_strTableName));


                foreach (DataRow dr in inputparameters.Tables[m_strTableName].Rows)
                {
                    if (dr[(int)AtParWebEnums.SendPO_Receive_Details_Enum.NO_OF_BOXES] != null &&
                        dr[(int)AtParWebEnums.SendPO_Receive_Details_Enum.NO_OF_BOXES] != DBNull.Value)
                    {
                        if (Convert.ToInt32(dr[(int)AtParWebEnums.SendPO_Receive_Details_Enum.NO_OF_BOXES]) > 0)
                        {
                            // save receipt box info

                            Tuple<DataRow, long> tpleReceipts = _poNonPoRepo.SaveReceiptBoxInfo(dr, transaction_id);

                            if (tpleReceipts.Item2 != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + " Failed to SaveReceiptBoxInfo for transaction id: " + transaction_id);
                                // _trans.Rollback();
                                StatusCode = tpleReceipts.Item2;
                                tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, StatusCode);
                                return tple;
                            }
                        }
                    }


                    Tuple<DataSet, long> tpl = null;
                    // InsertReceiveItemDeviation if the percentages are within thresholds
                    if (inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.RECEIVER_ID.ToString()] == null)
                    {
                        tpl = InsertReceiveItemDeviation(lineNum, intCnt, inputparameters, dr, deviceTokenEntry);
                        inputparameters = tpl.Item1;
                        StatusCode = tpl.Item2;

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " Failed to InsertReceiveItemDeviation for transaction id: " + transaction_id);
                            // _trans.Rollback();
                            tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, StatusCode);
                            return tple;
                        }
                    }


                    if (inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                    {
                        if (inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.RECEIVER_ID.ToString()] != null)
                        {
                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + ":RECEIVER ID:" + inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.RECEIVER_ID.ToString()]);


                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + ":ASN QTY:" + inputparameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt][(int)Enum.Parse(typeof(AtParWebEnums.SendPO_Receive_Details_Enum), "ASN_QTY")]);

                            DataRow item = inputparameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt];


                            if (item[(int)Enum.Parse(typeof(AtParWebEnums.SendPO_Receive_Details_Enum), "ASN_QTY")] != null)
                            {

                                bool blnAsnLotSerial = false;
                                DataRow[] drAsnSubDtls = null;

                                //SEND_LOT_SERIAL_INFO_TO_MMIS ORG PARAMETER IS UNCHECKED
                                if (m_strTableName == AtParWebEnums.DataSet_Type.DETAILS.ToString())
                                {
                                    if (inputparameters.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Rows.Count > 0)
                                    {
                                        drAsnSubDtls = inputparameters.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Select("[" + AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LINE_NBR + "] = " + dr[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LINE_NBR.ToString()] + " AND " + "[" + AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR + "] = " + dr[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR.ToString()]);

                                        if (drAsnSubDtls.Length > 0)
                                        {

                                            if (drAsnSubDtls[0][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LOT_ID.ToString()].ToString().Trim().Length > 0 || drAsnSubDtls[0][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SERIAL_ID.ToString()].ToString().Trim().Length > 0)
                                            {
                                                blnAsnLotSerial = true;
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    DataRow count = inputparameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[intCnt];

                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + ":ASN:SERIAL ID Exist:" + count[AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()].ToString().Trim().Length);

                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + ":ASN:LOTID Exist:" + count[AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()].ToString().Trim().Length);

                                    if (count[AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()].ToString().Trim().Length > 0 || count[AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()].ToString().Trim().Length > 0)
                                    {
                                        blnAsnLotSerial = true;
                                    }

                                }
                                if (_log.IsDebugEnabled)
                                    _log.Debug(methodBaseName + ":For ASN LotSerial Exists:" + blnAsnLotSerial);

                                /////End of if STORE_LOT_SERIAL_INFO_IN_ATPAR org parameter is Y
                                // then we have to store details in deviation table ///'


                                if (item[AtParWebEnums.SendPO_Receive_Details_Enum.ASN_QTY.ToString()] != dr[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()] || (item[AtParWebEnums.SendPO_Receive_Details_Enum.ASN_QTY.ToString()].ToString() != "0" && dr[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()].ToString() == "0") || (item[AtParWebEnums.SendPO_Receive_Details_Enum.ASN_QTY.ToString()] == dr[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()] && inputparameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_BusinessRules_Enum.ITEM_RECV_HIGH_PCT.ToString()].ToString() == "50" && inputparameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_BusinessRules_Enum.ITEM_RECV_LOW_PCT.ToString()].ToString() == "50") || blnAsnLotSerial)
                                {
                                    // ASN Qty will not be present if its not a ASN PO
                                    // Insert ASN Deviation                              


                                    string strDeviationType = string.Empty;
                                    strDeviationType = ASN_DEVIATION.ToString();

                                    tpl = InsertReceiveDeviationHeaderDetails(lineNum, intCnt, inputparameters, dr, deviceTokenEntry, strDeviationType);
                                    inputparameters = tpl.Item1;

                                    lineNum = lineNum + 1;

                                    if (tpl.Item2 != AtparStatusCodes.ATPAR_OK)
                                    {
                                        if (_log.IsFatalEnabled)
                                            _log.Fatal(methodBaseName + " :Failed to InsertReceiveItemDeviation:");

                                        StatusCode = tpl.Item2;

                                        tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, StatusCode);
                                        return tple;
                                    }


                                }
                            }
                        }
                    }
                    intCnt = intCnt + 1;
                }

                // Perform Autoputaway


                //prepare dataset for auto putaway

                DataSet dsPtwyItemsHdr = new DataSet();
                DataTable dtPtwyItemsHdr = new DataTable();
                DataRow drPtwyItemsHdr = null;

                DataSet dsPtwyItemsDtls = new DataSet();
                DataTable dtPtwyItemsDtls = new DataTable();
                DataRow drPtwyItemsDtls = null;

                dtPtwyItemsHdr = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_AutoPutAway_Header_Defns, AtParWebEnums.DataSet_Type.AUTOPUTAWAY_HEADER.ToString());

                dtPtwyItemsDtls = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_AutoPutAway_Details_Defns, AtParWebEnums.DataSet_Type.AUTOPUTAWAY_DETAILS.ToString());

                drPtwyItemsHdr = dtPtwyItemsHdr.NewRow();


                drPtwyItemsHdr[AtParWebEnums.Enum_AutoPutAway_Header.BUSINESS_UNIT.ToString()] = inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.BUSINESS_UNIT.ToString()];

                drPtwyItemsHdr[AtParWebEnums.Enum_AutoPutAway_Header.PO_DT.ToString()] = inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.PO_DT.ToString()];

                drPtwyItemsHdr[AtParWebEnums.Enum_AutoPutAway_Header.VENDOR_ID.ToString()] = inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.VENDOR_ID.ToString()];

                drPtwyItemsHdr[AtParWebEnums.Enum_AutoPutAway_Header.START_DT_TIME.ToString()] = inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.START_DT_TIME.ToString()];

                drPtwyItemsHdr[AtParWebEnums.Enum_AutoPutAway_Header.END_DT_TIME.ToString()] = inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.END_DT_TIME.ToString()];

                dtPtwyItemsHdr.Rows.Add(drPtwyItemsHdr);
                dsPtwyItemsHdr.Tables.Add(dtPtwyItemsHdr);

                string strlocation = string.Empty;
                string strActualloc = string.Empty;
                string[] strLocArr = null;
                DataRow[] drSubDtls = null;

                if (m_strTableName == AtParWebEnums.DataSet_Type.DETAILS.ToString() && inputparameters.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Rows.Count > 0)
                {
                    foreach (DataRow drItems in inputparameters.Tables[m_strTableName].Rows)
                    {
                        drSubDtls = inputparameters.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Select("[" + AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LINE_NBR + "] = " + drItems[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LINE_NBR.ToString()] + " AND " + "[" + AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR + "] = " + drItems[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR.ToString()]);

                        strlocation = drItems[AtParWebEnums.SendPO_Receive_Details_Enum.LOCATION.ToString()].ToString();

                        if (!string.IsNullOrEmpty(strlocation))
                        {
                            if (strlocation.Contains("£-£"))
                            {
                                // strLocArr = strlocation.Split(Convert.ToChar("£-£"));
                                strLocArr = strlocation.Split(Convert.ToChar("£"));
                                strActualloc = strLocArr[0].ToString();
                            }
                            else
                            {
                                strActualloc = strlocation;
                            }
                        }
                        else
                        {
                            strActualloc = string.Empty;
                        }

                        if (drSubDtls.Length > 0)
                        {
                            for (int i = 0; i <= drSubDtls.Length - 1; i++)
                            {
                                drPtwyItemsDtls = dtPtwyItemsDtls.NewRow();


                                drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.LOCATION.ToString()] = strActualloc;

                                drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.ITEM_ID.ToString()] = drItems[AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID.ToString()];

                                drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.STORAGE_LOCATION.ToString()] = drItems[AtParWebEnums.SendPO_Receive_Details_Enum.STORAGE_LOCATION.ToString()].ToString();

                                drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.LOT_ID.ToString()] = drSubDtls[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LOT_ID.ToString()];

                                drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.SERIAL_ID.ToString()] = drSubDtls[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SERIAL_ID.ToString()];

                                drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.QTY.ToString()] = drSubDtls[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.QTY.ToString()];
                                //RECEIVE QTY
                                drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.CONVERSION_RATE.ToString()] = drSubDtls[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.CONVERSION_RATE.ToString()];

                                drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.EXPIRY_DATE.ToString()] = (drSubDtls[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE.ToString()] == null ? string.Empty : drSubDtls[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE.ToString()]);
                                dtPtwyItemsDtls.Rows.Add(drPtwyItemsDtls);
                            }
                        }
                        else
                        {
                            drPtwyItemsDtls = dtPtwyItemsDtls.NewRow();

                            drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.LOCATION.ToString()] = strActualloc;
                            drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.ITEM_ID.ToString()] = drItems[AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID.ToString()];
                            drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.STORAGE_LOCATION.ToString()] = drItems[AtParWebEnums.SendPO_Receive_Details_Enum.STORAGE_LOCATION.ToString()];

                            drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.LOT_ID.ToString()] = string.Empty;
                            drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.SERIAL_ID.ToString()] = string.Empty;
                            drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.QTY.ToString()] = drItems[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()];

                            //RECEIVE QTY
                            drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.CONVERSION_RATE.ToString()] = drItems[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()];

                            drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.EXPIRY_DATE.ToString()] = string.Empty;

                            dtPtwyItemsDtls.Rows.Add(drPtwyItemsDtls);
                        }

                    }
                }
                else
                {
                    foreach (DataRow drDtls in inputparameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows)
                    {

                        strlocation = drDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LOCATION.ToString()].ToString();

                        if (!string.IsNullOrEmpty(strlocation))
                        {
                            if (strlocation.Contains("£-£"))
                            {
                                strLocArr = strlocation.Split(Convert.ToChar("£"));
                                strActualloc = strLocArr[0].ToString();
                            }
                            else
                            {
                                strActualloc = strlocation;
                            }
                        }
                        else
                        {
                            strActualloc = string.Empty;
                        }

                        drPtwyItemsDtls = dtPtwyItemsDtls.NewRow();

                        drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.LOCATION.ToString()] = strActualloc;

                        drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.ITEM_ID.ToString()] = drDtls[(int)AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID];

                        drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.STORAGE_LOCATION.ToString()] = drDtls[AtParWebEnums.SendPO_Receive_Details_Enum.STORAGE_LOCATION.ToString()];

                        drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.LOT_ID.ToString()] = drDtls[AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()];

                        drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.SERIAL_ID.ToString()] = drDtls[AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()];

                        drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.QTY.ToString()] = drDtls[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()];

                        //RECEIVE QTY
                        drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.CONVERSION_RATE.ToString()] = drDtls[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()];

                        drPtwyItemsDtls[AtParWebEnums.Enum_AutoPutAway_Details.EXPIRY_DATE.ToString()] = drDtls[AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()] == null ? string.Empty : drDtls[AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()];

                        dtPtwyItemsDtls.Rows.Add(drPtwyItemsDtls);
                    }

                }

                dsPtwyItemsDtls.Tables.Add(dtPtwyItemsDtls);

                StatusCode = AutoPutaway(dsPtwyItemsHdr, dsPtwyItemsDtls, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " :Failed to perform auto putaway and status code is : " + StatusCode);
                    // _trans.Rollback();

                    tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, StatusCode);
                    return tple;
                }




                intNoOfItems = inputparameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;

                //'--- Notes Data
                if (inputparameters.Tables.Contains(AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()))
                {
                    if (inputparameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].Rows.Count > 0)
                    {


                        StatusCode = _poNonPoRepo.SaveNotesDetails(inputparameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()]);

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            // _trans.Rollback();
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + ":Insert Notes Details Failed Failed");
                            tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, StatusCode);
                            return tple;
                        }

                    }
                }

                // Update transaction (status= success)

                POCOEntities.AtPar_Transaction_Entity atparUpdateTrans = new POCOEntities.AtPar_Transaction_Entity();

                atparUpdateTrans.TransactionId = transaction_id;
                atparUpdateTrans.ApplicationId = (int)AtParWebEnums.EnumApps.Receiving;
                atparUpdateTrans.Status = (int)AtParWebEnums.AppTransactionStatus.Sent;
                atparUpdateTrans.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                atparUpdateTrans.StartDateTime = Convert.ToDateTime(inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.START_DT_TIME.ToString()]);

                atparUpdateTrans.EndDateTime = Convert.ToDateTime(inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.END_DT_TIME.ToString()]);

                atparUpdateTrans.TotalRecordSent = intNoOfItems;
                atparUpdateTrans.ReportData9 = inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.NON_STOCK_COUNT.ToString()].ToString();

                atparUpdateTrans.ReportData10 = inputparameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.STOCK_COUNT.ToString()].ToString();

                StatusCode = _commonRepo.UpdateTransaction(atparUpdateTrans);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Failed to update transaction to AtPar Middletier for " + po_id);
                    // _trans.Rollback();
                    tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, StatusCode);
                    return tple;
                }

                tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, AtparStatusCodes.ATPAR_OK);
                return tple;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());
                //_trans.Rollback();
                tple = new Tuple<DataSet, DataSet, long>(inputparameters, pOutputParams, AtparStatusCodes.E_SERVERERROR);
                return tple;
            }

        }

        private Tuple<DataSet, long> InsertReceiveItemDeviation(int lineNo, int cnt, DataSet inputParameter, DataRow detailRow,
            string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            double actualQtyReceived = 0;
            int i = 0;
            double itemRecvPercent = 0;
            int RECV_DEVIATION = 0;
            int LOT_SERIAL = 3;
            long Statuscode = -1;

            Tuple<DataSet, long> tple = null;

            try
            {

                double poQty = Convert.ToDouble(detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.QTY_PO.ToString()]);

                double recvQty = Convert.ToDouble(detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()]);

                DataRow[] drSubDtls = null;

                if ((detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.UNIT_OF_MEASURE.ToString()] != null) && (detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()] != null))
                {
                    if (detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.UNIT_OF_MEASURE.ToString()] != detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()])
                    {
                        // convert based on conversion rate
                        actualQtyReceived = Convert.ToDouble(recvQty) * Convert.ToDouble(detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()]);
                    }
                }

                if (poQty != 0)
                {
                    // calculate deviation percentage
                    if (actualQtyReceived != 0)
                    {
                        itemRecvPercent = ((poQty - actualQtyReceived) / poQty) * 100;
                    }
                    else
                    {
                        itemRecvPercent = ((poQty - recvQty) / poQty) * 100;
                    }
                }

                bool blnDeviationExists = false;
                bool blnLotSerial = false;
                string strDeviationType = string.Empty;


                if ((itemRecvPercent <= Convert.ToDouble(inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_BusinessRules_Enum.ITEM_RECV_LOW_PCT.ToString()])) || (itemRecvPercent > Convert.ToDouble(inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_BusinessRules_Enum.ITEM_RECV_HIGH_PCT.ToString()])))
                {
                    blnDeviationExists = true;
                }

                //SEND_LOT_SERIAL_INFO_TO_MMIS ORG PARAMETER IS UNCHECKED
                if (m_strTableName == AtParWebEnums.DataSet_Type.DETAILS.ToString())
                {
                    if (inputParameter.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Rows.Count > 0)
                    {
                        drSubDtls = inputParameter.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Select("[" + AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LINE_NBR + "] = " + detailRow[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LINE_NBR.ToString()] + " AND " + "[" + AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR + "] = " + detailRow[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR.ToString()]);

                        if (drSubDtls.Length > 0)
                        {

                            if (drSubDtls[0][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LOT_ID.ToString()].ToString().Trim().Length > 0 | drSubDtls[0][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SERIAL_ID.ToString()].ToString().Trim().Length > 0)
                            {
                                blnLotSerial = true;
                            }
                        }
                    }
                }
                else
                {
                    DataRow item = inputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[i];
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ":SERIAL ID Exist:" + item[AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()].ToString().Trim().Length);
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ":LOT ID Exist:" + item[AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()].ToString().Trim().Length);

                    if (item[AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()].ToString().Trim().Length > 0 | item[AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()].ToString().Trim().Length > 0)
                    {
                        blnLotSerial = true;
                    }

                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + ":Deviation Exists:" + blnDeviationExists);
                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + ":LotSerial Exists:" + blnLotSerial);

                if (inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Count > 0)
                {

                    if (blnDeviationExists || blnLotSerial)
                    {

                        if (blnDeviationExists)
                        {
                            strDeviationType = RECV_DEVIATION.ToString();
                        }
                        else if (blnLotSerial)
                        {
                            strDeviationType = LOT_SERIAL.ToString();
                        }

                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + ":Deviation Type:" + strDeviationType);

                        tple = InsertReceiveDeviationHeaderDetails(lineNo, i, inputParameter, detailRow, deviceTokenEntry, strDeviationType);
                        inputParameter = tple.Item1;

                        int linenum = 1;
                        linenum = lineNo + 1;

                        if (tple.Item2 != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " :Failed to Insert Receive deviation:");

                            Statuscode = tple.Item2;

                            tple = new Tuple<DataSet, long>(inputParameter, Statuscode);
                            return tple;
                        }

                    }
                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No Rows in PreReqData Table in InputParameters " + System.Environment.NewLine);
                }
                tple = new Tuple<DataSet, long>(inputParameter, AtparStatusCodes.ATPAR_OK);
                return tple;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed to InsertDeviation " + System.Environment.NewLine + ex.ToString());
                tple = new Tuple<DataSet, long>(inputParameter, AtparStatusCodes.E_SERVERERROR);
                return tple;
            }
        }

        private Tuple<DataSet, long> InsertReceiveDeviationHeaderDetails(int lineNo, int cnt, DataSet inputParameter, DataRow detailRow, string[] deviceTokenEntry,
            string deviationType)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int i = 0;
            long StatusCode = -1;
            double asnQty = 0;
            DataRow[] drSubDetails = null;
            int intLotID = 0;
            int intSerialID = 0;
            Tuple<DataSet, long> tpleResult = null;
            try
            {
                ///// Setting values in Details entity ///'

                ///// sending lot serial info if STORE_LOT_SERIAL_INFO_IN_ATPAR org parameter is Y ///'


                if (inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_BusinessRules_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR.ToString()].Equals(AtParWebEnums.YesNo_Enum.Y.ToString()) && inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_BusinessRules_Enum.LOT_SERIAL_ENABLED.ToString()].ToString() != "None" && inputParameter.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Rows.Count > 0)
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(string.Format(":{0}:Applying following filter on subdetails table" + " with Line no ={1} and Scheduled No= {2}:", methodBaseName, detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR.ToString()], detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()]));

                    //SEND_LOT_SERIAL_INFO_TO_MMIS ORG PARAMETER IS UNCHECKED
                    if (m_strTableName == AtParWebEnums.DataSet_Type.DETAILS.ToString())
                    {
                        drSubDetails = inputParameter.Tables[AtParWebEnums.DataSet_Type.SUBDETAILS.ToString()].Select("[" + AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LINE_NBR + "] = " + detailRow[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LINE_NBR.ToString()] + " AND " + "[" + AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR + "] = " + detailRow[AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR.ToString()]);
                    }
                    else
                    {
                        drSubDetails = inputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Select("[" + AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR + "] = " + detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR.ToString()] + " AND " + "[" + AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR + "] = " + detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()]);

                    }

                    if (drSubDetails.Length > 0)
                    {
                        for (i = 0; i <= drSubDetails.Length - 1; i++)
                        {
                            if (m_strTableName == AtParWebEnums.DataSet_Type.DETAILS.ToString())
                            {
                                intLotID = drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LOT_ID.ToString()].ToString().Trim().Length;
                                intSerialID = drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SERIAL_ID.ToString()].ToString().Trim().Length;

                            }
                            else
                            {
                                intLotID = drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()].ToString().Trim().Length;
                                intSerialID = drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()].ToString().Trim().Length;

                            }

                            POCOEntities.Receive_Deviation_Details_Entity recvDeviationDetailsEntity = new Receive_Deviation_Details_Entity();

                            if (intLotID > 0 || intSerialID > 0)
                            {
                                if (m_strTableName == AtParWebEnums.DataSet_Type.DETAILS.ToString())
                                {
                                    recvDeviationDetailsEntity.Lot_Id = (drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LOT_ID.ToString()] == null ? string.Empty : drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.LOT_ID.ToString()].ToString());

                                    recvDeviationDetailsEntity.Serial_Id = ((drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SERIAL_ID.ToString()]) == null ? string.Empty : drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.SERIAL_ID.ToString()].ToString());

                                    if (drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE.ToString()] != null)
                                    {
                                        if (drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE.ToString()].ToString() == "1/1/00 12:00:00 AM" ||
                                           string.IsNullOrEmpty(drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE.ToString()].ToString()))
                                        {
                                            recvDeviationDetailsEntity.Expiry_date = null;
                                        }
                                        else
                                        {
                                            recvDeviationDetailsEntity.Expiry_date = Convert.ToDateTime(drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE.ToString()]);
                                        }
                                    }
                                    else
                                    {
                                        recvDeviationDetailsEntity.Expiry_date = null;
                                    }
                                    recvDeviationDetailsEntity.QTY = Convert.ToDouble(drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.QTY.ToString()]);

                                    recvDeviationDetailsEntity.Recv_Uom = (drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.UNIT_OF_MEASURE.ToString()] == null ? string.Empty : drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.UNIT_OF_MEASURE.ToString()].ToString());

                                    recvDeviationDetailsEntity.Recv_Conversion_Rate = Convert.ToDouble(drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.CONVERSION_RATE.ToString()] == null ? string.Empty : drSubDetails[i][AtParWebEnums.SendPO_Receive_ItemSubDetails_Enum.CONVERSION_RATE.ToString()]);

                                }
                                else
                                {
                                    recvDeviationDetailsEntity.Lot_Id = drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()] == null ? string.Empty : drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.LOT_ID.ToString()].ToString();

                                    recvDeviationDetailsEntity.Serial_Id = drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()] == null ? string.Empty : drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.SERIAL_ID.ToString()].ToString();

                                    if (drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()] != null &&
                                        drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()] != "")
                                    {
                                        if (drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()].ToString() == "1/1/00 12:00:00 AM")
                                        {
                                            recvDeviationDetailsEntity.Expiry_date = null;
                                        }
                                        else
                                        {
                                            recvDeviationDetailsEntity.Expiry_date = Convert.ToDateTime(drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString()]);

                                        }
                                    }
                                    else
                                    {
                                        recvDeviationDetailsEntity.Expiry_date = null;
                                    }
                                    recvDeviationDetailsEntity.QTY = Convert.ToDouble(drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()]);

                                    recvDeviationDetailsEntity.Recv_Uom = drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()] == null ? string.Empty : drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()].ToString();

                                    recvDeviationDetailsEntity.Recv_Conversion_Rate = Convert.ToDouble(drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()] == null ? string.Empty : drSubDetails[i][AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()]);

                                }
                                recvDeviationDetailsEntity.Transaction_Id = Convert.ToInt32(inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.TRANSACTION_ID.ToString()] == null ? 0 : inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.TRANSACTION_ID.ToString()]);

                                recvDeviationDetailsEntity.Line_No = lineNo;

                                recvDeviationDetailsEntity.Sched_No = Convert.ToInt32(detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()]);

                                StatusCode = _poNonPoRepo.InsertReceiveDeviationDetails(recvDeviationDetailsEntity);

                                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(string.Format(":{0}: Deviation Header insertion failed:", methodBaseName));
                                    tpleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                                    return tpleResult;
                                }
                            }
                        }

                    }

                }
                ///// End of sending lot serial info if STORE_LOT_SERIAL_INFO_IN_ATPAR org parameter is Y ///'

                ///// End of Setting values in Details entity ///'     

                // /// Setting values in Header entity ///'
                if (inputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[cnt][AtParWebEnums.SendPO_Receive_Details_Enum.ASN_QTY.ToString()] != DBNull.Value && inputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[cnt][AtParWebEnums.SendPO_Receive_Details_Enum.ASN_QTY.ToString()] != null)
                {
                    asnQty = Convert.ToDouble(inputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[cnt][AtParWebEnums.SendPO_Receive_Details_Enum.ASN_QTY.ToString()]);

                }
                else
                {
                    asnQty = 0;
                    //: inputParameter.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Details_Enum.ASN_QTY.ToString()]);
                }

                POCOEntities.Receive_Deviation_Header_Entity recvDeviationHeaderEntity = new Receive_Deviation_Header_Entity();

                recvDeviationHeaderEntity.Business_Unit = inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.BUSINESS_UNIT.ToString()].ToString();

                recvDeviationHeaderEntity.Line_No = lineNo;

                recvDeviationHeaderEntity.PO_Line_No = Convert.ToInt32(detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.LINE_NBR.ToString()]);

                recvDeviationHeaderEntity.PO_Sched_No = Convert.ToInt32(detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.SCHED_NBR.ToString()]);

                recvDeviationHeaderEntity.Deviation_Type = Convert.ToInt32(deviationType);

                recvDeviationHeaderEntity.PO_ID = inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.PO_ID.ToString()].ToString();

                recvDeviationHeaderEntity.Carrier_Id = detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.CARRIER_ID.ToString()].ToString();



                recvDeviationHeaderEntity.Qty_PO = Convert.ToDouble(detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.QTY_PO.ToString()] == null ? 0 : detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.QTY_PO.ToString()]);

                recvDeviationHeaderEntity.ASN_Qty = asnQty == null ? Convert.ToDouble(0) : asnQty;

                recvDeviationHeaderEntity.Qty = Convert.ToDouble(detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()] == null ? 0 : detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.QTY.ToString()]);

                recvDeviationHeaderEntity.Transaction_Id = Convert.ToInt32(inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.TRANSACTION_ID.ToString()] == null ? 0 : inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.TRANSACTION_ID.ToString()]);

                recvDeviationHeaderEntity.Recv_Conversion_Rate = Convert.ToDouble(detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()] == null ? 0 : detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString()]);

                recvDeviationHeaderEntity.Unit_Of_Measure = detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.UNIT_OF_MEASURE.ToString()] == null ? string.Empty : detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.UNIT_OF_MEASURE.ToString()].ToString();

                recvDeviationHeaderEntity.Vendor_Id = inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.VENDOR_ID.ToString()] == null ? string.Empty : inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.VENDOR_ID.ToString()].ToString();

                recvDeviationHeaderEntity.Inv_Item_Id = detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID.ToString()] == null ? string.Empty : detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.INV_ITEM_ID.ToString()].ToString();

                recvDeviationHeaderEntity.Inventory_Item = detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.INVENTORY_ITEM.ToString()] == null ? string.Empty : detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.INVENTORY_ITEM.ToString()].ToString();

                recvDeviationHeaderEntity.Recv_Uom = detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()] == null ? string.Empty : detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.RECV_UOM.ToString()].ToString();

                if (detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.DUE_DT.ToString()] != null && detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.DUE_DT.ToString()] != "")
                {
                    recvDeviationHeaderEntity.Due_Date = Convert.ToDateTime(detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.DUE_DT.ToString()]);
                }
                else
                {
                    recvDeviationHeaderEntity.Due_Date = Convert.ToDateTime("01/01/1900");
                }

                recvDeviationHeaderEntity.update_Date = DateTime.Now;

                recvDeviationHeaderEntity.Receipt_Date = Convert.ToDateTime(inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.END_DT_TIME.ToString()]);

                recvDeviationHeaderEntity.Custom_Item_No = detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.CUST_ITEM_NO.ToString()] == null ? string.Empty : detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.CUST_ITEM_NO.ToString()].ToString();

                recvDeviationHeaderEntity.User_Id = inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.USER_ID.ToString()] == null ? string.Empty : inputParameter.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendPO_Receive_Header_Enum.USER_ID.ToString()].ToString();

                recvDeviationHeaderEntity.Description = detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.DESCRIPTION.ToString()] == null ? string.Empty : detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.DESCRIPTION.ToString()].ToString();

                recvDeviationHeaderEntity.Location = detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.LOCATION.ToString()] == null ? string.Empty : detailRow[AtParWebEnums.SendPO_Receive_Details_Enum.LOCATION.ToString()].ToString();

                recvDeviationHeaderEntity.Report_Data_1 = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID];

                //We are storing OrgGrpID for recall management purpose
                recvDeviationHeaderEntity.Report_Data_2 = string.Empty;
                recvDeviationHeaderEntity.Report_Data_3 = string.Empty;
                recvDeviationHeaderEntity.Report_Data_4 = string.Empty;
                recvDeviationHeaderEntity.Report_Data_5 = string.Empty;

                StatusCode = _poNonPoRepo.InsertReceiveDeviationHeader(recvDeviationHeaderEntity);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(string.Format(":{0}: Deviation details insertion failed:", methodBaseName));
                    tpleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tpleResult;

                }

                ///// End of Setting values in Header entity ///'     
                tpleResult = new Tuple<DataSet, long>(inputParameter, AtparStatusCodes.ATPAR_OK);
                return tpleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(string.Format(":{0}: Deviation Header Details insertion failed. Exception is:{1}", methodBaseName, ex.ToString()));
                tpleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tpleResult;

            }

        }

        public long AutoPutaway(DataSet dsPtwyItemsHdr, DataSet dsPtwyItemsDtls, string[] deviceTokenEntry)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            DataView dvLocs = null;
            DataTable dtLocs = new DataTable();
            string strLoc = string.Empty;
            bool blnFlag = false;
            int intOrderStatus = 0;
            long lngTransID = 0;
            string strBusinessUnit = string.Empty;
            string strVendorId = string.Empty;
            string strPOdate = string.Empty;
            string strPOStartdate = string.Empty;
            string strPOEnddate = string.Empty;
            DateTime dtPtwyDate;
            int i = 0;
            string OrgGroupId = string.Empty;
            string strQtyRound = string.Empty;
            try
            {

                OrgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();

                strQtyRound = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.QTY_ROUND_TYPE.ToString(), (int)AtParWebEnums.EnumApps.PointOfUse, OrgGroupId);


                //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                //{
                //    if (_log.IsFatalEnabled)
                //        _log.Fatal(methodBaseName + " : Failed to get Order Qty Rounding Option org parameter with status code :" + StatusCode);
                //    return StatusCode;
                //}
                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + ": Order Qty Rounding Option param Value:" + strQtyRound);

                lngTransID = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.PointOfUse);


                //fetching distinct locations from input dataset

                dvLocs = dsPtwyItemsDtls.Tables[AtParWebEnums.DataSet_Type.AUTOPUTAWAY_DETAILS.ToString()].DefaultView;

                dtLocs = dvLocs.ToTable(true, Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "LOCATION").ToString());

                dtPtwyDate = DateTime.Now;

                //To keep common date in putaway devation header and details tables
                for (i = 0; i <= dtLocs.Rows.Count - 1; i++)
                {
                    if (string.IsNullOrEmpty(strLoc))
                    {
                        strLoc = dtLocs.Rows[i][AtParWebEnums.Enum_AutoPutAway_Details.LOCATION.ToString()].ToString();
                    }
                    else
                    {
                        strLoc = strLoc + "','" + dtLocs.Rows[i][AtParWebEnums.Enum_AutoPutAway_Details.LOCATION.ToString()].ToString();
                    }
                }

                //Getting pou locations with auto putaway parameter checked


                if (!string.IsNullOrEmpty(strLoc))
                {
                    strBusinessUnit = dsPtwyItemsHdr.Tables[0].Rows[0][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Header), "BUSINESS_UNIT")].ToString();

                    strVendorId = dsPtwyItemsHdr.Tables[0].Rows[0][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Header), "VENDOR_ID")].ToString();

                    strPOdate = dsPtwyItemsHdr.Tables[0].Rows[0][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Header), "PO_DT")].ToString();

                    strPOStartdate = dsPtwyItemsHdr.Tables[0].Rows[0][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Header), "START_DT_TIME")].ToString();

                    strPOEnddate = dsPtwyItemsHdr.Tables[0].Rows[0][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Header), "END_DT_TIME")].ToString();


                    List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstDeptCart = _poNonPoRepo.GetDeptLevelInfo(strLoc, strBusinessUnit, deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString(), strVendorId, strPOdate);

                    //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //        _log.Fatal(methodBaseName + " Failed to get the department level info with _statusCode:" + StatusCode);
                    //    return StatusCode;
                    //}


                    //List to DataSet Conversion
                    DataSet dsDeptInfo = new DataSet();
                    DataTable dtDeptInfo = new DataTable();
                    dtDeptInfo = lstDeptCart.ToDataTable();
                    dsDeptInfo.Tables.Add(dtDeptInfo);

                    if (dsDeptInfo != null && dsDeptInfo.Tables.Count > 0 && dsDeptInfo.Tables[0].Rows.Count > 0)
                    {
                        DataRow[] drDeptInfo = null;
                        //holds location based items of pDsPtwyItemsDtls dataset

                        for (i = 0; i <= dsDeptInfo.Tables[0].Rows.Count - 1; i++)
                        {
                            blnFlag = false;
                            drDeptInfo = dsPtwyItemsDtls.Tables[0].Select("[" + dsPtwyItemsDtls.Tables[0].Columns[AtParWebEnums.Enum_AutoPutAway_Details.LOCATION.ToString()].ColumnName + "] = '" + dsDeptInfo.Tables[0].Rows[i]["CART_ID"] + "'");

                            if (drDeptInfo.Length > 0)
                            {
                                //getting putaway order details for each location

                                List<PAR_MNGT_ORDER_DETAILS> lstOrders = _poNonPoRepo.GetPtwyOrderDtls(strBusinessUnit, dsDeptInfo.Tables[0].Rows[i]["CART_ID"].ToString(), strVendorId, strPOdate);

                                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to get the putaway order details with _statusCode:" + StatusCode);
                                    return StatusCode;
                                }


                                //List to DataSet Conversion
                                DataSet dsPtwyOrdDtls = new DataSet();
                                DataTable dtPtwyOrdDtls = new DataTable();
                                dtPtwyOrdDtls = lstOrders.ToDataTable();
                                dsPtwyOrdDtls.Tables.Add(dtPtwyOrdDtls);


                                if (dsPtwyOrdDtls != null && dsPtwyOrdDtls.Tables.Count > 0 && dsPtwyOrdDtls.Tables[0].Rows.Count > 0)
                                {
                                    //compare items in putaway order and input dataset details
                                    DataRow[] drPtwyOrdDtls = null;

                                    for (int j = 0; j <= dsPtwyOrdDtls.Tables[0].Rows.Count - 1; j++)
                                    {
                                        DataTable _dtDeptInfo = new DataTable();
                                        _dtDeptInfo = drDeptInfo.CopyToDataTable();
                                        drPtwyOrdDtls = _dtDeptInfo.Select("[" + _dtDeptInfo.Columns[AtParWebEnums.Enum_AutoPutAway_Details.ITEM_ID.ToString()].ColumnName + "] = '" + dsPtwyOrdDtls.Tables[0].Rows[j]["ITEM_ID"].ToString() + "'");

                                        //if item exist then update PAR_MNGT_ORDER_DETAILS 


                                        if (drPtwyOrdDtls.Length > 0)
                                        {
                                            double dblAlreadyRecvqty = 0;
                                            dblAlreadyRecvqty = 0;
                                            double dblQtyReceived = 0;
                                            dblQtyReceived = 0;

                                            if (dsPtwyOrdDtls.Tables[0].Rows[j]["QTY_RCVD"] != null && !string.IsNullOrEmpty(dsPtwyOrdDtls.Tables[0].Rows[j]["QTY_RCVD"].ToString()))
                                            {
                                                dblAlreadyRecvqty = Convert.ToDouble(dsPtwyOrdDtls.Tables[0].Rows[j]["QTY_RCVD"]);
                                            }

                                            foreach (DataRow dr in drPtwyOrdDtls)
                                            {

                                                dblQtyReceived = dblQtyReceived + Convert.ToDouble(dr[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")].ToString());
                                                //putaway Qty from input dataset
                                            }
                                            dblAlreadyRecvqty = dblAlreadyRecvqty + dblQtyReceived;

                                            //Inserting into MT_POU_PTWY_DEVIATION_DETAILS Table


                                            StatusCode = _poNonPoRepo.InsertDeviationDtls(Convert.ToInt32(dsPtwyOrdDtls.Tables[0].Rows[0]["ORDER_NO"]), dsPtwyOrdDtls.Tables[0].Rows[j]["ITEM_ID"].ToString(), drPtwyOrdDtls[0][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "STORAGE_LOCATION")].ToString(), Convert.ToDouble(dsPtwyOrdDtls.Tables[0].Rows[j]["QTY"]), dblAlreadyRecvqty, dtPtwyDate);

                                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                            {
                                                if (_log.IsFatalEnabled)
                                                    _log.Fatal(methodBaseName + " Failed to insert the details in putaway deviation details with _statusCode:" + StatusCode);
                                                return StatusCode;
                                            }



                                            //Update PAR_MNGT_ORDER_DETAILS Table
                                            //if qty orderdered-(qty putaway+qty received) <=0 then status closed else partially received

                                            if ((Convert.ToDouble(dsPtwyOrdDtls.Tables[0].Rows[j]["QTY"]) - (dblQtyReceived + Convert.ToDouble(dsPtwyOrdDtls.Tables[0].Rows[j]["QTY_RCVD"]))) <= 0)
                                            {
                                                intOrderStatus = AtParDefns.CLOSED;
                                            }
                                            else
                                            {
                                                intOrderStatus = AtParDefns.PARTIALLY_RECEIVED;
                                            }


                                            StatusCode = _poNonPoRepo.UpdateParMngtOrderDtls(dblQtyReceived, intOrderStatus,
                                                Convert.ToInt32(dsPtwyOrdDtls.Tables[0].Rows[0]["ORDER_NO"]), dsPtwyOrdDtls.Tables[0].Rows[j]["LINE_NO"].ToString(),
                                                dsPtwyOrdDtls.Tables[0].Rows[j]["ITEM_ID"].ToString(), lngTransID.ToString());

                                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                            {
                                                if (_log.IsFatalEnabled)
                                                    _log.Fatal(methodBaseName + " Failed to Update the order details with _statusCode:" + StatusCode);
                                                return StatusCode;
                                            }


                                            blnFlag = true;


                                            StatusCode = InsertUpdateCartInventory(drPtwyOrdDtls, strBusinessUnit, strQtyRound, lngTransID, dsDeptInfo.Tables[0].Rows[i]["CART_ID"].ToString(), dsPtwyOrdDtls.Tables[0].Rows[i]["ITEM_ID"].ToString());

                                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                            {
                                                if (_log.IsFatalEnabled)
                                                    _log.Fatal(methodBaseName + " Failed to insert or update cart inventory with _statusCode:" + StatusCode);
                                                return StatusCode;
                                            }




                                        }
                                        else
                                        {
                                            if (_log.IsDebugEnabled)
                                                _log.Debug(methodBaseName + " : Item : " + dsPtwyOrdDtls.Tables[0].Rows[i]["ITEM_ID"].ToString() + " : not exist in putaway order : " + dsPtwyOrdDtls.Tables[0].Rows[0]["ORDER_NO"] + System.Environment.NewLine);

                                        }

                                    }


                                    //Inserting into MT_POU_PTWY_DEVIATION_HEADER Table
                                    if (blnFlag)
                                    {

                                        StatusCode = _poNonPoRepo.InsertDeviationHeaderDtls(Convert.ToInt32(dsPtwyOrdDtls.Tables[0].Rows[0]["ORDER_NO"]), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(), deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].ToString(), dsDeptInfo.Tables[0].Rows[i]["CART_ID"].ToString(), strBusinessUnit, dtPtwyDate);

                                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                        {
                                            if (_log.IsFatalEnabled)
                                                _log.Fatal(methodBaseName + " Failed to insert the details in putaway deviation header with _statusCode:" + StatusCode);

                                            return StatusCode;
                                        }

                                        //Inserting into MT_ATPAR_TRANSACTION

                                        POCOEntities.AtPar_Transaction_Entity transactionDetails = new POCOEntities.AtPar_Transaction_Entity();


                                        transactionDetails.TransactionId = Convert.ToInt32(lngTransID);
                                        transactionDetails.ApplicationId = (int)AtParWebEnums.EnumApps.PointOfUse;
                                        transactionDetails.Status = (int)AtParWebEnums.AppTransactionStatus.PutAway;
                                        transactionDetails.StartDateTime = Convert.ToDateTime(strPOStartdate);
                                        transactionDetails.ID = dsDeptInfo.Tables[0].Rows[i]["CART_ID"].ToString();
                                        transactionDetails.BusinessUnit = strBusinessUnit;
                                        transactionDetails.TotalRecordSent = drDeptInfo.Length;
                                        transactionDetails.EndDateTime = Convert.ToDateTime(strPOEnddate);
                                        transactionDetails.UpdateDateTime = DateTime.Now;
                                        transactionDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                                        transactionDetails.DownloadUserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                                        transactionDetails.DeviceId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].ToString();
                                        transactionDetails.ScansCount = 0;
                                        transactionDetails.ReportData1 = lngTransID.ToString();

                                        StatusCode = _commonRepo.InsertTransaction(transactionDetails);



                                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                        {
                                            if (_log.IsFatalEnabled)
                                                _log.Fatal(methodBaseName + " Failed to generate new transaction" + " in transaction table : StatusCode is : " + StatusCode + System.Environment.NewLine);
                                            return AtparStatusCodes.E_SERVERERROR;
                                        }
                                    }
                                }
                                else
                                {
                                    if (_log.IsDebugEnabled)
                                        _log.Debug(methodBaseName + " : No putaway order details exist for location : " + dsDeptInfo.Tables[0].Rows[i]["CART_ID"]);
                                }
                            }
                            else
                            {
                                if (_log.IsDebugEnabled)
                                    _log.Debug(methodBaseName + " : Location based item details not found : ");
                            }
                        }

                    }
                    else
                    {
                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + " : Auto putaway enabled POU locations not found : ");
                    }

                }
                else
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " : No locations exist : ");
                }


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " call failed " + System.Environment.NewLine + ex.ToString() + System.Environment.NewLine);
                return AtparStatusCodes.E_SERVERERROR;
            }


            return AtparStatusCodes.ATPAR_OK;

        }

        private long InsertUpdateCartInventory(DataRow[] drPtwyOrdDtls, string bUnit, string qtyRound, long transId, string location, string itmId)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            DataSet dsCartInventory = new DataSet();

            double dblPutAwayqty = 0;
            int i = 0;
            long StatusCode = -1;
            string strPrevItemId = string.Empty;
            DataRow[] drtemsInfo = null;
            DataTable dtItemsInfo = new DataTable();
            string strComp = string.Empty;
            dtItemsInfo = drPtwyOrdDtls.CopyToDataTable();

            try
            {
                foreach (DataRow drDtls in drPtwyOrdDtls)
                {

                    double dblConvFactor = 0;

                    List<MT_POU_CART_INVENTORY> lstCartInventory = _poNonPoRepo.GetCartInventory(bUnit, drDtls);

                    //List to DataSet Conversion
                    DataSet dsCart = new DataSet();
                    DataTable dtCartInventory = new DataTable();
                    dtCartInventory = lstCartInventory.ToDataTable();
                    dsCart.Tables.Add(dtCartInventory);

                    if (dsCart.Tables[0].Rows.Count > 0)
                    {
                        if (drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "CONVERSION_RATE")].ToString() != null && !string.IsNullOrEmpty(drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "CONVERSION_RATE")].ToString()))
                        {
                            dblConvFactor = Convert.ToDouble(drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "CONVERSION_RATE")].ToString());
                        }
                        else
                        {
                            dblConvFactor = 1;
                        }
                        if (dsCart.Tables[0].Rows[0]["COMPARTMENT"] != null)
                        {
                            strComp = dsCart.Tables[0].Rows[0]["COMPARTMENT"].ToString();
                        }
                        else
                        {
                            strComp = string.Empty;
                        }


                        StatusCode = _poNonPoRepo.UpdateCartInventory(dblConvFactor, qtyRound, drDtls, bUnit, strComp);
                        //To insert data in inventory track table

                        if (strPrevItemId != drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "ITEM_ID")].ToString())
                        {
                            drtemsInfo = dtItemsInfo.Select("[" + dtItemsInfo.Columns[AtParWebEnums.Enum_AutoPutAway_Details.ITEM_ID.ToString()].ColumnName + "] =  '" + drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "ITEM_ID")].ToString() + "'");

                            if (drtemsInfo.Length > 0)
                            {
                                for (i = 0; i <= drtemsInfo.Length - 1; i++)
                                {
                                    if (dblConvFactor > 1)
                                    {
                                        if (qtyRound == "Ceil")
                                        {
                                            dblPutAwayqty = dblPutAwayqty + Math.Ceiling(Convert.ToDouble(drtemsInfo[i][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) * dblConvFactor);
                                        }
                                        else if (qtyRound == "Floor")
                                        {
                                            dblPutAwayqty = dblPutAwayqty + Math.Floor(Convert.ToDouble(drtemsInfo[i][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]) * dblConvFactor);
                                        }
                                    }
                                    else
                                    {
                                        dblPutAwayqty = dblPutAwayqty + Convert.ToDouble(drtemsInfo[i][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")]);
                                    }
                                }

                                //Calculating Latest QOH
                                double dblPrevQOH = 0;
                                if (dsCartInventory.Tables[0].Rows[0]["ACTUAL_QUANTITY"] != null)
                                {
                                    dblPrevQOH = Convert.ToDouble(dsCartInventory.Tables[0].Rows[0]["ACTUAL_QUANTITY"]);
                                }
                                dblPrevQOH = (dblPutAwayqty + dblPrevQOH);

                                StatusCode = _poNonPoRepo.SaveInventoryTrackHistory(Convert.ToInt32(transId), (int)AtParWebEnums.AppTransactionStatus.PutAway, Convert.ToInt32(dsCartInventory.Tables[0].Rows[0]["ID"]), dsCartInventory.Tables[0].Rows[0]["BUSINESS_UNIT"].ToString(), dsCartInventory.Tables[0].Rows[0]["CART_ID"].ToString(), dsCartInventory.Tables[0].Rows[0]["ITEM_ID"].ToString(), dsCartInventory.Tables[0].Rows[0]["COMPARTMENT"].ToString().substituteString(), dsCartInventory.Tables[0].Rows[0]["LOT_NUMBER"].ToString(), dsCartInventory.Tables[0].Rows[0]["SERIAL_NUMBER"].ToString(), dblPutAwayqty, dblPrevQOH, DateTime.Now.ToString());

                                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to insert track history data with _statusCode:" + StatusCode);
                                    return StatusCode;
                                }


                            }
                        }
                    }
                    else
                    {
                        StatusCode = _poNonPoRepo.InsertCartInventory(drDtls, bUnit, location, itmId, dblConvFactor, qtyRound);

                        //To insert data in inventory track table
                        if (strPrevItemId != drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "ITEM_ID")].ToString())
                        {
                            drtemsInfo = dtItemsInfo.Select("[" + dtItemsInfo.Columns[AtParWebEnums.Enum_AutoPutAway_Details.ITEM_ID.ToString()].ColumnName + "] =  '" + drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "ITEM_ID")].ToString() + "'");

                            if (drtemsInfo.Length > 0)
                            {
                                for (i = 0; i <= drtemsInfo.Length - 1; i++)
                                {
                                    if (dblConvFactor > 1)
                                    {
                                        if (qtyRound == "Ceil")
                                        {
                                            dblPutAwayqty = dblPutAwayqty + Math.Ceiling(Convert.ToDouble(drtemsInfo[i][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")].ToString()) * dblConvFactor);
                                        }
                                        else if (qtyRound == "Floor")
                                        {
                                            dblPutAwayqty = dblPutAwayqty + Math.Floor(Convert.ToDouble(drtemsInfo[i][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")].ToString()) * dblConvFactor);
                                        }
                                    }
                                    else
                                    {
                                        dblPutAwayqty = dblPutAwayqty + Convert.ToDouble(drtemsInfo[i][(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "QTY")].ToString());
                                    }
                                }

                                StatusCode = _poNonPoRepo.SaveInventoryTrackHistory(Convert.ToInt32(transId), (int)AtParWebEnums.AppTransactionStatus.PutAway, 0, bUnit, location, itmId, drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "STORAGE_LOCATION")].ToString(), drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "LOT_ID")].ToString(), drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "SERIAL_ID")].ToString(), dblPutAwayqty, dblPutAwayqty, DateTime.Now.ToString());

                                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                                {
                                    if (_log.IsFatalEnabled)
                                        _log.Fatal(methodBaseName + " Failed to insert track history data with _statusCode:" + StatusCode);
                                    return StatusCode;
                                }


                            }
                        }

                    }
                    strPrevItemId = drDtls[(int)Enum.Parse(typeof(AtParWebEnums.Enum_AutoPutAway_Details), "ITEM_ID")].ToString();
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        //private long Execute_SendDetails_PostProcessTasks(ref DataSet inputParameters, ref DataSet outputParameters, string[] deviceTokenEntry)
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        return AtparStatusCodes.ATPAR_OK;
        //    }
        //    catch (Exception ex)
        //    {
        //        // _trans.Rollback();
        //        if (_log.IsFatalEnabled)
        //            _log.Fatal(methodBaseName + " Execute_SendDetails_PostProcessTasks failed " + System.Environment.NewLine + ex.ToString());
        //        return AtparStatusCodes.E_SERVERERROR;
        //    }

        //}


        #endregion

        #region GetReceivePrerequisites

        public AtParWebApiResponse<Object> GetReceivePrerequisites(string orgID, string userID, string profileID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<Object>();
            AtParWebApiResponse<string> getSystem = _commonService.GetEnterpriseSystem();
            string enterpriseSystem = getSystem.Data;
            try
            {
                response.DataDictionary = _poNonPoRepo.GetReceivePrerequisites(orgID, userID, enterpriseSystem, profileID);
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log, AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL);
                return response;
            }
        }

        #endregion

        #region SendIUTDetails
        public AtParWebApiResponse<long> SendIUTDetails(Dictionary<string, dynamic> dicDataItems, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            DataTable dtIUTHeader = new DataTable();//VM_IUT_SENDHEADER
            DataTable dtIUTDetails = new DataTable();//VM_IUT_SENDDETAILS
            DataTable dtIUTTransaction = new DataTable();//VM_IUT_SENDDETAILS
            Tuple<DataSet, long> tupleResult = null;
            DataSet inputParameters = new DataSet();

            try
            {

                dtIUTHeader = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendIUT_Header_Defns,
                       AtParWebEnums.DataSet_Type.HEADERS.ToString());

                dtIUTDetails = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendIUT_Details_Defns,
                        AtParWebEnums.DataSet_Type.DETAILS.ToString());

                dtIUTTransaction = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendIUT_Transaction_Defns,
                      AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString());

                foreach (var keyValuePair in dicDataItems)
                {
                    switch (keyValuePair.Key)
                    {
                        case "HEADER":

                            var hdrColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {

                                DataRow _drHed = dtIUTHeader.NewRow();

                                _drHed[AtParWebEnums.SendIUT_Header_Enum.PRODUCT_ID.ToString()] = item.PRODUCT_ID;
                                dtIUTHeader.Rows.Add(_drHed);
                            }

                            break;

                        case "DETAILS":
                            var detailColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {
                                string strDate = item.START_DT_TIME;

                                if(!string.IsNullOrEmpty(strDate))
                                {
                                    DateTime strStartDate = DateTime.Parse(strDate.Replace("{", "").Replace("}", ""));

                                    strDate = strStartDate.ToString("MM/dd/yyyy HH:mm:ss");
                                }

                                string strEndDate = item.END_DT_TIME;

                                if (!string.IsNullOrEmpty(strEndDate))
                                {
                                    DateTime strEDate = DateTime.Parse(strEndDate.Replace("{", "").Replace("}", ""));
                                    strEndDate = strEDate.ToString("MM/dd/yyyy HH:mm:ss");
                                }

                                DataRow _drDet = dtIUTDetails.NewRow();
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.TRANSACTION_ID.ToString()] = item.TRANSACTION_ID;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.DESTIN_BUSINESS_UNIT.ToString()] = item.DESTIN_BUSINESS_UNIT;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.ORIG_BUSINESS_UNIT.ToString()] = item.ORIG_BUSINESS_UNIT;
                                _drDet[(int)AtParWebEnums.SendIUT_DETAILS_Enum.INTERUNIT_ID] = item.INTERUNIT_ID;
                                _drDet[(int)AtParWebEnums.SendIUT_DETAILS_Enum.START_DT_TIME] = strDate; //DateTime.Parse(item.START_DT_TIME.Replace("{", "").Replace("}", "")).ToString("MM/dd/yyyy HH:mm:ss"); //string.IsNullOrEmpty(item.START_DT_TIME) ? "" : Convert.ToDateTime(item.START_DT_TIME).toString("MM/dd/yyyy HH:mm");
                                _drDet[(int)AtParWebEnums.SendIUT_DETAILS_Enum.END_DT_TIME] = strEndDate; //DateTime.Parse(item.END_DT_TIME.Replace("{", "").Replace("}", "")).ToString("MM/dd/yyyy HH:mm:ss"); //string.IsNullOrEmpty(item.END_DT_TIME) ? "" : Convert.ToDateTime(item.END_DT_TIME).toString("MM/dd/yyyy HH:mm");
                                _drDet[(int)AtParWebEnums.SendIUT_DETAILS_Enum.USER_ID] = item.USER_ID;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.LINE_NO.ToString()] = item.LINE_NO;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.ITEM_ID.ToString()] = item.ITEM_ID;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.DESCRIPTION.ToString()] = item.DESCRIPTION;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.QTY.ToString()] = item.QTY;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.QTY_SHIPPED.ToString()] = item.QTY_SHIPPED;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.UOM.ToString()] = item.UOM;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.CARRIER_ID.ToString()] = item.CARRIER_ID;
                                _drDet[(int)AtParWebEnums.SendIUT_DETAILS_Enum.BILL_OF_LADING] = item.BILL_OF_LADING;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.NO_OF_PKGS.ToString()] = item.NO_OF_PKGS;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.INV_LOT_ID.ToString()] = item.INV_LOT_ID;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.SERIAL_ID.ToString()] = item.SERIAL_ID;
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.INTERUNIT_LINE.ToString()] = item.INTERUNIT_LINE;

                                dtIUTDetails.Rows.Add(_drDet);
                            }

                            break;
                        case "TRANSACTIONS":

                            var subdetailColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {
                                DataRow _drDet = dtIUTTransaction.NewRow();
                                _drDet[AtParWebEnums.SendIUT_DETAILS_Enum.TRANSACTION_ID.ToString()] = item.TRANSACTION_ID;

                                dtIUTTransaction.Rows.Add(_drDet);
                            }

                            break;
                    }
                }


                inputParameters.Tables.Add(dtIUTHeader);
                inputParameters.Tables.Add(dtIUTDetails);
                inputParameters.Tables.Add(dtIUTTransaction);

                DataSet OutputParameter = new DataSet();
                tupleResult = SendIUTDetails_Implementation(inputParameters, OutputParameter, deviceTokenEntry);

                OutputParameter = tupleResult.Item1;
                if (tupleResult.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(tupleResult.Item2, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;


            }

        }

        private Tuple<DataSet, long> SendIUTDetails_Implementation(DataSet inputParameters, DataSet OutputParameter, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            long StatusCode = -1;
            Tuple<DataSet, long> tupleResult = null;

            try
            {

                //HiPerfTimer _timer = new HiPerfTimer();
                // _timer.Start();


                StatusCode = Check_SendIUTDetails_InputParameters(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, long>(null, StatusCode);

                    return tupleResult;
                }

                int appID = 0;
                Tuple<DataSet, long, int> tpleOutput = null;

                //Preprocess Tasks

                tpleOutput = Execute_SendIUTDetails_PreProcessTasks(inputParameters, appID, deviceTokenEntry);

                inputParameters = tpleOutput.Item1;
                appID = tpleOutput.Item3;

                if (tpleOutput.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, long>(null, tupleResult.Item2);

                    return tupleResult;
                }


                //Process Tasks

                tpleOutput = Execute_SendIUTDetails_ProcessTasks(appID, inputParameters, OutputParameter, deviceTokenEntry);
                OutputParameter = tpleOutput.Item1;
                appID = tpleOutput.Item3;

                if (tpleOutput.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, long>(null, tupleResult.Item2);

                    return tupleResult;
                }


                //PostProcess Tasks

                Tuple<long, int> tuple = Execute_SendIUTDetails_PostProcessTasks(appID, inputParameters, OutputParameter, deviceTokenEntry);
                appID = tuple.Item2;

                if (tuple.Item1 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleResult = new Tuple<DataSet, long>(null, tuple.Item1);

                    return tupleResult;
                }

                tupleResult = new Tuple<DataSet, long>(OutputParameter, StatusCode);

                return tupleResult;

                //_timer.Stop();
                //if (perflog.IsInfoEnabled)
                //    perflog.Info(methodBaseName + " " + _timer.Duration + " seconds");

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString());
                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;
            }
        }

        private long Check_SendIUTDetails_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                ///// Printing InPut DataSet ///'
                if (_log.IsDebugEnabled)
                {

                    //DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                    inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);

                    //StatusCode = PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);

                    //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //        _log.Fatal(methodBaseName + " Error occured in PrintDatasetStatistics. Status Code Returned is : " + StatusCode);
                    //    return StatusCode;
                    //}

                }
                ///// End of Printing InPut DataSet ///'

                if (inputParameters.Tables.Count != 3)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Incorrect DataTable Count " + inputParameters.Tables.Count);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + "  Headers Rows count : " + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count.ToString());

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString());
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }
        }

        private Tuple<DataSet, long, int> Execute_SendIUTDetails_PreProcessTasks(DataSet inputParameters, int appID, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            long StatusCode = 0;
            Tuple<DataSet, long, int> tupleOutput = null;

            try
            {

                if (inputParameters.Tables.Count == 0)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No tables present in Input Dataset ");

                    tupleOutput = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_INVALIDPARAMETER, appID);
                    return tupleOutput;
                }
                else if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count == 0)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No Rows present in Headers Dataset ");
                    tupleOutput = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_INVALIDPARAMETER, appID);
                    return tupleOutput;
                }

                appID = Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendIUT_Header_Enum.PRODUCT_ID.ToString()]);


                Tuple<DataSet, long> tupleResult = null;

                tupleResult = Populate_SendIUTDetails_InputParameters(inputParameters);
                inputParameters = tupleResult.Item1;

                if (tupleResult.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_SERVERERROR, appID);

                    return tupleOutput;
                }




                tupleOutput = Populate_SendIUTDetails_Prerequisites(inputParameters, appID, deviceTokenEntry);
                inputParameters = tupleOutput.Item1;
                appID = tupleOutput.Item3;

                if (tupleOutput.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tupleOutput = new Tuple<DataSet, long, int>(null, AtparStatusCodes.E_SERVERERROR, appID);

                    return tupleOutput;
                }

                tupleOutput = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.ATPAR_OK, appID);

                return tupleOutput;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Populate_GetHeader_ListViewData failed " + System.Environment.NewLine + ex.ToString());
                tupleOutput = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_SERVERERROR, appID);
                return tupleOutput;

            }
        }

        private Tuple<DataSet, long> Populate_SendIUTDetails_InputParameters(DataSet inputParameters)
        {


            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<DataSet, long> tupleResult = null;
            long StatusCode = -1;


            try
            {
                DataTable dtPutawayPreReq = new DataTable();

                dtPutawayPreReq = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendIUT_PreReq_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                // Add these tables to actual input parameters
                inputParameters.Tables.Add(dtPutawayPreReq);


                tupleResult = new Tuple<DataSet, long>(inputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());

                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }

        }

        private Tuple<DataSet, long, int> Populate_SendIUTDetails_Prerequisites(DataSet inputParameters, int appID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            SortedList<string, string> transactions;
            SortedList<string, string> profParams;

            string remoteDBType = "";
            string remoteSchema = "";
            string family = "";
            string enterprise = "";
            bool remoteSuccess = false;
            string profileId = string.Empty;
            string parameterID = string.Empty;
            string orgGroupId = string.Empty;
            string userId = string.Empty;
            string strUserid = string.Empty;
            string transactionId = string.Empty;

            long StatusCode = -1;
            Tuple<DataSet, long, int> tupleResult = null;


            try
            {

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows.Count > 0)
                {
                    transactionId = inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows[0][AtParWebEnums.SendIUT_TRANSACTIONS_Enum.TRANSACTION_ID.ToString()].ToString();

                    if (!string.IsNullOrEmpty(transactionId))
                    {
                        transactions = new SortedList<string, string>();
                        transactions[transactionId] = "0";

                        if (appID == (int)AtParWebEnums.EnumApps.PutAway)
                        {
                            StatusCode = _commonRepo.GetTransactionStatus(transactions, (int)AtParWebEnums.EnumApps.PutAway);
                        }
                        else
                        {
                            StatusCode = _commonRepo.GetTransactionStatus(transactions, (int)AtParWebEnums.EnumApps.Receiving);
                        }

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + "GetTransactionStatus failed: " + StatusCode + ":");
                            tupleResult = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_SERVERERROR, appID);
                            return tupleResult;

                        }

                        if (transactions[transactionId] == AtParDefns.statRemSucess.ToString())
                        {
                            remoteSuccess = true;
                        }
                    }
                }

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendIUT_Header_Enum.PRODUCT_ID.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                {
                    profParams = new SortedList<string, string>();
                    profParams[AtParWebEnums.AppParameters_Enum.ITEM_RECV_HIGH_PCT.ToString()] = string.Empty;
                    profParams[AtParWebEnums.AppParameters_Enum.ITEM_RECV_LOW_PCT.ToString()] = string.Empty;
                }
                else
                {
                    profParams = new SortedList<string, string>();
                    profParams[AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_HIGH_PCT.ToString()] = string.Empty;
                    profParams[AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_LOW_PCT.ToString()] = string.Empty;
                }

                profileId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString();


                _commonRepo.GetProfileParamValues(profParams, appID, profileId);


                if (appID == (int)AtParWebEnums.EnumApps.PutAway)
                {
                    appID = (int)AtParWebEnums.EnumApps.PutAway;
                }
                else
                {
                    appID = (int)AtParWebEnums.EnumApps.Receiving;
                }

                parameterID = AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString();
                userId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                strUserid = _commonRepo.GetUserParamValue(userId, appID, parameterID);


                if (strUserid == string.Empty)
                {
                    orgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();

                    if (appID == (int)AtParWebEnums.EnumApps.PutAway)
                    {
                        appID = (int)AtParWebEnums.EnumApps.PutAway;
                    }
                    else
                    {
                        appID = (int)AtParWebEnums.EnumApps.Receiving;
                    }
                    parameterID = AtParWebEnums.AppParameters_Enum.PS_USER.ToString();

                    strUserid = _commonRepo.GetOrgGroupParamValue(parameterID, appID, orgGroupId);
                }

                DataRow dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();

                //GetConfigData();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISEVERSION.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                remoteDBType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                            x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                            .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (string.IsNullOrEmpty(remoteDBType))
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ":Not a valid RemoteDBType");
                    tupleResult = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_SERVERERROR, appID);
                    return tupleResult;
                }


                remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                  x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                  .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                if (string.IsNullOrEmpty(remoteSchema))
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ":Not a valid Remote Schema");
                    tupleResult = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_SERVERERROR, appID);
                    return tupleResult;
                }

                family = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISEVERSION.ToString())
                                                      .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                if (string.IsNullOrEmpty(family))
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ":Not a valid EnterpriseFamilyName");
                    tupleResult = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_SERVERERROR, appID);
                    return tupleResult;
                }



                enterprise = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                        x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.ENTERPRISESYSTEM.ToString())
                                                      .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (string.IsNullOrEmpty(enterprise))
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ":Not a valid EnterprisesystemName");

                    tupleResult = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_SERVERERROR, appID);
                    return tupleResult;

                }



                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SendIUT_Header_Enum.PRODUCT_ID.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                {
                    dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.ITEM_RECV_LOW_PCT] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_RECV_LOW_PCT.ToString()];
                    dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.ITEM_RECV_HIGH_PCT] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_RECV_HIGH_PCT.ToString()];
                }
                else
                {
                    dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.ITEM_RECV_LOW_PCT] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_LOW_PCT.ToString()];
                    dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.ITEM_RECV_HIGH_PCT] = profParams[AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_HIGH_PCT.ToString()];
                }

                dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.REMOTE_SCHEMA] = remoteSchema;
                dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDBType;
                dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.PS_USER] = strUserid;
                dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.ENTERPRISE_SYSTEM_NAME] = enterprise;
                dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.ENTERPRISE_VERSION] = family;

                if (remoteSuccess)
                {
                    dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.TRANSACTION_STATUS_REMOTESUCCESS] = true;
                }
                else
                {
                    dr[(int)AtParWebEnums.SendIUT_PreReqData_Enum.TRANSACTION_STATUS_REMOTESUCCESS] = false;
                }

                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(dr);


                tupleResult = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.ATPAR_OK, appID);
                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());

                tupleResult = new Tuple<DataSet, long, int>(null, AtparStatusCodes.E_SERVERERROR, appID);
                return tupleResult;

            }
        }

        private Tuple<DataSet, long, int> Execute_SendIUTDetails_ProcessTasks(int appID, DataSet inputParameters, DataSet outputParameters,
            string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            bool transactionStatus = false;
            Tuple<DataSet, long, int> tupleResult = null;

            try
            {

                if (inputParameters.Tables.Count == 0)
                {

                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + "  No Data Tables present in input dataset ");
                    tupleResult = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_INVALIDPARAMETER, appID);
                    return tupleResult;

                }

                else if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Count == 0)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No Rows present in Pre reqDataset");
                    tupleResult = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_INVALIDPARAMETER, appID);
                    return tupleResult;
                }


                transactionStatus = Convert.ToBoolean(inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendIUT_PreReqData_Enum.TRANSACTION_STATUS_REMOTESUCCESS.ToString()]);

                if (transactionStatus == false)
                {
                    tupleResult = SendERPIUTDetails(appID, inputParameters, outputParameters, deviceTokenEntry);
                    outputParameters = tupleResult.Item1;
                    appID = tupleResult.Item3;

                    if (tupleResult.Item2 != AtparStatusCodes.ATPAR_OK)
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + "Error occored in ERP Call. Status Code Returned is :" + tupleResult.Item2);

                        tupleResult = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_SERVERERROR, appID);
                        return tupleResult;

                    }
                }
                tupleResult = new Tuple<DataSet, long, int>(outputParameters, AtparStatusCodes.ATPAR_OK, appID);
                return tupleResult;



            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetPO_ProcessTasks failed " + System.Environment.NewLine + ex.ToString());
                tupleResult = new Tuple<DataSet, long, int>(inputParameters, AtparStatusCodes.E_SERVERERROR, appID);
                return tupleResult;
            }


        }

        private Tuple<DataSet, long, int> SendERPIUTDetails(int appID, DataSet inputParameters, DataSet outputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<DataSet, long, int> tupleOutput = null;


            try
            {


                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                //GetConfigData();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();



                if (appID == (int)AtParWebEnums.EnumApps.Receiving)
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving + "_" + lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                                  x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString())
                                                                 .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.PutAway + "_" + lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                                x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString())
                                                               .Select(x => x.PARAMETER_VALUE).FirstOrDefault();
                }

                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " : Not a valid Erp Object Name ");
                    tupleOutput = new Tuple<DataSet, long, int>(null, AtparStatusCodes.E_SERVERERROR, appID);
                    return tupleOutput;
                }



                className = "SendIUTDetails";
                methodName = "SendIUTDetails";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, outputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPSendIUTDetails getting failed from ERP")); }
                    tupleOutput = new Tuple<DataSet, long, int>(null, StatusCode, appID);
                    return tupleOutput;
                }

                outputParameters = (DataSet)args[1];


                tupleOutput = new Tuple<DataSet, long, int>(outputParameters, AtparStatusCodes.ATPAR_OK, appID);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<DataSet, long, int>(null, AtparStatusCodes.E_SERVERERROR, appID);
                return tupleOutput;
            }
        }

        private Tuple<long, int> Execute_SendIUTDetails_PostProcessTasks(int appID, DataSet inputParameters, DataSet outputParameters,
            string[] deviceTokenEntry)
        {


            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int paramValItemRecvLow = 0;
            int paramValItemRecvHigh = 0;
            int transactionId = 0;
            int noOfRec = 0;
            string strTransactionId = string.Empty;
            long StatusCode = -1;
            string strDestBunit = string.Empty;
            int i = 0;
            string strInterUnitLine = string.Empty;
            string strStartDate = string.Empty;
            string strLineno = string.Empty;
            string strEndDate = string.Empty;
            string strUOM = string.Empty;
            string strInterUnitID = string.Empty;
            string strCarrrierID = string.Empty;
            string strItemID = string.Empty;
            string strOrgBUnit = string.Empty;
            string strItemDesc = string.Empty;
            double dblShippedQty = 0;
            double dblRecvCent = 0;
            double dblQty = 0;
            string strInvLotID = string.Empty;
            string strSerialID = string.Empty;

            Tuple<long, int> tpleResult = null;

            try
            {

                paramValItemRecvLow = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendIUT_PreReqData_Enum.ITEM_RECV_LOW_PCT.ToString()].ToString() == "" ? 0 : Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendIUT_PreReqData_Enum.ITEM_RECV_LOW_PCT.ToString()]);
                paramValItemRecvHigh = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendIUT_PreReqData_Enum.ITEM_RECV_HIGH_PCT.ToString()].ToString() == "" ? 0 : Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SendIUT_PreReqData_Enum.ITEM_RECV_HIGH_PCT.ToString()]);

                if (inputParameters.Tables.Count == 0)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No datatables present in input dataset ");
                    tpleResult = new Tuple<long, int>(AtparStatusCodes.E_INVALIDPARAMETER, appID);
                    return tpleResult;
                }
                else if (inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows.Count == 0)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No Rows present in transaction table");
                    tpleResult = new Tuple<long, int>(AtparStatusCodes.E_INVALIDPARAMETER, appID);
                    return tpleResult;
                }


                if (appID == (int)AtParWebEnums.EnumApps.PutAway)
                {
                    appID = (int)AtParWebEnums.EnumApps.PutAway;
                }
                else
                {
                    appID = (int)AtParWebEnums.EnumApps.Receiving;
                }

                transactionId = Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows[0][AtParWebEnums.SendIUT_TRANSACTIONS_Enum.TRANSACTION_ID.ToString()]);

                noOfRec = inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;

                POCOEntities.AtPar_Transaction_Entity updateTrans = new POCOEntities.AtPar_Transaction_Entity();

                updateTrans.TransactionId = transactionId;
                updateTrans.Status = AtParDefns.statRemSucess;
                updateTrans.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[0][AtParWebEnums.SendIUT_DETAILS_Enum.START_DT_TIME.ToString()] != null &&
                    inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[0][AtParWebEnums.SendIUT_DETAILS_Enum.START_DT_TIME.ToString()] != "")
                {
                    updateTrans.StartDateTime = Convert.ToDateTime(inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[0][AtParWebEnums.SendIUT_DETAILS_Enum.START_DT_TIME.ToString()]);
                }
                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[0][AtParWebEnums.SendIUT_DETAILS_Enum.END_DT_TIME.ToString()] != null &&
                    inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[0][AtParWebEnums.SendIUT_DETAILS_Enum.END_DT_TIME.ToString()] != "")
                {
                    updateTrans.EndDateTime = Convert.ToDateTime(inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[0][AtParWebEnums.SendIUT_DETAILS_Enum.END_DT_TIME.ToString()]);
                }

               
                updateTrans.TotalRecordSent = noOfRec;

                StatusCode = _commonRepo.UpdateTransaction(updateTrans);
                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + "Failed  toUpdate Transaction, returned Status code :" + StatusCode + ":");
                    tpleResult = new Tuple<long, int>(AtparStatusCodes.E_SERVERERROR, appID);
                    return tpleResult;
                }

                for (i = 0; i <= inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count - 1; i++)
                {
                    DataRow item = inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows[i];

                    strTransactionId = item[AtParWebEnums.SendIUT_DETAILS_Enum.TRANSACTION_ID.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.TRANSACTION_ID.ToString()].ToString();

                    strDestBunit = item[AtParWebEnums.SendIUT_DETAILS_Enum.DESTIN_BUSINESS_UNIT.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.DESTIN_BUSINESS_UNIT.ToString()].ToString();

                    strInterUnitLine = item[AtParWebEnums.SendIUT_DETAILS_Enum.INTERUNIT_LINE.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.INTERUNIT_LINE.ToString()].ToString();

                    strLineno = item[AtParWebEnums.SendIUT_DETAILS_Enum.LINE_NO.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.LINE_NO.ToString()].ToString();

                    strStartDate = item[AtParWebEnums.SendIUT_DETAILS_Enum.START_DT_TIME.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.START_DT_TIME.ToString()].ToString();

                    strEndDate = item[AtParWebEnums.SendIUT_DETAILS_Enum.END_DT_TIME.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.END_DT_TIME.ToString()].ToString();

                    strUOM = item[AtParWebEnums.SendIUT_DETAILS_Enum.UOM.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.UOM.ToString()].ToString();

                    strInterUnitID = item[AtParWebEnums.SendIUT_DETAILS_Enum.INTERUNIT_ID.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.INTERUNIT_ID.ToString()].ToString();

                    strCarrrierID = item[AtParWebEnums.SendIUT_DETAILS_Enum.CARRIER_ID.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.CARRIER_ID.ToString()].ToString();

                    strItemID = item[AtParWebEnums.SendIUT_DETAILS_Enum.ITEM_ID.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.ITEM_ID.ToString()].ToString();

                    strOrgBUnit = item[AtParWebEnums.SendIUT_DETAILS_Enum.ORIG_BUSINESS_UNIT.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.ORIG_BUSINESS_UNIT.ToString()].ToString();

                    strItemDesc = item[AtParWebEnums.SendIUT_DETAILS_Enum.DESCRIPTION.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.DESCRIPTION.ToString()].ToString().ReplaceString();

                    dblShippedQty = Convert.ToDouble(item[AtParWebEnums.SendIUT_DETAILS_Enum.QTY_SHIPPED.ToString()] == null ? 0 : item[AtParWebEnums.SendIUT_DETAILS_Enum.QTY_SHIPPED.ToString()]);

                    dblQty = Convert.ToDouble(item[AtParWebEnums.SendIUT_DETAILS_Enum.QTY.ToString()] == null ? 0 : item[AtParWebEnums.SendIUT_DETAILS_Enum.QTY.ToString()]);

                    strInvLotID = item[AtParWebEnums.SendIUT_DETAILS_Enum.INV_LOT_ID.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.INV_LOT_ID.ToString()].ToString();

                    strSerialID = item[AtParWebEnums.SendIUT_DETAILS_Enum.SERIAL_ID.ToString()] == null ? string.Empty : item[AtParWebEnums.SendIUT_DETAILS_Enum.SERIAL_ID.ToString()].ToString();


                    if (dblShippedQty != 0)
                    {
                        dblRecvCent = ((Convert.ToDouble(dblShippedQty) - Convert.ToDouble(dblQty)) / (Convert.ToDouble(dblShippedQty))) * 100;
                    }

                    if (Convert.ToDouble(dblRecvCent) <= Convert.ToDouble(paramValItemRecvLow) || Convert.ToDouble(dblRecvCent) > Convert.ToDouble(paramValItemRecvHigh))
                    {
                        POCOEntities.AtPar_Deviation_Entity insertDeviationDetails = new POCOEntities.AtPar_Deviation_Entity();

                        if (appID == (int)AtParWebEnums.EnumApps.PutAway)
                        {
                            appID = (int)AtParWebEnums.EnumApps.PutAway;
                        }
                        else
                        {
                            appID = (int)AtParWebEnums.EnumApps.Receiving;
                        }

                        insertDeviationDetails.BusinessUnit = strDestBunit;
                        insertDeviationDetails.Key1 = Convert.ToDouble(strInterUnitLine);
                        insertDeviationDetails.Key2 = Convert.ToInt32(strLineno);
                        insertDeviationDetails.Key3 = 2;
                        insertDeviationDetails.Key4 = strInterUnitID;
                        insertDeviationDetails.Key5 = strCarrrierID;
                        insertDeviationDetails.Key6 = string.Empty;
                        insertDeviationDetails.ReportData1 = dblShippedQty;
                        insertDeviationDetails.ReportData3 = dblQty;
                        insertDeviationDetails.ReportData4 = Convert.ToInt32(strTransactionId);
                        insertDeviationDetails.ReportData5 = 0;
                        insertDeviationDetails.ReportData6 = strInterUnitID;
                        insertDeviationDetails.ReportData7 = "";
                        insertDeviationDetails.ReportData8 = strItemID;
                        insertDeviationDetails.ReportData9 = strInvLotID;
                        insertDeviationDetails.ReportData10 = strSerialID;
                        insertDeviationDetails.ReportData11 = strEndDate;
                        insertDeviationDetails.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                        insertDeviationDetails.UpdateDate = DateTime.Now.ToString();
                        insertDeviationDetails.ReportData12 = strOrgBUnit;
                        insertDeviationDetails.ReportData13 = strItemDesc;
                        insertDeviationDetails.ReportData14 = strUOM;

                        POCOEntities.IUT_RECV_Deviation_Header_Entity iutRecvDeviationHeaderEntity = new POCOEntities.IUT_RECV_Deviation_Header_Entity();

                        iutRecvDeviationHeaderEntity.Transaction_Id = Convert.ToInt32(strTransactionId);
                        iutRecvDeviationHeaderEntity.Line_No = Convert.ToInt32(strInterUnitLine);
                        iutRecvDeviationHeaderEntity.Business_Unit = strDestBunit;
                        iutRecvDeviationHeaderEntity.PO_ID = strInterUnitID;
                        iutRecvDeviationHeaderEntity.PO_Line_No = 0;
                        iutRecvDeviationHeaderEntity.PO_Sched_No = Convert.ToInt32(strLineno);
                        iutRecvDeviationHeaderEntity.Inv_Item_Id = strItemID;
                        iutRecvDeviationHeaderEntity.Description = strItemDesc;
                        iutRecvDeviationHeaderEntity.Unit_Of_Measure = strUOM;
                        iutRecvDeviationHeaderEntity.Qty_PO = dblShippedQty;
                        iutRecvDeviationHeaderEntity.Qty = dblQty;
                        iutRecvDeviationHeaderEntity.ASN_Qty = 0;
                        iutRecvDeviationHeaderEntity.Recv_Uom = strUOM;
                        iutRecvDeviationHeaderEntity.Recv_Conversion_Rate = 0;
                        iutRecvDeviationHeaderEntity.Inventory_Item = AtParWebEnums.YesNo_Enum.Y.ToString();
                        iutRecvDeviationHeaderEntity.Deviation_Type = 2;
                        iutRecvDeviationHeaderEntity.Vendor_Id = string.Empty;
                        iutRecvDeviationHeaderEntity.Carrier_Id = strCarrrierID;
                        iutRecvDeviationHeaderEntity.Custom_Item_No = string.Empty;
                        iutRecvDeviationHeaderEntity.Due_Date = Convert.ToDateTime("1/1/1900");
                        iutRecvDeviationHeaderEntity.Receipt_Date = Convert.ToDateTime(strEndDate);
                        iutRecvDeviationHeaderEntity.update_Date = Convert.ToDateTime("1/1/1900");
                        iutRecvDeviationHeaderEntity.Report_Data_1 = string.Empty;
                        iutRecvDeviationHeaderEntity.Report_Data_2 = string.Empty;
                        iutRecvDeviationHeaderEntity.Report_Data_3 = string.Empty;
                        iutRecvDeviationHeaderEntity.Report_Data_4 = string.Empty;
                        iutRecvDeviationHeaderEntity.Report_Data_5 = string.Empty;
                        iutRecvDeviationHeaderEntity.Location = string.Empty;
                        iutRecvDeviationHeaderEntity.User_Id = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                        POCOEntities.IUT_RECV_Deviation_Details_Entity iutRecvDeviationDetailsEntity = new POCOEntities.IUT_RECV_Deviation_Details_Entity();

                        iutRecvDeviationDetailsEntity.Transaction_Id = Convert.ToInt32(strTransactionId);
                        iutRecvDeviationDetailsEntity.Line_No = Convert.ToInt32(strInterUnitLine);
                        iutRecvDeviationDetailsEntity.Sched_No = Convert.ToInt32(strLineno);
                        iutRecvDeviationDetailsEntity.QTY = dblQty;
                        iutRecvDeviationDetailsEntity.Recv_Uom = strUOM;
                        iutRecvDeviationDetailsEntity.Recv_Conversion_Rate = 1;
                        iutRecvDeviationDetailsEntity.Serial_Id = strSerialID;
                        iutRecvDeviationDetailsEntity.Lot_Id = strInvLotID;
                        //iutRecvDeviationDetailsEntity.Expiry_date = null;


                        if (appID == (int)AtParWebEnums.EnumApps.PutAway)
                        {
                            StatusCode = _commonRepo.InsertDeviation(insertDeviationDetails);
                        }
                        else
                        {
                            StatusCode = _poNonPoRepo.InsertIUTReceiveDeviationHeader(iutRecvDeviationHeaderEntity);
                            StatusCode = _poNonPoRepo.InsertIUTReceiveDeviationDetails(iutRecvDeviationDetailsEntity);
                        }

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + "Failed to Insert deviation, and returned the status code:" + StatusCode);
                            tpleResult = new Tuple<long, int>(StatusCode, appID);
                            return tpleResult;
                        }

                    }
                }
                if (StatusCode == AtparStatusCodes.ATPAR_OK)
                {
                    noOfRec = inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count;

                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + "# of Rows found in the input dataset :" + inputParameters.Tables[AtParWebEnums.DataSet_Type.DETAILS.ToString()].Rows.Count + ":");

                    POCOEntities.AtPar_Transaction_Entity _updateTrans = new POCOEntities.AtPar_Transaction_Entity();

                    _updateTrans.TransactionId = Convert.ToInt32(strTransactionId);

                    if (appID == (int)AtParWebEnums.EnumApps.PutAway)
                    {
                        appID = (int)AtParWebEnums.EnumApps.PutAway;
                    }
                    else
                    {
                        appID = (int)AtParWebEnums.EnumApps.Receiving;
                    }

                    _updateTrans.Status = AtParDefns.statSent;
                    _updateTrans.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                    if (!string.IsNullOrEmpty(strStartDate))
                    {
                        _updateTrans.StartDateTime = Convert.ToDateTime(strStartDate);
                    }
                    if (!string.IsNullOrEmpty(strEndDate))
                    {
                        _updateTrans.EndDateTime = Convert.ToDateTime(strEndDate);
                    }                
                  
                    _updateTrans.TotalRecordSent = noOfRec;

                    StatusCode = _commonRepo.UpdateTransaction(_updateTrans);

                }

                if (StatusCode == AtparStatusCodes.ATPAR_OK)
                {
                    tpleResult = new Tuple<long, int>(AtparStatusCodes.ATPAR_OK, appID);
                    return tpleResult;
                }
                else
                {
                    tpleResult = new Tuple<long, int>(AtparStatusCodes.E_SERVERERROR, appID);
                    return tpleResult;
                }


            }
            catch (Exception ex)
            {
                // _trans.Rollback();
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetHeader_PostProcessTasks failed " + System.Environment.NewLine + ex.ToString());
                tpleResult = new Tuple<long, int>(AtparStatusCodes.E_SERVERERROR, appID);
                return tpleResult;
            }

        }

        #endregion

        #region DeleteIUTHeader
        public AtParWebApiResponse<long> DeleteIUTHeader(Dictionary<string, dynamic> dicDataItems, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            DataSet inputParameters = new DataSet();
            DataTable dtTransaction = new DataTable();//VM_RECV_TRANSACTIONS
            DataTable dtProdID = new DataTable();//VM_IUT_HEADER

            //long StatusCode = -1;
            // DataSet OutputParameter = new DataSet();
            //Tuple<DataSet, long> tupleResult = null;


            try
            {

                dtTransaction = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Receive_Transactions,
                     AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString());

                dtProdID = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Delete_IUT_Hdr_Defns,
                        AtParWebEnums.DataSet_Type.HEADERS.ToString());


                foreach (var keyValuePair in dicDataItems)
                {
                    switch (keyValuePair.Key)
                    {
                        case "HEADER":

                            var hdrColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {

                                DataRow _drHed = dtProdID.NewRow();

                                _drHed[AtParWebEnums.Delete_IUT_Header_Enum.PRODUCT.ToString()] = item.PRODUCT;
                                dtProdID.Rows.Add(_drHed);
                            }

                            break;

                        case "TRANSACTION":

                            var subdetailColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {
                                DataRow _drTranscation = dtTransaction.NewRow();
                                _drTranscation[AtParWebEnums.Receive_Transaction_Enum.TRANSACTIONID.ToString()] = item.TRANSACTIONID;

                                dtTransaction.Rows.Add(_drTranscation);
                            }

                            break;
                    }
                }
                inputParameters.Tables.Add(dtProdID);
                inputParameters.Tables.Add(dtTransaction);

                long StatusCode = DeleteIUTHeader_Implementation(inputParameters, deviceTokenEntry);
                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }
        }
        public long DeleteIUTHeader_Implementation(DataSet inputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            // DataSet OutputParameter = new DataSet();
            //Tuple<DataSet, long> tupleResult = null;

            //Tuple<long, string> tplResult = null;

            try
            {
                //HiPerfTimer _timer = new HiPerfTimer();
                // _timer.Start();

                //Checking input Parameters

                StatusCode = Check_DeleteIUTHeader_InputParameters(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    //tupleResult = new Tuple<DataSet, long>(null, StatusCode);

                    return StatusCode;
                }


                //Preprocess Tasks

                //StatusCode = Execute_DeleteIUTHeader_PreProcessTasks(inputParameters, deviceTokenEntry);

                //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                //{
                //    //tupleResult = new Tuple<DataSet, long>(OutputParameter, StatusCode);

                //    return StatusCode;
                //}


                //Process Tasks

                StatusCode = Execute_DeleteIUTHeader_ProcessTasks(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    //tupleResult = new Tuple<DataSet, long>(OutputParameter, tplResult.Item1);

                    return StatusCode;
                }



                //PostProcess Tasks

                //StatusCode = Execute_DeleteIUTHeader_PostProcessTasks(inputParameters, ref OutputParameter, deviceTokenEntry);

                //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                //{
                //   // tupleResult = new Tuple<DataSet, long>(OutputParameter, StatusCode);

                //    return StatusCode;
                //}


                //tupleResult = new Tuple<DataSet, long>(OutputParameter, AtparStatusCodes.ATPAR_OK);
                return AtparStatusCodes.ATPAR_OK;

                //_timer.Stop();
                //if (perflog.IsInfoEnabled)
                //    perflog.Info(methodBaseName + " " + _timer.Duration + " seconds");

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ":E_SERVERERROR: " + ex.ToString());
                //tupleResult = new Tuple<DataSet, long>(OutputParameter, AtparStatusCodes.E_SERVERERROR);
                return AtparStatusCodes.E_SERVERERROR;

            }
        }
        private long Check_DeleteIUTHeader_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            bool validInputParameters = false;
            string customErrorMessage = string.Empty;

            try
            {
                ///// Printing InPut DataSet ///'
                if (_log.IsDebugEnabled)
                {
                    //DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                    inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);

                    //StatusCode = PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);

                    //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //        _log.Fatal(methodBaseName + " Error occured in PrintDatasetStatistics. Status Code Returned is : " + StatusCode);
                    //    return StatusCode;
                    //}

                }
                ///// End of Printing InPut DataSet ///'

                //Check for Table Count
                if (inputParameters.Tables.Count > 0)
                {
                    if (inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()))
                    {
                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows.Count > 0)
                        {
                            if (inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows[0][0] != null)
                            {
                                if (_log.IsDebugEnabled)
                                    _log.Debug(methodBaseName + " " + inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows.Count.ToString() + " Transaction received : " + inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows[0][0]);

                                validInputParameters = true;
                            }
                            else
                            {
                                customErrorMessage = methodBaseName + "Invalid Transaction Id";
                            }
                        }
                        else
                        {
                            customErrorMessage = methodBaseName + " No Rows in Table" + AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString();
                        }
                    }
                    else
                    {
                        customErrorMessage = methodBaseName + "Transaction Table Does'nt Exist in the Input Parameters";
                    }

                }
                else
                {
                    customErrorMessage = methodBaseName + "No Tables in the Input Dataset. Table Count:" + inputParameters.Tables.Count;
                }
                if (validInputParameters == false)
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + " : and the custom error error message is " + customErrorMessage);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }


                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString());
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }
        }
        private long Execute_DeleteIUTHeader_ProcessTasks(DataSet inputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {

                if (inputParameters.Tables.Count > 0)
                {
                    if (inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()))
                    {
                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows.Count > 0)
                        {
                            POCOEntities.AtPar_Transaction_Entity transactionEntity = new POCOEntities.AtPar_Transaction_Entity();

                            transactionEntity.TransactionId = Convert.ToInt32(inputParameters.Tables[AtParWebEnums.DataSet_Type.TRANSACTIONS.ToString()].Rows[0][0]);

                            if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.Delete_IUT_Header_Enum.PRODUCT.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                            {
                                transactionEntity.ApplicationId = (int)AtParWebEnums.EnumApps.Receiving;
                            }
                            else
                            {
                                transactionEntity.ApplicationId = (int)AtParWebEnums.EnumApps.PutAway;
                            }
                            transactionEntity.Status = AtParDefns.statCancel;
                            transactionEntity.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + ": Updating the Transaction ( " + transactionEntity.TransactionId + ") Status to Cancel.");

                            StatusCode = _commonRepo.UpdateTransaction(transactionEntity);

                            if (StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                if (_log.IsFatalEnabled)
                                    _log.Fatal(methodBaseName + "  Error while updating the Transaction Status to Cancel. Status Code Returned is :" + StatusCode);
                                return StatusCode;
                            }
                            else
                            {
                                if (_log.IsDebugEnabled)
                                    _log.Debug(methodBaseName + ": Successfully Updated the Transaction ( " + transactionEntity.TransactionId + ") Status to Cancel.");

                            }
                        }
                        else
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " No Transaction Id in Transactions Table of InputParameters ");
                            return AtparStatusCodes.E_SERVERERROR;

                        }
                    }
                    else
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal(methodBaseName + " No Transaction Table of InputParameters ");
                        return AtparStatusCodes.E_SERVERERROR;
                    }

                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No  Tables  in InputParameters ");
                    return AtparStatusCodes.E_SERVERERROR;
                }

                return AtparStatusCodes.ATPAR_OK;



            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetPO_ProcessTasks failed " + System.Environment.NewLine + ex.ToString());

                return AtparStatusCodes.E_SERVERERROR;
            }


        }

        #endregion

        #region PrintStaionaryReport
        public AtParWebApiResponse<long> PrintStaionaryReport(Dictionary<string, dynamic> dicDataItems /*Dictionary<List<VM_RECV_HEADER>, List<VM_RECV_DETAILS>> dicDataItems*/, int noOfCopies, params string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            string OrgGroupId = string.Empty;
            string strRepeatHed = string.Empty;
            string printerAddr = string.Empty;
            long StatusCode = -1;
            bool blnPrinterMatched = false;
            string headerFontName = string.Empty;
            string valueFontName = string.Empty;
            string detHeaderFontName = string.Empty;
            string detValueFontName = string.Empty;
            float DefFontSiz = 8.75f;
            Font BarcodeFont;
            Font HeaderFont;
            Font ValueFont;
            Font DetHeaderFont;
            Font DetValueFont;
            Tuple<List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>, List<MT_ATPAR_PRINT_LABEL_DETAILS>> tplprintdetails = null;
            DataSet dsprintdetails = new DataSet();

            DataSet dsheaderFinal = new DataSet();
            DataSet outputParameters = new DataSet();

            DataTable dtHeader = new DataTable();
            DataTable dtDetails = new DataTable();


            try
            {

                foreach (var keyValuePair in dicDataItems)
                {
                    switch (keyValuePair.Key)
                    {
                        case "HEADER":

                            var hdrColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {


                                dtHeader = new DataTable("Headers");
                                dtHeader.Columns.Add("END_DT_TIME");
                                dtHeader.Columns.Add("PO_ID");
                                dtHeader.Columns.Add("LOCATION");
                                dtHeader.Columns.Add("DELIVER_TO");
                                dtHeader.Columns.Add("INT_TRACKING_NBR");
                                dtHeader.Columns.Add("HDR_CMTS");

                                DataRow _drHed = dtHeader.NewRow();

                                _drHed["END_DT_TIME"] = item.END_DT_TIME;
                                _drHed["PO_ID"] = item.PO_ID;
                                _drHed["LOCATION"] = item.LOCATION;
                                _drHed["DELIVER_TO"] = item.DELIVER_TO;
                                _drHed["INT_TRACKING_NBR"] = item.TRACKING_NBR;// item.INT_TRACKING_NBR;
                                _drHed["HDR_CMTS"] = item.HDR_CMTS;

                                dtHeader.Rows.Add(_drHed);
                            }

                            break;

                        case "DETAILS":

                            var subdetailColumnNames = dicDataItems[keyValuePair.Key];

                            foreach (var item in keyValuePair.Value)
                            {
                                dtDetails = new DataTable("Details");

                                dtDetails.Columns.Add("ITEMID_DESC");
                                dtDetails.Columns.Add("UNIT_OF_MEASURE");
                                dtDetails.Columns.Add("RECV_UOM");
                                dtDetails.Columns.Add("QTY_PO");
                                dtDetails.Columns.Add("OPENQTY");
                                dtDetails.Columns.Add("QTY");
                                dtDetails.Columns.Add("STORAGE_LOCATION");
                                dtDetails.Columns.Add("RECV_CONVERSION_RATE");
                                dtDetails.Columns.Add("MFG_ITEM_ID");
                                dtDetails.Columns.Add("ITM_ID_VNDR");
                                dtDetails.Columns.Add("REQ_NUM");

                                DataRow drItemrow = dtDetails.NewRow();
                                drItemrow["ITEMID_DESC"] = item.ITEMID_DESC;
                                drItemrow["UNIT_OF_MEASURE"] = item.UNIT_OF_MEASURE;
                                drItemrow["RECV_UOM"] = item.RECV_UOM;
                                drItemrow["QTY_PO"] = item.QTY_PO;
                                drItemrow["OPENQTY"] = item.OPENQTY;
                                drItemrow["QTY"] = item.QTY;
                                drItemrow["STORAGE_LOCATION"] = item.STORAGE_LOCATION;
                                drItemrow["MFG_ITEM_ID"] = item.MFG_ITEM_ID;
                                drItemrow["ITM_ID_VNDR"] = item.ITM_ID_VNDR;
                                drItemrow["REQ_NUM"] = item.REQ_NUM;

                                dtDetails.Rows.Add(drItemrow);
                            }

                            break;
                    }
                }

                outputParameters.Tables.Add(dtHeader);
                outputParameters.Tables.Add(dtDetails);

                OrgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();

                strRepeatHed = _commonRepo.GetOrgGroupParamValue(AtParWebEnums.AppParameters_Enum.PRINT_RECVHEADER_EACH_PAGE.ToString(), (int)AtParWebEnums.EnumApps.Receiving, OrgGroupId);

                //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                //{
                //    if (_log.IsWarnEnabled)
                //        _log.Warn(" GetOrgGroupParamValue :PRINT_RECHEADER_EACH_PAGE:" + strRepeatHed);
                //    return StatusCode;
                //}

                if (outputParameters.Tables.Count > 0)
                {
                    if (outputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)//dicDataItems.Keys.Count > 0
                    {
                        printerAddr = _commonRepo.GetUserParamValue(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString(), (int)AtParWebEnums.EnumApps.Receiving, AtParWebEnums.AppParameters_Enum.RECEIPT_DELIVER_PRINTER_NAME.ToString());

                        //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        //{
                        //    if (_log.IsWarnEnabled)
                        //        _log.Warn(" GetUserParamValue :RECEIPT_DELIVER_PRINTER_NAME:" + printerAddr);
                        //    return StatusCode;
                        //}

                        if (_log.IsDebugEnabled)
                            _log.Debug(methodBaseName + " : printer address is:" + printerAddr);

                        //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        //{
                        //    if (_log.IsWarnEnabled)
                        //        _log.Warn(methodBaseName + "failed to get PrinterAddr:" + StatusCode);
                        //    return AtparStatusCodes.E_SERVERERROR;
                        //}

                        if (string.IsNullOrEmpty(printerAddr))
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + ":Default printer address is not set ");
                            response.AtParNotOK(AtparStatusCodes.ATPAR_E_NOPRINTADDRESS, _commonRepo, _log);
                            return response;
                        }
                        blnPrinterMatched = true;


                        tplprintdetails = _poNonPoRepo.GetPrintHeaderItemDetails();

                        //Converting Tuple to DataSet

                        DataTable dt1 = new DataTable();
                        DataTable dt2 = new DataTable();
                        DataTable dt3 = new DataTable();
                        DataTable dt4 = new DataTable();

                        dt1 = tplprintdetails.Item1.ToDataTable();
                        dt2 = tplprintdetails.Item2.ToDataTable();
                        dt3 = tplprintdetails.Item3.ToDataTable();
                        dt4 = tplprintdetails.Item4.ToDataTable();

                        dsprintdetails.Tables.Add(dt1);
                        dsprintdetails.Tables.Add(dt2);
                        dsprintdetails.Tables.Add(dt3);
                        dsprintdetails.Tables.Add(dt4);


                        //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        //{
                        //    if (_log.IsWarnEnabled)
                        //        _log.Warn(methodBaseName + " failed to get Report Dynamic Header and Item Column details :" + StatusCode);
                        //    return AtparStatusCodes.E_SERVERERROR;
                        //}
                        //else if(StatusCode == AtparStatusCodes.ATPAR_OK)
                        //{
                        //    if(dsprintdetails.Tables[0].Rows.Count == 0 && dsprintdetails.Tables[1].Rows.Count == 0)
                        //    {
                        //        if (_log.IsWarnEnabled)
                        //            _log.Warn(methodBaseName + "  No Records found for Dynamic Header and Item Column details in Table " );
                        //        return AtparStatusCodes.E_NORECORDFOUND;
                        //    }
                        //}
                    }

                    if (blnPrinterMatched)
                    {

                        if (dsprintdetails != null && dsprintdetails.Tables.Count > 0)
                        {
                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + "  Dynamic Report Building Started ");

                            ReportDocument repo = new ReportDocument();
                            repo.DocumentUnit = GraphicsUnit.Inch;
                            TextStyle.ResetStyles();

                            ReportBuilder builder = new ReportBuilder(repo);
                            builder.StartLinearLayout(Direction.Vertical);
                            builder.DefaultTablePen = Pens.White;

                            TextStyle.TableRow.MarginTop = 0.01F;
                            TextStyle.TableRow.MarginBottom = 0.01F;
                            TextStyle.TableHeader.MarginBottom = 0.01F;

                            Font drawFont = new Font("Arial", DefFontSiz);
                            TextStyle.Normal.SetFromFont(drawFont);
                            SectionLine Footerline;

                            Footerline = new SectionLine(Direction.Horizontal, new Pen(Brushes.White, 0.01F));
                            builder.PageFooter.AddSection(Footerline);
                            builder.AddPageFooterLine();

                            if (dsprintdetails.Tables[2] != null)
                            {
                                if (dsprintdetails.Tables[2].Rows.Count > 0)
                                {
                                    headerFontName = dsprintdetails.Tables[2].Rows[0]["HEADERFONT"].ToString();
                                    valueFontName = dsprintdetails.Tables[2].Rows[0]["VALUEFONT"].ToString();
                                }
                            }
                            if (dsprintdetails.Tables[3] != null)
                            {
                                if (dsprintdetails.Tables[3].Rows.Count > 0)
                                {
                                    detHeaderFontName = dsprintdetails.Tables[3].Rows[0]["HEADERFONT"].ToString();
                                    detValueFontName = dsprintdetails.Tables[3].Rows[0]["VALUEFONT"].ToString();
                                }
                            }

                            BarcodeFont = new Font("IDAutomationC128S", 10.0F);


                            if (!string.IsNullOrEmpty(headerFontName))
                            {
                                HeaderFont = new Font(headerFontName, DefFontSiz);
                            }
                            else
                            {
                                HeaderFont = new Font("Arial", DefFontSiz);
                            }


                            if (!string.IsNullOrEmpty(valueFontName))
                            {
                                ValueFont = new Font(valueFontName, DefFontSiz);
                            }
                            else
                            {
                                ValueFont = new Font("Arial", DefFontSiz);
                            }


                            if (!string.IsNullOrEmpty(detHeaderFontName))
                            {
                                DetHeaderFont = new Font(detHeaderFontName, DefFontSiz);
                            }
                            else
                            {
                                DetHeaderFont = new Font("Arial", DefFontSiz);
                            }


                            if (!string.IsNullOrEmpty(detValueFontName))
                            {
                                DetValueFont = new Font(detValueFontName, DefFontSiz);
                            }
                            else
                            {
                                DetValueFont = new Font("Arial", DefFontSiz);
                            }

                            PageLinearSections lin = new PageLinearSections();

                            PrintColumns = 0;
                            DataTable dtHeaderTbl = new DataTable();
                            string strPrevRow = string.Empty;
                            ArrayList strArrColumnLst = new ArrayList();
                            int intTblsCnt = 0;
                            DataRow dsdr = null;

                            if (dsprintdetails.Tables[0].Rows.Count > 0)
                            {
                                TextStyle BarcodeFontstyle = TextStyle.Barcode;
                                BarcodeFontstyle.StringAlignment = StringAlignment.Center;
                                int intHedRowsOrder = Convert.ToInt32(dsprintdetails.Tables[0].Compute("max(COLUMN_POSITION)", ""));
                                PrintColumns = intHedRowsOrder;
                                int intHeaderTblsCnt = 0;

                                for (int i = 0; i <= intHedRowsOrder - 1; i++)
                                {
                                    dtHeaderTbl.Columns.Add("HED" + i.ToString(), Type.GetType("System.String"));
                                }

                                Pen Wpen = new Pen(Color.White, 0.01F * (float)1.0);

                                for (int Hedcnt = 0; Hedcnt <= dsprintdetails.Tables[0].Rows.Count - 1; Hedcnt++)
                                {
                                    builder.StartLinearLayout(Direction.Vertical);

                                    if (strPrevRow != dsprintdetails.Tables[0].Rows[Hedcnt]["ROW_POSITION"].ToString())
                                    {
                                        DataRow dr = dtHeaderTbl.NewRow();
                                        intHeaderTblsCnt = intHeaderTblsCnt + 1;
                                        DataRow[] drRow = null;
                                        drRow = dsprintdetails.Tables[0].Select("ROW_POSITION ='" + dsprintdetails.Tables[0].Rows[Hedcnt]["ROW_POSITION"].ToString() + "'");

                                        for (int Introws = 0; Introws <= drRow.Length - 1; Introws++)
                                        {
                                            int ColPosition = int.Parse(drRow[Introws]["COLUMN_POSITION"].ToString());
                                            strArrColumnLst.Add(drRow[Introws]["COLUMN_POSITION"].ToString());

                                            if (drRow[Introws]["TEXT_VALUE"].ToString() == "TEXT")
                                            {
                                                dr[ColPosition - 1] = (string.IsNullOrEmpty(drRow[Introws]["DISPLAY_NAME"].ToString().Trim()) ? "" : drRow[Introws]["DISPLAY_NAME"].ToString().Trim() + " : ");
                                            }
                                            else
                                            {
                                                dr[ColPosition - 1] = GetHeaderColumnValue(drRow[Introws]["FIELD_NAME"].ToString(),
                                                    drRow[Introws]["FIELD_TYPE"].ToString(), outputParameters);
                                            }

                                        }

                                        for (int IntColumn = 1; IntColumn <= intHedRowsOrder; IntColumn++)
                                        {
                                            if (strArrColumnLst.Contains(IntColumn.ToString()))
                                            {
                                            }
                                            else
                                            {
                                                dr[IntColumn - 1] = "EMPTYCOLUMN";

                                            }
                                        }

                                        dtHeaderTbl.Rows.Add(dr);

                                        DataTable dtTempTbl1 = new DataTable();
                                        dtTempTbl1.TableName = "Tbl" + intHeaderTblsCnt.ToString();
                                        dtTempTbl1 = dtHeaderTbl.Clone();

                                        DataRow drNewRow = dtTempTbl1.NewRow();
                                        drNewRow.Table.ImportRow(dr);
                                        dtTempTbl1.Rows.Add(drNewRow);
                                        strArrColumnLst.Clear();


                                        dsdr = dsprintdetails.Tables[0].Rows[Hedcnt];
                                        Tuple<long, DataTable, DataRow> tuple = CheckColumnSpan(intTblsCnt, dtTempTbl1, dsdr,
                                            dsprintdetails.Tables[0].Rows[Hedcnt]["ROW_POSITION"].ToString());

                                        long RepStatusCode = tuple.Item1;
                                        dtTempTbl1 = tuple.Item2;
                                        dsdr = tuple.Item3;

                                        if (RepStatusCode != AtparStatusCodes.ATPAR_OK)
                                        {
                                            if (_log.IsWarnEnabled)
                                                _log.Warn(methodBaseName + "failed to Build Report Documet Header :" + RepStatusCode);
                                            response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                            return response;
                                        }
                                        dsheaderFinal.Tables.Add(dtTempTbl1);


                                        //' Building Report Depending on Repeat header Parameter                                       

                                        if (strRepeatHed != "Y")
                                        {
                                            builder.DefaultTablePen = Wpen;

                                            Tuple<ReportBuilder, DataSet, DataRow[], Font, Font, Font, DataSet> tplRes = BuildHeader(builder,
                                                dsheaderFinal, drRow, intTblsCnt, HeaderFont, ValueFont, BarcodeFont, dsprintdetails);

                                            //RepStatusCode = tplRes.Item1;
                                            builder = tplRes.Item1;
                                            dsheaderFinal = tplRes.Item2;
                                            drRow = tplRes.Item3;
                                            HeaderFont = tplRes.Item4;
                                            ValueFont = tplRes.Item5;
                                            BarcodeFont = tplRes.Item6;
                                            dsprintdetails = tplRes.Item7;
                                            RepStatusCode = 0;
                                            if (RepStatusCode != AtparStatusCodes.ATPAR_OK)
                                            {
                                                if (_log.IsWarnEnabled)
                                                    _log.Warn(methodBaseName + "failed to Build Report Documet Header :" + RepStatusCode);
                                                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                                return response;
                                            }

                                        }
                                        else
                                        {
                                            BarcodeFontstyle.SetFromFont(BarcodeFont);
                                            BarcodeFontstyle.StringAlignment = StringAlignment.Center;

                                            Tuple<long, DataSet, DataRow[], Font, Font, PageLinearSections> tpl = BuildRepeatableHeader(builder, dsheaderFinal, drRow, intTblsCnt,
                                                HeaderFont, ValueFont, BarcodeFont, lin, BarcodeFontstyle);
                                            RepStatusCode = tpl.Item1;
                                            dsheaderFinal = tpl.Item2;
                                            drRow = tpl.Item3;
                                            HeaderFont = tpl.Item4;
                                            ValueFont = tpl.Item5;
                                            lin = tpl.Item6;

                                            if (RepStatusCode != AtparStatusCodes.ATPAR_OK)
                                            {
                                                if (_log.IsWarnEnabled)
                                                    _log.Warn(methodBaseName + "failed to Build Report Documet Header :" +
                                                        RepStatusCode);
                                                response.AtParNotOK(AtparStatusCodes.E_SERVERERROR, _commonRepo, _log);
                                                return response;
                                            }
                                        }

                                        intTblsCnt = intTblsCnt + 1;


                                    }

                                    strPrevRow = dsprintdetails.Tables[0].Rows[Hedcnt]["ROW_POSITION"].ToString();
                                }
                            }

                            if (strRepeatHed == "Y")
                            {
                                builder.PageHeader.AddSection(lin);

                            }
                            builder.FinishLinearLayout();

                            builder.DefaultTablePen = repo.ThinPen;
                            if (dsprintdetails.Tables[1].Rows.Count > 0)
                            {
                                DataView dvItems = outputParameters.Tables["Details"].DefaultView;//.Tables[1].DefaultView;// "Details" /
                                builder.AddTable(dvItems, true, 100);
                                builder.Table.HorizontalAlignment = HorizontalAlignment.Center;
                                builder.Table.HeaderTextStyle.StringAlignment = (StringAlignment)VerticalAlignment.Middle;

                                for (int intDetcnt = 0; intDetcnt <= dsprintdetails.Tables[1].Rows.Count - 1; intDetcnt++)
                                {
                                    if (dsprintdetails.Tables[1].Rows[intDetcnt]["FIELD_TYPE"].ToString() == "INTEGER")
                                    {
                                        builder.AddColumn(dsprintdetails.Tables[1].Rows[intDetcnt]["FIELD_NAME"].ToString(),
                                            dsprintdetails.Tables[1].Rows[intDetcnt]["DISPLAY_NAME"].ToString(),
                                            GetColumnWidth(Convert.ToInt32(dsprintdetails.Tables[1].Rows[intDetcnt]["FIELD_SIZE"])), false, false, HorizontalAlignment.Right);
                                    }
                                    else if (dsprintdetails.Tables[1].Rows[intDetcnt]["FIELD_TYPE"].ToString() == "BARCODE")
                                    {
                                        builder.AddBarcodeColumn(outputParameters.Tables["Details"].Columns[dsprintdetails.Tables[1].Rows[intDetcnt]["FIELD_NAME"].ToString()],
                                        dsprintdetails.Tables[1].Rows[intDetcnt]["DISPLAY_NAME"].ToString(), GetColumnWidth(Convert.ToInt32(dsprintdetails.Tables[1].Rows[intDetcnt]["FIELD_SIZE"])),
                                        "Code 128");
                                    }
                                    else
                                    {
                                        builder.AddColumn(dsprintdetails.Tables[1].Rows[intDetcnt]["FIELD_NAME"].ToString(),
                                            dsprintdetails.Tables[1].Rows[intDetcnt]["DISPLAY_NAME"].ToString(),
                                            GetColumnWidth(Convert.ToInt32(dsprintdetails.Tables[1].Rows[intDetcnt]["FIELD_SIZE"])),
                                            false, false, HorizontalAlignment.Left);
                                    }

                                    builder.CurrentColumn.HeaderTextStyle.SetFromFont(DetHeaderFont);
                                    builder.CurrentColumn.DetailRowTextStyle.SetFromFont(DetValueFont);
                                    builder.CurrentColumn.AlternatingRowTextStyle.SetFromFont(DetValueFont);
                                }

                                builder.Table.HeaderTextStyle.StringAlignment = StringAlignment.Center;

                            }

                            builder.AddHorizontalLine(new Pen(Brushes.Black, 0.01F));
                            builder.AddPageFooter("", String.Empty, "Page %p");
                            builder.AddText("End of Report ", TextStyle.PageFooter);


                            if (_log.IsDebugEnabled)
                                _log.Debug(methodBaseName + "Dynamic Report Building Completed ");

                            builder.FinishLinearLayout();
                            repo.PrinterSettings.Copies = Convert.ToInt16(noOfCopies);
                            repo.PrinterSettings.PrinterName = printerAddr;
                            repo.DefaultPageSettings.Margins.Top = 60;
                            repo.DefaultPageSettings.Margins.Bottom = 50;
                            repo.DefaultPageSettings.Margins.Left = 60;
                            repo.DefaultPageSettings.Margins.Right = 60;

                            PrintingPermission PrintPermissions = new PrintingPermission(PermissionState.Unrestricted);
                            PrintPermissions.Level = PrintingPermissionLevel.AllPrinting;

                            repo.Print();


                        }
                    }
                    else
                    {
                        if (_log.IsInfoEnabled)
                            _log.Info(methodBaseName + "Printer is not connected");
                    }
                }
                else
                {
                    if (_log.IsDebugEnabled)
                        _log.Debug(methodBaseName + ": No Records Found to Print ");
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        private string GetHeaderColumnValue(string ColumnName, string ColumnType, DataSet ds)
        {

            if (!string.IsNullOrEmpty(ColumnName))
            {
                dynamic ColumnValue = ds.Tables[0].Rows[0][ColumnName].ToString();

                if (!string.IsNullOrEmpty(ColumnValue))
                {
                    if ((ColumnType == "DATETIME"))
                    {
                        // string Val = ColumnValue.Split("T")(0);
                        return System.DateTime.Parse(DateTime.Now.ToString()).ToString("MM/dd/yyyy HH:mm:ss");
                    }
                    else
                    {
                        return ColumnValue;
                    }
                }
                else
                {
                    return string.Empty;
                }

            }
            else
            {
                return string.Empty;
            }

        }

        private Tuple<long, DataTable, DataRow> CheckColumnSpan(int IntTblsCnt, DataTable dsheaderFinal, DataRow drRow, string RowPos)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            bool ChkColumnFits = false;
            long _StatusCode = -1;
           // int PrintColumns = 0;
            Tuple<long, DataTable, DataRow> tplResult = null;

            try
            {
                int intcnt = dsheaderFinal.Rows.Count;
                DataTable dt = drRow.Table;
                ArrayList strSpnArrColumnLst = new ArrayList();


                dynamic MaxColPos = dt.Compute("max(COLUMN_POSITION)", "ROW_POSITION='" + RowPos + "'");

                if (dt.Rows.Count > 0)
                {
                    DataRow[] DRow = dt.Select("ROW_POSITION='" + RowPos + "' AND COLUMN_SPAN > 1 AND COLUMN_SPAN<=" + PrintColumns + "", "COLUMN_POSITION ASC");

                    if (DRow.Length > 0)
                    {
                        for (int Introws = 0; Introws <= DRow.Length - 1; Introws++)
                        {
                            int ColumnSpn = Convert.ToInt32(DRow[Introws]["COLUMN_SPAN"]);
                            int ColumnPos = Convert.ToInt32(DRow[Introws]["COLUMN_POSITION"]);

                            Tuple<long, bool, ArrayList> tpl = CheckColumnSpanFits(dsheaderFinal, Convert.ToInt32(DRow[Introws]["ROW_POSITION"]),
                                Convert.ToInt32(DRow[Introws]["COLUMN_POSITION"]), Convert.ToInt32(DRow[Introws]["COLUMN_SPAN"]),
                                 strSpnArrColumnLst, ChkColumnFits);


                            _StatusCode = tpl.Item1;
                            ChkColumnFits = tpl.Item2;
                            strSpnArrColumnLst = tpl.Item3;

                            if (_StatusCode != AtparStatusCodes.ATPAR_OK)
                            {
                                tplResult = new Tuple<long, DataTable, DataRow>(_StatusCode, dsheaderFinal, drRow);
                                return tplResult;
                            }
                            if (ChkColumnFits == true)
                            {
                                strAllowedSpnColmnsLst.Add(DRow[Introws]["FIELD_NAME"] + "$" + DRow[Introws]["TEXT_VALUE"] + "$" + DRow[Introws]["LINE_NO"]);
                            }
                        }

                        int RowsAdded = 0;

                        RowsAdded = 0;

                        for (int IntColumn = 0; IntColumn <= dsheaderFinal.Columns.Count - 1; IntColumn++)
                        {
                            if (RowsAdded == dsheaderFinal.Columns.Count)
                            {
                                break;
                            }
                            if (strSpnArrColumnLst.Contains(dsheaderFinal.Columns[IntColumn].ColumnName))
                            {
                                dsheaderFinal.Columns.RemoveAt(IntColumn);
                                IntColumn = IntColumn - 1;
                            }
                            else
                            {
                                RowsAdded = RowsAdded + 1;
                            }
                        }

                        dsheaderFinal.AcceptChanges();
                    }

                }
                tplResult = new Tuple<long, DataTable, DataRow>(AtparStatusCodes.ATPAR_OK, dsheaderFinal, drRow);
                return tplResult;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to Check Header ColumnSpan : " + ex.ToString());
                tplResult = new Tuple<long, DataTable, DataRow>(AtparStatusCodes.E_SERVERERROR, dsheaderFinal, drRow);
                return tplResult;
            }


        }

        private Tuple<long, bool, ArrayList> CheckColumnSpanFits(DataTable dtHedDetails, int RowPos, int ColumnPos, int ColSpan,
             ArrayList strSpnArrColumnLst, bool ChkColumnFits)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<long, bool, ArrayList> tpl = null;
            ArrayList lstArray = new ArrayList();

            try
            {
                for (int i = 0; i <= ColSpan - 2; i++)
                {
                    if (dtHedDetails.Columns.Count > (ColumnPos + i))
                    {
                        if (dtHedDetails.Columns[ColumnPos + i] != null)
                        {
                            if (dtHedDetails.Rows[0][ColumnPos + i].ToString() == "EMPTYCOLUMN")
                            {
                                lstArray.Add(dtHedDetails.Columns[ColumnPos + i].ColumnName);
                                ChkColumnFits = true;
                            }
                            else
                            {
                                lstArray.Clear();
                                ChkColumnFits = false;
                                tpl = new Tuple<long, bool, ArrayList>(AtparStatusCodes.ATPAR_OK, ChkColumnFits, strSpnArrColumnLst);
                                return tpl;
                            }
                        }
                        else
                        {
                            lstArray.Clear();
                            ChkColumnFits = false;
                            tpl = new Tuple<long, bool, ArrayList>(AtparStatusCodes.ATPAR_OK, ChkColumnFits, strSpnArrColumnLst);
                            return tpl;
                        }
                    }
                    else
                    {
                        lstArray.Clear();
                        ChkColumnFits = false;
                        tpl = new Tuple<long, bool, ArrayList>(AtparStatusCodes.ATPAR_OK, ChkColumnFits, strSpnArrColumnLst);
                        return tpl;
                    }
                }

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to Check Header ColumnSpan : " + ex.ToString());
                ChkColumnFits = false;

                tpl = new Tuple<long, bool, ArrayList>(AtparStatusCodes.E_SERVERERROR, ChkColumnFits, strSpnArrColumnLst);
                return tpl;
            }
            if (lstArray.Count > 0)
            {
                strSpnArrColumnLst.AddRange(lstArray);
            }

            tpl = new Tuple<long, bool, ArrayList>(AtparStatusCodes.ATPAR_OK, ChkColumnFits, strSpnArrColumnLst);
            return tpl;
        }
        private Tuple<ReportBuilder, DataSet, DataRow[], Font, Font, Font, DataSet> BuildHeader(ReportBuilder builder, DataSet dsheaderFinal,
            DataRow[] drRow, int IntTblsCnt, Font HeaderFont, Font ValueFont, Font BarcodeFont, DataSet RepDs)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            Tuple<ReportBuilder, DataSet, DataRow[], Font, Font, Font, DataSet> tpl = null;
            // Tuple<DataSet> tsrepds = new Tuple<DataSet>(RepDs);
            try
            {
                dynamic _dvHeader = new DataView();
                _dvHeader = dsheaderFinal.Tables[IntTblsCnt].DefaultView;

                Pen Bpen = new Pen(Color.Black, 0.01f * (float)1.0);
                TextStyle.TableRow.MarginTop = 0.01f;
                TextStyle.TableRow.MarginBottom = 0.01f;
                TextStyle.TableHeader.MarginBottom = 0.01f;
                builder.AddTable(_dvHeader, true, 100);

                if (IntTblsCnt == 0)
                {
                    builder.Table.OuterPenTop = Bpen;
                }


                builder.Table.HorizontalAlignment = ReportPrinting.HorizontalAlignment.Left;
                int IntColumnsCount = dsheaderFinal.Tables[IntTblsCnt].Columns.Count;
                int ERowsCount = 0;
               // PrintColumns = 0;
                for (int intcnt = 0; intcnt <= dsheaderFinal.Tables[IntTblsCnt].Columns.Count - 1; intcnt++)
                {
                    if (dsheaderFinal.Tables[IntTblsCnt].Rows[0][intcnt].ToString() == "EMPTYCOLUMN")
                    {
                        dsheaderFinal.Tables[IntTblsCnt].Rows[0][intcnt] = "";

                        if (Check_BarcodeColumnExsists(intcnt + 1, RepDs) == true)
                        {
                            builder.AddColumn(dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName,
                                dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName, 3.6f, false, false,
                                HorizontalAlignment.Left);
                        }
                        else
                        {
                            builder.AddColumn(dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName,
                            dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName,
                            GetHeaderColumnWidth(IntColumnsCount, intcnt + 1, "HEADER", 1, "", RepDs), false, false, HorizontalAlignment.Left);
                        }

                        builder.CurrentColumn.DetailRowTextStyle.SetFromFont(HeaderFont);
                        builder.CurrentColumn.AlternatingRowTextStyle.SetFromFont(HeaderFont);
                        ERowsCount = ERowsCount + 1;

                    }
                    else
                    {

                        if (drRow[intcnt - ERowsCount]["TEXT_VALUE"].ToString() == "TEXT")
                        {

                            if (Check_BarcodeColumnExsists(intcnt + 1, RepDs) == true)
                            {
                                builder.AddColumn(dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName,
                                    dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName, 3.6f, false, false,
                                    HorizontalAlignment.Left);
                            }
                            else
                            {
                                builder.AddColumn(dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName,
                                    dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName,
                                    GetHeaderColumnWidth(IntColumnsCount, intcnt + 1, "HEADER",
                                   Convert.ToInt32(drRow[intcnt - ERowsCount]["COLUMN_SPAN"]), drRow[intcnt - ERowsCount]["FIELD_NAME"] + "$" +
                                    drRow[intcnt - ERowsCount]["TEXT_VALUE"] + "$" + drRow[intcnt - ERowsCount]["LINE_NO"],
                                     RepDs), false, false, HorizontalAlignment.Left);
                            }

                            builder.CurrentColumn.DetailRowTextStyle.SetFromFont(HeaderFont);
                            builder.CurrentColumn.AlternatingRowTextStyle.SetFromFont(HeaderFont);
                        }
                        else
                        {

                            if (drRow[intcnt - ERowsCount]["FIELD_TYPE"].ToString() == "BARCODE")
                            {
                                builder.AddBarcodeColumn(dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt],
                                    dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName, 3.6f, "Code 128");

                            }
                            else
                            {

                                if (Check_BarcodeColumnExsists(intcnt + 1, RepDs) == true)
                                {
                                    builder.AddColumn(dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName,
                                        dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName, 3.6f, false, false,
                                        HorizontalAlignment.Left);
                                }
                                else
                                {
                                    builder.AddColumn(dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName,
                                        dsheaderFinal.Tables[IntTblsCnt].Columns[intcnt].ColumnName,
                                        GetHeaderColumnWidth(IntColumnsCount, intcnt + 1, "DETAILS",
                                        Convert.ToInt32(drRow[intcnt - ERowsCount]["COLUMN_SPAN"]),
                                        drRow[intcnt - ERowsCount]["FIELD_NAME"] + "$" + drRow[intcnt - ERowsCount]["TEXT_VALUE"] + "$" + drRow[intcnt - ERowsCount]["LINE_NO"], RepDs),
                                        false, false, HorizontalAlignment.Left);
                                }

                                builder.CurrentColumn.AlternatingRowTextStyle.SetFromFont(ValueFont);
                                builder.CurrentColumn.DetailRowTextStyle.SetFromFont(ValueFont);


                            }

                        }
                    }

                }


                if (RepDs.Tables[0].Select("COLUMN_SPAN > 1").Length > 0)
                {
                }
                else
                {
                    if (builder.Table.ColumnCount >= 3)
                    {
                        builder.Table.GetColumn(1).RightPen = Bpen;
                    }
                }

                builder.Table.RepeatHeaderRow = false;
                builder.Table.SuppressHeaderRow = true;
                builder.Table.PercentWidth = 100;
                builder.Table.OuterPenRight = Bpen;
                builder.Table.OuterPenLeft = Bpen;
                builder.FinishLinearLayout();

                tpl = new Tuple<ReportBuilder, DataSet, DataRow[], Font, Font, Font, DataSet>(builder,
                    dsheaderFinal, drRow, HeaderFont, ValueFont, BarcodeFont, RepDs);
                return tpl;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to Build Report Document Header : " + ex.ToString());
                tpl = new Tuple<ReportBuilder, DataSet, DataRow[], Font, Font, Font, DataSet>(builder,
                    dsheaderFinal, drRow, HeaderFont, ValueFont, BarcodeFont, RepDs);
                return tpl;

            }


        }
        private bool Check_BarcodeColumnExsists(int ColumnPosition, DataSet repDs)
        {

            bool bln = false;

            try
            {
                if (PrevColumnspan > 1)
                {
                    ColumnPosition = ColumnPosition + PrevColumnspan - 1;
                }
                else
                {
                    ColumnPosition = ColumnPosition + PrevColumnspan;
                }
                if (repDs.Tables[0].Select("COLUMN_POSITION=" + ColumnPosition + " AND FIELD_TYPE='BARCODE'").Length > 0)
                {
                    bln = true;

                    return bln;
                }
                else
                {
                    bln = false;

                    return bln;

                }

                bln = false;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private float GetHeaderColumnWidth(int CoulmnsCount, int ColumnPosition, string ColumnType, int ColumnSpan,
            string ColumnName, DataSet pDsRepColumnDetails)
        {

            float result = 0f;

            if (PrintColumns == 3)
            {
                if (strAllowedSpnColmnsLst.Contains(ColumnName))
                {
                    return result = (GetColumnSpanWidth(ColumnSpan, CoulmnsCount, PrintColumns, ColumnPosition.ToString(), pDsRepColumnDetails) * (1f));
                }
                else
                {
                    if ((PrevColumnspan > 1))
                    {
                        ColumnPosition = ColumnPosition + PrevColumnspan - 1;
                    }
                    if (ColumnPosition == 2)
                    {
                        return result = 3.5f;
                    }
                    else if (ColumnPosition == 3)
                    {
                        return result = 5f;
                    }
                    else
                    {
                        return result = 1.5f;
                    }
                }
            }
            else if (PrintColumns == 4)
            {
                if (strAllowedSpnColmnsLst.Contains(ColumnName))
                {
                    return result = (GetColumnSpanWidth(ColumnSpan, CoulmnsCount, PrintColumns, ColumnPosition.ToString(), pDsRepColumnDetails) * (1f));
                }
                else
                {
                    if ((PrevColumnspan > 1))
                    {
                        ColumnPosition = ColumnPosition + PrevColumnspan - 1;
                    }
                    if (ColumnPosition % 2 == 0)
                    {
                        return result = 3.5f;
                    }
                    else
                    {
                        return result = 1.5f;
                    }
                }
            }
            else if (PrintColumns == 2)
            {
                if (strAllowedSpnColmnsLst.Contains(ColumnName))
                {
                    return result = (GetColumnSpanWidth(ColumnSpan, CoulmnsCount, PrintColumns, ColumnPosition.ToString(), pDsRepColumnDetails) * (1f));
                }
                else
                {
                    if ((PrevColumnspan > 1))
                    {
                        ColumnPosition = ColumnPosition + PrevColumnspan - 1;
                    }
                    if (ColumnPosition % 2 == 0)
                    {
                        return result = 8.5f;
                    }
                    else
                    {
                        return result = 1.5f;
                    }
                }
            }
            else if (PrintColumns == 5)
            {
                if (strAllowedSpnColmnsLst.Contains(ColumnName))
                {
                    return result = (GetColumnSpanWidth(ColumnSpan, CoulmnsCount, PrintColumns, ColumnPosition.ToString(), pDsRepColumnDetails) * (1f));
                }
                else
                {
                    if (ColumnPosition % 2 == 0)
                    {
                        return result = 2.6f;
                    }
                    else
                    {
                        return result = 1.6f;
                    }
                }
            }
            else if (PrintColumns == 1)
            {
                return result = 6f;
            }
            else if (PrintColumns > 5)
            {
                return result = 1f;
            }
            return result;
        }
        private float GetColumnSpanWidth(int ColumnSpan, int CoulmnsCount, int MaxPrintColumns, string CoulmnPos,
             DataSet pDsRepColumnDetails)
        {
            PrevColumnspan = ColumnSpan;
            return Check_BarcodeColumnExsistsinSpan(Convert.ToInt32(CoulmnPos), ColumnSpan, pDsRepColumnDetails);

        }
        private float Check_BarcodeColumnExsistsinSpan(int ColumnPosition, int ColumnSpan, DataSet RepDs)
        {

            float Retval = 0f;
            for (int intcnt = 1; intcnt < ColumnSpan; intcnt++)
            {
                if (RepDs.Tables[0].Select("COLUMN_POSITION=" + intcnt + " AND FIELD_TYPE='BARCODE'").Length > 0)
                {
                    Retval = Retval + 3.6f;
                }
                else
                {
                    Retval = Retval + GetHeaderColumnWidth_BarcodeNotExsists(intcnt);
                }
            }
            return Retval;
        }

        private float GetHeaderColumnWidth_BarcodeNotExsists(int ColumnPosition)
        {
            float result = 0f;

            if (PrintColumns == 3)
            {
                if (ColumnPosition == 2)
                {
                    return result = 3.5f;
                }
                else if (ColumnPosition == 3)
                {
                    return result = 5f;
                }
                else
                {
                    return result = 1.5f;
                }
            }
            else if (PrintColumns == 4)
            {
                if (ColumnPosition % 2 == 0)
                {
                    return result = 3.5f;
                }
                else
                {
                    return result = 1.5f;
                }
            }
            else if (PrintColumns == 2)
            {
                if (ColumnPosition % 2 == 0)
                {
                    return result = 8.5f;
                }
                else
                {
                    return result = 1.5f;
                }
            }
            else if (PrintColumns == 5)
            {
                if (ColumnPosition % 2 == 0)
                {
                    return result = 2.6f;
                }
                else
                {
                    return result = 1.6f;
                }
            }
            else if (PrintColumns == 1)
            {
                return result = 6f;
            }
            else if (PrintColumns > 5)
            {
                return result = 1f;
            }
            return result;

        }

        private Tuple<long, DataSet, DataRow[], Font, Font, PageLinearSections> BuildRepeatableHeader(ReportBuilder builder, DataSet dsheaderFinal,
             DataRow[] drRow, int IntTblsCnt, Font HeaderFont, Font ValueFont, Font BarcodeFont, PageLinearSections lin,
             TextStyle BarcodeFontstyle)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long RepStatusCode = -1;
            bool blnEmptyColumn = false;
            Tuple<long, DataSet, DataRow[], Font, Font, PageLinearSections> tuple = null;

            try
            {
                bool blBarcodeExsists = false;
                float HedColWidth = 0f;
                LinearSections ls = new LinearSections(Direction.Horizontal);
                ls.MarginLeft = 5;
                SectionText txt = new SectionText(" ", TextStyle.Normal);
                int IntColumnsCount = dsheaderFinal.Tables[IntTblsCnt].Columns.Count;
                int ERowsCount = 0;
                ls = new LinearSections(Direction.Horizontal);

                for (int intcnt = 0; intcnt <= dsheaderFinal.Tables[IntTblsCnt].Columns.Count - 1; intcnt++)
                {
                    if (dsheaderFinal.Tables[IntTblsCnt].Rows[0][intcnt].ToString() == "EMPTYCOLUMN")
                    {
                        blnEmptyColumn = true;
                        TextStyle.Normal.SetFromFont(HeaderFont);
                        txt = new RepeatableTextSection("", TextStyle.Normal);
                        txt.HorizontalAlignment = HorizontalAlignment.Left;
                        ERowsCount = ERowsCount + 1;
                    }
                    else
                    {
                        blnEmptyColumn = false;
                        if (drRow[intcnt - ERowsCount]["TEXT_VALUE"].ToString() == "TEXT")
                        {
                            TextStyle.Normal.SetFromFont(HeaderFont);
                            txt = new RepeatableTextSection(dsheaderFinal.Tables[IntTblsCnt].Rows[0][intcnt].ToString(), TextStyle.Normal);
                            txt.HorizontalAlignment = HorizontalAlignment.Left;
                        }
                        else
                        {
                            if (drRow[intcnt - ERowsCount]["FIELD_TYPE"].ToString() == "BARCODE")
                            {
                                txt = new RepeatableTextSection(GetBarcodeConvertedValue(dsheaderFinal.Tables[IntTblsCnt].Rows[0][intcnt].ToString()),
                                    BarcodeFontstyle);
                                txt.HorizontalAlignment = HorizontalAlignment.Center;
                                TextStyle.Normal.SetFromFont(BarcodeFont);
                                blBarcodeExsists = true;
                            }
                            else
                            {
                                TextStyle.Normal.SetFromFont(ValueFont);
                                txt = new RepeatableTextSection(dsheaderFinal.Tables[IntTblsCnt].Rows[0][intcnt].ToString(), TextStyle.Normal);
                                txt.HorizontalAlignment = HorizontalAlignment.Left;
                            }

                        }
                    }


                    if (blnEmptyColumn == true)
                    {
                        HedColWidth = GetRepHeaderColumnWidth(IntColumnsCount, intcnt + 1, "HEADER", 0, "");
                    }
                    else
                    {
                        HedColWidth = GetRepHeaderColumnWidth(IntColumnsCount, (intcnt + 1), "HEADER", Convert.ToInt32(drRow[intcnt - ERowsCount]["COLUMN_SPAN"]), drRow[intcnt - ERowsCount]["FIELD_NAME"] + "$" + drRow[intcnt - ERowsCount]["TEXT_VALUE"] + "$" +
                            drRow[intcnt - ERowsCount]["LINE_NO"]);
                    }
                    txt.MaxWidth = HedColWidth;
                    txt.MinimumWidth = HedColWidth;
                    txt.UseFullWidth = true;
                    ls.AddSection(txt);

                }

                lin.AddSection(ls);

                if (blBarcodeExsists == true)
                {
                    tuple = BuildRepeatableHeaderBarcodeString(builder, dsheaderFinal, drRow, IntTblsCnt, HeaderFont,
                               ValueFont, BarcodeFont, lin, BarcodeFontstyle);
                    RepStatusCode = tuple.Item1;
                    dsheaderFinal = tuple.Item2;
                    drRow = tuple.Item3;
                    HeaderFont = tuple.Item4;
                    ValueFont = tuple.Item5;
                    lin = tuple.Item6;

                    blBarcodeExsists = false;

                    tuple = new Tuple<long, DataSet, DataRow[], Font, Font, PageLinearSections>(RepStatusCode, dsheaderFinal, drRow,
                        HeaderFont, ValueFont, lin);
                    return tuple;
                }
                tuple = new Tuple<long, DataSet, DataRow[], Font, Font, PageLinearSections>(AtparStatusCodes.ATPAR_OK, dsheaderFinal, drRow,
                       HeaderFont, ValueFont, lin);
                return tuple;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to Build Report Document Repeatable Header : " + ex.ToString());
                tuple = new Tuple<long, DataSet, DataRow[], Font, Font, PageLinearSections>(AtparStatusCodes.E_SERVERERROR, dsheaderFinal, drRow,
                      HeaderFont, ValueFont, lin);
                return tuple;
            }




        }
        private string GetBarcodeConvertedValue(string ColumnValue)
        {

            if ((!string.IsNullOrEmpty(ColumnValue) & !string.IsNullOrEmpty(ColumnValue)))
            {
                return barcodedef.Code128(ColumnValue, 0, false);
            }
            else
            {
                return ColumnValue;
            }
        }

        private float GetRepHeaderColumnWidth(int CoulmnsCount, int ColumnPosition, string ColumnType, int ColumnSpan, string ColumnName)
        {
            float result = 0f;

            if (PrintColumns == 3)
            {
                if (strAllowedSpnColmnsLst.Contains(ColumnName))
                {
                    return result = (GetRepetableColumnSpanWidth(ColumnSpan, CoulmnsCount, PrintColumns, ColumnPosition) * (1f));
                }
                else
                {
                    if ((PrevColumnspan > 1))
                    {
                        ColumnPosition = ColumnPosition + PrevColumnspan - 1;
                    }
                    if (ColumnPosition == 2)
                    {
                        return result = 3f;
                    }
                    else if (ColumnPosition == 3)
                    {
                        return result = 5.5f;
                    }
                    else
                    {
                        return result = 1.5f;
                    }
                }
            }
            else if (PrintColumns == 4)
            {
                if (strAllowedSpnColmnsLst.Contains(ColumnName))
                {
                    return (GetRepetableColumnSpanWidth(ColumnSpan, CoulmnsCount, PrintColumns, ColumnPosition) * (1f));
                }
                else
                {
                    if ((PrevColumnspan > 1))
                    {
                        ColumnPosition = ColumnPosition + PrevColumnspan - 1;
                    }
                    if (ColumnPosition % 2 == 0)
                    {
                        return result = 3f;
                    }
                    else
                    {
                        return result = 1f;
                    }
                }
            }
            else if (PrintColumns == 2)
            {
                if (strAllowedSpnColmnsLst.Contains(ColumnName))
                {
                    return (GetRepetableColumnSpanWidth(ColumnSpan, CoulmnsCount, PrintColumns, ColumnPosition) * (1f));
                }
                else
                {
                    if ((PrevColumnspan > 1))
                    {
                        ColumnPosition = ColumnPosition + PrevColumnspan - 1;
                    }
                    if (ColumnPosition % 2 == 0)
                    {
                        return result = 8.5f;
                    }
                    else
                    {
                        return result = 1.5f;
                    }
                }
            }
            else if (PrintColumns == 5)
            {
                if (strAllowedSpnColmnsLst.Contains(ColumnName))
                {
                    return (GetRepetableColumnSpanWidth(ColumnSpan, CoulmnsCount, PrintColumns, ColumnPosition) * (1f));
                }
                else
                {
                    if (ColumnPosition % 2 == 0)
                    {
                        return result = 2.2f;
                    }
                    else
                    {
                        return result = 1.2f;
                    }
                }
            }
            else if (PrintColumns == 1)
            {
                return result = 6f;
            }
            else if (PrintColumns > 5)
            {
                return result = 1f;
            }

            return result;
        }

        private float GetRepetableColumnSpanWidth(int ColumnSpan, int CoulmnsCount, int MaxPrintColumns, int ColumnPosition)
        {
            float result = 0f;

            PrevColumnspan = ColumnSpan;

            if (MaxPrintColumns == 2)
            {
                if ((ColumnSpan == 2))
                {
                    return result = 10f;
                }
            }
            else if (MaxPrintColumns == 3)
            {
                if ((ColumnSpan == 2))
                {
                    if (ColumnPosition == 2)
                    {
                        return result = 8.5f;
                    }
                    else
                    {
                        return result = 4.5f;
                    }
                }
                else if ((ColumnSpan == 3))
                {
                    return result = 10f;
                }
                else if ((ColumnSpan > 3))
                {
                    return result = 3f;
                }
            }
            else if (MaxPrintColumns == 4)
            {
                if ((ColumnSpan == 2))
                {
                    return result = 4f;
                }
                else if ((ColumnSpan == 3))
                {
                    if (ColumnPosition == 2)
                    {
                        return result = 7f;
                    }
                }
                else if ((ColumnSpan == 4))
                {
                    return result = 8f;
                }
                else
                {
                    return result = 3f;
                }
            }
            else if (MaxPrintColumns == 5)
            {
                if ((ColumnSpan == 5))
                {
                    return result = 8f;
                }
                else if ((ColumnSpan == 4))
                {
                    return result = 6.8f;
                }
                else if ((ColumnSpan == 3))
                {
                    if (ColumnPosition == 2)
                    {
                        return result = 5.6f;
                    }
                    else
                    {
                        return result = 4.6f;
                    }
                }
                else if ((ColumnSpan == 2))
                {
                    return result = 3.4f;
                }
                else
                {
                    return result = 1.6f;
                }
            }
            else if (MaxPrintColumns == 1)
            {
                return result = 5f;
            }
            return result;
        }

        private Tuple<long, DataSet, DataRow[], Font, Font, PageLinearSections> BuildRepeatableHeaderBarcodeString(ReportBuilder builder, DataSet dsheaderFinal,
             DataRow[] drRow, int IntTblsCnt, Font HeaderFont, Font ValueFont, Font BarcodeFont,
             PageLinearSections lin, TextStyle BarcodeFontstyle)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            bool blnEmptyColumn = false;
            Tuple<long, DataSet, DataRow[], Font, Font, PageLinearSections> tpl = null;

            try
            {
                dynamic BarcodeStringFont = new Font("Arial", 0.3f, FontStyle.Bold);
                float HedColWidth = 0f;
                LinearSections ls = new LinearSections(Direction.Horizontal);
                ls.MarginLeft = 5;
                SectionText txt = new SectionText(" ", TextStyle.Normal);
                int IntColumnsCount = dsheaderFinal.Tables[IntTblsCnt].Columns.Count;
                int ERowsCount = 0;
                ls = new LinearSections(Direction.Horizontal);
                PrevColumnspan = 0;
                for (int intcnt = 0; intcnt <= dsheaderFinal.Tables[IntTblsCnt].Columns.Count - 1; intcnt++)
                {
                    if (dsheaderFinal.Tables[IntTblsCnt].Rows[0][intcnt].ToString() == "EMPTYCOLUMN")
                    {
                        blnEmptyColumn = true;
                        dsheaderFinal.Tables[IntTblsCnt].Rows[0][intcnt] = "";
                        TextStyle.Normal.SetFromFont(HeaderFont);
                        txt = new RepeatableTextSection(dsheaderFinal.Tables[IntTblsCnt].Rows[0][intcnt].ToString(), TextStyle.Normal);
                        txt.HorizontalAlignment = HorizontalAlignment.Left;
                        ERowsCount = ERowsCount + 1;
                    }
                    else
                    {
                        blnEmptyColumn = false;
                        if (drRow[intcnt - ERowsCount]["TEXT_VALUE"].ToString() == "TEXT")
                        {
                            TextStyle.Normal.SetFromFont(HeaderFont);
                            txt = new RepeatableTextSection("", TextStyle.Normal);
                            txt.HorizontalAlignment = HorizontalAlignment.Left;
                        }
                        else
                        {

                            if (drRow[intcnt - ERowsCount]["FIELD_TYPE"].ToString() == "BARCODE")
                            {
                                txt = new RepeatableTextSection(dsheaderFinal.Tables[IntTblsCnt].Rows[0][intcnt].ToString(),
                                    TextStyle.BarcodTextStyle);
                                txt.HorizontalAlignment = HorizontalAlignment.Center;
                                TextStyle.Normal.SetFromFont(BarcodeStringFont);


                            }
                            else
                            {
                                TextStyle.Normal.SetFromFont(ValueFont);
                                txt = new RepeatableTextSection("", TextStyle.Normal);
                                txt.HorizontalAlignment = HorizontalAlignment.Left;
                            }

                        }
                    }


                    if (blnEmptyColumn == true)
                    {
                        HedColWidth = GetRepHeaderColumnWidth(IntColumnsCount, intcnt + 1, "HEADER", 0, "");
                    }
                    else
                    {
                        HedColWidth = GetRepHeaderColumnWidth(IntColumnsCount, (intcnt + 1), "HEADER",
                            Convert.ToInt32(drRow[intcnt - ERowsCount]["COLUMN_SPAN"]),
                            drRow[intcnt - ERowsCount]["FIELD_NAME"] + "$" + drRow[intcnt - ERowsCount]["TEXT_VALUE"] + "$" +
                            drRow[intcnt - ERowsCount]["LINE_NO"]);
                    }
                    txt.MaxWidth = HedColWidth;
                    txt.MinimumWidth = HedColWidth;
                    txt.UseFullWidth = true;
                    ls.AddSection(txt);

                }
                lin.AddSection(ls);
                tpl = new Tuple<long, DataSet, DataRow[], Font, Font, PageLinearSections>(AtparStatusCodes.ATPAR_OK, dsheaderFinal, drRow,
                    HeaderFont, ValueFont, lin);
                return tpl;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " : Failed to Build Report Document Repeatable Header Barcode String : " + ex.ToString());
                tpl = new Tuple<long, DataSet, DataRow[], Font, Font, PageLinearSections>(AtparStatusCodes.E_SERVERERROR, dsheaderFinal, drRow,
                   HeaderFont, ValueFont, lin);
                return tpl;
            }



        }

        private float GetColumnWidth(int ColumnWidth)
        {
            float result = 0f;

            if (ColumnWidth >= 150)
            {
                return result = 5f;
            }
            else if ((ColumnWidth == 50 & ColumnWidth <= 100))
            {
                return result = 2f;
            }
            else if ((ColumnWidth <= 20 & ColumnWidth < 50))
            {
                return result = 1.8f;
            }
            else if ((ColumnWidth < 10 & ColumnWidth < 20))
            {
                return result = 0.8f;
            }
            else
            {
                return result = 5f;
            }

            return result;
        }


        #endregion

        #region SearchHeader

        public AtParWebApiResponse<VM_RECV_SEARCHHEADER> SearchHeader(List<VM_RECV_SEARCHPOHEADER> lstRecvPOHeader, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_RECV_SEARCHHEADER>();


            try
            {
                string outputXML = string.Empty;
                string bUnit = string.Empty;
                foreach (var item in lstRecvPOHeader)
                {
                    bUnit = item.BUSINESS_UNIT;
                    item.VENDOR_ID = item.VENDOR_ID == null ? string.Empty : item.VENDOR_ID;
                    item.VENDOR_NAME = item.VENDOR_NAME == null ? string.Empty : item.VENDOR_NAME;
                    item.SHIP_TO_ID = item.SHIP_TO_ID == null ? string.Empty : item.SHIP_TO_ID;
                }

                Tuple<long, string> tpl = SearchHeader_Implementation(lstRecvPOHeader, outputXML, deviceTokenEntry);

                outputXML = tpl.Item2;
                IEnumerable<VM_RECV_SEARCHHEADER> parsedsearchHeaderData = null;
                if (tpl.Item1 == AtparStatusCodes.ATPAR_OK)
                {
                    //Converting String XML to List
                    parsedsearchHeaderData = ParseXmlToSearchHeaderList(outputXML.ToString(), bUnit);
                }
                List<VM_RECV_SEARCHHEADER> lstSearchHeader = null;

                if (parsedsearchHeaderData != null)
                {
                    //Converting Ienumerable to List
                    lstSearchHeader = parsedsearchHeaderData.ToList();
                }

                response.DataList = lstSearchHeader;
                response.StatusCode = tpl.Item1;

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }

                response.DataList = lstSearchHeader;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }

        }
        //Converting string to List
        public IEnumerable<VM_RECV_SEARCHHEADER> ParseXmlToSearchHeaderList(string outputXMl, string bunit)
        {
            IEnumerable<VM_RECV_SEARCHHEADER> result = null;

            try
            {

                XElement inputXmlData = XElement.Parse(outputXMl);
                result = from x in inputXmlData.Descendants("PO")
                         select new VM_RECV_SEARCHHEADER()
                         {
                             BUSINESS_UNIT = bunit,
                             POID = string.IsNullOrEmpty(GetValueFromXElement(x, "POID")) ? string.Empty : GetValueFromXElement(x, "POID"),
                             PODT = string.IsNullOrEmpty(GetValueFromXElement(x, "PODT")) ? string.Empty : GetValueFromXElement(x, "PODT"),
                             VNDRID = string.IsNullOrEmpty(GetValueFromXElement(x, "VNDRID")) ? string.Empty : GetValueFromXElement(x, "VNDRID"),
                             SHPTID = string.IsNullOrEmpty(GetValueFromXElement(x, "SHPTID")) ? string.Empty : GetValueFromXElement(x, "SHPTID"),
                             RECVID = string.IsNullOrEmpty(GetValueFromXElement(x, "RECVID")) ? string.Empty : GetValueFromXElement(x, "RECVID").ToString() == "X" ? string.Empty : GetValueFromXElement(x, "RECVID")

                         };
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public Tuple<long, string> SearchHeader_Implementation(List<VM_RECV_SEARCHPOHEADER> lstPoHeader, string OutputXML, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<long, string> tple = null;

            try
            {
                //Converting list to DataSet

                DataSet inputParameters = new DataSet();
                DataTable dtinputParameters = new DataTable();
                dtinputParameters = lstPoHeader.ToDataTable();
                inputParameters.Tables.Add(dtinputParameters);

                ////Setting HeaderName Table1 to HEADERS

                inputParameters.Tables[0].TableName = AtParWebEnums.DataSet_Type.HEADERS.ToString();


                //Checking input Parameters

                StatusCode = Check_SearchHeader_InputParameters(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tple = new Tuple<long, string>(StatusCode, string.Empty);

                    return tple;
                }


                //Preprocess Tasks
                DataSet outputParameter = new DataSet();

                Tuple<long, DataSet> tpl = Execute_SearchHeader_PreProcessTasks(inputParameters, outputParameter, deviceTokenEntry);
                inputParameters = tpl.Item2;
                StatusCode = tpl.Item1;

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tple = new Tuple<long, string>(StatusCode, string.Empty);

                    return tple;
                }


                //Process Tasks
                tpl = Execute_SearchHeader_ProcessTasks(inputParameters, outputParameter, deviceTokenEntry);
                outputParameter = tpl.Item2;
                StatusCode = tpl.Item1;

                if (StatusCode == AtparStatusCodes.E_NORECORDFOUND)
                {
                    tple = new Tuple<long, string>(StatusCode, string.Empty);

                    return tple;
                }
                else if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tple = new Tuple<long, string>(StatusCode, string.Empty);

                    return tple;
                }


                //PostProcess Tasks

                StatusCode = Execute_SearchHeader_PostProcessTasks(inputParameters, outputParameter, deviceTokenEntry);

                if (StatusCode == AtparStatusCodes.E_NORECORDFOUND)
                {
                    tple = new Tuple<long, string>(StatusCode, string.Empty);

                    return tple;
                }
                else if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tple = new Tuple<long, string>(StatusCode, string.Empty);
                    return tple;
                }



                // Building Output XML

                tple = Build_SearchPOs_OutputXML(inputParameters, outputParameter, OutputXML, deviceTokenEntry, StatusCode);

                StatusCode = tple.Item1;
                OutputXML = tple.Item2;


                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tple = new Tuple<long, string>(StatusCode, string.Empty);
                    return tple;
                }
                tple = new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, OutputXML);

                return tple;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ":E_SERVERERROR: " + ex.ToString());

                tple = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, OutputXML);

                return tple;

            }
        }

        private long Check_SearchHeader_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long _statusCode = -1;

            try
            {
                ///// Printing InPut DataSet ///'
                if (_log.IsDebugEnabled)
                {
                    //DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                    inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);

                    //StatusCode = PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);

                    //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //        _log.Fatal(methodBaseName + " Error occured in PrintDatasetStatistics. Status Code Returned is : " + StatusCode);
                    //    return StatusCode;
                    //}

                }
                ///// End of Printing InPut DataSet ///'

                if (inputParameters.Tables.Count != 1)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Incorrect DataTable Count " + inputParameters.Tables.Count);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Headers Rows count: " + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count.ToString());

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString());
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }
        }

        private Tuple<long, DataSet> Execute_SearchHeader_PreProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            long StatusCode = 0;
            Tuple<long, DataSet> tpl = null;

            try
            {
                tpl = Populate_SearchPO_InputParameters(inputParameters);
                inputParameters = tpl.Item2;
                StatusCode = tpl.Item1;

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tpl = new Tuple<long, DataSet>(StatusCode, inputParameters);

                    return tpl;
                }

                tpl = Populate_SearchPO_Prerequisites(inputParameters, deviceTokenEntry);
                StatusCode = tpl.Item1;
                inputParameters = tpl.Item2;

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tpl = new Tuple<long, DataSet>(StatusCode, inputParameters);
                    return tpl;
                }

                tpl = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, inputParameters);
                return tpl;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Populate_GetHeader_ListViewData failed " + System.Environment.NewLine + ex.ToString());
                tpl = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, inputParameters);
                return tpl;
            }
        }

        private Tuple<long, DataSet> Populate_SearchPO_InputParameters(DataSet inputParameters)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<long, DataSet> tpl = null;

            try
            {
                DataTable recv_br_dt = new DataTable();

                // Table to add Preq Req Parameters

                recv_br_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SearchPO_Params_Defns, AtParWebEnums.DataSet_Type.PREREQDATA.ToString());


                // Add these tables to actual input parameters
                inputParameters.Tables.Add(recv_br_dt);

                tpl = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, inputParameters);
                return tpl;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());
                tpl = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, inputParameters);
                return tpl;

            }

        }

        private Tuple<long, DataSet> Populate_SearchPO_Prerequisites(DataSet inputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            SortedList<string, string> orgParams;
            SortedList<string, string> profParams;
            string remoteDBType = "";
            string remoteSchema = "";

            string orgGroupId = string.Empty;
            string profileId = string.Empty;
            int appID = 0;

            Tuple<long, DataSet> tpl = null;

            try
            {

                orgParams = new SortedList<string, string>();
                orgParams[AtParWebEnums.AppParameters_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.RECV_EXCLUDE_CAPITAL_POS.ToString()] = string.Empty;
                orgParams[AtParWebEnums.AppParameters_Enum.ASN_RECEIPT_STATUS.ToString()] = string.Empty;

                orgGroupId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID].ToString();
                appID = (int)AtParWebEnums.EnumApps.Receiving;


                //Getting OrgParam Values
                _commonRepo.GetOrgGroupParamValues(orgParams, appID, orgGroupId);


                //Getting Profile Params
                profParams = new SortedList<string, string>();
                profParams[AtParWebEnums.AppParameters_Enum.SEARCH_PO_WITHOUT_BU.ToString()] = string.Empty;

                appID = (int)AtParWebEnums.EnumApps.Receiving;
                profileId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString();

                _commonRepo.GetProfileParamValues(profParams, appID, profileId);


                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());
                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString());
                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                remoteDBType = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                   x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.DATABASE.ToString())
                                                .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
              x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
              .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                DataRow dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();

                dr[(int)AtParWebEnums.SearchPO_PreReqData_Enum.MAX_NO_OF_REC_DOWNLOAD] = orgParams[AtParWebEnums.AppParameters_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString()];
                dr[(int)AtParWebEnums.SearchPO_PreReqData_Enum.DEFAULT_MFG_ITEM_ID] = orgParams[AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()];
                dr[(int)AtParWebEnums.SearchPO_PreReqData_Enum.SCHEMA_NAME] = remoteSchema;
                dr[(int)AtParWebEnums.SearchPO_PreReqData_Enum.REMOTE_DB_TYPE] = remoteDBType;
                dr[(int)AtParWebEnums.SearchPO_PreReqData_Enum.RECV_EXCLUDE_CAPITAL_POS] = orgParams[AtParWebEnums.AppParameters_Enum.RECV_EXCLUDE_CAPITAL_POS.ToString()];
                dr[(int)AtParWebEnums.SearchPO_PreReqData_Enum.ASN_RECEIPT_STATUS] = orgParams[AtParWebEnums.AppParameters_Enum.ASN_RECEIPT_STATUS.ToString()];
                dr[(int)AtParWebEnums.SearchPO_PreReqData_Enum.SEARCH_PO_WITHOUT_BU] = profParams[AtParWebEnums.AppParameters_Enum.SEARCH_PO_WITHOUT_BU.ToString()];


                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(dr);


                tpl = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, inputParameters);
                return tpl;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ex.ToString());
                tpl = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, inputParameters);
                return tpl;


            }
        }

        private Tuple<long, DataSet> Execute_SearchHeader_ProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            string bUnit = string.Empty;
            string strPOWithOutBU = string.Empty;
            Tuple<long, DataSet> tpl = null;

            try
            {

                if (inputParameters.Tables.Count > 0)
                {
                    if (inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.HEADERS.ToString()))
                    {
                        if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                        {

                            if (inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SearchPO_PreReqData_Enum.SEARCH_PO_WITHOUT_BU.ToString()] != null)
                            {
                                strPOWithOutBU = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.GetPO_PreReqData_Enum.SEARCH_PO_WITHOUT_BU.ToString()].ToString();

                            }
                        }
                        else
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + " No Rows in Headers Table :E_INVALIDPARAMETER: " + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count + ":");

                            tpl = new Tuple<long, DataSet>(AtparStatusCodes.E_INVALIDPARAMETER, outputParameters);
                            return tpl;
                        }
                    }

                }


                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Search PO without BU profile parameter value: " + strPOWithOutBU);

                if (strPOWithOutBU == null)
                {
                    strPOWithOutBU = string.Empty;
                }

                if (strPOWithOutBU != AtParWebEnums.YesNo_Enum.Y.ToString())
                {
                    bUnit = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SearchPO_Receive_Header.BUSINESS_UNIT.ToString()].ToString();
                    bUnit = bUnit.ReplaceString();
                    string Bunits = _poNonPoRepo.GetBusinessUnit(bUnit, deviceTokenEntry);
                    if (string.IsNullOrEmpty(Bunits))
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + "E_NORECORDFOUND ");

                        tpl = new Tuple<long, DataSet>(AtparStatusCodes.E_NORECORDFOUND, outputParameters);
                        return tpl;
                    }

                }


                Tuple<long, DataSet> tupleResult = SearchHeader(inputParameters, outputParameters, deviceTokenEntry);

                outputParameters = tupleResult.Item2;

                if (tupleResult.Item1 == AtparStatusCodes.E_NORECORDFOUND)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + ":" + tupleResult.Item1);

                    tpl = new Tuple<long, DataSet>(tupleResult.Item1, outputParameters);
                    return tpl;
                }
                else if (tupleResult.Item1 == AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + ":" + tupleResult.Item1);
                    tpl = new Tuple<long, DataSet>(tupleResult.Item1, outputParameters);
                    return tpl;
                }
                tpl = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, outputParameters);
                return tpl;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetPO_ProcessTasks failed " + System.Environment.NewLine + ex.ToString());
                tpl = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, outputParameters);
                return tpl;
            }


        }

        private Tuple<long, DataSet> SearchHeader(DataSet inputParameters, DataSet outputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<long, DataSet> tupleOutput = null;

            try
            {


                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                //GetConfigData();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Remote Object Failed")); }

                    tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                    return tupleOutput;

                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;
                }

                className = "SearchHeader";
                methodName = "SearchHeader";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, outputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<long, DataSet>(StatusCode, null);
                    return tupleOutput;
                }

                outputParameters = (DataSet)args[1];


                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.ATPAR_OK, outputParameters);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<long, DataSet>(AtparStatusCodes.E_SERVERERROR, null);
                return tupleOutput;
            }
        }

        private long Execute_SearchHeader_PostProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {


            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                // _trans.Rollback();
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetHeader_PostProcessTasks failed " + System.Environment.NewLine + ex.ToString());
                return AtparStatusCodes.E_SERVERERROR;
            }

        }
        private Tuple<long, string> Build_SearchPOs_OutputXML(DataSet inputParameter, DataSet outputParameter, string strXML, string[] deviceTokenEntry, long statusCode = 0)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            int i = 0;
            XmlProcessingInstruction xmlPi;

            int maxNoOfRecDownload = 0;
            XmlNode xmlChildNode;
            XmlNode xmlNode;
            XmlNode xmlRoot;
            XmlNodeList xmlNodeList;
            XmlDocument xmlDoc;
            Tuple<long, string> tpl = null;

            try
            {


                xmlDoc = new XmlDocument();
                xmlDoc.PreserveWhitespace = true;

                xmlRoot = xmlDoc.CreateElement("ROOT");
                xmlDoc.AppendChild(xmlRoot);

                if (inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Count > 0)
                {
                    maxNoOfRecDownload = Convert.ToInt32(inputParameter.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows[0][AtParWebEnums.SearchPO_PreReqData_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString()]);

                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + "E_INVALIDPARAMETER:No Value for MaxNoOfRecordDownload Parameter. ");

                    tpl = new Tuple<long, string>(AtparStatusCodes.E_INVALIDPARAMETER, strXML);
                    return tpl;
                }
                if (outputParameter != null)
                {


                    if (outputParameter.Tables.Count > 0)
                    {
                        for (i = 0; i <= outputParameter.Tables[0].Rows.Count - 1; i++)
                        {
                            if (i < maxNoOfRecDownload)
                            {
                                xmlChildNode = xmlDoc.CreateElement("PO");
                                xmlRoot.AppendChild(xmlChildNode);
                                if (outputParameter.Tables[0].Columns.Contains("BUSINESS_UNIT"))
                                //if (outputParameter.Tables[0].Columns.Contains(AtParWebEnums.DataSet_Type.BUSINESSUNITS.ToString()))
                                {
                                    if (!string.IsNullOrEmpty(outputParameter.Tables[0].Rows[i]["BUSINESS_UNIT"].ToString()))
                                    {
                                        xmlNode = xmlDoc.CreateElement("BUSINESS_UNIT");
                                        xmlNode.InnerText = outputParameter.Tables[0].Rows[i]["BUSINESS_UNIT"].ToString();
                                        xmlChildNode.AppendChild(xmlNode);

                                    }
                                }

                                if (!string.IsNullOrEmpty(outputParameter.Tables[0].Rows[i]["PO_ID"].ToString()))
                                {
                                    xmlNode = xmlDoc.CreateElement("POID");
                                    xmlNode.InnerText = outputParameter.Tables[0].Rows[i]["PO_ID"].ToString();
                                    xmlChildNode.AppendChild(xmlNode);

                                }
                                if (!string.IsNullOrEmpty(outputParameter.Tables[0].Rows[i]["PO_DT"].ToString()))
                                {
                                    xmlNode = xmlDoc.CreateElement("PODT");
                                    xmlNode.InnerText = outputParameter.Tables[0].Rows[i]["PO_DT"].ToString();
                                    xmlChildNode.AppendChild(xmlNode);

                                }
                                if (!string.IsNullOrEmpty(outputParameter.Tables[0].Rows[i]["VENDOR_ID"].ToString()))
                                {
                                    xmlNode = xmlDoc.CreateElement("VNDRID");
                                    xmlNode.InnerText = outputParameter.Tables[0].Rows[i]["VENDOR_ID"].ToString();
                                    xmlChildNode.AppendChild(xmlNode);

                                }
                                if (!string.IsNullOrEmpty(outputParameter.Tables[0].Rows[i]["SHIPTO_ID"].ToString()))
                                {
                                    xmlNode = xmlDoc.CreateElement("SHPTID");
                                    xmlNode.InnerText = outputParameter.Tables[0].Rows[i]["SHIPTO_ID"].ToString();
                                    xmlChildNode.AppendChild(xmlNode);

                                }
                                if (outputParameter.Tables[0].Columns.Contains("RECEIVER_ID"))
                                // if (outputParameter.Tables[0].Columns.Contains(AtParWebEnums.DataSet_Type.RECEIVERIDS.ToString()))
                                {
                                    if (!string.IsNullOrEmpty(outputParameter.Tables[0].Rows[i]["RECEIVER_ID"].ToString()))
                                    {
                                        xmlNode = xmlDoc.CreateElement("RECVID");
                                        xmlNode.InnerText = outputParameter.Tables[0].Rows[i]["RECEIVER_ID"].ToString();
                                        xmlChildNode.AppendChild(xmlNode);

                                    }
                                }


                            }
                        }
                    }
                }

                if (i > 0)
                {
                    xmlPi = xmlDoc.CreateProcessingInstruction("xml", "version='1.0'");
                    xmlDoc.InsertBefore(xmlPi, xmlDoc.ChildNodes[0]);
                    xmlRoot = xmlDoc.DocumentElement;
                    xmlNodeList = xmlRoot.ChildNodes;

                    foreach (XmlNode xmlItem in xmlNodeList)
                    {
                        strXML = strXML + xmlItem.OuterXml;
                    }

                    strXML = "<ROOT>" + strXML + "</ROOT>";
                }

                if (_log.IsDebugEnabled)
                    _log.Debug("Output XML:" + strXML);

                tpl = new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, strXML);
                return tpl;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal("E_SERVERERROR :" + ex.ToString());

                tpl = new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, strXML);
                return tpl;

            }


        }

        #endregion

        #region SearchIUTHeader
        public AtParWebApiResponse<VM_IUT_SEARCHHEADER> SearchIUTHeader(List<VM_IUT_SENDHEADER> lstIUTHeader, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<VM_IUT_SEARCHHEADER>();
            List<VM_IUT_SEARCHHEADER> lstHeader = new List<VM_IUT_SEARCHHEADER>();

            try
            {
                DataSet outputParameter = new DataSet();

                Tuple<DataSet, long> tple = SearchIUTHeader_Implementation(lstIUTHeader, outputParameter, deviceTokenEntry);
                outputParameter = tple.Item1;
                if (outputParameter != null)
                {
                    // DataSet to List Conversion
                    lstHeader = (from rw in outputParameter.Tables[0].AsEnumerable()
                                 select new VM_IUT_SEARCHHEADER()
                                 {
                                     DESTIN_BU = rw["DESTIN_BU"] == null ? string.Empty : rw["DESTIN_BU"].ToString(),
                                     ORIG_BU = rw["ORIG_BU"] == null ? string.Empty : rw["ORIG_BU"].ToString(),
                                     INTERUNIT_ID = rw["INTERUNIT_ID"] == null ? string.Empty : rw["INTERUNIT_ID"].ToString(),
                                     SHIP_DTTM = rw["SHIP_DTTM"] == null ? string.Empty : rw["SHIP_DTTM"].ToString(),

                                 }).ToList();


                }
                response.DataList = lstHeader;
                response.StatusCode = tple.Item2;

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }

        }

        public Tuple<DataSet, long> SearchIUTHeader_Implementation(List<VM_IUT_SENDHEADER> lstIUTHeader, DataSet outputParameter, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            Tuple<DataSet, long> tple = null;

            try
            {
                //Converting list to DataSet

                DataSet inputParameters = new DataSet();
                DataTable dtinputParameters = new DataTable();
                dtinputParameters = lstIUTHeader.ToDataTable();
                inputParameters.Tables.Add(dtinputParameters);

                ////Setting HeaderName Table1 to HEADERS

                inputParameters.Tables[0].TableName = AtParWebEnums.DataSet_Type.HEADERS.ToString();



                //Checking input Parameters

                StatusCode = Check_SearchIUTHeader_InputParameters(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    tple = new Tuple<DataSet, long>(outputParameter, StatusCode);
                    return tple;
                }


                //Preprocess Tasks  

                tple = Execute_SearchIUTHeader_PreProcessTasks(inputParameters, outputParameter, deviceTokenEntry);
                inputParameters = tple.Item1;

                if (tple.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tple = new Tuple<DataSet, long>(outputParameter, tple.Item2);
                    return tple;
                }


                //Process Tasks

                tple = Execute_SearchIUTHeader_ProcessTasks(inputParameters, outputParameter, deviceTokenEntry);
                outputParameter = tple.Item1;

                if (tple.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    tple = new Tuple<DataSet, long>(outputParameter, tple.Item2);
                    return tple;
                }

                tple = new Tuple<DataSet, long>(outputParameter, AtparStatusCodes.ATPAR_OK);
                return tple;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + ":E_SERVERERROR: " + ex.ToString());
                tple = new Tuple<DataSet, long>(outputParameter, AtparStatusCodes.E_SERVERERROR);
                return tple;

            }
        }

        private long Check_SearchIUTHeader_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long _statusCode = -1;

            try
            {
                ///// Printing InPut DataSet ///'
                if (_log.IsDebugEnabled)
                {
                    inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);

                    //StatusCode = PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);

                    //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //        _log.Fatal(methodBaseName + " Error occured in PrintDatasetStatistics. Status Code Returned is : " + StatusCode);
                    //    return StatusCode;
                    //}

                }
                ///// End of Printing InPut DataSet ///'

                if (inputParameters.Tables.Count != 1)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Incorrect DataTable Count " + inputParameters.Tables.Count);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Headers Rows count: " + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count.ToString());

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString());
                return AtparStatusCodes.E_INVALIDPARAMETER;
            }
        }

        private Tuple<DataSet, long> Execute_SearchIUTHeader_PreProcessTasks(DataSet inputParameters, DataSet outputParameters,
            string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            long StatusCode = 0;
            string remoteSchema = "";

            Tuple<DataSet, long> tupleResult = null;


            try
            {
                DataTable dtPrereq = new DataTable();

                dtPrereq = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SearchIUT_Recv_PreReq_Defns,
                    AtParWebEnums.DataSet_Type.PREREQDATA.ToString());

                inputParameters.Tables.Add(dtPrereq);

                //GetConfigData();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();
                List<string> lstParameters = new List<string>();

                lstParameters.Add(AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                remoteSchema = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.REMOTEDBCONNECTION.ToString() &&
                                                         x.PARAMETER_ID == AtParWebEnums.REMOTEDBCONNECTION.SCHEMA.ToString())
                                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                if (string.IsNullOrEmpty(remoteSchema))
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + ": Not a valid Remote Schema ");

                    tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleResult;
                }

                DataRow drPreReq = inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].NewRow();
                drPreReq[(int)AtParWebEnums.SearchIUT_PreReqData_Enum.SCHEMA_NAME] = remoteSchema;
                inputParameters.Tables[AtParWebEnums.DataSet_Type.PREREQDATA.ToString()].Rows.Add(drPreReq);

                tupleResult = new Tuple<DataSet, long>(inputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleResult;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Populate_GetHeader_ListViewData failed " + System.Environment.NewLine + ex.ToString());

                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;

            }
        }

        private Tuple<DataSet, long> Execute_SearchIUTHeader_ProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            int cnt = 0;

            Tuple<DataSet, long> tupleResult = null;


            try
            {
                if (!(inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0))
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + " No Rows in Headers Table ");
                    tupleResult = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.E_INVALIDPARAMETER);
                    return tupleResult;

                }

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][(int)AtParWebEnums.SearchIUT_Header_Enum.PRODUCT].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                {
                    cnt = _poNonPoRepo.GetInitBusinessUnitCount(inputParameters);

                }
                else
                {
                    cnt = _poNonPoRepo.GetPtwyBusinessUnitCount(inputParameters);
                }

                if (cnt == 0)
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + ": No Business Units allocated");
                    tupleResult = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.ATPAR_S_IUT_BUNIT_NOTALLOC);
                    return tupleResult;
                }



                tupleResult = SearchIUTHeader(inputParameters, outputParameters, deviceTokenEntry);

                outputParameters = tupleResult.Item1;

                tupleResult = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleResult;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetPO_ProcessTasks failed " + System.Environment.NewLine + ex.ToString());
                tupleResult = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.E_SERVERERROR);
                return tupleResult;
            }


        }

        private Tuple<DataSet, long> SearchIUTHeader(DataSet inputParameters, DataSet outputParameters, string[] objToken)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;
            Tuple<DataSet, long> tupleOutput = null;

            try
            {


                string erpObjName = "";
                string className = null;
                string methodName = string.Empty;
                MethodInfo MethodName = null;
                object reflectObject = null;

                //GetConfigData();
                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


                erpObjName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.ERP_SYS_DETAILS.ToString() &&
                                                             x.PARAMETER_ID == AtParWebEnums.ERP_SYS_DETAILS.DOWNLOADFROM.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0][AtParWebEnums.SearchIUT_Header_Enum.PRODUCT.ToString()].ToString() == ((int)AtParWebEnums.EnumApps.Receiving).ToString())
                {
                    erpObjName = AtParWebEnums.EnumApps.Receiving.ToString() + "_" + erpObjName;

                }
                else
                {
                    erpObjName = AtParWebEnums.EnumApps.PutAway.ToString() + "_" + erpObjName;
                }

                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, "Not a valid Erp Object Name")); }

                    tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleOutput;
                }


                if (string.IsNullOrEmpty(erpObjName))
                {
                    if (_log.IsWarnEnabled) { _log.Warn(string.Format("{0} {1} {2} :", methodBaseName, "Remote Receive object is nothing")); }

                    tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    return tupleOutput;

                }


                className = "SearchIUTHeader";
                methodName = "SearchIUTHeader";


                MethodName = Utils.CreateERPObjectInstance(erpObjName, className, methodName, out reflectObject);

                object[] args = { inputParameters, outputParameters, objToken };

                StatusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} :", methodBaseName, "GetERPBUnits getting failed from ERP")); }
                    tupleOutput = new Tuple<DataSet, long>(null, StatusCode);
                    return tupleOutput;
                }

                outputParameters = (DataSet)args[1];


                tupleOutput = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.ATPAR_OK);
                return tupleOutput;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", methodBaseName, Common.Globals.EXCEPTION, ex.ToString())); }
                tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                return tupleOutput;
            }
        }

        //private long Execute_SearchIUTHeader_PostProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        //{


        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        return AtparStatusCodes.ATPAR_OK;
        //    }
        //    catch (Exception ex)
        //    {
        //        // _trans.Rollback();
        //        if (_log.IsFatalEnabled)
        //            _log.Fatal(methodBaseName + " Execute_GetHeader_PostProcessTasks failed " + System.Environment.NewLine + ex.ToString());
        //        return AtparStatusCodes.E_SERVERERROR;
        //    }

        //}

        #endregion

        #region GetBadgeDetails
        public AtParWebApiResponse<RM_USER_LOCATIONS> GetBadgeDetails(string recpName)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<RM_USER_LOCATIONS>();
            string strXML = string.Empty;


            try
            {

                List<RM_USER_LOCATIONS> lstLocations = _poNonPoRepo.GetBadgeDetails(recpName);

                //use these columns in client while binding to grid

                //if (lstLocations != null && lstLocations.Count > 0)
                //{
                //    for (int i = 0; i <= lstLocations.Count - 1; i++)
                //    {

                //        strXML += " <RECORD><RECPNAME>" + lstLocations[0].RECIEPENTNAME + "</RECPNAME> " + " <LOCATION>" + lstLocations[0].LOCATION + "</LOCATION>" + " <PHONE>" + lstLocations[0].PHONE_NO + "</PHONE>" + " <ADDR>" + lstLocations[0].ADDRESS_1 + "</ADDR>" + " <DEPTID>" + lstLocations[0].DEPT_ID + "</DEPTID>" + " <LOC_DESCR>" + lstLocations[0].LOC_DESCR + "</LOC_DESCR>" + " </RECORD>";
                //    }
                //}
                //else
                //{
                //    response.AtParNotOK(tupleResult.Item2, _commonRepo, _log);
                //    return response;
                //}
                //strXML = "<ROOT>" + strXML  + "</ROOT>";




                if (lstLocations == null && lstLocations.Count == 0)
                {
                    response.AtParNotOK(AtparStatusCodes.E_NORECORDFOUND, _commonRepo, _log);
                    return response;
                }

                response.DataList = lstLocations;
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }

        }

        #endregion

        #region SendNonPos
        public AtParWebApiResponse<long> SendNonPos(List<VM_RECV_SENDNONPOHEADER> lstSendHeader, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            DataSet inputParameters = new DataSet();

            //DataTable recvSendNonPO_dt = new DataTable();

            try
            {
                //recvSendNonPO_dt = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.SendNonPO_Recv_Header_Defns,
                //        AtParWebEnums.DataSet_Type.HEADERS.ToString());

                //inputParameters.Tables.Add(recvSendNonPO_dt);


                DataTable dtinputParameters = new DataTable();
                dtinputParameters = lstSendHeader.ToDataTable();
                inputParameters.Tables.Add(dtinputParameters);

                DataSet OutputParameter = new DataSet();

                response.StatusCode = SendNonPos_Implementation(inputParameters, OutputParameter, deviceTokenEntry);
                // OutputParameter = tpleOutput.Item1;

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }


                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;

            }

        }



        private long SendNonPos_Implementation(DataSet inputParameters, DataSet outputParameter, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            long StatusCode = -1;
            //Tuple<DataSet, long> tupleResult = null;

            try
            {

                //Setting HeaderName Table1 to HEADERS

                inputParameters.Tables[0].TableName = AtParWebEnums.DataSet_Type.HEADERS.ToString();

                StatusCode = Check_SendNonHeader_InputParameters(inputParameters, deviceTokenEntry);

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    // tupleResult = new Tuple<DataSet, long>(null, StatusCode);

                    return StatusCode;
                }

                //Tuple<DataSet, DataSet, long> tpleResult1 = Execute_SendNonHeader_PreProcessTasks(inputParameters, outputParameter, deviceTokenEntry);
                //inputParameters = tpleResult1.Item1;
                //outputParameter = tpleResult1.Item2;


                StatusCode = Execute_SendNonHeader_ProcessTasks(inputParameters, outputParameter, deviceTokenEntry);
                //outputParameter = tupleResult.Item1;
                //StatusCode = tupleResult.Item2;

                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    // tupleResult = new Tuple<DataSet, long>(null, StatusCode);

                    return StatusCode;
                }

                // tupleResult = Execute_SendNonHeader_PostProcessTasks(inputParameters, outputParameter, deviceTokenEntry);
                //outputParameter = tupleResult.Item1;
                //StatusCode = tupleResult.Item2;


                //tupleResult = new Tuple<DataSet, long>(outputParameter, StatusCode);
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed " + ex.ToString());
                //tupleResult = new Tuple<DataSet, long>(outputParameter, AtparStatusCodes.E_SERVERERROR);
                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        private long Check_SendNonHeader_InputParameters(DataSet inputParameters, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            long StatusCode = -1;

            try
            {

                // Printing InPut DataSet 
                if (_log.IsDebugEnabled)
                {
                    //DataSetExtensions.PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);
                    inputParameters.PrintDatasetStatistics(_log, deviceTokenEntry);

                    //StatusCode = PrintDatasetStatistics(inputParameters, _log, deviceTokenEntry);

                    //if (StatusCode != AtparStatusCodes.ATPAR_OK)
                    //{
                    //    if (_log.IsFatalEnabled)
                    //        _log.Fatal(methodBaseName + " Error occured in PrintDatasetStatistics. Status Code Returned is : " + StatusCode);
                    //    return StatusCode;
                    //}

                }

                // End of Printing InPut DataSet 

                if (inputParameters.Tables.Count < 1)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " Incorrect DataTable Count " + inputParameters.Tables.Count);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                if (_log.IsDebugEnabled)
                    _log.Debug(methodBaseName + " Headers Rows count: " + inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count.ToString());

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Failed which checking count of Headers : " + ex.ToString());

                return AtparStatusCodes.E_INVALIDPARAMETER;
            }

        }

        //private Tuple<DataSet, DataSet, long> Execute_SendNonHeader_PreProcessTasks(DataSet inputParameters, DataSet outputParameter, string[] deviceTokenEntry)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    long StatusCode = 0;
        //    Tuple<DataSet, DataSet, long> tplOutput = null;

        //    try
        //    {

        //        tplOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, AtparStatusCodes.ATPAR_OK);

        //        return tplOutput;



        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled)
        //            _log.Fatal(methodBaseName + " Populate_GetIUTHeader_Prerequisites failed " + System.Environment.NewLine + ex.ToString());

        //        tplOutput = new Tuple<DataSet, DataSet, long>(inputParameters, outputParameter, AtparStatusCodes.E_SERVERERROR);

        //        return tplOutput;

        //    }

        //}

        private long Execute_SendNonHeader_ProcessTasks(DataSet inputParameters, DataSet outputParameters, string[] deviceTokenEntry)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            DataRow dr = null;
            long transId = -1;
            long dTransID = -1;
            long hTransID = -1;
            SortedList<string, string> userParams;
            int appID = 0;
            string profileId = string.Empty;
            string userId = string.Empty;
            string strDefaultBUnit = string.Empty;
            bool blnDeliverFlag = false;
            bool blnTrackingExits = false;
            string strPoid = string.Empty;
            string strLineno = string.Empty;

            long StatusCode = -1;
            //Tuple<DataSet, long> tupleOutput = null;

            try
            {

                if (inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows.Count > 0)
                {
                    dr = inputParameters.Tables[AtParWebEnums.DataSet_Type.HEADERS.ToString()].Rows[0];
                }
                else
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal(methodBaseName + " No Rows in Headers Table :E_INVALIDPARAMETER: " + System.Environment.NewLine);

                    //tupleOutput = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.E_INVALIDPARAMETER);
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }

                transId = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.Receiving);

                //Getting UserParams values
                userParams = new SortedList<string, string>();

                userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()] = string.Empty;
                appID = (int)AtParWebEnums.EnumApps.Receiving;
                profileId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.ProfileID].ToString();
                userId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();

                _commonRepo.GetUserParamValues(userParams, appID, userId);

                strDefaultBUnit = userParams[AtParWebEnums.AppParameters_Enum.ERP_USER_ID.ToString()];

                blnDeliverFlag = _poNonPoRepo.checkDeliver();


                POCOEntities.AtPar_Transaction_Entity objHdrTransEntity = new POCOEntities.AtPar_Transaction_Entity();

                objHdrTransEntity.TransactionId = Convert.ToInt32(transId);
                objHdrTransEntity.ApplicationId = (int)AtParWebEnums.EnumApps.Receiving;
                objHdrTransEntity.ID = dr[(int)AtParWebEnums.SendNonPOs_Hdr.PO_ID].ToString();
                objHdrTransEntity.BusinessUnit = strDefaultBUnit;

                if (dr[(int)AtParWebEnums.SendNonPOs_Hdr.STATUS].ToString() == ((int)AtParWebEnums.AppTransactionStatus.Receive).ToString())
                {
                    objHdrTransEntity.Status = AtParDefns.statSent;
                }
                else
                {
                    objHdrTransEntity.Status = Convert.ToInt32(dr[(int)AtParWebEnums.SendNonPOs_Hdr.STATUS]);

                }

                objHdrTransEntity.TotalRecordDownloaded = 1;
                objHdrTransEntity.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                objHdrTransEntity.DeviceId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].ToString();
                objHdrTransEntity.TotalRecordSent = 1;
                objHdrTransEntity.ReportData4 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.NON_PO_ITEM].ToString();
                objHdrTransEntity.StartDateTime = Convert.ToDateTime(dr[(int)AtParWebEnums.SendNonPOs_Hdr.START_DT_TIME]);
                objHdrTransEntity.EndDateTime = Convert.ToDateTime(dr[(int)AtParWebEnums.SendNonPOs_Hdr.END_DT_TIME]);
                objHdrTransEntity.DownloadUserId = dr[(int)AtParWebEnums.SendNonPOs_Hdr.USER_ID].ToString();

                transId = _commonRepo.InsertTransaction(objHdrTransEntity);

                if (blnDeliverFlag)
                {
                    blnTrackingExits = _poNonPoRepo.checkIfTrackingExists(dr[(int)AtParWebEnums.SendNonPOs_Hdr.TRACKING_NBR].ToString());
                    if (!blnTrackingExits)
                    {
                        transId = _commonRepo.GetTransactionId((int)AtParWebEnums.EnumApps.Deliver);

                        dTransID = transId;

                        POCOEntities.AtPar_Detail_Transaction_Entity objDetTransEntity = new POCOEntities.AtPar_Detail_Transaction_Entity();
                        objDetTransEntity.Transaction_Id = Convert.ToInt32(transId);
                        objDetTransEntity.ApplicationId = (int)AtParWebEnums.EnumApps.Deliver;
                        objDetTransEntity.UserId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                        objDetTransEntity.DeviceId = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.DeviceID].ToString();
                        objDetTransEntity.Status = AtParDefns.intStatDetailReceive;
                        objDetTransEntity.ReportData1 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.PO_ID].ToString();
                        objDetTransEntity.ReportData2 = Convert.ToInt32(dr[(int)AtParWebEnums.SendNonPOs_Hdr.LINE_NBR]);
                        objDetTransEntity.ReportData3 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.TRACKING_NBR].ToString();
                        objDetTransEntity.ReportData4 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.DELIVER_TO].ToString();
                        objDetTransEntity.ReportData5 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.LOCATION].ToString();
                        objDetTransEntity.ReportData6 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.CARRIER_ID].ToString();
                        objDetTransEntity.ReportData7 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.DEPT_ID].ToString();
                        objDetTransEntity.ReportData8 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.DESCR].ToString();

                        if (dr[(int)AtParWebEnums.SendNonPOs_Hdr.VENDOR_NAME1] == null)
                        {
                            objDetTransEntity.ReportData9 = string.Empty;
                        }
                        else
                        {
                            objDetTransEntity.ReportData9 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.VENDOR_NAME1].ToString().Replace("'", "''").Replace("\"", string.Empty);

                        }


                        objDetTransEntity.ReportData12 = Convert.ToDateTime(dr[(int)AtParWebEnums.SendNonPOs_Hdr.END_DT_TIME]);
                        objDetTransEntity.ReportData14 = "";
                        objDetTransEntity.NonPoItem = dr[(int)AtParWebEnums.SendNonPOs_Hdr.NON_PO_ITEM].ToString();
                        objDetTransEntity.ReportData15 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.SHIPTO_ID].ToString();
                        objDetTransEntity.ReportData26 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.LOCDESCR].ToString();
                        objDetTransEntity.ReportData27 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.COMMENTS].ToString();
                        objDetTransEntity.ReportData28 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.TYPE_OF_PACKAGE].ToString();
                        objDetTransEntity.ReportData47 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.NO_OF_PACKAGES].ToString();
                        objDetTransEntity.ReportData29 = deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID].ToString();
                        objDetTransEntity.ReportData31 = dr[(int)AtParWebEnums.SendNonPOs_Hdr.TRACKING_NBR].ToString();
                        objDetTransEntity.ReportData30 = Convert.ToDateTime(dr[(int)AtParWebEnums.SendNonPOs_Hdr.END_DT_TIME]);
                        strPoid = dr[(int)AtParWebEnums.SendNonPOs_Hdr.PO_ID].ToString();
                        strLineno = dr[(int)AtParWebEnums.SendNonPOs_Hdr.LINE_NBR].ToString();

                        StatusCode = _commonRepo.InsertDetailTransaction(objDetTransEntity);

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            // _trans.Rollback();
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + ":InsertDetailTransaction Failed");
                            // tupleOutput = new Tuple<DataSet, long>(outputParameters, StatusCode);

                            return StatusCode;
                        }


                    }
                    else
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + "::RECV_S_TRACKINGALREADYEXISTS:" + "SendNonPOs in Receiving Failed as the Same TrackingNumber already Exists :");
                        //tupleOutput = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.RECV_S_TRACKINGALREADYEXISTS);

                        return AtparStatusCodes.RECV_S_TRACKINGALREADYEXISTS;
                    }

                }
                else
                {
                    if (_log.IsWarnEnabled)
                        _log.Warn(methodBaseName + "::RECV_S_TRACKINGALREADYEXISTS:" + "SendNonPOs in Receiving Failed as the Same TrackingNumber already Exists :");
                    //tupleOutput = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.RECV_S_TRACKINGALREADYEXISTS);

                    return AtparStatusCodes.RECV_S_TRACKINGALREADYEXISTS;
                }



                if (inputParameters.Tables.Contains(AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()))
                {
                    if (inputParameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].Rows.Count > 0)
                    {
                        for (int i = 0; i <= inputParameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].Rows.Count - 1; i++)
                        {
                            inputParameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].Rows[i][(int)AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_11] = dTransID.ToString();
                            inputParameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].Rows[i][(int)AtParWebEnums.Send_Notes_Input_DETAILS_Enum.TRANS_ID] = hTransID.ToString();
                            inputParameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].Rows[i][(int)AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_2] = strPoid;
                            inputParameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].Rows[i][(int)AtParWebEnums.Send_Notes_Input_DETAILS_Enum.KEY_3] = strLineno;
                            inputParameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()].AcceptChanges();
                        }

                        StatusCode = _poNonPoRepo.SaveNotesDetails(inputParameters.Tables[AtParWebEnums.DataSet_Type.NOTES_DETAILS.ToString()]);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {

                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + ":Insert Notes Details Failed Failed");
                            //tupleOutput = new Tuple<DataSet, long>(outputParameters, StatusCode);

                            return StatusCode;
                        }
                    }

                }

                //tupleOutput = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.ATPAR_OK);
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(methodBaseName + " Execute_GetPO_ProcessTasks failed " + System.Environment.NewLine + ex.ToString());
                //tupleOutput = new Tuple<DataSet, long>(outputParameters, AtparStatusCodes.E_SERVERERROR);
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        //private Tuple<DataSet, long> Execute_SendNonHeader_PostProcessTasks(DataSet inputParameters, DataSet OutputParameters, string[] deviceTokenEntry)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    Tuple<DataSet, long> tupleOutput = null;

        //    try
        //    {

        //        tupleOutput = new Tuple<DataSet, long>(OutputParameters, AtparStatusCodes.ATPAR_OK);
        //        return tupleOutput;

        //    }

        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled)
        //            _log.Fatal(methodBaseName + " Execute_SendNonHeader_PostProcessTasks failed " + System.Environment.NewLine + ex.ToString());

        //        tupleOutput = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
        //        return tupleOutput;

        //    }
        //}

        #endregion
    }
}
