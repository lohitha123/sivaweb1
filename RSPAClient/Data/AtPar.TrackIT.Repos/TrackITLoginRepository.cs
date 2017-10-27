using AtPar.Repository.Interfaces.TrackIT;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using System.Data.Entity;

namespace AtPar.TrackIT.Repos
{
    public class TrackITLoginRepository : ITrackITLoginRepository
    {
        private ILog _log;

        public TrackITLoginRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(TrackITLoginRepository));
        }

        public Tuple<long, TKIT_REQUESTOR> CheckLogin(string userID, string password)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var isUserExist = objContext.TKIT_REQUESTOR.Where(c => c.REQUESTOR_ID == userID).FirstOrDefault();

                    if (isUserExist != null)
                    {
                        if (isUserExist.STATUS == AtParWebEnums.enum_Requestor_Status.I.ToString())
                        {
                            if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "User Status is Inactive"); }
                            return new Tuple<long, TKIT_REQUESTOR>(AtparStatusCodes.TKIT_E_INACTIVEREQUESTOR, null);
                        }
                        else
                        {
                            if (isUserExist.PASSWORD != password )
                            {
                                if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "Invalid Password"); }
                                return new Tuple<long, TKIT_REQUESTOR>(AtparStatusCodes.TKIT_E_INVALIDPASSWORD, null);
                            }
                            else
                            {
                                isUserExist.USERNAME = isUserExist.FIRST_NAME + " " + isUserExist.MIDDLE_INIT + " " + isUserExist.LAST_NAME;
                                return new Tuple<long, TKIT_REQUESTOR>(AtparStatusCodes.ATPAR_OK, isUserExist);
                            }
                        }
                    }
                    else
                    {
                        if (_log.IsWarnEnabled) { _log.Warn(methodBaseName + "User does not exist"); }
                        return new Tuple<long, TKIT_REQUESTOR>(AtparStatusCodes.TKIT_E_USERDONOTEXIST, null);
                    }
                     
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, TKIT_REQUESTOR>(AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL, null);
            }

        }
    }
}
