using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_NOTESMap : EntityTypeConfiguration<MT_ATPAR_NOTES>
    {
        public MT_ATPAR_NOTESMap()
        {
            // Primary Key
            this.HasKey(t => new { t.KEY_1, t.KEY_2, t.KEY_3, t.KEY_4, t.KEY_5, t.KEY_6, t.KEY_7, t.KEY_8, t.KEY_9, t.KEY_10, t.KEY_11, t.KEY_12, t.KEY_13, t.APP_ID, t.SCREEN_NAME, t.TRANS_ID });

            // Properties
            this.Property(t => t.KEY_1)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_2)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.KEY_3)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_4)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.KEY_5)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.KEY_6)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.KEY_7)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.KEY_8)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.KEY_9)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.KEY_10)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.KEY_11)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SCREEN_NAME)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.TRANS_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.CODE)
                .HasMaxLength(50);

            this.Property(t => t.NOTES)
                .HasMaxLength(4000);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_NOTES");
            this.Property(t => t.KEY_1).HasColumnName("KEY_1");
            this.Property(t => t.KEY_2).HasColumnName("KEY_2");
            this.Property(t => t.KEY_3).HasColumnName("KEY_3");
            this.Property(t => t.KEY_4).HasColumnName("KEY_4");
            this.Property(t => t.KEY_5).HasColumnName("KEY_5");
            this.Property(t => t.KEY_6).HasColumnName("KEY_6");
            this.Property(t => t.KEY_7).HasColumnName("KEY_7");
            this.Property(t => t.KEY_8).HasColumnName("KEY_8");
            this.Property(t => t.KEY_9).HasColumnName("KEY_9");
            this.Property(t => t.KEY_10).HasColumnName("KEY_10");
            this.Property(t => t.KEY_11).HasColumnName("KEY_11");
            this.Property(t => t.KEY_12).HasColumnName("KEY_12");
            this.Property(t => t.KEY_13).HasColumnName("KEY_13");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.SCREEN_NAME).HasColumnName("SCREEN_NAME");
            this.Property(t => t.TRANS_ID).HasColumnName("TRANS_ID");
            this.Property(t => t.CODE).HasColumnName("CODE");
            this.Property(t => t.NOTES).HasColumnName("NOTES");
            this.Property(t => t.DATE_TIME).HasColumnName("DATE_TIME");
        }
    }
}
