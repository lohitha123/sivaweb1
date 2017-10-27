using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_CASE_CART_DETAILSMap : EntityTypeConfiguration<MT_POU_CASE_CART_DETAILS>
    {
        public MT_POU_CASE_CART_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.CASE_ID, t.ITEM_ID, t.PREF_LIST_ID, t.PROCEDURE_CODE, t.CUST_ITEM_NO });

            this.Ignore(t => t.IS_NEWITEM);

            // Properties
            this.Property(t => t.CASE_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_DESCR)
                .HasMaxLength(255);

            this.Property(t => t.PREF_LIST_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_INVENTORY)
                .HasMaxLength(50);

            this.Property(t => t.PROCEDURE_CODE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_UOM)
                .HasMaxLength(20);

            this.Property(t => t.CUST_ITEM_NO)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_STATUS)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_POU_CASE_CART_DETAILS");
            this.Property(t => t.CASE_ID).HasColumnName("CASE_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ITEM_DESCR).HasColumnName("ITEM_DESCR");
            this.Property(t => t.PICK_QTY).HasColumnName("PICK_QTY");
            this.Property(t => t.HOLD_QTY).HasColumnName("HOLD_QTY");
            this.Property(t => t.PREF_LIST_ID).HasColumnName("PREF_LIST_ID");
            this.Property(t => t.ITEM_INVENTORY).HasColumnName("ITEM_INVENTORY");
            this.Property(t => t.PROCEDURE_CODE).HasColumnName("PROCEDURE_CODE");
            this.Property(t => t.ITEM_PRICE).HasColumnName("ITEM_PRICE");
            this.Property(t => t.ITEM_UOM).HasColumnName("ITEM_UOM");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.ACT_OPEN_QTY).HasColumnName("ACT_OPEN_QTY");
            this.Property(t => t.ACT_HOLD_QTY).HasColumnName("ACT_HOLD_QTY");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.CUST_ITEM_NO).HasColumnName("CUST_ITEM_NO");
            this.Property(t => t.ITEM_SOURCE).HasColumnName("ITEM_SOURCE");
            this.Property(t => t.ITEM_STATUS).HasColumnName("ITEM_STATUS");
        }
    }
}
