var Ajax = {
  get: function(params) {
    var request = new XMLHttpRequest();

    var onReady = function(e) {
      var isReady = request.readyState == 4;

      if ( !isReady) return;

      if (request.status == 200) {
        var datas = JSON.parse(request.response);
        params.success(datas);

        return;
      }

      params.error();
    };

    request.onreadystatechange = onReady;
    request.open('GET', params.url);
    request.send(null);
  }
};

module.exports = Ajax;