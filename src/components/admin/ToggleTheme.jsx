import { Button } from 'antd'
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: 15, left: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '5rem'
        }}>
            <Button onClick={toggleTheme}>
                {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
            </Button>
        </div>
    )
}

export default ToggleThemeButton