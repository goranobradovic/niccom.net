namespace app.Services
{
    using System;
    using System.Globalization;
    using System.Security.Cryptography;
    using System.Text;
    using Interfaces;
    using Models;

    public class LoginService
    {
        private readonly IUserStore _userStore;

        public LoginService(IUserStore userStore)
        {
            _userStore = userStore;
        }

        public ApiKey LoginUser(User user)
        {
            ValidateUser(user);
            return IssueApiKey(user);
        }

        public void ValidateUser(User user)
        {
            var userFomDb = _userStore.GetByUsername(user.UserName);
            if (userFomDb == null || !user.PasswordHash.Equals(user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid password!");
            }
        }

        public bool IsApiKeyValid(ApiKey keyToValidate)
        {
            var user = _userStore.GetByUsername(keyToValidate.Username);
            var validKey = CreateApiKey(user, keyToValidate.Issued);
            return validKey.Token.Equals(keyToValidate.Token);
        }

        private static ApiKey IssueApiKey(User user)
        {
            var issuingDate = DateTime.Now;
            return CreateApiKey(user, issuingDate);
        }

        private static ApiKey CreateApiKey(User user, DateTime issuingDate)
        {
            var source = user.UserName + user.PasswordHash.PadLeft(100, issuingDate.Second.ToString()[0]) +
                         issuingDate.ToString(CultureInfo.InvariantCulture);
            var hash = SHA512.Create().ComputeHash(Encoding.UTF8.GetBytes(source));
            return new ApiKey(user.UserName, issuingDate, Convert.ToBase64String(hash));
        }
    }
}