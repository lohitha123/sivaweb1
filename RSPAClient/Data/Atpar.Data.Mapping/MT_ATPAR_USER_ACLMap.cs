using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_USER_ACLMap : EntityTypeConfiguration<MT_ATPAR_USER_ACL>
    {
        public MT_ATPAR_USER_ACLMap()
        {
            // Primary Key
            this.HasKey(t => t.USER_ID);

            // Properties
            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.TIME_RESTRICTIONS)
                .HasMaxLength(140);

            this.Property(t => t.PASSWD_RESET_REQUIRED)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_USER_ACL");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.TOKEN_EXPIRY_PERIOD).HasColumnName("TOKEN_EXPIRY_PERIOD");
            this.Property(t => t.LOGIN_ALLOWED).HasColumnName("LOGIN_ALLOWED");
            this.Property(t => t.PASSHASH_REQUIRED).HasColumnName("PASSHASH_REQUIRED");
            this.Property(t => t.TIME_RESTRICTIONS).HasColumnName("TIME_RESTRICTIONS");
            this.Property(t => t.ACCOUNT_DISABLED).HasColumnName("ACCOUNT_DISABLED");
            this.Property(t => t.IDLE_TIME).HasColumnName("IDLE_TIME");
            this.Property(t => t.INVALID_LOGIN_ATTEMPTS).HasColumnName("INVALID_LOGIN_ATTEMPTS");
            this.Property(t => t.PASSWD_RESET_REQUIRED).HasColumnName("PASSWD_RESET_REQUIRED");
            this.Property(t => t.PASSWD_UPDATE_DATE).HasColumnName("PASSWD_UPDATE_DATE");
            this.Property(t => t.PASSWD_EXPT_DATE).HasColumnName("PASSWD_EXPT_DATE");
            this.Property(t => t.REPORT_USER).HasColumnName("REPORT_USER");
            this.Property(t => t.RECORDS_PER_PAGE).HasColumnName("RECORDS_PER_PAGE");
            this.Property(t => t.DEFAULT_REPORT_DURATION).HasColumnName("DEFAULT_REPORT_DURATION");
        }
    }
}
