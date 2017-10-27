using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_RPT_POU_SETUP_HEADERMap : EntityTypeConfiguration<MT_RPT_POU_SETUP_HEADER>
    {
        public MT_RPT_POU_SETUP_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.BUSINESS_UNIT, t.USER_ID, t.DEPT_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.BU_TYPE)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PASSHASH)
                .HasMaxLength(64);

            this.Property(t => t.FIRST_NAME)
                .HasMaxLength(20);

            this.Property(t => t.LAST_NAME)
                .HasMaxLength(20);

            this.Property(t => t.MIDDLE_INITIAL)
                .HasMaxLength(2);

            this.Property(t => t.EMAIL_ID)
                .HasMaxLength(50);

            this.Property(t => t.PHONE1)
                .HasMaxLength(15);

            this.Property(t => t.PHONE2)
                .HasMaxLength(15);

            this.Property(t => t.FAX)
                .HasMaxLength(15);

            this.Property(t => t.PAGER)
                .HasMaxLength(15);

            this.Property(t => t.HINT_QUESTION)
                .HasMaxLength(255);

            this.Property(t => t.HINT_ANSWER)
                .HasMaxLength(255);

            this.Property(t => t.CREATE_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.PROFILE_ID)
                .HasMaxLength(30);

            this.Property(t => t.LDAP_USER)
                .HasMaxLength(1);

            this.Property(t => t.LDAP_ROLE)
                .HasMaxLength(50);

            this.Property(t => t.LDAP_ORG)
                .HasMaxLength(50);

            this.Property(t => t.USERDN)
                .HasMaxLength(512);

            this.Property(t => t.DEPT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DEPT_NAME)
                .HasMaxLength(50);

            this.Property(t => t.ATTN_TO)
                .HasMaxLength(30);

            this.Property(t => t.ADDRESS1)
                .HasMaxLength(55);

            this.Property(t => t.ADDRESS2)
                .HasMaxLength(55);

            this.Property(t => t.CITY)
                .HasMaxLength(30);

            this.Property(t => t.STATE)
                .HasMaxLength(20);

            this.Property(t => t.ZIP)
                .HasMaxLength(10);

            this.Property(t => t.COUNTRY)
                .HasMaxLength(50);

            this.Property(t => t.PHONE)
                .HasMaxLength(20);

            this.Property(t => t.E_MAIL)
                .HasMaxLength(300);

            this.Property(t => t.EXCP_APPROVAL_REQ)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.INV_COORD_EMAIL)
                .HasMaxLength(300);

            this.Property(t => t.EXCP_APPROVER_EMAIL)
                .HasMaxLength(300);

            this.Property(t => t.RECALL_NOTIFICATION_EMAIL)
                .HasMaxLength(300);

            this.Property(t => t.INV_INTERFACE_ENABLE)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.BILLING_ENABLE)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.DEFAULT_PRINTER)
                .HasMaxLength(100);

            this.Property(t => t.DEFAULT_DISTRIBUTION_TYPE)
                .HasMaxLength(30);

            this.Property(t => t.DEFAULT_DESTINATION_LOCATION)
                .HasMaxLength(30);

            this.Property(t => t.ALERT_NOTIFY_REQ)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.EMAIL_NOTIFY)
                .HasMaxLength(300);

            this.Property(t => t.CATEGORY_CODE)
                .HasMaxLength(50);

            this.Property(t => t.BILLONLY_BUSINESS_UNIT)
                .HasMaxLength(50);

            this.Property(t => t.BILLONLY_LOCATION)
                .HasMaxLength(50);

            this.Property(t => t.SEND_LOWSTOCK_EMAIL_ALERTS)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.EMAILID_FOR_LOWSTOCK_ALERTS)
                .HasMaxLength(300);

            this.Property(t => t.SEND_PRODUCT_EXP_EMAIL_ALERTS)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.EMAILID_FOR_PRODUCT_EXP_ALERTS)
                .HasMaxLength(300);

            this.Property(t => t.BUYER_ID)
                .HasMaxLength(100);

            this.Property(t => t.AUTO_PUTAWAY_ENABLED)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_RPT_POU_SETUP_HEADER", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.BU_TYPE).HasColumnName("BU_TYPE");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.PASSHASH).HasColumnName("PASSHASH");
            this.Property(t => t.FIRST_NAME).HasColumnName("FIRST_NAME");
            this.Property(t => t.LAST_NAME).HasColumnName("LAST_NAME");
            this.Property(t => t.MIDDLE_INITIAL).HasColumnName("MIDDLE_INITIAL");
            this.Property(t => t.EMAIL_ID).HasColumnName("EMAIL_ID");
            this.Property(t => t.PHONE1).HasColumnName("PHONE1");
            this.Property(t => t.PHONE2).HasColumnName("PHONE2");
            this.Property(t => t.FAX).HasColumnName("FAX");
            this.Property(t => t.PAGER).HasColumnName("PAGER");
            this.Property(t => t.HINT_QUESTION).HasColumnName("HINT_QUESTION");
            this.Property(t => t.HINT_ANSWER).HasColumnName("HINT_ANSWER");
            this.Property(t => t.CREATE_USER_ID).HasColumnName("CREATE_USER_ID");
            this.Property(t => t.CREATE_DATE).HasColumnName("CREATE_DATE");
            this.Property(t => t.PROFILE_ID).HasColumnName("PROFILE_ID");
            this.Property(t => t.LDAP_USER).HasColumnName("LDAP_USER");
            this.Property(t => t.LDAP_ROLE).HasColumnName("LDAP_ROLE");
            this.Property(t => t.LDAP_ORG).HasColumnName("LDAP_ORG");
            this.Property(t => t.USERDN).HasColumnName("USERDN");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
            this.Property(t => t.DEPT_NAME).HasColumnName("DEPT_NAME");
            this.Property(t => t.ATTN_TO).HasColumnName("ATTN_TO");
            this.Property(t => t.ADDRESS1).HasColumnName("ADDRESS1");
            this.Property(t => t.ADDRESS2).HasColumnName("ADDRESS2");
            this.Property(t => t.CITY).HasColumnName("CITY");
            this.Property(t => t.STATE).HasColumnName("STATE");
            this.Property(t => t.ZIP).HasColumnName("ZIP");
            this.Property(t => t.COUNTRY).HasColumnName("COUNTRY");
            this.Property(t => t.PHONE).HasColumnName("PHONE");
            this.Property(t => t.E_MAIL).HasColumnName("E_MAIL");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.EXCP_APPROVAL_REQ).HasColumnName("EXCP_APPROVAL_REQ");
            this.Property(t => t.INV_COORD_EMAIL).HasColumnName("INV_COORD_EMAIL");
            this.Property(t => t.EXCP_APPROVER_EMAIL).HasColumnName("EXCP_APPROVER_EMAIL");
            this.Property(t => t.REMINDER_FREQ).HasColumnName("REMINDER_FREQ");
            this.Property(t => t.RECALL_NOTIFICATION_EMAIL).HasColumnName("RECALL_NOTIFICATION_EMAIL");
            this.Property(t => t.INV_INTERFACE_ENABLE).HasColumnName("INV_INTERFACE_ENABLE");
            this.Property(t => t.BILLING_ENABLE).HasColumnName("BILLING_ENABLE");
            this.Property(t => t.DEFAULT_PRINTER).HasColumnName("DEFAULT_PRINTER");
            this.Property(t => t.DEFAULT_DISTRIBUTION_TYPE).HasColumnName("DEFAULT_DISTRIBUTION_TYPE");
            this.Property(t => t.DEFAULT_DESTINATION_LOCATION).HasColumnName("DEFAULT_DESTINATION_LOCATION");
            this.Property(t => t.ALERT_NOTIFY_REQ).HasColumnName("ALERT_NOTIFY_REQ");
            this.Property(t => t.EMAIL_NOTIFY).HasColumnName("EMAIL_NOTIFY");
            this.Property(t => t.CATEGORY_CODE).HasColumnName("CATEGORY_CODE");
            this.Property(t => t.BILLONLY_BUSINESS_UNIT).HasColumnName("BILLONLY_BUSINESS_UNIT");
            this.Property(t => t.BILLONLY_LOCATION).HasColumnName("BILLONLY_LOCATION");
            this.Property(t => t.NO_OF_CASES_DOWNLOAD).HasColumnName("NO_OF_CASES_DOWNLOAD");
            this.Property(t => t.SEND_LOWSTOCK_EMAIL_ALERTS).HasColumnName("SEND_LOWSTOCK_EMAIL_ALERTS");
            this.Property(t => t.EMAILID_FOR_LOWSTOCK_ALERTS).HasColumnName("EMAILID_FOR_LOWSTOCK_ALERTS");
            this.Property(t => t.SEND_PRODUCT_EXP_EMAIL_ALERTS).HasColumnName("SEND_PRODUCT_EXP_EMAIL_ALERTS");
            this.Property(t => t.EMAILID_FOR_PRODUCT_EXP_ALERTS).HasColumnName("EMAILID_FOR_PRODUCT_EXP_ALERTS");
            this.Property(t => t.DURATION_TRACKING_EXP).HasColumnName("DURATION_TRACKING_EXP");
            this.Property(t => t.PERCENTAGE_OPTIMUM_QTY).HasColumnName("PERCENTAGE_OPTIMUM_QTY");
            this.Property(t => t.PREPICK_QA_PROCESS_REQUIRED).HasColumnName("PREPICK_QA_PROCESS_REQUIRED");
            this.Property(t => t.BUYER_ID).HasColumnName("BUYER_ID");
            this.Property(t => t.AUTO_PUTAWAY_ENABLED).HasColumnName("AUTO_PUTAWAY_ENABLED");
            this.Property(t => t.ALLOW_LOC_SELECT).HasColumnName("ALLOW_LOC_SELECT");
            this.Property(t => t.CASE_PICK_STATUS).HasColumnName("CASE_PICK_STATUS");
            this.Property(t => t.HOME_DEPARTMENT).HasColumnName("HOME_DEPARTMENT");
        }
    }
}
