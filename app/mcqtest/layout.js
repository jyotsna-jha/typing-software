import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";

export const metadata = {
  title: "Tests",
  description: "mcq tests",
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
