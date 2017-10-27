using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_PKPL_DETAILSMap : EntityTypeConfiguration<RM_PKPL_DETAILS>
    {
        public RM_PKPL_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.INV_BUSINESS_UNIT, t.LOCATION, t.PICK_BATCH_ID, t.ORDER_NO, t.LINE_NO, t.ITEM_ID });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.INV_BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOCATION)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PICK_BATCH_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ORDER_NO)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LINE_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_DESC)
                .HasMaxLength(500);

            this.Property(t => t.CUSTOMER_ITEM_NO)
                .HasMaxLength(50);

            this.Property(t => t.UPC_ID)
                .HasMaxLength(50);

            this.Property(t => t.MFG_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.VEND_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.DEPT_ID)
                .HasMaxLength(50);

            this.Property(t => t.STD_UOM)
                .HasMaxLength(5);

            this.Property(t => t.PICK_UOM)
                .HasMaxLength(5);

            this.Property(t => t.UOM)
                .HasMaxLength(5);

            this.Property(t => t.STORAGE_AREA)
                .HasMaxLength(50);

            this.Property(t => t.STPRAGE_LVL1)
                .HasMaxLength(4);

            this.Property(t => t.STPRAGE_LVL2)
                .HasMaxLength(4);

            this.Property(t => t.STPRAGE_LVL3)
                .HasMaxLength(4);

            this.Property(t => t.STPRAGE_LVL4)
                .HasMaxLength(4);

            this.Property(t => t.STORAGE_LOCATION)
                .HasMaxLength(50);

            this.Property(t => t.PARTIAL_QTY_FLAG)
                .HasMaxLength(1);

            this.Property(t => t.PARTIAL_ORDER_FLAG)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("RM_PKPL_DETAILS");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.INV_BUSINESS_UNIT).HasColumnName("INV_BUSINESS_UNIT");
            this.Property(t => t.LOCATION).HasColumnName("LOCATION");
            this.Property(t => t.PICK_BATCH_ID).HasColumnName("PICK_BATCH_ID");
            this.Property(t => t.ORDER_NO).HasColumnName("ORDER_NO");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.SCHED_LINE_NO).HasColumnName("SCHED_LINE_NO");
            this.Property(t => t.DEMAND_LINE_NO).HasColumnName("DEMAND_LINE_NO");
            this.Property(t => t.SEQUENCE_NO).HasColumnName("SEQUENCE_NO");
            this.Property(t => t.PICKLIST_LINE_NO).HasColumnName("PICKLIST_LINE_NO");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ITEM_DESC).HasColumnName("ITEM_DESC");
            this.Property(t => t.CUSTOMER_ITEM_NO).HasColumnName("CUSTOMER_ITEM_NO");
            this.Property(t => t.UPC_ID).HasColumnName("UPC_ID");
            this.Property(t => t.MFG_ITEM_ID).HasColumnName("MFG_ITEM_ID");
            this.Property(t => t.VEND_ITEM_ID).HasColumnName("VEND_ITEM_ID");
            this.Property(t => t.QTY_ORDER).HasColumnName("QTY_ORDER");
            this.Property(t => t.QTY_REQUESTED).HasColumnName("QTY_REQUESTED");
            this.Property(t => t.QTY_ALLOCATED).HasColumnName("QTY_ALLOCATED");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
            this.Property(t => t.STD_UOM).HasColumnName("STD_UOM");
            this.Property(t => t.PICK_UOM).HasColumnName("PICK_UOM");
            this.Property(t => t.CONVERSION_FACTOR).HasColumnName("CONVERSION_FACTOR");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.STORAGE_AREA).HasColumnName("STORAGE_AREA");
            this.Property(t => t.STPRAGE_LVL1).HasColumnName("STPRAGE_LVL1");
            this.Property(t => t.STPRAGE_LVL2).HasColumnName("STPRAGE_LVL2");
            this.Property(t => t.STPRAGE_LVL3).HasColumnName("STPRAGE_LVL3");
            this.Property(t => t.STPRAGE_LVL4).HasColumnName("STPRAGE_LVL4");
            this.Property(t => t.CONFIRMED_FLAG).HasColumnName("CONFIRMED_FLAG");
            this.Property(t => t.SYSTEM_QTY).HasColumnName("SYSTEM_QTY");
            this.Property(t => t.STORAGE_LOCATION).HasColumnName("STORAGE_LOCATION");
            this.Property(t => t.PARTIAL_QTY_FLAG).HasColumnName("PARTIAL_QTY_FLAG");
            this.Property(t => t.PARTIAL_ORDER_FLAG).HasColumnName("PARTIAL_ORDER_FLAG");
            this.Property(t => t.PICK_QTY).HasColumnName("PICK_QTY");
        }
    }
}
