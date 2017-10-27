using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_USER_APP_ACLMap : EntityTypeConfiguration<MT_ATPAR_USER_APP_ACL>
    {
        public MT_ATPAR_USER_APP_ACLMap()
        {
            // Primary Key
            this.HasKey(t => new { t.USER_ID, t.ROLE_ID, t.APP_ID });

            // Properties
            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ROLE_ID)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_USER_APP_ACL");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.ROLE_ID).HasColumnName("ROLE_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
        }
    }
}
