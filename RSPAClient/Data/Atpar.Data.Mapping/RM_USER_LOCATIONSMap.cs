using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_USER_LOCATIONSMap : EntityTypeConfiguration<RM_USER_LOCATIONS>
    {
        public RM_USER_LOCATIONSMap()
        {
            // Primary Key
            this.HasKey(t => t.ID);
            //Ignore
            this.Ignore(t => t.RECIEPENTNAME);

            // Properties
            this.Property(t => t.EMPLOYEE_ID)
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .HasMaxLength(50);

            this.Property(t => t.FIRST_NAME)
                .HasMaxLength(50);

            this.Property(t => t.MIDDLE_NAME)
                .HasMaxLength(50);

            this.Property(t => t.LAST_NAME)
                .HasMaxLength(50);

            this.Property(t => t.ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PHONE_NO)
                .HasMaxLength(50);

            this.Property(t => t.ADDRESS_1)
                .HasMaxLength(254);

            this.Property(t => t.ADDRESS_2)
                .HasMaxLength(554);

            this.Property(t => t.ADDRESS_3)
                .HasMaxLength(254);

            this.Property(t => t.ADDRESS_4)
                .HasMaxLength(254);

            this.Property(t => t.LOCATION)
                .HasMaxLength(100);

            this.Property(t => t.BADGE_ID)
                .HasMaxLength(50);

            this.Property(t => t.SSN_NO)
                .HasMaxLength(50);

            this.Property(t => t.ORG_ID)
                .HasMaxLength(50);

            this.Property(t => t.EMAIL_ID)
                .HasMaxLength(50);

            this.Property(t => t.DEPT_ID)
                .HasMaxLength(50);

            this.Property(t => t.LOC_DESCR)
                .HasMaxLength(254);

            // Table & Column Mappings
            this.ToTable("RM_USER_LOCATIONS");
            this.Property(t => t.EMPLOYEE_ID).HasColumnName("EMPLOYEE_ID");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.FIRST_NAME).HasColumnName("FIRST_NAME");
            this.Property(t => t.MIDDLE_NAME).HasColumnName("MIDDLE_NAME");
            this.Property(t => t.LAST_NAME).HasColumnName("LAST_NAME");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.PHONE_NO).HasColumnName("PHONE_NO");
            this.Property(t => t.ADDRESS_1).HasColumnName("ADDRESS_1");
            this.Property(t => t.ADDRESS_2).HasColumnName("ADDRESS_2");
            this.Property(t => t.ADDRESS_3).HasColumnName("ADDRESS_3");
            this.Property(t => t.ADDRESS_4).HasColumnName("ADDRESS_4");
            this.Property(t => t.LOCATION).HasColumnName("LOCATION");
            this.Property(t => t.BADGE_ID).HasColumnName("BADGE_ID");
            this.Property(t => t.SSN_NO).HasColumnName("SSN_NO");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.EMAIL_ID).HasColumnName("EMAIL_ID");
            this.Property(t => t.DEPT_ID).HasColumnName("DEPT_ID");
            this.Property(t => t.LOC_DESCR).HasColumnName("LOC_DESCR");
        }
    }
}
