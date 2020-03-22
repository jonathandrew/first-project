const axios = require("axios");

const url =
  "http://api.sportradar.us/ufc/trial/v2/en/competitors/sr:competitor:237660/profile.json?api_key=yjyy3jgtef9qzfhdv25hq4az";

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
        console.log("-------", info.data);
        res.render("fighters/fighters", { information, record, competitor });
        // console.log(info.data.rankings);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
