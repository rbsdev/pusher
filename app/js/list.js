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

var Template = {
  compile: function(html, datas) {
    var output = '';

    datas.forEach(function(element, index) {
      output += html.replace('{{ SRC }}', datas.src);
      output += html.replace('/{{ URL }}/gi', datas.url);
      output += html.replace('{{ TITLE }}', datas.title);
      output += html.replace('{{ DATE }}', datas.date);
    });

    return output;
  }
};

var List = {
  url: 'http://172.20.92.64:8080/pusher-data-service/api/news/list/gremio?size=20&hl=1',
  element: document.getElementById('list-news'),
  html: [
    '<li>',
      '<a href="{{ URL }}"><img src="{{ SRC }}"></a>',
      '<a href="{{ URL }}">{{ TITLE }}></a>',
      '<span>{{ DATE }}</span>'
    '</li>'
  ].join('')

  get: function() {
    var url = this.url;

    var onSuccess = function(datas) {
      var html = Template.compile(this.html, datas);
      element.innerHTML = html;
    };

    Ajax.get({
        url: url,
        success: onSuccess.bind(this)
    });
  },    
};

module.exports = List;