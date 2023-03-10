import React,{useContext, createContext} from "react";
import { useAddress, 
    useContract, 
    useMetamask, 
    useContractWrite, 
    useContractRead,
    useDisconnect, 
    useBalance,
    useStorageUpload,
    useTokenBalance } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    
    const {  contract, status } = useContract("0x06b66Fb2Ac5327cF879Aae3eAD48cc7a4f8a8D7A");
    const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign");

    
    
    
    
    const {mutateAsync: upload} = useStorageUpload();
    const address = useAddress();
    const connect = useMetamask();
    const disconnect = useDisconnect();
    const balance = useBalance();


    const publishCampaign = async (form) => {

        try {
            const data = await createCampaign([
                address,
                form.name,
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
            })

            // console.log('data', data);
            return data;
        } catch (error) {
            console.log('error', error);
        }
    }
    
    const getCampaigns = async () => {
        try {
            const data = await contract.call("getCampaigns")
            console.log('data', data);
          
        return data
        } catch (error) {
            console.log('error', error);
        }
    }


    const getCampaign= async (id) => {
        try {
            const data = await contract.call("getCampaign", id)
            console.log('data', data);
        return  data
        } catch (error) {
            console.log('error', error);
        }
    }

    const receiveFunds = async (id,amount) => {
        try {
            const data = await contract.call("donateToCampaign", id, {value: ethers.utils.parseEther(amount)} )
            console.log('data', data);
        return  data
        } catch (error) {
            if(!address) connect();
            receiveFunds(id,amount);
        }
    }

    const sendTokens = async (token,id,amount) => {
        token.transfer("0xC2B9617847801F40aeE5f95bAD7c6bc492A5acf2", amount);
        
    }

    

    return (
        <StateContext.Provider 
        value={{address,status,  createCampaign: publishCampaign, connect, disconnect, balance, uploadImage, getCampaigns, getCampaign, receiveFunds, sendTokens}}>
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext);