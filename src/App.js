import logo from './şok.svg';
import './App.css';
import { useState } from "react";
import { scripts } from "./scriptsData";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [openChildIndex, setOpenChildIndex] = useState(null);
  const [password, setPassword] = useState(""); // inputtaki şifre
  const [authenticated, setAuthenticated] = useState(false); // doğru şifre girildi mi?

  const correctPassword = "Concentrix2025!"; // Buraya istediğin şifreyi yaz

  const handleLogin = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("Şifre yanlış!");
    }
  };

  if (!authenticated) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Siteye Giriş</h1>
          <input
            type="password"
            placeholder="Şifreyi girin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", marginBottom: "10px" }}
          />
          <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
            Giriş Yap
          </button>
        </header>
      </div>
    );
  }

  // Şifre doğruysa normal siteyi göster
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Müşteri Temsilcisi Scriptleri</h1>

        <input
          type="text"
          placeholder="Aramak istediğiniz başlığı yazın..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <ul className="script-list">
          {scripts
            .filter(script =>
              script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              script.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((script, index) => (
              <li key={index}>
                <strong
                  onClick={() => {
                    setOpenIndex(openIndex === index ? null : index);
                    setOpenChildIndex(null);
                  }}
                >
                  {script.title}
                </strong>
                {openIndex === index && (
                  <>
                    <p>{script.content}</p>
                    {script.children && (
                      <ul>
                        {script.children.map((child, cIndex) => (
                          <li key={cIndex}>
                            <strong
                              onClick={() => setOpenChildIndex(openChildIndex === cIndex ? null : cIndex)}
                            >
                              {child.title}
                            </strong>
                            {openChildIndex === cIndex && <p>{child.content}</p>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
