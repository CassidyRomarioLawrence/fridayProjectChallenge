module.exports = app => {
  const vans = require("../controllers/vans.controller.js");

  var router = require("express").Router();

  router.post("/", vans.create);

  router.get("/", vans.findAll);

  router.get("/sizes", vans.findAllSizes);
  
  router.get("/color", vans.findAllColor);

  router.get("/:id", vans.findOne);

  router.put("/:id", vans.update);

  router.delete("/:id", vans.delete);

  router.delete("/", vans.deleteAll);

  app.use('/api/vans', router);
};