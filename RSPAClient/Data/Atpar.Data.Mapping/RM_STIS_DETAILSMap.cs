using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_STIS_DETAILSMap : EntityTypeConfiguration<RM_STIS_DETAILS>
    {
        public RM_STIS_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.ITEM_ID, t.UOM, t.STORAGE_LOCATION });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_DESC)
                .IsRequired()
                .HasMaxLength(255);

            this.Property(t => t.CUSTOMER_ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UPC_ID)
                .HasMaxLength(50);

            this.Property(t => t.MFG_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.VEND_ID)
                .HasMaxLength(50);

            this.Property(t => t.VEND_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.CONTAINER_ID)
                .HasMaxLength(50);

            this.Property(t => t.DEPT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UOM)
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.STDUOM)
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.LOTID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SERIALID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOT_CONTROLLED)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.SERIAL_CONTROLLED)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.STORAGE_LOCATION)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("RM_STIS_DETAILS");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ITEM_DESC).HasColumnName("ITEM_DESC");
            this.Property(t => t.CUSTOMER_ITEM_ID).HasColumnName("CUSTOMER_ITEM_ID");
            this.Property(t => t.UPC_ID).HasColumnName("UPC_ID");
            this.Property(t => t.MFG_ITEM_ID).HasColumnName("MFG_ITEM_ID");
            this.Property(t => t.VEND_ID).HasColumnName("VEND_ID");
            this.Property(t => t.VEND_ITEM_ID).HasColumnName("VEND_ITEM_ID");
            this.Property(t => t.CONTAINER_ID).HasColumnName("CONTAINER_ID");
            this.Property(t => t.STORAGE_DATE).HasColumnName("STORAGE_DATE");
            this.Property(t => t.EXPIRY_DATE).HasColumnName("EXPIRY_DATE");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.STDUOM).HasColumnName("STDUOM");
            this.Property(t => t.LOTID).HasColumnName("LOTID");
            this.Property(t => t.SERIALID).HasColumnName("SERIALID");
            this.Property(t => t.LOT_CONTROLLED).HasColumnName("LOT_CONTROLLED");
            this.Property(t => t.SERIAL_CONTROLLED).HasColumnName("SERIAL_CONTROLLED");
            this.Property(t => t.SYSTEM_QTY).HasColumnName("SYSTEM_QTY");
            this.Property(t => t.STORAGE_LOCATION).HasColumnName("STORAGE_LOCATION");
            this.Property(t => t.PRICE).HasColumnName("PRICE");
        }
    }
}
