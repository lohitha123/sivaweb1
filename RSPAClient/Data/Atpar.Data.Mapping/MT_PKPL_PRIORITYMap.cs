using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_PKPL_PRIORITYMap : EntityTypeConfiguration<MT_PKPL_PRIORITY>
    {
        public MT_PKPL_PRIORITYMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.LOCATION });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.LOCATION)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.SETID)
                .HasMaxLength(5);

            this.Property(t => t.DESCR)
                .HasMaxLength(30);

            // Ignoring the properties
            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.CHK_ALLOCATED);
            this.Ignore(t => t.ROWINDEX);

            // Table & Column Mappings
            this.ToTable("MT_PKPL_PRIORITY");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.LOCATION).HasColumnName("LOCATION");
            this.Property(t => t.PRIORITY).HasColumnName("PRIORITY");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.SETID).HasColumnName("SETID");
            this.Property(t => t.DESCR).HasColumnName("DESCR");
        }
    }
}
