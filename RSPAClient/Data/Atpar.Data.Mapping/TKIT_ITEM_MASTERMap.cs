using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_ITEM_MASTERMap : EntityTypeConfiguration<TKIT_ITEM_MASTER>
    {
        public TKIT_ITEM_MASTERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.ITEM_TYPE, t.ITEM_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_TYPE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_DESCR)
                .HasMaxLength(50);

            this.Property(t => t.MANUFACTURER)
                .HasMaxLength(50);

            this.Property(t => t.VENDOR)
                .HasMaxLength(50);

            this.Property(t => t.IMAGE)
                .HasMaxLength(50);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(2000);

            this.Property(t => t.OWNER)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.OWNER_TYPE)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.CREATE_USERID)
                .HasMaxLength(20);
            this.Ignore(t => t.CHK_VALUE);

            // Table & Column Mappings
            this.ToTable("TKIT_ITEM_MASTER");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ITEM_TYPE).HasColumnName("ITEM_TYPE");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ITEM_DESCR).HasColumnName("ITEM_DESCR");
            this.Property(t => t.MANUFACTURER).HasColumnName("MANUFACTURER");
            this.Property(t => t.VENDOR).HasColumnName("VENDOR");
            this.Property(t => t.IMAGE).HasColumnName("IMAGE");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
            this.Property(t => t.OWNER).HasColumnName("OWNER");
            this.Property(t => t.OWNER_TYPE).HasColumnName("OWNER_TYPE");
            this.Property(t => t.DESTRUCTION_DATE).HasColumnName("DESTRUCTION_DATE");
            this.Property(t => t.ITEM_INACTIVATED).HasColumnName("ITEM_INACTIVATED");
            this.Property(t => t.CREATE_USERID).HasColumnName("CREATE_USERID");
            this.Property(t => t.CREATE_DATE).HasColumnName("CREATE_DATE");
        }
    }
}
