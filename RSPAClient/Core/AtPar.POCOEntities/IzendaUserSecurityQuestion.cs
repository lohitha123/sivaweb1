using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class IzendaUserSecurityQuestion
    {
        public System.Guid Id { get; set; }
        public System.Guid UserId { get; set; }
        public System.Guid SecurityQuestionId { get; set; }
        public string Answer { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<bool> Deleted { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public string ModifiedBy { get; set; }
    }
}
