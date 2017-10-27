using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_PKPL_DEVIATION_DETAILSMap : EntityTypeConfiguration<MT_PKPL_DEVIATION_DETAILS>
    {
        public MT_PKPL_DEVIATION_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SERIAL_ID, t.LOT_ID, t.LOCATION, t.UOM, t.TRANSACTION_ID, t.LINE_NO, t.CONTAINER_ID, t.SUB_ITM_ID });

            // Properties
            this.Property(t => t.SERIAL_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOCATION)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UOM)
                .IsRequired()
                .HasMaxLength(15);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LINE_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.CONTAINER_ID)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(50);

            this.Property(t => t.SUB_ITM_ID)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_PKPL_DEVIATION_DETAILS");
            this.Property(t => t.SERIAL_ID).HasColumnName("SERIAL_ID");
            this.Property(t => t.LOT_ID).HasColumnName("LOT_ID");
            this.Property(t => t.LOCATION).HasColumnName("LOCATION");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.CONVERSION_FACTOR).HasColumnName("CONVERSION_FACTOR");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.CONTAINER_ID).HasColumnName("CONTAINER_ID");
            this.Property(t => t.SUB_ITM_ID).HasColumnName("SUB_ITM_ID");
            this.Property(t => t.EXPIRY_DATE).HasColumnName("EXPIRY_DATE");
        }
    }
}
