import logo from './şok.svg';
import './App.css';
import { useState } from "react";
import { scripts } from "./scriptsData";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null); // Hangi başlığın açıldığını tutar
  const [openChildIndex, setOpenChildIndex] = useState(null); // Hangi alt başlığın açıldığını tutar

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 style={{ marginBottom: "20px" }}>Müşteri Temsilcisi Scriptleri</h1>

        {/* Arama inputu */}
        <input
          type="text"
          placeholder="Aramak istediğiniz başlığı yazın..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Filtrelenmiş script listesi */}
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
                    setOpenChildIndex(null); // Yeni başlık açıldığında alt başlık kapansın
                  }}
                >
                  {script.title}
                </strong>

                {/* Sadece tıklanan başlık açılır */}
                {openIndex === index && (
                  <>
                    <p>{script.content}</p>

                    {/* Alt başlıklar varsa */}
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
