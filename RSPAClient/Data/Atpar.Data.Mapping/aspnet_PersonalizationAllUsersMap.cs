using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class aspnet_PersonalizationAllUsersMap : EntityTypeConfiguration<aspnet_PersonalizationAllUsers>
    {
        public aspnet_PersonalizationAllUsersMap()
        {
            // Primary Key
            this.HasKey(t => t.PathId);

            // Properties
            this.Property(t => t.PageSettings)
                .IsRequired();

            // Table & Column Mappings
            this.ToTable("aspnet_PersonalizationAllUsers");
            this.Property(t => t.PathId).HasColumnName("PathId");
            this.Property(t => t.PageSettings).HasColumnName("PageSettings");
            this.Property(t => t.LastUpdatedDate).HasColumnName("LastUpdatedDate");
        }
    }
}
