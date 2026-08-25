import { useRef, useImperativeHandle, forwardRef } from 'react'
export interface ClickDragHandle {
    reactToJump: (itemHeight: number, up: boolean) => void
}

interface ClickDragProps {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
    dimensions: [number, number];
}

const WASDHandler = forwardRef<ClickDragHandle, ClickDragProps>(
    ({ children }, ref) => {

    /* 
    This should manipulate the focus system.
    If I have a 1x9 list of children, Up/W will move the focus idx -1, Down/S +1

    If I have a 3x3 list of children, the list will be represented as a [Row][Column] array.
    And the coordinates will be used to determine what happens next.

    [1][1]: W -> [0][1]. A -> [1][0]. S -> [2][1]. D -> [2][1].
    [2][2]: D -> [0][0].

    Hardest part is just gonna be finding out how to represent the children as cells
    as well as actually entering them into this component.
    */

    return (
        <div className='WASDHandler'>
            {children}
        </div>
    )
// }

    })

export default WASDHandler