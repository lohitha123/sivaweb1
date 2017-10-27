using System;
using System.ComponentModel.DataAnnotations;

namespace AtPar.POCOEntities
{
    public partial class MT_ATPAR_ERROR_LOG
    {
        public DateTime? ERROR_DT { get; set; }
        [Key]
        public int ERROR_CODE { get; set; }
        public string ERROR_MESSAGE { get; set; }
    }
}
