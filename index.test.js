const { sequelize } = require("./db");
const { Band, Musician } = require("./index");
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
