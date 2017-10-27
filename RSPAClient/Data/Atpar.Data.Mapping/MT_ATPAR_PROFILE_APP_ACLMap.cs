using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PROFILE_APP_ACLMap : EntityTypeConfiguration<MT_ATPAR_PROFILE_APP_ACL>
    {
        public MT_ATPAR_PROFILE_APP_ACLMap()
        {
            this.Ignore(t => t.APP_NAME);
            // Primary Key
            this.HasKey(t => new { t.PROFILE_ID, t.APP_ID });

            // Properties
            this.Property(t => t.PROFILE_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.CLIENT_USER)
                .HasMaxLength(1);

            this.Property(t => t.SERVER_USER)
                .HasMaxLength(1);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PROFILE_APP_ACL");
            this.Property(t => t.PROFILE_ID).HasColumnName("PROFILE_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.CLIENT_USER).HasColumnName("CLIENT_USER");
            this.Property(t => t.SERVER_USER).HasColumnName("SERVER_USER");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
