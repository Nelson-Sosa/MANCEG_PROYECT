import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SupliersEdit.css'
export const SupliersEdit=  () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [ruc, setRuc] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [mail, setMail] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [sitioWep, setSitioWep] = useState("");
    const [successMessage, setSuccessMessage] = useState("")


    useEffect(() => {
        axios.get(`http://localhost:8000/api/supliers/${id}`)
            .then(res => {
                setName(res.data.name);
                setRuc(res.data.ruc);
                setPhone(res.data.phone);
                setAddress(res.data.address);
                setMail(res.data.mail);
                setPostalCode(res.data.postalCode);
                setSitioWep(res.data.sitioWep);
            })
            .catch(err => console.log(err));
    }, [id]);

    const actualizarSupliers = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/actualizar/supliers/${id}`, {
            name,
            ruc,
            phone,
            address,
            mail,
            postalCode,
            sitioWep
        })
            .then(res =>{
                console.log(res);
                setSuccessMessage("Se Actualizo con exito");
            })
            .catch(err => console.log(err));
    };

    return (
        
         
        <div className="suplierCont">
        {successMessage && <p className="success-message">{successMessage}</p>}     
        <h1 className="titulo">Update Suppliers</h1>
        
        <form onSubmit={actualizarSupliers} className="supplier-form">
            <p>
                <label>Name</label><br />
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </p>
            <p>
                <label>RUC</label><br />
                <input
                    type="text"
                    name="ruc"
                    placeholder="RUC"
                    onChange={(e) => setRuc(e.target.value)}
                    value={ruc}
                />
            </p>
            <p>
                <label>Phone</label><br />
                <input
                    type="number"
                    name="phone"
                    placeholder="Telefono"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                />
            </p>
            <p>
                <label>Address</label><br />
                <input
                    type="text"
                    name="address"
                    placeholder="Direccion"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                />
            </p>
            <p>
                <label>Mail</label><br />
                <input
                    type="text"
                    name="mail"
                    placeholder="Correo electronico"
                    onChange={(e) => setMail(e.target.value)}
                    value={mail}
                />
            </p>
            <p>
                <label>Postal Code</label><br />
                <input
                    type="number"
                    name="postalCode"
                    placeholder="Codigo Postal"
                    onChange={(e) => setPostalCode(e.target.value)}
                    value={postalCode}
                />
            </p>
            <p>
                <label>Sitio Web</label><br />
                <input
                    type="text"
                    name="sitioWep"
                    placeholder="Sitio Web"
                    onChange={(e) => setSitioWep(e.target.value)}
                    value={sitioWep}
                />
            </p>
            <div className="cont">
            <button type="submit">Update</button>
            <Link to='/supliers'>
            <button type="submit" id="btnCancelar">Cancel</button>
            </Link>
            </div>
        </form>
    </div>
    
    );
}

