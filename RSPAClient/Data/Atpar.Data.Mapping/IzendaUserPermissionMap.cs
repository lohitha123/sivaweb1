using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using AtPar.POCOEntities;

namespace Atpar.Data.Mapping
{
    public class IzendaUserPermissionMap : EntityTypeConfiguration<IzendaUserPermission>
    {
        public IzendaUserPermissionMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.AssignedTo)
                .HasMaxLength(4000);

            this.Property(t => t.CreatedBy)
                .HasMaxLength(256);

            this.Property(t => t.ModifiedBy)
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("IzendaUserPermission");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.ReportId).HasColumnName("ReportId");
            this.Property(t => t.DashboardId).HasColumnName("DashboardId");
            this.Property(t => t.AssignedTo).HasColumnName("AssignedTo");
            this.Property(t => t.AssignedType).HasColumnName("AssignedType");
            this.Property(t => t.AccessRightId).HasColumnName("AccessRightId");
            this.Property(t => t.Position).HasColumnName("Position");
            this.Property(t => t.Version).HasColumnName("Version");
            this.Property(t => t.Deleted).HasColumnName("Deleted");
            this.Property(t => t.Created).HasColumnName("Created");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.Modified).HasColumnName("Modified");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.AssignedToNames).HasColumnName("AssignedToNames");
        }
    }
}
