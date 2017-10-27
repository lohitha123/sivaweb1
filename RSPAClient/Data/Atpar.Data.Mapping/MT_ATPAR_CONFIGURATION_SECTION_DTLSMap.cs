using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_CONFIGURATION_SECTION_DTLSMap : EntityTypeConfiguration<MT_ATPAR_CONFIGURATION_SECTION_DTLS>
    {
        public MT_ATPAR_CONFIGURATION_SECTION_DTLSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TAB_ID, t.PARAMETER_ID });

            // Properties
            this.Property(t => t.TAB_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.TAB_NAME)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PARAMETER_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.FRIENDLY_NAME)
                .HasMaxLength(100);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(255);

            this.Property(t => t.TYPE)
                .HasMaxLength(50);

            this.Property(t => t.VALIDATION_RULES)
                .HasMaxLength(50);

            this.Property(t => t.DEFAULT_VALUE)
                .HasMaxLength(255);

            this.Property(t => t.PARAMETER_VALUE)
                .HasMaxLength(255);

            this.Property(t => t.TOOL_TIP_INFO)
                .HasMaxLength(50);

            this.Property(t => t.VALID_FOR_ERP)
                .HasMaxLength(255);

            this.Property(t => t.DISPLAY_FLAG)
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_CONFIGURATION_SECTION_DTLS");
            this.Property(t => t.TAB_ID).HasColumnName("TAB_ID");
            this.Property(t => t.TAB_NAME).HasColumnName("TAB_NAME");
            this.Property(t => t.PARAMETER_ID).HasColumnName("PARAMETER_ID");
            this.Property(t => t.FRIENDLY_NAME).HasColumnName("FRIENDLY_NAME");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.TYPE).HasColumnName("TYPE");
            this.Property(t => t.VALIDATION_RULES).HasColumnName("VALIDATION_RULES");
            this.Property(t => t.DEFAULT_VALUE).HasColumnName("DEFAULT_VALUE");
            this.Property(t => t.PARAMETER_VALUE).HasColumnName("PARAMETER_VALUE");
            this.Property(t => t.TOOL_TIP_INFO).HasColumnName("TOOL_TIP_INFO");
            this.Property(t => t.VALID_FOR_ERP).HasColumnName("VALID_FOR_ERP");
            this.Property(t => t.DISPLAY_FLAG).HasColumnName("DISPLAY_FLAG");
            this.Property(t => t.DISPLAY_ORDER).HasColumnName("DISPLAY_ORDER");
        }
    }
}
