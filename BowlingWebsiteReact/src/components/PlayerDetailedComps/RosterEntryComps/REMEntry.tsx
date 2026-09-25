import type { SQLResultsInterface } from "../../../Interfaces/SQLResultsInterface"
import type { resultsInterface } from "@/Interfaces/resultsInterface"
function REMEntry(props: resultsInterface) {
    return (
        <tr>
        <td>{props.Tournament_name}</td>
        <td>{props.Gm}</td>
        <td>{props.Total}</td>
        <td>{props.Avg}</td>
        </tr>
    )
}

export default REMEntry