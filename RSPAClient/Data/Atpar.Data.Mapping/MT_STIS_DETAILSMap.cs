using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_STIS_DETAILSMap : EntityTypeConfiguration<MT_STIS_DETAILS>
    {
        public MT_STIS_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.LINE_NBR });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LINE_NBR)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.STORAGE_LOCATION)
                .HasMaxLength(21);

            this.Property(t => t.UOM)
                .HasMaxLength(5);

            this.Property(t => t.ACTUAL_ISSUED_UOM)
                .HasMaxLength(5);

            this.Property(t => t.ADJUST_TYPE)
                .HasMaxLength(5);

            this.Property(t => t.ADJUST_QTY)
                .HasMaxLength(50);

            this.Property(t => t.LOT_ID)
                .HasMaxLength(100);

            this.Property(t => t.SERIAL_ID)
                .HasMaxLength(100);

            this.Property(t => t.ITEM_DESC)
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("MT_STIS_DETAILS");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.LINE_NBR).HasColumnName("LINE_NBR");
            this.Property(t => t.STORAGE_LOCATION).HasColumnName("STORAGE_LOCATION");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.PRICE).HasColumnName("PRICE");
            this.Property(t => t.ISSUE_DATE).HasColumnName("ISSUE_DATE");
            this.Property(t => t.ACTUAL_ISSUED_UOM).HasColumnName("ACTUAL_ISSUED_UOM");
            this.Property(t => t.ACTUAL_ISSUED_QTY).HasColumnName("ACTUAL_ISSUED_QTY");
            this.Property(t => t.ADJUST_TYPE).HasColumnName("ADJUST_TYPE");
            this.Property(t => t.ADJUST_QTY).HasColumnName("ADJUST_QTY");
            this.Property(t => t.LOT_ID).HasColumnName("LOT_ID");
            this.Property(t => t.SERIAL_ID).HasColumnName("SERIAL_ID");
            this.Property(t => t.EXPIRY_DATE).HasColumnName("EXPIRY_DATE");
            this.Property(t => t.ITEM_DESC).HasColumnName("ITEM_DESC");
        }
    }
}
