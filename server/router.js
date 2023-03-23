const express = require("express");
const router = express.Router();
const salesforce = require("./salesforce");

router.get("/api/application/get", (req, res) => {
  salesforce.getApplication(req, res);
});

router.post("/api/application/patch", (req, res) => {
  salesforce.patchApplication(req, res);
});

module.exports = router;
