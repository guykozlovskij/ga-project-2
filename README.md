![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) 
### General Assembly, Software Engineering Immersive 

# Everyday Holiday 
by [Guy Kozlovskij](https://github.com/guykozlovskij) and [Dimitar Tsonev](https://github.com/D-Tsonev)

## Overview  

A two-day paired project as part of the Software Engineering Immersive course at General Assembly. The goal was to build a React app that consumes a public API. 

We chose to create an app showing all national holidays for a selected country adn year using Calendarific API. The app was deployed using Netlify and can be viewed [here](https://guykozlovskij-project-2.netlify.app/).


## Brief
- Consume a public API
- Have several components - at least one classical and one functional
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Project deployed online and accessible to the public
- Have semantically clean HTML 


## Technologies Used
- HTML5
- React
- CCS3
- JavaScript
- Git and GitHub
- NPM 
- VSCode Live Share 

## Approach 
Our goal was to create a simple, straightforward app that will display all holidays for a selected country with the accurate date based on a selected year, which we designed with a clean minimalist approach. As this was our first project using React, after having studied it for two weeks, our goal was to ensure we understand how to correctly pass data within components and to display correct output from the API. 

The website is mobile-friendly and accessible through the web browser

### Overview
Our website has two main components: the homepage and holiday-display page which are routed in `App.js` using `<BrowserRouter>`.

```js
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/holidays/:id/:year" component={HolidayDisplay} />
      </Switch>
    </Router>
  )
}
```

As the API was split into two sections, one two first get all the countries, and second to get a specific countries holidays, the challenge was understanding the API and correctly passing the selected country ID which is retrieved first in the homepage, combining it with the selected year ensuring the correct result is shown in the holiday-display page. 

### Requests
We implemented two requests handled in `api.js` using axios `get` methods: 

```js
export function getAllCountries(){
  return axios.get('https://calendarific.com/api/v2/countries?api_key=aad5de35593f48602bc3a0b1908fe764e122af32')
}

export function getSingleCountry(id, year) {
  return axios.get(`${holidayUrl}&country=${id}&year=${year}`)
}
```

We retrieve the `id` and `year` required for `getSingleCountry` function in the homepage from the `getAllCountries` function. 


### Homepage 
#### Country Select
![](/img/homepage.png)

The homepage starts with a friendly introduction screen displaying two dropdown boxes to select the country and the year. 

As soon as the page is loaded a GET request is made to get the list of all countries within the API. The response is then stored in the `setCountries` variable.

```js
const [countries, setCountries] = React.useState(null)

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
}, [setIsError])
```

The values are then mapped through `select` tag and a select `option` is created for each of the countries.
```js
<select onChange={handleSelect} value={selectedCountry}>
            <option value="" disabled selected>
              Select Country
            </option>
            {countries ? (
              // iso-3166 is the country ID.
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
```

The select options then hold the country ID [iso-3166] as their value which is later passed used in the URL. 