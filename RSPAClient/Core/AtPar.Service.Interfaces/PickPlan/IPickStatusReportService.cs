using AtPar.Common;

namespace AtPar.Service.Interfaces.PickPlan
{
    public interface IPickStatusReportService
    {
        AtParWebApiResponse<long> GetPickstatusReport(string inputXml, string[] deviceTokenEntry);
    }
}
