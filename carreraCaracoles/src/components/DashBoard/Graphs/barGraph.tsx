import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import data from "../../../data/data.json";
import type { Racing, Snail, WinnersLossers } from "../../../types/typeGraph";
import { snailVictories } from "../../../services/bestSnails";

const sanils: Snail[] = data.snails;
const racing: Racing[] = data.racing;

const values: WinnersLossers[]=snailVictories(sanils, racing);
console.log(values);

function BarGraph(){
    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={values}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" />
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="value" fill="green" radius={[6, 6, 0, 0]}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarGraph;