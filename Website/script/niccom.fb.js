/// <reference path="fbUtils.js" />
/// <reference path="jquery-1.8.0.min.js" />

var Niccom = (function (Niccom) {
    /// <summary>
    /// part of the Niccom module
    /// </summary>
    var self = Niccom;
    self.fb = {
        appId: '401636853233967',
        secret: '7d3598c668568fa5f73480647f5c0769'
    };
    function FBFeed(pageId, postLoad) {
        /// <summary>
        /// FBFeed submodule of the Niccom
        /// </summary>
        var fb = Niccom.fb;
        var self = this;
        self.fb = fb;
        self.feedItems = ko.observableArray([]);
        self.pageId = ko.observable(pageId);
        self.postLoad = postLoad;

        var _refresh = function () {
            /// <summary>
            /// refresh method in Niccom.FBFeed
            /// </summary>

            fbUtils.Feed.get(self.fb.appId, self.fb.secret, self.pageId(), _refreshCallback);
        }

        function _refreshCallback(response) {
            var feed = response.data.filter(function (item) { if (item.from.id == self.pageId() && item.story) { return item; } });
            var feedItems = $.map(feed, function (item) { return new FeedItem(item) });
            self.feedItems(feedItems);
            if (self.postLoad) {
                self.postLoad();
            }
        };
        return {
            /// Niccom.refresh.refresh()
            refresh: _refresh,
            setPostLoad: function (postLoad) {
                self.postLoad = postLoad;
            }
        };
    }

    function FeedItem(data) {
        var self = this;
        self.id = data.id;
        self.from = data.from;
        self.story = data.story;
        self.picture = data.picture;
        self.name = data.name;
        self.link = data.link;
        self.description = data.description;
    }

    function init() {
        /// <summary>
        /// This places result of FBFeed() execution under
        /// Niccom.
        /// </summary>
        self.FBFeed = self.FBFeed || FBFeed($("#fb-feed").attr("data-pageId"), postLoad);
        ko.applyBindings(self.FBFeed, $("#fb-feed")[0]);
        self.FBFeed.refresh();
        setInterval(self.FBFeed.refresh, 120000);
    };
    function postLoad() {
        setTimeout(function () { $(".wall").masonry('reload') }, 100);
    }
    $(document).ready(init);
    return self;
}(Niccom || {}));
