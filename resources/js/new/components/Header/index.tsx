import React from 'react';
import styles from "./header.module.css";
import Logo from '../logo';
import { LogIn } from 'lucide-react';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';

import useTypedPage from '@/Hooks/useTypedPage';
import { User } from '@/types';

export type HeaderMode = "dark" | "transparent";

type Props = {
    mode?: HeaderMode;
}

const Header: React.FC<Props> = ({
    mode = "dark"
}: Props) => {
    const page = useTypedPage();

    return <header data-mode={mode} className={styles.header}>
        <Logo className={styles.logo} />

        <ul>
            <li>Features</li>
            <li>Downloads</li>
            <li>Roadmap</li>
            <li>Community</li>
            <li>News</li>
        </ul>

        {
            page.props.auth.user ? <Logged user={page.props.auth.user}/> : <NotLogged />
        }

    </header>;
}

const Logged: React.FC<{user: User}> = ({user}) => {
    return <div className={styles.user}>
        <div className={styles.username}>{user.name}</div>
        <img 
            src={user.profile_photo_url}
            alt={user.name}
            className={styles.avatar}
        />
    </div>;
}

const NotLogged: React.FC = () => {
    const route = useRoute();

    return <div className={styles.user}>
        <Link href={route('register')}>
            <div>Sign Up</div>
        </Link>
        <Link href={route('login')}>
            <div className={styles.button}>
                <LogIn />
                Log In
            </div>
        </Link>
    </div>
};

export default Header;