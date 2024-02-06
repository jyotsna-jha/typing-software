import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";

export const metadata = {
  title: "Downloads",
  description: "Downloads",
};

export default function root({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
