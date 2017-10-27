using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_PKPL_ORDER_PREFIXMap : EntityTypeConfiguration<MT_PKPL_ORDER_PREFIX>
    {
        public MT_PKPL_ORDER_PREFIXMap()
        {
            // Primary Key
            this.HasKey(t => t.ORDER_PREFIX);

            //ignore
            this.Ignore(t => t.CHK_VALUE);

            // Properties
            this.Property(t => t.ORDER_PREFIX)
                .IsRequired()
                .HasMaxLength(8);

            this.Property(t => t.PREFIX_DESCR)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_PKPL_ORDER_PREFIX");
            this.Property(t => t.ORDER_PREFIX).HasColumnName("ORDER_PREFIX");
            this.Property(t => t.PREFIX_DESCR).HasColumnName("PREFIX_DESCR");
        }
    }
}
