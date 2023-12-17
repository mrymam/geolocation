import React from "react";
import ReactDom from "react-dom";
import App from "./app";
import { ChakraProvider } from '@chakra-ui/react'

ReactDom.render(<ChakraProvider><App /></ChakraProvider>, document.getElementById("app"));
