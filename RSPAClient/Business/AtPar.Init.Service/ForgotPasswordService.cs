using AtPar.Service.Interfaces.Init;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Common;
using AtPar.Repository.Interfaces.Init;
using log4net;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using System.Xml;
using AtParEncryptionServices;
using System.Xml.Linq;
using AtPar.Repository.Interfaces.Common;

namespace AtPar.Init.Service
{
    public class ForgotPasswordService : IForgotPasswordService
    {
        #region Private Variables
        private IForgotPasswordRepository _repo;
        private ILog _log;
        private ICommonRepository _commonRepo;
        #endregion

        #region Constructor 

        public ForgotPasswordService(IForgotPasswordRepository forgotPasswordRepository, ILog log,
             ICommonRepository commonRepository)
        {
            _repo = forgotPasswordRepository;
            _commonRepo = commonRepository;
            _log = log;
            _log.SetLoggerType(typeof(ForgotPasswordService));
        }

        #endregion

        #region Private Methods

        private Tuple<string, long> ForgotPwd(string[] deviceTokenEntry, string userID, string hintQ, string hintA = "", string newPwd = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                string strXml = string.Empty;

                if (userID.Length == 0)
                {
                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn(methodBaseName + " Required parameters missing, aborting token generation");
                    }
                    var response = new Tuple<string, long>(string.Empty, AtparStatusCodes.E_INVALIDPARAMETER);

                    return response;
                }
                var lstUserDetails = _repo.ForgotPwd(deviceTokenEntry, userID, hintQ, hintA, newPwd);

                if (lstUserDetails.Count > 0)
                {
                    foreach (var item in lstUserDetails)
                    {
                        if (!string.IsNullOrEmpty(item.LDAP_USER.Trim()) && (item.LDAP_USER == "Y"))
                        {
                            if (_log.IsWarnEnabled)
                            {
                                _log.Warn(methodBaseName + " Password can not be changed for LDAP User :");
                            }
                            var response = new Tuple<string, long>(string.Empty, AtparStatusCodes.ATPAR_E_LDAPUSERPWDCANNOTEXIST);
                            return response;
                        }
                        else
                        {
                            if (string.IsNullOrEmpty(item.PASSHASH.Trim()))
                            {
                                if (_log.IsWarnEnabled)
                                {
                                    _log.Warn(methodBaseName + " Password donot Exist :");
                                }

                                return new Tuple<string, long>(string.Empty, AtparStatusCodes.E_PWDDONOTEXIST);

                            }
                            if (string.IsNullOrEmpty(item.HINT_QUESTION))
                            {
                                hintQ = string.Empty;
                            }
                            else
                            {
                                hintQ = item.HINT_QUESTION;
                            }
                            if (string.IsNullOrEmpty(hintQ.Trim()))
                            {
                                if (_log.IsWarnEnabled)
                                {
                                    _log.Warn(methodBaseName + " hintQuestion donot Exist :");
                                }
                                return new Tuple<string, long>(string.Empty, AtparStatusCodes.E_HINTQNOTEXIST);
                            }
                            strXml = ("<ROOT><HINTQ>"
                                + (hintQ + "</HINTQ></ROOT>"));
                            var pOutXml = strXml;
                            var response = new Tuple<string, long>(pOutXml, AtparStatusCodes.ATPAR_OK);
                            if (_log.IsDebugEnabled)
                            {
                                _log.Debug(("strxml: " + strXml));
                            }

                            if ((hintA != " ") && (newPwd != " "))
                            {
                                if ((hintA.Trim() != (item.HINT_ANSWER).Trim()))
                                {
                                    if (_log.IsWarnEnabled)
                                    {
                                        _log.Warn((methodBaseName + " Hint Answer does not matched :"));
                                    }
                                    return new Tuple<string, long>(string.Empty, AtparStatusCodes.ATPAR_HINTANOTMATCHED);

                                }
                                else
                                {
                                    var rtnStr = UpdatePassword(deviceTokenEntry, userID, newPwd, DateTime.Now.ToString(), hintQ, hintA);
                                    if (_log.IsDebugEnabled)
                                    {
                                        _log.Debug(("Update Password in ForGot Status Code : " + rtnStr));
                                    }

                                    if ((rtnStr != AtparStatusCodes.ATPAR_OK))
                                    {
                                        if (_log.IsFatalEnabled)
                                        {
                                            _log.Fatal((methodBaseName + "Call Failed"));
                                        }
                                        return new Tuple<string, long>(string.Empty, rtnStr);
                                    }

                                }

                            }

                            if (item.ACCOUNT_DISABLED)
                            {
                                if (_log.IsWarnEnabled)
                                {
                                    _log.Warn((methodBaseName + ": useraccount disabled  "));
                                }
                                return new Tuple<string, long>(string.Empty, AtparStatusCodes.E_ACCOUNTDISABLED);

                            }

                        }

                    }
                }
                if ((lstUserDetails.Count == 0))
                {

                    if (_log.IsWarnEnabled)
                    {
                        _log.Warn((methodBaseName + ": user does not Exist "));
                    }


                    return new Tuple<string, long>(string.Empty, AtparStatusCodes.E_USERDONOTEXIST);
                }

                if (((hintA != " ")
                            && (newPwd != " ")))
                {
                    return new Tuple<string, long>(strXml, AtparStatusCodes.ATPAR_OK);
                }



                return new Tuple<string, long>(strXml, AtparStatusCodes.ATPAR_OK);
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }


                return new Tuple<string, long>(string.Empty, AtparStatusCodes.E_SERVERERROR);
            }
        }

        private long IsValidPasswd(string pwd, string[] deviceTokenEntry)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_SECURITY_PARAMS>();
            string strChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string strNumbers = "0123456789";
            string strSplChars = "@#$%&!";
            string strSpace = " ";
            char ch;
            string strCtrlText = string.Empty;
            bool blnPwdChars = false;
            bool blnPwdNum = false;
            bool blnPwdSplChars = false;

            try
            {
                var securityParams = _commonRepo.GetSecurityParams();

                if ((pwd.Length < securityParams.PASSWD_MIN_LENGTH) || (pwd.Length > securityParams.PASSWD_MAX_LENGTH))
                {
                    if (pwd.Length < securityParams.PASSWD_MIN_LENGTH)
                    {
                        return AtparStatusCodes.ATPAR_E_PASSWORDMINLENGTH;
                    }                    
                    if (pwd.Length > securityParams.PASSWD_MAX_LENGTH)
                    {
                        return AtparStatusCodes.ATPAR_E_PASSWORDMAXLENGTH;
                    }
                }
                else
                {
                    strCtrlText = pwd.Trim();
                    for (int intCnt = 0; (intCnt <= (strCtrlText.Length - 1)); intCnt++)
                    {
                        ch = strCtrlText[intCnt];
                        if ((strSpace.IndexOf(ch) != -1))
                        {
                            return AtparStatusCodes.ATPAR_E_PASSWORDVALIDITY;
                        }

                    }

                    // To Check Characters
                    strCtrlText = pwd.Trim();
                    for (int intCnt = 0; (intCnt <= (strCtrlText.Length - 1)); intCnt++)
                    {
                        ch = strCtrlText[intCnt];
                        if ((strChars.IndexOf(ch) != -1))
                        {
                            blnPwdChars = true;
                            break;
                        }

                    }

                    // To Check Numbers
                    strCtrlText = pwd.Trim();
                    for (int intCnt = 0; (intCnt <= (strCtrlText.Length - 1)); intCnt++)
                    {
                        ch = strCtrlText[intCnt];
                        if ((strNumbers.IndexOf(ch) != -1))
                        {
                            blnPwdNum = true;
                            break;
                        }

                    }

                    // To Check Spl Characters
                    strCtrlText = pwd.Trim();
                    for (int intCnt = 0; (intCnt
                                <= (strCtrlText.Length - 1)); intCnt++)
                    {
                        ch = strCtrlText[intCnt];
                        if ((strSplChars.IndexOf(ch) != -1))
                        {
                            blnPwdSplChars = true;
                            break;
                        }

                    }

                    if (_log.IsDebugEnabled)
                    {
                        _log.Debug((methodBaseName + (": " + securityParams.PASSWD_COMPLEXITY)));
                    }

                    switch (securityParams.PASSWD_COMPLEXITY.ToString())
                    {
                        case "1":
                            if ((!blnPwdChars || (blnPwdNum || blnPwdSplChars)))
                            {
                                return AtparStatusCodes.FAILED_PASSWD_CMPX_1;
                            }
                            break;
                        case "2":
                            if ((!blnPwdChars || (!blnPwdNum || blnPwdSplChars)))
                            {
                                return AtparStatusCodes.FAILED_PASSWD_CMPX_2;


                            }
                            break;
                        case "3":
                            if ((!blnPwdChars || (!blnPwdNum || !blnPwdSplChars)))
                            {
                                return AtparStatusCodes.FAILED_PASSWD_CMPX_3;
                            }

                            break;
                    }
                }
                return AtparStatusCodes.ATPAR_OK;


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private bool ChkPasswdHistory(string userId, string passHash)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            bool resFlag = true;
            try
            {
                var oldPasswordHistory = _repo.ChkPasswdHistory(userId, passHash);
                if (oldPasswordHistory.Count > 0)
                {
                    foreach (var item in oldPasswordHistory)
                    {
                        if (item == passHash)
                        {
                            resFlag = false;
                        }
                    }
                }
                return resFlag;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private long UpdatePassword(string[] pDeviceTokenEntry, string userID, string newPwd, string datetime, string hintQ = "", string hintA = "",
            string oldPwd = "", string deviceId = "")
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            bool resFlag;
            bool updatePwd;
            string newPassword;
            string _strSQL = string.Empty;
            updatePwd = false;
            resFlag = false;
            string hashedNewPwd;

            var response = new AtParWebApiResponse<MT_ATPAR_APP>();
            long _statusCode = 0;

            try
            {
                if ((userID.Length == 0) || (datetime.Length == 0))
                {
                    return AtparStatusCodes.E_INVALIDPARAMETER;
                }
                var passhHash = _repo.UpdatePassword_SelectPassHashByUserId(userID);
                if (!string.IsNullOrEmpty(deviceId))
                {
                    if (passhHash != oldPwd.ToString())
                    {
                        return AtparStatusCodes.ATPAR_E_PASSWORDNOTMATCHED;
                    }

                }
                else if (!string.IsNullOrEmpty(oldPwd))
                {
                    if (passhHash != oldPwd.ToString())
                    {
                        return AtparStatusCodes.ATPAR_E_PASSWORDNOTMATCHED;
                    }
                }

                newPassword = AESEncryptDecryptService.DecryptStringAES(newPwd);
                var passValid = IsValidPasswd(newPassword, pDeviceTokenEntry);
                if ((passValid == AtparStatusCodes.ATPAR_OK))
                {
                    var pswd = newPassword + userID;
                    hashedNewPwd = CSHA256.ComputeHash(((pswd.Trim())).ToString());

                    var securityParam = _commonRepo.GetSecurityParams();

                    if ((securityParam.CHECK_PASSWD_HISTORY == AtParWebEnums.YesNo_Enum.Y.ToString()))
                    {
                        var passwdHistory = ChkPasswdHistory(userID, hashedNewPwd);
                        resFlag = passwdHistory;

                        if ((resFlag == true))
                        {
                            updatePwd = true;
                        }
                        else
                        {
                            return AtparStatusCodes.ATPAR_E_PASSWORDEXISTS;
                        }
                    }
                    else
                    {
                        updatePwd = true;
                    }

                    if (updatePwd)
                    {
                        if ((hintQ != " ") && (hintA != " "))
                        {
                            _statusCode = _repo.UpdatePasswdWithHintQuest(hashedNewPwd, userID, hintQ, hintA);
                            if ((_statusCode != AtparStatusCodes.ATPAR_OK))
                            {
                                return _statusCode;
                            }
                        }
                        else
                        {
                            _statusCode = _repo.UpdatePasswdWithoutHintQuest(hashedNewPwd, userID);
                            if ((_statusCode != AtparStatusCodes.ATPAR_OK))
                            {

                                return _statusCode;
                            }
                        }

                        _statusCode = _repo.UpdateUserACL(datetime, securityParam.PASSWD_EXP_PERIOD, userID);
                        if ((_statusCode != AtparStatusCodes.ATPAR_OK))
                        {
                            return _statusCode;
                        }


                        if ((securityParam.MAINTAIN_PASSWD_HISTORY == AtParWebEnums.YesNo_Enum.Y.ToString()))
                        {
                            _statusCode = _repo.InsertPasswordHistory(userID, hashedNewPwd, DateTime.Now.ToString());
                            if ((_statusCode != AtparStatusCodes.ATPAR_OK))
                            {
                                return _statusCode;
                            }
                        }

                    }

                }
                else
                {
                    return passValid;
                }
                return AtparStatusCodes.ATPAR_OK;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }

                return AtparStatusCodes.E_SERVERERROR;
            }
        }

        #endregion

        public AtParWebApiResponse<MT_ATPAR_APP> ForgotHashPassword(string[] deviceTokenEntry, string userID, string hintQ, string hintA = "", string newPwd = "")
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<MT_ATPAR_APP>();
            string pOutXml = string.Empty;
            long _statusCode = 0;
            try
            {
                //AtParEncryptionServices.AtParEncryptionServices encServices = new AtParEncryptionServices.AtParEncryptionServices();
                //var encryptedpsw = encServices.EncryptString(NewPwd, (short)AtParEncryptionServices.AtParEncryptionServices.PassphraseTypes.CXLDataPassphrase);
                newPwd = newPwd.Replace(" ", "+");
                var forgotPwd = ForgotPwd(deviceTokenEntry, userID, hintQ, hintA, newPwd);

                if (forgotPwd.Item2 != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(forgotPwd.Item2, _commonRepo, _log);
                    return response;
                }
                if (!string.IsNullOrEmpty(forgotPwd.Item1))
                {

                    var xmlDoc = XDocument.Parse(forgotPwd.Item1);

                    var statusCode = xmlDoc.Descendants("STATUS_CODE").Where(a => a.Name == "STATUS_CODE").Select(a => a.Value).FirstOrDefault();
                    var hintQue = xmlDoc.Descendants("HINTQ").Where(a => a.Name == "HINTQ").Select(A => A.Value).FirstOrDefault();

                    if (!string.IsNullOrEmpty(statusCode))
                    {
                        _statusCode = Convert.ToInt64(statusCode);
                        if (_statusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(AtparStatusCodes.ATPAR_E_PASSWORDUPDATIONFAILED, _commonRepo, _log);
                            return response;
                        }
                    }
                    else if (!string.IsNullOrEmpty(hintQue))
                    {
                        response.DataVariable = hintQue;
                        response.AtParSuccess();
                        return response;
                    }
                }
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }


        }

    }
}
