using AtPar.Repository.Interfaces.RFID;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;
using log4net;
using AtPar.Data;
using System.Data.Entity;
using AtPar.Common;
using System.Data.SqlClient;
using System.Data;

namespace AtPar.RFID.Repos
{
    public class RFIDEncodeRepository : IRFIDEncodeRepository
    {
        ILog _log;

        public RFIDEncodeRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(RFIDEncodeRepository));
        }

        /// <summary>
        /// WriteBinTags
        /// </summary>
        /// <param name="lstTags"></param>
        /// <returns></returns>
        public Tuple<long, string> WriteBinTags(List<RF_BIN_MAPPING> lstTags)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {
                string strMsg = string.Empty;
                int EncodingCount = 0;
                int EncodedCount = 0;

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                            sbSql.Clear();

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }
                            int insCount = 0;
                            foreach (var tag in lstTags)
                            {
                                sbSql.Append("SELECT COUNT(TAG_ID) TAG_ID FROM RF_BIN_MAPPING WHERE ");
                                sbSql.Append("BUNIT = '" + tag.BUNIT + "' AND CART_ID = '" + tag.CART_ID + "'  AND");
                                sbSql.Append(" BIN_ID = '" + tag.BIN_ID + "'");

                                int result = objContext.Database.SqlQuery<int>(sbSql.ToString()).FirstOrDefault();

                                if (result == 0)
                                {
                                    SqlParameter[] sqlparams = new SqlParameter[2];

                                    sqlparams[0] = new SqlParameter("@FieldName", SqlDbType.NVarChar, 50);
                                    sqlparams[0].Value = "BIN_TAG_ID";

                                    sqlparams[1] = new SqlParameter("@TagID", SqlDbType.NVarChar, 50);
                                    sqlparams[1].Direction = ParameterDirection.Output;

                                    var cnt = objContext.Database.ExecuteSqlCommand("exec sspGetLatestTagID @FieldName,@TagID OUT", sqlparams[0], sqlparams[1]);

                                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Inserted or Updated rows Count " + cnt); }

                                    sbSql.Clear();

                                    sbSql.Append("INSERT INTO RF_BIN_MAPPING (TAG_ID,BUNIT,CART_ID,BIN_ID)");
                                    sbSql.Append(" VALUES('" + sqlparams[1].Value + "', '" + tag.BUNIT + "', '");
                                    sbSql.Append(tag.CART_ID + "', '" + tag.BIN_ID + "')");

                                    insCount += objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                                    sbSql.Clear();
                                    EncodingCount++;
                                }
                                else
                                {
                                    EncodedCount++;
                                }
                                //Todo: Print functionality

                            }
                            if (EncodingCount == lstTags.Count())
                            {
                                if (lstTags.Count == 1)
                                {
                                    strMsg = "Bin Location :" + lstTags.FirstOrDefault().BIN_ID + " Encoded Successfully";
                                }
                                else
                                {
                                    strMsg = "Bin Locations Encoded Successfully";
                                }
                            }
                            else if (EncodedCount == lstTags.Count)
                            {
                                if (lstTags.Count == 1)
                                {
                                    strMsg = "Bin Location :" + lstTags.FirstOrDefault().BIN_ID + " already Encoded";
                                }
                                else
                                {
                                    strMsg = "Bin Locations already Encoded";
                                }
                            }
                            else if (EncodedCount > 0 && EncodingCount > 0)
                            {
                                strMsg = "Some of the Bin Locations are already Encoded. Others Encoded Successfully";
                            }

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + insCount); }

                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            trans.Rollback();
                            return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, string.Empty);
                        }
                        finally
                        {
                            sbSql.Clear();
                        }
                        trans.Commit();
                        return new Tuple<long, string>(AtparStatusCodes.ATPAR_OK, strMsg);
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR, string.Empty);
            }
            finally
            {
                sbSql = null;
            }
        }

        public Tuple<long, string> WriteItemTags(List<RF_ITEM_MAPPING> lstTags)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            //int printerCount;

            StringBuilder sbSql = new StringBuilder();
            try
            {
                string strMsg = string.Empty;
                int EncodingCount = 0;

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {

                    using (DbContextTransaction trans = objContext.Database.BeginTransaction())
                    {
                        try
                        {
                            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
                            sbSql.Clear();

                            if (!_log.IsDebugEnabled)
                            {
                                if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                            }
                            int insCount = 0;
                            foreach (var tag in lstTags)
                            {
                                //    sbSql.Append("SELECT COUNT(TAG_ID) TAG_ID FROM RF_ITEM_MAPPING ");
                                //    //sbSql.Append("BUNIT = '" + tag.BUNIT + "' AND CART_ID = '" + tag.CART_ID + "'  AND");
                                //    //sbSql.Append(" BIN_ID = '" + tag.BIN_ID + "' AND ITEM_ID='" + tag.ITEM_ID + "' ");

                                SqlParameter[] sqlparams = new SqlParameter[2];
                                //Todo: Value doubt
                                sqlparams[0] = new SqlParameter("@FieldName", SqlDbType.NVarChar, 50);
                                sqlparams[0].Value = "ITEM_TAG_ID";

                                sqlparams[1] = new SqlParameter("@TagID", SqlDbType.NVarChar, 50);
                                sqlparams[1].Direction = ParameterDirection.Output;

                                var cnt = objContext.Database.ExecuteSqlCommand("exec sspGetLatestTagID @FieldName,@TagID OUT", sqlparams[0], sqlparams[1]);

                                if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Returned Inserted or Updated rows Count " + cnt); }

                                sbSql.Clear();

                                sbSql.Append("INSERT INTO RF_ITEM_MAPPING (TAG_ID,BUNIT,CART_ID,BIN_ID,");
                                sbSql.Append("ITEM_ID,SERIAL_NO,LOT_NO,EXPIRY_DATE)");
                                sbSql.Append(" VALUES('" + sqlparams[1].Value + "', '" + tag.BUNIT + "', '");
                                sbSql.Append(tag.CART_ID + "', '" + tag.BIN_ID + "','" + tag.ITEM_ID + "', '");
                                sbSql.Append(tag.SERIAL_NO + "', '" + tag.LOT_NO + "','" + tag.EXPIRY_DATE + "' )");

                                insCount += objContext.Database.ExecuteSqlCommand(sbSql.ToString());
                                sbSql.Clear();
                                EncodingCount++;



                                //Todo: Print functionality


                            }
                            if (EncodingCount == lstTags.Count())
                            {
                                if (lstTags.Count == 1)
                                {
                                    strMsg = "Item :" + lstTags.FirstOrDefault().ITEM_ID + " Encoded Successfully";
                                }
                                else
                                {
                                    strMsg = "Items Encoded Successfully";
                                }
                            }

                            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + insCount); }

                        }
                        catch (Exception ex)
                        {
                            if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                            trans.Rollback();
                            return new Tuple<long, string>(AtparStatusCodes.E_SERVERERROR,String.Empty);
                        }
                        finally
                        {
                            sbSql.Clear();
                        }
                        trans.Commit();
                        return new Tuple<long, string> (AtparStatusCodes.ATPAR_OK,strMsg);
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                return new Tuple<long, string> (AtparStatusCodes.E_SERVERERROR,String.Empty);
            }
            finally
            {
                sbSql = null;
            }
        }
    }
}
