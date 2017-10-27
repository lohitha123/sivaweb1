using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_DEVICE_DETAILSMap : EntityTypeConfiguration<MT_ATPAR_DEVICE_DETAILS>
    {
        public MT_ATPAR_DEVICE_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.DEVICE_ID, t.MAC_ADDRESS });

            // Properties
            this.Property(t => t.DEVICE_ID)
                .IsRequired()
                .HasMaxLength(150);

            this.Property(t => t.DESCRIPTION)
                .IsRequired()
                .HasMaxLength(255);

            this.Property(t => t.MAC_ADDRESS)
                .IsRequired()
                .HasMaxLength(30);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_DEVICE_DETAILS");
            this.Property(t => t.DEVICE_ID).HasColumnName("DEVICE_ID");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.MAC_ADDRESS).HasColumnName("MAC_ADDRESS");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
