using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class PAR_MNGT_COST_CENTERMap : EntityTypeConfiguration<PAR_MNGT_COST_CENTER>
    {
        public PAR_MNGT_COST_CENTERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.COST_CENTER_CODE, t.DEPT_ID });

            // Properties
            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.COST_CENTER_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(50);

            this.Property(t => t.UPDATE_USER_ID)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.DEPT_ID)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("PAR_MNGT_COST_CENTER");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.COST_CENTER_CODE).HasColumnName("COST_CENTER_CODE");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
        }
    }
}
