import React from 'react'


import { useParams } from 'react-router-dom'
import { getSingleCountry } from '../../lib/api'
import { useHistory } from 'react-router-dom'


function HolidayDisplay() {
  const { id, year } = useParams()
  const history = useHistory()
  const [singleCountry, setSingleCountry] = React.useState(null)


  //* Gets a JSON object of a single country and store it in the SsingleCountry variable.
  React.useEffect(() => {
    const getData = async () => {
      const response = await getSingleCountry(id, year)
      setSingleCountry(response.data)
      console.log(response)
    }
    getData()
  }, [id, year])


  //* Back button handler
  function handleBack(){
    history.push('')
  }


  return (
    <>
      <section className="HolidayCard">
        <button onClick={handleBack}>Back</button>
        {singleCountry ?
          (<button onClick={handleBack}>Back</button>) && (

            //* Maps through the singleCountry object returning title, year, and description of holiday
            singleCountry.response.holidays.map((holiday) => (
              <div className="holiday-view" key={holiday.name}>
                <h3>{holiday.name}</h3> 
                <h5>{holiday.date.datetime.day}/{holiday.date.datetime.month}/{holiday.date.datetime.year}</h5>
                <h4>{holiday.description}</h4>
              </div>
            ))) 
          : 
          (<p>... Loading holidays </p>)}
      </section>
    </>
  )
}
export default HolidayDisplay