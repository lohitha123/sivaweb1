using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_PICK_ALT_LOCATIONSMap : EntityTypeConfiguration<RM_PICK_ALT_LOCATIONS>
    {
        public RM_PICK_ALT_LOCATIONSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUNIT, t.ITEM_ID, t.STAREA });

            // Properties
            this.Property(t => t.BUNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.STAREA)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("RM_PICK_ALT_LOCATIONS");
            this.Property(t => t.BUNIT).HasColumnName("BUNIT");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.STAREA).HasColumnName("STAREA");
        }
    }
}
