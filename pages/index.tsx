/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Flag from "react-world-flags";
import { getDistance } from "geolib";

import { countries } from "country-data"
import { getCode } from "country-list"

// @ts-ignore
import geoo from "geos-major";

export default function Home() {
  const coutryCodes =  AD",AE",AF",AG",AI",AL",AM",AO",AQ",AR",AS",AT",AU",AW",AX",AZ",BA",BB",BD",BE",BF",BG",BH",BI",BJ",BL",BM",BN",BO",BQ",BR",BS",BT",BV",BW",BY",BZ",CA",CC",CD",CF",CG",CH",CI",CK",CL",CM",CN",CO",CR",CU",CV",CW",CX",CY",CZ",DE",DJ",DK",DM",DO",DZ",EC",EE",EG",EH",ER",ES",ET",FI",FJ",FK",FM",FO",FR",GA",GB",GD",GE",GF",GG",GH",GI",GL",GM",GN",GP",GQ",GR",GS",GT",GU",GW",GY",HK",HM",HN",HR",HT",HU",ID",IE",IL",IM",IN",IO",IQ",IR",IS",IT",JE",JM",JO",JP",KE",KG",KH",KI",KM",KN",KP",KR",KW",KY",KZ",LA",LB",LC",LI",LK",LR",LS",LT",LU",LV",LY",MA",MC",MD",ME",MF",MG",MH",MK",ML",MM",MN",MO",MP",MQ",MR",MS",MT",MU",MV",MW",MX",MY",MZ",NA",NC",NE",NF",NG",NI",NL",NO",NP",NR",NU",NZ",OM",PA",PE",PF",PG",PH",PK",PL",PM",PN",PR",PS",PT",PW",PY",QA",RE",RO",RS",RU",RW",SA",SB",SC",SD",SE",SG",SH",SI",SJ",SK",SL",SM",SN",SO",SR",SS",ST",SV",SX",SY",SZ",TC",TD",TF",TG",TH",TJ",TK",TL",TM",TN",TO",TR",TT",TV",TW",TZ",UA",UG",UM",US",UY",UZ",VA",VC",VE",VG",VI",VN",VU",WF",WS",YE",YT",ZA",ZM",ZW

  const [one, setOne] = useState('')
  const [oneDistance, setOneDistance] = useState(0)

  const [two, setTwo] = useState('')
  const [three, setThree] = useState('')
  const [four, setFour] = useState('')
  const [five, setFive] = useState('')

  function CountryInput({ value, setValue, distance, blocked, callback }: { value: string, setValue: Function, distance: number, blocked?: boolean, callback: Function}) {
    return (
      <div>
        <h1>{distance} KM</h1>
        <input type="text" className="text-center text-white p-2 border border-gray bg-transparent outline-none rounded" placeholder="Enter a coutry" onChange={(event) => setValue(event.target.value)} defaultValue={value}></input>
        <button onClick={() => {
          const allCountriesNames = []
          const allCountries = countries.all

          for(let countryData of allCountries) {
            const countryName = countryData.name

            allCountriesNames.push(countryName)
          }

          if(allCountriesNames.includes(value)) {
            console.log(value)
            callback(value)
          }
        }}>Send</button>
      </div>
    )
  }

  const [flag, setFlag] = useState({
    name: '',
    code: ''
  })

  useEffect(() => {
    const randomFlagCode = coutryCodes[Math.round(Math.random() * coutryCodes.length - 1)]
    const randomFlagName = countries[randomFlagCode].name

    setFlag({
      name: randomFlagName,
      code: randomFlagCode,
    })
  }, [])

  return (
    <div className="flex bg-[#1b1a1a] w-screen h-screen">
      <main className="flex">
        <div className="font-extrabold tracking-tighter text-4xl top-16 left-40 absolute">
          <h1 className="text-green-500">FLA<span className="text-yellow-500">gle</span></h1>
        </div>

        <div>
          <CountryInput value={one} setValue={setOne} distance={oneDistance} callback={(value: string) => {
            const from = flag.code
            const to = getCode(value)

            console.log(`From (${from}) ${geoo.country(from)}, To (${to}) ${geoo.country(to)}`)
            
            setOneDistance(getDistance(
              geoo.country(from),
              geoo.country(to)
            ))
          }}></CountryInput>
          <h1 className="text-white">{flag.name}</h1>
        </div>

      </main>
    </div>
  );
}
