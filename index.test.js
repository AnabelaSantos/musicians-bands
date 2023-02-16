const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");
const { db } = require("./db");

describe("Band and Musician Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Band", async () => {
    let band = await Band.create({
      name: "Big Band",
      genre: "Jazz",
      showCount: 5,
    });
    expect(typeof Band).toBe("function");
    expect(band).toHaveProperty("name", "Big Band");
    expect(band).toHaveProperty("genre", "Jazz");
    expect(band.showCount).toBe(5);
  });

  test("can create a Musician", async () => {
    let musician = await Musician.create({
      name: "Matt",
      instrument: "Saxophone",
    });
    expect(typeof Musician).toBe("function");
    expect(musician).toHaveProperty("name", "Matt");
    expect(musician).toHaveProperty("instrument", "Saxophone");
  });

  test("can create a new Musician", async () => {
    let newMusician = await Musician.create({
      name: "Dede",
      instrument: "Piano",
    });
    expect(typeof Musician).toBe("function");
    expect(newMusician).toHaveProperty("name", "Dede");
    expect(newMusician).toHaveProperty("instrument", "Piano");
  });
  test("delete a Musician Instance", async () => {
    let Newmusician = await Musician.destroy({
      where: {
        name: "Dede",
      },
    });
    expect(typeof Musician).toBe("function");
  });

  test("update a Musician Instance", async () => {
    await Musician.update(
      {
        name: "Maria",
      },
      { where: { instrument: "Saxophone" } }
    );
    const saxophone = await Musician.findByPk(1);
    expect(saxophone.name).toBe("Maria");
  });

  test("can create a new Musician", async () => {
    let newMusician = await Musician.create({
      name: "Francisca",
      instrument: "Guitar",
    });
    expect(typeof Musician).toBe("function");
    expect(newMusician).toHaveProperty("name", "Francisca");
    expect(newMusician).toHaveProperty("instrument", "Guitar");
  });

  test("can create a new Musician", async () => {
    let newMusician = await Musician.create({
      name: "Cecil",
      instrument: "Piano",
    });
    expect(typeof Musician).toBe("function");
    expect(newMusician).toHaveProperty("name", "Cecil");
    expect(newMusician).toHaveProperty("instrument", "Piano");
  });
});

//PART 2

describe("Band and Musician Models Association", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("If a Band can have many Musicians", async () => {
    // create Musicians and bands
    //Populate the DB with a a band and some musicians
    let band1 = await Band.create({
      name: "Big Band",
      genre: "Jazz",
      showCount: 5,
    });
    let musician1 = await Musician.create({
      name: "Maria",
      instrument: "Saxophone",
    });
    let musician2 = await Musician.create({
      name: "Francisca",
      instrument: "Guitar",
    });
    // create some associations - put musicians in bands
    await band1.addMusician(musician1);
    await band1.addMusician(musician2);

    // test the association
    const band1musicians = await band1.getMusicians();
    expect(band1musicians.length).toBe(2);
    expect(band1musicians[0] instanceof Musician).toBeTruthy;
    expect(band1musicians[0].name).toBe("Maria");
  });
});

//PART 3

describe("Band and Song Models Association", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Song", async () => {
    let song = await Song.create({
      title: "Great Hit",
      year: 1978,
    });
    expect(typeof Song).toBe("function");
    expect(song).toHaveProperty("title", "Great Hit");
    expect(song).toHaveProperty("year", 1978);
  });

  test("If a Band can have many Songs and if a Song can have many Bands", async () => {
    // create Bands and Songs
    //Populate the DB with a a band and some musicians
    let band1 = await Band.create({
      name: "Big Band",
      genre: "Jazz",
      showCount: 5,
    });
    let band2 = await Band.create({
      name: "Small Band",
      genre: "Classic",
      showCount: 7,
    });
    let song1 = await Song.create({
      title: "Great Hit",
      year: 1978,
    });
    let song2 = await Song.create({
      title: "Small Hit",
      year: 1984,
    });
    // create some associations - put songs in band
    await band1.addSongs([song1, song2]);
    await band2.addSongs([song1, song2]);
    // create some associations - put band in songs
    await song1.addBands([band1, band2]);
    await song2.addBands([band1, band2]);

    // test the association
    const band1Songs = await band1.getSongs();
    expect(band1Songs.length).toBe(2);
    expect(band1Songs[0] instanceof Song).toBeTruthy;
    expect(band1Songs[0]).toHaveProperty("title", "Great Hit");

    const band2Songs = await band2.getSongs();
    expect(band2Songs.length).toBe(2);
    expect(band2Songs[0] instanceof Song).toBeTruthy;
    expect(band2Songs[1]).toHaveProperty("year", 1984);

    const song1Bands = await song1.getBands();
    expect(song1Bands.length).toBe(2);
    expect(song1Bands[0] instanceof Band).toBeTruthy;
    expect(song1Bands[0]).toHaveProperty("name", "Big Band");

    const song2Bands = await song2.getBands();
    expect(song2Bands.length).toBe(2);
    expect(song2Bands[0] instanceof Band).toBeTruthy;
    expect(song2Bands[1]).toHaveProperty("genre", "Classic");
  });
});
