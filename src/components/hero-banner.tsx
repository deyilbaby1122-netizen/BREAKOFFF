import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/icons";

export function HeroBanner() {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background image - large male fashion model, right side */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/fashion-hero.jpg"
          alt="Male fashion model in BREAKOFF clothing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left: Text content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-4">
            BREAKOFF
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            TIMELESS
            <span className="block text-6xl sm:text-7xl lg:text-8xl text-black -mt-2">
              CLOTHING
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-black/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Everyday essentials redefined.
            <br />
            <span className="font-medium text-white">Premium minimalist fashion.</span>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/new-in">
              <Button size="lg" className="!text-base !px-8 !py-4 !rounded-full">
                SHOP NEW IN
                <ArrowRight size={18} strokeWidth={2} />
              </Button>
            </Link>
            <Link href="/men">
              <Button
                variant="secondary"
                size="lg"
                className="!text-base !px-8 !py-4 !rounded-full !border-black"
              >
                SHOP MEN
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: Fashion model image */}
        <div className="flex-1 relative">
          <div className="aspect-[4/5] w-full">
            <Image
              src="/images/hero/fashion-hero.jpg"
              alt="BREAKOFF fashion model"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-4 max-w-xs">
            <p className="text-xs text-ink-500 font-medium">Premium Collection</p>
            <p className="text-lg font-bold text-ink-900">New Arrivals 2024</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
