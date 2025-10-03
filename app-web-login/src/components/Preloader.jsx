import '@/assets/Preloader/Preloader.css';
import "@/assets/react.svg"

const Preloader = () => {
    return (
        <div className="page-preloader">
            <div className="preloader-container">
                <div className="spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                </div>
                <div className="preloader-text">
                    <h3>Cargando...</h3>
                    <p>Por favor espera un momento</p>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
