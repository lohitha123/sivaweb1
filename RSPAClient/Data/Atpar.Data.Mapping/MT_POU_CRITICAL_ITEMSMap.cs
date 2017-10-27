using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_CRITICAL_ITEMSMap : EntityTypeConfiguration<MT_POU_CRITICAL_ITEMS>
    {
        public MT_POU_CRITICAL_ITEMSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.CART_ID, t.ITEM_ID });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_CRITICAL_ITEMS");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
        }
    }
}
