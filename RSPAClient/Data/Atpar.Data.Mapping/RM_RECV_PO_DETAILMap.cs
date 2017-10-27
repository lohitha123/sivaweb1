using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_RECV_PO_DETAILMap : EntityTypeConfiguration<RM_RECV_PO_DETAIL>
    {
        public RM_RECV_PO_DETAILMap()
        {
            // Primary Key
            this.HasKey(t => new { t.COMPANY, t.PO_ID, t.LINE_NO });

            // Properties
            this.Property(t => t.COMPANY)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.PO_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LINE_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.DESCR)
                .HasMaxLength(255);

            this.Property(t => t.UPC_ID)
                .HasMaxLength(50);

            this.Property(t => t.MFG_ITEM_ID)
                .HasMaxLength(1000);

            this.Property(t => t.VEND_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.INV_ITEM_FLAG)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.LINE_COMMENTS)
                .HasMaxLength(4000);

            this.Property(t => t.SHIPTO_ID)
                .HasMaxLength(30);

            this.Property(t => t.DEPT_ID)
                .HasMaxLength(30);

            this.Property(t => t.UOM)
                .HasMaxLength(5);

            this.Property(t => t.DELIVER_TO_LOC)
                .HasMaxLength(30);

            this.Property(t => t.INSP_FLAG)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.REQ_ID)
                .HasMaxLength(50);

            this.Property(t => t.RECEPIENT)
                .HasMaxLength(50);

            this.Property(t => t.PURCHASE_REQ_NO)
                .HasMaxLength(100);

            this.Property(t => t.ALTUOM)
                .HasMaxLength(100);

            this.Property(t => t.DESCR2)
                .HasMaxLength(60);

            this.Property(t => t.DEPT_NAME)
                .HasMaxLength(50);

            this.Property(t => t.PURCHASE_REQ_LN_NO)
                .HasMaxLength(10);

            this.Property(t => t.LOT_CONTROL)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.SERIAL_CONTROL)
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("RM_RECV_PO_DETAIL");
            this.Property(t => t.COMPANY).HasColumnName("COMPANY");
            this.Property(t => t.PO_ID).HasColumnName("PO_ID");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.DESCR).HasColumnName("DESCR");
            this.Property(t => t.UPC_ID).HasColumnName("UPC_ID");
            this.Property(t => t.MFG_ITEM_ID).HasColumnName("MFG_ITEM_ID");
            this.Property(t => t.VEND_ITEM_ID).HasColumnName("VEND_ITEM_ID");
            this.Property(t => t.INV_ITEM_FLAG).HasColumnName("INV_ITEM_FLAG");
            this.Property(t => t.LINE_COMMENTS).HasColumnName("LINE_COMMENTS");
            this.Property(t => t.SHIPTO_ID).HasColumnName("SHIPTO_ID");
            this.Property(t => t.DUE_DATE).HasColumnName("DUE_DATE");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.PO_QTY).HasColumnName("PO_QTY");
            this.Property(t => t.RECVD_QTY).HasColumnName("RECVD_QTY");
            this.Property(t => t.RECEV_TOL_PC).HasColumnName("RECEV_TOL_PC");
            this.Property(t => t.DELIVER_TO_LOC).HasColumnName("DELIVER_TO_LOC");
            this.Property(t => t.INSP_FLAG).HasColumnName("INSP_FLAG");
            this.Property(t => t.REQ_ID).HasColumnName("REQ_ID");
            this.Property(t => t.RECEPIENT).HasColumnName("RECEPIENT");
            this.Property(t => t.PURCHASE_REQ_NO).HasColumnName("PURCHASE_REQ_NO");
            this.Property(t => t.ALTUOM).HasColumnName("ALTUOM");
            this.Property(t => t.DESCR2).HasColumnName("DESCR2");
            this.Property(t => t.DEPT_NAME).HasColumnName("DEPT_NAME");
            this.Property(t => t.PURCHASE_REQ_LN_NO).HasColumnName("PURCHASE_REQ_LN_NO");
            this.Property(t => t.LOT_CONTROL).HasColumnName("LOT_CONTROL");
            this.Property(t => t.SERIAL_CONTROL).HasColumnName("SERIAL_CONTROL");
        }
    }
}
