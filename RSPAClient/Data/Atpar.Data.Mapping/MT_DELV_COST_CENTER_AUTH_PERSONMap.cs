using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_DELV_COST_CENTER_AUTH_PERSONMap : EntityTypeConfiguration<MT_DELV_COST_CENTER_AUTH_PERSON>
    {
        public MT_DELV_COST_CENTER_AUTH_PERSONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.COST_CENTER_CODE, t.AUTH_USER_ID });

            // Properties
            this.Property(t => t.COST_CENTER_CODE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.AUTH_USER_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.FIRST_NAME)
                .HasMaxLength(50);

            this.Property(t => t.LAST_NAME)
                .HasMaxLength(50);

            this.Property(t => t.MIDDLE_NAME)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_DELV_COST_CENTER_AUTH_PERSON");
            this.Property(t => t.COST_CENTER_CODE).HasColumnName("COST_CENTER_CODE");
            this.Property(t => t.AUTH_USER_ID).HasColumnName("AUTH_USER_ID");
            this.Property(t => t.FIRST_NAME).HasColumnName("FIRST_NAME");
            this.Property(t => t.LAST_NAME).HasColumnName("LAST_NAME");
            this.Property(t => t.MIDDLE_NAME).HasColumnName("MIDDLE_NAME");
        }
    }
}
