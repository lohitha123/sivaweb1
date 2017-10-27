using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PRINT_LABEL_DETAILSMap : EntityTypeConfiguration<MT_ATPAR_PRINT_LABEL_DETAILS>
    {
        public MT_ATPAR_PRINT_LABEL_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.OBJECT_ID, t.LINE_NO, t.FIELD_NAME, t.TEXT_VALUE });


            //Ignore properties
            this.Ignore(t => t.FIELD_TYPE);
            this.Ignore(t => t.FIELD_SIZE);

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

            this.Property(t => t.TEXT_VALUE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.FIELD_GROUP)
                .HasMaxLength(50);

            this.Property(t => t.DISPLAY_NAME)
                .HasMaxLength(50);

            this.Property(t => t.ALIGNMENT)
                .HasMaxLength(50);

            this.Property(t => t.HEADERFONT)
                .HasMaxLength(50);

            this.Property(t => t.VALUEFONT)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PRINT_LABEL_DETAILS");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.OBJECT_ID).HasColumnName("OBJECT_ID");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.FIELD_NAME).HasColumnName("FIELD_NAME");
            this.Property(t => t.TEXT_VALUE).HasColumnName("TEXT_VALUE");
            this.Property(t => t.FIELD_GROUP).HasColumnName("FIELD_GROUP");
            this.Property(t => t.ROW_POSITION).HasColumnName("ROW_POSITION");
            this.Property(t => t.COLUMN_POSITION).HasColumnName("COLUMN_POSITION");
            this.Property(t => t.DISPLAY_NAME).HasColumnName("DISPLAY_NAME");
            this.Property(t => t.VISIBLE).HasColumnName("VISIBLE");
            this.Property(t => t.ALIGNMENT).HasColumnName("ALIGNMENT");
            this.Property(t => t.HEADERFONT).HasColumnName("HEADERFONT");
            this.Property(t => t.VALUEFONT).HasColumnName("VALUEFONT");
            this.Property(t => t.COLUMN_SPAN).HasColumnName("COLUMN_SPAN");
        }
    }
}
