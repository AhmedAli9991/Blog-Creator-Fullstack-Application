import {
  Center,
  VStack,
} from "@chakra-ui/react";
import {
  BrowserRouter,
  Route,
  Routes,Navigate
} from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react";

import Visitor from "./components/Visitor"
import VisitorOne from "./components/VisitorOne";
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import Edit from "./components/Edit"

import {useState} from "react"
import Add from "./components/Add"
function App() {
const [login,setlogin]= useState(true)
const LoggingIn = ()=>{
  setlogin(true)
}
const LoggingOut =()=>{
  setlogin(false)
}
  return (
    <ChakraProvider>
      <Center bg="black" color="white" padding={8}>
        <VStack spacing={7}>

      <BrowserRouter>
      <Routes>
      <Route  path='/' element={<Login func={LoggingIn}/>}/>
      <Route  path='/Register' element={<Register/>}/>
      <Route  path='/:name' element={<Visitor/>}/>
      <Route  path='/:name/:id' element={<VisitorOne/>}/>

      {login&&
      <Route path='/Dashboard' >
        <Route path='/Dashboard' element={<Dashboard func={LoggingOut}/>}/>
        <Route path='/Dashboard/Add' element={<Add/>}/>
        <Route path='/Dashboard/:id' element={<Edit/>}/>
      </Route>
      }
      <Route path="*"element={<Navigate to="/" />}/>
      </Routes>

      </BrowserRouter>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default App;
