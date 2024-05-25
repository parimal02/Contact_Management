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
// <div className="container mx-auto py-8">
//   <h2 className="text-2xl font-bold mb-6">COVID-19 Dashboard</h2>
//   <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//     <h3 className="text-lg font-semibold mb-4">Global Statistics</h3>
//     <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//       <div>
//         <p className="text-gray-600">Total Cases:</p>
//         <p className="text-2xl font-bold">{globalData?.cases}</p>
//       </div>
//       <div>
//         <p className="text-gray-600">Total Deaths:</p>
//         <p className="text-2xl font-bold">{globalData?.deaths}</p>
//       </div>
//       <div>
//         <p className="text-gray-600">Total Recovered:</p>
//         <p className="text-2xl font-bold">{globalData?.recovered}</p>
//       </div>
//       <div>
//         <p className="text-gray-600">Active Cases:</p>
//         <p className="text-2xl font-bold">{globalData?.active}</p>
//       </div>
//       <div>
//         <p className="text-gray-600">Critical Cases:</p>
//         <p className="text-2xl font-bold">{globalData?.critical}</p>
//       </div>
//     </div>
//   </div>
//   <div className="flex flex-col md:flex-row">
//     <div className="md:w-1/2 md:pr-4 mb-8 md:mb-0">
//       <h3 className="text-lg font-semibold mb-4">Cases Chart</h3>
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <Line data={lineChartData} options={lineChartOptions} />
//       </div>
//     </div>
//     <div className="md:w-1/2 md:pl-4">
//       <h3 className="text-lg font-semibold mb-4">Country Map</h3>
//       <div className="bg-white rounded-lg shadow-md p-6 h-full">
//         <MapContainer
//           center={[20, 77]}
//           zoom={4}
//           style={{ height: '500px', width: '100%' }}
//         >
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
//                   <p>
//                     <strong>Active Cases:</strong> {country.active}
//                   </p>
//                   <p>
//                     <strong>Recovered Cases:</strong> {country.recovered}
//                   </p>
//                   <p>
//                     <strong>Deaths:</strong> {country.deaths}
//                   </p>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//     </div>
//   </div>
// </div>
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
        hoverBackgroundColor: 'rgba(255,99,132,0.2)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              borderColor: 'rgba(255,99,132,1)',
              backgroundColor: 'rgba(255,99,132,0.2)',
            };
          },
        },
      },
    },
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">COVID-19 Dashboard</h2>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
        <h3 className="text-2xl font-semibold mb-6">Global Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">Total Cases</p>
            <p className="text-2xl font-bold text-indigo-600">{globalData?.cases}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">Total Deaths</p>
            <p className="text-2xl font-bold text-red-600">{globalData?.deaths}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">Total Recovered</p>
            <p className="text-2xl font-bold text-green-600">{globalData?.recovered}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">Active Cases</p>
            <p className="text-2xl font-bold text-yellow-600">{globalData?.active}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">Critical Cases</p>
            <p className="text-2xl font-bold text-purple-600">{globalData?.critical}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-4 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-6">Cases Chart</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
        <div className="md:w-1/2 md:pl-4">
          <h3 className="text-xl font-semibold mb-6">Country Map</h3>
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <MapContainer
              center={[20, 77]}
              zoom={4}
              style={{ height: '500px', width: '100%' }}
            >
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
                      <p>
                        <strong>Active Cases:</strong> {country.active}
                      </p>
                      <p>
                        <strong>Recovered Cases:</strong> {country.recovered}
                      </p>
                      <p>
                        <strong>Deaths:</strong> {country.deaths}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;


