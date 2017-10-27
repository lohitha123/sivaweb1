using System;
using System.Data;

namespace AtPar.Repository.Interfaces.PickPlan
{
    public interface IPickStatusReportRepository
    {
        Tuple<DataSet, long> Getpickstatustransactiondetails(string toDate, string fromDate, string bUnit, string orgValue);
        Tuple<DataSet, long> Getpickplandetails(string plans, string bUnit, string orgValue);
    }
}
