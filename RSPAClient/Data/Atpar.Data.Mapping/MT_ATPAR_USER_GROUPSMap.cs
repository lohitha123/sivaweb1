using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_USER_GROUPSMap : EntityTypeConfiguration<MT_ATPAR_USER_GROUPS>
    {
        public MT_ATPAR_USER_GROUPSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.SERVER_USER, t.CLIENT_USER, t.ORG_GROUP_ID });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SERVER_USER)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.CLIENT_USER)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_USER_GROUPS");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.SERVER_USER).HasColumnName("SERVER_USER");
            this.Property(t => t.CLIENT_USER).HasColumnName("CLIENT_USER");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
