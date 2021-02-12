import styles from '../styles/components/button.module.css'

interface ButtonPropsInterface {
  onClick: ((params: any) => any) | ((params: any) => void);
}

export const Button: React.FC<ButtonPropsInterface> = ({
  onClick,
  children,
}): JSX.Element => {
  return <button className={styles.buttonContainer} onClick={onClick}>{children}</button>;
};
