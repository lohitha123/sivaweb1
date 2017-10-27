using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RF_EMPTY_BIN_DETAILSMap : EntityTypeConfiguration<RF_EMPTY_BIN_DETAILS>
    {
        public RF_EMPTY_BIN_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.CART_ID });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.COMPRT)
                .HasMaxLength(10);

            this.Property(t => t.USER_FIELD_1)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("RF_EMPTY_BIN_DETAILS");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.COMPRT).HasColumnName("COMPRT");
            this.Property(t => t.USER_FIELD_1).HasColumnName("USER_FIELD_1");
            this.Property(t => t.ENTRY_DTTM).HasColumnName("ENTRY_DTTM");
        }
    }
}
