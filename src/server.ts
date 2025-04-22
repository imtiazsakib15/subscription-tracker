import mongoose from 'mongoose';
import app from './app';
import config from './config';

main();

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);

    app.listen(config.PORT, () => {
      console.log(`Server is listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
