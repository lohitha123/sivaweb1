using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_INVENTORY_TRACK_HISTORY_Map : EntityTypeConfiguration<MT_POU_INVENTORY_TRACK_HISTORY>
    {
        public MT_POU_INVENTORY_TRACK_HISTORY_Map()
        {
            // Primary Key
            this.HasKey(t => new { t.ID, t.EVENT_TYPE, t.UPDATE_DATE, t.TRANSACTION_ID });

            // Properties
            this.Property(t => t.ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.EVENT_TYPE)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_POU_INVENTORY_TRACK_HISTORY");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.EVENT_TYPE).HasColumnName("EVENT_TYPE");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.ON_HAND_QTY).HasColumnName("ON_HAND_QTY");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.CHARGE_CAPTURE_TRANS_ID).HasColumnName("CHARGE_CAPTURE_TRANS_ID");
            this.Property(t => t.ADJUSTMENT_TYPE).HasColumnName("ADJUSTMENT_TYPE");
        }
    }
}
