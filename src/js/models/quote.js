let quote = null;
const api = 'https://zenquotes.io/api/today';
const proxy = 'https://thingproxy.freeboard.io/fetch/';
fetch(proxy + api)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    quote = data[0];
  });

export default {
  title: "Today's Quote",
  getQuote: function () {
    if (quote === null) {
      return 'No quote found';
    }

    return { text: quote.q, author: quote.a };
  },
};
