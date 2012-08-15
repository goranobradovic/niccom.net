/// <reference path="fbUtils.js" />
/// <reference path="jquery-1.8.0.min.js" />

var Niccom = (function (Niccom) {
    /// <summary>
    /// part of the Niccom module
    /// </summary>
    var self = Niccom;
    self.fb = {
        appId: '401636853233967',
        secret: '7d3598c668568fa5f73480647f5c0769',
        pageId: '80391908103'
    };
    function FBFeed() {
        /// <summary>
        /// FBFeed submodule of the Niccom
        /// </summary>
        var fb = Niccom.fb;
        var self = this;
        self.fb = fb;
        self.feedItems = ko.observableArray([]);

        var _refresh = function () {
            /// <summary>
            /// refresh method in Niccom.FBFeed
            /// </summary>

            fbUtils.Feed.get(self.fb.appId, self.fb.secret, self.fb.pageId, _refreshCallback);
        }

        function _refreshCallback(response) {
            var feed = response.data.filter(function (item) { if (item.from.id == self.fb.pageId && item.story) { return item; } });
            var feedItems = $.map(feed, function (item) { return new FeedItem(item) });
            self.feedItems(feedItems);
        };
        return {
            /// Niccom.refresh.refresh()
            refresh: _refresh
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
        self.FBFeed = self.FBFeed || FBFeed();
        ko.applyBindings(self.FBFeed, $("#fb-feed")[0]);
        self.FBFeed.refresh();
        setInterval(self.FBFeed.refresh, 30000);
    };
    $(document).ready(init);
    return self;
}(Niccom || {}));
