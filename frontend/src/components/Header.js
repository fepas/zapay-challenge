import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function Header() {

    const history = useHistory();

    const goHome = () => {
        history.push("/");
    }

    return (
        <Box boxShadow={3}>
            <div style={{ display: "flex", padding: "15px", backgroundColor: "#FFFFFF", justifyContent: "space-between" }}>
                <img alt="Zapay" onClick={goHome} height="60px" style={{ paddingLeft: "15px" }} src="https://usezapay.com.br/landing/static/zapay-31f66c480c7f05212397fe9b5540c8c1.png"></img>
                <Button variant="contained" color="secondary">
                    Entrar
                </Button>
            </div >
        </Box >
    )
}

export default Header;
