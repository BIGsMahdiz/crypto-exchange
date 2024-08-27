import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p><a href="">Crypto Exchange</a> | Best list Crypto</p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Mahdi with ❤️‍🔥</p>
      </footer>
    </>
  );
}

export default Layout;
