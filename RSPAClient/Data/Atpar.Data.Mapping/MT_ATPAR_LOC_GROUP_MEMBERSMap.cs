using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_LOC_GROUP_MEMBERSMap : EntityTypeConfiguration<MT_ATPAR_LOC_GROUP_MEMBERS>
    {
        public MT_ATPAR_LOC_GROUP_MEMBERSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.LOC_GROUP_ID, t.ORG_ID, t.LOCATION_ID, t.TYPE });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LOC_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LOCATION_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOC_DESCR)
                .HasMaxLength(254);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.TYPE)
                .IsRequired()
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_LOC_GROUP_MEMBERS");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.LOC_GROUP_ID).HasColumnName("LOC_GROUP_ID");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.LOCATION_ID).HasColumnName("LOCATION_ID");
            this.Property(t => t.LOC_DESCR).HasColumnName("LOC_DESCR");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
            this.Property(t => t.TYPE).HasColumnName("TYPE");
        }
    }
}
