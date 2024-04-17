import React from "react";
import { Loader as StyledLoader } from "./Loader.styled";

interface LoaderMessage {
  message: string;
}

function Loader({ message }: LoaderMessage) {
  return <StyledLoader>{message}</StyledLoader>;
}

export default Loader;
