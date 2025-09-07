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
          style={{ width: "300px", padding: "5px", marginBottom: "20px" }}
        />

        {/* Filtrelenmiş script listesi */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {scripts
            .filter(script =>
              script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              script.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((script, index) => (
              <li key={index} style={{ marginBottom: "10px", textAlign: "left" }}>
                <strong
                  style={{ fontSize: "18px", cursor: "pointer" }}
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
                    <p style={{ margin: "5px 0" }}>{script.content}</p>

                    {/* Alt başlıklar varsa */}
                    {script.children && (
                      <ul style={{ listStyle: "none", paddingLeft: "15px" }}>
                        {script.children.map((child, cIndex) => (
                          <li key={cIndex} style={{ marginBottom: "5px" }}>
                            <strong
                              style={{ cursor: "pointer", fontSize: "16px" }}
                              onClick={() => setOpenChildIndex(openChildIndex === cIndex ? null : cIndex)}
                            >
                              {child.title}
                            </strong>
                            {openChildIndex === cIndex && (
                              <p style={{ margin: "3px 0 3px 10px" }}>{child.content}</p>
                            )}
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
