using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RF_BIN_MAPPINGMap : EntityTypeConfiguration<RF_BIN_MAPPING>
    {
        public RF_BIN_MAPPINGMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TAG_ID, t.BUNIT, t.CART_ID, t.BIN_ID });

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

            // Table & Column Mappings
            this.ToTable("RF_BIN_MAPPING");
            this.Property(t => t.TAG_ID).HasColumnName("TAG_ID");
            this.Property(t => t.BUNIT).HasColumnName("BUNIT");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.BIN_ID).HasColumnName("BIN_ID");
        }
    }
}
