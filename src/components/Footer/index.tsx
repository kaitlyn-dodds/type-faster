import { BUILD_INFO } from "../../config/buildInfo";
import "./style.css"

export default function Footer() {
    // log build info
    console.log(`App version: ${BUILD_INFO.appVersion} ${BUILD_INFO.gitSha}`)

    return (
        <footer className="footer">
            <p>Version: {BUILD_INFO.appVersion}</p>
            <p>Git Hash: {BUILD_INFO.gitSha}</p>
        </footer>
    )
}
