import { Link } from "react-router-dom";
import user from '../assets/user.png'
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    return (
        <div className=" flex justify-between items-center">

            <div>
                {
                    user && user.email
                }
            </div>

            <div className="nav space-x-5">
                <Link to={'/'}>Home</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/career'}>Career</Link>
            </div>
            <div className="login flex gap-2 items-center">
                <div>
                    {
                        user && user?.email ?
                            <div className="flex flex-col justify-center items-center"> 
                                
                                 <img className="w-[50px]" src={user?.photoURL} alt="" />
                                
                                <p>{user.displayName}</p>
                            </div> :
                            <img src={user} alt="" />
                    }

                    
                </div>
                {
                    user ?
                        <Link onClick={logOut} className="btn btn-neutral rounded-none">
                            Logout
                        </Link> :
                        <Link to={'/auth/login'} className="btn btn-neutral rounded-none">
                            Login
                        </Link>
                }
            </div>

        </div>
    );
};

export default Navbar;