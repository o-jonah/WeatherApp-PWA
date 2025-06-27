* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background-color: #111;
  color: #fff;
}

.results-section {
  padding: 60px 20px;
  text-align: center;
}

.results-section .container {
  max-width: 1200px;
  margin: 0 auto;
}

.results-section h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.results-section p {
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.6;
  color: #ccc;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.stat {
  flex: 1 1 150px;
  max-width: 200px;
  text-align: center;
}

.pentagon {
  width: 100px;
  height: 0;
  margin: 0 auto 10px;
  position: relative;
  color: white;
  font-weight: bold;
  padding-top: 90px;
  background: #e74c3c;
  clip-path: polygon(50% 0%, 100% 38%, 80% 100%, 20% 100%, 0% 38%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.stat p {
  font-size: 0.95rem;
  color: #eee;
}

/* Responsive */
@media (max-width: 768px) {
  .pentagon {
    width: 80px;
    padding-top: 70px;
    font-size: 1rem;
  }

  .stat p {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .results-section h2 {
    font-size: 1.5rem;
  }

  .results-section p {
    font-size: 0.9rem;
  }

  .stats {
    flex-direction: column;
    align-items: center;
  }

  .stat {
    max-width: 100%;
  }
}
