using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace niccom.net.Modules.Admin
{
    using Nancy;
    using Nancy.Security;

    public class SeureModuleBase : NancyModule
    {
        public SeureModuleBase()
            : base("/secure")
        {
            this.RequiresAuthentication();
        }
    }
}