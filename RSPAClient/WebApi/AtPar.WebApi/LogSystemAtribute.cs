using AtPar.Common;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace AtPar.WebApi
{
    public class LogSystemAtribute : ActionFilterAttribute
    {
        private static readonly log4net.ILog _log = LogManager.GetLogger("API Calling");

        //HttpActionContext actionContext;
        public override async Task OnActionExecutingAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {

            if (actionContext.ActionArguments.Count != 0)
            {
                if (actionContext.ActionArguments.ContainsKey("deviceTokenEntry"))
                {
                    var deviceTokenEntry = actionContext.ActionArguments["deviceTokenEntry"];
                    if (((string[])deviceTokenEntry).Length > 0)
                    {
                        HttpContext.Current.Session.Add("product", ((string[])deviceTokenEntry)[(int)AtParWebEnums.TokenEntry_Enum.AppName]);
                        HttpContext.Current.Session.Add("systemId", ((string[])deviceTokenEntry)[(int)AtParWebEnums.TokenEntry_Enum.SystemId]);
                        HttpContext.Current.Session.Add("userId", ((string[])deviceTokenEntry)[(int)AtParWebEnums.TokenEntry_Enum.UserID]);

                        // AtParDefns.SystemID = ((string[])deviceTokenEntry)[(int)AtParWebEnums.TokenEntry_Enum.SystemId];// Convert.ToString(deviceTokenEntry[]);//.toString()
                        // AtParDefns.UserID = ((string[])deviceTokenEntry)[(int)AtParWebEnums.TokenEntry_Enum.UserID];

                    }
                }
                log4net.ThreadContext.Properties[AtParWebEnums.LOGPROPERTIES.PRODUCTNAME.ToString()] = HttpContext.Current.Session["product"];
                log4net.ThreadContext.Properties[AtParWebEnums.LOGPROPERTIES.USERNAME.ToString()] = HttpContext.Current.Session["userId"];
                log4net.ThreadContext.Properties[AtParWebEnums.LOGPROPERTIES.SYSTEMID.ToString()] = HttpContext.Current.Session["systemId"];

                if (_log.IsDebugEnabled)
                {
                    _log.DebugFormat(
                "Executing Web API action {0}.{1}",
                actionContext.ActionDescriptor.ControllerDescriptor.ControllerType,
                actionContext.ActionDescriptor.ActionName);
                }
            }


            await base.OnActionExecutingAsync(actionContext, cancellationToken);

        }
        public override async Task OnActionExecutedAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            if (actionExecutedContext.Exception != null)
            {
                if (_log.IsFatalEnabled) { _log.Fatal(actionExecutedContext.ActionContext.ActionDescriptor.ActionName + Globals.EXCEPTION + actionExecutedContext.Exception); }
            }
            else
            {
                if (_log.IsDebugEnabled)
                {
                    _log.DebugFormat(
                "Executed  Web API action {0}.{1}",
                actionExecutedContext.ActionContext.ActionDescriptor.ControllerDescriptor.ControllerType,
                actionExecutedContext.ActionContext.ActionDescriptor.ActionName);
                }
            }
            await base.OnActionExecutedAsync(actionExecutedContext, cancellationToken);

        }
    }
}