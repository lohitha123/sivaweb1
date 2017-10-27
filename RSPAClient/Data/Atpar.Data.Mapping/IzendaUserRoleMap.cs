using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using AtPar.POCOEntities;

namespace Atpar.Data.Mapping
{
    public class IzendaUserRoleMap : EntityTypeConfiguration<IzendaUserRole>
    {
        public IzendaUserRoleMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.CreatedBy)
                .HasMaxLength(256);

            this.Property(t => t.ModifiedBy)
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("IzendaUserRole");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.UserId).HasColumnName("UserId");
            this.Property(t => t.RoleId).HasColumnName("RoleId");
            this.Property(t => t.Version).HasColumnName("Version");
            this.Property(t => t.Deleted).HasColumnName("Deleted");
            this.Property(t => t.Created).HasColumnName("Created");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.Modified).HasColumnName("Modified");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
        }
    }
}
