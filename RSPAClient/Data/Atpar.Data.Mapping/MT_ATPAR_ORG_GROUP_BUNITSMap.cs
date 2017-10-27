using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_ORG_GROUP_BUNITSMap : EntityTypeConfiguration<MT_ATPAR_ORG_GROUP_BUNITS>
    {
        public MT_ATPAR_ORG_GROUP_BUNITSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.BUSINESS_UNIT, t.BU_TYPE });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.BU_TYPE)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.LAST_UPDATE_USERID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_ORG_GROUP_BUNITS");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.BU_TYPE).HasColumnName("BU_TYPE");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USERID).HasColumnName("LAST_UPDATE_USERID");
        }
    }
}
