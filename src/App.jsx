import { Link } from 'react-router-dom'
import './App.css'
import './index.css'
import { useState } from 'react'

export default function App() {

  const [dia1, setDia1] = useState("");
  const [dia2, setDia2] = useState("");
  const [resultado, setResultado] = useState([]);

  function gerarDatas() {
  if (!dia1 || !dia2) return;

  const [d1, m1] = dia1.split("/").map(Number);
  const [d2, m2] = dia2.split("/").map(Number);

  const ano = new Date().getFullYear();

  const data1 = new Date(ano, m1 - 1, d1);
  const data2 = new Date(ano, m2 - 1, d2);

  // valida se são dias seguidos
  const diffEmDias =
    (data2 - data1) / (1000 * 60 * 60 * 24);

  if (diffEmDias !== 1) {
    alert("Os dias precisam ser seguidos. Ex: 31/05 e 01/06");
    return;
  }

  // limite: 30/31 dias depois do primeiro
  const limite = new Date(data1);
  limite.setMonth(limite.getMonth() + 1);

  let pares = [];

  // começa 3 dias depois do segundo
  let inicio = new Date(data2);
  inicio.setDate(inicio.getDate() + 3);

  while (inicio <= limite) {
    let fim = new Date(inicio);
    fim.setDate(fim.getDate() + 1);

    // evita incluir se passar do limite
    if (fim > limite) break;

    pares.push(
      `${String(inicio.getDate()).padStart(2, "0")}/${String(
        inicio.getMonth() + 1
      ).padStart(2, "0")} - ${String(
        fim.getDate()
      ).padStart(2, "0")}/${String(
        fim.getMonth() + 1
      ).padStart(2, "0")}`
    );

    // próximo bloco com intervalo de 2 dias
    inicio.setDate(inicio.getDate() + 4);
  }

  setResultado(pares);
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
          className="w-full bg-white text-purple-700 uppercase rounded-xl py-3 font-medium hover:bg-purple-900 hover:text-white transition"
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
      </div>
    </div>
  )
}
