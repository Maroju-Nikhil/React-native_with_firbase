import {Toast} from 'native-base';

export const toastr_danger = {
    showToast: (message) => {
      Toast.show({
        text: message,
        duration:2500,
        position: 'bottom',
        buttonText: 'Okay',
        type: "danger"
      });
    },
  };