using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_CART_MANAGERMap : EntityTypeConfiguration<TKIT_CART_MANAGER>
    {
        public TKIT_CART_MANAGERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ID });

            // Properties
            
                
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.REQUESTOR_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_DESCR)
                .HasMaxLength(50);

            this.Property(t => t.LOCATION_ID)
                .HasMaxLength(20);

            this.Property(t => t.PATIENT_ID)
                .HasMaxLength(20);

            this.Property(t => t.PATIENT_LAST_NAME)
                .HasMaxLength(20);

            this.Property(t => t.PROCEDURE_CODE)
                .HasMaxLength(20);

            this.Property(t => t.SERIAL_NO)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("TKIT_CART_MANAGER");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.REQUESTOR_ID).HasColumnName("REQUESTOR_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ITEM_DESCR).HasColumnName("ITEM_DESCR");
            this.Property(t => t.REQUEST_QTY).HasColumnName("REQUEST_QTY");
            this.Property(t => t.LOCATION_ID).HasColumnName("LOCATION_ID");
            this.Property(t => t.PATIENT_ID).HasColumnName("PATIENT_ID");
            this.Property(t => t.REQUEST_FOR_USE_DATE).HasColumnName("REQUEST_FOR_USE_DATE");
            this.Property(t => t.NEEDED_BY_DATE).HasColumnName("NEEDED_BY_DATE");
            this.Property(t => t.PATIENT_LAST_NAME).HasColumnName("PATIENT_LAST_NAME");
            this.Property(t => t.PROCEDURE_CODE).HasColumnName("PROCEDURE_CODE");
            this.Property(t => t.ESTIMATED_RETURN_DATE).HasColumnName("ESTIMATED_RETURN_DATE");
            this.Property(t => t.SERIAL_NO).HasColumnName("SERIAL_NO");
        }
    }
}
