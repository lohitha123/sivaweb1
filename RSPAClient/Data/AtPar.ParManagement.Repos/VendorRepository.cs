using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AtPar.POCOEntities;
using AtPar.Data;
using AtPar.Repository.Interfaces.ParManagement;
using System.Data;
using AtPar.Common;
using log4net;
using AtPar.ViewModel;

namespace AtPar.ParManagement.Repos
{
    public class VendorRepository : IVendorRepository
    {
        ILog _log;

        public VendorRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(VendorRepository));
        }

        /// <summary>
        /// Used to verify Vendor exist or not in DB
        /// </summary>
        /// <param name="vendorID"></param>
        /// <returns>If Vendor Exists returns ATPAR_E_VENDORALREADYEXISTS, if not return ATPAR_OK, 
        /// in case of any exception returns ATPAR_E_LOCALDBSELECTFAIL </returns>
        public long CheckVendorExistOrNot(string vendorID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
            int cnt = -1;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    cnt = objContext.PAR_MNGT_VENDOR.Count(c => c.VENDOR_ID == vendorID);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Vendors Count " + cnt); }

                    if (cnt > 0)
                    {
                        return AtparStatusCodes.ATPAR_E_VENDORALREADYEXISTS;
                    }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }
        }

        /// <summary>
        /// Used to insert Vendor to DB
        /// </summary>
        /// <param name="vendor"></param>
        /// <param name="tempVendorName"></param>
        /// <returns>Returns ATPAR_OK on Success, returns ATPAR_E_LOCALDBINSERTFAIL on failure </returns>
        public long CreateVendor(PAR_MNGT_VENDOR vendor)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {


                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("INSERT INTO PAR_MNGT_VENDOR(VENDOR_ID, VENDOR_NAME, ADDRESS1, ADDRESS2, ");
                    sbSql.Append("CITY, STATE,ZIP, CONTACT_NAME, PHONE, FAX, CONTACT_E_MAIL, ORDER_DESPATCH_TYPE, ");
                    sbSql.Append("COUNTRY, STATUS, ORG_GROUP_ID, LAST_UPDATE_DATE, LAST_UPDATE_USER, ");
                    sbSql.Append("ALLOW_VEND_ACCESS, BILL_ONLY_EMAIL, REMINDER_FREQ, VEND_USER_ID)");
                    sbSql.Append("VALUES('" + vendor.VENDOR_ID + "', '" + vendor.VENDOR_NAME + "', '" + vendor.ADDRESS1 + "', ");
                    sbSql.Append("'" + vendor.ADDRESS2 + "', '" + vendor.CITY + "', '" + vendor.STATE + "', ");
                    sbSql.Append("'" + vendor.ZIP + "', '" + vendor.CONTACT_NAME + "', '" + vendor.PHONE + "', ");
                    sbSql.Append("'" + vendor.FAX + "', '" + vendor.CONTACT_E_MAIL + "', '" + vendor.ORDER_DESPATCH_TYPE + "', ");
                    sbSql.Append("'" + vendor.COUNTRY + "', " + (int)AtParWebEnums.Status.Active + ", '" + vendor.ORG_GROUP_ID + "', GETDATE(), ");
                    sbSql.Append("'" + vendor.LAST_UPDATE_USER + "','" + vendor.ALLOW_VEND_ACCESS + "', ");
                    sbSql.Append("'" + vendor.BILL_ONLY_EMAIL + "', '" + vendor.REMINDER_FREQ + "', ");
                    sbSql.Append("'" + vendor.VEND_USER_ID + "') ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }
                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Used to get the Vendor Details based on Org Group ID, Vendor ID and Search
        /// </summary>
        /// <param name="vendorID"></param>
        /// <param name="orgGroupID"></param>
        /// <returns></returns>
        public List<PAR_MNGT_VENDOR> GetVendorDetails(string vendorID, string orgGroupID, string search)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            List<PAR_MNGT_VENDOR> listVednors = null;

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT ATORG.ORG_GROUP_NAME, PARVNDR.ORG_GROUP_ID, PARVNDR.VENDOR_ID, PARVNDR.VENDOR_NAME, ");
                    sbSql.Append("PARVNDR.CONTACT_NAME, PARVNDR.ADDRESS1, PARVNDR.ADDRESS2, PARVNDR.CITY, PARVNDR.STATE, ");
                    sbSql.Append("PARVNDR.ZIP, PARVNDR.PHONE, PARVNDR.FAX, PARVNDR.CONTACT_E_MAIL, PARVNDR.ORDER_DESPATCH_TYPE, ");
                    sbSql.Append("PARVNDR.STATUS, PARVNDR.COUNTRY, PARVNDR.ALLOW_VEND_ACCESS, PARVNDR.BILL_ONLY_EMAIL, ");
                    sbSql.Append("PARVNDR.REMINDER_FREQ, PARVNDR.VEND_USER_ID FROM PAR_MNGT_VENDOR PARVNDR INNER JOIN  ");
                    sbSql.Append("MT_ATPAR_ORG_GROUPS ATORG ON PARVNDR.ORG_GROUP_ID = ATORG.ORG_GROUP_ID WHERE 1 = 1");

                    if ((!string.IsNullOrEmpty(orgGroupID)) && orgGroupID != "All")
                    {
                        sbSql.Append(" AND PARVNDR.ORG_GROUP_ID = '" + orgGroupID + "' ");

                        if (!string.IsNullOrEmpty(vendorID))
                        {
                            sbSql.Append(" AND PARVNDR.VENDOR_ID = '" + vendorID + "' ");
                        }

                        if (!string.IsNullOrEmpty(search))
                        {
                            sbSql.Append("AND (PARVNDR.VENDOR_ID LIKE '" + search + "%' ");
                            sbSql.Append("OR PARVNDR.VENDOR_NAME LIKE '" + search + "%' )");
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(vendorID))
                        {
                            sbSql.Append(" AND PARVNDR.VENDOR_ID = '" + vendorID + "' ");
                        }

                        if (!string.IsNullOrEmpty(search))
                        {
                            sbSql.Append("AND (PARVNDR.VENDOR_ID LIKE '" + search + "%' ");
                            sbSql.Append("OR PARVNDR.VENDOR_NAME LIKE '" + search + "%' )");
                        }
                    }


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled)
                        {
                            objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":"));
                        }
                    }

                    var fields = new[] { "ORG_GROUP_NAME", "ORG_GROUP_ID", "VENDOR_ID", "VENDOR_NAME", "CONTACT_NAME",
                        "ADDRESS1", "ADDRESS2", "CITY", "STATE", "ZIP", "PHONE", "FAX", "CONTACT_E_MAIL", "ORDER_DESPATCH_TYPE",
                        "STATUS", "COUNTRY", "ALLOW_VEND_ACCESS", "BILL_ONLY_EMAIL", "REMINDER_FREQ", "VEND_USER_ID" };

                    listVednors = objContext.Database.DifferedExecuteQuery<PAR_MNGT_VENDOR>(fields, sbSql.ToString()).ToList();

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Vendors Returned: " + listVednors.Count()); }

                    return listVednors;
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

        /// <summary>
        /// Used to updated the Vendor details
        /// </summary>
        /// <param name="vendor"></param>
        /// <param name="tempVendorName"></param>
        /// <returns>Returns ATPAR_OK on Success, Return ATPAR_E_LOCALDBUPDATEFAIL on failure</returns>
        public long UpdateVendor(PAR_MNGT_VENDOR vendor)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("UPDATE PAR_MNGT_VENDOR SET VENDOR_NAME='" + vendor.VENDOR_NAME + "', ");
                    sbSql.Append("ADDRESS1='" + vendor.ADDRESS1 + "', ADDRESS2='" + vendor.ADDRESS2 + "', ");
                    sbSql.Append("CITY='" + vendor.CITY + "', STATE='" + vendor.STATE + "', ");
                    sbSql.Append(" ZIP='" + vendor.ZIP + "', CONTACT_NAME='" + vendor.CONTACT_NAME + "',");
                    sbSql.Append(" PHONE='" + vendor.PHONE + "', ALLOW_VEND_ACCESS='" + vendor.ALLOW_VEND_ACCESS + "', ");
                    sbSql.Append(" BILL_ONLY_EMAIL='" + vendor.BILL_ONLY_EMAIL + "', REMINDER_FREQ='" + vendor.REMINDER_FREQ + "', ");
                    sbSql.Append(" VEND_USER_ID='" + vendor.VEND_USER_ID + "', FAX='" + vendor.FAX + "', ");
                    sbSql.Append(" CONTACT_E_MAIL='" + vendor.CONTACT_E_MAIL + "', ORDER_DESPATCH_TYPE='" + vendor.ORDER_DESPATCH_TYPE + "',");
                    sbSql.Append(" COUNTRY='" + vendor.COUNTRY + "', ORG_GROUP_ID ='" + vendor.ORG_GROUP_ID + "' WHERE ");
                    sbSql.Append(" VENDOR_ID='" + vendor.VENDOR_ID + "' ");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
            finally
            {
                sbSql = null;
            }
        }

        /// <summary>
        /// Used to Check Vendor has items in Item Master
        /// </summary>
        /// <param name="vendorID"></param>
        /// <returns>Returns CRCT_S_CANNOTINACTIVATE if Vendor has items in Item Master, in case of failures returns ATPAR_E_LOCALDBSELECTFAIL</returns>
        public long IsVendorHasItems(string vendorID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    int cnt = objContext.PAR_MNGT_ITEM.Count(x => x.VENDOR_ID == vendorID && x.STATUS == 0);

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (cnt > 0)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Item Returned " + cnt); }
                        return AtparStatusCodes.VENDOR_S_CANNOTINACTIVATE;
                    }


                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBSELECTFAIL;
            }

        }

        /// <summary>
        /// Used to make Vendor Status to Active or Inactive
        /// </summary>
        /// <param name="status"></param>
        /// <param name="vendorID"></param>
        /// <returns>Returns ATPAR_OK on success, in case failures returns ATPAR_E_LOCALDBUPDATEFAIL</returns>
        public long UpdateVendorStatus(int status, string vendorID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var item = objContext.PAR_MNGT_VENDOR.Where(x => x.VENDOR_ID == vendorID).FirstOrDefault();

                    if (item != null)
                    {
                        item.STATUS = Convert.ToBoolean(status);

                        objContext.Entry(item).CurrentValues.SetValues(item);
                    }
                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Items count " + item); }
                    objContext.SaveChanges();

                }


                return AtparStatusCodes.ATPAR_OK;
            }

            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBUPDATEFAIL;
            }
        }

        /// <summary>
        /// Used to get the UserID and its related Vendor name
        /// </summary>
        /// <param name="vendorID"></param>
        /// <param name="orgGroupID"></param>
        /// <returns>Returns list of Vendor Users as Key Value Pairs on success</returns>
        public List<AtParKeyValuePair> GetVendorUsers(string vendorID, string orgGroupID)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append("SELECT FIRST_NAME + ' ' + LAST_NAME + ' (' + A.USER_ID + ')' AS Value, A.USER_ID AS ID ");
                    sbSql.Append("FROM MT_ATPAR_USER A, MT_ATPAR_USER_ORG_GROUPS B WHERE A.PROFILE_ID = 'VENDOR' ");
                    sbSql.Append("AND A.USER_ID = B.USER_ID AND ORG_GROUP_ID='" + orgGroupID + "' AND ");
                    sbSql.Append("A.USER_ID NOT IN (SELECT DISTINCT VEND_USER_ID FROM PAR_MNGT_VENDOR ");
                    sbSql.Append("WHERE VENDOR_ID <> '" + vendorID + "')");

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
                    }


                    var lstUsers = objContext.Database.SqlQuery<AtParKeyValuePair>(sbSql.ToString()).ToList();


                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows returned " + lstUsers); }

                    return lstUsers;
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

        // As per Dilip need to move this to Common place
        //public List<MT_ATPAR_ORG_GROUPS> GetOrgDetails(string userID)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

        //    try
        //    {
        //        using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
        //        {
        //            if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

        //            SqlParameter sql_param_userid = new SqlParameter("@userid", SqlDbType.NVarChar, 20);
        //            sql_param_userid.Value = userID;

        //            string sbSql = "exec GetOrgGroupIds @userid";

        //            if (!_log.IsDebugEnabled)
        //            {
        //                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + sbSql.ToString() + ":")); }
        //            }

        //            var fileds = new[] { "ORG_GROUP_ID", "ORG_GROUP_NAME" };
        //            var lstOrgGroups = objContext.Database.DifferedExecuteQuery<MT_ATPAR_ORG_GROUPS>(fileds, sbSql.ToString(), sql_param_userid).ToList();

        //            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of Org Groups Returned: " + lstOrgGroups.Count); }

        //            return lstOrgGroups;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
        //        throw ex;
        //    }

        //}

    }
}
