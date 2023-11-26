import BrtLogo from '../../assets/brt.png'

const Logo = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px solid #f0f0f0',
            borderBottom: '1px solid #f0f0f0',
        }}>
            <div style={{ padding: '10px' }}>
                <img src={BrtLogo} alt='logo' style={{ width: 75, height: 25 }} />
            </div>
        </div>
    )
}

export default Logo