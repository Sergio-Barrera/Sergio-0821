import { Legend, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, type PieSectorShapeProps } from "recharts";
import { winnerLoser, resultBest } from "../../../services/bestSnails";
import type { Bets, Racing, ResultBets, WinnersLossers } from "../../../types/typeGraph";
import data from "../../../data/data.json";

const racing: Racing[] = data.racing;
const best: Bets[] = data.bets;
const resultsBests: ResultBets[] = resultBest(racing, best);
const winnersLosers: WinnersLossers[] = winnerLoser(resultsBests);
const COLORS = [
    '#085305',
    '#720808',
];

const CustomSector = (props: PieSectorShapeProps) => {
  const { index = 0 } = props;

  return (
    <Sector
        {...props}
        fill={COLORS[index % COLORS.length]}
    />
  );
};

function DonutGraph(){
    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={winnersLosers}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius="55%"
                        outerRadius="78%"
                        paddingAngle={4}
                        stroke="none"
                        shape={CustomSector}
                        label={({ name, percent }) =>
                            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                    />
                    <Tooltip
                        formatter={(value, name) => [
                            value,
                            name,
                        ]}
                        contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}  
                    />
                    <Legend
                        height={36}
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DonutGraph;