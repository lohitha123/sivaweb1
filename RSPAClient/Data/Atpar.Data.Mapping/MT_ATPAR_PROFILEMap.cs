using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PROFILEMap : EntityTypeConfiguration<MT_ATPAR_PROFILE>
    {
        public MT_ATPAR_PROFILEMap()
        {
            // Primary Key
            this.HasKey(t => t.PROFILE_ID);

            // Properties
            this.Property(t => t.PROFILE_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.PROFILE_DESCRIPTION)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PROFILE");
            this.Property(t => t.PROFILE_ID).HasColumnName("PROFILE_ID");
            this.Property(t => t.PROFILE_DESCRIPTION).HasColumnName("PROFILE_DESCRIPTION");
        }
    }
}
