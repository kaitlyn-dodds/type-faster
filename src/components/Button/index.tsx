import './style.css'

interface ButtonProps {
    label: string
    onClick: () => void
    className?: string,
    id?: string
}

function Button({ label, onClick, className, id }: ButtonProps) {
    return (
        <button
            id={id}
            className={`button ${className}`}
            onClick={onClick}>
            {label}
        </button>
    )
}

export default Button
