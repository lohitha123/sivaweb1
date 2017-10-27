using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_RPT_POU_SETUP_DETAILMap : EntityTypeConfiguration<MT_RPT_POU_SETUP_DETAIL>
    {
        public MT_RPT_POU_SETUP_DETAILMap()
        {
            // Primary Key
            this.HasKey(t => new { t.CART_ID, t.DEPARTMENT_ID, t.WORKSTATION_ID, t.BUSINESS_UNIT, t.ORG_GROUP_ID, t.LOCATION_TYPE });

            // Properties
            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DEPARTMENT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.WORKSTATION_ID)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOCATION_TYPE)
                .IsRequired()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_RPT_POU_SETUP_DETAIL", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.DEPARTMENT_ID).HasColumnName("DEPARTMENT_ID");
            this.Property(t => t.WORKSTATION_ID).HasColumnName("WORKSTATION_ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.LOCATION_TYPE).HasColumnName("LOCATION_TYPE");
            this.Property(t => t.PRIORITY).HasColumnName("PRIORITY");
        }
    }
}
