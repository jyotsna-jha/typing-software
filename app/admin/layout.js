import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";

export const metadata = {
  title: "admin",
  description: "admin panel",
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
