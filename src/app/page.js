import ContactSection from "@/components/ContactSection";
import EventPopup from "@/components/EventPopup";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import HeroEvent from "@/components/HeroEvent";
import Highlights from "@/components/Highlights";
import HistorySection from "@/components/HistorySection";
import InstagramFeed from "@/components/InstagramFeed";
import MenuSection from "@/components/MenuSection";
import Navbar from "@/components/Navbar";
import Reviews from "@/components/Reviews";
import SocialSection from "@/components/SocialSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroEvent />
      <EventPopup />
      <HistorySection />
      <MenuSection />
      {/* <Highlights /> */}
      {/* <InstagramFeed /> */}
      <Reviews />

      <GallerySection />

      <ContactSection />
      <SocialSection />
      <Footer />
    </div>
  );
}
