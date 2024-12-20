import jwt from 'jsonwebtoken';
import Mock from '../mock';
import testjson from '../stores.json'

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET || 'jwt_secret';
const JWT_VALIDITY = '7 days';

const userList = testjson.users
  

Mock.onPost('/api/auth/login').reply(async (config) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email, password } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email && u.password === password);
    
    if (!user) {
      return [400, { message: 'Invalid email or password' }];
    }
    const userPayload = {
      code: user.code,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      position: user.position,
      is_active: user.is_active,
      groups: user.groups,
      avatar: user.avatar
    };
    
    const accessToken = jwt.sign(userPayload, JWT_SECRET, {
      expiresIn: JWT_VALIDITY
    });

    return [
      200,
      {
        access: accessToken
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

Mock.onPost('/api/auth/register').reply((config) => {
  try {
    const { email, username } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (user) {
      return [400, { message: 'User already exists!' }];
    }
    const newUser = {
      id: 2,
      role: 'GUEST',
      name: '',
      username: username,
      email: email,
      avatar: '/assets/images/face-6.jpg',
      age: 25,
    };
    userList.push(newUser);

    const accessToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });

    return [
      200,
      {
        accessToken,
        user: {
          id: newUser.id,
          avatar: newUser.avatar,
          email: newUser.email,
          password: newUser.password,
          name: newUser.name,
          username: newUser.username,
          role: newUser.role,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

Mock.onGet('/api/auth/profile').reply((config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: 'Invalid Authorization token' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);
    const user = userList.find((u) => u.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [
      200,
      {
        user: {
          code: user.code,
          avatar: user.avatar,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          position: user.position,
          is_active: user.is_active,
          groups: user.groups,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});