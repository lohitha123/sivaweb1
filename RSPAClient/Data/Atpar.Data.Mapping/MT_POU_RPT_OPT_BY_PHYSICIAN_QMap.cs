using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_POU_RPT_OPT_BY_PHYSICIAN_QMap : EntityTypeConfiguration<MT_POU_RPT_OPT_BY_PHYSICIAN_Q>
    {
        public MT_POU_RPT_OPT_BY_PHYSICIAN_QMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SPECIALTY_CODE, t.PROCEDURE_CODE, t.PHYSICIAN_ID, t.PREF_LIST_ID, t.PERIOD, t.YEAR });

            // Properties
            this.Property(t => t.SPECIALTY_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PROCEDURE_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PROCEDURE_DESCRIPTION)
                .IsRequired()
                .HasMaxLength(254);

            this.Property(t => t.PHYSICIAN_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.PHYSICIAN_NAME)
                .IsRequired()
                .HasMaxLength(120);

            this.Property(t => t.PREF_LIST_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PREF_LIST_DESCRIPTION)
                .HasMaxLength(50);

            this.Property(t => t.PERIOD)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.YEAR)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_POU_RPT_OPT_BY_PHYSICIAN_Q", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.SPECIALTY_CODE).HasColumnName("SPECIALTY_CODE");
            this.Property(t => t.PROCEDURE_CODE).HasColumnName("PROCEDURE_CODE");
            this.Property(t => t.PROCEDURE_DESCRIPTION).HasColumnName("PROCEDURE_DESCRIPTION");
            this.Property(t => t.PHYSICIAN_ID).HasColumnName("PHYSICIAN_ID");
            this.Property(t => t.PHYSICIAN_NAME).HasColumnName("PHYSICIAN_NAME");
            this.Property(t => t.NO_OF_PROCEDURES).HasColumnName("NO_OF_PROCEDURES");
            this.Property(t => t.PREF_LIST_ID).HasColumnName("PREF_LIST_ID");
            this.Property(t => t.PREF_LIST_DESCRIPTION).HasColumnName("PREF_LIST_DESCRIPTION");
            this.Property(t => t.EFFICIENCY_PERCENTAGE).HasColumnName("EFFICIENCY_PERCENTAGE");
            this.Property(t => t.TOTAL_PICKED_QTY).HasColumnName("TOTAL_PICKED_QTY");
            this.Property(t => t.TOTAL_PICKED_VALUE).HasColumnName("TOTAL_PICKED_VALUE");
            this.Property(t => t.TOTAL_ISSUED_EXISTING_QTY).HasColumnName("TOTAL_ISSUED_EXISTING_QTY");
            this.Property(t => t.TOTAL_ISSUED_EXISTING_VALUE).HasColumnName("TOTAL_ISSUED_EXISTING_VALUE");
            this.Property(t => t.TOTAL_ISSUED_NEW_QTY).HasColumnName("TOTAL_ISSUED_NEW_QTY");
            this.Property(t => t.TOTAL_ISSUED_NEW_VALUE).HasColumnName("TOTAL_ISSUED_NEW_VALUE");
            this.Property(t => t.TOTAL_RETURN_QTY).HasColumnName("TOTAL_RETURN_QTY");
            this.Property(t => t.TOTAL_RETURN_VALUE).HasColumnName("TOTAL_RETURN_VALUE");
            this.Property(t => t.TOTAL_WASTED_QTY).HasColumnName("TOTAL_WASTED_QTY");
            this.Property(t => t.TOTAL_WASTED_VALUE).HasColumnName("TOTAL_WASTED_VALUE");
            this.Property(t => t.TOTAL_USAGE).HasColumnName("TOTAL_USAGE");
            this.Property(t => t.PERIOD).HasColumnName("PERIOD");
            this.Property(t => t.YEAR).HasColumnName("YEAR");
        }
    }
}
