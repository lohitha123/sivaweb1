using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_SHIP_TO_LOCACTIONMap : EntityTypeConfiguration<RM_SHIP_TO_LOCACTION>
    {
        public RM_SHIP_TO_LOCACTIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.LOCATION_ID });

            // Properties
            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOCATION_ID)
                .IsRequired()
                .HasMaxLength(25);

            this.Property(t => t.LOCATION_NAME)
                .HasMaxLength(255);

            this.Property(t => t.ADDRESS_1)
                .HasMaxLength(255);

            this.Property(t => t.ADDRESS_2)
                .HasMaxLength(255);

            this.Property(t => t.CITY)
                .HasMaxLength(255);

            this.Property(t => t.STATE)
                .HasMaxLength(10);

            this.Property(t => t.ZIP)
                .HasMaxLength(10);

            this.Property(t => t.PHONE_NO)
                .HasMaxLength(10);

            this.Property(t => t.ATTENTION_TO)
                .HasMaxLength(10);

            this.Property(t => t.EMAIL)
                .HasMaxLength(50);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(50);

            this.Property(t => t.DEPARTMENT_ID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("RM_SHIP_TO_LOCACTION");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.LOCATION_ID).HasColumnName("LOCATION_ID");
            this.Property(t => t.LOCATION_NAME).HasColumnName("LOCATION_NAME");
            this.Property(t => t.ADDRESS_1).HasColumnName("ADDRESS_1");
            this.Property(t => t.ADDRESS_2).HasColumnName("ADDRESS_2");
            this.Property(t => t.CITY).HasColumnName("CITY");
            this.Property(t => t.STATE).HasColumnName("STATE");
            this.Property(t => t.ZIP).HasColumnName("ZIP");
            this.Property(t => t.PHONE_NO).HasColumnName("PHONE_NO");
            this.Property(t => t.ATTENTION_TO).HasColumnName("ATTENTION_TO");
            this.Property(t => t.EMAIL).HasColumnName("EMAIL");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
            this.Property(t => t.DEPARTMENT_ID).HasColumnName("DEPARTMENT_ID");
        }
    }
}
