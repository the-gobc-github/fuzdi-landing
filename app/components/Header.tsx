import Image from "next/image";

export default function Header() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 animate-fade-in">
            <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
                <Image
                    src="/images/fuzdi_orange.png"
                    alt="Fuzdi Logo"
                    width={180}
                    height={80}
                    priority
                    className="h-20 w-auto transition-transform hover:scale-105 duration-300"
                />
                <ul className="flex items-center gap-12 text-white/90 text-base">
                    <li>
                        <a href="#audit" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                            Audit
                        </a>
                    </li>
                    <li>
                        <a href="#formation" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                            Formation
                        </a>
                    </li>
                    <li>
                        <a href="#solution" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                            Solution
                        </a>
                    </li>
                    <li>
                        <a href="#generation" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                            Génération d'assets
                        </a>
                    </li>
                    <li>
                        <a href="#apropos" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                            À propos
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
