/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import Confetti from "react-confetti";

import Flag from "react-world-flags";
import { getDistance } from "geolib";

import { countries } from "country-data";
import { getCode } from "country-list";

// @ts-ignore
import geoo from "geos-major";

export default function Home() {
  const coutryCodes = [
    "AD",
    "AE",
    "AF",
    "AG",
    "AI",
    "AL",
    "AM",
    "AO",
    "AQ",
    "AR",
    "AS",
    "AT",
    "AU",
    "AW",
    "AX",
    "AZ",
    "BA",
    "BB",
    "BD",
    "BE",
    "BF",
    "BG",
    "BH",
    "BI",
    "BJ",
    "BL",
    "BM",
    "BN",
    "BO",
    "BQ",
    "BR",
    "BS",
    "BT",
    "BV",
    "BW",
    "BY",
    "BZ",
    "CA",
    "CC",
    "CD",
    "CF",
    "CG",
    "CH",
    "CI",
    "CK",
    "CL",
    "CM",
    "CN",
    "CO",
    "CR",
    "CU",
    "CV",
    "CW",
    "CX",
    "CY",
    "CZ",
    "DE",
    "DJ",
    "DK",
    "DM",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "EH",
    "ER",
    "ES",
    "ET",
    "FI",
    "FJ",
    "FK",
    "FM",
    "FO",
    "FR",
    "GA",
    "GB",
    "GD",
    "GE",
    "GF",
    "GG",
    "GH",
    "GI",
    "GL",
    "GM",
    "GN",
    "GP",
    "GQ",
    "GR",
    "GS",
    "GT",
    "GU",
    "GW",
    "GY",
    "HK",
    "HM",
    "HN",
    "HR",
    "HT",
    "HU",
    "ID",
    "IE",
    "IL",
    "IM",
    "IN",
    "IO",
    "IQ",
    "IR",
    "IS",
    "IT",
    "JE",
    "JM",
    "JO",
    "JP",
    "KE",
    "KG",
    "KH",
    "KI",
    "KM",
    "KN",
    "KP",
    "KR",
    "KW",
    "KY",
    "KZ",
    "LA",
    "LB",
    "LC",
    "LI",
    "LK",
    "LR",
    "LS",
    "LT",
    "LU",
    "LV",
    "LY",
    "MA",
    "MC",
    "MD",
    "ME",
    "MF",
    "MG",
    "MH",
    "MK",
    "ML",
    "MM",
    "MN",
    "MO",
    "MP",
    "MQ",
    "MR",
    "MS",
    "MT",
    "MU",
    "MV",
    "MW",
    "MX",
    "MY",
    "MZ",
    "NA",
    "NC",
    "NE",
    "NF",
    "NG",
    "NI",
    "NL",
    "NO",
    "NP",
    "NR",
    "NU",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PF",
    "PG",
    "PH",
    "PK",
    "PL",
    "PM",
    "PN",
    "PR",
    "PS",
    "PT",
    "PW",
    "PY",
    "QA",
    "RE",
    "RO",
    "RS",
    "RU",
    "RW",
    "SA",
    "SB",
    "SC",
    "SD",
    "SE",
    "SG",
    "SH",
    "SI",
    "SJ",
    "SK",
    "SL",
    "SM",
    "SN",
    "SO",
    "SR",
    "SS",
    "ST",
    "SV",
    "SX",
    "SY",
    "SZ",
    "TC",
    "TD",
    "TF",
    "TG",
    "TH",
    "TJ",
    "TK",
    "TL",
    "TM",
    "TN",
    "TO",
    "TR",
    "TT",
    "TV",
    "TW",
    "TZ",
    "UA",
    "UG",
    "UM",
    "US",
    "UY",
    "UZ",
    "VA",
    "VC",
    "VE",
    "VG",
    "VI",
    "VN",
    "VU",
    "WF",
    "WS",
    "YE",
    "YT",
    "ZA",
    "ZM",
    "ZW",
  ];

  const size = useWindowSize();

  const [id, setId] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const [one, setOne] = useState("");
  const [oneDistance, setOneDistance] = useState("KM");

  const [two, setTwo] = useState("");
  const [twoDistance, setTwoDistance] = useState("KM");

  const [three, setThree] = useState("");
  const [threeDistance, setThreeDistance] = useState("KM");

  const [four, setFour] = useState("");
  const [fourDistance, setFourDistance] = useState("KM");

  const [five, setFive] = useState("");
  const [fiveDistance, setFiveDistance] = useState("KM");

  const [six, setSix] = useState("");
  const [sixDistance, setSixDistance] = useState("KM");

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  function CountryInput({
    className,
    value,
    setValue,
    distance,
    id,
    validId,
    setValidId,
    callback,
  }: {
    className?: string;
    value: string;
    setValue: Function;
    distance: string;
    id: number;
    validId: number;
    setValidId: Function;
    callback: Function;
  }) {
    return (
      <div className={className}>
        <h1 className="text-center font-extrabold tracking-tighter left-2 px-3 h-10 bg-white rounded absolute">
          {distance}
        </h1>
        <input
          type="text"
          className="text-center text-white p-2 border border-gray bg-transparent left-32 outline-none rounded absolute"
          placeholder="Enter a coutry"
          onInput={(event) => {
            if (id == validId) {
              setValue(event.currentTarget.value);
            }
          }}
          onKeyPress={(event) => {
            if (id == validId && event.key == "Enter") {
              const allCountriesNames = [];
              const allCountries = countries.all;

              for (let countryData of allCountries) {
                const countryName = countryData.name;

                allCountriesNames.push(countryName);
              }

              if (allCountriesNames.includes(value)) {
                setValidId(validId + 1);

                callback(value);
              }
            }
          }}
          value={value}
          autoFocus={id == validId}
        ></input>
        {id == validId ? (
          <button
            className="font-bold p-2 bg-white rounded left-80 absolute"
            onClick={() => {
              const allCountriesNames = [];
              const allCountries = countries.all;

              for (let countryData of allCountries) {
                const countryName = countryData.name;

                allCountriesNames.push(countryName);
              }

              if (allCountriesNames.includes(value)) {
                setValidId(validId + 1);

                callback(value);
              }
            }}
          >
            Send
          </button>
        ) : null}
      </div>
    );
  }

  function FlagWithBlock({
    id,
    className,
    code,
  }: {
    id: number;
    className: string;
    code: string;
  }) {
    return (
      <div>
        {id < 1 ? (
          <div className="bg-[#DDDDDD] w-12 h-12 top-18 absolute"></div>
        ) : null}

        {id < 2 ? (
          <div className="bg-[#DDDDDD] w-16 h-12 top-18 left-12 absolute"></div>
        ) : null}

        {id < 3 ? (
          <div className="bg-[#DDDDDD] w-12 h-12 top-18 left-28 absolute"></div>
        ) : null}

        {id < 4 ? (
          <div className="bg-[#DDDDDD] w-12 h-16 top-12 absolute"></div>
        ) : null}

        {id < 5 ? (
          <div className="bg-[#DDDDDD] w-16 h-16 top-12 left-12 absolute"></div>
        ) : null}

        {id < 6 ? (
          <div className="bg-[#DDDDDD] w-12 h-16 top-12 left-28 absolute"></div>
        ) : null}

        <Flag className={className} code={code} />
      </div>
    );
  }

  const [flag, setFlag] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    const randomFlagCode =
      coutryCodes[Math.round(Math.random() * coutryCodes.length - 1)];
    const randomFlagName = countries[randomFlagCode].name;

    setFlag({
      name: randomFlagName,
      code: randomFlagCode,
    });
  }, []);

  return (
    <div className="app flex bg-[#1b1a1a] w-screen h-screen">
      <main className="flex">
        <div className="font-extrabold tracking-tighter text-4xl top-12 left-40 absolute">
          <h1 className="text-green-500">
            FLA<span className="text-yellow-500">gle</span>
          </h1>
        </div>

        {oneDistance == "0" ||
        twoDistance == "0" ||
        threeDistance == "0" ||
        fourDistance == "0" ||
        fiveDistance == "0" ||
        sixDistance == "0" ? (
          <Confetti width={size.width} height={size.height} />
        ) : null}

        <div>
          {showResult ? (
            <div className="flex w-screen h-screen">
              <h1 className="text-center w-16 top-24 left-[11rem] text-white font-bold absolute">
                {flag.name.slice(0, 11)}
              </h1>
            </div>
          ) : null}
        </div>

        <div className=" left-32 top-36 absolute">
          <FlagWithBlock
            id={id}
            className="border-1 border-white w-40 h-28 rounded"
            code={flag.code}
          />
        </div>

        <div className="top-72 absolute">
          <CountryInput
            id={1}
            validId={id}
            setValidId={setId}
            value={one}
            setValue={setOne}
            distance={oneDistance}
            callback={(value: string) => {
              const from = flag.code;
              const to = getCode(value);

              try {
                const distance =
                  getDistance(geoo.country(from), geoo.country(to)) / 1000;

                setOneDistance(
                  distance == 0 ? "🎉" : distance.toFixed(0).toString() + " KM"
                );

                distance == 0 ? setId(7) : null;
              } catch (err) {
                // pass
              }
            }}
          ></CountryInput>

          <CountryInput
            id={2}
            validId={id}
            setValidId={setId}
            value={two}
            setValue={setTwo}
            distance={twoDistance}
            className="top-12 absolute"
            callback={(value: string) => {
              const from = flag.code;
              const to = getCode(value);

              try {
                const distance =
                  getDistance(geoo.country(from), geoo.country(to)) / 1000;

                setTwoDistance(
                  distance == 0 ? "🎉" : distance.toFixed(0).toString() + " KM"
                );

                distance == 0 ? setId(7) : null;
              } catch (err) {
                // pass
              }
            }}
          ></CountryInput>

          <CountryInput
            id={3}
            validId={id}
            setValidId={setId}
            value={three}
            setValue={setThree}
            distance={threeDistance}
            className="top-24 absolute"
            callback={(value: string) => {
              const from = flag.code;
              const to = getCode(value);

              try {
                const distance =
                  getDistance(geoo.country(from), geoo.country(to)) / 1000;

                setThreeDistance(
                  distance == 0 ? "🎉" : distance.toFixed(0).toString() + " KM"
                );

                distance == 0 ? setId(7) : null;
              } catch (err) {
                // pass
              }
            }}
          ></CountryInput>

          <CountryInput
            id={4}
            validId={id}
            setValidId={setId}
            value={four}
            setValue={setFour}
            distance={fourDistance}
            className="top-36 absolute"
            callback={(value: string) => {
              const from = flag.code;
              const to = getCode(value);

              try {
                const distance =
                  getDistance(geoo.country(from), geoo.country(to)) / 1000;

                setFourDistance(
                  distance == 0 ? "🎉" : distance.toFixed(0).toString() + " KM"
                );
              } catch (err) {
                // pass
              }
            }}
          ></CountryInput>

          <CountryInput
            id={5}
            validId={id}
            setValidId={setId}
            value={five}
            setValue={setFive}
            distance={fiveDistance}
            className="top-48 absolute"
            callback={(value: string) => {
              const from = flag.code;
              const to = getCode(value);

              try {
                const distance =
                  getDistance(geoo.country(from), geoo.country(to)) / 1000;

                setFiveDistance(
                  distance == 0 ? "🎉" : distance.toFixed(0).toString() + " KM"
                );

                distance == 0 ? setId(7) : null;
              } catch (err) {
                // pass
              }
            }}
          ></CountryInput>

          <CountryInput
            id={6}
            validId={id}
            setValidId={setId}
            value={six}
            setValue={setSix}
            distance={sixDistance}
            className="top-60 absolute"
            callback={(value: string) => {
              const from = flag.code;
              const to = getCode(value);

              try {
                const distance =
                  getDistance(geoo.country(from), geoo.country(to)) / 1000;

                setSixDistance(
                  distance == 0 ? "🎉" : distance.toFixed(0).toString() + " KM"
                );

                setShowResult(true);
                distance == 0 ? setId(7) : null;
              } catch (err) {
                // pass
              }
            }}
          ></CountryInput>
        </div>
      </main>
    </div>
  );
}
