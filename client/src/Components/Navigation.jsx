import {Link} from 'react-router-dom';
const Navigation = ()=>{
    return(<>
    <header>
        <div className='logo'>Fake Degree Prevention</div>
            <nav>
                <ul>
                    <li>
                        <Link className='nav_link' to='/'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className='nav_link' to='/all-details'>
                            View All Records
                        </Link>
                    </li>
                    <li>
                        <Link className='nav_link' to='/add-student-details'>
                            Add New Student Record
                        </Link>
                    </li>
                    <li>
                        <Link className='nav_link' to='/details-by-hash'>
                            Search Record By Hash
                        </Link>
                    </li>
                    <li>
                        <Link className='nav_link' to='/get-student-details-by-index'>
                            Search Record By ID
                        </Link>
                    </li>
                </ul>
            </nav>
    </header>
    </>)
}
export default Navigation;