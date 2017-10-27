using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class InstanceState
    {
        public System.Guid uidInstanceID { get; set; }
        public byte[] state { get; set; }
        public Nullable<int> status { get; set; }
        public Nullable<int> unlocked { get; set; }
        public Nullable<int> blocked { get; set; }
        public string info { get; set; }
        public System.DateTime modified { get; set; }
        public Nullable<System.Guid> ownerID { get; set; }
        public Nullable<System.DateTime> ownedUntil { get; set; }
        public Nullable<System.DateTime> nextTimer { get; set; }
    }
}
