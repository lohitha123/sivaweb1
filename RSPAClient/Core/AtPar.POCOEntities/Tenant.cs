using System;
using System.Collections.Generic;

namespace AtPar.POCOEntities
{
    public partial class Tenant
    {
        public Tenant()
        {
            this.AspNetUsers = new List<AspNetUser>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<AspNetUser> AspNetUsers { get; set; }
    }
}
