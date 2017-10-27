using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_ENTERPRISE_SYSTEM_DETAILSMap : EntityTypeConfiguration<MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS>
    {
        public MT_ATPAR_ENTERPRISE_SYSTEM_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ENTERPRISE_SYSTEM, t.TYPE, t.ENTERPRISE_VERSION, t.DOWNLOAD_FROM, t.UPLOAD_TO });

            // Properties
            this.Property(t => t.ENTERPRISE_SYSTEM)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.TYPE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ENTERPRISE_VERSION)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.DOWNLOAD_FROM)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UPLOAD_TO)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_ENTERPRISE_SYSTEM_DETAILS");
            this.Property(t => t.ENTERPRISE_SYSTEM).HasColumnName("ENTERPRISE_SYSTEM");
            this.Property(t => t.TYPE).HasColumnName("TYPE");
            this.Property(t => t.ENTERPRISE_VERSION).HasColumnName("ENTERPRISE_VERSION");
            this.Property(t => t.DOWNLOAD_FROM).HasColumnName("DOWNLOAD_FROM");
            this.Property(t => t.UPLOAD_TO).HasColumnName("UPLOAD_TO");
        }
    }
}
