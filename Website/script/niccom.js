String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
    });
};

var Niccom = (function (Niccom) {
    /// <summary>
    /// part of the Niccom module
    /// </summary>
    var self = Niccom;
    self.user_settings_cookie = "niccom_user_settings";

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
        var contentWidth = $(window).width() - 10;
        $("#content").width(contentWidth);
        var tabImgs = $("ul.ui-tabs-nav li img");
        tabImgs.width((contentWidth / tabImgs.length) - (tabImgs.length + 2) * 5)
    }
    function saveSettings() {
        $.cookie(self.user_settings_cookie, JSON.stringify(self.userSettings));
    }
    function init() {
        /// <summary>
        /// This places result of Links() execution under
        /// Niccom.
        /// </summary>
        self.LinksViewModel = self.LinksViewModel || LinksViewModel(links);
        ko.applyBindings(self.LinksViewModel, $("#links")[0]);

        $(window).resize(adjustWidth);
        var interval = setInterval(adjustWidth, 200);
        setInterval(function () { clearInterval(interval); }, 5000);


        $.getJSON("https://graph.facebook.com/pc.servis.niccom/", function (data) {
            self.info = data;
        });
        self.userSettings = JSON.parse($.cookie(self.user_settings_cookie)) || { search: 1, tab: 1 };

        $('div#search-engine').slides({
            //effect: 'slide, fade',
            //crossfade: true,
            //slideSpeed: 350,
            //fadeSpeed: 500,
            //generateNextPrev: true,
            container: 'engines',
            generatePagination: false,
            play: 0,
            paginationClass: 'search-engines-pagination',
            start: self.userSettings.search,
            animationComplete: function (current) {
                self.userSettings.search = current;
                saveSettings();
            }
        });
        /*
        $("#weather-slides div.slides_container").load('weather.html', function () {
            $("#weather-slides").slides({
                pagination: false,
                generatePagination: false,
                play: 7500,
                pause: 2500,
                hoverPause: true,
            });
        });
        */
        $(".tabs").tabs({
            selected: self.userSettings.tab,
            select: function (event, ui) {
                self.userSettings.tab = ui.index;
                saveSettings();
                setTimeout(rebuildWall);
            }
        });
        $(".wall").masonry({
            isAnimated: true,
            isFitWidth: true
        });
        function rebuildWall() {
            var selected = $(".tabs").tabs("option", "selected") + 1;
            $(".tabs").children(":eq(" + selected + ")").filter(".wall").masonry('reload');
        }
        setInterval(rebuildWall, 10000);


    };
    $(document).ready(init);
    return self;
}(Niccom || {}));