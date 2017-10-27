using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_PTWY_DEVIATION_HEADERMap : EntityTypeConfiguration<MT_POU_PTWY_DEVIATION_HEADER>
    {
        public MT_POU_PTWY_DEVIATION_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.PTWY_DATE_TIME, t.ORDER_ID });

            // Properties
            this.Property(t => t.USER_ID)
                .HasMaxLength(100);

            this.Property(t => t.ORDER_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.WORKSTATION_ID)
                .HasMaxLength(100);

            this.Property(t => t.CART_ID)
                .HasMaxLength(50);

            this.Property(t => t.BUSINESS_UNIT)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_PTWY_DEVIATION_HEADER");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.PTWY_DATE_TIME).HasColumnName("PTWY_DATE_TIME");
            this.Property(t => t.ORDER_ID).HasColumnName("ORDER_ID");
            this.Property(t => t.WORKSTATION_ID).HasColumnName("WORKSTATION_ID");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
        }
    }
}
