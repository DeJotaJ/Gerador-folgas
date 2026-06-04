export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-[#BB3BEE] flex flex-col items-center justify-center z-50">
      <img
        src="/lirio.png"
        alt="Lírio"
        className="w-32 h-32 mb-6 animate-bounce brightness-200"
      />

      <h1 className="text-white text-4xl font-bold tracking-wider">
        Gerador de Folgas
      </h1>

      <p className="text-white/80 mt-2 hidden">
        Organizando suas escalas...
      </p>
    </div>
  );
}