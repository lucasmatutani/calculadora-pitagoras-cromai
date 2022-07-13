import './Triangle.css'

const Props = {
    aSide: string,
    bSide: string,
    cSide: string
}

const Triangle = ({ aSide, bSide, cSide }: Props) => {
    return(
      <div className="triangle-container">
        <div className="triangle-content">
  
          <div className="triangle">
            <p 
              className="triangle-side" 
              id="a-side"
            >
              a={aSide ? <span>{aSide}</span> : <span>?</span> }
            </p>
  
            <p 
              className="triangle-side" 
              id="b-side"
            >
              b={bSide ? <span>{bSide}</span> : <span>?</span> }
            </p>
  
            <p 
              className="triangle-side" 
              id="c-side"
            >
              c={cSide ? <span>{cSide}</span> : <span>?</span> }
            </p>
          </div>
  
        </div>
      </div>
    );
  }
  
  export default Triangle;