using AtPar.Common;
using AtPar.Data;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Init;
using AtPar.ViewModel;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace AtPar.Init.Repos
{
    public class ConfigRepository : IConfigData
    {
        ILog _log;

        public ConfigRepository(ILog log)
        {
            _log = log;
            _log.SetLoggerType(typeof(ConfigRepository));
        }

        //public string GetConfigData(string ConfigElement, string ConfigVariable)
        //{
        //    var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
        //    if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }
        //    string strOutPut = string.Empty;

        //    try
        //    {
        //        using (ATPAR_MT_Context objContext = new ATPAR_MT_Context())
        //        {
        //            if (_log.IsInfoEnabled) { objContext.Database.Log = (dbLog => _log.Info(methodBaseName + Globals.QUERY + dbLog + ":")); }
        //            strOutPut = objContext.MT_ATPAR_CONFIGURATION_SECTION_DTLS.Where(x => x.TAB_ID == ConfigElement && x.PARAMETER_ID == ConfigVariable).Select(x => x.PARAMETER_VALUE).FirstOrDefault();
        //        }

        //        return strOutPut;

        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}
    }
}
