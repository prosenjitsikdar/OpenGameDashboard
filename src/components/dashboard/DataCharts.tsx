import React from 'react';

interface ChartData {
  labels: string[];
  values: number[];
}

interface DataChartsProps {
  winLossRatioData: ChartData;
  betsByMarketTypeData: ChartData;
  betsBySportData: ChartData;
}

const DataCharts: React.FC<DataChartsProps> = ({ 
  winLossRatioData, 
  betsByMarketTypeData, 
  betsBySportData 
}) => {
  const chartContainerStyle = "flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 transition-all duration-300";
  
  const getChartColors = (count: number) => {
    const colors = [
      "#3b82f6", "#10b981", "#f59e0b", "#ef4444", 
      "#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6"
    ];
    return colors.slice(0, count);
  };
  
  const ChartPlaceholder = ({ title, data, type }: { title: string, data: ChartData, type: 'pie' | 'bar' }) => {
    const colors = getChartColors(data.labels.length);
    const total = data.values.reduce((sum, value) => sum + value, 0);
    
    return (
      <div className={chartContainerStyle}>
        <h3 className="text-lg font-bold mb-4 dark:text-white">{title}</h3>
        <div className="h-60 flex flex-col items-center justify-center">
          {type === 'pie' ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-40 h-40">
                {total > 0 ? (
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {data.values.map((value, index) => {
                      const percentage = (value / total) * 360;
                      let startAngle = 0;
                      
                      // Calculate start angle based on previous segments
                      for (let i = 0; i < index; i++) {
                        startAngle += (data.values[i] / total) * 360;
                      }
                      
                      // Convert angles to coordinates
                      const startX = 50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180);
                      const startY = 50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180);
                      const endX = 50 + 50 * Math.cos((startAngle + percentage - 90) * Math.PI / 180);
                      const endY = 50 + 50 * Math.sin((startAngle + percentage - 90) * Math.PI / 180);
                      
                      const largeArcFlag = percentage > 180 ? 1 : 0;
                      
                      return (
                        <path
                          key={index}
                          d={`M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                          fill={colors[index % colors.length]}
                        />
                      );
                    })}
                  </svg>
                ) : (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                )}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white dark:bg-gray-800 rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-end justify-between px-4 gap-2">
              {data.values.map((value, index) => {
                const maxValue = Math.max(...data.values, 1);
                const heightPercentage = (value / maxValue) * 100;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1 h-full">
                    <div className="flex-1 w-full flex items-end">
                      <div 
                        className="w-full rounded-t-md transition-all duration-500 ease-out"
                        style={{ 
                          height: `${heightPercentage}%`, 
                          backgroundColor: colors[index % colors.length],
                          minHeight: value === 0 ? '2px' : '0',
                        }}
                      ></div>
                    </div>
                    <div className="text-xs mt-2 text-gray-600 dark:text-gray-400 font-medium text-center h-8 overflow-hidden">
                      {data.labels[index]}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.labels.map((label, index) => (
            <div key={index} className="flex items-center text-sm">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-gray-700 dark:text-gray-300">
                {label}: {data.values[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      <ChartPlaceholder 
        title="Win/Loss Ratio" 
        data={winLossRatioData}
        type="pie"
      />
      <ChartPlaceholder 
        title="Bets by Market Type" 
        data={betsByMarketTypeData}
        type="bar"
      />
      <ChartPlaceholder 
        title="Bets by Sport" 
        data={betsBySportData}
        type="bar"
      />
    </div>
  );
};

export default DataCharts;