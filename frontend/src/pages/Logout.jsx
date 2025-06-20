import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Itt kellene törölni a felhasználói adatokat, pl. a localStorage-ból
    // localStorage.removeItem('user'); 
    console.log("User logged out");
    toast.success("Successfully logged out");
    navigate('/login');
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignOutAlt /> Logout
        </h1>
        <p>Are you sure you want to log out?</p>
      </section>

      <section className="form">
        <button className="btn btn-block" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </>
  );
}

export default Logout