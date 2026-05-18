import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface ChartProps {
  labels: string[]
  datasets: ChartData<'line'>['datasets']
  title?: string
}

export default function Chart({ labels, datasets, title }: ChartProps) {
  const style = getComputedStyle(document.documentElement)
  const gridColor = style.getPropertyValue('--border').trim() || '#e5e4e7'
  const textColor = style.getPropertyValue('--text').trim() || '#6b6375'
  const tooltipBg = style.getPropertyValue('--accent').trim() || '#1c1c1c'

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: !!title, text: title },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: textColor,
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: (ctx) => `R$ ${(ctx.parsed.y ?? 0).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor, lineWidth: 1 },
        border: { color: gridColor },
        ticks: {
          color: textColor,
          font: { family: "'Inter Variable', system-ui, sans-serif", size: 12 },
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: { color: gridColor, lineWidth: 1 },
        border: { color: gridColor },
        ticks: {
          color: textColor,
          font: { family: "'Inter Variable', system-ui, sans-serif", size: 12 },
          callback: (value) => `R$ ${Number(value).toFixed(2)}`,
        },
      },
    },
  }

  return <Line options={options} data={{ labels, datasets }} />
}
