using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_RPT_POU_TRANS_HEADER2Map : EntityTypeConfiguration<MT_RPT_POU_TRANS_HEADER2>
    {
        public MT_RPT_POU_TRANS_HEADER2Map()
        {
            // Primary Key
            this.HasKey(t => new { t.ORDER_NO, t.ORG_ID, t.PAR_LOC_ID, t.ORDER_DATE, t.VENDOR_ID, t.APP_ID });

            // Properties
            this.Property(t => t.ORDER_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.PAR_LOC_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CREATE_USER)
                .HasMaxLength(50);

            this.Property(t => t.VENDOR_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ERP_ORDER_NO)
                .HasMaxLength(30);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(4000);

            this.Property(t => t.INVENTORYORDER_FLAG)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_RPT_POU_TRANS_HEADER2", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.ORDER_NO).HasColumnName("ORDER_NO");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.PAR_LOC_ID).HasColumnName("PAR_LOC_ID");
            this.Property(t => t.ORDER_DATE).HasColumnName("ORDER_DATE");
            this.Property(t => t.CREATE_USER).HasColumnName("CREATE_USER");
            this.Property(t => t.VENDOR_ID).HasColumnName("VENDOR_ID");
            this.Property(t => t.ERP_ORDER_NO).HasColumnName("ERP_ORDER_NO");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
            this.Property(t => t.INVENTORYORDER_FLAG).HasColumnName("INVENTORYORDER_FLAG");
            this.Property(t => t.PTWY_DATE_TIME).HasColumnName("PTWY_DATE_TIME");
            this.Property(t => t.CYCT_DATE_TIME).HasColumnName("CYCT_DATE_TIME");
        }
    }
}
