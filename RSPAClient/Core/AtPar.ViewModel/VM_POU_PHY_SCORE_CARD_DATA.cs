using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_POU_PHY_SCORE_CARD_DATA
    {
        public Nullable<double> MIN_PROC_COST { get; set; }
        public Nullable<double> MAX_PROC_COST { get; set; }
        public string PROCEDURE_CODE { get; set; }
        public string PROCEDURE_DESCRIPTION { get; set; }
        public string PHYSICIAN_ID { get; set; }
        public string PHYSICIAN_NAME { get; set; }
        public Nullable<long> NO_OF_PROCEDURES { get; set; }
        public Nullable<double> AVG_PROC_COST { get; set; }
        public Nullable<double> TOTAL_VARIANCE { get; set; }
        public Nullable<double> EXTENDED_VARIANCE { get; set; }
        public Nullable<int> NO_OF_PHY_DEPT { get; set; }
        public Nullable<int> NO_OF_PROCS_DEPT { get; set; }
        public Nullable<double> LOW_COST_AVG_DEPT { get; set; }
        public Nullable<double> PER_PROC_PERFORMED { get; set; }
        public Nullable<double> VAR_FROM_LOW_AVG { get; set; }
        public Nullable<int> PHYSICIAN_RANK { get; set; }
    }

}
