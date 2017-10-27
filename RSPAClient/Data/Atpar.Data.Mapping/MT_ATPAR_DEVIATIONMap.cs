using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_DEVIATIONMap : EntityTypeConfiguration<MT_ATPAR_DEVIATION>
    {
        public MT_ATPAR_DEVIATIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.APP_ID, t.KEY_1, t.KEY_2, t.KEY_3, t.KEY_4, t.KEY_5, t.KEY_6, t.UPDATE_DATE });
            
            //Ignore properties

            this.Ignore(t => t.ORDER_QTY);
            this.Ignore(t => t.ORDER_DATE);

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.KEY_2)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.KEY_3)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.KEY_4)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.KEY_5)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_6)
                .IsRequired()
                .HasMaxLength(32);

            this.Property(t => t.REPORT_DATA_6)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_7)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_8)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_9)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_10)
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.REPORT_DATA_12)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_13)
                .HasMaxLength(255);

            this.Property(t => t.REPORT_DATA_14)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_15)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_DEVIATION");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.KEY_1).HasColumnName("KEY_1");
            this.Property(t => t.KEY_2).HasColumnName("KEY_2");
            this.Property(t => t.KEY_3).HasColumnName("KEY_3");
            this.Property(t => t.KEY_4).HasColumnName("KEY_4");
            this.Property(t => t.KEY_5).HasColumnName("KEY_5");
            this.Property(t => t.KEY_6).HasColumnName("KEY_6");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.REPORT_DATA_1).HasColumnName("REPORT_DATA_1");
            this.Property(t => t.REPORT_DATA_2).HasColumnName("REPORT_DATA_2");
            this.Property(t => t.REPORT_DATA_3).HasColumnName("REPORT_DATA_3");
            this.Property(t => t.REPORT_DATA_4).HasColumnName("REPORT_DATA_4");
            this.Property(t => t.REPORT_DATA_5).HasColumnName("REPORT_DATA_5");
            this.Property(t => t.REPORT_DATA_6).HasColumnName("REPORT_DATA_6");
            this.Property(t => t.REPORT_DATA_7).HasColumnName("REPORT_DATA_7");
            this.Property(t => t.REPORT_DATA_8).HasColumnName("REPORT_DATA_8");
            this.Property(t => t.REPORT_DATA_9).HasColumnName("REPORT_DATA_9");
            this.Property(t => t.REPORT_DATA_10).HasColumnName("REPORT_DATA_10");
            this.Property(t => t.REPORT_DATA_11).HasColumnName("REPORT_DATA_11");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.REPORT_DATA_12).HasColumnName("REPORT_DATA_12");
            this.Property(t => t.REPORT_DATA_13).HasColumnName("REPORT_DATA_13");
            this.Property(t => t.REPORT_DATA_14).HasColumnName("REPORT_DATA_14");
            this.Property(t => t.REPORT_DATA_15).HasColumnName("REPORT_DATA_15");
        }
    }
}
