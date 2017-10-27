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
    public class ManageEquipmentTypeRepository : IManageEquipmentTypeRepository
    {
        private ILog _log;

        public ManageEquipmentTypeRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ManageEquipmentTypeRepository));
        }        

        public bool IsItemTypeExistOrNot(string eqType)
        {

            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            try
            {
                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    var existingCostCenterCount = objContext.TKIT_ITEM_TYPE.Count(c => c.ITEM_TYPE == eqType);

                    if (existingCostCenterCount > 0)
                    {
                        if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "Item Type : " + eqType + " already exists"); }
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString()); }
                throw ex;
            }

        }

        public long SaveEqTypeData(TKIT_ITEM_TYPE itemType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }

                    sbSql.Append(" INSERT INTO TKIT_ITEM_TYPE(");
                    sbSql.Append(" ITEM_TYPE, ITEM_TYPE_INDICATOR, ITEM_TYPE_DESCR, ORG_GROUP_ID");
                    sbSql.Append(") VALUES (");
                    sbSql.Append("'" + itemType.ITEM_TYPE + "'");
                    sbSql.Append(", '" + itemType.ITEM_TYPE_INDICATOR + "'");
                    sbSql.Append(", '" + itemType.ITEM_TYPE_DESCR + "'");
                    sbSql.Append(", '" + itemType.ORG_GROUP_ID + "')");


                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Inserted " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }

        }

        public long UpdateEqTypeData(TKIT_ITEM_TYPE itemType)
        {
            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            StringBuilder sbSql = new StringBuilder();
            bool _blnWhere = false;

            try
            {

                using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
                {
                    if (_log.IsDebugEnabled) { objContext.Database.Log = (dbLog => _log.Debug(methodBaseName + Globals.QUERY + dbLog + ":")); }


                    sbSql.Append(" UPDATE TKIT_ITEM_TYPE");
                    sbSql.Append(" SET ITEM_TYPE_DESCR = '" + itemType.ITEM_TYPE_DESCR + "'");

                    if (!string.IsNullOrEmpty(itemType.ITEM_TYPE))
                    {
                        if (_blnWhere)
                        {
                            sbSql.Append(" AND ITEM_TYPE = '" + itemType.ITEM_TYPE + "'");
                        }
                        else
                        {
                            sbSql.Append(" WHERE ITEM_TYPE = '" + itemType.ITEM_TYPE + "'");
                            _blnWhere = true;
                        }
                    }

                    if (!string.IsNullOrEmpty(itemType.ITEM_TYPE_INDICATOR))
                    {
                        if (_blnWhere)
                        {
                            sbSql.Append(" AND ITEM_TYPE_INDICATOR = '" + itemType.ITEM_TYPE_INDICATOR + "'");
                        }
                        else
                        {
                            sbSql.Append(" WHERE ITEM_TYPE_INDICATOR = '" + itemType.ITEM_TYPE_INDICATOR + "'");
                            _blnWhere = true;
                        }
                    }


                    if (!string.IsNullOrEmpty(itemType.ORG_GROUP_ID))
                    {
                        if (_blnWhere)
                        {
                            sbSql.Append(" AND ORG_GROUP_ID = '" + itemType.ORG_GROUP_ID + "'");
                        }
                        else
                        {
                            sbSql.Append(" WHERE ORG_GROUP_ID = '" + itemType.ORG_GROUP_ID + "'");
                            _blnWhere = true;
                        }
                    }

                    if (!_log.IsDebugEnabled)
                    {
                        if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY)); }
                    }

                    var count = objContext.Database.ExecuteSqlCommand(sbSql.ToString());

                    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName + "No.Of rows Updated " + count); }

                    return AtparStatusCodes.ATPAR_OK;
                }
            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(methodBaseName + Globals.EXCEPTION + ex.ToString() + Globals.QUERY + sbSql.ToString()); }
                return AtparStatusCodes.ATPAR_E_LOCALDBINSERTFAIL;
            }

        }       

    }
}
