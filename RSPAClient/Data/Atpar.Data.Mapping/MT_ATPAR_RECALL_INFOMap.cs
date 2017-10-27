using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_RECALL_INFOMap : EntityTypeConfiguration<MT_ATPAR_RECALL_INFO>
    {
        public MT_ATPAR_RECALL_INFOMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ALERT_ID, t.ITEM_ID, t.LOT_NO, t.SERIAL_NO });

            // Properties
            this.Property(t => t.ALERT_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOT_NO)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.SERIAL_NO)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.MFG_NAME)
                .HasMaxLength(100);

            this.Property(t => t.MFG_CAT_NO)
                .HasMaxLength(50);

            this.Property(t => t.ALERT_TYPE)
                .HasMaxLength(50);

            this.Property(t => t.ALERT_CLASS)
                .HasMaxLength(50);

            this.Property(t => t.ALERT_CATEGORY)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_RECALL_INFO");
            this.Property(t => t.ALERT_ID).HasColumnName("ALERT_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.LOT_NO).HasColumnName("LOT_NO");
            this.Property(t => t.SERIAL_NO).HasColumnName("SERIAL_NO");
            this.Property(t => t.MFG_NAME).HasColumnName("MFG_NAME");
            this.Property(t => t.MFG_CAT_NO).HasColumnName("MFG_CAT_NO");
            this.Property(t => t.ALERT_TYPE).HasColumnName("ALERT_TYPE");
            this.Property(t => t.ALERT_CLASS).HasColumnName("ALERT_CLASS");
            this.Property(t => t.ALERT_CATEGORY).HasColumnName("ALERT_CATEGORY");
            this.Property(t => t.ALERT_TITLE).HasColumnName("ALERT_TITLE");
            this.Property(t => t.ALERT_SYNOPSIS).HasColumnName("ALERT_SYNOPSIS");
            this.Property(t => t.ALERT_URL).HasColumnName("ALERT_URL");
            this.Property(t => t.ALERT_DATE).HasColumnName("ALERT_DATE");
        }
    }
}
