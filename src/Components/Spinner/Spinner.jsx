import Spinner from 'react-bootstrap/Spinner';

const SpinnerComponent = ({
    componentFrom,
    variant,
    spinner_width_height
}) => {
    return (
        <Spinner animation="border" role="status" variant={variant} style={{ width: spinner_width_height, height: spinner_width_height }}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default SpinnerComponent