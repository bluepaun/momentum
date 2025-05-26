let quote = null;
// const api = 'https://zenquotes.io/api/today';
// const proxy = 'https://thingproxy.freeboard.io/fetch/';
const api2 = 'https://api.breakingbadquotes.xyz/v1/quotes';
fetch(api2)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    quote = data[0];
  });

export default {
  title: "Today's Quote",
  getQuote: function () {
    if (quote === null) {
      return { text: 'No quote found', author: '' };
    }

    return { text: quote.quote, author: quote.author };
  },
};
