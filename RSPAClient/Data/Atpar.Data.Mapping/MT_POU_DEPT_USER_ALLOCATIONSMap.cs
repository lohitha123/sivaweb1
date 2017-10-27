using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_DEPT_USER_ALLOCATIONSMap : EntityTypeConfiguration<MT_POU_DEPT_USER_ALLOCATIONS>
    {
        public MT_POU_DEPT_USER_ALLOCATIONSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.DEPARTMENT_ID, t.USER_ID, t.ORG_GROUP_ID });

            // Properties
            this.Property(t => t.DEPARTMENT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_DEPT_USER_ALLOCATIONS");
            this.Property(t => t.DEPARTMENT_ID).HasColumnName("DEPARTMENT_ID");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.HOME_DEPARTMENT).HasColumnName("HOME_DEPARTMENT");
        }
    }
}
