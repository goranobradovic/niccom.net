namespace niccom.net
{
    using Nancy;

    public class IndexModule : NancyModule
    {
        public IndexModule()
        {
            Get["/"] = parameters =>
            {
                return View["index"]
                    .WithHeader("Content-Type", "text/html; charset=utf-8");
            };
        }
    }
}