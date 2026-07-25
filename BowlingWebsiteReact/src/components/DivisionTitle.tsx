interface props {
    title: string;
    red: boolean
}

function DivisionTitle( props: props ) {
    let divName;
    if (props.red) {divName = 'headerDivision'}
    else {divName='headerDivisionWhite'}
    return (
        <div className={divName}>
            <h2>{props.title}</h2>
        </div>
    )
}

export default DivisionTitle