using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_PROCEDURE_CODEMap : EntityTypeConfiguration<MT_POU_PROCEDURE_CODE>
    {
        public MT_POU_PROCEDURE_CODEMap()
        {
            //CODE
            this.Ignore(t => t.CODE);
            //SCODE
            this.Ignore(t => t.SCODE);
            //PROCEDURENAME
            this.Ignore(t => t.PROCEDURENAME);
            // Primary Key
            this.HasKey(t => t.PROCEDURE_CODE);

            // Properties
            this.Property(t => t.PROCEDURE_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DESCRIPTION)
                .IsRequired()
                .HasMaxLength(254);

            this.Property(t => t.UPDATE_USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.SPECIALTY_CODE)
                .IsRequired()
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_POU_PROCEDURE_CODE");
            this.Property(t => t.PROCEDURE_CODE).HasColumnName("PROCEDURE_CODE");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.SPECIALTY_CODE).HasColumnName("SPECIALTY_CODE");
        }
    }
}
