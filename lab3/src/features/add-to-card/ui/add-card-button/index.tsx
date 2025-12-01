import './Button.css';

type TAddCardButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const AddCardButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '' 
}: TAddCardButtonProps) => {
  return (
    <button 
      type="button" 
      onClick={onClick} 
      disabled={disabled}
      className= {className}
    >
      {children}
    </button>
  );
};