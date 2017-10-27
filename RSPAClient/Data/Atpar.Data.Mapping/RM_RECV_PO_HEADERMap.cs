using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_RECV_PO_HEADERMap : EntityTypeConfiguration<RM_RECV_PO_HEADER>
    {
        public RM_RECV_PO_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.COMPANY, t.PO_ID });

            // Properties
            this.Property(t => t.COMPANY)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.PO_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.VENDOR_ID)
                .HasMaxLength(50);

            this.Property(t => t.VENDOR_NAME)
                .HasMaxLength(50);

            this.Property(t => t.PO_COMMENTS)
                .HasMaxLength(4000);

            this.Property(t => t.ERS_TYPE)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.BUYER_NAME)
                .HasMaxLength(50);

            this.Property(t => t.BUYER_PHONE)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("RM_RECV_PO_HEADER");
            this.Property(t => t.COMPANY).HasColumnName("COMPANY");
            this.Property(t => t.PO_ID).HasColumnName("PO_ID");
            this.Property(t => t.VENDOR_ID).HasColumnName("VENDOR_ID");
            this.Property(t => t.VENDOR_NAME).HasColumnName("VENDOR_NAME");
            this.Property(t => t.PO_DATE).HasColumnName("PO_DATE");
            this.Property(t => t.PO_COMMENTS).HasColumnName("PO_COMMENTS");
            this.Property(t => t.ERS_TYPE).HasColumnName("ERS_TYPE");
            this.Property(t => t.BUYER_NAME).HasColumnName("BUYER_NAME");
            this.Property(t => t.BUYER_PHONE).HasColumnName("BUYER_PHONE");
        }
    }
}
