using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_DEPT_WORKSTATIONSMap : EntityTypeConfiguration<MT_POU_DEPT_WORKSTATIONS>
    {
        public MT_POU_DEPT_WORKSTATIONSMap()
        {
            this.Ignore(t => t.DETAILS);

            this.Ignore(t => t.Allocated);
          
            // Primary Key
            this.HasKey(t => new { t.DEPARTMENT_ID, t.WORKSTATION_ID, t.ORG_GROUP_ID });

            // Properties
            this.Property(t => t.DEPARTMENT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.WORKSTATION_ID)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.WORKSTATION_DESCR)
                .HasMaxLength(150);

            this.Property(t => t.WORKSTATION_MAC_ADDRESS)
                .HasMaxLength(100);

            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_DEPT_WORKSTATIONS");
            this.Property(t => t.DEPARTMENT_ID).HasColumnName("DEPARTMENT_ID");
            this.Property(t => t.WORKSTATION_ID).HasColumnName("WORKSTATION_ID");
            this.Property(t => t.WORKSTATION_DESCR).HasColumnName("WORKSTATION_DESCR");
            this.Property(t => t.WORKSTATION_MAC_ADDRESS).HasColumnName("WORKSTATION_MAC_ADDRESS");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
        }
    }
}
