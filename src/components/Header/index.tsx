import { ActiveLink } from '../ActiveLink/index';
import styles from './styles.module.scss';
import Image from 'next/image';

const Header = () => {

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Image src='/logo.svg' alt="DevNews" width={'2rem'} height={'3.5rem'} />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
      </div>
    </header>
  );
}

export { Header };
