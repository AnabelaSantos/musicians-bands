const { NUMBER } = require("sequelize");
const { Band } = require("./Band");
const { sequelize } = require("./db");
const { Musician } = require("./Musician");

Musician.belongsTo(Band);
Band.hasMany(Musician);

// // create
// async () => {
//   await sequelize.sync({ force: true });

//   // let musician = await Musician.create({
//   //   name: "Matt",
//   //   instrument: "Saxophone",
//   // });

//   // let NewMusician = await Musician.create({
//   //   name: "Dede",
//   //   instrument: "Piano",
//   // });

//   //   //delete an instance
//   //   await NewMusician.destroy({
//   //     where: {
//   //       name: "Dede",
//   //     },
//   //   });

//   //   musician.update({
//   //     name: "Joan",
//   //     instrument: "Violin",
//   //   });
//   //   await musician.save();

//   const updateMusician = musician.update({
//     name: "Joan",
//     instrument: "Violin",
//   });
//   await musician.save();
// };
module.exports = {
  Band,
  Musician,
};
