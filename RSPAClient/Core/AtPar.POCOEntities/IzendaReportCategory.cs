using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POCOEntities
{
    public partial class IzendaReportCategory
    {

        public Guid Id { get; set; }
        public string Name { get; set; }
        public int? Type { get; set; }
        public Guid? ParentId { get; set; }
        public Guid? TenantId { get; set; }
        public int? Version { get; set; }
        public bool? Deleted { get; set; }
        public DateTime? Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public string ModifiedBy { get; set; }
        public bool? IsGlobal { get; set; }
        public Guid? CreatedById { get; set; }

    }
}
