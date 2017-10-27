using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atpar.Data.Mapping
{
    public class MT_CRCT_TWO_BIN_ALLOCATIONMap : EntityTypeConfiguration<AtPar.POCOEntities.MT_CRCT_TWO_BIN_ALLOCATION>
    {
        public MT_CRCT_TWO_BIN_ALLOCATIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.CART_ID });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(10);
            this.Property(t => t.CART_ID)
               .IsRequired()
               .HasMaxLength(50);

            this.Property(t => t.DESCR)
                .HasMaxLength(255);

            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.CHK_ALLOCATED);
            this.Ignore(t => t.ROWINDEX);

            this.Property(t => t.TWO_BIN_ALLOCATION)
                .HasMaxLength(1);

            this.Property(t => t.DEF_PERCENTAGE_VALUE)
               .HasMaxLength(50);
            // Table & Column Mappings
            this.ToTable("MT_CRCT_TWO_BIN_ALLOCATION");
        }
    }

}
