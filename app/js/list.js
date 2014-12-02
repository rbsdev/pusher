var Ajax = function() {
    return {
        get: function(params) {
            var request = new XMLHttpRequest();
            request('GET', obj.url, false);

            var onReady = function(e) {
                var isReady = request.readyState == 4;

                if (isReady) {
                    if (request.status == 200) {
                        params.success(request.response);
                        return false;
                    }

                    params.error();
                }
            };

            request.onreadystatechange = onReady;
        }
    };
};

var List = {
    get: function() {

    },     
};

module.exports = List;