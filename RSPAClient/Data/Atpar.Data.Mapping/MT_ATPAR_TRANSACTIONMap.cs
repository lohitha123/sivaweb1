using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_TRANSACTIONMap : EntityTypeConfiguration<MT_ATPAR_TRANSACTION>
    {
        public MT_ATPAR_TRANSACTIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.APP_ID });

            //Ignore properties
            this.Ignore(t=>t.USERNAME);
            this.Ignore(t => t.UID);
            this.Ignore(t => t.UPDATE_DAY);
            this.Ignore(t => t.UPDATE_HOUR);
            this.Ignore(t => t.UPDATE_MINUTE);
            this.Ignore(t => t.DATESTRING);
            this.Ignore(t => t.CASE_ID);
            this.Ignore(t => t.PROCEDURE_CODE);
            this.Ignore(t => t.PREF_ID);
            this.Ignore(t => t.PERFORM_DATE);

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ID)
                .HasMaxLength(50);

            this.Property(t => t.BUSINESS_UNIT)
                .HasMaxLength(50);

            this.Property(t => t.DESCR)
                .HasMaxLength(255);

            this.Property(t => t.USER_ID)
                .HasMaxLength(32);

            this.Property(t => t.DOWNLOAD_USERID)
                .HasMaxLength(20);

            this.Property(t => t.DEVICE_ID)
                .HasMaxLength(150);

            this.Property(t => t.REPORT_DATA_1)
                .HasMaxLength(20);

            this.Property(t => t.REPORT_DATA_2)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_3)
                .HasMaxLength(20);

            this.Property(t => t.REPORT_DATA_4)
                .HasMaxLength(20);

            this.Property(t => t.REPORT_DATA_5)
                .HasMaxLength(20);

            this.Property(t => t.REPORT_DATA_8)
                .HasMaxLength(20);

            this.Property(t => t.REPORT_DATA_12)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_13)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_TRANSACTION");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.DESCR).HasColumnName("DESCR");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.TOTAL_REC_DOWNLOADED).HasColumnName("TOTAL_REC_DOWNLOADED");
            this.Property(t => t.TOTAL_REC_SENT).HasColumnName("TOTAL_REC_SENT");
            this.Property(t => t.STATUS_CODE).HasColumnName("STATUS_CODE");
            this.Property(t => t.DOWNLOAD_DT_TIME).HasColumnName("DOWNLOAD_DT_TIME");
            this.Property(t => t.START_DT_TIME).HasColumnName("START_DT_TIME");
            this.Property(t => t.END_DT_TIME).HasColumnName("END_DT_TIME");
            this.Property(t => t.UPDATE_DT_TIME).HasColumnName("UPDATE_DT_TIME");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.DOWNLOAD_USERID).HasColumnName("DOWNLOAD_USERID");
            this.Property(t => t.DEVICE_ID).HasColumnName("DEVICE_ID");
            this.Property(t => t.SCANS_COUNT).HasColumnName("SCANS_COUNT");
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
            this.Property(t => t.REPORT_DATA_11).HasColumnName("REPORT_DATA_11");
            this.Property(t => t.REPORT_DATA_12).HasColumnName("REPORT_DATA_12");
            this.Property(t => t.REPORT_DATA_13).HasColumnName("REPORT_DATA_13");
        }
    }
}
