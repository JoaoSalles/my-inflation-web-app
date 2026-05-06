import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface ChartProps {
  labels: string[]
  datasets: ChartData<'line'>['datasets']
  title?: string
}

const baseOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: '' },
  },
}

export default function Chart({ labels, datasets, title }: ChartProps) {
  const options: ChartOptions<'line'> = {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      title: { display: !!title, text: title },
    },
  }

  return <Line options={options} data={{ labels, datasets }} />
}
