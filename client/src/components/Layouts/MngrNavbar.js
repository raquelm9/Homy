import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const MngrNavbar = () => {
    const buildingName = "Building #1"
    return (
        <nav className="mngr-navbar">
            <Col xs={3} md={3} className='mngr-navbar-logo'>
                <h1 className='navbar-logo'>homy</h1>
            </Col>
            <Col xs={9} md={6}>
                <h4>{buildingName}</h4>
            </Col>
            <Col xs={0} md={3}>
                <div className="links">
                    <Link href="/manager">Home</Link>
                    <Link href="/manager">Help</Link>
                    {/* <Link to="/manager" >Home</Link>
                    <Link to="/manager" style={{
                        color: "white",
                        backgroundColor: "#f1356d",
                        borderRadius: '8px'
                    }}>Help</Link> */}
                </div>
            </Col>

        </nav>
    );
}

export default MngrNavbar;