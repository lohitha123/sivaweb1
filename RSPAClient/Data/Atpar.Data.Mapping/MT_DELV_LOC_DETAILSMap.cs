using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_DELV_LOC_DETAILSMap : EntityTypeConfiguration<MT_DELV_LOC_DETAILS>
    {
        public MT_DELV_LOC_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.DROP_OFF_LOCATION_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DROP_OFF_LOCATION_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LOCATION_DESC)
                .HasMaxLength(254);

            this.Property(t => t.LAST_UPDATE_USER)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_DELV_LOC_DETAILS");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.DROP_OFF_LOCATION_ID).HasColumnName("DROP_OFF_LOCATION_ID");
            this.Property(t => t.LOCATION_DESC).HasColumnName("LOCATION_DESC");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
