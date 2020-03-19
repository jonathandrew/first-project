const axios = require("axios");

const url =
  "http://api.sportradar.us/ufc/trial/v2/en/competitors/sr:competitor:237660/profile.json?api_key=yjyy3jgtef9qzfhdv25hq4az";

module.exports = {
  fighters: (req, res, next) => {
    axios
      .get(url)
      .then(info => {
        let city = info.data.info.birth_city;
        let fights = info.data.record;
        // let ranking = info.info;
        console.log("LENGTH...", info.data.info);
        console.log("test test test", info.data.record);
        res.render("fighters/fighters", { city, fights });
        // console.log(info.data.rankings);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
