using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class IzendaUserPermission
    {
        public System.Guid Id { get; set; }
        public Nullable<System.Guid> ReportId { get; set; }
        public Nullable<System.Guid> DashboardId { get; set; }
        public string AssignedTo { get; set; }
        public Nullable<int> AssignedType { get; set; }
        public Nullable<System.Guid> AccessRightId { get; set; }
        public Nullable<int> Position { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<bool> Deleted { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public string ModifiedBy { get; set; }
        public string AssignedToNames { get; set; }
    }
}
