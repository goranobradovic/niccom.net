namespace niccom.net
{
    using System.Collections.Generic;
    using app.Models;
    using app.Services;
    using Models;
    using Nancy;
    using Nancy.Authentication.Stateless;
    using Nancy.Bootstrapper;
    using Nancy.Conventions;
    using Nancy.TinyIoc;
    using Startup;

    public class Bootstrapper : DefaultNancyBootstrapper
    {
        // The bootstrapper enables you to reconfigure the composition of the framework,
        // by overriding the various methods and properties.
        // For more information https://github.com/NancyFx/Nancy/wiki/Bootstrapper

        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            base.ConfigureConventions(nancyConventions);

            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("scripts", @"Scripts"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("app", @"app"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("data", @"data"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("content", @"content"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddFile("favicon.ico", "content/images/favicon.ico"));
        }

        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines);

            BundlesConfig.RegisterAllBundles();

            //container.AutoRegister(DuplicateImplementationActions.RegisterSingle);

        }

        protected override void RequestStartup(TinyIoCContainer requestContainer, IPipelines pipelines, NancyContext context)
        {
            base.RequestStartup(requestContainer, pipelines, context);

            // At request startup we modify the request pipelines to
            // include forms authentication - passing in our now request
            // scoped user name mapper.
            //
            // The pipelines passed in here are specific to this request,
            // so we can add/remove/update items in them as we please.
            var loginService = requestContainer.Resolve<LoginService>();
            var authConfiguration =
                new StatelessAuthenticationConfiguration(c =>
                {
                    var apiKeyFromRequest = ((DynamicDictionaryValue)c.Request.Query.ApiKey).Value as ApiKey
                        ?? ((DynamicDictionaryValue)c.Request.Form.ApiKey).Value as ApiKey;

                    if (apiKeyFromRequest == null) return null;

                    if (loginService.IsApiKeyValid(apiKeyFromRequest))
                    {
                        return new UserIdentity(apiKeyFromRequest.Username, new List<string>());
                    }
                    return null;
                });

            StatelessAuthentication.Enable(pipelines, authConfiguration);
        }
    }
}