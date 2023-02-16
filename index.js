const { NUMBER, BelongsToMany } = require("sequelize");
const { Band } = require("./Band");
const { sequelize } = require("./db");
const { Musician } = require("./Musician");
const { Song } = require("./Song");

Musician.belongsTo(Band);
Band.hasMany(Musician);

Band.belongsToMany(Song, { through: "band_song" });
Song.belongsToMany(Band, { through: "band_song" });

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
  Song,
};
