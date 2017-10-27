using AtPar.WebApi;
using AtPar.WebApi.App_Start;
using Microsoft.Owin.Hosting;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace AtPar.IntegrationTest.Helper
{
    public class SelfHost
    {
        private static string BaseAddress = "http://localhost:";

        public static void Configuration(IAppBuilder appBuilder)
        {
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();
            config.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(
                UnityConfig.GetConfiguredContainer());
            AtPar.WebApi.WebApiConfig.Register(config);
            appBuilder.UseWebApi(config);

        }

        private static int GetFreeTCPPort()
        {
            var l = new TcpListener(IPAddress.Loopback, 0);
            l.Start();

            var port = ((IPEndPoint)l.LocalEndpoint).Port;
            l.Stop();
            return port;
        }

        public static string HostAtParWebApi()
        {
            BaseAddress = ReadHostAddressFromConfig();

            if(string.IsNullOrEmpty(BaseAddress))
            {
                int _port = GetFreeTCPPort();
                BaseAddress = BaseAddress + _port + "/";

                UnityWebActivator.Start();
                WebApp.Start<SelfHost>(BaseAddress);

                return BaseAddress;
            }

            return BaseAddress;
            
        }

        public static string ReadHostAddressFromConfig()
        {
            var hostAdd = ConfigurationManager.AppSettings["HostAddress"];
            return hostAdd;
        }
    }
}
