import { FC, useEffect, useState } from "react";
import cytoscape from "cytoscape";
import "./node-chart.css"

const NodeChart: FC = () => {
    const [png, setPng] = useState<string>('');
    const transactions = [
        { src: 'a', trg: 'b', value: '2200', op: '5', t: 1 },
        { src: 'b', trg: 'f', value: '2200', op: '5', t: 3 },
        { src: 'a', trg: 'b', value: '2200', op: '5', t: 4 },
        { src: 'a', trg: 'b', value: '2200', op: '5', lt: 2 },
        { src: 'b', trg: 'c', value: '2200', op: '5', lt: 5 },
        { src: 'c', trg: 'b', value: '2200', op: '5' },
        { src: 'b', trg: 'b', value: '2200', op: '5' },
        { src: 'c', trg: 'g', value: '2200', op: '5' },
        { src: 'g', trg: 'a', value: '2200', op: '5' },
        { src: 'c', trg: 'L', value: '2200', op: '5' },
        { src: 'L', trg: 'c', value: '2200', op: '5' },
        { src: 'c', trg: 'm', value: '2200', op: '5' },
        { src: 'm', trg: 'd', value: '2200', op: '5' },
        { src: 'g', trg: 'b', value: '2200', op: '5' },
        { src: 'a', trg: 'b', value: '2200', op: '5' },
        { src: 'c', trg: 'h', value: '2200', op: '5' },
        { src: 'h', trg: 'z', value: '2200', op: '5' },
        // { src: 'b', trg: 'a', value: '2200', op: '5' },
        // { src: 'c', trg: 'a', value: '2200', op: '5' },
        // { src: 'a', trg: 'b', value: '2200', op: '1' },
        // { src: 'a', trg: 'c', value: '2200', op: '1' },
        // { src: 'a', trg: 'd', value: '2200', op: '1' },
        // { src: 'e', trg: 'a', value: '2200', op: '1' },
        // { src: 'e', trg: 'b', value: '2200', op: '1' },
        // { src: 'e', trg: 'f', value: '2200', op: '1' },
        // { src: 'g', trg: 'f', value: '2200', op: '1' },
        // { src: 'c', trg: 'e', value: '2200', op: '1' },
        // { src: 'g', trg: 'a', value: '2200', op: '1' },
        // { src: 'a', trg: 'g', value: '2200', op: '1' },
        // { src: 'h', trg: 'b', value: '2200', op: '1' },
        // { src: 'z', trg: 'e', value: '2200', op: '1' },
    ]
    const graph = () => {
        const cy = cytoscape({
            container: document.getElementById('chart-container'),
            elements: [],
            style: [
                {
                    selector: 'node',
                    style: {
                        label: 'data(label)',
                        'background-color': 'transparent',
                        'color': '#fff',
                        'text-justification': 'center',
                        'text-valign': 'center',
                        "border-width": 2,
                        "border-color": '#ddd',
                    }
                },

                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#000',
                        'target-arrow-color': '#fff',
                        'target-arrow-shape': 'triangle',
                        'source-arrow-shape': 'none',
                        'curve-style': 'bezier',
                        'control-point-distances': [-20, 20],
                        'control-point-weights': [0.25, 0.75],
                        'label': 'data(label)',
                        'target-label': 'data(op)',
                        'target-text-offset': 30,
                        'color': '#fff',
                        'text-margin-y': 0,
                        'text-margin-x': 0,
                        "font-size": 10,
                    }
                },
            ],
        });
        const createEdge = (id: string | number, source: string | undefined, target: string | undefined, label: string, op: string | number) => {
            cy.add({
                group: 'edges',
                data: { id: id.toString(), source: source, target: target, label: label, op: op },
            });
        }
        const createNode = (id: string, label: string) => {
            cy.add({
                group: 'nodes',
                data: { id: id, label: label },
            });
        }
        const nodeExists = (nodeId: string) => {
            const node = cy.getElementById(nodeId);
            return node.length > 0;
        }
        const LastCraetedNode = (input: string) => {
            const matchingNodes = cy.nodes().filter(node => node.id().includes(input));
            const lastCreatedNode = matchingNodes[matchingNodes.length - 1].id()
            return lastCreatedNode
        }

        const firstTransaction = transactions[0]
        // const matchingNodes = cy.nodes().filter(node => node.id().includes(firstTransaction.src));
        // const firstCreatedNode = matchingNodes[0].id()

        createNode(firstTransaction.src, firstTransaction.src)

        const srcArray: string[] = []
        const trgArray: string[] = []
        const id: string[] = []

        transactions.map((transaction, i) => {

            const srcInSrc = srcArray.includes(transaction.src)
            srcArray.push(transaction.src)
            const trgInTrg = trgArray.includes(transaction.trg)
            trgArray.push(transaction.trg)
            // console.log(trgArray)
            const srcInTrg = trgArray.includes(transaction.src)
            // const trgInSrc = srcArray.includes(transaction.trg)
            // console.log(trgInTrg)
            const targetId = transaction.trg + i
            id.push(targetId)
            // const filteredSrc = id.filter(item => item.includes(transaction.src));
            const filteredTrg = id.filter(item => item.includes(transaction.trg));
            // const lastSrc = filteredSrc[filteredSrc.length - 1]
            // const lastTrg = filteredTrg.splice(-1, 1)
            console.log(filteredTrg[filteredTrg.length - 1])
            // console.log(lastTrg)

            // createNode(targetId, transaction.trg)

            const srcNode = nodeExists(transaction.src)
            // console.log(trgNode)

            if (!srcInTrg && !srcNode) {
                createNode(transaction.src, transaction.src)
                console.log('if 0')
            }

            if (srcInTrg) {
                console.log('if 1')
                const lastNode = LastCraetedNode(transaction.src)
                createNode(targetId, transaction.trg)
                createEdge(i, lastNode, targetId, transaction.value, transaction.op)

            } else if (trgInTrg && !srcInSrc) {
                console.log('else if')
                const lastNode = LastCraetedNode(transaction.trg)
                createEdge(i, transaction.src, lastNode, transaction.value, transaction.op)
            }
            else {
                console.log('else')
                createNode(targetId, transaction.trg)
                createEdge(i, transaction.src, targetId, transaction.value, transaction.op)
            }
        })
        cy.layout({
            name: 'breadthfirst',
            directed: true,
            padding: 10,
            spacingFactor: 1.75,
            avoidOverlap: true,
            circle: false,
            // animate: true,
            // animationDuration: 500
        }).run();

        cy.zoomingEnabled(false)

        cy.on('ready', () => {
            const pngData = cy.png();
            setPng(pngData);
        });

        return () => {
            cy.destroy();
        };
    }
    useEffect(() => {
        graph()
    })

    return (
        <div id="chart-container" className="w-[1000px] min-h-[700px]">
            {png && <img src={png} alt="png" className="w-full h-full" />}
        </div>
    )
}
export default NodeChart