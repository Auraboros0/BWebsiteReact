import { useNavigate, Link } from "react-router";
import useConditionalRender from "../../Scripts/useConditionalRender";
function BackButton() {
    const { isMd } = useConditionalRender();
    const navigate = useNavigate();
    return (
        <div style={{cursor: 'pointer', position: 'absolute', top: '50%', transform: 'translateY(-50%)',}}>
            {isMd &&
            <h1 style={{
                left: '0px',
                color: 'white',
                fontSize: '64px',
                 border: '0px solid white',
                  backgroundColor: 'transparent',
                  }} onClick = {() => navigate(-1)}>&#x1F81C;</h1>}
        </div>
    )
}

export default BackButton;