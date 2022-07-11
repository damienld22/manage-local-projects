import { message } from 'antd';

export default function useSnackbar() {
  const displaySuccessMessage = (txt: string, duration = 6) => message.success(txt, duration);
  const displayErrorMessage = (txt: string, duration = 6) => message.error(txt, duration);

  return {
    displaySuccessMessage,
    displayErrorMessage,
  };
}
