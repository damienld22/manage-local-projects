import { message } from 'antd';

export default function useSnackbar() {
  const displaySuccessMessage = (txt: string, duration = 6) => message.success(txt, duration);

  return {
    displaySuccessMessage,
  };
}
