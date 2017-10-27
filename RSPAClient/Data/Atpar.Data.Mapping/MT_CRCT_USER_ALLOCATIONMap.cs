using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CRCT_USER_ALLOCATIONMap : EntityTypeConfiguration<MT_CRCT_USER_ALLOCATION>
    {
        public MT_CRCT_USER_ALLOCATIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.CART_ID, t.USER_ID, t.BUSINESS_UNIT });

            this.Ignore(t => t.CRTID);
            this.Ignore(t => t.ORPHANCART);
            this.Ignore(t => t.FIRST_NAME);
            this.Ignore(t => t.LAST_NAME);
            this.Ignore(t => t.MIDDLE_INITIAL);
            this.Ignore(t => t.USERNAME);

            // Properties
            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.DESCR)
                .HasMaxLength(255);

            this.Property(t => t.SHADOW_FLAG)
                .HasMaxLength(1);

            this.Property(t => t.COUNT_BEFORE)
                .HasMaxLength(8);

            // Table & Column Mappings
            this.ToTable("MT_CRCT_USER_ALLOCATION");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.DESCR).HasColumnName("DESCR");
            this.Property(t => t.CART_COUNT_ORDER).HasColumnName("CART_COUNT_ORDER");
            this.Property(t => t.SHADOW_FLAG).HasColumnName("SHADOW_FLAG");
            this.Property(t => t.COUNT_BEFORE).HasColumnName("COUNT_BEFORE");
        }
    }
}
