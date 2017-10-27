using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_DEPTMap : EntityTypeConfiguration<TKIT_DEPT>
    {
        public TKIT_DEPTMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.DEPT_ID });

            this.Ignore(t => t.USER_DEPT_EXISTS);

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DEPT_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(50);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.STATUS)
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("TKIT_DEPT");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
