import React from 'react'
import { Card } from 'react-bootstrap';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';


const Chart = ({ phase }) => {
    return (
        <Card style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        type="category"
                        dataKey="x"
                        name="Phase"
                        label={{ value: 'Phase Range', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis
                        type="number"
                        dataKey="y"
                        name="Value"
                        label={{ value: 'Measurement', angle: -90, position: 'insideLeft' }}
                    />
                    <ZAxis type="number" range={[100]} />
                    <Scatter
                        name="Phase Data"
                        data={phase}
                        fill="#8884d8"
                        line
                        shape={() => null}
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default Chart
