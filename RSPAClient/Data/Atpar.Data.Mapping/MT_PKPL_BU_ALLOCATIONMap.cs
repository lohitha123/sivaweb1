using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_PKPL_BU_ALLOCATIONMap : EntityTypeConfiguration<MT_PKPL_BU_ALLOCATION>
    {
        public MT_PKPL_BU_ALLOCATIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.USER_ID });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_PKPL_BU_ALLOCATION");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
        }
    }
}
