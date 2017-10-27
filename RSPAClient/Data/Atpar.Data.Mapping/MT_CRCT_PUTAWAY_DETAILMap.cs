using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CRCT_PUTAWAY_DETAILMap : EntityTypeConfiguration<MT_CRCT_PUTAWAY_DETAIL>
    {
        public MT_CRCT_PUTAWAY_DETAILMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.ITEM_ID, t.COMPARTMENT });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.COMPARTMENT)
                .IsRequired()
                .HasMaxLength(15);

            this.Property(t => t.DESCR)
                .HasMaxLength(255);

            this.Property(t => t.UOM)
                .HasMaxLength(5);

            this.Property(t => t.INVENTORY_ITEM)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_CRCT_PUTAWAY_DETAIL");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.COMPARTMENT).HasColumnName("COMPARTMENT");
            this.Property(t => t.DESCR).HasColumnName("DESCR");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.PAR_QTY).HasColumnName("PAR_QTY");
            this.Property(t => t.PUTAWAY_QTY).HasColumnName("PUTAWAY_QTY");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.INVENTORY_ITEM).HasColumnName("INVENTORY_ITEM");
        }
    }
}
