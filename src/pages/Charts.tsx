import React, { useState } from 'react';
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
  deaths: { [key: string]: number };
  recovered: { [key: string]: number };
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

  const [mainTab, setMainTab] = useState<'fluctuation' | 'dailyAddition'>('fluctuation');
  const [fluctuationSubTab, setFluctuationSubTab] = useState<'cases' | 'deaths' | 'recovered'>('cases');
  const [dailyAdditionSubTab, setDailyAdditionSubTab] = useState<'cases' | 'deaths' | 'recovered'>('cases');

  if (isCountriesLoading || isGlobalLoading || isHistoricalLoading) return <p>Loading...</p>;
  if (countriesError || globalError || historicalError) return <p>Error: {countriesError?.message || globalError?.message || historicalError?.message}</p>;

  const lineChartDataFluctuationCases = {
    labels: Object.keys(historicalData?.cases || {}),
    datasets: [
      {
        label: 'Fluctuation in Cases',
        data: Object.values(historicalData?.cases || {}),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  
  const lineChartDataFluctuationDeaths = {
    labels: Object.keys(historicalData?.deaths || {}),
    datasets: [
      {
        label: 'Fluctuation in Deaths',
        data: Object.values(historicalData?.deaths || {}),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  
  const lineChartDataFluctuationRecovered = {
    labels: Object.keys(historicalData?.recovered || {}),
    datasets: [
      {
        label: 'Fluctuation in Recovered',
        data: Object.values(historicalData?.recovered || {}),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };
  
  const lineChartDataDailyAdditionCases = {
    labels: Object.keys(historicalData?.cases || {}),
    datasets: [
      {
        label: 'Daily New Cases',
        data: Object.keys(historicalData?.cases || {}).map((date, index) => {
          const currentCases = historicalData?.cases[date] ?? 0;
          const previousCases = index > 0 ? historicalData?.cases[Object.keys(historicalData?.cases || {})[index - 1]] ?? 0 : 0;
          return currentCases - previousCases;
        }),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  
  const lineChartDataDailyAdditionDeaths = {
    labels: Object.keys(historicalData?.deaths || {}),
    datasets: [
      {
        label: 'Daily New Deaths',
        data: Object.keys(historicalData?.deaths || {}).map((date, index) => {
          const currentDeaths = historicalData?.deaths[date] ?? 0;
          const previousDeaths = index > 0 ? historicalData?.deaths[Object.keys(historicalData?.deaths || {})[index - 1]] ?? 0 : 0;
          return currentDeaths - previousDeaths;
        }),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  
  const lineChartDataDailyAdditionRecovered = {
    labels: Object.keys(historicalData?.recovered || {}),
    datasets: [
      {
        label: 'Daily New Recovered',
        data: Object.keys(historicalData?.recovered || {}).map((date, index) => {
          const currentRecovered = historicalData?.recovered[date] ?? 0;
          const previousRecovered = index > 0 ? historicalData?.recovered[Object.keys(historicalData?.recovered || {})[index - 1]] ?? 0 : 0;
          return currentRecovered - previousRecovered;
        }),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">COVID-19 Dashboard</h2>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-10">
        <h3 className="text-2xl font-semibold mb-6 text-white text-center">Global Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-300">Total Cases</p>
            <p className="text-2xl font-bold text-indigo-400">{globalData?.cases}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-300">Total Deaths</p>
            <p className="text-2xl font-bold text-red-500">{globalData?.deaths}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-300">Total Recovered</p>
            <p className="text-2xl font-bold text-green-500">{globalData?.recovered}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-300">Active Cases</p>
            <p className="text-2xl font-bold text-yellow-500">{globalData?.active}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-300">Critical Cases</p>
            <p className="text-2xl font-bold text-purple-500">{globalData?.critical}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Charts</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ul className="flex mb-4 justify-center md:justify-start">
              <li
                className={`mr-4 cursor-pointer ${mainTab === 'fluctuation' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                onClick={() => setMainTab('fluctuation')}
              >
                Fluctuation in Cases
              </li>
              <li
                className={`cursor-pointer ${mainTab === 'dailyAddition' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                onClick={() => setMainTab('dailyAddition')}
              >
                Daily New Cases
              </li>
            </ul>
            {mainTab === 'fluctuation' && (
              <>
                <ul className="flex mb-4 justify-center md:justify-start">
                  <li
                    className={`mr-4 cursor-pointer ${fluctuationSubTab === 'cases' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setFluctuationSubTab('cases')}
                  >
                    Cases
                  </li>
                  <li
                    className={`mr-4 cursor-pointer ${fluctuationSubTab === 'deaths' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setFluctuationSubTab('deaths')}
                  >
                    Deaths
                  </li>
                  <li
                    className={`cursor-pointer ${fluctuationSubTab === 'recovered' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setFluctuationSubTab('recovered')}
                  >
                    Recovered
                  </li>
                </ul>
                {fluctuationSubTab === 'cases' && <Line data={lineChartDataFluctuationCases} options={lineChartOptions} />}
                {fluctuationSubTab === 'deaths' && <Line data={lineChartDataFluctuationDeaths} options={lineChartOptions} />}
                {fluctuationSubTab === 'recovered' && <Line data={lineChartDataFluctuationRecovered} options={lineChartOptions} />}
              </>
            )}
            {mainTab === 'dailyAddition' && (
              <>
                <ul className="flex mb-4 justify-center md:justify-start">
                  <li
                    className={`mr-4 cursor-pointer ${dailyAdditionSubTab === 'cases' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setDailyAdditionSubTab('cases')}
                  >
                    Cases
                  </li>
                  <li
                    className={`mr-4 cursor-pointer ${dailyAdditionSubTab === 'deaths' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setDailyAdditionSubTab('deaths')}
                  >
                    Deaths
                  </li>
                  <li
                    className={`cursor-pointer ${dailyAdditionSubTab === 'recovered' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                    onClick={() => setDailyAdditionSubTab('recovered')}
                  >
                    Recovered
                  </li>
                </ul>
                {dailyAdditionSubTab === 'cases' && <Line data={lineChartDataDailyAdditionCases} options={lineChartOptions} />}
                {dailyAdditionSubTab === 'deaths' && <Line data={lineChartDataDailyAdditionDeaths} options={lineChartOptions} />}
                {dailyAdditionSubTab === 'recovered' && <Line data={lineChartDataDailyAdditionRecovered} options={lineChartOptions} />}
              </>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Country Map</h3>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <MapContainer center={[20, 77]} zoom={4} style={{ height: '500px', width: '100%' }}>
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
      </div>
    </div>
  );
};

export default Charts;
