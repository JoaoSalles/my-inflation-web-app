import { usePrices } from '@src/hooks/usePrices';
import { Chart } from '@src/components/chart';
import { parsePrices } from '@src/utils/parsePrices';

export default function DashboardPage() {
    const { data, isPending, error } = usePrices({ from: "2026-05-05T00:00:00Z"});
    console.log("data", data);

    if (isPending) {
        return (<>loading...</>)
    }

    if (error) {
        return (<>error...</>)
    }

    const chartInouts = parsePrices(data);

    return (<>
        dashboard
        <div className="w-full max-w-[500px] max-h-[500px]">
            <Chart
                labels={chartInouts.times}
                datasets={[
                    {
                        data: chartInouts.prices,
                        borderColor: 'rgb(168, 165, 6)',
                        backgroundColor: 'rgba(198, 253, 0, 0.92)', 
                    }
                ]}
                title="title test"
            />
        </div>
     </>)
}
