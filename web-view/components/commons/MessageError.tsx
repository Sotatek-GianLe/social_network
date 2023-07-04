interface Props {
  message?: string;
}

const MessageError: React.FC<Props> = ({ message }) => {
  return <span className="text-left text-sm text-red-600 mt-[6px] ml-2">{message}</span>;
};

export { MessageError };
