import React, {useEffect, useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export function SellerPage() {

    const [posts,setPosts]=useState([]);
    const id=JSON.parse(sessionStorage.getItem("user")).id || "60f9b0b0b0b0b0b0b0b0b0b0";

    const navigate=useNavigate()
    useEffect(()=>{
        axios.post("http://localhost:3001/getPostsBySellerId",{
            id:id
        }).then(res => {
            setPosts(res.data)
        })
    },[])


    function EditPost(_id) {
        navigate(`/edit-post?id=${_id}`)
    }

    function DeletePost(_id) {

    }

    return(
        <div>
            <h1>Seller Page</h1>
            <div className='d-flex flex-row'>
                <Row xs={3} md={3} className="mx-3 g-4 d-flex">
                    {posts.map((p,index)=>(
                        <Col key={index} style={{width: '20rem'}}>
                            <Card style={{ width: '15rem'}} className={"d-flex flex-column"}  key={p._id}>
                                <Card.Body>
                                    <Card.Title>{p.name}</Card.Title>
                                    <Card.Text>{p.price}</Card.Text>
                                    <Card.Text>{p.description}</Card.Text>
                                </Card.Body>
                                <Card.Footer className={'d-flex flex-column bg-white'}>
                                    <Button className={"my-3"} variant="primary" onClick={()=>EditPost(p._id)}>Edit Post</Button>
                                    <Button variant="danger" onClick={()=>DeletePost(p._id)}>Remove Post</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )

}