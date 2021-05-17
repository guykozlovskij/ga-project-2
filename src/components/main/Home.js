//* Imports
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getAllCountries } from '../../lib/api'


function Home() {
  const [countries, setCountries] = React.useState(null)
  const [setIsError] = React.useState(false)
  const [selectedCountry, setSelecteCountry] = React.useState('')
  const [selectedYear, setSelectedYear] = React.useState('')


  //* Gets a list of all countries and stores them in setCountries variable
  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllCountries()
        setCountries(response.data)
      } catch (error) {
        setIsError(true)
      }
    }
    getData()
  }, [])


  //* Select handlers
  const handleSelect = (e) => {
    setSelecteCountry(e.target.value)
  }

  const handleSelectedYear = (e) => {
    setSelectedYear(e.target.value)
  }


  return (
    <main>
      <div>
        <h1>EVERYDAY HOLIDAY</h1>
        <h2>Welcome to 'Everyday Holiday'!</h2>
        <p>          Your friendly neighbourhood API that displays all holidays for any
          country all the way up to 2048! Select country, year and press 'GO!'
        </p>

        <section className="choices"
        //* Select dropdown that displays all countries
        >
          <select onChange={handleSelect} value={selectedCountry}>
            <option value="" disabled selected>
              Select Country
            </option>

            {countries ? (
              //* Maps through the setCountries array are returns all country names, plus ID of the country (iso-3166) which is passed to the URL.
              countries.response.countries.map((country) => (
                <option key={country.country_name} value={country['iso-3166']}>
                  {country.country_name}
                </option>
              ))
            ) : (
              <option value="" disabled selected>
                ...Loading
              </option>
            )}
          </select>
 
          <select onChange={handleSelectedYear} value={selectedYear}>
            <option value="" disabled selected>
              Select Year
            </option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
            <option>2029</option>
            <option>2030</option>
            <option>2031</option>
            <option>2032</option>
            <option>2033</option>
            <option>2034</option>
            <option>2035</option>
            <option>2036</option>
            <option>2037</option>
            <option>2038</option>
            <option>2039</option>
            <option>2040</option>
            <option>2041</option>
            <option>2042</option>
            <option>2043</option>
            <option>2044</option>
            <option>2045</option>
            <option>2046</option>
            <option>2047</option>
            <option>2048</option>
          </select>

          {selectedYear && selectedCountry ? (
           
            <Link to={`/holidays/${selectedCountry}/${selectedYear}`}>
              <button>GO!</button>
            </Link>
          ) : (
            <strong></strong>
          )}
        </section>
      </div>
    </main>
  )
}

export default Home
