using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_DELV_SHIPTO_ID_ALLOCATIONMap : EntityTypeConfiguration<MT_DELV_SHIPTO_ID_ALLOCATION>
    {
        public MT_DELV_SHIPTO_ID_ALLOCATIONMap()
        {

            this.Ignore(t => t.SNO);
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.ORG_ID, t.SHIPTO_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.SHIPTO_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.CHK_ALLOCATED);
            this.Ignore(t => t.DESCR);
            this.Ignore(t => t.EFF_STATUS);

            // Table & Column Mappings
            this.ToTable("MT_DELV_SHIPTO_ID_ALLOCATION");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.SHIPTO_ID).HasColumnName("SHIPTO_ID");
        }
    }
}
