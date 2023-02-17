const sql = require("./db.js");

// constructor
const Vans = function(vans) {
    this.sneakerName = vans.sneakerName;
    this.sneakerSize = vans.sneakerSize;
    this.sneakerColor = vans.sneakerColor;
    this.sneakerPrice = vans.sneakerPrice;
};

Vans.create = (newVans, result) => {
  sql.query("INSERT INTO tutorials SET ?", newVans, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created vans: ", { id: res.insertId, ...newVans });
    result(null, { id: res.insertId, ...newVans });
  });
};

Vans.findById = (id, result) => {
  sql.query(`SELECT * FROM vansSneakers WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found vans: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Vans.getAllSizes = (sneakerSize, result) => {
  let query = "SELECT * FROM vansSneakers";

  if (sneakerSize) {
    query += ` WHERE sneakerSize LIKE '%${sneakerSize}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vans: ", res);
    result(null, res);
  });
};

Vans.getAllColor = (sneakerColor, result) => {
  let query = "SELECT * FROM vansSneakers";

  if (sneakerColor) {
    query += ` WHERE sneakerColor LIKE '%${sneakerColor}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vans: ", res);
    result(null, res);
  });
};

Vans.updateById = (id, vans, result) => {
  sql.query(
    "UPDATE vansSneakers SET sneakerName = ?, sneakerColor = ?, sneakerPrice = ? WHERE id = ?",
    [vans.sneakerName, vans.sneakerSize, vans.sneakerColor, vans.sneakerPrice, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {

        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated vans: ", { id: id, ...vans });
      result(null, { id: id, ...vans });
    }
  );
};

Vans.remove = (id, result) => {
  sql.query("DELETE FROM vansSneakers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted vans with id: ", id);
    result(null, res);
  });
};

Vans.removeAll = result => {
  sql.query("DELETE FROM vansSneakers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} vansSneakers`);
    result(null, res);
  });
};

module.exports = Vans;