using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_SCHEDULE_HEADERMap : EntityTypeConfiguration<MT_ATPAR_SCHEDULE_HEADER>
    {
        public MT_ATPAR_SCHEDULE_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.SCHEDULE_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SCHEDULE_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(50);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            this.Property(t => t.CREATED_USER)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_SCHEDULE_HEADER");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.SCHEDULE_ID).HasColumnName("SCHEDULE_ID");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.SCHEDULE_TYPE).HasColumnName("SCHEDULE_TYPE");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
            this.Property(t => t.CREATED_USER).HasColumnName("CREATED_USER");
            this.Property(t => t.CREATED_DATE).HasColumnName("CREATED_DATE");
            this.Property(t => t.START_TIME).HasColumnName("START_TIME");
            this.Property(t => t.END_TIME).HasColumnName("END_TIME");
            this.Property(t => t.INTERVAL).HasColumnName("INTERVAL");
        }
    }
}
