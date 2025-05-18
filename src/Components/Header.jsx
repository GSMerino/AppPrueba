 import { Link } from 'react-router-dom';


const Header = () => {
    return(
        <header className="header">
            <h2 className="header__title">Taller App</h2>
            <nav className="header__nav">
                <ul className="header__menu">
                    <li><Link className='header__menu--itemNav' to="/">Inicio</Link></li>
                    <li><Link className='header__menu--itemNav' to="/Register">Registrar Vehículo</Link></li>
                    <li><Link className='header__menu--itemNav' to="/inspection">Inspección</Link></li>
                </ul> 
            </nav>
        </header>
    );
};

export default Header;