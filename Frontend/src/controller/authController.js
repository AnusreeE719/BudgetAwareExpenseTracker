import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {apiUrls} from "../constant/apiUrls";
import Swal from 'sweetalert2';

export const useLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
  
    return useMutation({
      mutationFn: async (credentials) => {
        try {
          const response = await axios.post(
            `${apiUrls.baseAddr}/${apiUrls.loginurl}`,
            credentials,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          return response.data;
        } catch (error) {
          // Axios wraps the error response in error.response
          const errorMessage = error.response?.data?.message || 'Login failed';
          throw new Error(errorMessage);
        }
      },
      onSuccess: (data) => {
   
        login(data.token, data.user);
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully logged in.',
          icon: 'success',
          showConfirmButton: false,  // This hides the OK button
          timer: 1500
        }).then(() => {
          navigate('/'); // Navigate after user clicks OK
        });
      },
      onError: (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  };

  