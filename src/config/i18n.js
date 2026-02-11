const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const path = require("path");

i18next
  .use(Backend) // Allows reading from the filesystem
  .use(middleware.LanguageDetector) // Detects lang from headers/cookies/query
  .init({
    fallbackLng: "en",
    backend: {
      // Path to your JSON files
      loadPath: path.join(__dirname, "../locales/{{lng}}/translation.json"),
    },
    detection: {
      order: ["querystring", "header"], // Look at ?lng=ar first, then headers
      caches: false,
    },
    interpolation: {
      escapeValue: false, // Not needed for the backend
    },
  });

module.exports = i18next;
