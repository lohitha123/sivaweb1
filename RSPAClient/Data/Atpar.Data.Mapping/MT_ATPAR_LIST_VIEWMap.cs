using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_LIST_VIEWMap : EntityTypeConfiguration<MT_ATPAR_LIST_VIEW>
    {
        public MT_ATPAR_LIST_VIEWMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.SCREEN_NAME, t.ENTERPRISE_SYSTEM, t.FIELD_NAME });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SCREEN_NAME)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ENTERPRISE_SYSTEM)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.FIELD_NAME)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.SHORT_DESCR)
                .HasMaxLength(30);

            this.Property(t => t.LONG_DESCR)
                .HasMaxLength(100);

            this.Property(t => t.COLUMN_HEADER)
                .HasMaxLength(20);

            this.Property(t => t.DEFAULT_COLUMN_HEADER)
                .HasMaxLength(20);

            this.Property(t => t.MANDATORY_FIELD)
                .HasMaxLength(1);

            this.Property(t => t.DISPLAY_FIELD)
                .HasMaxLength(1);

            this.Property(t => t.DEFAULT_DISPLAY_FIELD)
                .HasMaxLength(1);

            this.Property(t => t.ORDER_BY)
                .HasMaxLength(1);

            this.Property(t => t.TOGGLE_FIELD)
                .HasMaxLength(1);

            this.Property(t => t.DEFAULT_TOGGLE_TEXT)
                .HasMaxLength(50);

            this.Property(t => t.TOGGLE_ORDER)
                .HasMaxLength(2);

            this.Property(t => t.MANDATORY_TOGGLE)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_LIST_VIEW");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.SCREEN_NAME).HasColumnName("SCREEN_NAME");
            this.Property(t => t.ENTERPRISE_SYSTEM).HasColumnName("ENTERPRISE_SYSTEM");
            this.Property(t => t.FIELD_NAME).HasColumnName("FIELD_NAME");
            this.Property(t => t.SHORT_DESCR).HasColumnName("SHORT_DESCR");
            this.Property(t => t.LONG_DESCR).HasColumnName("LONG_DESCR");
            this.Property(t => t.COLUMN_HEADER).HasColumnName("COLUMN_HEADER");
            this.Property(t => t.DEFAULT_COLUMN_HEADER).HasColumnName("DEFAULT_COLUMN_HEADER");
            this.Property(t => t.MANDATORY_FIELD).HasColumnName("MANDATORY_FIELD");
            this.Property(t => t.COLUMN_ORDER).HasColumnName("COLUMN_ORDER");
            this.Property(t => t.DEFAULT_COLUMN_ORDER).HasColumnName("DEFAULT_COLUMN_ORDER");
            this.Property(t => t.COLUMN_WIDTH).HasColumnName("COLUMN_WIDTH");
            this.Property(t => t.DEFAULT_COLUMN_WIDTH).HasColumnName("DEFAULT_COLUMN_WIDTH");
            this.Property(t => t.DISPLAY_FIELD).HasColumnName("DISPLAY_FIELD");
            this.Property(t => t.DEFAULT_DISPLAY_FIELD).HasColumnName("DEFAULT_DISPLAY_FIELD");
            this.Property(t => t.ORDER_BY).HasColumnName("ORDER_BY");
            this.Property(t => t.COLUMN_MAX_SIZE).HasColumnName("COLUMN_MAX_SIZE");
            this.Property(t => t.TOGGLE_FIELD).HasColumnName("TOGGLE_FIELD");
            this.Property(t => t.DEFAULT_TOGGLE_TEXT).HasColumnName("DEFAULT_TOGGLE_TEXT");
            this.Property(t => t.TOGGLE_ORDER).HasColumnName("TOGGLE_ORDER");
            this.Property(t => t.MANDATORY_TOGGLE).HasColumnName("MANDATORY_TOGGLE");
        }
    }
}
