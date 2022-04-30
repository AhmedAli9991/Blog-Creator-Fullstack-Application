import { Text, Heading, VStack, SimpleGrid,Image,Center,Button,Stack } from "@chakra-ui/react";

import {useEffect,useState} from "react" 
import axios from 'axios';
import {useNavigate} from "react-router-dom"

export default function Dashboard(props) {
  
const navigate = useNavigate()  
const [Posts, setPosts] = useState([]);
var photos
const Logout =async()=>{
  axios.defaults.withCredentials = true;
  const response = await axios.post("http://localhost:8000/User/Logout")
  props.func()
  navigate("/", { replace: true });
}

const Add =async()=>{
  navigate("/Dashboard/Add", { replace: true });
}

const del =async(id)=>{
  axios.defaults.withCredentials = true;
  await axios.delete(`http://localhost:8000/User/Posts/delete/${id}`)
  getdata()
}
  useEffect(() => {
    getdata()
  }, []);
  const getdata = async()=>{
    axios.defaults.withCredentials = true;
    const response = await axios.get("http://localhost:8000/User/Posts/all")
    setPosts(response.data)
  }
  console.log(Posts)
  
    return (
    <VStack spacing={7}>
      <Stack spacing={4} direction="row" align="right">
      <Button colorScheme="blue" variant="ghost" onClick={Add}>    
            Add New Post
      </Button>                        
        <Button colorScheme="blue" variant="ghost" onClick={Logout}>    
            Logout
        </Button>
        </Stack>                        
      <Text>
        Welcome to My back!
      </Text>      
      <Heading size="md">Posts</Heading>
      <SimpleGrid columns={2} spacing={8}>
        {
          Posts.map((post) => {
           return( <VStack
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            spacing={8}
            key={post._id}
            padding={4}
          >
            {console.log(typeof(photos))
            }
            <Image image={post.photo}  objectFit="cover" paddingTop={2} borderRadius={25} boxSize={"300px"} />
            <Center>
              <Heading size="sm">{post.Title}</Heading>
            <Button colorScheme="blue" variant="ghost" onClick={()=>{navigate(`/Dashboard/${post._id}`)}}>    
            Edit
            </Button>                      
            <Button colorScheme="red" variant="ghost" onClick={()=>del(post._id)}>    
            delete
            </Button>                        
            </Center>
            </VStack>
          )
          })}
      </SimpleGrid>
    </VStack>
  );
}
