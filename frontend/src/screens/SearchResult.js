import { React, useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import Card from '@material-ui/core/Card';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import api from '../api';

function SearchResult(props) {

    const url = props.location.search

    const [tickets, setTickets] = useState([]);
    const [ipva, setIpva] = useState([]);
    const [dpvat, setDpvat] = useState([]);
    const [licensing, setLicensing] = useState([]);

    useEffect(() => {
        async function redirect() {
            const response = await api.get(`/debts/search${url}`);
            if (response.data.Multas) {
                setTickets(response.data.Multas)
            }
            if (response.data.IPVA) {
                setIpva(response.data.IPVA)
            }
            if (response.data.DPVAT) {
                setDpvat(response.data.DPVAT)
            }
            if (response.data.Licenciamento) {
                setLicensing(response.data.Licenciamento)
            }
        }
        redirect();
    }, [url]);


    return (
        <div>

            <div style={{ padding: "10px" }}>

                <Typography style={{ padding: "30px" }} variant="h4" align="left" color="secondary">
                    Os seguintes débitos foram encontrados:
                        </Typography>

            </div>
            { (tickets.length !== 0)

                ? <Card style={{ margin: "35px", marginTop: "10px" }}>
                    <Typography style={{ padding: "20px" }} variant="h5" align="Left" color="secondary">
                        Multas
                        </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nome</TableCell>
                                    <TableCell align="left">Valor</TableCell>
                                    <TableCell align="left">Identificador</TableCell>
                                    <TableCell align="left">Descrição</TableCell>
                                    <TableCell align="right">Opções</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.map((ticket) => (
                                    <TableRow key={ticket.auto_infraction}>
                                        <TableCell align="left">{ticket.title}</TableCell>
                                        <TableCell align="left">{ticket.amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                                        <TableCell align="left">{ticket.auto_infraction}</TableCell>
                                        <TableCell align="left">{ticket.description}</TableCell>
                                        <TableCell align="right"><Button variant="contained" color="secondary"> Realizar pagamento </Button> </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card> : <></>

            }

            { (ipva.length !== 0)

                ? <Card style={{ margin: "35px", marginTop: "10px" }}>
                    <Typography style={{ padding: "20px" }} variant="h5" align="Left" color="secondary">
                        IPVA
                        </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nome</TableCell>
                                    <TableCell align="left">Valor</TableCell>
                                    <TableCell align="left">Ano</TableCell>
                                    <TableCell align="left">Descrição</TableCell>
                                    <TableCell align="right">Opções</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ipva.map((ipva) => (
                                    <TableRow key={ipva.title}>
                                        <TableCell align="left">{ipva.title}</TableCell>
                                        <TableCell align="left">{ipva.amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                                        <TableCell align="left">{ipva.year}</TableCell>
                                        <TableCell align="left">{ipva.description}</TableCell>
                                        <TableCell align="right"><Button variant="contained" color="secondary"> Realizar pagamento </Button> </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card> : <></>

            }

            { (dpvat.length !== 0)

                ? <Card style={{ margin: "35px", marginTop: "10px" }}>
                    <Typography style={{ padding: "20px" }} variant="h5" align="Left" color="secondary">
                        DPVAT
                        </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nome</TableCell>
                                    <TableCell align="left">Valor</TableCell>
                                    <TableCell align="left">Ano</TableCell>
                                    <TableCell align="left">Descrição</TableCell>
                                    <TableCell align="right">Opções</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dpvat.map((dpvat) => (
                                    <TableRow key={dpvat.title}>
                                        <TableCell align="left">{dpvat.title}</TableCell>
                                        <TableCell align="left">{dpvat.amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                                        <TableCell align="left">{dpvat.year}</TableCell>
                                        <TableCell align="left">{dpvat.description}</TableCell>
                                        <TableCell align="right"><Button variant="contained" color="secondary"> Realizar pagamento </Button> </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card> : <></>

            }

            { (licensing.length !== 0)

                ? <Card style={{ margin: "35px", marginTop: "10px" }}>
                    <Typography style={{ padding: "20px" }} variant="h5" align="Left" color="secondary">
                        Licenciamento
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nome</TableCell>
                                    <TableCell align="left">Valor</TableCell>
                                    <TableCell align="left">Ano</TableCell>
                                    <TableCell align="left">Descrição</TableCell>
                                    <TableCell align="right">Opções</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {licensing.map((licensy) => (
                                    <TableRow key={licensy.auto_infraction}>
                                        <TableCell align="left">{licensy.title}</TableCell>
                                        <TableCell align="left">{licensy.amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                                        <TableCell align="left">{licensy.year}</TableCell>
                                        <TableCell align="left">{licensy.description}</TableCell>
                                        <TableCell align="right"><Button variant="contained" color="secondary"> Realizar pagamento </Button> </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>

                : <></>

            }

        </div >

    );
}

export default SearchResult;