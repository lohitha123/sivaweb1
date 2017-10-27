using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RF_ITEM_USAGE_DETAILSMap : EntityTypeConfiguration<RF_ITEM_USAGE_DETAILS>
    {
        public RF_ITEM_USAGE_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.CART_ID, t.ITEM_ID, t.COMPARTMENT, t.ENTRY_DTTM, t.STATUS });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.COMPARTMENT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SERIAL_NO)
                .HasMaxLength(30);

            this.Property(t => t.LOT_NO)
                .HasMaxLength(30);

            this.Property(t => t.STATUS)
                .IsRequired()
                .HasMaxLength(10);

            // Table & Column Mappings
            this.ToTable("RF_ITEM_USAGE_DETAILS");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.COMPARTMENT).HasColumnName("COMPARTMENT");
            this.Property(t => t.SERIAL_NO).HasColumnName("SERIAL_NO");
            this.Property(t => t.LOT_NO).HasColumnName("LOT_NO");
            this.Property(t => t.EXPIRY_DATE).HasColumnName("EXPIRY_DATE");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.ENTRY_DTTM).HasColumnName("ENTRY_DTTM");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
