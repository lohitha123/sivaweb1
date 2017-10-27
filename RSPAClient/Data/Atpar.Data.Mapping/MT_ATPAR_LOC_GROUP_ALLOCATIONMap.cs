using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_LOC_GROUP_ALLOCATIONMap : EntityTypeConfiguration<MT_ATPAR_LOC_GROUP_ALLOCATION>
    {
        public MT_ATPAR_LOC_GROUP_ALLOCATIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.ORG_GROUP_ID, t.LOC_GROUP_ID, t.USER_ID });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LOC_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .IsRequired()
                .HasMaxLength(20);

            //Ignore Properties
            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.USERNAME);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_LOC_GROUP_ALLOCATION");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.LOC_GROUP_ID).HasColumnName("LOC_GROUP_ID");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
