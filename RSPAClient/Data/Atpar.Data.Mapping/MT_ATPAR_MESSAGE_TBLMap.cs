using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_MESSAGE_TBLMap : EntityTypeConfiguration<MT_ATPAR_MESSAGE_TBL>
    {
        public MT_ATPAR_MESSAGE_TBLMap()
        {
            // Primary Key
            this.HasKey(t => t.MESSAGE_ID);

            // Properties
            this.Property(t => t.MESSAGE_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.FROM_USER)
                .HasMaxLength(20);

            this.Property(t => t.TO_USER)
                .HasMaxLength(20);

            this.Property(t => t.MESSAGE_TEXT)
                .HasMaxLength(1000);

            this.Property(t => t.STATUS)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_MESSAGE_TBL");
            this.Property(t => t.MESSAGE_ID).HasColumnName("MESSAGE_ID");
            this.Property(t => t.FROM_USER).HasColumnName("FROM_USER");
            this.Property(t => t.TO_USER).HasColumnName("TO_USER");
            this.Property(t => t.MESSAGE_TEXT).HasColumnName("MESSAGE_TEXT");
            this.Property(t => t.CREATED_DATE).HasColumnName("CREATED_DATE");
            this.Property(t => t.SERVER_DELIVERED_DATE).HasColumnName("SERVER_DELIVERED_DATE");
            this.Property(t => t.FINAL_DELIVERED_DATE).HasColumnName("FINAL_DELIVERED_DATE");
            this.Property(t => t.READ_DATE).HasColumnName("READ_DATE");
            this.Property(t => t.DELETED_DATE).HasColumnName("DELETED_DATE");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
        }
    }
}
