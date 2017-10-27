using AtPar.IntegrationTest.Helper;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
//using System.Windows.Forms;

namespace AtPar.Integration.Tests
{

    [TestFixture]
    public class InitWebApiTests
    {
        private string BaseAddress = string.Empty;
        [TestFixtureSetUp]
        public void HostWebApi()
        {
            try
            {
                BaseAddress = SelfHost.HostAtParWebApi();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        [Test]
        public void TestMeth()
        {

            var client = new HttpClient();

            //try
            // {

            var response = client.GetAsync(BaseAddress + "api/User/GetAllUsers");
            string Url = BaseAddress + "api/User/GetAllUsers";
            //response.Wait();
            var content = response.Result.Content.ReadAsStringAsync();
            Assert.That(response.Result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            // WebBrowser wb = new WebBrowser();           
           // MessageBox.Show(Url);
            // wb.AllowNavigation = true;
            // wb.Navigate("http://www.google.com/");
            // Assert.That(content.Result, Is.EqualTo("test Value"));
            // }
            //catch (Exception ex)
            //{
            //    throw;
            //}

        }

      

    }

}
