import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

function Home() {

    const history = useHistory();

    const [debtOption, setDebtOption] = useState('ticket');
    const [licensePlate, setLicensePlate] = useState('');
    const [renavam, setRenavam] = useState('');

    const handleChange = (event) => {
        setDebtOption(event.target.value);
    };

    const searchDebt = (event) => {
        event.preventDefault()
        const url = `/debts/search?license_plate=${licensePlate}&debt_option=${debtOption}&renavam=${renavam}`
        history.push(url);
    }

    return (
        <div style={{ margin: "35px", marginTop: "10px" }}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <div style={{ padding: "10px" }}>
                        <Typography style={{ padding: "10px" }} variant="h3" align="left" color="secondary">
                            Livre-se agora
                            dos débitos do seu veículo!
                        </Typography>
                    </div>
                    <Typography style={{ paddingLeft: "20px" }} variant="subtitle2" align="justify">
                        IPVA, MULTAS, LICENCIAMENTO, DPVAT.
                        Tudo num só local para você pagar da forma como for melhor para o seu bolso!
                    </Typography>
                    <br />
                    <Typography style={{ paddingLeft: "20px" }} variant="body1" align="justify">
                        A Zapay é uma empresa credenciada no Departamento Nacional de Trânsito (DENATRAN) e autorizada a realizar parcelamentos de débitos de veículos. Portaria Nº 750, de 18 de Outubro de 2018.
                    </Typography>
                    <br />
                    <div style={{ display: "flex" }} >
                        <Card style={{ margin: "5px" }}>
                            <CardContent>
                                <Typography color="textPrimary" gutterBottom>
                                    Clientes Atendidos
                                </Typography>
                                <Typography style={{ color: "#FF0060" }} variant="h6" component="h2">
                                    +3,13
                                    Milhões
                                </Typography>

                                <Typography variant="caption">
                                    Um número que só cresce. Hoje já são mais de três milhões de consultas.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card style={{ margin: "5px" }}>
                            <CardContent>
                                <Typography color="textPrimary" gutterBottom>
                                    Regularizações
                                </Typography>
                                <Typography style={{ color: "#FF0060" }} variant="h6" component="h2" color="textPrimary">
                                    +215
                                    Mil
                                </Typography>
                                <Typography variant="caption">
                                    Mais de 215 mil veículos regularizados por meio da Zapay.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card style={{ margin: "5px" }}>
                            <CardContent>
                                <Typography color="textPrimary" gutterBottom>
                                    DETRANs Conveniados
                                </Typography>
                                <Typography style={{ color: "#FF0060" }} variant="h6" component="h2">
                                    +3,13
                                    Milhões
                                </Typography>
                                <Typography variant="caption">
                                    A maior cobertura nacional de consultas, integrados com 24 DETRANs de todas as regiões brasileiras.
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ padding: "20px" }} variant="h4" align="center" color="secondary">
                        Consulte os débitos do seu veículo
                        </Typography>
                    <TextField
                        id="outlined-full-width"
                        onChange={(e) => { setLicensePlate(e.target.value.toUpperCase()) }}
                        value={licensePlate}
                        error
                        label="Placa do veículo"
                        style={{ margin: 12 }}
                        placeholder="Digite aqui a placa do veículo"
                        helperText=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-full-width"
                        onChange={(e) => { setRenavam(e.target.value) }}
                        value={renavam}
                        error
                        label="Renavam"
                        style={{ margin: 12 }}
                        placeholder="Digite aqui a placa do veículo"
                        helperText=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <br></br>
                    <br></br>
                    <div style={{ display: "flex", flexDirection: "column", paddingLeft: "15px", justifyContent: "space-between" }}>
                        <FormControl component="TextField">
                            <FormLabel component="legend">Selecione o débito que deseja consultar</FormLabel>
                            <RadioGroup aria-label="Selecione o tipo de débito que deseja consultar" name="debtOptions" value={debtOption} onChange={handleChange}>
                                <FormControlLabel value="ticket" control={<Radio />} label="Multas" />
                                <FormControlLabel value="ipva" control={<Radio />} label="IPVA" />
                                <FormControlLabel value="dpvat" control={<Radio />} label="DPVAT" />
                                <FormControlLabel value="licensing" control={<Radio />} label="Licenciamento" />
                                <FormControlLabel value="all" control={<Radio />} label="Todos" />
                            </RadioGroup>
                        </FormControl>
                        <br></br>
                        <Button disabled={!(licensePlate.length === 7 && renavam.length === 11)} variant="contained" color="secondary" onClick={searchDebt}>
                            Consultar
                        </Button>
                    </div>
                </Grid>
            </Grid >
        </div >
    );
}

export default Home;