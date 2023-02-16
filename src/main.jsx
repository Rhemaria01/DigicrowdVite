import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateProvider } from './context';


// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ThirdwebProvider desiredChainId={activeChainId}>
    <StateProvider >
      <App />
    </StateProvider>
    </ThirdwebProvider>


);
