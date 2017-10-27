using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_STIS_ALT_UOMSMap : EntityTypeConfiguration<RM_STIS_ALT_UOMS>
    {
        public RM_STIS_ALT_UOMSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.ITEM_ID, t.UOM });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UOM)
                .IsRequired()
                .HasMaxLength(5);

            // Table & Column Mappings
            this.ToTable("RM_STIS_ALT_UOMS");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.CONV_FAC).HasColumnName("CONV_FAC");
        }
    }
}
