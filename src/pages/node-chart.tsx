import { FC, useEffect, useState } from "react";
import cytoscape from "cytoscape";
import "./node-chart.css"

const NodeChart: FC = () => {
    const [png, setPng] = useState('');

    useEffect(() => {
        const cy = cytoscape({
            container: document.getElementById('chart-container'),
            elements: [
                {
                    data: { id: 'a' }
                },
                {
                    data: { id: 'b' }
                },
                {
                    data: { id: 'c' }
                },
                {
                    data: { id: 'ab', source: 'a', target: 'b' }
                },
                {
                    data: { id: 'b  c', source: 'c', target: 'a' }
                }
            ],
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(id)'
                    }
                },

                {
                    selector: 'edge',
                    style: {
                        'width': 1,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ],
            layout: {
                name: 'grid',
                rows: 1
            }

        });

        cy.zoomingEnabled(false)
        
        cy.on('ready', () => {
            const pngData = cy.png();
            setPng(pngData);
        });

        cy.reset()
        return () => {
            cy.destroy();
        };
    }, [png]);


    return (
        <>
            <div id="chart-container" className="w-96 h-96">
                {png && <img src={png} alt="png" className="w-full h-full" />}
            </div>
        </>
    )
}
export default NodeChart