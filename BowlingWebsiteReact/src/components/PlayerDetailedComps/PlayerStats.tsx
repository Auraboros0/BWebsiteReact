import data from '../../data/mensData.json';
import xyzmap from '../../data/favoriteXYZmap.json'

interface player {
    name: string;
    year: string;
    state: string;
    height: string;
    major: string;
    hometown: string;
}

interface stats {
    name: string;
    average: number;
    gamesPlayed: number;
}

interface recap {
    year: number;
    text: string;
}

function PlayerStats({ name }) {
    // Will use map function to create list of events player has bowled in.
    const target = data.find(player => player.name === name);
    return (
        <div style={{}}>
            <h2>Average: {target?.average}</h2>
            <h2>Participated in:
                
            </h2>
            
        </div>
    )
}

export default PlayerStats;