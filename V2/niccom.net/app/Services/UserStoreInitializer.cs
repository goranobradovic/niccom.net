namespace app.Services
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Security;
    using Models;

    public class UserStoreInitializer
    {
        private readonly UserStore _store;
        private static readonly SecureString DefaultUserPass = new SecureString();
        private const string DefaultUserName = "rootUser";
        internal const string FileName = "users.json";

        internal UserStoreInitializer(UserStore store)
        {
            _store = store;

            "userRoot!@#123".ToArray().ToList().ForEach(DefaultUserPass.AppendChar);
        }


        internal void CreateDefaultUserIfNotExists(List<User> users)
        {
            if (!_store.UserExists(DefaultUserName))
            {
                _store.Add(User.Create(DefaultUserName, DefaultUserPass));
            }
        }

        internal void CreateFolderIfNotExists(string fileName)
        {
            var directoryPath = Path.GetDirectoryName(fileName);
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
        }
    }
}