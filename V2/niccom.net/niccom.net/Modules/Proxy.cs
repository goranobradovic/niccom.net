namespace niccom.net.Modules
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.IO.Compression;
    using System.Net;
    using System.Runtime.Caching;
    using System.Text;
    using Nancy;
    using SquishIt.Framework;

    public class Proxy : NancyModule
    {
        private readonly Dictionary<string, string> services = new Dictionary<string, string>()
            {
                {"weather", "http://81.93.70.194/synopphp/mstanje.php"}
            };

        private readonly MemoryCache cache = new MemoryCache("proxy");

        public Proxy()
            : base("/proxy")
        {
            Get["/{service}"] = parameters => CreateResponse(parameters.service, Configuration.Instance.JavascriptMimeType);
        }

        Response CreateResponse(string service, string contentType)
        {
            var content =  GetContent(service);
            var response = Response
                .FromStream(() => GZipStream.Synchronized(new MemoryStream(Encoding.UTF8.GetBytes(content))), contentType);
            response
#if debug
                .WithHeader("Cache-Control", "max-age=45");
#else
.WithHeader("Cache-Control", "max-age=60");
#endif
            return response;
        }

        private string GetContent(string service)
        {
            if (cache.Contains(service))
            {
                return cache.Get(service).ToString();
            }
            var content = new WebClient().DownloadString(services[service]);
            cache.Add(service, content, DateTimeOffset.Now.AddMinutes(30));
            return content;
        }
    }
}