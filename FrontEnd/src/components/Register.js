import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button
  } from '@chakra-ui/react';
  import {Link} from "react-router-dom"

import axios from 'axios';
export default function Register() {
    const navigate = useNavigate()
    const [email,setemail]=useState("")
    const [name,setname]=useState("")
    const [password,setpassword]=useState("")
    const[Confirm,setConfirm]=useState("")
    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(name==""||email==""||password==""||Confirm==""){
            alert("fill all the fields")
        }
        else if(password!=Confirm){
            alert("passwords do not match")
        }
        else{
        try    {
        const response = await axios.post("http://localhost:8000/User/Signup",{name,email,password})
        const data = await response.data
        if(data){
            navigate("/", { replace: true });

        }
        else{
            alert("User with this email already exists")
        
        }}catch(err){alert(err)}
    }
    setemail('')
    setpassword('')
    setConfirm('')   
    }    

    return(
        <Flex width="full" height="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Register</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>name</FormLabel>
                <Input type="text" placeholder="Name" value={name} onChange={(e)=>setname(e.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="password"value={password} onChange={(e)=>setpassword(e.target.value)} />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Confirm Password" value={Confirm} onChange={(e)=>setConfirm(e.target.value)} />
              </FormControl>
              <Button width="full" colorScheme="blue" mt={4} type="submit">
                Register
              </Button>
              
              <Link className="small" to="/" style={{marginTop:"15px", color:"blue"}}>already have an account? click here</Link>
              
            </form>
          </Box>
        </Box>
      </Flex>
   
    )

}