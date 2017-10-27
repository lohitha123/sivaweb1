using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_QMap : EntityTypeConfiguration<MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_Q>
    {
        public MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_QMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SPECIALTY_CODE, t.DIAGNOSIS_CODE, t.DIAGNOSIS_CODE_TYPE, t.PERIOD, t.YEAR });

            // Properties
            this.Property(t => t.SPECIALTY_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.SPECIALTY_DESCRIPTION)
                .HasMaxLength(50);

            this.Property(t => t.DIAGNOSIS_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DIAGNOSIS_DESCRIPTION)
                .IsRequired()
                .HasMaxLength(254);

            this.Property(t => t.DIAGNOSIS_CODE_TYPE)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
                       
            this.Property(t => t.PERIOD)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.YEAR)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_Q", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.SPECIALTY_CODE).HasColumnName("SPECIALTY_CODE");
            this.Property(t => t.SPECIALTY_DESCRIPTION).HasColumnName("SPECIALTY_DESCRIPTION");           
            this.Property(t => t.DIAGNOSIS_CODE).HasColumnName("DIAGNOSIS_CODE");
            this.Property(t => t.DIAGNOSIS_DESCRIPTION).HasColumnName("DIAGNOSIS_DESCRIPTION");
            this.Property(t => t.DIAGNOSIS_CODE_TYPE).HasColumnName("DIAGNOSIS_CODE_TYPE");          
            this.Property(t => t.NO_OF_PHYSICIANS).HasColumnName("NO_OF_PHYSICIANS");
            this.Property(t => t.NO_OF_PROCEDURES).HasColumnName("NO_OF_PROCEDURES");
            this.Property(t => t.MAX_USAGE).HasColumnName("MAX_USAGE");
            this.Property(t => t.MIN_USAGE).HasColumnName("MIN_USAGE");
            this.Property(t => t.TOTAL_VARIANCE).HasColumnName("TOTAL_VARIANCE");
            this.Property(t => t.TOTAL_SPEND).HasColumnName("TOTAL_SPEND");
            this.Property(t => t.TOTAL_ANNUAL_SPEND).HasColumnName("TOTAL_ANNUAL_SPEND");
            this.Property(t => t.PERIOD).HasColumnName("PERIOD");
            this.Property(t => t.YEAR).HasColumnName("YEAR");
        }
    }
}
