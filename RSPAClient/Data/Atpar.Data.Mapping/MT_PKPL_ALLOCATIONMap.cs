using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_PKPL_ALLOCATIONMap : EntityTypeConfiguration<MT_PKPL_ALLOCATION>
    {
        public MT_PKPL_ALLOCATIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.LOCATION, t.USER_ID });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.LOCATION)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DESCR)
                .HasMaxLength(50);

            this.Property(t => t.SETID)
                .HasMaxLength(5);

            // Table & Column Mappings
            this.ToTable("MT_PKPL_ALLOCATION");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.LOCATION).HasColumnName("LOCATION");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.DESCR).HasColumnName("DESCR");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.SETID).HasColumnName("SETID");
        }
    }
}
