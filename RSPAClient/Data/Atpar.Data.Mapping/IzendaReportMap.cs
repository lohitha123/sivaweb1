using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atpar.Data.Mapping
{
   
    public class  IzendaReportMap : EntityTypeConfiguration<IzendaReport>
    {
        public IzendaReportMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.CreatedBy)
                .HasMaxLength(256);

            this.Property(t => t.ModifiedBy)
                .HasMaxLength(256);

            // Table & Column Mappings
            this.ToTable("IzendaReport");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Type).HasColumnName("Type");
            this.Property(t => t.PreviewRecord).HasColumnName("PreviewRecord");
            this.Property(t => t.AdvancedMode).HasColumnName("AdvancedMode");
            this.Property(t => t.AllowNulls).HasColumnName("AllowNulls");
            this.Property(t => t.IsDistinct).HasColumnName("IsDistinct");
            this.Property(t => t.CategoryId).HasColumnName("CategoryId");
            this.Property(t => t.SubCategoryId).HasColumnName("SubCategoryId");
            this.Property(t => t.TenantId).HasColumnName("TenantId");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.HeaderContent).HasColumnName("HeaderContent");
            this.Property(t => t.FooterContent).HasColumnName("FooterContent");
            this.Property(t => t.Version).HasColumnName("Version");
            this.Property(t => t.Deleted).HasColumnName("Deleted");
            this.Property(t => t.Created).HasColumnName("Created");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.Modified).HasColumnName("Modified");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.LastViewed).HasColumnName("LastViewed");
            this.Property(t => t.Owner).HasColumnName("Owner");
            this.Property(t => t.OwnerId).HasColumnName("OwnerId");
            this.Property(t => t.Title).HasColumnName("Title");
            this.Property(t => t.TitleDescriptionContent).HasColumnName("TitleDescriptionContent");
            this.Property(t => t.ExcludedRelationships).HasColumnName("ExcludedRelationships");
            this.Property(t => t.NumberOfView).HasColumnName("NumberOfView");
            this.Property(t => t.RenderingTime).HasColumnName("RenderingTime");
            this.Property(t => t.CreatedById).HasColumnName("CreatedById");
            this.Property(t => t.ModifiedById).HasColumnName("ModifiedById");
            this.Property(t => t.ExportFormatSettingData).HasColumnName("ExportFormatSettingData");
            this.Property(t => t.SnapToGrid).HasColumnName("SnapToGrid");
            this.Property(t => t.UsingFields).HasColumnName("UsingFields");
            this.Property(t => t.SourceId).HasColumnName("SourceId");
            this.Property(t => t.Params).HasColumnName("Params");
            this.Property(t => t.Relationships).HasColumnName("Relationships");
            this.Property(t => t.UsingFieldNames).HasColumnName("UsingFieldNames");
            this.Property(t => t.IsGlobal).HasColumnName("IsGlobal");
        }
    }
}
