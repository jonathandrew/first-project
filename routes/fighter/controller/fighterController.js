const axios = require("axios");
const api_key = process.env.API_KEY;
const User = require("../../user/models/User");
module.exports = {
  // fighters: (req, res) => {
  //   console.log(req.params.id);
  //   const url = `http://api.sportradar.us/ufc/trial/v2/en/competitors/${req.params.id}/profile.json?api_key=${api_key}`;
  //   axios.get(url).then(info => {
  //     console.log(info);
  //   });
  // }
  fighters: (req, res, next) => {
    const url = `http://api.sportradar.us/ufc/trial/v2/en/competitors/${req.params.id}/profile.json?api_key=${api_key}`;
    axios
      .get(url)
      .then(info => {
        let information = info.data.info;
        let record = info.data.record;
        let competitor = info.data.competitor;
        // let ranking = info.info;
        // console.log("LENGTH...", info.data.info);
        // console.log("test test test", info.data.record);
        // console.log("-------", info);
        res.render("fighters/fighters", { information, record, competitor });
        // console.log(info.data.rankings);
      })
      .catch(err => {
        // console.log(err);
      });
  },
  mylist: id => {
    return new Promise((resolve, reject) => {
      User.findById(id)
        .then(info => {
          resolve(info);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
