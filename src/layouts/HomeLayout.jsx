import Header from "../components/Header";
import LatestNews from "../components/LatestNews";
import LeftNavbar from "../components/layout-component/LeftNavbar";
import RightNav from "../components/layout-component/RightNav";
import Navbar from "../components/Navbar";

const HomeLayout = ({ children }) => {
  return (
    <div className="font-poppins min-h-screen bg-white text-gray-900">
      <header>
        <Header />
        <section className="w-11/12 my-2 mx-auto">
          <LatestNews />
        </section>
      </header>

      <nav className="w-11/12 mx-auto py-2">
        <Navbar />
      </nav>

      <main className="w-11/12 mx-auto pt-5 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Designing the Left Navbar */}
        <aside className="left col-span-12 md:col-span-3">
          <LeftNavbar />
        </aside>

        {/* Designing the main Content */}
        <section className="main col-span-12 md:col-span-6">
          {children}
        </section>

        {/* Designing the Right Navbar */}
        <aside className="right col-span-12 md:col-span-3">
          <RightNav />
        </aside>
      </main>
    </div>
  );
};

export default HomeLayout;