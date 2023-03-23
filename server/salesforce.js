const jsforce = require("jsforce");
const config = require("./config.json");
const conn = new jsforce.Connection({});

const salesforce = {
  login: () => {
    return new Promise((resolve) => {
      try {
        conn.login(config.username, config.password + config.securityToken, function (err, userInfo) {
          if (err) {
            resolve(false);
          }
          console.log(conn.instanceUrl);
          console.log(conn.accessToken);
          console.log(userInfo);
          resolve(true);
        });
      } catch (error) {
        console.log(error.message);
        resolve(false);
      }
    });
  },
  getApplication: async (req, res) => {
    try {
      const { recordId } = req.query;
      console.log(recordId);
      const isLoggedIn = await salesforce.login();
      if (isLoggedIn) {
        conn.sobject(config.sobjectId).retrieve(recordId, function (err, result) {
          if (err) {
            console.log("======1111");
            return res.json({
              success: false,
              message: "Invalid or Missing Credit App ID. Please contact your Sales Rep in order to apply for credit",
            });
          }
          if (result.Application_Status_pl__c != "Sent to Customer") {
            console.log("======2222");
            return res.json({
              success: false,
              message: "This application has already been submitted for review and cannot be modified. Please contact your Sales Rep if you have any question",
            });
          } else {
            console.log("======3333");
            return res.json({
              success: true,
              data: result,
            });
          }
        });
      } else {
        return res.json({
          success: false,
          message: "Login failed! Please check your credential.",
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  },

  patchApplication: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      const isLoggedIn = await salesforce.login();
      if (isLoggedIn) {
        conn.sobject(config.sobjectId).update({ ...data }, function (err, ret) {
          if (err || !ret.success) {
            return res.json({
              success: false,
              message: "Application patch failed!",
            });
          }
          return res.json({
            success: true,
            message: "Thanks for submitting your credit application.  Your application is now under review.",
          });
        });
      } else {
        return res.json({
          success: false,
          message: "Login failed! Please check your credential.",
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = salesforce;
