using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_NONCART_ITEMSMap : EntityTypeConfiguration<MT_POU_NONCART_ITEMS>
    {
        public MT_POU_NONCART_ITEMSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ITEM_ID, t.BUSINESS_UNIT, t.CART_ID, t.COMPARTMENT });
            //Ignore Properties
            this.Ignore(t => t.VENDOR_ID);
            // Properties
            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.MANUFACTURE_ITEM_ID)
                .HasMaxLength(30);

            this.Property(t => t.VENDOR_ITEM_ID)
                .HasMaxLength(30);

            this.Property(t => t.CUST_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.ITEM_DESCRIPTION)
                .HasMaxLength(255);

            this.Property(t => t.COUNT_ORDER)
                .HasMaxLength(10);

            this.Property(t => t.CHARGE_CODE)
                .HasMaxLength(50);

            this.Property(t => t.UOM)
                .HasMaxLength(20);

            this.Property(t => t.LOT_CONTROLLED)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.SERIALIZED)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.UPC_ID)
                .HasMaxLength(20);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.COMPARTMENT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.REPLENISHMENT_CTRL)
                .HasMaxLength(10);

            this.Property(t => t.MANUFACTURER)
                .HasMaxLength(100);

            this.Property(t => t.VENDOR)
                .HasMaxLength(100);

            this.Property(t => t.PATIENT_CHARGEABLE)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.SAMPLE)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.STATUS)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.GTIN)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_NONCART_ITEMS");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.MANUFACTURE_ITEM_ID).HasColumnName("MANUFACTURE_ITEM_ID");
            this.Property(t => t.VENDOR_ITEM_ID).HasColumnName("VENDOR_ITEM_ID");
            this.Property(t => t.CUST_ITEM_ID).HasColumnName("CUST_ITEM_ID");
            this.Property(t => t.ITEM_DESCRIPTION).HasColumnName("ITEM_DESCRIPTION");
            this.Property(t => t.COUNT_ORDER).HasColumnName("COUNT_ORDER");
            this.Property(t => t.OPTIMUM_QTY).HasColumnName("OPTIMUM_QTY");
            this.Property(t => t.CHARGE_CODE).HasColumnName("CHARGE_CODE");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.LOT_CONTROLLED).HasColumnName("LOT_CONTROLLED");
            this.Property(t => t.SERIALIZED).HasColumnName("SERIALIZED");
            this.Property(t => t.UPC_ID).HasColumnName("UPC_ID");
            this.Property(t => t.ITEM_PRICE).HasColumnName("ITEM_PRICE");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.COMPARTMENT).HasColumnName("COMPARTMENT");
            this.Property(t => t.REPLENISHMENT_CTRL).HasColumnName("REPLENISHMENT_CTRL");
            this.Property(t => t.MANUFACTURER).HasColumnName("MANUFACTURER");
            this.Property(t => t.VENDOR).HasColumnName("VENDOR");
            this.Property(t => t.PATIENT_CHARGEABLE).HasColumnName("PATIENT_CHARGEABLE");
            this.Property(t => t.SAMPLE).HasColumnName("SAMPLE");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.GTIN).HasColumnName("GTIN");
        }
    }
}
