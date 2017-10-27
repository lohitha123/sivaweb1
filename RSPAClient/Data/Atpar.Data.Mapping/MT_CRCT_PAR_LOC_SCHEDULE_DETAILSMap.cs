using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CRCT_PAR_LOC_SCHEDULE_DETAILSMap : EntityTypeConfiguration<MT_CRCT_PAR_LOC_SCHEDULE_DETAILS>
    {
        public MT_CRCT_PAR_LOC_SCHEDULE_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.ORG_ID, t.PAR_LOC_ID, t.SCHEDULE_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PAR_LOC_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SCHEDULE_ID)
                .IsRequired()
                .HasMaxLength(50);

            //Ignore Properties
            this.Ignore(t => t.CHK_VALUE);

            // Table & Column Mappings
            this.ToTable("MT_CRCT_PAR_LOC_SCHEDULE_DETAILS");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.PAR_LOC_ID).HasColumnName("PAR_LOC_ID");
            this.Property(t => t.SCHEDULE_ID).HasColumnName("SCHEDULE_ID");
        }
    }
}
