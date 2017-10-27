using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_LOC_GROUPSMap : EntityTypeConfiguration<MT_ATPAR_LOC_GROUPS>
    {
        public MT_ATPAR_LOC_GROUPSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.LOC_GROUP_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LOC_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LOC_DESCR)
                .HasMaxLength(254);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .IsRequired()
                .HasMaxLength(20);

            //Ignore
            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.USER_ID);
            this.Ignore(t => t.CHK_ALLOCATED);
            this.Ignore(t => t.ROWINDEX);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_LOC_GROUPS");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.LOC_GROUP_ID).HasColumnName("LOC_GROUP_ID");
            this.Property(t => t.LOC_DESCR).HasColumnName("LOC_DESCR");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
