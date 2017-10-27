using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PHYSICAL_INVENTORYMap : EntityTypeConfiguration<MT_ATPAR_PHYSICAL_INVENTORY>
    {
        public MT_ATPAR_PHYSICAL_INVENTORYMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.INV_ITEM_ID, t.UOM, t.STOR_LOC, t.LOT_ID, t.SERIAL_ID });

            // Properties
            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.INV_ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UOM)
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.STOR_LOC)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CHARGE_CODE)
                .HasMaxLength(50);

            this.Property(t => t.LOT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SERIAL_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DEFAULT_LOC_FLAG)
                .HasMaxLength(1);

            this.Property(t => t.REPLENISHMENT_TYPE)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PHYSICAL_INVENTORY");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.INV_ITEM_ID).HasColumnName("INV_ITEM_ID");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.STOR_LOC).HasColumnName("STOR_LOC");
            this.Property(t => t.CHARGE_CODE).HasColumnName("CHARGE_CODE");
            this.Property(t => t.LOT_ID).HasColumnName("LOT_ID");
            this.Property(t => t.SERIAL_ID).HasColumnName("SERIAL_ID");
            this.Property(t => t.DEFAULT_LOC_FLAG).HasColumnName("DEFAULT_LOC_FLAG");
            this.Property(t => t.QUANTITY_ON_HAND).HasColumnName("QUANTITY_ON_HAND");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.REPLENISHMENT_TYPE).HasColumnName("REPLENISHMENT_TYPE");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
