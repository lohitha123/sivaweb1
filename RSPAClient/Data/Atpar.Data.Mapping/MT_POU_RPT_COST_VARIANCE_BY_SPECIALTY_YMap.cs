using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_YMap : EntityTypeConfiguration<MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_Y>
    {
        public MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_YMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SPECIALTY_CODE, t.DIAGNOSIS_CODE_TYPE, t.YEAR });

            // Properties
            this.Property(t => t.SPECIALTY_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.SPECIALTY_DESCRIPTION)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DIAGNOSIS_CODE_TYPE)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.YEAR)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_Y", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.SPECIALTY_CODE).HasColumnName("SPECIALTY_CODE");
            this.Property(t => t.SPECIALTY_DESCRIPTION).HasColumnName("SPECIALTY_DESCRIPTION");
            this.Property(t => t.NO_OF_PROCEDURES).HasColumnName("NO_OF_PROCEDURES");
            this.Property(t => t.NO_OF_PHYSICIANS).HasColumnName("NO_OF_PHYSICIANS");
            this.Property(t => t.TOTAL_SPEND).HasColumnName("TOTAL_SPEND");
            this.Property(t => t.TOTAL_VARIANCE).HasColumnName("TOTAL_VARIANCE");
            this.Property(t => t.DIAGNOSIS_CODE_TYPE).HasColumnName("DIAGNOSIS_CODE_TYPE");
            this.Property(t => t.YEAR).HasColumnName("YEAR");
        }
    }
}
