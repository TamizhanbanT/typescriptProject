// Core modules and third-party packages
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, ModelStatic, Dialect } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';

// Load .env variables
dotenv.config();

// Get __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get basename for filtering current file
const basename = path.basename(__filename);

// Get NODE_ENV
const env = process.env.NODE_ENV || 'development';

// Load config file dynamically
const configPath = pathToFileURL(path.join(__dirname, '../config/config.js')).href;
const configModule = await import(configPath);
const config = configModule.default[env];


// Interfaces
interface DbModels {
  [key: string]: ModelStatic<any>;
}

interface DbInstances {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

type Db = DbModels & DbInstances;

// Initialize db object
const db = {} as Db;

// Sequelize initialization
let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect as Dialect,
    }
  );
}

// Test DB connection
try {
  await sequelize.authenticate();
  console.log('✅ Connected to DB');
} catch (err) {
  console.error('❌ DB connection error:', err);
}

// Dynamically load all model files in the same directory
const files = fs.readdirSync(__dirname)
  .filter((file) =>
    file !== basename &&
    !file.startsWith('.') &&
    (file.endsWith('.ts') || file.endsWith('.js')) &&
    !file.includes('.test.')
  );

for (const file of files) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(modelPath);
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

// Setup model associations
Object.keys(db).forEach((modelName) => {
  const model = db[modelName] as any;
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

// Attach Sequelize instances to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
