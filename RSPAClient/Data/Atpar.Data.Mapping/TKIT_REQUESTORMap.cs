using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_REQUESTORMap : EntityTypeConfiguration<TKIT_REQUESTOR>
    {
        public TKIT_REQUESTORMap()
        {
            this.Ignore(t => t.USERNAME);
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.REQUESTOR_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.REQUESTOR_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PASSWORD)
                .HasMaxLength(64);

            this.Property(t => t.FIRST_NAME)
                .HasMaxLength(20);

            this.Property(t => t.MIDDLE_INIT)
                .HasMaxLength(20);

            this.Property(t => t.LAST_NAME)
                .HasMaxLength(20);

            this.Property(t => t.PHONE)
                .HasMaxLength(20);

            this.Property(t => t.EMAIL)
                .HasMaxLength(30);

            this.Property(t => t.FAX)
                .HasMaxLength(20);

            this.Property(t => t.PAGER)
                .HasMaxLength(20);

            this.Property(t => t.LOCATION_ID)
                .HasMaxLength(20);

            this.Property(t => t.STATUS)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Ignore(t => t.NEWPASSWORD);

            // Table & Column Mappings
            this.ToTable("TKIT_REQUESTOR");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.REQUESTOR_ID).HasColumnName("REQUESTOR_ID");
            this.Property(t => t.PASSWORD).HasColumnName("PASSWORD");
            this.Property(t => t.FIRST_NAME).HasColumnName("FIRST_NAME");
            this.Property(t => t.MIDDLE_INIT).HasColumnName("MIDDLE_INIT");
            this.Property(t => t.LAST_NAME).HasColumnName("LAST_NAME");
            this.Property(t => t.PHONE).HasColumnName("PHONE");
            this.Property(t => t.EMAIL).HasColumnName("EMAIL");
            this.Property(t => t.FAX).HasColumnName("FAX");
            this.Property(t => t.PAGER).HasColumnName("PAGER");
            this.Property(t => t.LOCATION_ID).HasColumnName("LOCATION_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.RECORDS_PER_PAGE).HasColumnName("RECORDS_PER_PAGE");
            this.Property(t => t.DEFAULT_REPORT_DURATION).HasColumnName("DEFAULT_REPORT_DURATION");
            this.Property(t => t.NO_OF_REQUESTS_FOR_SAME_EQ_ITM).HasColumnName("NO_OF_REQUESTS_FOR_SAME_EQ_ITM");
        }
    }
}
