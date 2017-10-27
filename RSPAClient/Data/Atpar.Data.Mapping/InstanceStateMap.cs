using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class InstanceStateMap : EntityTypeConfiguration<InstanceState>
    {
        public InstanceStateMap()
        {
            // Primary Key
            this.HasKey(t => new { t.uidInstanceID, t.modified });

            // Properties
            // Table & Column Mappings
            this.ToTable("InstanceState");
            this.Property(t => t.uidInstanceID).HasColumnName("uidInstanceID");
            this.Property(t => t.state).HasColumnName("state");
            this.Property(t => t.status).HasColumnName("status");
            this.Property(t => t.unlocked).HasColumnName("unlocked");
            this.Property(t => t.blocked).HasColumnName("blocked");
            this.Property(t => t.info).HasColumnName("info");
            this.Property(t => t.modified).HasColumnName("modified");
            this.Property(t => t.ownerID).HasColumnName("ownerID");
            this.Property(t => t.ownedUntil).HasColumnName("ownedUntil");
            this.Property(t => t.nextTimer).HasColumnName("nextTimer");
        }
    }
}
