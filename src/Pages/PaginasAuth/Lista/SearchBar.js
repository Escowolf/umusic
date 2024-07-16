import React, { useState } from 'react';
import styled from 'styled-components';
import { InputGroup, FormControl, Button, Form, Col } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchHeader = styled.div`
    margin-top: 4px;
`;

function SearchBar(props) {
    const [musicas, setMusicas] = useState([]);
    const [search, setSearch] = useState('');
 
const navigate = useNavigate();
 
function newMusic() {
    navigate('/musicas/new');
}
 
function handleOnSubmit(event) {
    event.preventDefault();
    axios.get("http://localhost:4000/musicas").then((resp) => {
        setMusicas(resp.data);
      });
    const results = musicas.filter(m => m.nome.toLowerCase().indexOf(search) !== -1);
    props.setMusicas(results);
}
 
function handleSearchChange(event) {
    setSearch(event.target.value.toLowerCase());
}
    return (
        <SearchHeader>
            <Form onSubmit={handleOnSubmit}>
                <Form.Row>
                    <Col className="col-xl-3">
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search your musicas"
                                aria-label="Search your musicas"
                                onChange={handleSearchChange}
                            />
                            <InputGroup.Append>
                                <Button type="submit">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col className="col-xl-2">
                        <Form.Group controlId="order">
                            <Form.Control as="select">
                                <option>Mais nova</option>
                                <option>Mais antiga</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="primary" className="float-right" onClick={newMusic}>
                            New Music
                            </Button>
                    </Col>
                </Form.Row>
            </Form>
        </SearchHeader>
    );
}

export default SearchBar;