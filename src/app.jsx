import React, { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Container, Heading } from '@chakra-ui/react'

function startLogging(setLocations) {
  // navigator.geolocation.getCurrentPosition(logging)
  navigator.geolocation.watchPosition(logging(setLocations))
}

let locations = []

function logging(setLocations) {
  function hoge (position) {
    const p = {
      timestamp: position.timestamp,
      coords: {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speeds,
      },
    }
    // const v = JSON.stringify(p)
    locations = [...locations, p]
    console.log(locations)
    setLocations(locations)
    sessionStorage.setItem('locations', locations);
  }
  return hoge
}

function endLogging() {
  navigator.geolocation.clearWatch(id);
}

function shareAsFile() {
  if (!navigator.share) {
    alert("This device do'nt support to share file")
    return
  }
  const v = JSON.stringify(locations)
  const file = new File([v], 'geolocation-logs.json', { type: 'text/json' })
  navigator.share({files: [file]})
}

const App = () => {
  const [ls, setLocations] = useState([])
  const [started, setStarted] = useState(false)
  return <Container p={[4,8]}>
    <Heading as='h2' size='xl' mb={4}>
      Logging GeoLocation
    </Heading>
    <ButtonGroup gap='2' mb={4}>
      <Button size='md' colorScheme={ started ? "red" : "blue" }  variant='solid' onClick={() => {
        if (!started) {
          startLogging(setLocations)
        } else {
          endLogging()
        }
        setStarted(!started)
      }}>
        { started ? "Stop Logging" : "Start Logging" }
      </Button>
      {
        ls.length > 0 ? <Button variant='outline' onClick={() => shareAsFile()}> 
          Export as JSON File
        </Button>: <></>
      }
    </ButtonGroup>
    <div>
      {ls.map((l, i) => {
        return <p key={i} style={{wordBreak: "break-all"}}>
          [{i}]: {JSON.stringify(l)}
        </p>
      })}
    </div>
  </Container>
}

export default App;
