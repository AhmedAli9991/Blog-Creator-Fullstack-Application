import React, { useState } from 'react';
import {Link} from "react-router-dom"
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
import axios from 'axios';
function Login(props) {
    axios.defaults.withCredentials = true;
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const navigate = useNavigate()
    const handleSubmit=async (e) =>{
        e.preventDefault();
       try{
        const response = await axios.post("http://localhost:8000/User/Login",{email,password})
        setemail('')
        setpassword('')
        const data = response.data
        console.log(data)
        if(data){
            props.func()
            navigate("/Dashboard", { replace: true });
        }
        else{
            alert("Invalid Cedentials")
        }
    }catch(err){
        alert(err)
    }
    }
  return (
    <Flex width="full" height="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="password"value={password} onChange={(e)=>setpassword(e.target.value)} />
            </FormControl>
            <Button width="full" colorScheme="blue" mt={4} type="submit">
              Sign In
            </Button>
            
            <Link className="small" to="Register" style={{marginTop:"15px", color:"blue"}}>Don't have an account? click here</Link>
            
          </form>
        </Box>
      </Box>
    </Flex>
 
  );
}

export default Login;