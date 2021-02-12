import styles from '../styles/components/button.module.css'

interface ButtonPropsInterface {
  onClick: ((params: any) => any) | ((params: any) => void);
  style?: any
}

export const Button: React.FC<ButtonPropsInterface> = ({
  onClick,
  children,
  ...otherProps
}): JSX.Element => {
  return <button className={styles.buttonContainer} onClick={onClick} {...otherProps}>{children}</button>;
};
