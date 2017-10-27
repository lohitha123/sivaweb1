using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_PHYSICIANMap : EntityTypeConfiguration<MT_POU_PHYSICIAN>
    {
        public MT_POU_PHYSICIANMap()
        {
            // Primary Key
            this.HasKey(t => t.PHYSICIAN_ID);

            // Properties
            this.Property(t => t.PHYSICIAN_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.FIRST_NAME)
                .HasMaxLength(50);

            this.Property(t => t.LAST_NAME)
                .HasMaxLength(50);

            this.Property(t => t.MIDDLE_INITIAL)
                .HasMaxLength(20);

            this.Property(t => t.UPDATE_USERID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_POU_PHYSICIAN");
            this.Property(t => t.PHYSICIAN_ID).HasColumnName("PHYSICIAN_ID");
            this.Property(t => t.FIRST_NAME).HasColumnName("FIRST_NAME");
            this.Property(t => t.LAST_NAME).HasColumnName("LAST_NAME");
            this.Property(t => t.MIDDLE_INITIAL).HasColumnName("MIDDLE_INITIAL");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USERID).HasColumnName("UPDATE_USERID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
