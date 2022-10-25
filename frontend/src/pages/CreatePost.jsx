import React, {useState} from "react";
import {Button, FloatingLabel, Form} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";


export function CreatePost(){

    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [petAge, setPetAge] = useState(0);
    const [petGender, setPetGender] = useState("");
    const [petDescription, setPetDescription] = useState("");
    const [petPrice, setPetPrice] = useState(0);
    const navigate = useNavigate();
    const user={
        tp:"0774587965",
            _id:"60f9b0b0b0b0b0b0b0b0b0b0"
    };
    // const user = JSON.parse(sessionStorage.getItem("user"));


    const CreatePost = async (e) => {
        axios.post('http://localhost:3001/pet/save', {
            name: petName,
            description: petDescription,
            age: petAge,
            type: petType,
            gender: petGender,
            price: petPrice,
            user: user._id,
            tp: user.tp
        }).then(res => {
            Swal.fire({
                title: "Success!",
                text: "Pet added successfully!",
                icon: "success",
                confirmButtonText: "OK"
            })
            navigate('/')
        }).catch(err => {
            Swal.fire({
                title: "Error!",
                text: "Error adding pet!",
                icon: "error",
                confirmButtonText: "OK"
            })
        })

    }

    return(
        <div>
            <h1>Create Post</h1>
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
                    label="Pet Type"
                    className="mb-3 "
                >
                    <Form.Control type="text" placeholder="Dog" value={petType} onChange={(e)=>setPetType(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInputUserName"
                    label="Pet Age"
                    className="mb-3 "
                >
                    <Form.Control type="number" placeholder="2" value={petAge} onChange={(e)=>setPetAge(e.target.value)}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInputUserName"
                    label="Pet Gender"
                    className="mb-3 "
                >
                    <Form.Control type="text" placeholder="Male" value={petGender} onChange={(e)=>setPetGender(e.target.value)}/>
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
                <Button variant="primary" onClick={CreatePost}>Create Post</Button>
            </Form>

        </div>
    )
}