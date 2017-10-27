using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_PTWY_DEVIATION_DETAILSMap : EntityTypeConfiguration<MT_POU_PTWY_DEVIATION_DETAILS>
    {
        public MT_POU_PTWY_DEVIATION_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORDER_ID, t.PTWY_DATE_TIME, t.ITEM_ID, t.COMPARTMENT });

            // Properties
            this.Property(t => t.ORDER_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.COMPARTMENT)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_PTWY_DEVIATION_DETAILS");
            this.Property(t => t.ORDER_ID).HasColumnName("ORDER_ID");
            this.Property(t => t.PTWY_DATE_TIME).HasColumnName("PTWY_DATE_TIME");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.COMPARTMENT).HasColumnName("COMPARTMENT");
            this.Property(t => t.QUANTITY_ORDERED).HasColumnName("QUANTITY_ORDERED");
            this.Property(t => t.QUANTITY_RECEIVED).HasColumnName("QUANTITY_RECEIVED");
        }
    }
}
