/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Flag from "react-world-flags";
import { getDistance } from "geolib";

import { countries } from "country-data"

// @ts-ignore
import geoo from "geos-major";

export default function Home() {
  const coutryCodes = [
    "ABW",
    "AFG",
    "AGO",
    "AIA",
    "ALA",
    "ALB",
    "AND",
    "ARE",
    "ARG",
    "ARM",
    "ASM",
    "ATA",
    "ATF",
    "ATG",
    "AUS",
    "AUT",
    "AZE",
    "BDI",
    "BEL",
    "BEN",
    "BES",
    "BFA",
    "BGD",
    "BGR",
    "BHR",
    "BHS",
    "BIH",
    "BLM",
    "BLR",
    "BLZ",
    "BMU",
    "BOL",
    "BRA",
    "BRB",
    "BRN",
    "BTN",
    "BVT",
    "BWA",
    "CAF",
    "CAN",
    "CCK",
    "CHE",
    "CHL",
    "CHN",
    "CIV",
    "CMR",
    "COD",
    "COG",
    "COK",
    "COL",
    "COM",
    "CPV",
    "CRI",
    "CUB",
    "CUW",
    "CXR",
    "CYM",
    "CYP",
    "CZE",
    "DEU",
    "DJI",
    "DMA",
    "DNK",
    "DOM",
    "DZA",
    "ECU",
    "EGY",
    "ERI",
    "ESH",
    "ESP",
    "EST",
    "ETH",
    "FIN",
    "FJI",
    "FLK",
    "FRA",
    "FRO",
    "FSM",
    "GAB",
    "GBR",
    "GEO",
    "GGY",
    "GHA",
    "GIB",
    "GIN",
    "GLP",
    "GMB",
    "GNB",
    "GNQ",
    "GRC",
    "GRD",
    "GRL",
    "GTM",
    "GUF",
    "GUM",
    "GUY",
    "HKG",
    "HMD",
    "HND",
    "HRV",
    "HTI",
    "HUN",
    "IDN",
    "IMN",
    "IND",
    "IOT",
    "IRL",
    "IRN",
    "IRQ",
    "ISL",
    "ISR",
    "ITA",
    "JAM",
    "JEY",
    "JOR",
    "JPN",
    "KAZ",
    "KEN",
    "KGZ",
    "KHM",
    "KIR",
    "KNA",
    "KOR",
    "KWT",
    "LAO",
    "LBN",
    "LBR",
    "LBY",
    "LCA",
    "LIE",
    "LKA",
    "LSO",
    "LTU",
    "LUX",
    "LVA",
    "MAC",
    "MAF",
    "MAR",
    "MCO",
    "MDA",
    "MDG",
    "MDV",
    "MEX",
    "MHL",
    "MKD",
    "MLI",
    "MLT",
    "MMR",
    "MNE",
    "MNG",
    "MNP",
    "MOZ",
    "MRT",
    "MSR",
    "MTQ",
    "MUS",
    "MWI",
    "MYS",
    "MYT",
    "NAM",
    "NCL",
    "NER",
    "NFK",
    "NGA",
    "NIC",
    "NIU",
    "NLD",
    "NOR",
    "NPL",
    "NRU",
    "NZL",
    "OMN",
    "PAK",
    "PAN",
    "PCN",
    "PER",
    "PHL",
    "PLW",
    "PNG",
    "POL",
    "PRI",
    "PRK",
    "PRT",
    "PRY",
    "PSE",
    "PYF",
    "QAT",
    "REU",
    "ROU",
    "RUS",
    "RWA",
    "SAU",
    "SDN",
    "SEN",
    "SGP",
    "SGS",
    "SHN",
    "SJM",
    "SLB",
    "SLE",
    "SLV",
    "SMR",
    "SOM",
    "SPM",
    "SRB",
    "SSD",
    "STP",
    "SUR",
    "SVK",
    "SVN",
    "SWE",
    "SWZ",
    "SXM",
    "SYC",
    "SYR",
    "TCA",
    "TCD",
    "TGO",
    "THA",
    "TJK",
    "TKL",
    "TKM",
    "TLS",
    "TON",
    "TTO",
    "TUN",
    "TUR",
    "TUV",
    "TWN",
    "TZA",
    "UGA",
    "UKR",
    "UMI",
    "URY",
    "USA",
    "UZB",
    "VAT",
    "VCT",
    "VEN",
    "VGB",
    "VIR",
    "VNM",
    "VUT",
    "WLF",
    "WSM",
    "YEM",
    "ZAF",
    "ZMB",
    "ZWE",
  ];

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
        <input type="text" className="text-center text-white p-2 border border-gray bg-transparent outline-none rounded" placeholder="Enter a coutry" onChange={(event) => {
          setValue(event.target.value)
        }} defaultValue={value}></input>
        <button onClick={() => {
          const allCountriesNames = []
          const allCountries = countries.all

          for(let countryData of allCountries) {
            const countryName = countryData.name

            allCountriesNames.push(countryName)
          }

          if(allCountriesNames.includes(value)) {
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
          <CountryInput value={one} setValue={setOne} distance={oneDistance} callback={() => {
            setOneDistance(getDistance(
              geoo.cou
            ))
          }}></CountryInput>
        </div>

      </main>
    </div>
  );
}
