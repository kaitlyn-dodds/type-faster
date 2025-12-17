import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function Main() {
    const navigate = useNavigate();
    return (
        <div className="main">
            <Button label="Quick Start" onClick={() => navigate("/typing-challenge")} />
        </div>
    );
}
