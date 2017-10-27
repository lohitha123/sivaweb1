using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_ORDER_DETAILSMap : EntityTypeConfiguration<TKIT_ORDER_DETAILS>
    {
        public TKIT_ORDER_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.ORDER_NUMBER, t.ORDER_LINE_NUMBER });
            this.Ignore(x => x.CHK_VALUE);
            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ORDER_NUMBER)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ORDER_LINE_NUMBER)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PATIENT_ID)
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.ITEM_DESCR)
                .HasMaxLength(50);

            this.Property(t => t.LOCATION_ID)
                .HasMaxLength(50);

            this.Property(t => t.DELIVER_ITEM_STATUS)
                .HasMaxLength(50);

            this.Property(t => t.RECIPIENT)
                .HasMaxLength(20);

            this.Property(t => t.PATIENT_LAST_NAME)
                .HasMaxLength(20);

            this.Property(t => t.PROCEDURE_CODE)
                .HasMaxLength(20);

            this.Ignore(t => t.IMAGE);

            this.Ignore(t => t.VENDOR);

            // Table & Column Mappings
            this.ToTable("TKIT_ORDER_DETAILS");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ORDER_NUMBER).HasColumnName("ORDER_NUMBER");
            this.Property(t => t.ORDER_LINE_NUMBER).HasColumnName("ORDER_LINE_NUMBER");
            this.Property(t => t.PATIENT_ID).HasColumnName("PATIENT_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ITEM_DESCR).HasColumnName("ITEM_DESCR");
            this.Property(t => t.REQUEST_QTY).HasColumnName("REQUEST_QTY");
            this.Property(t => t.LOCATION_ID).HasColumnName("LOCATION_ID");
            this.Property(t => t.REQUEST_FOR_USE_DATE).HasColumnName("REQUEST_FOR_USE_DATE");
            this.Property(t => t.SHIP_DATE).HasColumnName("SHIP_DATE");
            this.Property(t => t.DELIVER_DATE).HasColumnName("DELIVER_DATE");
            this.Property(t => t.DELIVER_QTY).HasColumnName("DELIVER_QTY");
            this.Property(t => t.DELIVER_ITEM_STATUS).HasColumnName("DELIVER_ITEM_STATUS");
            this.Property(t => t.RETURN_QTY).HasColumnName("RETURN_QTY");
            this.Property(t => t.RETURN_DATE).HasColumnName("RETURN_DATE");
            this.Property(t => t.RECIPIENT).HasColumnName("RECIPIENT");
            this.Property(t => t.NEEDED_BY_DATE).HasColumnName("NEEDED_BY_DATE");
            this.Property(t => t.CANCEL_DATE).HasColumnName("CANCEL_DATE");
            this.Property(t => t.PATIENT_LAST_NAME).HasColumnName("PATIENT_LAST_NAME");
            this.Property(t => t.PROCEDURE_CODE).HasColumnName("PROCEDURE_CODE");
            this.Property(t => t.ESTIMATED_RETURN_DATE).HasColumnName("ESTIMATED_RETURN_DATE");
        }
    }
}
