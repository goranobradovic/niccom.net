namespace niccom.net
{
    using Nancy;
    using Nancy.Conventions;
    using SquishIt.Framework;
    using SquishIt.Less;

    public class Bootstrapper : DefaultNancyBootstrapper
    {
        // The bootstrapper enables you to reconfigure the composition of the framework,
        // by overriding the various methods and properties.
        // For more information https://github.com/NancyFx/Nancy/wiki/Bootstrapper

        protected override void ConfigureConventions(Nancy.Conventions.NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("scripts", @"Scripts"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("app", @"app"));
        }

        protected override void ApplicationStartup(Nancy.TinyIoc.TinyIoCContainer container, Nancy.Bootstrapper.IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines); 

            Bundle.JavaScript()
                .AddDirectory("~/Scripts", false)
            .AsCached("libs", "~/assets/js/libs");

            Bundle.JavaScript()
                .AddDirectory("~/app", true)
            .AsCached("app", "~/assets/js/app");

            Bundle.Css()
                  .Add("~/content/bootstrap.css")
                  .Add("~/content/bootstrap-theme.css")
                  .Add("~/content/loading-bar.css")
                  .AsCached("bootstrap", "~/assets/css/bootstrap");
        }
    }
}