import styles from '../styles/components/footer.module.css'

export const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footerContainer}>
      <div>
        &copy; { new Date().getFullYear() } Photon Enterprise, All Rights Reserved
      </div>
    </footer>
  )
}