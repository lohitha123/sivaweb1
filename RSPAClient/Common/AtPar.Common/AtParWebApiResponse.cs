using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Common
{
    public class AtParWebApiResponse<AtParData>
    {
        public AtParWebEnums.StatusType StatType { get; set; }
        public long StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public string ExceptionMessage { get; set; }
        public AtParData Data { get; set; }
        public IList<AtParData> DataList { get; set; }        
        public object DataVariable { get; set; }
        public Dictionary<string, Object> DataDictionary { get; set; }
    }
}
