using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_RPT_POU_PROCEDURE_PREF_SETUP_HEADERMap : EntityTypeConfiguration<MT_RPT_POU_PROCEDURE_PREF_SETUP_HEADER>
    {
        public MT_RPT_POU_PROCEDURE_PREF_SETUP_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.PREF_LIST_ID, t.PROCEDURE_ID });

            // Properties
            this.Property(t => t.PREF_LIST_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PREF_LIST_DESCR)
                .HasMaxLength(50);

            this.Property(t => t.DEPARTMENT_ID)
                .HasMaxLength(50);

            this.Property(t => t.PROCEDURE_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PHYSICIAN_ID)
                .HasMaxLength(30);

            this.Property(t => t.PROCEDURE_CODE)
                .HasMaxLength(20);

            this.Property(t => t.DESCRIPTION)
                .IsRequired()
                .HasMaxLength(254);

            this.Property(t => t.SPECIALTY_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.SC_DESCRIPTION)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.FIRST_NAME)
                .HasMaxLength(50);

            this.Property(t => t.LAST_NAME)
                .HasMaxLength(50);

            this.Property(t => t.MIDDLE_INITIAL)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_RPT_POU_PROCEDURE_PREF_SETUP_HEADER", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.PREF_LIST_ID).HasColumnName("PREF_LIST_ID");
            this.Property(t => t.PREF_LIST_DESCR).HasColumnName("PREF_LIST_DESCR");
            this.Property(t => t.DEPARTMENT_ID).HasColumnName("DEPARTMENT_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.PROCEDURE_ID).HasColumnName("PROCEDURE_ID");
            this.Property(t => t.PHYSICIAN_ID).HasColumnName("PHYSICIAN_ID");
            this.Property(t => t.PROCEDURE_CODE).HasColumnName("PROCEDURE_CODE");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.PC_STATUS).HasColumnName("PC_STATUS");
            this.Property(t => t.SPECIALTY_CODE).HasColumnName("SPECIALTY_CODE");
            this.Property(t => t.SC_DESCRIPTION).HasColumnName("SC_DESCRIPTION");
            this.Property(t => t.SC_STATUS).HasColumnName("SC_STATUS");
            this.Property(t => t.FIRST_NAME).HasColumnName("FIRST_NAME");
            this.Property(t => t.LAST_NAME).HasColumnName("LAST_NAME");
            this.Property(t => t.MIDDLE_INITIAL).HasColumnName("MIDDLE_INITIAL");
            this.Property(t => t.P_STATUS).HasColumnName("P_STATUS");
        }
    }
}
