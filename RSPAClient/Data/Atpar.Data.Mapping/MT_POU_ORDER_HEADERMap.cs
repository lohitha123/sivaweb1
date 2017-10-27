using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_ORDER_HEADERMap : EntityTypeConfiguration<MT_POU_ORDER_HEADER>
    {
        public MT_POU_ORDER_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORDER_ID, t.CART_ID, t.BUSINESS_UNIT });

            // Properties
            this.Property(t => t.ORDER_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_ORDER_HEADER");
            this.Property(t => t.ORDER_ID).HasColumnName("ORDER_ID");
            this.Property(t => t.ORDER_DATE_TIME).HasColumnName("ORDER_DATE_TIME");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.ORDER_STATUS).HasColumnName("ORDER_STATUS");
            this.Property(t => t.ERP_ORDER_NO).HasColumnName("ERP_ORDER_NO");
        }
    }
}
