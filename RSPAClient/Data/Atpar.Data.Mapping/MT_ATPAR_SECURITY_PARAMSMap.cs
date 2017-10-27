using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_SECURITY_PARAMSMap : EntityTypeConfiguration<MT_ATPAR_SECURITY_PARAMS>
    {
        public MT_ATPAR_SECURITY_PARAMSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.PASSWD_MIN_LENGTH, t.PASSWD_MAX_LENGTH, t.PASSWD_EXP_PERIOD, t.PASSWD_RESET_REQUIRED, t.MAINTAIN_PASSWD_HISTORY, t.CHECK_PASSWD_HISTORY, t.ALLOWED_INVALID_LOGIN_ATTEMPTS, t.PASSWD_COMPLEXITY, t.MAINTAIN_SECURITY_AUDIT, t.LDAP_PASS_EXP_ALTMSG });

            // Properties
            this.Property(t => t.PASSWD_MIN_LENGTH)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PASSWD_MAX_LENGTH)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PASSWD_EXP_PERIOD)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PASSWD_RESET_REQUIRED)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.MAINTAIN_PASSWD_HISTORY)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.CHECK_PASSWD_HISTORY)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.ALLOWED_INVALID_LOGIN_ATTEMPTS)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PASSWD_COMPLEXITY)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.MAINTAIN_SECURITY_AUDIT)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.ALLOW_REG_DEVICES)
                .HasMaxLength(1);

            this.Property(t => t.LOGIN_HISTORY)
                .HasMaxLength(1);

            this.Property(t => t.PASS_REQ_HHT_USERS)
                .HasMaxLength(1);

            this.Property(t => t.LDAP_PASS_EXP_ALTMSG)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_SECURITY_PARAMS");
            this.Property(t => t.PASSWD_MIN_LENGTH).HasColumnName("PASSWD_MIN_LENGTH");
            this.Property(t => t.PASSWD_MAX_LENGTH).HasColumnName("PASSWD_MAX_LENGTH");
            this.Property(t => t.PASSWD_EXP_PERIOD).HasColumnName("PASSWD_EXP_PERIOD");
            this.Property(t => t.PASSWD_RESET_REQUIRED).HasColumnName("PASSWD_RESET_REQUIRED");
            this.Property(t => t.MAINTAIN_PASSWD_HISTORY).HasColumnName("MAINTAIN_PASSWD_HISTORY");
            this.Property(t => t.CHECK_PASSWD_HISTORY).HasColumnName("CHECK_PASSWD_HISTORY");
            this.Property(t => t.ALLOWED_INVALID_LOGIN_ATTEMPTS).HasColumnName("ALLOWED_INVALID_LOGIN_ATTEMPTS");
            this.Property(t => t.PASSWD_COMPLEXITY).HasColumnName("PASSWD_COMPLEXITY");
            this.Property(t => t.MAINTAIN_SECURITY_AUDIT).HasColumnName("MAINTAIN_SECURITY_AUDIT");
            this.Property(t => t.ALLOW_REG_DEVICES).HasColumnName("ALLOW_REG_DEVICES");
            this.Property(t => t.LOGIN_HISTORY).HasColumnName("LOGIN_HISTORY");
            this.Property(t => t.PASS_REQ_HHT_USERS).HasColumnName("PASS_REQ_HHT_USERS");
            this.Property(t => t.LDAP_PASS_EXP_ALTMSG).HasColumnName("LDAP_PASS_EXP_ALTMSG");
        }
    }
}
