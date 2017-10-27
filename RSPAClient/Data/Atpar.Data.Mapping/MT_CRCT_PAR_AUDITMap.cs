using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CRCT_PAR_AUDITMap : EntityTypeConfiguration<MT_CRCT_PAR_AUDIT>
    {
        public MT_CRCT_PAR_AUDITMap()
        {
            // Primary Key
            this.HasKey(t => new { t.KEY_1, t.KEY_2, t.KEY_3, t.KEY_4, t.TRANSACTION_ID, t.UPDATE_DATE });

            // Properties
            this.Property(t => t.KEY_1)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.KEY_2)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_3)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_4)
                .IsRequired()
                .HasMaxLength(32);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.UOM)
                .HasMaxLength(5);

            this.Property(t => t.KEY_5)
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("MT_CRCT_PAR_AUDIT");
            this.Property(t => t.KEY_1).HasColumnName("KEY_1");
            this.Property(t => t.KEY_2).HasColumnName("KEY_2");
            this.Property(t => t.KEY_3).HasColumnName("KEY_3");
            this.Property(t => t.KEY_4).HasColumnName("KEY_4");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.OLD_PAR_VALUE).HasColumnName("OLD_PAR_VALUE");
            this.Property(t => t.NEW_PAR_VALUE).HasColumnName("NEW_PAR_VALUE");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.KEY_5).HasColumnName("KEY_5");
        }
    }
}
