using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_COST_CENTER_ALLOCATIONSMap : EntityTypeConfiguration<MT_POU_COST_CENTER_ALLOCATIONS>
    {
        public MT_POU_COST_CENTER_ALLOCATIONSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.CART_ID, t.COST_CENTER_CODE });

            // Properties
            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.COST_CENTER_CODE)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_COST_CENTER_ALLOCATIONS");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.COST_CENTER_CODE).HasColumnName("COST_CENTER_CODE");
        }
    }
}
