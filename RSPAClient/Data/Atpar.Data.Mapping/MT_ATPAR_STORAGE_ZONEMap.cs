using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_STORAGE_ZONEMap : EntityTypeConfiguration<MT_ATPAR_STORAGE_ZONE>
    {
        public MT_ATPAR_STORAGE_ZONEMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.STORAGE_ZONE_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.STORAGE_ZONE_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.STORAGE_ZONE_DESCR)
                .HasMaxLength(254);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_STORAGE_ZONE");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.STORAGE_ZONE_ID).HasColumnName("STORAGE_ZONE_ID");
            this.Property(t => t.STORAGE_ZONE_DESCR).HasColumnName("STORAGE_ZONE_DESCR");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
        }
    }
}
