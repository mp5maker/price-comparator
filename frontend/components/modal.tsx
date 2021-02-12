import styles from "../styles/components/modal.module.css";
import { Button } from "./button";

interface ModalPropsInterface {
  show?: boolean
  footerContent?: JSX.Element | JSX.Element[]
  title?: string,
  onClose: ((params: any) => void)
}

export const Modal: React.FC<ModalPropsInterface> = ({
  title = 'Image',
  show = false,
  footerContent,
  onClose,
  children,
}): JSX.Element => {
  return show ? (
    <div className={`${styles.modalContainer}`}>
      <div className={styles.modalContent}>
        <div className={styles.modalContentHeader}>
          <div className={styles.modalContentHeaderTitle}>
            { title }
          </div>
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
        <div className={styles.modalContentMain}>{children}</div>
        {footerContent ? (
          <div className={styles.modalContentFooter}>{footerContent}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : <></>
};
