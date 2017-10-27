using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_ITEM_DEPTMap : EntityTypeConfiguration<TKIT_ITEM_DEPT>
    {
        public TKIT_ITEM_DEPTMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.ITEM_ID, t.DEPT_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DEPT_ID)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("TKIT_ITEM_DEPT");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
        }
    }
}
