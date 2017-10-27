using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class PAR_MNGT_ORDER_DETAILSMap : EntityTypeConfiguration<PAR_MNGT_ORDER_DETAILS>
    {
        public PAR_MNGT_ORDER_DETAILSMap()
        {
            this.Ignore(t => t.DESCRIPTION);
            this.Ignore(t => t.PRICE);
            // Primary Key
            this.HasKey(t => new { t.ORDER_NO, t.LINE_NO, t.ITEM_ID, t.BIN_LOC });

            // Properties
            this.Property(t => t.ORDER_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LINE_NO)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.BIN_LOC)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UOM)
                .HasMaxLength(5);

            this.Property(t => t.SERIAL_NO)
                .HasMaxLength(50);

            this.Property(t => t.LOT_NO)
                .HasMaxLength(50);

            this.Property(t => t.REQUISITION_NO)
                .HasMaxLength(50);

            this.Property(t => t.LINE_COMMENTS)
                .HasMaxLength(4000);

            this.Property(t => t.ACTUAL_ISSUE_UOM)
                .HasMaxLength(5);

            this.Property(t => t.NDC_CODE)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("PAR_MNGT_ORDER_DETAILS");
            this.Property(t => t.ORDER_NO).HasColumnName("ORDER_NO");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.BIN_LOC).HasColumnName("BIN_LOC");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.ORDER_STATUS).HasColumnName("ORDER_STATUS");
            this.Property(t => t.QTY_RCVD).HasColumnName("QTY_RCVD");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.SERIAL_NO).HasColumnName("SERIAL_NO");
            this.Property(t => t.LOT_NO).HasColumnName("LOT_NO");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.REQUISITION_NO).HasColumnName("REQUISITION_NO");
            this.Property(t => t.LINE_COMMENTS).HasColumnName("LINE_COMMENTS");
            this.Property(t => t.ACTUAL_ORDERQTY).HasColumnName("ACTUAL_ORDERQTY");
            this.Property(t => t.ACTUAL_ISSUE_UOM).HasColumnName("ACTUAL_ISSUE_UOM");
            this.Property(t => t.COUNT_QTY).HasColumnName("COUNT_QTY");
            this.Property(t => t.QTY_PICKED).HasColumnName("QTY_PICKED");
            this.Property(t => t.NDC_CODE).HasColumnName("NDC_CODE");
        }
    }
}
