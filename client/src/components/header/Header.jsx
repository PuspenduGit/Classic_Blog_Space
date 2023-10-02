
import { AppBar, Toolbar, styled } from '@mui/material'; 
import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { DataContext } from '../../context/DataProvider';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`

const Header = () => {
    
    // const account = useContext(DataContext);

    // console.log(account);

    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/account'>LOGOUT</Link>
            </Container>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'right',
                }}
            >
                {/* <img src={}/> */}
            </div>
        </Component>
    )
}

export default Header;