using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class IzendaReportCategoryMap: EntityTypeConfiguration<IzendaReportCategory>
    {
        public IzendaReportCategoryMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.CreatedBy)
                .HasMaxLength(256);

            this.Property(t => t.ModifiedBy)
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("IzendaReportCategory");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Type).HasColumnName("Type");
            this.Property(t => t.ParentId).HasColumnName("ParentId");
            this.Property(t => t.TenantId).HasColumnName("TenantId");
            this.Property(t => t.Version).HasColumnName("Version");
            this.Property(t => t.Deleted).HasColumnName("Deleted");
            this.Property(t => t.Created).HasColumnName("Created");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.Modified).HasColumnName("Modified");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.IsGlobal).HasColumnName("IsGlobal");
            this.Property(t => t.CreatedById).HasColumnName("CreatedById");
        }

        
    }
}
