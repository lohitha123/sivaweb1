using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_ITEM_MFG_UPNMap : EntityTypeConfiguration<MT_ATPAR_ITEM_MFG_UPN>
    {
        public MT_ATPAR_ITEM_MFG_UPNMap()
        {
            // Primary Key
            this.HasKey(t => t.ID);

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.MFG_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.MANUFACTURER)
                .HasMaxLength(50);

            this.Property(t => t.UOM)
                .HasMaxLength(10);

            this.Property(t => t.UPN)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_ITEM_MFG_UPN");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.MFG_ITEM_ID).HasColumnName("MFG_ITEM_ID");
            this.Property(t => t.MANUFACTURER).HasColumnName("MANUFACTURER");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.UPN).HasColumnName("UPN");
        }
    }
}
