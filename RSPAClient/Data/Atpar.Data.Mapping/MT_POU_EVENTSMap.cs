using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_EVENTSMap : EntityTypeConfiguration<MT_POU_EVENTS>
    {
        public MT_POU_EVENTSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.EVENT_TYPE, t.USER_ID });

            // Properties
            this.Property(t => t.EVENT_TYPE)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.EMAIL_ID)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_POU_EVENTS");
            this.Property(t => t.EVENT_TYPE).HasColumnName("EVENT_TYPE");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.EVENT_DATE_TIME).HasColumnName("EVENT_DATE_TIME");
            this.Property(t => t.EMAIL_ID).HasColumnName("EMAIL_ID");
        }
    }
}
