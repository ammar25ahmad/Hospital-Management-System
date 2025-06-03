import axios from 'axios'
import { useEffect, useState } from 'react'


function Form(){
    const [formData , setformData] = useState({
        name: '',
        email: '',
        phone: '',
        cnic: '',
        age: '',
        gender: '',
        department: '',
    })
    return(
        <>
            <h1>Form</h1>
            <form onSubmit={handleSubmit} className="border border-2 border-amber-900">
                <input className="border border-2 border-cyan-400" type="text" name="name" placeholder="Name" onChange={handleChange} required/>
                <br />
                <br />
                <input className="border border-2 border-cyan-400" type="text" name="email" placeholder="Email" onChange={handleChange} required/>
                <br />
                <br />
                <input className="border border-2 border-cyan-400" type="text" name="phone" placeholder="Phone" onChange={handleChange} required/>
                <br />
                <br />
                <input className="border border-2 border-cyan-400" type="text" name="cnic" placeholder="CNIC" onChange={handleChange} required/>
                <br />
                <br />
                <input className="border border-2 border-cyan-400" type="number" name="age" placeholder="Age" onChange={handleChange} required/>
                <br />
                <br />
                <input className="border border-2 border-cyan-400" type="text" name="gender" placeholder="Gender" onChange={handleChange} required/>
                <br />
                <br />
                <input className="border border-2 border-cyan-400" type="text" name="department" placeholder="Department" onChange={handleChange} required/>
                <br /><br />
                <button className="border border-2 p-1 cursor-pointer" type="button">Add</button>
            </form>
        </>
    )
}

export default Form;