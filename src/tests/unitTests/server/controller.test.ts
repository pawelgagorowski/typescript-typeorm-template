import BasicControllerMiddlewares from '@server/controller';
import { UserRegisterZodSchema } from '../../../user/schema';
// import { getUserById } from '@/user/domain/ports/persistence';

describe('BasicControllerMiddlewares', () => {
  const basicControllerMiddlewares = new BasicControllerMiddlewares();

  it('validate method should call next fn', () => {
    const req = {
      body: {
        password: 'dupaaaaaaa',
        email: 'sdfsd1f@wp.pl',
        passwordConfirmation: 'dupaaaaaaa',
        language: 'pl'
      }
    } as any;
    const mockResponse = {
      json: jest.fn()
    } as any;
    const next = {} as any;
    basicControllerMiddlewares.validate(UserRegisterZodSchema, 'body')(req, mockResponse, next);
    expect(mockResponse.json).toBeCalledWith({
      validationErrors: ['firstName first name is required']
    });
  });

  it('authorizeToken method with invalid accesToken should call res.json fn', () => {
    const req = {
      headers: {
        authorization: 'invalid access token'
      }
    } as any;
    const mockResponse = {
      json: jest.fn()
    } as any;
    const next = {} as any;
    basicControllerMiddlewares.authorizeToken('authorization')(req, mockResponse, next);
    expect(mockResponse.json).toBeCalledWith({ message: 'authorization token is invalid' });
  });
});

// it('authorizeToken method with valid accesToken should call next fn', async () => {
// const mock = jest.spyOn(Message, 'findOne'); // spy on Message.findOne()
// mock.mockImplementation(() =>
//   Promise.resolve({
//     User: {
//       id: 1
//     }
//   })
// ); // replace the implementation

// jest.mock('@/user/domain/ports/persistence', () => ({
//   __esModule: true,
//   getUserById: jest.fn(() => {
//     console.log('hello from mock');
//     return Promise.resolve({
//       User: {
//         id: 1
//       }
//     });
//   })
// }));

//     jest.mock('@/user/domain/ports/persistence');

//     const req = {
//       body: {
//         password: 'dupaaaaaaa',
//         email: 'sdfsdf@wp.pl',
//         passwordConfirmation: 'dupaaaaaaa',
//         language: 'pl'
//       },
//       headers: {
//         authorization:
//           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1OTIwNTE4MCwiZXhwIjoxNjU5ODA1MTgwfQ.efreudEqOBkPf5r40HWrdUsTZU9Urc3nqDFWh6M6UXg'
//       }
//     } as any;
//     const mockResponse = {
//       json: jest.fn()
//     } as any;
//     const mockNext = jest.fn();
//     basicControllerMiddlewares.authorizeToken('authorization')(req, mockResponse, mockNext);
//     // expect(getUserById).toBeCalled();
//   });
// });
