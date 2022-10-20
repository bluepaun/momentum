let quotes = [];
fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    quotes = data;
  });

export default {
  title: "Today's Quote",
  getQuote: function () {
    if (quotes.length < 1) {
      return;
    }

    const num = Math.floor(Math.random() * quotes.length);
    return quotes[num];
  },
};
