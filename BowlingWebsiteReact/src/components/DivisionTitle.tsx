interface props {
    title: string;
    red: boolean
    isMobile?: boolean
}

function DivisionTitle( props: props ) {
    let divName;
    const isMobile:boolean = props.isMobile ?? false;
    if (props.red) {divName = 'headerDivision'}
    else {divName='headerDivisionWhite'}
    return (
        <div className={divName}>
            {!isMobile && <h2>{props.title}</h2>}
            {isMobile && <h3>{props.title}</h3>}
        </div>
    )
}

export default DivisionTitle