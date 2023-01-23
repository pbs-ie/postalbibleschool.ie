import { ChangeEventHandler, useEffect, useState } from "react";
import { allCountries, CountryData } from "country-region-data";
import SelectInput from "@/Components/Forms/SelectInput";

export default function CountryDropdown({ value, handleChange }: { value: string, handleChange: ChangeEventHandler<HTMLElement> }) {
    const [countryList, setCountryList] = useState<CountryData[]>([]);
    useEffect(() => {
        setCountryList(allCountries.filter((country) => country[1] === "IE" || country[1] === "GB"));
        // setCountryList(allCountries);
    }, [])

    return (
        <SelectInput name="country" id="country" value={value} handleChange={handleChange}>
            <option value="">Select country</option>
            {
                countryList.map((country) =>
                    <option key={country[1]} value={country[1]}>{country[0]}</option>
                )
            }
        </SelectInput>

    )
}