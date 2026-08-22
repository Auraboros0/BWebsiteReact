import { useParams } from "react-router"
import { useEffect, useState } from "react";

async function getData() {
    const {gender, name} = useParams();
    const data = await fetch(`/api/tournament/${gender}/${name}`);

}

function Results() {
    const 
    useEffect(() => {
        const load = async () => {

        }

        const interval = setInterval(() => {
            try {

            }
            catch {

            }
        }, 1000) 
    }, [])

    return (
        <div>

        </div>
    )
}

export default Results;

