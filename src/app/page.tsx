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
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
          <div className="mb-14 text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              A végső MI kihívás
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl">
              A HAIO Magyarország vezető mesterséges intelligencia versenye,
              kapuként a Nemzetközi Mesterséges Intelligencia Olimpiára (IOAI).
            </p>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-accent mb-6 text-2xl font-bold md:text-3xl">
                Mi az IOAI?
              </h3>
              <p className="text-muted-foreground mb-6 text-base leading-relaxed md:text-lg">
                A Nemzetközi Mesterséges Intelligencia Olimpia a világ első MI
                olimpiája középiskolás diákok számára, ahol a legfényesebb elmék
                versenyeznek élvonalbeli kihívásokban.
              </p>
              <div className="text-primary flex items-center gap-4">
                <Globe className="h-6 w-6" />
                <span className="font-semibold">Globális verseny</span>
              </div>
            </div>

            <div className="relative">
              <div className="bg-accent/10 absolute inset-0 rounded-3xl blur-2xl" />
              <div className="bg-card/90 border-accent/20 relative rounded-3xl border p-8 backdrop-blur-sm">
                <Target className="text-accent mb-4 h-12 w-12" />
                <h4 className="mb-3 text-xl font-semibold">A te küldetésed</h4>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Jeleskedj a HAIO-ban, hogy helyet szerezz Magyarország nemzeti
                  csapatában, és versenyezz a világ legjobb fiatal MI tehetségei
                  ellen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard icon={Trophy} title="Elit verseny">
              Versenyezz Magyarország legtehetségesebb diákjaival fejlett MI
              kihívásokban.
            </FeatureCard>
            <FeatureCard icon={Users} title="Szakértői mentorálás">
              Tanulj vezető MI kutatóktól és iparági szakemberektől az utad
              során.
            </FeatureCard>
            <FeatureCard icon={Zap} title="Élvonalbeli készségek">
              Fejleszd tudásod gépi tanulásban, neurális hálózatokban és modern
              algoritmusokban.
            </FeatureCard>
          </div>
        </div>
      </section>{" "}
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
