const axios = require("axios");
const api_key = process.env.API_KEY;
const competitor_ID = process.env.COMPETITOR_ID;

const url = `http://api.sportradar.us/ufc/trial/v2/en/competitors/${competitor_ID}/profile.json?api_key=${api_key}`;
module.exports = {
  fighters: (req, res, next) => {
    axios
      .get(url)
      .then(info => {
        let information = info.data.info;
        let record = info.data.record;
        let competitor = info.data.competitor;
        // let ranking = info.info;
        console.log("LENGTH...", info.data.info);
        console.log("test test test", info.data.record);
        console.log("-------", info);
        res.render("fighters/fighters", { information, record, competitor });
        // console.log(info.data.rankings);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
