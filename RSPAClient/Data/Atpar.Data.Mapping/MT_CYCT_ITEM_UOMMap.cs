using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CYCT_ITEM_UOMMap : EntityTypeConfiguration<MT_CYCT_ITEM_UOM>
    {
        public MT_CYCT_ITEM_UOMMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ITEM_REC_NUM, t.USER_ID, t.UOM });

            // Properties
            this.Property(t => t.ITEM_REC_NUM)
                .IsRequired()
                .HasMaxLength(18);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.UOM)
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.EVENT_ID)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.INV_ITEM_ID)
                .HasMaxLength(20);

            this.Property(t => t.UOM_TYPE)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_CYCT_ITEM_UOM");
            this.Property(t => t.ITEM_REC_NUM).HasColumnName("ITEM_REC_NUM");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.CONVERSION_RATE).HasColumnName("CONVERSION_RATE");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.EVENT_ID).HasColumnName("EVENT_ID");
            this.Property(t => t.INV_ITEM_ID).HasColumnName("INV_ITEM_ID");
            this.Property(t => t.UOM_TYPE).HasColumnName("UOM_TYPE");
        }
    }
}
