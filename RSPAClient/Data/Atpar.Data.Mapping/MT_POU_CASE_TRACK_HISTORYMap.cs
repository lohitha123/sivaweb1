using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_CASE_TRACK_HISTORYMap : EntityTypeConfiguration<MT_POU_CASE_TRACK_HISTORY>
    {
        public MT_POU_CASE_TRACK_HISTORYMap()
        {
            // Primary Key
            this.HasKey(t => t.ID);

            // Properties
            this.Property(t => t.CASE_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PREF_LIST_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PROCEDURE_CODE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PATIENT_ID)
                .HasMaxLength(50);

            this.Property(t => t.DEPARTMENT_ID)
                .HasMaxLength(50);

            this.Property(t => t.UPDATE_USER_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.WORKSTATION_MAC_ADDRESS)
                .HasMaxLength(100);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(250);

            // Table & Column Mappings
            this.ToTable("MT_POU_CASE_TRACK_HISTORY");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.CASE_ID).HasColumnName("CASE_ID");
            this.Property(t => t.PREF_LIST_ID).HasColumnName("PREF_LIST_ID");
            this.Property(t => t.PROCEDURE_CODE).HasColumnName("PROCEDURE_CODE");
            this.Property(t => t.PATIENT_ID).HasColumnName("PATIENT_ID");
            this.Property(t => t.DEPARTMENT_ID).HasColumnName("DEPARTMENT_ID");
            this.Property(t => t.CASE_STATUS).HasColumnName("CASE_STATUS");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.WORKSTATION_MAC_ADDRESS).HasColumnName("WORKSTATION_MAC_ADDRESS");
            this.Property(t => t.UPDATE_DT_TIME).HasColumnName("UPDATE_DT_TIME");
            this.Property(t => t.CASE_PICK_STATUS).HasColumnName("CASE_PICK_STATUS");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.CHARGE_CAPTURE_TRANS_ID).HasColumnName("CHARGE_CAPTURE_TRANS_ID");
            this.Property(t => t.PERFORM_DATE).HasColumnName("PERFORM_DATE");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
        }
    }
}
