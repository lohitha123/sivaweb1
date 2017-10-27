using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_SHIPTO_IDSMap : EntityTypeConfiguration<RM_SHIPTO_IDS>
    {
        public RM_SHIPTO_IDSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.SHIPTO_ID });

            // Properties
            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SHIPTO_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.SHIPTO_NAME)
                .HasMaxLength(50);

            this.Property(t => t.ADDRESS_1)
                .HasMaxLength(254);

            this.Property(t => t.CITY)
                .HasMaxLength(20);

            this.Property(t => t.STATE)
                .HasMaxLength(10);

            this.Property(t => t.ZIP)
                .HasMaxLength(10);

            this.Property(t => t.PHONE_NO)
                .HasMaxLength(50);

            this.Property(t => t.ATTENTION_TO)
                .HasMaxLength(10);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("RM_SHIPTO_IDS");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.SHIPTO_ID).HasColumnName("SHIPTO_ID");
            this.Property(t => t.SHIPTO_NAME).HasColumnName("SHIPTO_NAME");
            this.Property(t => t.ADDRESS_1).HasColumnName("ADDRESS_1");
            this.Property(t => t.CITY).HasColumnName("CITY");
            this.Property(t => t.STATE).HasColumnName("STATE");
            this.Property(t => t.ZIP).HasColumnName("ZIP");
            this.Property(t => t.PHONE_NO).HasColumnName("PHONE_NO");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.ATTENTION_TO).HasColumnName("ATTENTION_TO");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
        }
    }
}
