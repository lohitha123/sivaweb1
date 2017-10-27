using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class IzendaUser
    {
        public System.Guid Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public Nullable<System.Guid> TenantId { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> Modified { get; set; }
        public string ModifiedBy { get; set; }
        public string EmailAddress { get; set; }
        public string CurrentTokenHash { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<bool> Deleted { get; set; }
        public Nullable<int> DataOffset { get; set; }
        public Nullable<int> TimestampOffset { get; set; }
        public Nullable<bool> InitPassword { get; set; }
        public Nullable<short> RetryLoginTime { get; set; }
        public Nullable<System.DateTime> LastTimeAccessed { get; set; }
        public Nullable<System.DateTime> PasswordLastChanged { get; set; }
        public Nullable<bool> Locked { get; set; }
        public Nullable<System.DateTime> LockedDate { get; set; }
        public string CultureName { get; set; }
        public string DateFormat { get; set; }
        public Nullable<bool> SystemAdmin { get; set; }
        public Nullable<System.DateTime> SecurityQuestionLastChanged { get; set; }
        public Nullable<int> NumberOfFailedSecurityQuestion { get; set; }
    }
}
