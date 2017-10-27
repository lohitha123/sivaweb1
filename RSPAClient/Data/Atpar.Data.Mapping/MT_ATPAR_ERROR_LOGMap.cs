using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atpar.Data.Mapping
{
   public class MT_ATPAR_ERROR_LOGMap : EntityTypeConfiguration<MT_ATPAR_ERROR_LOG>
    {
        public MT_ATPAR_ERROR_LOGMap()
        {
            this.Property(t => t.ERROR_DT)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ERROR_CODE)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ERROR_MESSAGE)
                .HasMaxLength(4000);

            this.ToTable("MT_ATPAR_ERROR_LOG");
            this.Property(t => t.ERROR_DT).HasColumnName("ERROR_DT");
            this.Property(t => t.ERROR_CODE).HasColumnName("ERROR_CODE");
            this.Property(t => t.ERROR_MESSAGE).HasColumnName("ERROR_MESSAGE");
        }
    }
}
