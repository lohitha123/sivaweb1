using AtPar.Repository.Interfaces.Init;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using AtPar.Data;
using AtPar.Common;
using AtPar.POCOEntities;
using AtPar.Data;

namespace AtPar.Init.Repos
{
    public class RouteRepository : IRouteRepository
    {
        public List<MT_ATPAR_MENUS> GetRoutes()
        {
            try
            {
                List<MT_ATPAR_MENUS> lstmens = new List<MT_ATPAR_MENUS>();
                string prroute = string.Empty;
                using (var entities = new ATPAR_MT_Context())
                {
                   
                    entities.MT_ATPAR_MENUS.ToList().ForEach(x =>
                    {
                        if (prroute != x.ROUTE)
                        {
                            prroute = x.ROUTE;
                            lstmens.Add(x);
                        }
                            
                    }
                    );

                    return lstmens;

                    // var query = entities.MT_ATPAR_MENUS;                  

                    //var lstRoutes = query.ToList();

                    //List<MT_ATPAR_ROUTES> lstSelectedRoutes = new List<MT_ATPAR_ROUTES>();

                    //foreach (var item in lstRoutes)
                    //{
                    //    lstSelectedRoutes.Add(item.Cast<MT_ATPAR_ROUTES>());
                    //}

                }

            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
