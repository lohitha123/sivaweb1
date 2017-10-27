using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_USER_ACL_DEFAULTSMap : EntityTypeConfiguration<MT_ATPAR_USER_ACL_DEFAULTS>
    {
        public MT_ATPAR_USER_ACL_DEFAULTSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.LOGIN_ALLOWED, t.PASSHASH_REQUIRED, t.ACCOUNT_DISABLED });

            // Properties
            this.Property(t => t.TIME_RESTRICTIONS)
                .HasMaxLength(140);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_USER_ACL_DEFAULTS");
            this.Property(t => t.LOGIN_ALLOWED).HasColumnName("LOGIN_ALLOWED");
            this.Property(t => t.TOKEN_EXPIRY_PERIOD).HasColumnName("TOKEN_EXPIRY_PERIOD");
            this.Property(t => t.PASSHASH_REQUIRED).HasColumnName("PASSHASH_REQUIRED");
            this.Property(t => t.TIME_RESTRICTIONS).HasColumnName("TIME_RESTRICTIONS");
            this.Property(t => t.ACCOUNT_DISABLED).HasColumnName("ACCOUNT_DISABLED");
        }
    }
}
