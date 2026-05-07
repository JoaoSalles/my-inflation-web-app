import { usePrices } from '@src/hooks/usePrices';
import { Chart } from '@src/components/chart';
import { parsePrices } from '@src/utils/parsePrices';

export default function DashboardPage() {
    const { data, isPending, error } = usePrices({ product: "achocolatado"});
    console.log("data", data);

    if (isPending) {
        return (<>loading...</>)
    }

    if (error) {
        return (<>error...</>)
    }

    const chartInputs = parsePrices(data.data);

    return (<>
        dashboard
        <div className="w-full max-w-[500px] max-h-[500px]">
            <Chart
                labels={chartInputs.times}
                datasets={[
                    {
                        data: chartInputs.prices,
                        borderColor: 'rgb(168, 165, 6)',
                        backgroundColor: 'rgba(198, 253, 0, 0.92)', 
                    }
                ]}
                title="title test"
            />
        </div>
     </>)
}
