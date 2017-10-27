using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_JOB_SCHEDULESMap : EntityTypeConfiguration<MT_ATPAR_JOB_SCHEDULES>
    {
        public MT_ATPAR_JOB_SCHEDULESMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SERVICE_NAME, t.JOB_ID, t.SCHEDULE_ID });

            // Properties
            this.Property(t => t.SERVICE_NAME)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.JOB_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SCHEDULE_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_JOB_SCHEDULES");
            this.Property(t => t.SERVICE_NAME).HasColumnName("SERVICE_NAME");
            this.Property(t => t.JOB_ID).HasColumnName("JOB_ID");
            this.Property(t => t.SCHEDULE_ID).HasColumnName("SCHEDULE_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
        }
    }
}
