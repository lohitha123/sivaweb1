using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_ORG_UNITSMap : EntityTypeConfiguration<RM_ORG_UNITS>
    {
        public RM_ORG_UNITSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.ORG_TYPE });


            //Ignore property
            this.Ignore(t => t.EVENT);

            // Properties
            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ORG_NAME)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.ADDRESS_1)
                .HasMaxLength(255);

            this.Property(t => t.ADDRESS_2)
                .HasMaxLength(255);

            this.Property(t => t.CITY)
                .HasMaxLength(255);

            this.Property(t => t.STATE)
                .HasMaxLength(10);

            this.Property(t => t.ZIP)
                .HasMaxLength(10);

            this.Property(t => t.PHONE_NO)
                .HasMaxLength(10);

            this.Property(t => t.ORG_TYPE)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.MASTER_GROUP_ID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("RM_ORG_UNITS");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.ORG_NAME).HasColumnName("ORG_NAME");
            this.Property(t => t.ADDRESS_1).HasColumnName("ADDRESS_1");
            this.Property(t => t.ADDRESS_2).HasColumnName("ADDRESS_2");
            this.Property(t => t.CITY).HasColumnName("CITY");
            this.Property(t => t.STATE).HasColumnName("STATE");
            this.Property(t => t.ZIP).HasColumnName("ZIP");
            this.Property(t => t.PHONE_NO).HasColumnName("PHONE_NO");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.ORG_TYPE).HasColumnName("ORG_TYPE");
            this.Property(t => t.MASTER_GROUP_ID).HasColumnName("MASTER_GROUP_ID");
        }
    }
}
