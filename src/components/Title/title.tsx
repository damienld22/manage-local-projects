import { Typography } from 'antd';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <Typography>
      <h1>{title}</h1>
    </Typography>
  );
};

export default Title;
