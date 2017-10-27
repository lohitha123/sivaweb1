using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.AccessControl;
using System.Security.Principal;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace AtPar.WebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            log4net.Config.XmlConfigurator.Configure();

            var config = GlobalConfiguration.Configuration;
            config.Filters.Add(new LogSystemAtribute());

            string dirPath = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\AtParWebApi\";
            SetPermissions(dirPath);

        }
        protected void Application_PostAuthorizeRequest()
        {
            System.Web.HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
        }
        private static void SetPermissions(string dirPath)
        {
            try
            {
                if (Directory.Exists(dirPath))
                {
                    DirectoryInfo info = new DirectoryInfo(dirPath);
                    WindowsIdentity self = System.Security.Principal.WindowsIdentity.GetCurrent();
                    DirectorySecurity ds = info.GetAccessControl();
                    ds.SetOwner(WindowsIdentity.GetCurrent().User);
                    ds.AddAccessRule(new FileSystemAccessRule(self.Name,
                    FileSystemRights.FullControl,
                    InheritanceFlags.ObjectInherit |
                    InheritanceFlags.ContainerInherit,
                    PropagationFlags.None,
                    AccessControlType.Allow));
                    info.SetAccessControl(ds);
                }
            }
            catch (Exception ex)
            {
                ex = null;
            }

        }
    }
}
