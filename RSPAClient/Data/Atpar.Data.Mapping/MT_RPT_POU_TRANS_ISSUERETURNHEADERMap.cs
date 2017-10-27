using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_RPT_POU_TRANS_ISSUERETURNHEADERMap : EntityTypeConfiguration<MT_RPT_POU_TRANS_ISSUERETURNHEADER>
    {
        public MT_RPT_POU_TRANS_ISSUERETURNHEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.APP_ID });

            // Properties
            this.Property(t => t.ACCOUNT_ID)
                .HasMaxLength(50);

            this.Property(t => t.EXAM_ID)
                .HasMaxLength(50);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(1024);

            this.Property(t => t.MM_STATUS)
                .HasMaxLength(50);

            this.Property(t => t.CHARGE_STATUS)
                .HasMaxLength(50);

            this.Property(t => t.REVIEW_USER_ID)
                .HasMaxLength(50);

            this.Property(t => t.PHYSICIAN_ID)
                .HasMaxLength(35);

            this.Property(t => t.REASON_CODE)
                .HasMaxLength(20);

            this.Property(t => t.OTHER_DEPTID)
                .HasMaxLength(50);

            this.Property(t => t.BED_NO)
                .HasMaxLength(50);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ID)
                .HasMaxLength(50);

            this.Property(t => t.BUSINESS_UNIT)
                .HasMaxLength(50);

            this.Property(t => t.DESCR)
                .HasMaxLength(30);

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

            this.Property(t => t.CTH_PREF_LIST_ID)
                .HasMaxLength(50);

            this.Property(t => t.CTH_UPDATE_USER_ID)
                .HasMaxLength(50);

            this.Property(t => t.WORKSTATION_MAC_ADDRESS)
                .HasMaxLength(100);

            this.Property(t => t.CTH_COMMENTS)
                .HasMaxLength(250);

            this.Property(t => t.REASON_DESCRIPTION)
                .HasMaxLength(50);

            this.Property(t => t.PATIENT_ACCNUMBER)
                .HasMaxLength(20);

            this.Property(t => t.PATIENT_NAME)
                .HasMaxLength(150);

            this.Property(t => t.PATIENT_BEDNUMBER)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_RPT_POU_TRANS_ISSUERETURNHEADER", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.CAPTURE_DATE_TIME).HasColumnName("CAPTURE_DATE_TIME");
            this.Property(t => t.ACCOUNT_ID).HasColumnName("ACCOUNT_ID");
            this.Property(t => t.EXAM_ID).HasColumnName("EXAM_ID");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
            this.Property(t => t.REVIEWED).HasColumnName("REVIEWED");
            this.Property(t => t.MM_LAST_STATUS_DATE).HasColumnName("MM_LAST_STATUS_DATE");
            this.Property(t => t.MM_STATUS).HasColumnName("MM_STATUS");
            this.Property(t => t.CHARGE_LAST_STATUS_DATE).HasColumnName("CHARGE_LAST_STATUS_DATE");
            this.Property(t => t.CHARGE_STATUS).HasColumnName("CHARGE_STATUS");
            this.Property(t => t.REVIEW_USER_ID).HasColumnName("REVIEW_USER_ID");
            this.Property(t => t.REVIEW_DATE).HasColumnName("REVIEW_DATE");
            this.Property(t => t.PHYSICIAN_ID).HasColumnName("PHYSICIAN_ID");
            this.Property(t => t.REASON_CODE).HasColumnName("REASON_CODE");
            this.Property(t => t.OTHER_DEPTID).HasColumnName("OTHER_DEPTID");
            this.Property(t => t.BED_NO).HasColumnName("BED_NO");
            this.Property(t => t.TRANSACTION_TYPE).HasColumnName("TRANSACTION_TYPE");
            this.Property(t => t.HHT_TRANSACTION_ID).HasColumnName("HHT_TRANSACTION_ID");
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
            this.Property(t => t.CTH_ID).HasColumnName("CTH_ID");
            this.Property(t => t.CTH_PREF_LIST_ID).HasColumnName("CTH_PREF_LIST_ID");
            this.Property(t => t.CASE_STATUS).HasColumnName("CASE_STATUS");
            this.Property(t => t.CTH_UPDATE_USER_ID).HasColumnName("CTH_UPDATE_USER_ID");
            this.Property(t => t.WORKSTATION_MAC_ADDRESS).HasColumnName("WORKSTATION_MAC_ADDRESS");
            this.Property(t => t.CTH_UPDATE_DT_TIME).HasColumnName("CTH_UPDATE_DT_TIME");
            this.Property(t => t.CASE_PICK_STATUS).HasColumnName("CASE_PICK_STATUS");
            this.Property(t => t.CTH_TRANSACTION_ID).HasColumnName("CTH_TRANSACTION_ID");
            this.Property(t => t.CHARGE_CAPTURE_TRANS_ID).HasColumnName("CHARGE_CAPTURE_TRANS_ID");
            this.Property(t => t.CTH_COMMENTS).HasColumnName("CTH_COMMENTS");
            this.Property(t => t.REASON_DESCRIPTION).HasColumnName("REASON_DESCRIPTION");
            this.Property(t => t.PATIENT_ACCNUMBER).HasColumnName("PATIENT_ACCNUMBER");
            this.Property(t => t.PATIENT_NAME).HasColumnName("PATIENT_NAME");
            this.Property(t => t.PATIENT_BEDNUMBER).HasColumnName("PATIENT_BEDNUMBER");
        }
    }
}
