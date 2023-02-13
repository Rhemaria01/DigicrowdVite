import React,{useContext, createContext} from "react";
import { useAddress, 
    useContract, 
    useMetamask, 
    useContractWrite, 
    useDisconnect, 
    useBalance,
    useStorageUpload  } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const { contract } = useContract("0x80BCbd399189f0d5429F4814FBB4FFa296bC3096");
    const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign")
    const {mutateAsync: upload} = useStorageUpload();
    const address = useAddress();
    const connect = useMetamask();
    const disconnect = useDisconnect();
    const balance = useBalance();
    const image = "https://gateway.ipfscdn.io/ipfs/Qma3fbBQqp4f9yv89uyN5nsc1pNLDNFP6qmAncwCAksvZ9"
    const publishCampaign = async (form) => {

        try {
            const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image,
            ]);
            console.log('data', data);
            
        } catch (error) {
            console.log('error', error);
            
        }
    }
    const uploadImage = async (file) => {
        try {
            const data = await upload({
                data: [file],
                options: {
                    uploadWithGatewayUrl: true,
                    uploadWithoutDirectory: true,
            }
        });
            console.log('data', data);
            return data;
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <StateContext.Provider 
        value={{address,  createCampaign: publishCampaign, connect, disconnect, balance, uploadImage}}>
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext);