import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Brain,
  ArrowRight,
  Target,
  Globe,
  Trophy,
  Users,
  Zap,
  Calendar,
  Clock,
  MonitorIcon,
} from "lucide-react";
import FeatureCard from "@/components/landing/feature-card";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[80vh] items-center justify-center">
        {/* Background Video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/promo_video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 flex justify-center">
              <Brain className="text-accent h-20 w-20" />
            </div>

            <h1 className="mb-6 text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
              HAIO
            </h1>

            <div className="text-accent mb-4 text-lg font-semibold tracking-wider md:text-xl">
              Hungarian Artificial Intelligence Olympiad
            </div>

            <p className="text-muted-foreground mx-auto mb-10 max-w-3xl text-base leading-relaxed md:text-lg">
              Versenyezz a legjobbakkal, és
              képviseld Magyarországot a 
              <br/>Nemzetközi Mesterséges Intelligencia Olimpián.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Button
                size="lg"
                className="from-accent to-primary group bg-gradient-to-r px-8 py-4 shadow-[0_0_15px_rgba(var(--primary)/_0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(var(--primary)/_0.65)] hover:shadow-blue-800"
              >
                Kezdd el az utad
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-accent/50 hover:bg-accent/10 shadow-[0_0_15px_rgba(var(--primary)/_0.5)] transition-all duration-300 hover:text-white hover:shadow-[0_0_25px_rgba(128,128,128,0.8)]"
              >
                Tudj meg többet az HAIO-ról
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Schedule Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Időpontok 2025/26</h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
              A legfontosabb események időpontjai.
            </p>
          </div>

          <div className="grid gap-8 md:grid-rows-3">
            {/* Event 1 */}
            <div className="bg-card/90 border-accent/20 relative rounded-3xl border p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Calendar className="text-accent h-8 w-8" />
                <h3 className="text-xl font-semibold">Jelentkezési határidő</h3>
              </div>
              <div className="text-muted-foreground flex items-center gap-3">
                <Calendar className="h-5 w-5" />
                <span><i>TBA</i></span>
              </div>
              <div className="text-muted-foreground mt-2 flex items-center gap-3">
                <Clock className="h-5 w-5" />
                <span><i>TBA</i></span>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-card/90 border-accent/20 relative rounded-3xl border p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <MonitorIcon className="text-accent h-8 w-8" />
                <h3 className="text-xl font-semibold">Online kvalifikáció</h3>
              </div>
              <div className="text-muted-foreground flex items-center gap-3">
                <Calendar className="h-5 w-5" />
                <span><i>TBA</i></span>
              </div>
              <div className="text-muted-foreground mt-2 flex items-center gap-3">
                <Clock className="h-5 w-5" />
                <span><i>TBA</i></span>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-card/90 border-accent/20 relative rounded-3xl border p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Trophy className="text-accent h-8 w-8" />
                <h3 className="text-xl font-semibold">Országos Döntő</h3>
              </div>
              <div className="text-muted-foreground flex items-center gap-3">
                <Calendar className="h-5 w-5" />
                <span><i>TBA</i></span>
              </div>
              <div className="text-muted-foreground mt-2 flex items-center gap-3">
                <Clock className="h-5 w-5" />
                <span><i>TBA</i></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
          <div className="mb-14 text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl text-gray-900">
              Nemzetközi MI Diákolimpiák
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed md:text-xl text-gray-600">
              A HAIO célja, hogy felfedezze és összegyűjtse a legtehetségesebb
              magyar diákokat, akik képviselhetik Magyarországot a Nemzetközi
              Mesterséges Intelligencia Olimpiákon.
            </p>
          </div>

          <div className="flex flex-col items-center">
            {/* Start node: HAIO */}
            <div className="bg-white/90 border-gray-200 relative flex flex-col items-center rounded-3xl border p-8 w-full max-w-xs shadow-md">
              <img
                src="/HAIO_TEXT_SVG.svg"
                alt="HAIO Logo"
                className="mb-4 h-32 w-32 object-contain"
              />
              <p className="text-gray-600 text-center mb-2">
                Magyarországi Mesterséges Intelligencia Olimpia – a magyar válogatóverseny a nemzetközi diákolimpiákra.
              </p>
              <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2 font-semibold transition">
                Jelentkezz most!
              </button>
            </div>
            {/* Dotted line down */}
            <div className="flex flex-col items-center">
              <div className="h-12 border-l-2 border-dotted border-blue-300" />
              {/* Split lines */}
              <div className="flex w-full justify-center items-center relative mb-[-1.5rem]">
                <div className="w-1/2 flex justify-end">
                  <div className="h-8 border-l-2 border-dotted border-blue-300" />
                  <div className="h-8 border-r-2 border-dotted border-blue-300" style={{ borderTop: "2px dotted #93c5fd", width: "40px", borderRight: "none", borderLeft: "none", borderBottom: "none", borderRadius: "0 0 0 16px" }} />
                </div>
                <div className="w-1/2 flex justify-start">
                  <div className="h-8 border-l-2 border-dotted border-blue-300" style={{ borderTop: "2px dotted #93c5fd", width: "40px", borderRight: "none", borderLeft: "none", borderBottom: "none", borderRadius: "0 0 16px 0" }} />
                  <div className="h-8 border-l-2 border-dotted border-blue-300" />
                </div>
              </div>
            </div>
            {/* Two branches: IOAI and IAIO */}
            
            <div className="flex flex-col md:flex-row gap-16 mt-2 w-full justify-center">
              {/* IOAI Card */}
              <div className="bg-white/90 border-gray-200 relative flex flex-col items-center rounded-3xl border p-8 w-full max-w-md md:max-w-lg shadow-md">
                <img
                  src="/IOAI.png"
                  alt="IOAI Logo"
                  className="mb-4 h-24 w-48 object-contain"
                />
                <p className="text-gray-600 text-center mb-4">
                  A világ első nemzetközi MI diákolimpiája, a legújabb Nemzetközi Tudományos Diákolimpia.
                  A legnagyobb fiatal koponyák mérik össze tudásukat a modern MI módszerekben. 
                  Deep learning, gépi látás, természetes nyelv feldolgozás.
                  Vesd be a kreativitásod, alkoss AI rendszereket, és oldj meg valós problémákat!
                </p>
                <a
                  href="https://ioai-official.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2 font-semibold transition">
                    Fedezd fel az IOAI-t
                  </button>
                </a>
              </div>
              {/* IAIO Card */}
              <div className="bg-white/90 border-gray-200 relative flex flex-col items-center rounded-3xl border p-8 w-full max-w-md md:max-w-lg shadow-md">
                <img
                  src="/IAIO.png"
                  alt="IAIO Logo"
                  className="mb-4 h-24 w-48 object-contain"
                />
                <p className="text-gray-600 text-center mb-4">
                  MI Diákolimpia más köntösben. 
                  Az IAIO fókuszában a hagyományos gépi tanulási problémák állnak.
                  Adattudomány, intelligens keresés, ajánlóalgoritmusok és sok más.
                  Ha érdekelnek a szigorúbb, algoritmikus megoldások, de mindezt
                  az AI területén alkalmaznád, akkor ezt az olimpiát neked találták ki!
                </p>
                <a
                  href="https://iaio-official.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2 font-semibold transition">
                    Fedezd fel az IAIO-t
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
          <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl text-gray-900">
            Korábbi Sikerek
          </h2>
          <div className="text-center text-gray-700 mb-16 text-2xl font-semibold flex items-center justify-center gap-2">
            3 olimpia, 18 magyar érem
          </div>
          <div className="space-y-16">
            {/* 2025 Edition */}
            <div>
              <h3 className="mb-8 text-2xl font-semibold text-gray-800 text-center">
                IOAI 2025 - Peking, Kína
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/balazs_szabo.jpg"
                    alt="Ungár Vince"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Ungár Vince</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/balazs_szabo.jpg"
                    alt="Lehotai Gergely"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Lehotai Gergely</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Bronze */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400 border-2 border-amber-400">
                  <img
                    src="/contestants/eszter_nagy.jpg"
                    alt="Nagy Dávid Leonárd"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-amber-400"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Nagy Dávid Leonárd</div>
                    <div className="mt-1 text-sm font-medium text-amber-800">Bronzérem</div>
                  </div>
                </div>
                {/* Bronze */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400 border-2 border-amber-400">
                  <img
                    src="/contestants/eszter_nagy.jpg"
                    alt="Reicher Martin"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-amber-400"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Reicher Martin</div>
                    <div className="mt-1 text-sm font-medium text-amber-800">Bronzérem</div>
                  </div>
                </div>
                {/* Bronze */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400 border-2 border-amber-400">
                  <img
                    src="/contestants/eszter_nagy.jpg"
                    alt="Magó Máté"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-amber-400"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Magó Máté</div>
                    <div className="mt-1 text-sm font-medium text-amber-800">Bronzérem</div>
                  </div>
                </div>
                {/* Bronze */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400 border-2 border-amber-400">
                  <img
                    src="/contestants/eszter_nagy.jpg"
                    alt="Labancz Benedek"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-amber-400"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Labancz Benedek</div>
                    <div className="mt-1 text-sm font-medium text-amber-800">Bronzérem</div>
                  </div>
                </div>
                {/* Honorable Mention */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border-2 border-blue-100">
                  <img
                    src="/contestants/marton_toth.jpg"
                    alt="Fleischman Illés"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-blue-100"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Fleischman Illés</div>
                    <div className="mt-1 text-sm font-medium text-blue-700">Dicséret</div>
                  </div>
                </div>
                {/* */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border-2 border-blue-100">
                  <img
                    src="/contestants/marton_toth.jpg"
                    alt="Demjén Eszter"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-blue-100"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Demjén Eszter</div>
                    <div className="mt-1 text-sm font-medium text-blue-700"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Riyadh Edition */}
            <div>
              <h3 className="mb-8 text-2xl font-semibold text-gray-800 text-center">
                IAIO 2025 - Rijád, Szaúd-Arábia
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Gold */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-300 border-2 border-yellow-300">
                  <img
                    src="/contestants/adam_varga.jpg"
                    alt="Labancz Benedek"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-yellow-400"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Labancz Benedek</div>
                    <div className="mt-1 text-sm font-medium text-yellow-800">Aranyérem</div>
                  </div>
                </div>
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/krisztina_szilagyi.jpg"
                    alt="Christ Miranda Anna"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Christ Miranda Anna</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/krisztina_szilagyi.jpg"
                    alt="Szilágyi Balázs"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Szilágyi Balázs</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Bronze */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-amber-200 via-amber-400 to-amber-300 border-2 border-amber-400">
                  <img
                    src="/contestants/gergo_kiss.jpg"
                    alt="Ungár Vince"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-amber-400"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Ungár Vince</div>
                    <div className="mt-1 text-sm font-medium text-amber-800">Bronzérem</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 2025 Edition */}
            <div>
              <h3 className="mb-8 text-2xl font-semibold text-gray-800 text-center">
                IOAI 2024 - Burgas, Bulgária
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/balazs_szabo.jpg"
                    alt="Ungár Vince"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Ungár Vince</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/balazs_szabo.jpg"
                    alt="Szilágyi Balázs"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Szilágyi Balázs</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/balazs_szabo.jpg"
                    alt="Kovács-Bánhalmi Hédi Zita"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Kovács-Bánhalmi Hédi Zita</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/balazs_szabo.jpg"
                    alt="Vajda Ádám"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Vajda Ádám</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/balazs_szabo.jpg"
                    alt="Christ Miranda Anna"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Christ Miranda Anna</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/balazs_szabo.jpg"
                    alt="Lehotai Gergely"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Lehotai Gergely</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/balazs_szabo.jpg"
                    alt="Nagy Dávid Leonárd"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Nagy Dávid Leonárd</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
                {/* Silver */}
                <div className="rounded-2xl shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border-2 border-gray-300">
                  <img
                    src="/contestants/balazs_szabo.jpg"
                    alt="Molnár István Ádám"
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-300"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">Molnár István Ádám</div>
                    <div className="mt-1 text-sm font-medium text-gray-700">Ezüstérem</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="from-accent/10 via-primary/5 to-accent/10 bg-gradient-to-r py-24">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-12 lg:px-24">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Készen állsz történelmet írni?
          </h2>
          <p className="text-muted-foreground mx-auto mb-12 max-w-3xl text-lg leading-relaxed">
            Csatlakozz a MI úttörők következő generációjához. A jövő a te
            HAIO-szerepléseddel kezdődik.
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Button
              size="lg"
              className="from-accent to-primary hover:shadow-glow bg-gradient-to-r px-12 py-4"
            >
              Regisztrálj most
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-accent/50 hover:bg-accent/10 px-12 py-4 hover:text-white"
            >
              Verseny részletek
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
