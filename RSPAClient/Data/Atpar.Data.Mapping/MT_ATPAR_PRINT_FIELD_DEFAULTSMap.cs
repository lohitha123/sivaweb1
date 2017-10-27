using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PRINT_FIELD_DEFAULTSMap : EntityTypeConfiguration<MT_ATPAR_PRINT_FIELD_DEFAULTS>
    {
        public MT_ATPAR_PRINT_FIELD_DEFAULTSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.OBJECT_ID, t.LINE_NO });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.OBJECT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LINE_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.FIELD_NAME)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DISPLAY_NAME)
                .HasMaxLength(50);

            this.Property(t => t.SECTION)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.FIELD_GROUP)
                .HasMaxLength(50);

            this.Property(t => t.FIELD_TYPE)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PRINT_FIELD_DEFAULTS");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.OBJECT_ID).HasColumnName("OBJECT_ID");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.FIELD_NAME).HasColumnName("FIELD_NAME");
            this.Property(t => t.DISPLAY_NAME).HasColumnName("DISPLAY_NAME");
            this.Property(t => t.FIELD_SIZE).HasColumnName("FIELD_SIZE");
            this.Property(t => t.SECTION).HasColumnName("SECTION");
            this.Property(t => t.FIELD_GROUP).HasColumnName("FIELD_GROUP");
            this.Property(t => t.FIELD_TYPE).HasColumnName("FIELD_TYPE");
        }
    }
}
