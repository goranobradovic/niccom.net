namespace niccom.net.Modules
{
    using System.IO;
    using System.IO.Compression;
    using System.Text;
    using Nancy;
    using SquishIt.Framework;

    public class Assets : NancyModule
    {
        public Assets()
            : base("/assets")
        {
            Get["/js/{name}"] = parameters => CreateResponse(Bundle.JavaScript().RenderCached((string)parameters.name), Configuration.Instance.JavascriptMimeType);
            Get["/js/{name}.map"] = parameters => CreateResponse(File.ReadAllText(Path.Combine("/Scripts", parameters.name)), Configuration.Instance.JavascriptMimeType);

            Get["/css/{name}"] = parameters => CreateResponse(Bundle.Css().RenderCached((string)parameters.name), Configuration.Instance.CssMimeType);
        }

        Response CreateResponse(string content, string contentType)
        {
            var response = Response
                .FromStream(() => GZipStream.Synchronized(new MemoryStream(Encoding.UTF8.GetBytes(content))), contentType);
            if (Request.Query["r"] != null && Request.Query["r"].HasValue)
            {
                response.WithHeader("etag", Request.Query["r"].Value as string);
            }
            response
#if debug
                .WithHeader("Cache-Control", "max-age=45");
#else
.WithHeader("Cache-Control", "max-age=604800");
#endif
            return response;
        }
    }
}