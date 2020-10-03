import {Toast} from 'native-base';

export const toastr_success = {
    showToast: (message) => {
      Toast.show({
        text: message,
        duration:2500,
        position: 'bottom',
        buttonText: 'Okay',
        type: "success"
      });
    },
  };

  export const toastr_success_top = {
    showToast : (message) =>{
      Toast.show({
        text: message,
        duration:2500,
        position: 'top',
        buttonText: 'Okay',
        type: "success"
      })
    }
  }