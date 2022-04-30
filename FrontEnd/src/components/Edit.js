import React, { useState ,useEffect} from 'react';
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
import { useParams } from 'react-router-dom';
import axios from 'axios';
function Edit() {
    const[uploadFile,setUploadFile]= useState("")
    
    const[Title,setTitle]=useState('')
    const[desc,setdesc]=useState('')
    const navigate = useNavigate()
    const {id} = useParams()

  useEffect(() => {
    get()
  }, []);

    const get = async()=>{
        const res = await axios.get(`http://localhost:8000/Visitor/one/${id}`)
        setTitle(res.data.Title)
        setdesc(res.data.desc)
    //    setUploadFile("C://Users/lenovo_pc/Desktop/github projects/BlogApp/FrontEnd/src/Images/279a41a2-447a-4032-bec8-a54e7d9b6669.PNG")
    }
    const handleSubmit=async (e) =>{
        e.preventDefault();
       try{
        axios.defaults.withCredentials = true;

        const sdata = new FormData();
        sdata.append("file", uploadFile);
        sdata.append("Title", Title);
        sdata.append("desc", desc);
        console.log(...sdata)
        const response = await axios.put(`http://localhost:8000/User/Posts/update/${id}`,sdata, {
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
          <Heading>Edit Post ....{"   "}</Heading>
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
            <input type="file"  onChange={(e) => setUploadFile(e.target.files[0])} />
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

export default Edit;