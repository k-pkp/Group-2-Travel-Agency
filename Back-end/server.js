const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "[Replace with your actual MySQL Password]",
    database: "HotelBookingSystem"
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Successfully connected to the database!');
    connection.release();
});

const app = express();

app.use(express.json());
app.use(cors());

// Middleware to get the logged-in user's ID from the 'user-id' header
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const getLoggedInUserId = (req) => {
    console.log('All headers and cookies received:', { headers: req.headers, cookies: req.cookies });
    let userId = req.cookies.userId; // Try to read from the 'userId' cookie first
  
    if (!userId) {
      // If no 'userId' cookie is found, try reading from the headers
      userId = req.headers['user-id'] || req.headers['User-Id'] || req.headers['USER-ID'];
    }
  
    console.log('Extracted userId:', userId);
    return userId;
  };

app.get('/user', (req, res) => {
    const loggedInUserId = getLoggedInUserId(req); // Use the middleware
    console.log('loggedInUserId in /user:', loggedInUserId);
    if (!loggedInUserId) {
      console.log('Unauthorized access attempt on /user');
      return res.status(401).json({ error: 'Unauthorized' });
    }

  var user;
  const sql = "SELECT * FROM user WHERE UserID = ?";
  console.log('SQL Query:', sql, [loggedInUserId]);
  db.query(sql, [loggedInUserId], (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json(err);
    }
    console.log('Database data:', data);
    user = data[0];
    if (data.length === 0) {
      console.log('User not found in database:', loggedInUserId);
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(data);
  });
});

app.get('/Hotel', (req, res) => {
    const sql = "SELECT * FROM Hotel";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/image', (req, res) => {
    const sql = "SELECT * FROM image";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/payments', (req, res) => {
    const sql = "SELECT * FROM payments";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

function logLoginAttempt(email, timestamp, status, ipAddress = null, userId = null) {
    const logSql = `
        INSERT INTO Login_Log (UserID, LoginTime, LoginStatus, IPAddress)
        VALUES (?, ?, ?, ?)
    `;
    let userIdToLog = null;

    // Try to find the UserID based on the email for logging purposes
    if (email) {
        const findUserSql = "SELECT UserID FROM user WHERE email = ?";
        db.query(findUserSql, [email], (findErr, findResults) => {
            if (findResults && findResults.length > 0) {
                userIdToLog = findResults[0].UserID;
            }
            // Log the attempt with the found UserID (or null if not found)
            db.query(logSql, [userIdToLog, timestamp, status, ipAddress], (logErr, logResults) => {
                if (logErr) {
                    console.error('Error logging login attempt:', logErr);
                } else {
                    console.log('Login attempt logged:', { email, timestamp, status, ipAddress, userId: userIdToLog });
                }
            });
        });
    } else {
        // If no email is available (shouldn't happen in login), log with null UserID
        db.query(logSql, [null, timestamp, status, ipAddress], (logErr, logResults) => {
            if (logErr) {
                console.error('Error logging login attempt:', logErr);
            } else {
                console.log('Login attempt logged (no email):', { timestamp, status, ipAddress });
            }
        });
    }
}

app.get('/paymentMethod', (req, res) => {
    const sql = "SELECT * FROM paymentMethods";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Backend - Received email:', email ? email.trim() : email);
  console.log('Backend - Received password:', password ? password.trim() : password);
  const loginTimestamp = new Date();
  const ipAddress = req.ip;
  let loginStatus = 'failed'; // Default status

  const sql = "SELECT * FROM user WHERE email = ?";

  db.query(sql, [email ? email.trim() : email], (err, results) => {
      if (err) {
          console.error('Database error during login:', err);
          loginStatus = 'error';
          logLoginAttempt(email, loginTimestamp, loginStatus, ipAddress);
          return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
          loginStatus = 'user_not_found';
          logLoginAttempt(email, loginTimestamp, loginStatus, ipAddress);
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      const user = results[0];
      console.log('Backend - Retrieved user:', user);
      console.log('Backend - Stored PasswordHash (Plain Text!):', user.PasswordHash);

      // INSECURE: Directly comparing plain text passwords
      if (user.PasswordHash && password && user.PasswordHash.trim() === password.trim()) {
          loginStatus = 'success';
          logLoginAttempt(email, loginTimestamp, loginStatus, ipAddress, user.UserID);
          res.json({
              UserID: user.UserID,
              UserType: user.UserType,
              Email: user.email
          });
      } else {
          loginStatus = 'invalid_password';
          logLoginAttempt(email, loginTimestamp, loginStatus, ipAddress);
          return res.status(401).json({ error: 'Invalid credentials' });
      }
  });
});

app.get('/login', (req, res) => {
    res.send("Use POST method to login with JSON body { email, password }");
});

app.get('/', (re, res) => {
    return res.json('Hello from Backend');
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});

app.post('/hotel', (req, res) => {
    const { name, address, city, country, rating, reviews, price, room, url1, url2, url3, url4, url5, freebies, amenities } = req.body;
    const query = `
      INSERT INTO Hotel (name, address, city, country, rating, reviews, price, room)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [name, address, city, country, rating, reviews, price, room], (err, hotelResult) => {
      if (err) {
        console.error('Error adding hotel:', err);
        res.status(500).json({ message: 'Failed to add hotel to the database' });
        return;
      }
      const newHotelId = hotelResult.insertId;
  
      // Insert image URLs into the Image table
      const imageQuery = `
        INSERT INTO Image (HotelID, url1, url2, url3, url4, url5)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(imageQuery, [newHotelId, url1, url2, url3, url4, url5], (imageErr) => {
        if (imageErr) {
          console.error('Error adding image URLs:', imageErr);
          // Consider whether to rollback the hotel insertion if image fails
          // For simplicity, we'll proceed here but you might want a more robust transaction
        }
        res.status(201).json({
          HotelID: newHotelId,
          name,
          address,
          city,
          country,
          rating,
          reviews,
          price,
          room,
          Image: url1 // Sending back the first image URL as the main Image
        });
      });
    });
  });
  
  // DELETE /hotel/:id - Delete a hotel by ID
  app.delete('/hotel/:id', (req, res) => {
    const hotelId = req.params.id;
  
    // 1. Delete associated images
    const deleteImagesQuery = `DELETE FROM Image WHERE HotelID = ?`;
    db.query(deleteImagesQuery, [hotelId], (err) => {
      if (err) {
        console.error('Error deleting associated images:', err);
        res.status(500).json({ message: 'Failed to delete associated images' });
        return;
      }
  
      // 2. Delete the hotel after deleting images
      const deleteHotelQuery = `DELETE FROM Hotel WHERE HotelID = ?`;
      db.query(deleteHotelQuery, [hotelId], (err, result) => {
        if (err) {
          console.error('Error deleting hotel:', err);
          res.status(500).json({ message: 'Failed to delete hotel' });
          return;
        }
        if (result.affectedRows > 0) {
          res.status(200).json({ message: `Hotel with ID ${hotelId} and associated images deleted successfully` });
        } else {
          res.status(404).json({ message: `Hotel with ID ${hotelId} not found` });
        }
      });
    });
  });

  app.get('/booking', (req, res) => {
    const sql = "SELECT * FROM booking";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/paymentMethod', (req, res) => {
  // Destructure fields from the request body
  const {
    UserID,
    HolderName,      // the name on the card
    CardNumber,
    ExpirationDate,  // in YYYY-MM-DD format (or another valid MySQL format)
    BillingAddress
  } = req.body;

  // SQL Insert query for `paymentmethods`
  const query = `
    INSERT INTO paymentmethods
      (UserID, HolderName, CardNumber, ExpirationDate, BillingAddress)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Execute the query
  db.query(
    query,
    [UserID, HolderName, CardNumber, ExpirationDate, BillingAddress],
    (err, result) => {
      if (err) {
        console.error('Error adding card:', err);
        return res.status(500).json({ message: 'Failed to add card to the database' });
      }

      // The newly inserted row’s ID is available as `result.insertId`
      return res.status(201).json({
        PaymentMethodID: result.insertId,
        UserID,
        HolderName,
        CardNumber,
        ExpirationDate,
        BillingAddress
      });
    }
  );
});

app.put('/hotel/:id', (req, res) => {
  const hotelId = req.params.id;
  const updatedHotelData = req.body;
  const { name, address, city, country, rating, reviews, price, room, isAvailable } = updatedHotelData;

  const sql = `
      UPDATE hotel
      SET name = ?,
          address = ?,
          city = ?,
          country = ?,
          rating = ?,
          reviews = ?,
          price = ?,
          room = ?,
          isAvailable = ?
      WHERE HotelID = ?
  `;

  db.query(
      sql,
      [name, address, city, country, rating, reviews, price, room, isAvailable, hotelId],
      (err, result) => {
          if (err) {
              console.error('Error updating hotel:', err);
              res.status(500).json({ message: 'Failed to update hotel in database' });
              return;
          }

          if (result.affectedRows > 0) {
              db.query('SELECT * FROM hotel WHERE HotelID = ?', [hotelId], (err, updatedHotel) => {
                  if (err) {
                      console.error('Error fetching updated hotel:', err);
                      res.status(500).json({ message: 'Failed to fetch updated hotel' });
                      return;
                  }
                  res.status(200).json(updatedHotel[0]);
              });
          } else {
              res.status(404).json({ message: 'Hotel not found' });
          }
      }
  );
});
