//update Setting
import axios from 'axios';
import { showAlert } from './alerts';

//type is either 'password' or 'data'
export const updateProfile =async (data,type)=>{
    try{
        //const url = type ==='data'?'/api/v1/users/updateMe':'/api/v1/users/updatePassword';
        const url = '/api/v1/users/updateMe';
        const res = await axios({
            method:'PATCH',
            url,
            data
        });
        if(res.data.status==='success'){
            showAlert('success',`${type.toUpperCase()} updated successfully`);
            window.location.reload();
        }
    }catch(err){
        console.log(err);
        showAlert('error',err.response.data.message);
    }
}