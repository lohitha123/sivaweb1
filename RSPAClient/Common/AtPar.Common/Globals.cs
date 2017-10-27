using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Common
{
    public class Globals
    {
        public const string QUERY = " Query: ";
        public const string EXCEPTION = "Exception: ";
        public const string BU_TYPE_INVENTORY = "I";
        public const string BU_TYPE_PURCHASING = "P";

    }
    public class  AtParDateTimes
    {
    public const string ATPAR_LONGDATETIME = "M/d/yyyy h:m:s";
    public const string ATPAR_LONGDATETIME_24H = "MM/dd/yyyy HH:mm:ss";
    public const string ATPAR_LONGDATETIME_STR = "Mdyyyyhms";
    public const string ATPAR_SHORTDATE = "M/d/yy";
    public const string ATPAR_SHORTTIME = "HH:mm";
                
    public const string ATPAR_ORA_DATETIME_24H = "MM/DD/YYYY HH24:MI:SS";
    public const string ATPAR_ORA_DATE = "MM/DD/YYYY";
    public const string ATPAR_ORA_DATE_RR = "MM/DD/RR";
                 
    public const string ATPAR_FILEDATETIME_24H = "MM-dd-yyyy-HHmmssms";
    public const string ATPAR_LONGDATE = "MM/dd/yyyy";
    public const string ATPAR_INFORMIX_DATETIME = "%m/%d/%iY %H:%M:%S";
    public const string ATPAR_INFORMIX_DATE = "%m/%d/%iy";
    public const string ATPAR_SAP_DATETIME = "yyyyMMdd";

}

}
