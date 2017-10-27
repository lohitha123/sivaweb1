using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_DETAIL_TRANSACTIONMap : EntityTypeConfiguration<MT_ATPAR_DETAIL_TRANSACTION>
    {
        public MT_ATPAR_DETAIL_TRANSACTIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.APP_ID });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.KEY_1)
                .HasMaxLength(50);

            this.Property(t => t.KEY_2)
                .HasMaxLength(10);

            this.Property(t => t.KEY_3)
                .HasMaxLength(10);

            this.Property(t => t.KEY_4)
                .HasMaxLength(10);

            this.Property(t => t.KEY_5)
                .HasMaxLength(20);

            this.Property(t => t.USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.DOWNLOAD_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.DEVICE_ID)
                .HasMaxLength(150);

            this.Property(t => t.REPORT_DATA_1)
                .HasMaxLength(100);

            this.Property(t => t.REPORT_DATA_3)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_4)
                .HasMaxLength(40);

            this.Property(t => t.REPORT_DATA_5)
                .HasMaxLength(60);

            this.Property(t => t.REPORT_DATA_6)
                .HasMaxLength(30);

            this.Property(t => t.REPORT_DATA_7)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_8)
                .HasMaxLength(300);

            this.Property(t => t.REPORT_DATA_9)
                .HasMaxLength(255);

            this.Property(t => t.REPORT_DATA_10)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_11)
                .HasMaxLength(30);

            this.Property(t => t.REPORT_DATA_14)
                .HasMaxLength(70);

            this.Property(t => t.REPORT_DATA_15)
                .HasMaxLength(30);

            this.Property(t => t.REPORT_DATA_16)
                .HasMaxLength(32);

            this.Property(t => t.NON_PO_ITEM)
                .HasMaxLength(1);

            this.Property(t => t.REPORT_DATA_19)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_20)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_21)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_22)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_23)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_24)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_25)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_26)
                .HasMaxLength(255);

            this.Property(t => t.REPORT_DATA_27)
                .HasMaxLength(4000);

            this.Property(t => t.REPORT_DATA_28)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_29)
                .HasMaxLength(20);

            this.Property(t => t.REPORT_DATA_31)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_32)
                .HasMaxLength(30);

            this.Property(t => t.REPORT_DATA_33)
                .HasMaxLength(255);

            this.Property(t => t.REPORT_DATA_34)
                .HasMaxLength(255);

            this.Property(t => t.REPORT_DATA_35)
                .HasMaxLength(255);

            this.Property(t => t.REPORT_DATA_36)
                .HasMaxLength(20);

            this.Property(t => t.REPORT_DATA_37)
                .HasMaxLength(4000);

            this.Property(t => t.REPORT_DATA_39)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_40)
                .HasMaxLength(60);

            this.Property(t => t.REPORT_DATA_41)
                .HasMaxLength(1);

            this.Property(t => t.REPORT_DATA_42)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_43)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_44)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_46)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_DETAIL_TRANSACTION");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.KEY_1).HasColumnName("KEY_1");
            this.Property(t => t.KEY_2).HasColumnName("KEY_2");
            this.Property(t => t.KEY_3).HasColumnName("KEY_3");
            this.Property(t => t.KEY_4).HasColumnName("KEY_4");
            this.Property(t => t.KEY_5).HasColumnName("KEY_5");
            this.Property(t => t.KEY_6).HasColumnName("KEY_6");
            this.Property(t => t.KEY_7).HasColumnName("KEY_7");
            this.Property(t => t.KEY_8).HasColumnName("KEY_8");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.DOWNLOAD_USER_ID).HasColumnName("DOWNLOAD_USER_ID");
            this.Property(t => t.START_DT_TIME).HasColumnName("START_DT_TIME");
            this.Property(t => t.END_DT_TIME).HasColumnName("END_DT_TIME");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.DEVICE_ID).HasColumnName("DEVICE_ID");
            this.Property(t => t.SIGNATURE_ID).HasColumnName("SIGNATURE_ID");
            this.Property(t => t.STATUS_CODE).HasColumnName("STATUS_CODE");
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
            this.Property(t => t.REPORT_DATA_12).HasColumnName("REPORT_DATA_12");
            this.Property(t => t.REPORT_DATA_13).HasColumnName("REPORT_DATA_13");
            this.Property(t => t.REPORT_DATA_14).HasColumnName("REPORT_DATA_14");
            this.Property(t => t.REPORT_DATA_15).HasColumnName("REPORT_DATA_15");
            this.Property(t => t.REPORT_DATA_16).HasColumnName("REPORT_DATA_16");
            this.Property(t => t.REPORT_DATA_17).HasColumnName("REPORT_DATA_17");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.HAND_OVER_DATE).HasColumnName("HAND_OVER_DATE");
            this.Property(t => t.NON_PO_ITEM).HasColumnName("NON_PO_ITEM");
            this.Property(t => t.REPORT_DATA_18).HasColumnName("REPORT_DATA_18");
            this.Property(t => t.REPORT_DATA_19).HasColumnName("REPORT_DATA_19");
            this.Property(t => t.REPORT_DATA_20).HasColumnName("REPORT_DATA_20");
            this.Property(t => t.REPORT_DATA_21).HasColumnName("REPORT_DATA_21");
            this.Property(t => t.REPORT_DATA_22).HasColumnName("REPORT_DATA_22");
            this.Property(t => t.REPORT_DATA_23).HasColumnName("REPORT_DATA_23");
            this.Property(t => t.REPORT_DATA_24).HasColumnName("REPORT_DATA_24");
            this.Property(t => t.REPORT_DATA_25).HasColumnName("REPORT_DATA_25");
            this.Property(t => t.REPORT_DATA_26).HasColumnName("REPORT_DATA_26");
            this.Property(t => t.REPORT_DATA_27).HasColumnName("REPORT_DATA_27");
            this.Property(t => t.REPORT_DATA_28).HasColumnName("REPORT_DATA_28");
            this.Property(t => t.REPORT_DATA_29).HasColumnName("REPORT_DATA_29");
            this.Property(t => t.REPORT_DATA_30).HasColumnName("REPORT_DATA_30");
            this.Property(t => t.REPORT_DATA_31).HasColumnName("REPORT_DATA_31");
            this.Property(t => t.REPORT_DATA_32).HasColumnName("REPORT_DATA_32");
            this.Property(t => t.REPORT_DATA_33).HasColumnName("REPORT_DATA_33");
            this.Property(t => t.REPORT_DATA_34).HasColumnName("REPORT_DATA_34");
            this.Property(t => t.REPORT_DATA_35).HasColumnName("REPORT_DATA_35");
            this.Property(t => t.REPORT_DATA_36).HasColumnName("REPORT_DATA_36");
            this.Property(t => t.REPORT_DATA_37).HasColumnName("REPORT_DATA_37");
            this.Property(t => t.REPORT_DATA_38).HasColumnName("REPORT_DATA_38");
            this.Property(t => t.REPORT_DATA_39).HasColumnName("REPORT_DATA_39");
            this.Property(t => t.REPORT_DATA_40).HasColumnName("REPORT_DATA_40");
            this.Property(t => t.REPORT_DATA_41).HasColumnName("REPORT_DATA_41");
            this.Property(t => t.REPORT_DATA_42).HasColumnName("REPORT_DATA_42");
            this.Property(t => t.REPORT_DATA_43).HasColumnName("REPORT_DATA_43");
            this.Property(t => t.REPORT_DATA_44).HasColumnName("REPORT_DATA_44");
            this.Property(t => t.REPORT_DATA_45).HasColumnName("REPORT_DATA_45");
            this.Property(t => t.REPORT_DATA_46).HasColumnName("REPORT_DATA_46");
            this.Property(t => t.REPORT_DATA_47).HasColumnName("REPORT_DATA_47");
        }
    }
}
