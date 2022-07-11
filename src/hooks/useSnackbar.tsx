import { message } from 'antd';

export default function useSnackbar() {
  const displaySuccessMessage = (txt: string, duration = 6000) => message.success(txt, duration);

  return {
    displaySuccessMessage,
  };
}
