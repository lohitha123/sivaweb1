using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_DASHBOARD_DETAILSMap : EntityTypeConfiguration<MT_ATPAR_DASHBOARD_DETAILS>
    {
        public MT_ATPAR_DASHBOARD_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.DASHBOARD_ID, t.APP_ID, t.REPORT_ID });

            // Properties
            this.Property(t => t.DASHBOARD_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.REPORT_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.REPORT_TYPE)
                .HasMaxLength(30);

            this.Property(t => t.REPORT_NAME)
                .HasMaxLength(100);

            this.Property(t => t.REPORT_HEADER)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.INPUT_STRING)
                .HasMaxLength(100);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(30);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_DASHBOARD_DETAILS");
            this.Property(t => t.DASHBOARD_ID).HasColumnName("DASHBOARD_ID");
            this.Property(t => t.ROW_POSITION).HasColumnName("ROW_POSITION");
            this.Property(t => t.COLUMN_POSITION).HasColumnName("COLUMN_POSITION");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.REPORT_ID).HasColumnName("REPORT_ID");
            this.Property(t => t.REPORT_TYPE).HasColumnName("REPORT_TYPE");
            this.Property(t => t.REPORT_NAME).HasColumnName("REPORT_NAME");
            this.Property(t => t.REPORT_HEADER).HasColumnName("REPORT_HEADER");
            this.Property(t => t.INPUT_STRING).HasColumnName("INPUT_STRING");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
        }
    }
}
