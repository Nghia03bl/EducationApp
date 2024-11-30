import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {name: 'EducationDatabase.db', location: 'default'},
  () => { console.log('Database opened'); },
  error => { console.log('Database error: ', error); }
);

const setUserAuth = async (value) => {
  const { email, password } = value;
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password],
      (tx, results) => {
        console.log('User data saved successfully');
      },
      error => {
        console.log('Error saving user data: ', error);
      }
    );
  });
};

const getUserAuth = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users LIMIT 1',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          } else {
            reject('No user found');
          }
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

const Logout = () => {
  AsyncStorage.clear();
};

export default {
  setUserAuth,
  getUserAuth,
  Logout,
};
