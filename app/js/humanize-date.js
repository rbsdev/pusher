var date =  Date.parse(news.date.replace(/^([0-9]{4}-[0-9]{2}-[0-9]{2}):([0-9]{2}:[0-9]{2}:[0-9]{2})$/, '$1T$2.000-02:00'));
var now  = Date.now();

var pluralize = function(amount, singular, plural) {
  if (amount == 1) {
    return singular;
  }

  return plural;
};

var human = function(params) {
  return 'Há {{ AMOUNT }} {{ KIND }}'.replace('{{ AMOUNT }}', params.amount)
                                                    .replace('{{ KIND }}', params.kind);
};

var HumanizeDate = function(seconds) {
    var amount = seconds / 31556900 >> 0;

    if (amount) {
      return human({
        amount: amount, 
        kind: pluralize(amount, 'ano', 'anos')
      });
    }

    amount = seconds / 2629740 >> 0;

    if (amount) {
      return human({
        amount: amount,
        kind: pluralize(amount, 'm&#234;s', 'meses')
      });
    }

    amount = seconds / 86400 >> 0;

    if (amount) {
      return human({
        amount: amount,
        kind: pluralize(amount, 'dia', 'dias')
      });
    }

    amount = seconds / 3600 >> 0;

    if (amount) {
      return human({
        amount: amount,
        kind: pluralize(amount, 'hora', 'horas')
      });
    }

    amount = seconds / 60 >> 0;

    if (amount) {
      return human({
        amount: amount,
        kind: pluralize(amount, 'minuto', 'minutos')
      });
    }

    amount = seconds >> 0;

    if (amount) {
      return human({
        amount: amount,
        kind: pluralize(amount, 'segundo', 'segundos')
      });
    }

    return 'Agora';
  };