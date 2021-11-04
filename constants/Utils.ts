import {WToast} from 'react-native-smart-tip'
export const adminToken = "krmo0ttxegjyyyz96dfq8jnxx2ims25z";
export const showToastWithColor = (message: any) => {
    const toastOpts = {
        data: message,
        textColor: '#ffffff',
        backgroundColor: '#E74C3C',
        duration: WToast.duration.LONG, //1.SHORT 2.LONG
        position: WToast.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
    }
    WToast.show(toastOpts)
  }

  export const showSuccessToastWithColor = (message: any) => {
    const toastOpts = {
        data: message,
        textColor: '#ffffff',
        backgroundColor: '#5cb85c',
        duration: WToast.duration.LONG, //1.SHORT 2.LONG
        position: WToast.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
    }
    WToast.show(toastOpts)
  }