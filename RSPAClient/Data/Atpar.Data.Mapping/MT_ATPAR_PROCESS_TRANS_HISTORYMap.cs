using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PROCESS_TRANS_HISTORYMap : EntityTypeConfiguration<MT_ATPAR_PROCESS_TRANS_HISTORY>
    {
        public MT_ATPAR_PROCESS_TRANS_HISTORYMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.ID });

            // Properties
            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SCHEDULE_ID)
                .HasMaxLength(50);

            this.Property(t => t.ERROR_DESCR)
                .HasMaxLength(4000);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PROCESS_TRANS_HISTORY");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.SCHEDULE_ID).HasColumnName("SCHEDULE_ID");
            this.Property(t => t.SCHEDULE_DAY).HasColumnName("SCHEDULE_DAY");
            this.Property(t => t.SCHEDULE_TIME).HasColumnName("SCHEDULE_TIME");
            this.Property(t => t.ERROR_DESCR).HasColumnName("ERROR_DESCR");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
