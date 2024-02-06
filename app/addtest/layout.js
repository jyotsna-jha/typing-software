import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";

export const metadata = {
  title: "Add tests",
  description: "Add tests texts",
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
