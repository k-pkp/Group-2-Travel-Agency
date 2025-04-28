import Header from "../Header";
import HeroSection from "./HeroSection";
import DestinationsSection from "./DestinationsSection";
import Footer from "../Footer";

function LandingPage() { // Define the functional component `LandingPage`.
  return (
    <main className="mx-auto my-0 max-w-full font-['Inter']">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.30.0/tabler-icons.min.css"
        rel="stylesheet"
      />

      <Header />
      <HeroSection/>
      <DestinationsSection />
      <Footer />
    </main>
  );
}

export default LandingPage;
