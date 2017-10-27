using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_USERMap : EntityTypeConfiguration<MT_ATPAR_USER>
    {
        public MT_ATPAR_USERMap()
        {
            // Primary Key
            this.HasKey(t => t.USER_ID);

            this.Ignore(t => t.FULLNAME);
           this.Ignore(t => t.VENDORNAME);

            // Properties
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

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            this.Property(t => t.USERDN)
                .HasMaxLength(512);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_USER");
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
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
            this.Property(t => t.USERDN).HasColumnName("USERDN");
        }
    }
}
