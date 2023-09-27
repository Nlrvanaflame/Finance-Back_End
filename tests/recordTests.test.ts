import request from 'supertest';
import express from 'express';
import userRoutes from '../src/routes/userRoutes';
import recordRoutes from '../src/routes/recordRoutes';
import User from '../src/models/UserModel';
import FinancialRecord from '../src/models/FinancialRecordModel';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/', recordRoutes);

User.create = jest.fn();
User.findOne = jest.fn();
FinancialRecord.findAll = jest.fn();
FinancialRecord.create = jest.fn();

describe('Financial Records API Tests', () => {
  let jwtToken: string;

  it('should register a new user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
      email: 'test@example.com',
      
    };
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    (User.create as jest.Mock).mockResolvedValueOnce({
      ...newUser,
      hashed_password: hashedPassword, // Include hashed password
    });
    console.log('Creating user:', newUser);

    const res = await request(app).post('/users/register').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining(newUser));
  });

  it('should log in the registered user', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    const mockToken = 'mockJwtToken';

    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    (User.findOne as jest.Mock).mockResolvedValueOnce({
      ...credentials,
      id: '1',
      hashed_password: hashedPassword, // Return hashed password
    });

    const res = await request(app).post('/users/login').send(credentials);

    console.log(res.body);
    jwtToken = res.body.token;

    
    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe('string');
    expect(res.body.token.split('.').length).toBe(3); 

  });

  it('should create a new financial record', async () => {
    const newRecord = {
      type: 'expense',
      description: 'Test expense',
      amount: 100.50,
      record_date: new Date().toISOString(),
    };

    (FinancialRecord.create as jest.Mock).mockResolvedValueOnce(newRecord);

    console.log(`Bearer ${jwtToken}`);
    const res = await request(app).post('/records').set('Authorization', `Bearer ${jwtToken}`).send(newRecord);

    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(newRecord);
  });

  it('should get all financial records', async () => {
    const mockData = [
      {
        id: '1',
        type: 'expense',
        description: 'Test expense',
        amount: 100.50,
        record_date: new Date().toISOString(),
      },
    ];

    (FinancialRecord.findAll as jest.Mock).mockResolvedValueOnce(mockData);

    const res = await request(app).get('/records').set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });
});
