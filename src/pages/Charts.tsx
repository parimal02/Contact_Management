// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { useQuery } from '@tanstack/react-query';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface CountryInfo {
//   _id: number;
//   iso2: string;
//   iso3: string;
//   lat: number;
//   long: number;
//   flag: string;
// }

// interface CountryData {
//   updated: number;
//   country: string;
//   countryInfo: CountryInfo;
//   cases: number;
//   todayCases: number;
//   deaths: number;
//   todayDeaths: number;
//   recovered: number;
//   todayRecovered: number;
//   active: number;
//   critical: number;
//   casesPerOneMillion: number;
//   deathsPerOneMillion: number;
//   tests: number;
//   testsPerOneMillion: number;
//   population: number;
//   continent: string;
//   oneCasePerPeople: number;
//   oneDeathPerPeople: number;
//   oneTestPerPeople: number;
//   activePerOneMillion: number;
//   recoveredPerOneMillion: number;
//   criticalPerOneMillion: number;
// }

// interface GlobalData {
//   updated: number;
//   cases: number;
//   todayCases: number;
//   deaths: number;
//   todayDeaths: number;
//   recovered: number;
//   todayRecovered: number;
//   active: number;
//   critical: number;
//   casesPerOneMillion: number;
//   deathsPerOneMillion: number;
//   tests: number;
//   testsPerOneMillion: number;
//   population: number;
//   oneCasePerPeople: number;
//   oneDeathPerPeople: number;
//   oneTestPerPeople: number;
//   activePerOneMillion: number;
//   recoveredPerOneMillion: number;
//   criticalPerOneMillion: number;
//   affectedCountries: number;
// }

// interface HistoricalData {
//   cases: { [key: string]: number };
// }

// const fetchCovidData = async (): Promise<CountryData[]> => {
//   const response = await fetch('https://disease.sh/v3/covid-19/countries');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// const fetchGlobalData = async (): Promise<GlobalData> => {
//   const response = await fetch('https://disease.sh/v3/covid-19/all');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// const fetchHistoricalData = async (): Promise<HistoricalData> => {
//   const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// const Charts: React.FC = () => {
//   const { data: countriesData, error: countriesError, isLoading: isCountriesLoading } = useQuery<CountryData[], Error>({
//     queryKey: ['covidData'],
//     queryFn: fetchCovidData,
//   });

//   const { data: globalData, error: globalError, isLoading: isGlobalLoading } = useQuery<GlobalData, Error>({
//     queryKey: ['globalData'],
//     queryFn: fetchGlobalData,
//   });

//   const { data: historicalData, error: historicalError, isLoading: isHistoricalLoading } = useQuery<HistoricalData, Error>({
//     queryKey: ['historicalData'],
//     queryFn: fetchHistoricalData,
//   });

//   if (isCountriesLoading || isGlobalLoading || isHistoricalLoading) return <p>Loading...</p>;
//   if (countriesError || globalError || historicalError) return <p>Error: {countriesError?.message || globalError?.message || historicalError?.message}</p>;

//   const lineChartData = {
//     labels: Object.keys(historicalData?.cases || {}),
//     datasets: [
//       {
//         label: 'Total Cases',
//         data: Object.values(historicalData?.cases || {}),
//         fill: false,
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         borderColor: 'rgba(75,192,192,1)',
//       },
//     ],
//   };

//   const lineChartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       <div style={{ flex: 1, padding: '1rem' }}>
//         <h2>COVID-19 Global Statistics</h2>
//         <p><strong>Total Cases:</strong> {globalData?.cases}</p>
//         <p><strong>Total Deaths:</strong> {globalData?.deaths}</p>
//         <p><strong>Total Recovered:</strong> {globalData?.recovered}</p>
//         <p><strong>Active Cases:</strong> {globalData?.active}</p>
//         <p><strong>Critical Cases:</strong> {globalData?.critical}</p>
//       </div>
//       <div style={{ flex: 1, padding: '1rem' }}>
//         <Line data={lineChartData} options={lineChartOptions} />
//       </div>
//       <div style={{ flex: 2, padding: '1rem' }}>
//         <MapContainer center={[20, 77]} zoom={4} style={{ height: '100%', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {countriesData?.map((country) => (
//             <Marker
//               key={country.countryInfo._id}
//               position={[country.countryInfo.lat, country.countryInfo.long]}
//               icon={L.icon({
//                 iconUrl: country.countryInfo.flag,
//                 iconSize: [25, 25],
//                 iconAnchor: [12, 12],
//               })}
//             >
//               <Popup>
//                 <div>
//                   <h2>{country.country}</h2>
//                   <p><strong>Active Cases:</strong> {country.active}</p>
//                   <p><strong>Recovered Cases:</strong> {country.recovered}</p>
//                   <p><strong>Deaths:</strong> {country.deaths}</p>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default Charts;
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useQuery } from '@tanstack/react-query';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CountryInfo {
  _id: number;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  flag: string;
}

interface CountryData {
  updated: number;
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

interface GlobalData {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  affectedCountries: number;
}

interface HistoricalData {
  cases: { [key: string]: number };
}

const fetchCovidData = async (): Promise<CountryData[]> => {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchGlobalData = async (): Promise<GlobalData> => {
  const response = await fetch('https://disease.sh/v3/covid-19/all');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchHistoricalData = async (): Promise<HistoricalData> => {
  const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Charts: React.FC = () => {
  const { data: countriesData, error: countriesError, isLoading: isCountriesLoading } = useQuery<CountryData[], Error>({
    queryKey: ['covidData'],
    queryFn: fetchCovidData,
  });

  const { data: globalData, error: globalError, isLoading: isGlobalLoading } = useQuery<GlobalData, Error>({
    queryKey: ['globalData'],
    queryFn: fetchGlobalData,
  });

  const { data: historicalData, error: historicalError, isLoading: isHistoricalLoading } = useQuery<HistoricalData, Error>({
    queryKey: ['historicalData'],
    queryFn: fetchHistoricalData,
  });

  if (isCountriesLoading || isGlobalLoading || isHistoricalLoading) return <p>Loading...</p>;
  if (countriesError || globalError || historicalError) return <p>Error: {countriesError?.message || globalError?.message || historicalError?.message}</p>;

  const lineChartData = {
    labels: Object.keys(historicalData?.cases || {}),
    datasets: [
      {
        label: 'Total Cases',
        data: Object.values(historicalData?.cases || {}),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>COVID-19 Dashboard</h2>
      <div style={{ display: 'flex', height: 'calc(100vh - 100px)' }}>
        <div style={{ flex: 2, padding: '1rem' }}>
          <h3>Cases Chart</h3>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div style={{ flex: 3, padding: '1rem' }}>
          <h3>Country Map</h3>
          <MapContainer center={[20, 77]} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {countriesData?.map((country) => (
              <Marker
                key={country.countryInfo._id}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                icon={L.icon({
                  iconUrl: country.countryInfo.flag,
                  iconSize: [25, 25],
                  iconAnchor: [12, 12],
                })}
              >
                <Popup>
                  <div>
                    <h2>{country.country}</h2>
                    <p><strong>Active Cases:</strong> {country.active}</p>
                    <p><strong>Recovered Cases:</strong> {country.recovered}</p>
                    <p><strong>Deaths:</strong> {country.deaths}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <div style={{ padding: '1rem' }}>
        <h3>Global Statistics</h3>
        <p><strong>Total Cases:</strong> {globalData?.cases}</p>
        <p><strong>Total Deaths:</strong> {globalData?.deaths}</p>
        <p><strong>Total Recovered:</strong> {globalData?.recovered}</p>
        <p><strong>Active Cases:</strong> {globalData?.active}</p>
        <p><strong>Critical Cases:</strong> {globalData?.critical}</p>
      </div>
    </div>
  );
};

export default Charts;