using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_WORKFLOW_DETAILSMap : EntityTypeConfiguration<MT_POU_WORKFLOW_DETAILS>
    {
        public MT_POU_WORKFLOW_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.WORKFLOW_INSTANCE_ID });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.PO_NO)
                .HasMaxLength(30);

            this.Property(t => t.VENDOR_REVIEW_STATUS)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.DEPT_REVIEW_STATUS)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.EXCEPTION_REVIEW_STATUS)
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_POU_WORKFLOW_DETAILS");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.WORKFLOW_INSTANCE_ID).HasColumnName("WORKFLOW_INSTANCE_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.PO_NO).HasColumnName("PO_NO");
            this.Property(t => t.VENDOR_REVIEW_STATUS).HasColumnName("VENDOR_REVIEW_STATUS");
            this.Property(t => t.DEPT_REVIEW_STATUS).HasColumnName("DEPT_REVIEW_STATUS");
            this.Property(t => t.EXCEPTION_REVIEW_STATUS).HasColumnName("EXCEPTION_REVIEW_STATUS");
            this.Property(t => t.WORK_FLOW_STATUS).HasColumnName("WORK_FLOW_STATUS");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
