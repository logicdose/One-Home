import "./switch.css"

type Props = {
    checked: boolean
    onChange: (checked: boolean) => void
    disabled?: boolean
}

export default function Switch(props: Props) {
    // Props
    const { checked, onChange, disabled } = props

    // Render
    return (
        <div
            className="switch"
            style={{ opacity: disabled ? 0.5 : 1 }}
            onClick={() => {
                if (!disabled) {
                    onChange(!checked)
                }
            }}
        >
            <span className={`slider ${props.checked && 'checked'}`} />
        </div>
    )
}