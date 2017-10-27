using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_RECV_PO_BOXESMap : EntityTypeConfiguration<MT_RECV_PO_BOXES>
    {
        public MT_RECV_PO_BOXESMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.LINE_NBR, t.SCHED_NBR });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LINE_NBR)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SCHED_NBR)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CARRIER_ID)
                .HasMaxLength(10);

            this.Property(t => t.CUST_ITEM_NO)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_RECV_PO_BOXES");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.LINE_NBR).HasColumnName("LINE_NBR");
            this.Property(t => t.SCHED_NBR).HasColumnName("SCHED_NBR");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.NO_OF_BOXES).HasColumnName("NO_OF_BOXES");
            this.Property(t => t.CARRIER_ID).HasColumnName("CARRIER_ID");
            this.Property(t => t.CUST_ITEM_NO).HasColumnName("CUST_ITEM_NO");
        }
    }
}
