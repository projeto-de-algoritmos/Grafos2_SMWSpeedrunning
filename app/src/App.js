import logo from './logo.svg';
import './App.css';

import {useEffect, useState} from 'react';

import Graph from 'react-vis-network-graph';

function App() {

  const [network, setNetwork] = useState();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [lastid, updatelastid] = useState(0);
  
  let nodeName = '';
  
  useEffect(() => {
    if (network !== undefined) {
      network.setData({
        nodes: nodes,
        edges: edges
      })
    }
  }, [nodes, edges, network])

  let options = {
    physics: {
      enabled: false,
      stabilization: false
    }
  }

  const style = {
    height: 720,
    width: '100%'
  }

  const draw = () => {
    // network.setOptions(options)
  }

  const addnode = () => {
    let newpos = {
      x: Math.random() * 1000,
      y: Math.random() * 500
    }

    let input = document.getElementById('name');
    
    let newnode = {
      id: lastid,
      label: nodeName,
      x: newpos.x,
      y: newpos.y
    }

    updatelastid(lastid+1);
    setNodes([...nodes, newnode]);
    
    input.value = '';
    console.log(network.physics.enabled)
  }

  return(
    <div>
      <div>
        <input type="text" id="name" onChange={(e) => {nodeName = e.target.value;}} />
        <button onClick={addnode}>Adicionar nó</button>
      </div>
      <button onClick={draw}>Desenhar grafo</button>
      <Graph getNetwork={(network) => {setNetwork(network); network.setOptions(options)}} style={style} />
    </div>
  );

}

export default App;
