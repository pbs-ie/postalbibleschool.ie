import { ChangeEventHandler, useEffect, useState } from "react";
import { allCountries, Region } from "country-region-data";
import SelectInput from "./SelectInput";

export default function RegionDropdown({ value, handleChange, country }: { value: string, handleChange: ChangeEventHandler<HTMLElement>, country: string }) {
    const [regionList, setRegionList] = useState<Region[]>([]);
    useEffect(() => {
        setRegionList(allCountries.find((c) => c[1] === country)?.[2] ?? []);
    }, [country]);

    return (
        <>
            {country !== "" &&
                <SelectInput name="region" id="region" value={value} handleChange={handleChange}>
                    <option value="" disabled>Select Region</option>
                    {
                        regionList.map((region) =>
                            <option key={region[1]} value={region[1]}>{region[0]}</option>
                        )
                    }
                </SelectInput>
            }
        </>

    )
}