import { Link } from 'react-router-dom'
import './App.css'
import './index.css'
import { useState } from 'react'

export default function App() {

  // Verifica se o ano mudou ANTES de criar os estados
  const anoAtual = new Date().getFullYear();
  const anoSalvo = localStorage.getItem("anoFolgas");

  if (anoSalvo && Number(anoSalvo) !== anoAtual) {
    localStorage.removeItem("folgas");
    localStorage.removeItem("dia1");
    localStorage.removeItem("dia2");
    localStorage.removeItem("anoFolgas");
  }

  const [dia1, setDia1] = useState(() =>
    localStorage.getItem("dia1") || ""
  );

  const [dia2, setDia2] = useState(() =>
    localStorage.getItem("dia2") || ""
  );

  const [resultado, setResultado] = useState(() => {
    const folgasSalvas = localStorage.getItem("folgas");
    return folgasSalvas ? JSON.parse(folgasSalvas) : [];
  });

  function gerarDatas() {
    if (!dia1 || !dia2) return;

    const [d1, m1] = dia1.split("/").map(Number);
    const [d2, m2] = dia2.split("/").map(Number);

    const anoAtual = new Date().getFullYear();

    const data1 = new Date(anoAtual, m1 - 1, d1);
    const data2 = new Date(anoAtual, m2 - 1, d2);

    const diffEmDias =
      (data2 - data1) / (1000 * 60 * 60 * 24);

    if (diffEmDias !== 1) {
      alert("Os dias precisam ser seguidos. Ex: 31/05 e 01/06");
      return;
    }

    let pares = [];

    let inicio = new Date(data2);
    inicio.setDate(inicio.getDate() + 3);

    while (inicio.getFullYear() === anoAtual) {
      let fim = new Date(inicio);
      fim.setDate(fim.getDate() + 1);

      pares.push(
        `${String(inicio.getDate()).padStart(2, "0")}/${String(
          inicio.getMonth() + 1
        ).padStart(2, "0")} - ${String(
          fim.getDate()
        ).padStart(2, "0")}/${String(
          fim.getMonth() + 1
        ).padStart(2, "0")}`
      );

      inicio.setDate(inicio.getDate() + 4);

      if (inicio.getFullYear() !== anoAtual) {
        break;
      }
    }

    setResultado(pares);

    localStorage.setItem("folgas", JSON.stringify(pares));
    localStorage.setItem("dia1", dia1);
    localStorage.setItem("dia2", dia2);
    localStorage.setItem("anoFolgas", anoAtual.toString());
  }

  function limparDados() {
    localStorage.removeItem("folgas");
    localStorage.removeItem("dia1");
    localStorage.removeItem("dia2");
    localStorage.removeItem("anoFolgas");

    setResultado([]);
    setDia1("");
    setDia2("");
  }

  return (
    <div className='w-full min-h-screen py-8 flex justify-center bg-[#BB3BEE] overflow-x-hidden'>
      <div className="bg-[#BB3BEE] rounded-xl p-8 w-full max-w-lg overflow-x-hidden">
        <h1 className="text-2xl uppercase text-white font-bold mb-8 text-center">
          Gerador de Folgas
        </h1>

        <div className="grid grid-cols-2 gap-16 space-between mb-4">
          <input
            type="text"
            placeholder="01/06"
            value={dia1}
            onChange={(e) => setDia1(e.target.value)}
            className="border border-white bg-white text-center rounded-xl p-1.5 text-[#161616] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="text"
            placeholder="02/06"
            value={dia2}
            onChange={(e) => setDia2(e.target.value)}
            className="border border-white bg-white text-center rounded-xl p-1.5 text-[#161616] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          onClick={gerarDatas}
          className="w-full my-2 bg-white text-purple-700 uppercase rounded-xl py-3 font-medium hover:bg-purple-900 hover:text-white transition"
        >
          Gerar Datas
        </button>
        

        {resultado.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-xl p-4">
            <h2 className="font-semibold mb-3 text-purple-950 uppercase">Resultado:</h2>

            <ul className="space-y-2">
              {resultado.map((item, index) => (
                <li
                  key={index}
                  className="bg-white border border-purple-950 font-medium text-lg text-center text-purple-950 rounded-lg p-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={limparDados}
          className="w-full my-2 bg-purple-700 text-zinc-50 uppercase rounded-xl py-3 font-medium hover:bg-zinc-200 hover:text-purple-700 transition"
        >
          Limpar Dados
        </button>
      </div>
    </div>
  )
}
