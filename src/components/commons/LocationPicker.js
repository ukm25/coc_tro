import { Cascader } from "antd";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
async function getLocationTree() {
  const myRequest = new Request("https://provinces.open-api.vn/api/?depth=3");
  let result = await fetch(myRequest).then((response) => {
    try {
      return response.json();
    } catch {
      return response.text();
    }
  });
  return result;
}

const LocationPicker = (props) => {
  const setChosenLocation = props.setChosenLocation;
  const [locations, setLocations] = useState([]);
  async function loadLocation() {
    let rawResult = [];
    let finalResult = [];
    rawResult = await getLocationTree().then((response) => {
      return [...response];
    });

    rawResult.forEach((city) => {
      let districts = [];

      city.districts.forEach((district) => {
        let wards = [];
        district.wards.forEach((ward) => {
          let currentWard = {
            value: ward.name,
            label: ward.name,
          };

          wards = [...wards, currentWard];
        });

        let currentDistrict = {
          value: district.name,
          label: district.name,
          children: [...wards],
        };
        // add wards
        districts = [...districts, currentDistrict];
      });
      //transform
      let cityInfo = {
        value: city.name,
        label: city.name,
        children: [...districts],
      };

      finalResult = [...finalResult, cityInfo];
    });
    console.log(finalResult)
    setLocations(finalResult);
  }
  useEffect(() => {
    loadLocation();
  }, []);

  return (
    <Cascader
      placeholder="Quận,Huyện/Phường,Xã"
      onChange={(value, selectedOptions) => {
        let tempLocation = [];
        selectedOptions.forEach((option) => {
          tempLocation = [...tempLocation, option.value];
        });
        setChosenLocation(tempLocation);
      }}
      options={locations}
      defaultValue={[...props.chosenLocation]}
    />
  );
};
export default LocationPicker;
