using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_STIS_DEST_LOC_ALLOCATIONMap : EntityTypeConfiguration<MT_STIS_DEST_LOC_ALLOCATION>
    {
        public MT_STIS_DEST_LOC_ALLOCATIONMap()
        {
            //Ignore properties
            this.Ignore(t => t.ROWINDEX);
            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.CHK_ALLOCATED);
            this.Ignore(t => t.USERNAME);
            this.Ignore(t => t.LOCATION_DESC);
            

            // Primary Key
            this.HasKey(t => new { t.LOCATION_ID, t.USER_ID, t.BUSINESS_UNIT });

            // Properties
            this.Property(t => t.LOCATION_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_STIS_DEST_LOC_ALLOCATION");
            this.Property(t => t.LOCATION_ID).HasColumnName("LOCATION_ID");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.UPDATE_USER).HasColumnName("UPDATE_USER");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
        }
    }
}
