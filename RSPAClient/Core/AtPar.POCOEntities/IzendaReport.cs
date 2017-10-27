using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.POCOEntities
{
    public partial class IzendaReport
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public int? Type { get; set; }
        public int? PreviewRecord { get; set; }
        public bool? AdvancedMode { get; set; }
        public bool? AllowNulls { get; set; }
        public bool? IsDistinct { get; set; }
        public Guid CategoryId { get; set; }
        public Guid SubCategoryId { get; set; }
        public Guid TenantId { get; set; }
        public string Description { get; set; }
        public string HeaderContent { get; set; }
        public string FooterContent { get; set; }
        public int Version { get; set; }
        public bool Deleted { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime LastViewed { get; set; }
        public string Owner { get; set; }
        public Guid OwnerId { get; set; }
        public string Title { get; set; }
        public string TitleDescriptionContent { get; set; }
        public string ExcludedRelationships { get; set; }
        public long NumberOfView { get; set; }
        public double RenderingTime { get; set; }
        public Guid CreatedById { get; set; }
        public Guid ModifiedById { get; set; }
        public string ExportFormatSettingData { get; set; }
        public bool SnapToGrid { get; set; }
        public string UsingFields { get; set; }
        public Guid SourceId { get; set; }
        public string Params { get; set; }
        public string Relationships { get; set; }
        public string UsingFieldNames { get; set; }
        public bool IsGlobal { get; set; }

    }
}
