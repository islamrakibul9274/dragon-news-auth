import Navbar from "../components/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div className="font-poppins bg-[#f3f3f3] min-h-screen">
      <header className="py-4 w-11/12 mx-auto">
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;