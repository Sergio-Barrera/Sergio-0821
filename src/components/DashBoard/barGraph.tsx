import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {snailName: 'Gary', victories: 3},
    {snailName: 'Turbo', victories: 4},
    {snailName: 'Rocky', victories: 0},
    {snailName: 'Speedy', victories: 1},
    {snailName: 'Escargoon', victories: 4},
    {snailName: 'Estibilis', victories: 2}
]

function BarGraph(){
    return (
        <ResponsiveContainer width="100%" aspect={2}>
            <BarChart
                data={data}
                width={500}
                height={300}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}>
                <CartesianGrid strokeDasharray="4 1 2"/>
                <XAxis dataKey="snailName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="victories" fill="green"/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarGraph;