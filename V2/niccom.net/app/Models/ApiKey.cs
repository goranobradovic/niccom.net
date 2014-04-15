namespace app.Models
{
    using System;

    public class ApiKey
    {
        public ApiKey(string username, DateTime issued, string token)
        {
            Username = username;
            Issued = issued;
            Token = token;
        }
        public string Username { get; set; }
        public DateTime Issued { get; set; }
        public string Token { get; private set; }
    }
}