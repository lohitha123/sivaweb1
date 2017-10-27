using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_PKPL_DEVIATION_HEADERMap : EntityTypeConfiguration<MT_PKPL_DEVIATION_HEADER>
    {
        public MT_PKPL_DEVIATION_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.LINE_NO });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.ORDER_NO)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PICK_BATCH_ID)
                .HasMaxLength(50);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LOCATION)
                .HasMaxLength(50);

            this.Property(t => t.INV_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.DEPT_ID)
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.ALLOC_UOM)
                .HasMaxLength(15);

            this.Property(t => t.PICK_UOM)
                .HasMaxLength(15);

            this.Property(t => t.REPORT_DATA_1)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_2)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_3)
                .HasMaxLength(50);

            this.Property(t => t.STD_UOM)
                .HasMaxLength(5);

            this.Property(t => t.ORDER_UOM)
                .HasMaxLength(5);

            this.Property(t => t.LINE_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_PKPL_DEVIATION_HEADER");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.ORDER_NO).HasColumnName("ORDER_NO");
            this.Property(t => t.ORDER_LINE_NO).HasColumnName("ORDER_LINE_NO");
            this.Property(t => t.PICK_BATCH_ID).HasColumnName("PICK_BATCH_ID");
            this.Property(t => t.PICK_LIST_LINE_NO).HasColumnName("PICK_LIST_LINE_NO");
            this.Property(t => t.QTY_REQUESTED).HasColumnName("QTY_REQUESTED");
            this.Property(t => t.QTY_ALLOCATED).HasColumnName("QTY_ALLOCATED");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.LOCATION).HasColumnName("LOCATION");
            this.Property(t => t.INV_ITEM_ID).HasColumnName("INV_ITEM_ID");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
            this.Property(t => t.PICK_DATE).HasColumnName("PICK_DATE");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.ALLOC_UOM).HasColumnName("ALLOC_UOM");
            this.Property(t => t.PICK_UOM).HasColumnName("PICK_UOM");
            this.Property(t => t.CONVERSION_FACTOR).HasColumnName("CONVERSION_FACTOR");
            this.Property(t => t.REPORT_DATA_1).HasColumnName("REPORT_DATA_1");
            this.Property(t => t.REPORT_DATA_2).HasColumnName("REPORT_DATA_2");
            this.Property(t => t.REPORT_DATA_3).HasColumnName("REPORT_DATA_3");
            this.Property(t => t.STD_UOM).HasColumnName("STD_UOM");
            this.Property(t => t.QTY_ORDER).HasColumnName("QTY_ORDER");
            this.Property(t => t.ORDER_UOM).HasColumnName("ORDER_UOM");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.SCHED_LINE_NO).HasColumnName("SCHED_LINE_NO");
            this.Property(t => t.DEMAND_LINE_NO).HasColumnName("DEMAND_LINE_NO");
            this.Property(t => t.SEQ_NBR).HasColumnName("SEQ_NBR");
        }
    }
}
