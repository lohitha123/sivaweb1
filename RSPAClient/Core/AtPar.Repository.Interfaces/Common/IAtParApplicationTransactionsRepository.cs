using AtPar.POCOEntities;

namespace AtPar.Repository.Interfaces.Common
{
    public interface IAtParApplicationTransactionsRepository
    {
        long UpdateTransaction(AtPar_Transaction_Entity transactionDetails);
    }
}