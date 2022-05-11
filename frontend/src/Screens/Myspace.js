import React, {useState} from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import axios from "axios";
import {Box, FormControl, InputLabel, MenuItem} from "@mui/material";
import {Select} from "antd";

const MySpace = () => {
    //setContenu($contenu);
    const handleChange = (event) => {
        setCategory(event.target.value);
        setDataType(event.target.value)
    };

       // const [loading, setLoading] = useState(false);
        const [category,setCategory]= useState('')
        const [data_type, setDataType] = useState('')
        const [contenu, setContenu] = useState('')
    const [creationdate, setCreationdate] = useState('')
    const [auteur_id, setAuteur] = useState('')
    const submitHandler = () => {
        // Dispatch what to doe.preventDefault()
           console.log(category,data_type, contenu,creationdate,auteur_id)
             axios.post("http://127.0.0.1:8000//Posting", {
                category:category, data_type: data_type,contenu:contenu,creationdate:creationdate,
                auteur_id: auteur_id
               })
                 //.then(res =>
                 //console.log(res))
    }

    return (
        <div>
            <Container>


                <Row >
                    <h4>partage l'information </h4>

                    <Col className='pt-5'>
                        <Box sx={{ minWidth: 20 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="category"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>IT</MenuItem>
                                    <MenuItem value={20}>Marketing</MenuItem>
                                    <MenuItem value={30}>Software</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <form onSubmit={submitHandler}>
                            <textarea
                                className="form-control"
                                style={{
                                    borderRadius: '10px',
                                    width: '1100px',
                                    height: '100px',
                                    marginRight: 'auto'
                                }}>
                            </textarea>
                        </form>
                        <Button type='submit'
                            style={{
                                borderRadius: '10px',
                                borderColor: '#A2599F',
                                backgroundColor: '#A2599F',
                                float: 'right',
                                margin: '20px 200px 0 0',
                            }}>
                            Publier
                        </Button>
                    </Col>
                    <Col className='pt-5'>
                        <Row >
                            <Button
                                style={{
                                    borderRadius: '25px',
                                    borderColor: '#E0C7DF',
                                    backgroundColor: '#E0C7DF',
                                    color: '#642277',
                                    width: '200px',
                                    height: '120px',
                                    marginLeft: 'auto'
                                }}>
                                Mes Publications
                            </Button>
                        </Row>
                        <Row className='pt-5'>
                            <Button
                                style={{
                                    borderRadius: '25px',
                                    borderColor: '#E0C7DF',
                                    backgroundColor: '#E0C7DF',
                                    color: '#642277',
                                    width: '200px',
                                    height: '120px',
                                    marginLeft: 'auto'
                                }}>
                                Mes Questions
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MySpace