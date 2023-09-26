import sequelize from './config/dbConfig';
import app from './src/app';

const PORT = 4000;



sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });