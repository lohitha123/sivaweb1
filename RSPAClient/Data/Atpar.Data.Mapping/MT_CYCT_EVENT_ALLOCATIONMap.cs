using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CYCT_EVENT_ALLOCATIONMap : EntityTypeConfiguration<MT_CYCT_EVENT_ALLOCATION>
    {
        public MT_CYCT_EVENT_ALLOCATIONMap()
        {
            this.Ignore(t => t.USERNAME);
            this.Ignore(t => t.STATUSALLOCATED);
            this.Ignore(t => t.CHECKALLOCATED);
            this.Ignore(t => t.ACTUAL_STATUSALLOCATED);
            this.Ignore(t => t.UID);
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.EVENT_ID, t.USER_ID });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.EVENT_ID)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.FROM_STOR_LOC)
                .HasMaxLength(50);

            this.Property(t => t.TO_STOR_LOC)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_CYCT_EVENT_ALLOCATION");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.EVENT_ID).HasColumnName("EVENT_ID");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.NO_RECORDS).HasColumnName("NO_RECORDS");
            this.Property(t => t.FROM_STOR_LOC).HasColumnName("FROM_STOR_LOC");
            this.Property(t => t.TO_STOR_LOC).HasColumnName("TO_STOR_LOC");
            this.Property(t => t.EVENT_TYPE).HasColumnName("EVENT_TYPE");
        }
    }
}
