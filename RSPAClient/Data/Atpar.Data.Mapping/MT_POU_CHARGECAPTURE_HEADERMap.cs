using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_CHARGECAPTURE_HEADERMap : EntityTypeConfiguration<MT_POU_CHARGECAPTURE_HEADER>
    {
        public MT_POU_CHARGECAPTURE_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => t.TRANSACTION_ID);

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PATIENT_ID)
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ACCOUNT_ID)
                .HasMaxLength(50);

            this.Property(t => t.EXAM_ID)
                .HasMaxLength(50);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(1024);

            this.Property(t => t.DEPARTMENT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.WORKSTATION_ID)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.MM_STATUS)
                .HasMaxLength(50);

            this.Property(t => t.CHARGE_STATUS)
                .HasMaxLength(50);

            this.Property(t => t.REVIEW_USER_ID)
                .HasMaxLength(50);

            this.Property(t => t.PHYSICIAN_ID)
                .HasMaxLength(30);

            this.Property(t => t.REASON_CODE)
                .HasMaxLength(20);

            this.Property(t => t.OTHER_DEPTID)
                .HasMaxLength(50);

            this.Property(t => t.BED_NO)
                .HasMaxLength(50);

            this.Property(t => t.CASE_ID)
                .HasMaxLength(20);

            this.Property(t => t.PREF_LIST_ID)
                .HasMaxLength(50);

            this.Property(t => t.CRASH_CART_ID)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_CHARGECAPTURE_HEADER");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.PATIENT_ID).HasColumnName("PATIENT_ID");
            this.Property(t => t.CAPTURE_DATE_TIME).HasColumnName("CAPTURE_DATE_TIME");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.ACCOUNT_ID).HasColumnName("ACCOUNT_ID");
            this.Property(t => t.EXAM_ID).HasColumnName("EXAM_ID");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
            this.Property(t => t.REVIEWED).HasColumnName("REVIEWED");
            this.Property(t => t.DEPARTMENT_ID).HasColumnName("DEPARTMENT_ID");
            this.Property(t => t.WORKSTATION_ID).HasColumnName("WORKSTATION_ID");
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
            this.Property(t => t.CASE_ID).HasColumnName("CASE_ID");
            this.Property(t => t.PREF_LIST_ID).HasColumnName("PREF_LIST_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.CRASH_CART_ID).HasColumnName("CRASH_CART_ID");
        }
    }
}
