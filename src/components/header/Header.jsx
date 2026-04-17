import "./Header.css";
import { useWallet } from "../../context/useWallet";
import { Link } from "react-router-dom"; // Add this import

const Header = () => {
  const { account, balance, connectWallet } = useWallet();
  
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          {/* Change brand to a Link so it returns Home */}
          <Link className="navbar-brand" to="/">
            <img className="img-header" src="src/assets/images/icon.png" alt="logo" width={50} />
            <span className="ps-3 mediaQHeader">EVOLVE PRO LEADERS BOARD</span>
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* Use 'to' instead of 'href' */}
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <button 
                  className="btn btn-outline-light d-flex align-items-center gap-2 mx-lg-3" 
                  onClick={connectWallet}
                >
                  {account ? (
                    <>
                      <img src="/src/assets/images/binance.jpeg" alt="BSC" width="20" height="20" />
                      <span>
                        {account.substring(0, 6)}...{account.slice(-4)} 
                        ({parseFloat(balance).toFixed(2)})
                      </span>
                    </>
                  ) : (
                    "Connect Wallet"
                  )}
                </button>
              </li>
              <li className="nav-item">
                {/* Point this to the path defined in App.jsx */}
                <Link className="nav-link" to="/leaders-board">Leaders Board</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;