import './appHeader.scss';
import { NavLink } from "react-router";


const AppHeader = () => {


    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink 
                            to='/'
                            end
                            style={({ isActive }) => ({
                                    color: isActive ? '#9F0013' : '#000000'
                                })
                            }
                        >
                            Character
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink 
                            to='/comics'
                            end
                            style={({ isActive }) => ({
                                    color: isActive ? '#9F0013' : '#000000'
                                })
                            }
                        >
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;