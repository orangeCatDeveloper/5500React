import {
  createTuit,
  deleteTuit, findAllTuits,
  findTuitById, findTuitByUser, updateTuit
} from "../services/tuits-service";

import {
  createUser,
  deleteUsersByUsername, findAllUsers,
  findUserById
} from "../services/users-service";

describe('can create tuit with REST API', () => {
  // TODO: implement this

  const sampleUser = {
    username: 'Fiona',
    password: 'fiona123',
    email: 'fiona@aliens.com'
  };

  const sampleTuit = {
    tuit: "Hello world"
  }

  // setup test before running test
  beforeAll(async () => {
    const newUser = await createUser(sampleUser);
    sampleTuit.postedBy = newUser._id;
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(sampleUser.username);
  });

  test('can create tuit with REST API', async () => {
    // insert new tuit in the database

    const newTuit = await createTuit(sampleTuit.postedBy, sampleTuit);

    expect(newTuit.postedBy).toEqual(sampleTuit.postedBy);
    expect(newTuit.tuit).toEqual(sampleTuit.tuit);

    deleteTuit(newTuit._id);
  });


});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this

  const sampleUser = {
    username: 'tom',
    password: 'tom123',
    email: 'tom@aliens.com'
  };

  const sampleTuit = {
    tuit: "Hello world"
  }

  beforeAll(async () => {
    const newUser = await createUser(sampleUser);
    sampleTuit.postedBy = newUser._id;
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(sampleUser.username);
  });

  test('can delete tuit wtih REST API', async () => {
    // insert new tuit in the database
    const newTuit = await createTuit(sampleTuit.postedBy, sampleTuit);

    expect(newTuit.postedBy).toEqual(sampleTuit.postedBy);
    expect(newTuit.tuit).toEqual(sampleTuit.tuit);

    const status = await deleteTuit(newTuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });


});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
  const sampleUser = {
    username: 'tom',
    password: 'tom123',
    email: 'tom@aliens.com'
  };

  const sampleTuit = {
    tuit: "Hello world"
  }

  beforeAll(async () => {
    const newUser = await createUser(sampleUser);
    sampleTuit.postedBy = newUser._id;
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(sampleUser.username);
  });


  test('can retrieve a tuit by their primary key with REST API', async () => {
    // insert new tuit in the database
    const newTuit = await createTuit(sampleTuit.postedBy, sampleTuit);

    expect(newTuit.postedBy).toEqual(sampleTuit.postedBy);
    expect(newTuit.tuit).toEqual(sampleTuit.tuit);

    const existingTuit = await findTuitById(newTuit._id);

    expect(existingTuit.postedBy._id).toEqual(sampleTuit.postedBy);
    expect(existingTuit.tuit).toEqual(sampleTuit.tuit);

    deleteTuit(newTuit._id)
  });
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
  const usernames = [
    "larry", "curley", "moe"
  ];

  // setup data before test
  beforeAll(() =>
    // insert several known users
    usernames.map(username =>
      createUser({
        username,
        password: `${username}123`,
        email: `${username}@stooges.com`
      })
    )
  );

  // clean up after ourselves
  afterAll(() =>
    // delete the users we inserted
    usernames.map(username =>
      deleteUsersByUsername(username)
    )
  );

  test('can retrieve all tuits with REST API', async () => {
    // retrieve all the users
    const users = await findAllUsers();

    // there should be a minimum number of users
    expect(users.length).toBeGreaterThanOrEqual(usernames.length);

    const sampleTuit = users.map(
      user => {
        return {
          postedBy: user._id,
          tuit: 'hello' + user.uername
        }
      }
    );

    sampleTuit.map(tuit => createTuit(tuit.postedBy, tuit));

    const tuits = await findAllTuits();

    expect(tuits.length).toBeGreaterThanOrEqual(sampleTuit.length);
    const tuitsWeInserted = tuits.filter(
      item => sampleTuit.indexOf({ postedBy: item.postedBy, tuit: item.tuit }) >= 0);


    // compare the actual users in database with the ones we sent
    tuitsWeInserted.forEach(item => {
      const tuit = sampleTuit.find(myTuit => myTuit.postedBy == item.postedBy);
      expect(item.postedBy).toEqual(tuit.postedBy);
      expect(item.tuit).toEqual(tuit.tuit);
    });

    sampleTuit.map(item => deleteTuit(item._id));

  });

});