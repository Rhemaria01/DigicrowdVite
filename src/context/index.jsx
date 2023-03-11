import React,{useContext, createContext} from "react";
import { useAddress, 
    useContract, 
    useMetamask, 
    useContractWrite, 
    useTokenBalance,
    useDisconnect, 
    useBalance,
    useStorageUpload,
 } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    
    const {  contract, status } = useContract("0x7e0Aa43Cf897b76a6Caf2f0dF1F971f0659BD73B");
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
                form.token
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

    const sendTokens = async (token,tokenAddress,id,amount) => {
        try{
        const res = await token.transfer("0x7e0Aa43Cf897b76a6Caf2f0dF1F971f0659BD73B", amount);
        console.log("res",res);
        const data = await contract.call("transferERC20",tokenAddress,id,address,{value: ethers.utils.parseEther(amount)})
        console.log('data', data);
        return data
        }
        catch(error){
            console.log(error)
        }
        
    }

    

    return (
        <StateContext.Provider 
        value={{address,status,  createCampaign: publishCampaign, connect, disconnect, balance, uploadImage, getCampaigns, getCampaign, receiveFunds, sendTokens}}>
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext);