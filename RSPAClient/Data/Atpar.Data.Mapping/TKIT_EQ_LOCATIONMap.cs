using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_EQ_LOCATIONMap : EntityTypeConfiguration<TKIT_EQ_LOCATION>
    {
        public TKIT_EQ_LOCATIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.SERIAL_NO, t.STORAGE_LOCATION, t.SCAN_DATETIME });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.SERIAL_NO)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.STORAGE_LOCATION)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SCAN_USER)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("TKIT_EQ_LOCATION");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.SERIAL_NO).HasColumnName("SERIAL_NO");
            this.Property(t => t.STORAGE_LOCATION).HasColumnName("STORAGE_LOCATION");
            this.Property(t => t.SCAN_DATETIME).HasColumnName("SCAN_DATETIME");
            this.Property(t => t.SCAN_USER).HasColumnName("SCAN_USER");
        }
    }
}
