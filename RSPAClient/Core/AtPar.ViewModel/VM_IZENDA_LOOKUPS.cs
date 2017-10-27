using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   public class VM_IZENDA_LOOKUPS
    {
        public string type { get; set; }
        public string databaseName { get; set; }
        public string databaseId { get; set; }
        public string querySourceName { get; set; }
        public string querySourceId { get; set; }
        public string lookupKeyQuerySourceFieldName { get; set; }
        public string lookupKeyQuerySourceFieldId { get; set; }
        public string displayQuerySourceFieldName { get; set; }
        public string displayQuerySourceFieldId { get; set; }
        public object[] userDefinedValues { get; set; }
    }

 }
