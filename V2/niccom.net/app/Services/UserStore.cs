namespace app.Services
{
    using System.Web;
    using Infrastructure;
    using Interfaces;
    using Models;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;

    public class UserStore : IUserStore
    {
        private static readonly object UsersLock = new object();
        private static List<User> _users;

        public UserStore()
        {
            lock (UsersLock)
            {
                if (_users == null)
                {
                    LoadUsers();
                }
            }
        }

        public void Add(User user)
        {
            lock (UsersLock)
            {
                ValidateThatUserDoesNotExist(user);
                _users.Add(user);
                Save();
            }
        }

        private void Save()
        {
            SaveUsersToFile(_users, GetFileName());
        }

        public User GetByUsername(string username)
        {
            return _users.SingleOrDefault(user => user.UserName == username);
        }

        public bool UserExists(string userName)
        {
            return _users.Any(user => user.UserName == userName);
        }

        private static string GetFileName()
        {
            return Path.Combine(HttpRuntime.AppDomainAppPath, Constants.DataFolder, UserStoreInitializer.FileName);
        }

        private void LoadUsers()
        {
            var fileName = GetFileName();
            if (File.Exists(fileName))
            {
                _users = ReadUsersFromFile(fileName);
            }
            else
            {
                var initializer = new UserStoreInitializer(this);
                initializer.CreateFolderIfNotExists(fileName);
                _users = new List<User>();
                initializer.CreateDefaultUserIfNotExists(_users);
                SaveUsersToFile(_users, fileName);
            }
        }

        private static List<User> ReadUsersFromFile(string fileName)
        {
            var serializedUsers = File.ReadAllText(fileName);
            return JsonConvert.DeserializeObject<List<User>>(serializedUsers);
        }

        private static void SaveUsersToFile(List<User> users, string fileName)
        {
            var serializedUsers = JsonConvert.SerializeObject(users);
            File.WriteAllText(fileName, serializedUsers);
        }

        private static void ValidateThatUserDoesNotExist(User user)
        {
            if (_users.Exists(u => u.UserName == user.UserName))
                throw new ArgumentOutOfRangeException("user", "Username already taken!");
        }

        public void Remove(User userToRemove)
        {
            _users.Remove(_users.Single(user => user.UserName == userToRemove.UserName));
            Save();
        }
    }
}