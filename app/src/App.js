import './App.css';

import {useEffect, useState} from 'react';
import VisGraph from 'react-vis-network-graph';

import {options, style} from './vis-options';
import Graph from './graph';

function Select({nodes, callback}) {
  const [selectedOption, setSelectedOption] = useState("0");

  useEffect(() => {
    callback(selectedOption);
  }, [selectedOption, callback])

  return (
    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
      {nodes.map((node) => {
        return(<option key={node.id} value={node.id}>{node.label}</option>);
      })}
    </select>
  );
}

function App() {

  const [network, setNetwork] = useState();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [lastid, updatelastid] = useState(0);
  const [selectedOption0, SetSelectedOption0] = useState(0);
  const [selectedOption1, SetSelectedOption1] = useState(0);
  const [graph, updateGraph] = useState(new Graph());
  const [mst, setMst] = useState([])

  let nodeName = '';
  let edgeWeight = '0';
  
  useEffect(() => {
    if (network !== undefined) {
      network.setData({
        nodes: nodes,
        edges: edges
      })
    }
  }, [nodes, edges, network])

  useEffect(() => {
    // console.log(mst)
    let v = Object.keys(mst);
    let mstEdges = [];
    for (let i of v) {
      for (let item of mst[i]) {
        let newedge = {
          from: i,
          to: item[0],
          color: {
            color: "red",
          },
        }
        mstEdges = [...mstEdges, newedge];
      }
    }
    setEdges(mstEdges);
  }, [mst])

  const addEdge = () => {

    let src = nodes[Number(selectedOption0)].id;
    let dest = nodes[Number(selectedOption1)].id;
    let weight = edgeWeight;

    const newedge = {
      from: src,
      to: dest,
      label: weight
    }

    let exists = false;
    for (let edge of edges) {
      if (edge.from === newedge.from && edge.to === newedge.to) exists = true;
      if (edge.to === newedge.from && edge.from === newedge.to) exists = true;
    }

    if (!exists) {
      setEdges([...edges, newedge]);

      let updatedGraph = graph;
      updatedGraph.insertEdge(src, dest, Number(weight));
      updateGraph(updatedGraph);

    }

    document.getElementById('weight').value = 0;
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
        <br/>
        <Select nodes={nodes} callback={(selected) => SetSelectedOption0(selected)} />
        <Select nodes={nodes} callback={(selected) => SetSelectedOption1(selected)} />
        <input type="number" id="weight" onChange={(e) => {edgeWeight=e.target.value}}/>
        <button onClick={addEdge}>Adicionar Aresta</button>
        <br/>
        <button onClick={() => console.log(graph)}>print graph</button> {/*to test*/}
        <button onClick={() => setMst(graph.kruskal())}>Obter Árvore Mínima Geradora</button>
      </div>
      <VisGraph getNetwork={(network) => {setNetwork(network); network.setOptions(options)}} style={style} />
    </div>
  );

}

export default App;
