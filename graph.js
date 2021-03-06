export default class Graph {
    constructor(){
        this.graph = {};
        this.edges = [];
    }
    insertEdge(v, w, p){
        // adiciona a aresta v->w
        if( !this.graph[v]?.push([w,p]) ) this.graph[v] = [[w,p]];
        // adiciona a aresta v<-w
        if( !this.graph[w]?.push([v,p]) ) this.graph[w] = [[v,p]];
        // verifica se a aresta v-w já esta inclusa nas arestas do grafo
        var inEdges = false;
        for(var i in this.edges){
            let edge = this.edges[i];
            if( p == edge[0] && ((edge[1] == v && edge[2] == w) || (edge[1] == w && edge[2] == v)) ){
                inEdges = true;
                break;
            }
        }
        if(!inEdges)
            this.edges.push([p, v, w])
    }
    kruskal(){
        function find(v){
            while(v != unionFind[v].father){
                v = unionFind[v].father;
            }
            return v;
        }
        function union(edge){
            console.log("Vamo fazer a uniao entre", edge[1], edge[2])
            if( !mst[edge[1]]?.push([edge[2], edge[0]]) ) mst[edge[1]] = [[edge[2], edge[0]]];
            if( !mst[edge[2]]?.push([edge[1], edge[0]]) ) mst[edge[2]] = [[edge[1], edge[0]]];
            var fatherA = find(edge[1]);
            var fatherB = find(edge[2]);
            unionFind[fatherA].deep > unionFind[fatherB].deep ? unionFind[fatherB].father = fatherA : unionFind[fatherA].father = fatherB
        }
        function cmpEdge(a, b){
            return a[0] - b[0];
        }
        var mst = {} 
        // definindo estrutura do union find
        var nodes = keys(this.graph);
        var unionFind = {};
        for(var i in nodes){
            let v = nodes[i];
            unionFind[v] = {deep: 1, father: v};
        }
        // ordenando as arestas crescente por peso
        this.edges.sort(cmpEdge)
        // interações do kruskal
        var m = 0;
        var n = keys(this.graph).length;
        for(var i in this.edges){
            let edge = this.edges[i];
            if( find(edge[1]) != find(edge[2]) ){
                union(edge);
                m++;
            }
            if(m == n-1)
                break;
        }
        return mst
    }
}