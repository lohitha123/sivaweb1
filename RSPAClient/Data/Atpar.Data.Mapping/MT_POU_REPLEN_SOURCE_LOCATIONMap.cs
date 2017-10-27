using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atpar.Data.Mapping
{
    public class MT_POU_REPLEN_SOURCE_LOCATIONMap : EntityTypeConfiguration<MT_POU_REPLEN_SOURCE_LOCATION>
    {

        public MT_POU_REPLEN_SOURCE_LOCATIONMap()
        {
           
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.PAR_LOC_ID, t.SOURCE_LOCATION });            


            // Table & Column Mappings
            this.ToTable("MT_POU_REPLEN_SOURCE_LOCATION");

            //Ignore properties
            this.Ignore(t => t.M_BUSINESS_UNIT);
            this.Ignore(t => t.M_LOCATION);
            this.Ignore(t => t.LOCATION);
            this.Ignore(t => t.BUSINESS_UNIT);
            this.Ignore(t => t.PERFORM_ACTION);
            this.Ignore(t => t.CHK_VALUE);
        }
    }
}
