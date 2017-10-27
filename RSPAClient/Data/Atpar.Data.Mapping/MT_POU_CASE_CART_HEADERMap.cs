using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_CASE_CART_HEADERMap : EntityTypeConfiguration<MT_POU_CASE_CART_HEADER>
    {
        public MT_POU_CASE_CART_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.CASE_ID, t.PREF_LIST_ID, t.PROCEDURE_CODE });

            this.Ignore(t => t.CASEDESCR);
            this.Ignore(t => t.PHYSICIAN_DESCR);
            this.Ignore(t => t.PROC_DESCR);
            this.Ignore(t => t.PREF_DESCR);

            // Properties
            this.Property(t => t.CASE_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PATIENT_ID)
                .HasMaxLength(50);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(254);

            this.Property(t => t.PHYSICIAN)
                .HasMaxLength(50);

            this.Property(t => t.PREF_LIST_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.CREATE_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.ROOM_NO)
                .IsRequired()
                .HasMaxLength(25);

            this.Property(t => t.PROCEDURE_CODE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.EMERGENCY_CASE)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.MERGED_CASE_ID)
                .HasMaxLength(20);

            this.Property(t => t.DEPT_ID)
                .HasMaxLength(50);

            this.Property(t => t.COST_CENTER_CODE)
                .HasMaxLength(20);

            this.Property(t => t.SERVICE_CODE)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_POU_CASE_CART_HEADER");
            this.Property(t => t.CASE_ID).HasColumnName("CASE_ID");
            this.Property(t => t.PATIENT_ID).HasColumnName("PATIENT_ID");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.PHYSICIAN).HasColumnName("PHYSICIAN");
            this.Property(t => t.PREF_LIST_ID).HasColumnName("PREF_LIST_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.CREATE_DATE).HasColumnName("CREATE_DATE");
            this.Property(t => t.CREATE_USER_ID).HasColumnName("CREATE_USER_ID");
            this.Property(t => t.ROOM_NO).HasColumnName("ROOM_NO");
            this.Property(t => t.PERFORM_DATE).HasColumnName("PERFORM_DATE");
            this.Property(t => t.PROCEDURE_CODE).HasColumnName("PROCEDURE_CODE");
            this.Property(t => t.EMERGENCY_CASE).HasColumnName("EMERGENCY_CASE");
            this.Property(t => t.MERGED_CASE_ID).HasColumnName("MERGED_CASE_ID");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
            this.Property(t => t.PROCESSED_FILE_TYPE).HasColumnName("PROCESSED_FILE_TYPE");
            this.Property(t => t.COST_CENTER_CODE).HasColumnName("COST_CENTER_CODE");
            this.Property(t => t.SERVICE_CODE).HasColumnName("SERVICE_CODE");
        }
    }
}
