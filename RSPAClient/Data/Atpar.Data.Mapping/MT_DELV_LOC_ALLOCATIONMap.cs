using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_DELV_LOC_ALLOCATIONMap : EntityTypeConfiguration<MT_DELV_LOC_ALLOCATION>
    {
        public MT_DELV_LOC_ALLOCATIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SETID, t.LOCATION, t.USER_ID });

            // Properties
            this.Property(t => t.SETID)
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.LOCATION)
                .IsRequired()
                .HasMaxLength(25);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(40);

            // Table & Column Mappings
            this.ToTable("MT_DELV_LOC_ALLOCATION");
            this.Property(t => t.SETID).HasColumnName("SETID");
            this.Property(t => t.LOCATION).HasColumnName("LOCATION");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.LOC_ORDER).HasColumnName("LOC_ORDER");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
        }
    }
}
