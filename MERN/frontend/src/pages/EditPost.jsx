import React, {useEffect, useState} from "react";
import {Button, FloatingLabel, Form} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";


export function EditPost(){

    const [petName, setPetName] = useState("");
    const [petDescription, setPetDescription] = useState("");
    const [petPrice, setPetPrice] = useState(0);
    const navigate = useNavigate();
    const user={
        tp:"0774587965",
            _id:"60f9b0b0b0b0b0b0b0b0b0b0"
    };
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        axios.post("http://localhost:3001/getSinglePost", {
            id: searchParams.get("id")
        }).then((res) => {
            if(res.data){
                setPetName(res.data.name);
                setPetDescription(res.data.description);
                setPetPrice(res.data.price);
            }
        })
    },[])


    const EditPost = async (e) => {
        axios.post('http://localhost:3001/update-post', {
            id: searchParams.get("id"),
            name: petName,
            description: petDescription,
            price: petPrice,
        }).then(res => {
            Swal.fire({
                title: "Success!",
                text: "Post Updated successfully!",
                icon: "success",
                confirmButtonText: "OK"
            })
            navigate('/')
        }).catch(err => {
            Swal.fire({
                title: "Error!",
                text: "Error Updating Post!",
                icon: "error",
                confirmButtonText: "OK"
            })
        })

    }

    return(
        <div>
            <h1>Edit Post</h1>
            <Form>
                <FloatingLabel
                    controlId="floatingInputUserName"
                    label="Pet Name"
                    className="mb-3 "
                >
                    <Form.Control type="text" placeholder="Charley" value={petName} onChange={(e)=>setPetName(e.target.value)}/>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInputUserName"
                    label="Pet Description"
                    className="mb-3 "
                >
                    <Form.Control type="text" style={{height:100}} placeholder="Charley is a very" value={petDescription} onChange={(e)=>setPetDescription(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInputUserName"
                    label="Pet Price"
                    className="mb-3 "
                >
                    <Form.Control type="number" placeholder="Charley is a very" value={petPrice} onChange={(e)=>setPetPrice(e.target.value)}/>
                </FloatingLabel>
                <div>
                    <Button variant="primary" onClick={EditPost}>Edit Post</Button>
                </div>

            </Form>

        </div>
    )
}