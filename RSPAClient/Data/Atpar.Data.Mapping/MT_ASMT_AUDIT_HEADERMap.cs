using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ASMT_AUDIT_HEADERMap : EntityTypeConfiguration<MT_ASMT_AUDIT_HEADER>
    {
        public MT_ASMT_AUDIT_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.TRANSACTION_ID, t.KEY_1, t.KEY_2, t.KEY_3, t.KEY_4 });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.KEY_1)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_2)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_3)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_4)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_1)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_2)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_3)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_4)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_5)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_6)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_7)
                .HasMaxLength(255);

            this.Property(t => t.REPORT_DATA_8)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_9)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_10)
                .HasMaxLength(50);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(255);

            this.Property(t => t.AREA_ID)
                .HasMaxLength(10);

            // Table & Column Mappings
            this.ToTable("MT_ASMT_AUDIT_HEADER");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.KEY_1).HasColumnName("KEY_1");
            this.Property(t => t.KEY_2).HasColumnName("KEY_2");
            this.Property(t => t.KEY_3).HasColumnName("KEY_3");
            this.Property(t => t.KEY_4).HasColumnName("KEY_4");
            this.Property(t => t.REPORT_DATA_1).HasColumnName("REPORT_DATA_1");
            this.Property(t => t.REPORT_DATA_2).HasColumnName("REPORT_DATA_2");
            this.Property(t => t.REPORT_DATA_3).HasColumnName("REPORT_DATA_3");
            this.Property(t => t.REPORT_DATA_4).HasColumnName("REPORT_DATA_4");
            this.Property(t => t.REPORT_DATA_5).HasColumnName("REPORT_DATA_5");
            this.Property(t => t.REPORT_DATA_6).HasColumnName("REPORT_DATA_6");
            this.Property(t => t.REPORT_DATA_7).HasColumnName("REPORT_DATA_7");
            this.Property(t => t.REPORT_DATA_8).HasColumnName("REPORT_DATA_8");
            this.Property(t => t.REPORT_DATA_9).HasColumnName("REPORT_DATA_9");
            this.Property(t => t.REPORT_DATA_10).HasColumnName("REPORT_DATA_10");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
            this.Property(t => t.AREA_ID).HasColumnName("AREA_ID");
        }
    }
}
