using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public  class VM_POU_PREF_CARD_OPTIMIZATION
    {
        public string ITEM { get; set; }
        public string ITEMTYPE { get; set; }
        public string DESCRIPTION { get; set; }
        public double? ITEMCOST { get; set; }
        public double? CURRENTOPENQTY { get; set; }
        public double? CURRENTHOLDQTY { get; set; }
        public double? MAXUSAGE { get; set; }       
        public double? MINUSAGE { get; set; }
        public double? MEANUSAGE { get; set; }
        public double? OPENQTY { get; set; }
        public double? HOLDQTY { get; set; }
        public double? VARIANCE { get; set; }
        public double? VARIANCE_PERCENTAGE { get; set; }
        public double? SAVINGS { get; set;}


    }
}
