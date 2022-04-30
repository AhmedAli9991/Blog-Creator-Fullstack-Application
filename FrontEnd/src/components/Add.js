import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea
  } from '@chakra-ui/react';
import axios from 'axios';
function Add() {
    const[uploadFile,setUploadFile]= useState("")
    const[Title,setTitle]=useState('')
    const[desc,setdesc]=useState('')
    const navigate = useNavigate()
    const handleSubmit=async (e) =>{
        e.preventDefault();
       try{
        axios.defaults.withCredentials = true;
        const sdata = new FormData();
        sdata.append("file", uploadFile);
        sdata.append("Title", Title);
        sdata.append("desc", desc);
        console.log(...sdata)
        const response = await axios.post("http://localhost:8000/User/Posts/add",sdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
        setTitle('')
        setdesc('')
        const data = response.data
        console.log(data)
        navigate("/Dashboard", { replace: true });
    }catch(err){
        alert(err)
    }
    }
  return (
    <Flex width="full" height="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Add A New Post ....</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input type="Text" placeholder="Title" value={Title} onChange={(e)=>setTitle(e.target.value)}/>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>desc</FormLabel>
              <Textarea type="Text" placeholder="desc"value={desc} onChange={(e)=>setdesc(e.target.value)} />
            </FormControl>
            <FormControl >
            <FormLabel>Upload image</FormLabel>
            <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
            </FormControl>
            <Button width="full" colorScheme="blue" mt={4} type="submit">
              Add
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
 
  );
}

export default Add;