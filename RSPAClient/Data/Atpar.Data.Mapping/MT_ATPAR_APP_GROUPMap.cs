using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_APP_GROUPMap : EntityTypeConfiguration<MT_ATPAR_APP_GROUP>
    {
        public MT_ATPAR_APP_GROUPMap()
        {

            this.HasKey(t => t.GROUP_ID);

            // Properties
            this.Property(t => t.GROUP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.GROUP_NAME)
                .HasMaxLength(50);

            this.Property(t => t.IMAGE_PATH);

            this.Property(t => t.SEQ_NO)
                 .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_APP_GROUP");
            this.Property(t => t.GROUP_ID).HasColumnName("GROUP_ID");
            this.Property(t => t.GROUP_NAME).HasColumnName("GROUP_NAME");

        }
    }
}
                                                                                                                                                                                                                                                                                                     