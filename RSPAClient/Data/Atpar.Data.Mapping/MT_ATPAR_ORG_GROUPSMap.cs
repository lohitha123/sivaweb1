using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_ORG_GROUPSMap : EntityTypeConfiguration<MT_ATPAR_ORG_GROUPS>
    {
        public MT_ATPAR_ORG_GROUPSMap()
        {
            // Primary Key
            this.HasKey(t => t.ORG_GROUP_ID);

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ORG_GROUP_NAME)
                .HasMaxLength(50);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_ORG_GROUPS");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ORG_GROUP_NAME).HasColumnName("ORG_GROUP_NAME");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
