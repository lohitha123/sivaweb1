using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_PREF_LIST_HEADERMap : EntityTypeConfiguration<MT_POU_PREF_LIST_HEADER>
    {
        public MT_POU_PREF_LIST_HEADERMap()
        {
            this.Ignore(t => t.DESCRIPTION);
            this.Ignore(t => t.PREFERENCENAME);
            this.Ignore(t => t.PREFLISTNAME);
            this.Ignore(t => t.PREF_PROCEDURES);
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

            this.Property(t => t.UPDATE_USERID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PROCEDURE_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PHYSICIAN_ID)
                .HasMaxLength(30);

            //Ignore properties
            this.Ignore(t => t.DESCRIPTION);
            this.Ignore(t => t.PREFERENCENAME);
            this.Ignore(t => t.PREFLISTNAME);
            this.Ignore(t => t.PREF_PROCEDURES);

            // Table & Column Mappings
            this.ToTable("MT_POU_PREF_LIST_HEADER");
            this.Property(t => t.PREF_LIST_ID).HasColumnName("PREF_LIST_ID");
            this.Property(t => t.PREF_LIST_DESCR).HasColumnName("PREF_LIST_DESCR");
            this.Property(t => t.DEPARTMENT_ID).HasColumnName("DEPARTMENT_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USERID).HasColumnName("UPDATE_USERID");
            this.Property(t => t.PROCEDURE_ID).HasColumnName("PROCEDURE_ID");
            this.Property(t => t.PHYSICIAN_ID).HasColumnName("PHYSICIAN_ID");
        }
    }
}
