var Ajax = {
  get: function(params) {
    var request = new XMLHttpRequest();
    request('GET', params.url, false);

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

module.exports = Ajax;