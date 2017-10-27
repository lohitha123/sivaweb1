using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_RPT_CRCT_TRANS_DETAILSMap : EntityTypeConfiguration<MT_RPT_CRCT_TRANS_DETAILS>
    {
        public MT_RPT_CRCT_TRANS_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.KEY_5, t.ITEM_ID, t.COMPARTMENT });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.BUSINESS_UNIT)
                .HasMaxLength(10);

            this.Property(t => t.KEY_4)
                .HasMaxLength(32);

            this.Property(t => t.KEY_5)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_6)
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

            this.Property(t => t.PREVCOUNTUSER_ID)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_12)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_13)
                .HasMaxLength(500);

            this.Property(t => t.REPORT_DATA_14)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_15)
                .HasMaxLength(50);

            this.Property(t => t.PARKEY_1)
                .HasMaxLength(50);

            this.Property(t => t.PARKEY_2)
                .HasMaxLength(50);

            this.Property(t => t.PARKEY_3)
                .HasMaxLength(30);

            this.Property(t => t.PARKEY_4)
                .HasMaxLength(32);

            this.Property(t => t.USER_ID)
                .HasMaxLength(15);

            this.Property(t => t.UOM)
                .HasMaxLength(5);

            this.Property(t => t.PARKEY_5)
                .HasMaxLength(254);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(32);

            this.Property(t => t.COMPARTMENT)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_RPT_CRCT_TRANS_DETAILS", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
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
            this.Property(t => t.PREVCOUNTUSER_ID).HasColumnName("PREVCOUNTUSER_ID");
            this.Property(t => t.REPORT_DATA_12).HasColumnName("REPORT_DATA_12");
            this.Property(t => t.REPORT_DATA_13).HasColumnName("REPORT_DATA_13");
            this.Property(t => t.REPORT_DATA_14).HasColumnName("REPORT_DATA_14");
            this.Property(t => t.REPORT_DATA_15).HasColumnName("REPORT_DATA_15");
            this.Property(t => t.PARKEY_1).HasColumnName("PARKEY_1");
            this.Property(t => t.PARKEY_2).HasColumnName("PARKEY_2");
            this.Property(t => t.PARKEY_3).HasColumnName("PARKEY_3");
            this.Property(t => t.PARKEY_4).HasColumnName("PARKEY_4");
            this.Property(t => t.PARUPDATE_DATE).HasColumnName("PARUPDATE_DATE");
            this.Property(t => t.OLD_PAR_VALUE).HasColumnName("OLD_PAR_VALUE");
            this.Property(t => t.NEW_PAR_VALUE).HasColumnName("NEW_PAR_VALUE");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.PARKEY_5).HasColumnName("PARKEY_5");
            this.Property(t => t.PREVCOUNTTRANSACTION_ID).HasColumnName("PREVCOUNTTRANSACTION_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.COMPARTMENT).HasColumnName("COMPARTMENT");
            this.Property(t => t.COUNT_QTY).HasColumnName("COUNT_QTY");
        }
    }
}
