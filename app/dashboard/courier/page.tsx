'use client'

import React, { useEffect } from 'react';
// @ts-ignore
import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const stats = [
  { label: 'Request For Quotation', value: 0, icon: '🛒' },
  { label: "Today's Revenue", value: 'Ksh 7,000', icon: '💸' },
  { label: 'Shipments', value: 50, icon: '📦' },
  { label: 'Total Warehouse', value: 100, icon: '🏢' },
];

const products = [
  {
    name: 'Red velvet frostings',
    branch: 'Abuja Branch',
    price: 'Ksh 7,000',
    quantity: 5,
    image: '/public/placeholder.jpg',
  },
  // ...repeat as needed
];

const locations = [
  { name: 'Kisumu, Kenya', details: 'View Details', lat: -0.0917, lng: 34.7679 },
  { name: 'Nbo, Kenya', details: 'View Details', lat: -1.286389, lng: 36.817223 },
];

// Chart Data
const lineData = {
  labels: ['NBO', 'MSA', 'KSM', 'BGM', 'MYL', 'NYK', 'NVS', 'USA'],
  datasets: [
    {
      label: 'Shipments',
      data: [20000, 40000, 15000, 18000, 32000, 30000, 17000, 12000],
      borderColor: '#add64e',
      backgroundColor: 'rgba(173, 214, 78, 0.2)',
      tension: 0.4,
      pointBackgroundColor: '#9bc943',
      pointBorderColor: '#add64e',
      fill: true,
    },
  ],
};
const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: '#9bc943' },
      grid: { color: 'rgba(173,214,78,0.1)' },
    },
    x: {
      ticks: { color: '#add64e' },
      grid: { color: 'rgba(173,214,78,0.05)' },
    },
  },
};

const doughnutData = {
  labels: ['Ontime', 'In Progress', 'Delayed'],
  datasets: [
    {
      data: [78, 78, 78],
      backgroundColor: ['#add64e', '#9bc943', '#f87171'],
      borderWidth: 2,
      borderColor: '#fff',
      hoverOffset: 8,
    },
  ],
};
const doughnutOptions = {
  cutout: '70%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
};

const ProviderDashboard = () => {
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#add64e]/5 p-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-background/80 backdrop-blur-xl rounded-xl shadow p-4 flex flex-col items-center border border-[#add64e]/10">
            <div className="text-3xl mb-2 text-[#add64e]">{stat.icon}</div>
            <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-[#9bc943]">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Analytics and Deliveries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Shipments Chart */}
        <div className="bg-background/80 backdrop-blur-xl rounded-xl shadow p-6 border border-[#add64e]/10">
          <div className="font-semibold mb-2 text-[#add64e]">Weekly Shipments Chart</div>
          <div className="h-64 flex items-center justify-center">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
        {/* Deliveries Donut Chart */}
        <div className="bg-background/80 backdrop-blur-xl rounded-xl shadow p-6 flex flex-col items-center justify-center border border-[#add64e]/10">
          <div className="font-semibold mb-2 text-[#add64e]">Deliveries</div>
          <div className="h-40 w-40 flex items-center justify-center">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="text-2xl font-bold text-[#add64e]">78%</div>
          </div>
          <button className="mt-4 px-4 py-2 bg-[#add64e]/10 text-[#add64e] rounded-lg border border-[#add64e]/20 hover:bg-[#add64e]/20 transition">Download Statistics</button>
        </div>
      </div>

      {/* Store Locations and Products In Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Locations Map */}
        <div className="bg-background/80 backdrop-blur-xl rounded-xl shadow p-6 border border-[#add64e]/10">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[#add64e]">Store Locations</span>
            <span className="text-[#add64e] text-sm font-medium cursor-pointer">In Europe ▼</span>
          </div>
          {/* Map Placeholder */}
          <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-100 rounded-lg">[Map will appear here]</div>
        </div>
        {/* Products In Stock */}
        <div className="bg-background/80 backdrop-blur-xl rounded-xl shadow p-6 border border-[#add64e]/10">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[#add64e]">Products In Stock</span>
            <span className="text-[#add64e] text-sm font-medium cursor-pointer">View All</span>
          </div>
          <ul>
            {products.map((product, i) => (
              <li key={i} className="flex items-center py-2 border-b last:border-b-0 border-[#add64e]/10">
                <img src={product.image} alt="product" className="w-12 h-12 rounded object-cover mr-4 border border-[#add64e]/20" />
                <div className="flex-1">
                  <div className="font-medium text-sm text-[#9bc943]">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.branch}</div>
                </div>
                <div className="text-sm text-[#add64e]">{product.price} <span className="text-xs">× {product.quantity}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
