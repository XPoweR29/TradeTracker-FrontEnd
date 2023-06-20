import { toast } from "react-toastify";
import { PaginationResponse } from "types";

export const authHandleFetch = async(url: string, isAuthenticated: (val:boolean)=>void, opstions?: RequestInit) => {
    const response = (await fetch(url, opstions));
    const data: PaginationResponse&Record<'message', string> = await response.json();
    if(!response.ok) {
        toast.error(data.message, {
            position: 'top-right',
            theme: 'colored'
        });
        if(response.status === 401 || response.status === 403) isAuthenticated(false);
        throw new Error(data.message);
    } 
    return data;
};