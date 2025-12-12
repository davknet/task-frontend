import './style/alert.css'; 










export default function Alert({ show, message, onClose }) { 

  if (!show) return null;


                return (
                    <div className="overlay">
                    <div className="model">
                        <p className="alert-text">{message}</p>
                        <button className="alert-button" onClick={onClose}>OK</button>
                    </div>
                    </div>
                );
 }
