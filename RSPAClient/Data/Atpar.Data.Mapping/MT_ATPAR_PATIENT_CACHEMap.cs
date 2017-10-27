using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PATIENT_CACHEMap : EntityTypeConfiguration<MT_ATPAR_PATIENT_CACHE>
    {
        public MT_ATPAR_PATIENT_CACHEMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.PATIENT_MRC, t.PATIENT_ACCNUMBER });

            // Properties
            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PATIENT_MRC)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PATIENT_ACCNUMBER)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PATIENT_NAME)
                .IsRequired()
                .HasMaxLength(150);

            this.Property(t => t.PATIENT_BEDNUMBER)
                .HasMaxLength(50);

            this.Property(t => t.PATIENT_DEPARTMENT)
                .HasMaxLength(50);

            this.Property(t => t.PATIENT_SEX)
                .HasMaxLength(50);

            this.Property(t => t.PATIENT_CLASS)
                .HasMaxLength(50);

            this.Property(t => t.PATIENT_VISIT_NUMBER)
                .HasMaxLength(20);

            this.Property(t => t.STATUS)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.OLD_PATIENT_MRC)
                .HasMaxLength(50);

            this.Ignore(t => t.ITEM_ID);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PATIENT_CACHE");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.PATIENT_MRC).HasColumnName("PATIENT_MRC");
            this.Property(t => t.PATIENT_ACCNUMBER).HasColumnName("PATIENT_ACCNUMBER");
            this.Property(t => t.PATIENT_NAME).HasColumnName("PATIENT_NAME");
            this.Property(t => t.PATIENT_BEDNUMBER).HasColumnName("PATIENT_BEDNUMBER");
            this.Property(t => t.PATIENT_DEPARTMENT).HasColumnName("PATIENT_DEPARTMENT");
            this.Property(t => t.PATIENT_SEX).HasColumnName("PATIENT_SEX");
            this.Property(t => t.PATIENT_CLASS).HasColumnName("PATIENT_CLASS");
            this.Property(t => t.MESSAGE_DATETIME).HasColumnName("MESSAGE_DATETIME");
            this.Property(t => t.PATIENT_ADMIT_DATE).HasColumnName("PATIENT_ADMIT_DATE");
            this.Property(t => t.PATIENT_DISCHARGE_DATE).HasColumnName("PATIENT_DISCHARGE_DATE");
            this.Property(t => t.PATIENT_VISIT_NUMBER).HasColumnName("PATIENT_VISIT_NUMBER");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.OLD_PATIENT_MRC).HasColumnName("OLD_PATIENT_MRC");
        }
    }
}
