using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace AtPar.Common
{
    public static class AtParDefns
    {

        public static string SystemID = string.Empty;
        public static string UserID = string.Empty;

        public const string BU_TYPE_INVENTORY = "I";
        public const string BU_TYPE_PURCHASING = "P";

        //Specialty Service Codes Constants
        public const string POU_Setup_REASONS = "REASONS";
        public const string POU_Setup_PROCEDURES = "PROCEDURES";
        public const string POU_Setup_COSTCENTER = "COSTCENTER";
        public const string POU_Setup_CASECARTS = "CASECARTS";
        public const string POU_Setup_SPECIALTY = "SPECIALTY";
        public const string DEFAULT_EMPTY_PASSWORD = "#$%^&*(*)";
        public const string REQUEST_QTY = "02";

        public const string CONST_ATPAR = "Atpar";
        public const string adminProfile = "admin";
        public const string CONST_ATPAR_APPID = "0";

        // Transaction Status
        public const int statCancel = 13;
        public const int statDownloaded = 1;       
        public const int statCISuccess = 17;
        public const int statEIPSuccess = 18;
        public const int statError = 10;
        public const int statSent = 11;
        public const int statUnlock = 12;
        public const int statRemSucess = 14;
        public const int statCartPutAwayDownload = 7;
        public const int statPutAway = 4;
        public const int statRevised = 8;
        public const int statEventCounting = 4;
        public const int statEventCountComplete = 7;
        public const int IUT_RECEIVING = 2;

        public const string CONST_USER_EXIST = "User Creation Failed, User Already Exist";
        public const string CONST_ORG_NOT_EXIST = "User Creation Failed, Org GroupID Does Not Exist";
        public const string CONST_PROFILE_NOT_EXIST = "User Creation Failed, ProfileID Does Not Exist";
        public const string CONST_USER_PARAM_CREATION_FAILED = "User Parameters Updation Failed";
        public const string CONST_USER_CREATION_SUCESS = "User Created Successfully";
        public const string CONST_USER_CREATION_FAILED = "User Creation Failed";
        public const string CONST_USER_UPDATION_FAILED = "User Updation Failed";
        public const string CONST_USER_UPDATION_SUCESS = "User Updated Successfully";
        public const string CONST_LDAP_CONFIG_NOT_SET = "User Creation Failed, LDAP Configuration Not Set";
        public const string CONST_INVALID_DATA = "User Creation Failed, Invalid Data";
        public const string CONST_INVALID_LDAPID = "User Creation Failed, Invalid LDAP ID";
        public const string CONST_USER_UPDATION_FAILED_ORG_NOT_EXIST = "User Updation Failed, Org GroupID Does Not Exist";
        public const string CONST_USER_UPDATION_FAILED_PROFILE_NOT_EXIST = "User Updation Failed, ProfileID Does Not Exist";
        public const string CONST_NOT_VALID_PARAMETER = "Not a valid column parameter";
        public const string CONST_PROFILE_CREATION_FAILED = "Profile creation failed";
        public const string CONST_PROFILETEMPLATEID_IS_MANDATORY = "Invalid ProfileTemplate Id in ProfileSetUp";     
        public const string CONST_NO_ATPAR_ACCESS = "Cannot remove access of ATPAR product in Profile Setup for Admin Profile";
        public const string CONST_NO_ACCESS = " Profile Creation Failed, No HHT and Web Access";
        public const  string CONST_HHT_WEB_ACCESS  = "HHT and WEB Access";
        public const string CONST_WEB_ACCESS = "WEB Access";
        public const string CONST_HHT_ACCESS = "HHT Access";
        public const string CONST_PROFILE_UPDATION_FAILED = "Profile updation failed";
        public const string CONST_SCREENTEMPLATEID_IS_MANDATORY = "Invalid ProfileScreenDisplayTemplate Id in ProfileScreenDisplay";
        public const string CONST_ERR_COMMA_SEPARATOR  = ", ";
        public const string CONST_ERR_SEPARATOR = " - ";
        public const string CONST_SELECT_DEFAULT_DISPLAY_FIELD = "Minimum Default display fields have to be Selected";
        public const string CONST_MANDATORY_TOGGLE_FIELD = "Mandatory Toggle field should be selected";
        public const string CONST_SCREENDISPLAY_NOT_VALID = "Screen Display Order and Toggle order should be 0-99";
        public const string CONST_NOT_VALID_DATA = "Order, Width, toggle Order should be numeric";
        public const string CONST_SCREENDISPLAY_COLUMN_WIDTH = "Screen Display Column Width should be 0-9999";
        public const string CONST_MANDATORY_FIELDS_MISSING = "Mandatory fields are missing";
        public const string CONST_INVALID_SCREENDISPLAY_DATA  = "ScreenDisplayTemplate Id validation Failed - check ScreenDisplay Error table";
        public const string CONST_NO_MENU_ACCESS = "No Menu Access ";
        public const string CONST_NO_ATPAR_MENU_ACCESS = "Cannot remove the menu access of ATPAR product for Admin Profile ";
        public const string CONST_MENUSEQ_IS_MANDATORY = "Menu Sequence is mandatory";
        public const string CONST_MENUSEQ_NOT_NUMERIC = "Menu Sequence is not Numeric";
        public const string CONST_MENUSEQ_NOT_VALID = "Sequence Number should be 0-99";
        public const string CONST_INVALID_MENU_DATA = "MenuTemplate Id validation Failed - check MenuTemplate Error table";
        public const string CONST_PARAMETERTEMPLATEID_IS_MANDATORY = "Invalid ProfileParameterTemplate Id in ProfileParameters";
        public const string CONST_INVALID_PARAMETERS_DATA = "ParameterTemplate Id validation Failed - check Parameters Error table";
        public const string CONST_PROFILE_INVALID_DATA = "Profile Creation Failed, Invalid Data";
        public const string LabelFileNameSuffix = ".lvx";
        public const string LABEL_PROMPT_BARCODE = "BARCODE";
        public const int m_statDetailOpen = -5;
        public const string LABEL_PROMPT_IGNORE = "IGNORE";
        public const string LABEL_PROMPT_SEP = "$";
        public const string LABEL_PROMPT_MULTILINE = "MULTILINE" + LABEL_PROMPT_SEP;
        public const int CLOSED = 30;
        public const int PARTIALLY_RECEIVED = 25;
        public const string ATPAR_SHORTTIME = "HH:mm";
        public const string ATPAR_SHORTDATE = "M/d/yy";
        public const string Success = "urn:oasis:names:tc:SAML:2.0:status:Success";
        public const string ASSERTION = "urn:oasis:names:tc:SAML:2.0:assertion";
        public const string PROTOCOL = "urn:oasis:names:tc:SAML:2.0:protocol";
        public const int intStatDetailReceive = 0;
        public const string CONST_IZENDA_CATEGORY_ID = "B5EE9911-FAAE-434F-ADD4-60A400F3B9A0";
        public const string CONST_IZENDA_TENANT_ID = "3E4B90D8-63B9-48A6-BDD0-C3AF81AC04D5";
        public const string CONST_IZENDA_ROLE_ID = "EA98B2CA-6AC7-40F7-BBF2-EBD0E3184C25";
        public const string CONST_IZENDA_SECURITY_STAMP = "582f98f4-7d38-4fc8-ae96-230b4c7a157b";
        public const string CONST_IZENDA_PASSHASH = "AMOkjq87OTk0RIPMD1unGf0V0C9LN4aDVadcZ2XBTd7FdY8f5Z6SKlikkLPv1nDwHQ==";

        public static string CleanString(string source)
        {
            // Clean up the string with out any single/double quotations.

            if (!string.IsNullOrEmpty(source))
            {

                source = System.Text.RegularExpressions.Regex.Replace(source, "<", "$@PARLT@PAR$");
                source = System.Text.RegularExpressions.Regex.Replace(source, ">", "$@PARGT@PAR$");
                source = System.Text.RegularExpressions.Regex.Replace(source, "\"", string.Empty);

            }

            return source;

        }

        /// <summary>
        /// This function can be used to replace the special chars in XML file
        /// </summary>
        /// <param name="linenumber">exception line number</param>
        /// <param name="strFilePath">File Path</param>
        /// <param name="pStrApplication">Application type</param>
        /// <param name="lngCount">Line count of Xml File</param>
        /// <returns>Error/Success Code</returns>
        /// <remarks></remarks>

        public  static long Process_XML_SpecialChars(long linenumber, string strFilePath, string pStrApplication, string[] lines, long lngCount = 0)
        {
            long functionReturnValue = 0;
            StackFrame stackFrame = new StackFrame();
            string methodBaseName = stackFrame.GetMethod().Name;
            //if (log.IsDebugEnabled)
            //    log.Debug(methodBaseName);
          
            XmlDocument xmlDoc = new XmlDocument(); 
            string _strLine = string.Empty;
            string _strReplace = string.Empty;
            string _strAppPath = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0] + ":\\Atpar\\";
            string _strTempfile = _strAppPath + pStrApplication + "_Temp.xml";    
            int _intLineposition = default(int);
            long _lngStatusCode = 0;


            try
            {
                _strLine = lines[linenumber - 1].Trim();

                _intLineposition = _strLine.IndexOf("<",2);

                if (_intLineposition > 0)
                {
                    _strReplace = "&lt;";
                }
                else
                {
                    _intLineposition = _strLine.IndexOf(">",2);
                    if (_intLineposition > 0)
                    {
                        _strReplace = "&gt;";
                    }
                }

                _strLine = _strLine.Substring(1, _intLineposition - 1)  + _strReplace + _strLine.Substring(1, _intLineposition + 1);

                lines[linenumber - 1] = _strLine;

                File.WriteAllLines(strFilePath, lines);

                try
                {
                    xmlDoc.Load(strFilePath);
                }
                catch (XmlException ex)
                {
                    //Recursing the function as to remove all the special characters at every occurence
                    linenumber = ex.LineNumber;
                    _lngStatusCode = Process_XML_SpecialChars(linenumber, strFilePath, pStrApplication, lines);
                }
                finally
                {
              
                    xmlDoc = null;

                }


                if (_lngStatusCode == AtparStatusCodes.ATPAR_OK)
                {
                    try
                    {
                        File.Delete(_strTempfile);
                    }
                    catch (Exception ex)
                    {
                        _lngStatusCode = AtparStatusCodes.E_SERVERERROR;
                        functionReturnValue = _lngStatusCode;
                    }

                    functionReturnValue = _lngStatusCode;

                }


            }
            catch (Exception ex)
            {
                //if (_log.IsFatalEnabled)
                //    _log.Fatal(methodBaseName + " : Failed with exception :" + ex.ToString() + ": " + "\n");
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {       
                xmlDoc = null;
            }
            return functionReturnValue;

        }

        public static string GetDatabaseString(string pSource)
        {


            if (!string.IsNullOrEmpty(pSource))
            {
                pSource = pSource.Replace("$@PARLT@PAR$", "<");
                pSource = pSource.Replace("$@PARGT@PAR$", ">");
                pSource = pSource.Replace("'", "''");

            }

            return pSource;

        }
    }
}
