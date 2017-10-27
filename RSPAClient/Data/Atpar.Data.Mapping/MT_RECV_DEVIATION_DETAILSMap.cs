using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_RECV_DEVIATION_DETAILSMap : EntityTypeConfiguration<MT_RECV_DEVIATION_DETAILS>
    {
        public MT_RECV_DEVIATION_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.LINE_NO, t.SERIAL_ID, t.LOT_ID, t.RECV_UOM });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LINE_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SERIAL_ID)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.LOT_ID)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.RECV_UOM)
                .IsRequired()
                .HasMaxLength(5);

            // Table & Column Mappings
            this.ToTable("MT_RECV_DEVIATION_DETAILS");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.SERIAL_ID).HasColumnName("SERIAL_ID");
            this.Property(t => t.LOT_ID).HasColumnName("LOT_ID");
            this.Property(t => t.RECV_UOM).HasColumnName("RECV_UOM");
            this.Property(t => t.RECV_CONVERSION_RATE).HasColumnName("RECV_CONVERSION_RATE");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.EXPIRY_DATE).HasColumnName("EXPIRY_DATE");
        }
    }
}
