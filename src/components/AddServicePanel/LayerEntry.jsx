import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LayerEntry = (props) => {
  const [options, toggleOptions] = useState(false);
  const layer = props.layer
  const copyright = layer.copyright

  const abstractTextSpan = () => layer.abstract ?
      <span>{`${layer.label} - ${layer.abstract}:`}</span> :
      <span>{`${layer.label}`}</span>;

  return (
    <div>
      <div className="layerEntry">
        {abstractTextSpan()}
        {copyright ? <FontAwesomeIcon className="infoIcon" icon={['info']} /> : null}
        <label onClick={() => toggleOptions(!options)}>
          <FontAwesomeIcon icon={["far", "cogs"]} color={options ? 'red' : 'black'} />
        </label>
        {options ? (<div>Placeholder for more options (transparency, up/down, info</div>) : ('')}
      </div>
    </div>
  )
}

export default LayerEntry
