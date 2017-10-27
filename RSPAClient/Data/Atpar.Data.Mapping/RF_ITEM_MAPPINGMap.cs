using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RF_ITEM_MAPPINGMap : EntityTypeConfiguration<RF_ITEM_MAPPING>
    {
        public RF_ITEM_MAPPINGMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TAG_ID, t.BUNIT, t.CART_ID, t.BIN_ID, t.ITEM_ID });

            // Properties
            this.Property(t => t.TAG_ID)
                .IsRequired()
                .HasMaxLength(24);

            this.Property(t => t.BUNIT)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.BIN_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SERIAL_NO)
                .HasMaxLength(50);

            this.Property(t => t.LOT_NO)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("RF_ITEM_MAPPING");
            this.Property(t => t.TAG_ID).HasColumnName("TAG_ID");
            this.Property(t => t.BUNIT).HasColumnName("BUNIT");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.BIN_ID).HasColumnName("BIN_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.SERIAL_NO).HasColumnName("SERIAL_NO");
            this.Property(t => t.LOT_NO).HasColumnName("LOT_NO");
            this.Property(t => t.EXPIRY_DATE).HasColumnName("EXPIRY_DATE");
        }
    }
}
