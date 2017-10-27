using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_SCHEDULE_DETAILMap : EntityTypeConfiguration<MT_ATPAR_SCHEDULE_DETAIL>
    {
        public MT_ATPAR_SCHEDULE_DETAILMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.SCHEDULE_ID, t.SCHEDULE_DAY, t.SCHEDULE_TIME });

            this.Ignore(t => t.CHK_MON);
            this.Ignore(t => t.CHK_TUE);
            this.Ignore(t => t.CHK_WED);
            this.Ignore(t => t.CHK_THR);
            this.Ignore(t => t.CHK_FRI);
            this.Ignore(t => t.CHK_SAT);
            this.Ignore(t => t.CHK_SUN);

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SCHEDULE_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SCHEDULE_DAY)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_SCHEDULE_DETAIL");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.SCHEDULE_ID).HasColumnName("SCHEDULE_ID");
            this.Property(t => t.SCHEDULE_DAY).HasColumnName("SCHEDULE_DAY");
            this.Property(t => t.SCHEDULE_TIME).HasColumnName("SCHEDULE_TIME");
        }
    }
}
