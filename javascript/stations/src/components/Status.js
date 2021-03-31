import './Status.scss';

function Status(props) {

  const text = props.available ? 'Available' : 'Offline';

  return (
    <div className="status">
      {props.available ? <Available /> : <Offline />}
      {text}
    </div>
  );
}

export default Status;


function Available() {
  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
    <title>D9253D38-322C-469E-8B1B-2ADD6FAA2405@1x</title>
      <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="icon/available">
              <path d="M8,1 C4.1,1 1,4.1 1,8 C1,11.9 4.1,15 8,15 C11.9,15 15,11.9 15,8 C15,4.1 11.9,1 8,1 Z M7,11 L4.3,8.3 L5.2,7.5 L7,9.3 L11,5.4 L11.9,6.2 L7,11 Z" id="Fill" fill="#00AD09"/>
              <polygon id="Inner-Fill" fill="#000000" opacity="0" points="7 11 4.3 8.3 5.2 7.5 7 9.3 11 5.4 11.9 6.2"/>
          </g>
      </g>
    </svg>
  )
}

function Offline() {
  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
      <title>3ECC254E-2F93-4CF4-AC48-01FFFF26DBA0@1x</title>
      <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="icon/offline">
              <path d="M8,1 C4.1,1 1,4.1 1,8 C1,11.9 4.1,15 8,15 C11.9,15 15,11.9 15,8 C15,4.1 11.9,1 8,1 Z M10.7,11.5 L4.5,5.3 L5.3,4.5 L11.5,10.7 L10.7,11.5 Z" id="Fill" fill="#FF0000"/>
              <polygon id="Inner-Fill" fill="#000000" opacity="0" points="10.7 11.5 4.5 5.3 5.3 4.5 11.5 10.7"/>
          </g>
      </g>
    </svg>
  )
}