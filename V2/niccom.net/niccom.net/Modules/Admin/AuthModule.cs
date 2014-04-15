namespace niccom.net.Modules.Admin
{
    using System;
    using System.Linq;
    using System.Security;
    using app.Models;
    using app.Services;
    using Models;
    using Nancy;
    using Nancy.ModelBinding;

    public class AuthModule : NancyModule
    {
        private readonly LoginService _loginService;

        public AuthModule(LoginService loginService)
            : base("/auth/")
        {
            _loginService = loginService;
            //the Post["/login"] method is used mainly to fetch the api key for subsequent calls
            Post["/"] = x =>
            {
                var password = new SecureString();
                var model = this.Bind<LoginModel>();
                (model.Password).ToList().ForEach(password.AppendChar);

                var user = User.Create(model.Username, password);
                var apiKey = _loginService.LoginUser(user);

                return string.IsNullOrEmpty(apiKey.Token)
                           ? new Response { StatusCode = HttpStatusCode.Unauthorized }
                           : Response.AsJson(new { ApiKey = apiKey });
            };

            //do something to destroy the api key, maybe?                    
            Delete["/"] = x =>
            {
                var apiKey = (string)this.Request.Form.ApiKey;
                //UserDatabase.RemoveApiKey(apiKey);
                return new Response { StatusCode = HttpStatusCode.OK };
            };
        }
    }
}