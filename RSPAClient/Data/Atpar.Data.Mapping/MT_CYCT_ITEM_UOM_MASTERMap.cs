using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CYCT_ITEM_UOM_MASTERMap : EntityTypeConfiguration<MT_CYCT_ITEM_UOM_MASTER>
    {
        public MT_CYCT_ITEM_UOM_MASTERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.ITEM_REC_NUM, t.UOM });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ITEM_REC_NUM)
                .IsRequired()
                .HasMaxLength(18);

            this.Property(t => t.INV_ITEM_ID)
                .HasMaxLength(20);

            this.Property(t => t.UOM)
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.UOM_TYPE)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_CYCT_ITEM_UOM_MASTER");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.ITEM_REC_NUM).HasColumnName("ITEM_REC_NUM");
            this.Property(t => t.INV_ITEM_ID).HasColumnName("INV_ITEM_ID");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.CONVERSION_RATE).HasColumnName("CONVERSION_RATE");
            this.Property(t => t.UOM_TYPE).HasColumnName("UOM_TYPE");
        }
    }
}
