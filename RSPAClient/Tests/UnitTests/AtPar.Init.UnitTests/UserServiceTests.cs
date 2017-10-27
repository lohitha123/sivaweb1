using AtPar.POCOEntities;
using AtPar.Init.Service;
using AtPar.Repository.Interfaces.Init;
using AtPar.Service.Interfaces.Init;
using log4net;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.Repository.Interfaces.Common;

namespace AtPar.Init.UnitTests
{
    [TestFixture]
    public class UserServiceTests
    {
        #region Variables

        IUserService _userService;
        IUserRepository _userRepository;
        ILog _log;
        ICommonRepository _commonRepo;
        List<MT_ATPAR_USER> _users;

        #endregion

        #region Setup
        [SetUp]
        public void Setup()
        {
            _users = SetupUsers();
            _userRepository = SetupUserRepository();

            _log = new Mock<ILog>().Object;
            _commonRepo = new Mock<ICommonRepository>().Object;
            _userService = new UserService(_userRepository, _log,_commonRepo);

        }

        public List<MT_ATPAR_USER> SetupUsers()
        {

            List<MT_ATPAR_USER> users = new List<MT_ATPAR_USER>();

            MT_ATPAR_USER _oData = new MT_ATPAR_USER()
            {
                USER_ID = "UserOne",
                FIRST_NAME = "User",
                LAST_NAME = "One",
                MIDDLE_INITIAL = "O",
                EMAIL_ID = "UserOne@mail.com",
                PROFILE_ID = "BATCH_PR",
                CREATE_DATE = DateTime.Now
            };

            MT_ATPAR_USER _oData1 = new MT_ATPAR_USER()
            {
                USER_ID = "UserTwo",
                FIRST_NAME = "User",
                LAST_NAME = "Two",
                MIDDLE_INITIAL = "O",
                EMAIL_ID = "UserTwo@mail.com",
                PROFILE_ID = "BATCH_PR",
                CREATE_DATE = DateTime.Now
            };


            users.Add(_oData);
            users.Add(_oData1);

            return users;

        }

        public IUserRepository SetupUserRepository()
        {

            // Init repository
            var repo = new Mock<IUserRepository>();

            // Setup mocking behavior
            repo.Setup(r => r.GetAllUsers()).Returns(_users);

            // Return mock implementation
            return repo.Object;

        }

        #endregion

        #region Tests

        [Test]
        public void Service_ShouldReturn_AllUsers()
        {

            var users = _userService.GetAllUsers();

            Assert.That(users, Is.EqualTo(_users));
        }

        #endregion
    }
}
