using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RF_ITEM_LEVEL_MONITORMap : EntityTypeConfiguration<RF_ITEM_LEVEL_MONITOR>
    {
        public RF_ITEM_LEVEL_MONITORMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ID, t.ANTENNA_ID });

            // Properties
            this.Property(t => t.ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.LOCATION_ID)
                .HasMaxLength(50);

            this.Property(t => t.LOC_READ_POINT)
                .HasMaxLength(50);

            this.Property(t => t.TAG_ID)
                .HasMaxLength(250);

            this.Property(t => t.ANTENNA_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.STATUS)
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("RF_ITEM_LEVEL_MONITOR");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.LOCATION_ID).HasColumnName("LOCATION_ID");
            this.Property(t => t.LOC_READ_POINT).HasColumnName("LOC_READ_POINT");
            this.Property(t => t.TAG_ID).HasColumnName("TAG_ID");
            this.Property(t => t.ANTENNA_ID).HasColumnName("ANTENNA_ID");
            this.Property(t => t.READ_COUNT).HasColumnName("READ_COUNT");
            this.Property(t => t.ENTRY_TIME).HasColumnName("ENTRY_TIME");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
