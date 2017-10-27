using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_ZONE_STORAGE_LEVELSMap : EntityTypeConfiguration<MT_ATPAR_ZONE_STORAGE_LEVELS>
    {
        public MT_ATPAR_ZONE_STORAGE_LEVELSMap()
        {
            this.Ignore(t => t.CHK_ALLOCATED);
            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.PERFORM_ACTION);
            this.Ignore(t => t.ROWINDEX);
            this.Ignore(t => t.BUSINESS_UNIT);
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.STORAGE_ZONE_ID, t.ORG_ID, t.STORAGE_AREA, t.STOR_LEVEL_1, t.STOR_LEVEL_2, t.STOR_LEVEL_3, t.STOR_LEVEL_4 });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.STORAGE_ZONE_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.STORAGE_AREA)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.STOR_LEVEL_1)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.STOR_LEVEL_2)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.STOR_LEVEL_3)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.STOR_LEVEL_4)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_ZONE_STORAGE_LEVELS");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.STORAGE_ZONE_ID).HasColumnName("STORAGE_ZONE_ID");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.STORAGE_AREA).HasColumnName("STORAGE_AREA");
            this.Property(t => t.STOR_LEVEL_1).HasColumnName("STOR_LEVEL_1");
            this.Property(t => t.STOR_LEVEL_2).HasColumnName("STOR_LEVEL_2");
            this.Property(t => t.STOR_LEVEL_3).HasColumnName("STOR_LEVEL_3");
            this.Property(t => t.STOR_LEVEL_4).HasColumnName("STOR_LEVEL_4");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
        }
    }
}
