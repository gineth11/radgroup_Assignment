import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {IsAdmin} from "../Script/Auth.jsx";



export function AdminPage(){
    const [sellers,setSellers]=useState([]);
    const navigator=useNavigate();
    useEffect(()=>{
        if(!IsAdmin()){
            navigator("/");
        }
        axios.get('http://localhost:3001/user/getSellers').then(res => {
            if(res.data){
                setSellers(res.data.data)
            }
        })

    },[])


    function DeleteSeller(_id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:3001/user/delete-user', {
                    id: _id
                }).then(res => {
                    if (res.data) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                navigator("/admin");
                                window.location.reload();
                            }
                        })
                    }
                })
            }
        })
    }

    function EditSeller(_id) {
        navigator(`/edit-seller?id=${_id}`)
    }

    return(
        <div>
            <h1>Admin Page</h1>
                <div className='d-flex flex-row'>
                    <Row xs={3} md={3} className="mx-3 g-4 d-flex">
                        {sellers.map((p,index)=>(
                            <Col key={index} style={{width: '20rem'}}>
                                <Card style={{ width: '15rem'}} className={"d-flex flex-column"}  key={p._id}>
                                    <Card.Body>
                                        <Card.Title>{p.username}</Card.Title>
                                        <Card.Text>{p.email}</Card.Text>
                                        <Card.Text>{p.tp}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className={'d-flex flex-column bg-white'}>
                                        <Button className={"my-3"} variant="primary" onClick={()=>EditSeller(p._id)}>Edit Seller</Button>
                                        <Button variant="danger" onClick={()=>DeleteSeller(p._id)}>Remove Seller</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
        </div>
    )
}