//  initialize selected parcel
let selectedParcel = null;

const Container = document.querySelector(".container");
const cityHeaderWrapper = document.createElement("div");
cityHeaderWrapper.classList.add("city-Header-Wrapper");
for (const city in CITY_COLOR) {
  const color1 = CITY_COLOR[city];
  const cityHeader = document.createElement("div");
  cityHeader.classList.add("city-Header");
  cityHeader.style.backgroundColor = color1;
  cityHeader.textContent = city;
  cityHeader.style.width = "100%";
  cityHeaderWrapper.appendChild(cityHeader);
}
Container.appendChild(cityHeaderWrapper);

/*********************************  This is to display cities on top   ****************************************** */
const cityContainer = document.createElement("div");
cityContainer.classList.add("city-container");

// Create city boxes
for (const city in CITY_COLOR) {
  const color = CITY_COLOR[city];
  const cityWrapper = document.createElement("div");
  cityWrapper.classList.add("city-wrapper");
  const cityLabel = document.createElement("div");
  const cityBox = document.createElement("div");
  cityBox.classList.add("city-box");
  cityBox.style.backgroundColor = color;
  cityLabel.textContent = city;
  cityWrapper.appendChild(cityLabel);
  cityWrapper.appendChild(cityBox);
  cityContainer.appendChild(cityWrapper);
}

/*********************************  This is to display selected parcel   ****************************************** */
const parcelContainer = document.createElement("div");
parcelContainer.classList.add("parcel-wrapper");

const selectedParcelContainer = document.createElement("div");
selectedParcelContainer.classList.add("selected-parcel-container");

const selectedParcelLabel = document.createElement("div");
selectedParcelLabel.textContent = "Selected Parcel:";
selectedParcelLabel.classList.add("selected-parcel-label");

const selectedParcelValue = document.createElement("div");
selectedParcelValue.id = "selected-parcel-value";
selectedParcelValue.classList.add("selected-parcel-value");

selectedParcelContainer.appendChild(selectedParcelLabel);
selectedParcelContainer.appendChild(selectedParcelValue);
cityHeaderWrapper.after(parcelContainer);
parcelContainer.after(selectedParcelContainer);

/*********************************  This is to display all parcels     ****************************************** */

data.forEach((parcel) => {
  const { id, sequence, name, group } = parcel;
  const parcelElement = document.createElement("div");
  parcelElement.classList.add("parcel");

  const sequenceElement = document.createElement("div");
  sequenceElement.classList.add("sequence");
  sequenceElement.textContent = sequence;

  const nameElement = document.createElement("div");
  nameElement.classList.add("name");
  nameElement.textContent = name;

  // Assign background color based on group
  const color = CITY_COLOR[group];
  sequenceElement.style.backgroundColor = color;

  parcelElement.appendChild(nameElement);
  parcelElement.appendChild(sequenceElement);
  parcelContainer.appendChild(parcelElement);

  // Add click event listener to each sequence
  sequenceElement.addEventListener("click", () => {
    selectedParcelValue.textContent = name;
    if (selectedParcel) {
      selectedParcel = null;
      selectedParcelValue.textContent = "";
    } else {
      selectedParcel = parcel;
    }
  });
});

/*********************************  This is to input action container     ****************************************** */
const actionContainerParent = document.createElement("div");
actionContainerParent.classList.add("action-container-parent");
const actionContainer = document.createElement("div");
actionContainer.classList.add("action-container");

const inputLabelValueParent = document.createElement("div");
inputLabelValueParent.classList.add("input-label-value-parent");
const inputLabelValue = document.createElement("div");
inputLabelValue.classList.add("input-label-value");
inputLabelValue.textContent = "Enter Name:";
const inputValue = document.createElement("div");
inputValue.classList.add("input-value");
const parcelNameInput = document.createElement("input");
parcelNameInput.type = "text";
parcelNameInput.placeholder = "Parcel Name";

const dropdownLabelValue = document.createElement("div");
dropdownLabelValue.classList.add("dropdown-label-value");
const dropdownValue = document.createElement("div");
dropdownValue.classList.add("dropdown-value");
dropdownLabelValue.textContent = "Select Group:";
const groupDropdown = document.createElement("select");
groupDropdown.classList.add("group-dropdown");

for (const city in CITY_COLOR) {
  const option = document.createElement("option");
  option.value = city;
  option.text = city;
  groupDropdown.appendChild(option);
}

/*********************************  This is to display action buttons     ****************************************** */
// Add After buttons to action container
const actionButtonContainer = document.createElement("div");
actionButtonContainer.classList.add("action-button-container");
const addButtonAfter = document.createElement("button");
addButtonAfter.textContent = "Add After";
addButtonAfter.addEventListener("click", () => {
  if (selectedParcel) {
    const index = data.findIndex((parcel) => parcel.id === selectedParcel.id);
    if (index !== -1) {
      const newParcel = {
        id: Date.now(),
        name: parcelNameInput.value,
        sequence: selectedParcel.sequence + 1,
        group: groupDropdown.value,
      };
      data.splice(index + 1, 0, newParcel);
      refreshParcels();
    }
  } else {
    alert("Please select a parcel to add after");
  }
});

// Add Before buttons to action container
const addButtonBefore = document.createElement("button");
addButtonBefore.textContent = "Add Before";
addButtonBefore.addEventListener("click", () => {
  if (selectedParcel) {
    const index = data.findIndex((parcel) => parcel.id === selectedParcel.id);
    if (index !== -1) {
      const newParcel = {
        id: Date.now(),
        name: parcelNameInput.value,
        sequence: selectedParcel.sequence,
        group: groupDropdown.value,
      };
      data.splice(index, 0, newParcel);
      refreshParcels();
    }
  } else {
    alert("Please select a parcel to add before");
  }
});

// Replace buttons to action container
const replaceButton = document.createElement("button");
replaceButton.textContent = "Replace";
replaceButton.addEventListener("click", () => {
  if (selectedParcel) {
    const index = data.findIndex((parcel) => parcel.id === selectedParcel.id);
    if (index !== -1) {
      const updatedParcel = {
        id: selectedParcel.id,
        name: parcelNameInput.value,
        sequence: selectedParcel.sequence,
        group: groupDropdown.value,
      };
      data[index] = updatedParcel;
      refreshParcels();
    }
  } else {
    alert("Please select a parcel to replace");
  }
});

// Delete buttons to action container
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.addEventListener("click", () => {
  if (selectedParcel) {
    const index = data.findIndex((parcel) => parcel.id === selectedParcel.id);
    if (index !== -1) {
      data.splice(index, 1);
      refreshParcels();
    }
  } else {
    alert("Please select a parcel to delete");
  }
});

// Refresh buttons to action container
const refreshButton = document.createElement("button");
refreshButton.textContent = "Refresh";
refreshButton.addEventListener("click", () => {
  refreshParcels();
});

// Show final result buttons to action container
const showFinalResultButton = document.createElement("button");
showFinalResultButton.textContent = "Final Result";
showFinalResultButton.addEventListener("click", () => {
  console.log("updated data:", data);
});

// Append all buttons to action container
selectedParcelContainer.after(actionContainerParent);
inputLabelValueParent.appendChild(inputLabelValue);
inputLabelValueParent.appendChild(inputValue);
inputValue.appendChild(parcelNameInput);
actionContainer.appendChild(inputLabelValueParent);
dropdownValue.appendChild(groupDropdown);
actionContainer.appendChild(dropdownLabelValue);
dropdownLabelValue.appendChild(groupDropdown);
actionContainerParent.appendChild(actionContainer);
actionContainerParent.appendChild(cityContainer);
actionContainerParent.after(actionButtonContainer);
actionButtonContainer.appendChild(addButtonAfter);
actionButtonContainer.appendChild(addButtonBefore);
actionButtonContainer.appendChild(replaceButton);
actionButtonContainer.appendChild(deleteButton);
actionButtonContainer.appendChild(refreshButton);
actionButtonContainer.appendChild(showFinalResultButton);

/*********************************  This is to refresh parcels     ****************************************** */
function refreshParcels() {
  parcelContainer.innerHTML = "";
  data.forEach((parcel) => {
    const { id, sequence, name, group } = parcel;
    const parcelElement = document.createElement("div");
    parcelElement.classList.add("parcel");

    const sequenceElement = document.createElement("div");
    sequenceElement.classList.add("sequence");
    sequenceElement.textContent = sequence;

    const nameElement = document.createElement("div");
    nameElement.classList.add("name");
    nameElement.textContent = name;

    // Assign background color based on group
    const color = CITY_COLOR[group];
    sequenceElement.style.backgroundColor = color;

    parcelElement.appendChild(nameElement);
    parcelElement.appendChild(sequenceElement);
    parcelContainer.appendChild(parcelElement);

    // Add click event listener to each sequence
    sequenceElement.addEventListener("click", () => {
      selectedParcelValue.textContent = name;
      selectedParcel = parcel;
    });
  });
}
