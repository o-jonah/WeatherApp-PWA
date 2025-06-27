* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

body {
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.contact-container {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.contact-container h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

.contact-form label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
}

.contact-form button {
  background-color: #f2638c;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;
}

.contact-form button:hover {
  background-color: #e0557e;
}

/* Responsive design */
@media (max-width: 600px) {
  .contact-container {
    padding: 30px 20px;
  }

  .contact-form input,
  .contact-form textarea {
    font-size: 15px;
  }
    }
