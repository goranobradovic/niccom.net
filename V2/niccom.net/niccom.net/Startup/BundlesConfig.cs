﻿namespace niccom.net.Startup
{
    using SquishIt.Framework;
    using SquishIt.Framework.Invalidation;
    using SquishIt.Framework.Minifiers.JavaScript;

    public class BundlesConfig
    {
        public static void RegisterAllBundles()
        {
            Bundle.JavaScript()
                .AddMinified("~/Scripts/jquery-2.1.0.min.js")
                .AddMinified("~/Scripts/angular.min.js")
                .AddMinified("~/Scripts/angular-animate.min.js")
                .AddMinified("~/Scripts/angular-cookies.min.js")
                .AddMinified("~/Scripts/angular-loader.min.js")
                .AddMinified("~/Scripts/angular-resource.min.js")
                .AddMinified("~/Scripts/angular-route.min.js")
                .AddMinified("~/Scripts/angular-sanitize.min.js")
                .AddMinified("~/Scripts/angular-touch.min.js")
                .AddMinified("~/Scripts/less-1.5.1.min.js")
                .AddMinified("~/Scripts/ui-bootstrap-0.10.0.min.js")
                .AddMinified("~/Scripts/ui-bootstrap-tpls-0.10.0.min.js")
                .AddMinified("~/Scripts/imagesloaded.pkgd.js")
                .AddMinified("~/Scripts/masonry.pkgd.min.js")
                .AddMinified("~/Scripts/angular-masonry.js")
                .Add("~/Scripts/loading-bar.js")
                .WithMinifier<JsMinMinifier>()
                .WithCacheInvalidationStrategy(new HashAsVirtualDirectoryCacheInvalidationStrategy())
                .AsCached("libs", "~/assets/js/libs");

            Bundle.JavaScript()
                .Add("~/Scripts/viewport.js")
                .AsCached("viewport", "~/assets/js/viewport");

            Bundle.JavaScript()
                .Add("~/Scripts/ga.js")
                .AsCached("ga", "~/assets/js/ga");

            Bundle.JavaScript()
                .Add("app/app.js")
                .AddDirectory("~/app")
                .WithMinifier<YuiMinifier>()
                .WithCacheInvalidationStrategy(new HashAsVirtualDirectoryCacheInvalidationStrategy())
                .AsCached("app", "~/assets/js/app");

            Bundle.Css()
                .Add("~/content/angular.css")
                .Add("~/content/bootstrap.min.css")
                .Add("~/content/bootstrap-theme.min.css")
                .Add("~/content/loading-bar.css")
                .Add("~/content/site.css")
                .WithCacheInvalidationStrategy(new HashAsVirtualDirectoryCacheInvalidationStrategy())
                .AsCached("styles", "~/assets/css/styles");
        }
    }
}