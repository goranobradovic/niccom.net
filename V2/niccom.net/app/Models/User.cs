namespace app.Models
{
    using System;
    using System.Security;
    using System.Security.Cryptography;
    using System.Text;

    public class User
    {
        public User(string userName, string passwordHash, DateTime createdOn)
        {
            UserName = userName;
            PasswordHash = passwordHash;
            CreatedOn = createdOn;
        }

        public string UserName { get; private set; }

        public string PasswordHash { get; private set; }

        public DateTime CreatedOn { get; private set; }

        public static User Create(string userName, SecureString password)
        {
            var user = new User(userName, string.Empty, DateTime.Now);
            user.PasswordHash = GetPasswordHash(password.ToString(), GetPasswordSalt(user.CreatedOn));
            return user;
        }

        private static string GetPasswordHash(string salt, string password)
        {
            return Convert.ToBase64String(SHA512.Create().ComputeHash(Encoding.UTF8.GetBytes(password + salt)));
        }

        private static string GetPasswordSalt(DateTime createdOn)
        {
            return createdOn.ToString("U");
        }
    }
}