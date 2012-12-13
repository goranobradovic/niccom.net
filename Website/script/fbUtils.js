
var fbUtils = (function (fbUtils) {
    /// <summary>
    /// part of the fbUtils module
    /// </summary>
    var self = fbUtils;

    function Feed() {
        /// <summary>
        /// Feed submodule of the fbUtils
        /// </summary>
        var self = this;
        self.oauthUrl = "https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id={appId}&client_secret={secret}";
        self.feedUrl = "https://graph.facebook.com/{pageId}/feed?{token}";
        var _get = function (appId, secret, pageId, callback) {
            /// <summary>
            /// get method in fbUtils.Feed
            /// </summary>
            if (!self.token) {
                $.get(self.oauthUrl.replace('{appId}', appId).replace('{secret}', secret), function (data, status) {
                    self.token = data;
                    _getTokenCallback(data, pageId, callback);
                });
            }
            else {
                _getTokenCallback(self.token, pageId, callback);
            }
        }
        function _getTokenCallback(token, pageId, callback) {
            $.getJSON(self.feedUrl.replace("{pageId}", pageId).replace("{token}", token), callback);
        }
        return {
            /// fbUtils.get.get()
            get: _get
        };
    }

    function init() {
        /// <summary>
        /// This places result of Feed() execution under
        /// fbUtils.
        /// </summary>
        self.Feed = self.Feed || Feed();
    };
    $(document).ready(init);
    return self;
}(fbUtils || {}));
