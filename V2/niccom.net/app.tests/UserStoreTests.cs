using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace app.tests
{
    using System.Diagnostics;
    using System.Linq;
    using System.Security;
    using Models;
    using Services;

    [TestClass]
    public class UserStoreTests
    {
        [TestMethod]
        public void Instantiate()
        {
            var store = new UserStore();
        }

        [TestMethod]
        public void CreateUser()
        {
            var store = new UserStore();
            var password = new SecureString();
            "test password".ToCharArray().ToList().ForEach(password.AppendChar);
            var testUser = User.Create("test user", password);
            if (store.UserExists(testUser.UserName))
            {
                store.Remove(testUser);
            }
            store.Add(testUser);
        }

        [TestMethod]
        public void GetUser()
        {
            CreateUser();
            var store = new UserStore();
            var testuser = store.GetByUsername("test user");
            Assert.IsNotNull(testuser);
            Assert.AreEqual(testuser.UserName, "test user");
        }
    }
}
