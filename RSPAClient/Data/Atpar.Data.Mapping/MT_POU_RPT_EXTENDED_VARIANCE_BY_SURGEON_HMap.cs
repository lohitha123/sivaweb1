using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_HMap : EntityTypeConfiguration<MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_H>
    {
        public MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_HMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SPECIALTY_CODE, t.DIAGNOSIS_CODE, t.PHYSICIAN_ID, t.DIAGNOSIS_CODE_TYPE, t.PERIOD, t.YEAR });

            // Properties
            this.Property(t => t.SPECIALTY_CODE)
                .IsRequired()
                .HasMaxLength(20);
                       
            this.Property(t => t.PHYSICIAN_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.PHYSICIAN_NAME)
                .IsRequired()
                .HasMaxLength(120);

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
            this.ToTable("MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_H", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.SPECIALTY_CODE).HasColumnName("SPECIALTY_CODE");           
            this.Property(t => t.PHYSICIAN_ID).HasColumnName("PHYSICIAN_ID");
            this.Property(t => t.PHYSICIAN_NAME).HasColumnName("PHYSICIAN_NAME");
            this.Property(t => t.DIAGNOSIS_CODE).HasColumnName("DIAGNOSIS_CODE");
            this.Property(t => t.DIAGNOSIS_DESCRIPTION).HasColumnName("DIAGNOSIS_DESCRIPTION");
            this.Property(t => t.DIAGNOSIS_CODE_TYPE).HasColumnName("DIAGNOSIS_CODE_TYPE");           
            this.Property(t => t.NO_OF_PROCEDURES).HasColumnName("NO_OF_PROCEDURES");
            this.Property(t => t.MIN_PROC_COST).HasColumnName("MIN_PROC_COST");
            this.Property(t => t.MAX_PROC_COST).HasColumnName("MAX_PROC_COST");
            this.Property(t => t.AVG_PROC_COST).HasColumnName("AVG_PROC_COST");
            this.Property(t => t.TOTAL_SPEND).HasColumnName("TOTAL_SPEND");
            this.Property(t => t.PER_VAR_TOTAL_SPEND).HasColumnName("PER_VAR_TOTAL_SPEND");
            this.Property(t => t.PHYSICIAN_RANK).HasColumnName("PHYSICIAN_RANK");
            this.Property(t => t.NO_OF_PHY_DEPT).HasColumnName("NO_OF_PHY_DEPT");
            this.Property(t => t.NO_OF_PROCS_DEPT).HasColumnName("NO_OF_PROCS_DEPT");
            this.Property(t => t.LOW_COST_AVG_DEPT).HasColumnName("LOW_COST_AVG_DEPT");
            this.Property(t => t.MIN_PROC_VARIANCE).HasColumnName("MIN_PROC_VARIANCE");
            this.Property(t => t.EXTENDED_VARIANCE).HasColumnName("EXTENDED_VARIANCE");
            this.Property(t => t.PERIOD).HasColumnName("PERIOD");
            this.Property(t => t.YEAR).HasColumnName("YEAR");
        }
    }
}
