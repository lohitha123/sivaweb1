using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PASSWD_HISTORYMap : EntityTypeConfiguration<MT_ATPAR_PASSWD_HISTORY>
    {
        public MT_ATPAR_PASSWD_HISTORYMap()
        {
            // Primary Key
            this.HasKey(t => new { t.USER_ID, t.OLD_PASSHASH, t.UPDATE_DATE });

            // Properties
            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.OLD_PASSHASH)
                .IsRequired()
                .HasMaxLength(64);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PASSWD_HISTORY");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.OLD_PASSHASH).HasColumnName("OLD_PASSHASH");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
        }
    }
}
