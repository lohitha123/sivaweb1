using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Common.Service
{
    public static class StatusHandlingExtensions
    {

        public static void AtParNotOK<T>(this AtParWebApiResponse<T> response, long StatusCode, ICommonRepository repo, ILog _log)
        {
            var callingMethod = new System.Diagnostics.StackTrace(1, false).GetFrame(0).GetMethod().Name;
            response.StatusCode = StatusCode;
            var objStatusMsg = repo.GetStatusMessage(StatusCode);

            if (objStatusMsg != null)
            {
                response.StatusMessage = objStatusMsg.STATUS_MESSAGE;
                response.StatType = (AtParWebEnums.StatusType)objStatusMsg.STATUS_TYPE;
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(string.Format("{0} StatusCode : {1} Status Message : {2} Status Type : {3} ",
                        callingMethod, StatusCode, objStatusMsg.STATUS_MESSAGE, objStatusMsg.STATUS_TYPE.ToString()));
                }
            }
            else
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} StatusCode : {1} Not Exsist in Data Base ", callingMethod, StatusCode)); }
            }

        }

        public static void AtParNotOK<T>(this AtParWebApiResponse<T> response, long StatusCode, ICommonRepository repo, ILog _log, string parameterValue)
        {
            var callingMethod = new System.Diagnostics.StackTrace(1, false).GetFrame(0).GetMethod().Name;
            response.StatusCode = StatusCode;
            var objStatusMsg = repo.GetStatusMessage(StatusCode);

            if (objStatusMsg != null)
            {
                if (!string.IsNullOrEmpty(objStatusMsg.STATUS_MESSAGE))
                {
                    if (objStatusMsg.STATUS_MESSAGE.Contains("1%"))
                    {
                        if (parameterValue != string.Empty)
                        {
                            objStatusMsg.STATUS_MESSAGE = objStatusMsg.STATUS_MESSAGE.Replace("1%", parameterValue);
                        }
                    }
                }
                response.StatusMessage = objStatusMsg.STATUS_MESSAGE;
                response.StatType = (AtParWebEnums.StatusType)objStatusMsg.STATUS_TYPE;
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(string.Format("{0} StatusCode : {1} Status Message : {2} Status Type : {3} ",
callingMethod, StatusCode, objStatusMsg.STATUS_MESSAGE, objStatusMsg.STATUS_TYPE.ToString()));
                }
            }
            else
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} StatusCode : {1} Not Exsist in Data Base ", callingMethod, StatusCode)); }
            }
        }

        public static void AtParNotOK<T>(this AtParWebApiResponse<T> response, long StatusCode, ICommonRepository repo, ILog _log, string parameterValue1, string parameterValue2)
        {
            var callingMethod = new System.Diagnostics.StackTrace(1, false).GetFrame(0).GetMethod().Name;
            response.StatusCode = StatusCode;
            var objStatusMsg = repo.GetStatusMessage(StatusCode);

            if (objStatusMsg != null)
            {
                if (!string.IsNullOrEmpty(objStatusMsg.STATUS_MESSAGE))
                {
                    if (objStatusMsg.STATUS_MESSAGE.Contains("1%"))
                    {
                        if (parameterValue1 != string.Empty)
                        {
                            objStatusMsg.STATUS_MESSAGE = objStatusMsg.STATUS_MESSAGE.Replace("1%", parameterValue1);
                        }
                    }

                    if (objStatusMsg.STATUS_MESSAGE.Contains("2%"))
                    {
                        if (parameterValue2 != string.Empty)
                        {
                            objStatusMsg.STATUS_MESSAGE = objStatusMsg.STATUS_MESSAGE.Replace("2%", parameterValue2);
                        }
                    }
                }
                response.StatusMessage = objStatusMsg.STATUS_MESSAGE;
                response.StatType = (AtParWebEnums.StatusType)objStatusMsg.STATUS_TYPE;
                if (_log.IsFatalEnabled)
                {
                    _log.Fatal(string.Format("{0} StatusCode : {1} Status Message : {2} Status Type : {3} ",
                                    callingMethod, StatusCode, objStatusMsg.STATUS_MESSAGE, objStatusMsg.STATUS_TYPE.ToString()));
                }
            }
            else
            {
                if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} StatusCode : {1} Not Exsist in Data Base ", callingMethod, StatusCode)); }
            }
        }

        public static void AtParException<T>(this AtParWebApiResponse<T> response, Exception ex,
                                ICommonRepository repo, ILog _log, long StatusCode = AtparStatusCodes.E_SERVERERROR)
        {
            var callingMethod = new System.Diagnostics.StackTrace(1, false).GetFrame(0).GetMethod().Name;

            var objStatusMsg = repo.GetStatusMessage(StatusCode);
            response.StatusCode = StatusCode;
            response.StatusMessage = objStatusMsg.STATUS_MESSAGE;
            response.ExceptionMessage = ex.ToString();
            response.StatType = (AtParWebEnums.StatusType)objStatusMsg.STATUS_TYPE;

            if (_log.IsFatalEnabled) { _log.Fatal(string.Format("{0} {1} {2} :", callingMethod, Globals.EXCEPTION, ex.ToString())); }

        }

        public static void AtParSuccess<T>(this AtParWebApiResponse<T> response)
        {
            response.StatType = AtParWebEnums.StatusType.Success;
            response.StatusCode = AtparStatusCodes.ATPAR_OK;
        }

    }
}
