using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class CompletedScopeMap : EntityTypeConfiguration<CompletedScope>
    {
        public CompletedScopeMap()
        {
            // Primary Key
            this.HasKey(t => new { t.uidInstanceID, t.completedScopeID, t.state, t.modified });

            // Properties
            this.Property(t => t.state)
                .IsRequired();

            // Table & Column Mappings
            this.ToTable("CompletedScope");
            this.Property(t => t.uidInstanceID).HasColumnName("uidInstanceID");
            this.Property(t => t.completedScopeID).HasColumnName("completedScopeID");
            this.Property(t => t.state).HasColumnName("state");
            this.Property(t => t.modified).HasColumnName("modified");
        }
    }
}
