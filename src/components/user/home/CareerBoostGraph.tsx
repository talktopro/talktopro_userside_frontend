import { Card } from "@/components/ui/card";
import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";
import logo from "@/assets/svg/logo.svg";

export function CareerBoostGraph() {
  const data = [
    { name: "Initiative", value: 5 },
    { name: "Improvements", value: 25 },
    { name: "Downfall", value: 10 },
    { name: "Hard Work", value: 50 },
    { name: "Excited", value: 75 },
    { name: "Success", value: 99 },
  ];

  return (
    <Card className=" w-80 p-0 shadow-sm border-0 bg-background/95 backdrop-blur-sm in-dark:border relative">
      <div className="p-4">
        <h3 className="font-medium text-sm">Boost Your Career Growth</h3>
      </div>

      {/* Profile Circle */}
      <div className="absolute w-24 h-24 -right-5 -bottom-5 rounded-full overflow-hidden border-4 border-background shadow-lg">
        <div className="w-full h-full bg-gray-300 relative">
          <img
            src={logo}
            alt="Profile"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
      </div>

      <div className="p-4 pt-2 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              ticks={[0, 25, 50, 75, 100]} // Explicit ticks including 0
              interval={0} // Force all ticks to show
            />
            <Line
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={2}
              dot={false}
            />
            <svg style={{ height: 0 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#90EE90" />
                </linearGradient>
              </defs>
            </svg>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
