using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class PAR_MNGT_VENDORMap : EntityTypeConfiguration<PAR_MNGT_VENDOR>
    {
        public PAR_MNGT_VENDORMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.VENDOR_ID });

            this.Ignore(t => t.ORG_GROUP_NAME);
           

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.VENDOR_ID)
                .IsRequired()
                .HasMaxLength(15);

            this.Property(t => t.VENDOR_NAME)
                .HasMaxLength(50);

            this.Property(t => t.CONTACT_NAME)
                .HasMaxLength(30);

            this.Property(t => t.ADDRESS1)
                .HasMaxLength(55);

            this.Property(t => t.ADDRESS2)
                .HasMaxLength(55);

            this.Property(t => t.CITY)
                .HasMaxLength(30);

            this.Property(t => t.STATE)
                .HasMaxLength(20);

            this.Property(t => t.COUNTRY)
                .HasMaxLength(50);

            this.Property(t => t.ZIP)
                .HasMaxLength(10);

            this.Property(t => t.PHONE)
                .HasMaxLength(20);

            this.Property(t => t.FAX)
                .HasMaxLength(30);

            this.Property(t => t.CONTACT_E_MAIL)
                .HasMaxLength(300);

            this.Property(t => t.ORDER_DESPATCH_TYPE)
                .HasMaxLength(5);

            this.Property(t => t.LAST_UPDATE_USER)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            this.Property(t => t.ALLOW_VEND_ACCESS)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.BILL_ONLY_EMAIL)
                .HasMaxLength(50);

            this.Property(t => t.VEND_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.ADD_ITEMS_LFLAG)
                .IsRequired()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("PAR_MNGT_VENDOR");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.VENDOR_ID).HasColumnName("VENDOR_ID");
            this.Property(t => t.VENDOR_NAME).HasColumnName("VENDOR_NAME");
            this.Property(t => t.CONTACT_NAME).HasColumnName("CONTACT_NAME");
            this.Property(t => t.ADDRESS1).HasColumnName("ADDRESS1");
            this.Property(t => t.ADDRESS2).HasColumnName("ADDRESS2");
            this.Property(t => t.CITY).HasColumnName("CITY");
            this.Property(t => t.STATE).HasColumnName("STATE");
            this.Property(t => t.COUNTRY).HasColumnName("COUNTRY");
            this.Property(t => t.ZIP).HasColumnName("ZIP");
            this.Property(t => t.PHONE).HasColumnName("PHONE");
            this.Property(t => t.FAX).HasColumnName("FAX");
            this.Property(t => t.CONTACT_E_MAIL).HasColumnName("CONTACT_E_MAIL");
            this.Property(t => t.ORDER_DESPATCH_TYPE).HasColumnName("ORDER_DESPATCH_TYPE");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
            this.Property(t => t.ALLOW_VEND_ACCESS).HasColumnName("ALLOW_VEND_ACCESS");
            this.Property(t => t.BILL_ONLY_EMAIL).HasColumnName("BILL_ONLY_EMAIL");
            this.Property(t => t.REMINDER_FREQ).HasColumnName("REMINDER_FREQ");
            this.Property(t => t.VEND_USER_ID).HasColumnName("VEND_USER_ID");
            this.Property(t => t.ADD_ITEMS_LFLAG).HasColumnName("ADD_ITEMS_LFLAG");
        }
    }
}
