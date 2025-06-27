body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.footer {
  background-color: #0a0f1b;
  color: #ffffffcc;
  padding: 20px 10px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-left,
.footer-center,
.footer-right {
  flex: 1 1 100%;
  text-align: center;
  margin: 10px 0;
}

.footer-left {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.logo-icon {
  color: #f00;
}

.brand {
  font-weight: bold;
  letter-spacing: 1px;
}

.footer-right a {
  color: #ffffffcc;
  margin: 0 10px;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;
}

.footer-right a:hover {
  color: #fff;
}

@media (min-width: 600px) {
  .footer-left,
  .footer-center,
  .footer-right {
    flex: 0 0 auto;
  }

  .footer-left {
    justify-content: flex-start;
    text-align: left;
  }

  .footer-center {
    text-align: center;
  }

  .footer-right {
    justify-content: flex-end;
    text-align: right;
  }

  .footer-content {
    flex-wrap: nowrap;
  }
}
