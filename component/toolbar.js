import Link from 'next/link'
import styles from '../styles/Toolbar.module.css'

const Toolbar = () => {
    return (
        <header className={styles.header}>
            <Link href="/"><a >Home</a></Link>
            <Link href="/search"><a >Search</a></Link>
        </header>

    )

}
export default Toolbar