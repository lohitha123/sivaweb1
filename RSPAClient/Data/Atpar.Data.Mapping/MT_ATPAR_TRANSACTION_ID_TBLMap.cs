using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_TRANSACTION_ID_TBLMap : EntityTypeConfiguration<MT_ATPAR_TRANSACTION_ID_TBL>
    {
        public MT_ATPAR_TRANSACTION_ID_TBLMap()
        {
            // Primary Key
            this.HasKey(t => t.APP_ID);

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_TRANSACTION_ID_TBL");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
        }
    }
}
