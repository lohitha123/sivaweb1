using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_APPMap : EntityTypeConfiguration<MT_ATPAR_APP>
    {
        public MT_ATPAR_APPMap()
        {
            this.Ignore(t => t.CLIENT_USER);
            this.Ignore(t => t.SERVER_USER);
            // Primary Key
            this.HasKey(t => t.APP_ID);

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.APP_NAME)
                .HasMaxLength(20);
            this.Property(t => t.APP_IMAGE_PATH);
            this.Property(t => t.GROUP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None); ;


            // Table & Column Mappings
            this.ToTable("MT_ATPAR_APP");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.APP_NAME).HasColumnName("APP_NAME");
        }
    }
}
