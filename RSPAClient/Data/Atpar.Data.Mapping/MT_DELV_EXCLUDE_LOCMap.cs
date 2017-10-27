using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_DELV_EXCLUDE_LOCMap : EntityTypeConfiguration<MT_DELV_EXCLUDE_LOC>
    {
        public MT_DELV_EXCLUDE_LOCMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SETID, t.LOCATION });

            // Properties
            this.Property(t => t.SETID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOCATION)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.CHK_ALLOCATED);
            this.Ignore(t => t.ROWINDEX);
            this.Ignore(t => t.LOCATION_DESC);

            // Table & Column Mappings
            this.ToTable("MT_DELV_EXCLUDE_LOC");
            this.Property(t => t.SETID).HasColumnName("SETID");
            this.Property(t => t.LOCATION).HasColumnName("LOCATION");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
        }
    }
}
