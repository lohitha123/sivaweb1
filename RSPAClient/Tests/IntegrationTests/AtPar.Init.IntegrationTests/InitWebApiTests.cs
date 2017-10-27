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

namespace AtPar.Init.IntegrationTests
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
        public async Task GetAllUsers_Init_ShouldReturnAllUsers()
        {
            var client = new HttpClient(); 

            var response = client.GetAsync(BaseAddress + "api/User/GetAllUsers");

            var content = await response.Result.Content.ReadAsStringAsync();
            Assert.That(response.Result.StatusCode, Is.EqualTo(HttpStatusCode.OK));          

        }

        [Test]
        public async Task GetRoutes_Init_ShouldReturnAllRoutes()
        {

            var client = new HttpClient();

            var response = client.GetAsync(BaseAddress + "api/Route/GetRoutes");

            var content = await response.Result.Content.ReadAsStringAsync();
            Assert.That(response.Result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }



    }

}
