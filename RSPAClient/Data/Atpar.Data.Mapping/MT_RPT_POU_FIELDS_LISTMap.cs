using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_RPT_POU_FIELDS_LISTMap : EntityTypeConfiguration<MT_RPT_POU_FIELDS_LIST>
    {
        public MT_RPT_POU_FIELDS_LISTMap()
        {
            // Primary Key
            this.HasKey(t => t.APP_ID);

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.REPORT_TABLE_NAME)
                .HasMaxLength(100);

            this.Property(t => t.ATPAR_APPLICATION_TABLE)
                .HasMaxLength(100);

            this.Property(t => t.ATPAR_TABLE_COLUMN)
                .HasMaxLength(100);

            this.Property(t => t.REPORT_FRIENDLY_COLUMN_NAME)
                .HasMaxLength(100);

            this.Property(t => t.DATA_TYPE)
                .HasMaxLength(100);

            this.Property(t => t.ERP_TYPE)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_RPT_POU_FIELDS_LIST", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.REPORT_TABLE_NAME).HasColumnName("REPORT_TABLE_NAME");
            this.Property(t => t.ATPAR_APPLICATION_TABLE).HasColumnName("ATPAR_APPLICATION_TABLE");
            this.Property(t => t.ATPAR_TABLE_COLUMN).HasColumnName("ATPAR_TABLE_COLUMN");
            this.Property(t => t.REPORT_FRIENDLY_COLUMN_NAME).HasColumnName("REPORT_FRIENDLY_COLUMN_NAME");
            this.Property(t => t.DATA_TYPE).HasColumnName("DATA_TYPE");
            this.Property(t => t.ERP_TYPE).HasColumnName("ERP_TYPE");
        }
    }
}
