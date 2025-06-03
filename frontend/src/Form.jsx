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
        password: '',
    })

const handleChange = (e) => {
    setformData({
        ...formData,
        [e.target.name]: e.target.value,
    });

}


const handleSubmit = async(e) => {
    e.preventDefault()
    try{
        const response = await axios.post('http://localhost:3000/addDoctor', formData)
        console.log(response.data)
    }catch(err){
        console.log(err + " Error in adding doctor")
    }

} 

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
                <label>Select your Gender</label>
                <select className='border border-2 border-cyan-400' onChange={handleChange} name="gender" id="gender" value={formData.gender}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                <br />
                <br />
                <input className="border border-2 border-cyan-400" type="text" name="department" placeholder="Department" onChange={handleChange} required/>
                <br /><br />
                <input className="border border-2 border-cyan-400" type="password" name="password" placeholder="Password" onChange={handleChange} required/>
                <br /><br />
                <button className="border border-2 p-1 cursor-pointer" type="submit">Add</button>
            </form>
        </>
    )
}

export default Form;