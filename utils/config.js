require("dotenv").config();
const exportConfig = (env) => {
  if (env == "development") {
    return {
      MONGO_URI: process.env.MONGO_URI_LOCAL,
    };
  } else
    return {
      MONGO_URI: process.env.MONGO_URI,
    };
};

module.exports = exportConfig(process.env.NODE_ENV);
