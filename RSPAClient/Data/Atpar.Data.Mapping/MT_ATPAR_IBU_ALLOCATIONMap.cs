using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_IBU_ALLOCATIONMap : EntityTypeConfiguration<MT_ATPAR_IBU_ALLOCATION>
    {
        public MT_ATPAR_IBU_ALLOCATIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.BUSINESS_UNIT, t.USER_ID });

            //Ignore properties
            this.Ignore(t => t.ROWINDEX);
            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.CHK_ALLOCATED);
            this.Ignore(t => t.USERNAME);

            this.Ignore(t => t.CHK_ALLOCATED_CNTFLG);
            this.Ignore(t => t.ROWINDEXFORCNTFLG);
            this.Ignore(t => t.CHK_ALLOCATED_CONSFLG);
            this.Ignore(t => t.ROWINDEXFORCONSFLG);


            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.DEFAULT_PRINTER)
                .HasMaxLength(100);

            this.Property(t => t.COUNT_FLAG);
                

            this.Property(t => t.ALLOW_SIC_CONSIGN)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_IBU_ALLOCATION");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.DEFAULT_PRINTER).HasColumnName("DEFAULT_PRINTER");
            this.Property(t => t.COUNT_FLAG).HasColumnName("COUNT_FLAG");
            this.Property(t => t.ALLOW_SIC_CONSIGN).HasColumnName("ALLOW_SIC_CONSIGN");
        }
    }
}
