import { Text, Heading, VStack,Image } from "@chakra-ui/react";
import {useEffect,useState} from "react" 
import {useParams} from 'react-router-dom'

export default function VisitorOne() {

const {id} = useParams()
const [Post, setPost] = useState({Title:"",desc:"",photo:""});

  useEffect(() => {
    fetch(`http://localhost:8000/Visitor/one/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      });
  }, []);

  console.log(Post)
  
    return (
        
    <VStack spacing={7}>
      <Heading size="sm">{Post.Title}</Heading>
      <Image src={Post.photo}  objectFit="cover" paddingTop={2} borderRadius={25} boxSize={"300px"} />
      <Text>{Post.desc}</Text>
    </VStack>
  );
}
