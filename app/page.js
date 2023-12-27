import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import Hero1 from "@/components/Hero/Hero1";
import Hero2 from "@/components/Hero/Hero2";


export default function Home() {
  return (
    <>
     <NavBar />
     <Hero2 title={"Anand Typing"}/>
     <Hero1/>
     <Footer/>
    </>
 
  );
}
