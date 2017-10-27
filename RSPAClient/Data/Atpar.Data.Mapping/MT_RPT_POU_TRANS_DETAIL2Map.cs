using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_RPT_POU_TRANS_DETAIL2Map : EntityTypeConfiguration<MT_RPT_POU_TRANS_DETAIL2>
    {
        public MT_RPT_POU_TRANS_DETAIL2Map()
        {
            // Primary Key
            this.HasKey(t => t.TRANSACTION_ID);

            // Properties
            this.Property(t => t.CART_ID)
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.BUSINESS_UNIT)
                .HasMaxLength(50);

            this.Property(t => t.LOT_NUMBER)
                .HasMaxLength(50);

            this.Property(t => t.SERIAL_NUMBER)
                .HasMaxLength(50);

            this.Property(t => t.COMPARTMENT)
                .HasMaxLength(50);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.UOM)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_RPT_POU_TRANS_DETAIL2", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ITEM_QUANTITY_PAR).HasColumnName("ITEM_QUANTITY_PAR");
            this.Property(t => t.ITEM_QUANTITY_ON_HAND).HasColumnName("ITEM_QUANTITY_ON_HAND");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.LOT_NUMBER).HasColumnName("LOT_NUMBER");
            this.Property(t => t.SERIAL_NUMBER).HasColumnName("SERIAL_NUMBER");
            this.Property(t => t.EXPIRY_DATE).HasColumnName("EXPIRY_DATE");
            this.Property(t => t.ACTUAL_QUANTITY).HasColumnName("ACTUAL_QUANTITY");
            this.Property(t => t.COMPARTMENT).HasColumnName("COMPARTMENT");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.EVENT_TYPE).HasColumnName("EVENT_TYPE");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.ON_HAND_QTY).HasColumnName("ON_HAND_QTY");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.ADJUSTMENT_TYPE).HasColumnName("ADJUSTMENT_TYPE");
            this.Property(t => t.CHARGE_CAPTURE_TRANS_ID).HasColumnName("CHARGE_CAPTURE_TRANS_ID");
            this.Property(t => t.CYCT_DATE_TIME).HasColumnName("CYCT_DATE_TIME");
            this.Property(t => t.ORIGINAL_QUANTITY).HasColumnName("ORIGINAL_QUANTITY");
            this.Property(t => t.NEW_QUANTITY).HasColumnName("NEW_QUANTITY");
            this.Property(t => t.ITEM_PRICE).HasColumnName("ITEM_PRICE");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.ORDER_ID).HasColumnName("ORDER_ID");
            this.Property(t => t.PTWY_DATE_TIME).HasColumnName("PTWY_DATE_TIME");
            this.Property(t => t.QUANTITY_ORDERED).HasColumnName("QUANTITY_ORDERED");
            this.Property(t => t.QUANTITY_RECEIVED).HasColumnName("QUANTITY_RECEIVED");
        }
    }
}
