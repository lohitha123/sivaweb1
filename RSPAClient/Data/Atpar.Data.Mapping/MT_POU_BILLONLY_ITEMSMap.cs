using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_BILLONLY_ITEMSMap : EntityTypeConfiguration<MT_POU_BILLONLY_ITEMS>
    {
        public MT_POU_BILLONLY_ITEMSMap()
        {
            this.Ignore(t => t.ITEMDESCR);
            // Primary Key
            this.HasKey(t => new { t.ITEM_ID, t.ORG_GROUP_ID, t.DEPT_ID });

            // Properties
            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DEPT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(255);

            this.Property(t => t.UPC_ID)
                .HasMaxLength(50);

            this.Property(t => t.MFG_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.VEND_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.MANUFACTURER)
                .HasMaxLength(50);

            this.Property(t => t.VENDOR_ID)
                .IsRequired()
                .HasMaxLength(15);

            this.Property(t => t.LOT_ID)
                .HasMaxLength(30);

            this.Property(t => t.SERIAL_ID)
                .HasMaxLength(30);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.UOM)
                .HasMaxLength(5);

            this.Property(t => t.GTIN)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_BILLONLY_ITEMS");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.UPC_ID).HasColumnName("UPC_ID");
            this.Property(t => t.MFG_ITEM_ID).HasColumnName("MFG_ITEM_ID");
            this.Property(t => t.VEND_ITEM_ID).HasColumnName("VEND_ITEM_ID");
            this.Property(t => t.MANUFACTURER).HasColumnName("MANUFACTURER");
            this.Property(t => t.VENDOR_ID).HasColumnName("VENDOR_ID");
            this.Property(t => t.LOT_ID).HasColumnName("LOT_ID");
            this.Property(t => t.SERIAL_ID).HasColumnName("SERIAL_ID");
            this.Property(t => t.EXPIRY_DATE).HasColumnName("EXPIRY_DATE");
            this.Property(t => t.CATALOG_FLG).HasColumnName("CATALOG_FLG");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.ITEM_PRICE).HasColumnName("ITEM_PRICE");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.GTIN).HasColumnName("GTIN");
        }
    }
}
