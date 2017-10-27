using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_ORDER_DETAILSMap : EntityTypeConfiguration<MT_POU_ORDER_DETAILS>
    {
        public MT_POU_ORDER_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORDER_ID, t.LINE_NUMBER });

            // Properties
            this.Property(t => t.ORDER_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LINE_NUMBER)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.COMPARTMENT)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_ORDER_DETAILS");
            this.Property(t => t.ORDER_ID).HasColumnName("ORDER_ID");
            this.Property(t => t.LINE_NUMBER).HasColumnName("LINE_NUMBER");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.QUANTITY_ORDERED).HasColumnName("QUANTITY_ORDERED");
            this.Property(t => t.QUANTITY_RECEIVED).HasColumnName("QUANTITY_RECEIVED");
            this.Property(t => t.COMPARTMENT).HasColumnName("COMPARTMENT");
            this.Property(t => t.QUANTITY_TO_RECEIVE).HasColumnName("QUANTITY_TO_RECEIVE");
        }
    }
}
