using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_TOKENSMap : EntityTypeConfiguration<MT_ATPAR_TOKENS>
    {
        public MT_ATPAR_TOKENSMap()
        {
            this.Ignore(t => t.PRODUCTS_ACCESS);
            // Primary Key
            this.HasKey(t => t.ACCESS_TOKEN);

            // Properties
            this.Property(t => t.ACCESS_TOKEN)
                .IsRequired()
                .HasMaxLength(64);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DEVICE_ID)
                .HasMaxLength(150);

            this.Property(t => t.PROFILE_ID)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_TOKENS");
            this.Property(t => t.ACCESS_TOKEN).HasColumnName("ACCESS_TOKEN");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.DEVICE_ID).HasColumnName("DEVICE_ID");
            this.Property(t => t.EXPIRY_TIME).HasColumnName("EXPIRY_TIME");
            this.Property(t => t.REQUEST_TIME).HasColumnName("REQUEST_TIME");
            this.Property(t => t.PROFILE_ID).HasColumnName("PROFILE_ID");
            this.Property(t => t.IDLE_TIME).HasColumnName("IDLE_TIME");
           
        }
    }
}
