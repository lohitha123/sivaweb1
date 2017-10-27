using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using AtParEncryptionServices;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Init.Service
{
    public class ChangePasswordService : IChangePasswordService
    {
        private ILog _log;

        private IChangePasswordRepository _repo;
        private ICommonRepository _commonRepo;
        public ChangePasswordService(ILog log, ICommonRepository commonRepo, IChangePasswordRepository repo)
        {
            _log = log;
            _repo = repo;
            _commonRepo = commonRepo;

        }

        public AtParWebApiResponse<long> UpdatePassword(string[] pDeviceTokenEntry, string userID, string newPwd, string hintQ, string oldPwd, string hintA, 
             string deviceId = "")
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

            var response = new AtParWebApiResponse<long>();
            long _statusCode = 0;

            try
            {
                if ((userID.Length == 0))
                {
                    response.AtParNotOK(AtparStatusCodes.E_INVALIDPARAMETER, _commonRepo, _log);
                    return response;
                }
                var passhHash = _repo.UpdatePassword_SelectPassHashByUserId(userID);
                if (!string.IsNullOrEmpty(deviceId))
                {
                    if (passhHash != oldPwd.ToString())
                    {
                        response.AtParNotOK(AtparStatusCodes.ATPAR_E_PASSWORDNOTMATCHED, _commonRepo, _log);
                        return response;

                    }

                }
                else if (!string.IsNullOrEmpty(oldPwd))
                {
                    if (passhHash != oldPwd.ToString())
                    {
                        response.AtParNotOK(AtparStatusCodes.ATPAR_E_PASSWORDNOTMATCHED, _commonRepo, _log);
                        return response;

                    }
                }
                newPwd = newPwd.Replace(" ", "+");
                newPwd = newPwd.Replace("%2B", "+");
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
                            response.AtParNotOK(AtparStatusCodes.ATPAR_E_PASSWORDEXISTS, _commonRepo, _log);
                            //return AtparStatusCodes.ATPAR_E_PASSWORDEXISTS;
                            return response;
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
                                response.AtParNotOK(_statusCode, _commonRepo, _log);

                                return response;

                            }
                        }
                        else
                        {
                            _statusCode = _repo.UpdatePasswdWithoutHintQuest(hashedNewPwd, userID);
                            if ((_statusCode != AtparStatusCodes.ATPAR_OK))
                            {

                                response.AtParNotOK(_statusCode, _commonRepo, _log);

                                return response;
                            }
                        }

                        _statusCode = _repo.UpdateUserACL(DateTime.Now.ToString(), securityParam.PASSWD_EXP_PERIOD, userID);
                        if ((_statusCode != AtparStatusCodes.ATPAR_OK))
                        {
                            response.AtParNotOK(_statusCode, _commonRepo, _log);

                            return response;
                        }


                        if ((securityParam.MAINTAIN_PASSWD_HISTORY == AtParWebEnums.YesNo_Enum.Y.ToString()))
                        {
                            _statusCode = _repo.InsertPasswordHistory(userID, hashedNewPwd, DateTime.Now.ToString());
                            if ((_statusCode != AtparStatusCodes.ATPAR_OK))
                            {
                                response.AtParNotOK(_statusCode, _commonRepo, _log);

                                return response;
                            }
                        }

                    }

                }
                else
                {
                    response.AtParNotOK(passValid, _commonRepo, _log);

                    return response;
                }
                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                response.StatusCode = AtparStatusCodes.E_SERVERERROR;
                return response;
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
    }
}
