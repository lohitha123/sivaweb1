using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_CYCT_DEVIATION_DETAILSMap : EntityTypeConfiguration<MT_POU_CYCT_DEVIATION_DETAILS>
    {
        public MT_POU_CYCT_DEVIATION_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.CART_ID, t.CYCT_DATE_TIME, t.ITEM_ID, t.LOT_NUMBER, t.SERIAL_NUMBER, t.BUSINESS_UNIT, t.COMPARTMENT });

            // Properties
            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.LOT_NUMBER)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.SERIAL_NUMBER)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.COMPARTMENT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UOM)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_POU_CYCT_DEVIATION_DETAILS");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.CYCT_DATE_TIME).HasColumnName("CYCT_DATE_TIME");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ORIGINAL_QUANTITY).HasColumnName("ORIGINAL_QUANTITY");
            this.Property(t => t.NEW_QUANTITY).HasColumnName("NEW_QUANTITY");
            this.Property(t => t.LOT_NUMBER).HasColumnName("LOT_NUMBER");
            this.Property(t => t.SERIAL_NUMBER).HasColumnName("SERIAL_NUMBER");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.COMPARTMENT).HasColumnName("COMPARTMENT");
            this.Property(t => t.ITEM_PRICE).HasColumnName("ITEM_PRICE");
            this.Property(t => t.UOM).HasColumnName("UOM");
        }
    }
}
