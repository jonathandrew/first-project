const axios = require("axios");
const url =
  "http://api.sportradar.us/ufc/trial/v2/en/rankings.json?api_key=yjyy3jgtef9qzfhdv25hq4az";

module.exports = {
  rankings: (req, res, next) => {
    axios
      .get(url)
      .then(info => {
        let ranking = info.data.rankings;
        res.render("home", { ranking });
        // console.log(info.data.rankings);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
