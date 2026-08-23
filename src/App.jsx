import { Link } from 'react-router-dom'
import './App.css'
import './index.css'
import { useEffect, useState } from 'react'
import SplashScreen from './components/SplashScreen';
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react"

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

    const hoje = new Date();

    // Pula todas as folgas dos meses anteriores ao mês atual
    while (
      inicio.getFullYear() === hoje.getFullYear() &&
      inicio.getMonth() < hoje.getMonth()
    ) {
      inicio.setDate(inicio.getDate() + 4);
    }

    // Esse while continua igual
    while (inicio.getFullYear() === anoAtual) {
      let fim = new Date(inicio);
      fim.setDate(fim.getDate() + 1);

      pares.push(
        `${String(inicio.getDate()).padStart(2, "0")}/${String(
          inicio.getMonth() + 1
        ).padStart(2, "0")} - ${String(fim.getDate()).padStart(2, "0")}/${String(
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

  const nomesMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const folgasPorMes = resultado.reduce((acc, folga) => {
    const dataInicial = folga.split(" - ")[0];
    const [, mes] = dataInicial.split("/");

    if (!acc.has(mes)) {
      acc.set(mes, []);
    }

    acc.get(mes).push(folga);

    return acc;
  }, new Map());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (

    <Analytics>
      {loading && <SplashScreen />}

      <AnimatePresence>

        {!loading && (
          <motion
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inset-0 bg-[#121212]"
          >

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
                    className="border border-white bg-white text-center rounded-xl p-1.5 text-[#BB3BEE] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />

                  <input
                    type="text"
                    placeholder="02/06"
                    value={dia2}
                    onChange={(e) => setDia2(e.target.value)}
                    className="border border-white bg-white text-center rounded-xl p-1.5 text-[#BB3BEE] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <button
                  onClick={gerarDatas}
                  className="w-full my-1 border-2 bg-white text-[#BB3BEE] uppercase rounded-xl py-2.5 font-medium hover:bg-[#BB3BEE] hover:text-white hover:border-2 border-white transition"
                  >
                  Gerar Datas
                </button>
                

                {resultado.length > 0 && (
                  <div className="mt-4 space-y-4">

                    <h2 className="font-bold text-white text-center text-xl uppercase">
                      Suas Folgas
                    </h2>

                    {Array.from(folgasPorMes.entries()).map(([mes, folgas]) => (
                      <div
                      key={mes}
                      className="bg-white backdrop-blur-sm shadow shadow-black/50 rounded-2xl p-4"
                      >
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="h-8 w-1 rounded-full bg-white/0" />

                            <h3 className="text-xl font-bold text-purple-500">
                              {nomesMeses[Number(mes) - 1]}
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            {folgas.map((folga, index) => (
                              <div
                              key={index}
                              className="bg-purple-500 rounded-xl py-2.5 px-4 text-center font-bold text-white hover:shadow shadow-black/75"
                              >
                                {folga}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
                <button
                  onClick={limparDados}
                  className="w-full my-2 border-2 bg-white text-[#BB3BEE] uppercase rounded-xl py-2.5 font-medium hover:bg-[#BB3BEE] hover:text-white hover:border-2 border-white transition"
                  >
                  Limpar Dados
                </button>
              </div>
            </div>
          </motion>
        )}
      </AnimatePresence>
    
    </Analytics>
  )
}
