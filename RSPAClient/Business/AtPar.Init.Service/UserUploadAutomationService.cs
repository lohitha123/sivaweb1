using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Common;
using AtPar.Service.Interfaces.Init;
using AtPar.ViewModel;
using AtPar_BusinessRules;
using Excel;
using log4net;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AtPar_BusinessRules;
using AtPar.Common;
using System.Dynamic;
using System.Web;
using System.Reflection;

namespace AtPar.Init.Service
{
    public class UserUploadAutomationService : IUserUploadAutomationService
    {

        #region Private Variable
        ILog _log;
        ICommonRepository _commonRepo;
        IUserUploadAutomationRepository _userUploadRepo;
        ICommonService _commonService;
        #endregion

        #region Constructor
        public UserUploadAutomationService(IUserUploadAutomationRepository repository, ICommonRepository commonRepository, ICommonService commonService, ILog log)
        {
            _userUploadRepo = repository;
            _commonRepo = commonRepository;
            _commonService = commonService;
            _log = log;
        }

        #endregion

        #region Public Methods

        public AtParWebApiResponse<object> GenerateOrgGroupData(string filename, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<object>();

            OleDbDataAdapter daOrgGroupParameters = new OleDbDataAdapter();
            OleDbDataAdapter daOrgGroupBU = new OleDbDataAdapter();
            OleDbDataAdapter daUserData = new OleDbDataAdapter();
            IExcelDataReader excelReader = null;


            DataSet dsExceldata = new DataSet();
            bool blncolumnCheck = false;
            DataTable dtOrgGroupParameters = new DataTable();
            DataTable dtOrgGroupErrordata = new DataTable();
            DataTable dtOrgGroupBUnits = new DataTable();
            DataRow dr = null;
            int i = 0;

            Tuple<DataSet, long> tupleResult = null;
            DataSet dsOrgGroupdata = new DataSet();
            long StatusCode = -1;

            try
            {
                try
                {
                    FileStream stream = File.Open(filename, FileMode.Open, FileAccess.Read);

                    if (filename.Substring(filename.LastIndexOf('.')).ToLower() == ".xlsx")
                    {
                        excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                    }
                    else
                    {
                        excelReader = ExcelReaderFactory.CreateBinaryReader(stream);
                    }

                    excelReader.IsFirstRowAsColumnNames = true;
                    dsExceldata = excelReader.AsDataSet();

                    if (excelReader != null)
                    {
                        excelReader.Close();
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal("Exception Thrown in " + methodBaseName + "is..." + ex.ToString());

                    if (excelReader != null)
                    {
                        excelReader.Close();
                    }
                    tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    response.DataVariable = tupleResult;
                    return response;
                }
                finally
                {
                    if (excelReader != null)
                    {
                        excelReader.Close();
                    }
                }

                try
                {
                    try
                    {
                        dtOrgGroupParameters = dsExceldata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupParams.ToString()].Copy();
                        dtOrgGroupParameters.TableName = AtParWebEnums.Enum_OrgGroupData.OrgGroupParams.ToString();

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in OrgGroupParameters table creation " + methodBaseName + "is..." + ex.ToString());

                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;
                    }

                    try
                    {
                        while (i < dtOrgGroupParameters.Rows.Count)
                        {
                            dr = (dtOrgGroupParameters.Rows[i]);

                            foreach (DataColumn dc in dtOrgGroupParameters.Columns)
                            {
                                if (dr[dc.ColumnName] == null || dr[dc.ColumnName] == null || dr[dc.ColumnName].ToString() == string.Empty)
                                {
                                    blncolumnCheck = true;
                                }
                                else
                                {
                                    blncolumnCheck = false;
                                    break;
                                }
                            }

                            if (blncolumnCheck)
                            {
                                dr.Delete();
                            }
                            i = i + 1;
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in Loop " + methodBaseName + "is..." + ex.ToString());
                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;

                    }

                    dtOrgGroupParameters.AcceptChanges();
                    dsOrgGroupdata.Tables.Add(dtOrgGroupParameters);
                    dsOrgGroupdata.AcceptChanges();

                    daOrgGroupParameters = null;
                    dtOrgGroupErrordata = dtOrgGroupParameters.Copy();

                    DataColumn col = new DataColumn();
                    col.DataType = Type.GetType("System.String");
                    col.DefaultValue = string.Empty;
                    col.ColumnName = "ERROR_MESSAGE";
                    dtOrgGroupErrordata.Columns.Add(col);

                    DataColumn col1 = new DataColumn();
                    col1.DataType = Type.GetType("System.String");
                    col1.DefaultValue = string.Empty;
                    col1.ColumnName = "STATUS_CODE";
                    dtOrgGroupErrordata.Columns.Add(col1);

                    DataColumn col2 = new DataColumn();
                    col2.DataType = Type.GetType("System.Int32");
                    col2.DefaultValue = decimal.Zero;
                    col2.ColumnName = "ERROR_TYPE";
                    dtOrgGroupErrordata.Columns.Add(col2);

                    dtOrgGroupErrordata.TableName = AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString();
                    dsOrgGroupdata.Tables.Add(dtOrgGroupErrordata);
                    dsOrgGroupdata.AcceptChanges();

                    try
                    {
                        dtOrgGroupBUnits = dsExceldata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupBU.ToString()].Copy();
                        dtOrgGroupBUnits.TableName = AtParWebEnums.Enum_OrgGroupData.OrgGroupBU.ToString();

                        dsOrgGroupdata.Tables.Add(dtOrgGroupBUnits);
                        dsOrgGroupdata.AcceptChanges();

                        daOrgGroupBU = null;
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in daOrgGroupBU " + methodBaseName + "is..." + ex.ToString());
                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;

                    }
                    //validating excel               
                    if (dtOrgGroupBUnits.Rows[0][AtParWebEnums.Enum_OrgGroupBU.EnterpriseSystem.ToString()].ToString().ToUpper() != enterpriseSystem.ToUpper())
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + ":Not a valid Org excel sheet for: " + enterpriseSystem);
                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_INVALIDFILE);
                        response.DataVariable = tupleResult;
                        return response;
                    }

                    //Adding Summary Table
                    DataTable dtSummary = new DataTable();
                    try
                    {
                        dtSummary = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Upload_Summary_Defns, AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString());

                        if (_log.IsDebugEnabled)
                            _log.Debug("Summary Data Table Created Successfully");
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in  dtSummary" + methodBaseName + " is..." + System.Environment.NewLine + ex.ToString());

                        //lblStatusMessage.Visible = true;
                        //lblStatusMessage.CssClass = "ErrMessage";
                        //lblStatusMessage.Text = "Internal Server Error";
                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;

                    }

                    dsOrgGroupdata.Tables.Add(dtSummary);
                    dsOrgGroupdata.AcceptChanges();

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal("Exception Thrown in Main Try" + methodBaseName + " is..." + ex.ToString());
                    //lblStatusMessage.Visible = true;
                    //lblStatusMessage.CssClass = "ErrMessage";
                    //lblStatusMessage.Text = "Internal Server Error";
                    tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    response.DataVariable = tupleResult;
                    return response;
                }
                finally
                {
                    daOrgGroupParameters = null;
                    daOrgGroupBU = null;

                }
            }
            catch (Exception ex)
            {
                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                response.DataVariable = tupleResult;
                return response;

            }
            finally
            {

                if (daOrgGroupParameters != null)
                {
                    daOrgGroupParameters = null;
                }
                if (daOrgGroupBU != null)
                {
                    daOrgGroupBU = null;
                }
                if (daUserData != null)
                {
                    daUserData = null;
                }
                dsExceldata = null;

            }
            tupleResult = new Tuple<DataSet, long>(dsOrgGroupdata, AtparStatusCodes.ATPAR_OK);
            //return tupleResult;
            response.DataVariable = tupleResult;
            return response;

        }
        public AtParWebApiResponse<object> GenerateUserData(string filename, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<object>();

            OleDbDataAdapter daProfileJobRef = new OleDbDataAdapter();
            OleDbDataAdapter daUserData = new OleDbDataAdapter();

            IExcelDataReader excelReader = null;
            DataSet dsExceldata = new DataSet();
            DataTable dtUser = new DataTable();
            DataTable dtUserErrordata = new DataTable();
            DataTable dtprofile = new DataTable();
            DataRow dr = null;
            bool blncolumnCheck = false;
            int i = 0;

            Tuple<DataSet, long> tupleResult = null;
            DataSet dsUserdata = new DataSet();
            long StatusCode = -1;

            try
            {
                try
                {
                    try
                    {
                        FileStream stream = File.Open(filename, FileMode.Open, FileAccess.Read);

                        if (filename.Substring(filename.LastIndexOf('.')).ToLower() == ".xlsx")
                        {
                            excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                        }
                        else
                        {
                            excelReader = ExcelReaderFactory.CreateBinaryReader(stream);
                        }

                        excelReader.IsFirstRowAsColumnNames = true;
                        dsExceldata = excelReader.AsDataSet();

                        if (excelReader != null)
                        {
                            excelReader.Close();
                        }
                        dtUser = new DataTable();
                        dtUser = dsExceldata.Tables[AtParWebEnums.Enum_UserData.UserData.ToString()].Copy();
                        dtUser.TableName = "UserData";
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in " + methodBaseName + "is..." + ex.ToString());

                        if (excelReader != null)
                        {
                            excelReader.Close();
                        }
                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;

                    }
                    finally
                    {
                        if (excelReader != null)
                        {
                            excelReader.Close();
                        }
                    }

                    while (i < dtUser.Rows.Count)
                    {
                        dr = (dtUser.Rows[i]);

                        foreach (DataColumn dc in dtUser.Columns)
                        {
                            if (dr[dc.ColumnName] == null || dr[dc.ColumnName] == null || dr[dc.ColumnName].ToString() == string.Empty)
                            {
                                blncolumnCheck = true;
                            }
                            else
                            {
                                blncolumnCheck = false;
                                break;
                            }
                        }

                        if (blncolumnCheck)
                        {
                            dr.Delete();
                        }
                        i = i + 1;
                    }

                    dtUser.AcceptChanges();
                    dsUserdata.Tables.Add(dtUser);
                    dsUserdata.AcceptChanges();

                    daUserData = null;
                    dtUserErrordata = dtUser.Copy();

                    DataColumn col = new DataColumn();
                    col.DataType = Type.GetType("System.String");
                    col.DefaultValue = string.Empty;
                    col.ColumnName = "ERROR_MESSAGE";
                    dtUserErrordata.Columns.Add(col);

                    DataColumn col1 = new DataColumn();
                    col1.DataType = Type.GetType("System.String");
                    col1.DefaultValue = string.Empty;
                    col1.ColumnName = "STATUS_CODE";
                    dtUserErrordata.Columns.Add(col1);

                    dtUserErrordata.TableName = AtParWebEnums.Enum_UserData.UserErrorData.ToString();
                    dsUserdata.Tables.Add(dtUserErrordata);
                    dsUserdata.AcceptChanges();


                    dtprofile = dsExceldata.Tables[AtParWebEnums.Enum_UserData.ProfileJobRef.ToString()].Copy();

                    dtprofile.TableName = "ProfileJobRef";
                    dsUserdata.Tables.Add(dtprofile);
                    dsUserdata.AcceptChanges();
                    daProfileJobRef = null;


                    if (dtprofile.Rows[0][AtParWebEnums.Enum_ProfileJobRef.EnterpriseSystem.ToString()].ToString().ToUpper() != enterpriseSystem.ToUpper())
                    {
                        if (_log.IsWarnEnabled)
                            _log.Warn(methodBaseName + ":Not a valid User excel sheet for: " + enterpriseSystem);

                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_INVALIDFILE);
                        response.DataVariable = tupleResult;
                        return response;


                    }

                    DataTable dtSummary = new DataTable();

                    try
                    {
                        dtSummary = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Upload_Summary_Defns, AtParWebEnums.Enum_UserData.SUMMARY.ToString());

                        if (_log.IsDebugEnabled)
                            _log.Debug("Summary Data Table Created Successfully");
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in " + methodBaseName + " is..." + System.Environment.NewLine + ex.ToString());

                        //lblStatusMessage.Visible = true;
                        //lblStatusMessage.CssClass = "ErrMessage";
                        //lblStatusMessage.Text = "Internal Server Error";

                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;
                    }

                    dsUserdata.Tables.Add(dtSummary);
                    dsUserdata.AcceptChanges();

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal("Exception Thrown in " + methodBaseName + " is..." + ex.ToString());
                    //lblStatusMessage.Visible = true;
                    //lblStatusMessage.CssClass = "ErrMessage";
                    //lblStatusMessage.Text = "Internal Server Error";

                    tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    response.DataVariable = tupleResult;
                    return response;

                }
                finally
                {
                    daUserData = null;
                    daProfileJobRef = null;

                }
            }
            catch (Exception ex)
            {
                //lblStatusMessage.Visible = true;
                //lblStatusMessage.CssClass = "ErrMessage";
                //lblStatusMessage.Text = "Internal Server Error";
                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                response.DataVariable = tupleResult;
                return response;
            }
            finally
            {

                if (daUserData != null)
                {
                    daUserData = null;
                }
                if (daProfileJobRef != null)
                {
                    daProfileJobRef = null;
                }
            }
            tupleResult = new Tuple<DataSet, long>(dsUserdata, AtparStatusCodes.ATPAR_OK);
            response.DataVariable = tupleResult;
            return response;
        }

        public AtParWebApiResponse<object> GenerateProfileData(string filename, string enterpriseSystem)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<object>();

            OleDbDataAdapter daProfileParameters = new OleDbDataAdapter();
            OleDbDataAdapter daProfileTemplateRef = new OleDbDataAdapter();
            OleDbDataAdapter daProfileSetup = new OleDbDataAdapter();
            OleDbDataAdapter daProfileMenus = new OleDbDataAdapter();
            OleDbDataAdapter daProfileScreendisplay = new OleDbDataAdapter();

            IExcelDataReader excelReader = null;
            DataSet dsExceldata = new DataSet();

            DataTable dtProfileTemplateRef = new DataTable();
            DataTable dtProfileTemplateRefErrordata = new DataTable();
            DataTable dtProfileSetUp = new DataTable();
            DataTable dtProfileMenus = new DataTable();
            DataTable dtProfileMenusErrordata = new DataTable();
            DataTable dtProfileScreenDisplay = new DataTable();
            DataTable dtProfileScreenDisplayErrordata = new DataTable();
            DataTable dtProfileParameters = new DataTable();
            DataTable dtProfileParametersErrordata = new DataTable();
            int i = 0;
            DataRow dr = null;
            bool blncolumnCheck = false;

            Tuple<DataSet, long> tupleResult = null;
            DataSet dsProfiledata = new DataSet();
            long StatusCode = -1;

            try
            {

                try
                {
                    FileStream stream = File.Open(filename, FileMode.Open, FileAccess.Read);

                    if (filename.Substring(filename.LastIndexOf('.')).ToLower() == ".xlsx")
                    {
                        excelReader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                    }
                    else
                    {
                        excelReader = ExcelReaderFactory.CreateBinaryReader(stream);
                    }

                    excelReader.IsFirstRowAsColumnNames = true;
                    dsExceldata = excelReader.AsDataSet();

                    if (excelReader != null)
                    {
                        excelReader.Close();
                    }
                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal("Exception Thrown in " + methodBaseName + "is..." + ex.ToString());
                    if (excelReader != null)
                    {
                        excelReader.Close();
                    }

                    tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    response.DataVariable = tupleResult;
                    return response;
                }
                finally
                {

                    if (excelReader != null)
                    {
                        excelReader.Close();
                    }
                }

                try
                {
                    try
                    {

                        dtProfileTemplateRef = dsExceldata.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRef.ToString()].Copy();

                        dtProfileTemplateRef.TableName = AtParWebEnums.Enum_ProfileData.ProfileTemplateRef.ToString();

                        try
                        {
                            while (i < dtProfileTemplateRef.Rows.Count)
                            {
                                dr = (dtProfileTemplateRef.Rows[i]);

                                foreach (DataColumn dc in dtProfileTemplateRef.Columns)
                                {
                                    if (dr[dc.ColumnName] == null || dr[dc.ColumnName] == null || dr[dc.ColumnName].ToString() == string.Empty)
                                    {
                                        blncolumnCheck = true;
                                    }
                                    else
                                    {
                                        blncolumnCheck = false;
                                        break;
                                    }
                                }

                                if (blncolumnCheck)
                                {
                                    dr.Delete();
                                }
                                i = i + 1;
                            }
                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal("Exception Thrown in Loop " + methodBaseName + "is..." + ex.ToString());

                            tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                            response.DataVariable = tupleResult;
                            return response;
                        }
                        //validating excel               
                        if (dtProfileTemplateRef.Rows[0][AtParWebEnums.Enum_ProfileTemplateRef.EnterpriseSystem.ToString()].ToString().ToUpper() != enterpriseSystem.ToUpper())
                        {
                            if (_log.IsWarnEnabled)
                                _log.Warn(methodBaseName + ":Not a valid Profile excel sheet for: " + enterpriseSystem);

                            tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_INVALIDFILE);
                            response.DataVariable = tupleResult;
                            return response;

                        }
                        dsProfiledata.Tables.Add(dtProfileTemplateRef);
                        dsProfiledata.AcceptChanges();

                        dtProfileTemplateRefErrordata = dtProfileTemplateRef.Copy();

                        DataColumn col1 = new DataColumn();
                        col1.DataType = Type.GetType("System.String");
                        col1.DefaultValue = string.Empty;
                        col1.ColumnName = "ERROR_MESSAGE";
                        dtProfileTemplateRefErrordata.Columns.Add(col1);

                        DataColumn col2 = new DataColumn();
                        col2.DataType = Type.GetType("System.String");
                        col2.DefaultValue = string.Empty;
                        col2.ColumnName = "STATUS_CODE";
                        dtProfileTemplateRefErrordata.Columns.Add(col2);

                        dtProfileTemplateRefErrordata.TableName = AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString();
                        dsProfiledata.Tables.Add(dtProfileTemplateRefErrordata);
                        dsProfiledata.AcceptChanges();

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in daProfileTemplateRef " + methodBaseName + "is..." + ex.ToString());

                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;

                    }


                    try
                    {

                        dtProfileSetUp = dsExceldata.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Copy();
                        dtProfileSetUp.TableName = AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString();
                        dsProfiledata.Tables.Add(dtProfileSetUp);
                        dsProfiledata.AcceptChanges();

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in daProfileSetup " + methodBaseName + "is..." + ex.ToString());
                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;

                    }

                    try
                    {


                        dtProfileMenus = dsExceldata.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenus.ToString()].Copy();
                        dtProfileMenus.TableName = AtParWebEnums.Enum_ProfileData.ProfileMenus.ToString();
                        dsProfiledata.Tables.Add(dtProfileMenus);
                        dsProfiledata.AcceptChanges();

                        DataColumn col3 = new DataColumn();
                        col3.DataType = Type.GetType("System.String");
                        col3.DefaultValue = string.Empty;
                        col3.ColumnName = "PROFILE_ID";
                        dtProfileMenusErrordata.Columns.Add(col3);

                        DataColumn col4 = new DataColumn();
                        col4.DataType = Type.GetType("System.String");
                        col4.DefaultValue = string.Empty;
                        col4.ColumnName = "PROFILE_TEMPLATEID";
                        dtProfileMenusErrordata.Columns.Add(col4);

                        DataColumn col5 = new DataColumn();
                        col5.DataType = Type.GetType("System.String");
                        col5.DefaultValue = string.Empty;
                        col5.ColumnName = "MENU_TEMPLATEID";
                        dtProfileMenusErrordata.Columns.Add(col5);

                        DataColumn col6 = new DataColumn();
                        col6.DataType = Type.GetType("System.String");
                        col6.DefaultValue = string.Empty;
                        col6.ColumnName = "ERROR_MESSAGE";
                        dtProfileMenusErrordata.Columns.Add(col6);

                        dtProfileMenusErrordata.TableName = AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString();
                        dsProfiledata.Tables.Add(dtProfileMenusErrordata);
                        dsProfiledata.AcceptChanges();

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in daProfileMenus " + methodBaseName + "is..." + ex.ToString());

                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;

                    }

                    try
                    {

                        dtProfileScreenDisplay = dsExceldata.Tables[AtParWebEnums.Enum_ProfileData.Screendisplay.ToString()].Copy();

                        dtProfileScreenDisplay.TableName = AtParWebEnums.Enum_ProfileData.Screendisplay.ToString();
                        dsProfiledata.Tables.Add(dtProfileScreenDisplay);
                        dsProfiledata.AcceptChanges();

                        DataColumn col7 = new DataColumn();
                        col7.DataType = Type.GetType("System.String");
                        col7.DefaultValue = string.Empty;
                        col7.ColumnName = "PROFILE_ID";
                        dtProfileScreenDisplayErrordata.Columns.Add(col7);

                        DataColumn col8 = new DataColumn();
                        col8.DataType = Type.GetType("System.String");
                        col8.DefaultValue = string.Empty;
                        col8.ColumnName = "PROFILE_TEMPLATEID";
                        dtProfileScreenDisplayErrordata.Columns.Add(col8);

                        DataColumn col9 = new DataColumn();
                        col9.DataType = Type.GetType("System.String");
                        col9.DefaultValue = string.Empty;
                        col9.ColumnName = "SCREEN_TEMPLATEID";
                        dtProfileScreenDisplayErrordata.Columns.Add(col9);

                        DataColumn col10 = new DataColumn();
                        col10.DataType = Type.GetType("System.String");
                        col10.DefaultValue = string.Empty;
                        col10.ColumnName = "ERROR_MESSAGE";
                        dtProfileScreenDisplayErrordata.Columns.Add(col10);

                        dtProfileScreenDisplayErrordata.TableName = AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorData.ToString();
                        dsProfiledata.Tables.Add(dtProfileScreenDisplayErrordata);
                        dsProfiledata.AcceptChanges();

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in daProfileMenus " + methodBaseName + "is..." + ex.ToString());

                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;

                    }

                    try
                    {


                        dtProfileParameters = dsExceldata.Tables[AtParWebEnums.Enum_ProfileData.ProfileParameters.ToString()].Copy();
                        dtProfileParameters.TableName = AtParWebEnums.Enum_ProfileData.ProfileParameters.ToString();

                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in daProfileParameters table creation " + methodBaseName + "is..." + ex.ToString());
                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;
                    }

                    try
                    {
                        while (i < dtProfileParameters.Rows.Count)
                        {
                            dr = (dtProfileParameters.Rows[i]);
                            foreach (DataColumn dc in dtProfileParameters.Columns)
                            {
                                if (dr[dc.ColumnName] == null || dr[dc.ColumnName] == null || dr[dc.ColumnName].ToString() == string.Empty)
                                {
                                    blncolumnCheck = true;
                                }
                                else
                                {
                                    blncolumnCheck = false;
                                    break;
                                }
                            }

                            if (blncolumnCheck)
                            {
                                dr.Delete();
                            }
                            i = i + 1;
                        }
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in Loop " + methodBaseName + "is..." + ex.ToString());
                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;
                    }

                    dtProfileParameters.AcceptChanges();
                    dsProfiledata.Tables.Add(dtProfileParameters);
                    dsProfiledata.AcceptChanges();

                    daProfileParameters = null;

                    DataColumn col11 = new DataColumn();
                    col11.DataType = Type.GetType("System.String");
                    col11.DefaultValue = string.Empty;
                    col11.ColumnName = "PROFILE_ID";
                    dtProfileParametersErrordata.Columns.Add(col11);

                    DataColumn col12 = new DataColumn();
                    col12.DataType = Type.GetType("System.String");
                    col12.DefaultValue = string.Empty;
                    col12.ColumnName = "PROFILE_TEMPLATEID";
                    dtProfileParametersErrordata.Columns.Add(col12);

                    DataColumn col13 = new DataColumn();
                    col13.DataType = Type.GetType("System.String");
                    col13.DefaultValue = string.Empty;
                    col13.ColumnName = "PARAMETER_TEMPLATEID";
                    dtProfileParametersErrordata.Columns.Add(col13);

                    DataColumn col = new DataColumn();
                    col.DataType = Type.GetType("System.String");
                    col.DefaultValue = string.Empty;
                    col.ColumnName = "ERROR_MESSAGE";
                    dtProfileParametersErrordata.Columns.Add(col);

                    dtProfileParametersErrordata.TableName = AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString();
                    dsProfiledata.Tables.Add(dtProfileParametersErrordata);
                    dsProfiledata.AcceptChanges();

                    //Adding Summary Table
                    DataTable dtSummary = default(DataTable);
                    dtSummary = new DataTable();
                    try
                    {
                        dtSummary = Common.ApplicationDataSetDefns.CreateAtParTableDefn(Common.ApplicationDataSetDefns.Get_Upload_Summary_Defns, AtParWebEnums.Enum_ProfileData.SUMMARY.ToString());

                        if (_log.IsDebugEnabled)
                            _log.Debug("Summary Data Table Created Successfully");
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown in  dtSummary" + methodBaseName + " is..." + System.Environment.NewLine + ex.ToString());

                        //lblStatusMessage.Visible = true;
                        //lblStatusMessage.CssClass = "ErrMessage";
                        //lblStatusMessage.Text = "Internal Server Error";

                        tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                        response.DataVariable = tupleResult;
                        return response;
                    }

                    dsProfiledata.Tables.Add(dtSummary);
                    dsProfiledata.AcceptChanges();

                }
                catch (Exception ex)
                {
                    if (_log.IsFatalEnabled)
                        _log.Fatal("Exception Thrown in Main Try" + methodBaseName + " is..." + ex.ToString());

                    //lblStatusMessage.Visible = true;
                    //lblStatusMessage.CssClass = "ErrMessage";
                    //lblStatusMessage.Text = "Internal Server Error";
                    tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                    response.DataVariable = tupleResult;
                    return response;

                }
                finally
                {
                    daProfileParameters = null;

                }
            }
            catch (Exception ex)
            {
                //lblStatusMessage.Visible = true;
                //lblStatusMessage.CssClass = "ErrMessage";
                //lblStatusMessage.Text = "Internal Server Error";
                tupleResult = new Tuple<DataSet, long>(null, AtparStatusCodes.E_SERVERERROR);
                response.DataVariable = tupleResult;
                return response;

            }
            finally
            {

                if (daProfileParameters != null)
                {
                    daProfileParameters = null;
                }

                if (daProfileTemplateRef != null)
                {
                    daProfileTemplateRef = null;
                }

                if (daProfileSetup != null)
                {
                    daProfileSetup = null;
                }

                if (daProfileMenus != null)
                {
                    daProfileMenus = null;
                }

                if (daProfileScreendisplay != null)
                {
                    daProfileScreendisplay = null;
                }
                dsExceldata = null;
            }
            tupleResult = new Tuple<DataSet, long>(dsProfiledata, AtparStatusCodes.ATPAR_OK);
            response.DataVariable = tupleResult;
            return response;
        }

        public AtParWebApiResponse<object> DoUploadData(bool chkUser, bool chkProfile, bool chkOrgGroup, string strUserUploadPath, string strProfileUploadPath, string strOrgGroupUploadPath, string enterpriseSystem, string userID, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<object>();

            try
            {
                DataSet dsUserdata = new DataSet();
                DataSet dsProfiledata = new DataSet();
                DataSet dsOrgGroupdata = new DataSet();
                long statusCode = -1;

                if (chkUser || chkProfile || chkOrgGroup)
                {
                    var dsResponse = new AtParWebApiResponse<object>();
                    if (chkUser)
                    {
                        if (strUserUploadPath != "" && strUserUploadPath != null)
                        {
                            dsResponse = GenerateUserData(strUserUploadPath, enterpriseSystem);
                            if (((System.Tuple<System.Data.DataSet, long>)dsResponse.DataVariable).Item2 != AtparStatusCodes.ATPAR_OK)
                            {
                                response.AtParNotOK(((System.Tuple<System.Data.DataSet, long>)dsResponse.DataVariable).Item2, _commonRepo, _log, enterpriseSystem);
                                return response;
                            }
                            dsUserdata = ((System.Tuple<System.Data.DataSet, long>)dsResponse.DataVariable).Item1;
                        }
                    }



                    if (chkProfile)
                    {
                        if (strProfileUploadPath != "" && strProfileUploadPath != null)
                        {
                            dsResponse = GenerateProfileData(strProfileUploadPath, enterpriseSystem);
                            if (((System.Tuple<System.Data.DataSet, long>)dsResponse.DataVariable).Item2 != AtparStatusCodes.ATPAR_OK)
                            {
                                response.AtParNotOK(((System.Tuple<System.Data.DataSet, long>)dsResponse.DataVariable).Item2, _commonRepo, _log, enterpriseSystem);
                                return response;
                            }
                            dsProfiledata = ((System.Tuple<System.Data.DataSet, long>)dsResponse.DataVariable).Item1;
                        }
                    }

                    if (chkOrgGroup)
                    {
                        if (strOrgGroupUploadPath != "" && strOrgGroupUploadPath != null)
                        {
                            dsResponse = GenerateOrgGroupData(strOrgGroupUploadPath, enterpriseSystem);
                            if (((System.Tuple<System.Data.DataSet, long>)dsResponse.DataVariable).Item2 != AtparStatusCodes.ATPAR_OK)
                            {
                                response.AtParNotOK(((System.Tuple<System.Data.DataSet, long>)dsResponse.DataVariable).Item2, _commonRepo, _log, enterpriseSystem);
                                return response;
                            }
                            dsOrgGroupdata = ((System.Tuple<System.Data.DataSet, long>)dsResponse.DataVariable).Item1;
                        }
                    }


                }
                //GetConfigData();

                string _className = null;
                object reflectObject = null;
                MethodInfo MethodName = default(MethodInfo);
                string methodName = string.Empty;

                _className = "AtPar_WebTrans";
                methodName = "Do_UploadData";
                MethodName = Utils.CreateERPObjectInstance("AtPar_BusinessRules", _className, methodName, out reflectObject);
                object[] args = { userID, dsUserdata, dsOrgGroupdata, dsProfiledata, deviceTokenEntry };
                statusCode = Convert.ToInt64(MethodName.Invoke(reflectObject, args));

                //var objCls = new AtPar_BusinessRules.AtPar_WebTrans();
                //statusCode = objCls.Do_UploadData(userID, ref dsUserdata, ref dsOrgGroupdata, ref dsProfiledata, deviceTokenEntry);

                if (statusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(statusCode, _commonRepo, _log);
                    return response;
                }

                dsUserdata = (DataSet)args[1];
                dsOrgGroupdata = (DataSet)args[2];
                dsProfiledata = (DataSet)args[3];

                string[] userErrDataFields = null;
                string[] orgGroupErrDataFields = null;
                string[] profileMenusErrDataFields = null;
                string[] profileParametersErrDataFields = null;
                string[] profileScreendisplayErrDataFields = null;
                string[] profileTemplateRefErrDataFields = null;


                if (dsOrgGroupdata.Tables.Count > 0)
                {
                    try
                    {
                        for (int j = 0; j <= dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Columns.Count - 1; j++)
                        {
                            string strColName = dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[0][j].ToString();
                            int l = 1;
                            for (int k = j + 1; k <= dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Columns.Count - 1; k++)
                            {
                                if (strColName == dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[0][k].ToString())
                                {
                                    dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[0][k] = dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[0][k].ToString() + l;
                                    l += 1;
                                }
                            }
                        }
                        //Interchanging the column names
                        foreach (DataColumn dc in dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Columns)
                        {
                            if (dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Columns[dc.ColumnName.ToString()].ColumnName == "ERROR_MESSAGE" | dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Columns[dc.ColumnName.ToString()].ColumnName == "STATUS_CODE" | dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Columns[dc.ColumnName.ToString()].ColumnName == "ERROR_TYPE")
                            {
                                continue;
                            }
                            else
                            {
                                dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Columns[dc.ColumnName.ToString()].ColumnName = dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[0][dc.ColumnName.ToString()].ToString();
                            }
                        }

                        orgGroupErrDataFields = (from dc in dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();

                        dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[0].Delete();
                        dsOrgGroupdata.AcceptChanges();
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }


                if (dsUserdata.Tables.Count > 0)
                {
                    try
                    {
                        //Incrementing the same column names
                        for (int j = 0; j <= dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Columns.Count - 1; j++)
                        {
                            string strColName = dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[0][j].ToString();
                            int l = 1;
                            for (int k = j + 1; k <= dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Columns.Count - 1; k++)
                            {
                                if (strColName == dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[0][k].ToString())
                                {
                                    dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[0][k] = dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[0][k].ToString() + l;
                                    l += 1;
                                }
                            }
                        }
                        //Interchanging the column names
                        foreach (DataColumn dc in dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Columns)
                        {
                            if (dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Columns[dc.ColumnName.ToString()].ColumnName == "ERROR_MESSAGE" | dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Columns[dc.ColumnName.ToString()].ColumnName == "STATUS_CODE")
                            {
                                continue;
                            }
                            else
                            {
                                dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Columns[dc.ColumnName.ToString()].ColumnName = dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[0][dc.ColumnName.ToString()].ToString();
                            }
                        }

                        userErrDataFields = (from dc in dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();

                        dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[0].Delete();
                        dsUserdata.AcceptChanges();
                    }
                    catch (Exception ex)
                    {
                        if (_log.IsFatalEnabled)
                            _log.Fatal("Exception Thrown while updating Column Names of User Profile..." + ex.ToString());
                        return null;

                    }
                }

                if (dsProfiledata.Tables.Count > 0)
                {
                    profileMenusErrDataFields = (from dc in dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();
                    profileParametersErrDataFields = (from dc in dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();
                    profileScreendisplayErrDataFields = (from dc in dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();
                    profileTemplateRefErrDataFields = (from dc in dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();
                }

                Dictionary<string, object> dsMainDictionary = new Dictionary<string, object>();

                Dictionary<string, object> dsUserDictionary = new Dictionary<string, object>();

                if (dsUserdata.Tables.Count > 0)
                {
                    List<object> userErrorData = new List<object>();
                    string[] userErrDataHeadres = (from dc in dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();

                    List<object> lstobj = new List<object>();
                    for (int i = 0; i < dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows.Count; i++)
                    {
                        Dictionary<string, string> column = new Dictionary<string, string>();
                        for (int j = 0; j < dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Columns.Count; j++)
                        {
                            column.Add(userErrDataFields[j].ToString(), dsUserdata.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i][j].ToString());
                        }
                        userErrorData.Add(column);
                    }
                    dsUserDictionary.Add(AtParWebEnums.Enum_UserData.UserErrorData.ToString(), userErrorData);

                    List<VM_ATPAR_UPLOADED_SUMMARY> userSummary = new List<VM_ATPAR_UPLOADED_SUMMARY>();

                    for (int i = 0; i < dsUserdata.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows.Count; i++)
                    {
                        VM_ATPAR_UPLOADED_SUMMARY summary = new VM_ATPAR_UPLOADED_SUMMARY();
                        summary.TOTAL_REC_CNT = dsUserdata.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.TOTAL_REC_CNT.ToString()].ToString();
                        summary.FAILURE_CNT = dsUserdata.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.FAILURE_CNT.ToString()].ToString();
                        summary.ADDED_CNT = dsUserdata.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()].ToString();
                        summary.SUCCESS_CNT = dsUserdata.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.SUCCESS_CNT.ToString()].ToString();
                        summary.UPDATED_CNT = dsUserdata.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.UPDATED_CNT.ToString()].ToString();
                        summary.WARNING_CNT = dsUserdata.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.WARNING_CNT.ToString()].ToString();
                        userSummary.Add(summary);
                    }

                    dsUserDictionary.Add(AtParWebEnums.Enum_UserData.SUMMARY.ToString(), userSummary);
                    dsUserDictionary.Add(AtParWebEnums.Enum_UserData.UserErrorDataFields.ToString(), userErrDataFields);
                    dsUserDictionary.Add(AtParWebEnums.Enum_UserData.UserErrorDataHeaders.ToString(), userErrDataHeadres);

                }

                dsMainDictionary.Add(AtParWebEnums.DataSet_Type.USER.ToString(), dsUserDictionary);

                Dictionary<string, object> dsProfileDictionary = new Dictionary<string, object>();
                if (dsProfiledata.Tables.Count > 0)
                {
                    List<object> profileMenusErrorData = new List<object>();
                    string[] profileMenusErrDataHeaders = (from dc in dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();
                    for (int i = 0; i < dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString()].Rows.Count; i++)
                    {
                        Dictionary<string, string> column = new Dictionary<string, string>();
                        for (int j = 0; j < dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString()].Columns.Count; j++)
                        {
                            column.Add(profileMenusErrDataFields[j].ToString(), dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString()].Rows[i][j].ToString());
                        }
                        profileMenusErrorData.Add(column);
                    }
                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString(), profileMenusErrorData);

                    List<object> profileParametersErrorData = new List<object>();
                    string[] profileParametersErrDataHeaders = (from dc in dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();
                    for (int i = 0; i < dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].Rows.Count; i++)
                    {
                        Dictionary<string, string> column = new Dictionary<string, string>();
                        for (int j = 0; j < dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].Columns.Count; j++)
                        {
                            column.Add(profileParametersErrDataFields[j].ToString(), dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].Rows[i][j].ToString());
                        }
                        profileParametersErrorData.Add(column);
                    }
                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString(), profileParametersErrorData);

                    List<object> profileScreendisplayErrorData = new List<object>();
                    string[] profileScreendisplayErrDataHeaders = (from dc in dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();
                    for (int i = 0; i < dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorData.ToString()].Rows.Count; i++)
                    {
                        Dictionary<string, string> column = new Dictionary<string, string>();
                        for (int j = 0; j < dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorData.ToString()].Columns.Count; j++)
                        {
                            column.Add(profileScreendisplayErrDataFields[j].ToString(), dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorData.ToString()].Rows[i][j].ToString());
                        }
                        profileScreendisplayErrorData.Add(column);
                    }
                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorData.ToString(), profileScreendisplayErrorData);

                    List<object> profileTemplateRefErrorData = new List<object>();
                    string[] profileTemplateRefErrDataHeaders = (from dc in dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();
                    for (int i = 0; i < dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows.Count; i++)
                    {
                        Dictionary<string, string> column = new Dictionary<string, string>();
                        for (int j = 0; j < dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Columns.Count; j++)
                        {
                            column.Add(profileTemplateRefErrDataFields[j].ToString(), dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i][j].ToString());
                        }
                        profileTemplateRefErrorData.Add(column);
                    }
                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString(), profileTemplateRefErrorData);

                    List<VM_ATPAR_UPLOADED_SUMMARY> profileSummary = new List<VM_ATPAR_UPLOADED_SUMMARY>();

                    for (int i = 0; i < dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows.Count; i++)
                    {
                        VM_ATPAR_UPLOADED_SUMMARY summary = new VM_ATPAR_UPLOADED_SUMMARY();
                        summary.TOTAL_REC_CNT = dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.TOTAL_REC_CNT.ToString()].ToString();
                        summary.FAILURE_CNT = dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.FAILURE_CNT.ToString()].ToString();
                        summary.ADDED_CNT = dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()].ToString();
                        summary.SUCCESS_CNT = dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.SUCCESS_CNT.ToString()].ToString();
                        summary.UPDATED_CNT = dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.UPDATED_CNT.ToString()].ToString();
                        summary.WARNING_CNT = dsProfiledata.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.WARNING_CNT.ToString()].ToString();
                        profileSummary.Add(summary);
                    }

                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.SUMMARY.ToString(), profileSummary);

                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileMenusErrorDataFields.ToString(), profileMenusErrDataFields);
                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileMenusErrorDataHeaders.ToString(), profileMenusErrDataHeaders);

                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileParametersErrorDataFields.ToString(), profileParametersErrDataFields);
                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileParametersErrorDataHeaders.ToString(), profileParametersErrDataHeaders);

                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorDataFields.ToString(), profileScreendisplayErrDataFields);
                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorDataHeaders.ToString(), profileScreendisplayErrDataHeaders);

                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorDataFields.ToString(), profileTemplateRefErrDataFields);
                    dsProfileDictionary.Add(AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorDataHeaders.ToString(), profileTemplateRefErrDataHeaders);
                }
                dsMainDictionary.Add(AtParWebEnums.DataSet_Type.PROFILE.ToString(), dsProfileDictionary);

                Dictionary<string, object> dsOrgGroupDictionary = new Dictionary<string, object>();
                if (dsOrgGroupdata.Tables.Count > 0)
                {
                    List<object> orgGroupErrorData = new List<object>();
                    string[] orgGroupErrDataHeadres = (from dc in dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Columns.Cast<DataColumn>() select dc.ColumnName).ToArray();

                    List<object> lstobj = new List<object>();
                    for (int i = 0; i < dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows.Count; i++)
                    {
                        Dictionary<string, string> rowData = new Dictionary<string, string>();
                        for (int j = 0; j < dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Columns.Count; j++)
                        {
                            rowData.Add(orgGroupErrDataFields[j].ToString(), dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[i][j].ToString());
                        }
                        orgGroupErrorData.Add(rowData);
                    }
                    dsOrgGroupDictionary.Add(AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString(), orgGroupErrorData);

                    List<VM_ATPAR_UPLOADED_SUMMARY> orgGroupSummary = new List<VM_ATPAR_UPLOADED_SUMMARY>();
                    for (int i = 0; i < dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows.Count; i++)
                    {
                        VM_ATPAR_UPLOADED_SUMMARY summary = new VM_ATPAR_UPLOADED_SUMMARY();
                        summary.TOTAL_REC_CNT = dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.TOTAL_REC_CNT.ToString()].ToString();
                        summary.FAILURE_CNT = dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.FAILURE_CNT.ToString()].ToString();
                        summary.ADDED_CNT = dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()].ToString();
                        summary.SUCCESS_CNT = dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.SUCCESS_CNT.ToString()].ToString();
                        summary.UPDATED_CNT = dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.UPDATED_CNT.ToString()].ToString();
                        summary.WARNING_CNT = dsOrgGroupdata.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.WARNING_CNT.ToString()].ToString();
                        orgGroupSummary.Add(summary);
                    }
                    dsOrgGroupDictionary.Add(AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString(), orgGroupSummary);
                    dsOrgGroupDictionary.Add(AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorDataFields.ToString(), orgGroupErrDataFields);
                    dsOrgGroupDictionary.Add(AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorDataHeaders.ToString(), orgGroupErrDataHeadres);
                }

                dsMainDictionary.Add(AtParWebEnums.DataSet_Type.ORG.ToString(), dsOrgGroupDictionary);

                response.AtParSuccess();
                response.DataDictionary = dsMainDictionary;

                return response;

            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
            finally
            {
                var filePath = HttpContext.Current.Server.MapPath(@"~/Uploaded/");
                if (Directory.Exists(filePath))
                {
                    var pathFiles = Directory.GetFiles(filePath);
                    foreach (var file in pathFiles)
                    {
                        File.Delete(file.ToString());
                    }

                    var pathFolders = Directory.GetDirectories(filePath);

                    foreach (var folder in pathFolders)
                    {
                        if (folder.Contains("Upload"))
                        {
                            var folderfiles = Directory.GetFiles(folder);
                            foreach (var folderPathFile in folderfiles)
                            {
                                File.Delete(folderPathFile.ToString());
                            }
                            Directory.Delete(folder);
                        }
                    }

                }
            }
        }

        //private void GetConfigData()
        //{

        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}

        //public AtParWebApiResponse<long> Do_UploadData(string serverUserID, params string[] deviceTokenEntry)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    var response = new AtParWebApiResponse<long>();

        //    try
        //    {
        //        DataSet userData = new DataSet();
        //        long userStatusCode = -1;

        //        if (userData.Tables.Count > 0)
        //        {
        //            userStatusCode = Do_UploadUserData_Flow(serverUserID, userData);
        //        }



        //        //response.DataList = lstUserAllocation;
        //        response.AtParSuccess();
        //        return response;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.AtParException(ex, _commonRepo, _log);
        //        return response;
        //    }
        //}



        //private long Do_UploadUserData_Flow(string serverUserID, DataSet userData)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


        //    string strErrName = string.Empty;
        //    string strLDAPUserIDFilter = string.Empty;
        //    int i = 0;
        //    bool blnLdapConfigNotSet = false;
        //    bool blnChkUserExist = false;
        //    bool blnUpdateParamForExistingLdapUser = false;
        //    bool blnMandatory = false;
        //    StringBuilder sbErrorString = new StringBuilder();
        //    string[] strName = null;
        //    string strPassword = string.Empty;
        //    int intPasswordreq = 0;

        //    //ArrayList arrUserDtls = new ArrayList();
        //    VM_MT_ATPAR_USER_ADD arrUserDtls = new VM_MT_ATPAR_USER_ADD();
        //    IList<MT_ATPAR_USER> lstUsers = null;
        //    AtParWebApiResponse<VM_MT_ATPAR_USER_ADD> lstUserDtls = null;

        //    try
        //    {
        //        if (userData.Tables[AtParWebEnums.Enum_UserData.UserData.ToString()].Rows.Count == 0)
        //        {
        //            return AtparStatusCodes.E_NORECORDFOUND;
        //        }
        //        else
        //        {
        //            DataRow dRow = userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].NewRow();

        //            userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows.Add(dRow);

        //            userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.TOTAL_REC_CNT.ToString()] =
        //                userData.Tables[AtParWebEnums.Enum_UserData.UserData.ToString()].Rows.Count - 2;

        //            userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.SUCCESS_CNT.ToString()] = 0;

        //            userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.FAILURE_CNT.ToString()] = 0;

        //            userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()] = 0;

        //            userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.UPDATED_CNT.ToString()] = 0;

        //        }

        //        strErrName = ValidateUserColumnNames(userData);

        //        if (_log.IsDebugEnabled)
        //        {
        //            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " Invalid Column Name " + strErrName); }

        //        }

        //        if (!string.IsNullOrEmpty(strErrName))
        //        {
        //            userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_NOT_VALID_PARAMETER;
        //        }


        //        //Initializing 
        //        GetConfigData();

        //        List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();

        //        List<string> lstParameters = new List<string>();
        //        lstParameters.Add(AtParWebEnums.LDAPCONFIG.USERID.ToString());

        //        lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();


        //        strLDAPUserIDFilter = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.LDAPCONFIG.ToString() && x.PARAMETER_ID == AtParWebEnums.LDAPCONFIG.USERID.ToString()).Select(x => x.PARAMETER_VALUE).FirstOrDefault();

        //        if (strLDAPUserIDFilter.Trim() == string.Empty)
        //        {
        //            if (_log.IsWarnEnabled)
        //            {
        //                if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "Please set LDAP configuration in Configuration Manager Screen"); }
        //            }
        //            blnLdapConfigNotSet = true;
        //        }



        //        string strUserID = string.Empty;
        //        string strValidInput = string.Empty;
        //        string strProfileID = string.Empty;

        //        DataTable data = userData.Tables[AtParWebEnums.Enum_UserData.UserData.ToString()];

        //        for (i = 0; i < data.Rows.Count; i++)
        //        {
        //            if (data.Rows[i]["UESR_ID"].ToString() == string.Empty)
        //            {
        //                sbErrorString.Append("UserID");
        //                blnMandatory = true;

        //            }
        //            else
        //            {

        //                strUserID = data.Rows[i]["UESR_ID"].ToString().Trim();
        //            }

        //            if (data.Rows[i]["IDLE_TIME"].ToString() == string.Empty)
        //            {
        //                if (sbErrorString.ToString() == string.Empty)
        //                {
        //                    sbErrorString.Append("Idle Time");
        //                }
        //                else
        //                {
        //                    sbErrorString.Append(", Idle Time");
        //                }
        //                blnMandatory = true;
        //            }

        //            if (data.Rows[i]["SESSION_TIME"].ToString() == string.Empty)
        //            {
        //                if (sbErrorString.ToString() == string.Empty)
        //                {
        //                    sbErrorString.Append("Session Time");
        //                }
        //                else
        //                {
        //                    sbErrorString.Append(", Session Time");
        //                }
        //                blnMandatory = true;
        //            }

        //            if (data.Rows[i]["LDAP"].ToString() == string.Empty)
        //            {
        //                if (sbErrorString.ToString() == string.Empty)
        //                {
        //                    sbErrorString.Append("Ldap");
        //                }
        //                else
        //                {
        //                    sbErrorString.Append(", Ldap");
        //                }
        //                blnMandatory = true;
        //            }

        //            if (data.Rows[i]["LDAP"].ToString() == "N")
        //            {
        //                if (data.Rows[i]["USER_DETAIL"].ToString() == string.Empty)
        //                {
        //                    if (sbErrorString.ToString() == string.Empty)
        //                    {
        //                        sbErrorString.Append("First Name and Last Name");
        //                    }
        //                    else
        //                    {
        //                        sbErrorString.Append(", First Name and Last Name");
        //                    }
        //                    blnMandatory = true;
        //                }
        //            }
        //            if (data.Rows[i]["PASS_REQ"].ToString() == "N")
        //            {
        //                if (data.Rows[i]["PASS_REQ"].ToString() == string.Empty)
        //                {
        //                    if (sbErrorString.ToString() == string.Empty)
        //                    {
        //                        sbErrorString.Append("Password");
        //                    }
        //                    else
        //                    {
        //                        sbErrorString.Append(",Password");
        //                    }
        //                    blnMandatory = true;
        //                }
        //            }


        //            if (data.Rows[i]["PROFILE_ID"].ToString() == string.Empty && data.Rows[i]["JOB_ID"].ToString() == string.Empty)
        //            {
        //                if (data.Rows[i]["PROFILE_ID"].ToString() == string.Empty)
        //                {
        //                    if (sbErrorString.ToString() == string.Empty)
        //                    {
        //                        sbErrorString.Append("Profile ID or Job ID");
        //                    }
        //                    else
        //                    {
        //                        sbErrorString.Append(",Profile ID or Job ID");
        //                    }
        //                    blnMandatory = true;
        //                }
        //            }
        //            if (blnMandatory)
        //            {

        //                if (sbErrorString.ToString().Contains(","))
        //                {
        //                    sbErrorString.Append("are Mandatory Fields");
        //                }
        //                else
        //                {
        //                    sbErrorString.Append(" is Mandatory Field");
        //                }
        //                userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = sbErrorString.ToString();

        //                sbErrorString = null;
        //                sbErrorString = new StringBuilder();
        //                blnMandatory = false;
        //                continue;
        //            }
        //            else
        //            {
        //                sbErrorString = null;
        //                sbErrorString = new StringBuilder();

        //            }
        //            strValidInput = ValidateUserData(data.Rows[i]);
        //            if (!string.IsNullOrEmpty(strValidInput))
        //            {
        //                userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = strValidInput;
        //                continue;

        //            }

        //            if (data.Rows[i]["PROFILE_ID"].ToString() == string.Empty)
        //            {
        //                if (userData.Tables[AtParWebEnums.Enum_UserData.ProfileJobRef.ToString()].Select(" JOBID = '" + data.Rows[i]["JOB_ID"].ToString() + "'").Length > 0)
        //                {
        //                    strProfileID = userData.Tables[AtParWebEnums.Enum_UserData.ProfileJobRef.ToString()].Select(" JOBID = '" + data.Rows[i]["JOB_ID"].ToString() + "'")[0].ToString();
        //                }
        //                else
        //                {
        //                    if (_log.IsWarnEnabled)
        //                    {
        //                        if (_log.IsWarnEnabled)
        //                        {
        //                            _log.Warn(methodBaseName + "ProfileID Not Exist, for UserID :" + strUserID + ":and JobID:" + data.Rows[i]["JOB_ID"].ToString() + ":");
        //                        }
        //                    }

        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_NOT_EXIST;
        //                    continue;
        //                }

        //            }
        //            else
        //            {
        //                strProfileID = data.Rows[i]["PROFILE_ID"].ToString();

        //            }



        //            string strProfile = string.Empty;
        //            strProfile = _userUploadRepo.GetProfileID(strProfileID);

        //            if (!string.IsNullOrEmpty(strProfile))
        //            {
        //                strProfileID = strProfile;
        //            }
        //            long StatusCode = -1;

        //            AtParWebApiResponse<MT_ATPAR_USER> resCheckuser = _commonService.CheckUser(strUserID);
        //            StatusCode = resCheckuser.StatusCode;

        //            if (StatusCode == AtparStatusCodes.ATPAR_E_USERALREADYEXISTS)
        //            {
        //                blnChkUserExist = true;

        //                Tuple<long, bool> tpleResult = _userUploadRepo.CheckLDAPUser(strUserID);
        //                if (tpleResult.Item1 == AtparStatusCodes.ATPAR_OK)
        //                {
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "blnLDAPCheck" + tpleResult.Item2); }

        //                        if (tpleResult.Item2 == true)
        //                        {

        //                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Ldap User" + data.Rows[i]["LDAP"].ToString()); }

        //                            if (data.Rows[i]["LDAP"].ToString() == "N")
        //                            {
        //                                userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = "LDAP user can't be converted to normal user ";
        //                                continue;
        //                            }
        //                        }
        //                        else
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Ldap User" + data.Rows[i]["LDAP"].ToString()); }

        //                            if (data.Rows[i]["LDAP"].ToString() == "Y")
        //                            {
        //                                userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = "Normal user  can't be converted to LDAP user ";
        //                                continue;
        //                            }
        //                        }
        //                    }
        //                }


        //                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "User Already Exist, for UserID :" + strUserID + ":"); }
        //            }
        //            else if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //            {
        //                if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from CheckUser is :" + StatusCode + ": for UserID :" + strUserID + ":"); }

        //                userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_CREATION_FAILED;
        //                continue;
        //            }


        //            if (data.Rows[i]["LDAP"].ToString() == "Y")
        //            {
        //                if (blnLdapConfigNotSet == true)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "Please set LDAP configuration in Configuration Manager Screen"); }

        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_LDAP_CONFIG_NOT_SET;
        //                    continue;
        //                }



        //                string intNoofRecordsToFetch = string.Empty;
        //                AtParWebApiResponse<MT_ATPAR_USER> resldapuser = _commonService.GetLdapUsers(serverUserID, strLDAPUserIDFilter + "=" + strUserID, intNoofRecordsToFetch);

        //                StatusCode = resldapuser.StatusCode;
        //                if (StatusCode == AtparStatusCodes.ATPAR_E_USERALREADYEXISTS)
        //                {
        //                    if (blnChkUserExist)
        //                    {
        //                        blnUpdateParamForExistingLdapUser = true;
        //                        arrUserDtls.USER_ID = strUserID.ToUpper();
        //                        arrUserDtls.PASSHASH_REQUIRED = false;
        //                        arrUserDtls.FIRST_NAME = string.Empty;
        //                        arrUserDtls.LAST_NAME = string.Empty;
        //                        arrUserDtls.MIDDLE_INITIAL = string.Empty;
        //                        arrUserDtls.EMAIL_ID = string.Empty;
        //                        arrUserDtls.PHONE1 = string.Empty;
        //                        arrUserDtls.PHONE2 = string.Empty;
        //                        arrUserDtls.FAX = string.Empty;
        //                        arrUserDtls.PAGER = string.Empty;
        //                        arrUserDtls.PROFILE_ID = strProfileID;
        //                        arrUserDtls.LDAP_USER = "Y";
        //                        arrUserDtls.LDAP_ROLE = string.Empty;
        //                        arrUserDtls.LDAP_ORG = string.Empty;
        //                        arrUserDtls.CREATE_USER_ID = string.Empty;
        //                        //arrUserDtls. = string.Empty;
        //                        arrUserDtls.SESSIONEXPIRY = data.Rows[i]["SESSION_TIME"].ToString();
        //                        // arrUserDtls.PASSHASH_REQUIRED = true;
        //                        arrUserDtls.TIME_RESTRICTIONS = "1-12:00,23:59;2-12:00,23:59;3-12:00,23:59;4-12:00,23:59;5-12:00,23:59;6-12:00,23:59;7-12:00,23:59;";
        //                        arrUserDtls.IDLE_TIME = Convert.ToInt32(data.Rows[i]["IDLE_TIME"].ToString());
        //                        arrUserDtls.PASSWD_RESET_REQUIRED = "N";
        //                        //arrUserDtls. = string.Empty;
        //                        //arrUserDtls. = string.Empty;
        //                        arrUserDtls.ORG_GROUP_ID = data.Rows[i]["ORG_GROUP"].ToString();
        //                        arrUserDtls.ACCOUNT_DISABLED = false;
        //                        //arrUserDtls. = string.Empty;
        //                    }
        //                    else
        //                    {
        //                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "UserID Not Existing on LDAP for :" + strUserID + ":"); }
        //                        userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = strUserID + "Not Existing on LDAP";
        //                        continue;

        //                    }

        //                }
        //                else if (StatusCode == AtparStatusCodes.E_NORECORDFOUND)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from GetLdapUsers is :" + StatusCode + ":for UserID :" + strUserID + ":"); }

        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_INVALID_LDAPID;
        //                    continue;
        //                }
        //                else if (StatusCode == AtparStatusCodes.E_REMOTEERROR)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "Please set LDAP configuration in Configuration Manager Screen"); }

        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_CREATION_FAILED;
        //                    continue;
        //                }
        //                else if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from GetLdapUsers is :" + StatusCode + ":for UserID :" + strUserID + ":"); }

        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_CREATION_FAILED;
        //                    continue;
        //                }


        //                lstUsers = resldapuser.DataList;

        //                if (blnUpdateParamForExistingLdapUser == false)
        //                {
        //                    if (lstUsers != null && lstUsers.Count > 0)
        //                    {
        //                        arrUserDtls.USER_ID = strUserID.ToUpper();
        //                        arrUserDtls.PASSHASH_REQUIRED = true;
        //                        arrUserDtls.FIRST_NAME = lstUsers[0].FIRST_NAME;
        //                        arrUserDtls.LAST_NAME = lstUsers[0].LAST_NAME;
        //                        arrUserDtls.MIDDLE_INITIAL = lstUsers[0].MIDDLE_INITIAL;
        //                        arrUserDtls.EMAIL_ID = lstUsers[0].EMAIL_ID;
        //                        arrUserDtls.PHONE1 = lstUsers[0].PHONE1;
        //                        arrUserDtls.PHONE2 = string.Empty;
        //                        arrUserDtls.FAX = lstUsers[0].FAX;
        //                        arrUserDtls.PAGER = string.Empty;
        //                        arrUserDtls.PROFILE_ID = strProfileID;
        //                        arrUserDtls.LDAP_USER = "Y";
        //                        arrUserDtls.LDAP_ROLE = string.Empty;
        //                        arrUserDtls.LDAP_ORG = string.Empty;
        //                        arrUserDtls.CREATE_USER_ID = string.Empty;
        //                        //arrUserDtls. = string.Empty;
        //                        arrUserDtls.SESSIONEXPIRY = data.Rows[i]["SESSION_TIME"].ToString();
        //                        //arrUserDtls.PASSHASH_REQUIRED = false;
        //                        arrUserDtls.TIME_RESTRICTIONS = "1-12:00,23:59;2-12:00,23:59;3-12:00,23:59;4-12:00,23:59;5-12:00,23:59;6-12:00,23:59;7-12:00,23:59;";
        //                        arrUserDtls.IDLE_TIME = Convert.ToInt32(data.Rows[i]["IDLE_TIME"].ToString());
        //                        arrUserDtls.PASSWD_RESET_REQUIRED = "N";
        //                        //arrUserDtls. = string.Empty;
        //                        //arrUserDtls. = string.Empty;
        //                        arrUserDtls.ORG_GROUP_ID = data.Rows[i]["ORG_GROUP"].ToString();
        //                        arrUserDtls.ACCOUNT_DISABLED = false;
        //                        //arrUserDtls. = string.Empty;
        //                        arrUserDtls.PAGER = lstUsers[0].PAGER;

        //                        if (blnChkUserExist == false)
        //                        {

        //                            lstUserDtls = _commonService.AddUser(arrUserDtls);

        //                            StatusCode = lstUserDtls.StatusCode;
        //                            if (StatusCode == AtparStatusCodes.ATPAR_E_USERALREADYEXISTS)
        //                            {
        //                                //arrUserDtls.Clear();
        //                                lstUsers.Clear();

        //                                if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "User Already Exist, for UserID : " + strUserID + ":"); }

        //                                userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_EXIST;
        //                                continue;

        //                            }
        //                            else if (StatusCode == AtparStatusCodes.ATPAR_E_PROFILE_NOT_EXIST)
        //                            {
        //                                //arrUserDtls.Clear();
        //                                lstUsers.Clear();
        //                                if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "ProfileID Not Exist, for UserID : " + strUserID + ": and ProfileID :" + strProfileID + ":"); }

        //                                userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_NOT_EXIST;
        //                                continue;

        //                            }

        //                            else if (StatusCode == AtparStatusCodes.ATPAR_E_ORG_NOT_EXIST)
        //                            {
        //                                //arrUserDtls.Clear();
        //                                lstUsers.Clear();
        //                                if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "Org GroupID Not Exist, for UserID  : " + strUserID + ": and Org GroupID :" + data.Rows[i]["LDAP"].ToString() + ":"); }

        //                                userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_ORG_NOT_EXIST;
        //                                continue;

        //                            }
        //                            else if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //                            {
        //                                //arrUserDtls.Clear();
        //                                lstUsers.Clear();
        //                                if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from AddUser is: " + StatusCode + ": for UserID  :" + strUserID + ":"); }

        //                                userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_CREATION_FAILED;
        //                                continue;

        //                            }
        //                            else if (StatusCode == AtparStatusCodes.ATPAR_OK)
        //                            {
        //                                //arrUserDtls.Clear();
        //                                lstUsers.Clear();

        //                                userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()] += "1";
        //                            }

        //                        }
        //                    }
        //                }
        //            }

        //            else
        //            {
        //                if (data.Rows[i]["USER_DETAIL"].ToString() == string.Empty)
        //                {
        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = "First Name,Last Name are Mandatory";
        //                    continue;
        //                }
        //                else
        //                {
        //                    strName = (data.Rows[i]["USER_DETAIL"].ToString().Split(','));
        //                    if (strName.Length < 2)
        //                    {
        //                        userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = "First Name,Last Name are Mandatory";
        //                        continue;
        //                    }
        //                }
        //                if (data.Rows[i]["PASS_REQ"].ToString() == "Y")
        //                {
        //                    intPasswordreq = 1;

        //                    if (data.Rows[i]["PASS_LDAP"].ToString() == string.Empty)
        //                    {
        //                        userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = "Password is not provided";
        //                        continue;
        //                    }
        //                    else
        //                    {
        //                        strPassword = data.Rows[i]["PASS_LDAP"].ToString();
        //                    }
        //                }
        //                else
        //                {
        //                    strPassword = string.Empty;
        //                    intPasswordreq = 0;
        //                }

        //                arrUserDtls.USER_ID = strUserID.ToUpper();
        //                //arrUserDtls.PASSHASH_REQUIRED = strPassword;
        //                arrUserDtls.FIRST_NAME = strName[0];
        //                arrUserDtls.LAST_NAME = strName[1];

        //                if (strName.Length > 2)
        //                {
        //                    arrUserDtls.MIDDLE_INITIAL = strName[2];
        //                }
        //                else
        //                {
        //                    arrUserDtls.MIDDLE_INITIAL = string.Empty;
        //                }

        //                arrUserDtls.EMAIL_ID = string.Empty;
        //                arrUserDtls.PHONE1 = string.Empty;
        //                arrUserDtls.PHONE2 = string.Empty;
        //                arrUserDtls.FAX = string.Empty;
        //                arrUserDtls.PAGER = string.Empty;
        //                arrUserDtls.PROFILE_ID = strProfileID;
        //                arrUserDtls.LDAP_USER = "N";
        //                arrUserDtls.LDAP_ROLE = string.Empty;
        //                arrUserDtls.LDAP_ORG = string.Empty;
        //                arrUserDtls.CREATE_USER_ID = string.Empty;
        //                //arrUserDtls.EMPTY = string.Empty;
        //                arrUserDtls.SESSIONEXPIRY = data.Rows[i]["SESSION_TIME"].ToString();
        //                //arrUserDtls.PASSHASH_REQUIRED = false;
        //                arrUserDtls.TIME_RESTRICTIONS = "1-12:00,23:59;2-12:00,23:59;3-12:00,23:59;4-12:00,23:59;5-12:00,23:59;6-12:00,23:59;7-12:00,23:59;";
        //                arrUserDtls.IDLE_TIME = Convert.ToInt32(data.Rows[i]["IDLE_TIME"].ToString());
        //                if (data.Rows[i]["PASS_REQ"].ToString() == "Y")
        //                {
        //                    //arrUserDtls.PASSWD_RESET_REQUIRED = "N";
        //                }
        //                else
        //                {
        //                    arrUserDtls.PASSWD_RESET_REQUIRED = "N";
        //                }

        //                //arrUserDtls. = string.Empty;
        //                //arrUserDtls. = string.Empty;
        //                arrUserDtls.ORG_GROUP_ID = data.Rows[i]["ORG_GROUP"].ToString();
        //                //arrUserDtls.ACCOUNT_DISABLED = false;
        //                //arrUserDtls. = string.Empty;

        //                if (blnChkUserExist == false)
        //                {
        //                    lstUserDtls = _commonService.AddUser(arrUserDtls);

        //                    StatusCode = lstUserDtls.StatusCode;
        //                    if (StatusCode == AtparStatusCodes.ATPAR_E_USERALREADYEXISTS)
        //                    {
        //                        //arrUserDtls.Clear();
        //                        lstUsers.Clear();

        //                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "User Already Exist, for UserID : " + strUserID + ":"); }

        //                        userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_EXIST;
        //                        continue;

        //                    }
        //                    else if (StatusCode == AtparStatusCodes.ATPAR_E_PROFILE_NOT_EXIST)
        //                    {
        //                        //arrUserDtls.Clear();
        //                        lstUsers.Clear();
        //                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "ProfileID Not Exist, for UserID : " + strUserID + ": and ProfileID :" + strProfileID + ":"); }

        //                        userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_NOT_EXIST;
        //                        continue;

        //                    }

        //                    else if (StatusCode == AtparStatusCodes.ATPAR_E_ORG_NOT_EXIST)
        //                    {
        //                        //arrUserDtls.Clear();
        //                        lstUsers.Clear();
        //                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "Org GroupID Not Exist, for UserID  : " + strUserID + ": and Org GroupID :" + data.Rows[i]["LDAP"].ToString() + ":"); }

        //                        userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_ORG_NOT_EXIST;
        //                        continue;

        //                    }
        //                    else if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //                    {
        //                        //arrUserDtls.Clear();
        //                        lstUsers.Clear();
        //                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from AddUser is: " + StatusCode + ": for UserID  :" + strUserID + ":"); }

        //                        userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_CREATION_FAILED;
        //                        continue;

        //                    }
        //                    else if (StatusCode == AtparStatusCodes.ATPAR_OK)
        //                    {
        //                        //arrUserDtls.Clear();
        //                        lstUsers.Clear();

        //                        userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()] += "1";
        //                    }

        //                }
        //            }
        //            if (blnChkUserExist == true)
        //            {
        //                StatusCode = _userUploadRepo.Do_UpdateLoadedUser(arrUserDtls, data.Rows[i], blnUpdateParamForExistingLdapUser);
        //                //arrUserDtls.Clear();

        //                if (StatusCode == AtparStatusCodes.ATPAR_E_ORG_NOT_EXIST)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "Org GroupID Not Exist, for UserID : " + strUserID + ": and Org GroupID :" + data.Rows[i]["MIDDLE_INITIAL"].ToString() + ":"); }

        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_UPDATION_FAILED_ORG_NOT_EXIST;
        //                    continue;

        //                }

        //                else if (StatusCode != AtparStatusCodes.ATPAR_E_PROFILE_NOT_EXIST)
        //                {

        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "ProfileID Not Exist, for UserID : " + strUserID + ": and ProfileID :" + strProfileID + ":"); }

        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_UPDATION_FAILED_PROFILE_NOT_EXIST;
        //                    continue;

        //                }
        //                else if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //                {

        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "User Updation Failed, for UserID : " + strUserID + ":"); }

        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_UPDATION_FAILED;
        //                    continue;

        //                }

        //                else if (StatusCode == AtparStatusCodes.ATPAR_OK)
        //                {
        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_UPDATION_SUCESS;

        //                    userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[i][AtParWebEnums.Enum_Upload_Summary.UPDATED_CNT.ToString()] += "1";

        //                }

        //            }
        //            if (blnChkUserExist == false)
        //            {
        //                StatusCode = _userUploadRepo.SetUserParam(data.Rows[i], strUserID, string.Empty, serverUserID);

        //                if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //                {

        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_PARAM_CREATION_FAILED;

        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from SetUserParam is : " + StatusCode + ": for UserID :" + strUserID + ":"); }

        //                    StatusCode = _userUploadRepo.DeleteUserParams(strUserID);

        //                    if (StatusCode == AtparStatusCodes.ATPAR_OK)
        //                    {
        //                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from DeleteUserParams is : " + StatusCode + ": for UserID :" + strUserID + ":"); }

        //                    }
        //                    else
        //                    {
        //                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from DeleteUserParams is : " + StatusCode + ": for UserID :" + strUserID + ":"); }
        //                        continue;
        //                    }

        //                }
        //                else
        //                {
        //                    userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_USER_CREATION_SUCESS;

        //                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "User Created Successfully, for UserID : " + strUserID + ":"); }

        //                }
        //            }
        //        }


        //        userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.SUCCESS_CNT.ToString()] = userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()].ToString() +
        //        userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.UPDATED_CNT.ToString()].ToString();

        //        userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.FAILURE_CNT.ToString()] = userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.TOTAL_REC_CNT.ToString()].ToString() +
        //        userData.Tables[AtParWebEnums.Enum_UserData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.SUCCESS_CNT.ToString()].ToString();

        //        userData.AcceptChanges();


        //        for (i = userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows.Count - 1; i >= 0; i += -1)
        //        {
        //            if (userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"].ToString() == AtParDefns.CONST_USER_CREATION_SUCESS || userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i]["ERROR_MESSAGE"].ToString() == AtParDefns.CONST_USER_UPDATION_SUCESS)
        //            {
        //                userData.Tables[AtParWebEnums.Enum_UserData.UserErrorData.ToString()].Rows[i].Delete();
        //            }
        //        }
        //        userData.AcceptChanges();
        //        return AtparStatusCodes.ATPAR_OK;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //}
        //private void GetConfigData()
        //{

        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name;
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        var objCls = new Utilities();
        //        objCls.InitializeAtParSystem();

        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}
        //public string ValidateUserColumnNames(DataSet pdsUserData)
        //{

        //    string strErrMsg = string.Empty;
        //    string strName = string.Empty;
        //    try
        //    {
        //        foreach (DataColumn dc in pdsUserData.Tables[AtParWebEnums.Enum_UserData.UserData.ToString()].Columns)
        //        {
        //            strName = dc.ColumnName.ToString();

        //            if (strName == "USER_ID" || strName == "LOC_ID" || strName == "B_UNIT" || strName == "USER_DETAIL" || strName == "ORG_GROUP" || strName == "LDAP" || strName == "PASS_REQ" || strName == "PASS_RESET" || strName == "PASS_LDAP" || strName == "IDLE_TIME" || strName == "SESSION_TIME" || strName == "PROFILE_ID" || strName == "JOB_ID")
        //            {
        //                continue;
        //            }
        //            else
        //            {
        //                strName = strName.Substring(strName.IndexOf("_") + 1);

        //                if (!Enum.IsDefined(typeof(AtParWebEnums.AppParameters_Enum), strName))
        //                {
        //                    strErrMsg = " Parameter ID :" + strName + " is not defined in atpar application parameters enum ";

        //                    return strErrMsg;
        //                }
        //            }
        //        }
        //        return strName;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        //public string ValidateUserData(DataRow dr)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    string strCtrlText = string.Empty;
        //    string strErrMsg = string.Empty;
        //    string strValid = string.Empty;
        //    string strChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //    string strNumbers = "0123456789";
        //    string ch = string.Empty;
        //    string strYN = "YN";
        //    string[] strName = null;

        //    try
        //    {
        //        strCtrlText = dr["USER_ID"].ToString().Trim();
        //        if (strCtrlText == "admin")
        //        {
        //            strErrMsg = "You are not authorised to change the user " + strCtrlText;
        //            if (_log.IsDebugEnabled)
        //            {
        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }

        //            }
        //            return strErrMsg;
        //        }

        //        if (strCtrlText.ToString().StartsWith("_"))
        //        {
        //            strErrMsg = "Underscore is not allowed as a first character in User ID , User Creation Failed for UserID " + dr[0].ToString();

        //            if (_log.IsDebugEnabled)
        //            {
        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }

        //            }
        //            return strErrMsg;
        //        }

        //        strValid = strChars + strNumbers + "_";
        //        for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //        {
        //            ch = strCtrlText[i].ToString();
        //            if (strValid.IndexOf(ch) == -1)
        //            {
        //                strErrMsg = " Only characters, numbers or underscore is allowed in User ID , User Creation Failed for UserID  " + dr[0].ToString();
        //                if (_log.IsDebugEnabled)
        //                {
        //                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                }
        //                return strErrMsg;
        //            }

        //        }

        //        if (dr["LDAP"].ToString() == "N")
        //        {
        //            strName = (dr["USER_DETAIL"].ToString().Split(','));

        //            if (strName.Length < 2)
        //            {
        //                strErrMsg = " First Name and Last Name are Mandatory " + dr[0].ToString();

        //                if (_log.IsDebugEnabled)
        //                {
        //                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                }
        //                return strErrMsg;
        //            }

        //            strCtrlText = strName[0].ToString();
        //            strValid = strChars + strNumbers + "_";
        //            for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //            {
        //                ch = strCtrlText[i].ToString();

        //                if (strValid.IndexOf(ch) == -1)
        //                {
        //                    strErrMsg = " Only characters, numbers or underscore is allowed in first name , User Creation Failed for UserID  " + dr[0].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }

        //            strCtrlText = strName[1].ToString();
        //            strValid = strChars + strNumbers + "_";
        //            for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //            {
        //                ch = strCtrlText[i].ToString();

        //                if (strValid.IndexOf(ch) == -1)
        //                {
        //                    strErrMsg = " Only characters, numbers or underscore is allowed in last name , User Creation Failed for UserID  " + dr[0].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }

        //            strCtrlText = dr["PASS_REQ"].ToString().Trim();
        //            if (strCtrlText == string.Empty)
        //            {
        //                strErrMsg = " Enter Y Or N,If Ldap User is N in Password Required Field , User Creation Failed for UserID  " + dr[0].ToString();
        //                if (_log.IsDebugEnabled)
        //                {
        //                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                }
        //                return strErrMsg;
        //            }


        //            strCtrlText = dr["PASS_RESET"].ToString().Trim();
        //            if (strCtrlText == string.Empty)
        //            {
        //                strErrMsg = " Enter Y Or N,If Ldap User is N in Password Reset Required Field , User Creation Failed for UserID  " + dr[0].ToString();
        //                if (_log.IsDebugEnabled)
        //                {
        //                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                }
        //                return strErrMsg;
        //            }

        //        }
        //        strCtrlText = dr["ORG_GROUP"].ToString().Trim();
        //        if (!string.IsNullOrEmpty(strCtrlText))
        //        {
        //            if (strCtrlText.StartsWith("_"))
        //            {
        //                strErrMsg = " Underscore is not allowed as a first character in Org Group ID  , User Creation Failed for UserID " + dr[0].ToString();
        //                if (_log.IsDebugEnabled)
        //                {
        //                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                }
        //                return strErrMsg;
        //            }
        //            strValid = strChars + strNumbers + "_";
        //            for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //            {
        //                ch = strCtrlText[i].ToString();

        //                if (strValid.IndexOf(ch) == -1)
        //                {
        //                    strErrMsg = " Only characters, numbers or underscore is allowed Org Group ID  , User Creation Failed for UserID  " + dr[0].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }
        //        }

        //        strCtrlText = dr["LDAP"].ToString().Trim();
        //        strValid = strYN;
        //        for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //        {
        //            ch = strCtrlText[i].ToString();

        //            if (strValid.IndexOf(ch) == -1)
        //            {
        //                strErrMsg = "  Only Y or N is allowed in Ldap User , User Creation Failed for UserID " + dr[0].ToString();
        //                if (_log.IsDebugEnabled)
        //                {
        //                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                }
        //                return strErrMsg;
        //            }
        //        }

        //        strCtrlText = dr["PASS_REQ"].ToString().Trim();
        //        if (!string.IsNullOrEmpty(strCtrlText))
        //        {
        //            strValid = strYN;
        //            for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //            {
        //                ch = strCtrlText[i].ToString();

        //                if (strValid.IndexOf(ch) == -1)
        //                {
        //                    strErrMsg = "  Only Y or N is allowed in Password Required filed , User Creation Failed for UserID " + dr[0].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }
        //        }

        //        strCtrlText = dr["PASS_RESET"].ToString().Trim();
        //        if (!string.IsNullOrEmpty(strCtrlText))
        //        {
        //            strValid = strYN;
        //            for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //            {
        //                ch = strCtrlText[i].ToString();

        //                if (strValid.IndexOf(ch) == -1)
        //                {
        //                    strErrMsg = "Only Y or N is allowed in Password Reset Required filed , User Creation Failed for UserID " + dr[0].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }
        //        }

        //        strCtrlText = dr["IDLE_TIME"].ToString().Trim();
        //        if (strCtrlText.Length - 1 > 3)
        //        {
        //            strErrMsg = strErrMsg + "Maximum Length of Idle Time is 4 , User Creation Failed for UserID " + dr[0].ToString();
        //            if (_log.IsDebugEnabled)
        //            {
        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }
        //            return strErrMsg;
        //        }
        //        else if (strCtrlText == "0")
        //        {
        //            strErrMsg = strErrMsg + "Idle Time must be greater than 0 , User Creation Failed for UserID " + dr[0].ToString();
        //            if (_log.IsDebugEnabled)
        //            {
        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }
        //            return strErrMsg;
        //        }
        //        else
        //        {
        //            for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //            {
        //                ch = strCtrlText[i].ToString();

        //                if (strNumbers.IndexOf(ch) == -1)
        //                {
        //                    strErrMsg = strErrMsg + "Only numbers are allowed in Idle Time , User Creation Failed for UserID " + dr[0].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }
        //        }
        //        strCtrlText = dr["SESSION_TIME"].ToString().Trim();
        //        if (strCtrlText.Length - 1 > 3)
        //        {
        //            strErrMsg = strErrMsg + "Maximum Length of Session Time is 4 , User Creation Failed for UserID " + dr[0].ToString();
        //            if (_log.IsDebugEnabled)
        //            {
        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }
        //            return strErrMsg;
        //        }
        //        else if (strCtrlText == "0")
        //        {
        //            strErrMsg = strErrMsg + "Session Validity Time must be greater than 0 , User Creation Failed for UserID " + dr[0].ToString();
        //            if (_log.IsDebugEnabled)
        //            {
        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }
        //            return strErrMsg;
        //        }
        //        else
        //        {
        //            for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //            {
        //                ch = strCtrlText[i].ToString();

        //                if (strNumbers.IndexOf(ch) == -1)
        //                {
        //                    strErrMsg = strErrMsg + "Only numbers are allowed in Session Time , User Creation Failed for UserID " + dr[0].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }
        //        }


        //        strCtrlText = dr["PROFILE_ID"].ToString().Trim();
        //        if (strCtrlText.StartsWith("_"))
        //        {
        //            strErrMsg = strErrMsg + "Underscore is not allowed as a first character in Profile ID  , User Creation Failed for UserID " + dr[0].ToString();
        //            if (_log.IsDebugEnabled)
        //            {
        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }
        //            return strErrMsg;
        //        }

        //        strValid = strChars + strNumbers + "_" + "-";
        //        for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //        {
        //            ch = strCtrlText[i].ToString();
        //            if (strValid.IndexOf(ch) == -1)
        //            {
        //                strErrMsg = " Only characters, numbers or underscore and" + "_" + " is allowed in Profile ID , User Creation Failed for UserID  " + dr[0].ToString();
        //                if (_log.IsDebugEnabled)
        //                {
        //                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                }
        //                return strErrMsg;
        //            }
        //        }

        //        strCtrlText = dr["JOB_ID"].ToString().Trim();
        //        if (strCtrlText.StartsWith("_"))
        //        {
        //            strErrMsg = strErrMsg + "Underscore is not allowed as a first character in JOB ID  , User Creation Failed for UserID " + dr[0].ToString();
        //            if (_log.IsDebugEnabled)
        //            {
        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }
        //            return strErrMsg;
        //        }
        //        strValid = strChars + strNumbers + "_";
        //        for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //        {
        //            ch = strCtrlText[i].ToString();
        //            if (strValid.IndexOf(ch) == -1)
        //            {
        //                strErrMsg = " Only characters, numbers or underscore is allowed in JOB ID , User Creation Failed for UserID  " + dr[0].ToString();
        //                if (_log.IsDebugEnabled)
        //                {
        //                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                }
        //                return strErrMsg;
        //            }
        //        }


        //        if (dr.Table.Columns.Contains("15_MENU_ACCESS"))
        //        {
        //            strCtrlText = dr["15_MENU_ACCESS"].ToString().Trim();
        //            if (string.IsNullOrEmpty(strCtrlText))
        //            {
        //                strErrMsg = "Menu Access is Mandatory: " + dr["15_MENU_ACCESS"].ToString();
        //                if (_log.IsDebugEnabled)
        //                {
        //                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                }
        //                return strErrMsg;
        //            }
        //        }


        //        if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount.ToString() + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_ID.ToString()))
        //        {
        //            strCtrlText = dr[AtParWebEnums.EnumApps.CartCount.ToString() + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_ID.ToString()].ToString().Trim();

        //            if (!string.IsNullOrEmpty(strCtrlText))
        //            {
        //                strValid = strChars + strNumbers + "_";

        //                for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //                {
        //                    ch = strCtrlText[i].ToString();
        //                    if (strValid.IndexOf(ch) == -1)
        //                    {
        //                        strErrMsg = " Only characters, numbers or underscore is allowed Requestor:  " + dr[AtParWebEnums.EnumApps.CartCount.ToString() + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_ID.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }

        //                if (strCtrlText.Length > 50)
        //                {
        //                    strErrMsg = " Number of characters cannot be more than 50 For Parameter Requestor ID :  " + dr[AtParWebEnums.EnumApps.CartCount.ToString() + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_ID.ToString()].ToString();

        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }
        //        }

        //        if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving.ToString() + "_" + AtParWebEnums.AppParameters_Enum.PRINTER_ADDRESS.ToString()))
        //        {
        //            strCtrlText = dr[AtParWebEnums.EnumApps.Receiving.ToString() + "_" + AtParWebEnums.AppParameters_Enum.PRINTER_ADDRESS.ToString()].ToString().Trim();

        //            if (!string.IsNullOrEmpty(strCtrlText))
        //            {
        //                strValid = strChars + strNumbers + "_";

        //                for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //                {
        //                    ch = strCtrlText[i].ToString();
        //                    if (strValid.IndexOf(ch) == -1)
        //                    {
        //                        strErrMsg = " Only characters, numbers or underscore is allowed Printer Address :  " + dr[AtParWebEnums.EnumApps.Receiving.ToString() + "_" + AtParWebEnums.AppParameters_Enum.PRINTER_ADDRESS.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //        }
        //        if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.StockIssue.ToString() + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_COMPANY.ToString()))
        //        {
        //            strCtrlText = dr[AtParWebEnums.EnumApps.StockIssue.ToString() + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_COMPANY.ToString()].ToString().Trim();

        //            if (!string.IsNullOrEmpty(strCtrlText))
        //            {
        //                strValid = strChars + strNumbers + "_";

        //                for (int i = 0; i <= strCtrlText.Length - 1; i++)
        //                {
        //                    ch = strCtrlText[i].ToString();
        //                    if (strValid.IndexOf(ch) == -1)
        //                    {
        //                        strErrMsg = " Only characters, numbers or underscore is allowed Default Company :  " + dr[AtParWebEnums.EnumApps.StockIssue.ToString() + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_COMPANY.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //        }

        //        return strErrMsg;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        //private long Do_UploadProfileData_Flow(string serverUserID, DataSet profileData)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    string strErrMsg = string.Empty;
        //    string strCtrlText = string.Empty;
        //    string strProfileID = string.Empty;
        //    string strProfileDescr = string.Empty;
        //    string strProfileTemplateID = string.Empty;
        //    string strParameterTemplateID = string.Empty;
        //    string strMenuTemplateID = string.Empty;
        //    string strScreenDisplayTemplateID = string.Empty;
        //    string strAccess = string.Empty;
        //    bool blnValidateScreenDisplayData = false;
        //    bool blnValidateMenuData = false;
        //    bool blnValidData = false;
        //    bool blnValidateParameters = false;
        //    string strProfileTemplateRefError = string.Empty;
        //    int intProfileCountExists = 0;
        //    string strMode = string.Empty;

        //    string strErrName = string.Empty;
        //    string strLDAPUserIDFilter = string.Empty;

        //    bool blnLdapConfigNotSet = false;
        //    bool blnChkUserExist = false;
        //    bool blnUpdateParamForExistingLdapUser = false;
        //    bool blnMandatory = false;
        //    StringBuilder sbErrorString = new StringBuilder();
        //    string[] strName = null;
        //    string strPassword = string.Empty;
        //    int intPasswordreq = 0;

        //    //ArrayList arrUserDtls = new ArrayList();
        //    VM_MT_ATPAR_USER_ADD arrUserDtls = new VM_MT_ATPAR_USER_ADD();
        //    IList<MT_ATPAR_USER> lstUsers = null;
        //    AtParWebApiResponse<VM_MT_ATPAR_USER_ADD> lstUserDtls = null;
        //    DataSet dsSaveDataset = new DataSet();
        //    bool blnChangeProfileClienttoServer = false;

        //    try
        //    {
        //        if (profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRef.ToString()].Rows.Count == 0)
        //        {
        //            return AtparStatusCodes.E_NORECORDFOUND;
        //        }
        //        else
        //        {
        //            DataRow dRow = profileData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].NewRow();

        //            profileData.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows.Add(dRow);

        //            profileData.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.TOTAL_REC_CNT.ToString()] =
        //                profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRef.ToString()].Rows.Count;

        //            profileData.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.SUCCESS_CNT.ToString()] = 0;

        //            profileData.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.FAILURE_CNT.ToString()] = 0;

        //            profileData.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()] = 0;

        //            profileData.Tables[AtParWebEnums.Enum_ProfileData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.UPDATED_CNT.ToString()] = 0;

        //        }


        //        DataTable data = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRef.ToString()];

        //        for (int i = 0; i < data.Rows.Count; i++)
        //        {
        //            if (data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.ProfileID.ToString()].ToString().Trim() == string.Empty)
        //            {
        //                if (sbErrorString.ToString() == string.Empty)
        //                {
        //                    sbErrorString.Append("ProfileID");
        //                }
        //                else
        //                {
        //                    blnMandatory = true;
        //                }
        //            }


        //            if (data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.Description.ToString()].ToString() == string.Empty)
        //            {
        //                if (sbErrorString.ToString() == string.Empty)
        //                {
        //                    sbErrorString.Append("Description");
        //                }
        //                else
        //                {
        //                    sbErrorString.Append(", Description");
        //                }
        //                blnMandatory = true;
        //            }

        //            if (data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.ProfileTemplateID.ToString()].ToString() == string.Empty)
        //            {
        //                if (sbErrorString.ToString() == string.Empty)
        //                {
        //                    sbErrorString.Append("ProfileTemplateID");
        //                }
        //                else
        //                {
        //                    sbErrorString.Append(", ProfileTemplateID");
        //                }
        //                blnMandatory = true;
        //            }

        //            if (data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.ScreenDisplayTemplateID.ToString()].ToString() == string.Empty)
        //            {
        //                if (sbErrorString.ToString() == string.Empty)
        //                {
        //                    sbErrorString.Append("ScreenDisplayTemplateID");
        //                }
        //                else
        //                {
        //                    sbErrorString.Append(", ScreenDisplayTemplateID");
        //                }
        //                blnMandatory = true;
        //            }

        //            if (data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.MenuAccessTemplateID.ToString()].ToString() == string.Empty)
        //            {
        //                if (sbErrorString.ToString() == string.Empty)
        //                {
        //                    sbErrorString.Append("MenuAccessTemplateID");
        //                }
        //                else
        //                {
        //                    sbErrorString.Append(", MenuAccessTemplateID");
        //                }
        //                blnMandatory = true;

        //            }
        //            if (data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.ProfileParameterTemplateID.ToString()].ToString() == string.Empty)
        //            {

        //                if (sbErrorString.ToString() == string.Empty)
        //                {
        //                    sbErrorString.Append("ProfileParameterTemplateID");
        //                }
        //                else
        //                {
        //                    sbErrorString.Append(",ProfileParameterTemplateID");
        //                }
        //                blnMandatory = true;

        //            }
        //            if (blnMandatory)
        //            {
        //                sbErrorString.Append("is/are Mandatory Field");
        //                profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = sbErrorString.ToString();
        //                sbErrorString = null;
        //                sbErrorString = new StringBuilder();
        //                blnMandatory = false;
        //            }
        //            else
        //            {
        //                sbErrorString = null;
        //                sbErrorString = new StringBuilder();
        //            }

        //            strCtrlText = data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.ProfileID.ToString()].ToString().Trim();

        //            if (strCtrlText == "admin")
        //            {
        //                strErrMsg = "You are not authorised to change the profile " + strCtrlText;

        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }

        //            if (strCtrlText.Length > 50)
        //            {
        //                strErrMsg = "Number of characters cannot be more than 50 for Profile ID " + data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.ProfileID.ToString()].ToString();

        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }
        //            else if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z0-9_-]+$"))
        //            {
        //                strErrMsg = "Profile ID - Use only letters (a-z), numbers (0-9), the underscore (_), and -";

        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }


        //            strCtrlText = data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.Description.ToString()].ToString().Trim();


        //            strCtrlText = strCtrlText.Replace(" ", "");
        //            if (strCtrlText.Length > 50)
        //            {
        //                if (!string.IsNullOrEmpty(strErrMsg))
        //                {
        //                    strErrMsg = strErrMsg + "," + "Number of characters cannot be more than 50 for Profile Description " + data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.Description.ToString()].ToString();
        //                }
        //                else
        //                {
        //                    strErrMsg = "Number of characters cannot be more than 50 for Profile Description " + data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.Description.ToString()].ToString();
        //                }

        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }
        //            else if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z0-9_-]+$"))
        //            {
        //                if (!string.IsNullOrEmpty(strErrMsg))
        //                {
        //                    strErrMsg = strErrMsg + "," + "Profile Description - Use only letters (a-z), numbers (0-9), the underscore (_), and -";
        //                }
        //                else
        //                {
        //                    strErrMsg = "Profile Description - Use only letters (a-z), numbers (0-9), the underscore (_), and -";
        //                }

        //                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //            }


        //            if (strErrMsg != string.Empty)
        //            {
        //                profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = strErrMsg;
        //                continue;
        //            }

        //            strProfileID = data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.ProfileID.ToString()].ToString().Trim();
        //            strProfileDescr = data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.Description.ToString()].ToString().Trim();

        //            strProfileTemplateID = data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.ProfileTemplateID.ToString()].ToString().Trim();

        //            strParameterTemplateID = data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.ProfileParameterTemplateID.ToString()].ToString().Trim();

        //            strMenuTemplateID = data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.MenuAccessTemplateID.ToString()].ToString().Trim();

        //            strScreenDisplayTemplateID = data.Rows[i][AtParWebEnums.Enum_ProfileTemplateRef.ScreenDisplayTemplateID.ToString()].ToString().Trim();




        //            if (!string.IsNullOrEmpty(strProfileID))
        //            {
        //                intProfileCountExists = _userUploadRepo.GetProfilecount(strProfileID);
        //            }

        //            if (intProfileCountExists == 0)
        //            {
        //                strMode = AtParWebEnums.AddEdit_Enum.ADD.ToString();
        //            }
        //            else
        //            {
        //                strMode = AtParWebEnums.AddEdit_Enum.EDIT.ToString();
        //            }

        //            long StatusCode = -1;

        //            if (strMode == AtParWebEnums.AddEdit_Enum.EDIT.ToString())
        //            {
        //                AtParWebApiResponse<long> result1 = _commonService.GetProfileInfo(strProfileID);
        //                StatusCode = result1.StatusCode;

        //            }
        //            else
        //            {
        //                AtParWebApiResponse<long> result2 = _commonService.GetProfileInfo(strProfileID);
        //                StatusCode = result2.StatusCode;
        //            }

        //            if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //            {
        //                if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from GetProfileInfo is :" + StatusCode + ": for ProfileID :" + strProfileID + ":"); }

        //                profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_CREATION_FAILED;
        //                continue;
        //            }

        //            if (!string.IsNullOrEmpty(strProfileTemplateID) && !string.IsNullOrEmpty(strParameterTemplateID))
        //            {
        //                StatusCode = CheckProductAccess(profileData, strProfileTemplateID, ref strAccess, strProfileID);
        //                if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from CheckProductAccess is :" + StatusCode + ": for ProfileID :" + strProfileID + ":"); }

        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_CREATION_FAILED;

        //                    continue;
        //                }
        //            }

        //            if (strAccess == AtParDefns.CONST_HHT_WEB_ACCESS)
        //            {
        //                if (!string.IsNullOrEmpty(strScreenDisplayTemplateID))
        //                {
        //                    blnValidateScreenDisplayData = true;

        //                    if (!string.IsNullOrEmpty(strMenuTemplateID))
        //                    {
        //                        blnValidateMenuData = true;
        //                    }
        //                }

        //            }
        //            else if (strAccess == AtParDefns.CONST_HHT_ACCESS)
        //            {
        //                if (!string.IsNullOrEmpty(strScreenDisplayTemplateID))
        //                {
        //                    blnValidateScreenDisplayData = true;
        //                }

        //            }
        //            else if (strAccess == AtParDefns.CONST_WEB_ACCESS)
        //            {
        //                if (!string.IsNullOrEmpty(strMenuTemplateID))
        //                {
        //                    blnValidateMenuData = true;
        //                }

        //            }
        //            else if (strAccess == AtParDefns.CONST_NO_ACCESS)
        //            {
        //                blnValidData = true;
        //            }
        //            else if (strAccess == AtParDefns.CONST_PROFILETEMPLATEID_IS_MANDATORY)
        //            {
        //                if (strMode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //                {
        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_CREATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_PROFILETEMPLATEID_IS_MANDATORY;
        //                }
        //                else
        //                {
        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_UPDATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_PROFILETEMPLATEID_IS_MANDATORY;
        //                }
        //                continue;
        //            }
        //            else if (strAccess == AtParDefns.CONST_NO_ATPAR_ACCESS)
        //            {
        //                if (strMode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //                {
        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_CREATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_NO_ATPAR_ACCESS;
        //                }
        //                else
        //                {
        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_UPDATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_NO_ATPAR_ACCESS;
        //                }
        //                continue;
        //            }

        //            DataSet profileDefaultData = new DataSet();

        //            if (blnValidateScreenDisplayData)
        //            {
        //                Tuple<string, long> tupleresult = null;// ValidateScreenDisplayTemplateId(profileData, ref profileDefaultData, strProfileTemplateID, strScreenDisplayTemplateID, strMode);

        //                if (tupleresult.Item2 != AtparStatusCodes.ATPAR_OK)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from ValidateScreenDisplayTemplateId is :" + StatusCode + ": for ProfileID :" + strProfileID + ":"); }


        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_UPDATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_PROFILE_CREATION_FAILED;
        //                    continue;
        //                }
        //                else
        //                {
        //                    blnValidateParameters = true;
        //                }


        //                if (tupleresult.Item1 != string.Empty)
        //                {
        //                    if (strMode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //                    {
        //                        strProfileTemplateRefError = AtParDefns.CONST_PROFILE_CREATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_INVALID_SCREENDISPLAY_DATA;
        //                    }
        //                    else
        //                    {
        //                        strProfileTemplateRefError = AtParDefns.CONST_PROFILE_UPDATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_INVALID_SCREENDISPLAY_DATA;
        //                    }

        //                    DataRow dr = null;
        //                    dr = profileDefaultData.Tables[AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorData.ToString()].NewRow();
        //                    dr["PROFILE_ID"] = strProfileID;
        //                    dr["PROFILE_TEMPLATEID"] = strProfileTemplateID;
        //                    dr["SCREEN_TEMPLATEID"] = strScreenDisplayTemplateID;
        //                    dr["ERROR_MESSAGE"] = tupleresult.Item1;
        //                    profileDefaultData.Tables[AtParWebEnums.Enum_ProfileData.ProfileScreendisplayErrorData.ToString()].Rows.Add(dr);
        //                }
        //            }


        //            if (blnValidateMenuData)
        //            {
        //                Tuple<string, long> tupleresult = null;// ValidateMenuTemplateId(profileData, ref profileDefaultData, strProfileTemplateID, strMenuTemplateID, strProfileID);
        //                if (tupleresult.Item2 != AtparStatusCodes.ATPAR_OK)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from ValidateMenuTemplateId is :" + StatusCode + ": for ProfileID :" + strProfileID + ":"); }

        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_CREATION_FAILED;
        //                    continue;
        //                }
        //                else
        //                {
        //                    blnValidateParameters = true;
        //                }

        //                if (tupleresult.Item1 == AtParDefns.CONST_NO_ATPAR_MENU_ACCESS)
        //                {
        //                    if (strMode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //                    {
        //                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "Can not remove access for ATPAR product in Profile Setup for ProfileID :" + strProfileID); }

        //                        profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_CREATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_INVALID_MENU_DATA;
        //                    }
        //                    else
        //                    {
        //                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "Can not remove access for ATPAR product in Profile Setup for ProfileID :" + strProfileID); }

        //                        profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_UPDATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_INVALID_MENU_DATA;
        //                    }

        //                    DataRow dr = null;
        //                    dr = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString()].NewRow();
        //                    dr["PROFILE_ID"] = strProfileID;
        //                    dr["PROFILE_TEMPLATEID"] = strProfileTemplateID;
        //                    dr["MENU_TEMPLATEID"] = strMenuTemplateID;
        //                    dr["ERROR_MESSAGE"] = tupleresult.Item1;

        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString()].Rows.Add(dr);
        //                    continue;
        //                }

        //                if (!string.IsNullOrEmpty(tupleresult.Item1))
        //                {
        //                    if (!string.IsNullOrEmpty(strProfileTemplateRefError))
        //                    {
        //                        strProfileTemplateRefError = strProfileTemplateRefError + "," + System.Environment.NewLine + AtParDefns.CONST_INVALID_MENU_DATA;
        //                    }
        //                    else
        //                    {
        //                        if (strMode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //                        {
        //                            strProfileTemplateRefError = AtParDefns.CONST_PROFILE_CREATION_FAILED + "," + System.Environment.NewLine + AtParDefns.CONST_INVALID_MENU_DATA;
        //                        }
        //                        else
        //                        {
        //                            strProfileTemplateRefError = AtParDefns.CONST_PROFILE_UPDATION_FAILED + "," + System.Environment.NewLine + AtParDefns.CONST_INVALID_MENU_DATA;
        //                        }


        //                    }

        //                    DataRow dr = null;
        //                    dr = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString()].NewRow();
        //                    dr["PROFILE_ID"] = strProfileID;
        //                    dr["PROFILE_TEMPLATEID"] = strProfileTemplateID;
        //                    dr["MENU_TEMPLATEID"] = strMenuTemplateID;
        //                    dr["ERROR_MESSAGE"] = tupleresult.Item1;

        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenusErrorData.ToString()].Rows.Add(dr);

        //                }

        //            }

        //            strProfileTemplateRefError = ValidateProfileColumnNames(profileData);

        //            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Invalid Column Name" + strProfileTemplateRefError); }


        //            if (strProfileTemplateRefError != string.Empty)
        //            {
        //                profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_NOT_VALID_PARAMETER + strProfileTemplateRefError;
        //            }
        //            else
        //            {
        //                blnValidateParameters = true;

        //            }

        //            if (blnValidateParameters)
        //            {
        //                StatusCode = ValidateParameterTemplateId(ref profileData, ref profileDefaultData, strProfileTemplateID, strParameterTemplateID, ref strErrMsg);
        //                if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from ValidateParameterTemplateId is :" + StatusCode + ":for ProfileID :" + strProfileID + ":"); }
        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_CREATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_INVALID_PARAMETERS_DATA;
        //                    continue;

        //                }
        //                if (!string.IsNullOrEmpty(strErrMsg))
        //                {
        //                    if (!string.IsNullOrEmpty(strProfileTemplateRefError))
        //                    {
        //                        strProfileTemplateRefError = strProfileTemplateRefError + System.Environment.NewLine + AtParDefns.CONST_INVALID_PARAMETERS_DATA;
        //                    }
        //                    else
        //                    {
        //                        if (strMode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //                        {
        //                            strProfileTemplateRefError = AtParDefns.CONST_PROFILE_CREATION_FAILED + "," + System.Environment.NewLine + AtParDefns.CONST_INVALID_PARAMETERS_DATA;
        //                        }
        //                        else
        //                        {
        //                            strProfileTemplateRefError = AtParDefns.CONST_PROFILE_UPDATION_FAILED + "," + System.Environment.NewLine + AtParDefns.CONST_INVALID_PARAMETERS_DATA;
        //                        }
        //                    }

        //                    DataRow drErrorParameters = null;
        //                    drErrorParameters = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].NewRow();
        //                    drErrorParameters["PROFILE_ID"] = strProfileID;
        //                    drErrorParameters["PROFILE_TEMPLATEID"] = strProfileTemplateID;
        //                    drErrorParameters["PARAMETER_TEMPLATEID"] = strParameterTemplateID;
        //                    drErrorParameters["ERROR_MESSAGE"] = strErrMsg;

        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].Rows.Add(drErrorParameters);
        //                }


        //                StatusCode = ValidateProfileParametersData(profileData, profileDefaultData, strParameterTemplateID, ref strErrMsg);

        //                if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from ValidateProfileParametersData is :" + StatusCode + ":for ProfileID :" + strProfileID + ":"); }

        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_CREATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_INVALID_PARAMETERS_DATA;
        //                    continue;

        //                }
        //                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "_strValidInput for ValidateProfileParametersData  :" + strErrMsg); }

        //                if (!string.IsNullOrEmpty(strErrMsg))
        //                {
        //                    if (!string.IsNullOrEmpty(strProfileTemplateRefError))
        //                    {
        //                        strProfileTemplateRefError = strProfileTemplateRefError + ", " + System.Environment.NewLine + AtParDefns.CONST_INVALID_PARAMETERS_DATA;
        //                    }
        //                    else
        //                    {
        //                        if (strMode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //                        {
        //                            strProfileTemplateRefError = AtParDefns.CONST_PROFILE_CREATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_INVALID_PARAMETERS_DATA;
        //                        }
        //                        else
        //                        {
        //                            strProfileTemplateRefError = AtParDefns.CONST_PROFILE_UPDATION_FAILED + System.Environment.NewLine + AtParDefns.CONST_INVALID_PARAMETERS_DATA;
        //                        }

        //                    }

        //                    DataRow drParameters = null;
        //                    drParameters = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].NewRow();
        //                    drParameters["PROFILE_ID"] = strProfileID;
        //                    drParameters["PROFILE_TEMPLATEID"] = strProfileTemplateID;
        //                    drParameters["PARAMETER_TEMPLATEID"] = strParameterTemplateID;
        //                    drParameters["ERROR_MESSAGE"] = strErrMsg;

        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].Rows.Add(drParameters);

        //                }

        //                StatusCode = PopulateProfileParameters(profileData, ref profileDefaultData, strProfileTemplateID, strParameterTemplateID);

        //                if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //                {
        //                    DataRow drParameters = null;
        //                    drParameters = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].NewRow();
        //                    drParameters["PROFILE_ID"] = strProfileID;
        //                    drParameters["PROFILE_TEMPLATEID"] = strProfileTemplateID;
        //                    drParameters["PARAMETER_TEMPLATEID"] = strParameterTemplateID;
        //                    drParameters["ERROR_MESSAGE"] = strErrMsg;

        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].Rows.Add(drParameters);

        //                }
        //                else
        //                {
        //                    blnValidData = true;
        //                }

        //            }

        //            if (!string.IsNullOrEmpty(strProfileTemplateRefError))
        //            {
        //                profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = strProfileTemplateRefError;
        //                continue;
        //            }


        //            if (blnValidData)
        //            {
        //                StatusCode= PopulateProfileDataset(profileData, profileDefaultData, strProfileTemplateID, strParameterTemplateID, strMode, ref dsSaveDataset, ref blnChangeProfileClienttoServer);

        //                if (StatusCode != AtparStatusCodes.ATPAR_OK)
        //                {
        //                    if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "StatusCode Returned from PopulateProfileDataset is :" + StatusCode + ":for ProfileID :" + strProfileID + ":"); }

        //                    profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileTemplateRefErrorData.ToString()].Rows[i]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_INVALID_DATA ;
        //                    continue;

        //                }
        //            }

        //            if (StatusCode == AtparStatusCodes.ATPAR_OK)
        //            {
        //                if(strMode== AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //                {








        //                }

        //            }




        //        }
        //        return AtparStatusCodes.ATPAR_OK;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //}
        //private long CheckProductAccess(DataSet profileData, string profileTemplateId, ref string access, string profileId)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        access = string.Empty;
        //        DataRow[] drProfileTemplateID = null;

        //        drProfileTemplateID = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Select("ProfileTemplateID = '" + profileTemplateId + "'");

        //        if (_log.IsDebugEnabled)
        //            _log.Debug("ProfileTemplateID  count in ProfileSetup Table " + methodBaseName + " is .. " + drProfileTemplateID.Length);

        //        if (drProfileTemplateID.Length == 0)
        //        {
        //            access = AtParDefns.CONST_PROFILETEMPLATEID_IS_MANDATORY;
        //            return AtparStatusCodes.ATPAR_OK;
        //        }


        //        if (profileId.ToUpper() == AtParDefns.adminProfile.ToUpper())
        //        {
        //            DataRow[] drAdminCount = null;

        //            drAdminCount = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Select("ProfileTemplateID = '" + profileTemplateId + "'" + " and  [Web(Y/N)] = '" + AtParWebEnums.YesNo_Enum.N.ToString() + "' and [App_Id] = '" + AtParDefns.CONST_ATPAR_APPID + "' ");

        //            if (_log.IsDebugEnabled)
        //                _log.Debug("ProfileTemplateID  count in ProfileSetup Table for admin profile " + methodBaseName + " is .. " + drAdminCount.Length);

        //            if (drAdminCount.Length > 0)
        //            {
        //                access = AtParDefns.CONST_NO_ATPAR_ACCESS;
        //                return AtparStatusCodes.ATPAR_OK;
        //            }
        //        }

        //        DataRow[] drWebRowCount = null;
        //        drWebRowCount = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Select("ProfileTemplateID = '" + profileTemplateId + "'" + " and  [Web(Y/N)] = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "' ");

        //        if (_log.IsDebugEnabled)
        //            _log.Debug("ProfileTemplateID  WEB rows count in ProfileSetup Table " + methodBaseName + " is .. " + drWebRowCount.Length);

        //        DataRow[] drHHTRowCount = null;
        //        drHHTRowCount = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Select("ProfileTemplateID = '" + profileTemplateId + "'" + " and  [HHT(Y/N)] = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "' ");

        //        if (_log.IsDebugEnabled)
        //            _log.Debug("ProfileTemplateID  HHT rows count in ProfileSetup Table " + methodBaseName + " is .. " + drHHTRowCount.Length);

        //        if (drWebRowCount.Length == 0 & drHHTRowCount.Length == 0)
        //        {
        //            access = AtParDefns.CONST_NO_ACCESS;
        //        }
        //        else
        //        {
        //            if (drWebRowCount.Length > 0 & drHHTRowCount.Length > 0)
        //            {
        //                access = AtParDefns.CONST_HHT_WEB_ACCESS;
        //            }
        //            else if (drWebRowCount.Length > 0 & drHHTRowCount.Length == 0)
        //            {
        //                access = AtParDefns.CONST_WEB_ACCESS;
        //            }
        //            else if (drWebRowCount.Length == 0 & drHHTRowCount.Length > 0)
        //            {
        //                access = AtParDefns.CONST_HHT_ACCESS;
        //            }
        //        }

        //        return AtparStatusCodes.ATPAR_OK;

        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }


        //}

        ////private Tuple<string, long> ValidateScreenDisplayTemplateId(DataSet profileData, ref DataSet profileDefaultData, string pProfileTemplateId, string pScreenDisplayTemplateId, string pMode)
        ////{
        ////    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        ////    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        ////    Tuple<string, long> tupleOutput = null;
        ////    string pErrorMessage = string.Empty;
        ////    long StatusCode = -1;

        ////    try
        ////    {

        ////        DataRow[] drProductAccess = null;

        ////        drProductAccess = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Select("ProfileTemplateID = '" + pProfileTemplateId + "'");

        ////        if (drProductAccess.Length > 0)
        ////        {
        ////            foreach (DataRow drProduct in drProductAccess)
        ////            {
        ////                DataRow[] drExcelScreenDisplay = null;

        ////                if (drProduct[1].ToString() == "0")
        ////                {
        ////                    //For Atpar Product there is no ScreenDisplay, so skipping the loop 
        ////                    continue;
        ////                }

        ////                drExcelScreenDisplay = profileData.Tables[AtParWebEnums.Enum_ProfileData.Screendisplay.ToString()].Select("ProfileScreenTemplateID = '" + pScreenDisplayTemplateId + "'" + " and  [App_Id]= '" + drProduct[1] + "' ");

        ////                if (_log.IsDebugEnabled)
        ////                    _log.Debug("ScreenDisplayTemplateId menus row count in Screendisplay Table " + methodBaseName + " is .. " + drExcelScreenDisplay.Length);


        ////                //ScreenDisplay TemplateID Validation
        ////                if (drExcelScreenDisplay.Length == 0)
        ////                {
        ////                    pErrorMessage = AtParDefns.CONST_SCREENTEMPLATEID_IS_MANDATORY;
        ////                    continue;
        ////                }

        ////                if (drExcelScreenDisplay.Length > 0)
        ////                {
        ////                    //Getrow from default data with product, screen Name and ColumnName

        ////                    foreach (DataRow dr in drExcelScreenDisplay)
        ////                    {
        ////                        string strDefaultDisplayfield = string.Empty;
        ////                        string strMandatoryToggle = string.Empty;
        ////                        string strToggleField = string.Empty;

        ////                        DataRow[] drDefaultdata = null;

        ////                        drDefaultdata = profileData.Tables["SCREENDISPLAY"].Select("APP_ID = '" + dr[1] + "'" + " and  SCREEN_NAME= '" + dr[3] + "' and COLUMN_HEADER = '" + dr[5] + "'");

        ////                        if (drDefaultdata.Length == 1)
        ////                        {
        ////                            //Populate - Default Display Field , Mandatory_ Toggle, Toggle_Field
        ////                            if (drDefaultdata[0]["DEFAULT_DISPLAY_FIELD"] != null)
        ////                            {
        ////                                strDefaultDisplayfield = drDefaultdata[0]["DEFAULT_DISPLAY_FIELD"].ToString();
        ////                            }
        ////                            if (drDefaultdata[0]["MANDATORY_TOGGLE"] != null)
        ////                            {
        ////                                strMandatoryToggle = drDefaultdata[0]["MANDATORY_TOGGLE"].ToString();
        ////                            }
        ////                            if (drDefaultdata[0]["TOGGLE_FIELD"] != null)
        ////                            {
        ////                                strToggleField = drDefaultdata[0]["TOGGLE_FIELD"].ToString();
        ////                            }
        ////                        }

        ////                        StringBuilder sbErrMsg = new StringBuilder();
        ////                        //Check Display Value 

        ////                        if (dr[4].ToString() == AtParWebEnums.YesNo_Enum.N.ToString())
        ////                        {
        ////                            //Check Default Display Field =Y
        ////                            if (strDefaultDisplayfield == AtParWebEnums.YesNo_Enum.Y.ToString())
        ////                            {
        ////                                if (_log.IsWarnEnabled)
        ////                                    _log.Warn(methodBaseName + " Minimum Default display fields: have to be Selected for product,screen and field name is " + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                {
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                    sbErrMsg.Append(System.Environment.NewLine);
        ////                                }
        ////                                sbErrMsg.Append(dr[2]);
        ////                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                sbErrMsg.Append(dr[3]);
        ////                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                sbErrMsg.Append(dr[5]);
        ////                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                sbErrMsg.Append(AtParDefns.CONST_SELECT_DEFAULT_DISPLAY_FIELD);
        ////                            }
        ////                            else
        ////                            {
        ////                                //Check if Label, Order, Width, ToggleDescription and Toggle Order values exists or not
        ////                                if (dr[6] != null && dr[7] != null && dr[8] != null)
        ////                                {
        ////                                    //Check if ToggleDescription and Toggle Order values exists or not
        ////                                    if (dr[9] != null)
        ////                                    {
        ////                                        if (dr[10] != null)
        ////                                        {
        ////                                            if (_log.IsWarnEnabled)
        ////                                                _log.Warn(methodBaseName + " Mandatory toggle filed should be Selected :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);


        ////                                            if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                            {
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                sbErrMsg.Append(System.Environment.NewLine);
        ////                                            }
        ////                                            sbErrMsg.Append(dr[2]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[3]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[5]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_MANDATORY_TOGGLE_FIELD);
        ////                                        }
        ////                                    }
        ////                                    if (dr[10] != null)
        ////                                    {
        ////                                        if (dr[9] != null)
        ////                                        {
        ////                                            if (_log.IsWarnEnabled)
        ////                                                _log.Warn(methodBaseName + " Mandatory toggle filed should be Selected :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                            if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                            {
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                sbErrMsg.Append(System.Environment.NewLine);
        ////                                            }
        ////                                            sbErrMsg.Append(dr[2]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[3]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[5]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_MANDATORY_TOGGLE_FIELD);
        ////                                        }
        ////                                        if (dr[10].IsNumeric())
        ////                                        {
        ////                                            if (dr[10].ToString().Length > 2)
        ////                                            {
        ////                                                if (_log.IsWarnEnabled)
        ////                                                    _log.Warn(methodBaseName + " Order and toggle order should be 0 to 99 :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                                if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                {
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                    sbErrMsg.Append(System.Environment.NewLine);
        ////                                                }
        ////                                                sbErrMsg.Append(dr[2]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[3]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[5]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_SCREENDISPLAY_NOT_VALID);
        ////                                            }
        ////                                        }
        ////                                        else
        ////                                        {
        ////                                            if (_log.IsWarnEnabled)
        ////                                                _log.Warn(methodBaseName + "  toggle order should Numeric :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                            if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                            {
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                sbErrMsg.Append(System.Environment.NewLine);
        ////                                            }
        ////                                            sbErrMsg.Append(dr[2]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[3]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[5]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_NOT_VALID_DATA);

        ////                                        }
        ////                                    }
        ////                                    if (dr[9] != null && dr[10] != null)
        ////                                    {
        ////                                        if (strToggleField == AtParWebEnums.Toggle_Enum.I.ToString())
        ////                                        {
        ////                                            if (_log.IsWarnEnabled)
        ////                                                _log.Warn(methodBaseName + " Mandatory toggle filed :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                            if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                            {
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                sbErrMsg.Append(System.Environment.NewLine);
        ////                                            }
        ////                                            sbErrMsg.Append(dr[2]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[3]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[5]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_MANDATORY_TOGGLE_FIELD);
        ////                                        }
        ////                                        else
        ////                                        {
        ////                                            //ValidateData Order, Width, toggle Order should be numeric 7,8,10
        ////                                            if (!IsNumeric(dr[7]) & dr[8])
        ////                                            {
        ////                                                if (_log.IsWarnEnabled)
        ////                                                    _log.Warn(methodBaseName + " Order, Width and toggle order should be numeric  :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                                if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                {
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                    sbErrMsg.Append(System.Environment.NewLine);
        ////                                                }
        ////                                                sbErrMsg.Append(dr[2]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[3]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[5]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_NOT_VALID_DATA);

        ////                                            }
        ////                                            else
        ////                                            {
        ////                                                if (dr[7].ToString().Length > 2)
        ////                                                {
        ////                                                    if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                    {
        ////                                                        sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                        sbErrMsg.Append(System.Environment.NewLine);
        ////                                                    }
        ////                                                    sbErrMsg.Append(dr[2]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(dr[3]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(dr[5]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_SCREENDISPLAY_NOT_VALID);
        ////                                                }
        ////                                                if (dr[8].ToString().Length > 4)
        ////                                                {
        ////                                                    if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                    {
        ////                                                        sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                        sbErrMsg.Append(System.Environment.NewLine);
        ////                                                    }
        ////                                                    sbErrMsg.Append(dr[2]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(dr[3]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(dr[5]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_SCREENDISPLAY_COLUMN_WIDTH);

        ////                                                }
        ////                                            }
        ////                                        }
        ////                                    }
        ////                                    else
        ////                                    {
        ////                                        if (strMandatoryToggle == AtParWebEnums.YesNo_Enum.Y.ToString())
        ////                                        {
        ////                                            if (_log.IsWarnEnabled)
        ////                                                _log.Warn(methodBaseName + " Mandatory toggle filed should be Selected :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                            if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                            {
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                sbErrMsg.Append(System.Environment.NewLine);
        ////                                            }
        ////                                            sbErrMsg.Append(dr[2]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[3]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[5]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_MANDATORY_TOGGLE_FIELD);
        ////                                        }
        ////                                        else
        ////                                        {
        ////                                            //ValidateData Order, Width should be numeric 7,8
        ////                                            if (!IsNumeric(dr[7]) && dr[8])
        ////                                            {
        ////                                                if (_log.IsWarnEnabled)
        ////                                                    _log.Warn(methodBaseName + " Order, Width and toggle order should be numeric  :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);
        ////                                                if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                {
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                    sbErrMsg.Append(System.Environment.NewLine);
        ////                                                }
        ////                                                sbErrMsg.Append(dr[2]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[3]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[5]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_NOT_VALID_DATA);
        ////                                            }
        ////                                            else
        ////                                            {
        ////                                                if (dr[7].ToString().Length > 2)
        ////                                                {
        ////                                                    if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                    {
        ////                                                        sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                        sbErrMsg.Append(System.Environment.NewLine);
        ////                                                    }
        ////                                                    sbErrMsg.Append(dr[2]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(dr[3]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(dr[5]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_SCREENDISPLAY_NOT_VALID);

        ////                                                }
        ////                                                if (dr[8].ToString().Length > 4)
        ////                                                {
        ////                                                    if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                    {
        ////                                                        sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                        sbErrMsg.Append(System.Environment.NewLine);
        ////                                                    }
        ////                                                    sbErrMsg.Append(dr[2]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(dr[3]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(dr[5]);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_SCREENDISPLAY_COLUMN_WIDTH);

        ////                                                }
        ////                                            }
        ////                                        }
        ////                                    }
        ////                                }
        ////                                else
        ////                                {
        ////                                    if (_log.IsWarnEnabled)
        ////                                        _log.Warn(methodBaseName + " Mandatory fields are missing for  :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                    if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                    {
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                        sbErrMsg.Append(System.Environment.NewLine);
        ////                                    }
        ////                                    sbErrMsg.Append(dr[2]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(dr[3]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(dr[5]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_MANDATORY_FIELDS_MISSING);
        ////                                }
        ////                            }
        ////                        }
        ////                        else
        ////                        {
        ////                            //Check if Label, Order, Width, ToggleDescription and Toggle Order values exists or not
        ////                            if (dr[6] != null && dr[7] != null && dr[8] != null)
        ////                            {
        ////                                //Check if ToggleDescription and Toggle Order values exists or not
        ////                                if (dr[9] != null)
        ////                                {
        ////                                    if (dr[10] != null)
        ////                                    {
        ////                                        if (_log.IsWarnEnabled)
        ////                                            _log.Warn(methodBaseName + " Mandatory toggle filed should be Selected :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                        if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                        {
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                            sbErrMsg.Append(System.Environment.NewLine);
        ////                                        }
        ////                                        sbErrMsg.Append(dr[2]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(dr[3]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(dr[5]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_MANDATORY_TOGGLE_FIELD);
        ////                                    }
        ////                                }
        ////                                if (dr[10] != null)
        ////                                {
        ////                                    if (dr[9] == null)
        ////                                    {
        ////                                        if (_log.IsWarnEnabled)
        ////                                            _log.Warn(methodBaseName + " Mandatory toggle filed should be Selected :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                        if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                        {
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                            sbErrMsg.Append(System.Environment.NewLine);
        ////                                        }
        ////                                        sbErrMsg.Append(dr[2]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(dr[3]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(dr[5]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_MANDATORY_TOGGLE_FIELD);

        ////                                    }
        ////                                    if (dr[10].IsNumeric())
        ////                                    {
        ////                                        if (dr[10].ToString().Length > 2)
        ////                                        {
        ////                                            if (_log.IsWarnEnabled)
        ////                                                _log.Warn(methodBaseName + " Order and toggle order should be 0 to 99 :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                            if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                            {
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                sbErrMsg.Append(System.Environment.NewLine);
        ////                                            }
        ////                                            sbErrMsg.Append(dr[2]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[3]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[5]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_SCREENDISPLAY_NOT_VALID);

        ////                                        }
        ////                                    }
        ////                                    else
        ////                                    {
        ////                                        if (_log.IsWarnEnabled)
        ////                                            _log.Warn(methodBaseName + "  toggle order should Numeric :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                        if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                        {
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                            sbErrMsg.Append(System.Environment.NewLine);
        ////                                        }
        ////                                        sbErrMsg.Append(dr[2]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(dr[3]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(dr[5]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_NOT_VALID_DATA);
        ////                                    }
        ////                                }
        ////                                if (dr[9] != null && dr[10] != null)
        ////                                {
        ////                                    if (strToggleField == AtParWebEnums.Toggle_Enum.I.ToString())
        ////                                    {
        ////                                        if (_log.IsWarnEnabled)
        ////                                            _log.Warn(methodBaseName + " Mandatory toggle filed should be Selected :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                        if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                        {
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                            sbErrMsg.Append(System.Environment.NewLine);
        ////                                        }
        ////                                        sbErrMsg.Append(dr[2]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(dr[3]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(dr[5]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_MANDATORY_TOGGLE_FIELD);
        ////                                    }
        ////                                    else
        ////                                    {

        ////                                        if (!IsNumeric(dr[7]) && dr[8])
        ////                                        {
        ////                                            if (_log.IsWarnEnabled)
        ////                                                _log.Warn(methodBaseName + " Order, Width and toggle order should be numeric  :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);
        ////                                            if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                            {
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                sbErrMsg.Append(System.Environment.NewLine);
        ////                                            }
        ////                                            sbErrMsg.Append(dr[2]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[3]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[5]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_NOT_VALID_DATA);
        ////                                        }
        ////                                        else
        ////                                        {
        ////                                            if (dr[7].ToString().Length > 2)
        ////                                            {
        ////                                                if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                {
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                    sbErrMsg.Append(System.Environment.NewLine);
        ////                                                }
        ////                                                sbErrMsg.Append(dr[2]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[3]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[5]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_SCREENDISPLAY_NOT_VALID);
        ////                                            }
        ////                                            if (dr[8].ToString().Length > 4)
        ////                                            {
        ////                                                if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                {
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                    sbErrMsg.Append(System.Environment.NewLine);
        ////                                                }
        ////                                                sbErrMsg.Append(dr[2]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[3]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[5]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_SCREENDISPLAY_COLUMN_WIDTH);
        ////                                            }
        ////                                        }
        ////                                    }
        ////                                }
        ////                                else
        ////                                {

        ////                                    if (strMandatoryToggle == AtParWebEnums.YesNo_Enum.Y.ToString())
        ////                                    {
        ////                                        if (_log.IsWarnEnabled)
        ////                                            _log.Warn(methodBaseName + " Mandatory toggle filed should be Selected :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);

        ////                                        if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                        {
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                            sbErrMsg.Append(System.Environment.NewLine);
        ////                                        }
        ////                                        sbErrMsg.Append(dr[2]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(dr[3]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(dr[5]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_MANDATORY_TOGGLE_FIELD);

        ////                                    }
        ////                                    else
        ////                                    {
        ////                                        //ValidateData Order, Width should be numeric 7,8
        ////                                        if (!IsNumeric(dr[7]) && dr[8])
        ////                                        {
        ////                                            if (_log.IsWarnEnabled)
        ////                                                _log.Warn(methodBaseName + " Order, Width and toggle order should be numeric  :" + ": " + dr[2] + " product," + dr[3] + " screen name," + dr[5] + ": field name In : " + pScreenDisplayTemplateId);
        ////                                            if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                            {
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                sbErrMsg.Append(System.Environment.NewLine);
        ////                                            }
        ////                                            sbErrMsg.Append(dr[2]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[3]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(dr[5]);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                            sbErrMsg.Append(AtParDefns.CONST_NOT_VALID_DATA);
        ////                                        }
        ////                                        else
        ////                                        {
        ////                                            if (dr[7].ToString().Length > 2)
        ////                                            {
        ////                                                if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                {
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                    sbErrMsg.Append(System.Environment.NewLine);
        ////                                                }
        ////                                                sbErrMsg.Append(dr[2]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[3]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[5]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_SCREENDISPLAY_NOT_VALID);
        ////                                            }
        ////                                            if (dr[8].ToString().Length > 4)
        ////                                            {
        ////                                                if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                                {
        ////                                                    sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                                    sbErrMsg.Append(System.Environment.NewLine);
        ////                                                }
        ////                                                sbErrMsg.Append(dr[2]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[3]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(dr[5]);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                                sbErrMsg.Append(AtParDefns.CONST_SCREENDISPLAY_COLUMN_WIDTH);
        ////                                            }
        ////                                        }
        ////                                    }
        ////                                }
        ////                            }
        ////                            else
        ////                            {
        ////                                if (_log.IsWarnEnabled)
        ////                                    _log.Warn(methodBaseName + " Mandatory fields are missing for  :" + dr[5] + ": In : " + pScreenDisplayTemplateId);
        ////                                if (!string.IsNullOrEmpty(pErrorMessage))
        ////                                {
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                    sbErrMsg.Append(System.Environment.NewLine);
        ////                                }
        ////                                sbErrMsg.Append(dr[2]);
        ////                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                sbErrMsg.Append(dr[3]);
        ////                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                sbErrMsg.Append(dr[5]);
        ////                                sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                sbErrMsg.Append(AtParDefns.CONST_MANDATORY_FIELDS_MISSING);
        ////                            }
        ////                        }
        ////                        //To Update the default dataset with changed values

        ////                            DataRow[] drScreenDisplay = null;
        ////                            string strHeader = string.Empty;
        ////                            string strOrder = string.Empty;
        ////                            string strWidth = string.Empty;
        ////                            string strToggleOrder = string.Empty;
        ////                            string strToggleDescr = string.Empty;

        ////                            drScreenDisplay = profileDefaultData.Tables["SCREENDISPLAY"].Select("APP_ID = '" + dr[1] + "'" + " AND  SCREEN_NAME= '" + dr[3] + "' AND DEFAULT_COLUMN_HEADER = '" + dr[5] + "' ");

        ////                            if (drScreenDisplay.Length > 0)
        ////                            {
        ////                                //To Update ChangeFlag column when data change for DISPLAY_FIELD
        ////                                if (drScreenDisplay[0]["DISPLAY_FIELD"].ToString() != (dr[4].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() ? AtParWebEnums.YesNo_Enum.Y.ToString() : AtParWebEnums.YesNo_Enum.N.ToString()))
        ////                                {
        ////                                    drScreenDisplay[0]["CHANGEFLAG"] = AtParWebEnums.YesNo_Enum.Y.ToString();
        ////                                }
        ////                                drScreenDisplay[0]["DISPLAY_FIELD"] = dr[4];

        ////                                if (dr[6] != null)
        ////                                {
        ////                                    strHeader = dr[6].ToString();
        ////                                }
        ////                                if (dr[7] != null)
        ////                                {
        ////                                    strOrder = dr[7].ToString();
        ////                                }
        ////                                if (dr[8] != null)
        ////                                {
        ////                                    strWidth = dr[8].ToString();
        ////                                }
        ////                                if (dr[9] != null)
        ////                                {
        ////                                    strToggleDescr = dr[9].ToString();
        ////                                }
        ////                                if (dr[10] != null)
        ////                                {
        ////                                    strToggleOrder = dr[10].ToString();
        ////                                }

        ////                                //To Update ChangeFlag column when data change for coulmn header
        ////                                if (!string.IsNullOrEmpty(strHeader.Trim()))
        ////                                {
        ////                                    if (drScreenDisplay[0]["COLUMN_HEADER"].ToString() != strHeader)
        ////                                    {
        ////                                        drScreenDisplay[0]["CHANGEFLAG"] = AtParWebEnums.YesNo_Enum.Y.ToString();
        ////                                    }
        ////                                }

        ////                                if (string.IsNullOrEmpty(strHeader.Trim()))
        ////                                {
        ////                                    drScreenDisplay[0]["COLUMN_HEADER"] = null;
        ////                                }
        ////                                else
        ////                                {
        ////                                    drScreenDisplay[0]["COLUMN_HEADER"] = strHeader;
        ////                                }

        ////                                //To Update ChangeFlag column when data change for order
        ////                                if (!string.IsNullOrEmpty(strOrder.Trim()))
        ////                                {
        ////                                    if (drScreenDisplay[0]["COLUMN_ORDER"].ToString() != strOrder)
        ////                                    {
        ////                                        drScreenDisplay[0]["CHANGEFLAG"] = AtParWebEnums.YesNo_Enum.Y.ToString();
        ////                                    }
        ////                                }

        ////                                if (string.IsNullOrEmpty(strOrder.Trim()))
        ////                                {
        ////                                    drScreenDisplay[0]["COLUMN_ORDER"] = null;
        ////                                }
        ////                                else
        ////                                {
        ////                                    drScreenDisplay[0]["COLUMN_ORDER"] = strOrder;
        ////                                }

        ////                                //To Update ChangeFlag column when data change for width
        ////                                if (!string.IsNullOrEmpty(strWidth.Trim()))
        ////                                {
        ////                                    if (drScreenDisplay[0]["COLUMN_WIDTH"].ToString() != strWidth)
        ////                                    {
        ////                                        drScreenDisplay[0]["CHANGEFLAG"] = AtParWebEnums.YesNo_Enum.Y.ToString();
        ////                                    }
        ////                                }

        ////                                if (string.IsNullOrEmpty(strWidth.Trim()))
        ////                                {
        ////                                    drScreenDisplay[0]["COLUMN_WIDTH"] = null;
        ////                                }
        ////                                else
        ////                                {
        ////                                    drScreenDisplay[0]["COLUMN_WIDTH"] = strWidth;
        ////                                }

        ////                                //To Update ChangeFlag column when data change for toggle order
        ////                                if (drScreenDisplay[0]["TOGGLE_ORDER"] != null)
        ////                                {
        ////                                    if (!string.IsNullOrEmpty(strToggleOrder))
        ////                                    {
        ////                                        if (drScreenDisplay[0]["TOGGLE_ORDER"].ToString() != strToggleOrder)
        ////                                        {
        ////                                            drScreenDisplay[0]["CHANGEFLAG"] = AtParWebEnums.YesNo_Enum.Y.ToString();
        ////                                        }
        ////                                    }
        ////                                }
        ////                                if (string.IsNullOrEmpty(strToggleOrder.Trim()))
        ////                                {
        ////                                    drScreenDisplay[0]["TOGGLE_ORDER"] = string.Empty;
        ////                                }
        ////                                else
        ////                                {
        ////                                    drScreenDisplay[0]["TOGGLE_ORDER"] = strToggleOrder;
        ////                                }

        ////                                //To Update ChangeFlag column when data change for toggle Description
        ////                                if (drScreenDisplay[0]["DEFAULT_TOGGLE_TEXT"] != null)
        ////                                {
        ////                                    if (!string.IsNullOrEmpty(strToggleDescr))
        ////                                    {
        ////                                        if (drScreenDisplay[0]["DEFAULT_TOGGLE_TEXT"].ToString() != strToggleDescr)
        ////                                        {
        ////                                            drScreenDisplay[0]["CHANGEFLAG"] = AtParWebEnums.YesNo_Enum.Y.ToString();
        ////                                        }
        ////                                    }
        ////                                }
        ////                                if (string.IsNullOrEmpty(strToggleDescr.Trim()))
        ////                                {
        ////                                    drScreenDisplay[0]["DEFAULT_TOGGLE_TEXT"] = string.Empty;
        ////                                }
        ////                                else
        ////                                {
        ////                                    drScreenDisplay[0]["DEFAULT_TOGGLE_TEXT"] = strToggleDescr;
        ////                                }

        ////                            }





        ////                        if (!string.IsNullOrEmpty(pErrorMessage))
        ////                        {
        ////                            pErrorMessage = pErrorMessage + sbErrMsg.ToString();
        ////                        }
        ////                        else
        ////                        {
        ////                            pErrorMessage = sbErrMsg.ToString();
        ////                        }
        ////                        sbErrMsg.Remove(0, sbErrMsg.Length);

        ////                    }
        ////                }
        ////            }
        ////            profileDefaultData.AcceptChanges();

        ////        }
        ////        tupleOutput = new Tuple<string, long>(pErrorMessage, AtparStatusCodes.ATPAR_OK);
        ////        return tupleOutput;

        ////    }
        ////    catch (Exception ex)
        ////    {
        ////        tupleOutput = new Tuple<string, long>(string.Empty, AtparStatusCodes.E_SERVERERROR);
        ////        return tupleOutput;

        ////    }


        ////}

        ////private Tuple<string, long> ValidateMenuTemplateId(DataSet profileData, ref DataSet profileDefaultData, string profileTemplateId, string profileMenuTemplateId, string profileID)
        ////{

        ////    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        ////    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        ////    Tuple<string, long> tupleOutput = null;
        ////    string errorMessage = string.Empty;

        ////    StringBuilder sbErrMsg = new StringBuilder();


        ////    try
        ////    {

        ////        //Check whether ProfileMenuTemplateID exists in ProfileMenus table

        ////        DataRow[] drMenuTemplateID = null;
        ////        drMenuTemplateID = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenus.ToString()].Select("ProfileMenuTemplateID = '" + profileMenuTemplateId + "'");

        ////        if (_log.IsDebugEnabled)
        ////            _log.Debug("drMenuTemplateID menus row count in ProfileMenus Table " + methodBaseName + " is .. " + drMenuTemplateID.Length);

        ////        if (drMenuTemplateID.Length == 0)
        ////        {
        ////            errorMessage = AtParDefns.CONST_SCREENTEMPLATEID_IS_MANDATORY;
        ////            tupleOutput = new Tuple<string, long>(string.Empty, AtparStatusCodes.ATPAR_OK);
        ////            return tupleOutput;
        ////        }

        ////        //Loop  product access from ProfileSetupTable(for ProfileTemplateid)
        ////        DataRow[] drProductSetup = null;
        ////        drProductSetup = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Select("ProfileTemplateID = '" + profileTemplateId + "'" + " and  [Web(Y/N)] = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "' ");

        ////        if (_log.IsDebugEnabled)
        ////            _log.Debug("ProfileTemplateID Product row count in Profile SetUp Table " + methodBaseName + " is .. " + drProductSetup.Length);

        ////        if (drProductSetup.Length > 0)
        ////        {

        ////            foreach (DataRow drProduct in drProductSetup)
        ////            {
        ////                DataRow[] drMenuRowCount = null;
        ////                drMenuRowCount = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenus.ToString()].Select("ProfileMenuTemplateID = '" + profileMenuTemplateId + "'" + "and  [App_Id] =' " + drProduct[1] + " ' ");

        ////                if (_log.IsDebugEnabled)
        ////                    _log.Debug("pProfileMenuTemplateId menus row count in ProfileMenus Table " + methodBaseName + " is .. " + drMenuRowCount.Length);

        ////                if (drMenuRowCount.Length == 0)
        ////                {
        ////                    if (_log.IsWarnEnabled)
        ////                        _log.Warn(methodBaseName + " No Menu Access for the MenuTemplateID is :" + profileMenuTemplateId);

        ////                    errorMessage = AtParDefns.CONST_NO_MENU_ACCESS + " for " + profileMenuTemplateId;
        ////                }

        ////                if (drProduct[1].ToString() == AtParDefns.CONST_ATPAR_APPID)
        ////                {
        ////                    DataRow[] atparMenu = null;
        ////                    atparMenu = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileMenus.ToString()].Select("ProfileMenuTemplateID = '" + profileMenuTemplateId + "'" + " and  [App_Id] =' " + drProduct[1] + " ' and  [Select (Y/N)]= '" + AtParWebEnums.YesNo_Enum.N.ToString() + "' ");

        ////                    if (atparMenu.Length > 0)
        ////                    {
        ////                        if (profileID.ToUpper() == AtParDefns.adminProfile.ToUpper())
        ////                        {
        ////                            if (_log.IsWarnEnabled)
        ////                                _log.Warn(" Can not remove access for ATPAR product in Profile Setup for ProfileID :" + profileID);
        ////                            errorMessage = AtParDefns.CONST_NO_ATPAR_MENU_ACCESS;
        ////                            tupleOutput = new Tuple<string, long>(string.Empty, AtparStatusCodes.ATPAR_OK);
        ////                            return tupleOutput;
        ////                        }
        ////                    }
        ////                }

        ////                //Loop  datarows returned  for the menuTemplateId  and for specific product from ProfileMenus table

        ////                if (drMenuRowCount.Length > 0)
        ////                {
        ////                    foreach (DataRow drMenu in drMenuRowCount)
        ////                    {
        ////                        int intMenuSeqNo = 0;
        ////                        //Check Select Field Value

        ////                        if (drMenu[5].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
        ////                        {
        ////                            //Check MenuSeqno is numeric
        ////                            if (drMenu[6] == null)
        ////                            {
        ////                                if (_log.IsWarnEnabled)
        ////                                    _log.Warn(methodBaseName + "Menu Seq is Mandatory in MenuTemplateID is :" + profileMenuTemplateId);
        ////                                if (!string.IsNullOrEmpty(errorMessage))
        ////                                {
        ////                                    if (drMenu[2] != null)
        ////                                    {
        ////                                        //.Append(pErrorMessage)
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                        sbErrMsg.Append(drMenu[2]);
        ////                                    }
        ////                                    if (drMenu[3] != null)
        ////                                    {
        ////                                        //.Append(pErrorMessage)
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(drMenu[3]);
        ////                                    }
        ////                                    if (drMenu[4] != null)
        ////                                    {
        ////                                        //.Append(pErrorMessage)
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(drMenu[4]);
        ////                                    }
        ////                                    if (drMenu[6] != null)
        ////                                    {
        ////                                        //.Append(pErrorMessage)
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(drMenu[6]);
        ////                                    }
        ////                                    //.Append(pErrorMessage)
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_MENUSEQ_IS_MANDATORY);
        ////                                }
        ////                                else
        ////                                {
        ////                                    sbErrMsg.Append(drMenu[2]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(drMenu[3]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(drMenu[4]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(drMenu[6]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_MENUSEQ_IS_MANDATORY);
        ////                                }
        ////                            }
        ////                            if (drMenu[6] != null)
        ////                            {
        ////                                if (!IsNumeric(drMenu[6]))
        ////                                {
        ////                                    if (_log.IsWarnEnabled)
        ////                                        _log.Warn(methodBaseName + "Menu Seq is not Numeric MenuTemplateID is :" + profileMenuTemplateId);
        ////                                    if (!string.IsNullOrEmpty(errorMessage))
        ////                                    {
        ////                                        //.Append(pErrorMessage)
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                        sbErrMsg.Append(System.Environment.NewLine);
        ////                                        sbErrMsg.Append(drMenu[2]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(drMenu[3]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(drMenu[4]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(drMenu[6]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_MENUSEQ_NOT_NUMERIC);
        ////                                    }
        ////                                    else
        ////                                    {
        ////                                        sbErrMsg.Append(drMenu[2]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(drMenu[3]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(drMenu[4]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(drMenu[6]);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                        sbErrMsg.Append(AtParDefns.CONST_MENUSEQ_NOT_NUMERIC);
        ////                                    }
        ////                                }
        ////                            }

        ////                            if (drMenu[6].IsNumeric() && drMenu[6] != null)
        ////                            {
        ////                                intMenuSeqNo = (int)drMenu[6];
        ////                            }

        ////                            if (drMenu[6].ToString().Length > 2)
        ////                            {
        ////                                if (_log.IsWarnEnabled)
        ////                                    _log.Warn(methodBaseName + "Profile Menu Access - Sequence Number should be 0-99 :" + profileMenuTemplateId);

        ////                                if (!string.IsNullOrEmpty(errorMessage))
        ////                                {
        ////                                    //.Append(pErrorMessage)
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_COMMA_SEPARATOR);
        ////                                    sbErrMsg.Append(System.Environment.NewLine);
        ////                                    sbErrMsg.Append(drMenu[2]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(drMenu[3]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(drMenu[4]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(drMenu[6]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_MENUSEQ_NOT_VALID);
        ////                                }
        ////                                else
        ////                                {
        ////                                    sbErrMsg.Append(drMenu[2]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(drMenu[3]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(drMenu[4]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(drMenu[6]);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_ERR_SEPARATOR);
        ////                                    sbErrMsg.Append(AtParDefns.CONST_MENUSEQ_NOT_VALID);
        ////                                }
        ////                            }
        ////                        }
        ////                        //To Update the default dataset with changed values

        ////                        DataRow[] dr = null;
        ////                        dr = profileDefaultData.Tables["MENUS"].Select("APP_ID = '" + drMenu[1] + "'" + " AND  MENU_NAME= '" + drMenu[4] + "' ");

        ////                        if (!string.IsNullOrEmpty(errorMessage))
        ////                        {
        ////                            errorMessage = errorMessage + sbErrMsg.ToString();
        ////                        }
        ////                        else
        ////                        {
        ////                            errorMessage = sbErrMsg.ToString();
        ////                        }
        ////                        sbErrMsg.Remove(0, sbErrMsg.Length);
        ////                    }
        ////                }
        ////            }
        ////            profileDefaultData.AcceptChanges();

        ////            if (_log.IsDebugEnabled)
        ////                _log.Debug("pErrorMessage  in MenuError table  :" + errorMessage);
        ////        }
        ////        tupleOutput = new Tuple<string, long>(string.Empty, AtparStatusCodes.ATPAR_OK);
        ////        return tupleOutput;

        ////    }
        ////    catch (Exception ex)
        ////    {
        ////        if (_log.IsFatalEnabled)
        ////            _log.Fatal("Exception Thrown in Main Try " + methodBaseName + " is..." + System.Environment.NewLine + ex.ToString());

        ////        tupleOutput = new Tuple<string, long>(string.Empty, AtparStatusCodes.E_SERVERERROR);
        ////        return tupleOutput;

        ////    }


        ////}
        //private string ValidateProfileColumnNames(DataSet profileData)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    string strErrMsg = string.Empty;

        //    try
        //    {
        //        foreach (DataColumn dc in profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParameters.ToString()].Columns)
        //        {
        //            string strName = dc.ColumnName.ToString();

        //            if (strName != "PROFILE_PARAM_TEMPLATE_ID")
        //            {
        //                strName = strName.Substring(strName.IndexOf("_") + 1);
        //                if (!Enum.IsDefined(typeof(AtParWebEnums.AppParameters_Enum), strName))
        //                {
        //                    strErrMsg = " Parameter ID :" + strName + " is not defined in atpar application parameters enum ";

        //                    if (_log.IsDebugEnabled)
        //                        _log.Debug(strErrMsg);

        //                }
        //            }
        //        }
        //        return strErrMsg;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }


        //}
        //private long ValidateParameterTemplateId(ref DataSet profileData, ref DataSet profileDefaultData, string profileTemplateId, string parameterTemplateId, ref string errorMessage)
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    StringBuilder sbErrorString = new StringBuilder();
        //    bool blnMandatory = false;

        //    try
        //    {
        //        DataRow[] drParameters = null;

        //        drParameters = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParameters.ToString()].Select("PROFILE_PARAM_TEMPLATE_ID = '" + parameterTemplateId + "'");

        //        if (_log.IsDebugEnabled)
        //            _log.Debug("ProfileParamTemplateID  count in ProfileParameters Table " + methodBaseName + " is .. " + drParameters.Length);

        //        if (drParameters.Length == 0)
        //        {
        //            errorMessage = AtParDefns.CONST_PARAMETERTEMPLATEID_IS_MANDATORY;
        //            return AtparStatusCodes.ATPAR_OK;
        //        }

        //        //Check If mandatory fields existing or not
        //        if (drParameters.Length > 0)
        //        {
        //            foreach (DataRow dr in drParameters)
        //            {

        //                if (dr["PROFILE_PARAM_TEMPLATE_ID"] == null)
        //                {
        //                    if (sbErrorString.ToString() == string.Empty)
        //                    {
        //                        sbErrorString.Append("ProfileParamTemplateID ");
        //                    }
        //                    blnMandatory = true;
        //                }
        //                else if (string.IsNullOrEmpty(dr["PROFILE_PARAM_TEMPLATE_ID"].ToString()))
        //                {
        //                    if (sbErrorString.ToString() == string.Empty)
        //                    {
        //                        sbErrorString.Append("ProfileParamTemplateID ");
        //                    }
        //                    blnMandatory = true;
        //                }
        //                //CartCount
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_COUNT_HIGH_PCT.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_COUNT_HIGH_PCT.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Item Count High% ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Item Count High% ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_COUNT_HIGH_PCT.ToString()].ToString() == string.Empty)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Item Count High% ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Item Count High% ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_COUNT_LOW_PCT.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_COUNT_LOW_PCT.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Item Count Low% ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Item Count Low% ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_COUNT_LOW_PCT.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Item Count Low% ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Item Count Low% ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.QTY_OPTION.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.QTY_OPTION.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Default Count Option (Count/Request/None) ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Default Count Option (Count/Request/None) ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.QTY_OPTION.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Default Count Option (Count/Request/None) ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Default Count Option (Count/Request/None) ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Max. allowable Count/Request Quantity ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Max. allowable Count/Request Quantity ");
        //                        }
        //                        blnMandatory = true;

        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Max. allowable Count/Request Quantity ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Max. allowable Count/Request Quantity ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY_DIGITS.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY_DIGITS.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Max. allowable number of digits ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Max. allowable number of digits ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY_DIGITS.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Max. allowable number of digits ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Max. allowable number of digits ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }
        //                //STATUS_OF_REQUISITION

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.STATUS_OF_REQUISITION.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.STATUS_OF_REQUISITION.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Delivery Status of Material Requisition");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Delivery Status of Material Requisition ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.STATUS_OF_REQUISITION.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CartCount Delivery Status of Material Requisition ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CartCount Delivery Status of Material Requisition ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                //CycleCount

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.SYS_COUNT_PCT_DEVIATION.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.SYS_COUNT_PCT_DEVIATION.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CycleCount System Count deviation% ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CycleCount System Count deviation% ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.SYS_COUNT_PCT_DEVIATION.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("CycleCount System Count deviation% ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", CycleCount System Count deviation% ");
        //                        }
        //                        blnMandatory = true;

        //                    }
        //                }
        //                //Receiving

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Receiving Default Date Range ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Receiving Default Date Range ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Receiving Default Date Range ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Receiving Default Date Range ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_RECV_HIGH_PCT.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_RECV_HIGH_PCT.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Receiving Item Receive High ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Receiving Item Receive High ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_RECV_HIGH_PCT.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Receiving Item Receive High ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Receiving Item Receive High ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_RECV_LOW_PCT.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_RECV_LOW_PCT.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Receiving Item Receive Low ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Receiving Item Receive Low ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_RECV_LOW_PCT.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Receiving Item Receive Low ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Receiving Item Receive Low ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.PO_IUT_RECEIVING.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.PO_IUT_RECEIVING.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Receiving Purchasing/Inter Unit/Both ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Receiving Purchasing/Inter Unit/Both ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.PO_IUT_RECEIVING.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Receiving Purchasing/Inter Unit/Both ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Receiving Purchasing/Inter Unit/Both ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                //Receiving print options  RECEIPT_DELIVER_PRINT_OPTIONS

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.RECEIPT_DELIVER_PRINT_OPTIONS.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.RECEIPT_DELIVER_PRINT_OPTIONS.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Receipt Deliver print options ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Receipt Deliver print options ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.RECEIPT_DELIVER_PRINT_OPTIONS.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Receipt Deliver print options ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Receipt Deliver print options ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }


        //                //PickPlan

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PICK_HIGH_PCT.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PICK_HIGH_PCT.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Item Pick High ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Item Pick High ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PICK_HIGH_PCT.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Item Pick High ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Item Pick High ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PICK_LOW_PCT.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PICK_LOW_PCT.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Item Pick Low ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Item Pick Low ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PICK_LOW_PCT.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Item Pick Low ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Item Pick Low ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.SHIPPING_LABEL_PRINT_OPTIONS.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.SHIPPING_LABEL_PRINT_OPTIONS.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Shipping Label Print Options ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Shipping Label Print Options ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.SHIPPING_LABEL_PRINT_OPTIONS.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Shipping Label Print Options ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Shipping Label Print Options ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }
        //                //Deliver

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Deliver Default Date Range ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Deliver Default Date Range ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Deliver Default Date Range ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Deliver Default Date Range ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }
        //                //PutAway

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ALLOW_LESS_QTY.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ALLOW_LESS_QTY.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Allow less than Base Quantity ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Allow less than Base Quantity ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ALLOW_LESS_QTY.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Allow less than Base Quantity ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Allow less than Base Quantity ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_HIGH_PCT.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_HIGH_PCT.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Item Putaway High ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Item Putaway High ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_HIGH_PCT.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Item Putaway High ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Item Putaway High ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_LOW_PCT.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_LOW_PCT.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Item Putaway Low ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Item Putaway Low ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_LOW_PCT.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Item Putaway Low ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Item Putaway Low ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.PO_IUT_RECEIVING.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.PO_IUT_RECEIVING.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Putaway Purchasing/Inter Unit Receiving ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Putaway Purchasing/Inter Unit Receiving ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.PO_IUT_RECEIVING.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Putaway Purchasing/Inter Unit Receiving ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Putaway Purchasing/Inter Unit Receiving ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }
        //                //TrackIT

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("TrackIT Default Date Range ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", TrackIT Default Date Range ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("TrackIT Default Date Range ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", TrackIT Default Date Range ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }
        //                //StockIssue

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY.ToString()] == null)
        //                    {
        //                        if (_log.IsDebugEnabled)
        //                            _log.Debug(methodBaseName + "hi");
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("StockIssue Max. allowable Issue Quantity ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", StockIssue Max. allowable Issue Quantity ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("StockIssue Max. allowable Issue Quantity ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", StockIssue Max. allowable Issue Quantity ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY_DIGITS.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY_DIGITS.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("StockIssue Max. allowable number of digits ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", StockIssue Max. allowable number of digits ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY_DIGITS.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("StockIssue Max. allowable number of digits ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", StockIssue Max. allowable number of digits ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }
        //                //Point Of Use

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_POU_SCREEN.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_POU_SCREEN.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Point Of Use Default POU Screen ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Point Of Use Default POU Screen ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_POU_SCREEN.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Point Of Use Default POU Screen ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Point Of Use Default POU Screen ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.POU_CASECART_ACCESS.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.POU_CASECART_ACCESS.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Point Of Use Access to POU / CaseCart Menu ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Point Of Use Access to POU / CaseCart Menu ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.POU_CASECART_ACCESS.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Point Of Use Access to POU / CaseCart Menu ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Point Of Use Access to POU / CaseCart Menu ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.POU_CASECART_ACCESS.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.POU_CASECART_ACCESS.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Point Of Use Access to POU / CaseCart Menu ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Point Of Use Access to POU / CaseCart Menu ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.POU_CASECART_ACCESS.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Point Of Use Access to POU / CaseCart Menu ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Point Of Use Access to POU / CaseCart Menu ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.MAX_ALLOW_QTY.ToString()))
        //                {
        //                    if (dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.MAX_ALLOW_QTY.ToString()] == null)
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Point Of Use Max. allowable Quantity ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Point Of Use Max. allowable Quantity ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                    else if (string.IsNullOrEmpty(dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.MAX_ALLOW_QTY.ToString()].ToString()))
        //                    {
        //                        if (sbErrorString.ToString() == string.Empty)
        //                        {
        //                            sbErrorString.Append("Point Of Use Max. allowable Quantity ");
        //                        }
        //                        else
        //                        {
        //                            sbErrorString.Append(", Point Of Use Max. allowable Quantity ");
        //                        }
        //                        blnMandatory = true;
        //                    }
        //                }
        //                if (blnMandatory)
        //                {
        //                    sbErrorString.Append(" is/are Mandatory Field");

        //                    if (!string.IsNullOrEmpty(errorMessage))
        //                    {
        //                        errorMessage = errorMessage + ", " + sbErrorString.ToString();
        //                    }
        //                    else
        //                    {
        //                        errorMessage = sbErrorString.ToString();
        //                    }
        //                    sbErrorString = null;
        //                    sbErrorString = new StringBuilder();
        //                    blnMandatory = false;
        //                    continue;
        //                }
        //                else
        //                {
        //                    sbErrorString = null;
        //                    sbErrorString = new StringBuilder();
        //                }
        //            }
        //        }
        //        return AtparStatusCodes.ATPAR_OK;

        //    }
        //    catch (Exception ex)
        //    {
        //        profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].Rows[0]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_CREATION_FAILED;
        //        if (_log.IsFatalEnabled)
        //            _log.Fatal("Exception Thrown in Main Try " + methodBaseName + " is..." + System.Environment.NewLine + ex.ToString());
        //        return AtparStatusCodes.E_SERVERERROR;
        //    }


        //}
        //private long AddUpdateOrgGroup(string user, DataSet dsOrgUploadData, string mode)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    var response = new AtParWebApiResponse<long>();
        //    DataSet dsActualOrgUploadData = new DataSet();
        //    DataRow[] drOrgData = null;
        //    DataRow[] drOrgBUData = null;
        //    string orgID = string.Empty;
        //    string orgGroupID = string.Empty;
        //    long statusCode = -1;
        //    List<MT_ATPAR_ORG_GROUP_PARAMETERS> lstOrgGrpParams = dsActualOrgUploadData.Tables["dtOrgParameters"].ToList<MT_ATPAR_ORG_GROUP_PARAMETERS>();
        //    MT_ATPAR_ORG_GROUP_PARAMETERS orgGrpParam = null;
        //    try
        //    {
        //        dsActualOrgUploadData = dsOrgUploadData.Copy();
        //        drOrgData = dsActualOrgUploadData.Tables["dtOrgData"].Select("ORG_GROUP_ID <> '" + orgID + "'");
        //        drOrgBUData = dsActualOrgUploadData.Tables["dtOrgBUData"].Select("ORG_GROUP_ID <> '" + orgID + "'");

        //        foreach (DataRow dr in drOrgData)
        //        {
        //            dsActualOrgUploadData.Tables["dtOrgData"].Rows.Remove(dr);

        //        }
        //        foreach (DataRow dr in drOrgBUData)
        //        {
        //            dsActualOrgUploadData.Tables["dtOrgBUData"].Rows.Remove(dr);
        //        }

        //        dsActualOrgUploadData.AcceptChanges();

        //        if (dsActualOrgUploadData.Tables["dtOrgData"].Rows.Count > 0)
        //        {
        //            List<MT_ATPAR_ORG_GROUPS> lstOrgGroups = dsActualOrgUploadData.Tables["dtOrgData"].ToList<MT_ATPAR_ORG_GROUPS>();
        //            if (mode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //            {
        //                statusCode = _userUploadRepo.InsertOrgGroups(user, lstOrgGroups);
        //            }
        //            else
        //            {
        //                statusCode = _userUploadRepo.UpdateOrgGroups(user, lstOrgGroups);
        //            }
        //        }
        //        if (dsActualOrgUploadData.Tables["dtOrgBUData"].Rows.Count > 0)
        //        {
        //            List<MT_ATPAR_ORG_GROUP_BUNITS> lstOrgBUnit = dsActualOrgUploadData.Tables["dtOrgBUData"].ToList<MT_ATPAR_ORG_GROUP_BUNITS>();

        //            if (mode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //            {
        //                statusCode = _userUploadRepo.InsertListofOrgBuData(user, lstOrgBUnit);
        //            }
        //            else
        //            {
        //                MT_ATPAR_ORG_GROUP_BUNITS objOrgGroup = lstOrgBUnit[0];
        //                statusCode = _userUploadRepo.DeleteOrgBuData(user, objOrgGroup);
        //                statusCode = _userUploadRepo.InsertListofOrgBuData(user, lstOrgBUnit);
        //            }
        //        }

        //        if (dsActualOrgUploadData.Tables["dtOrgParameters"].Rows.Count > 0)
        //        {
        //            bool _blnSetLotSel_MMIS = false;
        //            bool _blnSetLotSel_NONE = false;
        //            string _strLotSel = string.Empty;
        //            if (mode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //            {
        //                for (int intCount = 0; intCount <= dsActualOrgUploadData.Tables["dtOrgParameters"].Rows.Count - 1; intCount++)
        //                {
        //                    orgGrpParam = lstOrgGrpParams[intCount];
        //                    /////starting of logic to handle when Lot serial enable is MMIS and NONE(for Receive and PickPlan)///'

        //                    if (dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["APP_ID"].ToString()
        //                        == AtParWebEnums.EnumApps.Receiving.ToString() |
        //                        dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["APP_ID"].ToString()
        //                        == AtParWebEnums.EnumApps.PickPlan.ToString())
        //                    {

        //                        if ((dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString() &&
        //                            dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString()
        //                            == AtParWebEnums.Enable_Lot_Serial_Tracking.MMIS.ToString()))
        //                        {
        //                            _blnSetLotSel_MMIS = true;
        //                        }

        //                        if ((dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString() &&
        //                            dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString()
        //                            == AtParWebEnums.Enable_Lot_Serial_Tracking.MMIS.ToString()))
        //                        {
        //                            _blnSetLotSel_MMIS = true;
        //                        }

        //                        if ((dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString() &&
        //                            dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString()
        //                            == AtParWebEnums.Enable_Lot_Serial_Tracking.None.ToString()))
        //                        {
        //                            _blnSetLotSel_NONE = true;
        //                        }

        //                        if ((dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString() &
        //                            dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString()
        //                            == AtParWebEnums.Enable_Lot_Serial_Tracking.None.ToString()))
        //                        {
        //                            _blnSetLotSel_NONE = true;
        //                        }



        //                        if (dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString() |
        //                            dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.PICK_SEND_LOT_SRL_INFO_TO_MMIS.ToString())
        //                        {
        //                            if (_blnSetLotSel_MMIS)
        //                            {
        //                                _strLotSel = AtParWebEnums.YesNo_Enum.Y.ToString();
        //                            }
        //                            else if (_blnSetLotSel_NONE)
        //                            {
        //                                _strLotSel = AtParWebEnums.YesNo_Enum.N.ToString();
        //                            }
        //                            else
        //                            {
        //                                _strLotSel = dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString();
        //                            }
        //                            _blnSetLotSel_MMIS = false;
        //                            _blnSetLotSel_NONE = false;
        //                        }
        //                        else
        //                        {
        //                            _strLotSel = dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString();
        //                        }

        //                        /////End of logic to handle when Lot serial enable is MMIS and NONE(for Receive and PickPlan)///'

        //                        statusCode = _userUploadRepo.InsertOrgGrpParams(user, _strLotSel, orgGrpParam);

        //                    }
        //                    else
        //                    {
        //                        statusCode = _userUploadRepo.InsertOrgGrpParams(user, _strLotSel, orgGrpParam);
        //                    }

        //                }
        //            }
        //            else
        //            {
        //                for (int intCount = 0; intCount <= dsActualOrgUploadData.Tables["dtOrgParameters"].Rows.Count - 1; intCount++)
        //                {
        //                    /////starting of logic to handle when Lot serial enable is MMIS and NONE(for Receive and PickPlan)///'
        //                    orgGrpParam = lstOrgGrpParams[intCount];
        //                    if (dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["APP_ID"].ToString()
        //                        == AtParWebEnums.EnumApps.Receiving.ToString() |
        //                        dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["APP_ID"].ToString()
        //                        == AtParWebEnums.EnumApps.PickPlan.ToString())
        //                    {

        //                        if ((dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString() &&
        //                            dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString()
        //                            == AtParWebEnums.Enable_Lot_Serial_Tracking.MMIS.ToString()))
        //                        {
        //                            _blnSetLotSel_MMIS = true;
        //                        }

        //                        if ((dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString() &
        //                            dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString()
        //                            == AtParWebEnums.Enable_Lot_Serial_Tracking.MMIS.ToString()))
        //                        {
        //                            _blnSetLotSel_MMIS = true;
        //                        }


        //                        if ((dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString() &&
        //                            dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString()
        //                            == AtParWebEnums.Enable_Lot_Serial_Tracking.None.ToString()))
        //                        {
        //                            _blnSetLotSel_NONE = true;
        //                        }

        //                        if ((dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString() &
        //                            dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString()
        //                            == AtParWebEnums.Enable_Lot_Serial_Tracking.None.ToString()))
        //                        {
        //                            _blnSetLotSel_NONE = true;
        //                        }


        //                        if (dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString() |
        //                            dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_ID"].ToString()
        //                            == AtParWebEnums.AppParameters_Enum.PICK_SEND_LOT_SRL_INFO_TO_MMIS.ToString())
        //                        {
        //                            if (_blnSetLotSel_MMIS)
        //                            {
        //                                _strLotSel = AtParWebEnums.YesNo_Enum.Y.ToString();
        //                            }
        //                            else if (_blnSetLotSel_NONE)
        //                            {
        //                                _strLotSel = AtParWebEnums.YesNo_Enum.N.ToString();
        //                            }
        //                            else
        //                            {
        //                                _strLotSel = dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString();
        //                            }
        //                            _blnSetLotSel_MMIS = false;
        //                            _blnSetLotSel_NONE = false;
        //                        }
        //                        else
        //                        {
        //                            _strLotSel = dsActualOrgUploadData.Tables["dtOrgParameters"].Rows[intCount]["PARAMETER_VALUE"].ToString();
        //                        }
        //                        /////End of logic to handle when Lot serial enable is MMIS and NONE(for Receive and PickPlan)///'
        //                        //
        //                        statusCode = _userUploadRepo.UpdateOrgGrpParams(user, _strLotSel, orgGrpParam);
        //                    }
        //                    else
        //                    {
        //                        statusCode = _userUploadRepo.UpdateOrgGrpParams(user, _strLotSel, orgGrpParam);
        //                    }


        //                }

        //            }
        //        }


        //        return AtparStatusCodes.ATPAR_OK;
        //    }
        //    catch (Exception ex)
        //    {
        //        return AtparStatusCodes.E_SERVERERROR;
        //    }
        //}
        //private string ValidateOrgColumnNames(DataSet dsOrgGroupData)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    string errMsg = string.Empty;
        //    try
        //    {
        //        foreach (DataColumn dc in dsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupParams.ToString()].Columns)
        //        {
        //            string strName = dc.ColumnName.ToString();
        //            if (strName != "PARAMETER_TEMPLATE_ID")
        //            {
        //                strName = strName.Substring(strName.IndexOf("_") + 1);
        //                if (!Enum.IsDefined(typeof(AtParWebEnums.AppParameters_Enum), strName))
        //                {
        //                    errMsg = " Parameter ID :" + strName + " is not defined in atpar application parameters enum ";

        //                }
        //            }
        //        }
        //        return errMsg;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        //private long GetOrgGroupDetails(string pstrParameterTemplateId, string errorMsg, DataSet pDsOrgUploadData, DataSet pdsOrgdata)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
        //    //Get the No Of Rows For Parameter Template ID 
        //    const string CONST_ORG_NOT_EXIST = "Org Group ID Does Not Exist";
        //    const string CONST_BUNIT_INVALID_DATA = "Org Creation Failed, BusinessUnit Should be Unique, Invalid Data";
        //    const string CONST_ORGGROUPID_INVALID_DATA = "Org Creation Failed, Org Group ID Should be Unique, Invalid Data";
        //    const string CONST_BUNIT_INVENTORY_TYPE = "I";
        //    const string CONST_BUNIT_PURCHASING_TYPE = "P";
        //    bool _blnIsValidData = false;
        //    errorMsg = string.Empty;

        //    try
        //    {
        //        DataRow[] _dr = null;
        //        _dr = pDsOrgUploadData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupBU.ToString()].Select("ParameterTemplateID = '" + pstrParameterTemplateId + "'");

        //        if (_dr.Length == 0)
        //        {
        //            errorMsg = CONST_ORG_NOT_EXIST;
        //            return AtparStatusCodes.ATPAR_OK;
        //        }
        //        if (_dr.Length > 1)
        //        {
        //            //Loop the rows and checkorggroupid and orggroupname should be same and buint should be unique for each row
        //            foreach (DataRow _drOrg in _dr)
        //            {
        //                DataRow[] _drUniqueBUnit = null;
        //                _drUniqueBUnit = pDsOrgUploadData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupBU.ToString()].Select("OrgGroupID= '" + _drOrg[AtParWebEnums.Enum_OrgGroupBU.OrgGroupID.ToString()] + "'" + " and  BusinessUnit= '" + _drOrg[AtParWebEnums.Enum_OrgGroupBU.BusinessUnit.ToString()] + "' and BusinessUnitType='" + _drOrg[AtParWebEnums.Enum_OrgGroupBU.BusinessUnitType.ToString()] + "'");

        //                if (_drUniqueBUnit.Length > 1)
        //                {
        //                    //BusinessUnit should be unique
        //                    errorMsg = CONST_BUNIT_INVALID_DATA;
        //                    return AtparStatusCodes.ATPAR_OK;
        //                }
        //                else
        //                {
        //                    _blnIsValidData = true;
        //                }


        //            }
        //        }
        //        if (_dr.Length == 1)
        //        {
        //            _blnIsValidData = true;
        //        }

        //        if (_blnIsValidData)
        //        {
        //            DataTable dtOrg = new DataTable();
        //            dtOrg.TableName = "dtOrgData";
        //            dtOrg.Columns.Add("ORG_GROUP_ID", System.Type.GetType("System.String"));
        //            dtOrg.Columns.Add("ORG_GROUP_NAME", System.Type.GetType("System.String"));

        //            DataTable dtOrgBU = new DataTable();
        //            dtOrgBU.TableName = "dtOrgBUData";
        //            dtOrgBU.Columns.Add("ORG_GROUP_ID", System.Type.GetType("System.String"));
        //            dtOrgBU.Columns.Add("BUSINESS_UNIT", System.Type.GetType("System.String"));
        //            dtOrgBU.Columns.Add("BU_TYPE", System.Type.GetType("System.String"));

        //            DataRow _drOrgData = default(DataRow);
        //            DataRow[] _checkdrOrgData = null;
        //            foreach (DataRow _drOrg in _dr)
        //            {
        //                _drOrgData = dtOrg.NewRow();
        //                _drOrgData["ORG_GROUP_ID"] = _drOrg["OrgGroupID"];
        //                _drOrgData["ORG_GROUP_NAME"] = _drOrg["OrgGroupDescr"];
        //                //_drOrg("F2") 
        //                _checkdrOrgData = dtOrg.Select("ORG_GROUP_ID= '" + _drOrg["OrgGroupID"] + "' and ORG_GROUP_NAME= '" + _drOrg["OrgGroupDescr"] + "'");

        //                if (_checkdrOrgData.Length == 0)
        //                {
        //                    dtOrg.Rows.Add(_drOrgData);
        //                }
        //            }

        //            pdsOrgdata.Tables.Add(dtOrg);

        //            DataRow _drOrgBUData = default(DataRow);
        //            DataRow[] _checkdrOrgBUData = null;
        //            foreach (DataRow _drOrgBU in _dr)
        //            {
        //                _drOrgBUData = dtOrgBU.NewRow();
        //                _drOrgBUData["ORG_GROUP_ID"] = _drOrgBU["OrgGroupID"];
        //                _drOrgBUData["BUSINESS_UNIT"] = _drOrgBU["BusinessUnit"];
        //                //_drOrgBU("F3") 
        //                if (_drOrgBU["BusinessUnitType"].ToString() == AtParWebEnums.BusinessType.Inventory.ToString())
        //                {
        //                    _drOrgBUData["BU_TYPE"] = CONST_BUNIT_INVENTORY_TYPE;
        //                }
        //                else
        //                {
        //                    _drOrgBUData["BU_TYPE"] = CONST_BUNIT_PURCHASING_TYPE;
        //                }
        //                // _drOrgBUData("BU_TYPE") = _drOrgBU("Business Unit Type") '_drOrgBU("F5") 
        //                _checkdrOrgBUData = dtOrgBU.Select("ORG_GROUP_ID= '" + _drOrgBU["OrgGroupID"] + "' and  BUSINESS_UNIT= '" + _drOrgBU["BusinessUnit"] + "' and BU_TYPE= '" + _drOrgBUData["BU_TYPE"] + "'");

        //                if (_checkdrOrgBUData.Length == 0)
        //                {
        //                    dtOrgBU.Rows.Add(_drOrgBUData);
        //                }


        //            }
        //            pdsOrgdata.Tables.Add(dtOrgBU);
        //        }

        //        return AtparStatusCodes.ATPAR_OK;
        //    }
        //    catch (Exception ex)
        //    {

        //        return AtparStatusCodes.E_SERVERERROR;
        //    }



        //}

        //private DataTable GetOrgGroupParametersList(DataRow dr, string pstrOrgGroupId, DataTable dtOrgParameters)
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        dtOrgParameters.TableName = "dtOrgParameters";

        //        dtOrgParameters.Columns.Add("ORG_GROUP_ID", System.Type.GetType("System.String"));
        //        dtOrgParameters.Columns.Add("APP_ID", System.Type.GetType("System.Int32"));
        //        dtOrgParameters.Columns.Add("PARAMETER_ID", System.Type.GetType("System.String"));
        //        dtOrgParameters.Columns.Add("PARAMETER_VALUE", System.Type.GetType("System.String"));
        //        foreach (DataColumn _dc in dr.Table.Columns)
        //        {
        //            DataRow _drOrgparameters = default(DataRow);
        //            string strParameterID = _dc.ColumnName.ToString();
        //            string strAppID = _dc.ColumnName.ToString();
        //            if (strParameterID != "PARAMETER_TEMPLATE_ID")
        //            {
        //                strParameterID = strParameterID.Substring(strParameterID.IndexOf("_") + 1);
        //                strAppID = strAppID.Substring(0, strAppID.IndexOf("_"));
        //                _drOrgparameters = dtOrgParameters.NewRow();
        //                _drOrgparameters["PARAMETER_ID"] = strParameterID;
        //                _drOrgparameters["APP_ID"] = Convert.ToInt32(strAppID);
        //                _drOrgparameters["PARAMETER_VALUE"] = dr[_dc.ColumnName.ToString()].ToString();
        //                _drOrgparameters["ORG_GROUP_ID"] = pstrOrgGroupId;
        //                dtOrgParameters.Rows.Add(_drOrgparameters);
        //            }
        //        }


        //        return dtOrgParameters;

        //    }
        //    catch (Exception ex)
        //    {
        //        return null;
        //    }

        //}
        //private string ValidateOrgData(DataRow dr, DataSet _dsBunits)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        string strChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //        string strNumbers = "0123456789";
        //        string strYN = "YN";
        //        string strValid = string.Empty;
        //        string ch = string.Empty;
        //        string strCtrlText = string.Empty;
        //        string strErrMsg = string.Empty;
        //        DataRow[] _dr = null;
        //        string _strSearch = string.Empty;
        //        string _strBUType = string.Empty;
        //        string _strBunitTypeSearch = string.Empty;
        //        DataRow[] _drBunitType = null;

        //        //ORG_GROUP_ID
        //        strCtrlText = dr[AtParWebEnums.Enum_OrgGroupBU.OrgGroupID.ToString()].ToString().Trim();
        //        if (strCtrlText == "all")
        //        {
        //            strErrMsg = "You are not authorised to change the org group " + strCtrlText;
        //            return strErrMsg;
        //        }
        //        strValid = strChars + strNumbers + "_";
        //        if (!string.IsNullOrEmpty(strCtrlText))
        //        {
        //            if (strCtrlText.Length > 20)
        //            {
        //                strErrMsg = "  Number of characters cannot be more than 20 For OrgGroupID " + dr[AtParWebEnums.Enum_OrgGroupBU.OrgGroupID.ToString()].ToString();

        //                return strErrMsg;
        //            }
        //            for (int intCnt = 0; intCnt <= strCtrlText.Length - 1; intCnt++)
        //            {
        //                ch = strCtrlText[intCnt].ToString();
        //                if (strValid.IndexOf(ch) == -1)
        //                {
        //                    strErrMsg = " Only characters, numbers or underscore is allowed  For OrgGroupId   " + dr[AtParWebEnums.Enum_OrgGroupBU.OrgGroupID.ToString()].ToString();
        //                    return strErrMsg;
        //                }
        //            }
        //        }


        //        //ORG_GROUP_NAME
        //        strCtrlText = dr[AtParWebEnums.Enum_OrgGroupBU.OrgGroupDescr.ToString()].ToString().Trim();
        //        if (strCtrlText.Length > 50)
        //        {
        //            strErrMsg = "  Number of characters cannot be more than 50 For OrgGroup Name " + dr[AtParWebEnums.Enum_OrgGroupBU.OrgGroupDescr.ToString()].ToString();
        //            return strErrMsg;
        //        }

        //        //BUSINESS_UNIT
        //        strCtrlText = dr[AtParWebEnums.Enum_OrgGroupBU.BusinessUnit.ToString()].ToString();

        //        //BU_TYPE
        //        _strBUType = dr[AtParWebEnums.Enum_OrgGroupBU.BusinessUnitType.ToString()].ToString();

        //        if (_strBUType == AtParWebEnums.BusinessType.Purchasing.ToString())
        //        {
        //            _strBUType = "P";
        //        }
        //        else if (_strBUType == AtParWebEnums.BusinessType.Inventory.ToString())
        //        {
        //            _strBUType = "I";
        //        }

        //        if (strCtrlText.Length > 50)
        //        {
        //            strErrMsg = "  Number of characters cannot be more than 50 For BusinessUnit " + dr[AtParWebEnums.Enum_OrgGroupBU.BusinessUnit.ToString()].ToString();

        //        }
        //        else
        //        {
        //            if ((_dsBunits != null))
        //            {
        //                if (_dsBunits.Tables.Count > 0)
        //                {
        //                    _strSearch = "BUSINESS_UNIT = '" + strCtrlText + "'";
        //                    _dr = _dsBunits.Tables[0].Select(_strSearch);
        //                    if (_dr.Length == 0)
        //                    {
        //                        strErrMsg = "Please insert valid Business Unit(s)";
        //                        return strErrMsg;
        //                    }
        //                    else
        //                    {
        //                        _strBunitTypeSearch = "BUSINESS_UNIT = '" + strCtrlText + "' AND BU_TYPE = '" + _strBUType + "'";
        //                        _drBunitType = _dsBunits.Tables[0].Select(_strBunitTypeSearch);
        //                        if (_drBunitType.Length == 0)
        //                        {
        //                            strErrMsg = "Please insert valid Business Unit Type";

        //                            return strErrMsg;
        //                        }
        //                    }
        //                }
        //            }
        //        }

        //        //BUSINESS_UNIT_TYPE
        //        strCtrlText = dr[AtParWebEnums.Enum_OrgGroupBU.BusinessUnitType.ToString()].ToString();
        //        if (strCtrlText != AtParWebEnums.BusinessType.Inventory.ToString() & strCtrlText != AtParWebEnums.BusinessType.Purchasing.ToString())
        //        {
        //            strErrMsg = "  Business Unit Type should be either Inventory or Purchasing " + dr[AtParWebEnums.Enum_OrgGroupBU.BusinessUnitType.ToString()].ToString();

        //        }
        //        return strErrMsg;
        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }


        //}
        //private string ValidateOrgParamData(DataRow dr, DataSet pdsAppID, string[] pDeviceTokenEntry)
        //{
        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        string strChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //        string strNumbers = "0123456789";
        //        string strYN = "YN";
        //        string strValid = string.Empty;
        //        string ch = string.Empty;
        //        string strCtrlText = string.Empty;
        //        string strErrMsg = string.Empty;

        //        //CartCount
        //        if (pdsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.CartCount + "'").Length > 0)
        //        {
        //            //FACTOR_OF_SAFETY
        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString()].ToString().Trim();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                    {
        //                        strErrMsg = "Factor of safety for recommended par - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                    else if (strCtrlText.Length > 3)
        //                    {
        //                        strErrMsg = "Factor of safety for recommended par - Number of digits cannot be more than 3 : " + dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //            //COORDINATOR_EMAIL_CONSIGNREQ
        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_CONSIGNREQ.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_CONSIGNREQ.ToString()].ToString().Trim();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                    {
        //                        strErrMsg = "Co-ordinator Email ID for Consign Item Requisition - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_CONSIGNREQ.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //            //COORDINATOR_EMAIL_STOCKREQ
        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_STOCKREQ.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_STOCKREQ.ToString()].ToString();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                    {
        //                        strErrMsg = "Co-ordinator Email ID for Stock  Requisition - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_STOCKREQ.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //            //COORDINATOR_EMAIL_STOCKXFER
        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_STOCKXFER.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_STOCKXFER.ToString()].ToString().Trim();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                    {
        //                        strErrMsg = "Co-ordinator Email ID for StockTransfer - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_STOCKXFER.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //            //COORDINATOR_EMAILSTOCKLESSREQ
        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAILSTOCKLESSREQ.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAILSTOCKLESSREQ.ToString()].ToString();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                    {
        //                        strErrMsg = "Co-ordinator Email ID for Stockless Item Requisition - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAILSTOCKLESSREQ.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //            //MM_COORD_EMAIL
        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.MM_COORD_EMAIL.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.MM_COORD_EMAIL.ToString()].ToString();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                    {
        //                        strErrMsg = "Coordinator Email Id - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.MM_COORD_EMAIL.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //            //REQUESTOR_ID
        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_ID.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_ID.ToString()].ToString();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    strValid = strChars + strNumbers + "_";
        //                    for (int intCnt = 0; intCnt <= strCtrlText.Length - 1; intCnt++)
        //                    {
        //                        ch = strCtrlText[intCnt].ToString();
        //                        if (strValid.IndexOf(ch) == -1)
        //                        {
        //                            strErrMsg = " Only characters, numbers or underscore is allowed Requestor : " + dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_ID.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                    }
        //                }
        //            }
        //            //COORDINATOR_EMAIL_NONSTOCKREQ
        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_NONSTOCKREQ.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_NONSTOCKREQ.ToString()].ToString();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                    {
        //                        strErrMsg = "Co-ordinator Email ID for Non  Stock Requisition - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_NONSTOCKREQ.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //        }

        //        //CycleCount

        //        //Receiving

        //        if (pdsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.Receiving + "'").Length > 0)
        //        {
        //            //MAX_NO_OF_REC_DOWNLOAD
        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString()].ToString();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                    {
        //                        strErrMsg = "Max Number of Records to download - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                    else if (strCtrlText.Length > 2)
        //                    {
        //                        strErrMsg = "Max Number of Records to download - Number of digits cannot be more than  2 : " + dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                    if (!(Convert.ToInt32(strCtrlText) > 0))
        //                    {
        //                        strErrMsg = "Max Number of Records to download - Should not be less than 1 : " + dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //            //ERP_USER

        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (strCtrlText.ToString().StartsWith("_"))
        //                    {
        //                        strErrMsg = " Underscore is not allowed as a first character in User ID : " + dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                    else if (strCtrlText.Length > 10)
        //                    {
        //                        strErrMsg = "User ID - Number of characters cannot be more than 10 : " + dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                    strValid = strChars + strNumbers + "_";
        //                    for (int intCnt = 0; intCnt <= strCtrlText.Length - 1; intCnt++)
        //                    {
        //                        ch = strCtrlText[intCnt].ToString();
        //                        if (strValid.IndexOf(ch) == -1)
        //                        {
        //                            strErrMsg = " Only characters, numbers or underscore is allowed User ID : " + dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                    }
        //                }
        //            }
        //            //REQUESTOR_EMAIL_TABLE

        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_EMAIL_TABLE.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_EMAIL_TABLE.ToString()].ToString();
        //                if (strCtrlText.Length > 50)
        //                {
        //                    strErrMsg = " Table/view name to read Email ID for Requestor - Number of characters cannot be more than 50 : " + dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_EMAIL_TABLE.ToString()].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }
        //            //COORDINATOR_EMAIL_RECEIVEREQ
        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_RECEIVEREQ.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_RECEIVEREQ.ToString()].ToString();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                    {
        //                        strErrMsg = "Co-ordinator Email ID for Receive item Requisition - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_RECEIVEREQ.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //            //RECALL_NOTIFICATION_EMAIL

        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()].ToString();
        //                long ConfigData = 0;
        //                bool RecallParameter = false;
        //                AtParWebApiResponse<bool> recall = _commonService.CheckRecall();
        //                ConfigData = recall.StatusCode;
        //                if (ConfigData == AtparStatusCodes.ATPAR_OK)
        //                {
        //                    if (RecallParameter)
        //                    {
        //                        if (string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            strErrMsg = "Email for Recall Notification is Mandatory when Recall Management is implemented : " + dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                    }
        //                }
        //                else
        //                {
        //                    if (_log.IsFatalEnabled)
        //                        _log.Fatal("Exception Thrown in " + methodBaseName + ", Org Creation Failed.Exception is:Error in getting recall enabled parameter from config data.");
        //                    return "E_SERVERERROR";
        //                }
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                    {
        //                        strErrMsg = "Please enter valid Email ID in Email for Recall Notification Textbox : " + dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                }
        //            }
        //        }

        //        //PickPlan
        //        if (pdsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.PickPlan + "'").Length > 0)
        //        {
        //            //DEFAULT_PRIORITY

        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_PRIORITY.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_PRIORITY.ToString()].ToString();
        //                if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                {
        //                    strErrMsg = "Default Priority - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_PRIORITY.ToString()].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //                else if (strCtrlText.Length > 2)
        //                {
        //                    strErrMsg = "Default Priority - Number of digits cannot be more than  2 : " + dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_PRIORITY.ToString()].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }
        //            //'LIMIT_OF_LISTS

        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.LIMIT_OF_LISTS.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.LIMIT_OF_LISTS.ToString()].ToString();
        //                if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                {
        //                    strErrMsg = "Limit number of Lists - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.LIMIT_OF_LISTS.ToString()].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //                else if (strCtrlText.Length > 2)
        //                {
        //                    strErrMsg = "Limit number of Lists - Number of digits cannot be more than : " + dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.LIMIT_OF_LISTS.ToString()].ToString();
        //                    if (_log.IsDebugEnabled)
        //                    {
        //                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                    }
        //                    return strErrMsg;
        //                }
        //            }
        //            //ERP_USER_ID

        //            if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()))
        //            {
        //                strCtrlText = dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                if (!string.IsNullOrEmpty(strCtrlText))
        //                {
        //                    if (strCtrlText.ToString().StartsWith("_"))
        //                    {
        //                        strErrMsg = " Underscore is not allowed as a first character in User ID : " + dr["5_PS_USER"].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                    else if (strCtrlText.Length > 10)
        //                    {
        //                        strErrMsg = "User ID - Number of characters cannot be more than 10 : " + dr["5_PS_USER"].ToString();
        //                        if (_log.IsDebugEnabled)
        //                        {
        //                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                        }
        //                        return strErrMsg;
        //                    }
        //                    strValid = strChars + strNumbers + "_";
        //                    for (int intCnt = 0; intCnt <= strCtrlText.Length - 1; intCnt++)
        //                    {
        //                        ch = strCtrlText[intCnt].ToString();
        //                        if (strValid.IndexOf(ch) == -1)
        //                        {
        //                            strErrMsg = " Only characters, numbers or underscore is allowed User ID : " + dr["5_PS_USER"].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;

        //                        }
        //                    }
        //                }
        //                //COORDINATOR_EMAIL_PICKREQ
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_PICKREQ.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_PICKREQ.ToString()].ToString();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                        {
        //                            strErrMsg = "Co-ordinator Email ID for Pick Requisition - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_PICKREQ.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;

        //                        }
        //                    }

        //                }

        //                //Deliver
        //                if (pdsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.Deliver + "'").Length > 0)
        //                {
        //                    //BADGE_TRACK_INFO

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.BADGE_TRACK_INFO.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.BADGE_TRACK_INFO.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                            {
        //                                strErrMsg = "Track Numbers - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.BADGE_TRACK_INFO.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if ((Convert.ToInt32(strCtrlText) > 3 | Convert.ToInt32(strCtrlText) < 1))
        //                            {
        //                                strErrMsg = "The valid Track Numbers used for reading info from Badge are 1,2,3 : " + dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.BADGE_TRACK_INFO.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                        else
        //                        {
        //                            strErrMsg = "Track Numbers - Please enter valid Swipe Card Track Number : " + dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.BADGE_TRACK_INFO.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }

        //                    }
        //                    //REQUESTOR_EMAIL_TABLE

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_EMAIL_TABLE.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_EMAIL_TABLE.ToString()].ToString();
        //                        if (strCtrlText.Length > 50)
        //                        {
        //                            strErrMsg = "Table/view name to read Email ID for Requestor - Number of characters cannot be more than 50 : " + dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.REQUESTOR_EMAIL_TABLE.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                    }
        //                    //COORDINATOR_EMAIL_EMPLOYEEDATA
        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_EMPLOYEEDATA.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_EMPLOYEEDATA.ToString()].ToString();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                            {
        //                                strErrMsg = "Email ID for employee data load failures notification - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_EMPLOYEEDATA.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                }

        //                //PutAway
        //                if (pdsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.PutAway + "'").Length > 0)
        //                {
        //                    //ERP_USER_ID

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (strCtrlText.ToString().StartsWith("_"))
        //                            {
        //                                strErrMsg = " Underscore is not allowed as a first character in User ID : " + dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if (strCtrlText.Length > 10)
        //                            {
        //                                strErrMsg = "User ID - Number of characters cannot be more than 10 : " + dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            strValid = strChars + strNumbers + "_";
        //                            for (int intCnt = 0; intCnt <= strCtrlText.Length - 1; intCnt++)
        //                            {
        //                                ch = strCtrlText[intCnt].ToString();
        //                                if (strValid.IndexOf(ch) == -1)
        //                                {
        //                                    strErrMsg = " Only characters, numbers or underscore is allowed User ID : " + dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                                    if (_log.IsDebugEnabled)
        //                                    {
        //                                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                    }
        //                                    return strErrMsg;
        //                                }
        //                            }
        //                        }
        //                    }
        //                }

        //                //TrackIT

        //                if (pdsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.TrackIT + "'").Length > 0)
        //                {
        //                    //B_MAX_STOR

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.B_MAX_STOR.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.B_MAX_STOR.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                            {
        //                                strErrMsg = "Max. Storage Period for Box Items - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.B_MAX_STOR.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if (strCtrlText.Length > 4)
        //                            {
        //                                strErrMsg = "Max. Storage Period for Box Items - Number of digits cannot be more than 4 : " + dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.B_MAX_STOR.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                    //E_MAX_STOR

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.E_MAX_STOR.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.E_MAX_STOR.ToString()].ToString();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                            {
        //                                strErrMsg = "Max. Storage Period for Equipment Items - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.E_MAX_STOR.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if (strCtrlText.Length > 4)
        //                            {
        //                                strErrMsg = "Max. Storage Period for Equipment Items - Number of digits cannot be more than 4 : " + dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.E_MAX_STOR.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                    //F_MAX_STOR

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.F_MAX_STOR.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.F_MAX_STOR.ToString()].ToString();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                            {
        //                                strErrMsg = "Max. Storage Period for Furniture Items - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.F_MAX_STOR.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if (strCtrlText.Length > 4)
        //                            {
        //                                strErrMsg = "Max. Storage Period for Furniture Items - Number of digits cannot be more than 4 : " + dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.F_MAX_STOR.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                    //NO_OF_REQUESTS_FOR_SAME_EQ_ITM

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.NO_OF_REQUESTS_FOR_SAME_EQ_ITM.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.NO_OF_REQUESTS_FOR_SAME_EQ_ITM.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                            {
        //                                strErrMsg = "No. Of Requests for same EQ Item - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.NO_OF_REQUESTS_FOR_SAME_EQ_ITM.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if (strCtrlText.Length > 4)
        //                            {
        //                                strErrMsg = "No. Of Requests for same EQ Item - Number of digits cannot be more than 4 : " + dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.NO_OF_REQUESTS_FOR_SAME_EQ_ITM.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                }

        //                //StockIssue
        //                if (pdsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.StockIssue + "'").Length > 0)
        //                {
        //                    //ERP_USER_ID

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (strCtrlText.ToString().StartsWith("_"))
        //                            {
        //                                strErrMsg = " Underscore is not allowed as a first character in User ID : " + dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if (strCtrlText.Length > 10)
        //                            {
        //                                strErrMsg = "User ID - Number of characters cannot be more than 10 : " + dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            strValid = strChars + strNumbers + "_";
        //                            for (int intCnt = 0; intCnt <= strCtrlText.Length - 1; intCnt++)
        //                            {
        //                                ch = strCtrlText[intCnt].ToString();
        //                                if (strValid.IndexOf(ch) == -1)
        //                                {
        //                                    strErrMsg = " Only characters, numbers or underscore is allowed User ID : " + dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                                    if (_log.IsDebugEnabled)
        //                                    {
        //                                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                    }
        //                                    return strErrMsg;
        //                                }
        //                            }
        //                        }
        //                    }
        //                    //COORDINATOR_EMAIL_STOCKISSUE
        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_STOCKISSUE.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_STOCKISSUE.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                            {
        //                                strErrMsg = "Co-ordinator Email ID for Stock Issue/Returns - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.COORDINATOR_EMAIL_STOCKISSUE.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                    //RECALL_NOTIFICATION_EMAIL

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()].ToString().Trim();
        //                        long ConfigData = 0;
        //                        bool RecallParameter = false;
        //                        AtParWebApiResponse<bool> recall = _commonService.CheckRecall();
        //                        ConfigData = recall.StatusCode;
        //                        if (ConfigData == AtparStatusCodes.ATPAR_OK)
        //                        {
        //                            if (RecallParameter)
        //                            {
        //                                if (string.IsNullOrEmpty(strCtrlText))
        //                                {
        //                                    strErrMsg = "Email for Recall Notification is Mandatory when Recall Management is implemented : " + dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()].ToString();
        //                                    if (_log.IsDebugEnabled)
        //                                    {
        //                                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                    }
        //                                    return strErrMsg;
        //                                }
        //                            }
        //                        }
        //                        else
        //                        {
        //                            if (_log.IsFatalEnabled)
        //                                _log.Fatal("Exception Thrown in " + methodBaseName + ", Org Creation Failed.Exception is:Error in getting recall enabled parameter from config data.");
        //                            return "E_SERVERERROR";
        //                        }
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                            {
        //                                strErrMsg = "Please enter valid Email ID in Email for Recall Notification Textbox : " + dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                    //SYNC_FREQUENCY
        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.SYNC_FREQUENCY.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.SYNC_FREQUENCY.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                            {
        //                                strErrMsg = "Frequency for Syncing - Please enter a positive numeric value.";
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if (strCtrlText.Length > 2)
        //                            {
        //                                strErrMsg = "Frequency for Syncing - Max. allowable Frequency value is 99";
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }

        //                }

        //                //BinToBin
        //                if (pdsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.BinToBin + "'").Length > 0)
        //                {
        //                    //ERP_USER_ID
        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (strCtrlText.ToString().StartsWith("_"))
        //                            {
        //                                strErrMsg = " Underscore is not allowed as a first character in User ID  : " + dr[AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if (strCtrlText.Length > 10)
        //                            {
        //                                strErrMsg = "User ID - Number of characters cannot be more than 10 : " + dr[AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            strValid = strChars + strNumbers + "_";
        //                            for (int intCnt = 0; intCnt <= strCtrlText.Length - 1; intCnt++)
        //                            {
        //                                ch = strCtrlText[intCnt].ToString();
        //                                if (strValid.IndexOf(ch) == -1)
        //                                {
        //                                    strErrMsg = " Only characters, numbers or underscore is allowed User ID : " + dr[AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString();
        //                                    if (_log.IsDebugEnabled)
        //                                    {
        //                                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                    }
        //                                    return strErrMsg;
        //                                }
        //                            }
        //                        }
        //                    }
        //                }

        //                //Point Of Use            
        //                if (pdsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.PointOfUse + "'").Length > 0)
        //                {
        //                    //DURATION_TRACKING_EXP

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DURATION_TRACKING_EXP.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DURATION_TRACKING_EXP.ToString()].ToString().Trim();
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            strErrMsg = "Duration Tracking Expiration in days - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DURATION_TRACKING_EXP.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                        else if (strCtrlText.Length > 3)
        //                        {
        //                            strErrMsg = "Duration Tracking Expiration in days - Number of digits cannot be more than 3 : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DURATION_TRACKING_EXP.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                    }
        //                    //EMAILID_FOR_ALERTS

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.EMAILID_FOR_ALERTS.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.EMAILID_FOR_ALERTS.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (strCtrlText.Length > 50)
        //                            {
        //                                strErrMsg = "Email Id for alerts - Number of characters cannot be more than 50 : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.EMAILID_FOR_ALERTS.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                            {
        //                                strErrMsg = "Please enter valid Email ID in Email Id for alerts Textbox : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.EMAILID_FOR_ALERTS.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                    //FACTOR_OF_SAFETY

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                            {
        //                                strErrMsg = "Factor of safety for recommended par - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                            else if (strCtrlText.Length > 3)
        //                            {
        //                                strErrMsg = "Factor of safety for recommended par - Number of digits cannot be more than 3 : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                    //FREQUENCY_EMAIL_ALERTS

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.FREQUENCY_EMAIL_ALERTS.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.FREQUENCY_EMAIL_ALERTS.ToString()].ToString().Trim();
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            strErrMsg = "Frequency of Email Alerts - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.FREQUENCY_EMAIL_ALERTS.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                        else if (strCtrlText.Length > 10)
        //                        {
        //                            strErrMsg = "Frequency of Email Alerts - Number of digits cannot be more than 10 : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.FREQUENCY_EMAIL_ALERTS.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                    }
        //                    //PERCENTAGE_OPTIMUM_QTY

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.PERCENTAGE_OPTIMUM_QTY.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.PERCENTAGE_OPTIMUM_QTY.ToString()].ToString().Trim();
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            strErrMsg = "Percentage of Optimum quantity - Please enter a positive numeric value : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.PERCENTAGE_OPTIMUM_QTY.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                        else if (strCtrlText.Length > 3)
        //                        {
        //                            strErrMsg = "Percentage of Optimum quantity - Number of digits cannot be more than 3 : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.PERCENTAGE_OPTIMUM_QTY.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                    }
        //                    //RECALL_NOTIFICATION_EMAIL

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()].ToString().Trim();
        //                        long ConfigData = 0;
        //                        bool RecallParameter = false;
        //                        AtParWebApiResponse<bool> recall = _commonService.CheckRecall();
        //                        ConfigData = recall.StatusCode;
        //                        if (ConfigData == AtparStatusCodes.ATPAR_OK)
        //                        {
        //                            if (RecallParameter)
        //                            {
        //                                if (string.IsNullOrEmpty(strCtrlText))
        //                                {
        //                                    strErrMsg = "Email for Recall Notification is Mandatory when Recall Management is implemented : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()].ToString();
        //                                    if (_log.IsDebugEnabled)
        //                                    {
        //                                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                    }
        //                                    return strErrMsg;
        //                                }
        //                            }
        //                        }
        //                        else
        //                        {
        //                            if (_log.IsFatalEnabled)
        //                                _log.Fatal("Exception Thrown in " + methodBaseName + ", Org Creation Failed.Exception is:Error in getting recall enabled parameter from config data.");
        //                            return "E_SERVERERROR";
        //                        }
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                            {
        //                                strErrMsg = "Please enter valid Email ID in Email for Recall Notification Textbox : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.RECALL_NOTIFICATION_EMAIL.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                    //ADJ_REASON_CODE
        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.ADJ_REASON_CODE.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.ADJ_REASON_CODE.ToString()].ToString().Trim();
        //                        if (strCtrlText.Length > 10)
        //                        {
        //                            strErrMsg = "Reason Code for Adjustment Return - Number of digits cannot be more than 10 : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.ADJ_REASON_CODE.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                    }
        //                    //DEFAULT_LEAD_TIME

        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_LEAD_TIME.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_LEAD_TIME.ToString()].ToString().Trim();
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            strErrMsg = "Default lead time in days - Please enter a positive numeric value. : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_LEAD_TIME.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                        else if (strCtrlText.Length > 3)
        //                        {
        //                            strErrMsg = "Default lead time in days - Please enter a positive numeric value. : " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_LEAD_TIME.ToString()].ToString();
        //                            if (_log.IsDebugEnabled)
        //                            {
        //                                if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                            }
        //                            return strErrMsg;
        //                        }
        //                    }
        //                    //EMAILID_FOR_PRODUCT_EXP_ALERTS
        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.EMAILID_FOR_PRODUCT_EXP_ALERTS.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.EMAILID_FOR_PRODUCT_EXP_ALERTS.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                            {
        //                                strErrMsg = "Email for Product Expiration Alerts - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.EMAILID_FOR_PRODUCT_EXP_ALERTS.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }
        //                                return strErrMsg;
        //                            }
        //                        }
        //                    }
        //                    //EMAILID_FOR_LOWSTOCK_ALERTS
        //                    if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.EMAILID_FOR_LOWSTOCK_ALERTS.ToString()))
        //                    {
        //                        strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.EMAILID_FOR_LOWSTOCK_ALERTS.ToString()].ToString().Trim();
        //                        if (!string.IsNullOrEmpty(strCtrlText))
        //                        {
        //                            if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z][a-zA-Z|0-9|]*([_][a-zA-Z|0-9]+)*([.][a-zA-Z|0-9]+([_][a-zA-Z|0-9]+)*)?@[a-zA-Z][a-zA-Z|0-9|]*([-][a-zA-Z|0-9]+)*\\.([a-zA-Z][a-zA-Z|0-9]*(\\.[a-zA-Z][a-zA-Z|0-9]*)?)$"))
        //                            {
        //                                strErrMsg = "Email for low stock Alerts - Please enter valid Email ID: " + dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.EMAILID_FOR_LOWSTOCK_ALERTS.ToString()].ToString();
        //                                if (_log.IsDebugEnabled)
        //                                {
        //                                    if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        //                                }

        //                            }
        //                        }
        //                    }
        //                }

        //            }
        //        }
        //        return strErrMsg;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }

        //}

        ////private long Do_UploadOrgGroupData_Flow(string pSvrUserID, ref DataSet pdsOrgGroupData, string[] pDeviceTokenEntry)
        ////{
        ////    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        ////    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        ////    int count = 1;
        ////    //Error Messages to Displaying on UI WebPage
        ////    const string CONST_ORG_NOT_EXIST = "Org Group ID Does Not Exist";
        ////    const string CONST_ORG_PARAM_CREATION_FAILED = "Org Parameters Updation Failed";
        ////    const string CONST_ORGGROUP_CREATION_SUCESS = "Org Group Created Successfully";
        ////    const string CONST_ORGGROUP_CREATION_FAILED = "Org Group Creation Failed";
        ////    const string CONST_ORGGROUP_UPDATION_FAILED = "Org Group Updation Failed";
        ////    const string CONST_ORGGROUP_UPDATION_SUCESS = "Org Group Updated Successfully";
        ////    const string CONST_INVALID_DATA = "Org Creation Failed, Invalid Data";
        ////    const string CONST_BUNIT_INVALID_DATA = "Org Creation Failed, BusinessUnit Should be Unique, Invalid Data";

        ////    const string CONST_NOT_VALID_PARAMETER = "Not a valid column parameter";


        ////    try
        ////    {
        ////        long _StatusCode = -1;
        ////        Int16 intCnt = default(Int16);
        ////        StringBuilder _sbErrorString = new StringBuilder();
        ////        StringBuilder _sbWarningString = new StringBuilder();
        ////        bool _blnMandatory = false;
        ////        string StrErrorMsg = null;
        ////        string pMode = string.Empty;
        ////        string _strParameterTemplateID = null;
        ////        string _strValidInput = null;
        ////        string _strOrgGroupId = null;
        ////        DataSet _dsOrgData = default(DataSet);
        ////        DataTable dtOrgParameters = default(DataTable);
        ////        DataSet _dsAppID = default(DataSet);
        ////        string _strSQL = string.Empty;
        ////        string strChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        ////        string strNumbers = "0123456789";
        ////        string strValid = string.Empty;
        ////        string ch = string.Empty;
        ////        string strCtrlText = string.Empty;
        ////        string strErrMsg = string.Empty;
        ////        bool _blnIsMandatoryFlag = false;
        ////        bool _blnIsAddModeFlag = false;
        ////        string _strErrName = string.Empty;
        ////        AtPar_UserManagement objAtparUserMgmt = new AtPar_UserManagement();
        ////        string _strOrgId = string.Empty;
        ////        DataSet dsBunits = new DataSet();

        ////            if (pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupParams.ToString()].Rows.Count == 0)
        ////            {
        ////                return AtparStatusCodes.E_NORECORDFOUND;
        ////            }
        ////            else
        ////            {
        ////                DataRow dRow = pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].NewRow();
        ////                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows.Add(dRow);
        ////                //To get unique orggroupid 
        ////                DataView dv = new DataView(pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupBU.ToString()]);
        ////                DataTable dtGroup = dv.ToTable(true, new string[] { "OrgGroupID" });
        ////                //end  To get unique orggroupid  
        ////                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.TOTAL_REC_CNT.ToString()] = dtGroup.Rows.Count;
        ////                //pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString).Rows(0).Item(Enum_Upload_Summary.TOTAL_REC_CNT) = pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupParams.ToString).Rows.Count - 1
        ////                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.SUCCESS_CNT.ToString()] = 0;
        ////                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.FAILURE_CNT.ToString()] = 0;
        ////                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()] = 0;
        ////                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.UPDATED_CNT.ToString()] = 0;

        ////            }


        ////            //ValidatingColumnNames 

        ////            _strErrName = ValidateOrgColumnNames(pdsOrgGroupData);

        ////            if (_log.IsDebugEnabled)
        ////            {
        ////                if (_log.IsDebugEnabled) { _log.Debug("Invalid Parameter" + _strErrName); }
        ////            }

        ////            if (_strErrName != string.Empty)
        ////            {
        ////                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = CONST_NOT_VALID_PARAMETER + _strErrName;
        ////            }


        ////            //Getting Products List

        ////            //_StatusCode = GetApps(_dsAppID, pSvrUserID, pDeviceTokenEntry);
        ////            List<MT_ATPAR_APP> lstApps = _commonRepo.GetApps(pSvrUserID);

        ////            SqlTransaction _trans = default(SqlTransaction);
        ////            sqlConnect = m_LocalDB.CreateConnection();
        ////            sqlConnect.Open();
        ////            _trans = sqlConnect.BeginTransaction();

        ////            var dsOrgGroupData = pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupParams.ToString()];

        ////            for (intCnt = 2; intCnt <= dsOrgGroupData.Rows.Count - 1; intCnt++)
        ////            {
        ////                _strValidInput = string.Empty;
        ////                _strOrgGroupId = string.Empty;
        ////                _dsOrgData = new DataSet();
        ////                _blnIsAddModeFlag = false;

        ////                //Check if all the required fields have values in Org-BU Table or not
        ////                // First Mandatory Check and Validating Parameter Template Id
        ////                if (dsOrgGroupData.Rows[intCnt]["PARAMETER_TEMPLATE_ID"].ToString().Trim() == string.Empty)
        ////                {
        ////                    if (_sbErrorString.ToString() == string.Empty)
        ////                    {
        ////                        _sbErrorString.Append("Parameter Template Id");
        ////                    }
        ////                    _blnMandatory = true;
        ////                }
        ////                if (_blnMandatory)
        ////                {
        ////                    _sbErrorString.Append(" is Mandatory Field");
        ////                    pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = _sbErrorString.ToString();
        ////                    _sbErrorString = null;
        ////                    _sbErrorString = new StringBuilder();
        ////                    _blnMandatory = false;
        ////                    continue;
        ////                }
        ////                else
        ////                {
        ////                    _sbErrorString = null;
        ////                    _sbErrorString = new StringBuilder();
        ////                }

        ////                //PARAMETER_TEMPLATE_ID VALIDATION
        ////                strErrMsg = string.Empty;
        ////                strCtrlText = dsOrgGroupData.Rows[intCnt]["PARAMETER_TEMPLATE_ID"].ToString();
        ////                strValid = strChars + strNumbers + "_";
        ////                if (strCtrlText.ToString().StartsWith("_"))
        ////                {
        ////                    strErrMsg = " Underscore is not allowed as a first character in Parameter template ID   " + dsOrgGroupData.Rows[intCnt][0].ToString();
        ////                    if (_log.IsDebugEnabled)
        ////                    {
        ////                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        ////                    }
        ////                }
        ////                if (strCtrlText.Length > 20)
        ////                {
        ////                    strErrMsg = "  Number of characters cannot be more than 20 For Parameter template ID " + dsOrgGroupData.Rows[intCnt][0].ToString();
        ////                    if (_log.IsDebugEnabled)
        ////                    {
        ////                        if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        ////                    }
        ////                }
        ////                for (int i = 0; i <= strCtrlText.Length - 1; i++)
        ////                {
        ////                    ch = strCtrlText[i].ToString();
        ////                    if (strValid.IndexOf(ch) == -1)
        ////                    {
        ////                        strErrMsg = " Only characters, numbers or underscore is allowed  For Parameter template ID   " + dsOrgGroupData.Rows[intCnt][0].ToString();
        ////                        if (_log.IsDebugEnabled)
        ////                        {
        ////                            if (_log.IsDebugEnabled) { _log.Debug(strErrMsg); }
        ////                        }
        ////                    }
        ////                }
        ////                if (strErrMsg != string.Empty)
        ////                {
        ////                    pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = strErrMsg;
        ////                    continue;
        ////                }

        ////                _strParameterTemplateID = dsOrgGroupData.Rows[intCnt]["PARAMETER_TEMPLATE_ID"].ToString();


        ////                if (_log.IsDebugEnabled)
        ////                {
        ////                    if (_log.IsDebugEnabled) { _log.Debug("_strParameterTemplateID" + _strParameterTemplateID); }
        ////                }
        ////                DataRow[] _drSelectedParam = null;

        ////                if (pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupBU.ToString()].Rows.Count > 0)
        ////                {
        ////                    _drSelectedParam = pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupBU.ToString()].Select("ParameterTemplateID='" + _strParameterTemplateID + "'");
        ////                }

        ////                if (_log.IsDebugEnabled)
        ////                {
        ////                    if (_log.IsDebugEnabled) { _log.Debug("_drSelectedParam" + _drSelectedParam.Length); }
        ////                }


        ////            string strUserId = pDeviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID];

        ////                if (_drSelectedParam.Length > 0)
        ////                {
        ////                List<MT_ATPAR_ORG_GROUP_BUNITS> lstBUnits= _commonRepo.GetOrgBUnits(strUserId, _strOrgId);
        ////                    foreach (DataRow _dr in _drSelectedParam)
        ////                    {
        ////                        _strValidInput = string.Empty;
        ////                        if (object.ReferenceEquals(_dr[AtParWebEnums.Enum_OrgGroupBU.OrgGroupID.ToString()], DBNull.Value))
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Org Group ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Org Group ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                        if (object.ReferenceEquals(_dr[AtParWebEnums.Enum_OrgGroupBU.OrgGroupDescr.ToString()], DBNull.Value))
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Org Group Descr ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Org Group Descr ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                        if (object.ReferenceEquals(_dr[AtParWebEnums.Enum_OrgGroupBU.BusinessUnit.ToString()], DBNull.Value))
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Business Unit ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Business Unit ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                        if (object.ReferenceEquals(_dr[AtParWebEnums.Enum_OrgGroupBU.BusinessUnitType.ToString()], DBNull.Value))
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Business Unit Type ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Business Unit Type ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                        if (object.ReferenceEquals(_dr[AtParWebEnums.Enum_OrgGroupBU.ParameterTemplateID.ToString()], DBNull.Value))
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Parameter Template ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Parameter Template ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                        if (_blnMandatory)
        ////                        {
        ////                            if (_sbErrorString.ToString().Contains(","))
        ////                            {
        ////                                _sbErrorString.Append(" are Mandatory Fields");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(" is Mandatory Field");
        ////                            }
        ////                            pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = _sbErrorString.ToString();
        ////                            _blnIsMandatoryFlag = true;
        ////                            _sbErrorString = null;
        ////                            _sbErrorString = new StringBuilder();
        ////                            _blnMandatory = false;
        ////                            break; // TODO: might not be correct. Was : Exit For
        ////                        }
        ////                        else
        ////                        {
        ////                            _blnIsMandatoryFlag = false;
        ////                            _sbErrorString = null;
        ////                            _sbErrorString = new StringBuilder();
        ////                        }
        ////                        //ValidateOrgData

        ////                        _strValidInput = ValidateOrgData(_dr, dsBunits);
        ////                        if (!(_strValidInput == string.Empty))
        ////                        {
        ////                            pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = _strValidInput;
        ////                            _blnIsMandatoryFlag = true;
        ////                            break; // TODO: might not be correct. Was : Exit For
        ////                        }
        ////                    }
        ////                }

        ////                if (_blnIsMandatoryFlag == true)
        ////                {
        ////                    continue;
        ////                }



        ////                //Check Mandatatory fields  for org Parameters table
        ////                //CartCount

        ////                if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.CartCount + "'").Length > 0)
        ////                {
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Cart Count Default Manufacturer Item ID");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Cart Count Default Manufacturer Item ID");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Cart Count Item Description Option on HHT");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Cart Count Item Description Option on HHT");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Cart Count Item Price Option on HHT ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Cart Count Item Price Option on HHT ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    //QTY_ROUND_TYPE
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.QTY_ROUND_TYPE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.QTY_ROUND_TYPE.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Cart Count Order Qty Rounding Option ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Cart Count Order Qty Rounding Option ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    // FACTOR_OF_SAFETY
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.FACTOR_OF_SAFETY.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Cart Count Factor of safety percentage(%) for recommended par ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Cart Count Factor of safety percentage(%) for recommended par ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                }

        ////                //Cycle Count
        ////                if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.CycleCount + "'").Length > 0)
        ////                {
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Cycle Count Default Manufacturer Item ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Cycle Count Default Manufacturer Item ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Cycle Count Item Description ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Cycle Count Item Description ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Cycle Count Item Price Option on HHT ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Cycle Count Item Price Option on HHT ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                }

        ////                //Receiving
        ////                if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.Receiving + "'").Length > 0)
        ////                {

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ALT_UOM_DISPLAY_OPT.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ALT_UOM_DISPLAY_OPT.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Receiving Alternate UOM display in HHT ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Receiving Alternate UOM display in HHT ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ASN_DOWNLOAD_BY.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ASN_DOWNLOAD_BY.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Receiving ASN/ASR Receipt by InvoiceNo or PackSlipNo ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Receiving ASN/ASR Receipt by InvoiceNo or PackSlipNo ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ASN_RECEIPT_STATUS.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ASN_RECEIPT_STATUS.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Receiving ASN Receipt status after EDI ASN/ASR loaded in ERP ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Receiving ASN Receipt status after EDI ASN/ASR loaded in ERP ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Receiving Default Manufacturer Item ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Receiving Default Manufacturer Item ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Receiving Item Description Option ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Receiving Item Description Option ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Receiving Item Price Option on HHT ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Receiving Item Price Option on HHT ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Receiving Max Number of Records to download ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Receiving Max Number of Records to download ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Receiving User ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Receiving User ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }


        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.SEARCH_BY_DUE_OR_PO_DATE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.SEARCH_BY_DUE_OR_PO_DATE.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Receiving Search POs by PO creation or Due date ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Receiving Search POs by PO creation or Due date ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }


        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Receiving Enable Lot /Serial Tracking ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Receiving Enable Lot /Serial Tracking ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }


        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.CUSTOM_VIEW_ERPUSER.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.CUSTOM_VIEW_ERPUSER.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Table/view name to read User ID and Employee ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Table/view name to read User ID and Employee ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                }
        ////                //Pick Plan
        ////                if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.PickPlan + "'").Length > 0)
        ////                {

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Pick Plan Default Manufacturer Item ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Pick Plan Default Manufacturer Item ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_PRIORITY.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_PRIORITY.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Pick Plan Default Location Priority ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Pick Plan Default Location Priority ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Pick Plan Item Description Option ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Pick Plan Item Description Option ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Pick Plan Item Price Option on HHT ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Pick Plan Item Price Option on HHT ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.LIMIT_OF_LISTS.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.LIMIT_OF_LISTS.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Pick Plan Limit number of downloaded pick plans ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Pick Plan Limit number of downloaded pick plans ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Pick Plan User ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Pick Plan User ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    //PICK_ENABLE_LOT_SRL_TRACKING

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Pick Plan Enable Lot /Serial Tracking ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Pick Plan Enable Lot /Serial Tracking ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                }

        ////                //Deliver
        ////                if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.Deliver + "'").Length > 0)
        ////                {

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Deliver Default Manufacturer Item ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Deliver Default Manufacturer Item ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                }

        ////                if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()))
        ////                {
        ////                    if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()].ToString().Trim() == string.Empty)
        ////                    {
        ////                        if (_sbErrorString.ToString() == string.Empty)
        ////                        {
        ////                            _sbErrorString.Append("Deliver Item Description Option ");
        ////                        }
        ////                        else
        ////                        {
        ////                            _sbErrorString.Append(", Deliver Item Description Option ");
        ////                        }
        ////                        _blnMandatory = true;
        ////                    }
        ////                }

        ////                if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()))
        ////                {
        ////                    if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()].ToString() == string.Empty)
        ////                    {
        ////                        if (_sbErrorString.ToString() == string.Empty)
        ////                        {
        ////                            _sbErrorString.Append("Deliver Item Price Option on HHT ");
        ////                        }
        ////                        else
        ////                        {
        ////                            _sbErrorString.Append(", Deliver Item Price Option on HHT ");
        ////                        }
        ////                        _blnMandatory = true;
        ////                    }
        ////                }


        ////                //PutAway
        ////                if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.PutAway + "'").Length > 0)
        ////                {
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append(" PutAway Default Manufacturer Item ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(",  PutAway Default Manufacturer Item ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("PutAway Item Description Option ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", PutAway Item Description Option ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("PutAway Item Price Option on HHT ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", PutAway Item Price Option on HHT ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.MULTI_IUT_DOWNLOAD.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.MULTI_IUT_DOWNLOAD.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("PutAway Multiple users receiving an Inter Unit transfer ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", PutAway Multiple users receiving an Inter Unit transfer ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("PutAway User ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", PutAway User ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                }

        ////                //TrackIT
        ////                //NO_OF_REQUESTS_FOR_SAME_EQ_ITM
        ////                if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.TrackIT + "'").Length > 0)
        ////                {
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.NO_OF_REQUESTS_FOR_SAME_EQ_ITM.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.NO_OF_REQUESTS_FOR_SAME_EQ_ITM.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append(" TrackIT No. Of Requests for same EQ Item ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(",  TrackIT No. Of Requests for same EQ Item ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                }

        ////                //StockIssue
        ////                if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.StockIssue + "'").Length > 0)
        ////                {
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append(" Stock Issue Default Manufacturer Item ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(",  Stock Issue Default Manufacturer Item ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Stock Issue Item Description Option ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Stock Issue Item Description Option ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Stock Issue Item Price Option on HHT ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Stock Issue Item Price Option on HHT ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Stock Issue User ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Stock Issue User ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    //DOC_ID_GENERATION
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.DOC_ID_GENERATION.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.DOC_ID_GENERATION.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Stock Issue Document ID generation ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Stock Issue Document ID generation ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    //RMA_COMPONENT_INTERFACE
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RMA_COMPONENT_INTERFACE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RMA_COMPONENT_INTERFACE.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Stock Issue Interface for posting Return transaction ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Stock Issue Interface for posting Return transaction ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    //LOT_SERIAL_ENABLED

        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Stock Issue Enable Lot /Serial Tracking ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Stock Issue Enable Lot /Serial Tracking ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                }

        ////                //BinToBin
        ////                if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.BinToBin + "'").Length > 0)
        ////                {
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append(" Bin To Bin Default Manufacturer Item ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(",  Bin To Bin Default Manufacturer Item ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Bin To Bin Item Description Option ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Bin To Bin Item Description Option ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Bin To Bin Item Price Option on HHT ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Bin To Bin Item Price Option on HHT ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.BinToBin + "_" + AtParWebEnums.AppParameters_Enum.PS_USER.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Bin To Bin User ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Bin To Bin User ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                }
        ////                //Point Of Use
        ////                if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.PointOfUse + "'").Length > 0)
        ////                {
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_MFG_ITEM_ID.ToString()].ToString() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append(" Point Of Use Default Manufacturer Item ID ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(",  Point Of Use Default Manufacturer Item ID ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.ITEM_DESCR.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Point Of Use Inventory Item Description ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Point Of Use Inventory Item Description ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PRICE.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Point Of Use Item Price ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Point Of Use Item Price ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.QTY_ROUND_TYPE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.QTY_ROUND_TYPE.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Point Of Use Order Qty Rounding Option ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Point Of Use Order Qty Rounding Option ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.RESERVE_QTY.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.RESERVE_QTY.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Point Of Use Reserve Qty while CasePick ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Point Of Use Reserve Qty while CasePick ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.CASE_PICK_INTERFACE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.CASE_PICK_INTERFACE.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Point Of Use Case Pick Interface option ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Point Of Use Case Pick Interface option ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                    if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.RMA_COMPONENT_INTERFACE.ToString()))
        ////                    {
        ////                        if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.RMA_COMPONENT_INTERFACE.ToString()].ToString().Trim() == string.Empty)
        ////                        {
        ////                            if (_sbErrorString.ToString() == string.Empty)
        ////                            {
        ////                                _sbErrorString.Append("Point Of Use Interface for posting Return transaction ");
        ////                            }
        ////                            else
        ////                            {
        ////                                _sbErrorString.Append(", Point Of Use Interface for posting Return transaction ");
        ////                            }
        ////                            _blnMandatory = true;
        ////                        }
        ////                    }
        ////                }

        ////                if (_blnMandatory)
        ////                {
        ////                    if (_sbErrorString.ToString().Contains(","))
        ////                    {
        ////                        _sbErrorString.Append(" are Mandatory Fields");
        ////                    }
        ////                    else
        ////                    {
        ////                        _sbErrorString.Append(" is Mandatory Field");
        ////                    }
        ////                    pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = _sbErrorString.ToString();
        ////                    _sbErrorString = null;
        ////                    _sbErrorString = new StringBuilder();
        ////                    _blnMandatory = false;
        ////                    continue;
        ////                }
        ////                else
        ////                {
        ////                    _sbErrorString = null;
        ////                    _sbErrorString = new StringBuilder();
        ////                }

        ////                //ValidateOrgParamData

        ////                _strValidInput = ValidateOrgParamData(_dsAppID.Tables[0].Rows[intCnt], _dsAppID, pDeviceTokenEntry);

        ////                if (_log.IsDebugEnabled)
        ////                {
        ////                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "_strValidInput" + _strValidInput); }

        ////                }

        ////                if (!(_strValidInput == string.Empty))
        ////                {
        ////                    pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = _strValidInput;
        ////                    continue;
        ////                }


        ////                // Call GetOrgGroupDetails  

        ////                _StatusCode = GetOrgGroupDetails(_strParameterTemplateID, StrErrorMsg, pdsOrgGroupData, _dsOrgData);

        ////                if (_log.IsDebugEnabled)
        ////                {
        ////                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "_StatusCode" + _StatusCode); }

        ////                }


        ////                if (StrErrorMsg == CONST_ORG_NOT_EXIST)
        ////                {
        ////                    pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = CONST_ORG_NOT_EXIST;
        ////                    continue;
        ////                }
        ////                else
        ////                {
        ////                    if (StrErrorMsg != string.Empty)
        ////                    {
        ////                        pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = StrErrorMsg;
        ////                        continue;
        ////                    }
        ////                }

        ////                if (_dsOrgData.Tables.Count > 0)
        ////                {
        ////                    if (_dsOrgData.Tables["dtOrgData"].Rows.Count > 0)
        ////                    {
        ////                        _strOrgGroupId = string.Empty;

        ////                        for (int i = 0; i <= _dsOrgData.Tables["dtOrgData"].Rows.Count - 1; i++)
        ////                        {
        ////                            _strOrgGroupId = _dsOrgData.Tables["dtOrgData"].Rows[i]["ORG_GROUP_ID"].ToString();


        ////                            if (_log.IsDebugEnabled)
        ////                            {
        ////                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "_strOrgGroupId" + _strOrgGroupId); }

        ////                            }


        ////                            //Check if org Group already exists
        ////                            if (_strOrgGroupId != string.Empty)
        ////                            {
        ////                                _strSQL = string.Empty;
        ////                                int _intCountExists = 0;
        ////                                pMode = string.Empty;


        ////                                _strSQL = "SELECT COUNT(ORG_GROUP_ID) FROM MT_ATPAR_ORG_GROUPS " + " WHERE ORG_GROUP_ID= '" + _strOrgGroupId + "'";


        ////                                if (_log.IsDebugEnabled)
        ////                                {
        ////                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : " + _strSQL); }

        ////                                }

        ////                               // _intCountExists = m_LocalDB.ExecuteScalar(m_LocalDB.GetSqlStringCommand(_strSQL), _trans);



        ////                                if (_intCountExists == 0)
        ////                                {
        ////                                    pMode = AtParWebEnums.AddEdit_Enum.ADD.ToString();
        ////                                    _blnIsAddModeFlag = true;
        ////                                }
        ////                                else
        ////                                {
        ////                                    pMode = AtParWebEnums.AddEdit_Enum.EDIT.ToString();
        ////                                    _blnIsAddModeFlag = false;
        ////                                }
        ////                            }





        ////                            if (_dsOrgData.Tables.Contains("dtOrgParameters"))
        ////                            {
        ////                                _dsOrgData.Tables.Remove(dtOrgParameters);
        ////                            }

        ////                            dtOrgParameters = new DataTable();

        ////                            dtOrgParameters = GetOrgGroupParametersList(_dsAppID.Tables[0].Rows[intCnt], _strOrgGroupId, dtOrgParameters);

        ////                            if (_StatusCode == AtparStatusCodes.ATPAR_OK)
        ////                            {
        ////                                _dsOrgData.Tables.Add(dtOrgParameters);
        ////                            }
        ////                            else
        ////                            {
        ////                                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = CONST_INVALID_DATA;
        ////                                continue;
        ////                            }





        ////                            if (pMode != string.Empty)
        ////                            {
        ////                                _StatusCode = AddUpdateOrgGroup(_trans, pSvrUserID, _dsOrgData, pMode);
        ////                                if (_StatusCode == AtparStatusCodes.ATPAR_OK)
        ////                                {
        ////                                    if (_blnIsAddModeFlag)
        ////                                    {
        ////                                        pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()] += 1;
        ////                                        pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = CONST_ORGGROUP_CREATION_SUCESS;
        ////                                    }
        ////                                    else
        ////                                    {
        ////                                        pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.UPDATED_CNT] += 1;
        ////                                        pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = CONST_ORGGROUP_UPDATION_SUCESS;
        ////                                    }
        ////                                }
        ////                                else
        ////                                {
        ////                                    if (_blnIsAddModeFlag == true)
        ////                                    {
        ////                                        if (_log.IsWarnEnabled)
        ////                                            _log.Warn("Org Parameters Updation Failed:" + _strOrgGroupId + ":");
        ////                                        pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = CONST_ORGGROUP_CREATION_FAILED;
        ////                                        _trans.Rollback();
        ////                                        sqlConnect.Open();
        ////                                        _trans = sqlConnect.BeginTransaction();
        ////                                        continue;
        ////                                    }
        ////                                    else
        ////                                    {
        ////                                        if (_log.IsWarnEnabled)
        ////                                            _log.Warn("Org Parameters Updation Failed:" + _strOrgGroupId + ":");
        ////                                        pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = CONST_ORGGROUP_UPDATION_FAILED;
        ////                                        _trans.Rollback();
        ////                                        sqlConnect.Open();
        ////                                        _trans = sqlConnect.BeginTransaction();
        ////                                        continue;
        ////                                    }
        ////                                }
        ////                            }


        ////                            //Warning Message for receive
        ////                            if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.Receiving + "'").Length > 0)
        ////                            {
        ////                                if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()))
        ////                                {
        ////                                    if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()].ToString() == AtParWebEnums.Enable_Lot_Serial_Tracking.MMIS.ToString())
        ////                                    {
        ////                                        if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString()))
        ////                                        {
        ////                                            if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString()].ToString() == AtParWebEnums.YesNo_Enum.N.ToString())
        ////                                            {
        ////                                                if (_sbWarningString.ToString() == string.Empty)
        ////                                                {
        ////                                                    _sbWarningString.Append("Send Lot /Serial information to MMIS is updated with " + AtParWebEnums.YesNo_Enum.Y.ToString() + " in " + AtParWebEnums.EnumApps.Receiving.ToString() + " for Org group : " + _strOrgGroupId);
        ////                                                }
        ////                                                else
        ////                                                {
        ////                                                    _sbWarningString.Append(", Send Lot /Serial information to MMIS is updated with " + AtParWebEnums.YesNo_Enum.Y.ToString() + " in " + AtParWebEnums.EnumApps.Receiving.ToString() + " for Org group : " + _strOrgGroupId);
        ////                                                }
        ////                                            }
        ////                                        }
        ////                                    }

        ////                                    if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.LOT_SERIAL_ENABLED.ToString()].ToString() == AtParWebEnums.Enable_Lot_Serial_Tracking.None.ToString())
        ////                                    {
        ////                                        if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString()))
        ////                                        {
        ////                                            if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString()].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
        ////                                            {
        ////                                                if (_sbWarningString.ToString() == string.Empty)
        ////                                                {
        ////                                                    _sbWarningString.Append("Send Lot /Serial information to MMIS is updated with " + AtParWebEnums.YesNo_Enum.N.ToString() + " in " + AtParWebEnums.EnumApps.Receiving.ToString() + " for Org group : " + _strOrgGroupId);
        ////                                                }
        ////                                                else
        ////                                                {
        ////                                                    _sbWarningString.Append(", Send Lot /Serial information to MMIS is updated with " + AtParWebEnums.YesNo_Enum.N.ToString() + " in " + AtParWebEnums.EnumApps.Receiving.ToString() + " for Org group : " + _strOrgGroupId);
        ////                                                }
        ////                                            }
        ////                                        }
        ////                                    }
        ////                                }
        ////                            }


        ////                            //Warning Message for pick
        ////                            if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.Receiving + "'").Length > 0)
        ////                            {
        ////                                if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString()))
        ////                                {
        ////                                    if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString()].ToString() == Enable_Lot_Serial_Tracking.MMIS.ToString)
        ////                                    {
        ////                                        if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PICK_SEND_LOT_SRL_INFO_TO_MMIS.ToString()))
        ////                                        {
        ////                                            if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PICK_SEND_LOT_SRL_INFO_TO_MMIS.ToString()].ToString() == YesNo_Enum.N.ToString)
        ////                                            {
        ////                                                if (_sbWarningString.ToString() == string.Empty)
        ////                                                {
        ////                                                    _sbWarningString.Append("Send Lot /Serial information to MMIS is updated with " + AtParWebEnums.YesNo_Enum.Y.ToString() + " in " + AtParWebEnums.EnumApps.PickPlan.ToString() + " for Org group : " + _strOrgGroupId);
        ////                                                }
        ////                                                else
        ////                                                {
        ////                                                    _sbWarningString.Append(", Send Lot /Serial information to MMIS is updated with " + AtParWebEnums.YesNo_Enum.Y.ToString() + " in " + AtParWebEnums.EnumApps.PickPlan.ToString() + " for Org group : " + _strOrgGroupId);
        ////                                                }
        ////                                            }
        ////                                        }
        ////                                    }
        ////                                    if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString()].ToString() == AtParWebEnums.Enable_Lot_Serial_Tracking.None.ToString())
        ////                                    {
        ////                                        if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PICK_SEND_LOT_SRL_INFO_TO_MMIS.ToString()))
        ////                                        {
        ////                                            if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.PICK_SEND_LOT_SRL_INFO_TO_MMIS.ToString()].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
        ////                                            {
        ////                                                if (_sbWarningString.ToString() == string.Empty)
        ////                                                {
        ////                                                    _sbWarningString.Append("Send Lot /Serial information to MMIS is updated with " + AtParWebEnums.YesNo_Enum.N.ToString() + " in " + AtParWebEnums.EnumApps.PickPlan.ToString() + " for Org group : " + _strOrgGroupId);
        ////                                                }
        ////                                                else
        ////                                                {
        ////                                                    _sbWarningString.Append(", Send Lot /Serial information to MMIS is updated with " + AtParWebEnums.YesNo_Enum.N.ToString() + " in " + AtParWebEnums.EnumApps.PickPlan.ToString() + " for Org group : " + _strOrgGroupId);
        ////                                                }
        ////                                            }
        ////                                        }
        ////                                    }
        ////                                }
        ////                            }

        ////                            //Warning Message for Stock Issue
        ////                            if (_dsAppID.Tables[0].Select("APP_ID='" + AtParWebEnums.EnumApps.StockIssue + "'").Length > 0)
        ////                            {
        ////                                if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.VALIDATE_DEPT.ToString()))
        ////                                {
        ////                                    if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.VALIDATE_DEPT.ToString()].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
        ////                                    {
        ////                                        if (_dsAppID.Tables[0].Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.CUSTOM_SQL_DEPT.ToString()))
        ////                                        {
        ////                                            if (_dsAppID.Tables[0].Rows[intCnt][AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.CUSTOM_SQL_DEPT.ToString()].ToString() == string.Empty)
        ////                                            {
        ////                                                if (_sbWarningString.ToString() == string.Empty)
        ////                                                {
        ////                                                    _sbWarningString.Append("Please provide Custom SQL for Syncing Valid Departments.");
        ////                                                }
        ////                                                else
        ////                                                {
        ////                                                    _sbWarningString.Append(", Please provide Custom SQL for Syncing Valid Departments.");
        ////                                                }
        ////                                            }
        ////                                        }
        ////                                    }
        ////                                }
        ////                            }

        ////                            if (_sbWarningString.ToString() != string.Empty)
        ////                            {
        ////                                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_MESSAGE"] = _sbWarningString.ToString();
        ////                                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[intCnt]["ERROR_TYPE"] = AtParWebEnums.Enum_ErrorType.Warning;
        ////                            }
        ////                            _sbWarningString = null;
        ////                            _sbWarningString = new StringBuilder();
        ////                        }
        ////                    }
        ////                }
        ////            }

        ////            pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.SUCCESS_CNT.ToString()] =
        ////                    pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.ADDED_CNT.ToString()] + pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.UPDATED_CNT];
        ////            pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.FAILURE_CNT.ToString()] = pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.TOTAL_REC_CNT] - pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.SUCCESS_CNT];
        ////            pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.WARNING_CNT.ToString()] = decimal.Zero;
        ////            if (Convert.ToInt32(pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.FAILURE_CNT.ToString()]) < 0)
        ////                {
        ////                pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.FAILURE_CNT.ToString()] = 0;
        ////                if (_log.IsDebugEnabled)
        ////                    _log.Debug("Value is less than zero");
        ////            }
        ////            DataRow[] dr = null;
        ////            if (pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows.Count > 0)
        ////                {
        ////                dr = pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Select("ERROR_TYPE = " + AtParWebEnums.Enum_ErrorType.Warning);
        ////                if (_log.IsDebugEnabled)
        ////                    _log.Debug("Length" + methodBaseName + dr.Length);
        ////                if (dr.Length > 0)
        ////                {
        ////                    pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.SUMMARY.ToString()].Rows[0][AtParWebEnums.Enum_Upload_Summary.WARNING_CNT.ToString()] = dr.Length;
        ////                }
        ////            }
        ////            pdsOrgGroupData.AcceptChanges();

        ////            for (int i = pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows.Count - 1; i >= 0; i += -1)
        ////                    {
        ////                if (pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[i]["ERROR_MESSAGE"].ToString() == CONST_ORGGROUP_CREATION_SUCESS | pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[i]["ERROR_MESSAGE"].ToString() == CONST_ORGGROUP_UPDATION_SUCESS)
        ////                        {
        ////                    pdsOrgGroupData.Tables[AtParWebEnums.Enum_OrgGroupData.OrgGroupErrorData.ToString()].Rows[i].Delete();
        ////                }
        ////            }



        ////            pdsOrgGroupData.AcceptChanges();
        ////            if (_log.IsDebugEnabled)
        ////                _log.Debug("End Of The Function " + methodBaseName);
        ////            _trans.commit();
        ////            return AtparStatusCodes.ATPAR_OK;

        ////    }
        ////    catch(Exception ex)
        ////    {
        ////        throw ex;

        ////    }
        ////}       

        //private long ValidateProfileParametersData(DataSet profileData, DataSet profileDefaultData, string parameterTemplateId, ref string errorMessage)
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        //string strChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //        //string strNumbers = "0123456789";
        //        //string strYN = "YN";
        //        //string strValid = string.Empty;
        //        //string ch = string.Empty;
        //        string strCtrlText = string.Empty;
        //        StringBuilder sbErrorString = new StringBuilder();
        //        double dblCartMaxValue = 0;
        //        double dblCartMaxDigits = 0;
        //        double dblSIMaxDigits = 0;
        //        double dblSIMaxValue = 0;
        //        double dblSIMaxAllowableDigits = 0;

        //        //To fetch cartcount RESTRICT_COUNT_QTY parameter Maximum value
        //        DataRow[] drCartCountMaxValue = null;

        //        drCartCountMaxValue = profileDefaultData.Tables["PARAMS"].Select("PARAMETER_ID = '" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY.ToString() + "'" + " AND APP_ID='" + AtParWebEnums.EnumApps.CartCount + "'");
        //        if (drCartCountMaxValue.Length > 0)
        //        {
        //            dblCartMaxValue = Convert.ToDouble(drCartCountMaxValue[0]["MAX_VALUE"]);
        //        }

        //        if (_log.IsDebugEnabled)
        //            _log.Debug(methodBaseName + " Max. allowable Count/Request Quantity MaxValue for CartCount:" + dblCartMaxValue);

        //        //To fetch cartcount RESTRICT_COUNT_QTY_DIGITS parameter Maximum value
        //        DataRow[] drDefaultMaxDigits = null;

        //        drDefaultMaxDigits = profileDefaultData.Tables["PARAMS"].Select("PARAMETER_ID = '" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY_DIGITS.ToString() + "'" + " AND APP_ID='" + AtParWebEnums.EnumApps.CartCount + "'");

        //        if (drDefaultMaxDigits.Length > 0)
        //        {
        //            dblCartMaxDigits = Convert.ToDouble(drDefaultMaxDigits[0]["MAX_VALUE"]);
        //        }

        //        if (_log.IsDebugEnabled)
        //            _log.Debug(methodBaseName + " Max. allowable number of digits MaxValue for CartCount:" + dblCartMaxDigits);

        //        //To fetch stockissue RESTRICT_ISSUE_QTY parameter Maximum value
        //        DataRow[] drStockIssueMaxValue = null;
        //        drStockIssueMaxValue = profileDefaultData.Tables["PARAMS"].Select("PARAMETER_ID = '" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY.ToString() + "'" + " AND APP_ID='" + AtParWebEnums.EnumApps.StockIssue + "'");

        //        if (drStockIssueMaxValue.Length > 0)
        //        {
        //            dblSIMaxValue = Convert.ToDouble(drStockIssueMaxValue[0]["MAX_VALUE"]);
        //        }

        //        if (_log.IsDebugEnabled)
        //            _log.Debug(methodBaseName + " Max. allowable Issue Quantity MaxValue for StockIssue:" + dblSIMaxValue);

        //        //To fetch stockissue RESTRICT_ISSUE_QTY_DIGITS parameter Maximum value
        //        DataRow[] drStockIssueMaxDigits = null;
        //        drStockIssueMaxDigits = profileDefaultData.Tables["PARAMS"].Select("PARAMETER_ID = '" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY_DIGITS.ToString() + "'" + " AND APP_ID='" + AtParWebEnums.EnumApps.StockIssue + "'");

        //        if (drStockIssueMaxDigits.Length > 0)
        //        {
        //            dblSIMaxDigits = Convert.ToDouble(drStockIssueMaxDigits[0]["MAX_VALUE"]);
        //        }

        //        if (_log.IsDebugEnabled)
        //            _log.Debug(methodBaseName + " Max. allowable number of digits MaxValue for Stockissue:" + dblSIMaxDigits);



        //        DataRow[] drSPOUMaxDigits = null;
        //        drSPOUMaxDigits = profileDefaultData.Tables["PARAMS"].Select("PARAMETER_ID = '" + AtParWebEnums.AppParameters_Enum.MAX_ALLOW_QTY.ToString() + "'" + " AND APP_ID='" + AtParWebEnums.EnumApps.PointOfUse + "'");

        //        if (drSPOUMaxDigits.Length > 0)
        //        {
        //            dblSIMaxAllowableDigits = Convert.ToDouble(drSPOUMaxDigits[0]["MAX_VALUE"]);
        //        }

        //        if (_log.IsDebugEnabled)
        //            _log.Debug(methodBaseName + " Max. allowable number of digits MaxValue for POU:" + dblSIMaxAllowableDigits);


        //        DataRow[] drParameters = null;
        //        drParameters = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParameters.ToString()].Select("PROFILE_PARAM_TEMPLATE_ID = '" + parameterTemplateId + "'");

        //        if (_log.IsDebugEnabled)
        //            _log.Debug("ProfileParamTemplateID  row count in ProfileParameters Table " + methodBaseName + " is .. " + drParameters.Length);

        //        //Check If mandatory fields existing or not
        //        if (drParameters.Length > 0)
        //        {
        //            foreach (DataRow dr in drParameters)
        //            {
        //                ///// Cart Count///'
        //                //Item Count High%
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_COUNT_HIGH_PCT.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_COUNT_HIGH_PCT.ToString()].ToString().Trim();

        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            sbErrorString.Append("Item Count High% - Please enter a positive numeric value.");
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }
        //                //Item Count Low%
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_COUNT_LOW_PCT.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.ITEM_COUNT_LOW_PCT.ToString()].ToString().Trim();

        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Item Count Low% - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Item Count Low% - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }
        //                //Max. allowable Count/Request Quantity
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9.]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("CartCount Max. allowable Count/Request Quantity - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", CartCount Max. allowable Count/Request Quantity - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                        else
        //                        {
        //                            if (Convert.ToDouble(strCtrlText.ToString()) > 0)
        //                            {
        //                                if (Convert.ToDouble(strCtrlText.ToString()) > dblCartMaxValue)
        //                                {
        //                                    if (sbErrorString.ToString() == string.Empty)
        //                                    {
        //                                        sbErrorString.Append("CartCount Max. allowable Count/Request Quantity - Please enter less than or equal to " + dblCartMaxValue);
        //                                    }
        //                                    else
        //                                    {
        //                                        sbErrorString.Append(", CartCount Max. allowable Count/Request Quantity - Please enter less than or equal to " + dblCartMaxValue);
        //                                    }
        //                                    if (_log.IsDebugEnabled)
        //                                        _log.Debug(sbErrorString.ToString());
        //                                }
        //                            }
        //                            else
        //                            {
        //                                if (sbErrorString.ToString() == string.Empty)
        //                                {
        //                                    sbErrorString.Append("CartCount Max. allowable Count/Request Quantity - Can not be zero ");
        //                                }
        //                                else
        //                                {
        //                                    sbErrorString.Append(", CartCount Max. allowable Count/Request Quantity - Can not be zero ");
        //                                }
        //                                if (_log.IsDebugEnabled)
        //                                    _log.Debug(sbErrorString.ToString());
        //                            }
        //                        }
        //                    }
        //                }

        //                //Max. allowable number of digits 
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY_DIGITS.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.CartCount + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_COUNT_QTY_DIGITS.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("CartCount Max. allowable number of digits - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", CartCount Max. allowable number of digits - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                        else
        //                        {
        //                            if (Convert.ToDouble(strCtrlText.ToString()) > 0)
        //                            {
        //                                if (Convert.ToDouble(strCtrlText.ToString()) > dblCartMaxDigits)
        //                                {
        //                                    if (sbErrorString.ToString() == string.Empty)
        //                                    {
        //                                        sbErrorString.Append("CartCount Max. allowable number of digits - Please enter less than or equal to " + dblCartMaxDigits);
        //                                    }
        //                                    else
        //                                    {
        //                                        sbErrorString.Append(", CartCount Max. allowable number of digits - Please enter less than or equal to " + dblCartMaxDigits);
        //                                    }
        //                                    if (_log.IsDebugEnabled)
        //                                        _log.Debug(sbErrorString.ToString());
        //                                }
        //                            }
        //                            else
        //                            {
        //                                if (sbErrorString.ToString() == string.Empty)
        //                                {
        //                                    sbErrorString.Append("CartCount Max. allowable number of digits - Can not be zero ");
        //                                }
        //                                else
        //                                {
        //                                    sbErrorString.Append(", CartCount Max. allowable number of digits - Can not be zero ");
        //                                }
        //                                if (_log.IsDebugEnabled)
        //                                    _log.Debug(sbErrorString.ToString());
        //                            }
        //                        }
        //                    }
        //                }
        //                ///// Cycle Count///'
        //                //System Count deviation%
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.SYS_COUNT_PCT_DEVIATION.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.CycleCount + "_" + AtParWebEnums.AppParameters_Enum.SYS_COUNT_PCT_DEVIATION.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("System Count deviation% - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", System Count deviation% - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }
        //                ///// Receiving ///'
        //                //DEFAULT_DATE_RANGE
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()].ToString().Trim();

        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Default date range - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Default date range - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                        else if (strCtrlText.Length > 2)
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Default date range - Number of digits cannot be more than 3.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Default date range - Number of digits cannot be more than 3.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }

        //                //Item Receive High
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_RECV_HIGH_PCT.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_RECV_HIGH_PCT.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Item Receive High - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Item Receive High - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }

        //                //Item Receive Low
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_RECV_LOW_PCT.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.ITEM_RECV_LOW_PCT.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Item Receive Low - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Item Receive Low - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }

        //                // RECEIPT_DELIVER_PRINT_OPTIONS

        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.RECEIPT_DELIVER_PRINT_OPTIONS.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.Receiving + "_" + AtParWebEnums.AppParameters_Enum.RECEIPT_DELIVER_PRINT_OPTIONS.ToString()].ToString().Trim();

        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Receipt Deliver print options - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Receipt Deliver print options - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                        else if ((Convert.ToInt32(strCtrlText) > 4 | Convert.ToInt32(strCtrlText) < 1))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append(" The valid Receipt Deliver print options are 1,2,3,4.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", The valid Receipt Deliver print options are 1,2,3,4.");
        //                            }

        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }


        //                ///// PickPlan ///'
        //                //Item Pick High
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PICK_HIGH_PCT.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PICK_HIGH_PCT.ToString()].ToString().Trim();

        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Item Pick High - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Item Pick High - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }
        //                //Item Pick Low
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PICK_LOW_PCT.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PICK_LOW_PCT.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Item Pick Low - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Item Pick Low - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }
        //                //SHIPPING_LABEL_PRINT_OPTIONS
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.SHIPPING_LABEL_PRINT_OPTIONS.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.PickPlan + "_" + AtParWebEnums.AppParameters_Enum.SHIPPING_LABEL_PRINT_OPTIONS.ToString()].ToString().Trim();

        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Shipping Label Print Options - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Shipping Label Print Options - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                        else if ((Convert.ToInt32(strCtrlText) > 5 | Convert.ToInt32(strCtrlText) < 1))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append(" The valid Shipping Label Print Options are 1,2,3,4.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", The valid Shipping Label Print Options are 1,2,3,4.");
        //                            }

        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }
        //                ///// Deliver ///'
        //                //DEFAULT_DATE_RANGE
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.Deliver + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Default date range - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Default date range - Please enter a positive numeric value.");
        //                            }

        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                        else if (strCtrlText.Length > 2)
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Default date range - Number of digits cannot be more than 3.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Default date range - Number of digits cannot be more than 3.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }

        //                ///// PutAway ///'
        //                //Item Putaway High
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_HIGH_PCT.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_HIGH_PCT.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Item Putaway High - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Item Putaway High - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }
        //                //Item Putaway Low
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_LOW_PCT.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.PutAway + "_" + AtParWebEnums.AppParameters_Enum.ITEM_PUTAWAY_LOW_PCT.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Item Putaway Low - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Item Putaway Low - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }
        //                ///// TrackIT ///'
        //                //DEFAULT_DATE_RANGE
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.TrackIT + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_DATE_RANGE.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Default date range - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Default date range - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                        else if (strCtrlText.Length > 2)
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Default date range - Number of digits cannot be more than 3.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Default date range - Number of digits cannot be more than 3.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }
        //                ///// StockIssue ///'
        //                //Default Unit Of measure
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_UOM.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.DEFAULT_UOM.ToString()].ToString().Trim();

        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[a-zA-Z0-9_-]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("Default Unit Of measure - Please enter characters or numbers or _.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", Default Unit Of measure - Please enter characters or numbers or _");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                    }
        //                }

        //                //Max. allowable Issue Quantity 
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9.]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("StockIssue Max. allowable Issue Quantity - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", StockIssue Max. allowable Issue Quantity - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                        else
        //                        {
        //                            if (Convert.ToDouble(strCtrlText.ToString()) > 0)
        //                            {
        //                                if (Convert.ToDouble(strCtrlText.ToString()) > dblSIMaxValue)
        //                                {
        //                                    if (sbErrorString.ToString() == string.Empty)
        //                                    {
        //                                        sbErrorString.Append("StockIssue Max. allowable Issue Quantity - Please enter less than or equal to " + dblSIMaxValue);
        //                                    }
        //                                    else
        //                                    {
        //                                        sbErrorString.Append(", StockIssue Max. allowable Issue Quantity - Please enter less than or equal to " + dblSIMaxValue);
        //                                    }
        //                                    if (_log.IsDebugEnabled)
        //                                        _log.Debug(sbErrorString.ToString());
        //                                }
        //                            }
        //                            else
        //                            {
        //                                if (sbErrorString.ToString() == string.Empty)
        //                                {
        //                                    sbErrorString.Append("StockIssue Max. allowable Issue Quantity - Can not be zero ");
        //                                }
        //                                else
        //                                {
        //                                    sbErrorString.Append(", StockIssue Max. allowable Issue Quantity - Can not be zero ");
        //                                }
        //                                if (_log.IsDebugEnabled)
        //                                    _log.Debug(sbErrorString.ToString());
        //                            }
        //                        }
        //                    }
        //                }

        //                //Max. allowable number of digits 
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY_DIGITS.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.StockIssue + "_" + AtParWebEnums.AppParameters_Enum.RESTRICT_ISSUE_QTY_DIGITS.ToString()].ToString().Trim();

        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("StockIssue Max. allowable number of digits - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", StockIssue Max. allowable number of digits - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                        else
        //                        {
        //                            if (Convert.ToDouble(strCtrlText.ToString()) > 0)
        //                            {
        //                                if (Convert.ToDouble(strCtrlText.ToString()) > dblSIMaxDigits)
        //                                {
        //                                    if (sbErrorString.ToString() == string.Empty)
        //                                    {
        //                                        sbErrorString.Append("StockIssue Max. allowable number of digits - Please enter less than or equal to " + dblSIMaxDigits);
        //                                    }
        //                                    else
        //                                    {
        //                                        sbErrorString.Append(", StockIssue Max. allowable number of digits - Please enter less than or equal to " + dblSIMaxDigits);
        //                                    }
        //                                    if (_log.IsDebugEnabled)
        //                                        _log.Debug(sbErrorString.ToString());
        //                                }
        //                            }
        //                            else
        //                            {
        //                                if (sbErrorString.ToString() == string.Empty)
        //                                {
        //                                    sbErrorString.Append("StockIssue Max. allowable number of digits - Can not be zero ");
        //                                }
        //                                else
        //                                {
        //                                    sbErrorString.Append(", StockIssue Max. allowable number of digits - Can not be zero ");
        //                                }
        //                                if (_log.IsDebugEnabled)
        //                                    _log.Debug(sbErrorString.ToString());
        //                            }
        //                        }
        //                    }
        //                }

        //                /////POU///'
        //                //Max. allowable Quantity 
        //                if (dr.Table.Columns.Contains(AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.MAX_ALLOW_QTY.ToString()))
        //                {
        //                    strCtrlText = dr[AtParWebEnums.EnumApps.PointOfUse + "_" + AtParWebEnums.AppParameters_Enum.MAX_ALLOW_QTY.ToString()].ToString().Trim();
        //                    if (!string.IsNullOrEmpty(strCtrlText))
        //                    {
        //                        if (!Regex.IsMatch(strCtrlText, "^[0-9.]+$"))
        //                        {
        //                            if (sbErrorString.ToString() == string.Empty)
        //                            {
        //                                sbErrorString.Append("PointOfUse Max. allowable Issue Quantity - Please enter a positive numeric value.");
        //                            }
        //                            else
        //                            {
        //                                sbErrorString.Append(", PointOfUse Max. allowable Issue Quantity - Please enter a positive numeric value.");
        //                            }
        //                            if (_log.IsDebugEnabled)
        //                                _log.Debug(sbErrorString.ToString());
        //                        }
        //                        else
        //                        {
        //                            if (Convert.ToDouble(strCtrlText.ToString()) > 0)
        //                            {
        //                                if (Convert.ToDouble(strCtrlText.ToString()) > dblSIMaxAllowableDigits)
        //                                {
        //                                    if (sbErrorString.ToString() == string.Empty)
        //                                    {
        //                                        sbErrorString.Append("PointOfUse Max. allowable Issue Quantity - Please enter less than or equal to " + dblSIMaxAllowableDigits);
        //                                    }
        //                                    else
        //                                    {
        //                                        sbErrorString.Append(", PointOfUse Max. allowable Issue Quantity - Please enter less than or equal to " + dblSIMaxAllowableDigits);
        //                                    }
        //                                    if (_log.IsDebugEnabled)
        //                                        _log.Debug(sbErrorString.ToString());
        //                                }
        //                            }
        //                            else
        //                            {
        //                                if (sbErrorString.ToString() == string.Empty)
        //                                {
        //                                    sbErrorString.Append("PointOfUse Max. allowable Issue Quantity - Can not be zero ");
        //                                }
        //                                else
        //                                {
        //                                    sbErrorString.Append(", PointOfUse Max. allowable Issue Quantity - Can not be zero ");
        //                                }
        //                                if (_log.IsDebugEnabled)
        //                                    _log.Debug(sbErrorString.ToString());
        //                            }
        //                        }
        //                    }
        //                }

        //                if (!string.IsNullOrEmpty(errorMessage))
        //                {
        //                    errorMessage = errorMessage + ", " + sbErrorString.ToString();
        //                    sbErrorString = null;
        //                    sbErrorString = new StringBuilder();
        //                }
        //                else
        //                {
        //                    errorMessage = sbErrorString.ToString();
        //                    sbErrorString = null;
        //                    sbErrorString = new StringBuilder();
        //                }

        //            }
        //        }

        //        return AtparStatusCodes.ATPAR_OK;

        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled)
        //            _log.Fatal("Exception Thrown in " + methodBaseName + ",   " + System.Environment.NewLine + ex.ToString());
        //        return AtparStatusCodes.E_SERVERERROR;
        //    }

        //}

        //private long PopulateProfileParameters(DataSet profileData, ref DataSet profileDefaultData, string profileTemplateId, string parameterTemplateId)
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        DataRow[] drProductSetup = null;
        //        drProductSetup = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Select("ProfileTemplateID = '" + profileTemplateId + "'");

        //        if (drProductSetup.Length > 0)
        //        {
        //            foreach (DataRow drProduct in drProductSetup)
        //            {
        //                DataRow[] drParameters = null;
        //                drParameters = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParameters.ToString()].Select("PROFILE_PARAM_TEMPLATE_ID = '" + parameterTemplateId + "'");

        //                if (_log.IsDebugEnabled)
        //                    _log.Debug("ProfileParamTemplateID  row count in ProfileParameters Table " + methodBaseName + " is .. " + drParameters.Length);

        //                if (drParameters.Length > 0)
        //                {
        //                    foreach (DataRow dr in drParameters)
        //                    {
        //                        foreach (DataColumn dc in dr.Table.Columns)
        //                        {
        //                            DataRow drProfileparameters = null;
        //                            string strParameterID = dc.ColumnName.ToString();
        //                            string strAppID = dc.ColumnName.ToString();

        //                            if (strParameterID != "PROFILE_PARAM_TEMPLATE_ID")
        //                            {
        //                                strParameterID = strParameterID.Substring(strParameterID.IndexOf("_") + 1);
        //                                strAppID = strAppID.Substring(0, strAppID.IndexOf("_"));
        //                                //To Update the default dataset with changed values
        //                                DataRow[] drDefaultParams = null;
        //                                drDefaultParams = profileDefaultData.Tables["PARAMS"].Select("APP_ID = '" + strAppID + "'" + " AND  PARAMETER_ID= '" + strParameterID + "' ");
        //                                if (drDefaultParams.Length > 0)
        //                                {
        //                                    drDefaultParams[0]["PARAMETER_VALUE"] = dr[dc.ColumnName.ToString()].ToString();
        //                                }
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //            profileDefaultData.AcceptChanges();

        //        }

        //        return AtparStatusCodes.ATPAR_OK;

        //    }
        //    catch (Exception ex)
        //    {
        //        profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileParametersErrorData.ToString()].Rows[0]["ERROR_MESSAGE"] = AtParDefns.CONST_PROFILE_INVALID_DATA;
        //        if (_log.IsFatalEnabled)
        //            _log.Fatal("Exception Thrown in  " + methodBaseName + " is..." + System.Environment.NewLine + ex.ToString());
        //        return AtparStatusCodes.E_SERVERERROR;
        //    }


        //}

        //private long PopulateProfileDataset(DataSet profileData, DataSet profileDefaultData, string profileTemplateId, string parameterTemplateId, string mode, ref DataSet addUpdateProfile, ref bool blnChangeProfileClienttoServer)
        //{

        //    string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    //long _StatusCode = 0;
        //    int defaultServerCount = 0;
        //    int defaultClientCount = 0;
        //    int excelServerCount = 0;
        //    int excelClientCount = 0;
        //    DataTable dtProfile = new DataTable();
        //    DataTable dtMenus = new DataTable();
        //    DataTable dtParams = new DataTable();
        //    DataTable dtScreenDisplay = new DataTable();
        //    DataRow itemRow = null;
        //    int intRowCnt = 0;
        //    //pDSAddUpdateProfile = new DataSet();

        //    try
        //    {
        //        if (mode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //        {
        //            blnChangeProfileClienttoServer = false;

        //        }
        //        else
        //        {

        //            if (profileDefaultData.Tables.Count > 0)
        //            {
        //                defaultServerCount = (int)profileDefaultData.Tables["ServerCount"].Rows[0]["COUNTS"];

        //                defaultClientCount = (int)profileDefaultData.Tables["ClientCount"].Rows[0]["COUNTS"];
        //            }

        //            //And Get ServerCount and ClientCount from ProfileSetupTable from profileExcelDataSet
        //            DataRow[] drWebRowCount = null;
        //            drWebRowCount = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Select("ProfileTemplateID = '" + profileTemplateId + "'" + " and  [Web(Y/N)] = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "' ");

        //            if (_log.IsDebugEnabled)
        //                _log.Debug("ProfileTemplateID  WEB rows count in ProfileSetup Table in " + methodBaseName + " is .. " + drWebRowCount.Length);
        //            excelServerCount = drWebRowCount.Length;

        //            DataRow[] drHHTRowCount = null;
        //            drHHTRowCount = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Select("ProfileTemplateID = '" + profileTemplateId + "'" + " and  [HHT(Y/N)] = '" + AtParWebEnums.YesNo_Enum.Y.ToString() + "' ");

        //            if (_log.IsDebugEnabled)
        //                _log.Debug("ProfileTemplateID  HHT rows count in ProfileSetup Table in  " + methodBaseName + " is .. " + drHHTRowCount.Length);
        //            excelClientCount = drHHTRowCount.Length;

        //            if (defaultServerCount == 0 & excelClientCount > 0)
        //            {
        //                //Populate Variable strChangeProfileClienttoServer = True
        //                blnChangeProfileClienttoServer = true;
        //            }
        //            else
        //            {
        //                blnChangeProfileClienttoServer = false;
        //            }
        //        }

        //        //Build the AddUpldate dataset with tables for PROFILE, SCREENDISPLAY, PARAMS,MENUS
        //        dtProfile = new DataTable("PROFILE");
        //        dtProfile.Columns.Add("APP_ID", Type.GetType("System.String"));
        //        dtProfile.Columns.Add("SERVER_USER", Type.GetType("System.String"));
        //        dtProfile.Columns.Add("CLIENT_USER", Type.GetType("System.String"));

        //        dtScreenDisplay = new DataTable("SCREENDISPLAY");
        //        dtScreenDisplay.Columns.Add("APP_ID", Type.GetType("System.String"));
        //        dtScreenDisplay.Columns.Add("SCREEN_NAME", Type.GetType("System.String"));
        //        dtScreenDisplay.Columns.Add("FIELD_NAME", Type.GetType("System.String"));
        //        dtScreenDisplay.Columns.Add("COLUMN_HEADER", Type.GetType("System.String"));
        //        dtScreenDisplay.Columns.Add("COLUMN_ORDER", Type.GetType("System.String"));
        //        dtScreenDisplay.Columns.Add("COLUMN_WIDTH", Type.GetType("System.String"));
        //        dtScreenDisplay.Columns.Add("DISPLAY_FIELD", Type.GetType("System.String"));
        //        dtScreenDisplay.Columns.Add("DEFAULT_TOGGLE_TEXT", Type.GetType("System.String"));
        //        dtScreenDisplay.Columns.Add("TOGGLE_ORDER", Type.GetType("System.String"));
        //        dtScreenDisplay.Columns.Add("TOGGLE_FIELD", Type.GetType("System.String"));

        //        dtParams = new DataTable("PARAMS");
        //        dtParams.Columns.Add("APP_ID", Type.GetType("System.String"));
        //        dtParams.Columns.Add("PARAMETER_ID", Type.GetType("System.String"));
        //        dtParams.Columns.Add("PARAMETER_VALUE", Type.GetType("System.String"));

        //        dtMenus = new DataTable("MENUS");
        //        dtMenus.Columns.Add("APP_ID", Type.GetType("System.String"));
        //        dtMenus.Columns.Add("MENU_CODE", Type.GetType("System.String"));
        //        dtMenus.Columns.Add("MENU_SEQ_NO", Type.GetType("System.String"));
        //        dtMenus.Columns.Add("CHKSTATUS", Type.GetType("System.String"));

        //        //Get the datarows from for ProfileSetup table In excelDataSet  for ProfileTemplateId Loop the datarows

        //        DataRow[] drProfileSetUp = null;
        //        drProfileSetUp = profileData.Tables[AtParWebEnums.Enum_ProfileData.ProfileSetup.ToString()].Select("ProfileTemplateID = '" + profileTemplateId + "'");

        //        if (drProfileSetUp.Length > 0)
        //        {
        //            string strServerAccess = string.Empty;
        //            string strClientAccess = string.Empty;
        //            int appID = 0;

        //            foreach (DataRow drxcelProfile in drProfileSetUp)
        //            {


        //                DataRow[] dr = null;
        //                dr = profileDefaultData.Tables["PROFILES"].Select("APP_ID = '" + drxcelProfile[1] + "'");

        //                if (dr.Length > 0)
        //                {
        //                    if (dr[0]["SERVER_USER"] != null)
        //                    {
        //                        strServerAccess = dr[0]["SERVER_USER"].ToString();
        //                    }
        //                    if (dr[0]["CLIENT_USER"] != null)
        //                    {
        //                        strClientAccess = dr[0]["CLIENT_USER"].ToString();
        //                    }

        //                    appID = (int)drxcelProfile[1];


        //                    //To bind changed data only
        //                    if (strServerAccess != (drxcelProfile[3].ToString()
        //                         == AtParWebEnums.YesNo_Enum.Y.ToString() ? AtParWebEnums.YesNo_Enum.Y.ToString() : AtParWebEnums.YesNo_Enum.N.ToString()) || strClientAccess != (drxcelProfile[4].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() ? AtParWebEnums.YesNo_Enum.Y.ToString() : AtParWebEnums.YesNo_Enum.N.ToString()))
        //                    {
        //                        itemRow = dtProfile.NewRow();
        //                        itemRow["APP_ID"] = drxcelProfile[1];
        //                        itemRow["SERVER_USER"] = (drxcelProfile[3].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() ? AtParWebEnums.YesNo_Enum.Y.ToString() : AtParWebEnums.YesNo_Enum.N.ToString());

        //                        itemRow["CLIENT_USER"] = (drxcelProfile[4].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() ? AtParWebEnums.YesNo_Enum.Y.ToString() : AtParWebEnums.YesNo_Enum.N.ToString());
        //                        dtProfile.Rows.Add(itemRow);
        //                    }

        //                    //To Get ScreenDisplay Data, when client check only
        //                    if (drxcelProfile[4].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
        //                    {
        //                        if (profileDefaultData.Tables["SCREENDISPLAY"].Rows.Count > 0)
        //                        {
        //                            if (mode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //                            {
        //                                for (intRowCnt = 0; intRowCnt <= profileDefaultData.Tables["SCREENDISPLAY"].Rows.Count - 1; intRowCnt++)
        //                                {
        //                                    if (profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["APP_ID"].ToString() == appID.ToString())
        //                                    {
        //                                        itemRow = dtScreenDisplay.NewRow();
        //                                        itemRow["APP_ID"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["APP_ID"];
        //                                        itemRow["SCREEN_NAME"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["SCREEN_NAME"];
        //                                        itemRow["FIELD_NAME"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["FIELD_NAME"];
        //                                        itemRow["COLUMN_HEADER"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["COLUMN_HEADER"];
        //                                        itemRow["COLUMN_ORDER"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["COLUMN_ORDER"];
        //                                        itemRow["COLUMN_WIDTH"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["COLUMN_WIDTH"];
        //                                        itemRow["DISPLAY_FIELD"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["DISPLAY_FIELD"];
        //                                        itemRow["DEFAULT_TOGGLE_TEXT"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["DEFAULT_TOGGLE_TEXT"];
        //                                        itemRow["TOGGLE_ORDER"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["TOGGLE_ORDER"];
        //                                        itemRow["TOGGLE_FIELD"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["TOGGLE_FIELD"];
        //                                        dtScreenDisplay.Rows.Add(itemRow);
        //                                    }
        //                                }
        //                                //In Edit Mode
        //                            }
        //                            else
        //                            {
        //                                for (intRowCnt = 0; intRowCnt <= profileDefaultData.Tables["SCREENDISPLAY"].Rows.Count - 1; intRowCnt++)
        //                                {
        //                                    if (profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["APP_ID"].ToString() == appID.ToString())
        //                                    {
        //                                        if (profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["CHANGEFLAG"].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
        //                                        {
        //                                            itemRow = dtScreenDisplay.NewRow();
        //                                            itemRow["APP_ID"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["APP_ID"];
        //                                            itemRow["SCREEN_NAME"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["SCREEN_NAME"];
        //                                            itemRow["FIELD_NAME"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["FIELD_NAME"];
        //                                            itemRow["COLUMN_HEADER"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["COLUMN_HEADER"];
        //                                            itemRow["COLUMN_ORDER"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["COLUMN_ORDER"];
        //                                            itemRow["COLUMN_WIDTH"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["COLUMN_WIDTH"];
        //                                            itemRow["DISPLAY_FIELD"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["DISPLAY_FIELD"];
        //                                            itemRow["DEFAULT_TOGGLE_TEXT"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["DEFAULT_TOGGLE_TEXT"];
        //                                            itemRow["TOGGLE_ORDER"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["TOGGLE_ORDER"];
        //                                            itemRow["TOGGLE_FIELD"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["TOGGLE_FIELD"];
        //                                            dtScreenDisplay.Rows.Add(itemRow);
        //                                        }


        //                                        if ((strServerAccess == AtParWebEnums.YesNo_Enum.N.ToString() && (drxcelProfile[3].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() ? AtParWebEnums.YesNo_Enum.Y.ToString() : AtParWebEnums.YesNo_Enum.N.ToString()) == AtParWebEnums.YesNo_Enum.Y.ToString()) || (strClientAccess == AtParWebEnums.YesNo_Enum.N.ToString() && (drxcelProfile[4].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() ? AtParWebEnums.YesNo_Enum.Y.ToString() : AtParWebEnums.YesNo_Enum.N.ToString()) == AtParWebEnums.YesNo_Enum.Y.ToString()))
        //                                        {
        //                                            itemRow = dtScreenDisplay.NewRow();
        //                                            itemRow["APP_ID"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["APP_ID"];
        //                                            itemRow["SCREEN_NAME"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["SCREEN_NAME"];
        //                                            itemRow["FIELD_NAME"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["FIELD_NAME"];
        //                                            itemRow["COLUMN_HEADER"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["COLUMN_HEADER"];
        //                                            itemRow["COLUMN_ORDER"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["COLUMN_ORDER"];
        //                                            itemRow["COLUMN_WIDTH"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["COLUMN_WIDTH"];
        //                                            itemRow["DISPLAY_FIELD"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["DISPLAY_FIELD"];
        //                                            itemRow["DEFAULT_TOGGLE_TEXT"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["DEFAULT_TOGGLE_TEXT"];
        //                                            itemRow["TOGGLE_ORDER"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["TOGGLE_ORDER"];
        //                                            itemRow["TOGGLE_FIELD"] = profileDefaultData.Tables["SCREENDISPLAY"].Rows[intRowCnt]["TOGGLE_FIELD"];
        //                                            dtScreenDisplay.Rows.Add(itemRow);
        //                                        }
        //                                    }
        //                                }
        //                            }
        //                        }
        //                    }
        //                    //ScreenDisplay

        //                    //To Get Parameters Data, either server or client check

        //                        if (drxcelProfile[3].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString() || drxcelProfile[4].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
        //                        {
        //                            if (profileDefaultData.Tables["PARAMS"].Rows.Count > 0)
        //                            {
        //                                if (mode == AtParWebEnums.AddEdit_Enum.ADD.ToString())
        //                                {
        //                                    for (intRowCnt = 0; intRowCnt <= profileDefaultData.Tables["PARAMS"].Rows.Count - 1; intRowCnt++)
        //                                    {
        //                                        if (profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["APP_ID"].ToString() == appID.ToString())
        //                                        {
        //                                            itemRow = dtParams.NewRow();
        //                                            itemRow["APP_ID"] = profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["APP_ID"];
        //                                            itemRow["PARAMETER_ID"] = profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["PARAMETER_ID"];
        //                                            itemRow["PARAMETER_VALUE"] = profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["PARAMETER_VALUE"];
        //                                            dtParams.Rows.Add(itemRow);
        //                                        }
        //                                    }
        //                                }
        //                                else
        //                                {
        //                                    for (intRowCnt = 0; intRowCnt <= profileDefaultData.Tables["PARAMS"].Rows.Count - 1; intRowCnt++)
        //                                    {
        //                                        if (profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["APP_ID"].ToString() == appID.ToString())
        //                                        {
        //                                            if (profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["PARAMETER_VALUE"] != profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["PARAMETER_COMP_VALUE"])
        //                                            {
        //                                                itemRow = dtParams.NewRow();
        //                                                itemRow["APP_ID"] = profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["APP_ID"];
        //                                                itemRow["PARAMETER_ID"] = profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["PARAMETER_ID"];
        //                                                itemRow["PARAMETER_VALUE"] = profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["PARAMETER_VALUE"];
        //                                                dtParams.Rows.Add(itemRow);
        //                                            }
        //                                            //To Get Newly Added APP Parameters in Edit Mode
        //                                            if ((strServerAccess == AtParWebEnums.YesNo_Enum.N.ToString() && (strServerAccess == AtParWebEnums.YesNo_Enum.Y.ToString() ? AtParWebEnums.YesNo_Enum.Y.ToString() : AtParWebEnums.YesNo_Enum.N.ToString()) == AtParWebEnums.YesNo_Enum.Y.ToString()) || (strClientAccess == AtParWebEnums.YesNo_Enum.N.ToString() && (strClientAccess == AtParWebEnums.YesNo_Enum.Y.ToString() ? AtParWebEnums.YesNo_Enum.Y.ToString() : AtParWebEnums.YesNo_Enum.N.ToString()) == AtParWebEnums.YesNo_Enum.Y.ToString()))
        //                                            {
        //                                                itemRow = dtParams.NewRow();
        //                                                itemRow["APP_ID"] = profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["APP_ID"];
        //                                                itemRow["PARAMETER_ID"] = profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["PARAMETER_ID"];
        //                                                itemRow["PARAMETER_VALUE"] = profileDefaultData.Tables["PARAMS"].Rows[intRowCnt]["PARAMETER_VALUE"];
        //                                                dtParams.Rows.Add(itemRow);
        //                                            }
        //                                        }
        //                                    }
        //                                }
        //                            }
        //                        }




        //                    //To Get Menu Access Data, when ServerCheck only
        //                    if (drxcelProfile[3].ToString() == AtParWebEnums.YesNo_Enum.Y.ToString())
        //                    {
        //                        if (profileDefaultData.Tables["MENUS"].Rows.Count > 0)
        //                        {
        //                            for (intRowCnt = 0; intRowCnt <= profileDefaultData.Tables["MENUS"].Rows.Count - 1; intRowCnt++)
        //                            {
        //                                if (profileDefaultData.Tables["MENUS"].Rows[intRowCnt]["APP_ID"].ToString() == appID.ToString())
        //                                {
        //                                    itemRow = dtMenus.NewRow();
        //                                    itemRow["APP_ID"] = profileDefaultData.Tables["MENUS"].Rows[intRowCnt]["APP_ID"];
        //                                    itemRow["MENU_CODE"] = profileDefaultData.Tables["MENUS"].Rows[intRowCnt]["MENU_CODE"];
        //                                    itemRow["MENU_SEQ_NO"] = profileDefaultData.Tables["MENUS"].Rows[intRowCnt]["MENU_SEQ_NO"];
        //                                    itemRow["CHKSTATUS"] = profileDefaultData.Tables["MENUS"].Rows[intRowCnt]["CHKSTATUS"];
        //                                    dtMenus.Rows.Add(itemRow);
        //                                }
        //                            }
        //                        }
        //                    }
        //                    //Menu Data

        //                    if (_log.IsDebugEnabled)
        //                        _log.Debug("To Get Menu Access Data " + strServerAccess);

        //                }
        //            }
        //            addUpdateProfile.Tables.Add(dtProfile);
        //            addUpdateProfile.Tables.Add(dtScreenDisplay);
        //            addUpdateProfile.Tables.Add(dtParams);
        //            addUpdateProfile.Tables.Add(dtMenus);
        //        }

        //        return AtparStatusCodes.ATPAR_OK;

        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled)
        //            _log.Fatal("Exception Thrown in  " + methodBaseName + " is..." + System.Environment.NewLine + ex.ToString());
        //        return AtparStatusCodes.E_SERVERERROR;
        //    }

        //}

        #endregion
    }
}

