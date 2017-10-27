using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_CART_PREV_COUNTSMap : EntityTypeConfiguration<MT_ATPAR_CART_PREV_COUNTS>
    {
        public MT_ATPAR_CART_PREV_COUNTSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.ITEM_ID, t.COMPARTMENT });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(32);

            this.Property(t => t.COMPARTMENT)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_CART_PREV_COUNTS");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.COMPARTMENT).HasColumnName("COMPARTMENT");
            this.Property(t => t.COUNT_QTY).HasColumnName("COUNT_QTY");
        }
    }
}
