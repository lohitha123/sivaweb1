using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CRCT_USER_SCHEDULEMap : EntityTypeConfiguration<MT_CRCT_USER_SCHEDULE>
    {
        public MT_CRCT_USER_SCHEDULEMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.CART_ID, t.USER_ID, t.DAY });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DAY)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_CRCT_USER_SCHEDULE");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.DAY).HasColumnName("DAY");
        }
    }
}
