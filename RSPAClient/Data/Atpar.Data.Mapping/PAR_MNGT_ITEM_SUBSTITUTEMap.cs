using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class PAR_MNGT_ITEM_SUBSTITUTEMap : EntityTypeConfiguration<PAR_MNGT_ITEM_SUBSTITUTE>
    {
        public PAR_MNGT_ITEM_SUBSTITUTEMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.ITEM_ID, t.SUBSTITUTE_ITEM_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SUBSTITUTE_ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_DESCR)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("PAR_MNGT_ITEM_SUBSTITUTE");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.SUBSTITUTE_ITEM_ID).HasColumnName("SUBSTITUTE_ITEM_ID");
            this.Property(t => t.PRIORITY).HasColumnName("PRIORITY");
            this.Property(t => t.ITEM_DESCR).HasColumnName("ITEM_DESCR");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
