

var Niccom = (function (Niccom) {
    /// <summary>
    /// part of the Niccom module
    /// </summary>
    var self = Niccom;

    function LinkViewModel(data) {
        var self = this;

        self.url = "http://" + data.url;
        self.name = data.name;
        self.favicon = data.favicon || ("http://" + data.url + "/favicon.ico");
    }

    function GroupViewModel(data) {
        var self = this;
        self.name = data.group;
        self.color = data.color;
        var links = $.map(data.links || [], function (item) { return new LinkViewModel(item) });
        self.links = ko.observableArray(links);
    }

    function LinksViewModel(data) {
        /// <summary>
        /// Links submodule of the Niccom
        /// </summary>
        var self = this;
        var groups = $.map(data.groups, function (item) { return new GroupViewModel(item) });
        self.groups = ko.observableArray(groups);

        var _refresh = function () {
            /// <summary>
            /// refresh method in Niccom.Links
            /// </summary>
        }
        if (links) {
        }
        return {
            /// Niccom.refresh.refresh()
            refresh: _refresh
        };
    }
    function adjustWidth() {
        $("#links").width($(window).width() - 500);
    }
    function init() {
        /// <summary>
        /// This places result of Links() execution under
        /// Niccom.
        /// </summary>
        self.LinksViewModel = self.LinksViewModel || LinksViewModel(links);
        ko.applyBindings(self.LinksViewModel);
        $(window).resize(adjustWidth);
        adjustWidth();

        $.getJSON("https://graph.facebook.com/pc.servis.niccom/", function (data) {
            self.info = data;
        });
        $("#slides").slides({
            pagination: false,
            generatePagination: false,
            play: 7500,
            pause: 2500,
            hoverPause: true
        });
    };
    $(document).ready(init);
    return self;
}(Niccom || {}));