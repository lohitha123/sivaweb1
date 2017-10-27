using AtPar.Repository.Interfaces.Init;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Common;
using System.Data.Entity;
using AtPar.ViewModel;

namespace AtPar.Init.Repos
{
    public class ProcessSchedulerRepository: IProcessSchedulerRepository
    {
        #region Private Variables

        private ILog _log;

        #endregion

        #region Constructor 
        public ProcessSchedulerRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ProcessSchedulerRepository));
        }
        #endregion

        #region GetSheduleDetails
        public List<MT_ATPAR_SCHEDULE_HEADER> GetScheduleType(string schedID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ORG_GROUP_ID, SCHEDULE_TYPE, START_TIME, END_TIME, INTERVAL");
                    sbSql.Append(" FROM MT_ATPAR_SCHEDULE_HEADER");
                    sbSql.Append(" WHERE SCHEDULE_ID = '" + schedID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }
                    var fields = new[] { "ORG_GROUP_ID", "SCHEDULE_TYPE", "START_TIME", "END_TIME", "INTERVAL" };
                    var lstScheduleTypes = objContext.Database.DifferedExecuteQuery<MT_ATPAR_SCHEDULE_HEADER>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstScheduleTypes); }

                    return lstScheduleTypes;
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

        public List<MT_ATPAR_SCHEDULE_DETAIL> GetScheduleDetails(string schedID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ORG_GROUP_ID, SCHEDULE_DAY,");
                    sbSql.Append("SCHEDULE_TIME FROM MT_ATPAR_SCHEDULE_DETAIL");
                    sbSql.Append(" WHERE SCHEDULE_ID = '" + schedID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "ORG_GROUP_ID", "SCHEDULE_DAY", "SCHEDULE_TIME" };

                    var lstScheduleDetails = objContext.Database.DifferedExecuteQuery<MT_ATPAR_SCHEDULE_DETAIL>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstScheduleDetails); }

                    return lstScheduleDetails;
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

        public List<MT_ATPAR_SCHEDULE_DETAIL> GetScheduleTimes(string schedID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT DISTINCT CONVERT(datetime,CONVERT(CHAR(8),SCHEDULE_TIME,8)) SCHEDULE_TIME");
                    sbSql.Append("  FROM MT_ATPAR_SCHEDULE_DETAIL WHERE SCHEDULE_ID = '" + schedID + "'");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    var fields = new[] { "SCHEDULE_TIME" };
                    var lstScheduleTimes = objContext.Database.DifferedExecuteQuery<MT_ATPAR_SCHEDULE_DETAIL>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstScheduleTimes); }

                    return lstScheduleTimes;
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

        #endregion 

        #region CreateNewSchedule
        public long CreateOrUpdateSchedule(string orgGroupID, string schedID, string schedDescr, string userID, int schedType, DateTime startTime,
            DateTime endTime, int interval, string mode)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            long statusCode = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (mode == AtParWebEnums.Mode_Enum.ADD.ToString())
                            {
                                statusCode = InsertScheduleHeader(orgGroupID, schedID, schedDescr, userID, schedType, startTime, endTime, interval, objContext);
                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                            }
                            else if (mode == AtParWebEnums.Mode_Enum.UPDATE.ToString())
                            {
                                statusCode = UpdateScheduleHeader(orgGroupID, schedID, userID, schedType, startTime, endTime, interval, objContext);
                                if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                                {
                                    trans.Rollback();
                                    return statusCode;
                                }
                            }

                            statusCode = DeleteScheduleHeader(schedID, objContext);
                            if (!statusCode.Equals(AtparStatusCodes.ATPAR_OK))
                            {
                                trans.Rollback();
                                return statusCode;
                            }

                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;
                        }

                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString() + ":"); }
                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                    }
                }



            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }
        private long InsertScheduleHeader(string orgGroupID, string schedID, string schedDescr, string userID, int schedType, DateTime startTime,
            DateTime endTime, int interval, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            var count = 0;
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("INSERT INTO MT_ATPAR_SCHEDULE_HEADER (ORG_GROUP_ID, SCHEDULE_ID, ");
                sbSql.Append("DESCRIPTION, CREATED_USER, CREATED_DATE, SCHEDULE_TYPE, STATUS, ");
                sbSql.Append("START_TIME, END_TIME, INTERVAL) VALUES('" + orgGroupID + "', ");
                sbSql.Append("'" + schedID + "', '" + schedDescr + "','" + userID + "', ");
                sbSql.Append("GETDATE(), '" + schedType + "', 0, '" + startTime + "', ");
                sbSql.Append("'" + endTime + "'," + interval + ") ");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());
               
                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
                return AtparStatusCodes.ATPAR_OK;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }
        private long UpdateScheduleHeader(string orgGroupID, string schedID,string userID, int schedType, DateTime startTime,
            DateTime endTime, int interval, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            var count = 0;
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("UPDATE MT_ATPAR_SCHEDULE_HEADER SET LAST_UPDATE_DATE = GETDATE(), ");
                sbSql.Append("LAST_UPDATE_USER ='" + userID + "',START_TIME =  ");
                sbSql.Append("'" + startTime + "', END_TIME = '" + endTime + "',   ");
                sbSql.Append(" INTERVAL = " + interval + "  WHERE ORG_GROUP_ID =  ");
                sbSql.Append("'" + orgGroupID + "'AND SCHEDULE_ID= '" + schedID + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }
                return AtparStatusCodes.ATPAR_OK;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }

        private long DeleteScheduleHeader(string schedID, ATPAR_MT_Context objContext)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            var count = 0;
            try
            {
                if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                sbSql.Append("IF EXISTS ( SELECT SCHEDULE_ID FROM MT_ATPAR_SCHEDULE_DETAIL WHERE ");
                sbSql.Append(" SCHEDULE_ID = '" + schedID + "' )");
                sbSql.Append("DELETE FROM MT_ATPAR_SCHEDULE_DETAIL WHERE SCHEDULE_ID = ");
                sbSql.Append("'" + schedID + "'");

                if (!_log.IsDebugEnabled)
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                }
                count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows updated " + count); }
                return AtparStatusCodes.ATPAR_OK;


            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }
        public long InsertScheduleDetails(List<VM_MT_ATPAR_PROCESS_SCHEDULER> scheduleDetails, string orgGroupID, string schedID)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);

            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            var count = 0;
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                            foreach (var item in scheduleDetails)
                            {
                                sbSql.Append("INSERT INTO MT_ATPAR_SCHEDULE_DETAIL (ORG_GROUP_ID,");
                                sbSql.Append("SCHEDULE_ID, SCHEDULE_DAY,SCHEDULE_TIME) VALUES ");
                                sbSql.Append("('" + orgGroupID + "','" + schedID + "', ");
                                sbSql.Append(" '" + item.SCHEDULE_DAY + "', ");
                                sbSql.Append("'" + item.SCHEDULE_TIME + "') ");

                                if (!_log.IsDebugEnabled)
                                {
                                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                                }
                                objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                                count++;
                                sbSql.Remove(0, sbSql.Length);

                            }
                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
                            trans.Commit();
                            return AtparStatusCodes.ATPAR_OK;

                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }

                            trans.Rollback();
                            return AtparStatusCodes.E_SERVERERROR;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.E_SERVERERROR;
            }
            finally
            {
                sbSql = null;
            }
        }

       
        #endregion

    }
}
