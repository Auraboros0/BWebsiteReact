import { useNavigate, useParams } from "react-router";
function MaleOrFemale() {
    const { gender, id } = useParams();
    const navigate = useNavigate();
    function checkLocation(team: string) {
        if (team === gender && id === undefined) {return true};
        return false;
    }

    const handleClick = (team: string) => {
        console.log('hi');
        if (!checkLocation(team)) {
            navigate(`/roster/${team}`)
        }
    }

    return (
        <div style={{border: "2px solid #d01840"}}>
        <button id={gender === 'mens' ? 'isActiveButton' : ''} onClick={() => handleClick('mens')}><h2>Men's</h2></button>
        <button id={gender === 'womens' ? 'isActiveButton' : ''} onClick={() => handleClick('womens')}><h2>Women's</h2></button>
        </div>
    )
}

export default MaleOrFemale