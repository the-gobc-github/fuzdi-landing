import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#4a0a0a] to-[#8B4513] animate-gradient">
      <Header />

      {/* Hero Section */}
      <main className="min-h-screen flex flex-col items-center justify-center px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl lg:text-6xl font-light text-white leading-tight mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            L'intelligence artificielle,
            <br />
            taillée pour les créatifs.
          </h1>

          <p className="text-xl md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
            Nous formons les créatifs et proposons une interface
            <br />
            professionnelle unique donnant accès aux meilleurs modèles
            <br />
            d'IA créatives, propriétaires et open source.
          </p>
        </div>
      </main>
    </div>
  );
}
