using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using AtPar.POCOEntities;

namespace Atpar.Data.Mapping
{
    public class IzendaUserMap : EntityTypeConfiguration<IzendaUser>
    {
        public IzendaUserMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.UserName)
                .IsRequired()
                .HasMaxLength(256);

            this.Property(t => t.FirstName)
                .HasMaxLength(256);

            this.Property(t => t.LastName)
                .HasMaxLength(256);

            this.Property(t => t.PasswordHash)
                .HasMaxLength(256);

            this.Property(t => t.PasswordSalt)
                .HasMaxLength(256);

            this.Property(t => t.CreatedBy)
                .HasMaxLength(256);

            this.Property(t => t.ModifiedBy)
                .HasMaxLength(256);

            this.Property(t => t.EmailAddress)
                .HasMaxLength(256);

            this.Property(t => t.CurrentTokenHash)
                .HasMaxLength(256);

            this.Property(t => t.CultureName)
                .HasMaxLength(20);

            this.Property(t => t.DateFormat)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("IzendaUser");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.UserName).HasColumnName("UserName");
            this.Property(t => t.FirstName).HasColumnName("FirstName");
            this.Property(t => t.LastName).HasColumnName("LastName");
            this.Property(t => t.PasswordHash).HasColumnName("PasswordHash");
            this.Property(t => t.PasswordSalt).HasColumnName("PasswordSalt");
            this.Property(t => t.TenantId).HasColumnName("TenantId");
            this.Property(t => t.Version).HasColumnName("Version");
            this.Property(t => t.Created).HasColumnName("Created");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.Modified).HasColumnName("Modified");
            this.Property(t => t.ModifiedBy).HasColumnName("ModifiedBy");
            this.Property(t => t.EmailAddress).HasColumnName("EmailAddress");
            this.Property(t => t.CurrentTokenHash).HasColumnName("CurrentTokenHash");
            this.Property(t => t.Active).HasColumnName("Active");
            this.Property(t => t.Deleted).HasColumnName("Deleted");
            this.Property(t => t.DataOffset).HasColumnName("DataOffset");
            this.Property(t => t.TimestampOffset).HasColumnName("TimestampOffset");
            this.Property(t => t.InitPassword).HasColumnName("InitPassword");
            this.Property(t => t.RetryLoginTime).HasColumnName("RetryLoginTime");
            this.Property(t => t.LastTimeAccessed).HasColumnName("LastTimeAccessed");
            this.Property(t => t.PasswordLastChanged).HasColumnName("PasswordLastChanged");
            this.Property(t => t.Locked).HasColumnName("Locked");
            this.Property(t => t.LockedDate).HasColumnName("LockedDate");
            this.Property(t => t.CultureName).HasColumnName("CultureName");
            this.Property(t => t.DateFormat).HasColumnName("DateFormat");
            this.Property(t => t.SystemAdmin).HasColumnName("SystemAdmin");
            this.Property(t => t.SecurityQuestionLastChanged).HasColumnName("SecurityQuestionLastChanged");
            this.Property(t => t.NumberOfFailedSecurityQuestion).HasColumnName("NumberOfFailedSecurityQuestion");
        }
    }
}
