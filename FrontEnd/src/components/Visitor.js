import { Text, Heading, VStack, SimpleGrid,Image,Center,Button } from "@chakra-ui/react";
import {useEffect,useState} from "react" 
import {useParams,useNavigate} from 'react-router-dom'

export default function Visitor() {

const [Posts, setPosts] = useState([]);
const{name}=useParams()
const navigate = useNavigate()  

  useEffect(() => {
    fetch(`http://localhost:8000/Visitor/all/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  console.log(Posts)
  
    return (
    <VStack spacing={7}>
      {" "}
      <Text>
        Welcome to My Blog !
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
            <Image src={post.photo}  objectFit="cover" paddingTop={2} borderRadius={25} boxSize={"300px"} />
            <Center>
              <Heading size="sm">{post.Title}</Heading>
            <Button colorScheme="blue" variant="ghost"  onClick={()=>{navigate(`/${name}/${post._id}`)}}>    
            Details
            </Button>                        
            </Center>
            </VStack>
          )
          })}
      </SimpleGrid>
    </VStack>
  );
}
