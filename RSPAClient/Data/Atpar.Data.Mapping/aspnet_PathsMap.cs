using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class aspnet_PathsMap : EntityTypeConfiguration<aspnet_Paths>
    {
        public aspnet_PathsMap()
        {
            // Primary Key
            this.HasKey(t => t.PathId);

            // Properties
            this.Property(t => t.Path)
                .IsRequired()
                .HasMaxLength(256);

            this.Property(t => t.LoweredPath)
                .IsRequired()
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("aspnet_Paths");
            this.Property(t => t.ApplicationId).HasColumnName("ApplicationId");
            this.Property(t => t.PathId).HasColumnName("PathId");
            this.Property(t => t.Path).HasColumnName("Path");
            this.Property(t => t.LoweredPath).HasColumnName("LoweredPath");
        }
    }
}
