import { PGliteWorker } from '@electric-sql/pglite/worker';

let db = null;

const initSchema = async (database) => {
  await database.query(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      date_of_birth TEXT NOT NULL,
      gender TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      address TEXT,
      medical_notes TEXT,
      insurance_provider TEXT,
      insurance_id TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await database.query(`
    CREATE INDEX IF NOT EXISTS idx_patient_name ON patients (last_name, first_name);
  `);

  console.log("Database schema initialized");
};

export const initDatabase = async () => {
  if (!db) {
    try {
      const workerInstance = new Worker(new URL('/pglite-worker.js', import.meta.url), {
        type: 'module',
      });
      db = new PGliteWorker(workerInstance);
      await initSchema(db);
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error;
    }
  }
  return db;
};

export const registerPatient = async (patientData) => {
  const database = await initDatabase();
  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    email,
    phone,
    address,
    medical_notes,
    insurance_provider,
    insurance_id,
  } = patientData;

  const result = await database.query(
    `INSERT INTO patients 
      (first_name, last_name, date_of_birth, gender, email, phone, address, medical_notes, insurance_provider, insurance_id) 
     VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id`,
    [
      first_name,
      last_name,
      date_of_birth,
      gender,
      email || null,
      phone || null,
      address || null,
      medical_notes || null,
      insurance_provider || null,
      insurance_id || null,
    ]
  );

  return result.rows?.[0];
};

export const getAllPatients = async () => {
  const database = await initDatabase();
  try {
    const result = await database.query(
      "SELECT * FROM patients ORDER BY last_name, first_name"
    );
    return result.rows || [];
  } catch (error) {
    console.error('Error executing getAllPatients query:', error);
    throw error;
  }
};

export const searchPatientsByName = async (searchTerm) => {
  const database = await initDatabase();
  try {
    const result = await database.query(
      `SELECT * FROM patients
       WHERE first_name ILIKE $1 OR last_name ILIKE $2
       ORDER BY last_name, first_name`,
      [`%${searchTerm}%`, `%${searchTerm}%`]
    );
    return result.rows || [];
  } catch (error) {
    console.error('Error executing searchPatientsByName query:', error);
    throw error;
  }
};

export const executeQuery = async (sqlQuery, params = []) => {
  try {
    const database = await initDatabase();
    const result = await database.query(sqlQuery, params);
    return { success: true, data: result.rows || [], error: null };
  } catch (error) {
    console.error("Query execution error:", error);
    return {
      success: false,
      data: [],
      error: error.message || "An error occurred while executing the query",
    };
  }
};
