using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_LOGIN_HISTORYMap : EntityTypeConfiguration<MT_ATPAR_LOGIN_HISTORY>
    {
        public MT_ATPAR_LOGIN_HISTORYMap()
        {
            // Primary Key
            this.HasKey(t => new { t.USER_ID, t.DEVICE_ID, t.DEVICE_TOKEN, t.LOGIN_DATE_TIME });

            // Properties
            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DEVICE_ID)
                .IsRequired()
                .HasMaxLength(150);

            this.Property(t => t.DEVICE_TOKEN)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.REASON_CODE)
                .HasMaxLength(2000);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_LOGIN_HISTORY");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.DEVICE_ID).HasColumnName("DEVICE_ID");
            this.Property(t => t.DEVICE_TOKEN).HasColumnName("DEVICE_TOKEN");
            this.Property(t => t.LOGIN_DATE_TIME).HasColumnName("LOGIN_DATE_TIME");
            this.Property(t => t.REASON_CODE).HasColumnName("REASON_CODE");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
