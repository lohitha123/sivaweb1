using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_STIS_DISTRIB_TYPEMap : EntityTypeConfiguration<MT_STIS_DISTRIB_TYPE>
    {
        public MT_STIS_DISTRIB_TYPEMap()
        {
            //ignore
            this.Ignore(a => a.DESCR);
            // Primary Key
            this.HasKey(t => new { t.DISTRIB_TYPE, t.USER_ID, t.SET_ID });

            // Properties
            this.Property(t => t.DISTRIB_TYPE)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.SET_ID)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_STIS_DISTRIB_TYPE");
            this.Property(t => t.DISTRIB_TYPE).HasColumnName("DISTRIB_TYPE");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.UPDATE_USER).HasColumnName("UPDATE_USER");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.SET_ID).HasColumnName("SET_ID");
        }
    }
}
