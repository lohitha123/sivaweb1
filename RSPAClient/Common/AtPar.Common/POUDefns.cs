using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Common
{
   public  class POUDefns
    {
       public enum ORDER_STATUS
        {
            OPEN = 5,
            SENT = 10,
            RECV = 15,
            CANCEL = 20,
            PARTIALLY_RECEIVED = 25,
            CLOSED = 30,
            ERROR = 35,
            PARTIALLY_PICKED = 40,
            PICKED = 45
        }
    }
}
