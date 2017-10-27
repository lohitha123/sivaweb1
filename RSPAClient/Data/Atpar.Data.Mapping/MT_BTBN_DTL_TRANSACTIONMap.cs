using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_BTBN_DTL_TRANSACTIONMap : EntityTypeConfiguration<MT_BTBN_DTL_TRANSACTION>
    {
        public MT_BTBN_DTL_TRANSACTIONMap()
        {
            // Primary Key
            this.HasKey(t => t.TRANSACTION_ID);

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.INV_BUSINESS_UNIT)
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.STOR_LOC)
                .HasMaxLength(50);

            this.Property(t => t.UOM)
                .HasMaxLength(10);

            this.Property(t => t.LOT_ID)
                .HasMaxLength(50);

            this.Property(t => t.SERIAL_ID)
                .HasMaxLength(50);

            this.Property(t => t.CONTAINER)
                .HasMaxLength(20);

            this.Property(t => t.DEST_STOR_LOC)
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.DEVICE_ID)
                .HasMaxLength(100);

            this.Property(t => t.DESTIN_UOM)
                .HasMaxLength(10);

            this.Property(t => t.STOCK_UOM)
                .HasMaxLength(10);

            // Table & Column Mappings
            this.ToTable("MT_BTBN_DTL_TRANSACTION");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.INV_BUSINESS_UNIT).HasColumnName("INV_BUSINESS_UNIT");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.STOR_LOC).HasColumnName("STOR_LOC");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.LOT_ID).HasColumnName("LOT_ID");
            this.Property(t => t.SERIAL_ID).HasColumnName("SERIAL_ID");
            this.Property(t => t.CONTAINER).HasColumnName("CONTAINER");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.DEST_STOR_LOC).HasColumnName("DEST_STOR_LOC");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.TRANSFER_DATE_TIME).HasColumnName("TRANSFER_DATE_TIME");
            this.Property(t => t.DEVICE_ID).HasColumnName("DEVICE_ID");
            this.Property(t => t.DESTIN_UOM).HasColumnName("DESTIN_UOM");
            this.Property(t => t.STOCK_UOM).HasColumnName("STOCK_UOM");
            this.Property(t => t.STOCK_QTY).HasColumnName("STOCK_QTY");
        }
    }
}
