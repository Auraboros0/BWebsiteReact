import { useParams, useNavigate } from "react-router";
function MaleOrFemaleRedo() {
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
        <div className='MorFRedo'>
            <button className='genderButton' id={gender === 'mens' ? 'isActiveButton' : ''} onClick={() => handleClick('mens')}><h2 style={{height: '40px'}}>Men</h2></button>
            <button className='genderButton' id={gender === 'womens' ? 'isActiveButton' : ''} onClick={() => handleClick('womens')} style={{borderRadius: '0px 0px 20px 20px'}}><h2 style={{height: '40px'}}>Women</h2></button>
        </div>
    )
}

export default MaleOrFemaleRedo