using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_AUDIT_SCREEN_CONTROLSMap : EntityTypeConfiguration<MT_ATPAR_AUDIT_SCREEN_CONTROLS>
    {
        public MT_ATPAR_AUDIT_SCREEN_CONTROLSMap()
        {
            //ignoring parameter_value field in database
            this.Ignore(x => x.PARAMETER_VALUE);

            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.FUNCTION_NAME, t.TABLE_NAME, t.FIELD_NAME, t.SUBFUNCTION_NAME, t.KEY_FLAG });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.FUNCTION_NAME)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.TABLE_NAME)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.FIELD_NAME)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.FIELD_TYPE)
                .HasMaxLength(50);

            this.Property(t => t.SUBFUNCTION_NAME)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_FLAG)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.FRIENDLY_NAME)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_AUDIT_SCREEN_CONTROLS");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.FUNCTION_NAME).HasColumnName("FUNCTION_NAME");
            this.Property(t => t.TABLE_NAME).HasColumnName("TABLE_NAME");
            this.Property(t => t.FIELD_NAME).HasColumnName("FIELD_NAME");
            this.Property(t => t.FIELD_TYPE).HasColumnName("FIELD_TYPE");
            this.Property(t => t.SUBFUNCTION_NAME).HasColumnName("SUBFUNCTION_NAME");
            this.Property(t => t.KEY_FLAG).HasColumnName("KEY_FLAG");
            this.Property(t => t.FRIENDLY_NAME).HasColumnName("FRIENDLY_NAME");
        }
    }
}
