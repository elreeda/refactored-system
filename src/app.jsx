import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "./index.css";

import logo from "./logo.png";

const mapForumla = {
  a: "Höhe bei Einspannug [mm]",
  b: "Höhe in der Mitte [mm]",
  c: "Freie Länge [mm]",
  d: "Breite [mm]",
  e: "Elastizitätsmodul bei Spannungsoptimierten [N/mm²]",
  f: "Elastizitätsmodul bei Prause [N/mm²]",
  g: "Auslenkung [mm]",
};
export default function App() {
  const [formula, setFormula] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
  });

  const delta = formula.b - formula.a;
  const x = formula.c / 2 + 40;
  const a1 = (2 * Math.log(formula.b * x)) / delta;
  const a2 = 1 / delta;
  const a3 = (delta - formula.a) / Math.pow(formula.a, 2);
  const a4 = (-2 * Math.log(formula.a * x) - formula.b / formula.a) / delta;
  const f =
    (formula.g * formula.d * formula.e * Math.pow(delta, 2)) /
    (6 * Math.pow(x, 3) * (a1 + a2 + a3 + a4));
  const h = Math.pow((4 * f) / (formula.g * formula.d * formula.f), 1 / 3) * x;

  return (
    <div className="App">
      <div className="logoContainer">
        <img src={logo} className="logo" />
      </div>

      <div className="desc">
        <p>Berechnung funktioniert nur bei unterschiedlichen Höhen</p>
        <p>
          Kraft ist nur exemplarisch und abhängig von gewählter Auslenkung und
          E-Modul
        </p>
        <p>Die Ersatzfederhöhe könnte um 3% abweichen</p>
      </div>

      <div className="container">
        <h4>Eingabe der Spannungsoptimierten</h4>
        <div className="form">
          {Object.keys(formula).map((key) => (
            <div key={key} className="section">
              <label>{mapForumla[key]}</label>
              <input
                name={key}
                value={formula[key]}
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                onChange={({ target: { value } }) =>
                  setFormula({
                    ...formula,
                    [key]: value === "" ? "" : Number(value),
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="results">
        <h4>Ausgabe der Ersatzfedern</h4>
        <div className="resultContent">
          <div>
            <span>Auslenkungskraft</span>
            <div>
              {f ? (
                <>
                  <span className="resultValue">{f.toFixed(2)}</span>
                  <span className="unit">N</span>
                </>
              ) : (
                <span className="resultValue">N/A</span>
              )}
            </div>
          </div>
          <div>
            <span>Ersatzfederhöhe</span>
            <div>
              {h ? (
                <>
                  <span className="resultValue">{h.toFixed(2)}</span>
                  <span className="unit">mm</span>
                </>
              ) : (
                <span className="resultValue">N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
