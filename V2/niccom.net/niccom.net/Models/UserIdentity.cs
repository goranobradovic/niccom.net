using System.Collections.Generic;

namespace niccom.net.Models
{
    using Nancy.Security;

    public class UserIdentity : IUserIdentity
    {
        public UserIdentity(string userName, IEnumerable<string> claims)
        {
            Claims = claims;
            UserName = userName;
        }

        public string UserName { get; private set; }
        public IEnumerable<string> Claims { get; private set; }
    }
}