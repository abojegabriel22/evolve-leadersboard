
import React, { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset icon after 2s
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button 
      onClick={handleCopy} 
      className="btn btn-sm p-0 ms-2 text-secondary border-0"
      title="Copy Address"
      style={{ background: 'none', verticalAlign: 'middle' }}
    >
      {copied ? <FaCheck className="text-success" /> : <FaCopy />}
    </button>
  );
};

const EvolveTable = ({ data, title }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-center text-white mb-4">{title}</h2>

      {/* --- DESKTOP VIEW: Visible only on large screens (d-none d-lg-block) --- */}
      <div className="table-responsive shadow-lg rounded d-none d-lg-block">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead className="table-light text-dark">
            <tr>
              <th className="ps-3">Rank</th>
              <th>Wallet Address</th>
              <th>Chain</th>
              <th className="text-end">Evolve Amount</th>
              <th className="text-end pe-4">Value ($)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td className="ps-4 fw-bold">{index + 1}</td>
                <td className="text-info font-monospace">
                  {
                  item.walletAddress
                  .substring(0, 8)}...{item.walletAddress.slice(-6)
                  }
                  <CopyButton text={item.walletAddress} />
                </td>
                <td><span className="badge bg-warning text-dark">{item.chain}</span></td>
                <td className="text-end fw-bold text-success">
                  {item.evolveAmount.toLocaleString()}
                </td>
                <td className="text-end pe-4 fw-bold text-light">
                  ${item.amountDollars ? item.amountDollars.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW: Visible only on small/medium screens (d-lg-none) --- */}
      <div className="d-lg-none">
        {data.map((item, index) => (
          <div key={item._id} className="card bg-dark text-white mb-3 shadow border-secondary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-primary text-white">Rank #{index + 1}</span>
                <span className="badge bg-warning text-dark">{item.chain}</span>
              </div>
              
              <div className="mb-2">
                <small className="text-muted d-block">Wallet Address</small>
                <span className="text-info font-monospace">
                   {
                   item.walletAddress
                   .substring(0, 6)}...{item.walletAddress.slice(-4)
                   }
                   <CopyButton text={item.walletAddress} />
                </span>
              </div>

              <div className="row mt-3 border-top pt-2 border-secondary">
                <div className="col-6">
                  <small className="text-muted d-block">Amount</small>
                  <span className="text-success fw-bold">
                    {item.evolveAmount.toLocaleString()}
                  </span>
                </div>
                <div className="col-6 text-end">
                  <small className="text-muted d-block">Value (USD)</small>
                  <span className="text-light fw-bold">
                    ${item.amountDollars ? item.amountDollars.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolveTable;