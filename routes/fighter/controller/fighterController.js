const axios = require("axios");
const api_key = process.env.API_KEY;
let competitor_ID = process.env.COMPETITOR_ID;

const url = `http://api.sportradar.us/ufc/trial/v2/en/competitors/${competitor_ID}/profile.json?api_key=${api_key}`;
module.exports = {
  fighters: (req, res, next) => {
    axios
      .get(url)
      .then(info => {
        if (competitor_ID === competitor_ID) {
          let competitor = info.data.competitor;
          let information = info.data.info;
          let record = info.data.record;

          competitor_ID = competitor.id;
          res.render("fighters/fighters", {
            information,
            record,
            competitor
          });
        }
        // let competitor = info.data.competitor;
        // let ranking = info.info;
        console.log("LENGTH...", info.data.info);
        console.log("test test test", info.data.record);
        console.log("-------", info);
        // console.log(info.data.rankings);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
