using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_CART_INVENTORYMap : EntityTypeConfiguration<MT_POU_CART_INVENTORY>
    {
        public MT_POU_CART_INVENTORYMap()
        {
            // Primary Key
            this.HasKey(t => new { t.CART_ID, t.ITEM_ID, t.BUSINESS_UNIT, t.LOT_NUMBER, t.SERIAL_NUMBER, t.COMPARTMENT, t.ID });
            //Igoner Properties
            this.Ignore(t => t.QUANTITY_ON_HAND);
            // Properties
            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOT_NUMBER)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.SERIAL_NUMBER)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.COMPARTMENT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            // Table & Column Mappings
            this.ToTable("MT_POU_CART_INVENTORY");
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
        }
    }
}
