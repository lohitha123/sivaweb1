using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AtPar.WebApi;
using System.Net;
using System.Net.Sockets;
using AtPar.WebApi.App_Start;
using Microsoft.Owin.Hosting;

namespace AtPar.Integration.Tests
{
    public class SelfHost
    {
        private string BaseAddress = "http://localhost:";

        public void Configuration(IAppBuilder appBuilder)
        {
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();
            config.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(
                UnityConfig.GetConfiguredContainer());
            AtPar.WebApi.WebApiConfig.Register(config);
            appBuilder.UseWebApi(config);

        }

        private int GetFreeTCPPort()
        {
            var l = new TcpListener(IPAddress.Loopback, 0);
            l.Start();

            var port = ((IPEndPoint)l.LocalEndpoint).Port;
            l.Stop();
            return port;
        }

        public string HostAtParWebApi()
        {
            

            int _port = GetFreeTCPPort();
            BaseAddress = BaseAddress + _port + "/";

            UnityWebActivator.Start();
            WebApp.Start<SelfHost>(BaseAddress);

            return BaseAddress;
        }
    }
}
