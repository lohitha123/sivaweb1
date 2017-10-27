using AtPar.Common;
using AtPar.Repository.Interfaces.POU;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
using AtPar.Data;
using System.Data.SqlClient;

namespace AtPar.POU.Repos
{
    public class DeptLocWrkStationAllocationRepository : IDeptLocWrkStationAllocationRepository
    {
        ILog _log;

        public DeptLocWrkStationAllocationRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(CommonPOURepository));
        }


        
        public List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> GetDeptCartWrkAllocations(string orgGrpId, int appId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS> lstDeptCartWrkAllocations = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT CART_ID, DEPARTMENT_ID, WORKSTATION_ID,BUSINESS_UNIT, ORG_GROUP_ID, 'I' FLAG, LOCATION_TYPE, PRIORITY FROM MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS WHERE ORG_GROUP_ID = '").Append(orgGrpId).Append("'");
                    sbSql.Append(" AND APP_ID=").Append(appId);

                    var fields = new[]
                       {"CART_ID", "DEPARTMENT_ID", "WORKSTATION_ID", "BUSINESS_UNIT", "ORG_GROUP_ID","FLAG", "LOCATION_TYPE","PRIORITY"};

                     lstDeptCartWrkAllocations = objContext.Database.DifferedExecuteQuery<MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS>(fields, sbSql.ToString()).ToList();


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                   

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Business units returned: " + lstDeptCartWrkAllocations.Count()); }

                    return lstDeptCartWrkAllocations;
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


        public List<MT_POU_DEPT_CART_ALLOCATIONS> GetDeptCartAllocations(string orgGrpId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_POU_DEPT_CART_ALLOCATIONS> lstDeptCartAllocations = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT * FROM MT_POU_DEPT_CART_ALLOCATIONS WHERE ORG_GROUP_ID = '").Append(orgGrpId).Append("'");
                  


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    lstDeptCartAllocations = objContext.Database.SqlQuery<MT_POU_DEPT_CART_ALLOCATIONS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Business units returned: " + lstDeptCartAllocations.Count()); }

                    return lstDeptCartAllocations;
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


        public List<MT_POU_DEPT_WORKSTATIONS> GetDeptWrkStations(string orgGrpId)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<MT_POU_DEPT_WORKSTATIONS> lstDeptWrkStations = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT  DEPARTMENT_ID, WORKSTATION_ID, WORKSTATION_DESCR, WORKSTATION_MAC_ADDRESS, ORG_GROUP_ID FROM MT_POU_DEPT_WORKSTATIONS  WHERE ORG_GROUP_ID = '").Append(orgGrpId).Append("'");


                  

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }

                    lstDeptWrkStations = objContext.Database.SqlQuery<MT_POU_DEPT_WORKSTATIONS>(sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Number of Business units returned: " + lstDeptWrkStations.Count()); }

                    return lstDeptWrkStations;
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

        public long DeleteDeptCartWrkAlloc(List<MT_POU_DEPT_WORKSTATIONS> lstDeptCartWrkAlloc, string deptID, int appID, string orgGrpID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            StringBuilder sbSql = new StringBuilder();
            StringBuilder sbLocType = new StringBuilder();
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    foreach(var item in lstDeptCartWrkAlloc)
                    {

                        if(item.DETAILS.Count > 0  && item.DETAILS !=null)
                        {
                              var locTypeP = item.DETAILS.Where(a => a.LOCATION_TYPE == AtParWebEnums.LocationType.P.ToString()).Select(a => a.LOCATION_TYPE).FirstOrDefault();

                                if (!string.IsNullOrEmpty(locTypeP))
                                    sbLocType.Append("'" + locTypeP + "',");

                                var locTypeI = item.DETAILS.Where(a => a.LOCATION_TYPE == AtParWebEnums.LocationType.I.ToString()).Select(a => a.LOCATION_TYPE).FirstOrDefault();

                                if (!string.IsNullOrEmpty(locTypeI))
                                    sbLocType.Append("'" + locTypeI + "',");

                                var locTypeA = item.DETAILS.Where(a => a.LOCATION_TYPE == AtParWebEnums.LocationType.A.ToString()).Select(a => a.LOCATION_TYPE).FirstOrDefault();

                                if (!string.IsNullOrEmpty(locTypeA))
                                    sbLocType.Append("'" + locTypeA + "',");
                            

                            sbSql.Append("DELETE FROM MT_POU_DEPT_CART_WORKSTATION_ALLOCATIONS WHERE  DEPARTMENT_ID ='" + deptID + "' AND ORG_GROUP_ID ='" + orgGrpID + "' AND APP_ID = " + appID);

                            if (sbLocType.Length > 0)
                            {
                                sbSql.Append("AND LOCATION_TYPE IN(" + sbLocType.ToString().TrimEnd(',') + ")");

                            }


                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                            }

                            int response = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : records deleted: " + response); }

                          
                        }

                    }
                   

                }
                return AtparStatusCodes.ATPAR_OK;

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




        public long InsertDeptCartWrkAlloc(List<MT_POU_DEPT_WORKSTATIONS> lstDeptCartWrkAlloc, string deptID, int appID, string orgGrpID,string userID)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }


            string sbSql = string.Empty;
           
            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                   


                    if (lstDeptCartWrkAlloc.Count > 0)
                    {
                        foreach (var item in lstDeptCartWrkAlloc)
                        {
                            foreach (var lstdetails in item.DETAILS)
                            {


                                if (lstdetails.FLAG == "I")
                                {


                                    SqlParameter parampDepartmentID = new SqlParameter("@DepartmentID", item.DEPARTMENT_ID);
                                    SqlParameter paramBunit = new SqlParameter("@BusinessUnit", lstdetails.BUSINESS_UNIT);
                                    SqlParameter parampCartID = new SqlParameter("@CartId", lstdetails.CART_ID);
                                    SqlParameter paramWrkSationID = new SqlParameter("@WksId", item.WORKSTATION_ID);
                                    SqlParameter paramOrgGroupID = new SqlParameter("@OrgGrpID", orgGrpID);
                                    SqlParameter paramLocType = new SqlParameter("@LocType", lstdetails.LOCATION_TYPE);
                                    SqlParameter parampAppID = new SqlParameter("@AppID", appID);
                                    SqlParameter paramUpdateDate = new SqlParameter("@UpdateDate", DateTime.Now);

                                    SqlParameter parampUpdatedUserID = new SqlParameter("@UpdateUserID", userID); //token entry enum

                                    SqlParameter paramPriority = new SqlParameter("@Priority", lstdetails.PRIORITY);


                                    object[] parameters = { parampDepartmentID, paramBunit, parampCartID, paramWrkSationID, paramOrgGroupID, paramLocType, parampAppID, paramUpdateDate, parampUpdatedUserID, paramPriority };

                                    sbSql = "EXEC InsertDeptCarts @DepartmentID, @BusinessUnit,@CartId,@WksId,@OrgGrpID,@LocType,@AppID,@UpdateDate,@UpdateUserID,@Priority";

                                    if (!_log.IsDebugEnabled)
                                    {
                                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                                    }

                                    int response = objContext.Database.ExecuteSqlCommand(sbSql.ToString(), parameters);

                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + " : records deleted: " + response); }

                                }

                            }
                        }
                    }

                    
                    return AtparStatusCodes.ATPAR_OK;

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
    }
}
