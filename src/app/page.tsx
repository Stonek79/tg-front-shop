import './MainPage.css'
import { User } from '@/features/User/User'

export default function Home() {
    return (
        <div className="main_page_description">
            <h1>MAIN PAGE</h1>
            <br />
            <User />
        </div>
    )
}
