import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../supliersForm/SuplierForm.css';

const SuplierForm = () => {
    const [name, setName] = useState("");
    const [ruc, setRuc] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [mail, setMail] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [sitioWep, setSitioWep] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Name is required";
        else if (name.length < 3) newErrors.name = "Name must be at least 3 characters long";
        
        if (!ruc) newErrors.ruc = "RUC is required";
        
        if (!phone) newErrors.phone = "Phone is required";
        
        if (!address) newErrors.address = "Address is required";
        else if (address.length < 5) newErrors.address = "Address must be at least 5 characters long";
        
        if (!mail) newErrors.mail = "Mail is required";
        else if (!/.+\@.+\..+/.test(mail)) newErrors.mail = "Please fill a valid email address";
        
        if (!postalCode) newErrors.postalCode = "Postal code is required";
        
        return newErrors;
    };

    const agregarSuplier = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        axios.post('http://localhost:8000/api/agregar/supliers', {
            name,
            ruc,
            phone,
            address,
            mail,
            postalCode,
            sitioWep
        })
        .then(res => {
            console.log(res);
            setName("");
            setRuc("");
            setPhone("");
            setAddress("");
            setMail("");
            setPostalCode("");
            setSitioWep("");
            setErrors({});
        })
        .catch(err => {
            console.log(err);
            setErrors({ api: "An error occurred while adding the supplier. Please try again." });
        });
    };

    return (
        <div className="suplierCont">
            <h1 className="titulo">Add Suppliers</h1>
            <form onSubmit={agregarSuplier} className="supplier-form">
                <p>
                    <label>Name:</label><br/>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Nombre"
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </p>
                <p>
                    <label>RUC:</label><br/>
                    <input 
                        type="text" 
                        name="ruc" 
                        placeholder="RUC"
                        onChange={(e) => setRuc(e.target.value)} 
                        value={ruc} 
                    />
                    {errors.ruc && <span className="error">{errors.ruc}</span>}
                </p>
                <p>
                    <label>Phone:</label><br/>
                    <input 
                        type="number" 
                        name="phone" 
                        placeholder="Telefono" 
                        onChange={(e) => setPhone(e.target.value)} 
                        value={phone} 
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </p>
                <p>
                    <label>Address:</label><br/>
                    <input 
                        type="text" 
                        name="address" 
                        placeholder="Direccion" 
                        onChange={(e) => setAddress(e.target.value)} 
                        value={address} 
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                </p>
                <p>
                    <label>Mail:</label><br/>
                    <input 
                        type="text" 
                        name="mail" 
                        placeholder="Correo electronico" 
                        onChange={(e) => setMail(e.target.value)} 
                        value={mail} 
                    />
                    {errors.mail && <span className="error">{errors.mail}</span>}
                </p>
                <p>
                    <label>Postal Code:</label><br/>
                    <input 
                        type="number" 
                        name="postalCode" 
                        placeholder="Codigo Postal" 
                        onChange={(e) => setPostalCode(e.target.value)} 
                        value={postalCode} 
                    />
                    {errors.postalCode && <span className="error">{errors.postalCode}</span>}
                </p>
                <p>
                    <label>Sitio Web:</label><br/>
                    <input 
                        type="text" 
                        name="sitioWep" 
                        placeholder="Sitio Web" 
                        onChange={(e) => setSitioWep(e.target.value)} 
                        value={sitioWep} 
                    />
                </p>
                <button type="submit">Add Supplier</button>
                {errors.api && <span className="error">{errors.api}</span>}
            </form>
        </div>
    );
};

export default SuplierForm;
